/**
 * Simulation state and policy types for the single-country macroeconomic model.
 * All monetary values in real terms (constant local currency) unless noted.
 */

export type SectorId = 'agriculture' | 'manufacturing' | 'services';

export interface SectorState {
  output: number;           // real GDP from this sector
  laborShare: number;       // share of total employment
  capitalStock: number;     // real capital
  tfp: number;              // total factor productivity index
}

export interface CountryState {
  /** Real GDP (sum of sector outputs) */
  gdp: number;
  /** GDP growth rate (annual, decimal e.g. 0.03 = 3%) */
  gdpGrowth: number;
  /** Sectoral breakdown */
  sectors: Record<SectorId, SectorState>;
  /** Labor market */
  laborForce: number;
  employed: number;
  unemployed: number;
  unemploymentRate: number;
  /** Prices */
  inflationRate: number;    // annual, decimal
  inflationTarget: number;
  /** Exchange rate: units of local currency per 1 unit of foreign (e.g. USD) */
  exchangeRate: number;
  /** Government */
  taxRevenue: number;
  expenditure: number;
  deficit: number;          // expenditure - taxRevenue
  publicDebt: number;
  debtToGdp: number;
  /** Central bank */
  policyRate: number;       // nominal interest rate, decimal
  /** External */
  exports: number;
  imports: number;
  currentAccount: number;   // exports - imports + net primary income (simplified: trade balance)
  fxReserves: number;
  /** Expectations / credibility (0–1 index) */
  inflationExpectations: number;
  institutionQuality: number;
  /** Citizen satisfaction / approval (0–1) */
  approval: number;
  /** Class-based approval sub-components */
  workerSupport: number;
  eliteSupport: number;
  /** Labor's share of GDP (0–1). Piketty/Kalecki distribution metric. */
  wageShare: number;
  /** Terms of trade index: export prices / import prices. Prebisch-Singer. */
  termsOfTrade: number;
  /** Financial fragility index (0–1). Minsky cycle. */
  financialFragility: number;
  /** Profit rate: (GDP - wages) / capitalStock. Marxian. */
  profitRate: number;
}

export interface GlobalState {
  /** World real GDP growth (exogenous) */
  worldGrowth: number;
  /** World nominal interest rate */
  worldRate: number;
  /** Commodity price index (e.g. oil) relative to baseline */
  commodityPriceIndex: number;
  /** Trade openness / demand for exports multiplier */
  exportDemandMultiplier: number;
  /** Geopolitical: sanctions, war risk, etc. */
  sanctionsActive: boolean;
  riskPremium: number;      // added to sovereign borrowing cost
}

export interface ScenarioParams {
  scenarioId: string;
  countryName: string;
  /** Periods per "year" (e.g. 4 for quarterly) */
  periodsPerYear: number;
  /** Policy constraints */
  minTaxRate: number;
  maxTaxRate: number;
  minSpendingShare: number;
  maxSpendingShare: number;
  minPolicyRate: number;
  maxPolicyRate: number;
  /** Elasticities and behavioral params (for equations) */
  consumptionPropensity: number;
  investmentInterestElasticity: number;
  phillipsCurveSlope: number;
  tradeElasticity: number;
  debtSustainabilityThreshold: number;  // debt/GDP above which risk rises
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
  /** Last period's state (for growth rates, etc.) */
  previousGdp?: number;
}

/** Player-adjustable policy levers (deltas or levels depending on field) */
export interface PolicyActions {
  /** Income tax rate (0–1). Applied as target rate. Mainstream / all. */
  incomeTaxRate?: number;
  /** Tariff rate on imports (0–1). Structuralist / trade. */
  tariffRate?: number;
  /** Government spending as share of GDP (0–1). Keynesian / Mainstream. */
  spendingShareOfGdp?: number;
  /** Central bank policy rate (decimal, e.g. 0.05). Mainstream. */
  policyRate?: number;
  /** Exchange rate regime: 'float' | 'peg' | 'managed'. Mainstream / Structuralist. */
  exchangeRateRegime?: 'float' | 'peg' | 'managed';
  /** Infrastructure spending share of total spending (0–1). Keynesian / Structuralist. */
  infrastructureShare?: number;
  /** Social spending share of total spending (0–1). Keynesian / Marxian. */
  socialSpendingShare?: number;
  /** Profit / windfall tax rate (0–0.2). Marxian / Keynesian. */
  profitWindfallTaxRate?: number;
  /** Price control strength (0–1). Marxian / Post-Keynesian. */
  priceControlStrength?: number;
  /** Capital control strength (0–1). Marxian / Structuralist. */
  capitalControlStrength?: number;
  /** Incomes policy / wage–price coordination (0–1). Keynesian / Post-Keynesian. */
  incomesPolicyStrength?: number;
  /** Financial regulation strength (0–1). Post-Keynesian. */
  financialRegulationStrength?: number;
  /** Share of public debt financed domestically (0–1). Structuralist. */
  domesticDebtShare?: number;
  /** Guaranteed distribution of basics / rationing (0–1). Marxian (e.g. Cuba libreta). */
  basicGoodsGuarantee?: number;
  /** State-directed allocation / planning intensity (0–1). Marxian (e.g. Soviet/Chinese planning). */
  planningIntensity?: number;
  /** Public and cooperative banking strength (0–1). Marxian. */
  publicBankingStrength?: number;
  /** Willingness to restructure or selective default to free policy space (0–1). Marxian. */
  debtRestructuringStance?: number;
  /** Multi-year policy agenda / planning horizon (0–1). Marxian. */
  multiYearAgendaStrength?: number;
}
