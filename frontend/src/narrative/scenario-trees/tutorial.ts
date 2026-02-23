import type { DecisionBlock, LongFormEnding } from '../long-form-tree';
import { createLongFormTree } from '../long-form-tree';

/**
 * Tutorial — Republic of Calmwater (20 decisions)
 * Thinkers: Polanyi, Piketty
 */
const blocks: DecisionBlock[] = [
  {
    phase: 1,
    title: 'Learning the Basics',
    narrative: `Welcome to the Republic of Calmwater. Polanyi taught that markets need regulation; society fights back through counter-movements. Piketty showed wealth concentrates when r > g. You'll make 20 decisions. Ready?`,
    choices: [
      { id: 'balanced', text: 'Balanced approach', consequence: '', effects: { economicStrength: 5, publicSupport: 5, debtBurden: 0 } },
      { id: 'expansionary', text: 'Stimulate', consequence: '', effects: { economicStrength: 10, publicSupport: 10, debtBurden: 15 } },
      { id: 'conservative', text: 'Be conservative', consequence: '', effects: { economicStrength: -3, publicSupport: -5, debtBurden: -15 } },
    ],
  },
  { phase: 1, title: 'Tax Policy', narrative: `Do you raise, lower, or hold taxes?`, choices: [{ id: 'raise', text: 'Raise taxes', consequence: '', effects: { debtBurden: -8, publicSupport: -5 } }, { id: 'lower', text: 'Lower taxes', consequence: '', effects: { economicStrength: 5, debtBurden: 8 } }, { id: 'hold', text: 'Hold', consequence: '', effects: {} }] },
  { phase: 1, title: 'Spending', narrative: `Do you increase, cut, or hold spending?`, choices: [{ id: 'increase', text: 'Increase spending', consequence: '', effects: { economicStrength: 8, publicSupport: 8, debtBurden: 10 } }, { id: 'cut', text: 'Cut spending', consequence: '', effects: { debtBurden: -10, publicSupport: -8 } }, { id: 'hold', text: 'Hold', consequence: '', effects: {} }] },
  { phase: 1, title: 'Regulation', narrative: `Polanyi warns of commodification. Do you strengthen labor protections?`, choices: [{ id: 'yes', text: 'Strengthen protections', consequence: '', effects: { publicSupport: 10, economicStrength: -2 } }, { id: 'no', text: 'Keep current rules', consequence: '', effects: { economicStrength: 3 } }] },
  { phase: 2, title: 'Inequality', narrative: `Piketty says r > g concentrates wealth. Do you propose redistribution?`, choices: [{ id: 'yes', text: 'Propose redistribution', consequence: '', effects: { publicSupport: 12, debtBurden: -5 } }, { id: 'no', text: 'No redistribution', consequence: '', effects: { economicStrength: 5 } }] },
  { phase: 2, title: 'Infrastructure', narrative: `Do you invest in infrastructure?`, choices: [{ id: 'major', text: 'Major investment', consequence: '', effects: { economicStrength: 12, debtBurden: 10 } }, { id: 'modest', text: 'Modest investment', consequence: '', effects: { economicStrength: 6, debtBurden: 4 } }] },
  { phase: 2, title: 'Trade', narrative: `Do you open trade further or protect domestic industry?`, choices: [{ id: 'open', text: 'Open further', consequence: '', effects: { economicStrength: 8 } }, { id: 'protect', text: 'Protect industry', consequence: '', effects: { publicSupport: 5, economicStrength: 3 } }] },
  { phase: 2, title: 'Education', narrative: `Do you increase education spending?`, choices: [{ id: 'yes', text: 'Increase', consequence: '', effects: { economicStrength: 8, publicSupport: 8, debtBurden: 5 } }, { id: 'no', text: 'Hold', consequence: '', effects: {} }] },
  { phase: 3, title: 'Budget Balance', narrative: `The deficit is growing. Do you prioritize balance or growth?`, choices: [{ id: 'balance', text: 'Prioritize balance', consequence: '', effects: { debtBurden: -10, economicStrength: -5 } }, { id: 'growth', text: 'Prioritize growth', consequence: '', effects: { economicStrength: 10, debtBurden: 8 } }] },
  { phase: 3, title: 'Social Spending', narrative: `Polanyi's counter-movement: do you expand welfare?`, choices: [{ id: 'expand', text: 'Expand welfare', consequence: '', effects: { publicSupport: 15, debtBurden: 8 } }, { id: 'hold', text: 'Hold', consequence: '', effects: {} }] },
  { phase: 3, title: 'Interest Rates', narrative: `Inflation is rising. Do you support rate hikes?`, choices: [{ id: 'yes', text: 'Support hikes', consequence: '', effects: { priceStability: 10, economicStrength: -5 } }, { id: 'no', text: 'Resist', consequence: '', effects: { economicStrength: 5, priceStability: -5 } }] },
  { phase: 3, title: 'Minimum Wage', narrative: `Do you raise the minimum wage?`, choices: [{ id: 'yes', text: 'Raise it', consequence: '', effects: { publicSupport: 12, economicStrength: 2 } }, { id: 'no', text: 'Hold', consequence: '', effects: {} }] },
  { phase: 4, title: 'Mid-Term', narrative: `Your policies have had time to work. Do you adjust or stay the course?`, choices: [{ id: 'adjust', text: 'Adjust', consequence: '', effects: { economicStrength: 5, publicSupport: 5 } }, { id: 'stay', text: 'Stay the course', consequence: '', effects: {} }] },
  { phase: 4, title: 'Green Investment', narrative: `Do you invest in green transition?`, choices: [{ id: 'yes', text: 'Invest', consequence: '', effects: { economicStrength: 8, debtBurden: 8 } }, { id: 'no', text: 'No', consequence: '', effects: { debtBurden: -5 } }] },
  { phase: 4, title: 'Housing', narrative: `Do you support social housing?`, choices: [{ id: 'yes', text: 'Support', consequence: '', effects: { publicSupport: 10, debtBurden: 5 } }, { id: 'no', text: 'No', consequence: '', effects: {} }] },
  { phase: 4, title: 'Financial Regulation', narrative: `Do you tighten financial regulation?`, choices: [{ id: 'yes', text: 'Tighten', consequence: '', effects: { economicStrength: 2, publicSupport: 5 } }, { id: 'no', text: 'No', consequence: '', effects: { economicStrength: 5 } }] },
  { phase: 5, title: 'Year Two', narrative: `Do you continue or reverse your approach?`, choices: [{ id: 'continue', text: 'Continue', consequence: '', effects: { economicStrength: 5, publicSupport: 5 } }, { id: 'reverse', text: 'Reverse', consequence: '', effects: { debtBurden: -5 } }] },
  { phase: 5, title: 'Final Stimulus', narrative: `Growth is slowing. Do you add stimulus?`, choices: [{ id: 'yes', text: 'Add stimulus', consequence: '', effects: { economicStrength: 10, debtBurden: 10 } }, { id: 'no', text: 'No', consequence: '', effects: { debtBurden: -5 } }] },
  { phase: 5, title: 'Legacy', narrative: `What kind of economy do you leave?`, choices: [{ id: 'redistributive', text: 'More redistributive', consequence: '', effects: { publicSupport: 10 } }, { id: 'growth', text: 'Growth-oriented', consequence: '', effects: { economicStrength: 10 } }] },
  { phase: 5, title: 'Final Decision', narrative: `Your last decision. Ready for policy mode?`, choices: [{ id: 'balanced', text: 'A balanced economy', consequence: '', effects: { economicStrength: 5, publicSupport: 5, debtBurden: 0 } }, { id: 'growth', text: 'A growing economy', consequence: '', effects: { economicStrength: 10, debtBurden: 5 } }, { id: 'prudent', text: 'A prudent economy', consequence: '', effects: { debtBurden: -10, economicStrength: 2 } }] },
];

const endings: LongFormEnding[] = [
  { id: 'victory', endingType: 'victory', title: 'Well Balanced', endingNarrative: `You learned the trade-offs. Try policy mode to explore the simulation in more depth.` },
  { id: 'partial', endingType: 'partial_victory', title: 'Mixed Results', endingNarrative: `You made progress. Switch to policy mode to experiment further.` },
  { id: 'defeat', endingType: 'defeat', title: 'Learning Experience', endingNarrative: `You saw the trade-offs. Try again or switch to policy mode.` },
];

const { getNode } = createLongFormTree(blocks, endings, (i) => (i === 0 ? 0 : i === 1 ? 1 : 2));
export { getNode };
