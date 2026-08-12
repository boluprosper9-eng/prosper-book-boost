CREATE TABLE public.book_promotion_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  author_name TEXT NOT NULL,
  email TEXT NOT NULL,
  book_title TEXT NOT NULL,
  genre TEXT NOT NULL,
  goodreads_url TEXT NOT NULL,
  amazon_url TEXT,
  book_description TEXT NOT NULL,
  promotion_goal TEXT NOT NULL,
  selected_service TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT INSERT ON public.book_promotion_requests TO anon, authenticated;
GRANT ALL ON public.book_promotion_requests TO service_role;

ALTER TABLE public.book_promotion_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a promotion request"
ON public.book_promotion_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (true);