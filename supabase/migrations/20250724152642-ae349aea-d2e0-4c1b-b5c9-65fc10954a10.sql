-- Create audit_results table for storing completed scorecards
CREATE TABLE public.audit_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id UUID NOT NULL,
  auditor_name TEXT NOT NULL,
  scorecard_id UUID NOT NULL,
  audit_date DATE NOT NULL DEFAULT CURRENT_DATE,
  overall_score DECIMAL(5,2) NOT NULL DEFAULT 0,
  mandatory_score DECIMAL(5,2) NOT NULL DEFAULT 0,
  procedural_score DECIMAL(5,2) NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'completed', 'reviewed')),
  auditor_comments TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create audit_item_scores table for storing individual item scores
CREATE TABLE public.audit_item_scores (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  audit_result_id UUID NOT NULL REFERENCES public.audit_results(id) ON DELETE CASCADE,
  scorecard_item_id UUID NOT NULL,
  score TEXT NOT NULL CHECK (score IN ('pass', 'fail', 'na')),
  item_comments TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(audit_result_id, scorecard_item_id)
);

-- Enable Row Level Security
ALTER TABLE public.audit_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_item_scores ENABLE ROW LEVEL SECURITY;

-- Create policies for audit_results
CREATE POLICY "Anyone can view audit results" 
ON public.audit_results 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can insert audit results" 
ON public.audit_results 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update audit results" 
ON public.audit_results 
FOR UPDATE 
USING (true);

-- Create policies for audit_item_scores
CREATE POLICY "Anyone can view audit item scores" 
ON public.audit_item_scores 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can insert audit item scores" 
ON public.audit_item_scores 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update audit item scores" 
ON public.audit_item_scores 
FOR UPDATE 
USING (true);

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_audit_results_updated_at
BEFORE UPDATE ON public.audit_results
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_audit_item_scores_updated_at
BEFORE UPDATE ON public.audit_item_scores
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();