import { NextResponse } from 'next/server';
import { validateSignature } from '@/lib/line/client';

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
    console.log('Signature:', signature);

    // 2. 驗證 signature
    if (!signature || !validateSignature(body, signature)) {
      console.error('❌ Invalid signature');
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    // 3. 解析 events
    const data = JSON.parse(body);
    const events = data.events || [];

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

  // TODO: 發送歡迎訊息
  // TODO: 記錄到資料庫
}

/**
 * 處理取消好友事件
 */
async function handleUnfollow(event) {
  const { source } = event;
  const userId = source.userId;

  console.log(`User unfollowed: ${userId}`);

  // TODO: 更新資料庫狀態
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
