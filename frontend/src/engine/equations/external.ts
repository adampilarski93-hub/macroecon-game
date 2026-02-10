import type { GlobalState, ScenarioParams } from '../state';

export function exports(previousExports: number, global: GlobalState): number {
  return previousExports * (1 + global.worldGrowth) * global.exportDemandMultiplier;
}

export function imports(gdp: number, tariffRate: number, params: ScenarioParams): number {
  const propensity = 0.25 * Math.pow(1 + tariffRate, -params.tradeElasticity * 0.5);
  return propensity * gdp;
}

export function exchangeRateChange(
  currentAccount: number,
  gdp: number,
  regime: 'float' | 'peg' | 'managed'
): number {
  if (regime === 'peg') return 0;
  const caRatio = gdp > 0 ? currentAccount / gdp : 0;
  const drift = -0.3 * caRatio;
  if (regime === 'managed') return drift * 0.5;
  return drift;
}
