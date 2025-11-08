-- Create gift_leads table for collecting email addresses from gift packages
CREATE TABLE IF NOT EXISTS public.gift_leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  gift_type TEXT NOT NULL,
  completed_prompts INTEGER DEFAULT 0,
  password TEXT,
  source TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_gift_leads_email ON public.gift_leads(email);
CREATE INDEX IF NOT EXISTS idx_gift_leads_created_at ON public.gift_leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_gift_leads_source ON public.gift_leads(source);
CREATE INDEX IF NOT EXISTS idx_gift_leads_password ON public.gift_leads(password);

-- Enable Row Level Security
ALTER TABLE public.gift_leads ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public insert (for gift package form)
CREATE POLICY "Allow public insert for gift leads"
  ON public.gift_leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy to allow authenticated users to view all leads
CREATE POLICY "Allow authenticated users to view gift leads"
  ON public.gift_leads
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policy to allow service role full access
CREATE POLICY "Allow service role full access to gift leads"
  ON public.gift_leads
  FOR ALL
  TO service_role
  USING (true);

-- Add comment to table
COMMENT ON TABLE public.gift_leads IS 'Email leads collected from gift package campaigns';

-- Add comments to columns
COMMENT ON COLUMN public.gift_leads.email IS 'User email address';
COMMENT ON COLUMN public.gift_leads.gift_type IS 'Type of gift selected: efficiency, content, or decision';
COMMENT ON COLUMN public.gift_leads.completed_prompts IS 'Number of prompts completed before email submission';
COMMENT ON COLUMN public.gift_leads.password IS 'Gift package password/code used (e.g., CRUZ2025)';
COMMENT ON COLUMN public.gift_leads.source IS 'Traffic source from config (e.g., fb-ad-jan)';
