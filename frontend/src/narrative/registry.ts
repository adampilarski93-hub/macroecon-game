import type { ScenarioNarrativeConfig } from './scenario-types';
import { createNarrativeTree as createEmergingTree } from './scenario-trees/emerging-debt-crisis';
import { createNarrativeTree as createStagflationTree } from './scenario-trees/stagflation';
import { createNarrativeTree as createRustBeltTree } from './scenario-trees/rust-belt';
import { createNarrativeTree as createTutorialTree } from './scenario-trees/tutorial';
import { createNarrativeTree as createIndependenceTree } from './scenario-trees/independence-underdevelopment';
import { createNarrativeTree as createCommodityTree } from './scenario-trees/commodity-pressure';
import { createNarrativeTree as createRisingTree } from './scenario-trees/rising-industrializer';
import { createNarrativeTree as createSanctionsTree } from './scenario-trees/sanctions-isolation';
import { createNarrativeTree as createGulfMigrantTree } from './scenario-trees/gulf-migrant';
import { createNarrativeTree as createPlurinationalTree } from './scenario-trees/plurinational-path';
import { createNarrativeTree as createReservationGovernorTree } from './scenario-trees/reservation-governor';
import { createNarrativeTree as createAiDisplacedTree } from './scenario-trees/ai-displaced';

const COMMON_STAT_COLORS: Record<string, string> = {
  economicStrength: '#22c55e',
  publicSupport: '#ec4899',
  debtBurden: '#ef4444',
  priceStability: '#3b82f6',
  employment: '#14b8a6',
  sovereignty: '#f59e0b',
  externalBalance: '#a855f7',
  internationalStanding: '#8b5cf6',
  savings: '#22c55e',
  health: '#14b8a6',
  legalStatus: '#3b82f6',
  solidarity: '#ec4899',
  dignity: '#f59e0b',
  plurinationalUnity: '#10b981',
  laborUnity: '#f97316',
  culturalIntegrity: '#8b5cf6',
  fiscalHealth: '#14b8a6',
  employability: '#3b82f6',
};

type EvaluateEndingFn = ScenarioNarrativeConfig['evaluateEnding'];

function makeConfig(
  scenarioId: string,
  scenarioName: string,
  countryName: string,
  statOrder: string[],
  statLabels: Record<string, string>,
  initialStats: Record<string, number>,
  getNode: ScenarioNarrativeConfig['getNode'],
  earlyEndNodeIds: string[] = [],
  earlyEndText: Record<string, { title: string; text: string }> = {},
  customEvaluateEnding?: EvaluateEndingFn,
): ScenarioNarrativeConfig {
  const statColors: Record<string, string> = {};
  for (const k of statOrder) {
    statColors[k] = COMMON_STAT_COLORS[k] ?? '#94a3b8';
  }

  const defaultEvaluateEnding: EvaluateEndingFn = (stats) => {
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
  };

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
    evaluateEnding: customEvaluateEnding ?? defaultEvaluateEnding,
  };
}

type ConfigFactory = (scenarioId: string) => ScenarioNarrativeConfig;

export const scenarioNarrativeRegistry: Record<string, ScenarioNarrativeConfig | ConfigFactory> = {
  'emerging-debt-crisis': (scenarioId) => {
    const { getNode } = createEmergingTree({ shuffle: true });
    return makeConfig(
      'emerging-debt-crisis',
      'Emerging Debt Crisis',
      'Republic of Meridia',
      ['economicStrength', 'publicSupport', 'debtBurden'],
      { economicStrength: 'Economic Strength', publicSupport: 'Public Support', debtBurden: 'Debt Burden' },
      { economicStrength: 50, publicSupport: 50, debtBurden: 50 },
      getNode,
    );
  },
  stagflation: (scenarioId) => {
    const { getNode } = createStagflationTree({ shuffle: true });
    return makeConfig(
      'stagflation',
      'Stagflation',
      'Federated States of Norden',
      ['economicStrength', 'publicSupport', 'priceStability'],
      { economicStrength: 'Growth', publicSupport: 'Public Support', priceStability: 'Price Stability' },
      { economicStrength: 45, publicSupport: 45, priceStability: 40 },
      getNode,
    );
  },
  'rust-belt': (scenarioId) => {
    const { getNode } = createRustBeltTree({ shuffle: true });
    return makeConfig(
      'rust-belt',
      'Rust Belt Revival',
      'Federal Republic of Nordmark',
      ['economicStrength', 'publicSupport', 'debtBurden', 'employment'],
      { economicStrength: 'Economic Strength', publicSupport: 'Public Support', debtBurden: 'Debt Burden', employment: 'Employment' },
      { economicStrength: 45, publicSupport: 50, debtBurden: 45, employment: 45 },
      getNode,
    );
  },
  tutorial: (scenarioId) => {
    const { getNode } = createTutorialTree({ shuffle: true });
    return makeConfig(
      'tutorial',
      'Learning the Basics',
      'Republic of Calmwater',
      ['economicStrength', 'publicSupport', 'debtBurden'],
      { economicStrength: 'Economic Strength', publicSupport: 'Public Support', debtBurden: 'Debt Burden' },
      { economicStrength: 55, publicSupport: 60, debtBurden: 35 },
      getNode,
    );
  },
  'independence-underdevelopment': (scenarioId) => {
    const { getNode } = createIndependenceTree({ shuffle: true });
    return makeConfig(
      'independence-underdevelopment',
      'Independence & Underdevelopment',
      'Republic of Uhuru',
      ['economicStrength', 'publicSupport', 'debtBurden', 'sovereignty'],
      { economicStrength: 'Economic Strength', publicSupport: 'Public Support', debtBurden: 'Debt Burden', sovereignty: 'Sovereignty' },
      { economicStrength: 35, publicSupport: 55, debtBurden: 40, sovereignty: 50 },
      getNode,
    );
  },
  'commodity-pressure': (scenarioId) => {
    const { getNode } = createCommodityTree({ shuffle: true });
    return makeConfig(
      'commodity-pressure',
      'Commodity Shock & Development Squeeze',
      'Republic of Kemet',
      ['economicStrength', 'publicSupport', 'debtBurden', 'priceStability', 'externalBalance'],
      { economicStrength: 'Economic Strength', publicSupport: 'Public Support', debtBurden: 'Debt Burden', priceStability: 'Price Stability', externalBalance: 'External Balance' },
      { economicStrength: 45, publicSupport: 40, debtBurden: 50, priceStability: 35, externalBalance: 40 },
      getNode,
    );
  },
  'rising-industrializer': (scenarioId) => {
    const { getNode } = createRisingTree({ shuffle: true });
    return makeConfig(
      'rising-industrializer',
      'Rising Industrializer',
      "People's Republic of Donghai",
      ['economicStrength', 'publicSupport', 'debtBurden', 'priceStability'],
      { economicStrength: 'Economic Strength', publicSupport: 'Public Support', debtBurden: 'Debt Burden', priceStability: 'Price Stability' },
      { economicStrength: 55, publicSupport: 55, debtBurden: 45, priceStability: 50 },
      getNode,
    );
  },
  'sanctions-isolation': (scenarioId) => {
    const { getNode } = createSanctionsTree({ shuffle: true });
    return makeConfig(
      'sanctions-isolation',
      'Under Sanctions',
      'Republic of Persea',
      ['economicStrength', 'publicSupport', 'sovereignty', 'internationalStanding'],
      { economicStrength: 'Economic Strength', publicSupport: 'Public Support', sovereignty: 'Sovereignty', internationalStanding: 'International Standing' },
      { economicStrength: 40, publicSupport: 38, sovereignty: 45, internationalStanding: 30 },
      getNode,
    );
  },
  'gulf-migrant': (scenarioId) => {
    const { getNode } = createGulfMigrantTree({ shuffle: true });
    return makeConfig(
      'gulf-migrant',
      'Gulf Migrant',
      'Emirate of Zahra',
      ['savings', 'health', 'legalStatus', 'solidarity', 'dignity'],
      { savings: 'Savings / Remittances', health: 'Health', legalStatus: 'Legal Standing', solidarity: 'Solidarity', dignity: 'Dignity' },
      { savings: 40, health: 55, legalStatus: 35, solidarity: 40, dignity: 45 },
      getNode,
      [],
      {},
      (stats) => {
      const savings = stats.savings ?? 50;
      const health = stats.health ?? 50;
      const dignity = stats.dignity ?? 50;
      const solidarity = stats.solidarity ?? 50;
      const score = Math.round(
        savings * 0.25 + health * 0.25 + dignity * 0.25 +
        solidarity * 0.15 + (stats.legalStatus ?? 50) * 0.1,
      );
      const won = health >= 35 && dignity >= 40 && (savings >= 45 || solidarity >= 55);
      return {
        won,
        score: Math.min(100, Math.max(0, score)),
        summary: won
          ? `You survived with dignity. You built the megacity — and you left with more than you came with.`
          : `The system took its toll. You leave with what you could save. The struggle continues.`,
      };
    },
    );
  },
  'plurinational-path': (scenarioId) => {
    const { getNode } = createPlurinationalTree({ shuffle: true });
    return makeConfig(
      'plurinational-path',
      'Plurinational Path',
      'Republic of Altura',
      ['sovereignty', 'publicSupport', 'economicStrength', 'plurinationalUnity', 'laborUnity', 'debtBurden'],
      { sovereignty: 'Sovereignty', publicSupport: 'Public Support', economicStrength: 'Economic Strength', plurinationalUnity: 'Plurinational Unity', laborUnity: 'Labor Unity', debtBurden: 'Debt Burden' },
      { sovereignty: 45, publicSupport: 55, economicStrength: 40, plurinationalUnity: 45, laborUnity: 50, debtBurden: 50 },
      getNode,
      [],
      {},
      (stats) => {
      const sovereignty = stats.sovereignty ?? 50;
      const support = stats.publicSupport ?? 50;
      const economic = stats.economicStrength ?? 50;
      const plurinational = stats.plurinationalUnity ?? 50;
      const labor = stats.laborUnity ?? 50;
      const debt = stats.debtBurden ?? 50;
      const score = Math.round(
        sovereignty * 0.2 + support * 0.2 + economic * 0.15 +
        plurinational * 0.15 + labor * 0.15 + (100 - debt) * 0.15,
      );
      const won = sovereignty >= 40 && support >= 40 && (plurinational >= 45 || labor >= 45);
      return {
        won,
        score: Math.min(100, Math.max(0, score)),
        summary: won
          ? `You built socialism in a plurinational country. Sovereignty, unity, and worker power — the struggle continues.`
          : `The old order returned. But hope persists. The fight for a sovereign, plurinational future goes on.`,
      };
    },
    );
  },
  'reservation-governor': (scenarioId) => {
    const { getNode } = createReservationGovernorTree({ shuffle: true });
    return makeConfig(
      'reservation-governor',
      'Reservation Governor',
      'Red Mesa Nation',
      ['sovereignty', 'economicStrength', 'publicSupport', 'culturalIntegrity', 'fiscalHealth'],
      { sovereignty: 'Sovereignty', economicStrength: 'Economic Strength', publicSupport: 'Public Support', culturalIntegrity: 'Cultural Integrity', fiscalHealth: 'Fiscal Health' },
      { sovereignty: 45, economicStrength: 35, publicSupport: 50, culturalIntegrity: 45, fiscalHealth: 40 },
      getNode,
      [],
      {},
      (stats) => {
      const sovereignty = stats.sovereignty ?? 50;
      const economic = stats.economicStrength ?? 50;
      const support = stats.publicSupport ?? 50;
      const culture = stats.culturalIntegrity ?? 50;
      const fiscal = stats.fiscalHealth ?? 50;
      const score = Math.round(
        sovereignty * 0.2 + economic * 0.2 + support * 0.2 +
        culture * 0.2 + fiscal * 0.2,
      );
      const won = sovereignty >= 40 && (economic >= 40 || support >= 45);
      return {
        won,
        score: Math.min(100, Math.max(0, score)),
        summary: won
          ? `You strengthened the nation. Sovereignty, economy, and culture — the work continues.`
          : `The struggle continues. The people remember. The land remains.`,
      };
    },
    );
  },
  'ai-displaced': (scenarioId) => {
    const { getNode } = createAiDisplacedTree({ shuffle: true });
    return makeConfig(
      'ai-displaced',
      'AI Displaced',
      'Silicon Valley / Tech Corridor',
      ['savings', 'health', 'solidarity', 'dignity', 'employability'],
      { savings: 'Financial Runway', health: 'Health & Wellbeing', solidarity: 'Solidarity', dignity: 'Dignity', employability: 'Job Prospects' },
      { savings: 45, health: 55, solidarity: 35, dignity: 50, employability: 40 },
      getNode,
      [],
      {},
      (stats) => {
      const savings = stats.savings ?? 50;
      const health = stats.health ?? 50;
      const dignity = stats.dignity ?? 50;
      const solidarity = stats.solidarity ?? 50;
      const employability = stats.employability ?? 50;
      const score = Math.round(
        savings * 0.2 + health * 0.2 + dignity * 0.25 +
        solidarity * 0.2 + employability * 0.15,
      );
      const won = health >= 35 && dignity >= 40 && (savings >= 40 || solidarity >= 50);
      return {
        won,
        score: Math.min(100, Math.max(0, score)),
        summary: won
          ? `You made it through. Dignity intact, solidarity built. The intelligence premium was repriced — but you weren't.`
          : `The spiral took its toll. The system replaced you with machines and had no plan for what came next. The fight continues.`,
      };
    },
    );
  },
};

export function getScenarioNarrativeConfig(scenarioId: string): ScenarioNarrativeConfig | null {
  const entry = scenarioNarrativeRegistry[scenarioId];
  if (!entry) return null;
  if (typeof entry === 'function') {
    return entry(scenarioId);
  }
  return entry;
}

export function hasDecisionTreeMode(scenarioId: string): boolean {
  return scenarioId in scenarioNarrativeRegistry;
}
