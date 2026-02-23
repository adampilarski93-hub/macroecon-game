import type { ScenarioNarrativeConfig } from './scenario-types';
import { getNode as getEmergingNode } from './scenario-trees/emerging-debt-crisis';
import { getNode as getStagflationNode } from './scenario-trees/stagflation';
import { getNode as getRustBeltNode } from './scenario-trees/rust-belt';
import { getNode as getTutorialNode } from './scenario-trees/tutorial';
import { getNode as getIndependenceNode } from './scenario-trees/independence-underdevelopment';
import { getNode as getCommodityNode } from './scenario-trees/commodity-pressure';
import { getNode as getRisingNode } from './scenario-trees/rising-industrializer';
import { getNode as getSanctionsNode } from './scenario-trees/sanctions-isolation';

const COMMON_STAT_COLORS: Record<string, string> = {
  economicStrength: '#22c55e',
  publicSupport: '#ec4899',
  debtBurden: '#ef4444',
  priceStability: '#3b82f6',
  employment: '#14b8a6',
  sovereignty: '#f59e0b',
  externalBalance: '#a855f7',
  internationalStanding: '#8b5cf6',
};

function makeConfig(
  scenarioId: string,
  scenarioName: string,
  countryName: string,
  statOrder: string[],
  statLabels: Record<string, string>,
  initialStats: Record<string, number>,
  getNode: (id: string) => ReturnType<typeof getEmergingNode>,
  earlyEndNodeIds: string[] = [],
  earlyEndText: Record<string, { title: string; text: string }> = {},
): ScenarioNarrativeConfig {
  const statColors: Record<string, string> = {};
  for (const k of statOrder) {
    statColors[k] = COMMON_STAT_COLORS[k] ?? '#94a3b8';
  }

  return {
    scenarioId,
    scenarioName,
    countryName,
    statOrder,
    statLabels,
    statColors,
    initialStats,
    earlyEndNodeIds,
    earlyEndText,
    getNode,
    checkEarlyEnd: () => null,
    evaluateEnding: (stats) => {
      const debt = stats.debtBurden ?? 50;
      const support = stats.publicSupport ?? 50;
      const economic = stats.economicStrength ?? 50;
      const score = Math.round(
        (100 - debt) * 0.25 + support * 0.25 + economic * 0.25 +
        (stats.priceStability ?? 50) * 0.1 + (stats.employment ?? 50) * 0.1 +
        (stats.sovereignty ?? 50) * 0.05,
      );
      const won = support >= 40 && debt <= 70;
      return {
        won,
        score: Math.min(100, Math.max(0, score)),
        summary: won
          ? `You achieved your objectives. ${countryName} is on a sustainable path.`
          : `You fell short of your goals. The struggle continues.`,
      };
    },
  };
}

export const scenarioNarrativeRegistry: Record<string, ScenarioNarrativeConfig> = {
  'emerging-debt-crisis': makeConfig(
    'emerging-debt-crisis',
    'Emerging Debt Crisis',
    'Republic of Meridia',
    ['economicStrength', 'publicSupport', 'debtBurden'],
    {
      economicStrength: 'Economic Strength',
      publicSupport: 'Public Support',
      debtBurden: 'Debt Burden',
    },
    { economicStrength: 50, publicSupport: 50, debtBurden: 50 },
    getEmergingNode,
  ),
  stagflation: makeConfig(
    'stagflation',
    'Stagflation',
    'Federated States of Norden',
    ['economicStrength', 'publicSupport', 'priceStability'],
    {
      economicStrength: 'Growth',
      publicSupport: 'Public Support',
      priceStability: 'Price Stability',
    },
    { economicStrength: 45, publicSupport: 45, priceStability: 40 },
    getStagflationNode,
  ),
  'rust-belt': makeConfig(
    'rust-belt',
    'Rust Belt Revival',
    'Federal Republic of Nordmark',
    ['economicStrength', 'publicSupport', 'debtBurden', 'employment'],
    {
      economicStrength: 'Economic Strength',
      publicSupport: 'Public Support',
      debtBurden: 'Debt Burden',
      employment: 'Employment',
    },
    { economicStrength: 45, publicSupport: 50, debtBurden: 45, employment: 45 },
    getRustBeltNode,
  ),
  tutorial: makeConfig(
    'tutorial',
    'Learning the Basics',
    'Republic of Calmwater',
    ['economicStrength', 'publicSupport', 'debtBurden'],
    {
      economicStrength: 'Economic Strength',
      publicSupport: 'Public Support',
      debtBurden: 'Debt Burden',
    },
    { economicStrength: 55, publicSupport: 60, debtBurden: 35 },
    getTutorialNode,
  ),
  'independence-underdevelopment': makeConfig(
    'independence-underdevelopment',
    'Independence & Underdevelopment',
    'Republic of Uhuru',
    ['economicStrength', 'publicSupport', 'debtBurden', 'sovereignty'],
    {
      economicStrength: 'Economic Strength',
      publicSupport: 'Public Support',
      debtBurden: 'Debt Burden',
      sovereignty: 'Sovereignty',
    },
    { economicStrength: 35, publicSupport: 55, debtBurden: 40, sovereignty: 50 },
    getIndependenceNode,
  ),
  'commodity-pressure': makeConfig(
    'commodity-pressure',
    'Commodity Shock & Development Squeeze',
    'Republic of Kemet',
    ['economicStrength', 'publicSupport', 'debtBurden', 'priceStability', 'externalBalance'],
    {
      economicStrength: 'Economic Strength',
      publicSupport: 'Public Support',
      debtBurden: 'Debt Burden',
      priceStability: 'Price Stability',
      externalBalance: 'External Balance',
    },
    { economicStrength: 45, publicSupport: 40, debtBurden: 50, priceStability: 35, externalBalance: 40 },
    getCommodityNode,
  ),
  'rising-industrializer': makeConfig(
    'rising-industrializer',
    'Rising Industrializer',
    "People's Republic of Donghai",
    ['economicStrength', 'publicSupport', 'debtBurden', 'priceStability'],
    {
      economicStrength: 'Economic Strength',
      publicSupport: 'Public Support',
      debtBurden: 'Debt Burden',
      priceStability: 'Price Stability',
    },
    { economicStrength: 55, publicSupport: 55, debtBurden: 45, priceStability: 50 },
    getRisingNode,
  ),
  'sanctions-isolation': makeConfig(
    'sanctions-isolation',
    'Under Sanctions',
    'Republic of Persea',
    ['economicStrength', 'publicSupport', 'sovereignty', 'internationalStanding'],
    {
      economicStrength: 'Economic Strength',
      publicSupport: 'Public Support',
      sovereignty: 'Sovereignty',
      internationalStanding: 'International Standing',
    },
    { economicStrength: 40, publicSupport: 38, sovereignty: 45, internationalStanding: 30 },
    getSanctionsNode,
  ),
};

export function getScenarioNarrativeConfig(scenarioId: string): ScenarioNarrativeConfig | null {
  return scenarioNarrativeRegistry[scenarioId] ?? null;
}

export function hasDecisionTreeMode(scenarioId: string): boolean {
  return scenarioId in scenarioNarrativeRegistry;
}
