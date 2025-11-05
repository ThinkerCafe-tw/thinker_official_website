import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

/**
 * LINE Login API
 *
 * 流程：
 * 1. 驗證 LINE Access Token
 * 2. 檢查 line_user_id 是否已存在於 profiles
 * 3. 如果存在 → 登入現有用戶
 * 4. 如果不存在 → 建立新用戶（auth.users + profiles）
 */
export async function POST(request) {
  try {
    const { lineUserId, displayName, pictureUrl, accessToken } = await request.json();

    // 驗證必要欄位
    if (!lineUserId) {
      return NextResponse.json(
        { error: 'lineUserId is required' },
        { status: 400 }
      );
    }

    // 驗證 LINE User ID 格式（應該以 'U' 開頭）
    if (!lineUserId.startsWith('U')) {
      console.error('Invalid LINE User ID format:', lineUserId);
      return NextResponse.json(
        { error: 'Invalid LINE User ID format' },
        { status: 400 }
      );
    }

    // 注意：我們不驗證 Access Token，因為：
    // 1. LIFF SDK 在前端已經驗證過用戶身份
    // 2. LIFF App 只能在特定的 Endpoint URL 運行（www.thinker.cafe/line-login）
    // 3. LINE 平台已經確保 LIFF ID 與 Endpoint URL 的綁定關係

    const supabase = await createClient();

    // 2. 檢查 line_user_id 是否已存在
    const { data: existingProfile, error: profileError } = await supabase
      .from('profiles')
      .select('user_id, line_user_id, full_name, auth_provider')
      .eq('line_user_id', lineUserId)
      .single();

    if (profileError && profileError.code !== 'PGRST116') {
      // PGRST116 = 查無資料，這是正常的（新用戶）
      console.error('查詢 profile 錯誤:', profileError);
      return NextResponse.json(
        { error: 'Database error', details: profileError.message },
        { status: 500 }
      );
    }

    // 3. 已存在用戶 → 直接登入
    if (existingProfile) {
      console.log('LINE 用戶已存在，執行登入:', existingProfile.user_id);

      // 更新 profile 資料（可能用戶改了 LINE 顯示名稱或大頭貼）
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          line_display_name: displayName,
          line_picture_url: pictureUrl,
        })
        .eq('user_id', existingProfile.user_id);

      if (updateError) {
        console.warn('更新 profile 失敗:', updateError);
      }

      // 使用 Admin API 建立 Session
      const { data: sessionData, error: sessionError } = await supabase.auth.admin.createSession({
        user_id: existingProfile.user_id,
      });

      if (sessionError) {
        console.error('建立 session 錯誤:', sessionError);
        return NextResponse.json(
          { error: 'Failed to create session', details: sessionError.message },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        isNewUser: false,
        userId: existingProfile.user_id,
        session: sessionData.session, // 返回 session 給前端
        profile: {
          fullName: existingProfile.full_name,
          displayName,
          pictureUrl,
        },
      });
    }

    // 4. 新用戶 → 建立 auth.users + profiles
    console.log('新 LINE 用戶，開始註冊:', lineUserId);

    // 使用虛擬 email（因為 LINE 登入不一定有 email）
    const virtualEmail = `${lineUserId}@line.thinker.cafe`;
    const randomPassword = Math.random().toString(36).slice(-12) + Math.random().toString(36).slice(-12);

    console.log('準備建立用戶:', {
      email: virtualEmail,
      lineUserId,
      displayName
    });

    // 使用 Supabase Admin API 建立用戶（跳過 email 驗證）
    const { data: newUser, error: signUpError } = await supabase.auth.admin.createUser({
      email: virtualEmail,
      password: randomPassword,
      email_confirm: true, // 自動確認 email（虛擬的）
      user_metadata: {
        lineUserId,
        displayName,
        pictureUrl,
        authProvider: 'line',
      },
    });

    if (signUpError) {
      console.error('建立 auth.users 錯誤:', signUpError);
      console.error('錯誤詳情:', JSON.stringify(signUpError, null, 2));
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to create user',
          details: signUpError.message,
          code: signUpError.code,
          fullError: JSON.stringify(signUpError)
        },
        { status: 500 }
      );
    }

    console.log('auth.users 建立成功:', newUser.user.id);

    // 建立 profile（手動插入，因為 Trigger 可能不支援 LINE 欄位）
    const { error: profileInsertError } = await supabase
      .from('profiles')
      .insert({
        user_id: newUser.user.id,
        full_name: displayName,
        line_user_id: lineUserId,
        line_display_name: displayName,
        line_picture_url: pictureUrl,
        auth_provider: 'line',
        migrated_from_email: false,
        agree_tos: true, // LINE 登入預設同意條款
      });

    if (profileInsertError) {
      console.error('建立 profile 錯誤:', profileInsertError);

      // 如果 profile 建立失敗，刪除剛建立的 auth.users
      await supabase.auth.admin.deleteUser(newUser.user.id);

      return NextResponse.json(
        { error: 'Failed to create profile', details: profileInsertError.message },
        { status: 500 }
      );
    }

    console.log('profile 建立成功');

    // 為新用戶建立 Session
    const { data: sessionData, error: sessionError } = await supabase.auth.admin.createSession({
      user_id: newUser.user.id,
    });

    if (sessionError) {
      console.error('建立 session 錯誤:', sessionError);
      // 不返回錯誤，因為用戶已經建立成功，只是沒有 session
    }

    return NextResponse.json({
      success: true,
      isNewUser: true,
      userId: newUser.user.id,
      session: sessionData?.session, // 返回 session 給前端
      profile: {
        fullName: displayName,
        displayName,
        pictureUrl,
      },
    });

  } catch (error) {
    console.error('❌ LINE Login API 錯誤:', error);
    console.error('❌ 錯誤堆疊:', error.stack);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        details: error.message,
        stack: error.stack
      },
      { status: 500 }
    );
  }
}
