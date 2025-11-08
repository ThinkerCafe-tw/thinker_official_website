import { NextRequest, NextResponse } from 'next/server';
import { createClient as createAdminClient } from '@supabase/supabase-js';

export async function GET() {
  try {
    console.log('🧪 Testing admin client...');

    // 檢查環境變數
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !key) {
      return NextResponse.json({
        success: false,
        error: 'Missing environment variables',
        details: {
          url: !!url,
          key: !!key
        }
      });
    }

    // 創建 admin client
    const supabaseAdmin = createAdminClient(url, key);

    // 測試簡單查詢
    const { data: orders, error } = await supabaseAdmin
      .from('orders')
      .select('order_id, user_id, course_id, total')
      .order('order_id', { ascending: false })
      .limit(3);

    if (error) {
      return NextResponse.json({
        success: false,
        error: 'Database query failed',
        details: error
      });
    }

    // 測試查詢特定訂單 #57
    const { data: order57, error: order57Error } = await supabaseAdmin
      .from('orders')
      .select('*')
      .eq('order_id', 57)
      .single();

    return NextResponse.json({
      success: true,
      message: 'Admin client working correctly',
      test_results: {
        latest_orders: orders,
        order_57: order57 ? 'Found' : 'Not found',
        order_57_error: order57Error?.message || null
      }
    });

  } catch (error) {
    console.error('Admin test error:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      stack: error.stack
    });
  }
}