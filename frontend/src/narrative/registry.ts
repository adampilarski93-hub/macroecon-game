import type { ScenarioNarrativeConfig } from './scenario-types';
import { createNarrativeTree as createEmergingTree } from './scenario-trees/emerging-debt-crisis';
import { createNarrativeTree as createStagflationTree } from './scenario-trees/stagflation';
import { createNarrativeTree as createRustBeltTree } from './scenario-trees/rust-belt';
import { createNarrativeTree as createTutorialTree } from './scenario-trees/tutorial';
import { createNarrativeTree as createIndependenceTree } from './scenario-trees/independence-underdevelopment';
import { createNarrativeTree as createCommodityTree } from './scenario-trees/commodity-pressure';
import { createNarrativeTree as createRisingTree } from './scenario-trees/rising-industrializer';
import { createNarrativeTree as createSanctionsTree } from './scenario-trees/sanctions-isolation';
import { createNarrativeTree as createChokepointTree } from './scenario-trees/chokepoint-closure';
import { createNarrativeTree as createGulfMigrantTree } from './scenario-trees/gulf-migrant';
import { createNarrativeTree as createPlurinationalTree } from './scenario-trees/plurinational-path';
import { createNarrativeTree as createAiDisplacedTree } from './scenario-trees/ai-displaced';
import { createNarrativeTree as createSovereigntyTree } from './scenario-trees/sovereignty-path';
import { createNarrativeTree as createCybersynTree } from './scenario-trees/cybersyn-chile-simple';
import { createNarrativeTree as createChinaPovertyTree } from './scenario-trees/china-poverty-eradication';
import { createNarrativeTree as createAiHedgeFundTree } from './scenario-trees/ai-hedge-fund';

const COMMON_STAT_COLORS: Record<string, string> = {
  economicStrength: '#22c55e',
  publicSupport: '#ec4899',
  debtBurden: '#ef4444',
  priceStability: '#3b82f6',
  wageShare: '#f97316',
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
  infrastructure: '#6366f1',
  humanDevelopment: '#a855f7',
  // Project Cybersyn stats
  cyberneticInfrastructure: '#06b6d4',
  workerControl: '#ef4444',
  usTensions: '#dc2626',
  internationalSolidarity: '#10b981',
  economicReserves: '#f59e0b',
  economicControl: '#8b5cf6',
  politicalPolarization: '#f97316',
  militaryTension: '#7c3aed',
  // China Poverty Eradication stats
  dataAccuracy: '#3b82f6',
  trustBuilding: '#10b981',
  timeInvestment: '#f59e0b',
  countyApproval: '#8b5cf6',
  sustainability: '#22c55e',
  humanSecurity: '#ef4444',
  dependencyRisk: '#f97316',
  culturalRupture: '#a855f7',
  collectivePower: '#ec4899',
  efficiency: '#14b8a6',
  participation: '#8b5cf6',
  fundsRemaining: '#f59e0b',
  humanCapital: '#3b82f6',
  shortTermIncome: '#22c55e',
  integrity: '#6366f1',
  // AI Hedge Fund stats
  fundConcentration: '#dc2626',
  siliciaExposure: '#f97316',
  riskProfile: '#ef4444',
  dryPowder: '#22c55e',
  liquidityBuffer: '#3b82f6',
  portfolioDiversification: '#10b981',
  liquidityManagement: '#06b6d4',
  leverageRatio: '#f59e0b',
  marginCallRisk: '#dc2626',
  informationAdvantage: '#8b5cf6',
  legalRisk: '#ef4444',
  portfolioProtection: '#22c55e',
  fundValuationCertainty: '#3b82f6',
  regulatoryStanding: '#10b981',
  transparencyScore: '#06b6d4',
  redemptionPressure: '#f97316',
  lpRecovery: '#22c55e',
  ownershipRetention: '#3b82f6',
  reputationRehabilitation: '#10b981',
  intellectualHonesty: '#8b5cf6',
  futureCapitalAccess: '#22c55e',
  riskRecidivism: '#ef4444',
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
  endings?: ScenarioNarrativeConfig['endings'],
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
    endings,
  };
}

type ConfigFactory = (scenarioId: string) => ScenarioNarrativeConfig;

export const scenarioNarrativeRegistry: Record<string, ScenarioNarrativeConfig | ConfigFactory> = {
  'emerging-debt-crisis': (scenarioId) => {
    const { getNode, endings } = createEmergingTree({ shuffle: true });
    return makeConfig(
      'emerging-debt-crisis',
      'Emerging Debt Crisis',
      'Republic of Meridia',
      ['economicStrength', 'publicSupport', 'debtBurden'],
      { economicStrength: 'Economic Strength', publicSupport: 'Public Support', debtBurden: 'Debt Burden' },
      { economicStrength: 50, publicSupport: 50, debtBurden: 50 },
      getNode,
      [],
      {},
      undefined,
      endings,
    );
  },
  stagflation: (scenarioId) => {
    const { getNode, endings } = createStagflationTree({ shuffle: true });
    return makeConfig(
      'stagflation',
      'Stagflation',
      'Federated States of Norden',
      ['economicStrength', 'publicSupport', 'priceStability'],
      { economicStrength: 'Growth', publicSupport: 'Public Support', priceStability: 'Price Stability' },
      { economicStrength: 45, publicSupport: 45, priceStability: 40 },
      getNode,
      [],
      {},
      undefined,
      endings,
    );
  },
  'rust-belt': (scenarioId) => {
    const { getNode, endings } = createRustBeltTree({ shuffle: true });
    return makeConfig(
      'rust-belt',
      'Rust Belt Revival',
      'Federal Republic of Nordmark',
      ['economicStrength', 'publicSupport', 'debtBurden', 'employment'],
      { economicStrength: 'Economic Strength', publicSupport: 'Public Support', debtBurden: 'Debt Burden', employment: 'Employment' },
      { economicStrength: 45, publicSupport: 50, debtBurden: 45, employment: 45 },
      getNode,
      [],
      {},
      undefined,
      endings,
    );
  },
  tutorial: (scenarioId) => {
    const { getNode, endings } = createTutorialTree({ shuffle: false });
    return makeConfig(
      'tutorial',
      'Tutorial: How to Play',
      'Republic of Calmwater',
      ['economicStrength', 'publicSupport', 'debtBurden', 'priceStability', 'wageShare'],
      { economicStrength: 'Economic Strength', publicSupport: 'Public Support', debtBurden: 'Debt Burden', priceStability: 'Price Stability', wageShare: 'Wage Share' },
      { economicStrength: 55, publicSupport: 60, debtBurden: 35, priceStability: 50, wageShare: 45 },
      getNode,
      [],
      {},
      undefined,
      endings,
    );
  },
  'independence-underdevelopment': (scenarioId) => {
    const { getNode, endings } = createIndependenceTree({ shuffle: true });
    return makeConfig(
      'independence-underdevelopment',
      'Independence & Underdevelopment',
      'Republic of Uhuru',
      ['economicStrength', 'publicSupport', 'debtBurden', 'sovereignty'],
      { economicStrength: 'Economic Strength', publicSupport: 'Public Support', debtBurden: 'Debt Burden', sovereignty: 'Sovereignty' },
      { economicStrength: 35, publicSupport: 55, debtBurden: 40, sovereignty: 50 },
      getNode,
      [],
      {},
      undefined,
      endings,
    );
  },
  'commodity-pressure': (scenarioId) => {
    const { getNode, endings } = createCommodityTree({ shuffle: true });
    return makeConfig(
      'commodity-pressure',
      'Commodity Shock & Development Squeeze',
      'Republic of Kemet',
      ['economicStrength', 'publicSupport', 'debtBurden', 'priceStability', 'externalBalance', 'employment'],
      { economicStrength: 'Economic Strength', publicSupport: 'Public Support', debtBurden: 'Debt Burden', priceStability: 'Price Stability', externalBalance: 'External Balance', employment: 'Employment' },
      { economicStrength: 45, publicSupport: 40, debtBurden: 50, priceStability: 35, externalBalance: 40, employment: 45 },
      getNode,
      [],
      {},
      undefined,
      endings,
    );
  },
  'rising-industrializer': (scenarioId) => {
    const { getNode, endings } = createRisingTree({ shuffle: true });
    return makeConfig(
      'rising-industrializer',
      'Rising Industrializer',
      "People's Republic of Donghai",
      ['economicStrength', 'publicSupport', 'debtBurden', 'priceStability'],
      { economicStrength: 'Economic Strength', publicSupport: 'Public Support', debtBurden: 'Debt Burden', priceStability: 'Price Stability' },
      { economicStrength: 55, publicSupport: 55, debtBurden: 45, priceStability: 50 },
      getNode,
      [],
      {},
      undefined,
      endings,
    );
  },
  'sanctions-isolation': (scenarioId) => {
    const { getNode, endings } = createSanctionsTree({ shuffle: true });
    return makeConfig(
      'sanctions-isolation',
      'Under Sanctions',
      'Republic of Persea',
      ['economicStrength', 'publicSupport', 'sovereignty', 'internationalStanding'],
      { economicStrength: 'Economic Strength', publicSupport: 'Public Support', sovereignty: 'Sovereignty', internationalStanding: 'International Standing' },
      { economicStrength: 40, publicSupport: 38, sovereignty: 45, internationalStanding: 30 },
      getNode,
      [],
      {},
      undefined,
      endings,
    );
  },
  'chokepoint-closure': (scenarioId) => {
    const { getNode, endings } = createChokepointTree({ shuffle: true });
    return makeConfig(
      'chokepoint-closure',
      'Chokepoint Crisis',
      'Maritime Republic of Selene',
      ['economicStrength', 'publicSupport', 'priceStability', 'externalBalance', 'internationalStanding'],
      {
        economicStrength: 'Economic Strength',
        publicSupport: 'Public Support',
        priceStability: 'Price Stability',
        externalBalance: 'External Balance',
        internationalStanding: 'International Standing',
      },
      { economicStrength: 45, publicSupport: 44, priceStability: 40, externalBalance: 38, internationalStanding: 42 },
      getNode,
      [],
      {},
      undefined,
      endings,
    );
  },
  'gulf-migrant': (scenarioId) => {
    const { getNode, endings } = createGulfMigrantTree({ shuffle: true });
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
    endings,
    );
  },
  'plurinational-path': (scenarioId) => {
    const { getNode, endings } = createPlurinationalTree({ shuffle: true });
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
    endings,
    );
  },
  'sovereignty-path': (_scenarioId) => {
    const { getNode, endings } = createSovereigntyTree();
    return makeConfig(
      'sovereignty-path',
      'Sovereignty Path',
      'Republic of Uhuru',
      ['sovereignty', 'economicStrength', 'publicSupport', 'debtBurden', 'infrastructure', 'humanDevelopment', 'internationalStanding'],
      { sovereignty: 'Sovereignty', economicStrength: 'Economic Strength', publicSupport: 'Public Support', debtBurden: 'Debt Burden', infrastructure: 'Infrastructure', humanDevelopment: 'Human Development', internationalStanding: 'International Standing' },
      { sovereignty: 40, economicStrength: 25, publicSupport: 65, debtBurden: 30, infrastructure: 15, humanDevelopment: 30, internationalStanding: 40 },
      getNode,
      [],
      {},
      (stats) => {
        const sov = stats.sovereignty ?? 40;
        const econ = stats.economicStrength ?? 25;
        const support = stats.publicSupport ?? 50;
        const debt = stats.debtBurden ?? 30;
        const infra = stats.infrastructure ?? 15;
        const hdi = stats.humanDevelopment ?? 30;
        const intl = stats.internationalStanding ?? 40;
        const score = Math.round(
          sov * 0.2 + econ * 0.15 + support * 0.15 +
          (100 - debt) * 0.1 + infra * 0.15 + hdi * 0.15 + intl * 0.1,
        );
        const won = sov >= 45 && econ >= 35 && support >= 40;
        return {
          won,
          score: Math.min(100, Math.max(0, score)),
          summary: won
            ? `You charted a sovereign path. Through debt refusal, South-South cooperation, and strategic planning, your nation built genuine independence.`
            : `The pressures of debt, dependency, and external interference proved too strong. But the seeds of sovereignty have been planted.`,
        };
      },
    endings,
    );
  },
  'ai-displaced': (scenarioId) => {
    const { getNode, endings } = createAiDisplacedTree({ shuffle: true });
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
    endings,
    );
  },
  'cybersyn-chile': (scenarioId) => {
    const { getNode, endings } = createCybersynTree({ shuffle: true });
    return makeConfig(
      'cybersyn-chile',
      'Project Cybersyn: Allende\'s Chile',
      'Republic of Chile',
      ['cyberneticInfrastructure', 'workerControl', 'economicReserves', 'usTensions', 'militaryTension', 'politicalPolarization'],
      {
        cyberneticInfrastructure: 'Cybernetic Infrastructure',
        workerControl: 'Worker Control',
        economicReserves: 'Economic Reserves',
        usTensions: 'US Tensions',
        militaryTension: 'Military Tension',
        politicalPolarization: 'Political Polarization'
      },
      { cyberneticInfrastructure: 45, workerControl: 45, economicReserves: 50, usTensions: 30, militaryTension: 25, politicalPolarization: 40 },
      getNode,
      [],
      {},
      (stats) => {
        const cyber = stats.cyberneticInfrastructure ?? 50;
        const worker = stats.workerControl ?? 50;
        const reserves = stats.economicReserves ?? 50;
        const us = stats.usTensions ?? 50;
        const military = stats.militaryTension ?? 50;
        const polar = stats.politicalPolarization ?? 50;
        // The coup is historically inevitable—score based on what was achieved before
        const score = Math.round(
          cyber * 0.25 + worker * 0.25 + reserves * 0.15 +
          (100 - us) * 0.1 + (100 - military) * 0.1 + (100 - polar) * 0.15,
        );
        // "Victory" here means meaningful achievement before the fall
        const won = (cyber >= 50 && worker >= 45) || (worker >= 55 && reserves >= 35);
        return {
          won,
          score: Math.min(100, Math.max(0, score)),
          summary: won
            ? `You built something before the fall. Cybersyn demonstrated that real-time economic coordination could serve participation, not just control. The cordones proved worker self-management outproduces hierarchy. The legacy outlives the coup.`
            : `The coup came before the experiment could prove itself. What remains is a caution: the forces of reaction move faster than democratic transformation. But the attempt matters.`,
        };
      },
      endings,
    );
  },
  'china-poverty-eradication': (scenarioId) => {
    const { getNode, endings } = createChinaPovertyTree({ shuffle: true });
    return makeConfig(
      'china-poverty-eradication',
      'Targeted Poverty Alleviation',
      'Dawan Village, Guizhou',
      ['dataAccuracy', 'trustBuilding', 'sustainability', 'humanSecurity', 'fundsRemaining', 'humanCapital'],
      {
        dataAccuracy: 'Data Accuracy',
        trustBuilding: 'Village Trust',
        sustainability: 'Sustainability',
        humanSecurity: 'Human Security',
        fundsRemaining: 'Funds Remaining',
        humanCapital: 'Human Capital'
      },
      { dataAccuracy: 40, trustBuilding: 40, sustainability: 40, humanSecurity: 40, fundsRemaining: 60, humanCapital: 40 },
      getNode,
      [],
      {},
      (stats) => {
        const data = stats.dataAccuracy ?? 50;
        const trust = stats.trustBuilding ?? 50;
        const sustain = stats.sustainability ?? 50;
        const security = stats.humanSecurity ?? 50;
        const capital = stats.humanCapital ?? 50;
        const score = Math.round(
          data * 0.15 + trust * 0.25 + sustain * 0.25 +
          security * 0.15 + capital * 0.2,
        );
        const won = trust >= 45 && sustain >= 45 && security >= 40;
        return {
          won,
          score: Math.min(100, Math.max(0, score)),
          summary: won
            ? `You lifted the village above the poverty line—not just in income, but in capacity. The systems you built outlasted your tenure.`
            : `Despite efforts, the village remained below the line. The structural constraints proved intractable—but the attempt illuminated real limits.`,
        };
      },
      endings,
    );
  },
  'ai-hedge-fund': (scenarioId) => {
    const { getNode, endings } = createAiHedgeFundTree({ shuffle: true });
    return makeConfig(
      'ai-hedge-fund',
      'The Insolvency',
      'Kestrel Capital',
      ['lpConfidence', 'integrityScore', 'fundSurvival', 'reputationRisk', 'liquidityManagement', 'riskProfile'],
      {
        lpConfidence: 'LP Confidence',
        integrityScore: 'Integrity',
        fundSurvival: 'Fund Survival',
        reputationRisk: 'Reputation Risk',
        liquidityManagement: 'Liquidity Management',
        riskProfile: 'Risk Profile'
      },
      { lpConfidence: 50, integrityScore: 50, fundSurvival: 50, reputationRisk: 30, liquidityManagement: 45, riskProfile: 40 },
      getNode,
      [],
      {},
      (stats) => {
        const lpConf = stats.lpConfidence ?? 50;
        const integrity = stats.integrityScore ?? 50;
        const survival = stats.fundSurvival ?? 50;
        const rep = stats.reputationRisk ?? 50;
        const liq = stats.liquidityManagement ?? 50;
        const score = Math.round(
          integrity * 0.3 + liq * 0.25 + survival * 0.25 +
          (100 - rep) * 0.2,
        );
        const won = integrity >= 50 && survival >= 35;
        return {
          won,
          score: Math.min(100, Math.max(0, score)),
          summary: won
            ? `You managed an impossible situation with integrity. The fund structure preserved capital; your reputation recovered through transparency.`
            : `The fund collapsed under concentration and leverage. But the lessons you learned may save the next manager from similar hubris.`,
        };
      },
      endings,
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
