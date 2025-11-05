'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface DailyStats {
  date: string;
  activeUsers: number;
  sessions: number;
  pageViews: number;
  conversions: number;
}

interface StatsData {
  success: boolean;
  period: number;
  totals: {
    totalUsers: number;
    totalSessions: number;
    totalPageViews: number;
    totalConversions: number;
  };
  dailyStats: DailyStats[];
}

interface FunnelData {
  success: boolean;
  period: number;
  funnel: {
    step1_explore: number;
    step2_view: number;
    step3_addToCart: number;
    step4_checkout: number;
    step5_purchase: number;
  };
  conversionRates: {
    exploreToView: string;
    viewToCart: string;
    cartToCheckout: string;
    checkoutToPurchase: string;
    overallConversion: string;
  };
}

export default function AnalyticsDashboard() {
  const [period, setPeriod] = useState<number>(7);
  const [statsData, setStatsData] = useState<StatsData | null>(null);
  const [funnelData, setFunnelData] = useState<FunnelData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAnalytics();
  }, [period]);

  const fetchAnalytics = async () => {
    setLoading(true);
    setError(null);

    try {
      // Add timeout to fetch requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      const [statsRes, funnelRes] = await Promise.all([
        fetch(`/api/analytics/stats?period=${period}`, { signal: controller.signal }),
        fetch(`/api/analytics/funnel?period=${period}`, { signal: controller.signal })
      ]);

      clearTimeout(timeoutId);

      if (!statsRes.ok || !funnelRes.ok) {
        const statsError = !statsRes.ok ? await statsRes.text() : '';
        const funnelError = !funnelRes.ok ? await funnelRes.text() : '';
        throw new Error(`API Error: ${statsError || funnelError}`);
      }

      const stats = await statsRes.json();
      const funnel = await funnelRes.json();

      if (!stats.success || !funnel.success) {
        throw new Error(stats.error || funnel.error || 'Unknown error');
      }

      setStatsData(stats);
      setFunnelData(funnel);
    } catch (err: any) {
      if (err.name === 'AbortError') {
        setError('請求超時，請重試');
      } else {
        setError(err.message || 'Failed to load analytics');
      }
      console.error('Analytics fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    const year = dateStr.substring(0, 4);
    const month = dateStr.substring(4, 6);
    const day = dateStr.substring(6, 8);
    return `${month}/${day}`;
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('zh-TW').format(num);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">載入數據中...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-semibold">載入失敗</p>
          <p className="text-gray-600 mt-2">{error}</p>
          <Button onClick={fetchAnalytics} className="mt-4">
            重試
          </Button>
        </div>
      </div>
    );
  }

  const chartData = statsData?.dailyStats.map(day => ({
    date: formatDate(day.date),
    用戶數: day.activeUsers,
    工作階段: day.sessions,
    瀏覽量: day.pageViews,
    轉換數: day.conversions,
  })) || [];

  const funnelChartData = funnelData ? [
    { step: '探索課程', count: funnelData.funnel.step1_explore, rate: '100%' },
    { step: '查看課程', count: funnelData.funnel.step2_view, rate: `${funnelData.conversionRates.exploreToView}%` },
    { step: '加入購物車', count: funnelData.funnel.step3_addToCart, rate: `${funnelData.conversionRates.viewToCart}%` },
    { step: '開始結帳', count: funnelData.funnel.step4_checkout, rate: `${funnelData.conversionRates.cartToCheckout}%` },
    { step: '完成購買', count: funnelData.funnel.step5_purchase, rate: `${funnelData.conversionRates.checkoutToPurchase}%` },
  ] : [];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">GA4 分析儀表板</h1>
          <p className="text-gray-600 mt-2">追蹤網站流量與轉換數據</p>
        </div>

        {/* Period Selector */}
        <div className="mb-6 flex gap-2">
          {[7, 30, 90].map((days) => (
            <Button
              key={days}
              onClick={() => setPeriod(days)}
              variant={period === days ? 'default' : 'outline'}
            >
              最近 {days} 天
            </Button>
          ))}
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>活躍用戶</CardDescription>
              <CardTitle className="text-3xl">
                {formatNumber(statsData?.totals.totalUsers || 0)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-500">最近 {period} 天</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>工作階段</CardDescription>
              <CardTitle className="text-3xl">
                {formatNumber(statsData?.totals.totalSessions || 0)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-500">最近 {period} 天</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>頁面瀏覽量</CardDescription>
              <CardTitle className="text-3xl">
                {formatNumber(statsData?.totals.totalPageViews || 0)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-500">最近 {period} 天</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>轉換次數</CardDescription>
              <CardTitle className="text-3xl">
                {formatNumber(statsData?.totals.totalConversions || 0)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-500">最近 {period} 天</p>
            </CardContent>
          </Card>
        </div>

        {/* Daily Trends Chart */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>每日趨勢</CardTitle>
            <CardDescription>用戶活動與互動趨勢</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="用戶數" stackId="1" stroke="#8884d8" fill="#8884d8" />
                <Area type="monotone" dataKey="工作階段" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                <Area type="monotone" dataKey="瀏覽量" stackId="1" stroke="#ffc658" fill="#ffc658" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Conversion Funnel */}
        <Card>
          <CardHeader>
            <CardTitle>轉換漏斗</CardTitle>
            <CardDescription>
              整體轉換率: {funnelData?.conversionRates.overallConversion}%
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={funnelChartData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="step" type="category" width={100} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-3 border rounded shadow">
                          <p className="font-semibold">{payload[0].payload.step}</p>
                          <p className="text-sm">數量: {formatNumber(payload[0].value as number)}</p>
                          <p className="text-sm">轉換率: {payload[0].payload.rate}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" name="事件數量" />
              </BarChart>
            </ResponsiveContainer>

            {/* Funnel Conversion Rates */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-gray-50 rounded">
                <p className="text-xs text-gray-600">探索→查看</p>
                <p className="text-lg font-semibold">{funnelData?.conversionRates.exploreToView}%</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded">
                <p className="text-xs text-gray-600">查看→購物車</p>
                <p className="text-lg font-semibold">{funnelData?.conversionRates.viewToCart}%</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded">
                <p className="text-xs text-gray-600">購物車→結帳</p>
                <p className="text-lg font-semibold">{funnelData?.conversionRates.cartToCheckout}%</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded">
                <p className="text-xs text-gray-600">結帳→購買</p>
                <p className="text-lg font-semibold">{funnelData?.conversionRates.checkoutToPurchase}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
