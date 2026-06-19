CREATE TABLE public.contact_inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  inquiry_type TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT INSERT ON public.contact_inquiries TO anon;
GRANT SELECT, INSERT ON public.contact_inquiries TO authenticated;
GRANT ALL ON public.contact_inquiries TO service_role;

ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit an inquiry"
ON public.contact_inquiries
FOR INSERT
TO anon, authenticated
WITH CHECK (true);