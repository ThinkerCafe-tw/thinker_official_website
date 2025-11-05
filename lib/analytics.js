/**
 * Analytics 分析追蹤系統
 *
 * 功能：
 * - 追蹤用戶行為 (頁面瀏覽、按鈕點擊、報名流程等)
 * - 自動收集裝置資訊
 * - 使用 sendBeacon API 確保資料送達
 * - Session 管理
 *
 * 參考: pt-liff-app/src/utils/analytics.js
 */

let sessionId = null;
let lineUserId = null;

/**
 * 初始化 Analytics
 * @param {string} liffUserId - LINE User ID
 */
export function initAnalytics(liffUserId) {
  // 產生 Session ID
  sessionId = generateSessionId();
  lineUserId = liffUserId;

  // 追蹤頁面載入
  trackEvent({
    category: '系統',
    action: '頁面載入',
    name: document.title
  });
}

/**
 * 產生 Session ID
 */
function generateSessionId() {
  return `${Date.now()}-${Math.random().toString(36).substring(7)}`;
}

/**
 * 偵測裝置類型
 */
function getDeviceType() {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet';
  }
  if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return 'mobile';
  }
  return 'desktop';
}

/**
 * 偵測瀏覽器
 */
function getBrowser() {
  const ua = navigator.userAgent;
  if (ua.includes('Firefox')) return 'Firefox';
  if (ua.includes('Chrome')) return 'Chrome';
  if (ua.includes('Safari')) return 'Safari';
  if (ua.includes('Edge')) return 'Edge';
  if (ua.includes('Opera') || ua.includes('OPR')) return 'Opera';
  return 'Unknown';
}

/**
 * 偵測作業系統
 */
function getOS() {
  const ua = navigator.userAgent;
  if (ua.includes('Win')) return 'Windows';
  if (ua.includes('Mac')) return 'MacOS';
  if (ua.includes('Linux')) return 'Linux';
  if (ua.includes('Android')) return 'Android';
  if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad')) return 'iOS';
  return 'Unknown';
}

/**
 * 追蹤事件
 * @param {Object} params - 事件參數
 * @param {string} params.category - 事件類別 (必填)
 * @param {string} params.action - 事件動作 (必填)
 * @param {string} params.name - 事件名稱 (選填)
 * @param {number} params.value - 事件數值 (選填)
 * @param {Object} params.metadata - 額外資料 (選填)
 */
export function trackEvent({ category, action, name, value, metadata }) {
  if (!category || !action) {
    console.error('[Analytics] category 和 action 為必填');
    return;
  }

  const data = {
    // 事件資訊
    category,
    action,
    name,
    value,

    // 用戶資訊
    lineUserId,
    sessionId,

    // 頁面資訊
    pageUrl: window.location.href,
    pageTitle: document.title,
    referrerUrl: document.referrer,

    // 裝置資訊
    userAgent: navigator.userAgent,
    deviceType: getDeviceType(),
    browser: getBrowser(),
    os: getOS(),
    screenResolution: `${window.screen.width}x${window.screen.height}`,

    // 時間戳記
    timestamp: new Date().toISOString(),

    // 額外資料
    metadata
  };

  // 開發模式：僅記錄到 console
  if (process.env.NEXT_PUBLIC_DEV_MODE === 'true') {
    console.log('[Analytics]', data);
    return;
  }

  // 生產模式：發送到後端
  // 使用 sendBeacon API 確保即使用戶離開頁面也能送出
  if (navigator.sendBeacon) {
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    navigator.sendBeacon('/api/analytics/track', blob);
  } else {
    // 降級使用 fetch
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      keepalive: true
    }).catch(err => console.error('[Analytics] 發送失敗:', err));
  }
}

/**
 * 預定義的分析追蹤函數
 */
export const analytics = {
  // 課程相關
  course: {
    view: (courseId, courseName) => trackEvent({
      category: '課程',
      action: '瀏覽課程',
      name: courseName,
      value: courseId
    }),
    clickEnroll: (courseId, courseName) => trackEvent({
      category: '課程',
      action: '點擊報名',
      name: courseName,
      value: courseId
    }),
  },

  // 報名流程
  enrollment: {
    start: (courseId) => trackEvent({
      category: '報名流程',
      action: '開始報名',
      value: courseId
    }),
    selectPlan: (courseId, plan) => trackEvent({
      category: '報名流程',
      action: '選擇方案',
      name: plan, // 'group' or 'single'
      value: courseId
    }),
    submit: (courseId, orderData) => trackEvent({
      category: '報名流程',
      action: '提交報名',
      value: courseId,
      metadata: orderData
    }),
    success: (orderId, courseId) => trackEvent({
      category: '報名流程',
      action: '報名成功',
      name: orderId,
      value: courseId
    }),
    fail: (courseId, errorMessage) => trackEvent({
      category: '報名流程',
      action: '報名失敗',
      name: errorMessage,
      value: courseId
    }),
  },

  // 使用者互動
  interaction: {
    clickButton: (buttonName) => trackEvent({
      category: '互動',
      action: '點擊按鈕',
      name: buttonName
    }),
    openAccordion: (accordionName) => trackEvent({
      category: '互動',
      action: '展開手風琴',
      name: accordionName
    }),
    selectRole: (roleName) => trackEvent({
      category: '互動',
      action: '選擇角色',
      name: roleName
    }),
  },

  // 頁面瀏覽
  page: {
    view: (pageName) => trackEvent({
      category: '頁面',
      action: '瀏覽頁面',
      name: pageName
    }),
  },

  // 錯誤追蹤
  error: {
    log: (errorMessage, errorStack) => trackEvent({
      category: '錯誤',
      action: '發生錯誤',
      name: errorMessage,
      metadata: { stack: errorStack }
    }),
  }
};
