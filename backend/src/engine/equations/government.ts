import type { CountryState, ScenarioParams, PolicyActions } from '../state.js';

const PROFIT_SHARE_OF_GDP = 0.2; // simplified: profits as share of GDP

/**
 * Tax revenue: income tax + tariff + profit/windfall tax + state-sector remittance (when planning is high).
 */
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
  const stateRemittance = Math.min(1, Math.max(0, planningIntensity)) * 0.025 * gdp; // state enterprises → budget
  return incomeTaxRate * gdp + tariffRate * imports + profitRevenue + stateRemittance;
}

/**
 * Optional: public banking contributes profits to budget.
 */
export function publicBankingRevenue(gdp: number, publicBankingStrength: number): number {
  return Math.min(1, Math.max(0, publicBankingStrength)) * 0.012 * gdp;
}

/**
 * Expenditure = spendingShareOfGdp * gdp.
 */
export function expenditure(gdp: number, spendingShare: number): number {
  return spendingShare * gdp;
}

/**
 * Debt dynamics: Debt_next = Debt + deficit + interest on debt.
 * Restructuring stance reduces effective interest (debt relief) so servicing is lower.
 */
export function nextDebt(
  currentDebt: number,
  deficit: number,
  policyRate: number,
  riskPremium: number,
  debtRestructuringStance: number = 0
): number {
  let effectiveRate = policyRate + riskPremium;
  effectiveRate *= 1 - 0.35 * Math.min(1, Math.max(0, debtRestructuringStance)); // restructuring reduces servicing
  const interestPayment = currentDebt * effectiveRate;
  return currentDebt + deficit + interestPayment;
}
