'use client';

import { GoogleAnalytics as GA } from '@next/third-parties/google';

export default function GoogleAnalytics() {
  // 優先使用環境變數,沒有的話使用寫死的值
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-9WV2YC6165';

  if (!gaId) {
    console.warn('⚠️ Google Analytics Measurement ID not found');
    return null;
  }

  return <GA gaId={gaId} />;
}
