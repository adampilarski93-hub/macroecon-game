/**
 * Simulation state and policy types (browser-safe copy).
 */

export type SectorId = 'agriculture' | 'manufacturing' | 'services';

export interface SectorState {
  output: number;
  laborShare: number;
  capitalStock: number;
  tfp: number;
}

export interface CountryState {
  gdp: number;
  gdpGrowth: number;
  sectors: Record<SectorId, SectorState>;
  laborForce: number;
  employed: number;
  unemployed: number;
  unemploymentRate: number;
  inflationRate: number;
  inflationTarget: number;
  exchangeRate: number;
  taxRevenue: number;
  expenditure: number;
  deficit: number;
  publicDebt: number;
  debtToGdp: number;
  policyRate: number;
  exports: number;
  imports: number;
  currentAccount: number;
  fxReserves: number;
  inflationExpectations: number;
  institutionQuality: number;
  approval: number;
  workerSupport: number;
  eliteSupport: number;
  wageShare: number;
  termsOfTrade: number;
  financialFragility: number;
  profitRate: number;
}

export interface GlobalState {
  worldGrowth: number;
  worldRate: number;
  commodityPriceIndex: number;
  exportDemandMultiplier: number;
  sanctionsActive: boolean;
  riskPremium: number;
}

export interface ScenarioParams {
  scenarioId: string;
  countryName: string;
  periodsPerYear: number;
  minTaxRate: number;
  maxTaxRate: number;
  minSpendingShare: number;
  maxSpendingShare: number;
  minPolicyRate: number;
  maxPolicyRate: number;
  consumptionPropensity: number;
  investmentInterestElasticity: number;
  phillipsCurveSlope: number;
  tradeElasticity: number;
  debtSustainabilityThreshold: number;
}

export interface SimulationEvent {
  id: string;
  turn: number;
  type: 'shock' | 'policy_effect' | 'milestone' | 'warning';
  title: string;
  description: string;
}

export interface SimulationState {
  turn: number;
  country: CountryState;
  global: GlobalState;
  scenario: ScenarioParams;
  events: SimulationEvent[];
  previousGdp?: number;
}

export interface PolicyActions {
  incomeTaxRate?: number;
  tariffRate?: number;
  spendingShareOfGdp?: number;
  policyRate?: number;
  exchangeRateRegime?: 'float' | 'peg' | 'managed';
  infrastructureShare?: number;
  socialSpendingShare?: number;
  profitWindfallTaxRate?: number;
  priceControlStrength?: number;
  capitalControlStrength?: number;
  incomesPolicyStrength?: number;
  financialRegulationStrength?: number;
  domesticDebtShare?: number;
  basicGoodsGuarantee?: number;
  planningIntensity?: number;
  publicBankingStrength?: number;
  debtRestructuringStance?: number;
  multiYearAgendaStrength?: number;
}
