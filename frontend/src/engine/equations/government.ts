import type { ScenarioParams } from '../state';

const PROFIT_SHARE_OF_GDP = 0.2;

export function taxRevenue(
  gdp: number,
  imports: number,
  incomeTaxRate: number,
  tariffRate: number,
  profitWindfallTaxRate: number = 0,
  planningIntensity: number = 0
): number {
  const profitTax = Math.min(0.2, Math.max(0, profitWindfallTaxRate));
  const profitRevenue = profitTax * PROFIT_SHARE_OF_GDP * gdp;
  const stateRemittance = Math.min(1, Math.max(0, planningIntensity)) * 0.025 * gdp;
  return incomeTaxRate * gdp + tariffRate * imports + profitRevenue + stateRemittance;
}

export function publicBankingRevenue(gdp: number, publicBankingStrength: number): number {
  return Math.min(1, Math.max(0, publicBankingStrength)) * 0.012 * gdp;
}

export function expenditure(gdp: number, spendingShare: number): number {
  return spendingShare * gdp;
}

export function nextDebt(
  currentDebt: number,
  deficit: number,
  policyRate: number,
  riskPremium: number,
  debtRestructuringStance: number = 0,
  periodsPerYear: number = 4,
): number {
  let effectiveRate = policyRate + riskPremium;
  effectiveRate *= 1 - 0.35 * Math.min(1, Math.max(0, debtRestructuringStance));
  // Convert annual rate to per-period rate
  const periodRate = effectiveRate / periodsPerYear;
  const interestPayment = currentDebt * periodRate;
  return currentDebt + deficit + interestPayment;
}
