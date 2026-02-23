import type { DecisionBlock, LongFormEnding } from '../long-form-tree';
import { createLongFormTree } from '../long-form-tree';

/**
 * Commodity Shock — Republic of Kemet (20 decisions)
 * Thinkers: Amin, Emmanuel, Kadri, Ajl
 */
const blocks: DecisionBlock[] = [
  {
    phase: 1,
    title: 'Commodity Shock & Development Squeeze',
    narrative: `You lead the Republic of Kemet. Emmanuel's unequal exchange explains why exports don't generate expected wealth. Amin showed trade transfers value to the center. Kadri argues the "resource curse" is designed extraction. Ajl emphasizes food sovereignty. What do you do first?`,
    choices: [
      { id: 'fx', text: 'Intervene in currency', consequence: '', effects: { priceStability: 10, externalBalance: -15, debtBurden: 5 } },
      { id: 'subsidies', text: 'Subsidize food and fuel', consequence: '', effects: { publicSupport: 12, debtBurden: 15, priceStability: 5 } },
      { id: 'diversify', text: 'Accelerate diversification', consequence: '', effects: { economicStrength: 5, externalBalance: 8, publicSupport: -8 } },
    ],
  },
  { phase: 1, title: 'Reserves', narrative: `Reserves are falling. Do you seek an IMF swap line or impose capital controls?`, choices: [{ id: 'imf', text: 'Seek IMF swap', consequence: '', effects: { externalBalance: 5, sovereignty: -10 } }, { id: 'controls', text: 'Impose capital controls', consequence: '', effects: { sovereignty: 8, externalBalance: 5 } }] },
  { phase: 1, title: 'Food Imports', narrative: `Ajl says food sovereignty matters. Do you subsidize food imports or invest in domestic production?`, choices: [{ id: 'subsidize', text: 'Subsidize imports', consequence: '', effects: { publicSupport: 10, debtBurden: 10 } }, { id: 'domestic', text: 'Invest in domestic production', consequence: '', effects: { sovereignty: 10, economicStrength: 8 } }] },
  { phase: 1, title: 'Export Taxes', narrative: `Do you tax commodity exports to capture more value?`, choices: [{ id: 'yes', text: 'Tax exports', consequence: '', effects: { sovereignty: 8, economicStrength: 3 } }, { id: 'no', text: 'No', consequence: '', effects: { economicStrength: 5 } }] },
  { phase: 2, title: 'Terms of Trade', narrative: `Emmanuel: terms of trade are stacked against you. Do you seek regional trade blocs?`, choices: [{ id: 'yes', text: 'Seek regional blocs', consequence: '', effects: { sovereignty: 8, externalBalance: 5 } }, { id: 'no', text: 'No', consequence: '', effects: {} }] },
  { phase: 2, title: 'Diversification', narrative: `Do you invest in manufacturing or stay commodity-focused?`, choices: [{ id: 'manufacturing', text: 'Invest in manufacturing', consequence: '', effects: { economicStrength: 10, debtBurden: 8 } }, { id: 'commodity', text: 'Stay commodity-focused', consequence: '', effects: { economicStrength: 5 } }] },
  { phase: 2, title: 'Currency', narrative: `Do you devalue to boost exports or defend the rate?`, choices: [{ id: 'devalue', text: 'Devalue', consequence: '', effects: { economicStrength: 10, priceStability: -10 } }, { id: 'defend', text: 'Defend', consequence: '', effects: { priceStability: 8, externalBalance: -10 } }] },
  { phase: 2, title: 'Subsidy Bill', narrative: `Subsidies are costly. Do you target them or broaden?`, choices: [{ id: 'target', text: 'Target subsidies', consequence: '', effects: { debtBurden: -5, publicSupport: -3 } }, { id: 'broaden', text: 'Broaden', consequence: '', effects: { publicSupport: 10, debtBurden: 10 } }] },
  { phase: 3, title: 'Kadri\'s Warning', narrative: `Kadri says resource wealth flows out by design. Do you impose profit-sharing on extractives?`, choices: [{ id: 'yes', text: 'Impose profit-sharing', consequence: '', effects: { sovereignty: 12, economicStrength: 5 } }, { id: 'no', text: 'No', consequence: '', effects: { economicStrength: 8 } }] },
  { phase: 3, title: 'Import Substitution', narrative: `Do you push import substitution for key goods?`, choices: [{ id: 'yes', text: 'Push substitution', consequence: '', effects: { sovereignty: 10, economicStrength: 8 } }, { id: 'no', text: 'No', consequence: '', effects: {} }] },
  { phase: 3, title: 'Debt', narrative: `Debt service is rising. Do you seek restructuring?`, choices: [{ id: 'yes', text: 'Seek restructuring', consequence: '', effects: { debtBurden: -15, sovereignty: 5 } }, { id: 'no', text: 'Pay in full', consequence: '', effects: { debtBurden: -5 } }] },
  { phase: 3, title: 'Regional Cooperation', narrative: `Do you build South-South payment systems?`, choices: [{ id: 'yes', text: 'Build alternatives', consequence: '', effects: { sovereignty: 12 } }, { id: 'no', text: 'No', consequence: '', effects: {} }] },
  { phase: 4, title: 'Mid-Term', narrative: `Diversification is underway. Do you accelerate or consolidate?`, choices: [{ id: 'accelerate', text: 'Accelerate', consequence: '', effects: { economicStrength: 12, debtBurden: 8 } }, { id: 'consolidate', text: 'Consolidate', consequence: '', effects: { debtBurden: -8 } }] },
  { phase: 4, title: 'Commodity Revenue', narrative: `Prices have recovered. Do you save or spend the windfall?`, choices: [{ id: 'save', text: 'Save', consequence: '', effects: { externalBalance: 15, debtBurden: -10 } }, { id: 'spend', text: 'Spend on development', consequence: '', effects: { economicStrength: 12, publicSupport: 10 } }] },
  { phase: 4, title: 'Food Sovereignty', narrative: `Do you prioritize food self-sufficiency?`, choices: [{ id: 'yes', text: 'Prioritize', consequence: '', effects: { sovereignty: 10, publicSupport: 10 } }, { id: 'no', text: 'No', consequence: '', effects: {} }] },
  { phase: 4, title: 'Value Addition', narrative: `Do you require local processing of commodities before export?`, choices: [{ id: 'yes', text: 'Require processing', consequence: '', effects: { economicStrength: 10, sovereignty: 8 } }, { id: 'no', text: 'No', consequence: '', effects: {} }] },
  { phase: 5, title: 'Year Two', narrative: `Progress is visible. Do you deepen reforms or ease?`, choices: [{ id: 'deepen', text: 'Deepen', consequence: '', effects: { sovereignty: 10 } }, { id: 'ease', text: 'Ease', consequence: '', effects: { economicStrength: 5 } }] },
  { phase: 5, title: 'IMF Relations', narrative: `Do you engage with the IMF for a program or stay independent?`, choices: [{ id: 'engage', text: 'Engage', consequence: '', effects: { debtBurden: -10, sovereignty: -10 } }, { id: 'independent', text: 'Stay independent', consequence: '', effects: { sovereignty: 10 } }] },
  { phase: 5, title: 'Legacy', narrative: `What model do you leave for Kemet?`, choices: [{ id: 'sovereign', text: 'Sovereign commodity management', consequence: '', effects: { sovereignty: 12 } }, { id: 'diversified', text: 'Diversified economy', consequence: '', effects: { economicStrength: 10 } }] },
  { phase: 5, title: 'Final Decision', narrative: `Your last decision for Kemet.`, choices: [{ id: 'sovereign', text: 'Sovereign path', consequence: '', effects: { sovereignty: 10, economicStrength: 5 } }, { id: 'diversified', text: 'Diversified path', consequence: '', effects: { economicStrength: 10 } }, { id: 'mixed', text: 'Mixed path', consequence: '', effects: { economicStrength: 6, sovereignty: 6 } }] },
];

const endings: LongFormEnding[] = [
  { id: 'victory', endingType: 'victory', title: 'Breaking the Commodity Trap', endingNarrative: `You diversified and built sovereignty. Kemet is less dependent on volatile world markets.` },
  { id: 'partial', endingType: 'partial_victory', title: 'Partial Success', endingNarrative: `You made progress. Some dependence remains. The transition continues.` },
  { id: 'defeat', endingType: 'defeat', title: 'Commodity Trap', endingNarrative: `The trap holds. Volatility and dependence persist. The struggle continues.` },
];

const { getNode } = createLongFormTree(blocks, endings, (i) => (i === 0 ? 0 : i === 1 ? 1 : 2));
export { getNode };
