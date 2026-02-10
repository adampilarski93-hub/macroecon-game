import type { CountryState, GlobalState, ScenarioParams } from '../state.js';

const U_NATURAL = 0.05;

/**
 * Phillips curve: pi = pi_e + gamma * (u - u_natural) + import pass-through.
 * Import pass-through: depreciation and commodity prices add to inflation.
 * Price controls and basic-goods guarantee (rationing) dampen inflation; incomes policy reduces Phillips slope.
 */
export function nextInflation(
  country: CountryState,
  global: GlobalState,
  params: ScenarioParams,
  exchangeRateChange: number,
  priceControlStrength: number = 0,
  incomesPolicyStrength: number = 0,
  basicGoodsGuarantee: number = 0
): number {
  const piE = country.inflationExpectations;
  const u = country.unemploymentRate;
  const gammaAdj = params.phillipsCurveSlope * (1 - 0.4 * Math.min(1, Math.max(0, incomesPolicyStrength)));
  const domesticPart = piE + gammaAdj * (u - U_NATURAL);
  const importPart = 0.2 * exchangeRateChange + 0.1 * (global.commodityPriceIndex - 1);
  const raw = domesticPart + importPart;
  const dampenPrice = 1 - 0.35 * Math.min(1, Math.max(0, priceControlStrength));
  const dampenRation = 1 - 0.2 * Math.min(1, Math.max(0, basicGoodsGuarantee)); // guaranteed staples stabilise prices
  return raw * dampenPrice * dampenRation;
}

/**
 * Adaptive expectations. Multi-year agenda anchors expectations toward target.
 */
export function nextInflationExpectations(
  piE: number,
  pi: number,
  target: number = 0.025,
  multiYearAgendaStrength: number = 0
): number {
  const anchor = 0.15 * Math.min(1, Math.max(0, multiYearAgendaStrength)); // people believe the plan
  return (1 - anchor) * (0.7 * piE + 0.3 * pi) + anchor * target;
}
