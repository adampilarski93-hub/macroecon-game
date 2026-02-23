import type { DecisionBlock, LongFormEnding } from '../long-form-tree';
import { createLongFormTree } from '../long-form-tree';

/**
 * Stagflation — Federated States of Norden (20 decisions)
 */
const blocks: DecisionBlock[] = [
  {
    phase: 1,
    title: 'The Worst of Both Worlds',
    narrative: `You lead the Federated States of Norden — a developed economy now caught in stagflation. Inflation is at 8%, growth has turned negative, and unemployment is creeping up. Your citizens are angry: prices are rising while wages stagnate and jobs disappear.

Some argue that treating labour purely as a market commodity destroys the social fabric — and that society inevitably pushes back through regulation and welfare. Historical studies suggest that financial crises require political intervention; markets do not self-correct. The central bank wants to hike rates aggressively. Your labour minister warns that will deepen the recession. What do you do first?`,
    choices: [
      { id: 'fight_inflation', text: 'Prioritize fighting inflation', consequence: 'You back rate hikes.', effects: { priceStability: 12, economicStrength: -10, publicSupport: -8 }, nextBlock: 20 },
      { id: 'protect_jobs', text: 'Prioritize jobs', consequence: 'You resist tightening.', effects: { economicStrength: 5, publicSupport: 8, priceStability: -10 }, nextBlock: 21 },
      { id: 'supply', text: 'Focus on supply', consequence: 'You invest in bottlenecks.', effects: { priceStability: 5, economicStrength: 5, publicSupport: 3 } },
    ],
  },
  {
    phase: 1,
    title: 'Central Bank Pressure',
    narrative: `The central bank wants aggressive rate hikes. They argue that inflation must be crushed before it becomes embedded in expectations. But critics point out that rate hikes hit workers first — by raising unemployment and slowing wage growth — while the financial sector continues to extract returns. You must decide: do you publicly support the central bank and share the blame for the pain, or resist and risk a confrontation that could undermine confidence?`,
    choices: [
      { id: 'support', text: 'Support the central bank', consequence: 'Rates rise.', effects: { priceStability: 10, economicStrength: -8, publicSupport: -6 } },
      { id: 'resist', text: 'Resist', consequence: 'You push back.', effects: { economicStrength: 3, publicSupport: 5, priceStability: -5 } },
    ],
  },
  {
    phase: 1,
    title: 'Fiscal Response',
    narrative: `Your finance minister proposes targeted relief: energy bill support for low-income households, extended unemployment benefits, and a one-time payment for pensioners. Some analysts would frame this as society's "counter-movement" — when markets squeeze too hard, the state steps in to protect people. The cost would add to the deficit. The central bank would see it as working against their inflation fight. But the social cost of doing nothing is mounting. Do you approve it?`,
    choices: [
      { id: 'approve', text: 'Approve targeted relief', consequence: 'You spend.', effects: { publicSupport: 10, priceStability: -3, debtBurden: 5 } },
      { id: 'reject', text: 'Reject — no new spending', consequence: 'You hold the line.', effects: { debtBurden: -5, publicSupport: -8 } },
    ],
  },
  {
    phase: 1,
    title: 'Energy Crisis',
    narrative: `Energy prices have spiked again. Global supply disruptions and geopolitical tensions have pushed oil and gas costs to levels not seen in years. Households are struggling to heat their homes. Businesses are warning of closures. Subsidizing household bills would cushion the shock and protect the most vulnerable — but it would add to the deficit and could keep demand high, prolonging inflation. Letting prices rise would hurt people immediately but might force the adjustment faster. What do you do?`,
    choices: [
      { id: 'subsidize', text: 'Subsidize household bills', consequence: 'You cushion the shock.', effects: { publicSupport: 12, priceStability: 5, debtBurden: 8 } },
      { id: 'let_rise', text: 'Let prices rise', consequence: 'You avoid intervention.', effects: { priceStability: -5, debtBurden: -5, publicSupport: -12 } },
    ],
  },
  {
    phase: 2,
    title: 'Wage Negotiations',
    narrative: `Unions are demanding raises to keep pace with inflation. Firms say they will pass any wage increase on to consumers, which could fuel more inflation. You could broker a wage-price deal — bringing business and labour together to agree on modest increases that do not spiral. Some countries have used such "incomes policy" to tame inflation without crushing demand. Or you could stay out and let them negotiate — or fight — on their own. What do you do?`,
    choices: [
      { id: 'broker', text: 'Broker a wage-price deal', consequence: 'You convene talks.', effects: { publicSupport: 8, priceStability: 5, economicStrength: 3 } },
      { id: 'stay_out', text: 'Stay out', consequence: 'You let them negotiate.', effects: { priceStability: -3, publicSupport: -5 } },
    ],
  },
  {
    phase: 2,
    title: 'Supply Chain Investment',
    narrative: `Bottlenecks persist — in ports, in energy, in key inputs. Part of the inflation is not from too much demand but from too little supply. You could launch a major supply-side program: invest in infrastructure, storage, and domestic production of critical goods. It would take time to bear fruit but could ease inflation without the same job losses as rate hikes. Or you could rely on market adjustment — let high prices attract new supply over time. The first costs money; the second costs time. Which do you choose?`,
    choices: [
      { id: 'launch', text: 'Launch supply-side program', consequence: 'You invest.', effects: { economicStrength: 10, priceStability: 8, debtBurden: 10 } },
      { id: 'market', text: 'Rely on market adjustment', consequence: 'You wait.', effects: { debtBurden: -5, economicStrength: -3 } },
    ],
  },
  {
    phase: 2,
    title: 'Recession Deepens',
    narrative: `GDP has contracted again. Unemployment is rising. Experience from Europe after 2010 suggests that austerity as a crisis response often failed — it deepened recessions and sometimes made debt worse by shrinking the economy. The real recovery, when it came, required political intervention: stimulus, bank support, or both. Your advisors are split. Do you pivot to stimulus and ease the squeeze, or hold course and bet that the recession will burn out inflation first?`,
    choices: [
      { id: 'stimulus', text: 'Pivot to stimulus', consequence: 'You ease policy.', effects: { economicStrength: 8, publicSupport: 10, priceStability: -5 } },
      { id: 'hold', text: 'Hold course', consequence: 'You resist.', effects: { priceStability: 8, economicStrength: -10, publicSupport: -12 } },
    ],
  },
  {
    phase: 2,
    title: 'FIRE Sector Scrutiny',
    narrative: `Some analysts argue that the FIRE sector — finance, insurance, real estate — extracts value from the productive economy rather than supporting it. Profits in finance have remained high even as manufacturing and services struggle. A tax on financial sector profits or transactions could raise revenue and signal that you expect everyone to share the burden. But the financial industry is powerful and would lobby hard against it. Do you propose financial sector taxes, or leave it alone to avoid the fight?`,
    choices: [
      { id: 'tax', text: 'Propose financial sector taxes', consequence: 'You target finance.', effects: { publicSupport: 8, economicStrength: 2, debtBurden: -5 } },
      { id: 'leave', text: 'Leave it alone', consequence: 'You avoid the fight.', effects: { economicStrength: -2 } },
    ],
  },
  {
    phase: 3,
    title: 'Inflation Expectations',
    narrative: `The central bank says inflation expectations are unanchored — people and firms are starting to assume high inflation will persist, which can make it self-fulfilling. They want one more rate hike to signal resolve. But unemployment is already high and growth is weak. Do you back the hike and share responsibility for the pain, or argue enough is enough — that further tightening risks a deeper recession for uncertain gain?`,
    choices: [
      { id: 'back', text: 'Back one more hike', consequence: 'Rates rise.', effects: { priceStability: 10, economicStrength: -8, publicSupport: -6 } },
      { id: 'enough', text: 'Argue enough is enough', consequence: 'You resist.', effects: { economicStrength: 5, publicSupport: 8, priceStability: -3 } },
    ],
  },
  {
    phase: 3,
    title: 'Price Caps',
    narrative: `Some economists urge price caps on essentials — food, energy, rent. The argument is that these are not ordinary commodities; treating them as such leaves the poorest at the mercy of the market. "Decommodifying" them, even temporarily, could protect living standards. But price caps can create shortages, distort incentives, and draw criticism from free-market advocates. The central bank would see them as masking inflation rather than curing it. Do you impose them?`,
    choices: [
      { id: 'impose', text: 'Impose price caps', consequence: 'You intervene.', effects: { priceStability: 8, publicSupport: 10, economicStrength: -3 } },
      { id: 'reject', text: 'Reject price caps', consequence: 'You stay market-oriented.', effects: { economicStrength: 3, publicSupport: -5 } },
    ],
  },
  {
    phase: 3,
    title: 'Coalition Tension',
    narrative: `Your coalition partner wants a jobs guarantee — a promise that the state will provide work to anyone who cannot find it in the private sector. Supporters say it would eliminate involuntary unemployment and stabilise demand. Critics say it would be expensive and could distort labour markets. Do you negotiate a compromise — perhaps a smaller pilot or targeted program — or refuse and risk the coalition?`,
    choices: [
      { id: 'compromise', text: 'Negotiate a compromise', consequence: 'You find middle ground.', effects: { publicSupport: 8, employment: 5, debtBurden: 5 } },
      { id: 'refuse', text: 'Refuse', consequence: 'You hold firm.', effects: { debtBurden: -5, publicSupport: -10 } },
    ],
  },
  {
    phase: 3,
    title: 'Export Competitiveness',
    narrative: `The weak currency has boosted exports — your goods are cheaper abroad. Some argue you should support further depreciation to capture more market share and create jobs. But a weaker currency also raises import costs and can fuel inflation. Do you support further depreciation or resist it to protect purchasing power?`,
    choices: [
      { id: 'support', text: 'Support depreciation', consequence: 'Exports surge.', effects: { economicStrength: 10, priceStability: -5 } },
      { id: 'resist', text: 'Resist', consequence: 'You defend the currency.', effects: { priceStability: 5, economicStrength: -5 } },
    ],
  },
  {
    phase: 4,
    title: 'Mid-Term Assessment',
    narrative: `You are halfway through your term. Inflation has eased from its peak but growth is weak. Do you declare victory and ease policy — pivoting toward stimulus to support recovery — or push for more, holding the line on inflation until it is fully tamed? Easing may revive growth but could let inflation creep back; pushing for more may secure price stability but prolong the slump.`,
    choices: [
      { id: 'ease', text: 'Declare victory and ease', consequence: 'You pivot.', effects: { economicStrength: 8, publicSupport: 10, priceStability: -3 } },
      { id: 'push', text: 'Push for more', consequence: 'You hold.', effects: { priceStability: 5, economicStrength: -3 } },
    ],
  },
  {
    phase: 4,
    title: 'Housing Crisis',
    narrative: `Housing costs are driving inflation — rents and mortgage payments weigh heavily on the index. Do you invest in social housing to add supply and cap costs for the most vulnerable, or rely on market supply — deregulating zoning, streamlining permits — to let builders respond to demand? Social housing is direct but costly; supply-side reform may be cheaper but slower and less targeted.`,
    choices: [
      { id: 'social', text: 'Invest in social housing', consequence: 'You build.', effects: { publicSupport: 12, priceStability: 5, debtBurden: 8 } },
      { id: 'supply', text: 'Rely on supply', consequence: 'You deregulate.', effects: { economicStrength: 5, publicSupport: -5 } },
    ],
  },
  {
    phase: 4,
    title: 'Energy Transition',
    narrative: `Green investment — renewables, efficiency, grid upgrades — could ease dependence on volatile fossil fuel markets and reduce the energy-driven inflation you have faced. Do you launch a major program, or keep support modest? A major program could pay dividends over time but adds to debt now; modest support may be fiscally prudent but leaves you exposed to the next energy shock.`,
    choices: [
      { id: 'launch', text: 'Launch green program', consequence: 'You invest.', effects: { economicStrength: 8, priceStability: 5, debtBurden: 10 } },
      { id: 'modest', text: 'Modest green support only', consequence: 'You go slow.', effects: { economicStrength: 3, debtBurden: 3 } },
    ],
  },
  {
    phase: 4,
    title: 'Labor Market Reform',
    narrative: `Some urge labour market flexibility — making it easier to hire and fire, weakening collective bargaining, reducing regulations. They argue it would boost employment and growth. But critics warn that treating labour as a pure commodity — something to be bought and sold with no protection — tears the social fabric. Workers would bear more risk; job security would fall. The evidence from countries that have gone down this path is mixed. Do you support reform, or oppose it to protect workers?`,
    choices: [
      { id: 'support', text: 'Support reform', consequence: 'You liberalize.', effects: { economicStrength: 5, publicSupport: -8 } },
      { id: 'oppose', text: 'Oppose', consequence: 'You protect workers.', effects: { publicSupport: 10, economicStrength: -3 } },
    ],
  },
  {
    phase: 5,
    title: 'Year Two',
    narrative: `Growth has returned but inflation persists — not at crisis levels, but still above target. Do you prioritise growth, easing policy to support the recovery and jobs, or prioritise price stability, holding the line until inflation is fully under control? The first may boost employment but risk rekindling inflation; the second may secure stability but slow the rebound.`,
    choices: [
      { id: 'growth', text: 'Prioritize growth', consequence: 'You ease.', effects: { economicStrength: 10, publicSupport: 10, priceStability: -5 } },
      { id: 'stability', text: 'Prioritize stability', consequence: 'You hold.', effects: { priceStability: 10, economicStrength: -5 } },
    ],
  },
  {
    phase: 5,
    title: 'Tax Policy',
    narrative: `Do you raise taxes on profits to fund relief for households and reduce the deficit, or cut taxes to stimulate investment and consumption? Raising taxes may ease fiscal pressure and address inequality but could dampen activity; cutting may boost growth but add to debt and favour those who have profited during the crisis.`,
    choices: [
      { id: 'raise', text: 'Raise taxes on profits', consequence: 'You redistribute.', effects: { publicSupport: 10, debtBurden: -5, economicStrength: -2 } },
      { id: 'cut', text: 'Cut taxes', consequence: 'You stimulate.', effects: { economicStrength: 8, debtBurden: 8 } },
    ],
  },
  {
    phase: 5,
    title: 'Central Bank Mandate',
    narrative: `Some want to expand the central bank's mandate to include employment — a "dual mandate" like the Fed, balancing inflation and jobs. Supporters say it would prevent the bank from crushing employment to fight inflation; critics say it would dilute the inflation focus and risk politicising monetary policy. Do you support the change or oppose it?`,
    choices: [
      { id: 'support', text: 'Support expanded mandate', consequence: 'You reform.', effects: { publicSupport: 8, economicStrength: 5 } },
      { id: 'oppose', text: 'Oppose', consequence: 'You keep narrow mandate.', effects: { priceStability: 5 } },
    ],
  },
  {
    phase: 5,
    title: 'Final Quarter',
    narrative: `Your term nears its end. The economy has stabilised — inflation has moderated, growth has returned, though neither is where you might have hoped. What legacy do you leave? A growth-oriented handover, betting on expansion? A stability-oriented one, prioritising price control? Or a balanced approach, splitting the difference?`,
    choices: [
      { id: 'growth_legacy', text: 'A growth-oriented handover', consequence: 'You prioritize expansion.', effects: { economicStrength: 8, publicSupport: 8 } },
      { id: 'stability_legacy', text: 'A stability-oriented handover', consequence: 'You prioritize prices.', effects: { priceStability: 10, economicStrength: 2 } },
      { id: 'balanced_legacy', text: 'A balanced handover', consequence: 'You split the difference.', effects: { economicStrength: 5, priceStability: 5, publicSupport: 5 } },
    ],
  },
  {
    phase: 1,
    title: 'The Inflation Fight',
    narrative: `You have signalled that inflation is the priority. The central bank is pleased; markets are watching. But unemployment will rise as rates bite. Some argue that rate hikes hit workers first while the financial sector continues to extract returns. Do you publicly align with the bank to build credibility, or keep some distance to preserve political room to ease later?`,
    choices: [
      { id: 'align', text: 'Publicly align with the bank', consequence: 'You share the message.', effects: { priceStability: 5, publicSupport: -5 }, nextBlock: 1 },
      { id: 'distance', text: 'Keep some distance', consequence: 'You preserve options.', effects: { publicSupport: 3, priceStability: -2 }, nextBlock: 1 },
    ],
  },
  {
    phase: 1,
    title: 'The Jobs Priority',
    narrative: `You have signalled that jobs come first. The central bank is uneasy; they warn that inflation could spiral. But your labour minister is relieved. Some argue that when markets squeeze too hard, society pushes back — and that crushing demand to fight inflation can do more harm than good. Do you seek a compromise with the bank, or dig in and resist rate hikes?`,
    choices: [
      { id: 'compromise', text: 'Seek a compromise', consequence: 'You look for middle ground.', effects: { economicStrength: 3, publicSupport: 5 }, nextBlock: 1 },
      { id: 'resist', text: 'Dig in and resist', consequence: 'You hold the line.', effects: { publicSupport: 8, priceStability: -8 }, nextBlock: 1 },
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
