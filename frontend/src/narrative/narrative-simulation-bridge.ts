/**
 * Bridge between narrative decision tree stats and the simulation engine.
 * Maps narrative stats (0-100 scale) to PolicyActions, then runs the
 * simulation engine to produce a parallel economic state.
 */

import type { SimulationState, PolicyActions } from '../engine/state';
import type { GenericStats } from './scenario-types';
import { step } from '../engine/step';
import { createInitialState } from '../scenarios';

export function initSimulationForNarrative(scenarioId: string): SimulationState | null {
  return createInitialState(scenarioId);
}

/**
 * Derive PolicyActions from narrative stats. This is a heuristic mapping:
 * narrative stats on a 0-100 scale are translated into policy lever positions.
 */
export function narrativeStatsToPolicyActions(stats: GenericStats): PolicyActions {
  const economicStrength = (stats.economicStrength ?? 50) / 100;
  const publicSupport = (stats.publicSupport ?? 50) / 100;
  const debtBurden = (stats.debtBurden ?? 50) / 100;
  const sovereignty = (stats.sovereignty ?? 50) / 100;
  const priceStability = (stats.priceStability ?? 50) / 100;
  const employment = (stats.employment ?? 50) / 100;

  // Higher sovereignty → more planning, capital controls, public banking
  const planningIntensity = sovereignty * 0.8;
  const capitalControlStrength = sovereignty * 0.6;
  const publicBankingStrength = sovereignty * 0.5;

  // Higher publicSupport → more social spending, basic goods
  const socialSpendingShare = 0.2 + publicSupport * 0.3;
  const basicGoodsGuarantee = publicSupport * 0.6;

  // Debt burden affects fiscal stance
  const spendingShareOfGdp = 0.2 + economicStrength * 0.15 - debtBurden * 0.1;
  const incomeTaxRate = 0.15 + debtBurden * 0.1 + publicSupport * 0.05;

  // Price stability affects monetary policy
  const policyRate = 0.02 + (1 - priceStability) * 0.1;
  const priceControlStrength = (1 - priceStability) * 0.3 + sovereignty * 0.2;
  const incomesPolicyStrength = (1 - priceStability) * 0.2 + publicSupport * 0.2;

  // Employment affects infrastructure
  const infrastructureShare = employment * 0.3 + economicStrength * 0.1;

  return {
    incomeTaxRate: Math.min(0.4, Math.max(0.1, incomeTaxRate)),
    spendingShareOfGdp: Math.min(0.45, Math.max(0.15, spendingShareOfGdp)),
    policyRate: Math.min(0.2, Math.max(0.01, policyRate)),
    socialSpendingShare: Math.min(0.5, Math.max(0.1, socialSpendingShare)),
    basicGoodsGuarantee: Math.min(1, Math.max(0, basicGoodsGuarantee)),
    planningIntensity: Math.min(1, Math.max(0, planningIntensity)),
    capitalControlStrength: Math.min(1, Math.max(0, capitalControlStrength)),
    publicBankingStrength: Math.min(1, Math.max(0, publicBankingStrength)),
    infrastructureShare: Math.min(1, Math.max(0, infrastructureShare)),
    priceControlStrength: Math.min(1, Math.max(0, priceControlStrength)),
    incomesPolicyStrength: Math.min(1, Math.max(0, incomesPolicyStrength)),
    financialRegulationStrength: sovereignty * 0.5,
    tariffRate: sovereignty * 0.15 + 0.05,
    multiYearAgendaStrength: economicStrength * 0.4,
  };
}

/**
 * Run one simulation step using narrative stats to derive policies.
 */
export function narrativeSimStep(
  simState: SimulationState,
  stats: GenericStats,
): SimulationState {
  const actions = narrativeStatsToPolicyActions(stats);
  return step(simState, actions);
}
