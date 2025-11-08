import { NextRequest, NextResponse } from 'next/server';

export async function POST() {
  const logs = [];

  // 攔截 console.log 來捕獲 sendPaymentReminder 的詳細日誌
  const originalLog = console.log;
  const originalError = console.error;

  console.log = (...args) => {
    logs.push({ type: 'log', message: args.join(' '), timestamp: new Date().toISOString() });
    originalLog(...args);
  };

  console.error = (...args) => {
    logs.push({ type: 'error', message: args.join(' '), timestamp: new Date().toISOString() });
    originalError(...args);
  };

  try {
    const { sendPaymentReminder } = await import('@/lib/line/notify');

    // 使用訂單 #57 的參數
    const params = {
      studentName: '湯明 Cruz',
      orderID: '57',
      courseName: 'AI 全能實戰營',
      amount: 10000,
      expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24小時後到期
      paymentURL: 'https://thinker.cafe/order/57'
    };

    const result = await sendPaymentReminder(
      'U0675d76b7a4a301d583ba917eda8b32e',
      params,
      { checkFriendStatus: false }
    );

    return NextResponse.json({
      success: true,
      sendPaymentReminderResult: result,
      capturedLogs: logs,
      testParams: params
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: {
        message: error.message,
        statusCode: error.statusCode,
        statusMessage: error.statusMessage,
        stack: error.stack
      },
      capturedLogs: logs
    });
  } finally {
    // 恢復原始 console
    console.log = originalLog;
    console.error = originalError;
  }
}