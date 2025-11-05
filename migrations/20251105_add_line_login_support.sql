--
-- Migration: Add LINE Login Support
-- Date: 2025-11-05
-- Description: 新增 LINE Login 相關欄位到 profiles 資料表
--

-- ========================================
-- 1. 新增 LINE 相關欄位
-- ========================================

ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS line_user_id VARCHAR(255) UNIQUE,
ADD COLUMN IF NOT EXISTS line_display_name VARCHAR(255),
ADD COLUMN IF NOT EXISTS line_picture_url TEXT,
ADD COLUMN IF NOT EXISTS auth_provider VARCHAR(20) DEFAULT 'email',
ADD COLUMN IF NOT EXISTS migrated_from_email BOOLEAN DEFAULT false;

-- ========================================
-- 2. 欄位註解
-- ========================================

COMMENT ON COLUMN profiles.line_user_id IS 'LINE User ID (唯一識別)';
COMMENT ON COLUMN profiles.line_display_name IS 'LINE 顯示名稱';
COMMENT ON COLUMN profiles.line_picture_url IS 'LINE 大頭貼 URL';
COMMENT ON COLUMN profiles.auth_provider IS '登入方式: email 或 line';
COMMENT ON COLUMN profiles.migrated_from_email IS '是否從 Email 帳號遷移而來';

-- ========================================
-- 3. 建立索引
-- ========================================

CREATE INDEX IF NOT EXISTS idx_profiles_line_user_id ON profiles(line_user_id);
CREATE INDEX IF NOT EXISTS idx_profiles_auth_provider ON profiles(auth_provider);

-- ========================================
-- 4. 更新現有用戶的 auth_provider
-- ========================================

-- 將現有用戶標記為 email 登入方式
UPDATE profiles
SET auth_provider = 'email'
WHERE auth_provider IS NULL AND email IS NOT NULL;

-- ========================================
-- 5. RLS (Row Level Security) 政策調整
-- ========================================

-- 檢查現有政策
-- SELECT * FROM pg_policies WHERE tablename = 'profiles';

-- 確保 LINE 登入用戶也能存取自己的資料
-- (現有的 RLS 政策應該已經使用 user_id，所以不需要額外調整)

-- ========================================
-- 6. 驗證
-- ========================================

-- 檢查欄位是否新增成功
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'profiles'
AND column_name IN ('line_user_id', 'line_display_name', 'line_picture_url', 'auth_provider', 'migrated_from_email');

-- 檢查索引是否建立成功
SELECT indexname, indexdef
FROM pg_indexes
WHERE tablename = 'profiles'
AND indexname LIKE '%line%';
