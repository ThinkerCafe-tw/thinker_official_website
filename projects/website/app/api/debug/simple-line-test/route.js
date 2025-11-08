import { NextRequest, NextResponse } from 'next/server';

export async function POST() {
  try {
    const { createLineClient } = await import('@/lib/line/client');
    const client = createLineClient();

    // 使用你的 LINE User ID 發送簡單測試消息
    const lineUserId = 'U0675d76b7a4a301d583ba917eda8b32e';

    const message = {
      type: 'text',
      text: `🧪 簡單測試消息

訂單 #57 繳費提醒
課程：AI 全能實戰營
金額：NT$ 10,000

這是測試 sendPaymentReminder 參數格式的消息。`,
    };

    await client.pushMessage(lineUserId, message);

    return NextResponse.json({
      success: true,
      message: 'Simple LINE message sent successfully'
    });

  } catch (error) {
    console.error('Simple LINE test error:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      statusCode: error.statusCode || 500,
      details: error
    });
  }
}