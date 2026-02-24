import type { DecisionBlock, LongFormEnding } from '../long-form-tree';
import { createLongFormTree } from '../long-form-tree';

/**
 * Tutorial — Republic of Calmwater (20 decisions)
 * Bulked up with gameplay explainers so new players understand
 * how the decision tree works and how choices interact.
 */
const blocks: DecisionBlock[] = [
  {
    phase: 1,
    title: 'Welcome to Macro Planner',
    narrative: `Welcome to Macro Planner. You are the leader of the Republic of Calmwater — a small, fictional country with a mixed economy, moderate debt, and a restless population.

In this mode, you will make a series of decisions that shape your country's future. Each decision affects your national indicators — the stats on the left side of the screen. Watch them carefully: they tell you how your country is doing.

Here is how the indicators work:

Economic Strength measures the productive capacity of your economy — jobs, industry, investment. Higher is better: a strong economy creates opportunity.

Public Support measures how much the people back your government. If it falls too low, you lose your mandate. Spending on welfare, wages, and public services tends to raise it; austerity and cuts tend to lower it.

Debt Burden measures how much of your budget goes to servicing debt. Unlike the other stats, higher is worse. Spending money raises it; cutting spending or raising taxes lowers it. If debt gets too high, your options narrow.

Every choice you make will show you exactly how it affects your indicators — green numbers mean a stat goes up, red numbers mean it goes down. But here is the catch: most good things cost something. Spending on infrastructure boosts your economy but adds to debt. Cutting taxes is popular but drains your budget. There are no free lunches.

Some decisions will also branch — sending you down a different path depending on what you choose. Your first decision is a good example. Are you ready?`,
    choices: [
      { id: 'balanced', text: 'Balanced approach', consequence: 'Start with modest, balanced policies.', effects: { economicStrength: 5, publicSupport: 5, debtBurden: 0 } },
      { id: 'expansionary', text: 'Stimulate the economy', consequence: 'Spend big to kickstart growth — but you will take on debt.', effects: { economicStrength: 10, publicSupport: 10, debtBurden: 15 }, nextBlock: 20 },
      { id: 'conservative', text: 'Be fiscally conservative', consequence: 'Cut spending to reduce debt — but people may not like it.', effects: { economicStrength: -3, publicSupport: -5, debtBurden: -15 }, nextBlock: 21 },
      { id: 'radical', text: 'Radical restructuring', consequence: 'High risk, high reward.', effects: { economicStrength: 15, publicSupport: -15, debtBurden: 20 }, nextBlock: 22, minStats: { economicStrength: 60 } },
    ],
  },
  {
    phase: 1,
    title: 'Tax Policy',
    narrative: `Good — you have made your first decision. Notice how the indicators on the left changed? That is the core loop of the game: every choice shifts the balance.

Now, taxes. Taxes fund everything your government does — schools, roads, the military, welfare. But they also affect behaviour. Higher taxes mean more revenue for the state but can slow economic activity, because businesses and individuals keep less of what they earn. Lower taxes put more money in private hands but leave the government with less to spend.

This is a classic trade-off. There is no objectively correct answer — it depends on your priorities and the situation. If your debt is high, raising taxes might be prudent. If your economy is weak, lowering taxes could stimulate growth. If things are stable, holding steady is also a valid choice.

Watch the indicator previews on each choice card — they tell you exactly what will happen. Do you raise taxes to shore up the budget, lower them to spur growth, or hold them steady?`,
    choices: [
      { id: 'raise', text: 'Raise taxes', consequence: 'More revenue for the state, but people feel the pinch.', effects: { debtBurden: -8, publicSupport: -5 } },
      { id: 'lower', text: 'Lower taxes', consequence: 'Stimulates private activity, but the budget takes a hit.', effects: { economicStrength: 5, debtBurden: 8 } },
      { id: 'hold', text: 'Hold steady', consequence: 'No change — sometimes stability is the right call.', effects: {} },
    ],
  },
  {
    phase: 1,
    title: 'Government Spending',
    narrative: `Government spending is the other side of the fiscal equation. When the government spends — on infrastructure, healthcare, education, defence — it puts money into the economy. That money circulates: workers get paid, they buy things, businesses earn revenue, and the cycle continues. Economists call this the "multiplier effect."

But spending also adds to the national debt. If you spend more than you collect in taxes, you run a deficit. Deficits accumulate into debt. And debt has a cost: interest payments. The more you owe, the more of your budget goes to paying creditors instead of funding programs.

This is one of the deepest tensions in economic policy. Spend too much and debt spirals; spend too little and the economy stagnates and people suffer. The challenge is finding the right level — and that depends on where you are in the economic cycle.

Do you increase spending to stimulate the economy, cut it to balance the books, or hold steady?`,
    choices: [
      { id: 'increase', text: 'Increase spending', consequence: 'Boosts growth and support, but adds to debt.', effects: { economicStrength: 8, publicSupport: 8, debtBurden: 10 } },
      { id: 'cut', text: 'Cut spending', consequence: 'Reduces debt, but people lose services and jobs.', effects: { debtBurden: -10, publicSupport: -8 } },
      { id: 'hold', text: 'Hold steady', consequence: 'Maintain current levels.', effects: {} },
    ],
  },
  {
    phase: 1,
    title: 'Labour Regulation',
    narrative: `Markets do not exist in a vacuum. They operate within rules — regulations, standards, protections — that society creates. Some economists argue that when markets are left completely unchecked, they eventually produce a backlash: workers organise, communities demand protection, and the pendulum swings back.

Labour regulation is one of the most visible forms of this. Minimum wages, workplace safety standards, protections against unfair dismissal — these all affect how the economy works. Stronger protections tend to improve workers' lives and build public support. But they can also raise costs for businesses, potentially reducing competitiveness or employment.

Notice the trade-off in the indicator previews: "Strengthen protections" gives you public support but costs a small amount of economic strength. "Keep current rules" does the opposite. These kinds of trade-offs appear in almost every decision you will make.

Do you strengthen labour protections, or keep the current rules?`,
    choices: [
      { id: 'yes', text: 'Strengthen protections', consequence: 'Workers benefit; businesses pay more.', effects: { publicSupport: 10, economicStrength: -2 } },
      { id: 'no', text: 'Keep current rules', consequence: 'Business-friendly, but workers feel left behind.', effects: { economicStrength: 3 } },
    ],
  },
  {
    phase: 2,
    title: 'Inequality',
    narrative: `You have entered Phase 2. The game is divided into phases — each one represents a period of time in your country's development. As you progress, the challenges evolve. Decisions you made earlier are now shaping the landscape.

Inequality is one of the defining challenges of any economy. When the returns to capital — profits, rents, dividends — grow faster than the economy as a whole, wealth concentrates at the top. Over time, this can hollow out the middle class, reduce social mobility, and erode public support for the system itself.

Redistribution — through wealth taxes, social transfers, free public services — can push back against this trend. But it is not free: it requires political capital, and opponents will argue it weakens incentives and slows growth.

Do you propose redistribution, or leave distribution to the market?`,
    choices: [
      { id: 'yes', text: 'Propose redistribution', consequence: 'Builds broad support; reduces debt through progressive taxes.', effects: { publicSupport: 12, debtBurden: -5 } },
      { id: 'no', text: 'No redistribution', consequence: 'Preserves growth incentives; inequality may widen.', effects: { economicStrength: 5 } },
    ],
  },
  {
    phase: 2,
    title: 'Infrastructure',
    narrative: `Infrastructure is the backbone of a modern economy. Roads, ports, broadband, energy grids — without them, businesses cannot operate and people cannot access opportunity. Investment in infrastructure tends to boost long-term growth: every dollar spent can generate more than a dollar of economic activity over time.

But infrastructure is expensive. It requires large upfront capital, and the benefits take years to materialise. In the short term, it adds to your debt burden. This is a common pattern in economic decision-making: the things that pay off most in the long run are often the hardest to justify in the short run.

Do you make a major investment to boost long-term growth, or keep it modest to limit debt?`,
    choices: [
      { id: 'major', text: 'Major investment', consequence: 'Big long-term payoff, big short-term cost.', effects: { economicStrength: 12, debtBurden: 10 } },
      { id: 'modest', text: 'Modest investment', consequence: 'Safer, but the economy grows more slowly.', effects: { economicStrength: 6, debtBurden: 4 } },
    ],
  },
  {
    phase: 2,
    title: 'Trade',
    narrative: `Trade is one of the most debated topics in economics. Opening your borders to foreign goods can bring competition, lower prices, and access to new markets. But it also exposes domestic firms to powerful foreign competitors — and in industries where your country is not competitive, jobs can be lost.

The debate is not just theoretical. Real countries have faced this: when trade was liberalised rapidly, some industries thrived while others collapsed. The gains were real — but so were the losses, and they were often concentrated in specific communities that had no alternative.

In this game, "open further" tends to boost overall economic strength, while "protect industry" preserves jobs and builds public support. Neither is categorically better — it depends on your situation.

Do you open further or protect domestic industry?`,
    choices: [
      { id: 'open', text: 'Open further', consequence: 'More competition, more growth potential.', effects: { economicStrength: 8 } },
      { id: 'protect', text: 'Protect industry', consequence: 'Preserves jobs; limits competition.', effects: { publicSupport: 5, economicStrength: 3 } },
    ],
  },
  {
    phase: 2,
    title: 'Education',
    narrative: `Education is an investment in your country's future. A more educated population tends to be more productive, more innovative, and better able to adapt to economic change. But education spending is expensive, and the payoff is long-term — you will not see results for years.

This is another instance of the short-term vs. long-term trade-off that runs through the game. Spending on education boosts both economic strength and public support, but it adds to your debt burden.

Do you increase education spending?`,
    choices: [
      { id: 'yes', text: 'Increase education spending', consequence: 'Long-term investment in people; costs money now.', effects: { economicStrength: 8, publicSupport: 8, debtBurden: 5 } },
      { id: 'no', text: 'Hold current levels', consequence: 'No additional cost; no additional gain.', effects: {} },
    ],
  },
  {
    phase: 3,
    title: 'The Budget Crunch',
    narrative: `Phase 3. By now, the cumulative effect of your earlier decisions is visible. If you have been spending freely, your debt burden may be climbing. If you have been austere, your economy may be sluggish and your people restless.

This is the moment where the game's interconnected design becomes clear. Your earlier choices did not exist in isolation — they created the situation you are in now. A high-debt country has different options than a low-debt one. A popular government can take risks that an unpopular one cannot.

The deficit is growing. Do you prioritise balance — cutting spending or raising taxes to stabilise debt — or prioritise growth, accepting higher deficits in the hope that expansion will eventually fill the gap?`,
    choices: [
      { id: 'balance', text: 'Prioritise balance', consequence: 'Stabilises debt but slows the economy.', effects: { debtBurden: -10, economicStrength: -5 } },
      { id: 'growth', text: 'Prioritise growth', consequence: 'Keeps the economy moving but debt rises.', effects: { economicStrength: 10, debtBurden: 8 } },
    ],
  },
  {
    phase: 3,
    title: 'Social Spending',
    narrative: `When markets create insecurity — job losses, wage stagnation, rising costs — people look to the state for protection. Welfare, pensions, healthcare, unemployment insurance: these are the "social safety net." They cushion people from economic shocks and build support for the government.

But they cost money. Expanding the safety net adds to your spending and, if not funded by taxes, to your debt. The question is whether the social stability and political support they provide are worth the fiscal cost.

In other scenarios — the narrative modes — social spending decisions carry even more weight. They can determine whether your people stand behind you during a crisis or abandon you. Here in the tutorial, the same logic applies, just at a smaller scale.

Do you expand welfare, or hold the line?`,
    choices: [
      { id: 'expand', text: 'Expand welfare', consequence: 'Strong support boost, but it adds to debt.', effects: { publicSupport: 15, debtBurden: 8 } },
      { id: 'hold', text: 'Hold the line', consequence: 'No cost, but no benefit either.', effects: {} },
    ],
  },
  {
    phase: 3,
    title: 'Interest Rates',
    narrative: `Inflation is rising — prices are going up faster than wages. Central banks typically respond by raising interest rates, which makes borrowing more expensive. This cools demand: people buy less, businesses invest less, and the economy slows down. But it also stabilises prices.

This is one of the hardest trade-offs in macroeconomics. Letting inflation run risks a wage-price spiral — where rising prices lead to rising wages, which lead to more rising prices. But raising rates can trigger a recession, costing jobs and growth.

In this game, supporting rate hikes boosts "Price Stability" but hurts "Economic Strength." Resisting does the opposite. There is no right answer — only trade-offs.

Do you support rate hikes to tame inflation, or resist?`,
    choices: [
      { id: 'yes', text: 'Support rate hikes', consequence: 'Prices stabilise, but growth slows.', effects: { priceStability: 10, economicStrength: -5 } },
      { id: 'no', text: 'Resist rate hikes', consequence: 'Growth continues, but inflation persists.', effects: { economicStrength: 5, priceStability: -5 } },
    ],
  },
  {
    phase: 3,
    title: 'Minimum Wage',
    narrative: `The minimum wage is the legal floor for what workers can be paid. Raising it puts more money in the pockets of the lowest-paid workers, reducing poverty and boosting consumer spending. But it can also raise costs for businesses, particularly in labour-intensive sectors like retail, hospitality, and agriculture.

The evidence on minimum wage effects is contested. Some studies find little impact on employment; others find significant job losses in specific sectors. In this game, raising the minimum wage boosts both public support and economic strength — a rare win-win. But in harder scenarios, the trade-offs are sharper.

Do you raise the minimum wage?`,
    choices: [
      { id: 'yes', text: 'Raise the minimum wage', consequence: 'Workers earn more; popular and mildly stimulative.', effects: { publicSupport: 12, economicStrength: 2 } },
      { id: 'no', text: 'Hold current levels', consequence: 'No change.', effects: {} },
    ],
  },
  {
    phase: 4,
    title: 'Mid-Term Review',
    narrative: `You are halfway through. This is a good moment to step back and look at the big picture.

Check your indicators on the left. How is your economy doing? Is debt under control? Do you have public support? The ending of the game — and your final score — depends on where these stats land. A high score requires balance: strong economic strength, solid public support, and manageable debt.

At this point, you have a choice: adjust your approach based on what you have learned, or stay the course. Adjusting gives you a small boost to both economic strength and public support — a reward for flexibility. Staying the course gives you nothing extra, but avoids the disruption of changing direction.

In the narrative modes — Sovereignty Path, Gulf Migrant, Plurinational Path, Reservation Governor — these mid-term checkpoints are even more consequential. A wrong turn can trigger a coup, a sanctions regime, or a community revolt. Here, the stakes are lower, but the principle is the same: adaptability matters.

Do you adjust or stay the course?`,
    choices: [
      { id: 'adjust', text: 'Adjust your approach', consequence: 'Flexibility is rewarded with a small boost.', effects: { economicStrength: 5, publicSupport: 5 } },
      { id: 'stay', text: 'Stay the course', consequence: 'Consistency — for better or worse.', effects: {} },
    ],
  },
  {
    phase: 4,
    title: 'Green Investment',
    narrative: `The green transition — renewable energy, efficiency, new industries — is one of the defining economic questions of our time. Investing in it can create jobs, reduce long-term energy costs, and position your economy for the future. But it requires upfront capital, and the benefits take time.

This is similar to infrastructure: a long-term investment that costs money now. The difference is that green investment also has environmental benefits that are not captured in the economic stats alone. In this game, it boosts economic strength but adds to debt.

Do you invest in the green transition, or hold back?`,
    choices: [
      { id: 'yes', text: 'Invest in the green transition', consequence: 'Future-proofing, but it costs money now.', effects: { economicStrength: 8, debtBurden: 8 } },
      { id: 'no', text: 'Hold back', consequence: 'Saves money; misses the opportunity.', effects: { debtBurden: -5 } },
    ],
  },
  {
    phase: 4,
    title: 'Housing',
    narrative: `Housing is where economics meets everyday life. When housing is unaffordable, people struggle — they spend more on rent, save less, and have fewer options. Social housing — publicly built or subsidised homes — can address this. But it is expensive, and some argue it distorts the housing market.

In this game, supporting social housing boosts public support but adds to debt. The pattern should be familiar by now: almost every "good" thing has a cost. The skill of the game is in managing those costs across many decisions.

Do you support social housing?`,
    choices: [
      { id: 'yes', text: 'Support social housing', consequence: 'People benefit; budget takes a hit.', effects: { publicSupport: 10, debtBurden: 5 } },
      { id: 'no', text: 'Hold back', consequence: 'No cost, but the problem persists.', effects: {} },
    ],
  },
  {
    phase: 4,
    title: 'Financial Regulation',
    narrative: `Financial markets can be powerful engines of growth — channelling savings into productive investment. But they can also be sources of instability: speculation, bubbles, crashes. Tighter regulation can reduce risk and protect consumers, but it may also constrain credit and slow innovation.

The 2008 financial crisis showed what happens when regulation is too loose. But over-regulation can also choke growth. The question is where to draw the line.

Do you tighten financial regulation?`,
    choices: [
      { id: 'yes', text: 'Tighten regulation', consequence: 'Safer system; slightly less dynamic.', effects: { economicStrength: 2, publicSupport: 5 } },
      { id: 'no', text: 'Leave it as is', consequence: 'More dynamism; more risk.', effects: { economicStrength: 5 } },
    ],
  },
  {
    phase: 5,
    title: 'Final Phase',
    narrative: `Phase 5 — the final stretch. Your decisions have accumulated. The economy you built reflects the trade-offs you made: between growth and stability, spending and saving, openness and protection.

This is the last phase. You have a few more decisions to make. Each one matters — your final indicators will determine your score and your ending.

Do you continue your current approach, or reverse course?`,
    choices: [
      { id: 'continue', text: 'Continue the current approach', consequence: 'Double down on what has worked.', effects: { economicStrength: 5, publicSupport: 5 } },
      { id: 'reverse', text: 'Reverse course', consequence: 'Change direction; reduce debt.', effects: { debtBurden: -5 } },
    ],
  },
  {
    phase: 5,
    title: 'Final Stimulus',
    narrative: `Growth is slowing. The economy is losing momentum. You have one more chance to boost it — a final round of stimulus spending or tax cuts. But your debt position may not support it.

This is the kind of decision that separates a good score from a great one. If your debt is manageable, stimulus could push your economic strength over the line. If your debt is already high, it could tip you into unsustainability.

Look at your indicators. What does your situation call for?`,
    choices: [
      { id: 'yes', text: 'Add final stimulus', consequence: 'One last push for growth — at a cost.', effects: { economicStrength: 10, debtBurden: 10 } },
      { id: 'no', text: 'Hold back', consequence: 'Protect the budget for a safer landing.', effects: { debtBurden: -5 } },
    ],
  },
  {
    phase: 5,
    title: 'Your Legacy',
    narrative: `What kind of economy do you leave behind? This is your final substantive decision.

A redistributive economy prioritises fairness: stronger welfare, public services, a more equal distribution of gains. It tends to have high public support but may grow more slowly.

A growth-oriented economy prioritises expansion: lower taxes, less regulation, more incentives for investment. It tends to grow faster but may leave people behind.

Neither is inherently better. The game — like real economics — does not have a single right answer. It has trade-offs, and the best outcome depends on your values and your skill in managing the constraints.

What kind of economy do you leave?`,
    choices: [
      { id: 'redistributive', text: 'More redistributive', consequence: 'Fairness first.', effects: { publicSupport: 10 } },
      { id: 'growth', text: 'Growth-oriented', consequence: 'Expansion first.', effects: { economicStrength: 10 } },
    ],
  },
  {
    phase: 5,
    title: 'Final Decision',
    narrative: `Your last decision. You have learned the core mechanics: every choice has a cost, trade-offs are unavoidable, and earlier decisions shape later ones.

The other modes in Macro Planner — Sovereignty Path, Gulf Migrant, Plurinational Path, Reservation Governor, and the policy scenarios — use these same mechanics, but with deeper narratives, harder trade-offs, and real political economy. Some are based on the work of scholars like Vijay Prashad, Mariátegui, Prebisch, and George Manuel. Some are based on the lived experiences of migrant workers, Indigenous nations, and postcolonial states.

You are ready for them. Choose your final economy.`,
    choices: [
      { id: 'balanced', text: 'A balanced economy', consequence: 'Stability and moderation.', effects: { economicStrength: 5, publicSupport: 5, debtBurden: 0 } },
      { id: 'growth', text: 'A growing economy', consequence: 'Growth at the cost of debt.', effects: { economicStrength: 10, debtBurden: 5 } },
      { id: 'prudent', text: 'A prudent economy', consequence: 'Low debt, steady hand.', effects: { debtBurden: -10, economicStrength: 2 } },
    ],
  },
  {
    phase: 1,
    title: 'Stimulus Options',
    narrative: `You chose to stimulate the economy. This is a branching decision — your first choice sent you down a different path from the other options. In the narrative modes, branching is even more dramatic: choosing to nationalise resources might trigger sanctions, while negotiating might keep the peace.

The question now is how to stimulate. Government spending gives you direct control — you decide where the money goes: infrastructure, healthcare, education. Tax cuts put money in private hands and let individuals and businesses decide how to spend it. Both boost the economy and add to debt, but in different ways.

Do you prioritise government spending or tax cuts?`,
    choices: [
      { id: 'spending', text: 'Government spending', consequence: 'Direct control; strong public support boost.', effects: { economicStrength: 10, publicSupport: 8, debtBurden: 10 }, nextBlock: 23 },
      { id: 'tax_cuts', text: 'Tax cuts', consequence: 'Private-led growth; less public support.', effects: { economicStrength: 8, debtBurden: 8 }, nextBlock: 23 },
    ],
  },
  {
    phase: 1,
    title: 'Conservative Options',
    narrative: `You chose fiscal conservatism — reducing the government's footprint. This is the other branch. In narrative modes like Reservation Governor, a conservative approach might mean refusing federal funding to protect sovereignty. In the Plurinational Path, it might mean rejecting a World Bank loan.

The question is where to cut. Spending cuts reduce government outlays — fewer programs, fewer employees, less investment. A balanced approach combines smaller cuts with some revenue increases. Pure cuts tend to reduce debt faster but cost more public support; a balanced approach is gentler but slower.

Do you prioritise spending cuts, or take a balanced approach?`,
    choices: [
      { id: 'cuts', text: 'Spending cuts', consequence: 'Fast debt reduction; people feel the pain.', effects: { debtBurden: -12, publicSupport: -8 }, nextBlock: 24 },
      { id: 'balanced_cuts', text: 'Balanced approach', consequence: 'Slower debt reduction; less disruption.', effects: { debtBurden: -8, economicStrength: -2 }, nextBlock: 24 },
    ],
  },
  {
    phase: 1,
    title: 'Radical Path',
    narrative: `You have chosen a radical path. This is a high-stakes branch available only to those with a strong starting economy. You are attempting to leapfrog traditional development stages. This will require immense political will and will likely alienate traditional power brokers. Do you focus on state-led high-tech investment, or a radical decentralization of economic power?`,
    choices: [
      { id: 'hitech', text: 'High-tech investment', consequence: 'State-led innovation.', effects: { economicStrength: 15, debtBurden: 15, publicSupport: -5 }, nextBlock: 1 },
      { id: 'decentralize', text: 'Decentralization', consequence: 'Power to the regions.', effects: { publicSupport: 10, economicStrength: -5, sovereignty: 10 }, nextBlock: 1 },
    ],
  },
  {
    phase: 1,
    title: 'Stimulus Deep-Dive',
    narrative: `Your stimulus plan is being implemented. The early results are promising, but the debt is rising faster than expected. You need to fine-tune the delivery. Do you focus the remaining funds on urban centers to maximize immediate growth, or spread them to rural areas to ensure social stability?`,
    choices: [
      { id: 'urban', text: 'Urban focus', consequence: 'Maximum growth efficiency.', effects: { economicStrength: 8, publicSupport: -3 }, nextBlock: 1 },
      { id: 'rural', text: 'Rural focus', consequence: 'Social cohesion first.', effects: { publicSupport: 10, economicStrength: 2 }, nextBlock: 1 },
    ],
  },
  {
    phase: 1,
    title: 'Conservative Deep-Dive',
    narrative: `Your conservative measures are biting. The budget is looking healthier, but the public mood is souring. You have a small surplus. Do you use it to pay down debt even faster, or offer a small, targeted tax break to the middle class to shore up support?`,
    choices: [
      { id: 'pay_debt', text: 'Pay down debt', consequence: 'Fiscal purity.', effects: { debtBurden: -10 }, nextBlock: 1 },
      { id: 'tax_break', text: 'Middle class tax break', consequence: 'Political pragmatism.', effects: { publicSupport: 8, debtBurden: -2 }, nextBlock: 1 },
    ],
  },
];

const endings: LongFormEnding[] = [
  { id: 'victory', endingType: 'victory', title: 'Well Balanced', endingNarrative: `Excellent work. You managed the trade-offs — growth, debt, and public support — and came out on top. You have learned the fundamentals of macroeconomic decision-making: that every choice has a cost, that earlier decisions shape later ones, and that balance is harder than it looks. You are ready for the narrative modes, where the stakes are higher, the trade-offs are sharper, and the consequences are shaped by real political economy.` },
  { id: 'partial', endingType: 'partial_victory', title: 'Mixed Results', endingNarrative: `You made progress, but some things slipped. Perhaps debt got away from you, or public support eroded. That is normal — the trade-offs are real, and no one gets everything right on the first try. Review your decisions in the history panel on the left. Where could you have done differently? Try again, or move on to the narrative modes for a deeper challenge.` },
  { id: 'defeat', endingType: 'defeat', title: 'Learning Experience', endingNarrative: `This was a tough run. The economy struggled, or your people lost confidence, or debt spiralled beyond control. But you have seen the mechanics: how spending and taxes interact, how trade-offs compound, and how early choices constrain later ones. That understanding is the foundation for everything else in the game. Try again with a different strategy, or jump into a narrative mode where the real stories begin.` },
];

export function createNarrativeTree(options?: { shuffle?: boolean; seed?: number }) {
  return createLongFormTree(
    blocks,
    endings,
    (i) => (i === 0 ? 0 : i === 1 ? 1 : 2),
    { shuffleBlocks: options?.shuffle ?? true, seed: options?.seed },
  );
}
