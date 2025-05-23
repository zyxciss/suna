import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseAdmin } from '@/lib/api-config';

// Create a new thread
export async function POST(req: NextRequest) {
  try {
    const supabase = createSupabaseAdmin();
    const body = await req.json();
    const { project_id } = body;
    
    // Get user from auth header
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const token = authHeader.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Create thread in database
    const { data, error } = await supabase
      .from('threads')
      .insert({
        project_id: project_id,
        account_id: user.id,
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error creating thread:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in thread creation:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// Get threads
export async function GET(req: NextRequest) {
  try {
    const supabase = createSupabaseAdmin();
    const url = new URL(req.url);
    const projectId = url.searchParams.get('project_id');
    
    // Get user from auth header
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const token = authHeader.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Query threads
    let query = supabase.from('threads').select('*');
    
    // Always filter by the current user's account ID
    query = query.eq('account_id', user.id);
    
    if (projectId) {
      query = query.eq('project_id', projectId);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching threads:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in thread retrieval:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
