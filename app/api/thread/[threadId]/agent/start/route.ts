import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseAdmin } from '@/lib/api-config';
import { OPENROUTER_API_KEY, OPENROUTER_MODEL, OPENROUTER_BASE_URL } from '@/lib/api-config';

// Helper function to encode text as a stream
function encodeText(text: string) {
  const encoder = new TextEncoder();
  return encoder.encode(text);
}

export async function POST(req: NextRequest, { params }: { params: { threadId: string } }) {
  try {
    const threadId = params.threadId;
    const body = await req.json();
    const { model_name, enable_thinking = false, reasoning_effort = "medium", stream = true } = body;
    
    // Get user from auth header
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const token = authHeader.split(' ')[1];
    const supabase = createSupabaseAdmin();
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Check if thread exists and belongs to user
    const { data: thread, error: threadError } = await supabase
      .from('threads')
      .select('*')
      .eq('thread_id', threadId)
      .eq('account_id', user.id)
      .single();
    
    if (threadError || !thread) {
      return NextResponse.json({ error: 'Thread not found or access denied' }, { status: 404 });
    }
    
    // Get messages for this thread
    const { data: messages, error: messagesError } = await supabase
      .from('messages')
      .select('*')
      .eq('thread_id', threadId)
      .neq('type', 'cost')
      .neq('type', 'summary')
      .order('created_at', { ascending: true });
    
    if (messagesError) {
      return NextResponse.json({ error: 'Error fetching messages' }, { status: 500 });
    }
    
    // Format messages for OpenRouter
    const formattedMessages = messages.map(msg => {
      try {
        const content = JSON.parse(msg.content);
        return {
          role: content.role,
          content: content.content
        };
      } catch (e) {
        // If parsing fails, use default format
        return {
          role: msg.type === 'user' ? 'user' : 'assistant',
          content: msg.content
        };
      }
    });
    
    // Create a new agent run record
    const agentRunId = crypto.randomUUID();
    const { error: runError } = await supabase
      .from('agent_runs')
      .insert({
        id: agentRunId,
        thread_id: threadId,
        status: 'running',
        started_at: new Date().toISOString(),
        completed_at: null,
        responses: [],
        error: null
      });
    
    if (runError) {
      return NextResponse.json({ error: 'Error creating agent run' }, { status: 500 });
    }
    
    // Prepare request to OpenRouter
    const openRouterRequest = {
      model: model_name || OPENROUTER_MODEL,
      messages: formattedMessages,
      stream: stream,
    };
    
    // If streaming is requested, handle streaming response
    if (stream) {
      // Create a new ReadableStream
      const responseStream = new ReadableStream({
        async start(controller) {
          try {
            // Make request to OpenRouter API
            const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                'HTTP-Referer': 'https://suna-clone.vercel.app',
                'X-Title': 'Suna Clone',
              },
              body: JSON.stringify(openRouterRequest),
            });

            if (!response.ok) {
              const errorText = await response.text();
              controller.enqueue(encodeText(JSON.stringify({ error: errorText })));
              controller.close();
              
              // Update agent run status to error
              await supabase
                .from('agent_runs')
                .update({
                  status: 'error',
                  completed_at: new Date().toISOString(),
                  error: errorText
                })
                .eq('id', agentRunId);
                
              return;
            }

            if (!response.body) {
              controller.enqueue(encodeText(JSON.stringify({ error: 'No response body' })));
              controller.close();
              
              // Update agent run status to error
              await supabase
                .from('agent_runs')
                .update({
                  status: 'error',
                  completed_at: new Date().toISOString(),
                  error: 'No response body'
                })
                .eq('id', agentRunId);
                
              return;
            }

            // Process the stream from OpenRouter
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let assistantMessage = '';

            while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              
              const chunk = decoder.decode(value, { stream: true });
              
              // Parse and forward the streaming chunks
              const lines = chunk
                .split('\n')
                .filter(line => line.trim() !== '' && line.trim() !== 'data: [DONE]');
              
              for (const line of lines) {
                if (line.startsWith('data: ')) {
                  try {
                    const data = JSON.parse(line.slice(6));
                    // Forward the chunk to the client
                    controller.enqueue(encodeText(`data: ${JSON.stringify(data)}\n\n`));
                    
                    // Extract content from the chunk
                    if (data.choices && data.choices[0]?.delta?.content) {
                      assistantMessage += data.choices[0].delta.content;
                    }
                  } catch (e) {
                    // If parsing fails, send the raw line
                    controller.enqueue(encodeText(`data: ${line.slice(6)}\n\n`));
                  }
                }
              }
            }
            
            // Signal the end of the stream
            controller.enqueue(encodeText('data: [DONE]\n\n'));
            controller.close();
            
            // Save the assistant message to the database
            if (assistantMessage) {
              await supabase.from('messages').insert({
                thread_id: threadId,
                type: 'assistant',
                is_llm_message: true,
                content: JSON.stringify({
                  role: 'assistant',
                  content: assistantMessage
                }),
              });
            }
            
            // Update agent run status to completed
            await supabase
              .from('agent_runs')
              .update({
                status: 'completed',
                completed_at: new Date().toISOString(),
                responses: [{
                  role: 'assistant',
                  content: assistantMessage,
                  type: 'text'
                }]
              })
              .eq('id', agentRunId);
              
          } catch (error) {
            // Handle any errors during streaming
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            controller.enqueue(encodeText(JSON.stringify({ error: errorMessage })));
            controller.close();
            
            // Update agent run status to error
            await supabase
              .from('agent_runs')
              .update({
                status: 'error',
                completed_at: new Date().toISOString(),
                error: errorMessage
              })
              .eq('id', agentRunId);
          }
        }
      });

      // Return the stream as a response
      return new NextResponse(responseStream, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      });
    } else {
      // For non-streaming requests, return a regular JSON response
      const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'HTTP-Referer': 'https://suna-clone.vercel.app',
          'X-Title': 'Suna Clone',
        },
        body: JSON.stringify(openRouterRequest),
      });

      if (!response.ok) {
        const errorText = await response.text();
        
        // Update agent run status to error
        await supabase
          .from('agent_runs')
          .update({
            status: 'error',
            completed_at: new Date().toISOString(),
            error: errorText
          })
          .eq('id', agentRunId);
          
        return NextResponse.json(
          { error: errorText },
          { status: response.status }
        );
      }

      const data = await response.json();
      const assistantMessage = data.choices[0]?.message?.content || '';
      
      // Save the assistant message to the database
      if (assistantMessage) {
        await supabase.from('messages').insert({
          thread_id: threadId,
          type: 'assistant',
          is_llm_message: true,
          content: JSON.stringify({
            role: 'assistant',
            content: assistantMessage
          }),
        });
      }
      
      // Update agent run status to completed
      await supabase
        .from('agent_runs')
        .update({
          status: 'completed',
          completed_at: new Date().toISOString(),
          responses: [{
            role: 'assistant',
            content: assistantMessage,
            type: 'text'
          }]
        })
        .eq('id', agentRunId);
        
      return NextResponse.json(data);
    }
  } catch (error) {
    console.error('Error in agent start API:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
