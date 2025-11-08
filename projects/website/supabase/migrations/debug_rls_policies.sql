-- Debug RLS Policies for gift_leads table
-- Run this in Supabase SQL Editor to see the actual policy details

-- 1. Check if table exists and RLS is enabled
SELECT
    schemaname,
    tablename,
    tableowner,
    rowsecurity as "RLS Enabled"
FROM pg_tables
WHERE tablename = 'gift_leads';

-- 2. Show all policies with full details
SELECT
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual as "USING expression",
    with_check as "WITH CHECK expression"
FROM pg_policies
WHERE tablename = 'gift_leads';

-- 3. Check table privileges
SELECT
    grantee,
    privilege_type
FROM information_schema.table_privileges
WHERE table_schema = 'public'
AND table_name = 'gift_leads'
ORDER BY grantee, privilege_type;

-- 4. Check if anon role exists and has proper setup
SELECT rolname, rolsuper, rolinherit, rolcreaterole, rolcreatedb
FROM pg_roles
WHERE rolname IN ('anon', 'authenticated', 'service_role');

-- 5. Try a manual test insert as anon (this will fail but shows the error)
-- Note: This won't work from SQL Editor as it runs as postgres superuser
-- But it shows what the policy looks like
SELECT
    'Anon role has INSERT grant: ' ||
    CASE WHEN EXISTS (
        SELECT 1 FROM information_schema.table_privileges
        WHERE table_name = 'gift_leads'
        AND grantee = 'anon'
        AND privilege_type = 'INSERT'
    ) THEN 'YES' ELSE 'NO' END as status;
