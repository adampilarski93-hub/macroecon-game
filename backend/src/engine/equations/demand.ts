import type { CountryState, GlobalState, ScenarioParams, PolicyActions } from '../state.js';

/**
 * Consumption: C = c * (1 - t) * Y_prev (disposable income).
 */
export function consumption(
  y: number,
  taxRate: number,
  params: ScenarioParams
): number {
  const c = params.consumptionPropensity;
  return c * (1 - taxRate) * y;
}

/**
 * Investment: sensitive to real interest rate.
 * Financial regulation (Post-Keynesian) and planning intensity (Marxian) reduce sensitivity to rate.
 */
export function investment(
  y: number,
  policyRate: number,
  inflationExpectations: number,
  params: ScenarioParams,
  financialRegulationStrength: number = 0,
  planningIntensity: number = 0
): number {
  const r = policyRate - inflationExpectations;
  const rNatural = 0.02;
  let betaAdj = params.investmentInterestElasticity * (1 - 0.35 * Math.min(1, Math.max(0, financialRegulationStrength)));
  betaAdj *= 1 - 0.4 * Math.min(1, Math.max(0, planningIntensity)); // state-directed investment less rate-sensitive
  const IBase = 0.2 * y; // baseline investment share
  return Math.max(0, IBase * (1 - betaAdj * (r - rNatural)));
}

/**
 * Government spending: G = spendingShare * Y.
 */
export function governmentSpending(y: number, spendingShare: number): number {
  return spendingShare * y;
}

/**
 * Solve for equilibrium Y from Y = C + I + G + NX when C,I,G,NX depend on Y.
 * Simplified: C = c(1-t)Y, G = gY, I = I(y,r), NX = X - m(Y).
 * NX = X_0 - m_0 * Y (linear import demand). So:
 * Y = c(1-t)Y + I(Y,r) + gY + X_0 - m_0*Y
 * I linear in Y: I = i0*Y. Then Y = (c(1-t)+i0+g-m_0)Y + X_0 => Y = X_0 / (1 - c(1-t) - i0 - g + m_0).
 * We use a simple multiplier with exogenous X and import propensity.
 */
export function equilibriumY(
  country: CountryState,
  global: GlobalState,
  params: ScenarioParams,
  actions: PolicyActions,
  previousGdp: number
): { y: number; c: number; i: number; g: number; x: number; m: number } {
  const taxRate = actions.incomeTaxRate ?? 0.2;
  const spendingShare = actions.spendingShareOfGdp ?? 0.25;
  const policyRate = country.policyRate;
  const piE = country.inflationExpectations;
  const finReg = actions.financialRegulationStrength ?? 0;
  const planning = actions.planningIntensity ?? 0;

  const yPrev = previousGdp || country.gdp;
  const importPropensity = 0.25;
  const xBase = country.exports * (1 + global.worldGrowth) * global.exportDemandMultiplier;

  // Iterate to get Y: Y_new = C(Y) + I(Y) + G(Y) + X - m*Y
  let y = yPrev;
  for (let iter = 0; iter < 50; iter++) {
    const c = consumption(y, taxRate, params);
    const i = investment(y, policyRate, piE, params, finReg, planning);
    const g = governmentSpending(y, spendingShare);
    const m = importPropensity * y;
    const yNew = c + i + g + xBase - m;
    if (Math.abs(yNew - y) < 1e-6) break;
    y = yNew;
  }

  const c = consumption(y, taxRate, params);
  const i = investment(y, policyRate, piE, params, finReg, planning);
  const g = governmentSpending(y, spendingShare);
  const m = importPropensity * y;
  const x = xBase;

  return { y: Math.max(0, y), c, i, g, x, m };
}
