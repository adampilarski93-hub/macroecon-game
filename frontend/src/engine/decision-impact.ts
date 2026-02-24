/**
 * Decision Impact Analyzer for Post-Game Educational Analysis
 *
 * This module analyzes the player's decision history and generates
 * detailed explanations of how their policy choices impacted the final results.
 * Focuses on educational value by connecting actions to consequences.
 */

import type { GameHistoryEntry, PolicyActions, SimulationState } from '../types';
import type { CountryState } from './state';

export interface DecisionImpact {
  turn: number;
  headline: string;
  policies: PolicySummary;
  immediateEffects: EffectSummary[];
  longTermConsequences: Consequence[];
  educationalNote: string;
}

interface PolicySummary {
  fiscal: string;
  monetary: string;
  structural: string;
  trade: string;
}

interface EffectSummary {
  metric: string;
  change: number;
  direction: 'positive' | 'negative' | 'neutral';
  explanation: string;
}

interface Consequence {
  turn: number;
  metric: string;
  impact: string;
  explanation: string;
}

export interface AggregateImpactAnalysis {
  topDecisions: DecisionImpact[];
  policyPatterns: PolicyPattern[];
  keyTradeoffs: TradeoffAnalysis[];
  educationalSummary: string;
  whatIfScenarios: WhatIfScenario[];
}

interface PolicyPattern {
  category: string;
  description: string;
  turnsApplied: number[];
  overallImpact: string;
  lesson: string;
}

interface TradeoffAnalysis {
  tradeoff: string;
  playerChoice: string;
  consequence: string;
  alternative: string;
}

interface WhatIfScenario {
  scenario: string;
  originalDecision: string;
  alternative: string;
  projectedOutcome: string;
}

/**
 * Analyze complete game history to generate detailed impact analysis
 */
export function analyzeDecisionImpact(
  history: GameHistoryEntry[],
  initialState: SimulationState,
  finalState: SimulationState,
): AggregateImpactAnalysis {
  if (history.length < 2) {
    return {
      topDecisions: [],
      policyPatterns: [],
      keyTradeoffs: [],
      educationalSummary: 'Not enough turns to analyze decision impact.',
      whatIfScenarios: [],
    };
  }

  const decisions = history
    .slice(1)
    .map((entry, idx) => analyzeSingleDecision(entry, history[idx].state));

  const topDecisions = findTopDecisions(decisions, 5);
  const policyPatterns = identifyPolicyPatterns(history);
  const keyTradeoffs = analyzeTradeoffs(history, decisions);
  const whatIfs = generateWhatIfScenarios(history, decisions);

  const educationalSummary = generateEducationalSummary(
    policyPatterns,
    keyTradeoffs,
    initialState,
    finalState,
  );

  return {
    topDecisions,
    policyPatterns,
    keyTradeoffs,
    educationalSummary,
    whatIfScenarios: whatIfs,
  };
}

/**
 * Analyze a single turn's decisions and their immediate effects
 */
function analyzeSingleDecision(entry: GameHistoryEntry, prevState: SimulationState): DecisionImpact {
  const { turn, actions, state } = entry;
  const c = state.country;
  const prev = prevState.country;

  const policies = summarizePolicies(actions);
  const immediateEffects = identifyImmediateEffects(c, prev);
  const longTermConsequences = [] as Consequence[];

  return {
    turn,
    headline: generateTurnHeadline(actions, immediateEffects),
    policies,
    immediateEffects,
    longTermConsequences,
    educationalNote: generateEducationalNote(actions, immediateEffects),
  };
}

function summarizePolicies(actions: PolicyActions): PolicySummary {
  const spendingChange = ((actions.spendingShareOfGdp ?? 0.2) - 0.2) * 100;
  const rateChange = ((actions.policyRate ?? 0.03) - 0.03) * 100;
  const taxChange = ((actions.incomeTaxRate ?? 0.2) - 0.2) * 100;

  let fiscal: string;
  if (Math.abs(spendingChange) < 1 && Math.abs(taxChange) < 1) {
    fiscal = 'Maintained neutral fiscal stance';
  } else if (spendingChange > 3 && taxChange > 3) {
    fiscal = `Expansionary fiscal: +${spendingChange.toFixed(1)}% spending, +${taxChange.toFixed(1)}% taxes`;
  } else if (spendingChange > 3) {
    fiscal = `Stimulus spending: increased by ${spendingChange.toFixed(1)}%`;
  } else if (spendingChange < -3) {
    fiscal = `Austerity: spending cut by ${Math.abs(spendingChange).toFixed(1)}%`;
  } else if (taxChange > 3) {
    fiscal = `Revenue focus: taxes raised ${taxChange.toFixed(1)}%`;
  } else if (taxChange < -3) {
    fiscal = `Tax relief: reduced by ${Math.abs(taxChange).toFixed(1)}%`;
  } else {
    fiscal = 'Minor fiscal adjustments';
  }

  let monetary: string;
  if (Math.abs(rateChange) < 0.5) {
    monetary = 'Stable interest rates';
  } else if (rateChange > 1) {
    monetary = `Tightening: rates raised ${rateChange.toFixed(1)}%`;
  } else if (rateChange < -1) {
    monetary = `Easing: rates cut ${Math.abs(rateChange).toFixed(1)}%`;
  } else {
    monetary = 'Minor rate adjustment';
  }

  const structural = [] as string[];
  if ((actions.infrastructureShare ?? 0) > 0.3) structural.push('heavy infrastructure');
  if ((actions.financialRegulationStrength ?? 0) > 0.5) structural.push('financial regulation');
  if ((actions.planningIntensity ?? 0) > 0.3) structural.push('economic planning');
  if ((actions.publicBankingStrength ?? 0) > 0.5) structural.push('public banking');

  const trade = [] as string[];
  const tariffRate = actions.tariffRate ?? 0;
  if (tariffRate > 0.05) trade.push(`tariffs ${(tariffRate * 100).toFixed(0)}%`);
  if ((actions.capitalControlStrength ?? 0) > 0.5) trade.push('capital controls');
  if ((actions.profitWindfallTaxRate ?? 0) > 0.1) trade.push('windfall taxes');

  return {
    fiscal,
    monetary,
    structural: structural.length > 0 ? structural.join(', ') : 'No major structural changes',
    trade: trade.length > 0 ? trade.join(', ') : 'Neutral trade policy',
  };
}

function identifyImmediateEffects(current: CountryState, previous: CountryState): EffectSummary[] {
  const effects: EffectSummary[] = [];

  // GDP Growth
  const gdpChange = (current.gdpGrowth - previous.gdpGrowth) * 100;
  if (Math.abs(gdpChange) > 0.5) {
    effects.push({
      metric: 'GDP Growth',
      change: gdpChange,
      direction: gdpChange > 0 ? 'positive' : 'negative',
      explanation: gdpChange > 2
        ? 'Strong expansion from fiscal/monetary stimulus'
        : gdpChange > 0
          ? 'Modest growth improvement'
          : gdpChange > -2
            ? 'Slight slowdown'
            : 'Sharp contraction likely from restrictive policies',
    });
  }

  // Inflation
  const inflChange = (current.inflationRate - previous.inflationRate) * 100;
  if (Math.abs(inflChange) > 0.3) {
    effects.push({
      metric: 'Inflation',
      change: inflChange,
      direction: inflChange > 0 ? 'negative' : 'positive',
      explanation: inflChange > 1
        ? 'Rising prices from demand stimulus or supply pressures'
        : inflChange > 0
          ? 'Moderate price increases'
          : 'Cooling prices from reduced demand or improved supply',
    });
  }

  // Unemployment
  const unempChange = (current.unemploymentRate - previous.unemploymentRate) * 100;
  if (Math.abs(unempChange) > 0.5) {
    effects.push({
      metric: 'Unemployment',
      change: unempChange,
      direction: unempChange > 0 ? 'negative' : 'positive',
      explanation: unempChange > 0
        ? 'Job losses from economic slowdown or restructuring'
        : 'Job creation from growth stimulus',
    });
  }

  // Approval
  const approvalChange = (current.approval - previous.approval) * 100;
  if (Math.abs(approvalChange) > 3) {
    effects.push({
      metric: 'Political Support',
      change: approvalChange,
      direction: approvalChange > 0 ? 'positive' : 'negative',
      explanation: approvalChange > 0
        ? 'Public responded positively to economic conditions'
        : 'Declining support due to economic dissatisfaction',
    });
  }

  // Wage Share (class analysis)
  const wageChange = (current.wageShare - previous.wageShare) * 100;
  if (Math.abs(wageChange) > 1) {
    effects.push({
      metric: 'Labor Share',
      change: wageChange,
      direction: 'neutral',
      explanation: wageChange > 0
        ? 'Workers gaining larger share of national income'
        : 'Capital capturing larger share of income',
    });
  }

  // Financial Fragility (Minsky)
  const fragilityChange = (current.financialFragility - previous.financialFragility) * 100;
  if (Math.abs(fragilityChange) > 3) {
    effects.push({
      metric: 'Financial Stability',
      change: -fragilityChange,
      direction: fragilityChange > 0 ? 'negative' : 'positive',
      explanation: fragilityChange > 0
        ? 'Rising financial fragility—Minsky moment risk increasing'
        : 'Improved financial stability through regulation',
    });
  }

  return effects;
}

function generateTurnHeadline(actions: PolicyActions, effects: EffectSummary[]): string {
  if (effects.length === 0) return 'Steady economic management';

  const gdpEffect = effects.find(e => e.metric === 'GDP Growth');
  const inflEffect = effects.find(e => e.metric === 'Inflation');
  const unempEffect = effects.find(e => e.metric === 'Unemployment');

  if (gdpEffect && gdpEffect.direction === 'positive' && (!inflEffect || inflEffect.change < 1)) {
    return 'Successful growth without inflationary pressure';
  }
  if (gdpEffect && gdpEffect.direction === 'positive' && inflEffect && inflEffect.change > 1) {
    return 'Stimulus-driven growth with rising inflation tradeoff';
  }
  if (inflEffect && inflEffect.direction === 'positive' && gdpEffect?.direction === 'negative') {
    return 'Disinflation achieved at cost of growth';
  }
  if (unempEffect && unempEffect.direction === 'positive' && !gdpEffect) {
    return 'Employment gains from policy support';
  }

  return effects[0].explanation.charAt(0).toUpperCase() + effects[0].explanation.slice(0, 50);
}

function generateEducationalNote(actions: PolicyActions, effects: EffectSummary[]): string {
  const notes: string[] = [];

  // Keynesian insight
  if ((actions.spendingShareOfGdp ?? 0) > 0.25) {
    notes.push('Higher government spending boosted demand (Keynesian multiplier effect).');
  }

  // Phillips curve insight
  const hasGdpGain = effects.some(e => e.metric === 'GDP Growth' && e.direction === 'positive');
  const hasInflRise = effects.some(e => e.metric === 'Inflation' && e.change > 0.5);
  if (hasGdpGain && hasInflRise) {
    notes.push('The Phillips Curve tradeoff: lower unemployment often brings inflation.');
  }

  // Minsky insight
  if ((actions.financialRegulationStrength ?? 0.5) < 0.3 && effects.some(e => e.metric === 'Financial Stability')) {
    notes.push('Financial deregulation can boost short-term growth but increases fragility (Minsky).');
  }

  // Marxian insight
  if (effects.some(e => e.metric === 'Labor Share' && e.change < 0)) {
    notes.push('Rising profit rate may indicate capital capturing surplus from labor.');
  }

  // Trade insight
  if ((actions.tariffRate ?? 0) > 0.05) {
    notes.push('Protectionist tariffs can support domestic industries but may invite retaliation.');
  }

  return notes.join(' ') || 'Standard policy adjustments with expected macroeconomic effects.';
}

function findTopDecisions(decisions: DecisionImpact[], limit: number): DecisionImpact[] {
  return decisions
    .filter(d => d.immediateEffects.length > 0)
    .sort((a, b) => {
      const aImpact = a.immediateEffects.reduce((sum, e) => sum + Math.abs(e.change), 0);
      const bImpact = b.immediateEffects.reduce((sum, e) => sum + Math.abs(e.change), 0);
      return bImpact - aImpact;
    })
    .slice(0, limit);
}

function identifyPolicyPatterns(history: GameHistoryEntry[]): PolicyPattern[] {
  const patterns: PolicyPattern[] = [];
  const actions = history.slice(1).map(h => h.actions);

  // Check for consistent stimulus
  const highSpendingTurns = history
    .slice(1)
    .filter(h => (h.actions.spendingShareOfGdp ?? 0) > 0.25)
    .map(h => h.turn);
  if (highSpendingTurns.length >= 3) {
    patterns.push({
      category: 'Fiscal Stimulus',
      description: `You maintained expansionary fiscal policy for ${highSpendingTurns.length} turns`,
      turnsApplied: highSpendingTurns,
      overallImpact: highSpendingTurns.length > history.length / 2
        ? 'Sustained demand support but potential inflation buildup'
        : 'Targeted counter-cyclical intervention',
      lesson: 'Persistent stimulus can prevent recession but requires careful inflation monitoring.',
    });
  }

  // Check for austerity
  const austerityTurns = history
    .slice(1)
    .filter(h => (h.actions.spendingShareOfGdp ?? 0.2) < 0.15)
    .map(h => h.turn);
  if (austerityTurns.length >= 3) {
    patterns.push({
      category: 'Fiscal Consolidation',
      description: `Austerity measures in ${austerityTurns.length} turns`,
      turnsApplied: austerityTurns,
      overallImpact: 'Reduced deficits but likely slowed growth',
      lesson: 'Debt reduction often comes at the cost of short-term economic pain.',
    });
  }

  // Check for activism vs stability
  const rateChanges = history.slice(2).filter((h, i) => {
    const prev = history[i + 1]?.actions?.policyRate ?? 0.03;
    const curr = h.actions.policyRate ?? 0.03;
    return Math.abs(curr - prev) > 0.01;
  });
  if (rateChanges.length > history.length / 3) {
    patterns.push({
      category: 'Active Monetary Policy',
      description: `Frequent rate changes (${rateChanges.length} adjustments)`,
      turnsApplied: rateChanges.map(h => h.turn),
      overallImpact: 'Responsive to conditions but may create uncertainty',
      lesson: 'Frequent policy changes can signal volatility—credibility matters.',
    });
  }

  // Check for structural transformation
  const planningTurns = history
    .slice(1)
    .filter(h => (h.actions.planningIntensity ?? 0) > 0.5)
    .map(h => h.turn);
  if (planningTurns.length >= 2) {
    patterns.push({
      category: 'Industrial Policy',
      description: 'Active economic planning and direction',
      turnsApplied: planningTurns,
      overallImpact: 'Long-term structural changes over short-term market outcomes',
      lesson: 'Planning can coordinate investment but requires accurate foresight.',
    });
  }

  return patterns;
}

function analyzeTradeoffs(
  history: GameHistoryEntry[],
  decisions: DecisionImpact[],
): TradeoffAnalysis[] {
  const tradeoffs: TradeoffAnalysis[] = [];

  // Find inflation-growth tradeoff instances
  const growthInflationTurns = decisions.filter(d =>
    d.immediateEffects.some(e => e.metric === 'GDP Growth' && e.direction === 'positive') &&
    d.immediateEffects.some(e => e.metric === 'Inflation' && e.change > 0.5),
  );

  if (growthInflationTurns.length > 0) {
    tradeoffs.push({
      tradeoff: 'Growth vs. Price Stability',
      playerChoice: 'Prioritized growth through stimulus',
      consequence: `Inflation rose in ${growthInflationTurns.length} turn(s)`,
      alternative: 'Tighter policy could have controlled prices at growth cost',
    });
  }

  // Find short-term vs long-term tradeoffs
  const highFragilityTurns = history.filter(h => (h.state.country.financialFragility ?? 0) > 0.6);
  if (highFragilityTurns.length > 0) {
    tradeoffs.push({
      tradeoff: 'Short-term Growth vs. Financial Stability',
      playerChoice: 'Accepted higher fragility for growth',
      consequence: 'Elevated Minsky moment risk',
      alternative: 'Stronger regulation could have stabilized but slowed expansion',
    });
  }

  // Class conflict tradeoff
  const profitFavoredTurns = decisions.filter(d =>
    d.immediateEffects.some(e => e.metric === 'Labor Share' && e.change < -1),
  );
  if (profitFavoredTurns.length > 0) {
    tradeoffs.push({
      tradeoff: 'Capital vs. Labor Income Distribution',
      playerChoice: 'Policies favored profit accumulation',
      consequence: 'Rising profit rate, potential social tension',
      alternative: 'Higher wages could have boosted consumption but reduced investment',
    });
  }

  return tradeoffs;
}

function generateWhatIfScenarios(
  history: GameHistoryEntry[],
  decisions: DecisionImpact[],
): WhatIfScenario[] {
  const whatIfs: WhatIfScenario[] = [];

  // What if they hadn't stimulated when they did?
  const stimulusTurns = history.filter(h => (h.actions.spendingShareOfGdp ?? 0) > 0.25);
  if (stimulusTurns.length > 0 && stimulusTurns[0].state.country.gdpGrowth < 0.02) {
    whatIfs.push({
      scenario: 'Counter-cyclical Timing',
      originalDecision: `Stimulus in turn ${stimulusTurns[0].turn} when growth was low`,
      alternative: 'Wait for automatic stabilizers or market correction',
      projectedOutcome: 'Possible deeper recession initially, but stronger fundamentals later',
    });
  }

  // What if they had controlled inflation earlier?
  const highInflationTurns = history.filter(h => (h.state.country.inflationRate ?? 0) > 0.05);
  if (highInflationTurns.length >= 2) {
    whatIfs.push({
      scenario: 'Early Intervention',
      originalDecision: 'Delayed response to rising inflation',
      alternative: 'Earlier rate hikes or spending cuts',
      projectedOutcome: 'Lower peak inflation but possibly higher unemployment',
    });
  }

  // What if they had regulated financial sector more?
  const lowRegulation = history.filter(h => (h.actions.financialRegulationStrength ?? 0) < 0.3);
  if (lowRegulation.length > history.length / 2) {
    whatIfs.push({
      scenario: 'Financial Regulation',
      originalDecision: 'Light-touch financial regulation',
      alternative: 'Stronger capital requirements and oversight',
      projectedOutcome: 'More stable credit but potentially slower innovation',
    });
  }

  return whatIfs;
}

function generateEducationalSummary(
  patterns: PolicyPattern[],
  tradeoffs: TradeoffAnalysis[],
  initial: SimulationState,
  final: SimulationState,
): string {
  const cInitial = initial.country;
  const cFinal = final.country;

  const gdpGrowth = ((cFinal.gdp - cInitial.gdp) / cInitial.gdp) * 100;
  const approvalChange = (cFinal.approval - cInitial.approval) * 100;
  const inequalityChange = ((cFinal.wageShare ?? 0.5) - (cInitial.wageShare ?? 0.5)) * 100;

  let summary = `Your term saw GDP ${gdpGrowth >= 0 ? 'grow' : 'shrink'} by ${Math.abs(gdpGrowth).toFixed(1)}%. `;

  if (patterns.length > 0) {
    summary += `Your dominant approach was ${patterns[0].category.toLowerCase()}. `;
  }

  if (tradeoffs.length > 0) {
    summary += `You faced the classic ${tradeoffs[0].tradeoff.toLowerCase()} tradeoff. `;
  }

  if (approvalChange > 10) {
    summary += 'Strong political performance from economic success.';
  } else if (approvalChange < -10) {
    summary += 'Political challenges from unmet economic expectations.';
  } else {
    summary += 'Moderate political outcomes despite economic changes.';
  }

  if (Math.abs(inequalityChange) > 3) {
    summary += ` Notable ${inequalityChange > 0 ? 'reduction' : 'increase'} in inequality occurred.`;
  }

  return summary;
}

/**
 * Generate a human-readable decision impact report
 */
export function generateDecisionImpactReport(analysis: AggregateImpactAnalysis): string {
  const sections: string[] = [];

  // Executive Summary
  sections.push('## Executive Summary\n' + analysis.educationalSummary);

  // Key Decisions
  if (analysis.topDecisions.length > 0) {
    sections.push('## Most Impactful Decisions\n');
    analysis.topDecisions.forEach((d, i) => {
      sections.push(`**Turn ${d.turn}:** ${d.headline}`);
      sections.push(`- Fiscal: ${d.policies.fiscal}`);
      sections.push(`- Monetary: ${d.policies.monetary}`);
      d.immediateEffects.slice(0, 2).forEach(e => {
        const symbol = e.direction === 'positive' ? '↑' : e.direction === 'negative' ? '↓' : '→';
        sections.push(`- ${e.metric}: ${symbol} ${e.change > 0 ? '+' : ''}${e.change.toFixed(1)}% — ${e.explanation}`);
      });
      sections.push(`- 💡 *${d.educationalNote}*\n`);
    });
  }

  // Policy Patterns
  if (analysis.policyPatterns.length > 0) {
    sections.push('## Policy Patterns\n');
    analysis.policyPatterns.forEach(p => {
      sections.push(`**${p.category}** (${p.turnsApplied.length} turns)`);
      sections.push(p.description);
      sections.push(`- Impact: ${p.overallImpact}`);
      sections.push(`- 📚 Lesson: ${p.lesson}\n`);
    });
  }

  // Tradeoffs
  if (analysis.keyTradeoffs.length > 0) {
    sections.push('## Key Economic Tradeoffs\n');
    analysis.keyTradeoffs.forEach((t, i) => {
      sections.push(`${i + 1}. **${t.tradeoff}**`);
      sections.push(`   - Your choice: ${t.playerChoice}`);
      sections.push(`   - Consequence: ${t.consequence}`);
      sections.push(`   - Alternative: ${t.alternative}\n`);
    });
  }

  // What-Ifs
  if (analysis.whatIfScenarios.length > 0) {
    sections.push('## What If You Had Done Different?\n');
    analysis.whatIfScenarios.forEach((w, i) => {
      sections.push(`${i + 1}. **${w.scenario}**`);
      sections.push(`   - You did: ${w.originalDecision}`);
      sections.push(`   - Alternative: ${w.alternative}`);
      sections.push(`   - Possible outcome: ${w.projectedOutcome}\n`);
    });
  }

  return sections.join('\n');
}
