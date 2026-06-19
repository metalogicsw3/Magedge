CREATE TABLE public.resort_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  resort_name TEXT NOT NULL,
  contact_name TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  occupancy INTEGER,
  fee_per_guest_night NUMERIC,
  total_rooms INTEGER,
  total_capacity INTEGER,
  estimated_annual_revenue NUMERIC,
  room_types JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
GRANT ALL ON public.resort_leads TO service_role;
ALTER TABLE public.resort_leads ENABLE ROW LEVEL SECURITY;