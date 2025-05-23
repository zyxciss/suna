import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseAdmin } from '@/lib/api-config';

// Simplified sandbox API - just returns a mock sandbox status
export async function GET(req: NextRequest, { params }: { params: { projectId: string } }) {
  try {
    const projectId = params.projectId;
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
    
    // Check if project exists and belongs to user
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .select('*')
      .eq('project_id', projectId)
      .single();
    
    if (projectError || !project) {
      return NextResponse.json({ error: 'Project not found or access denied' }, { status: 404 });
    }
    
    // Return mock sandbox status
    return NextResponse.json({
      status: "active",
      sandbox_id: `sandbox-${projectId}`,
      url: `https://sandbox.example.com/${projectId}`,
      created_at: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in sandbox API:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// Simplified sandbox activation endpoint
export async function POST(req: NextRequest, { params }: { params: { projectId: string } }) {
  try {
    const projectId = params.projectId;
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
    
    // Check if project exists and belongs to user
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .select('*')
      .eq('project_id', projectId)
      .single();
    
    if (projectError || !project) {
      return NextResponse.json({ error: 'Project not found or access denied' }, { status: 404 });
    }
    
    // Return mock sandbox activation response
    return NextResponse.json({
      success: true,
      message: "Sandbox activated successfully",
      sandbox: {
        id: `sandbox-${projectId}`,
        pass: "mock-password",
        vnc_preview: `https://sandbox.example.com/${projectId}/preview`,
        sandbox_url: `https://sandbox.example.com/${projectId}`
      }
    });
  } catch (error) {
    console.error('Error in sandbox activation API:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
