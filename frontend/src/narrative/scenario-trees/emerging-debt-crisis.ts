import type { DecisionBlock, LongFormEnding } from '../long-form-tree';
import { createLongFormTree } from '../long-form-tree';

/**
 * Emerging Debt Crisis — Republic of Meridia (20 decisions)
 */
const blocks: DecisionBlock[] = [
  {
    phase: 1,
    title: 'The Debt Trap',
    narrative: `You've just been appointed finance minister of the Republic of Meridia. The economy is in trouble: public debt stands at 65% of GDP and rising, the current account is in deficit, and global interest rates are climbing. Your borrowing costs are set to balloon.

Some analysts argue that international debt often functions as a tool of control — creditors use it to impose policies that serve their interests. Historical studies of financial crises suggest these moments require political choices, not just market discipline: who bears the cost is always decided by power. Your predecessor left you with a choice: austerity to please creditors, or stimulus to protect jobs and growth. The IMF has offered a stabilization program. What do you do first?`,
    choices: [
      { id: 'austerity', text: 'Announce austerity', consequence: 'You signal fiscal discipline.', effects: { debtBurden: -8, publicSupport: -12, economicStrength: -5 } },
      { id: 'growth', text: 'Prioritize growth', consequence: 'You bet on expansion.', effects: { debtBurden: 5, publicSupport: 5, economicStrength: 8 } },
      { id: 'restructure', text: 'Seek debt restructuring', consequence: 'You open talks with creditors.', effects: { debtBurden: -15, sovereignty: -5, publicSupport: 5 } },
    ],
  },
  {
    phase: 1,
    title: 'First Reactions',
    narrative: `Markets have reacted to your announcement — bond yields have moved, the currency has shifted. The IMF is watching closely. Your cabinet is divided: the finance ministry backs your approach, but the labour and social affairs ministers are nervous. Credibility with markets matters, but so does public support. Do you hold a press conference to explain your strategy and build confidence, or work behind the scenes to build consensus among your coalition first?`,
    choices: [
      { id: 'press', text: 'Hold a press conference', consequence: 'You go public.', effects: { publicSupport: 5, economicStrength: -2 } },
      { id: 'behind', text: 'Work behind the scenes', consequence: 'You build quietly.', effects: { publicSupport: -3, economicStrength: 3 } },
    ],
  },
  {
    phase: 1,
    title: 'The IMF Offer',
    narrative: `The IMF has formalized their offer: a credit line with conditions. The strings attached include spending cuts, wage freezes, and commitments to privatize state assets. Critics argue that such institutions act primarily in the interests of creditors, and that conditionality has historically dismantled developmental capacity in many countries. The money would ease the immediate squeeze, but the reforms would constrain your policy choices for years. Do you engage seriously with the negotiation, or keep them at arm's length and pursue alternatives?`,
    choices: [
      { id: 'engage', text: 'Engage seriously with the IMF', consequence: 'You open negotiations.', effects: { debtBurden: -5, sovereignty: -8, internationalStanding: 5 } },
      { id: 'arm_length', text: 'Keep the IMF at arm\'s length', consequence: 'You pursue alternatives.', effects: { sovereignty: 8, debtBurden: 3, internationalStanding: -5 } },
    ],
  },
  {
    phase: 2,
    title: 'Bond Market Pressure',
    narrative: `Bond yields have spiked. The central bank is nervous. Foreign investors are selling. Experience from past crises suggests that moments like these require political intervention — markets do not self-correct when confidence collapses. You could use reserves to support bond prices and calm the sell-off, or you could let the market find its level and accept the volatility. The first option costs reserves; the second might trigger a deeper crisis. What do you do?`,
    choices: [
      { id: 'intervene', text: 'Intervene to support bonds', consequence: 'You use reserves.', effects: { debtBurden: -3, economicStrength: 2 } },
      { id: 'let_market', text: 'Let the market find its level', consequence: 'You hold back.', effects: { debtBurden: 5, sovereignty: 5 } },
    ],
  },
  {
    phase: 2,
    title: 'Social Unrest',
    narrative: `Protests have spread to the capital. Unions are mobilizing. Hospital workers and teachers have joined the demonstrations. Some argue that when markets push too hard on society — cutting wages, slashing services — society pushes back. This is the "double movement" of social protection. Your security advisors warn that the unrest could escalate. Do you offer concessions to calm the streets, or maintain your course and argue that stability requires patience?`,
    choices: [
      { id: 'concessions', text: 'Offer concessions', consequence: 'You soften the package.', effects: { publicSupport: 10, debtBurden: 5, economicStrength: 3 } },
      { id: 'maintain', text: 'Maintain your course', consequence: 'You hold the line.', effects: { debtBurden: -8, publicSupport: -15, economicStrength: -5 } },
    ],
  },
  {
    phase: 2,
    title: 'Currency Volatility',
    narrative: `The currency has swung 10% in a week. Exporters are cheering — their goods are suddenly cheaper abroad. But importers are panicking: fuel, medicines, and machinery all cost more. The central bank is under pressure to act. You have two main tools: impose capital controls to stem speculative flows and keep money from fleeing, or rely on rate hikes to make domestic assets more attractive. Capital controls preserve policy space but risk alienating investors. Rate hikes may cool the outflow but will squeeze growth. Which do you choose?`,
    choices: [
      { id: 'capital_controls', text: 'Impose capital controls', consequence: 'You restrict flows.', effects: { sovereignty: 8, economicStrength: -3, priceStability: 5 } },
      { id: 'rate_hikes', text: 'Rely on rate hikes', consequence: 'The central bank acts.', effects: { economicStrength: -5, priceStability: 8, debtBurden: 3 } },
    ],
  },
  {
    phase: 2,
    title: 'Quarterly Results',
    narrative: `The first quarter under your leadership has ended. The numbers are in: GDP has contracted 2%, debt service has risen as a share of revenue, and unemployment has ticked up. Your critics say the plan is failing. Your supporters say it needs more time — that the worst of the adjustment is still ahead. Revising the forecast and adjusting policy would signal flexibility but might undermine credibility. Insisting the plan needs more time could preserve confidence but risks being wrong. What do you do?`,
    choices: [
      { id: 'revise', text: 'Revise and adjust', consequence: 'You pivot.', effects: { publicSupport: 5, economicStrength: 3, debtBurden: 2 } },
      { id: 'insist', text: 'Insist the plan needs time', consequence: 'You stay the course.', effects: { debtBurden: -5, publicSupport: -8 } },
    ],
  },
  {
    phase: 3,
    title: 'Coalition Strain',
    narrative: `Your coalition partner is threatening to withdraw. They represent the regions hit hardest by austerity: the industrial north and the rural south. The budget vote is in two weeks. If they defect, you may not have the votes. Compromising on the fiscal targets would keep the coalition together but would mean softening the deficit reduction — and possibly losing IMF support. Pushing for a full vote could pass the budget as-is but might collapse the government. How do you proceed?`,
    choices: [
      { id: 'compromise', text: 'Compromise on targets', consequence: 'You soften the budget.', effects: { publicSupport: 8, debtBurden: 8, economicStrength: 4 } },
      { id: 'push', text: 'Push for full vote', consequence: 'You risk the coalition.', effects: { debtBurden: -10, publicSupport: -10 } },
    ],
  },
  {
    phase: 3,
    title: 'Export Opportunity',
    narrative: `The weaker currency has boosted exports. A major trade deal is on the table — a regional bloc that would reduce tariffs and harmonize standards. Your trade minister says it could unlock billions in new export revenue. But your industry minister warns that opening too fast could hurt domestic firms that are not yet competitive. Fast-tracking the deal would signal confidence and attract investment. Negotiating slowly would protect domestic industry but might delay the growth gains. Which path do you take?`,
    choices: [
      { id: 'fast_track', text: 'Fast-track the deal', consequence: 'You prioritize growth.', effects: { economicStrength: 12, sovereignty: -5, publicSupport: 5 } },
      { id: 'negotiate', text: 'Negotiate slowly', consequence: 'You protect industry.', effects: { economicStrength: 5, sovereignty: 8, publicSupport: 3 } },
    ],
  },
  {
    phase: 3,
    title: 'The Debt Deflation Trap',
    narrative: `Your debt service ratio has hit 18% — nearly one in five dollars of government revenue goes to creditors. Some analysts warn of "debt deflation": when debt grows faster than the economy's ability to pay, it crushes demand and transfers wealth to creditors. The more you tighten to pay debt, the more the economy shrinks, and the harder it becomes to pay. The alternative is to accept higher debt for now, protect demand, and bet that growth will eventually bring the ratio down. Do you prioritize debt reduction at any cost, or accept higher debt for now to protect demand?`,
    choices: [
      { id: 'debt_first', text: 'Prioritize debt reduction', consequence: 'You tighten further.', effects: { debtBurden: -12, publicSupport: -12, economicStrength: -8 } },
      { id: 'protect_demand', text: 'Protect demand', consequence: 'You ease slightly.', effects: { debtBurden: 5, publicSupport: 10, economicStrength: 8 } },
    ],
  },
  {
    phase: 3,
    title: 'Banking Sector Stress',
    narrative: `Two mid-sized banks have requested liquidity support. They hold deposits from thousands of households and businesses. The financial sector is under strain: non-performing loans have risen as the economy has slowed. Providing emergency lending would keep them afloat but could encourage moral hazard — other weak banks might expect the same. Letting them fail would signal that you will not bail out recklessness, but could trigger a broader panic and deposit runs. How do you respond?`,
    choices: [
      { id: 'support', text: 'Provide emergency lending', consequence: 'You backstop the banks.', effects: { economicStrength: 5, debtBurden: 5 } },
      { id: 'let_fail', text: 'Let weak banks fail', consequence: 'You allow consolidation.', effects: { economicStrength: -8, debtBurden: -5, publicSupport: -10 } },
    ],
  },
  {
    phase: 4,
    title: 'Mid-Term Review',
    narrative: `You're halfway through your term. Debt has moved but not decisively — it is down from the peak but still high. Growth is weak. The IMF program is on track for the next tranche, but the conditions are biting. You could request a program review to argue for eased conditions — perhaps the targets were too ambitious. Or you could accelerate reforms to finish the program early and escape the conditionality sooner. The first risks losing IMF support; the second risks more social pain. What do you do?`,
    choices: [
      { id: 'ease', text: 'Request eased conditions', consequence: 'You seek flexibility.', effects: { publicSupport: 8, sovereignty: -3, debtBurden: 3 } },
      { id: 'accelerate', text: 'Accelerate reforms', consequence: 'You push harder.', effects: { debtBurden: -10, publicSupport: -10, economicStrength: 2 } },
    ],
  },
  {
    phase: 4,
    title: 'Election Pressure',
    narrative: `Local elections are in six months. Your party is trailing in the polls — the opposition has capitalized on the pain of austerity. Your political advisors urge you to announce a "growth package": targeted infrastructure spending, tax cuts for small business, or one-time relief for households. It would signal that you care about ordinary people. But it would also add to the deficit and could undermine the credibility you have built with markets. Do you announce a growth package to win support, or stay the course and risk defeat?`,
    choices: [
      { id: 'growth_package', text: 'Announce a growth package', consequence: 'You stimulate.', effects: { publicSupport: 15, debtBurden: 10, economicStrength: 10 } },
      { id: 'stay_course', text: 'Stay the course', consequence: 'You resist pressure.', effects: { debtBurden: -8, publicSupport: -12 } },
    ],
  },
  {
    phase: 4,
    title: 'Restructuring Talks',
    narrative: `Creditors have agreed to preliminary restructuring talks. Throughout history, there is a long tradition of debt relief — when debts become unpayable, societies have often cancelled or restructured them to prevent collapse. The question is how much to ask for. Demanding a haircut — a reduction in the principal owed — would give you more fiscal space but would anger creditors and may make future borrowing harder. Accepting only a maturity extension would ease the cash flow without the same confrontation. What do you push for?`,
    choices: [
      { id: 'haircut', text: 'Demand a haircut', consequence: 'You push for relief.', effects: { debtBurden: -15, sovereignty: 5, internationalStanding: -10 } },
      { id: 'extension', text: 'Accept extension only', consequence: 'You take the softer option.', effects: { debtBurden: -8, internationalStanding: 3 } },
    ],
  },
  {
    phase: 4,
    title: 'Infrastructure Choice',
    narrative: `A major infrastructure project is shovel-ready: a new port expansion that would boost exports, or a rail link that would connect remote regions. The contractors are ready to break ground. It would boost growth and create jobs — and the debt could be justified if the investment pays off. But it would also add to the deficit. Your finance ministry says wait until debt is lower. Your planning ministry says the opportunity will not last. Do you greenlight it, or postpone until debt is lower?`,
    choices: [
      { id: 'greenlight', text: 'Greenlight the project', consequence: 'You invest.', effects: { economicStrength: 12, debtBurden: 8, publicSupport: 10 } },
      { id: 'postpone', text: 'Postpone', consequence: 'You wait.', effects: { debtBurden: -5, economicStrength: -5, publicSupport: -5 } },
    ],
  },
  {
    phase: 5,
    title: 'Year Two Begins',
    narrative: `Your second year in office. The economy has stabilized — the worst of the crisis has passed. But it has not recovered: growth is still weak, unemployment remains elevated. You have a choice. Declaring victory and easing policy would signal that the worst is over and could unlock private investment. But it might also invite complacency and let debt creep back up. Pushing for one more round of consolidation would lock in the gains but could prolong the pain. Which way do you lean?`,
    choices: [
      { id: 'ease', text: 'Ease policy', consequence: 'You pivot to growth.', effects: { publicSupport: 12, economicStrength: 10, debtBurden: 5 } },
      { id: 'consolidate', text: 'One more round of consolidation', consequence: 'You tighten again.', effects: { debtBurden: -12, publicSupport: -10, economicStrength: -5 } },
    ],
  },
  {
    phase: 5,
    title: 'International Summit',
    narrative: `A G20 finance ministers' summit approaches. It is a rare chance to speak to the world's most powerful economies. Some countries have been lobbying for debt relief for developing nations and reform of global financial architecture. You could use the platform to make a public case — to argue that the system is stacked against countries like yours and that debt relief is not charity but justice. Or you could keep a low profile and avoid rocking the boat. How do you approach it?`,
    choices: [
      { id: 'lobby', text: 'Lobby for debt relief', consequence: 'You go public.', effects: { sovereignty: 8, internationalStanding: 5, publicSupport: 5 } },
      { id: 'low_profile', text: 'Keep a low profile', consequence: 'You avoid attention.', effects: { internationalStanding: -3 } },
    ],
  },
  {
    phase: 5,
    title: 'Tax Reform',
    narrative: `Your tax reform bill is before parliament. It would raise revenue from the wealthy — higher top rates, a wealth tax, closing loopholes — and use the proceeds to fund social spending and deficit reduction. The opposition has offered to support a watered-down version: fewer tax increases, more spending cuts. Compromising would get you a partial win and show you can govern. Pushing the full version would signal that you believe in redistribution — but you might lose the vote entirely. What do you do?`,
    choices: [
      { id: 'compromise', text: 'Compromise to pass it', consequence: 'You get a partial win.', effects: { debtBurden: -5, publicSupport: 5, economicStrength: 2 } },
      { id: 'full', text: 'Push the full version', consequence: 'You risk defeat.', effects: { debtBurden: -10, publicSupport: 10, economicStrength: 5 } },
    ],
  },
  {
    phase: 5,
    title: 'Central Bank Independence',
    narrative: `The central bank wants to cut rates. Inflation has eased, and they argue that growth needs support. You have been pressuring them to hold — you worried that cutting too soon would undermine credibility and invite another spike. But the economy is weak, and the political cost of high rates is mounting. Backing off and letting them cut would ease the squeeze and could boost growth. Insisting they hold would preserve the anti-inflation signal but might prolong the recession. What do you do?`,
    choices: [
      { id: 'back_off', text: 'Let them cut', consequence: 'Rates fall.', effects: { economicStrength: 8, publicSupport: 8, priceStability: -5 } },
      { id: 'insist', text: 'Insist they hold', consequence: 'Rates stay.', effects: { priceStability: 8, economicStrength: -3, publicSupport: -3 } },
    ],
  },
  {
    phase: 5,
    title: 'The Final Quarter',
    narrative: `Your term enters its final phase. Debt has moved. Growth has shifted. The question now is what legacy you leave. Do you prepare a handover that locks in your strategy — that makes it clear the next government should continue on the same path? Or do you leave room for your successor to pivot — to acknowledge that circumstances may change and that flexibility is valuable? The first option gives continuity; the second gives options. What do you choose?`,
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
    endingNarrative: `The crisis has deepened. Debt remains high. Growth has stalled. Public trust has eroded. The choices made in moments like these shape decades — the next government will inherit a harder task. The struggle continues.`,
  },
];

const { getNode } = createLongFormTree(
  blocks,
  endings,
  (choiceIdx) => (choiceIdx === 0 ? 0 : choiceIdx === 1 ? 1 : 2),
);

export { getNode };
