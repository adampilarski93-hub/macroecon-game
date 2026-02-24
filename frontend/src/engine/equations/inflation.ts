/**
 * Inflation equations — rebalanced for multiple schools.
 *
 * Key changes:
 *  - Distinguishes cost-push vs demand-pull inflation
 *  - Price controls can WORK in oligopolistic/monopolistic markets (not just distortion)
 *  - Incomes policy (wage-price coordination) is more effective
 *  - Basic goods guarantee provides stability, not just suppression
 *  - No automatic penalty for "non-orthodox" policies
 */

import type { CountryState, GlobalState, ScenarioParams } from '../state';

const U_NATURAL = 0.05;

export function nextInflation(
  country: CountryState,
  global: GlobalState,
  params: ScenarioParams,
  exchangeRateChange: number,
  priceControlStrength: number = 0,
  incomesPolicyStrength: number = 0,
  basicGoodsGuarantee: number = 0,
): number {
  const piE = country.inflationExpectations;
  const u = country.unemploymentRate;

  // ── Demand-pull component (Phillips curve) ──
  // Only active when unemployment is BELOW natural rate
  // (When above NAIRU, demand-pull pressure is zero — Post-Keynesian insight)
  const demandPull = params.phillipsCurveSlope * Math.max(0, U_NATURAL - u);

  // ── Cost-push component ──
  // Import costs, commodity prices, exchange rate pass-through
  // Pass-through is higher in developing countries (50-70% vs 20% advanced)
  const devFactor = Math.max(0.2, 0.6 - country.institutionQuality * 0.4);
  const importPush = devFactor * Math.max(0, exchangeRateChange) + 0.1 * Math.max(0, global.commodityPriceIndex - 1);

  // ── Base inflation ──
  // Weighted combination of expectations + demand-pull + cost-push
  const rawInflation = 0.6 * piE + 0.15 * demandPull + 0.25 * (piE + importPush);

  // ── Incomes policy ──
  // Effective at reducing wage-price spiral (corporatist model: Scandinavia, Austria)
  // Reduces inflation by up to 3 percentage points
  // Works best when combined with fiscal/monetary addressing root cause
  const incomesDampening = 1 - 0.4 * Math.min(1, Math.max(0, incomesPolicyStrength));

  // ── Price controls ──
  // NUANCED: in oligopolistic markets, can move toward competitive equilibrium
  // In competitive markets with strong controls: causes shortages
  // Moderate controls (0.2-0.5): effective with small distortion
  // Heavy controls (>0.7): large shortage risk
  // Net effect: controls reduce measured inflation but may accumulate pressure
  const controlLevel = Math.min(1, Math.max(0, priceControlStrength));
  const controlEffectiveness = controlLevel <= 0.5
    ? 0.45 * controlLevel        // effective range: up to 22.5% reduction
    : 0.225 + 0.15 * (controlLevel - 0.5); // diminishing returns above 0.5
  const controlDampening = 1 - controlEffectiveness;

  // ── Basic goods guarantee ──
  // Removes essentials from market pricing — reduces cost-of-living inflation
  // Historical: Cuba's libreta, Nordic universal provision, wartime rationing
  const bgLevel = Math.min(1, Math.max(0, basicGoodsGuarantee));
  const bgDampening = 1 - 0.25 * bgLevel;

  const result = rawInflation * incomesDampening * controlDampening * bgDampening;

  // Floor at mild deflation (deep deflation spiral not modeled in detail)
  return Math.max(-0.02, result);
}

export function nextInflationExpectations(
  piE: number,
  pi: number,
  target: number = 0.025,
  multiYearAgendaStrength: number = 0,
): number {
  // Expectations: mix of adaptive (backward-looking) and anchored (forward-looking)
  // Multi-year agenda anchors expectations toward target (credibility effect)
  const anchor = 0.15 * Math.min(1, Math.max(0, multiYearAgendaStrength));
  // Mostly adaptive (Post-Keynesian: expectations are not fully rational)
  return (1 - anchor) * (0.65 * piE + 0.35 * pi) + anchor * target;
}
