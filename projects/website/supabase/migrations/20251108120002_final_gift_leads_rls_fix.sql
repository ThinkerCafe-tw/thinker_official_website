-- Final Gift Leads RLS Fix
-- This migration completely resets and recreates ALL RLS policies
-- Run this in Supabase Dashboard SQL Editor

-- ============================================
-- Step 1: Disable RLS temporarily
-- ============================================
ALTER TABLE public.gift_leads DISABLE ROW LEVEL SECURITY;

-- ============================================
-- Step 2: Drop ALL existing policies (if any)
-- ============================================
DO $$
DECLARE
    policy_record RECORD;
BEGIN
    FOR policy_record IN
        SELECT policyname
        FROM pg_policies
        WHERE schemaname = 'public'
        AND tablename = 'gift_leads'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.gift_leads', policy_record.policyname);
    END LOOP;
END $$;

-- ============================================
-- Step 3: Re-enable RLS
-- ============================================
ALTER TABLE public.gift_leads ENABLE ROW LEVEL SECURITY;

-- ============================================
-- Step 4: Create fresh policies
-- ============================================

-- Allow anonymous users to INSERT (for gift package form submissions)
CREATE POLICY "gift_leads_anon_insert_policy"
ON public.gift_leads
FOR INSERT
TO anon
WITH CHECK (true);

-- Allow authenticated users to SELECT
CREATE POLICY "gift_leads_auth_select_policy"
ON public.gift_leads
FOR SELECT
TO authenticated
USING (true);

-- Allow service role full access (for admin operations)
CREATE POLICY "gift_leads_service_all_policy"
ON public.gift_leads
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- ============================================
-- Step 5: Grant table-level permissions
-- ============================================
GRANT INSERT ON public.gift_leads TO anon;
GRANT SELECT ON public.gift_leads TO authenticated;
GRANT ALL ON public.gift_leads TO service_role;

-- Also grant usage on the sequence (for ID generation)
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon;

-- ============================================
-- Step 6: Verification
-- ============================================
DO $$
DECLARE
    policy_count INTEGER;
    anon_insert_count INTEGER;
BEGIN
    -- Count total policies
    SELECT COUNT(*) INTO policy_count
    FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'gift_leads';

    -- Count anon INSERT policies
    SELECT COUNT(*) INTO anon_insert_count
    FROM pg_policies
    WHERE schemaname = 'public'
    AND tablename = 'gift_leads'
    AND cmd = 'INSERT'
    AND 'anon' = ANY(roles::text[]);

    RAISE NOTICE '===== VERIFICATION RESULTS =====';
    RAISE NOTICE 'Total policies created: %', policy_count;
    RAISE NOTICE 'Anon INSERT policies: %', anon_insert_count;

    IF policy_count >= 3 AND anon_insert_count >= 1 THEN
        RAISE NOTICE '✅ RLS policies successfully configured!';
    ELSE
        RAISE WARNING '⚠️  Policy count seems incorrect. Expected 3 total, % found', policy_count;
    END IF;

    RAISE NOTICE '================================';
END $$;

-- ============================================
-- Step 7: List all policies (for confirmation)
-- ============================================
SELECT
    policyname AS "Policy Name",
    cmd AS "Command",
    roles AS "Roles"
FROM pg_policies
WHERE schemaname = 'public' AND tablename = 'gift_leads'
ORDER BY policyname;
