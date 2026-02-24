import type { GlobalState, ScenarioParams } from '../state';

/**
 * Terms of trade evolution. Prebisch-Singer: commodity exporters face
 * secular decline. Tariffs and capital controls partially insulate.
 */
export function nextTermsOfTrade(
  prevToT: number,
  scenarioId: string,
  tariffRate: number,
  capitalControlStrength: number,
  commodityPriceIndex: number,
): number {
  const isDeveloping = ['independence-underdevelopment', 'commodity-pressure', 'rising-industrializer'].includes(scenarioId);
  // Secular drift: developing commodity exporters face declining terms of trade
  const drift = isDeveloping ? -0.008 : -0.002;
  // Commodity price shocks affect terms of trade
  const commodityEffect = (commodityPriceIndex - 1.0) * (isDeveloping ? 0.05 : 0.02);
  // Tariffs and capital controls partially insulate
  const insulation = 1 - 0.3 * tariffRate - 0.2 * capitalControlStrength;
  const change = (drift + commodityEffect) * Math.max(0.3, insulation);
  return Math.max(0.5, Math.min(1.5, prevToT + change));
}

/**
 * Value transfer: surplus extracted through unequal exchange.
 * Positive = value flowing out of the country.
 */
export function valueTransfer(
  exports: number,
  termsOfTrade: number,
): number {
  // When ToT < 1, exports are undervalued relative to imports
  return exports * Math.max(0, 1 - termsOfTrade);
}

export function exports(previousExports: number, global: GlobalState, termsOfTrade: number = 1): number {
  return previousExports * (1 + global.worldGrowth) * global.exportDemandMultiplier * termsOfTrade;
}

export function imports(gdp: number, tariffRate: number, params: ScenarioParams): number {
  const propensity = 0.25 * Math.pow(1 + tariffRate, -params.tradeElasticity * 0.4);
  return propensity * gdp;
}

export function exchangeRateChange(
  currentAccount: number,
  gdp: number,
  regime: 'float' | 'peg' | 'managed',
  capitalControlStrength: number = 0,
  fxReserves: number = 0,
): number {
  if (regime === 'peg') return 0;

  const caRatio = gdp > 0 ? currentAccount / gdp : 0;
  const baseDrift = -0.3 * caRatio;
  const controlDampening = 1 - 0.6 * Math.min(1, capitalControlStrength);

  if (regime === 'managed') {
    const reserveConfidence = Math.min(1, fxReserves / Math.max(1, gdp * 0.15));
    return baseDrift * 0.35 * controlDampening * (2 - reserveConfidence);
  }

  return baseDrift * controlDampening;
}
