import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    return NextResponse.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      instance_id: "nextjs-vercel"
    });
  } catch (error) {
    console.error('Health check error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
