export type ProviderType = 'Central' | 'State' | 'Private' | 'NGO';

export type Category = 'General' | 'OBC' | 'SC' | 'ST' | 'EWS' | 'Minority' | 'Girls' | 'PwD';

export type EducationLevel = 
  | 'Class 9-10' 
  | 'Class 11-12' 
  | 'UG' 
  | 'PG' 
  | 'Diploma' 
  | 'Professional';

export type Gender = 'Any' | 'Female' | 'Male';

export type ApplicationMode = 'Online' | 'Offline' | 'Both';

export interface Scheme {
  id: string;
  name: string;
  hindiName?: string;
  provider: ProviderType;
  providerName: string;
  state: string; // 'All India' or specific state e.g., 'Maharashtra', 'Uttar Pradesh'
  categories: Category[];
  educationLevels: EducationLevel[];
  gender: Gender;
  maxFamilyIncome: number | null; // in INR, null if no limit
  minMarksPercent: number | null; // e.g. 50, 60, null if not applicable
  disabilityRequired: boolean;
  ageMin: number | null;
  ageMax: number | null;
  benefits: string;
  benefitAmountApprox?: number; // for numeric sorting e.g. 50000
  description: string;
  eligibilityText: string;
  documentsRequired: string[];
  applicationMode: ApplicationMode;
  officialLink: string;
  deadline: string | null; // ISO YYYY-MM-DD or null
  tags?: string[];
  featured?: boolean;
}

export interface UserProfile {
  age: number | null;
  gender: Gender;
  educationLevel: EducationLevel | '';
  courseType?: string;
  category: Category | '';
  annualFamilyIncome: number | null;
  state: string;
  isDisability: boolean;
  disabilityPercent?: number;
  marksPercent: number | null;
}

export type EligibilityStatus = 'Eligible' | 'Possibly Eligible' | 'Not Eligible';

export interface CriterionResult {
  label: string;
  passed: boolean;
  neutral?: boolean; // if student didn't provide this info yet
  reason: string;
}

export interface MatchResult {
  scheme: Scheme;
  status: EligibilityStatus;
  score: number; // 0 to 100
  criteriaBreakdown: CriterionResult[];
  matchedReasons: string[];
  failedReasons: string[];
}

export interface FilterState {
  searchQuery: string;
  provider: ProviderType | 'All';
  category: Category | 'All';
  educationLevel: EducationLevel | 'All';
  gender: Gender | 'All';
  state: string;
  maxIncomeFilter: number | null;
  onlyDisability: boolean;
  onlyEligible: boolean;
  sortBy: 'matchScore' | 'deadline' | 'benefits' | 'name';
}
