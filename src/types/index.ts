export type ViewMode =
  | 'profile'
  | 'opportunities'
  | 'intelligence'
  | 'evidence'
  | 'readiness'
  | 'settings';

export interface BusinessProfileData {
  industry: string;
  location: string;
  services: string;
  yearsOfExperience: number | string;
  annualTurnover: string;
  turnoverValueNumeric: number;
  certifications: string;
  companyName: string;
  userName: string;
  email: string;
  cacNumber?: string;
  tinNumber?: string;
  phoneNumber?: string;
}

export type RequirementStatus = 'MATCH' | 'POTENTIAL GAP' | 'UNKNOWN';

export interface RequirementItem {
  id: string;
  category:
    | 'FINANCIAL CAPACITY'
    | 'TECHNICAL & OPERATIONAL'
    | 'STATUTORY & LEGAL'
    | 'ADMINISTRATIVE';
  title: string;
  status: RequirementStatus;
  userProfileText: string;
  verbatimClause: string;
  clauseReference: string;
  gapAnalysisText?: string;
  recommendations?: string[];
  requiredValue?: string;
  userValue?: string;
}

export interface Opportunity {
  id: string;
  refCode: string;
  source: string;
  category: string;
  title: string;
  ministry: string;
  location: string;
  deadline: string;
  closingSoon?: boolean;
  image: string;
  matchesCount: number;
  potentialGapsCount: number;
  toVerifyCount: number;
  requirements: RequirementItem[];
}
