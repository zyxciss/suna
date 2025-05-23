import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/api-config';

// Using workaround for Next.js 15 dynamic route handler type bug
// Instead of using the second argument with params, we extract the parameter from the URL
export async function GET(request: NextRequest) {
  try {
    // Extract the projectId from the URL
    const { pathname } = request.nextUrl;
    const segments = pathname.split('/');
    const projectId = segments[segments.length - 1]; // Assuming projectId is the last segment
    
    // Get project details from Supabase
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', projectId)
      .single();
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json(data || {});
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch project details' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Extract the projectId from the URL
    const { pathname } = request.nextUrl;
    const segments = pathname.split('/');
    const projectId = segments[segments.length - 1];
    
    const body = await request.json();
    
    // Update project in Supabase
    const { data, error } = await supabase
      .from('projects')
      .update(body)
      .eq('id', projectId)
      .select()
      .single();
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Extract the projectId from the URL
    const { pathname } = request.nextUrl;
    const segments = pathname.split('/');
    const projectId = segments[segments.length - 1];
    
    // Delete project from Supabase
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', projectId);
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
