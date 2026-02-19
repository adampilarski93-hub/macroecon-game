import type { NarrativeNode } from './types';

/**
 * Sovereign Development Path — Branching narrative decision tree
 *
 * Intellectual framework drawn from:
 * - Michael Hudson: debt as a tool of empire
 * - Eric Toussaint: unfair debt, the right to refuse illegitimate loans
 * - Kwame Nkrumah: neo-colonialism, Pan-African solidarity
 * - Lina Benabdallah: China-Africa relations, South-South cooperation
 * - Max Ajl: farming, food security, decolonial development
 * - Ali Kadri: how wealth flows from poor countries to rich ones
 * - Roland Boer: Chinese socialism, mixing state planning with markets
 * - Deng Xiaoping: practical reform, special economic zones
 * - John Smith: how global supply chains exploit cheap labor
 * - Yingying Fu & Eduardo Olie: cooperation between developing nations
 * - Utsa Patnaik: colonial wealth extraction, food security, how poverty is measured
 * - Prabhat Patnaik: how rich countries keep poor countries poor through
 *   debt, austerity, and control over trade
 * - Rosa Luxemburg: capitalism's need to expand into new markets,
 *   the mass strike, reform vs. revolution, militarism and imperialism,
 *   ongoing dispossession ('primitive accumulation'), democracy from below
 *
 * Research from Agrarian South: Journal of Political Economy (open access):
 * - Moyo, Jha & Yeros, "The Classical Agrarian Question" (2013), 2(1)
 * - Prabhat Patnaik, "The Peasant Question and Contemporary Capitalism" (2012), 1(1)
 * - Utsa Patnaik, "First World Import Dependence on Developing Countries" (2015), 4(1)
 * - Costantino, "Land Grabbing in Latin America" (2014), 3(1)
 * - Tsikata, "Gender, Land Tenure and Agrarian Production in Sub-Saharan Africa" (2016), 5(1)
 * - Amin, "The Agrarian Question a Century after October 1917" (2017), 6(2)
 * - Sit Tsui et al., "Re-organizing Peasant Labour for Resilience in China" (2017), 6(1)
 * - Shivji, "The Concept of 'Working People'" (2017), 6(1)
 * - Moyo, "Debating the African Land Question with Archie Mafeje" (2018), 7(2)
 * - Santos Baca, "Food Consumption Pattern of the Free Market: Mexico Under NAFTA" (2019), 8(1-2)
 * - Mazwi et al., "Political Economy of Command Agriculture in Zimbabwe" (2019), 8(1-2)
 * - Yeros & Jha, "Late Neo-colonialism: Monopoly Capitalism in Permanent Crisis" (2020), 9(1)
 * - Prabhat Patnaik, "Neoliberalism and Fascism" (2020), 9(1)
 * - Ossome, "Pedagogies of Feminist Resistance: Agrarian Movements in Africa" (2021), 10(1)
 * - Prabhat Patnaik, "Engels and the Worker-Peasant Alliance" (2021), 10(1)
 * - Hernández, "The Evolution of Cuban Agrarian Relations" (2014), 3(2)
 * - Harriss-White, "Capitalism and the Common Man: Peasants and Petty Production" (2012), 1(2)
 * - Kumar, "India's Rice Export: What is in it for Farmers?" (2018-19) — Samir Amin Prize
 * - Utsa Patnaik, "On Political Economy and Fallacies" (2022), 11(3)
 * - Jha, "Growing Restiveness of the Peasantry in Contemporary India" (2024), 13(1)
 * - Prasad, "Adivasi Women, Agrarian Change and Forms of Labour" (2016), 5(1)
 * - Rios & Maciel, "Brazilian Black Feminism in Rural and Urban Spaces" (2021), 10(1)
 * - Special issues: Pathways to Ecological Transition (2023); Tribute to Samir Amin (2020)
 */

export const narrativeNodes: NarrativeNode[] = [

  // ═══════════════════════════════════════
  // PHASE 1: THE OPENING
  // ═══════════════════════════════════════

  {
    id: 'start',
    phase: 1,
    title: 'A Nation at the Crossroads',
    narrative: `You've just been elected president of the Republic of Azania, an African nation of 28 million people. Your country has plenty of valuable resources — cobalt, copper, and fertile farmland — but most of your people live on less than two dollars a day. The only railway runs straight from the mines to the coast. It was built by colonizers not to help your people, but to ship your wealth overseas.

This poverty wasn't an accident. As the historian Utsa Patnaik has shown, colonial powers got rich by draining wealth from countries like yours for centuries. They used a clever trick: they took your country's own tax money and used it to "buy" your exports, making it look like normal trade when it was really just taking. The roads, rails, and schools they built were designed to serve the colonial system, not your people. Your country wasn't simply left behind — it was actively made poor so that others could get rich.

Your predecessor borrowed heavily from Western banks in the 1990s. Those debts have ballooned. Now, 40% of your government's money goes to paying off loans instead of building schools or hospitals. Roads are falling apart. The only major hospital needs backup generators because the power grid keeps failing. Half your population is under 25, and youth unemployment is over 40%. As the economist Prabhat Patnaik explains, this isn't just a money problem — it's a system designed so that powerful countries get cheap resources and labor from countries like yours, and debt is the tool they use to keep that system running.

As Sam Moyo, Praveen Jha, and Paris Yeros argued in their landmark study of the "classical agrarian question" (Agrarian South, 2013), the central challenge for countries like yours hasn't changed since independence: how do you transform an economy built to serve colonial extraction into one that serves your own people? The old colonial economy left you exporting cheap raw materials and importing expensive manufactured goods. Breaking that pattern is the key to everything.

Two groups want to meet with you this week. The first is from China, offering to build infrastructure through their Belt and Road program. The second is from the International Monetary Fund (IMF), offering a financial rescue package. Your finance minister has also sketched out a plan to develop using your own resources — slower and harder, but you'd owe nothing to anyone.

As the Pan-African leader Kwame Nkrumah once warned: a country can look independent on the outside while being controlled from the outside through its economy. The question facing you is whether you can accept help without giving up the independence your people fought for.`,
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
    narrative: `The Chinese team is led by an experienced development banker who has worked across East Africa. Their offer is big: $2.4 billion to build a new railway, a deep-water port, two power plants, and a fiber-optic internet network. The interest rate is just 2% — much cheaper than Western banks would charge. Construction could start in six months.

But the details matter a lot. As researcher Lina Benabdallah has shown, China's deals in Africa aren't all the same. Some are one-sided resource grabs; others include genuine training and knowledge-sharing. The terms you negotiate right now will decide which kind of deal this becomes.

The Chinese team offers three options. The first is a "turnkey" package: Chinese companies build everything, Chinese workers do the labor, and you repay partly with future mineral exports. It's fast, but your people don't learn anything, and your cobalt is promised away for decades. The second option adds training programs and requires that 60% of workers be Azanian. The third is smaller — just the power grid and internet network — leaving the railway and port for later.

Your finance minister warns that any option means taking on a lot more debt. Your labor minister says that without hiring requirements, the construction jobs will go entirely to foreign workers.`,
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
    narrative: `The IMF team arrives with a familiar set of demands. They'll lend you $1.8 billion over three years, but only if you agree to major "reforms." The conditions: cut government workers' pay by 15%, sell off the state mining company to private buyers, remove fuel and food subsidies, open your financial markets to foreign money, and run a tight budget with spending cuts.

Economist Michael Hudson has studied IMF lending closely and argues it works like a wealth transfer — poor countries are forced to cut spending and sell off assets, and the money flows back to rich countries. Eric Toussaint, who has spent decades researching Global South debt, documents how these programs have crushed living standards across Africa, Asia, and Latin America while enriching financial centers.

Prabhat Patnaik explains the hidden logic: when the IMF forces a country to slash spending and wages, it squeezes people's buying power. This has a double benefit for wealthy nations — it makes the poorer country's exports cheaper (because desperate workers accept lower pay) while also forcing it to import less. In other words, the country tightens its belt so that its resources become cheaper for everyone else. The budget cutting isn't really a path to recovery — it's a way to keep the old pattern of wealth extraction going.

Your economic advisor reminds you that the last time Azania did this in the 1990s, 200 factories closed, the clothing industry collapsed, and a whole generation of educated young people left the country. But an IMF stamp of approval would calm international investors, stabilize the currency, and unlock more loans from the World Bank.

The IMF team says they're flexible on timing — which reforms come first — but privatization and opening markets are not up for debate.`,
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
    narrative: `You announce that Azania will build its future using its own resources. The reaction is swift: Western financial media calls it "economic nationalism." Credit rating agencies put you on a warning list. Your finance minister gets nervous calls from people who hold Azanian bonds. But in the streets, there's a wave of national pride.

Prabhat Patnaik's work helps explain why the reaction is so hostile. He argues that the global economic system needs access to cheap resources and labor from countries like yours. Any country that tries to keep its own wealth at home — to use its minerals and farmland for its own people instead of for foreign profit — will face economic and political backlash. That credit rating downgrade isn't a neutral judgment; it's a punishment for breaking the rules of the game.

Your development team presents three strategies. The first focuses on farming: redistribute land to small farmers, grow more food at home, and stop depending on expensive food imports. As researcher Max Ajl argues, no country has ever built a strong economy without first making sure its people can feed themselves. Utsa Patnaik's research backs this up — she's shown that colonial wealth extraction started with taking control of farming, so real independence has to start with taking it back.

The second strategy: take back the mines. Right now, foreign companies dig up your cobalt and copper and ship the profits overseas. Nationalize the mining sector, keep the profits at home, and invest them in hospitals, schools, and roads. This is what Bolivia did with lithium and what Nkrumah tried with gold. As Yeros and Jha argue in their study of "late neo-colonialism" (Agrarian South, 2020), today's monopoly capitalism keeps the old colonial extraction going through corporate control of resources — and only state action can reverse it.

The third is the long game: pour money into education and healthcare, build a skilled population, and wait for the results. Gladys Hernández's study of Cuban agrarian reform (Agrarian South, 2014) shows how Cuba combined education and agriculture to build self-reliance, even under harsh external pressure. But your people are hungry now and patience has limits.

None of these paths is easy. All require sacrifice. But as China's Deng Xiaoping said when launching his reforms: "We are crossing the river by feeling the stones."`,
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
        text: 'Nationalize the mining sector and keep the profits at home',
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

  {
    id: 'china_construction_boom',
    phase: 3,
    title: 'The Construction Boom',
    narrative: `Within months, Azania is one giant construction site. Chinese engineering firms arrive with heavy equipment. The railway takes shape at amazing speed. But tensions are rising too.

Local businesses are shut out. Chinese workers live in separate compounds, and rumors spread about poor working conditions and environmental damage. The opposition calls you a "sell-out." A leaked contract clause reveals that if Azania can't pay back the loan, China gets to control the deep-water port for 99 years. As researcher John Smith points out, this is the modern version of empire — controlling a country's key infrastructure instead of planting a flag.

Meanwhile, global cobalt prices have crashed 30%. You owe money in US dollars, but your income is shrinking. Your finance minister warns that without changes, you'll be unable to pay your debts within two years.

You need to act fast.`,
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

  {
    id: 'china_tech_partnership',
    phase: 3,
    title: 'The Technology Transfer',
    narrative: `The negotiated deal is harder to manage, but it's starting to pay off. Chinese engineers work side by side with Azanian trainees building the power plant. A training center has graduated its first class of electricians and welders. The new internet network is sparking a tech startup scene in the capital.

Researcher Lina Benabdallah has documented exactly this: when African countries negotiate firmly, Chinese partnerships can include real skills training that lasts long after the construction ends. Your education minister reports that 2,000 Azanian workers now have advanced construction certifications.

But the project is running late. Local workers are still learning, and quality issues have delayed the railway by eight months. The Chinese project manager is frustrated. Beijing is hinting that you should relax the local hiring rules to speed things up. Your infrastructure minister says the delays are worth it — your people are learning. Your finance minister says every month of delay costs $15 million.

On top of this, a drought in the south has created a food crisis. You have to decide where to spend your limited money.`,
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

  {
    id: 'china_selective',
    phase: 3,
    title: 'Power and Connectivity',
    narrative: `The targeted approach is working. New power plants have cut blackouts by 70%. Every provincial capital now has high-speed internet. Mobile payments have tripled. Small businesses are growing. And because you only borrowed what you needed, your debt is manageable.

But you still don't have a railway or port. Getting goods from the interior to the coast still takes three days on crumbling colonial-era roads. Farm produce rots before it reaches market. Mining companies complain about high transport costs. The Chinese are offering to come back and build the railway, but so are a European group and a group of African development banks.

As Roland Boer writes about China's development strategy, the key is doing things in the right order — one practical step at a time. Your power grid and internet have created a foundation. The question now is who builds the next piece, and on what terms.`,
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

  {
    id: 'imf_austerity',
    phase: 3,
    title: 'The Austerity Shock',
    narrative: `The IMF program hits like a hurricane. Government workers — who haven't had a raise in years — see their pay cut by 15%. Removing fuel subsidies doubles transport costs overnight. Cheap imported food floods in, destroying local farmers. As economist Ali Kadri has documented, "free trade" often destroys the ability of poorer countries to produce things for themselves. Andrea Santos Baca's study of Mexico under NAFTA (Agrarian South, 2019) shows exactly what happens: when Mexico opened its markets to cheap American corn, millions of Mexican farmers were ruined, diets got worse, and the country lost the ability to feed itself.

Utsa Patnaik's research on what happens when countries remove food subsidies is playing out in real time. As food gets more expensive, the poorest 40% of people can no longer afford to eat properly. Hospitals report a spike in child malnutrition and anemia in pregnant women. The IMF's official poverty statistics — which Patnaik has shown use misleading methods that undercount the poor — will call the impact "modest." The hospitals tell a very different story. Archana Prasad's research on women workers in India (Agrarian South, 2016) found the same pattern: when governments cut spending and deregulated markets, it was women and indigenous communities who suffered first and worst.

The state mining company is sold off at a bargain price. A Canadian mining corporation buys 70% of it for $400 million — roughly one year's worth of cobalt revenue that used to go to the government. Your finance minister points out the bitter irony: the IMF loan is now being used to pay off older debts to Western banks, while the mining wealth that could have funded development is flowing to shareholders in Toronto. This is what Prabhat Patnaik calls "income deflation" made visible: Azania's people are squeezed, its assets sold cheap, and the wealth that could build the country flows abroad instead.

The streets erupt. University students occupy parliament square. Unions call a general strike. The military chief asks for a private meeting to discuss "stability."

As Michael Hudson warns: indebted nations are forced to sell off their assets and cut services to keep paying loans, getting poorer while the lenders get richer. Can you navigate this storm?`,
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

  {
    id: 'imf_partial',
    phase: 3,
    title: 'The Compromise',
    narrative: `The compromise is holding — barely. You kept the mining company in government hands, but the other conditions are taking a toll. Removing fuel subsidies has angered city dwellers. Pay freezes are driving teachers and nurses to emigrate. Budget targets mean you can't fix the roads.

But there are signs of stability. The currency has stopped falling. Foreign investment in mining has picked up. The World Bank approved extra loans for healthcare and education. Your credit rating has improved slightly.

Then the Chinese ambassador requests a private meeting. China will build infrastructure on good terms — if you steer the next mining deal their way. The Americans warn, through back channels, that serious Chinese involvement would "complicate" your relationship with Washington. You're caught in a tug-of-war between great powers — a situation that more and more Global South countries face.`,
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

  {
    id: 'imf_minimal_path',
    phase: 3,
    title: 'The Regional Approach',
    narrative: `Your combination of a small IMF loan and African bonds is unusual, and markets are watching. The African bond sale did well — there's real appetite among African investors for African government debt, though at higher interest rates than the IMF charges.

The smaller IMF package means fewer strings attached, but also less money. You have enough to keep the currency stable and maintain basic services, but not enough for the infrastructure your country desperately needs. You're in a holding pattern: stable enough not to collapse, too constrained to grow.

Eric Toussaint's research points to a bold third option: a debt audit. Your country's original debts were taken on by a military dictator in the 1980s, spent on weapons and stolen through corruption. Under international law, these could be "odious debts" — debts that a democratic government has no obligation to repay because they never benefited the people. Refusing to pay them would free up huge amounts of money, but the financial backlash would be severe.`,
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

  {
    id: 'agro_reform',
    phase: 3,
    title: 'Land Reform',
    narrative: `Your land reform program is the biggest project since independence. You take unused estate land and give it to small farmers, set up farming cooperatives backed by the state, and invest in irrigation. The World Bank warns you're "distorting markets." The old landowners threaten to sue. But as Max Ajl argues, without land reform, the rural majority stays trapped in poverty, and without being able to feed itself, your country stays dependent on expensive food imports.

Utsa Patnaik's decades of research provide both a warning and a roadmap. She's shown how colonial rulers forced farmers to grow cash crops for export instead of food for their own people — leaving populations hungry even as farm output grew on paper. Dzodzi Tsikata's study of gender and land tenure in Sub-Saharan Africa (Agrarian South, 2016) adds a crucial layer: women do most of the farming in countries like yours, but they often don't have secure rights to the land they work. Your reform program must address this — giving women equal land rights isn't just fair, it's how you get the best results. Her research also showed that the Green Revolution's bigger harvests often came at the cost of nutrition and farmer independence — more tons of fewer crops while hunger continued. Taking her analysis seriously, your cooperatives grow food crops first and cash crops second, making sure Azania feeds itself before selling to the world. You set up a public food distribution system guaranteeing affordable basic grains — the kind of safety net Patnaik says is essential for any country serious about ending real poverty, not just poverty as measured by misleading World Bank statistics.

The first harvest beats expectations by 20%. Cooperative farms produce more per acre than the old estates. Food imports drop by a third. For the first time in a generation, rural communities see a future. Nutrition among the poorest improves for the first time in a decade.

But the cities haven't kept up. Without better infrastructure, factories can't compete. The urban middle class grumbles about higher taxes funding "peasant programs." And the old landowners are bankrolling an opposition party that accuses you of "destroying property rights."

The Western press compares you to Zimbabwe. The Chinese ambassador notes, with careful neutrality, that "China's own reform started with agriculture before moving to industry."`,
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

  {
    id: 'mining_national',
    phase: 3,
    title: 'Nationalization',
    narrative: `The nationalization shocks global markets. Cobalt prices spike. The Canadian and Australian mining companies threaten to sue in international courts. The US issues a "travel advisory" — diplomatic code for economic hostility. Credit agencies downgrade you to junk status.

But the money tells a different story. Within six months, the state mining company is making three times what the foreign firms ever paid in taxes. You're now keeping the full value of your resources at home — what economist Ali Kadri calls "surplus retention," the most basic requirement for building your own economy. The money flows into roads, hospitals, and schools. The hostile reaction from powerful countries confirms what Prabhat Patnaik argues: the global economic system treats access to cheap resources from poorer countries as a necessity, and any disruption triggers a response far bigger than the money at stake. The credit downgrade, the lawsuits, the diplomatic pressure — these are punishment tools of a system that no longer needs colonial governors because it has financial ones.

Utsa Patnaik's historical research puts this in context. During colonial times, the drain of wealth from colonies to Britain — which she estimates at $45 trillion from India alone in today's money — was hidden by making it look like normal trade. Today the methods are different — corporate profits sent abroad, creative accounting, debt payments — but the direction of the flow is the same. Your nationalization is an attempt to reverse that flow.

But the foreign mining lobby isn't done. They're funding opposition politicians, feeding negative stories to journalists, and pressuring your trading partners. Your cobalt still has to reach world markets, and the supply chains run through companies that are hostile to you.

Meanwhile, your mining engineers are capable but understaffed. Production efficiency has dropped 15% since nationalization. You need expertise — but without giving up control.`,
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

  {
    id: 'education_investment',
    phase: 3,
    title: 'The Knowledge Foundation',
    narrative: `You launch the biggest education program in Azania's history, inspired by Cuba's literacy campaigns and Kerala's public health success. You deploy 10,000 new teachers and health workers to rural areas. University enrollment doubles. A new technical school opens, focused on engineering and agricultural science.

The results won't show for years, but the signs are good. Deaths during childbirth drop 25%. Child malnutrition falls. Youth crime declines as community programs offer alternatives. Your human development numbers start climbing.

But the economy grows slowly. Infrastructure is still crumbling. The educated graduates you're producing can't find good jobs at home. A brain drain begins: your best students get recruited by European hospitals, Gulf construction firms, and American tech companies. You're investing in talent that other countries harvest — as John Smith documents, this is how poorer countries end up subsidizing richer ones through the movement of trained workers.

Your opponents say you're building a nation of educated unemployed. Your supporters say you're planting seeds that will feed generations.`,
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

  {
    id: 'china_renegotiate',
    phase: 4,
    title: 'Renegotiating with Beijing',
    narrative: `The renegotiation with China is tense but goes better than expected. Beijing has learned from bad press elsewhere — the "debt trap" accusations have forced them to soften their approach. They agree to stretch payments from 20 to 30 years, lower the interest rate, and convert some debt into shares in a joint infrastructure company where Azania holds 51%.

This matches what Benabdallah documents: China's approach in Africa isn't fixed. When countries push back firmly, the deals get better. Your team came prepared — they knew every contract detail, had alternative financing options ready, and had strong public support — and that gave you real bargaining power.

But the port is still under a 50-year Chinese lease. And a new problem has appeared: the EU has announced a carbon tax on imports. Your mining exports to Europe will face steep penalties unless you switch to clean energy — and the coal power plants China built are now a problem.`,
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
    narrative: `The economic zones along the railway are attracting investment. Chinese factories set up electronics assembly, textile, and light manufacturing operations. Jobs are being created. But conditions in some factories are harsh — as John Smith documents in his study of global supply chains, workers in poorer countries often produce goods for export at wages that barely cover basic needs.

China's Deng Xiaoping faced the same criticism in the 1980s: his coastal economic zones were called "capitalist sell-outs" by critics. His answer was practical — you have to experiment to grow, and the benefits would spread over time. But would they?

Your labor minister wants to enforce better wages and safety rules. The factory owners threaten to move to a cheaper country. Your youth unemployment rate has improved a lot. The factories, for all their problems, are providing the first industrial jobs many young people have ever had.

The question Deng faced is now yours: how much do you compromise for economic growth, and when do you start taking back control?`,
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
    narrative: `Your demand for local hiring has created a standoff. Chinese construction firms threaten to leave. Beijing has frozen the next payment. Half-built bridges stand abandoned. The opposition accuses you of wrecking the economy.

But your gamble has rallied something powerful: national pride. The construction workers' union has organized 50,000 members marching for "Azanian jobs on Azanian projects." Youth movements carry banners reading "Sovereignty is not negotiable." Even the military chief has publicly backed you.

This is the moment Nkrumah described — when political independence has to be backed up by economic independence. Beijing needs your cobalt. You need their infrastructure. The question is who blinks first, and whether there's a way forward where nobody has to.`,
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
    narrative: `The infrastructure is built. The railway runs. The port is busy. The economy is growing at 7% a year. But the growth feels hollow. Chinese firms run the logistics. The technology transfer you hoped for never happened. Your workers load and unload shipping containers but don't design or manage the systems.

And the debt. Rushing construction meant accepting worse terms. Your debt now exceeds 80% of GDP. Every year, more export revenue goes to Beijing as loan payments — the same pattern Michael Hudson describes in US financial dominance, now repeated through infrastructure lending.

People are divided. The urban middle class likes the new roads and internet. The rural poor have been left out. Young people have jobs, but they see Chinese managers earning ten times their wages.`,
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
    narrative: `The southern drought is worse than predicted. Three provinces declare emergencies. Two million people face hunger. Climate change — a crisis your nation barely contributed to — is rewriting your development plans.

Your decision to keep training local workers has slowed construction, but the trained Azanian managers can now organize relief operations efficiently. The internet network lets you coordinate aid in real time. The skills you built are paying off in ways nobody expected.

The international community offers help, but with strings. The US pledges $100 million in food aid if you sign a treaty giving American companies special access. The EU offers drought-resistant seeds if you join their climate framework. China offers emergency rice with no conditions.

As Max Ajl has written, droughts like this aren't just natural disasters — they're the result of colonial land use, single-crop farming, and climate change all crashing together. Utsa Patnaik's research adds that countries that kept strong public food distribution systems handled food crises much better than those that let markets handle everything. The old colonial pattern — forcing farmers to grow exports instead of food — made countries like Azania especially vulnerable to exactly this kind of shock. As Prabhat Patnaik would note, becoming dependent on food imports is exactly what serves the interests of wealthy countries that want cheap access to your resources.`,
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
    narrative: `Your appeal to the African Union works. Kenya, Ethiopia, and South Africa send emergency grain. The African Development Bank fast-tracks a $200 million climate loan. Nigeria's Dangote Group offers to build a cement factory at cost. Rwanda shares its successful farming methods.

This is the vision Nkrumah laid out in "Africa Must Unite" — not just political speeches but real economic cooperation. The infrastructure China helped build is now carrying African solidarity shipments. The irony isn't lost on anyone.

But solidarity has limits. Each contributing country has its own agenda. South Africa wants first dibs on your cobalt. Kenya wants access to your market. Ethiopia sees you as a rival for Chinese investment. The solidarity is real, but so is the competition.

You're building something new: a network of partnerships among developing nations that gives you alternatives beyond just choosing between East and West.`,
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
    narrative: `Holding the course gets harder every day. A general strike shuts down the capital for a week. Food prices keep rising. The military chief's "stability" meetings become a weekly event. International media runs stories praising "the Azanian experiment in free-market reform."

The IMF releases a report praising your "fiscal discipline." GDP is technically growing at 0.3%. Inflation is falling. But behind those numbers hides a disaster: hospital admissions for malnutrition have tripled, school dropout rates have doubled, and the informal economy — people selling things on the street because they can't find real jobs — has exploded. Utsa Patnaik would spot the cruel irony: by the World Bank's poverty measurements — which she's proven systematically undercount the poor — your poverty rate has "improved." By the standard of whether people can actually feed their families, it's gotten much worse.

The privatized mining company is making record profits. Its shareholders in Toronto are thrilled. Your government gets a small royalty. The wealth flows out, as it always has. This is what the Patnaiks call the colonial drain in a new disguise: the method has changed from direct colonial taxation to corporate profits shipped abroad and debt payments, but the direction of the money flow — from poor countries to rich ones — hasn't changed at all.`,
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
    narrative: `The IMF, stung by criticism, agrees to soften the program. New safety nets are put in place: free school meals, healthcare for the poorest, and cash payments for vulnerable families. The austerity continues, but its worst edges are blunted.

Your finance minister finds creative ways to raise money: renegotiating contracts with telecom monopolies and putting a tax on multinational tech companies. These aren't the kinds of "reforms" the IMF usually recommends, but they work — government revenue grows without cutting services.

The compromise satisfies nobody completely. IMF hardliners want faster privatization. Social movements want the whole program scrapped. Elections are in two years, and the opposition is campaigning on "no more orders from Washington."`,
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
    narrative: `Stopping debt payments triggers an immediate crisis. Your currency drops 30%. Money flees the country. Creditors threaten lawsuits. The US Treasury warns of "consequences."

But something else happens. As Eric Toussaint would recognize, the pause breaks the debt cycle that's been draining your treasury for decades. Freed from loan payments, your government suddenly has money to spend. You invest in food stockpiles, start making things at home instead of importing them, and build emergency infrastructure. The currency drop, while painful, actually helps — it makes your exports cheaper and imports more expensive, which is exactly what you need to kick-start domestic industry.

History gives mixed signals. Argentina's 2001 default eventually led to recovery. Ecuador's 2008 debt audit freed money for social programs. But those countries had bigger, more diverse economies. You're more vulnerable, and the creditors know it.

Support arrives from unexpected places. Bolivia, Venezuela, and Cuba offer expertise. The African Union passes a resolution supporting your right to development. China stays quiet — watching to see if this creates an opening for them.`,
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
    narrative: `The citizen debt audit teams are thorough and devastating. They document how the military dictator borrowed $3.2 billion in the 1980s: $800 million went to weapons from France, $1.2 billion was stolen and hidden in Swiss bank accounts, and $1.2 billion funded prestige projects that were never finished. With interest and penalties, those original loans now total $8 billion — more than your entire annual GDP.

Following Ecuador's 2008 example, the audit declares 60% of the debt "illegitimate." Toussaint's legal argument is straightforward: debts taken on by dictators for corrupt purposes, where the lenders knew what was happening, don't bind the democratic government that comes after.

The creditors are furious. Lawsuits begin in London, New York, and Paris. Your foreign bank accounts are frozen. But at home, the audit has united the nation. For the first time, citizens understand where the debt came from and why they've been paying for a dictator's weapons and Swiss bank accounts.`,
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
    narrative: `The BRICS New Development Bank and the Asian Infrastructure Investment Bank offer a different kind of lending — without the harsh conditions the IMF demands. The interest rates are similar, the terms are fair, and developing countries actually have a say in how these banks are run.

But these banks are young and limited. The NDB can offer $300 million for your railway — significant but not enough. The AIIB can help fund a renewable energy program. Combined with your African bonds, you're piecing together financing from many sources.

This patchwork approach has a hidden advantage: you're not dependent on any single lender. As Roland Boer notes in his study of Chinese development banks, having alternatives has fundamentally changed the game for developing countries. The IMF's monopoly is broken, even if no single institution has replaced it.`,
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
    narrative: `Going it alone is exhausting but clarifying. Without big foreign loans, you have to choose carefully. Your finance minister creates a new tax code that actually collects money from multinational corporations in Azania — something the IMF never pushed for, since those companies are based in creditor countries.

You discover that domestic savings, properly organized, can fund more than anyone expected. A national development bank turns household savings into infrastructure bonds. Pension funds invest in local industry. Street vendors and small businesses are gradually brought into the formal economy through incentives, not punishments.

Growth is modest — 3% a year — but it's real, built on what your people actually produce rather than borrowed money. Your debt is slowly falling. International observers are confused: your approach doesn't fit any model they recognize.

But 3% growth isn't enough for a fast-growing population. Youth unemployment stays high. Educated young people see better opportunities abroad. You need to speed things up without piling on debt.`,
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

  {
    id: 'agro_industrial',
    phase: 4,
    title: 'From Farm to Factory',
    narrative: `Moving from farming to manufacturing is the most important — and dangerous — step in development. Your farm surplus provides the money, but building factories requires skills, supply chains, and infrastructure you don't yet have. You study the playbooks: South Korea's state-directed companies, China's small-town factories, India's mixed approach.

You start simple: canning and packaging the food your cooperatives grow. Then textiles from locally grown cotton. Then basic tools and building materials. Each step up is harder than the last.

A visiting Western economist asks, "Why not just export the raw materials and buy manufactured goods?" This is exactly the colonial-era logic that economist Kadri identifies as the excuse used to keep poorer countries locked into exporting cheap raw materials forever.`,
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
    narrative: `Your farming cooperatives have evolved into something impressive. Azanian organic coffee is selling in premium shops across Europe and East Asia. Processed cocoa brings three times the price of raw beans. A cooperative-owned cashew processing plant is now the biggest employer in the northern province.

Instead of selling cheap raw materials and buying expensive finished products, you're selling processed goods and keeping more of the money. Utsa Patnaik's research on how wealthy nations depend on cheap agricultural imports from the Global South (Agrarian South, 2015) shows exactly the pattern you're breaking: for centuries, the world economy was set up so that your farmers grew cheap crops for rich countries to eat while your own people went hungry. By processing and branding your own goods, you're flipping that script. Manish Kumar's study of India's rice exports (Agrarian South, 2018) shows the same lesson — exporting raw rice barely helped Indian farmers, but adding value before export made all the difference.

But success brings new problems. European import rules are complicated and keep changing — as Prabhat Patnaik has argued, "free trade" deals are designed to be free for wealthy countries' exports while creating endless obstacles for goods from developing nations. Your "organic" certification depends on Western agencies that charge fees your small cooperatives can barely afford. And the biggest buyers are huge multinational traders with enormous bargaining power.`,
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
    narrative: `Fifty Chinese farming experts arrive and work alongside your farmers in the south. Their new rice varieties triple crop yields. Their drip irrigation systems turn dry land productive. The training is hands-on and practical — Benabdallah has documented this as one of the most successful parts of China-Africa cooperation, where real skills transfer better than Western "capacity building" programs that often just produce consultant reports. A study by Sit Tsui and colleagues on how China rebuilt its own rural economy (Agrarian South, 2017) shows what's possible: Chinese villages used peasant cooperatives and local resilience strategies to lift themselves out of poverty, and now some of those same techniques are being shared with your farmers.

But the Chinese mission also introduces Chinese seed companies that compete with local varieties. Depending on imported seeds would repeat the "Green Revolution" trap that Ajl warns about — bigger harvests that come at the cost of farmer independence. Your agricultural scientists are worried. Freedom Mazwi's study of state-led farming in Zimbabwe (Agrarian South, 2019) offers a cautionary tale: when the government partnered with foreign companies for "command agriculture," the state gained production but lost control over the long term.

The farming program's success has created demand. Other sectors want similar partnerships: your mining engineers want Chinese training, your tech sector wants access to Chinese AI research, your transport ministry wants logistics help.`,
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
    narrative: `The Chinese joint venture transforms the mining sector. Chinese expertise stabilizes production. New processing plants mean you're exporting refined cobalt instead of raw ore — worth five times as much per ton. Chinese market access means you're no longer dependent on the London metals market, where pricing has historically favored Western traders.

But the 30% Chinese stake comes with influence. Chinese managers hold key positions. Supply chains run through Chinese companies. Equipment comes from Chinese manufacturers. The joint venture is profitable, but the know-how stays mostly with the Chinese team.

Your engineers are learning, but how fast depends on your partner's good faith. Roland Boer's research on Chinese companies suggests technology sharing is more likely when both sides see a long-term future together — but Azania needs to make sure its own interests stay front and center.`,
    choices: [
      {
        id: 'jv_assert',
        text: 'Use profits to train an Azanian technical team and gradually assert majority control',
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
    narrative: `Building mining capacity at home is paying off, slowly. Your university's mining engineering program has graduated three classes. Efficiency is recovering. You've hired retired engineers from South Africa and Chile as mentors — developing nations sharing expertise without any big institution involved.

Revenue from nationalized mines is now your government's biggest income source. You're using it to fund a sovereign wealth fund — like Norway's oil savings fund, adapted to your situation.

But the foreign companies are suing. They're claiming $4.5 billion in compensation — more than your entire GDP. The court they want to use is questionable, but the threat is real: if they win, your foreign bank accounts could be frozen and your access to global financial markets cut off.`,
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
    narrative: `The idea of an African minerals alliance catches fire. Zambia, the DRC, Tanzania, and Mozambique all have minerals essential for electric cars and renewable energy. Together, you control 60% of the world's cobalt and 35% of its copper. That's enormous bargaining power.

You host the founding meeting of the African Critical Minerals Alliance (ACMA). The attending leaders commit to: coordinating prices, sharing processing facilities, negotiating together with buyers, and creating a joint fund for development. Western media calls it "OPEC for cobalt." Markets are nervous.

This is the economic Pan-African solidarity Nkrumah dreamed of — not just speeches but real cooperation that changes the balance of trade.

The big consumer nations react fast. The US announces a "critical minerals security initiative." The EU tries to cut separate deals with individual members — an obvious divide-and-conquer tactic. China offers to be a "preferred buyer" at above-market prices.`,
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

  {
    id: 'state_industrialization',
    phase: 4,
    title: 'The National Development Corporation',
    narrative: `Your National Development Corporation (NDC) opens for business. State-owned factories produce construction materials, medicine, and electronics components. Your educated workforce finally has good jobs at home. The brain drain slows.

The NDC follows models from South Korea, Singapore, and China — all countries that used state-led industry to grow, despite Western economists saying free markets were the only way. As Boer documents, the real question isn't whether the government or the market drives growth — it's whether the government is good enough to direct investment where it's needed most.

The challenge is efficiency. Some NDC factories are world-class. Others are bloated with political hires. Quality control is uneven. Private businesses complain about unfair competition. Your anti-corruption team is overwhelmed.`,
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
    narrative: `The diaspora strategy works better than expected. Azanians living abroad — doctors, engineers, tech workers, entrepreneurs — answer your call. Diaspora bonds raise $500 million. Returnees open clinics, tech startups, and consulting firms. A retired MIT professor comes home to build a research center.

The returnees bring more than skills — they bring connections to global supply chains, knowledge of international markets, and the ability to bridge cultures. That's invaluable for a country trying to engage with the world on its own terms.

But tensions emerge. Returnees earn more than locals with similar qualifications, creating resentment. Some import foreign business ideas that don't fit local reality. The mix of respect and suspicion toward those who've been abroad complicates things.

Your challenge: use the diaspora's talent without creating a two-tier economy where the connected thrive and everyone else falls behind.`,
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
    narrative: `The special economic zones attract investment fast. Electronics assembly plants, garment factories, and call centers spring up. Your educated youth find jobs. GDP growth hits 5%.

But the zones are bubbles. Tax breaks mean little money flows to the government. Working conditions vary wildly. The zones are connected to global supply chains but disconnected from the rest of Azania — what economists call "growth without development."

When Deng Xiaoping created SEZs in China, they eventually spread and transformed the whole economy. But that took massive government investment in education, infrastructure, and technology over decades. Your zones could follow that path — or they could become permanent pockets of low-wage factory work.`,
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

  { id: 'railway_negotiation', phase: 4, title: 'Railway on Your Terms',
    narrative: `With reliable power and internet already in place, you're in a much stronger position to negotiate the railway deal. China knows your economy is growing and other bidders are circling. You push hard for better terms — lower interest rates, local hiring, technology transfer, and no asset seizure clauses.

The Chinese team grumbles but concedes. They need success stories, and Azania with its new digital economy is a showcase they can't afford to lose. The revised deal gives you a railway with real local ownership built into the contract from day one.`,
    choices: [
      { id: 'rail_green', text: 'Pair the railway with a green energy strategy for long-term competitiveness', consequence: 'You combine the railway project with a renewable energy initiative along the corridor.', effects: { infrastructure: 8, sovereignty: 5, economicStrength: 5, internationalStanding: 5 }, nextNode: 'green_transition' },
      { id: 'rail_bloc', text: 'Extend the railway to connect with neighboring countries and build a regional network', consequence: 'You propose a continental railway link that turns Azania into a transit hub.', effects: { infrastructure: 10, internationalStanding: 8, economicStrength: 8, sovereignty: 5 }, nextNode: 'regional_bloc' },
    ] },

  { id: 'competitive_bidding', phase: 4, title: 'The Bidding War',
    narrative: `Your competitive bidding strategy works. The Chinese lower their interest rates. The Europeans add a grant component. The African Development Bank offers the most sovereignty-friendly terms. Each delegation privately urges you to choose them, sweetening offers with side deals — scholarships, trade preferences, technology partnerships.

You've turned your infrastructure need into leverage. By refusing to commit to any single partner, you're extracting better terms from all of them. This is the advantage of a multipolar world: when multiple powers want what you have, you can set the terms.`,
    choices: [
      { id: 'bid_best_terms', text: 'Pick the best overall package regardless of geopolitics', consequence: 'You select a mixed package: African bank financing, Chinese construction, European green technology.', effects: { infrastructure: 10, sovereignty: 5, economicStrength: 8, internationalStanding: 5, debtBurden: 5 }, nextNode: 'diversified_development' },
      { id: 'bid_african', text: 'Choose the African consortium to strengthen continental solidarity', consequence: 'You go with the Pan-African option, signaling commitment to continental cooperation.', effects: { infrastructure: 8, sovereignty: 10, internationalStanding: 10, publicSupport: 5 }, nextNode: 'regional_bloc' },
    ] },

  { id: 'late_sovereignty_push', phase: 5, title: 'Reclaiming Control',
    narrative: `Your mandate requiring Azanian directors in all projects meets fierce resistance from Chinese managers — but it works. Within two years, Azanian professionals sit in every boardroom and control room. They've learned by doing, and now they can run these systems themselves.

The transition is bumpy. Some projects slow down. A few Chinese firms pull back. But the ones that stay find that Azanian management, familiar with local conditions and supply chains, actually improves operations. Your workforce has gone from loading containers to running the logistics.

The economic infrastructure China built is now yours — not just legally, but operationally. The knowledge that was locked inside Chinese management teams has been transferred to Azanian professionals.`,
    choices: [
      { id: 'late_sov_consolidate', text: 'Consolidate gains and build toward full economic independence', consequence: 'You use your operational control to negotiate from a position of genuine strength.', effects: { sovereignty: 12, economicStrength: 8, publicSupport: 8, humanDevelopment: 5 }, nextNode: 'democratic_deepening' },
      { id: 'late_sov_accelerate', text: 'Use the operational expertise to accelerate industrialization', consequence: 'You channel your new management capacity into an industrial expansion program.', effects: { economicStrength: 12, sovereignty: 8, infrastructure: 5, debtBurden: 3 }, nextNode: 'second_wave_industrial' },
    ] },

  { id: 'green_transition', phase: 5, title: 'The Green Pivot',
    narrative: `Your shift to renewable energy becomes a masterstroke. Converting the coal plants into solar panel and wind turbine factories — using Chinese technology with Azanian workers — puts you at the center of Africa's green energy revolution. The EU's carbon tax, which threatened your mining exports, now works in your favor: you're making the green technology others need.

Your cobalt, essential for electric car batteries, is now processed at home and sold at a premium as "green cobalt" — mined with clean energy and fair wages. That premium gives you a 20% price advantage over competitors.

The development path you've built doesn't fit any textbook. It has elements of government planning, market competition, cooperation with other developing nations, and environmental leadership. As Deng might have said, this is "development with Azanian characteristics."`,
    choices: [
      { id: 'green_sovereign', text: 'Consolidate — use your strategic position to achieve full economic sovereignty', consequence: 'You leverage your green technology position to renegotiate all remaining debt on favorable terms.', effects: { sovereignty: 15, economicStrength: 10, debtBurden: -10, internationalStanding: 10, publicSupport: 8 }, nextNode: 'capital_expansion_crisis' },
      { id: 'green_continental', text: 'Share green technology across the continent and build a clean-energy alliance', consequence: 'You open-source your solar manufacturing process and invite African nations to co-invest.', effects: { internationalStanding: 12, sovereignty: 8, economicStrength: 5, publicSupport: 5 }, nextNode: 'continental_leadership' },
    ] },

  { id: 'port_reclamation', phase: 5, title: 'Reclaiming the Port',
    narrative: `The legal fight over the port is complex, but your legal team — educated in Azanian law schools that you funded — is formidable. They argue the original deal was signed under pressure: if you'd refused, China could have called in your loans. The panel includes an African judge for the first time.

While the case plays out, you build a second port — smaller but 100% domestically owned — for agricultural and manufactured exports. The Chinese port still handles mining cargo, but your economy no longer depends entirely on it.

The port case becomes a symbol worldwide. Dozens of countries are reassessing infrastructure deals made under financial pressure. A win here sets a precedent; a loss locks in the old model.`,
    choices: [
      { id: 'port_win', text: 'See the case through — sovereignty over strategic infrastructure is non-negotiable', consequence: 'After three years of legal battle, the tribunal rules in your favor on key provisions.', effects: { sovereignty: 15, internationalStanding: 10, publicSupport: 10, infrastructure: 5 }, nextNode: 'democratic_deepening' },
      { id: 'port_negotiate', text: 'Negotiate a shared management deal — you get operational control, China keeps a revenue share', consequence: 'You split the difference: Azanian port authority runs daily operations, China earns a declining royalty.', effects: { sovereignty: 8, internationalStanding: 5, economicStrength: 5, infrastructure: 5, debtBurden: -3 }, nextNode: 'generational_test' },
    ] },

  { id: 'late_development_push', phase: 5, title: 'The Development Push',
    narrative: `Years of investing in people, infrastructure, and institutions are paying off. The economy grows at 6% a year. Manufacturing has quadrupled since independence. Graduates who used to emigrate are now starting companies at home. Poverty has fallen by half.

Other developing countries are taking notice. Delegations from Laos, Bolivia, and Senegal visit to study your approach. A think tank in your capital publishes studies on "the Azanian model" — not Washington's way, not Beijing's way, but your own.

Nkrumah's dream of economic independence completing political independence is, for the first time, within reach. Not yet achieved — no developing nation gets full sovereignty in one generation — but the direction is clear and the foundations are solid.

Elections are coming. Your record is strong, but the job isn't finished. Do you lock in what you've built, or push harder?`,
    choices: [
      { id: 'dev_push_consolidate', text: 'Consolidate — institutionalize the gains so they survive any future government', consequence: 'You enshrine key development institutions in constitutional amendments and build independent oversight.', effects: { sovereignty: 10, publicSupport: 8, economicStrength: 5, humanDevelopment: 5 }, nextNode: 'democratic_deepening' },
      { id: 'dev_push_accelerate', text: 'Accelerate — this is the moment to push for full industrial transformation', consequence: 'You launch an ambitious 10-year industrialization plan.', effects: { economicStrength: 12, sovereignty: 5, debtBurden: 5, publicSupport: 3, infrastructure: 8 }, nextNode: 'second_wave_industrial' },
    ] },

  { id: 'diversified_development', phase: 5, title: 'The Diversified Path',
    narrative: `Your strategy of working with many partners — not just one — has built resilience. No single creditor controls your fate. No single product defines your economy. No single alliance limits your foreign policy.

It's not the fastest or most dramatic path. But it's sustainable. Your children will inherit a country with choices, not a country locked into dependency on one patron.

As Deng said: "It doesn't matter if the cat is black or white, as long as it catches mice." Your development has been practical, borrowing from every model but submitting to none. Is pragmatism enough, or do you need a bolder vision for the next chapter?`,
    choices: [
      { id: 'diverse_institutionalize', text: 'Institutionalize the diversified model for long-term stability', consequence: 'You create a permanent development planning agency with a 30-year vision.', effects: { sovereignty: 8, economicStrength: 5, publicSupport: 5, humanDevelopment: 5, internationalStanding: 5 }, nextNode: 'generational_test' },
      { id: 'diverse_ambition', text: 'Use the stable base to launch an ambitious leap into high-value sectors', consequence: 'You invest heavily in technology, advanced manufacturing, and knowledge economy.', effects: { economicStrength: 12, sovereignty: 5, debtBurden: 5, humanDevelopment: 8 }, nextNode: 'second_wave_industrial' },
    ] },

  { id: 'regional_bloc', phase: 5, title: 'The Southern Alliance',
    narrative: `The regional economic bloc you built is becoming a force. Six nations now coordinate industrial policy, share infrastructure costs, and negotiate as a group with outside partners. A combined market of 180 million people attracts investment no single member could get alone.

Your railway connects to your neighbor's highway. Your power grid feeds their factories. Their farm surplus feeds your cities. The colonial borders — drawn to divide and weaken — are becoming irrelevant because of the connections you're building.

Nkrumah's vision of African unity through economic cooperation, dismissed as utopian for decades, is taking real shape.`,
    choices: [
      { id: 'bloc_lead', text: 'Position Azania as the anchor economy and institutional center of the bloc', consequence: 'You invest in making your capital the financial and logistical hub of the alliance.', effects: { sovereignty: 10, internationalStanding: 12, economicStrength: 10, publicSupport: 5, infrastructure: 5 }, nextNode: 'global_recession_test' },
      { id: 'bloc_currency', text: 'Push for a shared regional currency to break dollar dependency', consequence: 'You propose a common currency backed by the bloc\'s combined mineral and agricultural wealth.', effects: { sovereignty: 8, internationalStanding: 8, economicStrength: 5, debtBurden: -5 }, nextNode: 'currency_sovereignty' },
    ] },

  { id: 'sovereignty_stand', phase: 5, title: 'The Stand',
    narrative: `Standing firm — against unfair debt terms, biased courts, or big-power pressure — has cost you in the short term. Loans have been harder to get. Investment has been slower. Growth has been more modest than if you'd been more compliant.

But you own what you have. Your infrastructure is yours. Your mining revenue stays in your treasury. Your policy space is your own.

The short-term costs are fading. Other countries see that refusing to play by the old rules is survivable. Your example is quietly changing how finance ministers across the developing world think. As Toussaint argues, creditors' power depends on the belief that there's no alternative — and your survival disproves that belief.`,
    choices: [
      { id: 'stand_build', text: 'Build on the foundation of sovereignty — now that you own it, develop it', consequence: 'With full control of your resources and institutions, you launch a comprehensive development program.', effects: { sovereignty: 10, economicStrength: 8, publicSupport: 10, humanDevelopment: 5, infrastructure: 5 }, nextNode: 'land_grab_resistance' },
      { id: 'stand_organize', text: 'Empower workers and communities to defend these gains from below', consequence: 'You invest in trade unions, cooperatives, and community organizations to anchor sovereignty in popular power.', effects: { publicSupport: 12, sovereignty: 8, humanDevelopment: 5 }, nextNode: 'labor_movement_rises' },
    ] },

  { id: 'debt_resolution', phase: 5, title: 'Breaking Free',
    narrative: `Resolving the debt — whether by refusing to pay, negotiating, or winning a writedown — frees your budget. For the first time since independence, your government spends more on development than on loan payments. Schools get built. Hospitals get staffed. Roads get paved.

The international financial system adapts. It always does. Creditors prefer to restructure rather than get nothing. Your bonds are eventually re-rated — not to top grade, but enough to access markets again.

You've proven Toussaint right: the debt system's power comes from everyone believing there's no way out. Once a country shows it can challenge the system and survive, the spell is broken. The costs were real — frozen accounts, years of restricted access, legal battles. But the alternative was decades more of paying a dictator's debts while children went hungry.`,
    choices: [
      { id: 'debt_free_develop', text: 'Channel the freed budget into the most comprehensive development program yet', consequence: 'With debt service cut by 70%, you pour resources into infrastructure, education, and industry.', effects: { sovereignty: 10, economicStrength: 10, infrastructure: 10, humanDevelopment: 10, publicSupport: 8 }, nextNode: 'labor_movement_rises' },
      { id: 'debt_free_continental', text: 'Help other indebted nations follow your path — build a continental debt-free movement', consequence: 'You fund legal teams and share your playbook with a dozen other countries preparing debt challenges.', effects: { internationalStanding: 15, sovereignty: 8, publicSupport: 5, economicStrength: 3 }, nextNode: 'continental_leadership' },
    ] },

  { id: 'debtors_coalition', phase: 5, title: 'The Debtors\' Movement',
    narrative: `The Debtors' Conference in your capital draws representatives from 40 nations. Together you call for: a fair debt arbitration system not controlled by creditors, legal recognition of illegitimate debts, and a new global financial system that doesn't systematically disadvantage borrowing nations.

The conference doesn't immediately change the world. But it starts something. Debt relief deals multiply. The IMF is forced to ease its conditions. The BRICS bank's lending triples as countries seek alternatives.

Your role as host of this movement gives you international influence far beyond what your economy alone would justify. Small nations send ambassadors specifically to stay close to you. Development economists study your policies. Your voice in global forums carries real weight.`,
    choices: [
      { id: 'coalition_build', text: 'Build on this momentum to create lasting international institutions', consequence: 'You help establish a permanent Secretariat for Global South Economic Cooperation.', effects: { sovereignty: 12, internationalStanding: 15, publicSupport: 8, economicStrength: 5 }, nextNode: 'global_recession_test' },
      { id: 'coalition_currency', text: 'Push the coalition to create an alternative reserve currency', consequence: 'You propose a new international currency based on a basket of commodities and developing-nation currencies.', effects: { sovereignty: 10, internationalStanding: 10, economicStrength: 3, debtBurden: -5 }, nextNode: 'currency_sovereignty' },
    ] },

  { id: 'pragmatic_resolution', phase: 5, title: 'The Pragmatic Path',
    narrative: `The compromise on local hiring — phased in gradually instead of demanded all at once — doesn't satisfy anyone completely but works in practice. Chinese firms accept the timeline. Azanian workers gain skills step by step. Infrastructure gets built, not as fast as the full Chinese package, but with real local capacity growing alongside it.

Pragmatism isn't heroic. It doesn't make headlines. But it adds up quietly. Five years in, your workforce can maintain every system the Chinese built. Ten years in, they're designing improvements on their own.

As Deng understood, big changes sometimes need small, steady steps. Where you end up matters more than how fast you get there.`,
    choices: [
      { id: 'prag_mature', text: 'Let the pragmatic approach mature into full operational sovereignty', consequence: 'You continue the gradual transition until all critical infrastructure is locally managed.', effects: { sovereignty: 10, economicStrength: 8, humanDevelopment: 8, publicSupport: 5, infrastructure: 5 }, nextNode: 'tech_independence' },
      { id: 'prag_organize', text: 'Strengthen worker and community organizations to lock in these gains at the grassroots', consequence: 'You invest in unions, civic education, and community development councils.', effects: { publicSupport: 10, sovereignty: 5, humanDevelopment: 8 }, nextNode: 'labor_movement_rises' },
    ] },

  { id: 'geopolitical_balancing', phase: 5, title: 'The Balancing Act',
    narrative: `Playing China and the West against each other is risky, but you're good at it. You take Chinese infrastructure loans while keeping the IMF program going. You give mining rights to both Chinese and Western firms, making sure neither dominates. You vote independently at the United Nations — sometimes with the West, sometimes with China, always in your own interest.

Both sides want your cobalt. Both want your vote. You give each just enough to keep your leverage.

The risk: you could end up depending on both instead of being free from either. But in a world with multiple great powers, having several patrons may be the closest thing to real independence a small developing country can achieve.`,
    choices: [
      { id: 'balance_sovereign', text: 'Use the balancing position to build genuine economic independence over time', consequence: 'You channel the benefits of competition into domestic capacity building.', effects: { sovereignty: 8, economicStrength: 8, internationalStanding: 5, publicSupport: 5, debtBurden: -5 }, nextNode: 'military_pressure' },
      { id: 'balance_regional', text: 'Use your position to build a regional non-aligned bloc', consequence: 'You convene neighboring nations into a shared non-alignment pact with coordinated trade policy.', effects: { internationalStanding: 10, sovereignty: 5, economicStrength: 5, publicSupport: 3 }, nextNode: 'continental_leadership' },
    ] },

  { id: 'western_alignment', phase: 5, title: 'The Western Path',
    narrative: `Aligning with the Western financial system brings real benefits: cheap World Bank loans, EU trade deals, USAID technical help, and the "good governance" badge that attracts private investors.

GDP grows at a respectable 4% a year. Poverty falls — at least by World Bank numbers. But Utsa Patnaik has shown those numbers use misleading methods that undercount the poor. By her corrected measurements — counting people who can't actually afford to eat properly — the picture is less rosy. Infrastructure improves, but slowly. By Western standards, you're a "success story."

But sovereignty is limited. Major economic decisions need IMF approval. When a mining company pollutes a river, your trade treaty with the US prevents real punishment. As Nkrumah would say, you're free — within the limits others have set. Prabhat Patnaik is precise about how this works: opening your financial markets to foreign money doesn't just create opportunities — it puts your national economy under the control of international finance, whose interests are opposed to those of working people in your country.`,
    choices: [
      { id: 'western_accept', text: 'Accept the trade-off — growth within the system is better than stagnation outside it', consequence: 'You deepen integration with the global economy on the terms available.', effects: { economicStrength: 8, internationalStanding: 8, sovereignty: -5, publicSupport: -3 }, nextNode: 'counter_revolution' },
      { id: 'western_pivot', text: 'Begin a quiet pivot — use Western investment to build capacity for eventual independence', consequence: 'You accept the framework while systematically building sovereign alternatives.', effects: { sovereignty: 5, economicStrength: 5, humanDevelopment: 5, publicSupport: 3 }, nextNode: 'currency_sovereignty' },
    ] },

  { id: 'non_aligned_path', phase: 5, title: 'Genuine Non-Alignment',
    narrative: `True non-alignment in the 21st century is harder than during the Cold War. Back then, you could play two superpowers against each other. Now, US-China rivalry overlaps with complicated trade, technology, and financial networks that make pure neutrality nearly impossible.

But you try. You join neither the US infrastructure partnership nor China's Belt and Road. You buy technology from whoever gives the best deal. You sell cobalt to the highest bidder. You vote your conscience at the UN.

The cost is real. Neither great power champions you. Aid is modest. Investment comes without strategic backing. But every decision is yours, and your people know it.`,
    choices: [
      { id: 'non_aligned_build', text: 'Build domestic capacity to make non-alignment economically sustainable', consequence: 'You invest in self-sufficiency in food, energy, and essential manufacturing.', effects: { sovereignty: 12, economicStrength: 5, publicSupport: 8, humanDevelopment: 5, debtBurden: -5 }, nextNode: 'currency_sovereignty' },
      { id: 'non_aligned_mobilize', text: 'Organize your people to defend non-alignment — sovereignty must be rooted in popular power', consequence: 'You invest in civic education, community councils, and a national service program.', effects: { publicSupport: 10, sovereignty: 8, humanDevelopment: 8 }, nextNode: 'democratic_deepening' },
    ] },

  { id: 'late_reversal', phase: 5, title: 'The Reversal',
    narrative: `Breaking with the IMF sends shockwaves. Credit agencies downgrade you further. Money flees. The currency drops. The IMF suspends your remaining funding.

But the emergency social program stops the famine and calms the streets. Mining royalties, redirected from debt payments to domestic spending, fund public works that put 100,000 people back to work. Food subsidies return. Clinics reopen.

The financial world predicted collapse. Instead, you stabilize at a lower but sustainable level. Growth resumes, driven by local demand and regional trade rather than foreign money. The approach is messy and imperfect. But it's alive, and it's yours.`,
    choices: [
      { id: 'reversal_rebuild', text: 'Rebuild on sovereign foundations — never again', consequence: 'You launch a domestically-financed development strategy with strict limits on foreign borrowing.', effects: { sovereignty: 15, publicSupport: 10, economicStrength: 5, debtBurden: -10, humanDevelopment: 5 }, nextNode: 'land_grab_resistance' },
      { id: 'reversal_workers', text: 'Put workers and communities at the center of the new development model', consequence: 'You build the recovery around cooperatives, unions, and community-owned enterprises.', effects: { publicSupport: 12, sovereignty: 10, humanDevelopment: 8, economicStrength: 3 }, nextNode: 'labor_movement_rises' },
    ] },

  { id: 'reform_completion', phase: 5, title: 'The Completed Reform',
    narrative: `The IMF program runs its course. By the numbers, it worked: inflation is tamed, the currency is stable, debt ratios are down, and foreign investment is flowing in. The IMF publishes Azania as a success story.

But the social costs are built into a generation. Kids who dropped out during austerity are now adults without skills. Factories closed during liberalization never reopened. The privatized mining company's profits flow to shareholders in Toronto and London. Inequality has widened sharply.

You've achieved stability, but at the cost of sovereignty and equality. What comes next depends on what you choose — and whether you still have the power to choose.`,
    choices: [
      { id: 'reform_continue', text: 'Continue on the path — deepen market reforms and attract more investment', consequence: 'You double down on the liberal reform agenda.', effects: { economicStrength: 8, sovereignty: -8, internationalStanding: 8, publicSupport: -5 }, nextNode: 'counter_revolution' },
      { id: 'reform_rebalance', text: 'Rebalance — use the stability to rebuild social programs and domestic industry', consequence: 'You maintain macro stability but redirect policy toward equity and sovereignty.', effects: { sovereignty: 8, publicSupport: 8, humanDevelopment: 8, economicStrength: 3 }, nextNode: 'labor_movement_rises' },
    ] },

  { id: 'regulated_industry', phase: 5, title: 'Dignified Industry',
    narrative: `Your regulated factories produce less than the unregulated alternatives, but what they produce comes with dignity. Living wages mean workers can afford housing and schooling for their kids. Safety standards mean fewer accidents. Environmental rules mean cleaner rivers.

The companies that stayed are the committed ones. They invest in training because they can't just replace workers with cheaper ones. Your manufacturing sector's productivity per worker is higher than neighboring countries with lower wages. Quality replaces quantity as your competitive edge.

This is development that serves the people, not the other way around. It's slower, but it's building a middle class — the foundation of both economic growth and political stability.`,
    choices: [
      { id: 'regulated_expand', text: 'Expand the model nationally — make dignified work the norm, not the exception', consequence: 'You extend labor and environmental standards from the zones to the entire economy.', effects: { sovereignty: 10, publicSupport: 10, humanDevelopment: 8, economicStrength: 5 }, nextNode: 'labor_movement_rises' },
      { id: 'regulated_tech', text: 'Invest in technology to move your dignified factories up the value chain', consequence: 'You fund R&D so your well-paid workers produce higher-value goods.', effects: { economicStrength: 10, humanDevelopment: 8, sovereignty: 5, infrastructure: 3 }, nextNode: 'tech_independence' },
    ] },

  { id: 'industrial_upgrading', phase: 5, title: 'Moving Up the Chain',
    narrative: `The push from simple assembly to real manufacturing is succeeding. Your factories now make circuit boards, not just snap phones together. Your textile mills weave fabric, not just sew seams. Your food plants design packaging, not just fill boxes.

Each step up captures more of the final price. Export revenue per item has doubled. Workers earn more because they create more value. The skills you're building are becoming a national asset — know-how embedded in your people that can't be taken away.

Every successful developing country has followed this path. The difference is you're doing it deliberately, with institutions designed to push companies up the value ladder instead of letting them settle into low-wage routines.`,
    choices: [
      { id: 'upgrade_tech', text: 'Push further — invest in R&D and aim for technology leadership in key sectors', consequence: 'You establish a national research and development fund targeting clean energy, biotech, and AI.', effects: { economicStrength: 12, humanDevelopment: 8, sovereignty: 8, internationalStanding: 8 }, nextNode: 'tech_independence' },
      { id: 'upgrade_workers', text: 'Make sure workers share the gains — profit-sharing and ownership stakes in upgraded factories', consequence: 'You mandate worker equity in all firms receiving government R&D subsidies.', effects: { publicSupport: 10, sovereignty: 8, humanDevelopment: 5, economicStrength: 5 }, nextNode: 'labor_movement_rises' },
    ] },

  { id: 'cooperative_industry', phase: 5, title: 'The Cooperative Economy',
    narrative: `Your worker-cooperative factories are unlike anything in the developing world. Workers own the companies they run. Profits are shared. Managers are elected. Investment decisions are made together.

The model has downsides — democratic decision-making is slower than top-down management. But it has strengths others lack: workers who own their factory don't sabotage it, steal from it, or leave for small pay differences. Quality is higher because pride is higher. Innovation comes from the shop floor because workers have a real stake. Barbara Harriss-White's study of peasants and petty producers in Africa and South Asia (Agrarian South, 2012) showed that small-scale cooperative producers can outperform large capitalist firms when they have the right support — because their survival depends on cooperation, not on squeezing workers.

The World Bank calls it "interesting but not scalable." The International Labour Organization calls it "a model for dignified development." China's development bank studies it with curiosity. Issa Shivji's concept of "working people" (Agrarian South, 2017) — a category broader than "workers" that includes peasants, informal traders, and cooperative producers — fits your model perfectly. Azania is proving that the old division between "workers" and "peasants" can be overcome.`,
    choices: [
      { id: 'coop_scale', text: 'Scale the cooperative model and make it the foundation of your national economy', consequence: 'You enshrine cooperative ownership in economic policy and provide institutional support for expansion.', effects: { sovereignty: 12, publicSupport: 12, economicStrength: 8, humanDevelopment: 8 }, nextNode: 'democratic_deepening' },
      { id: 'coop_export', text: 'Export the cooperative model — help other countries set up worker-owned enterprises', consequence: 'You create an international cooperative development institute in your capital.', effects: { internationalStanding: 10, sovereignty: 8, publicSupport: 8, economicStrength: 3 }, nextNode: 'continental_leadership' },
    ] },

  { id: 'comprehensive_partnership', phase: 5, title: 'The Comprehensive Partnership',
    narrative: `The broad Chinese partnership has transformed your economy. Farming is mechanized. Infrastructure is modern. Manufacturing is growing. Workers trained by Chinese experts are starting to train others.

But the scale of Chinese involvement raises questions. Your supply chains run through Chinese companies. Your data flows over Chinese networks. Your equipment needs Chinese maintenance. Have you traded dependency on the West for dependency on the East?

Benabdallah's research suggests the answer is complicated. Unlike IMF reforms, Chinese-built projects leave real things behind — railways, power plants, and trained workers. Even if the relationship soured, those assets would remain. The dependency is real, but so are the assets.`,
    choices: [
      { id: 'comp_diversify', text: 'Gradually diversify partnerships while maintaining the Chinese relationship', consequence: 'You engage new partners in sectors where Chinese involvement is weakest.', effects: { sovereignty: 8, economicStrength: 8, internationalStanding: 8, publicSupport: 5 }, nextNode: 'capital_expansion_crisis' },
      { id: 'comp_tech_transfer', text: 'Focus on completing the technology transfer — make sure your people can run everything independently', consequence: 'You create a national technology certification program requiring full knowledge transfer in all partnerships.', effects: { sovereignty: 10, humanDevelopment: 8, economicStrength: 5, publicSupport: 5 }, nextNode: 'tech_independence' },
    ] },

  { id: 'selective_engagement', phase: 5, title: 'Selective Partners, Sovereign Path',
    narrative: `Your approach — Chinese help in farming, but other partners for other sectors — has created a balanced mix. Indian IT firms build your digital government. Turkish companies compete with Chinese ones on construction. Brazilian scientists work alongside Chinese farming experts. European universities partner with yours.

No single partner dominates. No single creditor controls your policy. Everyone wants your partnership; nobody has captured it. This gives you bargaining power your economy alone would never provide.

Working with many partners is less efficient than going deep with one. But efficiency was never the only goal. Sovereignty requires options, and you have them.`,
    choices: [
      { id: 'selective_mature', text: 'Continue the selective engagement model as you mature toward full sovereignty', consequence: 'You maintain strategic partnerships while building domestic capacity in every sector.', effects: { sovereignty: 10, economicStrength: 8, publicSupport: 5, humanDevelopment: 5, internationalStanding: 5 }, nextNode: 'generational_test' },
      { id: 'selective_deepen_demo', text: 'Deepen democratic participation so that sovereignty is rooted in popular power, not just government policy', consequence: 'You create participatory budgeting, citizen assemblies, and community oversight boards.', effects: { publicSupport: 10, sovereignty: 8, humanDevelopment: 5 }, nextNode: 'democratic_deepening' },
    ] },

  { id: 'sovereign_sez', phase: 5, title: 'Sovereign Economic Zones',
    narrative: `Your economic zones are unlike any others. Every foreign company must partner with an Azanian one and share technology. Tax breaks expire after seven years — by then, companies either integrate into the local economy or leave, but the knowledge stays. All data about Azanian markets stays under national control.

Foreign firms grumble. But the ones who accept the terms are the ones you want — committed for the long term, willing to share knowledge, planning to stay.

The result: an industrial base that's foreign-funded but nationally rooted. Your workers run the factories. Your engineers maintain the equipment. If a company leaves, the skills remain.`,
    choices: [
      { id: 'sov_sez_national', text: 'Transition the most successful zones to full national ownership', consequence: 'You exercise buyout clauses to bring the most productive enterprises under Azanian control.', effects: { sovereignty: 12, economicStrength: 10, publicSupport: 8, debtBurden: 5 }, nextNode: 'capital_expansion_crisis' },
      { id: 'sov_sez_workers', text: 'Convert the zones into worker-owned cooperatives rather than state enterprises', consequence: 'You transfer ownership to the workers themselves, creating a new model of industrial democracy.', effects: { publicSupport: 12, sovereignty: 10, humanDevelopment: 5, economicStrength: 5 }, nextNode: 'labor_movement_rises' },
    ] },

  { id: 'sovereign_brand', phase: 5, title: 'The Azanian Brand',
    narrative: `"Made in Azania" becomes a brand known for quality, sustainability, and fair labor. Your organic coffee is served in specialty shops from Tokyo to Berlin. Your fair-trade cobalt is sought by electric vehicle makers marketing green credentials. Your artisan crafts sell at premium prices online.

Branding changes the game. Instead of selling raw materials at prices set by international markets, you're selling finished products at premium prices based on your story and standards. The money stays in Azania, in the hands of the workers and farmers who created the value.

This is what development looks like when it serves the people doing the developing. Not abstract GDP growth, but rising living standards as a lived reality.`,
    choices: [
      { id: 'brand_expand', text: 'Expand the sovereign brand model across all export sectors', consequence: 'You build a national export promotion agency centered on the Azanian quality standard.', effects: { sovereignty: 10, economicStrength: 12, publicSupport: 10, internationalStanding: 8, humanDevelopment: 5 }, nextNode: 'global_recession_test' },
      { id: 'brand_cooperatives', text: 'Ensure the brand is owned by the farmers and workers, not the government', consequence: 'You establish the Azanian brand as a cooperative trademark collectively owned by its producers.', effects: { publicSupport: 12, sovereignty: 8, economicStrength: 8, humanDevelopment: 5 }, nextNode: 'democratic_deepening' },
    ] },

  { id: 'fiscal_innovation', phase: 5, title: 'The New Fiscal Architecture',
    narrative: `Your creative tax approach has built a revenue base that doesn't depend on IMF conditions or excessive borrowing. Taxes on tech multinationals capture value. Financial transaction levies generate steady income. Diaspora bonds connect your global community to national development. A small mining tax feeds a sovereign wealth fund.

Being able to fund your own development from your own revenue — without foreign loans or their conditions — may be the most fundamental form of sovereignty. As Hudson argues, financial control is the ultimate tool of empire; financial independence is the ultimate form of freedom.

Other developing nations are studying your approach. A "New Bretton Woods" conference proposes your innovations as alternatives to the old debt-and-dependency model.`,
    choices: [
      { id: 'fiscal_institutionalize', text: 'Institutionalize these innovations and share them with the Global South', consequence: 'You establish an international center for fiscal innovation in your capital.', effects: { sovereignty: 12, internationalStanding: 10, economicStrength: 8, publicSupport: 5, humanDevelopment: 5 }, nextNode: 'democratic_deepening' },
      { id: 'fiscal_currency', text: 'Use your fiscal independence to build a sovereign currency system', consequence: 'You back your currency with mineral reserves and agricultural output instead of dollar reserves.', effects: { sovereignty: 12, economicStrength: 5, internationalStanding: 5, debtBurden: -8 }, nextNode: 'currency_sovereignty' },
    ] },

  { id: 'electoral_development', phase: 5, title: 'Development and Democracy',
    narrative: `Election time approaches with a strong development record. Roads reach villages that were isolated for decades. Clinics serve communities that never had healthcare. Markets connect farmers to buyers efficiently.

But elections in developing countries are fragile moments. The opposition, funded by interests hostile to your reforms, campaigns on "opening up to investors" — code for reversing nationalization and lowering wages. Foreign money flows to opposition campaigns. Social media manipulation targets your supporters.

The challenge: make your development achievements strong enough to survive any election result.`,
    choices: [
      { id: 'elect_institutional', text: 'Focus on institutionalizing gains — constitutional protections for key development policies', consequence: 'You propose amendments that protect sovereign resources and social programs.', effects: { sovereignty: 10, publicSupport: 8, humanDevelopment: 5, economicStrength: 5 }, nextNode: 'generational_test' },
      { id: 'elect_mobilize', text: 'Build a mass movement to defend your reforms at the ballot box and in the streets', consequence: 'You invest in political education and grassroots organizing to create an informed, active citizenry.', effects: { publicSupport: 12, sovereignty: 8, humanDevelopment: 5 }, nextNode: 'democratic_deepening' },
    ] },

  { id: 'climate_sovereignty', phase: 5, title: 'Climate and Sovereignty',
    narrative: `Your climate adaptation program becomes a continental model. Drought-resistant crops developed by your scientists are shared with neighbors. Solar-powered irrigation frees farmers from unreliable rainfall. Tree-planting programs restore degraded land.

The climate crisis, which nearly derailed your development, has become an opportunity. Green technology adapted for African conditions is your fastest-growing export. Climate funding — available on better terms than development loans — pays for infrastructure. Your moral authority as a climate-vulnerable nation leading on solutions gives you international standing your economy alone couldn't provide.

As Ajl argues, real climate justice means challenging the economic structures that caused the crisis. The Agrarian South journal dedicated its 2023 special issue to "Pathways to Ecological Transition," exploring how Global South nations can build sustainable economies without following the destructive path of industrialized countries. Samir Amin — whose ideas shaped the journal's founding vision and whose legacy inspired the journal's young scholars' prize — called this "delinking": not isolation, but the refusal to let your development be dictated by a global system built for someone else's benefit. Your approach does exactly that: resilient local food systems instead of dependence on global markets, clean energy instead of imported fossil fuels, and climate finance claimed as a right, not a favor.`,
    choices: [
      { id: 'climate_lead', text: 'Leverage climate leadership into broader sovereign development', consequence: 'You make Azania the center of African climate innovation and sovereign development.', effects: { sovereignty: 10, internationalStanding: 12, economicStrength: 8, publicSupport: 10, humanDevelopment: 8 }, nextNode: 'global_recession_test' },
      { id: 'climate_community', text: 'Root climate resilience in community ownership — every village manages its own solar grid and water system', consequence: 'You decentralize climate infrastructure to the community level.', effects: { publicSupport: 12, sovereignty: 8, humanDevelopment: 10, infrastructure: 5 }, nextNode: 'democratic_deepening' },
    ] },

  { id: 'pragmatic_relief', phase: 5, title: 'The Pragmatic Compromise',
    narrative: `The aid arrives. Your people eat. The crisis passes. But the investment treaty you signed with the US limits your regulatory power for a decade. The EU seed patents create new dependencies. You survived the emergency by giving up future options.

This is the recurring dilemma of poorer nations: short-term survival versus long-term freedom. No leader can watch their people starve on principle. But every deal made under desperation narrows the path forward.

Your task now is to work within these new constraints while slowly building alternatives. It's not the revolutionary path, but revolutions need resources you don't yet have.`,
    choices: [
      { id: 'relief_work_within', text: 'Work within constraints while building alternatives — the long game', consequence: 'You comply with treaty obligations while investing in domestic capacity that reduces future dependency.', effects: { sovereignty: 5, economicStrength: 5, publicSupport: 3, humanDevelopment: 5 }, nextNode: 'counter_revolution' },
      { id: 'relief_organize', text: 'Build community resilience from the ground up so you\'re never this vulnerable again', consequence: 'You create community food banks, seed libraries, and local emergency funds.', effects: { publicSupport: 10, sovereignty: 5, humanDevelopment: 8, economicStrength: -3 }, nextNode: 'labor_movement_rises' },
    ] },

  { id: 'bilateral_web', phase: 5, title: 'The Web of Partnerships',
    narrative: `Your bilateral approach creates a web of relationships, each optimized for specific needs. South Africa for manufacturing. Kenya for technology. Ethiopia for farming. Rwanda for governance ideas. Nigeria for market access.

The web is resilient — if one relationship frays, others fill the gap. You're building the kind of South-South cooperation that economists have theorized about for decades — not through grand institutions but through practical deals that create real value.

Development is happening on multiple fronts at once, driven by what each partner does best. It's practical, incremental, and effective.`,
    choices: [
      { id: 'web_formalize', text: 'Formalize the strongest partnerships into a permanent development network', consequence: 'You propose an African Development Cooperation Framework built on your bilateral successes.', effects: { sovereignty: 8, internationalStanding: 10, economicStrength: 8, publicSupport: 5 }, nextNode: 'generational_test' },
      { id: 'web_tech', text: 'Use the partnership network to build shared technology platforms across the continent', consequence: 'You create joint R&D centers with partner nations, pooling scientific talent.', effects: { economicStrength: 8, internationalStanding: 8, humanDevelopment: 8, sovereignty: 5 }, nextNode: 'tech_independence' },
    ] },

  { id: 'debt_equity_gamble', phase: 5, title: 'The Equity Gamble',
    narrative: `Swapping debt for equity cuts your outstanding loans in half, but gives China permanent ownership stakes in your infrastructure. The railway, port, and two power plants now have Chinese shareholders. Loan payments drop dramatically, but dividends flow to Beijing forever.

This is a new kind of dependency trap — not through debt but through ownership. Your infrastructure creates wealth, but a permanent share goes abroad. As Kadri's work on wealth transfer would predict, the surplus created by Azanian workers is partly captured by foreign owners.

The bet: if your economy grows fast enough, China's fixed stake shrinks in relative terms. If growth stalls, you've sold the family silver.`,
    choices: [
      { id: 'equity_grow', text: 'Focus on maximum growth to dilute the Chinese equity position over time', consequence: 'You pursue aggressive expansion to make the economy larger than the equity stakes.', effects: { economicStrength: 10, sovereignty: -3, debtBurden: -5, publicSupport: 3 }, nextNode: 'capital_expansion_crisis' },
      { id: 'equity_buyback', text: 'Start a long-term buyback fund to gradually repurchase Chinese equity stakes', consequence: 'You earmark 5% of mining revenue annually for a sovereign buyback fund.', effects: { sovereignty: 5, economicStrength: 3, debtBurden: 3, publicSupport: 5 }, nextNode: 'generational_test' },
    ] },

  { id: 'sovereign_bloc_victory', phase: 5, title: 'The Cartel Holds',
    narrative: `The African Critical Minerals Alliance holds firm. After initial resistance, consuming nations accept that the era of cheap African resources is over. Prices stabilize at levels that actually fund development. Processing plants spring up across the continent as members invest in turning raw materials into finished products.

Your collective power has achieved what no single country could: a real shift in who benefits from trade. The profits that used to flow from African mines to Western shareholders now circulate within the continent, funding hospitals, schools, and factories. The Patnaiks explain why this matters so much: the global economic system has always depended on getting cheap raw materials from poorer countries by keeping their workers' wages low and their governments weak. A producers' alliance that sets prices based on fair wages and sustainable mining — rather than the artificially depressed prices that austerity creates — challenges the way the global economy has worked since colonial times.

Nkrumah's vision of Pan-African economic power is real. Not as a utopian dream, but as a practical alliance that turns resource leverage into development outcomes.`,
    choices: [
      { id: 'cartel_victory', text: 'Use cartel revenues to achieve comprehensive sovereign development', consequence: 'You channel mineral wealth into a generation-defining development program.', effects: { sovereignty: 15, economicStrength: 12, publicSupport: 10, humanDevelopment: 8, infrastructure: 8 }, nextNode: 'military_pressure' },
      { id: 'cartel_transform', text: 'Use the cartel to transform the entire continental economy — from raw materials to finished goods', consequence: 'You push ACMA members to jointly build processing plants and manufacturing hubs.', effects: { economicStrength: 12, internationalStanding: 10, sovereignty: 8, infrastructure: 5 }, nextNode: 'second_wave_industrial' },
    ] },

  { id: 'brics_alignment', phase: 5, title: 'The BRICS Path',
    narrative: `As a BRICS member, you gain access to alternative financial tools: the NDB for development loans, emergency backup funds, and agreements to trade in local currencies instead of dollars.

BRICS offers something the Western system never did: a voice. In the IMF, Azania had no power over the rules that governed its life. In BRICS, developing nations actually have representation, even if it's imperfect.

But BRICS has its own internal politics. China's economic weight dominates. India and China compete for influence. Russia's conflicts create complications. You navigate carefully, always looking for what gives Azania the most room to develop on its own terms.`,
    choices: [
      { id: 'brics_sovereign', text: 'Use the BRICS platform to advance sovereign development goals', consequence: 'You leverage BRICS membership for financing, technology, and diplomatic support.', effects: { sovereignty: 8, economicStrength: 8, internationalStanding: 8, publicSupport: 5, debtBurden: -5 }, nextNode: 'currency_sovereignty' },
      { id: 'brics_industrial', text: 'Use BRICS connections to launch a major industrial partnership with India and Brazil', consequence: 'You sign trilateral manufacturing agreements focused on pharmaceuticals, electronics, and green energy.', effects: { economicStrength: 10, internationalStanding: 5, sovereignty: 5, infrastructure: 5 }, nextNode: 'second_wave_industrial' },
    ] },

  // ═══════════════════════════════════════
  // PHASE 6: THE TEST OF DURABILITY
  // ═══════════════════════════════════════

  {
    id: 'capital_expansion_crisis',
    phase: 6,
    title: 'The Capital Offensive',
    narrative: `Just when things seem stable, a wave of foreign capital arrives — uninvited. Multinational corporations, hedge funds, and private equity firms are scouting Azania for investment opportunities. They see your growing economy, your trained workforce, and your resources. They want in.

Rosa Luxemburg explained this pattern over a century ago in her book "The Accumulation of Capital." She argued that capitalism can't survive on its own — it constantly needs to expand into new markets, new lands, and new populations to keep growing. Samir Amin's essay on "The Agrarian Question a Century after October 1917" (Agrarian South, 2017) traced this same pattern into the present day: global capitalism uses agriculture and natural resources in the Global South as a permanent frontier for expansion. When a country like Azania develops successfully, it becomes exactly the kind of fresh market that global capital hungers for. The corporations aren't coming because they want to help you — they're coming because they need somewhere new to invest their money and extract profits.

The offers are tempting: a tech giant wants to build a data center, a mining conglomerate offers a premium for new concessions, a real estate developer proposes luxury tourism resorts on your coast. Each deal would bring jobs and revenue. But each would also create a new channel for wealth to flow out of the country.

Your finance minister sees opportunity. Your sovereignty minister sees danger. Prabhat Patnaik's fundamental insight — that the peasant question isn't some leftover problem from the past, but the central crisis of contemporary capitalism (Agrarian South, 2012) — makes this clear: every acre grabbed by foreign investors, every resource concession signed away, is another step backward from the self-determination you've fought to build.`,
    choices: [
      { id: 'cap_resist', text: 'Set strict limits — foreign capital is welcome only under Azanian control and ownership rules', consequence: 'You create a Foreign Investment Review Board with the power to reject or modify any deal.', effects: { sovereignty: 12, publicSupport: 8, economicStrength: -3, internationalStanding: -5 }, nextNode: 'peoples_constitution' },
      { id: 'cap_selective', text: 'Accept investments that transfer technology, reject those that just extract', consequence: 'You approve the data center with local hiring mandates but reject the mining and tourism deals.', effects: { sovereignty: 5, economicStrength: 8, humanDevelopment: 5, internationalStanding: 3 }, nextNode: 'generational_test' },
      { id: 'cap_redirect', text: 'Channel the investment pressure into your cooperative and worker-owned sectors', consequence: 'You require all foreign investors to partner with Azanian cooperatives as majority owners.', effects: { sovereignty: 10, publicSupport: 10, economicStrength: 5, humanDevelopment: 3 }, nextNode: 'democratic_deepening' },
    ],
  },

  {
    id: 'labor_movement_rises',
    phase: 6,
    title: 'The Workers Speak',
    narrative: `Your development program has created something powerful: a large, organized working class. Factory workers, farm cooperative members, miners, teachers, and healthcare workers — they have jobs, they have skills, and now they want a bigger say in how the country is run.

Rosa Luxemburg saw this coming too. She wrote extensively about what she called "the mass strike" — not just a work stoppage for higher wages, but a moment when working people realize their collective power and start demanding more than just economic improvements. They want real democracy, real participation in decisions, real ownership of the country's direction. Luxemburg argued that this kind of popular energy is the most powerful force for change — more powerful than any government program or policy paper. Prabhat Patnaik's essay on the worker-peasant alliance (Agrarian South, 2021) argues the same point: real transformation happens when factory workers and small farmers realize they share the same struggle and join forces. That's exactly what's happening in Azania now. Praveen Jha's study of peasant restiveness in India (Agrarian South, 2024) shows what occurs when this energy is ignored: decades of frustration, farmer suicides, and explosive protests.

The unions present a manifesto: minimum ownership stakes for workers in all major industries, mandatory worker representation on corporate boards, a shorter work week, and a national minimum wage tied to the cost of living. Business leaders warn of "instability." International investors threaten to pull out.

But the workers' demands aren't radical — they're asking for what many European countries already have. Lyn Ossome's research on agrarian movements in Africa (Agrarian South, 2021) shows that the strongest movements are the ones led from the ground up, especially when women take leadership roles. The question is whether your developing economy can support these standards, or whether trying will scare away the investment you need.`,
    choices: [
      { id: 'labor_embrace', text: 'Embrace the movement — worker power is the strongest foundation for sovereignty', consequence: 'You pass a comprehensive Labor Rights Act meeting most of the unions\' demands.', effects: { publicSupport: 15, sovereignty: 10, humanDevelopment: 8, economicStrength: -5 }, nextNode: 'peoples_constitution' },
      { id: 'labor_negotiate', text: 'Negotiate a phased approach — worker rights expanding as the economy grows', consequence: 'You agree to a 10-year roadmap with milestones tied to economic growth targets.', effects: { publicSupport: 5, sovereignty: 5, economicStrength: 5, humanDevelopment: 5 }, nextNode: 'generational_test' },
      { id: 'labor_cooperatives', text: 'Go beyond wages — help workers become owners through a national cooperative conversion fund', consequence: 'You create a fund that helps workers buy ownership stakes in the companies they work for.', effects: { publicSupport: 12, sovereignty: 8, humanDevelopment: 8, economicStrength: 3 }, nextNode: 'democratic_deepening' },
    ],
  },

  {
    id: 'military_pressure',
    phase: 6,
    title: 'The Shadow of Force',
    narrative: `Your growing independence has attracted unwanted attention. A neighboring country, backed by a major power, begins military exercises near your border. Privately, a Western ambassador warns that your "regional destabilization" (meaning your minerals cartel and debt defiance) has "security implications." A military contractor offers to sell you advanced weapons — on credit, of course.

Rosa Luxemburg wrote powerfully about the link between capitalism and militarism. She argued that imperialism isn't just about trade and money — it also involves military force, either directly or as a threat. Countries that challenge the economic order face not just financial punishment but the shadow of violence. The arms industry profits from the fear, and the fear keeps countries in line.

Your defense minister argues you need better equipment. Your finance minister says military spending would destroy the budget you've worked so hard to balance. Your foreign affairs team warns that an arms race would drain resources meant for development — exactly what your opponents want.

Nkrumah faced this same dilemma. He was eventually overthrown in a military coup widely believed to have been backed by foreign intelligence agencies. The threat is real. But the cost of responding to it on its terms may be just as dangerous.`,
    choices: [
      { id: 'military_diplomacy', text: 'Respond with diplomacy and regional alliances, not weapons', consequence: 'You strengthen ties with neighboring countries and appeal to the African Union for collective security.', effects: { internationalStanding: 10, sovereignty: 5, publicSupport: 5, economicStrength: 3 }, nextNode: 'continental_leadership' },
      { id: 'military_defense', text: 'Invest modestly in defense while maintaining development spending', consequence: 'You modernize the military within a strict budget cap and focus on defensive capabilities.', effects: { sovereignty: 8, publicSupport: 3, debtBurden: 5, economicStrength: -3, infrastructure: -3 }, nextNode: 'generational_test' },
      { id: 'military_peoples', text: 'Build a "people\'s defense" — community militias and civic preparedness instead of expensive hardware', consequence: 'You create a national service program combining skills training with community defense.', effects: { publicSupport: 8, sovereignty: 8, humanDevelopment: 5 }, nextNode: 'peoples_constitution' },
    ],
  },

  {
    id: 'land_grab_resistance',
    phase: 6,
    title: 'The Land Grabbers',
    narrative: `International agribusiness corporations are circling. They want to lease large tracts of farmland for export crops — soybeans, palm oil, biofuels. They promise jobs and revenue. They offer 99-year leases at prices that seem generous.

Luxemburg described this process as "primitive accumulation" — the ongoing violence of separating people from their land and resources. It's not something that happened once in history; it keeps happening whenever capitalism needs new territory to exploit. Agostina Costantino's study of land grabbing in Latin America (Agrarian South, 2014) confirms this pattern: when corporations grab land for export crops, the result is always the same — small farmers are pushed off their land, food security collapses, and the profits flow overseas. Sam Moyo's detailed study of the African land question (Agrarian South, 2018) shows the exact same thing happening across the continent. These land deals would take fertile ground away from the small farmers and cooperatives your reforms created.

Your agricultural minister is alarmed. The communities where these leases are proposed are organizing resistance. Farmers who received land through your reform program refuse to give it back — they've tasted food sovereignty and won't surrender it. Flavia Rios and Regimeire Maciel's study of Black feminist organizing in rural Brazil (Agrarian South, 2021) shows how the strongest resistance to land grabs comes when women and communities of color organize together — and that's exactly what's happening in Azania's southern provinces.

But the corporations have powerful backers. Your trade agreements with the EU include "investment protection" clauses that could be used to force the deals through. And some of your own officials, seeing the revenue potential, are quietly supportive.`,
    choices: [
      { id: 'land_resist', text: 'Ban large-scale foreign land leases entirely — Azanian soil for Azanian farmers', consequence: 'You pass a Land Sovereignty Act prohibiting foreign ownership or long-term leasing of agricultural land.', effects: { sovereignty: 15, publicSupport: 12, economicStrength: -5, internationalStanding: -8 }, nextNode: 'peoples_constitution' },
      { id: 'land_community', text: 'Give communities the right to veto any land deal affecting their territory', consequence: 'You create legally binding community consent requirements for all land transactions.', effects: { sovereignty: 10, publicSupport: 10, humanDevelopment: 5, economicStrength: -3 }, nextNode: 'democratic_deepening' },
      { id: 'land_compromise', text: 'Allow limited leases but with strict conditions — food security first, exports second', consequence: 'You permit leases only on non-food-producing land with mandatory local employment and revenue sharing.', effects: { sovereignty: 3, economicStrength: 8, publicSupport: 3, internationalStanding: 5 }, nextNode: 'generational_test' },
    ],
  },

  {
    id: 'democratic_deepening',
    phase: 6,
    title: 'Democracy From Below',
    narrative: `Your country has held elections and maintained basic democratic institutions. But true democracy — the kind where ordinary people actually shape the decisions that affect their lives — requires more than voting every five years.

Rosa Luxemburg was passionate about this. She famously wrote: "Freedom only for the supporters of the government, only for the members of one party — however numerous they may be — is no freedom at all. Freedom is always the freedom of the one who thinks differently." She believed that socialism without democracy was empty, and that real change had to come from the active participation of millions of people, not from decisions handed down from above.

Your development programs have been effective, but they've been top-down — designed by experts, implemented by bureaucrats. Communities receive services but don't shape them. Workers benefit from reforms but didn't design them. Lyn Ossome's research on feminist resistance in African agrarian movements (Agrarian South, 2021) reveals a key lesson: the most durable social transformations happen when marginalized groups — women, youth, small farmers — don't just benefit from change but lead it. The risk is that everything you've built depends on you personally — and when you leave power, it could be reversed.

Utsa Patnaik's essay on political economy and its fallacies (Agrarian South, 2022) drives this home: the mainstream economics taught in universities around the world systematically hides the reality of exploitation and dispossession. If your people understand these ideas — if economic literacy becomes part of everyday life — then no future government can easily trick them into giving up what they've built. The question is how to root your achievements in popular power so they outlast any single leader.`,
    choices: [
      { id: 'demo_participatory', text: 'Create participatory budgeting — let communities decide how development money is spent', consequence: 'You give local assemblies direct control over 30% of the national development budget.', effects: { publicSupport: 12, sovereignty: 8, humanDevelopment: 8, economicStrength: -3 }, nextNode: 'peoples_constitution' },
      { id: 'demo_workers_councils', text: 'Establish workers\' councils in every major industry with real decision-making power', consequence: 'You mandate elected worker representatives with veto power on major corporate decisions.', effects: { publicSupport: 10, sovereignty: 10, humanDevelopment: 5, economicStrength: 3 }, nextNode: 'peoples_constitution' },
      { id: 'demo_media', text: 'Invest in independent media and civic education so people can hold any government accountable', consequence: 'You fund community radio, investigative journalism, and a national civic education curriculum.', effects: { publicSupport: 8, humanDevelopment: 10, sovereignty: 5, internationalStanding: 5 }, nextNode: 'generational_test' },
    ],
  },

  {
    id: 'currency_sovereignty',
    phase: 6,
    title: 'Breaking the Dollar Chain',
    narrative: `One of the deepest forms of dependency is currency. Your economy still depends on the US dollar for international trade. When the dollar strengthens, your debts get more expensive. When the US Federal Reserve raises interest rates, capital flows out of your country. Decisions made in Washington affect your people more than decisions made in your own capital.

Building a sovereign currency system is one of the hardest challenges in development. It means building trust — trust that your currency holds its value, that your central bank is competent, and that your economy is productive enough to back what you print. It also means challenging the dollar system that the US has used as a tool of global power since World War II.

Your central bank governor proposes a bold plan: back your currency with a basket of real assets — your cobalt reserves, agricultural output, and the combined economic activity of your regional trading partners. It's unconventional, but so is everything else you've done.`,
    choices: [
      { id: 'currency_sovereign', text: 'Launch the commodity-backed currency — full monetary sovereignty', consequence: 'You introduce the new Azanian Crown, backed by mineral reserves and agricultural output.', effects: { sovereignty: 15, economicStrength: 5, internationalStanding: -5, debtBurden: -8, publicSupport: 5 }, nextNode: 'peoples_constitution' },
      { id: 'currency_regional', text: 'Build a regional currency with your trading partners', consequence: 'You propose a shared currency among your economic bloc, reducing everyone\'s dollar dependency.', effects: { sovereignty: 10, internationalStanding: 10, economicStrength: 5, debtBurden: -5 }, nextNode: 'continental_leadership' },
      { id: 'currency_gradual', text: 'Reduce dollar dependency gradually — start billing exports in your own currency', consequence: 'You require that cobalt and agricultural exports be invoiced in Azanian currency.', effects: { sovereignty: 8, economicStrength: 8, internationalStanding: 3, debtBurden: -3 }, nextNode: 'generational_test' },
    ],
  },

  {
    id: 'tech_independence',
    phase: 6,
    title: 'The Technology Question',
    narrative: `You've built factories and trained workers. But the core technology — the designs, the software, the patents — often still belongs to foreign companies. You assemble products using blueprints someone else drew. You farm using seeds someone else engineered. You communicate using platforms someone else controls.

True sovereignty in the 21st century requires technology independence. Not in everything — no country makes everything it needs — but in the sectors that matter most: energy, food, communications, and defense.

Your university system has grown strong. Your diaspora networks bring knowledge from around the world. Your young people are hungry for opportunity. The question is how to channel this potential into genuine technological capacity.`,
    choices: [
      { id: 'tech_national_lab', text: 'Create a national research laboratory focused on the technologies Azania needs most', consequence: 'You establish the Azanian National Lab with departments in renewable energy, agricultural biotech, and digital infrastructure.', effects: { humanDevelopment: 12, sovereignty: 10, economicStrength: 5, infrastructure: 5 }, nextNode: 'peoples_constitution' },
      { id: 'tech_open_source', text: 'Go open-source — develop technology collectively with other developing nations', consequence: 'You pioneer a South-South open technology initiative, sharing research freely.', effects: { internationalStanding: 10, humanDevelopment: 8, sovereignty: 8, economicStrength: 3 }, nextNode: 'continental_leadership' },
      { id: 'tech_startup', text: 'Create a startup ecosystem with government backing — let young entrepreneurs lead', consequence: 'You launch a national innovation fund providing grants and mentorship to Azanian tech startups.', effects: { economicStrength: 10, humanDevelopment: 8, sovereignty: 5, publicSupport: 5 }, nextNode: 'generational_test' },
    ],
  },

  {
    id: 'generational_test',
    phase: 6,
    title: 'The Next Generation',
    narrative: `You've been leading Azania for over a decade. The country is transformed — but you won't lead forever. The next generation of leaders is emerging, and they see the world differently than you do.

Some are technocrats trained in your universities who want to modernize faster. Some are community organizers who think development hasn't reached the grassroots deeply enough. Some are business leaders who want to open the economy further. And some — backed by foreign interests — want to reverse your reforms entirely.

Luxemburg warned that the gains of any progressive movement are never permanent unless they're defended by an active, educated population. If sovereignty is just a government program, it can be cancelled. If it's rooted in the daily practice of millions of people — in cooperatives, unions, community councils, and civic organizations — it's much harder to undo.

The real test of your leadership isn't what you built. It's whether it lasts.`,
    choices: [
      { id: 'gen_institutions', text: 'Enshrine your achievements in constitutional law and independent institutions', consequence: 'You push through constitutional amendments protecting sovereign ownership of resources and social programs.', effects: { sovereignty: 10, publicSupport: 5, humanDevelopment: 5, economicStrength: 3, internationalStanding: 3 }, nextNode: 'peoples_constitution' },
      { id: 'gen_movement', text: 'Build a mass movement that can defend these gains regardless of who holds power', consequence: 'You invest in civic organizations, labor unions, and community councils as permanent democratic infrastructure.', effects: { publicSupport: 12, sovereignty: 8, humanDevelopment: 8 }, nextNode: 'peoples_constitution' },
      { id: 'gen_transition', text: 'Step aside gracefully and let the next generation chart their own course', consequence: 'You announce you won\'t run again and create a competitive, democratic succession process.', effects: { publicSupport: 8, internationalStanding: 8, sovereignty: 5, humanDevelopment: 3 }, nextNode: 'ending_pragmatic_sovereignty' },
    ],
  },

  {
    id: 'global_recession_test',
    phase: 6,
    title: 'The Global Storm',
    narrative: `A major global recession hits. Commodity prices crash. Export revenues plunge. Your trading partners cut spending. The economic gains of the past decade are suddenly under threat.

This is the moment that tests whether your development model is real or just a product of good times. Countries dependent on a single export commodity or a single trading partner are devastated. But you've built something different — a diversified economy, a strong domestic market, regional trade networks, and food sovereignty.

The crisis is also an opportunity. As Luxemburg observed, capitalism's crises expose its contradictions. The same system that created the boom is now creating the bust, and the countries that suffer most are those most integrated into the global financial system on terms set by others. Your relative independence becomes a shield.`,
    choices: [
      { id: 'recession_domestic', text: 'Double down on domestic demand — support your people and let the internal economy carry you through', consequence: 'You expand social programs, increase public investment, and support cooperatives.', effects: { publicSupport: 10, sovereignty: 8, economicStrength: -3, debtBurden: 5, humanDevelopment: 5 }, nextNode: 'peoples_constitution' },
      { id: 'recession_regional', text: 'Deepen regional trade — your neighbors need you and you need them', consequence: 'You activate emergency trade agreements with your economic bloc, keeping goods flowing.', effects: { internationalStanding: 8, economicStrength: 5, sovereignty: 5, publicSupport: 5 }, nextNode: 'continental_leadership' },
      { id: 'recession_innovate', text: 'Use the crisis to leapfrog — invest in the industries that will matter after the recession', consequence: 'You channel resources into green energy, biotech, and digital infrastructure while others cut back.', effects: { economicStrength: 8, humanDevelopment: 8, sovereignty: 5, debtBurden: 5 }, nextNode: 'second_wave_industrial' },
    ],
  },

  {
    id: 'counter_revolution',
    phase: 6,
    title: 'The Backlash',
    narrative: `The old elite — landowners, compradors, and politicians tied to foreign interests — are organizing. Funded by international business lobbies and supported by sympathetic foreign media, they launch a campaign to reverse your reforms. They call it "modernization" and "opening up," but what they really want is a return to the old system where wealth flowed outward and they got their cut.

Luxemburg spent her life studying the tension between reform and reaction. She knew that every step toward economic justice would be met with fierce resistance from those who benefited from inequality. The question isn't whether the backlash comes — it always does — but whether the reforms are rooted deeply enough to survive it. Prabhat Patnaik's study of the relationship between neoliberalism and fascism (Agrarian South, 2020) describes this dynamic with chilling precision: when neoliberal policies are threatened by popular resistance, the ruling class often turns to authoritarian politics — funding extreme nationalist movements, spreading fear about "instability," and using both legal and illegal means to crush reform.

Their weapons are sophisticated: social media campaigns, legal challenges to your land reform, financial speculation against your currency, and political candidates promising "investor confidence" to an anxious middle class. Yeros and Jha's analysis of "late neo-colonialism" (Agrarian South, 2020) calls this the permanent crisis of monopoly capitalism — the system can't tolerate alternatives, because every successful example of sovereign development proves the old system wasn't inevitable.`,
    choices: [
      { id: 'counter_mobilize', text: 'Mobilize the people — your reforms have millions of beneficiaries, and they will defend what they\'ve gained', consequence: 'You call for a national day of action. Millions march in support of sovereignty and reform.', effects: { publicSupport: 12, sovereignty: 10, economicStrength: -3, internationalStanding: -5 }, nextNode: 'peoples_constitution' },
      { id: 'counter_compromise', text: 'Offer limited concessions to defuse the crisis while protecting core achievements', consequence: 'You open some sectors to more foreign investment while keeping land reform and mining nationalization intact.', effects: { publicSupport: -3, sovereignty: -3, economicStrength: 5, internationalStanding: 5 }, nextNode: 'generational_test' },
      { id: 'counter_institutional', text: 'Let the democratic institutions handle it — if your reforms are popular, they\'ll survive the vote', consequence: 'You defend your record in democratic debate and trust the electoral process.', effects: { publicSupport: 5, sovereignty: 5, internationalStanding: 8, humanDevelopment: 3 }, nextNode: 'ending_pragmatic_sovereignty' },
    ],
  },

  {
    id: 'second_wave_industrial',
    phase: 6,
    title: 'The Industrial Leap',
    narrative: `The groundwork you've laid — trained workers, reliable infrastructure, energy independence, and regional markets — makes a major industrial expansion possible. Your factories are ready to move from simple manufacturing to complex production: electric vehicle components, pharmaceutical manufacturing, semiconductor assembly, green energy equipment.

This is the leap that separates countries that stay in the middle-income trap from those that break through. South Korea, China, and Taiwan all made this jump, but each required massive state investment and strategic protection of key industries — exactly the policies that the IMF and World Bank advised against.

Your advantage is timing. The global green transition needs the minerals you have and the products you can make. Your regional market of 180 million people provides the scale. Your sovereign development path means you're not locked into producing cheap goods for someone else's supply chain.`,
    choices: [
      { id: 'industrial_state', text: 'State-led industrial policy — create national champions in strategic sectors', consequence: 'You establish state-backed enterprises in EVs, pharma, and green tech with 10-year development plans.', effects: { economicStrength: 12, sovereignty: 10, infrastructure: 8, debtBurden: 5 }, nextNode: 'peoples_constitution' },
      { id: 'industrial_coop', text: 'Worker-owned industrial cooperatives — the people who build the factories should own them', consequence: 'You extend the cooperative model to high-tech manufacturing with state R&D support.', effects: { publicSupport: 10, sovereignty: 10, economicStrength: 8, humanDevelopment: 8 }, nextNode: 'peoples_constitution' },
      { id: 'industrial_continental', text: 'Build the industrial base as a continental project with your regional partners', consequence: 'You propose shared factories across borders, with each nation specializing in what it does best.', effects: { internationalStanding: 10, economicStrength: 10, sovereignty: 5, infrastructure: 5 }, nextNode: 'continental_leadership' },
    ],
  },

  // ═══════════════════════════════════════
  // PHASE 7: THE LEGACY
  // ═══════════════════════════════════════

  {
    id: 'peoples_constitution',
    phase: 7,
    title: 'The People\'s Constitution',
    narrative: `The time has come to lock in what you've built. Not through executive orders that the next president can reverse, but through a democratic constitution written with the participation of millions.

The constitutional convention is unlike any in Africa's history. Delegates include farmers, miners, factory workers, students, and community leaders alongside lawyers and politicians. The draft enshrines: sovereign ownership of natural resources, worker participation in all major enterprises, universal access to food, healthcare, and education, and limits on foreign ownership of land and strategic industries. Issa Shivji's concept of "working people" (Agrarian South, 2017) — a category that embraces farmers, workers, informal traders, and all those who labor for a living — becomes a constitutional reality. The constitution protects not just "citizens" in the abstract, but the specific rights of working people to land, livelihood, and democratic participation.

Rosa Luxemburg would recognize this moment. She argued that real democracy isn't just about elections — it's about ordinary people having genuine power over the conditions of their lives. Utsa Patnaik's argument that mainstream economics hides the reality of exploitation (Agrarian South, 2022) gives the constitution another layer: it mandates that economic education in schools teaches the real history of colonialism, debt, and extraction — so that future generations understand what their forebears fought for and why it matters. A constitution written by the people, protecting the gains the people fought for, is democracy in its deepest sense.

Critics say you're making economic policy too rigid. Supporters say you're making justice too important to leave to the whims of future politicians.`,
    choices: [
      { id: 'constitution_strong', text: 'Pass the strongest version — future generations will thank you for protecting their rights', consequence: 'The constitution passes with broad popular support after months of public debate.', effects: { sovereignty: 12, publicSupport: 10, humanDevelopment: 8, economicStrength: 3, internationalStanding: 3 }, nextNode: 'ending_sovereign_development' },
      { id: 'constitution_flexible', text: 'Build in flexibility — protect core rights but allow future generations to adapt economic policy', consequence: 'You enshrine social rights and resource sovereignty but leave industrial policy to elected governments.', effects: { sovereignty: 8, publicSupport: 8, economicStrength: 5, humanDevelopment: 5, internationalStanding: 5 }, nextNode: 'ending_rising_power' },
    ],
  },

  {
    id: 'continental_leadership',
    phase: 7,
    title: 'Leading the Continent',
    narrative: `Your journey from indebted, dependent nation to sovereign development model has made Azania a beacon. Delegations from across Africa and the Global South visit to study your approach. Your capital hosts conferences on alternatives to the Washington Consensus. Your universities train the next generation of development thinkers.

But leadership comes with responsibility. Your neighbors face the same challenges you did — debt traps, resource extraction, brain drains, food insecurity. They look to you not just for inspiration but for practical help. Can you share what you've learned without becoming the kind of patron you fought to escape?

Nkrumah's dream of African unity, Luxemburg's vision of international solidarity, and the practical cooperation that Yingying Fu and Eduardo Olie document — all converge in this moment. The question is what kind of leader Azania will be.`,
    choices: [
      { id: 'lead_solidarity', text: 'Lead by sharing — open your training programs, share your technology, build collective institutions', consequence: 'You create an African Sovereign Development Institute, free and open to all.', effects: { internationalStanding: 15, sovereignty: 8, publicSupport: 8, humanDevelopment: 5, economicStrength: 3 }, nextNode: 'ending_sovereign_development' },
      { id: 'lead_pragmatic', text: 'Lead by example — focus on perfecting your own model so others can adapt it', consequence: 'You deepen your domestic achievements while publishing detailed guides for other countries.', effects: { sovereignty: 10, economicStrength: 8, publicSupport: 5, humanDevelopment: 8, internationalStanding: 8 }, nextNode: 'ending_rising_power' },
    ],
  },

  // ═══════════════════════════════════════
  // ENDINGS
  // ═══════════════════════════════════════

  {
    id: 'ending_sovereign_development',
    phase: 8,
    title: 'Sovereign Development',
    narrative: '',
    choices: [],
    isEnding: true,
    endingType: 'victory',
    endingTitle: 'Sovereign Development Achieved',
    endingNarrative: `The Republic of Azania stands as proof that another path is possible. Your country isn't rich by Global North standards — but it's sovereign, dignified, and developing on its own terms. Your people eat food grown by Azanian farmers on Azanian land. Your factories employ Azanian workers making goods for Azanian and regional markets. Your debts are manageable, your institutions accountable, your future in your own hands.

The centuries-long drain of wealth that Utsa Patnaik documented — from poorer countries to richer ones — has been, if not reversed, then stopped. The wealth your workers and farmers create stays in Azania, invested in Azanian schools, hospitals, and factories. The squeezing of people's income that Prabhat Patnaik identifies as modern imperialism's key tool has been resisted: your people's wages buy food, your government's revenues fund development, and your nation's resources serve your nation's needs.

You didn't follow Washington's playbook or Beijing's. You built something the thinkers who inspired your journey would recognize: development that serves the people doing the developing, sovereignty that's economic as well as political, and engagement with the world that doesn't require submission to it.

The research published in Agrarian South: Journal of Political Economy — from Sam Moyo's work on the African land question to Samir Amin's vision of delinking, from Utsa Patnaik's exposure of colonial-era wealth drains to Prabhat Patnaik's analysis of the peasant question, from Issa Shivji's concept of "working people" to Lyn Ossome's feminist resistance movements — these weren't just academic theories. They were the intellectual roadmap for everything you built. The journal's founding mission — to advance autonomous thinking in the Global South — became Azania's guiding principle.

Rosa Luxemburg wrote that "those who do not move, do not notice their chains." Azania moved. It broke its chains. And in doing so, it showed the world that the chains were never inevitable.

As Nkrumah wrote: "We face neither East nor West; we face forward." Azania faces forward.`,
  },

  {
    id: 'ending_rising_power',
    phase: 8,
    title: 'Rising Power',
    narrative: '',
    choices: [],
    isEnding: true,
    endingType: 'victory',
    endingTitle: 'A Rising Power',
    endingNarrative: `Azania hasn't just developed — it has transformed. Your economy grows at rates that command international attention. Your tech sector innovates. Your manufactured exports compete globally. Your universities attract students from across the continent.

The path required compromises. Some sovereignty was traded for growth. Some debt was taken on for investment. Some foreign ownership was accepted for technology. But the direction is clear: Azania is rising, and its rise is lifting its neighbors too.

The development model you built — practical, flexible, borrowing from every tradition while submitting to none — is being studied across the Global South. You've proven that a developing nation in the 21st century can industrialize, build real capacity, and chart its own course. The scholars of the Agrarian South Network would recognize your achievement: the "classical agrarian question" that Moyo, Jha, and Yeros described — how to transform a colonial economy into a sovereign one — has been answered, if imperfectly, in practice.

As Rosa Luxemburg understood, the global system constantly needs to expand and absorb new markets. But Azania has shown that a country can grow on its own terms — absorbing what it chooses, rejecting what it doesn't need, and building its own future.`,
  },

  {
    id: 'ending_pragmatic_sovereignty',
    phase: 8,
    title: 'Pragmatic Sovereignty',
    narrative: '',
    choices: [],
    isEnding: true,
    endingType: 'partial_victory',
    endingTitle: 'Pragmatic Sovereignty',
    endingNarrative: `Azania's path has been neither revolutionary nor submissive. You navigated global power with skill, accepting limits where necessary while always pushing for more independence. Your sovereignty is real but imperfect — constrained by international agreements, trade relationships, and a global economy designed by and for richer nations.

Your people are better off. Poverty has fallen. Services have improved. The economy grows, if not spectacularly. Your institutions are imperfect but functional. Democracy is messy but alive.

This isn't the triumphant sovereignty Nkrumah dreamed of. But it may be the achievable sovereignty that the real world allows. As Deng understood, perfection is the enemy of progress. You made progress, and the next generation inherits a country with more options than you had.

Rosa Luxemburg believed that the struggle for justice never ends — that every generation must fight its own battles. But she also believed that each victory, however partial, makes the next one possible. Your pragmatic gains have widened the path for those who come after. As the Agrarian South journal's permanent "Third World Legacies" section reminds us, the intellectual heritage of the Global South is long and deep — your generation added a new chapter.

The struggle continues. It always does. But you've moved the line forward.`,
  },

  {
    id: 'ending_dependent_development',
    phase: 8,
    title: 'Dependent Development',
    narrative: '',
    choices: [],
    isEnding: true,
    endingType: 'defeat',
    endingTitle: 'Dependent Development',
    endingNarrative: `Azania grows, but it grows for others. Your GDP rises, but profits flow to foreign shareholders, creditors, and supply chain owners. Your workers have jobs, but in roles that serve global companies rather than national priorities. Your government operates within limits set by international institutions and treaties that prevent real sovereign choice.

Economists call this "dependent development" — growth without independence, modernization without liberation. By World Bank metrics, you're a success story. But as Utsa Patnaik has shown, those metrics are designed to flatter: poverty lines that don't reflect what food actually costs, GDP numbers that count outgoing profits as national income, and growth rates that hide who's really benefiting.

The drain of wealth that the Patnaiks have documented — centuries of money flowing from poorer countries to richer ones — continues in new forms. It used to be direct colonial taxation. Now it's corporate profits shipped abroad, debt payments on loans made under pressure, and low commodity prices forced on countries whose people have been kept poor by austerity. As Prabhat Patnaik argues, this income squeeze is the core mechanism of how powerful countries maintain their advantage today.

Nkrumah's warning proved prophetic: a country can look independent while its economy — and therefore its politics — is controlled from the outside.

Rosa Luxemburg warned that capitalism would always seek to expand into new territories, absorbing them into its system. Azania has been absorbed — not through colonial armies this time, but through debt, trade rules, and investment treaties that achieve the same result. The research in Agrarian South — from Costantino's studies of land grabbing to Yeros and Jha's analysis of late neo-colonialism — describes this pattern repeating across the Global South: growth without sovereignty, modernization without liberation.

The struggle for genuine sovereignty continues. Perhaps the next generation — armed with the ideas of Moyo, the Patnaiks, Amin, Shivji, and the many scholars fighting for autonomous thinking in the South — will find the path you could not.`,
  },
];

export function getNode(id: string): NarrativeNode | undefined {
  return narrativeNodes.find((n) => n.id === id);
}
