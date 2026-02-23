import type { DecisionBlock, LongFormEnding } from '../long-form-tree';
import { createLongFormTree } from '../long-form-tree';

/**
 * Emerging Debt Crisis — Republic of Meridia (20 decisions)
 * Thinkers: Hudson, Tooze, Kadri
 */
const blocks: DecisionBlock[] = [
  {
    phase: 1,
    title: 'The Debt Trap',
    narrative: `You've just been appointed finance minister of the Republic of Meridia. Public debt stands at 65% of GDP and rising. Global interest rates are climbing. As Michael Hudson documents, international debt functions as a tool of control. Adam Tooze shows these moments require political choices. What do you do first?`,
    choices: [
      { id: 'austerity', text: 'Announce austerity', consequence: 'You signal fiscal discipline.', effects: { debtBurden: -8, publicSupport: -12, economicStrength: -5 } },
      { id: 'growth', text: 'Prioritize growth', consequence: 'You bet on expansion.', effects: { debtBurden: 5, publicSupport: 5, economicStrength: 8 } },
      { id: 'restructure', text: 'Seek debt restructuring', consequence: 'You open talks with creditors.', effects: { debtBurden: -15, sovereignty: -5, publicSupport: 5 } },
    ],
  },
  {
    phase: 1,
    title: 'First Reactions',
    narrative: `Markets have reacted. The IMF is watching. Your cabinet is divided. Do you hold a press conference to explain your strategy, or work behind the scenes to build consensus?`,
    choices: [
      { id: 'press', text: 'Hold a press conference', consequence: 'You go public.', effects: { publicSupport: 5, economicStrength: -2 } },
      { id: 'behind', text: 'Work behind the scenes', consequence: 'You build quietly.', effects: { publicSupport: -3, economicStrength: 3 } },
    ],
  },
  {
    phase: 1,
    title: 'The IMF Offer',
    narrative: `The IMF has formalized their offer: a credit line with conditions. Hudson argues the IMF acts as a creditor cartel. Kadri documents how conditionality dismantles developmental states. Do you engage seriously or keep them at arm's length?`,
    choices: [
      { id: 'engage', text: 'Engage seriously with the IMF', consequence: 'You open negotiations.', effects: { debtBurden: -5, sovereignty: -8, internationalStanding: 5 } },
      { id: 'arm_length', text: 'Keep the IMF at arm\'s length', consequence: 'You pursue alternatives.', effects: { sovereignty: 8, debtBurden: 3, internationalStanding: -5 } },
    ],
  },
  {
    phase: 2,
    title: 'Bond Market Pressure',
    narrative: `Bond yields have spiked. The central bank is nervous. Tooze would say this requires political intervention, not market discipline. Do you intervene to support bond prices, or let the market find its level?`,
    choices: [
      { id: 'intervene', text: 'Intervene to support bonds', consequence: 'You use reserves.', effects: { debtBurden: -3, economicStrength: 2 } },
      { id: 'let_market', text: 'Let the market find its level', consequence: 'You hold back.', effects: { debtBurden: 5, sovereignty: 5 } },
    ],
  },
  {
    phase: 2,
    title: 'Social Unrest',
    narrative: `Protests have spread. Unions are mobilizing. Polanyi would see society's counter-movement. Do you offer concessions to calm the streets, or maintain your course?`,
    choices: [
      { id: 'concessions', text: 'Offer concessions', consequence: 'You soften the package.', effects: { publicSupport: 10, debtBurden: 5, economicStrength: 3 } },
      { id: 'maintain', text: 'Maintain your course', consequence: 'You hold the line.', effects: { debtBurden: -8, publicSupport: -15, economicStrength: -5 } },
    ],
  },
  {
    phase: 2,
    title: 'Currency Volatility',
    narrative: `The currency has swung 10% in a week. Exporters are cheering; importers are panicking. Do you impose capital controls to stem speculation, or rely on rate hikes?`,
    choices: [
      { id: 'capital_controls', text: 'Impose capital controls', consequence: 'You restrict flows.', effects: { sovereignty: 8, economicStrength: -3, priceStability: 5 } },
      { id: 'rate_hikes', text: 'Rely on rate hikes', consequence: 'The central bank acts.', effects: { economicStrength: -5, priceStability: 8, debtBurden: 3 } },
    ],
  },
  {
    phase: 2,
    title: 'Quarterly Results',
    narrative: `The first quarter under your leadership has ended. GDP has contracted 2%. Debt service has risen. Do you revise your forecast and adjust, or insist the plan needs more time?`,
    choices: [
      { id: 'revise', text: 'Revise and adjust', consequence: 'You pivot.', effects: { publicSupport: 5, economicStrength: 3, debtBurden: 2 } },
      { id: 'insist', text: 'Insist the plan needs time', consequence: 'You stay the course.', effects: { debtBurden: -5, publicSupport: -8 } },
    ],
  },
  {
    phase: 3,
    title: 'Coalition Strain',
    narrative: `Your coalition partner is threatening to withdraw. The budget vote is in two weeks. Do you compromise on the fiscal targets, or push for a full vote?`,
    choices: [
      { id: 'compromise', text: 'Compromise on targets', consequence: 'You soften the budget.', effects: { publicSupport: 8, debtBurden: 8, economicStrength: 4 } },
      { id: 'push', text: 'Push for full vote', consequence: 'You risk the coalition.', effects: { debtBurden: -10, publicSupport: -10 } },
    ],
  },
  {
    phase: 3,
    title: 'Export Opportunity',
    narrative: `The weaker currency has boosted exports. A major trade deal is on the table. Do you fast-track it for growth, or negotiate slowly to protect domestic industry?`,
    choices: [
      { id: 'fast_track', text: 'Fast-track the deal', consequence: 'You prioritize growth.', effects: { economicStrength: 12, sovereignty: -5, publicSupport: 5 } },
      { id: 'negotiate', text: 'Negotiate slowly', consequence: 'You protect industry.', effects: { economicStrength: 5, sovereignty: 8, publicSupport: 3 } },
    ],
  },
  {
    phase: 3,
    title: 'Hudson\'s Warning',
    narrative: `Hudson warns of debt deflation — when debt crushes demand and transfers wealth to creditors. Your debt service ratio has hit 18%. Do you prioritize debt reduction at any cost, or accept higher debt for now to protect demand?`,
    choices: [
      { id: 'debt_first', text: 'Prioritize debt reduction', consequence: 'You tighten further.', effects: { debtBurden: -12, publicSupport: -12, economicStrength: -8 } },
      { id: 'protect_demand', text: 'Protect demand', consequence: 'You ease slightly.', effects: { debtBurden: 5, publicSupport: 10, economicStrength: 8 } },
    ],
  },
  {
    phase: 3,
    title: 'Banking Sector Stress',
    narrative: `Two mid-sized banks have requested liquidity support. The financial sector is under strain. Do you provide emergency lending, or let weak banks fail?`,
    choices: [
      { id: 'support', text: 'Provide emergency lending', consequence: 'You backstop the banks.', effects: { economicStrength: 5, debtBurden: 5 } },
      { id: 'let_fail', text: 'Let weak banks fail', consequence: 'You allow consolidation.', effects: { economicStrength: -8, debtBurden: -5, publicSupport: -10 } },
    ],
  },
  {
    phase: 4,
    title: 'Mid-Term Review',
    narrative: `You're halfway through your term. Debt has moved but not decisively. Growth is weak. Do you request an IMF program review to ease conditions, or accelerate reforms to finish the program early?`,
    choices: [
      { id: 'ease', text: 'Request eased conditions', consequence: 'You seek flexibility.', effects: { publicSupport: 8, sovereignty: -3, debtBurden: 3 } },
      { id: 'accelerate', text: 'Accelerate reforms', consequence: 'You push harder.', effects: { debtBurden: -10, publicSupport: -10, economicStrength: 2 } },
    ],
  },
  {
    phase: 4,
    title: 'Election Pressure',
    narrative: `Local elections are in six months. Your party is trailing. Do you announce a "growth package" to win support, or stay the course and risk defeat?`,
    choices: [
      { id: 'growth_package', text: 'Announce a growth package', consequence: 'You stimulate.', effects: { publicSupport: 15, debtBurden: 10, economicStrength: 10 } },
      { id: 'stay_course', text: 'Stay the course', consequence: 'You resist pressure.', effects: { debtBurden: -8, publicSupport: -12 } },
    ],
  },
  {
    phase: 4,
    title: 'Restructuring Talks',
    narrative: `Creditors have agreed to preliminary restructuring talks. Hudson argues debt jubilees have historically prevented social collapse. Do you demand a haircut, or accept maturity extension only?`,
    choices: [
      { id: 'haircut', text: 'Demand a haircut', consequence: 'You push for relief.', effects: { debtBurden: -15, sovereignty: 5, internationalStanding: -10 } },
      { id: 'extension', text: 'Accept extension only', consequence: 'You take the softer option.', effects: { debtBurden: -8, internationalStanding: 3 } },
    ],
  },
  {
    phase: 4,
    title: 'Infrastructure Choice',
    narrative: `A major infrastructure project is shovel-ready. It would boost growth but add debt. Do you greenlight it, or postpone until debt is lower?`,
    choices: [
      { id: 'greenlight', text: 'Greenlight the project', consequence: 'You invest.', effects: { economicStrength: 12, debtBurden: 8, publicSupport: 10 } },
      { id: 'postpone', text: 'Postpone', consequence: 'You wait.', effects: { debtBurden: -5, economicStrength: -5, publicSupport: -5 } },
    ],
  },
  {
    phase: 5,
    title: 'Year Two Begins',
    narrative: `Your second year in office. The economy has stabilized but not recovered. Do you declare victory and ease policy, or push for one more round of consolidation?`,
    choices: [
      { id: 'ease', text: 'Ease policy', consequence: 'You pivot to growth.', effects: { publicSupport: 12, economicStrength: 10, debtBurden: 5 } },
      { id: 'consolidate', text: 'One more round of consolidation', consequence: 'You tighten again.', effects: { debtBurden: -12, publicSupport: -10, economicStrength: -5 } },
    ],
  },
  {
    phase: 5,
    title: 'International Summit',
    narrative: `A G20 finance ministers' summit approaches. Do you use it to lobby for debt relief and reform, or keep a low profile?`,
    choices: [
      { id: 'lobby', text: 'Lobby for debt relief', consequence: 'You go public.', effects: { sovereignty: 8, internationalStanding: 5, publicSupport: 5 } },
      { id: 'low_profile', text: 'Keep a low profile', consequence: 'You avoid attention.', effects: { internationalStanding: -3 } },
    ],
  },
  {
    phase: 5,
    title: 'Tax Reform',
    narrative: `Your tax reform bill is before parliament. It would raise revenue from the wealthy and close loopholes. Do you compromise with the opposition to pass it, or push the full version?`,
    choices: [
      { id: 'compromise', text: 'Compromise to pass it', consequence: 'You get a partial win.', effects: { debtBurden: -5, publicSupport: 5, economicStrength: 2 } },
      { id: 'full', text: 'Push the full version', consequence: 'You risk defeat.', effects: { debtBurden: -10, publicSupport: 10, economicStrength: 5 } },
    ],
  },
  {
    phase: 5,
    title: 'Central Bank Independence',
    narrative: `The central bank wants to cut rates. You've been pressuring them to hold. Do you back off and let them cut, or insist they hold for credibility?`,
    choices: [
      { id: 'back_off', text: 'Let them cut', consequence: 'Rates fall.', effects: { economicStrength: 8, publicSupport: 8, priceStability: -5 } },
      { id: 'insist', text: 'Insist they hold', consequence: 'Rates stay.', effects: { priceStability: 8, economicStrength: -3, publicSupport: -3 } },
    ],
  },
  {
    phase: 5,
    title: 'The Final Quarter',
    narrative: `Your term enters its final phase. Debt has moved. Growth has shifted. The question now: what legacy do you leave? Do you prepare a handover that continues your strategy, or one that gives your successor room to pivot?`,
    choices: [
      { id: 'continue', text: 'Handover that continues your strategy', consequence: 'You lock in your approach.', effects: { debtBurden: -5, economicStrength: 3, publicSupport: 2 } },
      { id: 'pivot_room', text: 'Give successor room to pivot', consequence: 'You leave options open.', effects: { publicSupport: 8, sovereignty: 5 } },
      { id: 'mixed', text: 'A balanced handover', consequence: 'You split the difference.', effects: { debtBurden: -2, publicSupport: 5, economicStrength: 5 } },
    ],
  },
];

const endings: LongFormEnding[] = [
  {
    id: 'victory',
    endingType: 'victory',
    title: 'Sustainable Path',
    endingNarrative: `You've navigated the debt crisis. Debt has stabilized. Growth has returned. Public support has held. You proved that political choices matter — and that there are alternatives to pure austerity or pure stimulus. Meridia is on a sustainable path.`,
  },
  {
    id: 'partial',
    endingType: 'partial_victory',
    title: 'Mixed Legacy',
    endingNarrative: `Your term ends with mixed results. Debt has moved in the right direction, but growth and support have been uneven. You avoided catastrophe. The next government will inherit both gains and challenges.`,
  },
  {
    id: 'defeat',
    endingType: 'defeat',
    title: 'Crisis Deepens',
    endingNarrative: `The crisis has deepened. Debt remains high. Growth has stalled. Public trust has eroded. As Hudson and Kadri warned, the choices made in moments like these shape decades. The struggle continues.`,
  },
];

const { getNode } = createLongFormTree(
  blocks,
  endings,
  (choiceIdx) => (choiceIdx === 0 ? 0 : choiceIdx === 1 ? 1 : 2),
);

export { getNode };
