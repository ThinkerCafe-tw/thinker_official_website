-- Fix Row Level Security policies for gift_leads table
-- This migration fixes the RLS policies to allow public insert

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Allow public insert for gift leads" ON public.gift_leads;
DROP POLICY IF EXISTS "Allow authenticated users to view gift leads" ON public.gift_leads;
DROP POLICY IF EXISTS "Allow service role full access to gift leads" ON public.gift_leads;

-- Ensure RLS is enabled
ALTER TABLE public.gift_leads ENABLE ROW LEVEL SECURITY;

-- Recreate policy to allow public insert (for gift package form submissions)
-- Using 'public' role instead of 'anon' to ensure compatibility
CREATE POLICY "gift_leads_public_insert"
  ON public.gift_leads
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Also allow anon role for insert
CREATE POLICY "gift_leads_anon_insert"
  ON public.gift_leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users to view all leads
CREATE POLICY "gift_leads_authenticated_select"
  ON public.gift_leads
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow service role full access
CREATE POLICY "gift_leads_service_role_all"
  ON public.gift_leads
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Grant necessary permissions
GRANT INSERT ON public.gift_leads TO anon;
GRANT INSERT ON public.gift_leads TO public;
GRANT SELECT ON public.gift_leads TO authenticated;
GRANT ALL ON public.gift_leads TO service_role;

-- Verify the policies are created
DO $$
BEGIN
  RAISE NOTICE 'RLS policies for gift_leads have been updated';
  RAISE NOTICE 'Policies created:';
  RAISE NOTICE '  - gift_leads_public_insert (INSERT for public)';
  RAISE NOTICE '  - gift_leads_anon_insert (INSERT for anon)';
  RAISE NOTICE '  - gift_leads_authenticated_select (SELECT for authenticated)';
  RAISE NOTICE '  - gift_leads_service_role_all (ALL for service_role)';
END $$;
