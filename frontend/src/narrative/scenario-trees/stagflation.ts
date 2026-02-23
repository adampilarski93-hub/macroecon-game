import type { GenericNarrativeNode } from '../scenario-types';

/**
 * Stagflation — Federated States of Norden
 * Thinkers: Polanyi, Tooze, Hudson — fictitious commodities, financial crisis politics, FIRE parasitism
 */
export const stagflationNodes: GenericNarrativeNode[] = [
  {
    id: 'start',
    phase: 1,
    title: 'The Worst of Both Worlds',
    narrative: `You lead the Federated States of Norden — a developed economy now caught in stagflation. Inflation is at 8%. Growth has turned negative. Unemployment is creeping up. Your citizens are angry: prices are rising while wages stagnate and jobs disappear.

Karl Polanyi warned that treating labor, land, and money as pure market commodities destroys society — and that markets provoke a "double movement" of social protection. Your crisis is partly a conflict over who bears the cost. Adam Tooze has shown that financial crises are political events: the response to 2008 and 2020 was massive state intervention, contradicting free-market ideology. Michael Hudson argues that the FIRE sector (Finance, Insurance, Real Estate) extracts from the productive economy — and that rate hikes mainly squeeze workers, not rentiers.

The central bank wants to hike rates aggressively to tame inflation. Your labor minister warns that will deepen the recession. Your finance minister says fiscal stimulus could fuel more inflation. There are no easy answers.

What is your priority?`,
    choices: [
      {
        id: 'fight_inflation',
        text: 'Prioritize fighting inflation: support aggressive rate hikes',
        consequence: 'You back the central bank. Rates rise sharply.',
        effects: { priceStability: 15, economicStrength: -10, publicSupport: -8 },
        nextNode: 'inflation_fight_path',
      },
      {
        id: 'protect_jobs',
        text: 'Prioritize jobs: resist rate hikes, push for fiscal support',
        consequence: 'You oppose further tightening. You call for targeted relief.',
        effects: { economicStrength: 5, publicSupport: 8, priceStability: -10 },
        nextNode: 'jobs_path',
      },
      {
        id: 'supply_side',
        text: 'Focus on supply: ease bottlenecks, invest in energy and logistics',
        consequence: 'You launch a supply-side initiative.',
        effects: { priceStability: 5, economicStrength: 5, publicSupport: 3 },
        nextNode: 'supply_path',
      },
    ],
  },
  {
    id: 'inflation_fight_path',
    phase: 2,
    title: 'The Volcker Moment',
    narrative: `Rates have risen sharply. Inflation is starting to ease. But the recession has deepened. Unemployment has hit 7%. Your approval ratings have fallen.

Polanyi would see this as the market's expansion crushing labor — and society pushing back. Tooze documented how austerity as crisis response failed in Europe; the real recovery came from political intervention, not market discipline. Hudson would note that rate hikes hit workers first while the financial sector extracts regardless.

The central bank says the pain is necessary — that letting inflation run would be worse. Your critics say you've sacrificed jobs for abstract price stability.

Do you stay the course or ease off?`,
    choices: [
      {
        id: 'stay_course',
        text: 'Stay the course — inflation must be crushed',
        consequence: 'You maintain the hawkish stance.',
        effects: { priceStability: 15, economicStrength: -15, publicSupport: -12 },
        nextNode: 'ending_inflation_crushed',
      },
      {
        id: 'ease_off',
        text: 'Ease off — the recession has gone far enough',
        consequence: 'You signal a pivot. Rates hold rather than rise further.',
        effects: { priceStability: 5, economicStrength: 5, publicSupport: 5 },
        nextNode: 'ending_balanced_stag',
      },
    ],
  },
  {
    id: 'ending_inflation_crushed',
    phase: 3,
    title: 'Inflation Crushed',
    narrative: '',
    choices: [],
    isEnding: true,
    endingType: 'partial_victory',
    endingTitle: 'Price Stability Restored',
    endingNarrative: `You crushed inflation. The recession was deep, but prices are now under control. Growth will return — eventually. You chose stability over short-term comfort.`,
  },
  {
    id: 'ending_balanced_stag',
    phase: 3,
    title: 'Balanced Response',
    narrative: '',
    choices: [],
    isEnding: true,
    endingType: 'victory',
    endingTitle: 'Soft Landing',
    endingNarrative: `You eased off before the recession became a depression. Inflation has moderated. Growth is returning. You found the narrow path between inflation and recession.`,
  },
  {
    id: 'jobs_path',
    phase: 2,
    title: 'The Inflation Gamble',
    narrative: `You resisted rate hikes and pushed for fiscal support. Unemployment has held steady. But inflation has stayed high — and is now embedded in expectations. The central bank has lost credibility.

You've protected jobs in the short run. But the long-run cost may be higher inflation for years.`,
    choices: [
      {
        id: 'end_jobs',
        text: 'Accept the trade-off',
        consequence: '',
        effects: {},
        nextNode: 'ending_jobs_priority',
      },
    ],
  },
  {
    id: 'ending_jobs_priority',
    phase: 3,
    title: 'Jobs First',
    narrative: '',
    choices: [],
    isEnding: true,
    endingType: 'partial_victory',
    endingTitle: 'People Over Prices',
    endingNarrative: `You prioritized jobs over inflation. Unemployment stayed low. But inflation proved stubborn. The central bank will have a harder job ahead. You chose the human cost over the economic one.`,
  },
  {
    id: 'supply_path',
    phase: 2,
    title: 'Supply-Side Bet',
    narrative: `You've invested in energy, logistics, and supply chains. Some bottlenecks have eased. Inflation has moderated without the same rate shock. Growth is slowly returning.

The supply-side approach has worked — partially. You've shown there's more than one tool in the kit.`,
    choices: [
      {
        id: 'end_supply',
        text: 'Continue',
        consequence: '',
        effects: {},
        nextNode: 'ending_supply_success',
      },
    ],
  },
  {
    id: 'ending_supply_success',
    phase: 3,
    title: 'Supply-Side Success',
    narrative: '',
    choices: [],
    isEnding: true,
    endingType: 'victory',
    endingTitle: 'Beyond Demand Management',
    endingNarrative: `You addressed the supply side. By easing bottlenecks and investing in capacity, you reduced inflation without crushing demand. A different kind of soft landing.`,
  },
];

export function getNode(id: string): GenericNarrativeNode | undefined {
  return stagflationNodes.find((n) => n.id === id);
}
