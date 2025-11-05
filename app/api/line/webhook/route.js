import { NextResponse } from 'next/server';
import crypto from 'crypto';

/**
 * LINE Webhook
 *
 * 接收來自 LINE Platform 的事件
 * Webhook URL: https://thinker.cafe/api/line/webhook
 *
 * 需要在 LINE Developers Console 設定：
 * 1. Messaging API → Webhook settings
 * 2. 輸入 Webhook URL
 * 3. 開啟 "Use webhook"
 */

export async function POST(request) {
  try {
    // 1. 取得原始 body 和 signature
    const body = await request.text();
    const signature = request.headers.get('x-line-signature');

    console.log('📨 Webhook received');
    console.log('Body length:', body.length);
    console.log('Signature:', signature);

    // 2. 驗證 signature（如果有的話）
    if (signature) {
      const channelSecret = process.env.LINE_CHANNEL_SECRET;
      const hash = crypto
        .createHmac('SHA256', channelSecret)
        .update(body)
        .digest('base64');

      if (hash !== signature) {
        console.error('❌ Invalid signature');
        console.error('Expected:', hash);
        console.error('Received:', signature);
        return NextResponse.json(
          { error: 'Invalid signature' },
          { status: 401 }
        );
      }
      console.log('✅ Signature validated');
    } else {
      console.log('⚠️  No signature provided - accepting anyway');
    }

    // 3. 解析 events
    let data, events;
    try {
      data = JSON.parse(body || '{}');
      events = data.events || [];
    } catch (parseError) {
      console.error('❌ Failed to parse body:', parseError);
      // 即使解析失敗也返回 200，這可能是 LINE 的 Verify 請求
      return NextResponse.json({ success: true });
    }

    console.log(`✅ Received ${events.length} events`);

    // 4. 處理每個事件
    for (const event of events) {
      await handleEvent(event);
    }

    // 5. 回應 200 OK (LINE 要求必須在 5 秒內回應)
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('❌ Webhook error:', error);
    // 即使錯誤也要回應 200，避免 LINE 重複發送
    return NextResponse.json({ success: false }, { status: 200 });
  }
}

/**
 * 處理單一事件
 */
async function handleEvent(event) {
  console.log('Event type:', event.type);
  console.log('Event:', JSON.stringify(event, null, 2));

  switch (event.type) {
    case 'message':
      await handleMessage(event);
      break;
    case 'follow':
      await handleFollow(event);
      break;
    case 'unfollow':
      await handleUnfollow(event);
      break;
    case 'postback':
      await handlePostback(event);
      break;
    default:
      console.log('Unhandled event type:', event.type);
  }
}

/**
 * 處理訊息事件
 */
async function handleMessage(event) {
  const { replyToken, message, source } = event;
  const userId = source.userId;

  console.log(`Message from ${userId}:`, message.text);

  // TODO: 實作自動回覆邏輯
  // 例如：
  // - 查詢訂單狀態
  // - 課程諮詢
  // - 常見問題
}

/**
 * 處理加入好友事件
 */
async function handleFollow(event) {
  const { replyToken, source } = event;
  const userId = source.userId;

  console.log(`New follower: ${userId}`);

  // 更新資料庫：標記用戶已加好友
  try {
    const { createClient } = await import('@/utils/supabase/server');
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('profiles')
      .update({
        line_is_friend: true,
        line_friend_added_at: new Date().toISOString(),
      })
      .eq('line_user_id', userId);

    if (error) {
      console.error('Failed to update friend status:', error);
    } else {
      console.log(`✅ Updated friend status for ${userId}`);
    }
  } catch (dbError) {
    console.error('Database error:', dbError);
  }

  // 發送歡迎訊息
  try {
    const { createLineClient } = await import('@/lib/line/client');
    const client = createLineClient();

    await client.replyMessage(replyToken, {
      type: 'text',
      text: '歡迎加入思考者咖啡！\n\n您現在可以收到課程報名與繳費的即時通知了 🎉\n\n如有任何問題，歡迎隨時詢問我們！',
    });
  } catch (replyError) {
    console.error('Failed to send welcome message:', replyError);
  }
}

/**
 * 處理取消好友事件
 */
async function handleUnfollow(event) {
  const { source } = event;
  const userId = source.userId;

  console.log(`User unfollowed: ${userId}`);

  // 更新資料庫：標記用戶取消好友
  try {
    const { createClient } = await import('@/utils/supabase/server');
    const supabase = await createClient();

    const { error } = await supabase
      .from('profiles')
      .update({
        line_is_friend: false,
      })
      .eq('line_user_id', userId);

    if (error) {
      console.error('Failed to update unfollow status:', error);
    } else {
      console.log(`✅ Updated unfollow status for ${userId}`);
    }
  } catch (dbError) {
    console.error('Database error:', dbError);
  }
}

/**
 * 處理 Postback 事件 (Rich Menu 或 Button 點擊)
 */
async function handlePostback(event) {
  const { replyToken, postback, source } = event;
  const userId = source.userId;
  const data = postback.data;

  console.log(`Postback from ${userId}:`, data);

  // TODO: 根據 postback data 執行對應動作
}

/**
 * GET 用於驗證 Webhook (LINE 設定時會發送 GET 請求)
 */
export async function GET(request) {
  return NextResponse.json({
    status: 'ok',
    message: 'LINE Webhook endpoint is ready',
  });
}
