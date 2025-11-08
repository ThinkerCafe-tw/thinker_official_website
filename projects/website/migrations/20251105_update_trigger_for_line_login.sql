--
-- Migration: Update Trigger to Support LINE Login
-- Date: 2025-11-05
-- Description: 修改 auth.users 的 trigger，支援 LINE Login 自動建立 profile
--

-- ========================================
-- 1. 建立或替換 handle_new_user Function
-- ========================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
  next_student_id INT;
BEGIN
  -- 取得下一個 student_id（自動遞增）
  SELECT COALESCE(MAX(student_id), 0) + 1
  INTO next_student_id
  FROM public.profiles;

  -- 判斷是 LINE Login 還是 Email Login
  IF NEW.raw_user_meta_data->>'authProvider' = 'line' THEN
    -- LINE Login: 使用 LINE 相關資料
    INSERT INTO public.profiles (
      user_id,
      student_id,
      full_name,
      phone_number,
      line_user_id,
      line_display_name,
      line_picture_url,
      auth_provider,
      migrated_from_email,
      agree_tos,
      created_at
    )
    VALUES (
      NEW.id,
      next_student_id,
      NEW.raw_user_meta_data->>'displayName',
      NULL, -- LINE 用戶沒有 phone_number
      NEW.raw_user_meta_data->>'lineUserId',
      NEW.raw_user_meta_data->>'displayName',
      NEW.raw_user_meta_data->>'pictureUrl',
      'line',
      false,
      true, -- LINE 登入預設同意條款
      NOW()
    );
  ELSE
    -- Email Login: 使用 email metadata
    INSERT INTO public.profiles (
      user_id,
      student_id,
      full_name,
      phone_number,
      line_user_id,
      line_display_name,
      line_picture_url,
      auth_provider,
      migrated_from_email,
      agree_tos,
      created_at
    )
    VALUES (
      NEW.id,
      next_student_id,
      NEW.raw_user_meta_data->>'fullName',
      NEW.raw_user_meta_data->>'phoneNumber',
      NULL,
      NULL,
      NULL,
      'email',
      false,
      (NEW.raw_user_meta_data->>'agreeTos')::boolean,
      NOW()
    );
  END IF;

  RETURN NEW;
END;
$$;

-- ========================================
-- 2. 建立 Trigger (如果不存在)
-- ========================================

-- 先刪除舊的 trigger（如果存在）
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- 建立新的 trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ========================================
-- 3. 加入註解
-- ========================================

COMMENT ON FUNCTION public.handle_new_user() IS '
自動建立 profile 當新用戶註冊時。
支援兩種登入方式：
1. LINE Login (authProvider = line)
2. Email Login (authProvider = email)
';

-- ========================================
-- 4. 測試 Trigger
-- ========================================

-- 可以手動測試（不要在 production 執行）
--
-- -- 測試 LINE Login
-- INSERT INTO auth.users (
--   id,
--   email,
--   raw_user_meta_data
-- ) VALUES (
--   gen_random_uuid(),
--   'test_line@line.thinker.cafe',
--   '{"authProvider": "line", "lineUserId": "U_TEST_123", "displayName": "Test LINE User", "pictureUrl": "https://example.com/pic.jpg"}'::jsonb
-- );
--
-- -- 測試 Email Login
-- INSERT INTO auth.users (
--   id,
--   email,
--   raw_user_meta_data
-- ) VALUES (
--   gen_random_uuid(),
--   'test@example.com',
--   '{"authProvider": "email", "fullName": "Test Email User", "phoneNumber": "0912345678", "agreeTos": true}'::jsonb
-- );

-- ========================================
-- 5. 驗證
-- ========================================

-- 檢查 function 是否建立成功
SELECT routine_name, routine_definition
FROM information_schema.routines
WHERE routine_schema = 'public'
AND routine_name = 'handle_new_user';

-- 檢查 trigger 是否建立成功
SELECT trigger_name, event_object_table, action_statement
FROM information_schema.triggers
WHERE trigger_name = 'on_auth_user_created';
