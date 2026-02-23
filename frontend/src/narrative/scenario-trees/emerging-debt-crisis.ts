import type { GenericNarrativeNode } from '../scenario-types';

/**
 * Emerging Debt Crisis — Republic of Meridia
 * Thinkers: Hudson, Tooze, Kadri — debt as domination, IMF conditionality, debt deflation
 */
export const emergingDebtCrisisNodes: GenericNarrativeNode[] = [
  {
    id: 'start',
    phase: 1,
    title: 'The Debt Trap',
    narrative: `You've just been appointed finance minister of the Republic of Meridia. The economy is in trouble. Public debt stands at 65% of GDP and rising. The current account is in deficit. Global interest rates are climbing, and your country's borrowing costs are set to balloon.

As Michael Hudson has documented, international debt often functions as a tool of control — creditors use it to impose policies that serve their interests, not yours. Adam Tooze's work on financial crises shows that these moments require political choices, not just market discipline: who bears the cost is always decided by power. Ali Kadri has traced how structural adjustment has deliberately dismantled developmental states across the Global South.

Your predecessor left you with a choice: austerity to please creditors, or stimulus to protect jobs and growth. The IMF has offered a stabilization program. Domestic bondholders are nervous. Your citizens are already feeling the squeeze from rising prices and stagnant wages.

The central bank governor warns that without credible action, capital could flee and the currency could collapse. Your labor minister warns that cutting spending will push unemployment into double digits. The trade minister says export competitiveness is eroding.

What do you do first?`,
    choices: [
      {
        id: 'austerity_first',
        text: 'Announce austerity: cut spending and raise taxes to stabilize debt',
        consequence: 'You signal fiscal discipline to markets. Bond yields ease slightly.',
        effects: { debtBurden: -8, publicSupport: -12, economicStrength: -5 },
        nextNode: 'austerity_path',
      },
      {
        id: 'growth_first',
        text: 'Prioritize growth: maintain spending and invest in infrastructure',
        consequence: 'You bet on growth to reduce the debt ratio. Markets are skeptical.',
        effects: { debtBurden: 5, publicSupport: 5, economicStrength: 8 },
        nextNode: 'growth_path',
      },
      {
        id: 'restructure',
        text: 'Seek debt restructuring: negotiate with creditors for relief',
        consequence: 'You open talks with bondholders and the Paris Club.',
        effects: { debtBurden: -15, internationalStanding: -10, publicSupport: 5 },
        nextNode: 'restructure_path',
      },
    ],
  },
  {
    id: 'austerity_path',
    phase: 2,
    title: 'The Austerity Squeeze',
    narrative: `You've cut spending by 15% and raised the VAT. The IMF has approved a new credit line. Bond yields have fallen. But unemployment is rising and the streets are filling with protesters.

Hudson calls this "debt deflation" — when debt grows faster than the economy's ability to pay, it crushes demand and transfers wealth to creditors. Tooze documented how austerity failed in Europe after 2010: it deepened recessions and sometimes raised debt-to-GDP because the denominator fell faster than the numerator. Your economic advisor warns the same may happen here.

Do you double down or adjust course?`,
    choices: [
      {
        id: 'double_down',
        text: 'Stay the course — credibility with markets is paramount',
        consequence: 'You resist pressure to change policy.',
        effects: { debtBurden: -10, publicSupport: -15, economicStrength: -8 },
        nextNode: 'austerity_outcome',
      },
      {
        id: 'targeted_relief',
        text: 'Add targeted relief: protect food subsidies and unemployment benefits',
        consequence: 'You soften the austerity package with targeted social spending.',
        effects: { debtBurden: -3, publicSupport: 5, economicStrength: 2 },
        nextNode: 'austerity_soft_outcome',
      },
    ],
  },
  {
    id: 'austerity_outcome',
    phase: 3,
    title: 'The Reckoning',
    narrative: `You held the line. Debt has stabilized. But unemployment has reached 12%. Growth is negative. Public support has collapsed. The opposition has called for early elections.

Your legacy is mixed: you avoided a sovereign default. But the human cost was high. The economy may take years to recover.`,
    choices: [
      {
        id: 'end_austerity',
        text: 'Accept the outcome',
        consequence: '',
        effects: {},
        nextNode: 'ending_austerity',
      },
    ],
  },
  {
    id: 'ending_austerity',
    phase: 4,
    title: 'Stabilized, But at What Cost?',
    narrative: '',
    choices: [],
    isEnding: true,
    endingType: 'partial_victory',
    endingTitle: 'Fiscal Credibility',
    endingNarrative: `You stabilized the debt. The IMF and bond markets are satisfied. But growth collapsed, unemployment soared, and public trust in government has eroded. The economy is stable — but it is a stability of low expectations.`,
  },
  {
    id: 'austerity_soft_outcome',
    phase: 3,
    title: 'Balanced Approach',
    narrative: `By adding targeted relief, you avoided the worst of the social backlash. Debt is still declining, albeit more slowly. Growth is weak but positive. Public support has held.

You've navigated a narrow path.`,
    choices: [
      {
        id: 'end_soft',
        text: 'Continue',
        consequence: '',
        effects: {},
        nextNode: 'ending_balanced',
      },
    ],
  },
  {
    id: 'ending_balanced',
    phase: 4,
    title: 'A Narrow Path',
    narrative: '',
    choices: [],
    isEnding: true,
    endingType: 'victory',
    endingTitle: 'Fiscal Prudence with a Human Face',
    endingNarrative: `You balanced fiscal discipline with social protection. Debt stabilized. Growth returned. Public support held. You proved that austerity and compassion can coexist — if you choose the right targets.`,
  },
  {
    id: 'growth_path',
    phase: 2,
    title: 'Betting on Growth',
    narrative: `You've maintained spending and launched an infrastructure program. The currency has weakened 15%. Bond yields have spiked. But construction activity is up and unemployment is falling.

Your economic advisor says the growth bet could pay off — if exports respond to the weaker currency and if investment picks up. But if capital flight continues, you could face a full-blown crisis.

Do you stay the course or adjust?`,
    choices: [
      {
        id: 'stay_growth',
        text: 'Stay the course — growth will fix the debt ratio',
        consequence: 'You maintain the expansionary stance.',
        effects: { debtBurden: 5, economicStrength: 12, publicSupport: 8 },
        nextNode: 'growth_outcome',
      },
      {
        id: 'add_monetary',
        text: 'Tighten monetary policy to stabilize the currency',
        consequence: 'The central bank raises rates to stem capital flight.',
        effects: { debtBurden: 3, economicStrength: 5, publicSupport: 3 },
        nextNode: 'growth_stabilized_outcome',
      },
    ],
  },
  {
    id: 'growth_outcome',
    phase: 3,
    title: 'The Growth Gamble',
    narrative: `Your bet paid off. Exports surged on the weaker currency. Investment returned. GDP growth accelerated. The debt-to-GDP ratio began to fall as the denominator grew faster than the numerator.

You've proved the growth-first camp right.`,
    choices: [
      {
        id: 'end_growth',
        text: 'Continue',
        consequence: '',
        effects: {},
        nextNode: 'ending_growth',
      },
    ],
  },
  {
    id: 'ending_growth',
    phase: 4,
    title: 'Growth Wins',
    narrative: '',
    choices: [],
    isEnding: true,
    endingType: 'victory',
    endingTitle: 'Growth Over Austerity',
    endingNarrative: `You bet on growth and won. By maintaining spending and letting the currency adjust, you avoided the austerity trap. Debt stabilized through growth, not austerity. The economy recovered.`,
  },
  {
    id: 'growth_stabilized_outcome',
    phase: 3,
    title: 'Careful Balance',
    narrative: `You combined growth with monetary stability. The currency held. Growth was modest but positive. Debt crept up but didn't spiral.`,
    choices: [
      {
        id: 'end_stab',
        text: 'Continue',
        consequence: '',
        effects: {},
        nextNode: 'ending_modest',
      },
    ],
  },
  {
    id: 'ending_modest',
    phase: 4,
    title: 'Modest Success',
    narrative: '',
    choices: [],
    isEnding: true,
    endingType: 'partial_victory',
    endingTitle: 'Steady as She Goes',
    endingNarrative: `You avoided both crisis and boom. Growth was modest. Debt was manageable. You navigated the middle path.`,
  },
  {
    id: 'restructure_path',
    phase: 2,
    title: 'At the Negotiating Table',
    narrative: `You've opened restructuring talks. Creditors are resistant. Some have agreed to extend maturities. Others have demanded a haircut in exchange for debt relief.

Hudson has argued that throughout history, unpayable debts were periodically cancelled — debt jubilees — to prevent social collapse. The IMF, as he puts it, acts as a creditor cartel: their "support" comes with conditions that often make debts harder to pay. Kadri documents how countries that restructured on their own terms — resisting full IMF conditionality — preserved more policy space for development.

The IMF has offered to support a restructuring if you commit to reforms. Your legal team warns that sovereign immunity may not protect you from litigation in foreign courts.

Do you accept the IMF deal or continue bilateral negotiations?`,
    choices: [
      {
        id: 'imf_deal',
        text: 'Accept IMF support and commit to reforms',
        consequence: 'You sign the restructuring agreement with IMF backing.',
        effects: { debtBurden: -20, sovereignty: -10, economicStrength: 5 },
        nextNode: 'restructure_imf_outcome',
      },
      {
        id: 'bilateral_only',
        text: 'Continue bilateral talks without IMF',
        consequence: 'You pursue a creditor-led restructuring.',
        effects: { debtBurden: -12, sovereignty: 5, publicSupport: 8 },
        nextNode: 'restructure_bilateral_outcome',
      },
    ],
  },
  {
    id: 'restructure_imf_outcome',
    phase: 3,
    title: 'Restructured',
    narrative: `With IMF backing, you've secured debt relief. The reforms are painful but the fiscal space has improved. Debt service has fallen.`,
    choices: [
      {
        id: 'end_imf',
        text: 'Continue',
        consequence: '',
        effects: {},
        nextNode: 'ending_restructured',
      },
    ],
  },
  {
    id: 'ending_restructured',
    phase: 4,
    title: 'Debt Relief',
    narrative: '',
    choices: [],
    isEnding: true,
    endingType: 'victory',
    endingTitle: 'A Fresh Start',
    endingNarrative: `You secured debt relief through negotiation. The burden is lighter. The economy has room to breathe. You've bought time to build a more sustainable path.`,
  },
  {
    id: 'restructure_bilateral_outcome',
    phase: 3,
    title: 'Sovereign Negotiation',
    narrative: `You've restructured without IMF conditions. The debt burden has fallen. You've preserved policy space. But the process was long and uncertain.`,
    choices: [
      {
        id: 'end_bilat',
        text: 'Continue',
        consequence: '',
        effects: {},
        nextNode: 'ending_sovereign',
      },
    ],
  },
  {
    id: 'ending_sovereign',
    phase: 4,
    title: 'Sovereign Restructuring',
    narrative: '',
    choices: [],
    isEnding: true,
    endingType: 'victory',
    endingTitle: 'On Your Own Terms',
    endingNarrative: `You restructured debt without IMF conditionality. You preserved sovereignty and policy space. The path was harder, but the outcome was yours.`,
  },
];

export function getNode(id: string): GenericNarrativeNode | undefined {
  return emergingDebtCrisisNodes.find((n) => n.id === id);
}
