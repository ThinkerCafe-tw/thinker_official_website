import { NextRequest, NextResponse } from 'next/server';
import { createClient as createAdminClient } from '@supabase/supabase-js';

export async function GET() {
  try {
    console.log('🔍 Testing Supabase admin connection...');

    // 檢查環境變數
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    const envCheck = {
      supabaseUrl: supabaseUrl ? `${supabaseUrl.substring(0, 20)}...` : 'MISSING',
      serviceRoleKey: serviceRoleKey ? 'Present' : 'MISSING'
    };

    console.log('Environment variables:', envCheck);

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json({
        error: 'Missing environment variables',
        envCheck
      }, { status: 500 });
    }

    // 創建 admin client
    const supabaseAdmin = createAdminClient(supabaseUrl, serviceRoleKey);

    // 測試基本連接
    const { data: testQuery, error: testError } = await supabaseAdmin
      .from('orders')
      .select('count')
      .limit(1);

    if (testError) {
      console.error('Test query failed:', testError);
      return NextResponse.json({
        error: 'Admin client connection failed',
        details: testError,
        envCheck
      }, { status: 500 });
    }

    // 查詢訂單 #57
    const { data: order57, error: order57Error } = await supabaseAdmin
      .from('orders')
      .select('order_id, user_id, created_at, course_id, total')
      .eq('order_id', 57);

    console.log('Order 57 query result:', { data: order57, error: order57Error });

    // 查詢最近的 3 個訂單
    const { data: recentOrders, error: recentError } = await supabaseAdmin
      .from('orders')
      .select('order_id, user_id, created_at')
      .order('created_at', { ascending: false })
      .limit(3);

    console.log('Recent orders:', { data: recentOrders, error: recentError });

    return NextResponse.json({
      success: true,
      envCheck,
      tests: {
        adminConnection: testError ? 'FAILED' : 'SUCCESS',
        order57: {
          found: order57?.length > 0,
          data: order57,
          error: order57Error
        },
        recentOrders: {
          count: recentOrders?.length || 0,
          data: recentOrders,
          error: recentError
        }
      }
    });

  } catch (error) {
    console.error('Supabase test failed:', error);
    return NextResponse.json({
      error: 'Test failed',
      details: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}