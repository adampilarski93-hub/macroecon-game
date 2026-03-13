import type { DecisionBlock, LongFormEnding, ScenarioArc } from '../long-form-tree';
import { createArcBasedTree } from '../long-form-tree';

/**
 * Emerging Debt Crisis — Republic of Meridia
 * Dynamic Narrative Paths (Hudson vs Tooze vs Kadri)
 *
 * Each specialized arc: 7 blocks total.
 *   Block 0 (opener, always shown) + blocks 1–5 (pool, pick 4) + block 6 (closer, always shown)
 *   = 6 decisions per arc + 1 intro = 7 total decisions per playthrough.
 */

const introArc: ScenarioArc = {
  id: 'start',
  blocks: [
    {
      phase: 1,
      title: 'The Debt Trap',
      narrative: `You've just been appointed finance minister of the Republic of Meridia. The economy is in trouble: public debt stands at 65% of GDP and rising. Your borrowing costs are set to balloon.

Some analysts argue that international debt often functions as a tool of control — creditors use it to impose policies that serve their interests. How do you frame your initial response?`,
      choices: [
        { id: 'hudson', text: 'Challenge the "Creditor Cartel"', consequence: 'Frame debt as a mechanism of extraction.', effects: { sovereignty: 5, debtBurden: 2 }, nextArc: 'hudson' },
        { id: 'tooze', text: 'Manage the "Polycrisis"', consequence: 'Frame this as a complex political challenge.', effects: { internationalStanding: 5, economicStrength: -2 }, nextArc: 'tooze' },
        { id: 'kadri', text: 'Prioritize Sovereign Development', consequence: 'Frame debt as an obstacle to industrialization.', effects: { economicStrength: 5, sovereignty: 2 }, nextArc: 'kadri' },
      ],
    },
  ],
};

// ════════════════════════════════════════════════════════════════
// HUDSON ARC — Debt jubilee, FIRE sector parasitism, rentierism
// ════════════════════════════════════════════════════════════════

const hudsonArc: ScenarioArc = {
  id: 'hudson',
  blockPool: [1, 2, 3, 4, 5],
  blockPoolCount: 4,
  blocks: [
    // ── Block 0 — ALWAYS SHOWN (arc opener) ──────────────────
    {
      phase: 2,
      title: 'The Debt Jubilee',
      narrative: `Michael Hudson argues that unpayable debts should be cancelled to prevent social collapse. You propose a partial "Debt Jubilee" for domestic borrowers and demand a haircut from international creditors. The IMF is furious, calling it a "violation of market norms."

Hudson points to deep historical precedent — from Mesopotamian clean slates to the Biblical jubilee year. The question is not whether unpayable debts will be cancelled, but whether they'll be cancelled in an orderly way or through social collapse.`,
      choices: [
        { id: 'hold_firm', text: 'Hold firm on the Jubilee', consequence: 'Prioritize the social fabric over creditors.', effects: { publicSupport: 15, debtBurden: -15, internationalStanding: -10 } },
        { id: 'compromise', text: 'Negotiate a restructuring', consequence: 'Seek orderly debt reduction through creditor negotiation.', effects: { debtBurden: -8, internationalStanding: 5, publicSupport: 3 } },
        { id: 'selective', text: 'Cancel only domestic debts', consequence: 'Protect citizens but honor foreign obligations — for now.', effects: { publicSupport: 10, debtBurden: -5, wageShare: 5 } },
      ],
    },

    // ── Block 1 — POOL ───────────────────────────────────────
    {
      phase: 2,
      title: 'Diagnosing the FIRE Sector',
      narrative: `Hudson's research reveals a pattern: Meridia's Finance, Insurance, and Real Estate (FIRE) sector is extracting wealth from the productive economy. Bank profits are soaring while manufacturing output falls. Real estate speculation has priced workers out of housing.

Hudson calls this "killing the host" — the financial sector grows like a parasite, feeding on the real economy until it collapses. Your economic team presents three reform strategies.`,
      choices: [
        { id: 'financial_transaction_tax', text: 'Tax financial transactions', consequence: 'A Tobin tax to discourage speculation and fund productive investment.', effects: { economicStrength: 5, debtBurden: -3, priceStability: 3 } },
        { id: 'break_up_banks', text: 'Break up the big banks', consequence: 'Enforce antitrust action against financial monopolies.', effects: { economicStrength: 8, sovereignty: 5, publicSupport: -3 } },
        { id: 'regulate_re', text: 'Cap real estate speculation', consequence: 'Restrict foreign and speculative property purchases to stabilize housing costs.', effects: { publicSupport: 8, wageShare: 5, priceStability: 5, internationalStanding: -5 } },
      ],
    },

    // ── Block 2 — POOL ───────────────────────────────────────
    {
      phase: 3,
      title: 'The IMF Showdown',
      narrative: `The IMF offers Meridia a $4 billion standby arrangement — but with harsh conditions: privatize state utilities, cut public-sector wages by 15%, and remove food subsidies. Hudson warns that IMF conditionality serves creditors, not debtors: "The IMF acts as a creditor cartel's enforcement arm."

From Argentina's 2001 collapse to Greece's 2015 humiliation, IMF programs have often deepened the crises they claim to solve. But rejecting the fund means finding alternative financing while reserves dwindle.`,
      choices: [
        { id: 'reject_imf', text: 'Reject IMF conditions outright', consequence: 'Refuse the creditor cartel and seek alternative financing.', effects: { sovereignty: 12, internationalStanding: -12, debtBurden: 5 } },
        { id: 'counter_propose', text: 'Counter-propose growth-oriented terms', consequence: 'Negotiate for investment-focused conditions instead of austerity.', effects: { economicStrength: 5, internationalStanding: 3, debtBurden: -3 } },
        { id: 'accept_partial', text: 'Accept with carve-outs for essentials', consequence: 'Agree to fiscal consolidation but protect food subsidies and wages.', effects: { debtBurden: -8, publicSupport: -5, wageShare: -3, priceStability: 5 } },
      ],
    },

    // ── Block 3 — POOL ───────────────────────────────────────
    {
      phase: 3,
      title: 'Public Banking',
      narrative: `To bypass what Hudson calls "FIRE sector parasitism," you propose a state-owned development bank to fund productive industry directly. Private banks claim this is "unfair competition" and threaten to pull investment.

Hudson argues that credit should be a public utility, not a private toll booth. In ancient civilizations, credit was created by temples and palaces to finance productive activity, not for private rent extraction. Your proposal would channel lending toward manufacturing, agriculture, and infrastructure rather than speculation.`,
      choices: [
        { id: 'nationalize', text: 'Nationalize key commercial banks', consequence: 'Take direct control of the credit system.', effects: { sovereignty: 10, economicStrength: 8, publicSupport: -5 }, minStats: { sovereignty: 60 } },
        { id: 'pbanking', text: 'Launch the Public Development Bank', consequence: 'Compete with private banks by offering low-interest productive loans.', effects: { economicStrength: 5, sovereignty: 5, wageShare: 3 } },
        { id: 'credit_guidance', text: 'Impose credit guidance on private banks', consequence: 'Require private banks to allocate a share of lending to productive sectors.', effects: { economicStrength: 6, priceStability: 3, internationalStanding: -3 } },
      ],
    },

    // ── Block 4 — POOL ───────────────────────────────────────
    {
      phase: 3,
      title: 'De-Dollarization',
      narrative: `Hudson's "Super Imperialism" thesis holds that the US dollar system enables America to extract tribute from the rest of the world — other nations' savings flow to the US through Treasury purchases. Meridia's dollar-denominated debt means every Fed rate hike squeezes your economy harder.

Your central bank governor proposes reducing dollar dependency. China and several regional blocs have been building alternative payment systems. But the dollar is deeply embedded in Meridia's trade and finance — unwinding that will not be painless.`,
      choices: [
        { id: 'regional_currency', text: 'Launch a regional currency bloc', consequence: 'Build a South-South payment system with neighboring states.', effects: { sovereignty: 10, internationalStanding: -8, priceStability: -5, economicStrength: 5 } },
        { id: 'diversify_reserves', text: 'Diversify foreign reserves gradually', consequence: 'Shift reserves into gold, yuan, and regional currencies over time.', effects: { sovereignty: 5, priceStability: 3, debtBurden: -3 } },
        { id: 'bilateral_swaps', text: 'Negotiate bilateral currency swaps', consequence: 'Trade with key partners in local currencies to reduce dollar exposure.', effects: { economicStrength: 3, sovereignty: 5, internationalStanding: 3 } },
      ],
    },

    // ── Block 5 — POOL ───────────────────────────────────────
    {
      phase: 4,
      title: 'The Rentier Counterattack',
      narrative: `Your reforms have provoked a backlash from what Hudson calls the "rentier class" — financial elites who profit from debt, rent, and monopoly rather than production. Capital flight accelerates. Foreign credit agencies downgrade Meridia's bonds. A media campaign funded by banking interests warns of "Venezuelan-style collapse."

Hudson predicted this: creditors never accept losses willingly. The question is whether your government has built enough popular support and institutional capacity to weather the storm.`,
      choices: [
        { id: 'capital_controls', text: 'Impose emergency capital controls', consequence: 'Stop the bleeding — trap capital inside the country to prevent flight.', effects: { sovereignty: 8, economicStrength: -5, priceStability: -3, debtBurden: -5 } },
        { id: 'popular_mobilization', text: 'Rally public support against the rentiers', consequence: 'Use transparency and public education to build a mandate for reform.', effects: { publicSupport: 12, wageShare: 5, internationalStanding: -5 } },
        { id: 'strategic_concessions', text: 'Offer targeted concessions to key investors', consequence: 'Stabilize markets by reassuring select creditors while continuing reforms.', effects: { priceStability: 8, internationalStanding: 5, publicSupport: -8 } },
      ],
    },

    // ── Block 6 — ALWAYS SHOWN (arc closer / resolution) ─────
    {
      phase: 5,
      title: 'Resisting Debt Deflation',
      narrative: `Debt deflation is crushing demand — exactly as Hudson warned. When debts grow faster than income, the economy enters a deflationary spiral: falling prices raise the real debt burden, triggering more defaults, triggering more deflation. Hudson argues the only escape is to prioritize the productive economy over the rentier class.

Your final budget must chart Meridia's course. The choices you make here will determine whether the country breaks free from the debt trap or sinks deeper into it.`,
      choices: [
        { id: 'wealth_tax', text: 'Implement a progressive wealth tax', consequence: 'Tax the rentiers to fund productive investment and a basic goods guarantee.', effects: { publicSupport: 12, economicStrength: 5, debtBurden: -5, wageShare: 8 } },
        { id: 'stimulus', text: 'Launch a deficit-funded stimulus', consequence: 'Use traditional Keynesian spending to reflate the economy.', effects: { economicStrength: 8, debtBurden: 10, publicSupport: 5 } },
        { id: 'mixed', text: 'Combine wealth tax with targeted stimulus', consequence: 'Tax unproductive wealth while investing in infrastructure and manufacturing.', effects: { economicStrength: 6, debtBurden: 2, publicSupport: 5, wageShare: 5 } },
      ],
    },
  ],
};

// ════════════════════════════════════════════════════════════════
// TOOZE ARC — Polycrisis, financial crises as political events
// ════════════════════════════════════════════════════════════════

const toozeArc: ScenarioArc = {
  id: 'tooze',
  blockPool: [1, 2, 3, 4, 5],
  blockPoolCount: 4,
  blocks: [
    // ── Block 0 — ALWAYS SHOWN (arc opener) ──────────────────
    {
      phase: 2,
      title: 'Polycrisis Management',
      narrative: `Adam Tooze describes our era as a "polycrisis" — financial, climate, and geopolitical shocks that interact and amplify each other. Right on cue, a sudden commodity price spike hits Meridia just as the debt crisis deepens.

Tooze's key insight: there is no neutral, technocratic response to a crisis. Every decision is political. The question is who bears the cost — and whether you acknowledge that openly or hide behind "market forces."`,
      choices: [
        { id: 'swap_lines', text: 'Activate swap lines with major powers', consequence: 'Leverage geopolitical relationships for liquidity.', effects: { internationalStanding: 10, priceStability: 8, sovereignty: -5 } },
        { id: 'price_controls', text: 'Implement emergency price controls', consequence: 'Shield consumers through direct state intervention.', effects: { publicSupport: 10, priceStability: 5, economicStrength: -3 } },
        { id: 'strategic_reserves', text: 'Release strategic commodity reserves', consequence: 'Use state stockpiles to dampen the price spike temporarily.', effects: { priceStability: 8, economicStrength: -2, sovereignty: 3 } },
      ],
    },

    // ── Block 1 — POOL ───────────────────────────────────────
    {
      phase: 2,
      title: 'The Crash Arrives',
      narrative: `As Tooze documented in "Crashed," the 2008 financial crisis proved that markets don't self-correct — they require massive political intervention. Now Meridia's financial system is seizing up. Interbank lending has frozen. Credit markets are paralyzed.

"The decision about who gets bailed out and who doesn't," Tooze writes, "is the most nakedly political act a government can perform." Your central bank governor awaits your direction.`,
      choices: [
        { id: 'emergency_liquidity', text: 'Flood the system with liquidity', consequence: 'Central bank opens emergency lending facilities for all banks.', effects: { priceStability: -5, economicStrength: 8, debtBurden: 8 } },
        { id: 'selective_support', text: 'Support only systemically important banks', consequence: 'Triage the financial system — save the critical, let the rest restructure.', effects: { economicStrength: 3, publicSupport: -5, priceStability: 3 } },
        { id: 'guarantee_deposits', text: 'Guarantee deposits, let banks restructure', consequence: 'Protect citizens\' savings while forcing bank shareholders to absorb losses.', effects: { publicSupport: 10, economicStrength: -3, wageShare: 5 } },
      ],
    },

    // ── Block 2 — POOL ───────────────────────────────────────
    {
      phase: 3,
      title: 'The Death of Ordoliberalism',
      narrative: `Austerity is failing, just as Tooze documented in the European case. GDP is contracting, tax revenue is falling, and the debt ratio is rising BECAUSE of spending cuts, not despite them. This is the austerity paradox: cutting spending in a recession deepens the recession.

Tooze argues that the European debt crisis proved ordoliberalism — the belief that strict fiscal rules produce stability — is intellectually bankrupt. The question is what replaces it.`,
      choices: [
        { id: 'green_plan', text: 'Launch a Green Industrial Plan', consequence: 'Massive state-led investment in renewable energy and infrastructure.', effects: { economicStrength: 12, publicSupport: 8, debtBurden: 15, wageShare: 5 } },
        { id: 'fiscal_rules', text: 'Preserve fiscal rules with flexibility', consequence: 'Maintain market confidence through credible medium-term consolidation.', effects: { internationalStanding: 10, debtBurden: -5, economicStrength: -5 } },
        { id: 'industrial_policy', text: 'Pursue targeted industrial policy', consequence: 'Direct state investment into strategic sectors without broad fiscal expansion.', effects: { economicStrength: 8, debtBurden: 5, priceStability: 3 } },
      ],
    },

    // ── Block 3 — POOL ───────────────────────────────────────
    {
      phase: 3,
      title: 'Dollar Hierarchy',
      narrative: `Tooze's work reveals that the global financial system is a hierarchy with the US Federal Reserve at the apex. During the 2008 and 2020 crises, the Fed extended dollar swap lines to select allies — but never to countries like Meridia. Without access to dollars, your currency is under severe pressure.

This is not a market outcome — it's a political structure. Countries at the top of the dollar hierarchy can print their way out of crises. Countries at the bottom must endure austerity, devaluation, or both.`,
      choices: [
        { id: 'seek_fed_line', text: 'Lobby for a Fed swap line', consequence: 'Attempt to gain access to the dollar hierarchy through diplomatic channels.', effects: { internationalStanding: 8, sovereignty: -8, priceStability: 10 } },
        { id: 'alternative_liquidity', text: 'Build alternative liquidity sources', consequence: 'Negotiate with regional blocs and new development banks for emergency credit.', effects: { sovereignty: 8, priceStability: 5, internationalStanding: -5 } },
        { id: 'managed_devaluation', text: 'Accept managed devaluation', consequence: 'Let the currency fall to restore competitiveness — painful but sovereign.', effects: { economicStrength: 5, priceStability: -10, wageShare: -5, sovereignty: 5 } },
      ],
    },

    // ── Block 4 — POOL ───────────────────────────────────────
    {
      phase: 3,
      title: 'Compounding Shocks',
      narrative: `A severe drought devastates Meridia's agricultural heartland. Food prices surge. This is Tooze's "polycrisis" in action — climate, financial, and debt crises reinforcing each other. Each shock makes the others worse: the drought reduces GDP, worsening the debt ratio, raising borrowing costs, forcing cuts to the drought relief budget.

Your cabinet is divided. The finance ministry says you can't afford relief spending. The agriculture ministry says millions face hunger. The defense ministry warns of rural unrest.`,
      choices: [
        { id: 'emergency_relief', text: 'Declare a food emergency with full funding', consequence: 'Prioritize human survival over fiscal targets.', effects: { publicSupport: 12, debtBurden: 8, wageShare: 3, priceStability: -5 } },
        { id: 'international_aid', text: 'Appeal for international humanitarian aid', consequence: 'Seek external assistance to cover the gap.', effects: { internationalStanding: 5, publicSupport: 3, sovereignty: -5 } },
        { id: 'food_sovereignty', text: 'Launch a long-term food sovereignty program', consequence: 'Invest in resilient agriculture and strategic grain reserves.', effects: { economicStrength: 5, priceStability: 5, debtBurden: 5, publicSupport: 5 } },
      ],
    },

    // ── Block 5 — POOL ───────────────────────────────────────
    {
      phase: 4,
      title: 'The Social Backlash',
      narrative: `Mass protests erupt across Meridia. Workers demand wage protection. Students occupy universities. Small business owners blockade highways. Tooze emphasizes that economic crises are always political crises — the legitimacy of your government is at stake.

"The question in a crisis is not whether to intervene but how — and on whose behalf." Your response will determine whether the reform program survives or collapses under popular pressure.`,
      choices: [
        { id: 'social_compact', text: 'Negotiate a new social compact', consequence: 'Bring unions, business, and civil society into a tripartite agreement on burden-sharing.', effects: { publicSupport: 10, wageShare: 8, economicStrength: 3, priceStability: -3 } },
        { id: 'double_down', text: 'Call a referendum to validate the program', consequence: 'Seek a direct democratic mandate for your economic reforms.', effects: { publicSupport: 5, sovereignty: 8, internationalStanding: -5 } },
        { id: 'emergency_jobs', text: 'Launch emergency public employment', consequence: 'Create a jobs guarantee program to absorb the unemployed.', effects: { publicSupport: 8, wageShare: 10, debtBurden: 10, economicStrength: 5 } },
      ],
    },

    // ── Block 6 — ALWAYS SHOWN (arc closer / resolution) ─────
    {
      phase: 5,
      title: 'Political Intervention',
      narrative: `A major bank is on the verge of collapse — its balance sheet is riddled with bad debt from the pre-crisis speculation boom. Tooze argues that such moments are purely political: "There is no technical, apolitical answer to the question of who bears the losses."

The bank's failure would trigger contagion across the financial system. But bailing it out would transfer private losses to the public. This is the defining political choice of the crisis — and it will be remembered for a generation.`,
      choices: [
        { id: 'bailout', text: 'Conditional bailout with strict reforms', consequence: 'Stabilize the system but impose executive pay caps, lending requirements, and public equity stakes.', effects: { economicStrength: 5, debtBurden: 8, publicSupport: 5, priceStability: 5 } },
        { id: 'fail', text: 'Let it fail with deposit protection', consequence: 'Allow the bank to collapse but guarantee all deposits. Shareholders and bondholders absorb losses.', effects: { economicStrength: -10, debtBurden: -5, publicSupport: 5, sovereignty: 5 } },
        { id: 'nationalize_bank', text: 'Nationalize and restructure', consequence: 'Take the bank into public ownership, clean up bad assets, relaunch as a public institution.', effects: { sovereignty: 10, economicStrength: 3, publicSupport: 8, internationalStanding: -8 } },
      ],
    },
  ],
};

// ════════════════════════════════════════════════════════════════
// KADRI ARC — Deindustrialization, comprador class, sovereignty
// ════════════════════════════════════════════════════════════════

const kadriArc: ScenarioArc = {
  id: 'kadri',
  blockPool: [1, 2, 3, 4, 5],
  blockPoolCount: 4,
  blocks: [
    // ── Block 0 — ALWAYS SHOWN (arc opener) ──────────────────
    {
      phase: 2,
      title: 'Resisting Deindustrialization',
      narrative: `Ali Kadri warns that imperialist debt traps are designed to deindustrialize the periphery — forcing debtor nations to sell productive assets and abandon industrialization in favor of raw material export. Sure enough, foreign firms are buying up Meridia's strategic assets at fire-sale prices.

Kadri documents how this happened across the Arab world: developmental states were systematically dismantled through structural adjustment, privatization, and outright military intervention. The pattern is now unfolding in Meridia.`,
      choices: [
        { id: 'block_sales', text: 'Block all strategic asset sales', consequence: 'Protect national productive capacity at the cost of foreign investor confidence.', effects: { sovereignty: 12, economicStrength: 5, internationalStanding: -8 } },
        { id: 'negotiate', text: 'Negotiate joint ventures with state oversight', consequence: 'Allow foreign investment but retain state control of strategic direction.', effects: { economicStrength: 8, internationalStanding: 5, sovereignty: -3 } },
        { id: 'selective_nationalize', text: 'Nationalize the most critical industries', consequence: 'Take key sectors — energy, telecoms, ports — into public ownership.', effects: { sovereignty: 15, publicSupport: 5, internationalStanding: -12, economicStrength: 3 } },
      ],
    },

    // ── Block 1 — POOL ───────────────────────────────────────
    {
      phase: 2,
      title: 'The Resource Drain',
      narrative: `Meridia's natural resource wealth is flowing outward. Kadri argues this is not a "resource curse" but designed extraction: multinational corporations repatriate profits, transfer-price their way out of taxes, and recycle petrodollars through Western banks. The result is that Meridia's resources enrich foreign shareholders while its people remain poor.

Your audit reveals that 70% of resource extraction revenue leaves the country through legal profit repatriation, management fees, and transfer pricing.`,
      choices: [
        { id: 'windfall_tax', text: 'Impose a windfall profits tax on extractors', consequence: 'Capture a larger share of resource rents for Meridia.', effects: { debtBurden: -8, sovereignty: 5, internationalStanding: -5, publicSupport: 5 } },
        { id: 'state_mining', text: 'Create a state resource company', consequence: 'Compete directly with multinationals for extraction rights.', effects: { economicStrength: 8, sovereignty: 8, debtBurden: 5 } },
        { id: 'renegotiate_contracts', text: 'Renegotiate extraction contracts', consequence: 'Demand higher royalties, local processing requirements, and technology transfer.', effects: { economicStrength: 5, sovereignty: 5, wageShare: 5, internationalStanding: -3 } },
      ],
    },

    // ── Block 2 — POOL ───────────────────────────────────────
    {
      phase: 3,
      title: 'The Comprador Challenge',
      narrative: `Local elites — what Samir Amin called the "comprador bourgeoisie" — are moving their capital out of the country. These are the class who profit by serving as intermediaries for foreign capital: importing luxury goods, speculating in real estate, and blocking domestic industrialization.

Kadri emphasizes that development is fundamentally a class struggle: the comprador bourgeoisie benefits from dependency, while workers and productive capitalists benefit from sovereign development. You must choose which class alliance to build.`,
      choices: [
        { id: 'cap_controls', text: 'Impose strict capital controls', consequence: 'Stop the drain of national wealth and force capital into productive domestic investment.', effects: { sovereignty: 10, debtBurden: -5, economicStrength: -5 } },
        { id: 'incentives', text: 'Offer tax incentives for domestic investment', consequence: 'Try to redirect elite capital into production through market signals.', effects: { economicStrength: 5, publicSupport: -8, wageShare: -3 } },
        { id: 'land_reform', text: 'Launch land reform to build a productive base', consequence: 'Redistribute idle land to productive smallholders and cooperatives.', effects: { publicSupport: 10, wageShare: 8, sovereignty: 5, economicStrength: 3 } },
      ],
    },

    // ── Block 3 — POOL ───────────────────────────────────────
    {
      phase: 3,
      title: 'The Structural Adjustment Trap',
      narrative: `The World Bank offers Meridia a $2 billion "development loan" — on the condition that you privatize state utilities, cut public-sector employment by 20%, and eliminate agricultural subsidies. Kadri's research shows this is a pattern: structural adjustment programs systematically destroy developmental states.

The evidence is damning. Across Africa and the Middle East, structural adjustment led to deindustrialization, rising poverty, and increased dependency. But refusing the loan means finding alternative financing while your reserves dwindle.`,
      choices: [
        { id: 'reject_loan', text: 'Reject the loan entirely', consequence: 'Refuse the structural adjustment trap and seek South-South financing alternatives.', effects: { sovereignty: 12, internationalStanding: -10, debtBurden: 3, publicSupport: 8 } },
        { id: 'selective_accept', text: 'Accept funds but protect strategic sectors', consequence: 'Negotiate to privatize non-essential services while protecting industry and agriculture.', effects: { debtBurden: -5, economicStrength: -3, sovereignty: -5, priceStability: 5 } },
        { id: 'counter_development', text: 'Propose your own development framework', consequence: 'Present a sovereignty-preserving plan and demand the Bank fund it on your terms.', effects: { sovereignty: 8, internationalStanding: -3, economicStrength: 5, publicSupport: 5 } },
      ],
    },

    // ── Block 4 — POOL ───────────────────────────────────────
    {
      phase: 3,
      title: 'Building the Productive Base',
      narrative: `Kadri insists that genuine development requires building productive capacity — factories, infrastructure, technical education — rather than simply opening markets. Meridia must decide which sectors to prioritize for sovereign industrialization.

Your planning ministry identifies three strategic options, each with different timelines and trade-offs. Heavy industry takes longer but builds deeper capacity. Light manufacturing creates jobs faster. Agricultural processing leverages existing resources.`,
      choices: [
        { id: 'heavy_industry', text: 'Prioritize heavy industry', consequence: 'Steel, chemicals, and machinery — the foundation of economic sovereignty.', effects: { economicStrength: 12, debtBurden: 10, wageShare: 3, priceStability: -5 }, minStats: { sovereignty: 50 } },
        { id: 'light_manufacturing', text: 'Focus on light manufacturing', consequence: 'Textiles, electronics assembly, and consumer goods for quick job creation.', effects: { economicStrength: 5, wageShare: 8, publicSupport: 5 } },
        { id: 'agro_processing', text: 'Develop agricultural processing', consequence: 'Add value to raw commodities before export — food sovereignty through production.', effects: { economicStrength: 5, priceStability: 5, wageShare: 5, sovereignty: 5 } },
      ],
    },

    // ── Block 5 — POOL ───────────────────────────────────────
    {
      phase: 4,
      title: 'The Sanctions Threat',
      narrative: `Meridia's defiance of the international debt regime has provoked a response. Western powers threaten targeted sanctions — asset freezes on government officials, trade restrictions on key exports, and exclusion from dollar-based payment systems. Kadri would recognize this as a familiar pattern: imperial powers using economic coercion to discipline states that assert sovereignty.

Your intelligence services report that the sanctions coalition is not unified — some trading partners are willing to break ranks. But the threat is real and immediate.`,
      choices: [
        { id: 'defy_sanctions', text: 'Defy sanctions and build new alliances', consequence: 'Pivot to alternative trading partners and payment systems.', effects: { sovereignty: 12, internationalStanding: -10, economicStrength: -5, publicSupport: 8 } },
        { id: 'negotiate_off_ramp', text: 'Negotiate an off-ramp quietly', consequence: 'Make targeted concessions to remove the sanctions threat while preserving core reforms.', effects: { internationalStanding: 8, sovereignty: -5, priceStability: 5, publicSupport: -5 } },
        { id: 'sanctions_proof', text: 'Accelerate import substitution', consequence: 'Use the sanctions threat as motivation to build domestic alternatives faster.', effects: { economicStrength: 8, sovereignty: 8, priceStability: -8, debtBurden: 5 } },
      ],
    },

    // ── Block 6 — ALWAYS SHOWN (arc closer / resolution) ─────
    {
      phase: 5,
      title: 'Sovereign Industrialization',
      narrative: `The moment of truth. Kadri argues that development is a class struggle — it requires choosing between the interests of the comprador bourgeoisie (who profit from dependency) and the working people (who benefit from sovereign production).

You propose a "People's Development Plan" that prioritizes local manufacturing over imports, invests in technical education, and builds infrastructure for domestic industry. This will raise prices in the short term as cheap imports are replaced by domestic production, but it promises long-term economic sovereignty.`,
      choices: [
        { id: 'proceed', text: 'Launch the full plan', consequence: 'Commit to sovereign industrialization regardless of short-term costs.', effects: { economicStrength: 15, sovereignty: 10, priceStability: -10, wageShare: 5 } },
        { id: 'phased', text: 'Phase the plan over five years', consequence: 'Implement gradually to manage the transition and build institutional capacity.', effects: { economicStrength: 8, sovereignty: 5, priceStability: -3, publicSupport: 5 } },
        { id: 'delay', text: 'Delay for economic stability', consequence: 'Prioritize current consumption and price stability over structural transformation.', effects: { priceStability: 8, publicSupport: 5, economicStrength: -5, sovereignty: -5 } },
      ],
    },
  ],
};

// ════════════════════════════════════════════════════════════════
// ENDINGS
// ════════════════════════════════════════════════════════════════

const endings: LongFormEnding[] = [
  {
    id: 'victory',
    endingType: 'victory',
    title: 'Sustainable Path',
    endingNarrative: `You've navigated the debt crisis and charted a new course for Meridia. By choosing a distinct theoretical framework and implementing it with conviction, you demonstrated that economic outcomes are shaped by political choices — not immutable market laws. Meridia's debt burden is manageable, its productive capacity is growing, and its people have reason for hope.`,
  },
  {
    id: 'partial',
    endingType: 'partial_victory',
    title: 'Mixed Legacy',
    endingNarrative: `Your term ends with mixed results. You avoided catastrophe and implemented partial reforms, but the underlying structural issues remain. The debt burden is lighter but not eliminated. The productive base is stronger but still dependent. The next government will inherit both your gains and your compromises — and the struggle for Meridia's economic sovereignty continues.`,
  },
  {
    id: 'defeat',
    endingType: 'defeat',
    title: 'Crisis Deepens',
    endingNarrative: `The crisis has deepened beyond recovery. Inconsistent choices — or external pressure too great to withstand — left Meridia trapped in debt dependency. Deindustrialization accelerates, the comprador class prospers while workers suffer, and the structural adjustment program grinds on. The struggle for Meridia's future continues under even harder conditions.`,
  },
];

export function createNarrativeTree(options?: { shuffle?: boolean; seed?: number }) {
  return createArcBasedTree(
    [introArc, hudsonArc, toozeArc, kadriArc],
    endings,
    (choiceIdx) => (choiceIdx === 0 ? 0 : choiceIdx === 1 ? 1 : 2),
    { shuffleBlocks: options?.shuffle ?? true, seed: options?.seed },
  );
}
