import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({
        error: 'Missing userId parameter'
      }, { status: 400 });
    }

    const supabase = await createClient();

    // 查詢用戶的最新訂單
    const { data: orders, error } = await supabase
      .from('orders')
      .select('order_id, created_at, course_id, total, course_variant')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(5);

    if (error) {
      return NextResponse.json({
        error: 'Database error',
        details: error
      }, { status: 500 });
    }

    return NextResponse.json({
      userId,
      orders: orders || [],
      latestOrder: orders?.[0] || null
    });

  } catch (error) {
    console.error('Debug latest-order error:', error);
    return NextResponse.json({
      error: 'Internal server error',
      details: error.message
    }, { status: 500 });
  }
}