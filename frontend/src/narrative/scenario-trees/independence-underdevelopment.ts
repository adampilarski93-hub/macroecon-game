import type { DecisionBlock, LongFormEnding, ScenarioArc } from '../long-form-tree';
import { createArcBasedTree } from '../long-form-tree';

/**
 * Independence & Underdevelopment — Republic of Uhuru
 * Refactored with Parallel Arcs to eliminate repetition
 * Three distinct approaches: Import Substitution, Export-Led Growth, Delinking/Sovereign
 */

const introArc: ScenarioArc = {
  id: 'start',
  blocks: [
    {
      phase: 1,
      title: 'Independence & Underdevelopment',
      narrative: `The Republic of Uhuru has won independence. Colonial structures remain: export-oriented agriculture, imported manufactures, foreign-owned mines, and an elite educated abroad. The people expect transformation. The world offers competing models.

Three schools of development thought emerge in your cabinet:

**Import Substitution Industrialization** — led by your industry minister — citing Raul Prebisch and CEPAL: protect infant industries, build domestic manufacturing behind tariff walls, and reduce dependence on manufactured imports from the core.

**Export-Led Growth** — led by your finance minister — citing comparative advantage theory: open to foreign investment, specialize in what you produce efficiently, and grow through integration into global markets.

**Delinking & Sovereign Development** — led by your agriculture minister — citing Samir Amin and dependency theory: radically delink from unequal exchange, pursue food sovereignty, nationalize resources, and build autonomous capacity.

What development path do you choose?`,
      choices: [
        {
          id: 'isi',
          text: 'Import Substitution — Prebisch-style Industrialization',
          consequence: 'You commit to protected domestic manufacturing and state-led industrialization.',
          effects: { economicStrength: 8, sovereignty: 8, debtBurden: 10 },
          nextArc: 'isi',
        },
        {
          id: 'export_led',
          text: 'Export-Led Growth — Open Economy Development',
          consequence: 'You open to foreign capital and specialize for global markets.',
          effects: { economicStrength: 10, sovereignty: -8, debtBurden: 5 },
          nextArc: 'export_led',
        },
        {
          id: 'delinking',
          text: 'Delinking — Amin-style Sovereign Development',
          consequence: 'You commit to radical delinking and food/resource sovereignty.',
          effects: { sovereignty: 15, economicStrength: 3, publicSupport: 10 },
          nextArc: 'delinking',
        },
      ],
    },
  ],
};

/**
 * IMPORT SUBSTITUTION INDUSTRIALIZATION (ISI) ARC
 * Prebisch/CEPAL school — protected domestic manufacturing
 */
const isiArc: ScenarioArc = {
  id: 'isi',
  blocks: [
    {
      phase: 2,
      title: 'The Prebisch Strategy',
      narrative: `You have chosen import substitution industrialization. Raul Prebisch argued that peripheral countries face declining terms of trade — raw materials buy fewer manufactured goods over time. The solution: stop importing manufactures and build them at home.

The question is sequencing. Which industries do you target first?

**Consumer goods** — textiles, shoes, processed foods. Lower capital requirements, immediate employment, but limited technological learning.

**Intermediate goods** — steel, cement, chemicals. Feed into other industries, create linkages, but require more capital and time.

**Capital goods** — machinery, tools, transport equipment. Highest technological content, build deep industrial capacity, but most difficult and capital-intensive.

What do you prioritize?`,
      choices: [
        { id: 'consumer', text: 'Consumer goods first', consequence: 'You start with textiles and food processing.', effects: { employment: 12, economicStrength: 5, debtBurden: 5 } },
        { id: 'intermediate', text: 'Intermediate goods', consequence: 'You target steel and chemicals.', effects: { economicStrength: 10, debtBurden: 12, employment: 8 } },
        { id: 'capital', text: 'Capital goods', consequence: 'You aim for machinery and tools.', effects: { economicStrength: 8, debtBurden: 20, sovereignty: 10 } },
      ],
    },
    {
      phase: 2,
      title: 'Tariff Protection',
      narrative: `Your infant industries cannot yet compete with established foreign manufacturers. Prebisch's solution: temporary protection behind tariff walls while they learn and scale.

But protection has costs. Consumer prices will rise. Foreign trading partners may retaliate. Protected firms may become complacent rather than efficient.

What level of protection do you establish?`,
      choices: [
        { id: 'high', text: 'High protective tariffs (50%+)', consequence: 'You wall off domestic markets.', effects: { economicStrength: 8, sovereignty: 8, priceStability: -10 } },
        { id: 'moderate', text: 'Moderate protection (25-30%)', consequence: 'You balance protection with competition.', effects: { economicStrength: 5, priceStability: -5, sovereignty: 5 } },
        { id: 'conditional', text: 'Conditional protection — performance requirements', consequence: 'You protect only if firms meet targets.', effects: { economicStrength: 10, debtBurden: 3 } },
      ],
    },
    {
      phase: 3,
      title: 'State Enterprises vs. Private Capital',
      narrative: `Who will build these industries? Prebisch recognized that the private sector in peripheral countries often lacks the capital and risk tolerance for industrialization.

**State enterprises** in key sectors — the "commanding heights" approach. State builds and runs steel, chemicals, machinery. Direct control but potential inefficiency.

**Private incentives** — subsidies, tax breaks, cheap credit to domestic capitalists. Less direct control but more entrepreneurial energy.

**Joint ventures** — state and private capital together. Shares risk and combines resources but creates coordination challenges.

What ownership model?`,
      choices: [
        { id: 'state', text: 'State enterprises in commanding heights', consequence: 'You lead industrialization directly.', effects: { economicStrength: 10, sovereignty: 12, debtBurden: 15 } },
        { id: 'private', text: 'Private incentives and support', consequence: 'You support domestic capitalists.', effects: { economicStrength: 8, debtBurden: 8, publicSupport: 5 } },
        { id: 'joint', text: 'Joint state-private ventures', consequence: 'You share risk and control.', effects: { economicStrength: 6, debtBurden: 10, sovereignty: 8 } },
      ],
    },
    {
      phase: 3,
      title: 'The Foreign Exchange Constraint',
      narrative: `Your ISI strategy requires imported capital goods — machinery, technology, intermediate inputs. These must be paid for in hard currency. But your exports are limited and prices are declining.

How do you manage the foreign exchange constraint?

**Multiple exchange rates** — cheap foreign exchange for essential imports, expensive for luxuries. Direct control but creates distortions and opportunities for corruption.

**Export promotion alongside ISI** — subsidize traditional exports (cash crops, minerals) to earn foreign exchange. May perpetuate dual economy.

**Import licensing** — bureaucratic allocation of scarce foreign exchange. Rationing without markets but requires capable administration.

What mechanism?`,
      choices: [
        { id: 'multiple_rates', text: 'Multiple exchange rates', consequence: 'You allocate FX by priority.', effects: { economicStrength: 5, sovereignty: 5, debtBurden: 3 } },
        { id: 'export_promote', text: 'Promote exports to pay for imports', consequence: 'You balance ISI with export needs.', effects: { economicStrength: 8, sovereignty: -5 } },
        { id: 'licensing', text: 'Import licensing system', consequence: 'You bureaucratically control imports.', effects: { sovereignty: 8, economicStrength: -3 } },
      ],
    },
    {
      phase: 4,
      title: 'Deepening vs. Broadening',
      narrative: `Your initial ISI industries are running. Textiles, shoes, simple manufactures are being produced domestically. But these use imported machinery, imported chemicals, imported fuel. The "deepening" problem: you are substituting at the final goods level but not upstream.

Do you push "ISI deepening" — targeting the inputs that your consumer industries need? Or "ISI broadening" — more consumer goods variety for the domestic market?

Deepening builds true industrial autonomy. Broadening satisfies consumer demand faster.`,
      choices: [
        { id: 'deepening', text: 'ISI deepening — target intermediate and capital goods', consequence: 'You build upstream capacity.', effects: { economicStrength: 12, debtBurden: 15, sovereignty: 10 } },
        { id: 'broadening', text: 'ISI broadening — more consumer variety', consequence: 'You expand final goods production.', effects: { economicStrength: 6, publicSupport: 10, debtBurden: 5 } },
        { id: 'both', text: 'Pursue both simultaneously', consequence: 'You stretch resources thin.', effects: { economicStrength: 8, debtBurden: 18 } },
      ],
    },
    {
      phase: 5,
      title: 'The ISI Assessment',
      narrative: `Your term ends. Import substitution has been your guiding strategy. Domestic manufacturing now exists where none did before. Jobs have been created. The trade deficit in manufactures has narrowed.

But questions remain. Are your industries efficient or merely protected? Can they eventually compete without tariff walls? Has the foreign exchange constraint limited growth?

How do you assess the Prebisch experiment?`,
      choices: [
        { id: 'success', text: 'Industrial base established', consequence: 'You claim the ISI victory.', effects: { economicStrength: 12, sovereignty: 10 }, endingIndex: 0 },
        { id: 'partial', text: 'Progress, but protection dependence', consequence: 'You acknowledge the limitations.', effects: { economicStrength: 5, sovereignty: 5 }, endingIndex: 1 },
        { id: 'unsure', text: 'Too soon to judge', consequence: 'You suspend judgment.', effects: { sovereignty: 3 }, endingIndex: 2 },
      ],
    },
  ],
};

/**
 * EXPORT-LED GROWTH ARC
 * Comparative advantage approach — open economy development
 */
const exportLedArc: ScenarioArc = {
  id: 'export_led',
  blocks: [
    {
      phase: 2,
      title: 'The Comparative Advantage Bet',
      narrative: `You have chosen export-led growth. The classical theory: countries gain from specializing in what they produce relatively efficiently and trading for the rest. Your natural advantages: minerals, agricultural land, low labor costs, tropical climate.

But specialization has risks. Export dependence creates vulnerability to price fluctuations. You may get stuck in low-value activities.

What do you specialize in?`,
      choices: [
        { id: 'minerals', text: 'Mineral extraction and processing', consequence: 'You bet on natural resources.', effects: { economicStrength: 15, sovereignty: -10, debtBurden: 8 } },
        { id: 'agriculture', text: 'High-value agriculture (cash crops)', consequence: 'You develop plantation agriculture.', effects: { economicStrength: 10, sovereignty: -5, employment: 8 } },
        { id: 'manufacturing', text: 'Labor-intensive manufacturing', consequence: 'You compete on low wages.', effects: { employment: 12, economicStrength: 8, sovereignty: -8 } },
      ],
    },
    {
      phase: 2,
      title: 'Foreign Capital and Investment',
      narrative: `You lack domestic capital for the investment export-led growth requires. Foreign capital could bring financing, technology, management expertise, and access to global markets.

But dependency theorists warn: foreign investment extracts profits, dictates terms, and ties your economy to external interests. The question is how to welcome capital without ceding sovereignty.

What framework do you establish?`,
      choices: [
        { id: 'open', text: 'Open door — minimal restrictions', consequence: 'You maximize capital inflows.', effects: { economicStrength: 15, sovereignty: -15, debtBurden: -5 } },
        { id: 'regulated', text: 'Regulated — performance requirements, local content', consequence: 'You set conditions for foreign capital.', effects: { economicStrength: 10, sovereignty: -5, debtBurden: 0 } },
        { id: 'joint_ventures', text: 'Require joint ventures with domestic partners', consequence: 'You share ownership and risk.', effects: { economicStrength: 8, sovereignty: 0, debtBurden: 3 } },
      ],
    },
    {
      phase: 3,
      title: 'The IMF and Structural Adjustment',
      narrative: `You need foreign exchange to import capital goods and service any debt. The IMF offers financing. But the conditionality package requires: currency devaluation, reduced state spending, liberalized markets, privatization.

Research shows structural adjustment often dismantles state capacity exactly when development requires it. But rejecting IMF financing means finding alternatives.

What do you do?`,
      choices: [
        { id: 'accept', text: 'Accept IMF program and conditions', consequence: 'You accept the adjustment package.', effects: { debtBurden: -10, sovereignty: -15, economicStrength: 5 } },
        { id: 'negotiate', text: 'Negotiate modified terms', consequence: 'You try to soften conditionality.', effects: { debtBurden: -5, sovereignty: -8, economicStrength: 3 } },
        { id: 'refuse', text: 'Refuse and seek alternatives', consequence: 'You look for other financing.', effects: { sovereignty: 10, debtBurden: 5, economicStrength: -3 } },
      ],
    },
    {
      phase: 3,
      title: 'Export Processing Zones',
      narrative: `Multinational firms propose export processing zones (EPZs) — enclaves with special rules: tax holidays, duty-free import of inputs, flexible labor laws, no unions. In exchange: jobs, foreign exchange, technology transfer (maybe).

EPZs can generate employment and exports quickly. But critics call them "regression" — competing on low wages and weak protections, a race to the bottom.

What EPZ policy?`,
      choices: [
        { id: 'aggressive', text: 'Aggressive EPZ promotion — maximal incentives', consequence: 'You compete for footloose capital.', effects: { employment: 15, economicStrength: 10, sovereignty: -10, publicSupport: -8 } },
        { id: 'moderate', text: 'Moderate EPZs — some labor protections', consequence: 'You balance attraction with standards.', effects: { employment: 8, economicStrength: 6, sovereignty: -5 } },
        { id: 'reject', text: 'Reject EPZ model', consequence: 'You refuse the race to bottom.', effects: { sovereignty: 10, employment: -5, publicSupport: 8 } },
      ],
    },
    {
      phase: 4,
      title: 'Upgrading the Value Chain',
      narrative: `Your exports are growing but remain concentrated in low-value activities — raw materials or simple assembly. The "middle income trap" looms: you grow until wages rise, then cheaper competitors take your markets.

How do you upgrade?

**Process upgrading** — same products, more efficient production. Cost reduction through technology.

**Product upgrading** — move into higher-value goods within your sector. Better quality, more processing.

**Functional upgrading** — move up the value chain. From assembly to design, from extraction to refining.

What upgrading strategy?`,
      choices: [
        { id: 'process', text: 'Process upgrading — efficiency and technology', consequence: 'You improve productivity.', effects: { economicStrength: 10, debtBurden: 8 } },
        { id: 'product', text: 'Product upgrading — higher value goods', consequence: 'You move up within sectors.', effects: { economicStrength: 12, debtBurden: 10, sovereignty: 3 } },
        { id: 'functional', text: 'Functional upgrading — design and R&D', consequence: 'You claim higher value segments.', effects: { economicStrength: 8, debtBurden: 15, sovereignty: 8 } },
      ],
    },
    {
      phase: 5,
      title: 'The Export-Led Assessment',
      narrative: `Your term ends. Export-led growth has delivered: foreign exchange, employment, connections to global markets. GDP is rising.

But the bill is coming due. Foreign firms repatriate profits. Debt service consumes revenue. Environmental degradation from extractive industries is visible. The domestic market remains underdeveloped because wages were kept low for competitiveness.

How do you assess the export-led experiment?`,
      choices: [
        { id: 'growth', text: 'Growth achieved — the model worked', consequence: 'You claim the export victory.', effects: { economicStrength: 15 }, endingIndex: 0 },
        { id: 'dependent', text: 'Dependent growth — not real development', consequence: 'You acknowledge the costs.', effects: { economicStrength: 5, sovereignty: -10 }, endingIndex: 1 },
        { id: 'transition', text: 'Time to transition — export-led served its purpose', consequence: 'You see it as a stage, not destiny.', effects: { economicStrength: 8, sovereignty: 3 }, endingIndex: 2 },
      ],
    },
  ],
};

/**
 * DELINKING & SOVEREIGN DEVELOPMENT ARC
 * Amin-style radical autarky and food/resource sovereignty
 */
const delinkingArc: ScenarioArc = {
  id: 'delinking',
  blocks: [
    {
      phase: 2,
      title: 'The Amin Strategy',
      narrative: `You have chosen delinking. Samir Amin argued that peripheral countries must "delink" — not autarky, but subordinating external relations to internal development priorities. Stop adapting to global markets; make global relations serve your needs.

The first principle: food sovereignty. No country develops without feeding itself. You cannot be sovereign while importing food.

What is your agricultural strategy?`,
      choices: [
        { id: 'land_reform', text: 'Radical land redistribution — smallholder base', consequence: 'You break colonial land patterns.', effects: { sovereignty: 15, publicSupport: 15, economicStrength: 5 } },
        { id: 'state_farms', text: 'State farms for staple production', consequence: 'You centralize food production.', effects: { sovereignty: 10, economicStrength: 8, publicSupport: 5 } },
        { id: 'mixed', text: 'Mixed system — cooperatives and household plots', consequence: 'You balance scales and autonomy.', effects: { sovereignty: 12, publicSupport: 10, economicStrength: 6 } },
      ],
    },
    {
      phase: 2,
      title: 'Resource Nationalization',
      narrative: `Your minerals, your oil, your forests — they were extracted by colonial firms, and now foreign companies propose continued extraction under "modern" terms. Amin argues that resources are the patrimony of the people; their rents should fund development, not enrich foreign shareholders.

Nationalization will trigger capital flight, sanctions, and technical difficulties. But leaving resources in foreign hands perpetuates dependence.

What do you do?`,
      choices: [
        { id: 'full_nationalize', text: 'Full nationalization — no compensation', consequence: 'You assert full sovereignty.', effects: { sovereignty: 20, economicStrength: 10, internationalStanding: -15 } },
        { id: 'negotiated', text: 'Negotiated nationalization — with compensation', consequence: 'You claim ownership but pay.', effects: { sovereignty: 12, economicStrength: 5, internationalStanding: -5, debtBurden: 10 } },
        { id: 'mixed_ownership', text: 'Mixed ownership — majority state, minority foreign', consequence: 'You compromise on control.', effects: { sovereignty: 8, economicStrength: 8, internationalStanding: -3 } },
      ],
    },
    {
      phase: 3,
      title: 'Delinking from Finance',
      narrative: `Global finance ties you to external priorities. IMF conditionality, World Bank projects, foreign commercial debt — all require policy conformity. Amin argues for delinking from this financial architecture.

But you need capital for development. The options are limited and risky.

What financial strategy?`,
      choices: [
        { id: 'no_imf', text: 'Reject IMF/World Bank entirely', consequence: 'You break with the Bretton Woods system.', effects: { sovereignty: 15, debtBurden: 8, economicStrength: -5 } },
        { id: 'regional', text: 'Build regional South-South financial institutions', consequence: 'You create alternative financing.', effects: { sovereignty: 10, debtBurden: 3, economicStrength: 2 } },
        { id: 'capital_controls', text: 'Strict capital controls with some multilateral engagement', consequence: 'You control financial flows.', effects: { sovereignty: 8, debtBurden: 0, economicStrength: 3 } },
      ],
    },
    {
      phase: 3,
      title: 'South-South Cooperation',
      narrative: `Amin and other dependency theorists argue that peripheral countries should trade with each other, build regional markets, and negotiate collectively. South-South cooperation reduces dependence on the North.

But your Southern neighbors are also poor. Their markets are small. Their technology is limited. Trade with them may not substitute for Northern markets and capital.

How do you pursue South-South cooperation?`,
      choices: [
        { id: 'regional_bloc', text: 'Deep regional integration — common market, free movement', consequence: 'You build a regional economic bloc.', effects: { sovereignty: 12, economicStrength: 8, publicSupport: 5 } },
        { id: 'technical', text: 'Technical cooperation and knowledge sharing', consequence: 'You exchange skills, not just goods.', effects: { economicStrength: 5, sovereignty: 8 } },
        { id: 'negotiating', text: 'Joint negotiating bloc — confront the North together', consequence: 'You bargain collectively.', effects: { sovereignty: 15, internationalStanding: 5 } },
      ],
    },
    {
      phase: 4,
      title: 'The Comprador Question',
      narrative: `A local elite resists your delinking agenda. They profit from import-export businesses, foreign partnerships, and financial connections to the North. Samir Amin calls such groups "comprador" — their interests align with foreign capital rather than national development.

They are blocking land reform, opposing nationalization, and lobbying for continued integration. Confronting them risks political instability. Accommodating them undermines your strategy.

What do you do?`,
      choices: [
        { id: 'confront', text: 'Confront and marginalize the comprador elite', consequence: 'You risk political conflict.', effects: { sovereignty: 15, publicSupport: 12, economicStrength: -5 } },
        { id: 'coopt', text: 'Co-opt some, isolate others', consequence: 'You divide and rule.', effects: { sovereignty: 5, economicStrength: 5, publicSupport: 3 } },
        { id: 'gradual', text: 'Gradual transformation — avoid open confrontation', consequence: 'You move slowly to avoid rupture.', effects: { sovereignty: 3, economicStrength: 3 } },
      ],
    },
    {
      phase: 5,
      title: 'The Delinking Assessment',
      narrative: `Your term ends. Delinking has been difficult. Foreign capital fled. International pressure was intense. Technical and managerial capacity was stretched.

But you have food sovereignty. Your resources are under national control. You are not dancing to IMF conditionality. A different path — difficult, contested, uncertain — has been opened.

How do you assess the Amin experiment?`,
      choices: [
        { id: 'sovereign', text: 'Sovereign development achieved', consequence: 'You claim the delinking victory.', effects: { sovereignty: 15, economicStrength: 5 }, endingIndex: 0 },
        { id: 'struggle', text: 'The struggle continues', consequence: 'You acknowledge the unfinished work.', effects: { sovereignty: 10, publicSupport: 8 }, endingIndex: 1 },
        { id: 'costs', text: 'Costs were high — was it worth it?', consequence: 'You question the price paid.', effects: { sovereignty: 5, economicStrength: -3 }, endingIndex: 2 },
      ],
    },
  ],
};

const endings: LongFormEnding[] = [
  {
    id: 'victory',
    endingType: 'victory',
    title: 'Sovereign Development',
    endingNarrative: `The Republic of Uhuru has established a foundation for sovereign development. Whether through import substitution, managed integration, or radical delinking, you have reduced dependence and built domestic capacity.

Industries operate where none existed. Food security has improved. Resources serve national priorities. The development path — while contested and difficult — is increasingly on your own terms.

The next government inherits a country less subject to external dictates than most of its peers. Whether this sovereignty enables prosperity remains to be seen, but the possibility now exists.`,
  },
  {
    id: 'partial',
    endingType: 'partial_victory',
    title: 'Uneven Development',
    endingNarrative: `Uhuru has made progress, but development remains uneven and contested. Some regions have advanced; others lag. Some sectors thrive; others struggle. Different groups have benefited unequally from your chosen strategy.

The path you chose — ISI, export-led, or delinking — produced real gains but also real gaps. Perhaps the scale was insufficient, or the external pressures too great, or the internal contradictions too sharp.

The next government faces similar dilemmas: how to deepen development, spread its benefits, and maintain momentum against headwinds that have not disappeared.`,
  },
  {
    id: 'defeat',
    endingType: 'defeat',
    title: 'Persistent Underdevelopment',
    endingNarrative: `Despite independence, despite your efforts, underdevelopment persists. The strategy you pursued — whether blocked by external pressures, undermined by internal opposition, or simply mismatched to conditions — has not transformed Uhuru's position in the global economy.

Foreign capital still dictates terms. Debt still constrains policy. The population still awaits the fruits of independence. The comprador elite still profits from the status quo.

The next government will face the same fundamental challenge: how a peripheral country can develop on its own terms when the global economy is structured to prevent exactly that.`,
  },
];

const { getNode } = createArcBasedTree(
  [introArc, isiArc, exportLedArc, delinkingArc],
  endings,
  (choiceIdx) => (choiceIdx === 0 ? 0 : choiceIdx === 1 ? 1 : 2),
);

export { getNode };
