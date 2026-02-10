import type { CountryState, GlobalState, ScenarioParams, PolicyActions } from '../state.js';

/**
 * Export demand: base * world growth * demand multiplier, adjusted for real exchange rate.
 * Simplified: X = X_prev * (1 + worldGrowth) * exportDemandMultiplier.
 */
export function exports(
  previousExports: number,
  global: GlobalState
): number {
  return previousExports * (1 + global.worldGrowth) * global.exportDemandMultiplier;
}

/**
 * Import demand: propensity * Y, adjusted for tariffs (higher tariff => slightly lower M).
 */
export function imports(
  gdp: number,
  tariffRate: number,
  params: ScenarioParams
): number {
  const propensity = 0.25 * Math.pow(1 + tariffRate, -params.tradeElasticity * 0.5);
  return propensity * gdp;
}

/**
 * Exchange rate change: under float, depreciate when current account in deficit.
 * Return proportional change (e.g. 0.02 = 2% depreciation).
 */
export function exchangeRateChange(
  currentAccount: number,
  gdp: number,
  regime: 'float' | 'peg' | 'managed'
): number {
  if (regime === 'peg') return 0;
  const caRatio = gdp > 0 ? currentAccount / gdp : 0;
  const drift = -0.3 * caRatio; // deficit => depreciation
  if (regime === 'managed') return drift * 0.5;
  return drift;
}
