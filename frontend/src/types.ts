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
}

export type GameMode = 'easy' | 'guided' | 'advanced' | 'simulator';

export type IdeologyPreset = 'socialist' | 'mixed' | 'capitalist';

export type TradePosturePreset = 'closed' | 'balanced' | 'open';

export type AlliancePreset = 'non_aligned' | 'bloc' | 'sanctioned';

export interface EasyConfig {
  ideology: IdeologyPreset;
  tradePosture: TradePosturePreset;
  alliance: AlliancePreset;
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

export interface ScenarioSummary {
  id: string;
  name: string;
  description: string;
  difficulty: string;
}

export type AdvisoryTopic = 'inflation' | 'debt' | 'growth' | 'unemployment' | 'trade' | 'outlook';

export interface AdvisoryItem {
  school: string;
  topic: AdvisoryTopic;
  title: string;
  instruction: string;
  explanation: string;
}

/* ── Win conditions & game-over ── */

export interface ObjectiveGoal {
  metric: string;          // dot-path into CountryState, e.g. 'approval', 'debtToGdp'
  target: number;
  compare: 'above' | 'below';
  label: string;
  description: string;
}

export interface ScenarioObjectives {
  maxTurns: number;
  goals: ObjectiveGoal[];
}

export interface GameHistoryEntry {
  turn: number;
  state: SimulationState;
  actions: PolicyActions;
  causalExplanation?: string;
}

export interface DecompositionDriver {
  label: string;
  value: number;
  equation?: string;
}

export interface SimulatorDiagnostics {
  growth: DecompositionDriver[];
  inflation: DecompositionDriver[];
  debt: DecompositionDriver[];
}

export interface GameResult {
  won: boolean;
  score: number;
  turnsSurvived: number;
  maxTurns: number;
  objectives: { label: string; met: boolean; description: string }[];
  finalState: SimulationState;
  history: GameHistoryEntry[];
  initialState: SimulationState;
}

/* ── LLM integration ── */

export interface LLMConfig {
  apiKey: string;
  baseUrl: string;
  model: string;
  enabled: boolean;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
