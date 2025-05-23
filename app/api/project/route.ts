import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseAdmin } from '@/lib/api-config';

export async function GET(req: NextRequest) {
  try {
    const supabase = createSupabaseAdmin();
    
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
    
    // Query only projects where account_id matches the current user's ID
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('account_id', user.id);
    
    if (error) {
      // Handle permission errors specifically
      if (error.code === '42501' && error.message.includes('has_role_on_account')) {
        console.error('Permission error: User does not have proper account access');
        return NextResponse.json([]); // Return empty array instead of throwing
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    // Map database fields to our Project type
    const mappedProjects = (data || []).map((project) => ({
      id: project.project_id,
      name: project.name || '',
      description: project.description || '',
      account_id: project.account_id,
      created_at: project.created_at,
      updated_at: project.updated_at,
      sandbox: project.sandbox || {
        id: '',
        pass: '',
        vnc_preview: '',
        sandbox_url: '',
      },
    }));
    
    return NextResponse.json(mappedProjects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    // Return empty array for permission errors to avoid crashing the UI
    return NextResponse.json([]);
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = createSupabaseAdmin();
    const body = await req.json();
    const { name, description } = body;
    
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
    
    // In Basejump, the personal account ID is the same as the user ID
    const accountId = user.id;
    
    const { data, error } = await supabase
      .from('projects')
      .insert({
        name: name,
        description: description || null,
        account_id: accountId,
      })
      .select()
      .single();
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    // Map the database response to our Project type
    const mappedProject = {
      id: data.project_id,
      name: data.name,
      description: data.description || '',
      account_id: data.account_id,
      created_at: data.created_at,
      sandbox: { id: '', pass: '', vnc_preview: '' },
    };
    
    return NextResponse.json(mappedProject);
  } catch (error) {
    console.error('Error creating project:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
