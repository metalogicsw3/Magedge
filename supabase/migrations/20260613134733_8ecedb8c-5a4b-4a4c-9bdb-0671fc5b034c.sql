CREATE TABLE public.discovery_inquiries (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  resort_name text NOT NULL,
  contact_name text NOT NULL,
  email text NOT NULL,
  phone text,
  location text,
  room_count integer,
  expected_devices integer,
  water_zones text,
  network_readiness text,
  deployment_type text,
  message text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT INSERT ON public.discovery_inquiries TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.discovery_inquiries TO authenticated;
GRANT ALL ON public.discovery_inquiries TO service_role;

ALTER TABLE public.discovery_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a discovery inquiry"
ON public.discovery_inquiries
FOR INSERT
TO anon, authenticated
WITH CHECK (true);