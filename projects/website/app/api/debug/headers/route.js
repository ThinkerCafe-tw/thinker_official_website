import { NextRequest, NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const referer = request.headers.get('referer');
    const origin = request.headers.get('origin');
    const userAgent = request.headers.get('user-agent');
    const host = request.headers.get('host');

    const isValidOrigin =
      referer?.includes('thinker.cafe') ||
      origin?.includes('thinker.cafe') ||
      referer?.includes('localhost') ||
      origin?.includes('localhost');

    return NextResponse.json({
      headers: {
        referer,
        origin,
        userAgent,
        host
      },
      validation: {
        isValidOrigin,
        refererCheck: referer?.includes('thinker.cafe') || referer?.includes('localhost'),
        originCheck: origin?.includes('thinker.cafe') || origin?.includes('localhost')
      },
      allHeaders: Object.fromEntries(request.headers.entries())
    });

  } catch (error) {
    return NextResponse.json({
      error: 'Failed to parse headers',
      details: error.message
    }, { status: 500 });
  }
}