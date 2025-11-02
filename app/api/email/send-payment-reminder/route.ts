import { NextRequest, NextResponse } from 'next/server';
import { resend, FROM } from '@/lib/email/resend';
import PaymentReminderEmail from '@/lib/email/templates/PaymentReminder';
import { createClient } from '@/utils/supabase/server';
import { createClient as createAdminClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  try {
    const { orderId } = await request.json();

    if (!orderId) {
      return NextResponse.json(
        { success: false, message: 'Missing orderId' },
        { status: 400 }
      );
    }

    // 查詢訂單資料
    const supabase = await createClient();

    // 1. 查詢訂單
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('order_id', orderId)
      .single();

    if (orderError || !order) {
      console.error('Order not found:', orderError);
      return NextResponse.json(
        { success: false, message: 'Order not found' },
        { status: 404 }
      );
    }

    // 2. 查詢用戶資料（從 profiles 和 auth）
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', order.user_id)
      .single();

    if (profileError || !profile) {
      console.error('Profile not found:', profileError);
      return NextResponse.json(
        { success: false, message: 'Profile not found' },
        { status: 404 }
      );
    }

    // 3. 取得用戶 Email（從 auth.users，使用 admin client）
    const supabaseAdmin = createAdminClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: { user }, error: userError } = await supabaseAdmin.auth.admin.getUserById(order.user_id);

    if (userError || !user || !user.email) {
      console.error('User email not found:', userError);
      return NextResponse.json(
        { success: false, message: 'User email not found' },
        { status: 404 }
      );
    }

    // 4. 查詢課程資料（從 Notion API）
    const { getProducts } = await import('@/lib/notion');
    const courses = await getProducts();
    const course = courses.find((c: any) => c.course_id === order.course_id);

    if (!course) {
      console.error('Course not found');
      return NextResponse.json(
        { success: false, message: 'Course not found' },
        { status: 404 }
      );
    }

    // 計算繳費期限
    const createdAt = new Date(order.created_at);
    const expiresAt = createdAt.getTime() + 24 * 60 * 60 * 1000;

    // 5. 格式化課程名稱
    const { parseCourseName } = await import('@/utils/course');
    const formattedCourseName = parseCourseName(course);

    // 發送 Email
    const { data, error } = await resend.emails.send({
      from: FROM,
      to: user.email,
      subject: `【思考者咖啡】您的報名序號 #${orderId}，請完成繳費`,
      react: PaymentReminderEmail({
        studentName: profile.name || '學員',
        orderID: String(orderId),
        courseName: formattedCourseName,
        amount: order.total,
        expiresAt: expiresAt,
        paymentURL: `${process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://thinker.cafe'}/order/${orderId}`,
      }),
    });

    if (error) {
      console.error('Failed to send email:', error);
      return NextResponse.json(
        { success: false, message: 'Failed to send email', error },
        { status: 500 }
      );
    }

    console.log('✅ Payment reminder email sent:', data);

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
      emailId: data?.id,
    });
  } catch (error) {
    console.error('Error sending payment reminder:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
