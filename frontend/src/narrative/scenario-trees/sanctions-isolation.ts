import type { DecisionBlock, LongFormEnding } from '../long-form-tree';
import { createLongFormTree } from '../long-form-tree';

/**
 * Under Sanctions — Republic of Persea (20 decisions)
 * Thinkers: Lenin, Bukharin, Kadri, Desai
 */
const blocks: DecisionBlock[] = [
  {
    phase: 1,
    title: 'Under Sanctions',
    narrative: `You lead the Republic of Persea. Lenin and Bukharin understood imperialism as a system; sanctions are discipline. Kadri documents how sanctions deindustrialize. Desai argues the multipolar world offers alternatives. What do you do first?`,
    choices: [
      { id: 'alternative', text: 'Pivot to alternative partners', consequence: '', effects: { economicStrength: 8, sovereignty: 5, internationalStanding: -5 } },
      { id: 'self_reliance', text: 'Build self-reliance', consequence: '', effects: { sovereignty: 15, economicStrength: 5, publicSupport: 8 } },
      { id: 'negotiate', text: 'Pursue negotiations', consequence: '', effects: { internationalStanding: 5, publicSupport: 3, sovereignty: -5 } },
    ],
  },
  { phase: 1, title: 'Payment Systems', narrative: `Do you build alternative payment systems to bypass sanctions?`, choices: [{ id: 'yes', text: 'Build alternatives', consequence: '', effects: { sovereignty: 12, economicStrength: 5 } }, { id: 'no', text: 'No', consequence: '', effects: {} }] },
  { phase: 1, title: 'Import Substitution', narrative: `Bukharin's transition economics: do you push import substitution?`, choices: [{ id: 'yes', text: 'Push substitution', consequence: '', effects: { sovereignty: 15, economicStrength: 8 } }, { id: 'no', text: 'No', consequence: '', effects: {} }] },
  { phase: 1, title: 'Secondary Sanctions', narrative: `Partners fear secondary sanctions. Do you deepen ties with a few or diversify widely?`, choices: [{ id: 'deepen', text: 'Deepen with few', consequence: '', effects: { economicStrength: 10, sovereignty: 8 } }, { id: 'diversify', text: 'Diversify widely', consequence: '', effects: { economicStrength: 6, sovereignty: 5 } }] },
  { phase: 2, title: 'Kadri\'s Warning', narrative: `Kadri: sanctions destroy productive capacity. Do you protect strategic industries?`, choices: [{ id: 'yes', text: 'Protect strategic industries', consequence: '', effects: { sovereignty: 12, economicStrength: 8 } }, { id: 'no', text: 'No', consequence: '', effects: {} }] },
  { phase: 2, title: 'Rationing', narrative: `Bukharin: transition requires managing scarcity. Do you introduce rationing for essentials?`, choices: [{ id: 'yes', text: 'Introduce rationing', consequence: '', effects: { publicSupport: 5, economicStrength: 2 } }, { id: 'no', text: 'No', consequence: '', effects: { publicSupport: -5 } }] },
  { phase: 2, title: 'Desai\'s Multipolarity', narrative: `Desai: South-South cooperation reduces dependence. Do you prioritize it?`, choices: [{ id: 'yes', text: 'Prioritize South-South', consequence: '', effects: { sovereignty: 10, economicStrength: 6 } }, { id: 'no', text: 'No', consequence: '', effects: {} }] },
  { phase: 2, title: 'Domestic Production', narrative: `Do you invest heavily in domestic production of sanctioned goods?`, choices: [{ id: 'yes', text: 'Invest heavily', consequence: '', effects: { sovereignty: 15, economicStrength: 10, debtBurden: 10 } }, { id: 'modest', text: 'Modest investment', consequence: '', effects: { economicStrength: 5 } }] },
  { phase: 3, title: 'Capital Controls', narrative: `Do you impose strict capital controls?`, choices: [{ id: 'yes', text: 'Impose strict controls', consequence: '', effects: { sovereignty: 12 } }, { id: 'no', text: 'No', consequence: '', effects: { economicStrength: 3 } }] },
  { phase: 3, title: 'Barter Trade', narrative: `Do you pursue barter and non-dollar trade?`, choices: [{ id: 'yes', text: 'Pursue barter', consequence: '', effects: { sovereignty: 10, economicStrength: 5 } }, { id: 'no', text: 'No', consequence: '', effects: {} }] },
  { phase: 3, title: 'Negotiations', narrative: `Do you offer concessions to ease sanctions?`, choices: [{ id: 'yes', text: 'Offer concessions', consequence: '', effects: { internationalStanding: 10, sovereignty: -12 } }, { id: 'no', text: 'Hold firm', consequence: '', effects: { sovereignty: 10 } }] },
  { phase: 3, title: 'Smuggling', narrative: `Informal channels have emerged. Do you tolerate or crack down?`, choices: [{ id: 'tolerate', text: 'Tolerate', consequence: '', effects: { economicStrength: 8, publicSupport: 5 } }, { id: 'crack', text: 'Crack down', consequence: '', effects: { sovereignty: 5 } }] },
  { phase: 4, title: 'Mid-Term', narrative: `You've adapted. Do you deepen self-reliance or seek a deal?`, choices: [{ id: 'deepen', text: 'Deepen self-reliance', consequence: '', effects: { sovereignty: 15, economicStrength: 8 } }, { id: 'deal', text: 'Seek a deal', consequence: '', effects: { internationalStanding: 8, sovereignty: -8 } }] },
  { phase: 4, title: 'Technology', narrative: `Do you invest in domestic R&D to replace sanctioned tech?`, choices: [{ id: 'yes', text: 'Invest in R&D', consequence: '', effects: { sovereignty: 12, economicStrength: 8 } }, { id: 'no', text: 'No', consequence: '', effects: {} }] },
  { phase: 4, title: 'Regional Bloc', narrative: `Do you form a regional bloc with other sanctioned states?`, choices: [{ id: 'yes', text: 'Form bloc', consequence: '', effects: { sovereignty: 12, economicStrength: 6 } }, { id: 'no', text: 'No', consequence: '', effects: {} }] },
  { phase: 4, title: 'Humanitarian Exceptions', narrative: `Do you lobby for humanitarian exceptions?`, choices: [{ id: 'yes', text: 'Lobby', consequence: '', effects: { publicSupport: 8, internationalStanding: 3 } }, { id: 'no', text: 'No', consequence: '', effects: {} }] },
  { phase: 5, title: 'Year Two', narrative: `The economy has adapted. Do you consolidate or push for more?`, choices: [{ id: 'consolidate', text: 'Consolidate', consequence: '', effects: {} }, { id: 'push', text: 'Push for more', consequence: '', effects: { sovereignty: 10, economicStrength: 8 } }] },
  { phase: 5, title: 'Legacy', narrative: `What model do you leave for Persea?`, choices: [{ id: 'sovereign', text: 'Sovereign economy', consequence: '', effects: { sovereignty: 15 } }, { id: 'integrated', text: 'Reintegration path', consequence: '', effects: { internationalStanding: 10 } }] },
  { phase: 5, title: 'Final Push', narrative: `Do you seek one more round of negotiations?`, choices: [{ id: 'yes', text: 'Seek negotiations', consequence: '', effects: { internationalStanding: 8 } }, { id: 'no', text: 'No', consequence: '', effects: { sovereignty: 8 } }] },
  { phase: 5, title: 'Final Decision', narrative: `Your last decision for Persea.`, choices: [{ id: 'sovereign', text: 'Sovereign path', consequence: '', effects: { sovereignty: 12, economicStrength: 6 } }, { id: 'negotiated', text: 'Negotiated path', consequence: '', effects: { internationalStanding: 10 } }, { id: 'mixed', text: 'Mixed path', consequence: '', effects: { sovereignty: 8, economicStrength: 6 } }] },
];

const endings: LongFormEnding[] = [
  { id: 'victory', endingType: 'victory', title: 'Sovereign Under Pressure', endingNarrative: `You built self-reliance under sanctions. Persea has found new paths and new partners.` },
  { id: 'partial', endingType: 'partial_victory', title: 'Adapted', endingNarrative: `You adapted. The economy has found ways to function. The path ahead remains difficult.` },
  { id: 'defeat', endingType: 'defeat', title: 'Isolation Deepens', endingNarrative: `Sanctions have taken their toll. The economy has contracted. The struggle continues.` },
];

const { getNode } = createLongFormTree(blocks, endings, (i) => (i === 0 ? 0 : i === 1 ? 1 : 2));
export { getNode };
