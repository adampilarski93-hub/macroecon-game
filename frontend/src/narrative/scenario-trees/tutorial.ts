import type { DecisionBlock, LongFormEnding, ScenarioArc } from '../long-form-tree';
import { createArcBasedTree } from '../long-form-tree';
import { salesEffortBlock } from './sales-effort-block';

/**
 * Tutorial — Republic of Calmwater (Mechanics-Focused, Multi-Path)
 *
 * This tutorial teaches core game mechanics while introducing players to
 * different heterodox economic traditions. Each path demonstrates the
 * same mechanics through a different theoretical lens.
 *
 * Structure: 10 blocks total
 * - Block 1: Welcome + tradition selection (5 paths)
 * - Path A (Neoclassical/Orthodox): Efficiency, markets, optimization
 * - Path B (Post-Keynesian): Demand, finance, uncertainty
 * - Path C (Marxian): Production, class, crisis tendency
 * - Path D (Structuralist/Institutionalist): Power, institutions, embeddedness
 * - Path E (Development Economics): Late industrialization, center-periphery
 * - Block 10: Synthesis + transition to full game
 *
 * Each path teaches:
 * 1. The 5 core metrics and their interactions
 * 2. How decisions cascade through the economy
 * 3. How to interpret the heterodox advisor
 * 4. Trade-offs and political economy
 */

// ============================================================================
// INTRO BLOCK: Welcome and Tradition Selection
// ============================================================================
const introBlock: DecisionBlock = {
  phase: 1,
  title: 'Welcome to Macro Planner',
  narrative: `Welcome to Macro Planner. This tutorial will teach you the game while introducing different economic traditions.

**The Game Basics:**
You are the leader of the Republic of Calmwater — a fictional country facing typical economic challenges. Every decision affects five metrics:

- **Economic Strength**: Growth, productivity, GDP
- **Public Support**: Your political capital and approval
- **Debt Burden**: Government debt relative to GDP
- **Price Stability**: Inflation control
- **Wage Share**: Worker income vs. profits

Your choices have consequences. The advisor offers perspectives from different schools of thought. There is no "right" answer — only trade-offs grounded in real economic debates.

**Choose your starting tradition:**`,
  choices: [
    {
      id: 'neoclassical',
      text: 'Neoclassical Tradition — Markets, efficiency, optimization',
      consequence: 'Explore how market mechanisms allocate resources efficiently and why government intervention often creates distortions.',
      effects: { economicStrength: 5, priceStability: 5 },
      nextArc: 'neoclassical_path',
    },
    {
      id: 'post_keynesian',
      text: 'Post-Keynesian Tradition — Demand, finance, uncertainty',
      consequence: 'Explore how aggregate demand drives output, why financial markets are inherently unstable, and how pricing power shapes outcomes.',
      effects: { publicSupport: 5, economicStrength: 3 },
      nextArc: 'post_keynesian_path',
    },
    {
      id: 'marxian',
      text: 'Marxian Tradition — Production, class, crisis tendency',
      consequence: 'Explore how production relations shape society, why crises are endemic to capitalism, and how class struggle drives history.',
      effects: { wageShare: 8, publicSupport: 5 },
      nextArc: 'marxian_path',
    },
    {
      id: 'structuralist',
      text: 'Structuralist/Institutionalist — Power, embeddedness, institutions',
      consequence: 'Explore how institutions shape economic outcomes, why markets are embedded in society, and how power determines distribution.',
      effects: { publicSupport: 8, economicStrength: 3 },
      nextArc: 'structuralist_path',
    },
    {
      id: 'development',
      text: 'Development Economics — Late industrialization, structural change',
      consequence: 'Explore how latecomers catch up, why free trade can hinder development, and how the global economy creates core and periphery.',
      effects: { economicStrength: 8, debtBurden: -5 },
      nextArc: 'development_path',
    },
  ],
};

// ============================================================================
// PATH A: NEOCLASSICAL/ORTHODOX (Solow, Lucas, Friedman)
// Focus: Markets clear, efficiency, policy rules, growth theory
// ============================================================================
const neoclassicalBlocks: DecisionBlock[] = [
  {
    phase: 2,
    title: 'The Market Mechanism',
    narrative: `**Neoclassical Economics** assumes markets generally clear: supply meets demand through price adjustments. Distortions occur when governments intervene.

Calmwater has a housing shortage. Builders say zoning restrictions prevent new construction. Rent control keeps prices artificially low, discouraging supply.

The neoclassical approach emphasizes:
- Prices as signals for resource allocation
- Incentives shape behavior
- Markets tend toward equilibrium
- Government failure often exceeds market failure

**Your Choice:**`,
    choices: [
      {
        id: 'deregulate',
        text: 'Remove rent controls and zoning barriers',
        consequence: 'Let the market build. Prices may rise initially, but supply will respond.',
        effects: { economicStrength: 10, publicSupport: -8, wageShare: -5 },
      },
      {
        id: 'subsidize',
        text: 'Subsidize first-time buyers',
        consequence: 'Preserve incentives while addressing affordability through vouchers.',
        effects: { publicSupport: 5, debtBurden: 8, economicStrength: 3 },
      },
      {
        id: 'public_housing',
        text: 'Build public housing directly',
        consequence: 'The state substitutes for market failure. But will it be efficient?',
        effects: { publicSupport: 12, debtBurden: 15, economicStrength: -3 },
      },
    ],
  },
  {
    phase: 2,
    title: 'Rational Expectations',
    narrative: `**Robert Lucas** argued that people anticipate policy effects. If you promise stimulus, agents adjust behavior immediately, neutralizing the policy.

Your finance minister wants a "surprise" infrastructure stimulus to boost growth. But the central bank says predictable rules matter more than discretion.

The rational expectations critique:
- Systematic policies get anticipated
- Only "surprises" have real effects
- Credibility requires consistency
- Rules beat discretion

**Your Choice:**`,
    choices: [
      {
        id: 'surprise',
        text: 'Launch the surprise stimulus',
        consequence: 'Maybe you catch markets off-guard. But can you keep surprising?',
        effects: { economicStrength: 8, priceStability: -5, publicSupport: 5 },
      },
      {
        id: 'rules',
        text: 'Announce a predictable infrastructure rule',
        consequence: 'Credibility over surprise. Markets price in the commitment.',
        effects: { economicStrength: 5, priceStability: 3, publicSupport: 3 },
      },
      {
        id: 'none',
        text: 'Let private investment respond to fundamentals',
        consequence: 'The "crowding out" concern: government spending displaces private.',
        effects: { economicStrength: 3, debtBurden: -5 },
      },
    ],
  },
  {
    phase: 3,
    title: 'Growth Theory',
    narrative: `**Solow Growth Model**: Long-run growth depends on productivity (technology), not policy. Savings affect the level, not the growth rate.

Calmwater has low savings. Your advisors debate:
- Tax incentives to boost saving (raises capital stock)
- Invest in education (raises human capital)
- Research subsidies (raises technology)

The neoclassical view:
- Technology drives long-run growth
- Capital accumulation has diminishing returns
- Savings matter for levels, not growth
- Institutions that protect property rights enable innovation

**Your Choice:**`,
    choices: [
      {
        id: 'savings',
        text: 'Tax incentives for savings and investment',
        consequence: 'Raise the capital stock. But diminishing returns await.',
        effects: { economicStrength: 5, debtBurden: -8, wageShare: -5 },
      },
      {
        id: 'education',
        text: 'Invest heavily in education',
        consequence: 'Human capital is the ultimate resource. Long-term payoff.',
        effects: { economicStrength: 8, debtBurden: 12, publicSupport: 5 },
      },
      {
        id: 'rd',
        text: 'Subsidize R&D and protect IP',
        consequence: 'Technology drives growth. But patents create monopoly power.',
        effects: { economicStrength: 12, debtBurden: 10, wageShare: -8 },
      },
    ],
  },
  {
    phase: 3,
    title: 'Efficiency vs. Equity',
    narrative: `**Arthur Okun's "Big Trade-off"**: Reducing inequality through transfers reduces efficiency. The "leaky bucket" of redistribution wastes resources.

Calmwater's inequality is rising. The Gini coefficient climbs. But your top economist warns: aggressive redistribution reduces work incentives and investment.

The neoclassical perspective:
- Markets maximize total surplus
- Redistribution creates deadweight loss
- The trade-off is real and binding
- Focus on growth, let transfers handle poverty

**Your Choice:**`,
    choices: [
      {
        id: 'low_tax',
        text: 'Keep taxes low, focus on growth',
        consequence: 'Efficiency first. Rising tide lifts all boats.',
        effects: { economicStrength: 10, wageShare: -10, publicSupport: -5 },
      },
      {
        id: 'targeted',
        text: 'Targeted transfers for the poor only',
        consequence: 'Minimize the leaky bucket. Means-tested efficiency.',
        effects: { publicSupport: 5, wageShare: 3, economicStrength: 3 },
      },
      {
        id: 'progressive',
        text: 'Progressive taxation and universal services',
        consequence: 'Accept the efficiency cost for equity gains.',
        effects: { wageShare: 10, publicSupport: 10, economicStrength: -5 },
      },
    ],
  },
  {
    phase: 4,
    title: 'Neoclassical Synthesis',
    narrative: `Your neoclassical tutorial concludes. You've explored markets as allocation mechanisms, the limits of policy discretion, growth theory, and the efficiency-equity trade-off.

**Key Takeaways:**
- Markets generally work; intervention requires justification
- Credibility and rules matter more than surprise
- Technology drives long-run growth
- Redistribution has real costs

**All paths now converge** to practice the core mechanics together.

Ready to synthesize what you've learned?`,
    choices: [
      {
        id: 'continue',
        text: 'Continue to the synthesis',
        consequence: 'All paths converge here.',
        effects: {},
        nextArc: 'synthesis',
      },
    ],
  },
];

// ============================================================================
// PATH B: POST-KEYNESIAN (Kalecki, Robinson, Minsky, Kaldor)
// Focus: Demand drives output, financial instability, pricing power
// ============================================================================
const postKeynesianBlocks: DecisionBlock[] = [
  {
    phase: 2,
    title: 'Effective Demand',
    narrative: `**Post-Keynesian economics** rejects Say's Law. Supply does not create its own demand. Investment drives saving, not the reverse.

Calmwater faces a demand shortfall. Businesses won't invest because sales are weak. Households won't spend because wages are stagnant. The economy is stuck.

Michal Kalecki's insight: Capitalists earn what they spend; workers spend what they earn. Investment creates profits.

The post-Keynesian approach:
- Demand determines output (not supply)
- Investment is driven by expectations (animal spirits)
- Pricing power allows markup over costs
- Distribution affects demand (workers spend more of income)

**Your Choice:**`,
    choices: [
      {
        id: 'spend',
        text: 'Government spends on infrastructure',
        consequence: 'The multiplier: one dollar spent becomes more than one in income.',
        effects: { economicStrength: 12, debtBurden: 10, wageShare: 5 },
      },
      {
        id: 'wages',
        text: 'Raise minimum wage and public employment',
        consequence: 'Put money in workers\' hands. They\'ll spend it immediately.',
        effects: { wageShare: 10, economicStrength: 8, priceStability: -3 },
      },
      {
        id: 'confidence',
        text: 'Business confidence campaign',
        consequence: 'Try to boost animal spirits without spending. Risky.',
        effects: { economicStrength: 3, publicSupport: 3 },
      },
    ],
  },
  {
    phase: 2,
    title: 'Financial Instability',
    narrative: `**Hyman Minsky's FIH**: Stability breeds instability. Long periods of calm encourage risky financing (Ponzi units). Crisis becomes inevitable.

Calmwater's banks are lending aggressively. Asset prices are rising. Your central banker says "this time is different." Your heterodox advisor says a Minsky moment approaches.

Minsky's stages:
- Hedge finance: income covers debt
- Speculative: income covers interest, not principal
- Ponzi: asset appreciation must cover payments

The post-Keynesian view:
- Financial markets are inherently unstable
- Regulation must constrain euphoria
- "Stability is destabilizing"
- Central banks as lenders AND regulators

**Your Choice:**`,
    choices: [
      {
        id: 'regulate',
        text: 'Tighten lending standards and capital requirements',
        consequence: 'Constrain the euphoria. Slow the bubble.',
        effects: { economicStrength: -3, priceStability: 5, debtBurden: 3 },
      },
      {
        id: 'watch',
        text: 'Monitor but don\'t intervene yet',
        consequence: 'Markets correct themselves. Intervention creates moral hazard.',
        effects: { economicStrength: 5, priceStability: -8 },
      },
      {
        id: 'macropru',
        text: 'Macroprudential tools: loan-to-value caps',
        consequence: 'Target specific excesses without raising rates.',
        effects: { economicStrength: 2, priceStability: 3 },
      },
    ],
  },
  {
    phase: 3,
    title: 'Pricing Power',
    narrative: `**Joan Robinson's Imperfect Competition**: Firms are price-setters, not price-takers. They set prices as a markup over costs. Demand matters for quantity, not price.

Inflation is rising. Mainstream economists say "too much demand." Post-Keynesians note that corporations are raising prices beyond cost increases. Profits are soaring while wages lag.

Kalecki's degree of monopoly: The more concentrated the market, the higher the markup.

The post-Keynesian perspective:
- Prices are administered, not market-clearing
- Inflation can come from cost shocks or profit-push
- Excess capacity normally constrains prices
- Supply shocks break this stability

**Your Choice:**`,
    choices: [
      {
        id: 'rates',
        text: 'Raise interest rates to reduce demand',
        consequence: 'The orthodox response. But hits workers, not profits.',
        effects: { priceStability: 8, economicStrength: -10, wageShare: -8 },
      },
      {
        id: 'markup',
        text: 'Excess profits tax and price oversight',
        consequence: 'Target the pricing power directly. Corporations resist.',
        effects: { priceStability: 5, wageShare: 8, economicStrength: -3 },
      },
      {
        id: 'incomes',
        text: 'Negotiate wage-price guidelines',
        consequence: 'Social partnership. But requires union strength.',
        effects: { wageShare: 5, priceStability: 3, publicSupport: 5 },
      },
    ],
  },
  {
    phase: 3,
    title: 'Distribution and Demand',
    narrative: `**Nicholas Kaldor's stylized facts**: The wage share is remarkably stable over time. But when it shifts, demand patterns change.

Calmwater's wage share has fallen for a decade. Workers now rely on debt to maintain consumption. The financial sector has ballooned.

The post-Keynesian analysis:
- Rising inequality reduces aggregate demand
- Debt substitutes for wages temporarily
- Financialization follows wage suppression
- Sustainable growth requires wage-led demand

**Your Choice:**`,
    choices: [
      {
        id: 'debt',
        text: 'Encourage more consumer credit',
        consequence: 'Buy time. But debt bubbles eventually burst.',
        effects: { economicStrength: 8, debtBurden: 15, publicSupport: 5 },
      },
      {
        id: 'wages_up',
        text: 'Policies to raise wage share',
        consequence: 'Unions, minimum wage, full employment commitment.',
        effects: { wageShare: 12, economicStrength: 5, publicSupport: 10 },
      },
      {
        id: 'export',
        text: 'Export-led growth strategy',
        consequence: 'Demand comes from abroad. But it\'s a race to the bottom.',
        effects: { economicStrength: 10, wageShare: -5, publicSupport: -3 },
      },
    ],
  },
  {
    phase: 4,
    title: 'Post-Keynesian Synthesis',
    narrative: `Your post-Keynesian tutorial concludes. You've explored demand-driven output, financial instability, pricing power, and the wage-demand nexus.

**Key Takeaways:**
- Output is demand-constrained, not supply-constrained (normally)
- Financial markets need stabilization
- Corporations have pricing power
- Distribution affects aggregate demand

**All paths now converge** to practice the core mechanics together.

Ready to synthesize what you've learned?`,
    choices: [
      {
        id: 'continue',
        text: 'Continue to the synthesis',
        consequence: 'All paths converge here.',
        effects: {},
        nextArc: 'synthesis',
      },
    ],
  },
];

// ============================================================================
// PATH C: MARXIAN (Marx, Sweezy, Foster, Harvey)
// Focus: Production, class struggle, crisis tendency, accumulation
// ============================================================================
const marxianBlocks: DecisionBlock[] = [
  {
    phase: 2,
    title: 'The Labor Theory of Value',
    narrative: `**Marxian Economics** starts from production. Value comes from socially necessary labor time. Profit is surplus value extracted from workers.

Calmwater's factories are highly automated. A few engineers oversee robots that do the work of hundreds. Profits are record-breaking. Wages for the displaced are declining.

The Marxian analysis:
- Machines don't create value; living labor does
- Automation concentrates capital and displaces labor
- The organic composition of capital rises
- The profit rate tends to fall (with caveats)

**Your Choice:**`,
    choices: [
      {
        id: 'automation',
        text: 'Accelerate automation subsidies',
        consequence: 'Efficiency rises. But the reserve army of labor grows.',
        effects: { economicStrength: 10, wageShare: -15, publicSupport: -10 },
      },
      {
        id: 'public_works',
        text: 'Create public employment for displaced',
        consequence: 'Absorb surplus labor. But who pays?',
        effects: { wageShare: 8, debtBurden: 12, publicSupport: 10 },
      },
      {
        id: 'shorter_week',
        text: 'Mandate shorter work week, same pay',
        consequence: 'Spread work. Raises labor\'s bargaining power.',
        effects: { wageShare: 10, economicStrength: -5, publicSupport: 12 },
      },
    ],
  },
  {
    phase: 2,
    title: 'Class Struggle',
    narrative: `**Marx**: "The history of all hitherto existing society is the history of class struggles." The state is the instrument of the ruling class.

Calmwater's business lobby demands tax cuts and deregulation. Unions demand sectoral bargaining and codetermination. Both claim you represent "the people."

The Marxian view:
- The state manages the affairs of the bourgeoisie
- Reforms within capitalism are temporary gains
- Class consciousness emerges from struggle
- The question is which class\'s interests prevail

**Your Choice:**`,
    choices: [
      {
        id: 'capital',
        text: 'Business tax cuts and deregulation',
        consequence: 'They say investment will follow. Will it?',
        effects: { economicStrength: 5, wageShare: -10, debtBurden: -8 },
      },
      {
        id: 'labor',
        text: 'Sectoral bargaining and board seats',
        consequence: 'Shift power to organized labor.',
        effects: { wageShare: 15, publicSupport: 15, economicStrength: -3 },
      },
      {
        id: 'balance',
        text: 'Seek balance between both',
        consequence: 'Social democratic compromise. Temporary truce.',
        effects: { publicSupport: 5, wageShare: 3, economicStrength: 3 },
      },
    ],
  },
  {
    phase: 3,
    title: 'Crisis Theory',
    narrative: `**Overproduction/Underconsumption**: Capitalism tends to produce more than can be profitably sold. Realization crisis follows.

Calmwater's warehouses are full. Retailers report weak sales. Production exceeds what workers can buy with their wages. Marx's "contradiction" appears.

Theories of crisis:
- **Underconsumption**: Wages too low to buy output
- **Falling rate of profit**: Capital composition rises
- **Disproportionality**: Sectors grow unevenly
- **Realization**: Money blocks circulation

**Your Choice:**`,
    choices: [
      {
        id: 'destroy',
        text: 'Allow inventory destruction and layoffs',
        consequence: 'Capitalism\'s "creative destruction." The crisis restores profit.',
        effects: { economicStrength: -10, publicSupport: -15, wageShare: -5 },
      },
      {
        id: 'buy',
        text: 'State purchases excess inventory',
        consequence: 'Socialize the losses. But crisis repeats.',
        effects: { debtBurden: 15, economicStrength: 5, publicSupport: 5 },
      },
      {
        id: 'wages_crisis',
        text: 'Raise wages to match productivity',
        consequence: 'Address underconsumption at the root.',
        effects: { wageShare: 12, economicStrength: 8, priceStability: -5 },
      },
    ],
  },
  {
    phase: 3,
    title: 'Imperialism and Globalization',
    narrative: `**Lenin and Bukharin**: Imperialism is the highest stage of capitalism. Surplus capital seeks outlets abroad.

Calmwater corporations want access to overseas markets and cheap labor abroad. Workers fear offshoring. The Global South faces terms of trade that worsen over time.

The Marxian analysis:
- Core extracts surplus from periphery
- Unequal exchange systematic
- "Race to the bottom" for wages
- Global reserve army of labor

**Your Choice:**`,
    choices: [
      {
        id: 'free_trade',
        text: 'Free trade agreements globally',
        consequence: 'Capital mobility maximized. Workers compete worldwide.',
        effects: { economicStrength: 10, wageShare: -12, publicSupport: -8 },
      },
      {
        id: 'protect',
        text: 'Protect domestic industry and workers',
        consequence: 'Impede the global reserve army. National capital benefits.',
        effects: { wageShare: 5, economicStrength: -3, publicSupport: 8 },
      },
      {
        id: 'fair_trade',
        text: 'Fair trade with labor standards',
        consequence: 'Attempt international labor solidarity. Difficult.',
        effects: { publicSupport: 5, wageShare: 3, economicStrength: 2 },
      },
    ],
  },
  salesEffortBlock,
  {
    phase: 4,
    title: 'Marxian Synthesis',
    narrative: `Your Marxian tutorial concludes. You've explored the labor theory of value, class struggle, crisis tendency, and imperialism.

**Key Takeaways:**
- Value comes from living labor
- Class struggle drives political economy
- Crises are endemic to capitalism
- The global system extracts from periphery

**All paths now converge** to practice the core mechanics together.

Ready to synthesize what you've learned?`,
    choices: [
      {
        id: 'continue',
        text: 'Continue to the synthesis',
        consequence: 'All paths converge here.',
        effects: {},
        nextArc: 'synthesis',
      },
    ],
  },
];

// ============================================================================
// PATH D: STRUCTURALIST/INSTITUTIONALIST (Polanyi, Veblen, Galbraith, Commons)
// Focus: Embeddedness, institutions, power, ceremonial vs instrumental
// ============================================================================
const structuralistBlocks: DecisionBlock[] = [
  {
    phase: 2,
    title: 'The Great Transformation',
    narrative: `**Karl Polanyi**: The market was not natural; it was imposed. The "self-regulating market" is a utopian project that destroys society. The "double movement" follows — society protects itself.

Calmwater is privatizing its water supply. Prices will rise. Efficiency gains are promised. But communities depend on affordable water.

Polanyi's insight:
- Land, labor, and money are "fictitious commodities"
- Treating them as commodities destroys society
- The "double movement": market expansion triggers protective response
- Embeddedness: economy is embedded in society

**Your Choice:**`,
    choices: [
      {
        id: 'privatize',
        text: 'Proceed with full privatization',
        consequence: 'Markets allocate efficiently. Those who can\'t pay...',
        effects: { economicStrength: 8, debtBurden: -5, publicSupport: -15 },
      },
      {
        id: 'public',
        text: 'Keep water as public utility',
        consequence: 'Decommodify a fictitious commodity.',
        effects: { publicSupport: 15, debtBurden: 8, economicStrength: -3 },
      },
      {
        id: 'hybrid',
        text: 'Public ownership with market pricing',
        consequence: 'Surplus funds reinvestment. The "embedded liberalism" compromise.',
        effects: { publicSupport: 5, economicStrength: 5, debtBurden: 3 },
      },
    ],
  },
  {
    phase: 2,
    title: 'Conspicuous Consumption',
    narrative: `**Thorstein Veblen**: Economics is about institutions, not individuals. The "leisure class" engages in conspicuous consumption and waste to signal status.

Calmwater's elite are building enormous estates. Luxury goods imports are surging. Meanwhile, public infrastructure crumbles.

Veblen's analysis:
- "Pecuniary emulation": Consumption to signal status
- "Conspicuous waste": Waste as status marker
- "Predatory": Business vs "industrial" (making things)
- Ceremonial behavior impedes instrumental (useful) activity

**Your Choice:**`,
    choices: [
      {
        id: 'tax_luxury',
        text: 'Heavy luxury goods taxes',
        consequence: 'Tax waste. Fund public goods.',
        effects: { debtBurden: -8, publicSupport: 10, economicStrength: -5 },
      },
      {
        id: 'let_them',
        text: 'Let them spend. It\'s their money.',
        consequence: 'Free choice. But inequality grows visible.',
        effects: { economicStrength: 3, publicSupport: -8 },
      },
      {
        id: 'shame',
        text: 'Public campaigns for modesty',
        consequence: 'Veblen would approve. But will it work?',
        effects: { publicSupport: 5 },
      },
    ],
  },
  {
    phase: 3,
    title: 'Countervailing Power',
    narrative: `**John Kenneth Galbraith**: Modern economies feature "planning" by large corporations. The only counterbalance is "countervailing power" — unions, government, consumer organizations.

Calmwater's largest retailer has become a monopsony — the only buyer for many suppliers. It dictates prices to farmers and manufacturers. Workers have no alternative employers.

Galbraith's solution:
- Unions as countervailing power to corporations
- Government as countervailing power to both
- Without it, unchecked corporate power dominates
- The "technostructure" manages for growth, not efficiency

**Your Choice:**`,
    choices: [
      {
        id: 'trust_bust',
        text: 'Antitrust action to break monopsony',
        consequence: 'Restore competitive markets.',
        effects: { economicStrength: 5, publicSupport: 8, wageShare: 5 },
      },
      {
        id: 'union_support',
        text: 'Strengthen unions as counterbalance',
        consequence: 'Countervailing power vs corporate power.',
        effects: { wageShare: 12, publicSupport: 10, economicStrength: -3 },
      },
      {
        id: 'regulate_buyer',
        text: 'Regulate buyer power directly',
        consequence: 'Government as countervailing power.',
        effects: { publicSupport: 5, wageShare: 5 },
      },
    ],
  },
  {
    phase: 3,
    title: 'Institutional Change',
    narrative: `**Institutionalist view**: Economies are "path dependent" — history matters. Change happens through institutional evolution, not market clearing.

Calmwater's agriculture relies on a few dominant crops. This creates vulnerability to disease and climate. But changing practices requires new infrastructure, knowledge, and coordination.

The institutionalist approach:
- Change is collective, not individual
- Institutions enable and constrain behavior
- Path dependence: history shapes options
- Evolutionary, not equilibrium

**Your Choice:**`,
    choices: [
      {
        id: 'diversify',
        text: 'Subsidize crop diversification',
        consequence: 'Long transition. Resilience payoff.',
        effects: { economicStrength: 5, debtBurden: 10, priceStability: 3 },
      },
      {
        id: 'insurance',
        text: 'Crop insurance and safety nets',
        consequence: 'Maintain current system, buffer shocks.',
        effects: { debtBurden: 8, publicSupport: 5 },
      },
      {
        id: 'monoculture',
        text: 'Double down on dominant crops',
        consequence: 'Efficiency now. Risk later.',
        effects: { economicStrength: 10, priceStability: -5 },
      },
    ],
  },
  {
    phase: 4,
    title: 'Structuralist Synthesis',
    narrative: `Your structuralist tutorial concludes. You've explored embeddedness, conspicuous consumption, countervailing power, and institutional change.

**Key Takeaways:**
- Markets are embedded in society
- Status and ceremony shape economic behavior
- Power requires countervailing power
- History and institutions constrain choice

**All paths now converge** to practice the core mechanics together.

Ready to synthesize what you've learned?`,
    choices: [
      {
        id: 'continue',
        text: 'Continue to the synthesis',
        consequence: 'All paths converge here.',
        effects: {},
        nextArc: 'synthesis',
      },
    ],
  },
];

// ============================================================================
// PATH E: DEVELOPMENT ECONOMICS (Prebisch, Singer, Amsden, Aghion, Wade)
// Focus: Late industrialization, structural change, center-periphery
// ============================================================================
const developmentBlocks: DecisionBlock[] = [
  {
    phase: 2,
    title: 'The Terms of Trade',
    narrative: `**Prebisch-Singer Hypothesis**: Primary commodity exporters face declining terms of trade relative to manufactured goods exporters. The periphery subsidizes the center.

Calmwater exports raw materials and imports manufactured goods. Over decades, it takes more tons of copper to buy a tractor. Value-added stays in the core.

The development economics view:
- Primary commodities: volatile prices, falling terms of trade
- Manufacturing: learning-by-doing, productivity growth
- "Structuralists": economies have structures that constrain them
- ISI: Import Substitution Industrialization as response

**Your Choice:**`,
    choices: [
      {
        id: 'commodity',
        text: 'Double down on commodity exports',
        consequence: 'Comparative advantage. But terms of trade worsen.',
        effects: { economicStrength: 5, wageShare: -5, priceStability: -8 },
      },
      {
        id: 'isi',
        text: 'Import substitution: protect infant industries',
        consequence: 'Amsden\'s "getting prices wrong" — subsidize until competitive.',
        effects: { economicStrength: 8, debtBurden: 10, priceStability: 5 },
      },
      {
        id: 'assembly',
        text: 'Attract assembly manufacturing (maquiladora)',
        consequence: 'Jobs now. But limited technology transfer.',
        effects: { wageShare: 3, economicStrength: 5, publicSupport: 3 },
      },
    ],
  },
  {
    phase: 2,
    title: 'The State and Industrial Policy',
    narrative: `**Alice Amsden** (Taiwan) and **Robert Wade** (Korea): Late industrialization succeeds through "governing the market" — the state coordinates investment, disciplines business, and pushes technology transfer.

Calmwater's private sector is risk-averse. Banks lend to safe commodity traders, not risky manufacturers. The "coordination problem": no firm invests unless others do too.

Development state approaches:
- Direct credit allocation to strategic sectors
- Performance standards: export targets, R&D requirements
- Discipline: cut support if firms don\'t perform
- Technology transfer from foreign investors

**Your Choice:**`,
    choices: [
      {
        id: 'laissez',
        text: 'Let markets allocate credit',
        consequence: 'Commodity trade continues. Manufacturing starved.',
        effects: { economicStrength: -3, debtBurden: -5 },
      },
      {
        id: 'development_bank',
        text: 'Create development bank with sectoral targets',
        consequence: 'Governing the market. Risk of capture.',
        effects: { economicStrength: 10, debtBurden: 12, priceStability: 3 },
      },
      {
        id: 'fdi',
        text: 'Attract FDI with tax holidays',
        consequence: 'Capital inflows. But limited spillovers.',
        effects: { economicStrength: 8, wageShare: -3, publicSupport: -3 },
      },
    ],
  },
  {
    phase: 3,
    title: 'Structural Transformation',
    narrative: `**Structural change**: Development is not just growth; it\'s transformation of the economy\'s structure — agriculture to industry to services.

Calmwater\'s rural population is massive. Urban migration is already happening, but chaotically — slums, informal work, social dislocation. The Lewis turning point approaches.

The development challenge:
- Productivity gap: rural vs urban
- Surplus labor: "unlimited supply" at subsistence wages
- Coordination: ag, industry, services must develop together
- Inclusive vs extractive growth

**Your Choice:**`,
    choices: [
      {
        id: 'rural',
        text: 'Invest in rural productivity first',
        consequence: 'Reduce push factors. But delays structural change.',
        effects: { publicSupport: 10, economicStrength: 3, debtBurden: 8 },
      },
      {
        id: 'urban',
        text: 'Planned urbanization with industrial jobs',
        consequence: 'Absorb surplus labor productively.',
        effects: { economicStrength: 10, wageShare: 5, debtBurden: 15 },
      },
      {
        id: 'natural',
        text: 'Let migration happen organically',
        consequence: 'Informal slums grow. Social costs externalized.',
        effects: { economicStrength: 5, publicSupport: -10, wageShare: -5 },
      },
    ],
  },
  {
    phase: 3,
    title: 'Global Value Chains',
    narrative: `**Global Value Chains (GVCs)**: Production is fragmented globally. "Factory Asia" assembles components from across the region. The question is where Calmwater sits.

Calmwater can try to:
- Join GVCs as assembly location (low value-added)
- Move up the value chain (components, design)
- Develop domestic supply chains (autarky risk)

The development dilemma:
- GVC participation brings FDI and jobs
- But "Smile Curve": assembly captures little value
- Upgrading requires technology, skills, time
- Risk of "middle income trap"

**Your Choice:**`,
    choices: [
      {
        id: 'assembly_gvc',
        text: 'Join GVCs at assembly stage',
        consequence: 'Jobs now. Low value capture.',
        effects: { wageShare: 3, economicStrength: 5, publicSupport: 3 },
      },
      {
        id: 'upgrade',
        text: 'Conditional FDI: technology transfer required',
        consequence: 'Hard bargain. Risk of no investment.',
        effects: { economicStrength: 8, debtBurden: 5, priceStability: 3 },
      },
      {
        id: 'domestic',
        text: 'Build domestic supply chains',
        consequence: 'Autarky risk. But learning potential.',
        effects: { economicStrength: 5, debtBurden: 12, wageShare: 5 },
      },
    ],
  },
  {
    phase: 4,
    title: 'Development Synthesis',
    narrative: `Your development economics tutorial concludes. You've explored terms of trade, the development state, structural transformation, and global value chains.

**Key Takeaways:**
- Commodity exports face declining terms of trade
- Late industrialization requires state coordination
- Structural transformation is more than growth
- Upgrading value chains requires strategic policy

**All paths now converge** to practice the core mechanics together.

Ready to synthesize what you've learned?`,
    choices: [
      {
        id: 'continue',
        text: 'Continue to the synthesis',
        consequence: 'All paths converge here.',
        effects: {},
        nextArc: 'synthesis',
      },
    ],
  },
];

// ============================================================================
// SYNTHESIS ARC: All paths converge here
// This arc teaches core game mechanics that all players should know
// ============================================================================
const synthesisArc: ScenarioArc = {
  id: 'synthesis',
  blocks: [
    {
      phase: 5,
      title: 'Understanding the Metrics',
      narrative: `Regardless of your theoretical tradition, you need to understand how the five metrics interact.

**Metric Interactions Tutorial:**

- **Economic Strength** (growth) often trades off with **Price Stability** (inflation). Stimulus boosts both growth and prices.

- **Public Support** (political capital) matters for staying in power. Unpopular but "correct" economic choices may fail politically.

- **Debt Burden** constrains future choices. High debt means less room for stimulus, but some debt is necessary for growth.

- **Wage Share** affects both demand (workers spend more) and business costs. Distribution matters for macroeconomic outcomes.

**Practice Choice:** A recession hits Calmwater. What\'s your priority?`,
      choices: [
        {
          id: 'growth_priority',
          text: 'Prioritize Economic Strength (growth)',
          consequence: 'Boost output. But inflation may follow. Debt will rise.',
          effects: { economicStrength: 15, priceStability: -8, debtBurden: 10 },
        },
        {
          id: 'stability_priority',
          text: 'Prioritize Price Stability (control inflation)',
          consequence: 'Tight policy. Growth may suffer. Debt service becomes harder.',
          effects: { priceStability: 15, economicStrength: -10, debtBurden: 5 },
        },
        {
          id: 'balance_priority',
          text: 'Seek balance across metrics',
          consequence: 'Moderate on all fronts. No dramatic wins or losses.',
          effects: { economicStrength: 5, priceStability: 5, publicSupport: 5 },
        },
      ],
    },
    {
      phase: 5,
      title: 'The Advisor System',
      narrative: `**Your Heterodox Advisor** provides perspectives from different economic traditions. They may disagree with each other — and with you.

The advisor draws from:
- Post-Keynesian critiques of austerity
- Marxian class analysis
- Institutionalist warnings about power
- Development economics on structural constraints
- And more...

**How to Use the Advisor:**
- They highlight trade-offs you might miss
- They cite specific thinkers and theories
- They don\'t tell you what to do — they expand your thinking
- Sometimes you\'ll disagree. That\'s the point.

**Practice:** Calmwater\'s banks are lending recklessly. What do you do?`,
      choices: [
        {
          id: 'advise_conservative',
          text: 'Listen to conservative voices: let markets self-regulate',
          consequence: 'The advisor warns: "Minsky moment approaching."',
          effects: { economicStrength: 5, priceStability: -10 },
        },
        {
          id: 'advise_heterodox',
          text: 'Listen to heterodox voices: regulate now',
          consequence: 'The advisor cites Minsky: "Stability is destabilizing."',
          effects: { priceStability: 8, economicStrength: -3 },
        },
        {
          id: 'advise_both',
          text: 'Consider all perspectives, decide yourself',
          consequence: 'Pluralist approach. The advisor respects the choice.',
          effects: { publicSupport: 8 },
        },
      ],
    },
    {
      phase: 6,
      title: 'Trade-offs and Endings',
      narrative: `**Every choice has trade-offs.** The game does not have one "correct" path. Different approaches succeed or fail based on:

- The scenario\'s initial conditions
- Your sequence of choices
- Random events (in some modes)
- How you balance the five metrics

**Ending Types:**
- **Victory**: You navigated the challenges well. The economy is stable and your support is high.
- **Partial Victory**: Mixed results. Some metrics improved, others worsened.
- **Defeat**: Crisis persisted or worsened. Low support, unstable economy.

**Replayability**: Different paths yield different outcomes. Try another tradition next time!`,
      choices: [
        {
          id: 'ready',
          text: 'I\'m ready for the full game',
          consequence: 'Let\'s begin.',
          effects: { publicSupport: 5, economicStrength: 5 },
        },
      ],
    },
  ],
};

// ============================================================================
// ENDINGS
// ============================================================================
const endings: LongFormEnding[] = [
  {
    id: 'ready',
    endingType: 'victory',
    title: 'Tutorial Complete',
    endingNarrative: `Congratulations! You've completed the Macro Planner tutorial.

**What You Learned:**
- The five core metrics and their interactions
- Five major economic traditions: Neoclassical, Post-Keynesian, Marxian, Structuralist/Institutionalist, and Development Economics
- How to interpret the heterodox advisor
- That trade-offs are inevitable and context-dependent
- That there is no single "correct" economics — only different lenses

**Ready for the Full Game?**

Choose a scenario and apply what you've learned. Each scenario presents different challenges:
- **Stagflation**: Navigate the 1970s-style crisis
- **Emerging Debt Crisis**: Manage external debt and IMF pressure
- **And more scenarios coming soon**

Remember: The goal isn't to "win" with the "right" answer. It's to understand the trade-offs and make informed choices grounded in economic theory.

Good luck, leader of Calmwater.`,
  },
];

// ============================================================================
// UPDATE PATH BLOCKS: Add nextArc routing to synthesis at the end of each path
// ============================================================================

// Update the last block of each path to route to synthesis
neoclassicalBlocks[neoclassicalBlocks.length - 1].choices[0].nextArc = 'synthesis';
postKeynesianBlocks[postKeynesianBlocks.length - 1].choices[0].nextArc = 'synthesis';
marxianBlocks[marxianBlocks.length - 1].choices[0].nextArc = 'synthesis';
structuralistBlocks[structuralistBlocks.length - 1].choices[0].nextArc = 'synthesis';
developmentBlocks[developmentBlocks.length - 1].choices[0].nextArc = 'synthesis';

// Update synthesis last block to route to ending
synthesisArc.blocks[synthesisArc.blocks.length - 1].choices[0].endingIndex = 0;

// ============================================================================
// EXPORT: Create the narrative tree
// ============================================================================
export function createNarrativeTree(options?: { shuffle?: boolean; seed?: number }) {
  // Build all arcs
  const neoclassicalArc: ScenarioArc = {
    id: 'neoclassical_path',
    blocks: neoclassicalBlocks,
  };

  const postKeynesianArc: ScenarioArc = {
    id: 'post_keynesian_path',
    blocks: postKeynesianBlocks,
  };

  const marxianArc: ScenarioArc = {
    id: 'marxian_path',
    blocks: marxianBlocks,
  };

  const structuralistArc: ScenarioArc = {
    id: 'structuralist_path',
    blocks: structuralistBlocks,
  };

  const developmentArc: ScenarioArc = {
    id: 'development_path',
    blocks: developmentBlocks,
  };

  // All arcs: intro -> [chosen path] -> synthesis -> endings
  return createArcBasedTree(
    [
      { id: 'start', blocks: [introBlock] },
      neoclassicalArc,
      postKeynesianArc,
      marxianArc,
      structuralistArc,
      developmentArc,
      synthesisArc,
    ],
    endings,
    () => 0, // All synthesis paths lead to ending index 0 (tutorial complete)
    { shuffleBlocks: options?.shuffle ?? false, seed: options?.seed },
  );
}
