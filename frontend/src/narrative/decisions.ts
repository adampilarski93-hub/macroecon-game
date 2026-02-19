import type { NarrativeNode } from './types';

/**
 * Sovereign Development Path — Branching narrative decision tree
 *
 * Intellectual framework drawn from:
 * - Michael Hudson: debt as imperial instrument, super-imperialism
 * - Eric Toussaint: odious debt, legitimacy of debt repudiation
 * - Kwame Nkrumah: neo-colonialism, Pan-African solidarity, economic independence
 * - Lina Benabdallah: China-Africa relations, South-South cooperation, training programs
 * - Max Ajl: agrarian question, food sovereignty, decolonial development
 * - Ali Kadri: value transfer, unequal exchange, surplus extraction from periphery
 * - Roland Boer: Chinese socialism, planning-market dialectic
 * - Deng Xiaoping: reform and opening, pragmatic sequencing, SEZs
 * - John Smith: global labor arbitrage, value chains, imperialism of the 21st century
 * - Yingying Fu & Eduardo Olie: South-South development cooperation
 */

export const narrativeNodes: NarrativeNode[] = [

  // ═══════════════════════════════════════
  // PHASE 1: THE OPENING
  // ═══════════════════════════════════════

  {
    id: 'start',
    phase: 1,
    title: 'A Nation at the Crossroads',
    narrative: `You have been elected president of the Republic of Azania, a sub-Saharan African nation of 28 million people. Your country is rich in cobalt, copper, and arable land — yet most of your people live on less than two dollars a day. The colonial economy left behind a single rail line running from the mines to the coast, built not to connect your people but to extract your wealth.

Your predecessor signed a series of loans with Western creditors in the 1990s. The debt has ballooned. Debt service now consumes 40% of government revenue. Roads are crumbling. The sole teaching hospital needs generators because the power grid fails daily. Half the population is under 25 and unemployment among youth exceeds 40%.

Two delegations have requested meetings with you this week. The first is from Beijing, offering infrastructure financing under the Belt and Road Initiative. The second is from the International Monetary Fund, offering a stabilization package. Your finance minister has also drawn up a plan for a domestically-financed development strategy — slower, harder, but beholden to no one.

As Kwame Nkrumah warned: "The essence of neo-colonialism is that the state which is subject to it is, in theory, independent and has all the outward trappings of international sovereignty. In reality its economic system and thus its political policy is directed from outside." The question before you is how — or whether — to accept outside help without surrendering the sovereignty your people fought to win.`,
    choices: [
      {
        id: 'choose_china',
        text: 'Meet with the Chinese delegation',
        consequence: 'You invite the Belt and Road team to present their proposal.',
        effects: { internationalStanding: 5 },
        nextNode: 'china_offer',
      },
      {
        id: 'choose_imf',
        text: 'Meet with the IMF delegation',
        consequence: 'You invite the IMF team to present their stabilization package.',
        effects: { internationalStanding: 5 },
        nextNode: 'imf_offer',
      },
      {
        id: 'choose_self',
        text: 'Pursue a self-reliant development strategy',
        consequence: 'You tell both delegations you will chart your own course.',
        effects: { sovereignty: 10, publicSupport: 5, internationalStanding: -5 },
        nextNode: 'self_reliance',
      },
    ],
  },

  // ═══════════════════════════════════════
  // PHASE 2: THE FINANCING DECISION
  // ═══════════════════════════════════════

  // ── China Branch ──

  {
    id: 'china_offer',
    phase: 2,
    title: 'The Belt and Road Proposal',
    narrative: `The Chinese delegation is led by a veteran development banker who has overseen projects across East Africa. Their proposal is substantial: a $2.4 billion package covering a new railway corridor, a deep-water port, two power plants, and a fiber-optic network. The interest rate is 2% — far below what Western commercial lenders would offer. Construction would begin within six months.

But the details matter. As Lina Benabdallah's research on China-Africa relations shows, Chinese engagement is not monolithic — it ranges from exploitative resource-for-infrastructure swaps to genuine capacity-building partnerships with technical training and knowledge transfer. The terms you negotiate now will determine which kind of relationship this becomes.

The Chinese team presents three possible arrangements. The first is a turnkey package: Chinese state firms build everything, Chinese workers do the labor, and repayment is partially guaranteed by future mineral exports. Fast and efficient, but your people don't learn to build, and your cobalt is pledged for decades. The second adds technology transfer clauses and requires 60% local labor. The third is a smaller, more targeted partnership focused on the power grid and digital infrastructure, leaving the railway and port for later.

Your finance minister warns that any version increases your debt-to-GDP ratio significantly. Your labor minister argues that without local hiring requirements, the construction boom will bypass Azanian workers entirely.`,
    choices: [
      {
        id: 'china_full',
        text: 'Accept the full turnkey package — speed is essential',
        consequence: 'You sign the comprehensive deal. Chinese construction teams begin arriving within weeks.',
        effects: { infrastructure: 25, debtBurden: 25, sovereignty: -15, economicStrength: 10, publicSupport: -5 },
        nextNode: 'china_construction_boom',
      },
      {
        id: 'china_negotiate',
        text: 'Insist on technology transfer and local labor requirements',
        consequence: 'After tough negotiations, you secure a modified deal with training programs and 60% local hiring.',
        effects: { infrastructure: 15, debtBurden: 18, sovereignty: -5, economicStrength: 8, humanDevelopment: 8, publicSupport: 5 },
        nextNode: 'china_tech_partnership',
      },
      {
        id: 'china_partial',
        text: 'Accept only the power grid and digital infrastructure components',
        consequence: 'You take the targeted package, keeping your options open for other projects.',
        effects: { infrastructure: 10, debtBurden: 10, sovereignty: 0, economicStrength: 5, publicSupport: 3 },
        nextNode: 'china_selective',
      },
    ],
  },

  // ── IMF Branch ──

  {
    id: 'imf_offer',
    phase: 2,
    title: 'The Structural Adjustment Package',
    narrative: `The IMF team arrives with a familiar prescription. Their Extended Credit Facility would provide $1.8 billion in tranches over three years, conditional on a set of "structural reforms." The conditions include: cutting public sector wages by 15%, privatizing the state mining company (Azania Minerals Corp), removing fuel and food subsidies, liberalizing the capital account, and maintaining a primary fiscal surplus of 3% of GDP.

Michael Hudson's analysis of IMF lending is unsparing: the Fund's conditionality systematically transfers wealth from debtor nations to creditor nations, forcing austerity that shrinks economies while ensuring debt service continues flowing outward. Eric Toussaint's decades of research with the Committee for the Abolition of Illegitimate Debt documents how these programs have devastated living standards across the Global South while enriching financial centers.

Your economic advisor points out that the previous structural adjustment program in the 1990s led to the closure of 200 factories, the collapse of the textile sector, and the emigration of a generation of educated youth. But the IMF imprimatur would reassure Western investors, stabilize the currency, and unlock additional lending from the World Bank and bilateral donors.

The IMF team presents flexibility on sequencing but not on the fundamental direction. They are willing to negotiate which reforms come first, but privatization and liberalization are non-negotiable.`,
    choices: [
      {
        id: 'imf_full',
        text: 'Accept the full structural adjustment program',
        consequence: 'You sign the agreement. The first tranche arrives, and austerity measures begin immediately.',
        effects: { debtBurden: 5, sovereignty: -20, economicStrength: -5, publicSupport: -15, internationalStanding: 15 },
        nextNode: 'imf_austerity',
      },
      {
        id: 'imf_negotiate',
        text: 'Accept fiscal conditions but protect Azania Minerals Corp from privatization',
        consequence: 'After weeks of negotiation, you reach a compromise. The mining company stays public, but other conditions remain.',
        effects: { debtBurden: 8, sovereignty: -10, economicStrength: -3, publicSupport: -8, internationalStanding: 10 },
        nextNode: 'imf_partial',
      },
      {
        id: 'imf_minimal',
        text: 'Take a smaller facility with fewer conditions and supplement with regional bonds',
        consequence: 'You accept a reduced IMF package and issue bonds on the African continental market.',
        effects: { debtBurden: 12, sovereignty: -5, publicSupport: -3, internationalStanding: 5 },
        nextNode: 'imf_minimal_path',
      },
    ],
  },

  // ── Self-Reliance Branch ──

  {
    id: 'self_reliance',
    phase: 2,
    title: 'The Sovereign Path',
    narrative: `You announce at a press conference that Azania will chart its own development course. The reaction is immediate: Western financial media warns of "economic nationalism," credit rating agencies put you on negative watch, and your finance minister receives anxious calls from bondholders. But in the streets of the capital, there is a surge of national pride.

Your development team presents three priority strategies. The first, inspired by what Max Ajl calls the "agrarian path to development," would focus on land reform and agricultural modernization — ensuring food sovereignty before pursuing industrialization. As Ajl argues, the peasant question is the development question: no country has industrialized sustainably without first solving food security.

The second strategy follows the model Ali Kadri describes in his analysis of surplus retention: nationalize the mining sector, capture the full value of mineral exports rather than letting it flow to foreign shareholders, and reinvest that surplus domestically. This is the path Bolivia took with lithium, and what Nkrumah attempted with gold and cocoa.

The third is the long game: invest heavily in education and healthcare, build human capital, and wait for the demographic dividend. This echoes the early stages of several East Asian development stories, though your people are hungry now and patience has limits.

None of these paths is easy. All require sacrifice. But as Deng Xiaoping said when launching China's reforms: "We are crossing the river by feeling the stones."`,
    choices: [
      {
        id: 'self_agro',
        text: 'Prioritize land reform and food sovereignty',
        consequence: 'You announce a comprehensive agrarian reform program.',
        effects: { sovereignty: 10, publicSupport: 10, economicStrength: 3, humanDevelopment: 5, internationalStanding: -5 },
        nextNode: 'agro_reform',
      },
      {
        id: 'self_mining',
        text: 'Nationalize the mining sector and capture surplus value',
        consequence: 'You announce the nationalization of Azania Minerals Corp and foreign mining concessions.',
        effects: { sovereignty: 15, economicStrength: 8, publicSupport: 8, internationalStanding: -15, debtBurden: -5 },
        nextNode: 'mining_national',
      },
      {
        id: 'self_education',
        text: 'Invest in education and human capital as the foundation',
        consequence: 'You launch a national education and healthcare campaign.',
        effects: { sovereignty: 5, humanDevelopment: 15, publicSupport: 8, economicStrength: 2 },
        nextNode: 'education_investment',
      },
    ],
  },

  // ═══════════════════════════════════════
  // PHASE 3: CONSEQUENCES & IMPLEMENTATION
  // ═══════════════════════════════════════

  // ── China Full Path ──

  {
    id: 'china_construction_boom',
    phase: 3,
    title: 'The Construction Boom',
    narrative: `Within months, Azania is transformed into a construction site. Chinese engineering firms pour in with heavy equipment. The railway corridor takes shape with astonishing speed. But as the cranes rise, so do tensions.

Local contractors are shut out of the supply chain. Chinese workers live in separate compounds, and rumors spread — some true, some exaggerated — about labor conditions and environmental damage. The opposition calls you a "sell-out" who traded sovereignty for concrete. A leaked contract clause reveals that in the event of default, China would gain operational control of the deep-water port for 99 years — echoing the kind of arrangements that John Smith identifies as the modern face of imperialism, where value extraction occurs through control of infrastructure rather than direct colonial administration.

Meanwhile, global cobalt prices have dropped 30%. Your debt service payments are denominated in dollars, but your revenue is falling. The finance minister warns that without restructuring, you'll be in debt distress within two years.

You need to act before the crisis deepens.`,
    choices: [
      {
        id: 'china_boom_renegotiate',
        text: 'Seek renegotiation of the debt terms with Beijing',
        consequence: 'You request a meeting with Chinese officials to discuss restructuring.',
        effects: { debtBurden: -8, sovereignty: 5, internationalStanding: -3 },
        nextNode: 'china_renegotiate',
      },
      {
        id: 'china_boom_diversify',
        text: 'Diversify the economy rapidly — use the new infrastructure to attract manufacturing',
        consequence: 'You launch a special economic zone program along the new railway corridor.',
        effects: { economicStrength: 10, sovereignty: -3, infrastructure: 5, publicSupport: -3 },
        nextNode: 'china_sez',
      },
      {
        id: 'china_boom_populist',
        text: 'Demand local content requirements and threaten to halt construction',
        consequence: 'You announce new local content laws and suspend two construction permits.',
        effects: { sovereignty: 10, publicSupport: 10, infrastructure: -5, internationalStanding: -8, debtBurden: 3 },
        nextNode: 'china_confrontation',
      },
    ],
  },

  // ── China Negotiate Path ──

  {
    id: 'china_tech_partnership',
    phase: 3,
    title: 'The Technology Transfer',
    narrative: `The negotiated deal is more complex to implement but is beginning to bear fruit. Chinese engineers work alongside Azanian trainees on the power plant construction. A vocational training center has graduated its first class of electricians and welders. The fiber-optic network is creating a tech startup scene in the capital.

Lina Benabdallah's research documents exactly this dynamic: when African states negotiate firmly, Chinese partnerships can include genuine capacity-building — training programs, scholarships, and knowledge transfer that outlast the infrastructure projects themselves. Your education minister reports that 2,000 Azanian workers are now certified in advanced construction techniques.

But the project is behind schedule. Local labor is less experienced, and quality control issues have delayed the railway by eight months. The Chinese project manager is frustrated. Beijing is asking whether you want to "accelerate" by relaxing the local content requirements. Your infrastructure minister argues the delays are an investment in learning. Your finance minister says every month of delay costs $15 million in foregone economic activity.

Meanwhile, a drought in the southern provinces has created a food crisis. You need to decide how to allocate scarce resources.`,
    choices: [
      {
        id: 'tech_maintain',
        text: 'Maintain local content requirements and redirect funds to drought relief',
        consequence: 'You keep the training program and launch emergency food distribution.',
        effects: { humanDevelopment: 5, publicSupport: 8, infrastructure: -3, economicStrength: -2, sovereignty: 5 },
        nextNode: 'drought_response',
      },
      {
        id: 'tech_accelerate',
        text: 'Relax requirements to finish infrastructure faster, deal with the drought separately',
        consequence: 'You agree to Chinese acceleration terms. The railway pushes forward.',
        effects: { infrastructure: 10, sovereignty: -8, publicSupport: -5, humanDevelopment: -3 },
        nextNode: 'china_accelerated',
      },
      {
        id: 'tech_pan_african',
        text: 'Seek emergency aid from the African Union and neighboring states',
        consequence: 'You appeal to Pan-African solidarity and maintain your development trajectory.',
        effects: { internationalStanding: 8, publicSupport: 5, sovereignty: 5 },
        nextNode: 'pan_african_solidarity',
      },
    ],
  },

  // ── China Selective Path ──

  {
    id: 'china_selective',
    phase: 3,
    title: 'Power and Connectivity',
    narrative: `The targeted approach is working. The new power plants have cut blackouts by 70%. The fiber-optic backbone has connected every provincial capital. Mobile money transactions have tripled. Small businesses are growing. Your debt is manageable because you only took what you needed.

But the railway and port remain unbuilt. Moving goods from the interior to the coast still takes three days on colonial-era roads. Agricultural exports rot in transit. Mining companies complain about logistics costs. The Chinese are offering to come back and build the railway, but so is a European consortium, and a consortium of African development banks has a third proposal.

Roland Boer's analysis of Chinese socialism suggests that the strength of China's model lies not in ideology but in pragmatic sequencing — doing what works at each stage. Your power and digital infrastructure have created a platform for the next step. The question is who builds it, and on what terms.`,
    choices: [
      {
        id: 'selective_china_return',
        text: 'Return to China for the railway, leveraging your stronger negotiating position',
        consequence: 'With power and connectivity already secured, you negotiate railway terms from a position of strength.',
        effects: { infrastructure: 15, debtBurden: 12, sovereignty: -3, economicStrength: 8 },
        nextNode: 'railway_negotiation',
      },
      {
        id: 'selective_african_banks',
        text: 'Use the African Development Bank consortium — keep it continental',
        consequence: 'You sign with the Pan-African consortium. Construction will be slower but sovereignty is preserved.',
        effects: { infrastructure: 8, debtBurden: 8, sovereignty: 8, internationalStanding: 10 },
        nextNode: 'pan_african_solidarity',
      },
      {
        id: 'selective_compete',
        text: 'Play the offers against each other to extract the best terms',
        consequence: 'You announce competitive bidding. The delegations scramble to improve their offers.',
        effects: { infrastructure: 12, debtBurden: 8, sovereignty: 5, internationalStanding: 3, economicStrength: 5 },
        nextNode: 'competitive_bidding',
      },
    ],
  },

  // ── IMF Full Path ──

  {
    id: 'imf_austerity',
    phase: 3,
    title: 'The Austerity Shock',
    narrative: `The structural adjustment program hits like a hurricane. Public sector workers, who haven't had a raise in years, see their wages cut by 15%. The removal of fuel subsidies doubles transport costs overnight. Food prices spike as import liberalization floods the market with subsidized Western agricultural products, destroying local farmers — exactly the dynamic Ali Kadri describes as "the destruction of productive capacity in the periphery through the mechanisms of free trade."

The privatization of Azania Minerals Corp proceeds at a fire-sale price. A Canadian mining conglomerate acquires 70% of the company for $400 million — roughly one year's worth of the cobalt revenue that used to flow to the state. Your finance minister notes, with bitter irony, that the loan you received from the IMF is now being used to service older debts to Western banks, while the mining wealth that could have financed development is flowing to Toronto.

The streets are not quiet. University students occupy the parliament square. The trade unions call a general strike. The military chief requests a private meeting to discuss "stability."

Michael Hudson would recognize this pattern immediately: the debtor nation is forced to sell assets and cut social spending to service debts, impoverishing itself while enriching the creditor class. The question is whether you can navigate the storm.`,
    choices: [
      {
        id: 'austerity_hold',
        text: 'Hold the course — the IMF program will stabilize the economy if you see it through',
        consequence: 'You give a televised address asking for patience and sacrifice.',
        effects: { publicSupport: -12, economicStrength: 5, internationalStanding: 5, sovereignty: -5 },
        nextNode: 'austerity_deepens',
      },
      {
        id: 'austerity_modify',
        text: 'Go back to the IMF and demand modifications to protect the most vulnerable',
        consequence: 'You request social protection floors and slower subsidy removal.',
        effects: { publicSupport: 5, sovereignty: 3, internationalStanding: -3 },
        nextNode: 'imf_renegotiate',
      },
      {
        id: 'austerity_break',
        text: 'Break with the IMF — announce a debt moratorium and emergency social program',
        consequence: 'You suspend debt payments and redirect funds to food security and public works.',
        effects: { sovereignty: 20, publicSupport: 15, internationalStanding: -20, debtBurden: -10, economicStrength: -5 },
        nextNode: 'debt_moratorium',
      },
    ],
  },

  // ── IMF Partial Path ──

  {
    id: 'imf_partial',
    phase: 3,
    title: 'The Compromise',
    narrative: `The compromise is holding, barely. You've kept Azania Minerals Corp in state hands, but the other conditions are taking their toll. Fuel subsidy removal has angered the urban poor. Wage restraints in the public sector are driving teachers and nurses to emigrate. The fiscal surplus target requires cutting infrastructure spending, which means the roads continue to deteriorate.

But there are signs of stability. The currency has stopped falling. Foreign direct investment in the mining sector has increased. The World Bank has approved supplementary loans for healthcare and education. Your credit rating has been upgraded from "junk" to "speculative."

The Chinese ambassador requests a private meeting. China is willing to offer infrastructure financing on favorable terms — but only if you steer the next mining concession their way. The Americans warn, through diplomatic channels, that any significant Chinese involvement would "complicate" your relationship with Washington. You're caught in the geopolitical crossfire that increasingly defines the choices available to Global South nations.`,
    choices: [
      {
        id: 'partial_lean_china',
        text: 'Accept the Chinese infrastructure offer and grant the mining concession',
        consequence: 'You open a second front of international engagement. Washington is displeased.',
        effects: { infrastructure: 12, sovereignty: -5, debtBurden: 8, internationalStanding: -5, economicStrength: 8 },
        nextNode: 'geopolitical_balancing',
      },
      {
        id: 'partial_stay_course',
        text: 'Stay within the Western financing framework and seek additional World Bank support',
        consequence: 'You deepen the relationship with multilateral institutions.',
        effects: { internationalStanding: 8, sovereignty: -8, debtBurden: 5, economicStrength: 3 },
        nextNode: 'western_alignment',
      },
      {
        id: 'partial_non_aligned',
        text: 'Refuse both pressures — maintain genuine non-alignment',
        consequence: 'You tell both sides that Azania will not be a pawn in their rivalry.',
        effects: { sovereignty: 12, internationalStanding: 3, publicSupport: 5 },
        nextNode: 'non_aligned_path',
      },
    ],
  },

  // ── IMF Minimal Path ──

  {
    id: 'imf_minimal_path',
    phase: 3,
    title: 'The Regional Approach',
    narrative: `The combination of a small IMF facility and African continental bonds is unconventional, and the markets are watching closely. Your regional bond issuance was oversubscribed — there is appetite among African institutional investors for African sovereign debt, though at higher interest rates than you'd pay to the IMF.

The smaller IMF package means lighter conditionality, but it also means less money. You have enough to stabilize the currency and maintain basic services, but not enough for the infrastructure transformation your country needs. You're in a holding pattern: stable enough not to collapse, constrained enough not to grow.

Eric Toussaint's work suggests a third option that neither the IMF nor conventional markets would endorse: a debt audit. Your country's original debts were contracted by a military dictator in the 1980s, used to buy weapons and enrich cronies. Under international law, this could constitute "odious debt" — illegitimate obligations that a democratic successor government has no obligation to honor. Repudiating these debts would free up enormous fiscal space, but the financial consequences would be severe.`,
    choices: [
      {
        id: 'minimal_debt_audit',
        text: 'Commission a public debt audit and prepare to challenge illegitimate debts',
        consequence: 'You announce a citizen-led audit of all sovereign debt dating back to the military era.',
        effects: { sovereignty: 15, publicSupport: 10, internationalStanding: -15, debtBurden: -15 },
        nextNode: 'debt_audit',
      },
      {
        id: 'minimal_south_south',
        text: 'Seek additional financing through South-South cooperation channels',
        consequence: 'You approach BRICS New Development Bank and the Asian Infrastructure Investment Bank.',
        effects: { debtBurden: 5, infrastructure: 5, internationalStanding: 5, sovereignty: 3 },
        nextNode: 'south_south_finance',
      },
      {
        id: 'minimal_bootstrap',
        text: 'Tighten the belt and try to grow your way out with what you have',
        consequence: 'You implement an austerity-lite program focused on efficiency and domestic revenue.',
        effects: { economicStrength: 5, publicSupport: -5, debtBurden: -3, sovereignty: 5 },
        nextNode: 'bootstrap_development',
      },
    ],
  },

  // ── Self-Reliance: Agrarian Path ──

  {
    id: 'agro_reform',
    phase: 3,
    title: 'Land Reform',
    narrative: `The agrarian reform program is the most ambitious undertaking since independence. You redistribute idle estate land to smallholders, establish state-backed agricultural cooperatives, and invest in irrigation infrastructure. The World Bank warns this will "distort markets." The landed elite threaten legal challenges. But Max Ajl's analysis is clear: without land reform, the rural majority remains trapped in poverty, and without food sovereignty, your nation remains dependent on food imports that drain foreign exchange.

The first harvest under the new system exceeds expectations by 20%. Cooperative farms using improved seeds and shared irrigation produce more per hectare than the old estates. Food imports drop by a third. Rural communities, for the first time in a generation, see a path forward.

But the urban economy has not kept pace. Without major infrastructure investment, factories remain uncompetitive. The capital's middle class grumbles about higher taxes funding "peasant programs." And the old estate owners are funding an opposition movement that accuses you of "destroying property rights."

Internationally, the Western press compares you to Zimbabwe. The Chinese ambassador observes, with studied neutrality, that "China's own reform began with agriculture before moving to industry."`,
    choices: [
      {
        id: 'agro_industrialize',
        text: 'Use agricultural surplus to fund a state-led industrialization program',
        consequence: 'You channel farm profits into light manufacturing and food processing.',
        effects: { economicStrength: 10, infrastructure: 5, sovereignty: 5, publicSupport: 3, debtBurden: 3 },
        nextNode: 'agro_industrial',
      },
      {
        id: 'agro_deepen',
        text: 'Deepen the agrarian program — extend it to export crops and value-added agriculture',
        consequence: 'You expand cooperatives into coffee, cocoa processing, and organic exports.',
        effects: { economicStrength: 8, humanDevelopment: 5, publicSupport: 8, sovereignty: 5, internationalStanding: 3 },
        nextNode: 'agro_export',
      },
      {
        id: 'agro_china_help',
        text: 'Accept Chinese technical assistance for agricultural modernization',
        consequence: 'Chinese agronomists arrive to help with mechanization and hybrid seeds.',
        effects: { economicStrength: 8, infrastructure: 5, humanDevelopment: 5, sovereignty: -5, debtBurden: 5 },
        nextNode: 'agro_china_assist',
      },
    ],
  },

  // ── Self-Reliance: Mining Nationalization Path ──

  {
    id: 'mining_national',
    phase: 3,
    title: 'Nationalization',
    narrative: `The nationalization sends shockwaves through global markets. Azanian cobalt futures spike. The Canadian and Australian mining companies threaten international arbitration. The US State Department issues a "travel advisory" — diplomatic code for economic hostility. Credit rating agencies downgrade you to junk.

But the revenue impact is transformative. Within six months, the state mining company is generating three times the tax revenue the foreign firms ever paid. You're capturing the full surplus value of your natural resources — what Ali Kadri calls "surplus retention," the essential precondition for sovereign development. The money flows into infrastructure, hospitals, and schools.

The foreign mining lobby is not finished, however. They're funding opposition politicians, briefing journalists about "mismanagement," and pressuring your trading partners to impose informal sanctions. Your cobalt still needs to reach global markets, and the supply chains run through companies that are hostile to your government.

Meanwhile, your mining engineers are capable but short-staffed. Production efficiency has dropped 15% since nationalization. You need technical expertise, and you need it without surrendering control.`,
    choices: [
      {
        id: 'mining_china_deal',
        text: 'Offer China a minority stake in exchange for technical expertise and market access',
        consequence: 'You negotiate a 30% Chinese stake with guaranteed technology transfer and training.',
        effects: { economicStrength: 10, sovereignty: -8, debtBurden: -3, internationalStanding: -5, infrastructure: 5 },
        nextNode: 'mining_china_partner',
      },
      {
        id: 'mining_train_domestic',
        text: 'Invest in domestic training — send engineers abroad on scholarships and hire consultants',
        consequence: 'You launch a mining engineering program at the national university.',
        effects: { humanDevelopment: 12, sovereignty: 8, economicStrength: -3, publicSupport: 5 },
        nextNode: 'mining_self_develop',
      },
      {
        id: 'mining_regional',
        text: 'Form a regional minerals cartel with neighboring countries for collective bargaining power',
        consequence: 'You reach out to four neighboring mineral-rich nations to form an OPEC-style cartel.',
        effects: { internationalStanding: 10, sovereignty: 10, economicStrength: 5, publicSupport: 5 },
        nextNode: 'minerals_cartel',
      },
    ],
  },

  // ── Self-Reliance: Education Path ──

  {
    id: 'education_investment',
    phase: 3,
    title: 'The Knowledge Foundation',
    narrative: `You launch the most ambitious education program in Azania's history. Drawing on Cuba's literacy campaign model and Kerala's public health achievements, you deploy 10,000 new teachers and community health workers to rural areas. University enrollment doubles. A new polytechnic opens, focused on engineering and agricultural science.

The results won't show for years, but the signals are encouraging. Maternal mortality drops 25%. Child malnutrition falls. Youth crime declines as community programs provide alternatives. Your human development index begins climbing.

But the economy grows slowly. Infrastructure remains decrepit. The educated youth you're producing can't find jobs that match their skills. A brain drain begins: your best graduates are recruited by European hospitals, Gulf state construction firms, and American tech companies. You're investing in human capital that other countries harvest — what John Smith would recognize as the periphery subsidizing the core through labor arbitrage.

Your opposition says you're building a nation of educated unemployed. Your supporters say you're planting seeds that will bear fruit for generations.`,
    choices: [
      {
        id: 'edu_industrialize',
        text: 'Launch a state-led industrialization program to employ your graduates',
        consequence: 'You create a national development corporation to build factories and tech parks.',
        effects: { economicStrength: 10, infrastructure: 8, debtBurden: 8, sovereignty: 5, publicSupport: 5 },
        nextNode: 'state_industrialization',
      },
      {
        id: 'edu_diaspora',
        text: 'Create incentive programs to retain talent and mobilize the diaspora',
        consequence: 'You establish diaspora bonds, tax incentives for returning professionals, and a tech visa program.',
        effects: { humanDevelopment: 5, economicStrength: 8, publicSupport: 3, internationalStanding: 5 },
        nextNode: 'diaspora_mobilization',
      },
      {
        id: 'edu_sez',
        text: 'Create special economic zones to attract foreign investment that employs local talent',
        consequence: 'You designate three SEZs with tax incentives for companies hiring Azanian graduates.',
        effects: { economicStrength: 12, sovereignty: -8, infrastructure: 5, internationalStanding: 5, publicSupport: -3 },
        nextNode: 'sez_development',
      },
    ],
  },

  // ═══════════════════════════════════════
  // PHASE 4: THE CRUCIBLE
  // ═══════════════════════════════════════

  // Convergent nodes — different paths lead here through different routes

  {
    id: 'china_renegotiate',
    phase: 4,
    title: 'Renegotiating with Beijing',
    narrative: `The renegotiation with China is tense but more productive than expected. Beijing has learned from the Sri Lankan backlash — the global optics of "debt-trap diplomacy" have forced a recalibration. They agree to extend repayment from 20 to 30 years, reduce the interest rate, and convert a portion of debt to equity in a joint infrastructure company where Azania holds 51%.

This is the dynamic Benabdallah documents: Chinese engagement in Africa is not static. It responds to African agency. When states negotiate firmly, the outcomes are materially better. Your team's preparation — detailed knowledge of every contract clause, alternative financing options lined up, and public support at home — gave you leverage.

But the port remains under a 50-year lease. And a new challenge emerges: the European Union has announced a Carbon Border Adjustment Mechanism. Your mining exports to Europe will face punitive tariffs unless you green your energy grid — and the coal power plants China built are now a liability.`,
    choices: [
      {
        id: 'renego_green',
        text: 'Pivot to renewable energy and renegotiate the power plants',
        consequence: 'You approach China about converting the coal plants to solar and wind manufacturing.',
        effects: { infrastructure: 5, sovereignty: 5, internationalStanding: 8, economicStrength: 3, debtBurden: 3 },
        nextNode: 'green_transition',
      },
      {
        id: 'renego_port',
        text: 'Focus on reclaiming the port — it is the key strategic asset',
        consequence: 'You begin legal proceedings to renegotiate the port concession.',
        effects: { sovereignty: 10, internationalStanding: -3, debtBurden: -3 },
        nextNode: 'port_reclamation',
      },
    ],
  },

  {
    id: 'china_sez',
    phase: 4,
    title: 'The Special Economic Zones',
    narrative: `The SEZ program along the railway corridor is attracting investment. Chinese firms relocating from higher-cost provinces set up electronics assembly, textile, and light manufacturing operations. Employment rises. But working conditions in some factories echo the sweatshop dynamics that John Smith documents in global value chains — Azanian workers producing goods for export at wages that barely cover subsistence.

Deng Xiaoping faced similar criticism during China's reform era: the coastal SEZs were called "capitalist enclaves" by leftists within the Party. His response was pragmatic — economic development requires experimentation, and the benefits of growth would eventually spread. But would they?

Your labor minister wants to enforce higher wages and safety standards. The investors threaten to relocate to a neighboring country with cheaper labor. Your youth employment rate has improved dramatically. The factories, for all their problems, are providing the first industrial jobs many workers have ever had.

The question Deng confronted is now yours: how much sovereignty do you compromise for economic growth, and when do you claw it back?`,
    choices: [
      {
        id: 'sez_regulate',
        text: 'Enforce labor standards and accept that some investors will leave',
        consequence: 'You implement a living wage and safety code. Several factories relocate, but the better ones stay.',
        effects: { sovereignty: 10, publicSupport: 8, economicStrength: -5, humanDevelopment: 5 },
        nextNode: 'regulated_industry',
      },
      {
        id: 'sez_upgrade',
        text: 'Focus on upgrading — move from assembly to component manufacturing',
        consequence: 'You offer incentives for companies that bring higher-value production and train local managers.',
        effects: { economicStrength: 10, humanDevelopment: 8, sovereignty: 3, debtBurden: 3 },
        nextNode: 'industrial_upgrading',
      },
    ],
  },

  {
    id: 'china_confrontation',
    phase: 4,
    title: 'The Standoff',
    narrative: `Your local content demands have created a confrontation. The Chinese construction firms are threatening to pull out. Beijing has frozen the next disbursement. Half-built bridges stand as monuments to the impasse. The opposition accuses you of "economic sabotage."

But your gamble has rallied something powerful: national pride. The construction workers' union has organized 50,000 members demanding "Azanian jobs for Azanian projects." Youth movements are marching under banners reading "Sovereignty is not negotiable." Even the military chief has publicly backed your stance.

This is the moment Nkrumah described — when political independence must be defended through economic independence, when the rhetoric of sovereignty meets the material reality of global power. Beijing needs your cobalt. You need their infrastructure. The question is who blinks first, and whether there's a path where nobody needs to.`,
    choices: [
      {
        id: 'confront_negotiate',
        text: 'Offer a face-saving compromise — phase in local content gradually',
        consequence: 'You propose a 5-year escalation: 30% local content now, 60% within five years.',
        effects: { sovereignty: 5, publicSupport: 3, infrastructure: 5, internationalStanding: 5, debtBurden: -3 },
        nextNode: 'pragmatic_resolution',
      },
      {
        id: 'confront_hold',
        text: 'Hold firm — find alternative partners if China walks away',
        consequence: 'You maintain your position and begin talks with Turkey, India, and the EU.',
        effects: { sovereignty: 12, publicSupport: 8, infrastructure: -3, internationalStanding: -5, debtBurden: 5 },
        nextNode: 'sovereignty_stand',
      },
    ],
  },

  {
    id: 'china_accelerated',
    phase: 4,
    title: 'The Price of Speed',
    narrative: `The infrastructure is built. The railway runs. The port hums with activity. Azania's economy is growing at 7% annually. But the growth has a hollow quality. Chinese firms dominate the logistics sector. The technology transfer you hoped for never materialized. Your workers load and unload containers but don't design or manage the systems.

And the debt. The accelerated construction meant accepting higher costs and less favorable terms. Your debt-to-GDP ratio has crossed 80%. Every year, a larger share of export revenue flows to Beijing in debt service — the same dynamic that Hudson documents in US financial hegemony, now reproduced through infrastructure lending.

The population is divided. The urban middle class enjoys new amenities. The rural poor have been bypassed. The youth have jobs, but they see the Chinese managers earning ten times their wages for the same hours.`,
    choices: [
      {
        id: 'accel_assert',
        text: 'Assert greater control — new regulations requiring Azanian management in all projects',
        consequence: 'You mandate that all infrastructure projects must have Azanian directors within 2 years.',
        effects: { sovereignty: 10, economicStrength: -3, publicSupport: 5, humanDevelopment: 5 },
        nextNode: 'late_sovereignty_push',
      },
      {
        id: 'accel_debt_swap',
        text: 'Propose a debt-for-equity swap — give China a stake but reduce the debt',
        consequence: 'You offer Beijing ownership stakes in return for writing down half the outstanding debt.',
        effects: { debtBurden: -15, sovereignty: -10, economicStrength: 5, internationalStanding: -5 },
        nextNode: 'debt_equity_gamble',
      },
    ],
  },

  {
    id: 'drought_response',
    phase: 4,
    title: 'The Drought Crisis',
    narrative: `The drought in the south is worse than the meteorologists predicted. Three provinces declare emergencies. 2 million people face food insecurity. Climate change — a crisis your nation did almost nothing to create — is reshaping your development options.

Your decision to maintain local content requirements has slowed infrastructure construction, but the training programs have produced something unexpected: a cadre of capable Azanian project managers who can organize relief operations efficiently. The fiber-optic network lets you coordinate aid distribution in real time. The capacity you built is paying off in an unforeseen way.

The international community offers aid, but with conditions. The US pledges $100 million in food aid if you sign a bilateral investment treaty giving American firms favorable access. The EU offers drought-resistant seed technology if you align with their climate framework. China offers emergency rice shipments with no conditions.

Max Ajl's work on climate and the agrarian question is prescient here: the drought is not just a natural disaster but the intersection of colonial land patterns, monoculture agriculture, and climate change. A genuine response addresses all three.`,
    choices: [
      {
        id: 'drought_comprehensive',
        text: 'Launch a comprehensive climate adaptation and food sovereignty program',
        consequence: 'You combine emergency relief with long-term agricultural transformation.',
        effects: { humanDevelopment: 8, sovereignty: 8, publicSupport: 10, economicStrength: -3, debtBurden: 5 },
        nextNode: 'climate_sovereignty',
      },
      {
        id: 'drought_pragmatic',
        text: 'Accept aid from all sources with minimal conditions — the emergency comes first',
        consequence: 'You take the food aid, the seeds, and the rice. Your people eat.',
        effects: { publicSupport: 5, sovereignty: -8, internationalStanding: 3, humanDevelopment: 3 },
        nextNode: 'pragmatic_relief',
      },
    ],
  },

  {
    id: 'pan_african_solidarity',
    phase: 4,
    title: 'Pan-African Solidarity',
    narrative: `Your appeal to the African Union yields results. Kenya, Ethiopia, and South Africa contribute emergency grain reserves. The African Development Bank fast-tracks a $200 million climate resilience loan. Nigeria's Dangote Group offers to build a cement factory at cost. Rwanda shares its agricultural extension model.

This is the vision Nkrumah articulated in "Africa Must Unite" — not just political unity but economic cooperation among African states. The infrastructure your Chinese partners built is being put to use carrying African solidarity shipments. The irony is not lost on the diplomatic corps.

But Pan-African solidarity has limits. Each contributing nation has its own interests. South Africa wants preferential access to your cobalt. Kenya wants your market for its manufactured goods. Ethiopia sees you as a potential rival for Chinese investment. The solidarity is real, but it coexists with competition.

You're building something new: a network of South-South relationships that gives you options beyond the old binary of East versus West.`,
    choices: [
      {
        id: 'pan_af_deepen',
        text: 'Propose a formal Southern African economic bloc with common industrial policy',
        consequence: 'You champion a new regional economic community with shared development goals.',
        effects: { sovereignty: 8, internationalStanding: 12, economicStrength: 8, publicSupport: 5 },
        nextNode: 'regional_bloc',
      },
      {
        id: 'pan_af_bilateral',
        text: 'Pursue bilateral deals with each partner — flexibility over formal structures',
        consequence: 'You negotiate separate agreements optimized for each relationship.',
        effects: { economicStrength: 10, sovereignty: 5, internationalStanding: 5, debtBurden: 3 },
        nextNode: 'bilateral_web',
      },
    ],
  },

  {
    id: 'austerity_deepens',
    phase: 4,
    title: 'The Deepening Crisis',
    narrative: `Your decision to hold the course is tested daily. The general strike paralyzes the capital for a week. Food prices continue rising. The military chief's "stability" meeting becomes a weekly fixture. International media runs stories about "the Azanian experiment in free-market reform."

The IMF publishes a progress report praising your "fiscal discipline." GDP has stopped contracting and shows 0.3% growth. Inflation is falling. But these macroeconomic indicators mask a social catastrophe: hospital admissions for malnutrition have tripled, school dropout rates have doubled, and the informal economy — beyond the reach of your reformed tax system — has ballooned.

The privatized mining company is posting record profits. Its shareholders in Toronto are delighted. Your treasury receives a small royalty. The value flows outward, as it always has.`,
    choices: [
      {
        id: 'deep_reverse',
        text: 'Reverse course — announce an emergency social program funded by mining royalties',
        consequence: 'You break with the IMF framework and redirect resources to the people.',
        effects: { publicSupport: 15, sovereignty: 12, internationalStanding: -12, debtBurden: 5, economicStrength: -3 },
        nextNode: 'late_reversal',
      },
      {
        id: 'deep_complete',
        text: 'Complete the program — the pain is temporary, the reforms permanent',
        consequence: 'You push through the remaining reforms, betting on long-term transformation.',
        effects: { economicStrength: 8, publicSupport: -10, sovereignty: -5, internationalStanding: 8, debtBurden: -5 },
        nextNode: 'reform_completion',
      },
    ],
  },

  {
    id: 'imf_renegotiate',
    phase: 4,
    title: 'Social Protection',
    narrative: `The IMF, sensitive to criticism, agrees to modify the program. Social protection floors are established: guaranteed school meals, healthcare exemptions for the poorest, and a cash transfer program for vulnerable households. The austerity continues, but its sharpest edges are blunted.

Your finance minister finds creative fiscal space by renegotiating contracts with telecom monopolies and introducing a digital services tax that captures revenue from multinational tech firms. These aren't the kinds of "reforms" the IMF typically recommends, but they work — domestic revenue grows without cutting services.

The compromise position is inherently unstable, though. You're satisfying neither the IMF hawks who want faster privatization nor the social movements who want the program abandoned entirely. Elections are in two years, and the opposition is running on a platform of "no more Washington diktat."`,
    choices: [
      {
        id: 'renego_innovate',
        text: 'Double down on innovative revenue — digital taxes, financial transaction levies, diaspora bonds',
        consequence: 'You build an alternative fiscal architecture that reduces dependence on IMF conditions.',
        effects: { sovereignty: 10, economicStrength: 8, publicSupport: 5, debtBurden: -5, internationalStanding: 3 },
        nextNode: 'fiscal_innovation',
      },
      {
        id: 'renego_election',
        text: 'Pivot toward the election — announce popular programs while maintaining fiscal stability',
        consequence: 'You launch visible projects — roads, clinics, markets — timed to the electoral cycle.',
        effects: { publicSupport: 10, infrastructure: 5, debtBurden: 5, sovereignty: 3 },
        nextNode: 'electoral_development',
      },
    ],
  },

  {
    id: 'debt_moratorium',
    phase: 4,
    title: 'The Moratorium',
    narrative: `The debt moratorium triggers an immediate financial crisis. Your currency drops 30% against the dollar. Capital flight empties bank accounts. The London Club of creditors threatens legal action. The US Treasury warns of "consequences."

But something else happens too. Eric Toussaint would recognize this moment: the moratorium breaks the debt cycle that has drained your treasury for decades. Freed from debt service, your government suddenly has fiscal space. You invest in food stockpiles, import substitution, and emergency infrastructure. The currency depreciation, though painful, makes your exports competitive and your imports expensive — which is exactly what you need to build domestic industry.

Latin American precedents are mixed. Argentina's 2001 default led to recovery; Ecuador's 2008 debt audit freed resources for social spending. But these countries had larger economies and more diversified export bases than Azania. You're more vulnerable, and the creditors know it.

International solidarity arrives from unexpected quarters. Bolivia, Venezuela, and Cuba offer expertise. The African Union passes a (non-binding) resolution supporting your right to development. China remains conspicuously silent — watching to see if this creates an opportunity.`,
    choices: [
      {
        id: 'morat_negotiate',
        text: 'Use the leverage of default to negotiate a massive debt writedown',
        consequence: 'You offer creditors 30 cents on the dollar. Take it or get nothing.',
        effects: { debtBurden: -20, sovereignty: 10, internationalStanding: -5, economicStrength: 5 },
        nextNode: 'debt_resolution',
      },
      {
        id: 'morat_solidarity',
        text: 'Build a coalition of indebted nations to collectively challenge the debt system',
        consequence: 'You convene a "Debtors Conference" in your capital, inviting all distressed nations.',
        effects: { sovereignty: 12, internationalStanding: 8, publicSupport: 8, economicStrength: -3 },
        nextNode: 'debtors_coalition',
      },
    ],
  },

  {
    id: 'debt_audit',
    phase: 4,
    title: 'The Debt Audit',
    narrative: `The citizen debt audit commissions are thorough and damning. They document how the military dictator's regime borrowed $3.2 billion in the 1980s: $800 million went to arms purchases from France, $1.2 billion was embezzled to Swiss bank accounts, and $1.2 billion funded prestige projects that were never completed. The interest and penalties on these original loans now total $8 billion — more than your entire GDP.

Following Ecuador's 2008 precedent, the audit commission declares 60% of the debt "illegitimate and odious." Toussaint's legal framework is clear: debts contracted by despotic regimes for purposes hostile to the population, where the creditors were aware of these circumstances, do not bind successor democratic governments.

The creditors are furious. Legal proceedings begin in London, New York, and Paris. Your foreign assets are frozen. But domestically, the audit has galvanized the nation. For the first time, citizens understand where the debt came from and why they've been paying for a dictator's weapons and Swiss villas.`,
    choices: [
      {
        id: 'audit_repudiate',
        text: 'Formally repudiate the illegitimate debt and defend the decision in international courts',
        consequence: 'You declare the odious debt null and void. The legal battle begins.',
        effects: { sovereignty: 15, publicSupport: 12, debtBurden: -20, internationalStanding: -10, economicStrength: -5 },
        nextNode: 'debt_resolution',
      },
      {
        id: 'audit_negotiate',
        text: 'Use the audit as leverage to negotiate a settlement — partial payment for full release',
        consequence: 'You offer to pay 25% of the audited debt in exchange for a clean slate.',
        effects: { sovereignty: 10, debtBurden: -12, internationalStanding: 3, publicSupport: 5, economicStrength: 3 },
        nextNode: 'debt_resolution',
      },
    ],
  },

  {
    id: 'south_south_finance',
    phase: 4,
    title: 'New Development Banks',
    narrative: `The BRICS New Development Bank and the Asian Infrastructure Investment Bank offer a different kind of multilateral lending — without the structural adjustment conditions of the IMF. The interest rates are comparable, the terms are reasonable, and the governance gives developing nations a voice.

But these institutions are young and their capacity limited. The NDB can offer $300 million for your railway project — significant, but not enough. The AIIB can co-finance a renewable energy program. Together with your African bond issuance, you're cobbling together a financing package from multiple sources.

This patchwork approach has a hidden advantage: diversification. You're not dependent on any single creditor. As Roland Boer's analysis of Chinese development institutions suggests, the emergence of alternative lenders has fundamentally changed the bargaining dynamics for Global South nations. The IMF monopoly is broken, even if no single institution has replaced it.`,
    choices: [
      {
        id: 'ss_diversify',
        text: 'Maximize diversification — small loans from many sources, no single dependency',
        consequence: 'You assemble financing from seven different institutions and bilateral partners.',
        effects: { sovereignty: 8, debtBurden: 8, infrastructure: 10, internationalStanding: 8, economicStrength: 5 },
        nextNode: 'diversified_development',
      },
      {
        id: 'ss_brics_anchor',
        text: 'Anchor your development strategy in the BRICS framework',
        consequence: 'You apply for BRICS membership and make the NDB your primary development partner.',
        effects: { sovereignty: 3, internationalStanding: 8, debtBurden: 5, infrastructure: 8, economicStrength: 5 },
        nextNode: 'brics_alignment',
      },
    ],
  },

  {
    id: 'bootstrap_development',
    phase: 4,
    title: 'Pulling Yourself Up',
    narrative: `The bootstrap strategy is grueling but clarifying. Without large external loans, you're forced to prioritize ruthlessly. Your finance minister implements a new revenue code that actually collects taxes from multinational corporations operating in Azania — something the IMF never required, because those corporations are based in creditor countries.

You discover that domestic savings, properly mobilized, can finance more than anyone expected. A national development bank channels household savings into infrastructure bonds. Pension funds invest in domestic industry. The informal sector is slowly formalized through registration incentives rather than punitive enforcement.

Growth is modest — 3% per year — but it's genuine, rooted in domestic production rather than debt-financed consumption. Your debt burden is falling, slowly. International observers are confused: you don't fit any model they recognize.

But 3% growth is not enough to absorb a growing population. Youth unemployment remains high. The educated young see more opportunity abroad than at home. You need to accelerate without leveraging up.`,
    choices: [
      {
        id: 'boot_sez',
        text: 'Create targeted economic zones to attract investment while maintaining sovereign control',
        consequence: 'You design SEZs with mandatory technology transfer and sunset clauses on tax breaks.',
        effects: { economicStrength: 10, sovereignty: 3, infrastructure: 5, publicSupport: 3, debtBurden: -3 },
        nextNode: 'sovereign_sez',
      },
      {
        id: 'boot_regional',
        text: 'Build a regional trade network with neighboring countries',
        consequence: 'You negotiate trade agreements that prioritize manufactured goods over raw materials.',
        effects: { economicStrength: 8, internationalStanding: 8, sovereignty: 8, publicSupport: 5 },
        nextNode: 'regional_bloc',
      },
    ],
  },

  // ── Mining & Agriculture Convergent Paths ──

  {
    id: 'agro_industrial',
    phase: 4,
    title: 'From Farm to Factory',
    narrative: `The transition from agriculture to industry is the most critical and dangerous passage in development. Your agricultural surplus provides the capital, but building factories requires skills, supply chains, and infrastructure that don't yet exist. You study the models: South Korea's state-directed chaebols, China's township and village enterprises, India's mixed approach.

Your light manufacturing program starts with food processing — canning, packaging, and preserving the crops your cooperatives grow. Then textiles, using domestically grown cotton. Then simple tools and construction materials. Each step up the value chain is harder than the last.

The international community watches with bemusement. "Why not just export the raw commodities and import manufactured goods?" asks a visiting economist. This is precisely the colonial logic of "comparative advantage" that Kadri identifies as the intellectual justification for keeping peripheral economies in permanent subordination.`,
    choices: [
      {
        id: 'agro_ind_state',
        text: 'State-led industrialization with centralized planning and SOEs',
        consequence: 'You create a national industrial corporation to manage the transition centrally.',
        effects: { economicStrength: 12, sovereignty: 10, publicSupport: -3, debtBurden: 8, infrastructure: 5 },
        nextNode: 'late_development_push',
      },
      {
        id: 'agro_ind_coop',
        text: 'Build on the cooperative model — worker-owned industrial cooperatives',
        consequence: 'You extend the agricultural cooperative model to manufacturing.',
        effects: { economicStrength: 8, sovereignty: 8, publicSupport: 10, humanDevelopment: 5 },
        nextNode: 'cooperative_industry',
      },
    ],
  },

  {
    id: 'agro_export',
    phase: 4,
    title: 'Value-Added Agriculture',
    narrative: `Your agricultural cooperatives have evolved into something remarkable. Azanian organic coffee is finding premium markets in Europe and East Asia. Processed cocoa is being sold at three times the price of raw beans. A cooperative-owned cashew processing plant has become the largest employer in the northern province.

This is exactly the kind of "delinking" from the global value chain hierarchy that development theorists have long advocated — not autarky, but engagement on your own terms, exporting processed goods rather than raw materials. Your farmers capture more of the final value, and the processing industries create non-agricultural employment.

But success brings new challenges. European import regulations are complex and shift unpredictably. Your "organic" certification depends on Western certification bodies that charge fees your small cooperatives can barely afford. And the largest buyers are multinational commodity traders who exert enormous market power.`,
    choices: [
      {
        id: 'export_brand',
        text: 'Build an "Azanian" brand — direct-to-consumer channels that bypass middlemen',
        consequence: 'You invest in branding, e-commerce platforms, and direct trade relationships.',
        effects: { economicStrength: 10, sovereignty: 8, internationalStanding: 5, publicSupport: 5, humanDevelopment: 3 },
        nextNode: 'sovereign_brand',
      },
      {
        id: 'export_diversify',
        text: 'Diversify markets — reduce dependence on Western buyers by expanding into Africa and Asia',
        consequence: 'You sign trade agreements prioritizing intra-African and South-South markets.',
        effects: { economicStrength: 8, sovereignty: 10, internationalStanding: 8, publicSupport: 5 },
        nextNode: 'regional_bloc',
      },
    ],
  },

  {
    id: 'agro_china_assist',
    phase: 4,
    title: 'Chinese Agricultural Expertise',
    narrative: `The Chinese agricultural mission sends 50 agronomists who work alongside your farmers in the southern provinces. Their hybrid rice varieties triple yields. Their drip irrigation systems transform arid land. The training is hands-on and effective — Benabdallah documents this as one of the most successful dimensions of China-Africa cooperation, where practical technical knowledge transfers more effectively than in Western "capacity building" programs that often consist of consultants writing reports.

But the mission also introduces Chinese seed companies that compete with local varieties. Dependency on imported seeds would recreate the Green Revolution trap that Ajl critiques — productivity gains that come at the cost of farmer autonomy and agrobiodiversity. Your agricultural scientists are concerned.

Meanwhile, the success of the program has created a template. Other sectors want similar partnerships: your mining engineers request Chinese training, your tech sector wants access to Chinese AI research, your transport ministry wants help with logistics systems.`,
    choices: [
      {
        id: 'china_assist_expand',
        text: 'Expand Chinese cooperation across multiple sectors with strict knowledge-transfer requirements',
        consequence: 'You sign a comprehensive cooperation agreement with technology transfer safeguards.',
        effects: { economicStrength: 10, humanDevelopment: 8, sovereignty: -5, infrastructure: 8, debtBurden: 5 },
        nextNode: 'comprehensive_partnership',
      },
      {
        id: 'china_assist_selective',
        text: 'Keep the agricultural partnership but develop other sectors independently',
        consequence: 'You contain Chinese involvement to agriculture and pursue other sectors through diverse partnerships.',
        effects: { economicStrength: 5, sovereignty: 8, humanDevelopment: 5, publicSupport: 5 },
        nextNode: 'selective_engagement',
      },
    ],
  },

  {
    id: 'mining_china_partner',
    phase: 4,
    title: 'The Joint Venture',
    narrative: `The Chinese joint venture in the mining sector is transformative. Chinese expertise stabilizes production. New processing facilities mean you're exporting refined cobalt instead of raw ore — capturing five times the value per ton. Chinese market access means you're no longer dependent on the London Metals Exchange, where pricing power has historically favored Western traders.

But the 30% Chinese stake comes with influence. Chinese managers in key technical positions. Supply chains routed through Chinese logistics firms. Equipment sourced from Chinese manufacturers. The joint venture is profitable, but the knowledge remains largely within the Chinese team.

Your mining engineers are learning, but the pace of technology transfer depends on the good faith of your partner. Roland Boer's analysis of Chinese state enterprises suggests that technology sharing is more likely when both parties have long-term strategic interests — but Azania needs to ensure its interests remain central.`,
    choices: [
      {
        id: 'jv_assert',
        text: 'Use profits to train an Azanian technical cadre and gradually assert majority control',
        consequence: 'You earmark 20% of joint venture profits for a Mining Academy and management training.',
        effects: { sovereignty: 10, humanDevelopment: 8, economicStrength: 5, publicSupport: 5 },
        nextNode: 'late_development_push',
      },
      {
        id: 'jv_expand',
        text: 'Expand the model — invite other partners to create competition among foreign investors',
        consequence: 'You open new concessions to Indian, Turkish, and Brazilian firms alongside the Chinese.',
        effects: { economicStrength: 10, sovereignty: 5, internationalStanding: 5, debtBurden: 3 },
        nextNode: 'diversified_development',
      },
    ],
  },

  {
    id: 'mining_self_develop',
    phase: 4,
    title: 'The Sovereign Mining Company',
    narrative: `The decision to develop mining capacity domestically is paying off, slowly. Your university's mining engineering program has graduated three cohorts. Production efficiency is recovering. You've hired retired engineers from South Africa and Chile as mentors — South-South expertise sharing outside any institutional framework.

The revenue from nationalized mines, combined with efficiency improvements, is now your largest source of government income. You're using it to fund a sovereign wealth fund — an idea borrowed from Norway's oil fund model but adapted to your context.

But the Western arbitration case is proceeding. The former mining companies are claiming $4.5 billion in compensation — more than your annual GDP. The tribunal's jurisdiction is questionable, but the threat is real: if they rule against you, your foreign assets could be seized and your access to international financial markets severely constrained.`,
    choices: [
      {
        id: 'self_mine_fight',
        text: 'Fight the arbitration aggressively — hire the best lawyers and challenge the tribunal\'s legitimacy',
        consequence: 'You mount a vigorous legal defense and challenge the investor-state dispute framework itself.',
        effects: { sovereignty: 10, internationalStanding: -5, publicSupport: 5, debtBurden: 3 },
        nextNode: 'sovereignty_stand',
      },
      {
        id: 'self_mine_settle',
        text: 'Negotiate a settlement — pay compensation but less than demanded',
        consequence: 'You offer $800 million over 10 years in exchange for dropping all claims.',
        effects: { debtBurden: 5, internationalStanding: 8, sovereignty: -3, economicStrength: 3 },
        nextNode: 'diversified_development',
      },
    ],
  },

  {
    id: 'minerals_cartel',
    phase: 4,
    title: 'The Minerals Alliance',
    narrative: `The regional minerals cartel idea catches fire. Zambia, the DRC, Tanzania, and Mozambique all have critical minerals that the green energy transition desperately needs. Together, you control 60% of global cobalt, 35% of copper, and significant lithium reserves. The bargaining power is immense.

You convene the founding meeting of the African Critical Minerals Alliance (ACMA) in your capital. The attending heads of state sign a charter committing to: coordinated pricing, shared processing facilities, joint negotiation with buyers, and a common fund for industrial development. The Western press calls it "an OPEC for cobalt." Markets are nervous.

This is the Pan-African economic solidarity Nkrumah dreamed of — not just political resolutions but material cooperation that shifts the terms of trade. For the first time, the producers of the raw materials essential to the global economy are acting collectively.

The response from consuming nations is swift. The US announces a "critical minerals security initiative." The EU proposes "strategic partnerships" with individual member states — an obvious attempt to divide the cartel. China offers to be a "preferred buyer" with guaranteed volume at above-market prices.`,
    choices: [
      {
        id: 'cartel_hold',
        text: 'Maintain cartel unity — reject bilateral deals that would undermine collective bargaining',
        consequence: 'You lobby ACMA members to present a united front against divide-and-conquer tactics.',
        effects: { sovereignty: 12, internationalStanding: 8, economicStrength: 10, publicSupport: 8, infrastructure: 3 },
        nextNode: 'sovereign_bloc_victory',
      },
      {
        id: 'cartel_pragmatic',
        text: 'Be pragmatic — use the cartel as a platform but allow bilateral flexibility',
        consequence: 'You set minimum coordination standards but let each country negotiate its own deals.',
        effects: { sovereignty: 8, economicStrength: 8, internationalStanding: 5, publicSupport: 5, debtBurden: -3 },
        nextNode: 'diversified_development',
      },
    ],
  },

  // ── Education convergent paths ──

  {
    id: 'state_industrialization',
    phase: 4,
    title: 'The National Development Corporation',
    narrative: `Your National Development Corporation (NDC) begins operations. State-owned factories produce construction materials, pharmaceuticals, and electronics components. Your educated workforce finally has domestic employment options. The brain drain slows.

The NDC model draws on the experience of South Korea's chaebols, Singapore's Temasek Holdings, and China's state-owned enterprises — all examples of state-led industrialization that defied the free-market orthodoxy. As Boer documents in his analysis of Chinese socialism, the key is not whether the state or the market drives development, but whether the state has the capacity to direct investment toward productive ends.

The challenge is efficiency. Some NDC factories are world-class. Others are bloated with patronage hires. Quality control is uneven. Private sector competitors complain about unfair advantages. Your anti-corruption commission is overwhelmed.`,
    choices: [
      {
        id: 'ndc_reform',
        text: 'Reform the NDC — introduce performance metrics and independent oversight',
        consequence: 'You restructure the corporation with professional management and transparent governance.',
        effects: { economicStrength: 8, sovereignty: 8, publicSupport: 3, humanDevelopment: 3 },
        nextNode: 'late_development_push',
      },
      {
        id: 'ndc_hybrid',
        text: 'Transition to a hybrid model — NDC for strategic sectors, private enterprise for the rest',
        consequence: 'You keep state control of mining, energy, and defense while opening other sectors.',
        effects: { economicStrength: 10, sovereignty: 5, publicSupport: 5, internationalStanding: 5 },
        nextNode: 'diversified_development',
      },
    ],
  },

  {
    id: 'diaspora_mobilization',
    phase: 4,
    title: 'The Diaspora Returns',
    narrative: `The diaspora engagement strategy works better than expected. Azanians abroad — doctors, engineers, tech workers, entrepreneurs — respond to your call. Diaspora bonds raise $500 million. Returnees establish clinics, tech startups, and consulting firms. A retired professor from MIT returns to build a computational research center.

The returning diaspora brings not just skills but networks — connections to global supply chains, knowledge of international markets, and bilingual/bicultural capacity that is invaluable for a country trying to engage with the world on its own terms.

But tensions emerge. Returnees earn higher salaries than locals with similar qualifications, creating resentment. Some diaspora entrepreneurs import foreign business models that don't suit local conditions. The "been-to" phenomenon — respect mixed with suspicion for those who've been abroad — complicates workplace dynamics.

Your challenge is to harness diaspora capacity without creating a dual economy where the connected thrive and everyone else stagnates.`,
    choices: [
      {
        id: 'diaspora_integrate',
        text: 'Mandate mentorship programs — every diaspora returnee must train two local counterparts',
        consequence: 'You create a structured knowledge transfer program between returnees and local professionals.',
        effects: { humanDevelopment: 10, sovereignty: 5, publicSupport: 8, economicStrength: 5 },
        nextNode: 'late_development_push',
      },
      {
        id: 'diaspora_tech_hub',
        text: 'Build a tech hub leveraging diaspora connections to global markets',
        consequence: 'You create "Azania Valley" — a tech corridor linked to Silicon Valley, Bangalore, and Shenzhen.',
        effects: { economicStrength: 12, internationalStanding: 8, sovereignty: -3, infrastructure: 5 },
        nextNode: 'diversified_development',
      },
    ],
  },

  {
    id: 'sez_development',
    phase: 4,
    title: 'The Zone Experiment',
    narrative: `The special economic zones attract investment rapidly. Electronics assembly plants, garment factories, and call centers spring up. Your educated youth find employment. GDP growth accelerates to 5%.

But the zones are enclaves. Tax exemptions mean little revenue flows to the state. Working conditions vary. Some firms treat Azanian workers well; others extract maximum labor for minimum pay. The zones are connected to global supply chains but disconnected from the domestic economy — what dependency theorists would call "growth without development."

Deng Xiaoping's SEZ strategy in China eventually spread from coastal enclaves to transform the entire economy. But that required massive state investment in education, infrastructure, and technology over decades. Your SEZs could be the beginning of that trajectory — or they could become permanent enclaves of low-wage assembly work.`,
    choices: [
      {
        id: 'sez_upgrade_push',
        text: 'Push for upgrading — mandate that zone firms must increase local value-added by 10% annually',
        consequence: 'You create escalating local content and value-addition requirements.',
        effects: { sovereignty: 8, economicStrength: 5, humanDevelopment: 5, publicSupport: 5 },
        nextNode: 'industrial_upgrading',
      },
      {
        id: 'sez_link',
        text: 'Build linkages between zones and the domestic economy',
        consequence: 'You require zone firms to source 30% of inputs from domestic suppliers.',
        effects: { economicStrength: 8, sovereignty: 5, publicSupport: 8, infrastructure: 3 },
        nextNode: 'diversified_development',
      },
    ],
  },

  // ═══════════════════════════════════════
  // PHASE 5: RESOLUTION & ENDINGS
  // ═══════════════════════════════════════

  {
    id: 'green_transition',
    phase: 5,
    title: 'The Green Pivot',
    narrative: `Your pivot to renewable energy becomes a strategic masterstroke. Converting the coal plants into solar panel and wind turbine manufacturing facilities — using Chinese technology with Azanian labor — positions you at the center of Africa's green transition. The EU carbon border tax, which threatened your mining exports, now works in your favor: you're producing the green technology that others need to comply.

Your cobalt, essential for electric vehicle batteries, is now processed domestically and sold at a premium as "green cobalt" — mined with renewable energy and fair labor practices. The premium commands a 20% price advantage over competitors.

The development model you've built doesn't fit any ideological box. It has elements of state planning, market competition, South-South cooperation, and environmental sustainability. It is, as Deng might have said, "development with Azanian characteristics."`,
    choices: [
      {
        id: 'green_sovereign',
        text: 'Consolidate — use your strategic position to achieve full economic sovereignty',
        consequence: 'You leverage your green technology position to renegotiate all remaining debt on favorable terms.',
        effects: { sovereignty: 15, economicStrength: 10, debtBurden: -10, internationalStanding: 10, publicSupport: 8 },
        nextNode: 'ending_sovereign_development',
      },
    ],
  },

  {
    id: 'port_reclamation',
    phase: 5,
    title: 'Reclaiming the Port',
    narrative: `The legal proceedings to reclaim the port are complex but your legal team, educated in Azanian law schools you funded, is formidable. They argue that the original concession was signed under duress — the implicit threat of debt acceleration if you refused. The arbitration panel includes an African judge for the first time.

While the legal process unfolds, you develop an alternative: a second port, smaller but entirely domestically owned, that handles agricultural and manufactured exports. The Chinese-operated port still handles mining bulk cargo, but your economy is no longer entirely dependent on it.

The port case becomes a symbol. Not just for Azania, but for the dozens of countries reassessing infrastructure concessions made under financial pressure. A win here sets a precedent; a loss entrenches the model.`,
    choices: [
      {
        id: 'port_win',
        text: 'See the case through — sovereignty over strategic infrastructure is non-negotiable',
        consequence: 'After three years of legal battle, the tribunal rules in your favor on key provisions.',
        effects: { sovereignty: 15, internationalStanding: 10, publicSupport: 10, infrastructure: 5 },
        nextNode: 'ending_sovereign_development',
      },
    ],
  },

  {
    id: 'late_development_push',
    phase: 5,
    title: 'The Development Push',
    narrative: `Years of investment in human capital, infrastructure, and institutional capacity are compounding. Your economy is growing at 6% annually. Manufacturing output has quadrupled since independence. The university graduates who once emigrated are now founding companies at home. Poverty has fallen by half.

Your development model has caught the attention of other Global South nations. Delegations from Laos, Bolivia, and Senegal visit to study your approach. A think tank in your capital publishes studies on "the Azanian model" — neither Washington Consensus nor Beijing Consensus, but something new.

Nkrumah's dream of economic independence as the completion of political independence is, for the first time, within reach. Not fully achieved — no developing nation achieves full sovereignty in a single generation — but the trajectory is clear and the foundations are solid.

The election approaches. Your record is strong but the task is not finished. The question is whether to consolidate gains or push further.`,
    choices: [
      {
        id: 'dev_push_consolidate',
        text: 'Consolidate — institutionalize the gains so they survive any future government',
        consequence: 'You enshrine key development institutions in constitutional amendments and build independent oversight.',
        effects: { sovereignty: 10, publicSupport: 8, economicStrength: 5, humanDevelopment: 5 },
        nextNode: 'ending_sovereign_development',
      },
      {
        id: 'dev_push_accelerate',
        text: 'Accelerate — this is the moment to push for full industrial transformation',
        consequence: 'You launch an ambitious 10-year industrialization plan.',
        effects: { economicStrength: 12, sovereignty: 5, debtBurden: 5, publicSupport: 3, infrastructure: 8 },
        nextNode: 'ending_rising_power',
      },
    ],
  },

  {
    id: 'diversified_development',
    phase: 5,
    title: 'The Diversified Path',
    narrative: `Your strategy of diversification — multiple partners, multiple sectors, multiple sources of finance — has created resilience. No single creditor controls your destiny. No single commodity defines your economy. No single alliance constrains your foreign policy.

It's not the fastest path, or the most dramatic. But it's sustainable. Your children will inherit a country with options, not a country locked into dependency on any single patron.

As Deng said of China's reform: "It doesn't matter if the cat is black or white, as long as it catches mice." Your development has been pragmatic, borrowing from every model while submitting to none. The question now is whether pragmatism is enough, or whether a bolder vision is needed for the next stage.`,
    choices: [
      {
        id: 'diverse_institutionalize',
        text: 'Institutionalize the diversified model for long-term stability',
        consequence: 'You create a permanent development planning agency with a 30-year vision.',
        effects: { sovereignty: 8, economicStrength: 5, publicSupport: 5, humanDevelopment: 5, internationalStanding: 5 },
        nextNode: 'ending_pragmatic_sovereignty',
      },
      {
        id: 'diverse_ambition',
        text: 'Use the stable base to launch an ambitious leap into high-value sectors',
        consequence: 'You invest heavily in technology, advanced manufacturing, and knowledge economy.',
        effects: { economicStrength: 12, sovereignty: 5, debtBurden: 5, humanDevelopment: 8 },
        nextNode: 'ending_rising_power',
      },
    ],
  },

  {
    id: 'regional_bloc',
    phase: 5,
    title: 'The Southern Alliance',
    narrative: `The regional economic bloc you championed is becoming a force. Six nations now coordinate industrial policy, share infrastructure costs, and negotiate collectively with external partners. A common market of 180 million people attracts investment that no single member could command alone.

This is continental solidarity made material. Not the bureaucratic stagnation of previous regional organizations, but a dynamic cooperation driven by shared development interests. Your railway connects to your neighbor's highway. Your power grid feeds their factories. Their agricultural surplus feeds your cities.

The old colonial borders, drawn to divide and weaken, are being rendered economically irrelevant by the connections you're building. Nkrumah's vision of African unity through economic integration, dismissed as utopian for decades, is taking practical form.`,
    choices: [
      {
        id: 'bloc_lead',
        text: 'Position Azania as the anchor economy and institutional center of the bloc',
        consequence: 'You invest in making your capital the financial and logistical hub of the alliance.',
        effects: { sovereignty: 10, internationalStanding: 12, economicStrength: 10, publicSupport: 5, infrastructure: 5 },
        nextNode: 'ending_sovereign_development',
      },
    ],
  },

  {
    id: 'sovereignty_stand',
    phase: 5,
    title: 'The Stand',
    narrative: `Your firm stance — whether against unfavorable debt terms, arbitrary tribunals, or geopolitical pressure — has cost you in the short term. Credit has been harder to access. Investment has been slower to arrive. Growth has been more modest than it might have been with a more accommodating approach.

But you own what you have. Your infrastructure is yours. Your mining revenue stays in your treasury. Your policy space is your own. International arbitration tribunals cannot touch your sovereign wealth fund, because it's invested in domestic assets that no foreign court has jurisdiction over.

The short-term costs are fading. Other countries see that defiance of the international financial order is survivable. Your example is quietly changing the calculations of finance ministers across the Global South. As Toussaint argues, the power of creditors depends on the belief that there is no alternative — and your survival disproves that belief.`,
    choices: [
      {
        id: 'stand_build',
        text: 'Build on the foundation of sovereignty — now that you own it, develop it',
        consequence: 'With full control of your resources and institutions, you launch a comprehensive development program.',
        effects: { sovereignty: 10, economicStrength: 8, publicSupport: 10, humanDevelopment: 5, infrastructure: 5 },
        nextNode: 'ending_sovereign_development',
      },
    ],
  },

  {
    id: 'debt_resolution',
    phase: 5,
    title: 'Breaking Free',
    narrative: `The debt resolution — whether through repudiation, negotiation, or writedown — liberates your fiscal position. For the first time since independence, your government's primary expenditure is on development rather than debt service. Schools are built. Hospitals are staffed. Roads are paved. The human capital you invest in stays, because for the first time there are opportunities at home.

The international financial system adapts. It always does. Creditors prefer to restructure rather than lose everything. Your bonds are eventually re-rated, not to investment grade — the legacy of defiance lingers — but to a level that allows market access.

You've proven Toussaint right: the debt system's power lies in its perceived inevitability. Once a nation demonstrates the will to challenge it and survives, the spell is broken. The cost was real — years of restricted access, frozen assets, legal battles. But the alternative was decades more of paying for a dictator's debts while your children went hungry.`,
    choices: [
      {
        id: 'debt_free_develop',
        text: 'Channel the freed fiscal space into the most comprehensive development program yet',
        consequence: 'With debt service cut by 70%, you pour resources into infrastructure, education, and industry.',
        effects: { sovereignty: 10, economicStrength: 10, infrastructure: 10, humanDevelopment: 10, publicSupport: 8 },
        nextNode: 'ending_sovereign_development',
      },
    ],
  },

  {
    id: 'debtors_coalition',
    phase: 5,
    title: 'The Debtors\' Movement',
    narrative: `The Debtors' Conference in your capital draws representatives from 40 nations. The joint declaration calls for: an international debt arbitration mechanism independent of creditor control, recognition of odious debt doctrine in international law, and a new global financial architecture that doesn't systematically disadvantage borrowing nations.

The conference doesn't immediately change the world. But it catalyzes something. Bilateral debt relief agreements multiply. The IMF is forced to introduce more flexible conditionality. The BRICS New Development Bank's lending volume triples as countries seek alternatives. The intellectual hegemony of the Washington Consensus, already crumbling, suffers another blow.

Your country's role as convener of this movement gives you outsized international standing. Small nations send ambassadors specifically to maintain relations with you. Development economists study your policies. Your voice in international forums carries weight that your GDP alone wouldn't justify.`,
    choices: [
      {
        id: 'coalition_build',
        text: 'Build on this momentum to create lasting international institutions',
        consequence: 'You help establish a permanent Secretariat for Global South Economic Cooperation.',
        effects: { sovereignty: 12, internationalStanding: 15, publicSupport: 8, economicStrength: 5 },
        nextNode: 'ending_sovereign_development',
      },
    ],
  },

  // ── Intermediate nodes for path convergence ──

  {
    id: 'pragmatic_resolution',
    phase: 5,
    title: 'The Pragmatic Path',
    narrative: `The compromise on local content — phased implementation rather than immediate mandates — satisfies no one completely but works in practice. Chinese firms accept the timeline. Azanian workers gain skills progressively. Infrastructure gets built, not as fast as the full turnkey approach, but with genuine local capacity growing alongside it.

Pragmatism isn't heroic. It doesn't make headlines. But it accumulates quietly into something substantial. Five years in, your trained workforce can maintain and operate every system the Chinese built. Ten years in, they're designing modifications and improvements independently.

As Deng understood, revolutionary transformation sometimes requires evolutionary methods. The destination matters more than the speed of travel.`,
    choices: [
      {
        id: 'prag_mature',
        text: 'Let the pragmatic approach mature into full operational sovereignty',
        consequence: 'You continue the gradual transition until all critical infrastructure is locally managed.',
        effects: { sovereignty: 10, economicStrength: 8, humanDevelopment: 8, publicSupport: 5, infrastructure: 5 },
        nextNode: 'ending_pragmatic_sovereignty',
      },
    ],
  },

  {
    id: 'geopolitical_balancing',
    phase: 5,
    title: 'The Balancing Act',
    narrative: `Playing China and the West against each other is a dangerous game, but you're skilled at it. You accept Chinese infrastructure financing while maintaining IMF program compliance. You grant mining concessions to both Chinese and Western firms, ensuring neither dominates. You vote independently at the United Nations, sometimes with the West, sometimes with China, always in your interest.

This is the modern version of the Non-Aligned Movement — not ideological neutrality, but strategic ambiguity. Both sides want your cobalt. Both sides want your vote. You give both just enough to maintain leverage.

The risk is that you're building dependency on both sides rather than independence from either. But in a multipolar world, having multiple patrons may be the closest thing to sovereignty available to a small developing state.`,
    choices: [
      {
        id: 'balance_sovereign',
        text: 'Use the balancing position to build genuine economic independence over time',
        consequence: 'You channel the benefits of competition into domestic capacity building.',
        effects: { sovereignty: 8, economicStrength: 8, internationalStanding: 5, publicSupport: 5, debtBurden: -5 },
        nextNode: 'ending_pragmatic_sovereignty',
      },
    ],
  },

  {
    id: 'western_alignment',
    phase: 5,
    title: 'The Western Path',
    narrative: `Your alignment with the Western financial framework yields material benefits: World Bank loans at concessional rates, EU trade preferences, USAID technical assistance, and the imprimatur of "good governance" that attracts private investment.

GDP grows at a respectable 4% annually. Poverty falls. Infrastructure improves, though slowly. You are, by the metrics that Western institutions use, a "success story."

But sovereignty is compromised. Major economic decisions require IMF approval. Your monetary policy is constrained by capital account liberalization. When a global mining company pollutes a river, the bilateral investment treaty prevents meaningful regulation. You are free within the parameters others have set — which is, as Nkrumah would observe, the definition of neo-colonialism.`,
    choices: [
      {
        id: 'western_accept',
        text: 'Accept the trade-off — growth within the system is better than stagnation outside it',
        consequence: 'You deepen integration with the global economy on the terms available.',
        effects: { economicStrength: 8, internationalStanding: 8, sovereignty: -5, publicSupport: -3 },
        nextNode: 'ending_dependent_development',
      },
      {
        id: 'western_pivot',
        text: 'Begin a quiet pivot — use Western investment to build capacity for eventual independence',
        consequence: 'You accept the framework while systematically building sovereign alternatives.',
        effects: { sovereignty: 5, economicStrength: 5, humanDevelopment: 5, publicSupport: 3 },
        nextNode: 'ending_pragmatic_sovereignty',
      },
    ],
  },

  {
    id: 'non_aligned_path',
    phase: 5,
    title: 'Genuine Non-Alignment',
    narrative: `Genuine non-alignment in the 21st century is harder than during the Cold War. Then, the Non-Aligned Movement could play two superpowers against each other. Now, the US-China rivalry coexists with a complex web of trade relationships, technology dependencies, and financial flows that make pure neutrality nearly impossible.

But you try. You join neither the US-led "Partnership for Global Infrastructure and Investment" nor the Chinese Belt and Road. You source technology from whoever offers the best terms. You sell your cobalt to the highest bidder. You vote your conscience at the UN.

The diplomatic cost is significant. Neither great power champions your cause. Aid flows are modest. Investment comes without strategic backing. But every decision is yours, and your people know it.`,
    choices: [
      {
        id: 'non_aligned_build',
        text: 'Build domestic capacity to make non-alignment economically sustainable',
        consequence: 'You invest in self-sufficiency in food, energy, and essential manufacturing.',
        effects: { sovereignty: 12, economicStrength: 5, publicSupport: 8, humanDevelopment: 5, debtBurden: -5 },
        nextNode: 'ending_sovereign_development',
      },
    ],
  },

  {
    id: 'late_reversal',
    phase: 5,
    title: 'The Reversal',
    narrative: `Your break with the IMF program sends shockwaves. Credit agencies downgrade you further. Capital flees. The currency drops. The IMF suspends the remaining tranches.

But the emergency social program prevents famine and stabilizes public order. Your mining royalty revenue, redirected from debt service to domestic spending, funds public works that put 100,000 people to work. Food subsidies return. Clinics reopen. The streets are calm.

The international financial community predicted collapse. Instead, you stabilize at a lower but sustainable level. Growth resumes, driven by domestic demand and regional trade rather than foreign capital. The model is imperfect, messy, and far from the "best practices" the IMF recommends. But it's alive, and it's yours.`,
    choices: [
      {
        id: 'reversal_rebuild',
        text: 'Rebuild on sovereign foundations — never again',
        consequence: 'You launch a domestically-financed development strategy with strict limits on foreign borrowing.',
        effects: { sovereignty: 15, publicSupport: 10, economicStrength: 5, debtBurden: -10, humanDevelopment: 5 },
        nextNode: 'ending_sovereign_development',
      },
    ],
  },

  {
    id: 'reform_completion',
    phase: 5,
    title: 'The Completed Reform',
    narrative: `The structural adjustment program runs its course. By macroeconomic indicators, it's a success: inflation is tamed, the currency is stable, debt-to-GDP has fallen, and FDI is flowing in. The IMF publishes your country as a case study in "successful reform."

But the social costs are embedded in a generation. Children who missed school during the austerity years are now adults without skills. Factories closed during liberalization never reopened. The privatized mining company's profits flow to shareholders in Toronto and London. Wealth inequality has widened dramatically.

You've achieved stability at the cost of sovereignty and equality. Whether that's a price worth paying depends on what comes next — and who decides what comes next.`,
    choices: [
      {
        id: 'reform_continue',
        text: 'Continue on the path — deepen market reforms and attract more investment',
        consequence: 'You double down on the liberal reform agenda.',
        effects: { economicStrength: 8, sovereignty: -8, internationalStanding: 8, publicSupport: -5 },
        nextNode: 'ending_dependent_development',
      },
      {
        id: 'reform_rebalance',
        text: 'Rebalance — use the stability to rebuild social programs and domestic industry',
        consequence: 'You maintain macro stability but redirect policy toward equity and sovereignty.',
        effects: { sovereignty: 8, publicSupport: 8, humanDevelopment: 8, economicStrength: 3 },
        nextNode: 'ending_pragmatic_sovereignty',
      },
    ],
  },

  {
    id: 'regulated_industry',
    phase: 5,
    title: 'Dignified Industry',
    narrative: `The regulated industrial zones produce less total output than the deregulated alternatives, but what they produce comes with dignity. Living wages mean workers can afford housing and education for their children. Safety standards mean fewer industrial accidents. Environmental regulations mean cleaner rivers.

The firms that stayed are the ones committed to long-term partnerships. They invest in worker training because they can't simply replace workers at cheaper rates. The productivity of your manufacturing sector, per worker, is higher than neighboring countries with lower wages. Quality replaces quantity as your competitive advantage.

This is development that serves the people, not the other way around. It's slower, but it's building a middle class — the foundation of both economic growth and political stability.`,
    choices: [
      {
        id: 'regulated_expand',
        text: 'Expand the model nationally — make dignified work the norm, not the exception',
        consequence: 'You extend labor and environmental standards from the zones to the entire economy.',
        effects: { sovereignty: 10, publicSupport: 10, humanDevelopment: 8, economicStrength: 5 },
        nextNode: 'ending_sovereign_development',
      },
    ],
  },

  {
    id: 'industrial_upgrading',
    phase: 5,
    title: 'Moving Up the Chain',
    narrative: `The push to move from assembly to manufacturing is succeeding. Your factories now produce circuit boards, not just assemble phones. Your textile mills weave fabric, not just sew garments. Your food processing plants design packaging, not just fill boxes.

Each step up the value chain captures more of the final price. Your export revenue per unit has doubled. Your workers earn more because they produce more value. The technology you're accumulating is becoming a national asset — tacit knowledge embedded in your workforce that can't be arbitraged away.

This is the industrial upgrading trajectory that every successful developing country has followed. The difference is that you're doing it consciously, with institutions designed to push firms up the value chain rather than letting them settle into low-wage equilibria.`,
    choices: [
      {
        id: 'upgrade_tech',
        text: 'Push further — invest in R&D and aim for technology leadership in key sectors',
        consequence: 'You establish a national research and development fund targeting clean energy, biotech, and AI.',
        effects: { economicStrength: 12, humanDevelopment: 8, sovereignty: 8, internationalStanding: 8 },
        nextNode: 'ending_rising_power',
      },
    ],
  },

  {
    id: 'cooperative_industry',
    phase: 5,
    title: 'The Cooperative Economy',
    narrative: `The worker-cooperative industrial model is unique in the developing world. Your factories are owned by the workers who run them. Profits are shared. Management is elected. Investment decisions are collective.

The model has inefficiencies — democratic decision-making is slower than autocratic management. But it has strengths the conventional model lacks: workers who own their factory don't sabotage it, steal from it, or leave for marginal wage differences. Quality is higher because pride is higher. Innovation comes from the shop floor because shop-floor workers have a stake in improvement.

Your cooperative economy attracts academic attention and ideological controversy. The World Bank calls it "interesting but not scalable." The ILO calls it "a model for dignified development." China's development bank studies it with interest — it echoes aspects of Mao-era collective enterprises, though with democratic governance Mao's version lacked.`,
    choices: [
      {
        id: 'coop_scale',
        text: 'Scale the cooperative model and make it the foundation of your national economy',
        consequence: 'You enshrine cooperative ownership in economic policy and provide institutional support for expansion.',
        effects: { sovereignty: 12, publicSupport: 12, economicStrength: 8, humanDevelopment: 8 },
        nextNode: 'ending_sovereign_development',
      },
    ],
  },

  {
    id: 'comprehensive_partnership',
    phase: 5,
    title: 'The Comprehensive Partnership',
    narrative: `The comprehensive Chinese partnership has transformed your economy. Agriculture is mechanized. Infrastructure is modern. Manufacturing is growing. Your workers have been trained by Chinese experts and are beginning to train others.

But the breadth of Chinese involvement raises questions about dependency. Your supply chains run through Chinese logistics companies. Your data flows through Chinese-built networks. Your industrial equipment requires Chinese maintenance. You've traded dependency on the West for dependency on the East — or have you?

Benabdallah's research suggests the answer is nuanced. Chinese-built capacity, unlike IMF-mandated reforms, leaves physical and human capital behind. Even if the relationship soured, you'd have the railways, the power plants, and the trained workforce. The dependency is real but the assets are real too.`,
    choices: [
      {
        id: 'comp_diversify',
        text: 'Gradually diversify partnerships while maintaining the Chinese relationship',
        consequence: 'You engage new partners in sectors where Chinese involvement is weakest.',
        effects: { sovereignty: 8, economicStrength: 8, internationalStanding: 8, publicSupport: 5 },
        nextNode: 'ending_pragmatic_sovereignty',
      },
    ],
  },

  {
    id: 'selective_engagement',
    phase: 5,
    title: 'Selective Partners, Sovereign Path',
    narrative: `Your approach of containing Chinese involvement to agriculture while developing other sectors through diverse partnerships has created a balanced portfolio. Indian IT firms help build your digital government. Turkish construction companies compete with Chinese ones on infrastructure. Brazilian agricultural scientists complement Chinese agronomists. European research institutions partner with your universities.

No single partner dominates. No single creditor controls your policy. You are, in the language of international relations, a "swing state" — courted by all, captured by none. This gives you negotiating leverage that your GDP alone would never provide.

The diversified engagement model is less efficient than a single deep partnership. But efficiency was never the only goal. Sovereignty requires options, and you have them.`,
    choices: [
      {
        id: 'selective_mature',
        text: 'Continue the selective engagement model as you mature toward full sovereignty',
        consequence: 'You maintain strategic partnerships while building domestic capacity in every sector.',
        effects: { sovereignty: 10, economicStrength: 8, publicSupport: 5, humanDevelopment: 5, internationalStanding: 5 },
        nextNode: 'ending_sovereign_development',
      },
    ],
  },

  {
    id: 'sovereign_sez',
    phase: 5,
    title: 'Sovereign Economic Zones',
    narrative: `Your SEZs are unlike any in the developing world. Mandatory technology transfer means every foreign firm must partner with an Azanian counterpart. Sunset clauses on tax breaks mean incentives expire after seven years, by which time the firms either integrate into the domestic economy or leave — and the knowledge stays. A sovereign data requirement keeps all information about Azanian markets, consumers, and supply chains under national jurisdiction.

These aren't the compliant, investor-friendly zones the World Bank recommends. Foreign firms grumble about the regulations. But the firms that accept the terms are the ones you want — committed to a long-term presence, willing to share knowledge, planning to stay.

The result is an industrial base that is foreign-invested but nationally embedded. Your workers manage the factories. Your engineers maintain the equipment. Your data scientists analyze the market. If a firm leaves, the capacity remains.`,
    choices: [
      {
        id: 'sov_sez_national',
        text: 'Transition the most successful zones to full national ownership',
        consequence: 'You exercise buyout clauses to bring the most productive enterprises under Azanian control.',
        effects: { sovereignty: 12, economicStrength: 10, publicSupport: 8, debtBurden: 5 },
        nextNode: 'ending_sovereign_development',
      },
    ],
  },

  {
    id: 'sovereign_brand',
    phase: 5,
    title: 'The Azanian Brand',
    narrative: `"Made in Azania" becomes a brand associated with quality, sustainability, and fair labor. Your organic coffee is served in specialty cafes from Tokyo to Berlin. Your fair-trade cobalt is sought by EV manufacturers marketing green credentials. Your artisanal crafts command premium prices online.

Branding transforms the terms of trade. Instead of selling raw materials at commodity prices set by international markets, you're selling finished products at premium prices set by the value your story and standards add. The surplus stays in Azania, in the hands of the workers and farmers who created it.

This is what development looks like when it serves the people who do the developing. Not GDP growth as an abstraction, but rising living standards as a lived reality.`,
    choices: [
      {
        id: 'brand_expand',
        text: 'Expand the sovereign brand model across all export sectors',
        consequence: 'You build a national export promotion agency centered on the Azanian quality standard.',
        effects: { sovereignty: 10, economicStrength: 12, publicSupport: 10, internationalStanding: 8, humanDevelopment: 5 },
        nextNode: 'ending_sovereign_development',
      },
    ],
  },

  {
    id: 'fiscal_innovation',
    phase: 5,
    title: 'The New Fiscal Architecture',
    narrative: `Your innovative fiscal approach has created a revenue base independent of both IMF conditionality and excessive borrowing. Digital taxes capture value from tech multinationals. Financial transaction levies generate stable revenue. Diaspora bonds connect your global community to national development. A small tax on natural resource extraction feeds a sovereign wealth fund.

This fiscal sovereignty — the ability to fund your own development through domestic revenue rather than foreign loans — is perhaps the most fundamental form of sovereignty there is. As Hudson argues, financial control is the ultimate form of imperial power; financial independence is therefore the ultimate form of liberation.

Your fiscal innovation is being studied by other developing nations. A "New Bretton Woods" conference, organized by the same coalition you helped build, proposes these mechanisms as alternatives to the debt-dependency model.`,
    choices: [
      {
        id: 'fiscal_institutionalize',
        text: 'Institutionalize these innovations and share them with the Global South',
        consequence: 'You establish an international center for fiscal innovation in your capital.',
        effects: { sovereignty: 12, internationalStanding: 10, economicStrength: 8, publicSupport: 5, humanDevelopment: 5 },
        nextNode: 'ending_sovereign_development',
      },
    ],
  },

  {
    id: 'electoral_development',
    phase: 5,
    title: 'Development and Democracy',
    narrative: `The election approaches with a strong development record. Roads reach villages that were isolated for decades. Clinics serve communities that never had healthcare. Markets connect producers to consumers efficiently. Your approval rating is strong.

But elections in developing countries are precarious moments. The opposition, funded by interests hostile to your reforms, runs on a platform of "opening up to investors" — code for reversing nationalization and lowering labor standards. External actors funnel money to opposition campaigns. Social media manipulation targets your base.

Democracy and development are in tension. The reforms that serve the people long-term can be reversed by an election financed by those who profit from dependency. The challenge is to make your development achievements durable enough to survive any electoral outcome.`,
    choices: [
      {
        id: 'elect_institutional',
        text: 'Focus on institutionalizing gains — constitutional protections for key development policies',
        consequence: 'You propose amendments that protect sovereign resources and social programs.',
        effects: { sovereignty: 10, publicSupport: 8, humanDevelopment: 5, economicStrength: 5 },
        nextNode: 'ending_pragmatic_sovereignty',
      },
    ],
  },

  {
    id: 'climate_sovereignty',
    phase: 5,
    title: 'Climate and Sovereignty',
    narrative: `Your comprehensive climate adaptation program becomes a model for the continent. Drought-resistant crops developed by your agricultural scientists are shared with neighboring countries. Solar-powered irrigation systems free farmers from dependence on unreliable rainfall. Reforestation programs restore degraded land and sequester carbon.

The climate crisis, which threatened to derail your development, has become an opportunity. Green technologies adapted to African conditions are your fastest-growing export. Climate financing — available on better terms than development loans — funds your infrastructure. Your moral authority as a climate-vulnerable nation leading on adaptation gives you international standing that your economy alone wouldn't provide.

As Ajl argues, genuine climate justice requires challenging the economic structures that created the crisis. Your approach does exactly that: building resilient local food systems instead of depending on global commodity chains, generating clean energy instead of importing fossil fuels, and claiming climate finance as a right, not a favor.`,
    choices: [
      {
        id: 'climate_lead',
        text: 'Leverage climate leadership into broader sovereign development',
        consequence: 'You make Azania the center of African climate innovation and sovereign development.',
        effects: { sovereignty: 10, internationalStanding: 12, economicStrength: 8, publicSupport: 10, humanDevelopment: 8 },
        nextNode: 'ending_sovereign_development',
      },
    ],
  },

  {
    id: 'pragmatic_relief',
    phase: 5,
    title: 'The Pragmatic Compromise',
    narrative: `The aid arrives. Your people eat. The crisis passes. But the bilateral investment treaty you signed with the US limits your regulatory options for a decade. The EU seed patents create dependencies. You've survived the emergency at the cost of future policy space.

This is the recurring dilemma of the Global South: short-term survival versus long-term sovereignty. No leader can let their people starve on principle. But every concession made under duress narrows the path forward.

Your challenge now is to work within these new constraints while slowly expanding your options. It's not the revolutionary path, but revolutions require resources you don't yet have.`,
    choices: [
      {
        id: 'relief_work_within',
        text: 'Work within constraints while building alternatives — the long game',
        consequence: 'You comply with treaty obligations while investing in domestic capacity that reduces future dependency.',
        effects: { sovereignty: 5, economicStrength: 5, publicSupport: 3, humanDevelopment: 5 },
        nextNode: 'ending_pragmatic_sovereignty',
      },
    ],
  },

  {
    id: 'bilateral_web',
    phase: 5,
    title: 'The Web of Partnerships',
    narrative: `Your bilateral approach yields a complex web of relationships, each optimized for specific sectors. South Africa for manufacturing partnerships. Kenya for technology. Ethiopia for agricultural cooperation. Rwanda for governance reform. Nigeria for market access. Each relationship is calibrated to mutual benefit.

The web is more resilient than any single partnership. If one relationship frays, others compensate. You're building the kind of South-South cooperation that development economists have theorized about for decades — not through grand institutions but through practical, bilateral relationships that create real value.

Your development is proceeding on multiple fronts simultaneously, driven by the specific advantages each partner brings. It's pragmatic, incremental, and effective.`,
    choices: [
      {
        id: 'web_formalize',
        text: 'Formalize the strongest partnerships into a permanent development network',
        consequence: 'You propose an African Development Cooperation Framework built on your bilateral successes.',
        effects: { sovereignty: 8, internationalStanding: 10, economicStrength: 8, publicSupport: 5 },
        nextNode: 'ending_pragmatic_sovereignty',
      },
    ],
  },

  {
    id: 'debt_equity_gamble',
    phase: 5,
    title: 'The Equity Gamble',
    narrative: `The debt-for-equity swap halves your outstanding debt but gives China permanent ownership stakes in your infrastructure. The railway, the port, and two power plants now have Chinese shareholders. Debt service drops dramatically, freeing fiscal space, but dividends flow to Beijing indefinitely.

This is a new form of the dependency trap — not debt dependency but equity dependency. Your infrastructure generates wealth, but a permanent share of that wealth flows outward. As Kadri's analysis of value transfer would predict, the surplus created by Azanian labor is partially captured by external capital.

The gamble is whether the reduced debt burden allows you to grow fast enough that the equity share becomes proportionally smaller. If your economy doubles, China's fixed stake halves in relative terms. But if growth stalls, you've sold the family silver.`,
    choices: [
      {
        id: 'equity_grow',
        text: 'Focus on maximum growth to dilute the Chinese equity position over time',
        consequence: 'You pursue aggressive expansion to make the economy larger than the equity stakes.',
        effects: { economicStrength: 10, sovereignty: -3, debtBurden: -5, publicSupport: 3 },
        nextNode: 'ending_dependent_development',
      },
    ],
  },

  {
    id: 'sovereign_bloc_victory',
    phase: 5,
    title: 'The Cartel Holds',
    narrative: `The African Critical Minerals Alliance holds firm. The consuming nations, after initial resistance, accept that the era of cheap African resources is over. Prices stabilize at levels that fund genuine development. Processing plants spring up across the continent as cartel members invest in value-addition.

Your collective bargaining power has achieved what no individual nation could: a fundamental shift in the terms of trade. The surplus that used to flow from African mines to Western shareholders now circulates within the continent, funding hospitals, schools, and factories.

Nkrumah's vision of Pan-African economic power is manifest. Not as a utopian union of African states, but as a practical cartel that leverages material advantage into developmental outcomes. The parallel to OPEC is apt — and like OPEC's founders, you understand that resource leverage is most powerful when it funds domestic transformation rather than mere consumption.`,
    choices: [
      {
        id: 'cartel_victory',
        text: 'Use cartel revenues to achieve comprehensive sovereign development',
        consequence: 'You channel mineral wealth into a generation-defining development program.',
        effects: { sovereignty: 15, economicStrength: 12, publicSupport: 10, humanDevelopment: 8, infrastructure: 8 },
        nextNode: 'ending_sovereign_development',
      },
    ],
  },

  {
    id: 'brics_alignment',
    phase: 5,
    title: 'The BRICS Path',
    narrative: `As a BRICS member, you gain access to alternative financial infrastructure: the NDB for development loans, the Contingent Reserve Arrangement as a safety net, and bilateral swap lines that reduce dollar dependency. Your trade is increasingly settled in local currencies.

The BRICS framework offers something the Western system never did: a voice. As a small African economy in the IMF, you had no influence over rules that governed your life. In BRICS, the governance structure, though imperfect, gives developing nations genuine representation.

But BRICS has its own internal dynamics. China's economic weight dominates. India and China have competing visions for the bloc. Russia's geopolitical conflicts create complications. You navigate these currents carefully, always seeking the arrangement that maximizes your sovereign development space.`,
    choices: [
      {
        id: 'brics_sovereign',
        text: 'Use the BRICS platform to advance sovereign development goals',
        consequence: 'You leverage BRICS membership for financing, technology, and diplomatic support.',
        effects: { sovereignty: 8, economicStrength: 8, internationalStanding: 8, publicSupport: 5, debtBurden: -5 },
        nextNode: 'ending_pragmatic_sovereignty',
      },
    ],
  },

  // ═══════════════════════════════════════
  // ENDINGS
  // ═══════════════════════════════════════

  {
    id: 'ending_sovereign_development',
    phase: 6,
    title: 'Sovereign Development',
    narrative: '',
    choices: [],
    isEnding: true,
    endingType: 'victory',
    endingTitle: 'Sovereign Development Achieved',
    endingNarrative: `The Republic of Azania stands as proof that another path is possible. Your country is not rich by the standards of the Global North — but it is sovereign, dignified, and developing on its own terms. Your people eat food grown by Azanian farmers on Azanian land. Your factories employ Azanian workers making goods for Azanian and regional markets. Your debts are manageable, your institutions accountable, your future in your own hands.

You have not followed the Washington Consensus or the Beijing Consensus. You have built something that the thinkers who inspired your journey would recognize: development that serves the people who do the developing, sovereignty that is economic as well as political, and engagement with the world that does not require submission to it.

As Nkrumah wrote: "We face neither East nor West; we face forward." Azania faces forward.`,
  },

  {
    id: 'ending_rising_power',
    phase: 6,
    title: 'Rising Power',
    narrative: '',
    choices: [],
    isEnding: true,
    endingType: 'victory',
    endingTitle: 'A Rising Power',
    endingNarrative: `Azania has not merely developed — it has transformed. Your economy grows at rates that command international attention. Your technology sector innovates. Your manufactured exports compete globally. Your universities attract students from across the continent.

The path here required compromises. Some sovereignty was traded for growth. Some debt was taken on for investment. Some foreign equity was accepted for technology. But the net direction is unmistakable: Azania is ascending, and its ascent is lifting its neighbors with it.

The development model you pioneered — pragmatic, flexible, borrowing from every tradition while submitting to none — is being studied and adapted across the Global South. You have proven that a developing nation in the 21st century can industrialize, can build domestic capacity, can chart its own course. The future is not written in Washington or Beijing. It is written in Azania.`,
  },

  {
    id: 'ending_pragmatic_sovereignty',
    phase: 6,
    title: 'Pragmatic Sovereignty',
    narrative: '',
    choices: [],
    isEnding: true,
    endingType: 'partial_victory',
    endingTitle: 'Pragmatic Sovereignty',
    endingNarrative: `Azania's path has been neither revolutionary nor submissive. You've navigated the currents of global power with skill, accepting constraints where necessary while always pushing for greater independence. Your sovereignty is real but imperfect — constrained by international agreements, trade relationships, and the structural realities of a global economy designed by and for richer nations.

Your people are better off than they were. Poverty has fallen. Services have improved. The economy grows, if not spectacularly. The institutions you've built are imperfect but functional. Democracy is messy but alive.

This is not the triumphant sovereignty Nkrumah dreamed of. But it may be the achievable sovereignty that history allows. As Deng understood, perfection is the enemy of progress. You have made progress, and the next generation inherits a country with more options than you had.

The struggle continues. It always does. But you've moved the line forward.`,
  },

  {
    id: 'ending_dependent_development',
    phase: 6,
    title: 'Dependent Development',
    narrative: '',
    choices: [],
    isEnding: true,
    endingType: 'defeat',
    endingTitle: 'Dependent Development',
    endingNarrative: `Azania grows, but it grows for others. Your GDP rises, but the surplus flows to foreign shareholders, creditors, and supply chain owners. Your workers are employed, but in jobs that serve global value chains rather than national development priorities. Your government operates within parameters set by international institutions and bilateral agreements that constrain genuine sovereign choice.

This is what dependency theorists call "dependent development" — growth without autonomy, modernization without liberation. By the metrics the World Bank uses, you're a success story. By the metrics that matter to your people — control over their own destiny — the picture is less clear.

Nkrumah's warning has proven prophetic: "The essence of neo-colonialism is that the state which is subject to it is, in theory, independent and has all the outward trappings of international sovereignty. In reality its economic system and thus its political policy is directed from outside."

The struggle for genuine sovereignty continues. Perhaps the next generation will find the path you could not.`,
  },
];

export function getNode(id: string): NarrativeNode | undefined {
  return narrativeNodes.find((n) => n.id === id);
}
