/**
 * External / trade equations — rebalanced for structuralist economics.
 *
 * Key changes:
 *  - Capital controls reduce volatility and crisis risk, small FDI cost
 *  - Managed exchange rates are viable and stabilising for developing economies
 *  - Tariffs enable infant industry development with realistic trade-offs
 *  - Foreign vs domestic debt distinction matters for vulnerability
 */

import type { GlobalState, ScenarioParams } from '../state';

export function exports(previousExports: number, global: GlobalState): number {
  return previousExports * (1 + global.worldGrowth) * global.exportDemandMultiplier;
}

export function imports(gdp: number, tariffRate: number, params: ScenarioParams): number {
  // Tariffs reduce imports (structuralist: protection can work for industrialisation)
  // But trade elasticity determines how responsive imports are
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

  // Base drift from current account
  const baseDrift = -0.3 * caRatio;

  // Capital controls reduce volatility (Mundell-Fleming: controls buy independence)
  // Malaysia 1998 recovered faster with controls than Thailand without
  const controlDampening = 1 - 0.6 * Math.min(1, capitalControlStrength);

  if (regime === 'managed') {
    // Managed float: reduced volatility, partial intervention
    // Reserve adequacy matters for sustainability
    const reserveConfidence = Math.min(1, fxReserves / Math.max(1, gdp * 0.15));
    return baseDrift * 0.35 * controlDampening * (2 - reserveConfidence);
  }

  // Free float: full pass-through, but controls still help
  return baseDrift * controlDampening;
}
