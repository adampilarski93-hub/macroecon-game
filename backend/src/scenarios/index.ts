import type { SimulationState, CountryState, GlobalState, ScenarioParams, SectorId } from '../engine/state.js';

const SECTOR_IDS: SectorId[] = ['agriculture', 'manufacturing', 'services'];

export interface ScenarioDef {
  id: string;
  name: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  params: ScenarioParams;
  initialCountry: Partial<CountryState>;
  initialGlobal: Partial<GlobalState>;
}

const emergingDebtCrisis: ScenarioDef = {
  id: 'emerging-debt-crisis',
  name: 'Emerging Debt Crisis',
  description: 'You lead a middle-income country with high public debt and a current account deficit. Global interest rates are rising. Balance fiscal consolidation with growth.',
  difficulty: 'hard',
  params: {
    scenarioId: 'emerging-debt-crisis', countryName: 'Republic of Meridia', periodsPerYear: 4,
    minTaxRate: 0.1, maxTaxRate: 0.4, minSpendingShare: 0.15, maxSpendingShare: 0.45,
    minPolicyRate: 0.01, maxPolicyRate: 0.25, consumptionPropensity: 0.75,
    investmentInterestElasticity: 2, phillipsCurveSlope: 0.3, tradeElasticity: 1.2, debtSustainabilityThreshold: 0.6,
  },
  initialCountry: {
    gdp: 1000, gdpGrowth: 0.02,
    sectors: { agriculture: { output: 100, laborShare: 0.2, capitalStock: 80, tfp: 1.0 }, manufacturing: { output: 400, laborShare: 0.35, capitalStock: 500, tfp: 1.1 }, services: { output: 500, laborShare: 0.45, capitalStock: 300, tfp: 1.05 } },
    laborForce: 500, employed: 475, unemployed: 25, unemploymentRate: 0.05, inflationRate: 0.06, inflationTarget: 0.025,
    exchangeRate: 1.0, taxRevenue: 200, expenditure: 280, deficit: 80, publicDebt: 650, debtToGdp: 0.65, policyRate: 0.08,
    exports: 300, imports: 320, currentAccount: -20, fxReserves: 80, inflationExpectations: 0.05, institutionQuality: 0.5,
    approval: 0.45, workerSupport: 0.45, eliteSupport: 0.45, wageShare: 0.45, termsOfTrade: 0.9, financialFragility: 0.3, profitRate: 0.12,
  },
  initialGlobal: { worldGrowth: 0.02, worldRate: 0.05, commodityPriceIndex: 1.0, exportDemandMultiplier: 1.0, sanctionsActive: false, riskPremium: 0.02 },
};

const stagflationScenario: ScenarioDef = {
  id: 'stagflation',
  name: 'Stagflation',
  description: 'A developed economy faces rising inflation and slowing growth.',
  difficulty: 'medium',
  params: {
    scenarioId: 'stagflation', countryName: 'Federated States of Norden', periodsPerYear: 4,
    minTaxRate: 0.15, maxTaxRate: 0.45, minSpendingShare: 0.2, maxSpendingShare: 0.5,
    minPolicyRate: 0.0, maxPolicyRate: 0.15, consumptionPropensity: 0.7,
    investmentInterestElasticity: 1.5, phillipsCurveSlope: 0.25, tradeElasticity: 1.0, debtSustainabilityThreshold: 0.9,
  },
  initialCountry: {
    gdp: 5000, gdpGrowth: -0.01,
    sectors: { agriculture: { output: 150, laborShare: 0.05, capitalStock: 100, tfp: 1.2 }, manufacturing: { output: 1500, laborShare: 0.25, capitalStock: 2000, tfp: 1.15 }, services: { output: 3350, laborShare: 0.7, capitalStock: 1500, tfp: 1.1 } },
    laborForce: 2500, employed: 2375, unemployed: 125, unemploymentRate: 0.05, inflationRate: 0.08, inflationTarget: 0.02,
    exchangeRate: 1.0, taxRevenue: 1500, expenditure: 1625, deficit: 125, publicDebt: 3500, debtToGdp: 0.7, policyRate: 0.05,
    exports: 1200, imports: 1250, currentAccount: -50, fxReserves: 500, inflationExpectations: 0.07, institutionQuality: 0.8,
    approval: 0.4, workerSupport: 0.38, eliteSupport: 0.45, wageShare: 0.50, termsOfTrade: 1.0, financialFragility: 0.2, profitRate: 0.10,
  },
  initialGlobal: { worldGrowth: 0.01, worldRate: 0.04, commodityPriceIndex: 1.2, exportDemandMultiplier: 0.95, sanctionsActive: false, riskPremium: 0.01 },
};

const rustBeltScenario: ScenarioDef = {
  id: 'rust-belt',
  name: 'Rust Belt Revival',
  description: 'A once-industrial powerhouse has seen factories close and jobs move away.',
  difficulty: 'medium',
  params: {
    scenarioId: 'rust-belt', countryName: 'Federal Republic of Nordmark', periodsPerYear: 4,
    minTaxRate: 0.12, maxTaxRate: 0.45, minSpendingShare: 0.2, maxSpendingShare: 0.5,
    minPolicyRate: 0.0, maxPolicyRate: 0.12, consumptionPropensity: 0.72,
    investmentInterestElasticity: 1.8, phillipsCurveSlope: 0.28, tradeElasticity: 1.1, debtSustainabilityThreshold: 0.85,
  },
  initialCountry: {
    gdp: 3200, gdpGrowth: 0.005,
    sectors: { agriculture: { output: 80, laborShare: 0.03, capitalStock: 60, tfp: 1.15 }, manufacturing: { output: 720, laborShare: 0.18, capitalStock: 900, tfp: 1.05 }, services: { output: 2400, laborShare: 0.79, capitalStock: 1200, tfp: 1.08 } },
    laborForce: 1600, employed: 1472, unemployed: 128, unemploymentRate: 0.08, inflationRate: 0.055, inflationTarget: 0.025,
    exchangeRate: 1.0, taxRevenue: 704, expenditure: 800, deficit: 96, publicDebt: 2080, debtToGdp: 0.65, policyRate: 0.04,
    exports: 640, imports: 700, currentAccount: -60, fxReserves: 200, inflationExpectations: 0.05, institutionQuality: 0.75,
    approval: 0.42, workerSupport: 0.40, eliteSupport: 0.48, wageShare: 0.52, termsOfTrade: 1.0, financialFragility: 0.15, profitRate: 0.08,
  },
  initialGlobal: { worldGrowth: 0.02, worldRate: 0.04, commodityPriceIndex: 1.15, exportDemandMultiplier: 0.98, sanctionsActive: false, riskPremium: 0.015 },
};

const independenceUnderdevelopment: ScenarioDef = {
  id: 'independence-underdevelopment',
  name: 'Independence & Underdevelopment',
  description: 'Your country has just won independence. The economy is still dominated by agriculture.',
  difficulty: 'hard',
  params: {
    scenarioId: 'independence-underdevelopment', countryName: 'Republic of Uhuru', periodsPerYear: 4,
    minTaxRate: 0.05, maxTaxRate: 0.35, minSpendingShare: 0.12, maxSpendingShare: 0.4,
    minPolicyRate: 0.02, maxPolicyRate: 0.2, consumptionPropensity: 0.8,
    investmentInterestElasticity: 2.2, phillipsCurveSlope: 0.35, tradeElasticity: 1.3, debtSustainabilityThreshold: 0.5,
  },
  initialCountry: {
    gdp: 400, gdpGrowth: 0.02,
    sectors: { agriculture: { output: 220, laborShare: 0.65, capitalStock: 60, tfp: 0.85 }, manufacturing: { output: 80, laborShare: 0.12, capitalStock: 50, tfp: 0.9 }, services: { output: 100, laborShare: 0.23, capitalStock: 40, tfp: 0.95 } },
    laborForce: 600, employed: 558, unemployed: 42, unemploymentRate: 0.07, inflationRate: 0.07, inflationTarget: 0.03,
    exchangeRate: 1.0, taxRevenue: 48, expenditure: 72, deficit: 24, publicDebt: 180, debtToGdp: 0.45, policyRate: 0.08,
    exports: 100, imports: 95, currentAccount: 5, fxReserves: 30, inflationExpectations: 0.08, institutionQuality: 0.35,
    approval: 0.55, workerSupport: 0.55, eliteSupport: 0.50, wageShare: 0.55, termsOfTrade: 0.85, financialFragility: 0.1, profitRate: 0.15,
  },
  initialGlobal: { worldGrowth: 0.03, worldRate: 0.06, commodityPriceIndex: 1.0, exportDemandMultiplier: 1.0, sanctionsActive: false, riskPremium: 0.04 },
};

const commodityPressure: ScenarioDef = {
  id: 'commodity-pressure',
  name: 'Commodity Shock & Development Squeeze',
  description: 'Your developing economy depends on commodity exports or key imports.',
  difficulty: 'hard',
  params: {
    scenarioId: 'commodity-pressure', countryName: 'Republic of Kemet', periodsPerYear: 4,
    minTaxRate: 0.08, maxTaxRate: 0.38, minSpendingShare: 0.18, maxSpendingShare: 0.42,
    minPolicyRate: 0.03, maxPolicyRate: 0.22, consumptionPropensity: 0.78,
    investmentInterestElasticity: 2, phillipsCurveSlope: 0.32, tradeElasticity: 1.25, debtSustainabilityThreshold: 0.55,
  },
  initialCountry: {
    gdp: 800, gdpGrowth: 0.03,
    sectors: { agriculture: { output: 160, laborShare: 0.4, capitalStock: 80, tfp: 0.95 }, manufacturing: { output: 280, laborShare: 0.28, capitalStock: 200, tfp: 1.0 }, services: { output: 360, laborShare: 0.32, capitalStock: 120, tfp: 1.0 } },
    laborForce: 450, employed: 418, unemployed: 32, unemploymentRate: 0.071, inflationRate: 0.09, inflationTarget: 0.03,
    exchangeRate: 1.0, taxRevenue: 136, expenditure: 200, deficit: 64, publicDebt: 440, debtToGdp: 0.55, policyRate: 0.12,
    exports: 220, imports: 260, currentAccount: -40, fxReserves: 60, inflationExpectations: 0.09, institutionQuality: 0.5,
    approval: 0.38, workerSupport: 0.36, eliteSupport: 0.42, wageShare: 0.42, termsOfTrade: 0.80, financialFragility: 0.25, profitRate: 0.14,
  },
  initialGlobal: { worldGrowth: 0.025, worldRate: 0.055, commodityPriceIndex: 1.35, exportDemandMultiplier: 0.92, sanctionsActive: false, riskPremium: 0.035 },
};

const risingIndustrializer: ScenarioDef = {
  id: 'rising-industrializer',
  name: 'Rising Industrializer',
  description: 'Your economy is shifting from farm to factory. Growth is strong but uneven.',
  difficulty: 'medium',
  params: {
    scenarioId: 'rising-industrializer', countryName: 'People\'s Republic of Donghai', periodsPerYear: 4,
    minTaxRate: 0.1, maxTaxRate: 0.4, minSpendingShare: 0.18, maxSpendingShare: 0.45,
    minPolicyRate: 0.02, maxPolicyRate: 0.2, consumptionPropensity: 0.76,
    investmentInterestElasticity: 2.2, phillipsCurveSlope: 0.3, tradeElasticity: 1.3, debtSustainabilityThreshold: 0.6,
  },
  initialCountry: {
    gdp: 1200, gdpGrowth: 0.065,
    sectors: { agriculture: { output: 300, laborShare: 0.45, capitalStock: 120, tfp: 0.95 }, manufacturing: { output: 480, laborShare: 0.32, capitalStock: 350, tfp: 1.08 }, services: { output: 420, laborShare: 0.23, capitalStock: 130, tfp: 1.02 } },
    laborForce: 800, employed: 752, unemployed: 48, unemploymentRate: 0.06, inflationRate: 0.065, inflationTarget: 0.03,
    exchangeRate: 1.0, taxRevenue: 216, expenditure: 300, deficit: 84, publicDebt: 600, debtToGdp: 0.5, policyRate: 0.07,
    exports: 360, imports: 340, currentAccount: 20, fxReserves: 120, inflationExpectations: 0.065, institutionQuality: 0.55,
    approval: 0.52, workerSupport: 0.50, eliteSupport: 0.55, wageShare: 0.48, termsOfTrade: 0.88, financialFragility: 0.15, profitRate: 0.18,
  },
  initialGlobal: { worldGrowth: 0.035, worldRate: 0.05, commodityPriceIndex: 1.1, exportDemandMultiplier: 1.08, sanctionsActive: false, riskPremium: 0.025 },
};

const tutorialScenario: ScenarioDef = {
  id: 'tutorial',
  name: 'Learning the Basics',
  description: 'A calm economy with no crisis. Use this scenario to learn how the economy works.',
  difficulty: 'easy',
  params: {
    scenarioId: 'tutorial', countryName: 'Republic of Calmwater', periodsPerYear: 4,
    minTaxRate: 0.1, maxTaxRate: 0.4, minSpendingShare: 0.18, maxSpendingShare: 0.45,
    minPolicyRate: 0.01, maxPolicyRate: 0.12, consumptionPropensity: 0.74,
    investmentInterestElasticity: 1.8, phillipsCurveSlope: 0.22, tradeElasticity: 1.1, debtSustainabilityThreshold: 0.7,
  },
  initialCountry: {
    gdp: 1500, gdpGrowth: 0.025,
    sectors: { agriculture: { output: 150, laborShare: 0.08, capitalStock: 100, tfp: 1.05 }, manufacturing: { output: 600, laborShare: 0.38, capitalStock: 450, tfp: 1.08 }, services: { output: 750, laborShare: 0.54, capitalStock: 350, tfp: 1.05 } },
    laborForce: 750, employed: 720, unemployed: 30, unemploymentRate: 0.04, inflationRate: 0.03, inflationTarget: 0.025,
    exchangeRate: 1.0, taxRevenue: 330, expenditure: 360, deficit: 30, publicDebt: 525, debtToGdp: 0.35, policyRate: 0.04,
    exports: 450, imports: 435, currentAccount: 15, fxReserves: 150, inflationExpectations: 0.03, institutionQuality: 0.7,
    approval: 0.6, workerSupport: 0.60, eliteSupport: 0.60, wageShare: 0.52, termsOfTrade: 1.0, financialFragility: 0.1, profitRate: 0.10,
  },
  initialGlobal: { worldGrowth: 0.025, worldRate: 0.04, commodityPriceIndex: 1.0, exportDemandMultiplier: 1.0, sanctionsActive: false, riskPremium: 0.01 },
};

const sanctionsIsolation: ScenarioDef = {
  id: 'sanctions-isolation',
  name: 'Under Sanctions',
  description: 'Your country faces international sanctions.',
  difficulty: 'hard',
  params: {
    scenarioId: 'sanctions-isolation', countryName: 'Republic of Persea', periodsPerYear: 4,
    minTaxRate: 0.1, maxTaxRate: 0.4, minSpendingShare: 0.15, maxSpendingShare: 0.45,
    minPolicyRate: 0.05, maxPolicyRate: 0.25, consumptionPropensity: 0.78,
    investmentInterestElasticity: 1.8, phillipsCurveSlope: 0.33, tradeElasticity: 1.1, debtSustainabilityThreshold: 0.5,
  },
  initialCountry: {
    gdp: 900, gdpGrowth: -0.01,
    sectors: { agriculture: { output: 135, laborShare: 0.2, capitalStock: 70, tfp: 0.95 }, manufacturing: { output: 405, laborShare: 0.4, capitalStock: 280, tfp: 1.0 }, services: { output: 360, laborShare: 0.4, capitalStock: 100, tfp: 0.98 } },
    laborForce: 500, employed: 465, unemployed: 35, unemploymentRate: 0.07, inflationRate: 0.12, inflationTarget: 0.03,
    exchangeRate: 1.0, taxRevenue: 153, expenditure: 225, deficit: 72, publicDebt: 495, debtToGdp: 0.55, policyRate: 0.18,
    exports: 180, imports: 250, currentAccount: -70, fxReserves: 40, inflationExpectations: 0.11, institutionQuality: 0.45,
    approval: 0.35, workerSupport: 0.38, eliteSupport: 0.30, wageShare: 0.50, termsOfTrade: 0.75, financialFragility: 0.35, profitRate: 0.08,
  },
  initialGlobal: { worldGrowth: 0.02, worldRate: 0.05, commodityPriceIndex: 1.2, exportDemandMultiplier: 0.75, sanctionsActive: true, riskPremium: 0.06 },
};

const chokepointClosure: ScenarioDef = {
  id: 'chokepoint-closure',
  name: 'Chokepoint Crisis',
  description: 'A critical maritime trade hub is shut down, disrupting oil and container flows.',
  difficulty: 'hard',
  params: {
    scenarioId: 'chokepoint-closure', countryName: 'Maritime Republic of Selene', periodsPerYear: 4,
    minTaxRate: 0.1, maxTaxRate: 0.42, minSpendingShare: 0.18, maxSpendingShare: 0.48,
    minPolicyRate: 0.02, maxPolicyRate: 0.2, consumptionPropensity: 0.74,
    investmentInterestElasticity: 1.9, phillipsCurveSlope: 0.3, tradeElasticity: 1.4, debtSustainabilityThreshold: 0.75,
  },
  initialCountry: {
    gdp: 1800, gdpGrowth: 0.015,
    sectors: { agriculture: { output: 180, laborShare: 0.14, capitalStock: 120, tfp: 1.0 }, manufacturing: { output: 760, laborShare: 0.36, capitalStock: 520, tfp: 1.05 }, services: { output: 860, laborShare: 0.50, capitalStock: 430, tfp: 1.06 } },
    laborForce: 900, employed: 846, unemployed: 54, unemploymentRate: 0.06, inflationRate: 0.06, inflationTarget: 0.03,
    exchangeRate: 1.0, taxRevenue: 396, expenditure: 450, deficit: 54, publicDebt: 1170, debtToGdp: 0.65, policyRate: 0.08,
    exports: 620, imports: 700, currentAccount: -80, fxReserves: 150, inflationExpectations: 0.065, institutionQuality: 0.62,
    approval: 0.44, workerSupport: 0.43, eliteSupport: 0.46, wageShare: 0.49, termsOfTrade: 0.9, financialFragility: 0.22, profitRate: 0.11,
  },
  initialGlobal: { worldGrowth: 0.018, worldRate: 0.05, commodityPriceIndex: 1.28, exportDemandMultiplier: 0.9, sanctionsActive: false, riskPremium: 0.03 },
};

export const scenarios: ScenarioDef[] = [
  tutorialScenario,
  emergingDebtCrisis,
  stagflationScenario,
  rustBeltScenario,
  independenceUnderdevelopment,
  commodityPressure,
  risingIndustrializer,
  sanctionsIsolation,
  chokepointClosure,
];

export function createInitialState(scenarioId: string): SimulationState | null {
  const def = scenarios.find((s) => s.id === scenarioId);
  if (!def) return null;

  const country: CountryState = {
    gdp: def.initialCountry.gdp ?? 1000,
    gdpGrowth: def.initialCountry.gdpGrowth ?? 0,
    sectors: (def.initialCountry.sectors ?? emergingDebtCrisis.initialCountry.sectors) as CountryState['sectors'],
    laborForce: def.initialCountry.laborForce ?? 500,
    employed: def.initialCountry.employed ?? 475,
    unemployed: def.initialCountry.unemployed ?? 25,
    unemploymentRate: def.initialCountry.unemploymentRate ?? 0.05,
    inflationRate: def.initialCountry.inflationRate ?? 0.05,
    inflationTarget: def.initialCountry.inflationTarget ?? 0.025,
    exchangeRate: def.initialCountry.exchangeRate ?? 1,
    taxRevenue: def.initialCountry.taxRevenue ?? 200,
    expenditure: def.initialCountry.expenditure ?? 250,
    deficit: def.initialCountry.deficit ?? 50,
    publicDebt: def.initialCountry.publicDebt ?? 500,
    debtToGdp: def.initialCountry.debtToGdp ?? 0.5,
    policyRate: def.initialCountry.policyRate ?? 0.05,
    exports: def.initialCountry.exports ?? 250,
    imports: def.initialCountry.imports ?? 270,
    currentAccount: def.initialCountry.currentAccount ?? -20,
    fxReserves: def.initialCountry.fxReserves ?? 100,
    inflationExpectations: def.initialCountry.inflationExpectations ?? 0.05,
    institutionQuality: def.initialCountry.institutionQuality ?? 0.6,
    approval: def.initialCountry.approval ?? 0.5,
    workerSupport: def.initialCountry.workerSupport ?? 0.5,
    eliteSupport: def.initialCountry.eliteSupport ?? 0.5,
    wageShare: def.initialCountry.wageShare ?? 0.5,
    termsOfTrade: def.initialCountry.termsOfTrade ?? 1.0,
    financialFragility: def.initialCountry.financialFragility ?? 0.1,
    profitRate: def.initialCountry.profitRate ?? 0.1,
  };

  const global: GlobalState = {
    worldGrowth: def.initialGlobal.worldGrowth ?? 0.02,
    worldRate: def.initialGlobal.worldRate ?? 0.04,
    commodityPriceIndex: def.initialGlobal.commodityPriceIndex ?? 1,
    exportDemandMultiplier: def.initialGlobal.exportDemandMultiplier ?? 1,
    sanctionsActive: def.initialGlobal.sanctionsActive ?? false,
    riskPremium: def.initialGlobal.riskPremium ?? 0.01,
  };

  const events = scenarioId === 'tutorial'
    ? [{
        id: 'tutorial-welcome',
        turn: 0,
        type: 'milestone' as const,
        title: 'Welcome to the tutorial',
        description: 'This is a learning scenario. The economy is stable so you can experiment.',
      }]
    : [];

  return { turn: 0, country, global, scenario: def.params, events };
}
