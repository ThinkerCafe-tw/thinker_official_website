import { NextResponse } from 'next/server';

/**
 * 驗證 LINE Access Token
 *
 * 參考：https://developers.line.biz/en/reference/line-login/#verify-access-token
 */
export async function POST(request) {
  try {
    const { accessToken } = await request.json();

    if (!accessToken) {
      return NextResponse.json(
        { error: 'Access token is required' },
        { status: 400 }
      );
    }

    // 呼叫 LINE API 驗證 token
    const response = await fetch(
      `https://api.line.me/oauth2/v2.1/verify?access_token=${accessToken}`
    );

    console.log('LINE API verify response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('LINE API verify failed:', errorText);
      return NextResponse.json(
        { error: 'Invalid access token', valid: false, details: errorText },
        { status: 401 }
      );
    }

    const data = await response.json();
    console.log('LINE API verify data:', data);
    console.log('Expected channel ID:', process.env.LINE_CHANNEL_ID);

    // 驗證 token 是否屬於我們的 LINE Channel
    if (data.client_id !== process.env.LINE_CHANNEL_ID) {
      console.error('Channel ID mismatch:', {
        received: data.client_id,
        expected: process.env.LINE_CHANNEL_ID
      });
      return NextResponse.json(
        { error: 'Token does not belong to this channel', valid: false },
        { status: 401 }
      );
    }

    return NextResponse.json({
      valid: true,
      channelId: data.client_id,
      expiresIn: data.expires_in,
    });

  } catch (error) {
    console.error('驗證 LINE Access Token 錯誤:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
