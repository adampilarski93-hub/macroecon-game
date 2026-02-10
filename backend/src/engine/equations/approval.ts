import type { CountryState } from '../state.js';

/**
 * Approval: function of GDP growth, inflation, unemployment, social spending, and basic-goods guarantee.
 */
export function approval(
  country: CountryState,
  socialSpendingShare: number,
  basicGoodsGuarantee: number = 0,
  multiYearAgendaStrength: number = 0
): number {
  const growthBonus = Math.tanh(country.gdpGrowth * 5) * 0.2;
  const inflationPenalty = -0.3 * country.inflationRate;
  const unemploymentPenalty = -0.4 * country.unemploymentRate;
  const socialBonus = socialSpendingShare * 0.15;
  const basicGoodsBonus = 0.12 * Math.min(1, Math.max(0, basicGoodsGuarantee)); // guaranteed staples raise approval
  const multiYearBonus = 0.06 * Math.min(1, Math.max(0, multiYearAgendaStrength)); // clear multi-year plan raises trust
  const raw = 0.5 + growthBonus + inflationPenalty + unemploymentPenalty + socialBonus + basicGoodsBonus + multiYearBonus;
  return Math.max(0, Math.min(1, raw));
}
