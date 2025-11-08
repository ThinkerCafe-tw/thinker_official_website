-- 新增欄位追蹤用戶是否已加 LINE Bot 為好友
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS line_is_friend BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS line_friend_added_at TIMESTAMP WITH TIME ZONE;

COMMENT ON COLUMN profiles.line_is_friend IS '用戶是否已加 LINE Bot 為好友';
COMMENT ON COLUMN profiles.line_friend_added_at IS '加好友的時間';

-- 建立索引
CREATE INDEX IF NOT EXISTS idx_profiles_line_is_friend ON profiles(line_is_friend);
