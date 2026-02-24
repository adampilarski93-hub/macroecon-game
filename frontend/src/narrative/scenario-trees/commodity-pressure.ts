import type { DecisionBlock, LongFormEnding, ScenarioArc } from '../long-form-tree';
import { createArcBasedTree } from '../long-form-tree';

/**
 * Commodity Shock — Republic of Kemet
 * Refactored with Parallel Arcs to eliminate repetition
 * Three distinct approaches: Stabilization, Diversification, Sovereign Management
 */

const introArc: ScenarioArc = {
  id: 'start',
  blocks: [
    {
      phase: 1,
      title: 'Commodity Shock & Development Squeeze',
      narrative: `You lead the Republic of Kemet, a commodity-dependent economy. Global prices for your primary export — copper, in your case — have collapsed. Foreign exchange is fleeing. The currency is under pressure. Inflation is spiking as import costs rise.

Trade economists warn of "unequal exchange" — the terms of trade systematically transfer value from commodity exporters to manufactured-good importers. Development scholars speak of a designed "resource curse" — extraction structured to benefit outsiders.

Three strategies emerge in your crisis cabinet:

**Macroeconomic Stabilization** — led by your central bank governor — citing Keynesian commodity cycle management: stabilization funds, counter-cyclical policy, and prudent macroeconomic management to ride out the cycle.

**Structural Diversification** — led by your industry minister — citing the structuralist tradition: move up the value chain, process commodities locally, build new industries, and reduce commodity dependence over time.

**Sovereign Commodity Management** — led by your agriculture minister — citing food sovereignty and resource nationalism: nationalize extraction, capture resource rents for domestic development, and prioritize autonomy over integration.

How do you respond to the commodity shock?`,
      choices: [
        {
          id: 'stabilization',
          text: 'Macroeconomic Stabilization — Keynesian Cycle Management',
          consequence: 'You focus on stabilizing the economy through the downturn.',
          effects: { priceStability: 8, externalBalance: -5, debtBurden: 5 },
          nextArc: 'stabilization',
        },
        {
          id: 'diversification',
          text: 'Structural Diversification — Build New Industries',
          consequence: 'You accelerate the transition away from commodity dependence.',
          effects: { economicStrength: 5, externalBalance: 3, publicSupport: -5 },
          nextArc: 'diversification',
        },
        {
          id: 'sovereign',
          text: 'Sovereign Commodity Management — Resource Nationalism',
          consequence: 'You assert control over resources and prioritize autonomy.',
          effects: { sovereignty: 15, priceStability: -5, externalBalance: -10 },
          nextArc: 'sovereign',
        },
      ],
    },
  ],
};

/**
 * STABILIZATION ARC — Keynesian/Post-Keynesian Commodity Cycle Management
 * Focus on macroeconomic stability, stabilization funds, counter-cyclical policy
 */
const stabilizationArc: ScenarioArc = {
  id: 'stabilization',
  blocks: [
    {
      phase: 2,
      title: 'The Stabilization Fund Question',
      narrative: `You have committed to Keynesian-style stabilization. The core question: do you have, or can you create, a commodity stabilization fund? Such funds save revenue during booms to spend during busts — smoothing the cycle.

But Kemet's previous government spent the boom years, not saved them. The cupboard is bare. Now, in crisis, you must borrow to stabilize — if you can.

What stabilization approach?`,
      choices: [
        { id: 'borrow_stabilize', text: 'Borrow internationally to stabilize', consequence: 'You add debt to smooth consumption.', effects: { priceStability: 8, debtBurden: 15, externalBalance: -5 } },
        { id: 'austerity', text: 'Austerity stabilization — cut to match revenue', consequence: 'You accept the contraction.', effects: { priceStability: 5, debtBurden: -5, publicSupport: -15 } },
        { id: 'capital_controls', text: 'Capital controls + moderate adjustment', consequence: 'You stem outflows and adjust gradually.', effects: { priceStability: 5, externalBalance: 5, sovereignty: 5 } },
      ],
    },
    {
      phase: 2,
      title: 'Currency Management',
      narrative: `Your currency is under severe pressure. Reserves are falling. The post-Keynesian approach recognizes that for commodity exporters, exchange rate instability amplifies commodity price volatility.

Do you defend the currency using remaining reserves? Devalue to boost competitiveness? Or impose capital controls to stop the outflows?`,
      choices: [
        { id: 'defend_rate', text: 'Defend the currency with reserves', consequence: 'You burn foreign exchange to buy stability.', effects: { priceStability: 10, externalBalance: -20 } },
        { id: 'orderly_deval', text: 'Orderly devaluation with inflation targeting', consequence: 'You let the currency adjust but control the fallout.', effects: { priceStability: -5, externalBalance: 10, economicStrength: 5 } },
        { id: 'controls_float', text: 'Capital controls + managed float', consequence: 'You control flows and let the rate adjust gradually.', effects: { externalBalance: 8, priceStability: -3, sovereignty: 8 } },
      ],
    },
    {
      phase: 3,
      title: 'Counter-Cyclical Fiscal Policy',
      narrative: `Keynesian stabilization suggests running deficits during downturns to maintain demand, then surpluses during upturns. But lenders may not finance your deficits, and you lack a stabilization fund.

How do you implement counter-cyclical policy without resources?`,
      choices: [
        { id: 'imfmfi', text: 'IMF program for fiscal space', consequence: 'You accept conditionality for financing.', effects: { debtBurden: -5, sovereignty: -15, priceStability: 5 } },
        { id: 'domestic_borrow', text: 'Domestic borrowing + monetization', consequence: 'You finance deficits domestically.', effects: { debtBurden: 10, priceStability: -8, sovereignty: 5 } },
        { id: 'automatic', text: 'Automatic stabilizers only — let existing systems work', consequence: 'You let unemployment benefits and progressive taxes cushion the blow.', effects: { publicSupport: 5, debtBurden: 5, priceStability: 0 } },
      ],
    },
    {
      phase: 3,
      title: 'Social Protection Floor',
      narrative: `Even in crisis, Keynesian policy emphasizes maintaining a social protection floor — preventing destitution maintains social cohesion and future productivity.

But every dollar spent on social protection is a dollar not spent on stabilization or debt service. What social protection do you maintain?`,
      choices: [
        { id: 'maintain', text: 'Maintain full social protection', consequence: 'You protect the vulnerable despite costs.', effects: { publicSupport: 15, debtBurden: 10, priceStability: -3 } },
        { id: 'targeted', text: 'Targeted protection — only the poorest', consequence: 'You reduce costs but maintain a floor.', effects: { publicSupport: 5, debtBurden: 3 } },
        { id: 'suspend', text: 'Suspend non-essential social programs', consequence: 'You focus all resources on macro stability.', effects: { debtBurden: -5, publicSupport: -15 } },
      ],
    },
    {
      phase: 4,
      title: 'Preparing for the Next Boom',
      narrative: `Commodity prices are cyclical. This bust will eventually become a boom — if you survive. The key Keynesian lesson: prepare during the bust to save during the boom.

Do you establish institutions now — a stabilization fund framework, fiscal rules, automatic stabilizers — that will kick in when prices recover?`,
      choices: [
        { id: 'institutions', text: 'Build stabilization institutions now', consequence: 'You prepare for future cycles.', effects: { sovereignty: 5, economicStrength: 3, debtBurden: 3 } },
        { id: 'survive', text: 'Focus on survival — institutions later', consequence: 'You get through the crisis first.', effects: { economicStrength: 5, sovereignty: -3 } },
        { id: 'reform', text: 'Reform tax collection to reduce commodity dependence', consequence: 'You diversify the fiscal base.', effects: { sovereignty: 8, economicStrength: 5, debtBurden: -3 } },
      ],
    },
    {
      phase: 5,
      title: 'The Stabilization Assessment',
      narrative: `Your term ends. The Keynesian stabilization approach has seen Kemet through the commodity bust. The currency has stabilized, inflation has moderated, and social unrest has been contained.

But you have added debt. You have accepted external conditionality. You remain dependent on the next commodity boom. Have you managed the cycle or merely postponed the reckoning?

How do you assess the stabilization approach?`,
      choices: [
        { id: 'managed', text: 'Successfully managed the cycle', consequence: 'You claim Keynesian success.', effects: { priceStability: 10, externalBalance: 5 }, endingIndex: 0 },
        { id: 'postponed', text: 'Postponed problems — debt remains', consequence: 'You acknowledge the costs.', effects: { debtBurden: -5 }, endingIndex: 1 },
        { id: 'vulnerable', text: 'Still vulnerable to next shock', consequence: 'You recognize ongoing dependence.', effects: { economicStrength: 3 }, endingIndex: 2 },
      ],
    },
  ],
};

/**
 * DIVERSIFICATION ARC — Structuralist Development Approach
 * Move up value chain, build new industries, reduce commodity dependence
 */
const diversificationArc: ScenarioArc = {
  id: 'diversification',
  blocks: [
    {
      phase: 2,
      title: 'The Value Chain Challenge',
      narrative: `You have committed to structural diversification. Kemet exports raw copper ore. The value is in processed copper — wire, pipes, electronics. The structuralist approach: climb the value chain.

But processing requires energy, capital, and technical expertise you lack. Foreign firms currently process your ore abroad. They resist local processing requirements.

What diversification strategy?`,
      choices: [
        { id: 'processing', text: 'Local processing requirements — smelting and refining', consequence: 'You mandate value addition before export.', effects: { economicStrength: 10, sovereignty: 8, debtBurden: 15 } },
        { id: 'new_sectors', text: 'New sectors entirely — agriculture, manufacturing', consequence: 'You reduce copper dependence through new industries.', effects: { economicStrength: 8, employment: 10, debtBurden: 12 } },
        { id: 'services', text: 'Services pivot — tourism, finance, tech', consequence: 'You develop service exports.', effects: { economicStrength: 5, employment: 8, debtBurden: 8 } },
      ],
    },
    {
      phase: 2,
      title: 'Foreign Investment for Diversification',
      narrative: `Diversification requires capital Kemet lacks. Foreign investment could bring financing, technology, and market access. But it brings conditionality and profit repatriation.

How do you structure foreign investment for diversification?`,
      choices: [
        { id: 'joint_ventures', text: 'Joint ventures — share ownership and control', consequence: 'You partner with foreign capital.', effects: { economicStrength: 10, sovereignty: -3, debtBurden: 5 } },
        { id: 'performance', text: 'Performance requirements — local content, technology transfer', consequence: 'You set conditions for market access.', effects: { economicStrength: 8, sovereignty: 5, debtBurden: 3 } },
        { id: 'public_led', text: 'Public-led diversification — state investment', consequence: 'You lead diversification directly.', effects: { economicStrength: 5, sovereignty: 10, debtBurden: 20 } },
      ],
    },
    {
      phase: 3,
      title: 'Linkages and Cluster Development',
      narrative: `The structuralist insight: development happens through linkages — backward linkages (inputs to your industries), forward linkages (processing of your outputs), and fiscal linkages (government revenue funding development).

How do you build these linkages?`,
      choices: [
        { id: 'backward', text: 'Backward linkages — domestic input suppliers', consequence: 'You build supplier industries.', effects: { economicStrength: 8, employment: 10, debtBurden: 8 } },
        { id: 'forward', text: 'Forward linkages — downstream processing', consequence: 'You process before exporting.', effects: { economicStrength: 10, sovereignty: 5, debtBurden: 10 } },
        { id: 'fiscal', text: 'Fiscal linkages — resource rents fund development', consequence: 'You tax extraction to diversify.', effects: { economicStrength: 6, debtBurden: -5, sovereignty: 3 } },
      ],
    },
    {
      phase: 3,
      title: 'Skills and Technology',
      narrative: `Moving up the value chain requires skills Kemet lacks — engineers, technicians, managers. Technology must be acquired and adapted.

How do you build human capital for diversification?`,
      choices: [
        { id: 'education', text: 'Massive education investment — universities, vocational', consequence: 'You build domestic capacity long-term.', effects: { employment: 5, economicStrength: 5, debtBurden: 10 } },
        { id: 'import_skills', text: 'Import skills — recruit foreign experts, diaspora', consequence: 'You bring expertise quickly.', effects: { economicStrength: 10, employment: 3, sovereignty: -5 } },
        { id: 'train_on_job', text: 'Training on the job — learn by doing', consequence: 'You build skills through production.', effects: { economicStrength: 8, employment: 8, debtBurden: 5 } },
      ],
    },
    {
      phase: 4,
      title: 'Export Markets for New Products',
      narrative: `Your diversification produces new goods — processed copper, manufactures, services. But who buys them? Your traditional commodity buyers want raw ore. New markets must be found.

How do you develop export markets for diversified products?`,
      choices: [
        { id: 'regional', text: 'Regional market integration — sell to neighbors', consequence: 'You build regional trade.', effects: { economicStrength: 8, externalBalance: 5, sovereignty: 5 } },
        { id: 'global_north', text: 'Access global North markets — meet their standards', consequence: 'You compete in premium markets.', effects: { economicStrength: 10, sovereignty: -8, externalBalance: 10 } },
        { id: 'domestic', text: 'Import substitution — replace imports first', consequence: 'You satisfy domestic demand.', effects: { economicStrength: 5, sovereignty: 8, externalBalance: 3 } },
      ],
    },
    {
      phase: 5,
      title: 'The Diversification Assessment',
      narrative: `Your term ends. Diversification has been your guiding strategy. New industries have been established. Copper dependence has — hopefully — been reduced.

But diversification is a long-term project. One term is barely enough to begin. The question is whether you have laid foundations that will support future development.

How do you assess the diversification approach?`,
      choices: [
        { id: 'foundation', text: 'Foundation laid for future growth', consequence: 'You claim structural success.', effects: { economicStrength: 12, sovereignty: 5 }, endingIndex: 0 },
        { id: 'partial', text: 'Partial diversification achieved', consequence: 'You acknowledge incomplete progress.', effects: { economicStrength: 5, externalBalance: 3 }, endingIndex: 1 },
        { id: 'premature', text: 'Too ambitious — should have stabilized first', consequence: 'You question the sequencing.', effects: { economicStrength: -3, debtBurden: 5 }, endingIndex: 2 },
      ],
    },
  ],
};

/**
 * SOVEREIGN MANAGEMENT ARC — Resource Nationalism and Food Sovereignty
 * Nationalize resources, capture rents, reduce external dependence
 */
const sovereignArc: ScenarioArc = {
  id: 'sovereign',
  blocks: [
    {
      phase: 2,
      title: 'Resource Nationalization',
      narrative: `You have committed to sovereign commodity management. The first step: who owns the copper mines? Currently, foreign corporations control extraction, processing, and marketing. They repatriate profits and dictate terms.

Resource nationalism argues that subsoil resources are the patrimony of the people. The state should control extraction and capture rents for national development.

What nationalization approach?`,
      choices: [
        { id: 'full_nationalize', text: 'Full nationalization — state takes complete control', consequence: 'You expropriate foreign firms.', effects: { sovereignty: 20, economicStrength: -5, internationalStanding: -20 } },
        { id: 'majority_state', text: 'Majority state ownership — joint ventures on your terms', consequence: 'You control but share risk.', effects: { sovereignty: 12, economicStrength: 3, internationalStanding: -10 } },
        { id: 'resource_fund', text: 'Keep private ownership but create resource fund', consequence: 'You tax extraction heavily.', effects: { sovereignty: 8, economicStrength: 5, internationalStanding: -5 } },
      ],
    },
    {
      phase: 2,
      title: 'Food Sovereignty First',
      narrative: `Advocates of food sovereignty — La Via Campesina, Marxist agronomists — argue that no country is sovereign while it depends on food imports. Hunger is a weapon; food dependence is vulnerability.

Kemet currently imports 40% of its food. The global price spike threatens mass hunger. How do you achieve food sovereignty?`,
      choices: [
        { id: 'land_reform', text: 'Radical land reform — redistribute to smallholders', consequence: 'You break agrarian inequality.', effects: { sovereignty: 15, publicSupport: 15, economicStrength: 3 } },
        { id: 'state_farms', text: 'State farms for staples — wheat, rice, maize', consequence: 'You centralize food production.', effects: { sovereignty: 10, economicStrength: 5, publicSupport: 5 } },
        { id: 'import_substitute', text: 'Tariffs and subsidies for domestic agriculture', consequence: 'You protect food producers.', effects: { sovereignty: 8, priceStability: 5, debtBurden: 8 } },
      ],
    },
    {
      phase: 3,
      title: 'Financial Sovereignty',
      narrative: `Commodity exporters face a financial contradiction: they earn dollars but need domestic currency. Foreign banks control payment systems. IMF surveillance constrains policy. Dollar dependence is structural.

How do you pursue financial sovereignty?`,
      choices: [
        { id: 'monetary_reform', text: 'Monetary reform — central bank independence, capital controls', consequence: 'You assert monetary sovereignty.', effects: { sovereignty: 12, externalBalance: 5, priceStability: -5 } },
        { id: 'regional_currency', text: 'Regional payment system — reduce dollar dependence', consequence: 'You build South-South finance.', effects: { sovereignty: 10, externalBalance: 8, economicStrength: 2 } },
        { id: 'barter', text: 'Barter trade — commodities for essential imports', consequence: 'You bypass currency entirely.', effects: { sovereignty: 8, externalBalance: 10, economicStrength: -3 } },
      ],
    },
    {
      phase: 3,
      title: 'Technology and Knowledge Sovereignty',
      narrative: `Copper extraction technology is foreign-owned. Agronomical knowledge comes from Northern research institutions. Technical dependence reproduces commodity dependence.

How do you build knowledge sovereignty?`,
      choices: [
        { id: 'rd_investment', text: 'Massive R&D investment — domestic innovation', consequence: 'You build indigenous capacity.', effects: { sovereignty: 10, economicStrength: 5, debtBurden: 15 } },
        { id: 'reverse_engineer', text: 'Reverse engineering and technology acquisition', consequence: 'You learn from existing tech.', effects: { sovereignty: 8, economicStrength: 8, internationalStanding: -8 } },
        { id: 'south_south_tech', text: 'South-South technology cooperation', consequence: 'You learn from other developing countries.', effects: { sovereignty: 8, economicStrength: 3, externalBalance: 5 } },
      ],
    },
    {
      phase: 4,
      title: 'Resisting External Pressure',
      narrative: `Your sovereign management has triggered external pushback. Foreign mining firms are lobbying their governments. Credit ratings have been downgraded. Sanctions have been threatened.

How do you resist external pressure?`,
      choices: [
        { id: 'confront', text: 'Confront directly — rally nationalist sentiment', consequence: 'You mobilize domestic support.', effects: { sovereignty: 15, publicSupport: 10, internationalStanding: -15 } },
        { id: 'negotiate', text: 'Negotiate from strength — offer limited concessions', consequence: 'You compromise selectively.', effects: { sovereignty: 5, internationalStanding: -5, economicStrength: 5 } },
        { id: 'allies', text: 'Build international alliances — find external support', consequence: 'You seek friendly powers.', effects: { sovereignty: 8, internationalStanding: 3, externalBalance: 5 } },
      ],
    },
    {
      phase: 5,
      title: 'The Sovereign Assessment',
      narrative: `Your term ends. Sovereign commodity management has been your North Star. Resources are more national-controlled. Food security has improved. External dependence has — hopefully — been reduced.

But the cost has been high. Capital flight, sanctions threats, technical difficulties. Sovereignty is expensive.

How do you assess the sovereign approach?`,
      choices: [
        { id: 'sovereignty_won', text: 'Sovereignty achieved — the price was worth it', consequence: 'You claim resource nationalist victory.', effects: { sovereignty: 15, economicStrength: 3 }, endingIndex: 0 },
        { id: 'costly', text: 'Sovereignty won but very costly', consequence: 'You acknowledge the pain.', effects: { sovereignty: 10, economicStrength: -5 }, endingIndex: 1 },
        { id: 'ongoing_struggle', text: 'The struggle continues — sovereignty is a process', consequence: 'You see it as unfinished.', effects: { sovereignty: 8, publicSupport: 5 }, endingIndex: 2 },
      ],
    },
  ],
};

const endings: LongFormEnding[] = [
  {
    id: 'victory',
    endingType: 'victory',
    title: 'Breaking the Commodity Trap',
    endingNarrative: `Kemet has reduced its vulnerability to commodity price cycles. Whether through Keynesian stabilization, structural diversification, or sovereign resource management, you have found a path that provides more security than simple commodity dependence.

The economy is more resilient. Foreign exchange pressures have eased. The population is more secure. The commodity trap — while not entirely escaped — has been loosened.

The next government inherits a country better positioned to weather global market volatility.`,
  },
  {
    id: 'partial',
    endingType: 'partial_victory',
    title: 'Partial Success',
    endingNarrative: `Kemet has made progress against commodity dependence, but the transformation remains incomplete. Some stabilization has been achieved; some diversification begun; some sovereignty asserted. But commodity exports still dominate, external shocks still hurt, and vulnerability persists.

Your chosen approach — stabilization, diversification, or sovereign management — produced real gains but also revealed real limits. Perhaps the time was too short. Perhaps the global structure was too powerful. Perhaps the internal contradictions were too sharp.

The next government faces a similar challenge: continuing the struggle to escape the commodity trap.`,
  },
  {
    id: 'defeat',
    endingType: 'defeat',
    title: 'Commodity Trap',
    endingNarrative: `Despite your efforts, Kemet remains caught in the commodity trap. Price volatility continues to dominate economic life. External dependence persists. The strategies you attempted — whether blocked by external pressure, undermined by internal opposition, or simply insufficient to the scale of the problem — have not transformed the structure.

The copper price will rise again, and fall again. Each cycle will bring false hope and real pain. The dream of escaping commodity dependence remains just that — a dream.

The next government inherits the same dilemma that has faced commodity exporters for centuries: how to build development on a foundation of volatile global markets.`,
  },
];

export function createNarrativeTree(options?: { shuffle?: boolean; seed?: number }) {
  return createArcBasedTree(
    [introArc, stabilizationArc, diversificationArc, sovereignArc],
    endings,
    (choiceIdx) => (choiceIdx === 0 ? 0 : choiceIdx === 1 ? 1 : 2),
    { shuffleBlocks: options?.shuffle ?? true, seed: options?.seed },
  );
}
