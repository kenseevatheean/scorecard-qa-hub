
export interface ScorecardItem {
  id: string;
  category: string;
  description: string;
  score: 'pass' | 'fail' | 'na' | null;
  subItems?: ScorecardItem[];
}

export interface GeneralItem {
  id: string;
  description: string;
  score: 'pass' | 'fail' | 'na' | null;
  subItems?: string[];
}

export interface DepartmentScorecard {
  id: string;
  name: string;
  sections: {
    mandatory: ScorecardItem[];
    general: GeneralItem[];
  };
}
