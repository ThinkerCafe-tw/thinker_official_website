import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { createLineClient } from '@/lib/line/client';

export async function POST(request) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json({
        error: 'Missing userId'
      }, { status: 400 });
    }

    // 查詢用戶的 LINE User ID
    const supabase = await createClient();
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('line_user_id, full_name')
      .eq('user_id', userId)
      .single();

    if (profileError || !profile) {
      return NextResponse.json({
        error: 'Profile not found',
        details: profileError
      }, { status: 404 });
    }

    const results = {
      profile: {
        line_user_id: profile.line_user_id,
        full_name: profile.full_name
      },
      tests: {}
    };

    // 測試好友檢查
    if (profile.line_user_id) {
      const client = createLineClient();

      try {
        console.log(`Testing getProfile for LINE User ID: ${profile.line_user_id}`);
        const lineProfile = await client.getProfile(profile.line_user_id);
        results.tests.friendCheck = {
          success: true,
          profile: lineProfile
        };
      } catch (friendError) {
        console.error('Friend check failed:', friendError);
        results.tests.friendCheck = {
          success: false,
          error: {
            message: friendError.message,
            statusCode: friendError.statusCode,
            statusMessage: friendError.statusMessage
          }
        };
      }

      // 測試發送訊息
      try {
        console.log(`Testing pushMessage for LINE User ID: ${profile.line_user_id}`);
        await client.pushMessage(profile.line_user_id, {
          type: 'text',
          text: '🔍 LINE User ID 檢測測試\n\n如果您收到這條訊息，表示您的 LINE User ID 正常運作！'
        });
        results.tests.pushMessage = {
          success: true
        };
      } catch (pushError) {
        console.error('Push message failed:', pushError);
        results.tests.pushMessage = {
          success: false,
          error: {
            message: pushError.message,
            statusCode: pushError.statusCode,
            statusMessage: pushError.statusMessage
          }
        };
      }
    } else {
      results.tests.noLineUserId = true;
    }

    return NextResponse.json(results);

  } catch (error) {
    console.error('Debug check-line-user error:', error);
    return NextResponse.json({
      error: 'Internal server error',
      details: error.message
    }, { status: 500 });
  }
}