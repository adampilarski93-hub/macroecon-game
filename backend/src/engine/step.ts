import type {
  SimulationState,
  CountryState,
  GlobalState,
  ScenarioParams,
  PolicyActions,
  SimulationEvent,
  SectorId,
} from './state.js';
import { computeSectorOutputs, aggregateGdp } from './equations/production.js';
import { equilibriumY } from './equations/demand.js';
import { nextInflation, nextInflationExpectations } from './equations/inflation.js';
import {
  taxRevenue,
  expenditure,
  nextDebt,
  publicBankingRevenue,
} from './equations/government.js';
import { exchangeRateChange, nextTermsOfTrade } from './equations/external.js';
import { approvalBreakdown } from './equations/approval.js';

const SECTOR_IDS: SectorId[] = ['agriculture', 'manufacturing', 'services'];

function clamp(x: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, x));
}

function applyPolicyToCountry(country: CountryState, scenario: ScenarioParams, actions: PolicyActions): CountryState {
  const policyRate = clamp(
    actions.policyRate ?? country.policyRate,
    scenario.minPolicyRate,
    scenario.maxPolicyRate
  );
  return {
    ...country,
    policyRate,
    inflationTarget: scenario.scenarioId.includes('stagflation') ? 0.02 : 0.025,
  };
}

export function step(
  state: SimulationState,
  actions: PolicyActions,
  _rng?: () => number
): SimulationState {
  const { country, global, scenario } = state;
  const previousGdp = state.previousGdp ?? state.country.gdp;

  const countryWithPolicy = applyPolicyToCountry(country, scenario, actions);
  const taxRate = clamp(actions.incomeTaxRate ?? 0.2, scenario.minTaxRate, scenario.maxTaxRate);
  const spendingShare = clamp(actions.spendingShareOfGdp ?? 0.25, scenario.minSpendingShare, scenario.maxSpendingShare);
  const tariffRate = actions.tariffRate ?? 0.1;
  const policyRate = countryWithPolicy.policyRate;
  const regime = actions.exchangeRateRegime ?? 'managed';
  const socialSpendingShare = actions.socialSpendingShare ?? 0.35;
  const profitWindfallTaxRate = clamp(actions.profitWindfallTaxRate ?? 0, 0, 0.2);
  const priceControlStrength = clamp(actions.priceControlStrength ?? 0, 0, 1);
  const incomesPolicyStrength = clamp(actions.incomesPolicyStrength ?? 0, 0, 1);
  const capitalControlStrength = clamp(actions.capitalControlStrength ?? 0, 0, 1);
  const domesticDebtShare = clamp(actions.domesticDebtShare ?? 0.5, 0, 1);
  const basicGoodsGuarantee = clamp(actions.basicGoodsGuarantee ?? 0, 0, 1);
  const planningIntensity = clamp(actions.planningIntensity ?? 0, 0, 1);
  const publicBankingStrength = clamp(actions.publicBankingStrength ?? 0, 0, 1);
  const debtRestructuringStance = clamp(actions.debtRestructuringStance ?? 0, 0, 1);
  const multiYearAgendaStrength = clamp(actions.multiYearAgendaStrength ?? 0, 0, 1);
  const infrastructureShare = clamp(actions.infrastructureShare ?? 0, 0, 1);
  const financialRegulationStrength = clamp(actions.financialRegulationStrength ?? 0, 0, 1);

  /* ── Demand equilibrium ── */
  const { y, c, i, g, x, m } = equilibriumY(
    countryWithPolicy,
    global,
    scenario,
    actions,
    previousGdp
  );

  /* ── External sector ── */
  const currentAccount = x - m;
  const erChange = exchangeRateChange(currentAccount, y, regime, capitalControlStrength, country.fxReserves);
  const newExchangeRate = country.exchangeRate * (1 + erChange);

  /* ── Inflation ── */
  const nextInf = nextInflation(country, global, scenario, erChange, priceControlStrength, incomesPolicyStrength, basicGoodsGuarantee);
  const nextPiE = nextInflationExpectations(country.inflationExpectations, nextInf, 0.025, multiYearAgendaStrength);

  /* ── Fiscal ── */
  const rev = taxRevenue(y, m, taxRate, tariffRate, profitWindfallTaxRate, planningIntensity) + publicBankingRevenue(y, publicBankingStrength);
  const exp = expenditure(y, spendingShare);
  const deficit = exp - rev;

  let riskPremium = global.riskPremium;
  if (country.debtToGdp > scenario.debtSustainabilityThreshold) {
    riskPremium += 0.008 * (country.debtToGdp - scenario.debtSustainabilityThreshold);
  }
  riskPremium *= 1 - 0.3 * domesticDebtShare;
  riskPremium *= 1 - 0.25 * capitalControlStrength;
  riskPremium *= 1 - 0.1 * publicBankingStrength;
  riskPremium += 0.015 * debtRestructuringStance;

  const newDebt = nextDebt(country.publicDebt, deficit, policyRate, riskPremium, debtRestructuringStance);
  const debtToGdp = y > 0 ? newDebt / y : 0;

  /* ── Production ── */
  const sectorOutputs = computeSectorOutputs(country, planningIntensity, infrastructureShare, publicBankingStrength, tariffRate);
  const gdpGrowth = previousGdp > 0 ? (y - previousGdp) / previousGdp : 0;

  /* ── Employment ── */
  const planningEmploymentBonus = planningIntensity * 0.02;
  const baseEmployment = country.laborForce * (1 - 0.05 - 0.25 * Math.max(0, -gdpGrowth) + planningEmploymentBonus);
  const employed = Math.min(country.laborForce, Math.max(0, baseEmployment));
  const unemployed = Math.max(0, country.laborForce - employed);
  const unemploymentRate = country.laborForce > 0 ? unemployed / country.laborForce : 0.05;

  /* ── Institution quality ── */
  const instImprovement = 0.005 * socialSpendingShare
    + 0.003 * Math.min(1, infrastructureShare)
    + 0.002 * financialRegulationStrength
    - 0.005 * Math.max(0, planningIntensity - 0.7);
  const newInstitutionQuality = clamp(country.institutionQuality + instImprovement, 0.1, 1.0);

  /* ── Terms of trade (Prebisch-Singer) ── */
  const prevToT = country.termsOfTrade ?? 1.0;
  const newTermsOfTrade = nextTermsOfTrade(prevToT, scenario.scenarioId, tariffRate, capitalControlStrength, global.commodityPriceIndex);

  /* ── Wage share (Kaleckian distribution) ── */
  const prevWageShare = country.wageShare ?? 0.5;
  const wageShareDrift =
    0.02 * socialSpendingShare
    + 0.015 * incomesPolicyStrength
    + 0.01 * planningIntensity
    + 0.01 * basicGoodsGuarantee
    - 0.02 * Math.max(0, gdpGrowth - 0.03)
    - 0.015 * (1 - financialRegulationStrength) * Math.max(0, gdpGrowth)
    - 0.01 * Math.max(0, 0.3 - taxRate);
  const newWageShare = clamp(prevWageShare + wageShareDrift, 0.2, 0.75);

  /* ── Profit rate (Marxian) ── */
  const totalCapital = Object.values(country.sectors).reduce((sum, s) => sum + s.capitalStock, 0);
  const wages = y * newWageShare;
  const newProfitRate = totalCapital > 0 ? (y - wages) / totalCapital : 0.1;

  /* ── Financial fragility (Minsky) ── */
  const prevFragility = country.financialFragility ?? 0.1;
  const fragilityChange =
    0.03 * (1 - financialRegulationStrength) * Math.max(0, gdpGrowth)
    + 0.02 * (1 - financialRegulationStrength)
    - 0.04 * financialRegulationStrength
    - 0.02 * publicBankingStrength;
  let newFragility = clamp(prevFragility + fragilityChange, 0, 1);

  /* ── Approval (class-based) ── */
  const approvalInput = {
    ...countryWithPolicy,
    gdp: y,
    gdpGrowth,
    unemploymentRate,
    inflationRate: nextInf,
    institutionQuality: newInstitutionQuality,
    wageShare: newWageShare,
    termsOfTrade: newTermsOfTrade,
    financialFragility: newFragility,
    profitRate: newProfitRate,
    workerSupport: 0.5,
    eliteSupport: 0.5,
  } as CountryState;
  const approvalResult = approvalBreakdown(
    approvalInput,
    socialSpendingShare,
    basicGoodsGuarantee,
    multiYearAgendaStrength,
    taxRate,
    financialRegulationStrength,
    planningIntensity,
  );

  /* ── Reserves ── */
  const reserveChange = currentAccount * 0.1 - (regime === 'managed' ? Math.abs(erChange) * y * 0.05 : 0);

  /* ── Financial crisis from Minsky fragility ── */
  let adjustedGdpGrowth = gdpGrowth;
  let adjustedApproval = approvalResult.overall;
  if (newFragility > 0.7 && prevFragility <= 0.7) {
    adjustedGdpGrowth = Math.min(gdpGrowth, -0.025);
    adjustedApproval = Math.max(0, adjustedApproval - 0.1);
    newFragility = 0.3;
  }

  const newCountry: CountryState = {
    ...countryWithPolicy,
    gdp: y,
    gdpGrowth: adjustedGdpGrowth,
    sectors: { ...country.sectors },
    employed,
    unemployed,
    unemploymentRate,
    inflationRate: nextInf,
    inflationExpectations: nextPiE,
    exchangeRate: newExchangeRate,
    taxRevenue: rev,
    expenditure: exp,
    deficit,
    publicDebt: newDebt,
    debtToGdp,
    exports: x,
    imports: m,
    currentAccount,
    fxReserves: Math.max(0, country.fxReserves + reserveChange),
    institutionQuality: newInstitutionQuality,
    approval: adjustedApproval,
    workerSupport: approvalResult.workerSupport,
    eliteSupport: approvalResult.eliteSupport,
    wageShare: newWageShare,
    termsOfTrade: newTermsOfTrade,
    financialFragility: newFragility,
    profitRate: newProfitRate,
  };

  /* ── Events ── */
  const events = [...state.events];
  const nextTurn = state.turn + 1;

  if (newCountry.debtToGdp > scenario.debtSustainabilityThreshold) {
    events.push({
      id: `debt-warning-${state.turn}`,
      turn: nextTurn,
      type: 'warning',
      title: 'High Government Debt',
      description: `Debt is ${(newCountry.debtToGdp * 100).toFixed(0)}% of GDP. Whether this is a problem depends on context: can you grow faster than your interest rate? Is debt in your own currency?`,
    });
  }
  if (newCountry.inflationRate > 0.1) {
    events.push({
      id: `inflation-warning-${state.turn}`,
      turn: nextTurn,
      type: 'warning',
      title: 'High Inflation',
      description: `Prices rising at ${(newCountry.inflationRate * 100).toFixed(1)}%/year. The right response depends on the cause: rate hikes fight demand inflation but worsen cost-push recessions.`,
    });
  }
  if (newFragility > 0.7 && prevFragility <= 0.7) {
    events.push({
      id: 'financial-crisis',
      turn: nextTurn,
      type: 'shock',
      title: 'Financial Crisis',
      description: 'Financial fragility crossed the critical threshold. A Minsky moment: years of deregulation and rising leverage have produced a crash. Stronger financial regulation and public banking could have prevented this.',
    });
  }

  /* ── Geopolitical events ── */
  let newGlobal: GlobalState = { ...global };
  const sid = scenario.scenarioId;

  if (sid === 'independence-underdevelopment' && !state.events.some((e) => e.id === 'geo-sanctions-nationalize')) {
    const nationalizing = (planningIntensity > 0.5 && publicBankingStrength > 0.4) || (profitWindfallTaxRate > 0.12 && planningIntensity > 0.4);
    if (nationalizing) {
      events.push({ id: 'geo-sanctions-nationalize', turn: nextTurn, type: 'warning', title: 'Sanctions After Nationalization', description: 'Nationalization angered powerful foreign interests. Sanctions imposed.' });
      newGlobal = { ...newGlobal, sanctionsActive: true, riskPremium: newGlobal.riskPremium + 0.035, exportDemandMultiplier: newGlobal.exportDemandMultiplier * 0.82 };
    }
  }
  if (sid === 'rust-belt' && !state.events.some((e) => e.id === 'geo-retaliation-protectionism')) {
    if ((tariffRate > 0.2 && capitalControlStrength > 0.6) || tariffRate > 0.25) {
      events.push({ id: 'geo-retaliation-protectionism', turn: nextTurn, type: 'warning', title: 'Trading Partners Retaliate', description: 'Trade barriers prompted retaliatory tariffs.' });
      newGlobal = { ...newGlobal, exportDemandMultiplier: newGlobal.exportDemandMultiplier * 0.88 };
    }
  }
  if (sid === 'commodity-pressure' && !state.events.some((e) => e.id === 'geo-creditors-restructure') && debtRestructuringStance > 0.55) {
    events.push({ id: 'geo-creditors-restructure', turn: nextTurn, type: 'warning', title: 'Creditors React', description: 'Debt restructuring stance raised borrowing costs.' });
    newGlobal = { ...newGlobal, riskPremium: newGlobal.riskPremium + 0.03 };
  }
  if (sid === 'rising-industrializer' && !state.events.some((e) => e.id === 'geo-unfair-trade') && planningIntensity > 0.55 && tariffRate > 0.18) {
    events.push({ id: 'geo-unfair-trade', turn: nextTurn, type: 'warning', title: 'Accused of Unfair Trade', description: 'State subsidies and protection drew accusations and retaliation.' });
    newGlobal = { ...newGlobal, exportDemandMultiplier: newGlobal.exportDemandMultiplier * 0.9 };
  }
  if (sid === 'sanctions-isolation' && !state.events.some((e) => e.id === 'geo-sanctions-tighten') && planningIntensity > 0.6 && priceControlStrength > 0.6) {
    events.push({ id: 'geo-sanctions-tighten', turn: nextTurn, type: 'warning', title: 'Sanctions Intensify', description: 'Defiant policies prompted harsher sanctions.' });
    newGlobal = { ...newGlobal, riskPremium: newGlobal.riskPremium + 0.025, exportDemandMultiplier: newGlobal.exportDemandMultiplier * 0.85 };
  }
  if (sid === 'emerging-debt-crisis' && !state.events.some((e) => e.id === 'geo-creditors-default') && debtRestructuringStance > 0.6) {
    events.push({ id: 'geo-creditors-default', turn: nextTurn, type: 'warning', title: 'Creditors React to Default', description: 'Debt restructuring raised borrowing costs.' });
    newGlobal = { ...newGlobal, riskPremium: newGlobal.riskPremium + 0.028 };
  }
  if (sid === 'chokepoint-closure') {
    if (!state.events.some((e) => e.id === 'chokepoint-closure-initial') && state.turn >= 1) {
      events.push({
        id: 'chokepoint-closure-initial',
        turn: nextTurn,
        type: 'shock',
        title: 'Critical Sea Lane Shut Down',
        description: 'A major maritime chokepoint has been closed, disrupting global oil and container flows. Freight and insurance costs spike.',
      });
      newGlobal = {
        ...newGlobal,
        commodityPriceIndex: newGlobal.commodityPriceIndex * 1.35,
        exportDemandMultiplier: newGlobal.exportDemandMultiplier * 0.84,
        riskPremium: newGlobal.riskPremium + 0.018,
      };
    }
    if (!state.events.some((e) => e.id === 'chokepoint-rerouting') && state.turn > 4 && (planningIntensity > 0.35 || infrastructureShare > 0.35 || capitalControlStrength > 0.4)) {
      events.push({
        id: 'chokepoint-rerouting',
        turn: nextTurn,
        type: 'milestone',
        title: 'Emergency Rerouting Network Built',
        description: 'Ports and logistics coordination ease bottlenecks; trade is still costly but less chaotic.',
      });
      newGlobal = {
        ...newGlobal,
        exportDemandMultiplier: newGlobal.exportDemandMultiplier * 1.07,
        riskPremium: Math.max(0, newGlobal.riskPremium - 0.008),
      };
    }
    if (!state.events.some((e) => e.id === 'chokepoint-energy-rationing') && state.turn > 3 && basicGoodsGuarantee < 0.25 && priceControlStrength < 0.2) {
      events.push({
        id: 'chokepoint-energy-rationing',
        turn: nextTurn,
        type: 'warning',
        title: 'Fuel and Transport Rationing Pressures',
        description: 'High import costs spill into transport and food distribution; shortages and social strain emerge.',
      });
      newCountry.approval = Math.max(0, newCountry.approval - 0.06);
    }
    if (!state.events.some((e) => e.id === 'chokepoint-reopening') && state.turn > 8) {
      events.push({
        id: 'chokepoint-reopening',
        turn: nextTurn,
        type: 'policy_effect',
        title: 'Partial Maritime Reopening',
        description: 'A mediated arrangement allows limited transit; the worst bottlenecks begin to unwind.',
      });
      newGlobal = {
        ...newGlobal,
        commodityPriceIndex: newGlobal.commodityPriceIndex * 0.9,
        exportDemandMultiplier: newGlobal.exportDemandMultiplier * 1.05,
      };
    }
  }

  /* ── Commodity price cycling (endogenous global) ── */
  const rng = _rng ?? (() => {
    let s = (state.turn * 2654435761 + 42) >>> 0;
    s ^= s << 13; s ^= s >> 17; s ^= s << 5;
    return (s >>> 0) / 4294967296;
  });
  const cyclePhase = Math.sin(state.turn * 0.4) * 0.03;
  const commodityDrift = cyclePhase + (rng() - 0.5) * 0.04;
  newGlobal = { ...newGlobal, commodityPriceIndex: clamp(newGlobal.commodityPriceIndex + commodityDrift, 0.5, 2.0) };

  /* ── South-South cooperation (endogenous global) ── */
  const isDeveloping = ['independence-underdevelopment', 'commodity-pressure', 'rising-industrializer'].includes(sid);
  if (isDeveloping && capitalControlStrength > 0.3 && planningIntensity > 0.3) {
    const ssBoost = 0.01 * (capitalControlStrength + planningIntensity - 0.6);
    newGlobal = { ...newGlobal, exportDemandMultiplier: newGlobal.exportDemandMultiplier + ssBoost };
    if (!state.events.some((e) => e.id === 'south-south-coop') && capitalControlStrength > 0.5 && planningIntensity > 0.5 && state.turn > 4) {
      events.push({ id: 'south-south-coop', turn: nextTurn, type: 'milestone', title: 'South-South Cooperation Strengthens', description: 'Independent economic policies attract trade partners from the Global South, reducing dependence on Western markets.' });
    }
  }

  return {
    turn: nextTurn,
    country: newCountry,
    global: newGlobal,
    scenario: { ...scenario },
    events,
    previousGdp: state.country.gdp,
  };
}
