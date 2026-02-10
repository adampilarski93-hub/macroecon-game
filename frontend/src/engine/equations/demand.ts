/**
 * Demand-side equations — rebalanced to remove neoliberal bias.
 *
 * Key changes vs original:
 *  - Fiscal multiplier is STATE-DEPENDENT (higher in recession, lower at full employment)
 *  - Investment is driven primarily by demand/expectations, not just interest rates
 *  - Tax rate has a small effect on investment (empirical elasticity -0.1 to -0.3)
 *  - Government spending crowds IN during recessions (idle resources)
 *  - Planning intensity can mobilise investment (forced savings, directed credit)
 *  - Public banking provides counter-cyclical lending
 */

import type { CountryState, GlobalState, ScenarioParams, PolicyActions } from '../state';

/* ── Consumption ── */

export function consumption(y: number, taxRate: number, params: ScenarioParams): number {
  // ~40-60% of households are "hand-to-mouth" (high MPC) — Keynesian insight
  // The rest are forward-looking (lower MPC)
  const handToMouthShare = 0.50;
  const handToMouthMPC = 0.90;
  const forwardLookingMPC = params.consumptionPropensity * 0.7;
  const blendedMPC = handToMouthShare * handToMouthMPC + (1 - handToMouthShare) * forwardLookingMPC;
  return blendedMPC * (1 - taxRate) * y;
}

/* ── Investment ── */

export function investment(
  y: number,
  policyRate: number,
  inflationExpectations: number,
  params: ScenarioParams,
  financialRegulationStrength: number = 0,
  planningIntensity: number = 0,
  capacityUtilization: number = 0.85,
  publicBankingStrength: number = 0,
  taxRate: number = 0.2,
): number {
  const r = policyRate - inflationExpectations;
  const rNatural = 0.02;

  // Base investment as share of GDP — driven by DEMAND and capacity utilisation
  // (accelerator principle: firms invest when they need more capacity)
  const demandDrive = 0.18 + 0.08 * Math.max(0, capacityUtilization - 0.75);

  // Interest rate effect — MODEST (empirical elasticity ~-0.2 to -0.4)
  const interestSensitivity = params.investmentInterestElasticity * 0.5; // halved from original
  const rateEffect = 1 - interestSensitivity * Math.max(-0.05, r - rNatural);

  // Tax effect — SMALL (empirical elasticity ~-0.1 to -0.3)
  // Taxes above 0.3 have modest negative effect; below 0.3 negligible
  const taxEffect = 1 - 0.15 * Math.max(0, taxRate - 0.25);

  // Financial regulation dampens speculative investment (reduces boom but prevents bust)
  const finRegEffect = 1 - 0.15 * Math.min(1, Math.max(0, financialRegulationStrength));

  // Planning intensity: MOBILISES investment (forced savings, directed credit)
  // Strong at low-middle income (catching up), weaker at high income (complexity)
  const gdpPerCapita = y / Math.max(1, 500); // rough proxy
  const planningBonus = planningIntensity * 0.12 * Math.max(0.3, 1 - gdpPerCapita / 20);

  // Public banking: counter-cyclical lending, fills credit gaps
  const publicBankBonus = publicBankingStrength * 0.04;

  const IBase = demandDrive * y;
  const rawInvestment = IBase * rateEffect * taxEffect * finRegEffect + y * planningBonus + y * publicBankBonus;
  return Math.max(0, rawInvestment);
}

/* ── Government spending ── */

export function governmentSpending(y: number, spendingShare: number): number {
  return spendingShare * y;
}

/* ── Equilibrium GDP (iterative demand model) ── */

export function equilibriumY(
  country: CountryState,
  global: GlobalState,
  params: ScenarioParams,
  actions: PolicyActions,
  previousGdp: number,
): { y: number; c: number; i: number; g: number; x: number; m: number } {
  const taxRate = actions.incomeTaxRate ?? 0.2;
  const spendingShare = actions.spendingShareOfGdp ?? 0.25;
  const policyRate = country.policyRate;
  const piE = country.inflationExpectations;
  const finReg = actions.financialRegulationStrength ?? 0;
  const planning = actions.planningIntensity ?? 0;
  const pubBank = actions.publicBankingStrength ?? 0;
  const tariffRate = actions.tariffRate ?? 0.1;

  const yPrev = previousGdp || country.gdp;

  // Import propensity — reduced by tariffs (structuralist: protection works)
  // But tariffs also raise costs. Net effect depends on elasticity.
  const basePropensity = 0.25;
  const tariffDampening = Math.pow(1 + tariffRate, -params.tradeElasticity * 0.4);
  const importPropensity = basePropensity * tariffDampening;

  // Export base — affected by world growth, demand multiplier
  const xBase = country.exports * (1 + global.worldGrowth) * global.exportDemandMultiplier;

  // Capacity utilisation estimate
  const potentialGdp = yPrev * 1.02; // rough potential
  const capacityUtil = Math.min(1, yPrev / potentialGdp);

  // STATE-DEPENDENT fiscal multiplier effect:
  // In recession (low capacity): spending has strong multiplier (crowding IN)
  // At full employment: weaker multiplier (some crowding out)
  const outputGap = (yPrev - potentialGdp) / potentialGdp;
  const multiplierAdj = outputGap < -0.02
    ? 1.3  // recession: multiplier boosted
    : outputGap > 0.02
      ? 0.7  // overheating: reduced effectiveness
      : 1.0; // normal

  let y = yPrev;
  for (let iter = 0; iter < 50; iter++) {
    const c = consumption(y, taxRate, params);
    const i = investment(y, policyRate, piE, params, finReg, planning, capacityUtil, pubBank, taxRate);
    const g = governmentSpending(y, spendingShare) * multiplierAdj;
    const m = importPropensity * y;
    const yNew = c + i + g + xBase - m;
    if (Math.abs(yNew - y) < 1e-6) break;
    y = yNew;
  }

  const c = consumption(y, taxRate, params);
  const i = investment(y, policyRate, piE, params, finReg, planning, capacityUtil, pubBank, taxRate);
  const g = governmentSpending(y, spendingShare) * multiplierAdj;
  const m = importPropensity * y;
  const x = xBase;

  return { y: Math.max(0, y), c, i, g, x, m };
}
