import type {
  SimulationState,
  CountryState,
  GlobalState,
  ScenarioParams,
  PolicyActions,
  SectorId,
} from './state';
import { computeSectorOutputs, aggregateGdp } from './equations/production';
import { equilibriumY } from './equations/demand';
import { nextInflation, nextInflationExpectations } from './equations/inflation';
import {
  taxRevenue,
  expenditure,
  nextDebt,
  publicBankingRevenue,
} from './equations/government';
import { exchangeRateChange } from './equations/external';
import { approval } from './equations/approval';

function applyPolicyToCountry(country: CountryState, scenario: ScenarioParams, actions: PolicyActions): CountryState {
  const taxRate = Math.max(scenario.minTaxRate, Math.min(scenario.maxTaxRate, actions.incomeTaxRate ?? 0.2));
  const spendingShare = Math.max(scenario.minSpendingShare, Math.min(scenario.maxSpendingShare, actions.spendingShareOfGdp ?? 0.25));
  const policyRate = Math.max(scenario.minPolicyRate, Math.min(scenario.maxPolicyRate, actions.policyRate ?? country.policyRate));
  return {
    ...country,
    policyRate,
    inflationTarget: scenario.scenarioId.includes('stagflation') ? 0.02 : 0.025,
  };
}

function clamp(x: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, x));
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
  const profitWindfallTaxRate = Math.min(0.2, Math.max(0, actions.profitWindfallTaxRate ?? 0));
  const priceControlStrength = Math.min(1, Math.max(0, actions.priceControlStrength ?? 0));
  const incomesPolicyStrength = Math.min(1, Math.max(0, actions.incomesPolicyStrength ?? 0));
  const capitalControlStrength = Math.min(1, Math.max(0, actions.capitalControlStrength ?? 0));
  const domesticDebtShare = Math.min(1, Math.max(0, actions.domesticDebtShare ?? 0.5));
  const basicGoodsGuarantee = Math.min(1, Math.max(0, actions.basicGoodsGuarantee ?? 0));
  const planningIntensity = Math.min(1, Math.max(0, actions.planningIntensity ?? 0));
  const publicBankingStrength = Math.min(1, Math.max(0, actions.publicBankingStrength ?? 0));
  const debtRestructuringStance = Math.min(1, Math.max(0, actions.debtRestructuringStance ?? 0));
  const multiYearAgendaStrength = Math.min(1, Math.max(0, actions.multiYearAgendaStrength ?? 0));

  const { y, c, i, g, x, m } = equilibriumY(
    countryWithPolicy,
    global,
    scenario,
    actions,
    previousGdp
  );

  const currentAccount = x - m;
  const erChange = exchangeRateChange(currentAccount, y, regime);
  const newExchangeRate = country.exchangeRate * (1 + erChange);

  const nextInf = nextInflation(country, global, scenario, erChange, priceControlStrength, incomesPolicyStrength, basicGoodsGuarantee);
  const nextPiE = nextInflationExpectations(country.inflationExpectations, nextInf, 0.025, multiYearAgendaStrength);

  const rev = taxRevenue(y, m, taxRate, tariffRate, profitWindfallTaxRate, planningIntensity) + publicBankingRevenue(y, publicBankingStrength);
  const exp = expenditure(y, spendingShare);
  const deficit = exp - rev;
  let riskPremium = global.riskPremium + (country.debtToGdp > scenario.debtSustainabilityThreshold ? 0.02 : 0);
  riskPremium *= 1 - 0.25 * capitalControlStrength;
  riskPremium *= 1 - 0.15 * domesticDebtShare;
  riskPremium *= 1 - 0.1 * publicBankingStrength;
  riskPremium += 0.025 * debtRestructuringStance;
  const newDebt = nextDebt(country.publicDebt, deficit, policyRate, riskPremium, debtRestructuringStance);
  const debtToGdp = y > 0 ? newDebt / y : 0;

  const sectorOutputs = computeSectorOutputs(country);
  const totalOutput = aggregateGdp(sectorOutputs);
  const gdpGrowth = previousGdp > 0 ? (y - previousGdp) / previousGdp : 0;

  const employed = country.laborForce * (1 - 0.05 - 0.3 * Math.max(0, -gdpGrowth));
  const unemployed = Math.max(0, country.laborForce - employed);
  const unemploymentRate = country.laborForce > 0 ? unemployed / country.laborForce : 0.05;

  const newCountry: CountryState = {
    ...countryWithPolicy,
    gdp: y,
    gdpGrowth,
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
    fxReserves: country.fxReserves + currentAccount * 0.1,
    approval: approval(
      {
        ...countryWithPolicy,
        gdp: y,
        gdpGrowth,
        unemploymentRate,
        inflationRate: nextInf,
      } as CountryState,
      socialSpendingShare,
      basicGoodsGuarantee,
      multiYearAgendaStrength
    ),
  };

  const events = [...state.events];
  if (newCountry.debtToGdp > scenario.debtSustainabilityThreshold) {
    events.push({
      id: `debt-warning-${state.turn}`,
      turn: state.turn + 1,
      type: 'warning',
      title: 'High debt',
      description: `The government owes ${(newCountry.debtToGdp * 100).toFixed(1)}% of what the economy produces in a year. Check the Policy advice panel for ideas from different economic schools on what to do.`,
    });
  }
  if (newCountry.inflationRate > 0.1) {
    events.push({
      id: `inflation-warning-${state.turn}`,
      turn: state.turn + 1,
      type: 'warning',
      title: 'High inflation',
      description: `Prices are rising at ${(newCountry.inflationRate * 100).toFixed(1)}% per year. Check the Policy advice panel for ideas from different economic schools on what to do.`,
    });
  }

  const nextTurn = state.turn + 1;
  let newGlobal: GlobalState = { ...global };
  const sid = scenario.scenarioId;

  if (sid === 'independence-underdevelopment' && !state.events.some((e) => e.id === 'geo-sanctions-nationalize')) {
    const nationalizing = (planningIntensity > 0.5 && publicBankingStrength > 0.4) || (profitWindfallTaxRate > 0.12 && planningIntensity > 0.4);
    if (nationalizing) {
      events.push({
        id: 'geo-sanctions-nationalize',
        turn: nextTurn,
        type: 'warning',
        title: 'Sanctions imposed',
        description: 'Your government took more control of the economy (for example by nationalizing resources or banks). A powerful country that used to have influence over you does not like this. It has put sanctions on you. That means trade and borrowing from abroad get harder.',
      });
      newGlobal = { ...newGlobal, sanctionsActive: true, riskPremium: newGlobal.riskPremium + 0.035, exportDemandMultiplier: newGlobal.exportDemandMultiplier * 0.82 };
    }
  }

  if (sid === 'rust-belt' && !state.events.some((e) => e.id === 'geo-retaliation-protectionism')) {
    const veryProtectionist = (tariffRate > 0.2 && capitalControlStrength > 0.6) || tariffRate > 0.25;
    if (veryProtectionist) {
      events.push({
        id: 'geo-retaliation-protectionism',
        turn: nextTurn,
        type: 'warning',
        title: 'Trading partners push back',
        description: 'You raised tariffs and limited foreign money flows. Other countries say your policies are unfair. They are threatening to tax your exports more. Selling abroad could get harder.',
      });
      newGlobal = { ...newGlobal, exportDemandMultiplier: newGlobal.exportDemandMultiplier * 0.88 };
    }
  }

  if (sid === 'commodity-pressure' && !state.events.some((e) => e.id === 'geo-creditors-restructure')) {
    if (debtRestructuringStance > 0.55) {
      events.push({
        id: 'geo-creditors-restructure',
        turn: nextTurn,
        type: 'warning',
        title: 'Creditors and rich countries react',
        description: 'You chose to restructure or default on debt. The countries and banks you owe money to are angry. They say you are not trustworthy. Borrowing from abroad will cost you more from now on.',
      });
      newGlobal = { ...newGlobal, riskPremium: newGlobal.riskPremium + 0.03 };
    }
  }

  if (sid === 'rising-industrializer' && !state.events.some((e) => e.id === 'geo-unfair-trade')) {
    if (planningIntensity > 0.55 && tariffRate > 0.18) {
      events.push({
        id: 'geo-unfair-trade',
        turn: nextTurn,
        type: 'warning',
        title: 'Other countries accuse you of unfair trade',
        description: 'You are using a lot of state control and high tariffs. Richer countries say you are not playing fair. They may put higher taxes on your exports. Selling to them could get harder.',
      });
      newGlobal = { ...newGlobal, exportDemandMultiplier: newGlobal.exportDemandMultiplier * 0.9 };
    }
  }

  if (sid === 'sanctions-isolation' && !state.events.some((e) => e.id === 'geo-sanctions-tighten')) {
    if (planningIntensity > 0.6 && priceControlStrength > 0.6) {
      events.push({
        id: 'geo-sanctions-tighten',
        turn: nextTurn,
        type: 'warning',
        title: 'Sanctions get tighter',
        description: 'You doubled down on state control of the economy. The countries that put sanctions on you have made them stricter. Trade and borrowing from abroad are even harder now.',
      });
      newGlobal = { ...newGlobal, riskPremium: newGlobal.riskPremium + 0.025, exportDemandMultiplier: newGlobal.exportDemandMultiplier * 0.85 };
    }
  }

  if (sid === 'emerging-debt-crisis' && !state.events.some((e) => e.id === 'geo-creditors-default')) {
    if (debtRestructuringStance > 0.6) {
      events.push({
        id: 'geo-creditors-default',
        turn: nextTurn,
        type: 'warning',
        title: 'Creditors react to default or restructuring',
        description: 'You chose to restructure or default on your debt. The countries and banks you owe say you broke your promises. They will charge you more to borrow in the future.',
      });
      newGlobal = { ...newGlobal, riskPremium: newGlobal.riskPremium + 0.028 };
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
