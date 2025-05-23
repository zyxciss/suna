import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseAdmin } from '@/lib/api-config';

// Simple billing check endpoint - simplified version of the original
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
    
    // In this simplified version, we'll just return a default billing status
    // In a real implementation, you would check the user's billing status in Supabase
    return NextResponse.json({
      status: "active",
      plan: "free",
      usage: {
        current: 0,
        limit: 100
      },
      features: {
        agent: true,
        sandbox: true
      }
    });
  } catch (error) {
    console.error('Error in billing API:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
