import { NextRequest, NextResponse } from 'next/server';
import { DAYTONA_API_KEY } from '@/lib/api-config';

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const body = await req.json();
    const { prompt } = body;

    // Validate request
    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Check if Daytona API key is available
    if (!DAYTONA_API_KEY) {
      return NextResponse.json(
        { error: 'Daytona API key is not configured' },
        { status: 500 }
      );
    }

    // Call Daytona API
    const response = await fetch('https://api.daytona.tech/v1/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DAYTONA_API_KEY}`,
      },
      body: JSON.stringify({
        prompt: prompt,
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in Daytona API:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
