import { Resend } from 'resend';

// 檢查 API Key 是否存在
if (!process.env.RESEND_API_KEY) {
  console.warn('⚠️ RESEND_API_KEY is not set. Email functionality will not work.');
}

export const resend = new Resend(process.env.RESEND_API_KEY);

// Email 寄件者
// 開發環境使用 Resend 提供的測試信箱
// 正式環境需要驗證自己的網域
export const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

// Email 寄件者顯示名稱
export const FROM_NAME = '思考者咖啡 Thinker Cafe';

// 完整的寄件者格式
export const FROM = `${FROM_NAME} <${FROM_EMAIL}>`;
