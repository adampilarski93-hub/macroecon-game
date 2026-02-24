/**
 * Approval (political legitimacy) equation — rebalanced for multiple schools.
 *
 * Key changes:
 *  - Basic goods guarantee has STRONG positive effect (Cuba, Nordic, wartime UK)
 *  - Social spending has larger effect (welfare state buys legitimacy)
 *  - Inequality reduction boosts approval (redistribution is popular)
 *  - Planning can boost approval in developing countries (infrastructure, jobs)
 *  - Price stability from controls can be positive (not just GDP growth)
 *  - Debt penalty removed (voters don't punish abstract debt numbers)
 */

import type { CountryState } from '../state';

export function approval(
  country: CountryState,
  socialSpendingShare: number,
  basicGoodsGuarantee: number = 0,
  multiYearAgendaStrength: number = 0,
  planningIntensity: number = 0,
  priceControlStrength: number = 0,
): number {
  // ── Growth bonus ──
  // People like rising living standards, but diminishing returns above ~4%
  const growthBonus = Math.tanh(country.gdpGrowth * 5) * 0.18;

  // ── Inflation penalty ──
  // Moderate inflation (2-5%) is barely noticed
  // High inflation (>8%) is very unpopular
  // Deflation is also bad (job losses, debt burden)
  const inflationPain = Math.max(0, country.inflationRate - 0.04);
  const deflationPain = Math.max(0, -country.inflationRate);
  const inflationPenalty = -0.25 * inflationPain - 0.15 * deflationPain;

  // ── Unemployment penalty ── (strongest driver of approval)
  // People HATE unemployment. This is the #1 political risk.
  const unemploymentPenalty = -0.5 * country.unemploymentRate;

  // ── Social spending bonus ──
  // Healthcare, education, transfers build legitimacy
  // Nordic model: high social spending = high approval
  const socialBonus = 0.2 * Math.min(1, socialSpendingShare);

  // ── Basic goods guarantee ──
  // Universal access to food, housing, healthcare is VERY popular
  // Cuba: high approval despite low GDP because everyone's needs are met
  // Nordic countries: universal provision = strong social contract
  const bgLevel = Math.min(1, Math.max(0, basicGoodsGuarantee));
  const basicGoodsBonus = 0.18 * bgLevel;

  // ── Multi-year agenda ──
  // Stability and predictability build confidence
  const agendaBonus = 0.06 * Math.min(1, Math.max(0, multiYearAgendaStrength));

  // ── Planning bonus (in developing context) ──
  // Visible infrastructure, jobs programs, industrialisation drive approval
  // BUT heavy-handed planning can backfire (loss of consumer choice)
  const planLevel = Math.min(1, Math.max(0, planningIntensity));
  const planBonus = planLevel <= 0.5
    ? 0.08 * planLevel  // moderate planning is popular
    : 0.04 - 0.06 * (planLevel - 0.5); // heavy planning: diminishing/negative

  // ── Price stability from controls ──
  // If inflation is low and controls are active, people appreciate stable prices
  const controlLevel = Math.min(1, Math.max(0, priceControlStrength));
  const controlBonus = controlLevel * 0.06 * Math.max(0, 1 - country.inflationRate * 10);

  const raw = 0.5 + growthBonus + inflationPenalty + unemploymentPenalty
    + socialBonus + basicGoodsBonus + agendaBonus + planBonus + controlBonus;

  return Math.max(0, Math.min(1, raw));
}
