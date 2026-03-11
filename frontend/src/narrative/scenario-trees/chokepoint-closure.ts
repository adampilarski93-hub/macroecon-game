import type { DecisionBlock, LongFormEnding, ScenarioArc } from '../long-form-tree';
import { createArcBasedTree } from '../long-form-tree';

const introArc: ScenarioArc = {
  id: 'start',
  blocks: [
    {
      phase: 1,
      title: 'Chokepoint Crisis',
      narrative: `A critical maritime chokepoint has been shut down by conflict. Tankers are rerouting, insurance premia are spiking, and container schedules are collapsing. Fuel, fertilizer, and food imports are now volatile and expensive.

Your cabinet is split into three strategic lines:

**Emergency Stabilization**: cushion households and firms through the immediate shock.
**Logistics Sovereignty**: rapidly rewire routes, ports, and strategic stocks.
**Diplomatic De-escalation**: prioritize ceasefire channels and corridor agreements.

What path do you choose first?`,
      choices: [
        {
          id: 'stabilize',
          text: 'Emergency Stabilization',
          consequence: 'You prioritize inflation containment and social protection now.',
          effects: { priceStability: 8, publicSupport: 5, debtBurden: 6 },
          nextArc: 'stabilization',
        },
        {
          id: 'logistics',
          text: 'Logistics Sovereignty',
          consequence: 'You focus on rerouting capacity and domestic supply resilience.',
          effects: { sovereignty: 10, externalBalance: 5, debtBurden: 5 },
          nextArc: 'logistics',
        },
        {
          id: 'diplomacy',
          text: 'Diplomatic De-escalation',
          consequence: 'You push for corridor access and negotiated transit rules.',
          effects: { internationalStanding: 10, economicStrength: 3, sovereignty: -3 },
          nextArc: 'diplomacy',
        },
      ],
    },
  ],
};

const stabilizationArc: ScenarioArc = {
  id: 'stabilization',
  blocks: [
    {
      phase: 2,
      title: 'Fuel Price Pass-Through',
      narrative: `Import fuel prices are surging into transport and food costs. A pure rate-hike response can crush demand without fixing supply constraints. This is cost-push inflation—prices rising not because consumers are spending too freely, but because inputs have become scarce and expensive. The distinction matters enormously for policy: during the 1973 OPEC embargo and again in the 2022 energy shock, central banks that treated supply-driven price spikes like overheating demand deepened recessions without lowering underlying costs. Rate hikes work by cooling spending, but when the problem is a missing tanker route, higher interest rates simply pile financial stress on top of physical shortage. Heterodox economists argue that incomes policies and targeted subsidies are better suited to supply shocks—stabilizing the cost of essentials while the logistics bottleneck is resolved rather than punishing households for a disruption they did not cause.`,
      choices: [
        { id: 'targeted-subsidy', text: 'Targeted fuel and food subsidy', consequence: 'Protect essentials for households and logistics.', effects: { publicSupport: 10, priceStability: 5, debtBurden: 8 } },
        { id: 'tighten-hard', text: 'Hard monetary tightening', consequence: 'Signal anti-inflation credibility at risk of slowdown.', effects: { priceStability: 6, economicStrength: -8, publicSupport: -6 } },
        { id: 'incomes-policy', text: 'Incomes policy + temporary price bands', consequence: 'Coordinate wages and key prices while supply adapts.', effects: { priceStability: 8, publicSupport: 4, sovereignty: 3 } },
      ],
    },
    {
      phase: 3,
      title: 'Strategic Reserves',
      narrative: `You can draw reserves now, but restocking later may be costly if the conflict drags on. Strategic petroleum reserves—government-held stockpiles of crude oil and refined fuel—exist precisely for moments like this. The United States has tapped its SPR repeatedly: after Hurricane Katrina in 2005, during the Libyan civil war in 2011, and in a historic 180-million-barrel release during the 2022 energy crisis triggered by the Russia-Ukraine war. Draws provide immediate price relief by putting extra barrels on the market, but they hollow out the buffer against future shocks. Restocking at higher prices can cost billions more than the original fill, and a depleted reserve signals vulnerability to adversaries who may prolong the disruption knowing your cushion is thin.`,
      choices: [
        { id: 'draw-fast', text: 'Draw reserves aggressively', consequence: 'Immediate relief, weaker buffer later.', effects: { priceStability: 10, externalBalance: -8 } },
        { id: 'draw-gradual', text: 'Gradual draw with rationing trigger', consequence: 'Balance relief with resilience.', effects: { priceStability: 6, publicSupport: 5, sovereignty: 4 } },
        { id: 'preserve', text: 'Preserve reserves, no draw', consequence: 'Keep strategic buffer at social cost.', effects: { debtBurden: -4, publicSupport: -10 } },
      ],
    },
    {
      phase: 4,
      title: 'Stabilization Legacy',
      narrative: `The immediate panic is contained, but fiscal and external pressures remain. Stabilization consumed enormous fiscal space—subsidies, reserve drawdowns, and emergency lending all carry forward costs that constrain future budgets. The question now is whether the economy is genuinely more resilient or merely patched: have structural vulnerabilities been addressed, or will the next supply shock hit an already-weakened treasury? History suggests that stabilization without reform is a recurring trap—countries that managed the 1970s oil shocks through price controls and subsidies alone often faced deeper crises in the 1980s when the bills came due. The political economy is also fraught: voters remember the relief but not the debt, making it hard to build support for the harder work of reducing import dependence and diversifying supply chains.`,
      choices: [
        { id: 'success', text: 'Households were protected; inflation stabilized', consequence: 'You defend stabilization-first policy.', effects: { publicSupport: 8, priceStability: 6 }, endingIndex: 0 },
        { id: 'mixed', text: 'Inflation cooled, but debt stress rose', consequence: 'You accept a trade-off outcome.', effects: { debtBurden: 4, priceStability: 4 }, endingIndex: 1 },
        { id: 'strain', text: 'Stability came too late for many households', consequence: 'You concede social costs were too high.', effects: { publicSupport: -6 }, endingIndex: 2 },
      ],
    },
  ],
};

const logisticsArc: ScenarioArc = {
  id: 'logistics',
  blocks: [
    {
      phase: 2,
      title: 'Rerouting Architecture',
      narrative: `Rerouting via longer sea lanes and rail-land bridge alternatives can keep trade alive, but costs surge. Global maritime trade funnels through a handful of narrow passages—Suez, Hormuz, Malacca, Panama—and when one closes, the detour penalties are severe. Rerouting around the Cape of Good Hope instead of transiting Suez adds roughly 3,500 nautical miles and 10–14 days per voyage, multiplying fuel consumption, crew costs, and vessel-day rates. As Laleh Khalili argues in *Sinews of War and Trade*, these chokepoints are not neutral geography but infrastructure of imperial and commercial power—control over a strait is control over the circulatory system of global capitalism. The decision before you is whether to rely on market-driven rerouting, which favors shippers with the deepest pockets, or to impose state coordination that can direct scarce shipping capacity toward essential cargoes.`,
      choices: [
        { id: 'state-led', text: 'State-led emergency logistics command', consequence: 'Centralize routing, port slots, and fuel priority.', effects: { sovereignty: 10, externalBalance: 6, debtBurden: 7 } },
        { id: 'market-led', text: 'Market allocation with targeted guarantees', consequence: 'Use incentives to keep private operators moving.', effects: { economicStrength: 7, debtBurden: 3, publicSupport: -2 } },
        { id: 'regional-pool', text: 'Regional shipping and port coordination pact', consequence: 'Share corridor burden with neighbors.', effects: { externalBalance: 8, internationalStanding: 5, sovereignty: 4 } },
      ],
    },
    {
      phase: 3,
      title: 'Critical Inputs Priority',
      narrative: `Not every import can be protected equally. Prioritization determines who absorbs the shock. Rationing is never purely technical—it is deeply political, because it makes explicit the distributional choices that markets usually obscure. During World War II, the U.S. Office of Price Administration allocated steel, rubber, and fuel through priority ratings that favored military production over consumer goods, while Britain's Ministry of Food managed caloric distribution with remarkable equity. In both cases, the legitimacy of the system depended on perceived fairness: when elites were seen circumventing controls, public compliance collapsed. In a chokepoint crisis, the class dimension is stark—wealthier firms and households can stockpile and source alternatives on the grey market, while workers and small producers bear the brunt of formal shortages.`,
      choices: [
        { id: 'food-medicine', text: 'Prioritize food and medicine first', consequence: 'Social stability rises, industry complains.', effects: { publicSupport: 10, economicStrength: -4, sovereignty: 3 } },
        { id: 'industry-energy', text: 'Prioritize energy and industrial inputs', consequence: 'Keep production lines operating.', effects: { economicStrength: 9, publicSupport: -5, externalBalance: 3 } },
        { id: 'balanced', text: 'Balanced quota system', consequence: 'Moderate protection across sectors.', effects: { publicSupport: 4, economicStrength: 4, priceStability: 3 } },
      ],
    },
    {
      phase: 4,
      title: 'Infrastructure Sprint',
      narrative: `You can lock in long-term resilience through storage, intermodal hubs, and port modernization. History shows that crises can accelerate structural investment that would never pass in normal times—China's Belt and Road Initiative is, at its core, a project of logistics sovereignty, building ports, rail corridors, and pipelines that reduce dependence on chokepoints controlled by rival powers. But infrastructure sprints carry enormous fiscal costs and construction timelines that outlast the crisis that motivated them, creating political risk when voters question why money is still flowing to half-built ports after fuel prices have stabilized. The critical distinction is between reactive infrastructure—rushed, poorly planned, vulnerable to corruption—and strategic infrastructure that reflects long-term trade architecture. The choice is whether to seize this moment of political urgency to build lasting capacity or to conserve fiscal space for the next emergency.`,
      choices: [
        { id: 'build', text: 'Launch logistics infrastructure sprint', consequence: 'High upfront cost, lasting resilience.', effects: { economicStrength: 8, sovereignty: 8, debtBurden: 8 }, endingIndex: 0 },
        { id: 'limited', text: 'Selective upgrades only', consequence: 'Some resilience gains without full overhaul.', effects: { economicStrength: 4, sovereignty: 4 }, endingIndex: 1 },
        { id: 'defer', text: 'Defer upgrades until crisis passes', consequence: 'Save fiscal space now, remain vulnerable later.', effects: { debtBurden: -5, externalBalance: -5 }, endingIndex: 2 },
      ],
    },
  ],
};

const diplomacyArc: ScenarioArc = {
  id: 'diplomacy',
  blocks: [
    {
      phase: 2,
      title: 'Ceasefire Channel',
      narrative: `Backchannel diplomacy could reopen partial transit corridors, but concessions may be required. Maritime conflict mediation has a long, uneven history—from the 19th-century Concert of Europe managing Ottoman straits to UN-brokered shipping lanes during the Iran-Iraq War's Tanker War phase in the 1980s. Neutral parties play a critical role: states with no direct stake in the conflict can host talks and offer guarantees that belligerents cannot credibly extend to each other. But the shipping insurance market often moves faster than diplomats—Lloyd's of London war-risk premiums can make a corridor economically impassable even before a single shot is fired, and insurers' willingness to cover transits through conflict zones depends on credible security assurances that only coordinated naval or diplomatic frameworks can provide.`,
      choices: [
        { id: 'mediate', text: 'Sponsor neutral mediation framework', consequence: 'Build legitimacy and reduce escalation risk.', effects: { internationalStanding: 10, publicSupport: 4 } },
        { id: 'security-coalition', text: 'Join escorted shipping coalition', consequence: 'Transit security improves amid geopolitical costs.', effects: { economicStrength: 6, internationalStanding: 4, sovereignty: -4 } },
        { id: 'non-aligned', text: 'Strict non-aligned stance', consequence: 'Preserve autonomy, slower corridor reopening.', effects: { sovereignty: 8, internationalStanding: -2, externalBalance: -4 } },
      ],
    },
    {
      phase: 3,
      title: 'Transit Bargain',
      narrative: `Parties offer a partial reopening with monitoring terms and restricted cargo categories. Negotiated transit corridors have deep historical precedent: the 1936 Montreux Convention regulates warship passage through the Turkish Straits, while the 1888 Constantinople Convention declared the Suez Canal open to all nations in peace and war—a principle honored more in the breach than the observance. International monitoring carries sovereignty costs: accepting foreign inspectors or naval escorts in your waters implies that your territorial control is conditional, a concession that domestic audiences may reject even when the economic benefits are clear. Partial reopenings also create their own distortions—restricted cargo categories mean some goods flow while others remain blocked, generating arbitrage opportunities and black markets that can undermine the formal agreement from within.`,
      choices: [
        { id: 'accept', text: 'Accept partial reopening terms', consequence: 'Trade resumes unevenly but quickly.', effects: { externalBalance: 8, priceStability: 6, sovereignty: -3 } },
        { id: 'renegotiate', text: 'Push for broader corridor access', consequence: 'Higher upside, risk of delay.', effects: { sovereignty: 5, internationalStanding: 5, priceStability: -3 } },
        { id: 'reject', text: 'Reject terms as too restrictive', consequence: 'Maintain autonomy amid prolonged disruption.', effects: { sovereignty: 8, economicStrength: -7, publicSupport: -6 } },
      ],
    },
    {
      phase: 4,
      title: 'Diplomatic Legacy',
      narrative: `Your strategy rests on reducing geopolitical temperature before domestic damage becomes entrenched. Geopolitical shocks have a way of reshaping trade architecture permanently—the 1956 Suez Crisis accelerated the construction of supertankers designed to circumvent the canal entirely, and the prolonged closure of Suez from 1967 to 1975 redirected oil flows and port investment for a generation. Trade routes rarely snap back to their pre-crisis patterns because firms and states that invested in alternatives have sunk costs they are reluctant to abandon. The fiscal and social costs of prolonged disruption—depleted reserves, accumulated debt, lost output, and eroded public trust—form a legacy that constrains policy space for years. Whether diplomacy delivered fast enough to prevent those costs from hardening into structural damage is the ultimate measure of this path.`,
      choices: [
        { id: 'corridor-win', text: 'You secured a functioning transit corridor', consequence: 'De-escalation restored essential trade.', effects: { internationalStanding: 8, priceStability: 5 }, endingIndex: 0 },
        { id: 'fragile', text: 'Transit reopened, but remains fragile', consequence: 'Progress exists, but instability lingers.', effects: { internationalStanding: 4, externalBalance: 3 }, endingIndex: 1 },
        { id: 'failed', text: 'Negotiations stalled and disruption persisted', consequence: 'Domestic costs mounted before diplomacy delivered.', effects: { economicStrength: -8 }, endingIndex: 2 },
      ],
    },
  ],
};

const endings: LongFormEnding[] = [
  {
    id: 'victory',
    endingType: 'victory',
    title: 'Resilient Through the Chokepoint',
    endingNarrative: `You managed the chokepoint shutdown without systemic collapse. Inflation was contained, trade routes adapted, and political legitimacy held.

The crisis exposed global logistics fragility, but your state used policy, coordination, and strategy to absorb the shock and build resilience.`,
  },
  {
    id: 'partial',
    endingType: 'partial_victory',
    title: 'Stabilized, But Scarred',
    endingNarrative: `You avoided worst-case breakdown, but the costs were real: higher debt, weaker growth, and strained institutions.

The country emerges with lessons and partial reforms, yet remains vulnerable to the next geopolitical rupture.`,
  },
  {
    id: 'defeat',
    endingType: 'defeat',
    title: 'Shock Without Buffer',
    endingNarrative: `The trade-hub shutdown cascaded into prolonged inflation, supply stress, and social fatigue. Emergency policy proved too weak, too late, or too fragmented.

The next leadership inherits an economy still trying to recover from a crisis it did not control.`,
  },
];

export function createNarrativeTree(options?: { shuffle?: boolean; seed?: number }) {
  return createArcBasedTree(
    [introArc, stabilizationArc, logisticsArc, diplomacyArc],
    endings,
    (choiceIdx) => (choiceIdx === 0 ? 0 : choiceIdx === 1 ? 1 : 2),
    { shuffleBlocks: options?.shuffle ?? true, seed: options?.seed },
  );
}

