import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseAdmin } from '@/lib/api-config';

export async function POST(req: NextRequest, { params }: { params: { threadId: string } }) {
  try {
    const threadId = params.threadId;
    const body = await req.json();
    const { content } = body;
    
    if (!content) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }
    
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
    
    // Format the message in the format the LLM expects
    const message = {
      role: 'user',
      content: content,
    };
    
    // Insert the message into the messages table
    const { error: insertError } = await supabase
      .from('messages')
      .insert({
        thread_id: threadId,
        type: 'user',
        is_llm_message: true,
        content: JSON.stringify(message),
      });
    
    if (insertError) {
      console.error('Error adding user message:', insertError);
      return NextResponse.json({ error: 'Error adding message' }, { status: 500 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in message API:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function GET(req: NextRequest, { params }: { params: { threadId: string } }) {
  try {
    const threadId = params.threadId;
    
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
    
    return NextResponse.json(messages);
  } catch (error) {
    console.error('Error in message retrieval API:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
