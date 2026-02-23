import type { DecisionBlock, LongFormEnding } from '../long-form-tree';
import { createLongFormTree } from '../long-form-tree';

/**
 * Stagflation — Federated States of Norden (20 decisions)
 * Thinkers: Polanyi, Tooze, Hudson
 */
const blocks: DecisionBlock[] = [
  {
    phase: 1,
    title: 'The Worst of Both Worlds',
    narrative: `You lead the Federated States of Norden. Inflation is at 8%, growth is negative. Polanyi warned that treating labor as a commodity destroys society. Tooze showed crises need political intervention. What do you do first?`,
    choices: [
      { id: 'fight_inflation', text: 'Prioritize fighting inflation', consequence: 'You back rate hikes.', effects: { priceStability: 12, economicStrength: -10, publicSupport: -8 } },
      { id: 'protect_jobs', text: 'Prioritize jobs', consequence: 'You resist tightening.', effects: { economicStrength: 5, publicSupport: 8, priceStability: -10 } },
      { id: 'supply', text: 'Focus on supply', consequence: 'You invest in bottlenecks.', effects: { priceStability: 5, economicStrength: 5, publicSupport: 3 } },
    ],
  },
  {
    phase: 1,
    title: 'Central Bank Pressure',
    narrative: `The central bank wants aggressive hikes. Hudson says rate hikes hit workers first. Do you support them or resist?`,
    choices: [
      { id: 'support', text: 'Support the central bank', consequence: 'Rates rise.', effects: { priceStability: 10, economicStrength: -8, publicSupport: -6 } },
      { id: 'resist', text: 'Resist', consequence: 'You push back.', effects: { economicStrength: 3, publicSupport: 5, priceStability: -5 } },
    ],
  },
  {
    phase: 1,
    title: 'Fiscal Response',
    narrative: `Your finance minister proposes targeted relief. Polanyi would see this as society's counter-movement. Do you approve it?`,
    choices: [
      { id: 'approve', text: 'Approve targeted relief', consequence: 'You spend.', effects: { publicSupport: 10, priceStability: -3, debtBurden: 5 } },
      { id: 'reject', text: 'Reject — no new spending', consequence: 'You hold the line.', effects: { debtBurden: -5, publicSupport: -8 } },
    ],
  },
  {
    phase: 1,
    title: 'Energy Crisis',
    narrative: `Energy prices have spiked again. Do you subsidize household bills or let prices rise?`,
    choices: [
      { id: 'subsidize', text: 'Subsidize household bills', consequence: 'You cushion the shock.', effects: { publicSupport: 12, priceStability: 5, debtBurden: 8 } },
      { id: 'let_rise', text: 'Let prices rise', consequence: 'You avoid intervention.', effects: { priceStability: -5, debtBurden: -5, publicSupport: -12 } },
    ],
  },
  {
    phase: 2,
    title: 'Wage Negotiations',
    narrative: `Unions are demanding raises. Firms say they'll pass costs on. Do you broker a wage-price deal or stay out?`,
    choices: [
      { id: 'broker', text: 'Broker a wage-price deal', consequence: 'You convene talks.', effects: { publicSupport: 8, priceStability: 5, economicStrength: 3 } },
      { id: 'stay_out', text: 'Stay out', consequence: 'You let them negotiate.', effects: { priceStability: -3, publicSupport: -5 } },
    ],
  },
  {
    phase: 2,
    title: 'Supply Chain Investment',
    narrative: `Bottlenecks persist. Do you launch a major supply-side program or rely on market adjustment?`,
    choices: [
      { id: 'launch', text: 'Launch supply-side program', consequence: 'You invest.', effects: { economicStrength: 10, priceStability: 8, debtBurden: 10 } },
      { id: 'market', text: 'Rely on market adjustment', consequence: 'You wait.', effects: { debtBurden: -5, economicStrength: -3 } },
    ],
  },
  {
    phase: 2,
    title: 'Recession Deepens',
    narrative: `GDP has contracted again. Unemployment is rising. Tooze documented how austerity failed in Europe. Do you pivot to stimulus?`,
    choices: [
      { id: 'stimulus', text: 'Pivot to stimulus', consequence: 'You ease policy.', effects: { economicStrength: 8, publicSupport: 10, priceStability: -5 } },
      { id: 'hold', text: 'Hold course', consequence: 'You resist.', effects: { priceStability: 8, economicStrength: -10, publicSupport: -12 } },
    ],
  },
  {
    phase: 2,
    title: 'FIRE Sector Scrutiny',
    narrative: `Hudson argues the FIRE sector extracts from the productive economy. Do you propose financial sector taxes or leave it alone?`,
    choices: [
      { id: 'tax', text: 'Propose financial sector taxes', consequence: 'You target finance.', effects: { publicSupport: 8, economicStrength: 2, debtBurden: -5 } },
      { id: 'leave', text: 'Leave it alone', consequence: 'You avoid the fight.', effects: { economicStrength: -2 } },
    ],
  },
  {
    phase: 3,
    title: 'Inflation Expectations',
    narrative: `The central bank says expectations are unanchored. Do you back one more rate hike or argue enough is enough?`,
    choices: [
      { id: 'back', text: 'Back one more hike', consequence: 'Rates rise.', effects: { priceStability: 10, economicStrength: -8, publicSupport: -6 } },
      { id: 'enough', text: 'Argue enough is enough', consequence: 'You resist.', effects: { economicStrength: 5, publicSupport: 8, priceStability: -3 } },
    ],
  },
  {
    phase: 3,
    title: 'Price Caps',
    narrative: `Some economists urge price caps on essentials. Polanyi would support decommodification. Do you impose them?`,
    choices: [
      { id: 'impose', text: 'Impose price caps', consequence: 'You intervene.', effects: { priceStability: 8, publicSupport: 10, economicStrength: -3 } },
      { id: 'reject', text: 'Reject price caps', consequence: 'You stay market-oriented.', effects: { economicStrength: 3, publicSupport: -5 } },
    ],
  },
  {
    phase: 3,
    title: 'Coalition Tension',
    narrative: `Your coalition partner wants a jobs guarantee. Do you negotiate a compromise or refuse?`,
    choices: [
      { id: 'compromise', text: 'Negotiate a compromise', consequence: 'You find middle ground.', effects: { publicSupport: 8, employment: 5, debtBurden: 5 } },
      { id: 'refuse', text: 'Refuse', consequence: 'You hold firm.', effects: { debtBurden: -5, publicSupport: -10 } },
    ],
  },
  {
    phase: 3,
    title: 'Export Competitiveness',
    narrative: `The weak currency has boosted exports. Do you support further depreciation or resist it?`,
    choices: [
      { id: 'support', text: 'Support depreciation', consequence: 'Exports surge.', effects: { economicStrength: 10, priceStability: -5 } },
      { id: 'resist', text: 'Resist', consequence: 'You defend the currency.', effects: { priceStability: 5, economicStrength: -5 } },
    ],
  },
  {
    phase: 4,
    title: 'Mid-Term Assessment',
    narrative: `You're halfway through. Inflation has eased but growth is weak. Do you declare victory and ease, or push for more?`,
    choices: [
      { id: 'ease', text: 'Declare victory and ease', consequence: 'You pivot.', effects: { economicStrength: 8, publicSupport: 10, priceStability: -3 } },
      { id: 'push', text: 'Push for more', consequence: 'You hold.', effects: { priceStability: 5, economicStrength: -3 } },
    ],
  },
  {
    phase: 4,
    title: 'Housing Crisis',
    narrative: `Housing costs are driving inflation. Do you invest in social housing or rely on supply?`,
    choices: [
      { id: 'social', text: 'Invest in social housing', consequence: 'You build.', effects: { publicSupport: 12, priceStability: 5, debtBurden: 8 } },
      { id: 'supply', text: 'Rely on supply', consequence: 'You deregulate.', effects: { economicStrength: 5, publicSupport: -5 } },
    ],
  },
  {
    phase: 4,
    title: 'Energy Transition',
    narrative: `Green investment could ease energy dependence. Do you launch a major program?`,
    choices: [
      { id: 'launch', text: 'Launch green program', consequence: 'You invest.', effects: { economicStrength: 8, priceStability: 5, debtBurden: 10 } },
      { id: 'modest', text: 'Modest green support only', consequence: 'You go slow.', effects: { economicStrength: 3, debtBurden: 3 } },
    ],
  },
  {
    phase: 4,
    title: 'Labor Market Reform',
    narrative: `Some urge labor market flexibility. Polanyi would warn of commodification. Do you support reform?`,
    choices: [
      { id: 'support', text: 'Support reform', consequence: 'You liberalize.', effects: { economicStrength: 5, publicSupport: -8 } },
      { id: 'oppose', text: 'Oppose', consequence: 'You protect workers.', effects: { publicSupport: 10, economicStrength: -3 } },
    ],
  },
  {
    phase: 5,
    title: 'Year Two',
    narrative: `Growth has returned but inflation persists. Do you prioritize growth or price stability?`,
    choices: [
      { id: 'growth', text: 'Prioritize growth', consequence: 'You ease.', effects: { economicStrength: 10, publicSupport: 10, priceStability: -5 } },
      { id: 'stability', text: 'Prioritize stability', consequence: 'You hold.', effects: { priceStability: 10, economicStrength: -5 } },
    ],
  },
  {
    phase: 5,
    title: 'Tax Policy',
    narrative: `Do you raise taxes on profits to fund relief, or cut taxes to stimulate?`,
    choices: [
      { id: 'raise', text: 'Raise taxes on profits', consequence: 'You redistribute.', effects: { publicSupport: 10, debtBurden: -5, economicStrength: -2 } },
      { id: 'cut', text: 'Cut taxes', consequence: 'You stimulate.', effects: { economicStrength: 8, debtBurden: 8 } },
    ],
  },
  {
    phase: 5,
    title: 'Central Bank Mandate',
    narrative: `Some want to expand the central bank's mandate to include employment. Do you support it?`,
    choices: [
      { id: 'support', text: 'Support expanded mandate', consequence: 'You reform.', effects: { publicSupport: 8, economicStrength: 5 } },
      { id: 'oppose', text: 'Oppose', consequence: 'You keep narrow mandate.', effects: { priceStability: 5 } },
    ],
  },
  {
    phase: 5,
    title: 'Final Quarter',
    narrative: `Your term nears its end. The economy has stabilized. What legacy do you leave?`,
    choices: [
      { id: 'growth_legacy', text: 'A growth-oriented handover', consequence: 'You prioritize expansion.', effects: { economicStrength: 8, publicSupport: 8 } },
      { id: 'stability_legacy', text: 'A stability-oriented handover', consequence: 'You prioritize prices.', effects: { priceStability: 10, economicStrength: 2 } },
      { id: 'balanced_legacy', text: 'A balanced handover', consequence: 'You split the difference.', effects: { economicStrength: 5, priceStability: 5, publicSupport: 5 } },
    ],
  },
];

const endings: LongFormEnding[] = [
  { id: 'victory', endingType: 'victory', title: 'Soft Landing', endingNarrative: `You navigated stagflation. Inflation has moderated. Growth has returned. You found the narrow path between inflation and recession.` },
  { id: 'partial', endingType: 'partial_victory', title: 'Mixed Results', endingNarrative: `You made progress. Inflation eased but growth remained weak — or growth returned but inflation proved stubborn. The outcome is mixed.` },
  { id: 'defeat', endingType: 'defeat', title: 'Crisis Unresolved', endingNarrative: `Stagflation persists. You could not find the balance. The next government inherits the same difficult trade-offs.` },
];

const { getNode } = createLongFormTree(blocks, endings, (i) => (i === 0 ? 0 : i === 1 ? 1 : 2));
export { getNode };
