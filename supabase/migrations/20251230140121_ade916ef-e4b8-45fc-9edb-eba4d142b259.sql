-- Create visitors table for tracking page visits
CREATE TABLE public.visitors (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    page_path TEXT NOT NULL DEFAULT '/',
    referrer TEXT,
    user_agent TEXT,
    ip_address TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create whatsapp_clicks table for tracking WhatsApp button clicks
CREATE TABLE public.whatsapp_clicks (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    button_location TEXT NOT NULL,
    page_path TEXT NOT NULL DEFAULT '/',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create contact_queries table for form submissions
CREATE TABLE public.contact_queries (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    project_type TEXT NOT NULL,
    education_level TEXT NOT NULL,
    field_of_study TEXT,
    deadline TEXT,
    message TEXT,
    status TEXT NOT NULL DEFAULT 'new',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create admin_users table for simple admin authentication
CREATE TABLE public.admin_users (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.visitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.whatsapp_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_queries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Public insert policies for tracking (anyone can insert)
CREATE POLICY "Anyone can insert visitors" ON public.visitors FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can insert whatsapp clicks" ON public.whatsapp_clicks FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can insert contact queries" ON public.contact_queries FOR INSERT WITH CHECK (true);

-- Public select policies for admin to view data (we'll handle admin auth in the app)
CREATE POLICY "Anyone can read visitors" ON public.visitors FOR SELECT USING (true);
CREATE POLICY "Anyone can read whatsapp clicks" ON public.whatsapp_clicks FOR SELECT USING (true);
CREATE POLICY "Anyone can read contact queries" ON public.contact_queries FOR SELECT USING (true);
CREATE POLICY "Anyone can read admin users" ON public.admin_users FOR SELECT USING (true);

-- Insert default admin user (password: adminadmin - in production use proper hashing)
INSERT INTO public.admin_users (username, password_hash) VALUES ('admin', 'adminadmin');

-- Enable realtime for all tracking tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.visitors;
ALTER PUBLICATION supabase_realtime ADD TABLE public.whatsapp_clicks;
ALTER PUBLICATION supabase_realtime ADD TABLE public.contact_queries;