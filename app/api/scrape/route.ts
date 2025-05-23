import { NextRequest, NextResponse } from 'next/server';
import { FIRECRAWL_API_KEY } from '@/lib/api-config';

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const body = await req.json();
    const { url } = body;

    // Validate request
    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    // Check if FireCrawl API key is available
    if (!FIRECRAWL_API_KEY) {
      return NextResponse.json(
        { error: 'FireCrawl API key is not configured' },
        { status: 500 }
      );
    }

    // Call FireCrawl API
    const response = await fetch('https://api.firecrawl.dev/v1/scrape', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${FIRECRAWL_API_KEY}`,
      },
      body: JSON.stringify({
        url: url,
        wait_for_selector: 'body',
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
    console.error('Error in scrape API:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
