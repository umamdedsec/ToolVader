export const experienceMultipliers: Record<string, number> = {
  beginner: 0.8,
  intermediate: 1.0,
  advanced: 1.35,
  expert: 1.8
};

export const clientTypeMultipliers: Record<string, number> = {
  startup: 0.9,
  "small business": 1.0,
  agency: 1.1,
  enterprise: 1.4,
  "direct consumer": 1.0
};

export interface CalculationInput {
  baseRate: number;
  demandScore: number;
  experienceLevel: string;
  clientType: string;
  localMultiplier: number;
  clientMultiplier: number;
  monthlyExpenses: number;
  weeklyHours: number;
  billablePercentage: number;
}

export interface CalculationResult {
  recommendedRate: number;
  localMarketRate: number;
  clientMarketRate: number;
  premiumRate: number;
  monthlyRevenueRecommended: number;
  monthlyRevenuePremium: number;
}

export function calculateFreelanceRate(input: CalculationInput): CalculationResult {
  const expMult = experienceMultipliers[input.experienceLevel] || 1.0;
  const clientMult = clientTypeMultipliers[input.clientType] || 1.0;

  // Formula 1: Global Rate
  const globalRate = input.baseRate * expMult * clientMult * input.demandScore;

  // Expense Adjustment
  // Total monthly hours = weekly * 4.33
  // Billable hours = total * percentage
  const totalMonthlyHours = input.weeklyHours * 4.33;
  const billableMonthlyHours = totalMonthlyHours * (input.billablePercentage / 100);
  
  const expenseHourlyAdjustment = billableMonthlyHours > 0 
    ? input.monthlyExpenses / billableMonthlyHours 
    : 0;

  const adjustedGlobalRate = globalRate + expenseHourlyAdjustment;

  // Formula 2: Local Market Rate
  const localMarketRate = adjustedGlobalRate * input.localMultiplier;

  // Formula 3: Client Market Rate
  const clientMarketRate = adjustedGlobalRate * input.clientMultiplier;

  // Formula 4: Recommended Rate
  const recommendedRate = (localMarketRate + clientMarketRate) / 2;

  // Formula 5: Premium Rate
  const premiumRate = recommendedRate * 1.3;

  // Monthly Revenue Formula: hourlyRate × weeklyHours × 4.33 × (billablePercentage / 100)
  const monthlyRevenueRecommended = recommendedRate * billableMonthlyHours;
  const monthlyRevenuePremium = premiumRate * billableMonthlyHours;

  return {
    recommendedRate: Number(recommendedRate.toFixed(2)),
    localMarketRate: Number(localMarketRate.toFixed(2)),
    clientMarketRate: Number(clientMarketRate.toFixed(2)),
    premiumRate: Number(premiumRate.toFixed(2)),
    monthlyRevenueRecommended: Number(monthlyRevenueRecommended.toFixed(2)),
    monthlyRevenuePremium: Number(monthlyRevenuePremium.toFixed(2))
  };
}
