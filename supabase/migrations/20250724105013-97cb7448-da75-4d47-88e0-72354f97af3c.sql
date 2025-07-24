-- Create scorecards table to store all scorecard templates
CREATE TABLE public.scorecards (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR NOT NULL,
  department VARCHAR NOT NULL,
  category VARCHAR,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create scorecard_items table to store individual assessment items
CREATE TABLE public.scorecard_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  scorecard_id UUID NOT NULL REFERENCES public.scorecards(id) ON DELETE CASCADE,
  item_id VARCHAR NOT NULL,
  section_type VARCHAR NOT NULL CHECK (section_type IN ('mandatory', 'general')),
  category VARCHAR,
  description TEXT NOT NULL,
  parent_item_id UUID REFERENCES public.scorecard_items(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.scorecards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scorecard_items ENABLE ROW LEVEL SECURITY;

-- Create policies for scorecards
CREATE POLICY "Anyone can view scorecards" 
ON public.scorecards 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can insert scorecards" 
ON public.scorecards 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update scorecards" 
ON public.scorecards 
FOR UPDATE 
USING (true);

-- Create policies for scorecard_items
CREATE POLICY "Anyone can view scorecard items" 
ON public.scorecard_items 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can insert scorecard items" 
ON public.scorecard_items 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update scorecard items" 
ON public.scorecard_items 
FOR UPDATE 
USING (true);

-- Create trigger for automatic timestamp updates
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_scorecards_updated_at
  BEFORE UPDATE ON public.scorecards
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_scorecard_items_updated_at
  BEFORE UPDATE ON public.scorecard_items
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();