import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

console.log('='.repeat(70));
console.log('🧪 測試 Database Trigger');
console.log('='.repeat(70));

async function testTrigger() {
  try {
    console.log('\n📋 1. 檢查 Function 是否存在');

    const { data: functions, error: funcError } = await supabase
      .from('information_schema.routines')
      .select('routine_name')
      .eq('routine_schema', 'public')
      .eq('routine_name', 'handle_new_user');

    if (funcError) {
      console.log('⚠️  無法查詢 functions (可能需要從 Dashboard 檢查)');
    } else {
      console.log('✅ Function 查詢成功:', functions);
    }

    console.log('\n📋 2. 檢查 Trigger 是否存在');

    const { data: triggers, error: trigError } = await supabase
      .from('information_schema.triggers')
      .select('trigger_name')
      .eq('trigger_name', 'on_auth_user_created');

    if (trigError) {
      console.log('⚠️  無法查詢 triggers (可能需要從 Dashboard 檢查)');
    } else {
      console.log('✅ Trigger 查詢成功:', triggers);
    }

    console.log('\n📋 3. 查看最新的 profiles 記錄');

    const { data: profiles, error: profileError } = await supabase
      .from('profiles')
      .select('user_id, student_id, full_name, phone_number, line_user_id, auth_provider, created_at')
      .order('created_at', { ascending: false })
      .limit(5);

    if (profileError) {
      console.error('❌ 查詢 profiles 失敗:', profileError);
    } else {
      console.log('✅ 最新 5 筆 profiles:');
      console.table(profiles);
    }

    console.log('\n' + '='.repeat(70));
    console.log('📊 檢查結果');
    console.log('='.repeat(70));
    console.log(`
📝 下一步：

1. 如果 Function/Trigger 不存在，請執行 Migration:
   檔案: migrations/20251105_update_trigger_for_line_login.sql

2. 執行 Migration 後，可以透過以下方式測試:

   方法 A: 實際測試 LINE Login
   - 開啟 /line-login 頁面
   - 完成 LINE 登入流程
   - 檢查 profiles 是否自動建立

   方法 B: 手動在 Database 建立測試用戶
   - 參考 docs/TRIGGER_MIGRATION_GUIDE.md
   - 執行測試 SQL

3. 驗證:
   - 檢查新 profile 的 auth_provider 欄位
   - LINE 用戶應該有 line_user_id
   - Email 用戶應該有 phone_number
`);

  } catch (error) {
    console.error('❌ 測試過程發生錯誤:', error);
  }
}

testTrigger();
