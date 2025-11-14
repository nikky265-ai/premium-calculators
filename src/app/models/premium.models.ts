export interface CalculatePremiumRequest {
  name: string;
  ageNextBirthday?: number | null;
  dateOfBirth?: string | null; // ISO string (yyyy-MM-dd)
  occupationCode: string;
  deathSumInsured: number;
}

export interface CalculatePremiumResponse {
  monthlyPremium: number;
  ageUsed: number;
  occupation: string;
  ratingFactor: number;
  formula: string;
}
