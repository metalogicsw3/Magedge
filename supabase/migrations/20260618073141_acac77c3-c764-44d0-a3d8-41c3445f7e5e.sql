-- Explicitly deny public/authenticated read access to contact form submissions
CREATE POLICY "No public read access to contact inquiries"
ON public.contact_inquiries
FOR SELECT
TO anon, authenticated
USING (false);

-- Explicitly deny public/authenticated read access to discovery inquiries
CREATE POLICY "No public read access to discovery inquiries"
ON public.discovery_inquiries
FOR SELECT
TO anon, authenticated
USING (false);