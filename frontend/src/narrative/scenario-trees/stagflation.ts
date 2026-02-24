import type { DecisionBlock, LongFormEnding, ScenarioArc } from '../long-form-tree';
import { createArcBasedTree } from '../long-form-tree';

/**
 * Stagflation — Federated States of Norden
 * Refactored with Parallel Arcs to eliminate repetition
 * Three distinct approaches: Monetarist, Keynesian, Structuralist
 */

const introArc: ScenarioArc = {
  id: 'start',
  blocks: [
    {
      phase: 1,
      title: 'The Worst of Both Worlds',
      narrative: `You lead the Federated States of Norden — a developed economy now caught in stagflation. Inflation is at 8%, growth has turned negative, and unemployment is creeping up. Your citizens are angry: prices are rising while wages stagnate and jobs disappear.

Three schools of thought dominate the cabinet debate:

**The Monetarists** — led by your central bank governor — argue that inflation must be crushed before it becomes embedded in expectations. They cite Paul Volcker's playbook: aggressive rate hikes, even at the cost of a deep recession.

**The Keynesians** — led by your finance minister — argue for a coordinated approach using fiscal stimulus alongside gradual tightening. They cite James Tobin's "stabilization policy" — using demand management to soften the blow while controlling inflation.

**The Structuralists** — led by your labour minister — argue that stagflation isn't just a demand problem but a supply crisis. They cite John Kenneth Galbraith's institutionalism — address physical bottlenecks, decommodify essential goods, and protect workers from market violence.

How do you frame your initial response?`,
      choices: [
        {
          id: 'monetarist',
          text: 'Back the Central Bank — Inflation First',
          consequence: 'You commit to crushing inflation at any cost, following the Volcker playbook.',
          effects: { priceStability: 15, economicStrength: -12, publicSupport: -10 },
          nextArc: 'monetarist',
        },
        {
          id: 'keynesian',
          text: 'Coordinate Fiscal-Monetary Policy',
          consequence: 'You choose Tobin-style stabilization — balancing inflation control with employment.',
          effects: { priceStability: 5, economicStrength: 5, publicSupport: 3 },
          nextArc: 'keynesian',
        },
        {
          id: 'structuralist',
          text: 'Address Supply Constraints Directly',
          consequence: 'You choose Galbraith-style institutional reform — attacking bottlenecks and protecting workers.',
          effects: { priceStability: 3, economicStrength: 8, publicSupport: 8 },
          nextArc: 'structuralist',
        },
      ],
    },
  ],
};

/**
 * MONETARIST ARC — Volcker-Style Orthodox Approach
 * Prioritizes price stability above all else
 */
const monetaristArc: ScenarioArc = {
  id: 'monetarist',
  blocks: [
    {
      phase: 2,
      title: 'The Volcker Shock',
      narrative: `You have aligned with the central bank. The governor proposes a "shock therapy" approach: raising rates by 300 basis points immediately, triggering a deliberate recession to break inflation psychology.

Some advisors warn this will cause unemployment to spike to 12% or higher. Others argue that without credibility, inflation will persist. The Volcker precedent suggests that only dramatic action can anchor expectations.

Do you back the full shock, or seek a more gradual approach?`,
      choices: [
        { id: 'full_shock', text: 'Full Shock — 300bp hike immediately', consequence: 'You go all-in on credibility.', effects: { priceStability: 20, economicStrength: -20, publicSupport: -15 } },
        { id: 'gradual', text: 'Gradual approach — 150bp now, more later', consequence: 'You try to split the difference.', effects: { priceStability: 10, economicStrength: -10, publicSupport: -5 } },
      ],
    },
    {
      phase: 2,
      title: 'Defending the Policy',
      narrative: `Unemployment is rising. Factories are closing. The opposition is organizing mass protests. Your coalition partners are nervous — their constituents are losing jobs.

The central bank insists this is temporary pain for permanent gain. They need your public support to maintain credibility. But every day you defend the policy, your approval ratings fall.

Do you double down on defending the bank, or quietly distance yourself?`,
      choices: [
        { id: 'defend', text: 'Publicly defend the central bank', consequence: 'You share ownership of the pain.', effects: { priceStability: 8, publicSupport: -12 } },
        { id: 'distance', text: 'Keep political distance', consequence: 'You preserve room to pivot later.', effects: { publicSupport: 5, priceStability: -5 } },
      ],
    },
    {
      phase: 3,
      title: 'Fiscal Discipline',
      narrative: `Your finance minister wants austerity — cutting spending to signal fiscal responsibility. This would reinforce the disinflationary message. But social services are already strained.

The Keynesians in your cabinet warn that fiscal austerity combined with monetary tightening is a recipe for depression. They want counter-cyclical spending.

Do you impose fiscal austerity or maintain spending?`,
      choices: [
        { id: 'austerity', text: 'Impose fiscal austerity', consequence: 'You signal total commitment to stability.', effects: { priceStability: 10, debtBurden: -8, publicSupport: -10 } },
        { id: 'spend', text: 'Maintain social spending', consequence: 'You soften the blow, but weaken credibility.', effects: { publicSupport: 8, priceStability: -5, debtBurden: 5 } },
      ],
    },
    {
      phase: 3,
      title: 'Wage Restraint',
      narrative: `Unions are demanding 15% raises to keep pace with inflation. The central bank warns that wage spirals will undo all their work. They want you to publicly oppose the demands.

Galbraith's institutionalists argue that wage restraint without profit restraint is just class war. But the monetarists insist: expectations must be broken everywhere.

Do you back wage restraint, or support the workers?`,
      choices: [
        { id: 'restraint', text: 'Back wage restraint', consequence: 'You take on the unions.', effects: { priceStability: 12, publicSupport: -15 } },
        { id: 'support_workers', text: 'Support worker demands', consequence: 'You protect living standards.', effects: { publicSupport: 12, priceStability: -10 } },
      ],
    },
    {
      phase: 4,
      title: 'The Turning Point',
      narrative: `Inflation has dropped to 4% — a major victory. But unemployment is at 11% and growth has been negative for six quarters. The social cost is immense.

The central bank wants one more hike to ensure inflation doesn't rebound. Your political advisors say you're facing electoral annihilation if you don't pivot to growth now.

Do you hold course or declare victory?`,
      choices: [
        { id: 'hold', text: 'One more hike — finish the job', consequence: 'You risk political destruction.', effects: { priceStability: 10, economicStrength: -8, publicSupport: -15 } },
        { id: 'pivot', text: 'Declare victory and ease', consequence: 'You save your government.', effects: { economicStrength: 10, publicSupport: 10, priceStability: -5 } },
      ],
    },
    {
      phase: 5,
      title: 'Monetarist Legacy',
      narrative: `Your term is ending. The monetarist experiment has run its course. Inflation has been crushed — but at what cost?

Some argue you saved the currency and restored central bank credibility. Others argue you engineered a needless depression that destroyed livelihoods for a generation.

What legacy do you choose to emphasize?`,
      choices: [
        { id: 'credibility', text: 'Price stability restored', consequence: 'You claim victory on inflation.', effects: { priceStability: 8 }, endingIndex: 0 },
        { id: 'mixed', text: 'The cost was too high', consequence: 'You acknowledge the trade-off.', effects: { publicSupport: -5 }, endingIndex: 1 },
        { id: 'regret', text: 'A mistake from the start', consequence: 'You disown the approach.', effects: { publicSupport: 5, priceStability: -8 }, endingIndex: 2 },
      ],
    },
  ],
};

/**
 * KEYNESIAN ARC — Tobin-Style Demand Management
 * Balances inflation control with employment
 */
const keynesianArc: ScenarioArc = {
  id: 'keynesian',
  blocks: [
    {
      phase: 2,
      title: 'Coordinated Stabilization',
      narrative: `You have chosen the Tobin path — fiscal-monetary coordination. The central bank agrees to moderate rate hikes (150bp instead of 300bp) in exchange for fiscal discipline on non-essential spending.

But your finance minister wants to use the "fiscal space" created by the deal to fund a major jobs program. The central bank warns this would undermine the agreement.

Do you stick to the coordinated plan, or use the fiscal space for stimulus?`,
      choices: [
        { id: 'stick', text: 'Stick to the coordinated plan', consequence: 'You preserve the agreement.', effects: { priceStability: 8, economicStrength: 3 } },
        { id: 'stimulus', text: 'Launch jobs program', consequence: 'You risk the central bank revolting.', effects: { economicStrength: 10, publicSupport: 10, priceStability: -8 } },
      ],
    },
    {
      phase: 2,
      title: 'Incomes Policy',
      narrative: `James Tobin's approach included "incomes policy" — bringing unions and business together to negotiate wage and price guidelines that prevent spiral inflation without massive unemployment.

Your labour minister wants to convene a "social partnership" summit. Business leaders are skeptical but willing to talk. Unions want guarantees before they agree to restraint.

Do you invest political capital in this summit?`,
      choices: [
        { id: 'summit', text: 'Convene the social partnership', consequence: 'You broker a national deal.', effects: { publicSupport: 10, priceStability: 5, economicStrength: 5 } },
        { id: 'skip', text: 'Let markets handle it', consequence: 'You avoid the political risk.', effects: { priceStability: -5, economicStrength: -3 } },
      ],
    },
    {
      phase: 3,
      title: 'Automatic Stabilizers',
      narrative: `Unemployment is rising but not as sharply as in the monetarist scenario. Your automatic stabilizers — unemployment benefits, progressive taxation — are cushioning the blow.

Some want to strengthen them: extend benefits, expand eligibility. Others warn that making safety nets too comfortable reduces work incentives and prolongs adjustment.

What do you do?`,
      choices: [
        { id: 'expand', text: 'Expand automatic stabilizers', consequence: 'You protect the vulnerable.', effects: { publicSupport: 10, debtBurden: 8, economicStrength: 3 } },
        { id: 'limit', text: 'Keep them as-is', consequence: 'You avoid moral hazard concerns.', effects: { debtBurden: -5, publicSupport: -5 } },
      ],
    },
    {
      phase: 3,
      title: 'Targeted Relief',
      narrative: `Energy prices remain volatile. Households are struggling with heating bills. You can target relief to the most vulnerable without adding significantly to aggregate demand.

The monetarists in your cabinet oppose any relief as "working against the central bank." The structuralists say you're just treating symptoms.

Do you implement targeted relief?`,
      choices: [
        { id: 'relief', text: 'Targeted energy subsidies', consequence: 'You protect the poorest.', effects: { publicSupport: 10, priceStability: -3, debtBurden: 5 } },
        { id: 'none', text: 'No targeted relief', consequence: 'You maintain policy purity.', effects: { debtBurden: -5, publicSupport: -8 } },
      ],
    },
    {
      phase: 4,
      title: 'Investment Program',
      narrative: `Growth has stabilized but remains weak. Your finance minister proposes a major infrastructure and green investment program — "investing in the future" while boosting demand now.

The central bank warns this will reignite inflation. But with unemployment still elevated, the Keynesians argue the economy has slack.

Do you launch the investment program?`,
      choices: [
        { id: 'invest', text: 'Launch major investment program', consequence: 'You bet on growth.', effects: { economicStrength: 12, publicSupport: 10, priceStability: -5, debtBurden: 10 } },
        { id: 'wait', text: 'Wait for private recovery', consequence: 'You avoid crowding out.', effects: { priceStability: 3, economicStrength: -3 } },
      ],
    },
    {
      phase: 5,
      title: 'Keynesian Assessment',
      narrative: `Your term ends. The Keynesian experiment produced mixed but generally positive results. Inflation is down to 5% — not as low as the monetarists achieved, but unemployment stayed under 8%.

Some call it the "soft landing" that Tobin envisioned. Others say you simply prolonged stagflation rather than solving it.

How do you frame your legacy?`,
      choices: [
        { id: 'balanced', text: 'The balanced path worked', consequence: 'You claim the soft landing.', effects: { economicStrength: 8, publicSupport: 8 }, endingIndex: 0 },
        { id: 'compromise', text: 'Neither fish nor fowl', consequence: 'You acknowledge the muddle.', effects: { publicSupport: -3 }, endingIndex: 1 },
        { id: 'incomplete', text: 'Should have gone further', consequence: 'You regret the compromises.', effects: { priceStability: -5 }, endingIndex: 2 },
      ],
    },
  ],
};

/**
 * STRUCTURALIST ARC — Galbraith-Style Institutional Reform
 * Addresses supply constraints and protects workers
 */
const structuralistArc: ScenarioArc = {
  id: 'structuralist',
  blocks: [
    {
      phase: 2,
      title: 'Decommodification Agenda',
      narrative: `You have chosen the Galbraith path — addressing the structural causes of inflation. Your first move is to identify which goods are essential and should be partially decommodified: removed from pure market pricing.

The structuralists argue that housing, energy, and food are not ordinary commodities — they are prerequisites for social participation. Markets should not determine who freezes or starves.

What do you prioritize?`,
      choices: [
        { id: 'housing', text: 'Social housing expansion', consequence: 'You attack the housing crisis.', effects: { publicSupport: 10, debtBurden: 12, priceStability: 5 } },
        { id: 'energy', text: 'Public energy infrastructure', consequence: 'You reduce energy volatility.', effects: { priceStability: 8, economicStrength: 5, debtBurden: 10 } },
        { id: 'food', text: 'Strategic food reserves', consequence: 'You buffer supply shocks.', effects: { priceStability: 5, publicSupport: 5, debtBurden: 5 } },
      ],
    },
    {
      phase: 2,
      title: 'Supply Chain Sovereignty',
      narrative: `Galbraith emphasized "countervailing power" — institutions that balance corporate power. In this case, you're targeting supply chain sovereignty: domestic production of critical inputs so you're not hostage to global markets.

You can invest in domestic semiconductor production, battery manufacturing, or pharmaceutical synthesis. Each requires major capital and time.

Which sector do you prioritize?`,
      choices: [
        { id: 'chips', text: 'Domestic semiconductors', consequence: 'You reduce tech dependence.', effects: { economicStrength: 10, debtBurden: 15, priceStability: 3 } },
        { id: 'batteries', text: 'Battery manufacturing', consequence: 'You electrify the future.', effects: { economicStrength: 8, priceStability: 5, debtBurden: 12 } },
        { id: 'pharma', text: 'Pharmaceutical synthesis', consequence: 'You secure medicine supply.', effects: { publicSupport: 10, debtBurden: 10, priceStability: 2 } },
      ],
    },
    {
      phase: 3,
      title: 'Labor Protection',
      narrative: `The structuralists argue that treating labor as a commodity "destroys the social fabric." You propose strengthening collective bargaining, extending worker representation on corporate boards, and creating a jobs guarantee for the hardest hit.

Business lobbies are furious. They warn this will reduce flexibility and investment. But your labor minister says that without this, the social contract is broken.

How far do you push?`,
      choices: [
        { id: 'full', text: 'Comprehensive labor protection', consequence: 'You transform labor relations.', effects: { publicSupport: 15, economicStrength: -5, debtBurden: 8 } },
        { id: 'moderate', text: 'Moderate reforms only', consequence: 'You avoid business war.', effects: { publicSupport: 5, economicStrength: 2 } },
        { id: 'minimal', text: 'Minimal intervention', consequence: 'You disappoint your base.', effects: { publicSupport: -10, economicStrength: 5 } },
      ],
    },
    {
      phase: 3,
      title: 'Price Controls on Essentials',
      narrative: `With supply chains stabilized, you now face the question of price controls. Galbraith advised controls on essential goods during wartime and crisis — not as permanent policy, but as emergency protection.

Your advisors are split. Some say controls will create shortages. Others say they're necessary to protect living standards while supply adjusts.

Do you impose temporary price caps on essentials?`,
      choices: [
        { id: 'controls', text: 'Temporary price controls', consequence: 'You shield consumers.', effects: { priceStability: 8, publicSupport: 10, economicStrength: -5 } },
        { id: 'no_controls', text: 'Market pricing with subsidies', consequence: 'You use transfers instead.', effects: { publicSupport: 5, debtBurden: 8, economicStrength: 3 } },
      ],
    },
    {
      phase: 4,
      title: 'Countervailing Power',
      narrative: `Galbraith argued that corporate power must be balanced by strong unions, consumer organizations, and regulatory agencies. You propose creating a "Price and Supply Authority" with powers to investigate supply manipulation and strategic stockpiling.

The business community sees this as government overreach. But evidence suggests some corporations used the crisis to raise prices beyond cost increases.

Do you create the authority?`,
      choices: [
        { id: 'authority', text: 'Create the Price and Supply Authority', consequence: 'You challenge corporate power.', effects: { priceStability: 10, publicSupport: 8, economicStrength: -3 } },
        { id: 'existing', text: 'Strengthen existing regulators', consequence: 'You work within the system.', effects: { priceStability: 3, publicSupport: 3 } },
      ],
    },
    {
      phase: 5,
      title: 'Structuralist Legacy',
      narrative: `Your term ends. The structuralist approach has transformed the economy's foundations. Supply chains are more resilient, essential goods are less volatile, and workers have more protection.

But the central bank complains you "ignored inflation" by focusing on structure. Business says you overregulated. Workers say you delivered.

How do you assess the structuralist experiment?`,
      choices: [
        { id: 'success', text: 'We built a resilient economy', consequence: 'You claim structural victory.', effects: { economicStrength: 10, publicSupport: 10 }, endingIndex: 0 },
        { id: 'partial', text: 'Progress, but inflation remains', consequence: 'You acknowledge trade-offs.', effects: { priceStability: 3, publicSupport: 5 }, endingIndex: 1 },
        { id: 'unfinished', text: 'The work continues', consequence: 'You pass the torch.', effects: { publicSupport: 5, economicStrength: 5 }, endingIndex: 2 },
      ],
    },
  ],
};

const endings: LongFormEnding[] = [
  {
    id: 'victory',
    endingType: 'victory',
    title: 'Soft Landing Achieved',
    endingNarrative: `You navigated stagflation without destroying the economy or society. Inflation has moderated, growth has stabilized, and unemployment never reached crisis levels. 

Your approach — whether monetarist discipline, Keynesian balance, or structuralist reform — succeeded in threading the needle. The next government inherits a functioning economy rather than a crisis.

History may debate whether your solution was optimal, but it worked.`,
  },
  {
    id: 'partial',
    endingType: 'partial_victory',
    title: 'Mixed Results',
    endingNarrative: `You made progress on stagflation, but the victory was incomplete. Inflation eased but remains elevated, or growth returned but unemployment persists.

Your chosen approach — monetarist, Keynesian, or structuralist — addressed some problems while leaving others. The economy is better than when you started, but the fundamental tensions remain.

The next government will face similar trade-offs, though from a more stable base.`,
  },
  {
    id: 'defeat',
    endingType: 'defeat',
    title: 'Crisis Unresolved',
    endingNarrative: `Stagflation persists or has worsened. Your chosen approach — whether too aggressive, too timid, or too slow — failed to break the cycle.

Unemployment and inflation remain high. Public support has collapsed. The next government inherits the same difficult choices, but with fewer resources and less credibility.

The history of stagflation suggests that some crises simply outlast political cycles. This may be one of them.`,
  },
];

const { getNode } = createArcBasedTree(
  [introArc, monetaristArc, keynesianArc, structuralistArc],
  endings,
  (choiceIdx) => (choiceIdx === 0 ? 0 : choiceIdx === 1 ? 1 : 2),
);

export { getNode };
