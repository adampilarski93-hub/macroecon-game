import type { CountryState } from '../state';

export interface ApprovalBreakdown {
  overall: number;
  workerSupport: number;
  eliteSupport: number;
}

/**
 * Class-based approval: workers and elites respond to different policy signals.
 * Workers care about employment, social spending, wages, basic goods.
 * Elites care about growth, low taxes, financial deregulation, stability.
 * Overall approval is a weighted average skewed toward workers (larger population).
 */
export function approvalBreakdown(
  country: CountryState,
  socialSpendingShare: number,
  basicGoodsGuarantee: number = 0,
  multiYearAgendaStrength: number = 0,
  taxRate: number = 0.2,
  financialRegulationStrength: number = 0,
  planningIntensity: number = 0,
): ApprovalBreakdown {
  // Worker support: employment, social spending, basic goods, wages
  const workerGrowth = Math.tanh(country.gdpGrowth * 3) * 0.1;
  const workerInflPenalty = -0.35 * country.inflationRate;
  const workerUnempPenalty = -0.5 * country.unemploymentRate;
  const workerSocialBonus = socialSpendingShare * 0.25;
  const workerBasicGoods = 0.15 * Math.min(1, Math.max(0, basicGoodsGuarantee));
  const workerMultiYear = 0.05 * Math.min(1, Math.max(0, multiYearAgendaStrength));
  const workerWageShare = typeof country.wageShare === 'number' ? (country.wageShare - 0.4) * 0.2 : 0;
  const rawWorker = 0.5 + workerGrowth + workerInflPenalty + workerUnempPenalty
    + workerSocialBonus + workerBasicGoods + workerMultiYear + workerWageShare;
  const workerSupport = Math.max(0, Math.min(1, rawWorker));

  // Elite support: growth, low taxes, financial freedom, stability
  const eliteGrowth = Math.tanh(country.gdpGrowth * 8) * 0.25;
  const eliteInflPenalty = -0.2 * country.inflationRate;
  const eliteTaxPenalty = -0.4 * Math.max(0, taxRate - 0.15);
  const eliteRegPenalty = -0.15 * financialRegulationStrength;
  const elitePlanningPenalty = -0.2 * planningIntensity;
  const eliteStability = 0.1 * Math.min(1, Math.max(0, multiYearAgendaStrength));
  const rawElite = 0.55 + eliteGrowth + eliteInflPenalty + eliteTaxPenalty
    + eliteRegPenalty + elitePlanningPenalty + eliteStability;
  const eliteSupport = Math.max(0, Math.min(1, rawElite));

  // Overall: workers are the larger class (70/30 weight)
  const overall = 0.7 * workerSupport + 0.3 * eliteSupport;

  return {
    overall: Math.max(0, Math.min(1, overall)),
    workerSupport,
    eliteSupport,
  };
}

/**
 * Legacy single-value approval for backward compatibility.
 */
export function approval(
  country: CountryState,
  socialSpendingShare: number,
  basicGoodsGuarantee: number = 0,
  multiYearAgendaStrength: number = 0,
): number {
  return approvalBreakdown(country, socialSpendingShare, basicGoodsGuarantee, multiYearAgendaStrength).overall;
}
