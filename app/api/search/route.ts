import { NextRequest, NextResponse } from 'next/server';
import { TAVILY_API_KEY } from '@/lib/api-config';

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const body = await req.json();
    const { query } = body;

    // Validate request
    if (!query) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      );
    }

    // Check if Tavily API key is available
    if (!TAVILY_API_KEY) {
      return NextResponse.json(
        { error: 'Tavily API key is not configured' },
        { status: 500 }
      );
    }

    // Call Tavily API
    const response = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': TAVILY_API_KEY,
      },
      body: JSON.stringify({
        query: query,
        search_depth: 'basic',
        include_domains: [],
        exclude_domains: [],
        max_results: 5,
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
    console.error('Error in search API:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
