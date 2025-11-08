import { createLineClient } from './client';
import { createPaymentReminderMessage } from './templates/paymentReminder';
import { createOrderConfirmationMessage } from './templates/orderConfirmation';

/**
 * 發送繳費提醒
 * @param {string} lineUserId - LINE User ID
 * @param {Object} params - 訊息參數
 * @param {Object} options - 選項 { checkFriendStatus: boolean }
 * @returns {Promise<Object>} { success: boolean, reason?: string }
 */
export async function sendPaymentReminder(lineUserId, params, options = {}) {
  try {
    console.log('🔍 [sendPaymentReminder] Starting with params:', {
      lineUserId,
      params,
      options,
      paramsType: typeof params,
      paramsKeys: params ? Object.keys(params) : null
    });

    const client = createLineClient();
    console.log('✅ [sendPaymentReminder] LINE client created');

    // 檢查好友狀態（可選）
    if (options.checkFriendStatus !== false) {
      console.log('🔍 [sendPaymentReminder] Checking friend status...');
      try {
        await client.getProfile(lineUserId);
        console.log('✅ [sendPaymentReminder] Friend status check passed');
      } catch (profileError) {
        console.log('❌ [sendPaymentReminder] Friend status check failed:', profileError);
        if (profileError.statusCode === 404) {
          console.log(`⚠️  User ${lineUserId} hasn't added bot as friend`);
          return { success: false, reason: 'not_friend' };
        }
        throw profileError;
      }
    } else {
      console.log('⏭️ [sendPaymentReminder] Skipping friend status check');
    }

    console.log('🔍 [sendPaymentReminder] Creating payment reminder message...');
    const message = createPaymentReminderMessage(params);
    console.log('✅ [sendPaymentReminder] Message created:', {
      messageType: message.type,
      altText: message.altText,
      hasContents: !!message.contents
    });

    console.log('🔍 [sendPaymentReminder] Sending message via pushMessage...');
    await client.pushMessage(lineUserId, message);
    console.log(`✅ Payment reminder sent to ${lineUserId}`);
    return { success: true };
  } catch (error) {
    console.error('❌ [sendPaymentReminder] Failed:', {
      message: error.message,
      statusCode: error.statusCode,
      statusMessage: error.statusMessage,
      stack: error.stack
    });
    throw error;
  }
}

/**
 * 發送訂單確認
 * @param {string} lineUserId - LINE User ID
 * @param {Object} params - 訊息參數
 * @returns {Promise<void>}
 */
export async function sendOrderConfirmation(lineUserId, params) {
  try {
    const client = createLineClient();
    const message = createOrderConfirmationMessage(params);

    await client.pushMessage(lineUserId, message);
    console.log(`✅ Order confirmation sent to ${lineUserId}`);
  } catch (error) {
    console.error('❌ Failed to send order confirmation:', error);
    throw error;
  }
}

/**
 * 發送繳費成功通知
 * @param {string} lineUserId - LINE User ID
 * @param {Object} params - 訊息參數
 * @returns {Promise<void>}
 */
export async function sendPaymentSuccess(lineUserId, params) {
  try {
    const client = createLineClient();

    const message = {
      type: 'text',
      text: `✅ 繳費成功通知\n\n${params.studentName} 您好！\n\n您的訂單 #${params.orderID} 已成功繳費\n課程：${params.courseName}\n金額：NT$ ${params.amount.toLocaleString()}\n\n我們會在課程開課前再次通知您，請保持 LINE 通知開啟。\n\n如有任何問題，歡迎隨時與我們聯繫！`,
    };

    await client.pushMessage(lineUserId, message);
    console.log(`✅ Payment success notification sent to ${lineUserId}`);
  } catch (error) {
    console.error('❌ Failed to send payment success notification:', error);
    throw error;
  }
}

/**
 * 發送課程開課通知
 * @param {string} lineUserId - LINE User ID
 * @param {Object} params - 訊息參數
 * @returns {Promise<void>}
 */
export async function sendCourseStartReminder(lineUserId, params) {
  try {
    const client = createLineClient();

    const message = {
      type: 'text',
      text: `📢 課程即將開始\n\n${params.studentName} 您好！\n\n您報名的課程即將開始：\n課程：${params.courseName}\n時間：${params.startTime}\n地點：${params.location || '線上課程'}\n\n請準時參加，期待與您見面！`,
    };

    await client.pushMessage(lineUserId, message);
    console.log(`✅ Course start reminder sent to ${lineUserId}`);
  } catch (error) {
    console.error('❌ Failed to send course start reminder:', error);
    throw error;
  }
}
