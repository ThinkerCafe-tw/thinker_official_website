import { NextResponse } from 'next/server';
import { createLineClient } from '@/lib/line/client';
import { createOrderConfirmationMessage } from '@/lib/line/templates/orderConfirmation';

export async function POST(request) {
  try {
    console.log('🧪 LINE Test API called');

    const lineUserId = 'U0675d76b7a4a301d583ba917eda8b32e';

    // 1. 創建 LINE 客戶端
    console.log('1. Creating LINE client...');
    const client = createLineClient();
    console.log('✅ LINE client created');

    // 2. 檢查用戶狀態
    console.log('2. Checking user profile...');
    try {
      const profile = await client.getProfile(lineUserId);
      console.log('✅ User profile:', profile.displayName);
    } catch (profileError) {
      console.error('❌ Profile error:', profileError);
      if (profileError.statusCode === 404) {
        return NextResponse.json({
          success: false,
          error: 'User not friend',
          message: '用戶尚未加機器人為好友'
        });
      }
    }

    // 3. 發送測試訊息
    console.log('3. Sending test message...');

    const message = createOrderConfirmationMessage({
      studentName: '湯明 Cruz',
      orderID: '999',
      courseName: '【測試】LINE 通知功能測試',
      amount: 1,
      paymentURL: 'https://thinker.cafe/order/999',
    });

    await client.pushMessage(lineUserId, message);
    console.log('✅ Test message sent successfully');

    return NextResponse.json({
      success: true,
      message: 'LINE test notification sent',
      timestamp: new Date().toISOString(),
      lineUserId,
    });

  } catch (error) {
    console.error('❌ LINE test failed:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      statusCode: error.statusCode,
      statusMessage: error.statusMessage,
      stack: error.stack,
    }, { status: 500 });
  }
}