import type { DecisionBlock, LongFormEnding, ScenarioArc } from '../long-form-tree';
import { createArcBasedTree } from '../long-form-tree';

/**
 * Tutorial — Republic of Calmwater (streamlined, branched, theoretically grounded)
 *
 * Structure: 8 blocks total
 * - Block 1: Intro + choose your theoretical tradition (branches)
 * - Path A (Keynesian): 3 blocks on fiscal policy, multiplier, demand management
 * - Path B (Monetarist/Ordoliberal): 3 blocks on rules, inflation targeting, credibility
 * - Path C (Structuralist): 3 blocks on distribution, institutions, power
 * - Block 8: Synthesis/Conclusion
 *
 * Each path teaches the same mechanics (taxes, spending, debt) but through different
 * heterodox lenses, preparing players for the pluralist approach of the full game.
 */

// Shared intro block
const introBlock: DecisionBlock = {
  phase: 1,
  title: 'Welcome to Macro Planner',
  narrative: `Welcome to Macro Planner. You are the leader of the Republic of Calmwater — a small, fictional country with a mixed economy, moderate debt, and a restless population.

The game is built on heterodox economic traditions — it does not assume any single "correct" approach. Different schools of thought emphasize different factors: demand, supply, institutions, power, or distribution.

For this tutorial, choose which tradition you want to explore first. Don't worry — you'll encounter all of them in the full game.`,
  choices: [
    {
      id: 'keynesian',
      text: 'Keynesian Tradition — Focus on demand and fiscal policy',
      consequence: 'Explore how government spending and taxation shape economic activity through the multiplier effect.',
      effects: { economicStrength: 5, publicSupport: 5 },
      nextArc: 'keynesian_path',
    },
    {
      id: 'monetarist',
      text: 'Monetarist Tradition — Focus on rules and stability',
      consequence: 'Explore how credible policy rules, inflation targeting, and institutional discipline create growth.',
      effects: { debtBurden: -5, priceStability: 5 },
      nextArc: 'monetarist_path',
    },
    {
      id: 'structuralist',
      text: 'Structuralist Tradition — Focus on institutions and power',
      consequence: 'Explore how social structures, class dynamics, and institutional arrangements shape outcomes.',
      effects: { publicSupport: 8 },
      nextArc: 'structuralist_path',
    },
  ],
};

// Path A: Keynesian (Post-Keynesian focus on effective demand)
const keynesianBlocks: DecisionBlock[] = [
  {
    phase: 1,
    title: 'The Multiplier Effect',
    narrative: `John Maynard Keynes argued that economies are driven by aggregate demand — the total spending in the economy. When the government spends, that money doesn't just disappear; it circulates. Workers get paid, they buy goods, businesses earn revenue and hire more workers.

Economists call this the "multiplier effect": one dollar of government spending can generate more than one dollar of economic activity.

This is the foundation of Keynesian fiscal policy: when private demand is weak, the state can step in to fill the gap. But spending adds to debt, and debt has costs too.

How do you apply the multiplier?`,
    choices: [
      {
        id: 'spending',
        text: 'Launch infrastructure spending',
        consequence: 'Classic Keynesian stimulus: creates jobs and multiplies through the economy.',
        effects: { economicStrength: 12, debtBurden: 8, publicSupport: 6 },
      },
      {
        id: 'targeted',
        text: 'Targeted transfers to low-income households',
        consequence: 'Higher "propensity to consume" means stronger multiplier — but smaller headline numbers.',
        effects: { economicStrength: 8, debtBurden: 5, publicSupport: 10 },
      },
      {
        id: 'balanced',
        text: 'Balanced approach: spend but tax to match',
        consequence: 'The "balanced budget multiplier" — spending still stimulates even with offsetting taxes.',
        effects: { economicStrength: 6, publicSupport: 3 },
      },
    ],
  },
  {
    phase: 2,
    title: 'Demand Management',
    narrative: `Hyman Minsky, a Post-Keynesian economist, warned that stability breeds instability. When times are good, firms and households take on more debt, eventually creating "financial fragility."

The Keynesian approach isn't just about stimulating during recessions — it's also about managing demand across the cycle. When the economy overheats, you pull back. When it slumps, you stimulate.

This requires counter-cyclical discipline: running deficits in bad times and (ideally) surpluses in good times. In practice, political pressure makes this difficult.

Your economy is showing signs of overheating. What do you do?`,
    choices: [
      {
        id: 'tighten',
        text: 'Tighten fiscal policy — raise taxes',
        consequence: 'Cool the economy, reduce inflationary pressure. Classic counter-cyclical response.',
        effects: { debtBurden: -8, economicStrength: -3, priceStability: 8 },
      },
      {
        id: 'automatic',
        text: 'Strengthen automatic stabilizers',
        consequence: 'Let the system respond automatically — unemployment benefits reduce in booms, increase in busts.',
        effects: { economicStrength: 2, publicSupport: 8 },
      },
      {
        id: 'ignore',
        text: 'Keep stimulating — growth is good',
        consequence: 'Short-term gains, but building financial fragility. Minsky would warn you.',
        effects: { economicStrength: 10, debtBurden: 12, priceStability: -5 },
      },
    ],
  },
  {
    phase: 2,
    title: 'The Liquidity Trap',
    narrative: `Keynes identified a dangerous scenario called the "liquidity trap": when interest rates are near zero and monetary policy loses effectiveness because people prefer holding cash to spending or investing.

In this situation, fiscal policy becomes the only effective tool. Government must spend directly, as monetary policy — the central bank's usual lever — can't stimulate demand.

This is why Keynesians emphasize fiscal policy over monetary policy during deep recessions. The state must be "spender of last resort."

Your economy is approaching a liquidity trap. How do you respond?`,
    choices: [
      {
        id: 'helicopter',
        text: 'Direct cash transfers to all citizens',
        consequence: 'Guaranteed demand creation. "Helicopter money" — fiscal, not monetary.',
        effects: { economicStrength: 15, publicSupport: 12, debtBurden: 15 },
      },
      {
        id: 'public_employment',
        text: 'Public employment guarantee',
        consequence: 'Job guarantee ensures demand never collapses completely. Modern Monetary Theory builds on this.',
        effects: { economicStrength: 12, publicSupport: 15, debtBurden: 12 },
      },
      {
        id: 'wait',
        text: 'Wait for monetary policy to work',
        consequence: 'In a liquidity trap, this may take years. Japan\'s "lost decades" are the cautionary tale.',
        effects: { economicStrength: -5, priceStability: -3 },
      },
    ],
  },
];

// Path B: Monetarist/Ordoliberal (rules, credibility, stability)
const monetaristBlocks: DecisionBlock[] = [
  {
    phase: 1,
    title: 'Rules Over Discretion',
    narrative: `Milton Friedman argued that discretionary economic policy often does more harm than good. Politicians are tempted by short-term gains (lower unemployment before elections) at the cost of long-term inflation.

The solution? Binding rules that constrain discretion. An independent central bank with a clear inflation target. A constitutional debt brake. Transparent, predictable policy.

This "rules-based" approach aims to create "policy credibility" — the belief that government won't inflate away debt or seize assets. Credible rules lower the "risk premium" investors demand, making borrowing cheaper.

What rule do you establish first?`,
    choices: [
      {
        id: 'inflation_target',
        text: 'Inflation targeting at 2%',
        consequence: 'Classic monetarist anchor. Sacrifices short-term flexibility for long-term predictability.',
        effects: { priceStability: 12, economicStrength: 2, publicSupport: -2 },
      },
      {
        id: 'debt_brake',
        text: 'Constitutional debt brake',
        consequence: 'Germany\'s "Schuldenbremse" - limits deficits to 0.35% of GDP structurally.',
        effects: { debtBurden: -10, economicStrength: -3, publicSupport: -5 },
      },
      {
        id: 'cb_independence',
        text: 'Strengthen central bank independence',
        consequence: 'Insulate monetary policy from political pressure. Credible commitment to price stability.',
        effects: { priceStability: 8, economicStrength: 3, publicSupport: 0 },
      },
    ],
  },
  {
    phase: 2,
    title: 'Credibility and Expectations',
    narrative: `Thomas Sargent, a Nobel laureate, showed that stopping hyperinflation isn't about the money supply per se — it's about credible regime change. If people believe the government has truly abandoned inflationary financing, inflation can fall without massive unemployment.

This "expectations channel" is powerful. If workers and firms believe inflation will stay low, they don't build inflation into wage contracts and pricing decisions. The Phillips curve relationship (inflation vs unemployment) becomes flatter.

But credibility must be earned. It requires consistent behavior over time, and sometimes painful demonstrations of commitment.

You need to signal credibility. How?`,
    choices: [
      {
        id: 'austerity',
        text: 'Austerity package to show discipline',
        consequence: 'Painful short-term, but builds reputation for fiscal responsibility.',
        effects: { debtBurden: -12, economicStrength: -8, publicSupport: -10, priceStability: 5 },
      },
      {
        id: 'technocrats',
        text: 'Appoint independent technocrats to key posts',
        consequence: 'Signal that expertise, not politics, will guide policy.',
        effects: { priceStability: 6, economicStrength: 2, publicSupport: 2 },
      },
      {
        id: 'transparency',
        text: 'Radical transparency — publish all data',
        consequence: 'Markets can verify commitment. Information reduces uncertainty.',
        effects: { economicStrength: 5, publicSupport: 3 },
      },
    ],
  },
  {
    phase: 2,
    title: 'The Stability Trap',
    narrative: `Adam Tooze notes that the ordoliberal obsession with stability can become self-defeating. When every policy is subordinated to price stability, economies may fail to respond to other crises — financial instability, supply shocks, climate change.

The European debt crisis (2010-2015) illustrated this: Germany's insistence on austerity for debtor nations deepened the recession, undermining the very stability the rules were meant to protect.

Tooze argues we need "polycrisis" thinking — recognizing that monetary stability, fiscal health, geopolitical power, and ecological limits interact in complex ways. Rules help, but they must be adaptable.

Your rigid rules are facing an unexpected supply shock. What do you do?`,
    choices: [
      {
        id: 'suspend',
        text: 'Temporarily suspend the debt brake',
        consequence: 'Tooze would approve — crisis demands flexibility. But credibility takes a hit.',
        effects: { economicStrength: 8, debtBurden: 10, priceStability: -3 },
      },
      {
        id: 'stick',
        text: 'Stick to the rules — no exceptions',
        consequence: 'Maintains credibility but deepens the downturn. Ordoliberal purity, political pain.',
        effects: { debtBurden: -5, economicStrength: -10, publicSupport: -8, priceStability: 5 },
      },
      {
        id: 'reform',
        text: 'Reform the rules for more flexibility',
        consequence: 'Acknowledge that the original framework was too rigid.',
        effects: { economicStrength: 3, publicSupport: 5, priceStability: 2 },
      },
    ],
  },
];

// Path C: Structuralist (institutions, power, distribution)
const structuralistBlocks: DecisionBlock[] = [
  {
    phase: 1,
    title: 'Institutions Shape Outcomes',
    narrative: `Karl Polanyi argued that markets don't exist in a vacuum — they're embedded in social relations. The "self-regulating market" is a utopian project that inevitably provokes a protective counter-movement from society.

Structuralists emphasize that economic outcomes depend on institutional arrangements: labor laws, property rights, corporate governance, social norms. Change the institutions, change the outcomes.

Consider labor markets. In some countries, strong unions and employment protection create high wages and job security. In others, "flexibility" means precarity. Same technology, same market — different results because of different rules.

Which institutions do you strengthen?`,
    choices: [
      {
        id: 'unions',
        text: 'Strengthen labor unions and collective bargaining',
        consequence: 'Polanyi would approve — counter-movement to protect labor from commodification.',
        effects: { wageShare: 10, publicSupport: 10, economicStrength: -2, profitRate: -5 },
      },
      {
        id: 'welfare',
        text: 'Expand the welfare state as "decommodification"',
        consequence: 'Health, education, pensions not subject to market logic. Universal programs build solidarity.',
        effects: { publicSupport: 12, economicStrength: 4, debtBurden: 8 },
      },
      {
        id: 'corporate',
        text: 'Reform corporate governance — stakeholder capitalism',
        consequence: 'Workers and communities get board representation, not just shareholders.',
        effects: { economicStrength: 3, publicSupport: 8, wageShare: 5 },
      },
    ],
  },
  {
    phase: 2,
    title: 'Power and Distribution',
    narrative: `Thomas Piketty's formula r > g (return on capital > economic growth) suggests that market economies naturally concentrate wealth unless actively countered. Without intervention, the rich get richer; the middle class stagnates; democracy erodes.

Structuralists argue that "the economy" is really a terrain of conflict over distribution. Wages vs profits. Debtors vs creditors. Regions vs center. The question isn't "growth or distribution" — it's "growth for whom?"

Policy must address power imbalances directly: wealth taxes, minimum wages, anti-monopoly enforcement, debt relief. Technical fixes (tweaking interest rates) won't change structural power.

Your economy is growing, but inequality is rising. What do you do?`,
    choices: [
      {
        id: 'wealth_tax',
        text: 'Introduce progressive wealth tax',
        consequence: 'Direct attack on r > g. Reduces dynastic wealth concentration.',
        effects: { wageShare: 8, publicSupport: 10, economicStrength: -3, debtBurden: -10 },
      },
      {
        id: 'wage_policy',
        text: 'Sectoral wage bargaining with minimum wage floors',
        consequence: 'Uses institutional power to shift distribution toward labor.',
        effects: { wageShare: 12, publicSupport: 8, economicStrength: 2 },
      },
      {
        id: 'antitrust',
        text: 'Aggressive anti-monopoly enforcement',
        consequence: 'Reduces "markup" power of dominant firms. Benefits consumers and workers.',
        effects: { economicStrength: 6, publicSupport: 5, profitRate: -8 },
      },
    ],
  },
  {
    phase: 2,
    title: 'The Double Movement',
    narrative: `Polanyi's "double movement" describes the dialectic: markets expand, society protects itself, markets adapt, new conflicts emerge. There's no equilibrium — just ongoing contestation.

Today we see this in battles over trade: free trade agreements provoke nationalist backlash; global supply chains face demands for "friend-shoring" and reshoring. The "market" never exists outside politics.

Structuralists emphasize that "efficiency" itself is contested. Efficient for whom? At what scale? Over what time horizon? A factory closure may maximize shareholder returns while destroying a community.

A trade agreement threatens domestic manufacturing jobs. How do you balance competing demands?`,
    choices: [
      {
        id: 'reject',
        text: 'Reject the agreement - protect domestic industry',
        consequence: 'Polanyi\'s protective counter-movement. Communities over abstract "efficiency."',
        effects: { economicStrength: -5, publicSupport: 12, wageShare: 5 },
      },
      {
        id: 'conditional',
        text: 'Conditional acceptance - with adjustment support',
        consequence: 'Accept trade but compensate losers. The "embedded liberalism" compromise.',
        effects: { economicStrength: 6, publicSupport: 3, debtBurden: 8 },
      },
      {
        id: 'accept',
        text: 'Accept — growth will create new jobs',
        consequence: 'Classic market logic. But the "creative destruction" may take years, cost elections.',
        effects: { economicStrength: 10, publicSupport: -8, wageShare: -5 },
      },
    ],
  },
];

// Conclusion block (all paths converge here)
const conclusionBlock: DecisionBlock = {
  phase: 3,
  title: 'Synthesis: Three Traditions, One Economy',
  narrative: `You've explored one path, but Macro Planner draws from all three traditions:

**Keynesianism** teaches that demand matters, fiscal policy works, and economies can get stuck in bad equilibria that markets alone can't escape.

**Monetarism/Ordoliberalism** teaches that rules and credibility matter, that inflation is costly to stop once started, and that institutions must constrain short-term political temptations.

**Structuralism** teaches that economies are embedded in social relations, that power shapes distribution, and that "efficiency" is always contested and political.

In the full game, you'll encounter all of these — plus Marxist class analysis, dependency theory, feminist economics, and more. The scenarios draw on real scholars: Hudson on debt, Prashad on imperialism, Lister on Indigenous sovereignty, Varoufakis on technofeudalism.

There is no single "correct" economics. There are different perspectives, each illuminating different aspects of a complex reality. Your job as a leader is to navigate among them, guided by your values and the situation you face.

Ready to begin?`,
  choices: [
    {
      id: 'ready',
      text: 'Enter the full simulation',
      consequence: 'Take your first steps as an economic leader.',
      effects: { economicStrength: 5, publicSupport: 5 },
      endingIndex: 0,
    },
  ],
};

const endings: LongFormEnding[] = [
  {
    id: 'victory',
    endingType: 'victory',
    title: 'Tutorial Complete',
    endingNarrative: `You've completed the tutorial and explored how different economic traditions approach the same problems. Remember: Keynesians emphasize demand management, Monetarists emphasize rules and credibility, Structuralists emphasize institutions and power.

In the full game, these traditions will appear in different scenarios. Some will feel more relevant than others depending on your situation. The goal isn't to pick a "side" — it's to understand the trade-offs each perspective highlights.

You're ready to begin your journey. Try the full simulation, or dive into narrative scenarios like the Sovereignty Path, Gulf Migrant, or Plurinational Path.`,
  },
];

// Build arcs from blocks
const arcs: ScenarioArc[] = [
  { id: 'start', blocks: [introBlock] },
  { id: 'keynesian_path', blocks: keynesianBlocks },
  { id: 'monetarist_path', blocks: monetaristBlocks },
  { id: 'structuralist_path', blocks: structuralistBlocks },
  { id: 'conclusion', blocks: [conclusionBlock] },
];

export function createNarrativeTree(options?: { shuffle?: boolean; seed?: number }) {
  return createArcBasedTree(
    arcs,
    endings,
    () => 0, // All choices lead to the single ending
    { shuffleBlocks: options?.shuffle ?? false, seed: options?.seed },
  );
}
