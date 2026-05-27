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

/* ── Investment ──
 * 
 * Public vs Private Investment Distinction:
 * - Public investment (planning, public banking, infrastructure): 
 *   Higher productivity, less interest-sensitive, directed toward productive capacity
 * - Private investment: 
 *   More interest-sensitive, subject to financial cycles and speculative booms
 * 
 * The mix matters for:
 * 1. Overall investment level (public investment is counter-cyclical)
 * 2. Investment quality (public targets productivity, private chases returns)
 * 3. Fiscal multiplier (public spending has higher multipliers in recessions)
 */

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
  infrastructureShare: number = 0,
): { 
  total: number; 
  publicComponent: number; 
  privateComponent: number;
  publicShare: number;
  quality: number;  // investment quality score
} {
  const r = policyRate - inflationExpectations;
  const rNatural = 0.02;

  // === PRIVATE INVESTMENT ===
  // Driven by profit expectations, heavily interest-sensitive
  // Subject to financial cycles (boom-bust dynamics)
  
  // Base private investment — accelerator principle
  const privateDemandDrive = 0.14 + 0.06 * Math.max(0, capacityUtilization - 0.75);
  
  // Interest rate effect — STRONG for private (financial returns)
  const privateInterestSensitivity = params.investmentInterestElasticity * 0.7;
  const privateRateEffect = 1 - privateInterestSensitivity * Math.max(-0.05, r - rNatural);
  
  // Tax effect — SMALL but present for private
  const privateTaxEffect = 1 - 0.15 * Math.max(0, taxRate - 0.25);
  
  // Financial regulation: curbs speculative private investment
  // Weak regulation enables speculative booms (higher I but fragile)
  const finRegEffect = 1 - 0.20 * Math.min(1, Math.max(0, financialRegulationStrength));
  
  // Animal spirits / confidence cycle (simplified as pro-cyclical)
  const privateConfidence = 1 + 0.15 * Math.max(-0.5, Math.min(0.5, capacityUtilization - 0.8));
  
  const privateIBase = privateDemandDrive * y;
  const privateI = privateIBase * privateRateEffect * privateTaxEffect * finRegEffect * privateConfidence;

  // === PUBLIC INVESTMENT ===
  // Driven by state capacity and planning, not profit expectations
  // Counter-cyclical: increases when private investment falls
  
  // Planning intensity: mobilizes forced savings, directed credit
  // More effective in developing economies (catch-up growth)
  const gdpPerCapita = y / Math.max(1, 500);
  const planningBonus = planningIntensity * 0.15 * Math.max(0.3, 1 - gdpPerCapita / 20);
  
  // Infrastructure investment: directly productive, state-led
  const infraBonus = infrastructureShare * 0.12;
  
  // Public banking: counter-cyclical lending (fills credit gaps)
  // Effect increases when private investment is weak
  const creditGap = Math.max(0, 0.2 - privateI / y); // gap between target and actual
  const publicBankBonus = publicBankingStrength * 0.06 * (1 + creditGap);
  
  // Public investment is LESS interest-sensitive
  // Central banks can hold rates low without killing public investment
  const publicRateEffect = 1 - 0.3 * privateInterestSensitivity * Math.max(0, r - rNatural);
  
  const publicI = y * (planningBonus + infraBonus + publicBankBonus) * publicRateEffect;

  // === INVESTMENT COMPOSITION ===
  const totalI = privateI + publicI;
  const publicShare = totalI > 0 ? publicI / totalI : 0;
  
  // === INVESTMENT QUALITY ===
  // Public investment has higher "quality" — more productive, less speculative
  // Quality affects: productivity growth, capacity expansion, debt sustainability
  // Private investment quality depends on financial regulation
  const privateQuality = 0.6 + 0.3 * financialRegulationStrength; // 0.6-0.9 range
  const publicQuality = 0.85; // consistently high
  const weightedQuality = publicShare * publicQuality + (1 - publicShare) * privateQuality;

  return {
    total: Math.max(0, totalI),
    publicComponent: Math.max(0, publicI),
    privateComponent: Math.max(0, privateI),
    publicShare: Math.min(1, Math.max(0, publicShare)),
    quality: weightedQuality,
  };
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
): { 
  y: number; 
  c: number; 
  i: number; 
  g: number; 
  x: number; 
  m: number;
  publicInvestment: number;
  privateInvestment: number;
  publicInvestmentShare: number;
  investmentQuality: number;
} {
  const taxRate = actions.incomeTaxRate ?? 0.2;
  const spendingShare = actions.spendingShareOfGdp ?? 0.25;
  const policyRate = country.policyRate;
  const piE = country.inflationExpectations;
  const finReg = actions.financialRegulationStrength ?? 0;
  const planning = actions.planningIntensity ?? 0;
  const pubBank = actions.publicBankingStrength ?? 0;
  const infra = actions.infrastructureShare ?? 0;
  const tariffRate = actions.tariffRate ?? 0.1;

  const yPrev = previousGdp || country.gdp;

  // Import propensity — reduced by tariffs (structuralist: protection works)
  // But tariffs also raise costs. Net effect depends on elasticity.
  const basePropensity = 0.25;
  const tariffDampening = Math.pow(1 + tariffRate, -params.tradeElasticity * 0.4);
  const importPropensity = basePropensity * tariffDampening;

  // Export base — affected by world growth, demand multiplier
  const xBase = country.exports * (1 + global.worldGrowth) * global.exportDemandMultiplier;

  // Capacity utilisation: tracked potential GDP grows at trend rate (~2%/period)
  // but is a SEPARATE variable from actual GDP, so recessions open a real gap
  const potentialGdp = country.potentialGdp || yPrev * 1.02;
  const capacityUtil = Math.min(1, Math.max(0.5, yPrev / potentialGdp));

  // STATE-DEPENDENT fiscal multiplier — NOW ALSO DEPENDS ON CAPITAL COMPOSITION:
  // Multiplier is HIGHER when public investment share is higher
  // (public spending is more productively absorbed, less crowding out)
  const outputGap = potentialGdp > 0 ? (yPrev - potentialGdp) / potentialGdp : 0;
  const baseMultiplier = outputGap < -0.03
    ? 1.3  // recession: multiplier boosted
    : outputGap > 0.03
      ? 0.7  // overheating: reduced effectiveness
      : 1.0; // normal
  
  // Capital-composition-adjusted multiplier
  // Higher public investment share = higher multiplier (public spending more effective)
  // This captures: public investment targets idle resources, builds capacity
  // while private investment competes for scarce resources at full employment
  const compositionMultiplier = 1 + 0.15 * (country.publicInvestmentShare ?? 0);
  const multiplierAdj = baseMultiplier * compositionMultiplier;

  let y = yPrev;
  let investResult = investment(y, policyRate, piE, params, finReg, planning, capacityUtil, pubBank, taxRate, infra);
  
  for (let iter = 0; iter < 50; iter++) {
    const c = consumption(y, taxRate, params);
    investResult = investment(y, policyRate, piE, params, finReg, planning, capacityUtil, pubBank, taxRate, infra);
    const i = investResult.total;
    const g = governmentSpending(y, spendingShare) * multiplierAdj;
    const m = importPropensity * y;
    const yNew = c + i + g + xBase - m;
    if (Math.abs(yNew - y) < 1e-6) break;
    // Dampen step to prevent divergence when marginal propensities sum > 1
    y = 0.5 * y + 0.5 * yNew;
  }
  // Hard bound: GDP cannot exceed 3× previous or fall below 10% of previous
  y = Math.min(y, yPrev * 3);
  y = Math.max(y, yPrev * 0.1);

  const c = consumption(y, taxRate, params);
  investResult = investment(y, policyRate, piE, params, finReg, planning, capacityUtil, pubBank, taxRate, infra);
  const i = investResult.total;
  const publicInvestment = investResult.publicComponent;
  const privateInvestment = investResult.privateComponent;
  const publicInvestmentShare = investResult.publicShare;
  const investmentQuality = investResult.quality;
  const g = governmentSpending(y, spendingShare) * multiplierAdj;
  const m = importPropensity * y;
  const x = xBase;

  return { 
    y: Math.max(0, y), 
    c, 
    i, 
    g, 
    x, 
    m,
    publicInvestment,
    privateInvestment,
    publicInvestmentShare,
    investmentQuality,
  };
}
