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

export interface RetainerInput {
  desiredIncome: number;
  monthlyExpenses: number;
  activeClients: number;
  hoursPerClient: number;
  profitBufferPercent: number;
}

export interface RetainerResult {
  recommendedRetainer: number;
  annualRevenue: number;
  hourlyEquivalent: number;
  profitBufferAmount: number;
}

export function calculateRetainerRate(input: RetainerInput): RetainerResult {
  const { desiredIncome, monthlyExpenses, activeClients, hoursPerClient, profitBufferPercent } = input;

  if (activeClients <= 0) {
    return { recommendedRetainer: 0, annualRevenue: 0, hourlyEquivalent: 0, profitBufferAmount: 0 };
  }

  // 1. Calculate annual costs
  const annualExpenses = monthlyExpenses * 12;
  const baselineAnnualRevenue = desiredIncome + annualExpenses;

  // 2. Add profit buffer
  const totalProfitBuffer = baselineAnnualRevenue * (profitBufferPercent / 100);
  const targetAnnualRevenue = baselineAnnualRevenue + totalProfitBuffer;

  // 3. Convert to monthly totals
  const targetMonthlyRevenue = targetAnnualRevenue / 12;

  // 4. Calculate client specific metrics
  const recommendedRetainer = targetMonthlyRevenue / activeClients;
  
  // Profit buffer portion per client per month
  const monthlyProfitBufferPerClient = (totalProfitBuffer / 12) / activeClients;

  // 5. Hourly equivalent rate per client
  const hourlyEquivalent = hoursPerClient > 0 ? recommendedRetainer / hoursPerClient : 0;

  return {
    recommendedRetainer: Number(recommendedRetainer.toFixed(2)),
    annualRevenue: Number(targetAnnualRevenue.toFixed(2)),
    hourlyEquivalent: Number(hourlyEquivalent.toFixed(2)),
    profitBufferAmount: Number(monthlyProfitBufferPerClient.toFixed(2))
  };
}

export interface ValuePricingInput {
  valueGenerated: number;
  revenueIncreasePercent: number;
  clientAnnualRevenue: number;
  confidenceLevel: number;
  valueCapturePercent: number;
  projectHours: number;
}

export interface ValuePricingResult {
  recommendedPrice: number;
  lowPriceRange: number;
  highPriceRange: number;
  hourlyEquivalent: number;
  clientRoi: number;
  grossValue: number;
  riskAdjustedValue: number;
}

export function calculateValuePricing(input: ValuePricingInput): ValuePricingResult {
  const { 
    valueGenerated, 
    revenueIncreasePercent, 
    clientAnnualRevenue, 
    confidenceLevel, 
    valueCapturePercent, 
    projectHours 
  } = input;

  // 1. Calculate Gross Business Value
  const calculatedRevIncrease = clientAnnualRevenue * (revenueIncreasePercent / 100);
  const grossValue = valueGenerated + calculatedRevIncrease;

  // 2. Adjust for Project Confidence/Risk
  const riskAdjustedValue = grossValue * (confidenceLevel / 100);

  // 3. Calculate capture prices
  const recommendedPrice = riskAdjustedValue * (valueCapturePercent / 100);

  // Range bounds (Low capture = Recommended * 0.7, High capture = Recommended * 1.3)
  const lowPriceRange = recommendedPrice * 0.7;
  const highPriceRange = recommendedPrice * 1.3;

  // 4. Hourly Equivalent Rate
  const hourlyEquivalent = projectHours > 0 ? recommendedPrice / projectHours : 0;

  // 5. Client ROI
  const netClientValue = riskAdjustedValue - recommendedPrice;
  const clientRoi = recommendedPrice > 0 ? (netClientValue / recommendedPrice) * 100 : 0;

  return {
    recommendedPrice: Number(recommendedPrice.toFixed(2)),
    lowPriceRange: Number(lowPriceRange.toFixed(2)),
    highPriceRange: Number(highPriceRange.toFixed(2)),
    hourlyEquivalent: Number(hourlyEquivalent.toFixed(2)),
    clientRoi: Number(clientRoi.toFixed(2)),
    grossValue: Number(grossValue.toFixed(2)),
    riskAdjustedValue: Number(riskAdjustedValue.toFixed(2))
  };
}

export interface LtvInput {
  arpu: number;
  margin: number;
  lifespan: number;
  cac: number;
}

export interface LtvResult {
  ltv: number;
  netLtv: number;
  ltvToCacRatio: number;
  profitabilityScore: number;
  profitabilityStatus: string;
}

export function calculateLtv(input: LtvInput): LtvResult {
  const { arpu, margin, lifespan, cac } = input;

  // 1. LTV = ARPU * Lifespan * Margin %
  const ltv = arpu * lifespan * (margin / 100);

  // 2. Net LTV = LTV - CAC
  const netLtv = ltv - cac;

  // 3. LTV:CAC Ratio
  const ltvToCacRatio = cac > 0 ? ltv / cac : 0;

  // 4. Customer Profitability Score (0-100)
  // Benchmark logic: LTV:CAC Ratio = 4 (or more) with high gross margin gets closer to 100
  // Score = Math.min(100, Math.round((Ratio * 25) * (Margin / 100)))
  // If CAC is 0, we can define ratio as if CAC is 1, or score based on margin and ARPU
  const ratioForScore = cac > 0 ? ltvToCacRatio : 4; // default to a healthy ratio multiplier if CAC is 0
  const profitabilityScore = Math.min(100, Math.max(0, Math.round((ratioForScore * 25) * (margin / 100))));

  // 5. Profitability Status Label
  let profitabilityStatus = "Low Profitability (Unhealthy)";
  if (profitabilityScore >= 80) {
    profitabilityStatus = "High Profitability (Outstanding)";
  } else if (profitabilityScore >= 60) {
    profitabilityStatus = "Healthy Profitability (Strong)";
  } else if (profitabilityScore >= 40) {
    profitabilityStatus = "Moderate Profitability (Caution)";
  }

  return {
    ltv: Number(ltv.toFixed(2)),
    netLtv: Number(netLtv.toFixed(2)),
    ltvToCacRatio: Number(ltvToCacRatio.toFixed(2)),
    profitabilityScore,
    profitabilityStatus
  };
}

export interface AgencyMarginInput {
  revenue: number;
  expenses: number;
  teamCosts: number;
  softwareCosts: number;
  miscCosts: number;
}

export interface AgencyMarginResult {
  netProfit: number;
  profitMargin: number;
  annualProfit: number;
  profitabilityRating: string;
  totalExpenses: number;
}

export function calculateAgencyMargin(input: AgencyMarginInput): AgencyMarginResult {
  const { revenue, expenses, teamCosts, softwareCosts, miscCosts } = input;
  const totalExpenses = expenses + teamCosts + softwareCosts + miscCosts;
  const netProfit = revenue - totalExpenses;
  const profitMargin = revenue > 0 ? (netProfit / revenue) * 100 : 0;
  const annualProfit = netProfit * 12;

  let profitabilityRating = "Low Profitability (Unhealthy)";
  if (profitMargin >= 50) {
    profitabilityRating = "Outstanding Profitability (High Leverage)";
  } else if (profitMargin >= 30) {
    profitabilityRating = "Healthy Profitability (Strong)";
  } else if (profitMargin >= 15) {
    profitabilityRating = "Moderate Profitability (Caution)";
  }

  return {
    netProfit: Number(netProfit.toFixed(2)),
    profitMargin: Number(profitMargin.toFixed(2)),
    annualProfit: Number(annualProfit.toFixed(2)),
    profitabilityRating,
    totalExpenses: Number(totalExpenses.toFixed(2))
  };
}

export interface RunwayInput {
  cashBalance: number;
  revenue: number;
  expenses: number;
  growthRate: number;
}

export interface RunwayResult {
  initialBurnRate: number;
  runwayMonths: number;
  cashRemaining12Months: number;
  healthRating: string;
}

export function calculateRunway(input: RunwayInput): RunwayResult {
  const { cashBalance, revenue, expenses, growthRate } = input;

  const initialBurnRate = expenses - revenue;

  // 1. If revenue is already higher than expenses, runway is infinite
  if (initialBurnRate <= 0) {
    let cash = cashBalance;
    let rev = revenue;
    for (let t = 1; t <= 12; t++) {
      rev = rev * (1 + growthRate / 100);
      const profit = rev - expenses;
      cash += profit;
    }
    return {
      initialBurnRate: Number(initialBurnRate.toFixed(2)),
      runwayMonths: 999, // Sentinel for infinite
      cashRemaining12Months: Number(cash.toFixed(2)),
      healthRating: "Outstanding (Self-Sustaining)"
    };
  }

  // 2. If expenses > revenue, simulate MoM
  let cash = cashBalance;
  let rev = revenue;
  let months = 0;
  let becameProfitable = false;

  while (cash > 0 && months < 360) {
    rev = rev * (1 + growthRate / 100);
    const burn = expenses - rev;

    if (burn <= 0) {
      becameProfitable = true;
      break;
    }

    if (cash < burn) {
      months += cash / burn;
      cash = 0;
      break;
    }

    cash -= burn;
    months += 1;
  }

  const runwayMonths = becameProfitable ? 999 : months;

  // 3. Project cash remaining after 12 months
  let cash12 = cashBalance;
  let rev12 = revenue;
  for (let t = 1; t <= 12; t++) {
    rev12 = rev12 * (1 + growthRate / 100);
    const burn = expenses - rev12;
    if (burn <= 0) {
      cash12 += Math.abs(burn);
    } else {
      cash12 = Math.max(0, cash12 - burn);
    }
  }

  let healthRating = "Danger (Critical Runway)";
  if (runwayMonths === 999 || runwayMonths >= 18) {
    healthRating = "Outstanding (Healthy Runway)";
  } else if (runwayMonths >= 12) {
    healthRating = "Healthy (Good Runway)";
  } else if (runwayMonths >= 6) {
    healthRating = "Caution (Short Runway)";
  }

  return {
    initialBurnRate: Number(initialBurnRate.toFixed(2)),
    runwayMonths: runwayMonths === 999 ? 999 : Number(runwayMonths.toFixed(1)),
    cashRemaining12Months: Number(cash12.toFixed(2)),
    healthRating
  };
}

export interface SaasPricingInput {
  operatingCosts: number;
  infrastructureCosts: number;
  supportCosts: number;
  targetCustomers: number;
  desiredMargin: number;
}

export interface SaasPricingResult {
  totalMonthlyCost: number;
  costPerCustomer: number;
  minMonthlyPrice: number;
  recommendedMonthlyPrice: number;
  annualPlanPrice: number;
  breakEvenCustomers: number;
  profitPerCustomer: number;
}

export function calculateSaasPricing(input: SaasPricingInput): SaasPricingResult {
  const { operatingCosts, infrastructureCosts, supportCosts, targetCustomers, desiredMargin } = input;

  const totalMonthlyCost = operatingCosts + infrastructureCosts + supportCosts;
  
  // Cost Per Customer
  const costPerCustomer = targetCustomers > 0 ? totalMonthlyCost / targetCustomers : 0;
  
  // Minimum Monthly Price
  const minMonthlyPrice = costPerCustomer;

  // Recommended Monthly Price
  const marginFraction = desiredMargin / 100;
  const denominator = 1 - Math.min(0.99, Math.max(0, marginFraction));
  const recommendedMonthlyPrice = minMonthlyPrice / denominator;

  // Annual Plan Price (with 20% discount)
  const annualPlanPrice = recommendedMonthlyPrice * 12 * 0.8;

  // Profit Per Customer
  const profitPerCustomer = Math.max(0, recommendedMonthlyPrice - costPerCustomer);

  // Break-Even Customers
  const breakEvenCustomers = recommendedMonthlyPrice > 0 
    ? Math.ceil(totalMonthlyCost / recommendedMonthlyPrice) 
    : 0;

  return {
    totalMonthlyCost: Number(totalMonthlyCost.toFixed(2)),
    costPerCustomer: Number(costPerCustomer.toFixed(2)),
    minMonthlyPrice: Number(minMonthlyPrice.toFixed(2)),
    recommendedMonthlyPrice: Number(recommendedMonthlyPrice.toFixed(2)),
    annualPlanPrice: Number(annualPlanPrice.toFixed(2)),
    breakEvenCustomers,
    profitPerCustomer: Number(profitPerCustomer.toFixed(2))
  };
}
