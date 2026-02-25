import type { DecisionBlock, LongFormEnding, ScenarioArc } from '../long-form-tree';
import { createArcBasedTree } from '../long-form-tree';

/**
 * Tutorial Enhanced — Republic of Calmwater (Enhanced with Progressive Disclosure and Tooltips)
 *
 * This enhanced version adds:
 * - Progressive disclosure: Brief / Detailed / Scholar Context tiers
 * - Tooltip markers: [[TERM|definition]] format for inline definitions
 * - Learn More sections: concept explanations, thinkers, examples, counter-arguments
 * 
 * Structure mirrors the original tutorial but with enriched educational content.
 */

// ============================================================================
// INTRO BLOCK: Welcome and Tradition Selection (ENHANCED)
// ============================================================================
const introBlock: DecisionBlock = {
  phase: 1,
  title: 'Welcome to Macro Planner',
  narrative: `**Brief:** You are the leader of the Republic of Calmwater. Every decision affects five key metrics. Different economic schools offer different advice.

**Detailed:** Macro Planner is a [[political economy simulation|a game where economic theory meets governance]] that teaches you to think like an economist—while showing you that economists disagree. You lead Calmwater, a fictional country facing real challenges: inflation, unemployment, debt, inequality, and growth.

Your five metrics capture these tensions:
- **Economic Strength**: GDP growth, productivity, output
- **Public Support**: Your political capital—lose it and you are replaced
- **Debt Burden**: Government debt relative to GDP—affects flexibility
- **Price Stability**: Inflation control—affects living standards
- **Wage Share**: Worker income vs. capitalist profits—shapes demand and conflict

Every choice has consequences. The "right" answer depends on which economic school you trust.

**Scholar Context:** This game draws on [[heterodox economics|non-mainstream schools including Post-Keynesian, Marxian, Structuralist, and Development traditions]]—the traditions that mainstream textbooks often marginalize. You will encounter thinkers like [[Michal Kalecki]], [[Joan Robinson]], [[Hyman Minsky]], and [[Raul Prebisch]] alongside familiar names like [[Adam Smith]] and [[John Maynard Keynes]].`,
  tooltipDefinitions: {
    "political economy simulation": "Games that model how economic and political systems interact, emphasizing power, institutions, and conflicting interests",
    "heterodox economics": "Schools of thought outside the neoclassical mainstream, including institutional, evolutionary, and radical political economy",
    "Michal Kalecki": "Polish economist who developed effective demand theory and markup pricing independent of Keynes",
    "Joan Robinson": "British Post-Keynesian economist who critiqued neoclassical competition theory and developed growth models",
    "Hyman Minsky": "American economist famous for the Financial Instability Hypothesis: stability breeds speculation",
    "Raul Prebisch": "Argentine economist who analyzed center-periphery relations and advocated import-substituting industrialization",
    "Adam Smith": "Scottish philosopher, author of The Wealth of Nations (1776), foundational for classical economics",
    "John Maynard Keynes": "British economist whose General Theory (1936) revolutionized macroeconomics with demand-side analysis"
  },
  choices: [
    {
      id: 'neoclassical',
      text: 'Neoclassical Tradition — Markets, efficiency, optimization',
      consequence: 'Explore how [[price mechanisms|markets adjusting prices to balance supply and demand]] allocate resources and why intervention often creates [[deadweight loss|economic inefficiency from distorting markets]].',
      effects: { economicStrength: 5, priceStability: 5 },
      nextArc: 'neoclassical_path',
      learnMore: {
        concept: 'The Neoclassical Tradition',
        explanation: 'Neoclassical economics emerged in the 1870s (Jevons, Menger, Walras) and became dominant after World War II. It models economies as systems of rational agents maximizing utility/profit under constraints. Key assumptions: markets clear, information is complete, and general equilibrium is attainable. Famous contributors: Milton Friedman, Robert Lucas, Eugene Fama.',
        thinkers: ['Milton Friedman', 'Robert Lucas', 'Eugene Fama', 'Gary Becker', 'Arthur Pigou'],
        realWorldExample: 'The Chicago School influence on 1980s-90s policies: deregulation of airlines and trucking, floating exchange rates, independent central banks targeting inflation. Chile pension privatization under Pinochet (advised by Chicago Boys).',
        counterArguments: 'Post-Keynesian: Markets do not clear; unemployment is persistent; information is asymmetric. Behavioral: People are not rational calculators. Institutional: Markets are embedded in social relations. Marxian: Distribution is conflictual, not efficient.'
      }
    },
    {
      id: 'post_keynesian',
      text: 'Post-Keynesian Tradition — Demand, finance, uncertainty',
      consequence: 'Explore how [[aggregate demand|total spending in the economy]] drives output, why financial markets are inherently unstable, and how [[pricing power|ability of firms to set prices above costs]] shapes outcomes.',
      effects: { publicSupport: 5, economicStrength: 3 },
      nextArc: 'post_keynesian_path',
      learnMore: {
        concept: 'The Post-Keynesian Tradition',
        explanation: 'Post-Keynesian economics extends Keynes insights while rejecting the neoclassical synthesis. It emphasizes: (1) effective demand—output determined by spending, not supply; (2) fundamental uncertainty—future is unknowable, requiring money and contracts; (3) financial instability—credit cycles drive boom-bust; (4) administered prices—firms are price-setters, not takers.',
        thinkers: ['Michal Kalecki', 'Joan Robinson', 'Hyman Minsky', 'Nicholas Kaldor', 'Paul Davidson', 'Jan Kregel'],
        realWorldExample: 'Post-Keynesian analysis of the 2008 crisis: Minsky stages of financing explained how subprime mortgages moved from hedge to Ponzi finance. The crisis confirmed that financial markets are inherently unstable without regulation.',
        counterArguments: 'Neoclassical: Markets are efficient; crises are rare exceptions caused by policy errors. Rational expectations: People anticipate policy effects, neutralizing them. Real business cycle: Recessions are optimal responses to technology shocks.'
      }
    },
    {
      id: 'marxian',
      text: 'Marxian Tradition — Production, class, crisis tendency',
      consequence: 'Explore how [[relations of production|social relationships around work and property]] shape society, why crises are [[endemic to capitalism|built into the system, not accidents]], and how [[class struggle|conflict between workers and capitalists]] drives history.',
      effects: { wageShare: 8, publicSupport: 5 },
      nextArc: 'marxian_path',
      learnMore: {
        concept: 'The Marxian Tradition',
        explanation: 'Marxian political economy begins with Capital (1867), analyzing capitalism as a historically specific mode of production. Core concepts: (1) labor theory of value—value comes from socially necessary labor time; (2) surplus value—profit is unpaid labor; (3) accumulation—capitalists must reinvest to survive competition; (4) tendency of rate of profit to fall—capital-intensive production squeezes profitability; (5) crisis tendency—contradictions produce periodic breakdowns.',
        thinkers: ['Karl Marx', 'Friedrich Engels', 'Rosa Luxemburg', 'Rudolf Hilferding', 'Paul Sweezy', 'David Harvey', 'Robert Brenner'],
        realWorldExample: 'Marxian analysis of neoliberalism (1970s-present): Falling profitability in the 1970s led capital to attack wages, unions, and welfare states. Globalization and financialization were responses to the profit squeeze, creating new contradictions.',
        counterArguments: 'Neoclassical: Profit rates are stable; crises are exogenous shocks. Keynesian: Underconsumption can be fixed by demand management. Analytical Marxist (Roemer): Class is less important than market structure.'
      }
    },
    {
      id: 'structuralist',
      text: 'Structuralist/Institutionalist — Power, embeddedness, institutions',
      consequence: 'Explore how [[institutions|rules, norms, and organizations]] shape outcomes, why markets are [[embedded in society|connected to and dependent on social relations]], and how [[power asymmetries|unequal ability to influence outcomes]] determine distribution.',
      effects: { publicSupport: 8, economicStrength: 3 },
      nextArc: 'structuralist_path',
      learnMore: {
        concept: 'The Structuralist/Institutionalist Tradition',
        explanation: 'This tradition rejects the market-society separation. From Polanyi great transformation to contemporary institutionalism, it argues economies are always embedded in social relations. Old institutionalism (Veblen, Commons) emphasized habits and power. New institutionalism (North, Williamson) focuses on transaction costs. Structuralism (Prebisch, Furtado) analyzes how global structures constrain development. Feminist political economy adds unpaid care work and gendered power.',
        thinkers: ['Karl Polanyi', 'Thorstein Veblen', 'John Commons', 'Raul Prebisch', 'Celso Furtado', 'Douglass North', 'Nancy Folbre'],
        realWorldExample: 'Polanyi analysis of the 19th century: Attempts to create self-regulating markets required massive state coercion (enclosures, poor laws). The backlash (fascism, socialism) came from society protecting itself against market destruction.',
        counterArguments: 'Neoclassical: Institutions are endogenous to efficient outcomes. Marxian: Institutional analysis obscures class power. Public choice: Institutions are captured by interest groups.'
      }
    },
    {
      id: 'development',
      text: 'Development Economics — Late industrialization, structural change',
      consequence: 'Explore how [[latecomers|countries industrializing after Britain/USA]] catch up, why [[free trade|unrestricted international exchange]] can hinder development, and how the global economy creates [[core and periphery|center dominating, periphery subordinate]].',
      effects: { economicStrength: 8, debtBurden: -5 },
      nextArc: 'development_path',
      learnMore: {
        concept: 'The Development Economics Tradition',
        explanation: 'Development economics emerged after WWII to explain why poor countries stayed poor. Key insights: (1) Late industrialization requires different strategies than early industrialization (Gerschenkron); (2) Comparative advantage can trap countries in raw material exports (Prebisch-Singer); (3) Infant industries need protection (Hamilton, List); (4) State capacity and coordination are essential (Amsden, Wade); (5) Global structures favor the already-developed.',
        thinkers: ['Alexander Gerschenkron', 'Raul Prebisch', 'Hans Singer', 'Alexander Hamilton', 'Friedrich List', 'Alice Amsden', 'Robert Wade', 'Dani Rodrik'],
        realWorldExample: 'East Asian development states (South Korea, Taiwan): Protected infant industries, directed credit, export discipline, and land reform combined markets with heavy state coordination. The Washington Consensus (free markets, privatization) often failed elsewhere.',
        counterArguments: 'Neoclassical/Free market: Development comes from openness, property rights, and free trade (Sachs, Easterly). Public choice: State intervention creates rent-seeking and corruption. Modernization theory: Underdevelopment comes from traditional culture, not global structure.'
      }
    },
  ],
};

// ============================================================================
// PATH A: NEOCLASSICAL/ORTHODOX (ENHANCED)
// Block 1: The Market Mechanism
// ============================================================================
const neoclassicalBlocks: DecisionBlock[] = [
  {
    phase: 2,
    title: 'The Market Mechanism',
    narrative: `**Brief:** Neoclassical economics assumes markets clear through price adjustments. Calmwater has a housing shortage—but is it market failure or government distortion?

**Detailed:** [[Neoclassical economics|The dominant school since the 1950s emphasizing markets, rationality, and equilibrium]] assumes that when supply and demand diverge, [[prices act as signals|rising prices encourage more supply, falling prices encourage more demand]] that restore balance. If housing is scarce, prices should rise until builders supply more and buyers demand less.

But Calmwater has [[rent control|laws limiting how much landlords can charge]], which keeps prices artificially low. Builders say [[zoning restrictions|regulations limiting where and what can be built]] prevent new construction. The neoclassical diagnosis: government intervention has created the shortage. Remove the distortions, and markets will solve the problem.

This reasoning extends across the economy: minimum wages create unemployment, tariffs protect inefficient industries, subsidies distort consumer choices. The solution is often [[deregulation|removing government rules]] and [[privatization|transferring state assets to private ownership]].

**Scholar Context:** This approach draws on [[Alfred Marshall]] supply-demand curves, [[Leon Walras]] general equilibrium, and [[Milton Friedman]] critique of intervention. The [[Chicago School|University of Chicago economists emphasizing free markets]] (Friedman, Stigler, Becker) pushed these ideas into policy in the 1970s-80s. Critics note that perfect markets require perfect information, no externalities, and no power asymmetries—conditions rarely met in reality.`,
    tooltipDefinitions: {
      "Neoclassical economics": "Dominant economic school since 1950s emphasizing markets, rational agents, equilibrium, and efficiency",
      "prices act as signals": "The coordinating function of markets—prices convey information about scarcity and guide resource allocation",
      "rent control": "Price ceiling on rental housing, intended to protect tenants but criticized for reducing supply",
      "zoning restrictions": "Land use regulations limiting what can be built where, intended for planning but can restrict supply",
      "deregulation": "Removing government rules on prices, entry, and business practices",
      "privatization": "Transferring state-owned enterprises or services to private ownership",
      "Alfred Marshall": "British economist (1842-1924) who synthesized supply-demand analysis in Principles of Economics",
      "Leon Walras": "French economist (1834-1910) who developed general equilibrium theory—simultaneous clearing of all markets",
      "Milton Friedman": "American economist (1912-2006), leading monetarist and critic of Keynesian intervention",
      "Chicago School": "University of Chicago economics department emphasizing free markets, rational expectations, and deregulation"
    },
    choices: [
      {
        id: 'deregulate',
        text: 'Remove rent controls and zoning barriers',
        consequence: 'Let the market build. Prices may rise initially, but supply will respond through the [[price mechanism|prices coordinating supply and demand]].',
        effects: { economicStrength: 10, publicSupport: -8, wageShare: -5 },
        learnMore: {
          concept: 'Market-Clearing and Supply Response',
          explanation: 'Neoclassical theory predicts that when prices are free to adjust, shortages are temporary. Higher prices signal profit opportunities, attracting new suppliers. In housing, removing rent control should eventually increase the housing stock as developers respond to higher returns. However, this assumes: (1) no other barriers to entry, (2) elastic supply response, (3) no market power, (4) perfect information. In reality, housing supply is inelastic (limited land, long construction times), and developers may prefer luxury units with higher margins.',
          thinkers: ['Adam Smith', 'Alfred Marshall', 'Milton Friedman', 'Thomas Sowell'],
          realWorldExample: 'San Francisco has strict rent control and zoning. Stockholm has municipal housing. Singapore has state land ownership. Each approach has trade-offs: San Francisco has shortages, Stockholm has queues, Singapore has high homeownership but state control. The neoclassical prescription has been tried in places like Vietnam (Doi Moi reforms), where housing markets did respond—but often with gentrification and displacement.',
          counterArguments: 'Institutionalist: Housing markets are different—shelter is a necessity, land is fixed, speculation distorts. Post-Keynesian: Supply responds slowly; short-term pain is severe. Marxian: Markets produce what is profitable, not what is needed—luxury housing over affordable units. Behavioral: People anchor to current prices; sudden deregulation causes shock.'
        }
      },
      {
        id: 'subsidize',
        text: 'Subsidize first-time buyers with housing vouchers',
        consequence: 'Preserve market incentives while addressing affordability through [[demand-side subsidies|government helping buyers pay, not controlling prices]].',
        effects: { publicSupport: 5, debtBurden: 8, economicStrength: 3 },
        learnMore: {
          concept: 'Vouchers and Market Preservation',
          explanation: 'Housing vouchers (like Section 8 in the US) attempt to help the poor without distorting price signals. Recipients choose housing in the private market; landlords compete for voucher tenants. This preserves allocative efficiency while addressing distributional concerns. However, vouchers can be captured by landlords (rents rise to absorb the subsidy), require large fiscal outlays, and do not increase supply—they increase demand at existing supply levels, potentially raising prices for non-recipients.',
          thinkers: ['Milton Friedman', 'Arthur Okun', 'Edgar Olsen'],
          realWorldExample: 'The US Section 8 Housing Choice Voucher Program (founded 1974) helps 2.3 million households. Evidence is mixed: vouchers do improve housing quality for recipients, but landlord acceptance varies by neighborhood, and many eligible families never receive vouchers due to funding constraints. Studies show some incidence of subsidies captured by landlords through higher rents.',
          counterArguments: 'Post-Keynesian: Vouchers are inflationary—they increase demand without increasing supply. Marxian: Subsidies preserve the profit system while socializing costs; better to decommodify housing entirely. Institutionalist: Landlord discrimination and market segmentation mean vouchers do not work as theory predicts. Public choice: Programs create constituencies that resist reform even when inefficient.'
        }
      },
      {
        id: 'public_housing',
        text: 'Build public housing directly',
        consequence: 'The state substitutes for market failure. But will it be efficient? Watch for [[government failure|inefficiency from bureaucratic allocation]].',
        effects: { publicSupport: 12, debtBurden: 15, economicStrength: -3 },
        learnMore: {
          concept: 'Public Housing and Government Provision',
          explanation: 'Public housing involves state ownership and management of residential units, renting below market rates. Proponents argue: (1) Housing is a merit good/rights-based need, not a commodity; (2) Market failures (externalities, information asymmetries) justify provision; (3) Decommodification reduces inequality. Critics cite: (1) Government failure—bureaucracy is less efficient than markets; (2) Political economy—public housing becomes concentrated poverty; (3) Fiscal burden—ongoing maintenance costs. Success varies: Singapore Housing Development Board houses 80% of residents successfully; US public housing (projects) faced concentration of poverty and crime.',
          thinkers: ['Richard Titmuss', 'John Kenneth Galbraith', 'James Buchanan', 'Gordon Tullock'],
          realWorldExample: 'Singapore HDB (established 1960) is often cited as public housing success: 80% of residents own HDB flats through a compulsory savings scheme (CPF). Units are well-maintained, integrated, and appreciate in value. Contrast with US "projects" like Pruitt-Igoe in St. Louis (demolished 1972), which became synonymous with public housing failure—though critics note underfunding and segregation policies, not public ownership itself, caused the problems.',
          counterArguments: 'Neoclassical: Government provision is inherently inefficient; better to fix market failures at their source. Public choice: Public housing creates dependent constituencies and bureaucratic empire-building. Libertarian: Violates property rights; eminent domain abuse. Post-Keynesian: Can work with proper funding and integration (Singapore model), but requires state capacity many countries lack.'
        }
      },
    ],
  },
];

// ============================================================================
// PATH B: POST-KEYNESIAN (ENHANCED)
// Block 1: Effective Demand
// ============================================================================
const postKeynesianBlocks: DecisionBlock[] = [
  {
    phase: 2,
    title: 'Effective Demand',
    narrative: `**Brief:** When spending falls, the whole economy contracts. This is the core [[Post-Keynesian]] insight that challenges classical economics.

**Detailed:** [[Says Law|the classical view that supply creates its own demand]] claims that producing goods automatically generates enough income to purchase them. Jean-Baptiste Say argued that in producing goods, firms pay wages and buy inputs—creating purchasing power equal to output value. Therefore, general overproduction is impossible.

But what if people save instead of spend? What if businesses do not invest because they do not see customers? What if expectations turn pessimistic? [[John Maynard Keynes]] showed in 1936 that economies can get stuck in [[underemployment equilibrium|a stable state with unused capacity and unemployed workers]]. Businesses will not hire because sales are weak; sales are weak because workers are not employed and spending.

[[Michal Kalecki]], a Polish economist who developed similar insights independently, captured the logic: "Capitalists earn what they spend; workers spend what they earn." Investment creates profits, not the reverse. If capitalists do not invest, their profits fall—because investment is both demand for capital goods and income to workers who build them.

This flips the neoclassical story: savings do not automatically become investment. Instead, [[paradox of thrift|attempts to save more can reduce total savings]]—if everyone tries to save, income falls, and actual savings do not increase.

**Scholar Context:** Post-Keynesian economics descends from Keynes [[General Theory|his 1936 book that founded macroeconomics]] but rejects the [[neoclassical synthesis|mainstream fusion of Keynesian demand with neoclassical supply]] that diluted his radical insights. Key figures: [[Michal Kalecki]] (Poland), [[Joan Robinson]] (Cambridge, UK), [[Nicholas Kaldor]] (Hungary/UK), [[Hyman Minsky]] (USA), and [[Paul Davidson]] (USA). They emphasize: (1) fundamental uncertainty about the future, (2) monetary production economies, (3) financial instability, (4) income distribution affects demand.`,
    tooltipDefinitions: {
      "Post-Keynesian": "Economic school emphasizing demand, uncertainty, and financial instability; descended from Keynes General Theory",
      "Says Law": "Classical economics view: production automatically generates sufficient demand; supply creates its own demand",
      "underemployment equilibrium": "Keynes concept: economies can stabilize with persistent unemployment due to insufficient demand",
      "Michal Kalecki": "Polish economist (1899-1970) who developed effective demand theory and markup pricing independent of Keynes",
      "paradox of thrift": "When everyone tries to save more during a downturn, total income falls, leaving total savings unchanged",
      "General Theory": "Keynes 1936 book (General Theory of Employment, Interest and Money) that revolutionized macroeconomics",
      "neoclassical synthesis": "Post-WWII fusion of Keynesian demand management with neoclassical supply-side microeconomics",
      "Joan Robinson": "British economist (1903-1983), leading Post-Keynesian theorist of imperfect competition and growth",
      "Nicholas Kaldor": "Hungarian-British economist (1908-1986) known for stylized facts and distribution/growth models",
      "Hyman Minsky": "American economist (1919-1996), developed Financial Instability Hypothesis: stability breeds speculation",
      "Paul Davidson": "American economist (1930-), leading Post-Keynesian theorist of money and uncertainty"
    },
    choices: [
      {
        id: 'spend',
        text: 'Government spends on infrastructure',
        consequence: 'Direct spending has the strongest [[multiplier effect|one dollar spent becomes multiple dollars in income]] because it immediately creates demand.',
        effects: { economicStrength: 12, debtBurden: 10, wageShare: 5 },
        learnMore: {
          concept: 'The Multiplier Effect',
          explanation: 'When government spends $1 on infrastructure, workers earn $1. They spend it on groceries. Grocers earn that dollar and spend it on supplies. Suppliers pay workers, who spend again. Each round, some leaks to savings/taxes/imports, but total income generated exceeds the initial $1. The multiplier (1/(1-MPC)) can be 1.5-2.5 depending on marginal propensity to consume. Post-Keynesians emphasize: (1) Multipliers are larger when unemployment exists, (2) Leakages (saving, imports) reduce the effect, (3) Debt-financed spending raises questions about sustainability.',
          thinkers: ['John Maynard Keynes', 'Richard Kahn', 'Michal Kalecki', 'Victoria Chick'],
          realWorldExample: 'The New Deal (1933-1939): Government hired unemployed workers directly (WPA, CCC), who spent wages reviving local businesses. GDP grew, unemployment fell from 25% to 14%. More recently, Obama 2009 ARRA stimulus ($787B) was estimated to have saved/created 1.5-3.3 million jobs, though many Post-Keynesians argued it was too small relative to the output gap.',
          counterArguments: 'Neoclassical: Crowding out—government borrowing raises interest rates, reducing private investment. Ricardian equivalence: People save the stimulus knowing taxes will rise later. Rational expectations: If stimulus is anticipated, behavior adjusts immediately, neutralizing effects. Austrian: Distorts capital structure, causing malinvestment.'
        }
      },
      {
        id: 'wages',
        text: 'Raise minimum wage and public employment',
        consequence: 'Put money in workers hands—they have the highest [[marginal propensity to consume|tendency to spend additional income]] so demand responds immediately.',
        effects: { wageShare: 10, economicStrength: 8, priceStability: -3 },
        learnMore: {
          concept: 'Wage-Led Demand and the Marginal Propensity to Consume',
          explanation: 'Post-Keynesians emphasize that distribution matters for demand. Workers have higher marginal propensity to consume (MPC) than capitalists—workers spend most of additional income on necessities; capitalists save/invest much of theirs. Raising wages therefore boosts aggregate demand, potentially stimulating growth. This is "wage-led growth." However, critics note: (1) Higher wages might reduce profits and investment, (2) If the economy is profit-led (investment responds strongly to profits), wage increases could reduce growth, (3) Inflation risk if wage increases are not productivity-backed. The empirical question: is the economy wage-led or profit-led?',
          thinkers: ['Michal Kalecki', 'Nicholas Kaldor', 'Robert Solow', 'Engelbert Stockhammer'],
          realWorldExample: 'Minimum wage increases: Evidence from Card and Krueger (1994) study of New Jersey fast-food workers challenged the neoclassical prediction of job losses—employment rose slightly. Later studies confirm modest minimum wage increases have small or no negative employment effects, consistent with Post-Keynesian monopsony power arguments. The Seattle $15 wage (phased 2015-2021) showed initial disruptions but eventual adaptation.',
          counterArguments: 'Neoclassical: Higher wages reduce employment (supply-demand in labor market). Monetarist: Wage increases cause inflation. Marxian: Wage gains are temporary; capitalists respond with speed-up, automation, or relocation. Open economy: Wage increases harm competitiveness in trade.'
        }
      },
      {
        id: 'confidence',
        text: 'Launch a business confidence campaign',
        consequence: 'Try to boost [[animal spirits|entrepreneurial optimism and risk-taking]] without spending. Risky—if expectations do not shift, nothing happens.',
        effects: { economicStrength: 3, publicSupport: 3 },
        learnMore: {
          concept: 'Animal Spirits and Expectations',
          explanation: 'Keynes introduced "animal spirits" to describe the optimistic, non-rational forces driving investment decisions. In fundamental uncertainty (where probability distributions are unknown), decisions depend on confidence, conventions, and stories. A confidence campaign attempts to shift these subjective factors without fiscal outlay. But Post-Keynesians are skeptical: (1) Talk is cheap—businesses need actual orders, not pep talks, (2) Confidence without demand is empty, (3) Credibility requires backing with action. The approach resembles "expectations management" in new Keynesian economics (forward guidance), but without monetary policy tools.',
          thinkers: ['John Maynard Keynes', 'George Akerlof', 'Robert Shiller', 'Paul Davidson'],
          realWorldExample: 'Confidence campaigns in practice: Roosevelt fireside chats combined rhetoric with action (bank holidays, jobs programs), so credibility was high. More recent examples—Obama "Recovery Summer" (2010) or various "business confidence initiatives"—failed when not backed by sustained demand. Japan "Abenomics" (2013) combined rhetoric with monetary and fiscal expansion, showing that confidence campaigns work only as complements to real policy.',
          counterArguments: 'Post-Keynesian: Pure rhetoric fails—businesses need orders, not encouragement. Behavioral: Confidence is sticky; campaigns without substance are ignored. Marxian: Capitalists invest based on profit opportunities, not speeches; if exploitation opportunities exist, capitalists need no encouragement.'
        }
      },
    ],
  },
];

// ============================================================================
// NOTE: This enhanced file includes only the first 3 blocks.
// Full implementation would continue with remaining blocks following the same pattern:
// - Neoclassical Block 2: Rational Expectations
// - Neoclassical Block 3: Growth Theory  
// - Neoclassical Block 4: Efficiency vs Equity
// - Neoclassical Block 5: Neoclassical Synthesis
// - Post-Keynesian Block 2: Financial Instability
// - Post-Keynesian Block 3: Pricing Power
// - Post-Keynesian Block 4: Distribution and Demand
// - Post-Keynesian Block 5: Post-Keynesian Synthesis
// - Plus Marxian, Structuralist, and Development paths
// ============================================================================

/**
 * Type definitions for enhanced fields (to be integrated into long-form-tree.ts):
 * 
 * interface DecisionBlock {
 *   // ... existing fields ...
 *   tooltipDefinitions?: Record<string, string>;
 * }
 * 
 * interface Choice {
 *   // ... existing fields ...
 *   learnMore?: {
 *     concept: string;
 *     explanation: string;
 *     thinkers: string[];
 *     realWorldExample: string;
 *     counterArguments: string;
 *   };
 * }
 */

// Export the enhanced blocks (partial implementation for first 3 blocks)
export { introBlock, neoclassicalBlocks, postKeynesianBlocks };

// For a complete tree, additional blocks would be added following the same pattern
export default {
  intro: introBlock,
  neoclassical: neoclassicalBlocks,
  postKeynesian: postKeynesianBlocks,
};
