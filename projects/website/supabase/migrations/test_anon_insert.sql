-- Test if anon role can actually insert
-- Run this in Supabase SQL Editor

-- First, let's see what the actual policy looks like
SELECT
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual as "USING clause",
    with_check as "WITH CHECK clause"
FROM pg_policies
WHERE tablename = 'gift_leads'
AND schemaname = 'public';

-- Check table owner
SELECT tableowner
FROM pg_tables
WHERE tablename = 'gift_leads'
AND schemaname = 'public';

-- Check grants
SELECT
    grantee,
    string_agg(privilege_type, ', ') as privileges
FROM information_schema.table_privileges
WHERE table_schema = 'public'
AND table_name = 'gift_leads'
GROUP BY grantee
ORDER BY grantee;

-- Try to simulate anon insert (this won't work from SQL Editor but shows intent)
-- In SQL Editor, we run as postgres superuser, but this shows the structure

SET ROLE anon;  -- This might fail if not allowed
INSERT INTO public.gift_leads (email, gift_type, completed_prompts, password, source)
VALUES ('test@example.com', 'efficiency', 1, 'TEST', 'sql-test');
RESET ROLE;

-- If above fails, check if the role exists
SELECT rolname, rolcanlogin FROM pg_roles WHERE rolname = 'anon';
