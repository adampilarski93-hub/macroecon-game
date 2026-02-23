import type { DecisionBlock, LongFormEnding } from '../long-form-tree';
import { createLongFormTree } from '../long-form-tree';

/**
 * Independence & Underdevelopment — Republic of Uhuru (20 decisions)
 * Thinkers: Amin, Emmanuel, Marini, Ajl, Kadri
 */
const blocks: DecisionBlock[] = [
  {
    phase: 1,
    title: 'Independence & Underdevelopment',
    narrative: `Your country, the Republic of Uhuru, has just won independence. Amin argued peripheral countries must "delink" to develop. Emmanuel showed free trade transfers value North. Marini described super-exploitation. Ajl advocates food sovereignty. What do you do first?`,
    choices: [
      { id: 'state', text: 'State-led industrialisation', consequence: '', effects: { economicStrength: 12, sovereignty: 10, debtBurden: 15 } },
      { id: 'mixed', text: 'Mixed economy', consequence: '', effects: { economicStrength: 8, publicSupport: 8, debtBurden: 8 } },
      { id: 'market', text: 'Market-led growth', consequence: '', effects: { economicStrength: 10, sovereignty: -10, publicSupport: -5 } },
    ],
  },
  { phase: 1, title: 'Land Reform', narrative: `Ajl and the Patnaiks emphasize land. Do you launch agrarian reform?`, choices: [{ id: 'yes', text: 'Launch land reform', consequence: '', effects: { sovereignty: 10, publicSupport: 12, economicStrength: 5 } }, { id: 'no', text: 'Defer', consequence: '', effects: { economicStrength: 3 } }] },
  { phase: 1, title: 'Trade Policy', narrative: `Emmanuel's unequal exchange: do you raise tariffs to protect industry?`, choices: [{ id: 'yes', text: 'Raise tariffs', consequence: '', effects: { sovereignty: 8, economicStrength: 5 } }, { id: 'no', text: 'Stay open', consequence: '', effects: { economicStrength: 8, sovereignty: -8 } }] },
  { phase: 1, title: 'Foreign Investment', narrative: `Do you welcome foreign capital or restrict it?`, choices: [{ id: 'welcome', text: 'Welcome it', consequence: '', effects: { economicStrength: 12, sovereignty: -12 } }, { id: 'restrict', text: 'Restrict it', consequence: '', effects: { sovereignty: 12, economicStrength: 2 } }] },
  { phase: 2, title: 'Food Sovereignty', narrative: `Ajl says no country develops without feeding itself. Do you invest in agriculture?`, choices: [{ id: 'major', text: 'Major agricultural investment', consequence: '', effects: { economicStrength: 8, sovereignty: 10, publicSupport: 10 } }, { id: 'modest', text: 'Modest investment', consequence: '', effects: { economicStrength: 4 } }] },
  { phase: 2, title: 'Wages', narrative: `Marini's super-exploitation: low wages boost exports but destroy demand. Do you raise minimum wages?`, choices: [{ id: 'yes', text: 'Raise minimum wages', consequence: '', effects: { publicSupport: 15, economicStrength: 5 } }, { id: 'no', text: 'Keep wages low', consequence: '', effects: { economicStrength: 10, publicSupport: -10 } }] },
  { phase: 2, title: 'IMF Approach', narrative: `The IMF has offered a program. Kadri documents how conditionality dismantles states. Do you engage?`, choices: [{ id: 'engage', text: 'Engage with IMF', consequence: '', effects: { debtBurden: -10, sovereignty: -15 } }, { id: 'refuse', text: 'Refuse', consequence: '', effects: { sovereignty: 15, debtBurden: 5 } }] },
  { phase: 2, title: 'State Enterprises', narrative: `Do you expand state-owned enterprises?`, choices: [{ id: 'expand', text: 'Expand SOEs', consequence: '', effects: { economicStrength: 10, sovereignty: 12, debtBurden: 8 } }, { id: 'private', text: 'Rely on private sector', consequence: '', effects: { economicStrength: 8, sovereignty: -5 } }] },
  { phase: 3, title: 'Delinking', narrative: `Amin's delinking: do you subordinate external relations to internal development?`, choices: [{ id: 'yes', text: 'Pursue delinking', consequence: '', effects: { sovereignty: 15, economicStrength: 3 } }, { id: 'no', text: 'Stay integrated', consequence: '', effects: { economicStrength: 10, sovereignty: -10 } }] },
  { phase: 3, title: 'Education', narrative: `Do you invest heavily in education?`, choices: [{ id: 'yes', text: 'Major education push', consequence: '', effects: { humanDevelopment: 15, debtBurden: 8 } }, { id: 'modest', text: 'Modest increase', consequence: '', effects: { humanDevelopment: 5 } }] },
  { phase: 3, title: 'Resource Nationalization', narrative: `Do you nationalize key resources?`, choices: [{ id: 'yes', text: 'Nationalize', consequence: '', effects: { sovereignty: 15, economicStrength: 8, internationalStanding: -10 } }, { id: 'no', text: 'No', consequence: '', effects: { economicStrength: 5 } }] },
  { phase: 3, title: 'South-South Cooperation', narrative: `Do you prioritize trade with other developing countries?`, choices: [{ id: 'yes', text: 'Prioritize South-South', consequence: '', effects: { sovereignty: 10, economicStrength: 5 } }, { id: 'no', text: 'Focus on North', consequence: '', effects: { economicStrength: 8, sovereignty: -8 } }] },
  { phase: 4, title: 'Mid-Term', narrative: `Industry is growing but unevenly. Do you double down or diversify?`, choices: [{ id: 'double', text: 'Double down', consequence: '', effects: { economicStrength: 12 } }, { id: 'diversify', text: 'Diversify', consequence: '', effects: { economicStrength: 8, sovereignty: 5 } }] },
  { phase: 4, title: 'Comprador Elite', narrative: `Amin's comprador bourgeoisie is resisting. Do you confront them?`, choices: [{ id: 'yes', text: 'Confront', consequence: '', effects: { sovereignty: 12, publicSupport: 10 } }, { id: 'no', text: 'Accommodate', consequence: '', effects: { economicStrength: 5 } }] },
  { phase: 4, title: 'Debt Service', narrative: `Debt service is rising. Do you seek restructuring or pay in full?`, choices: [{ id: 'restructure', text: 'Seek restructuring', consequence: '', effects: { debtBurden: -15, internationalStanding: -8 } }, { id: 'pay', text: 'Pay in full', consequence: '', effects: { debtBurden: -5, internationalStanding: 5 } }] },
  { phase: 4, title: 'Industrial Policy', narrative: `Do you target specific industries or let the market decide?`, choices: [{ id: 'target', text: 'Target industries', consequence: '', effects: { economicStrength: 12, sovereignty: 8 } }, { id: 'market', text: 'Let market decide', consequence: '', effects: { economicStrength: 6 } }] },
  { phase: 5, title: 'Year Two', narrative: `Progress is visible. Do you accelerate or consolidate?`, choices: [{ id: 'accelerate', text: 'Accelerate', consequence: '', effects: { economicStrength: 10, debtBurden: 8 } }, { id: 'consolidate', text: 'Consolidate', consequence: '', effects: { debtBurden: -8 } }] },
  { phase: 5, title: 'Multilateral Institutions', narrative: `Do you join regional development banks as an alternative to the IMF?`, choices: [{ id: 'yes', text: 'Join regional banks', consequence: '', effects: { sovereignty: 10 } }, { id: 'no', text: 'No', consequence: '', effects: {} }] },
  { phase: 5, title: 'Legacy', narrative: `What development model do you leave?`, choices: [{ id: 'sovereign', text: 'Sovereign development', consequence: '', effects: { sovereignty: 15 } }, { id: 'integrated', text: 'Integrated development', consequence: '', effects: { economicStrength: 10 } }] },
  { phase: 5, title: 'Final Decision', narrative: `Your last decision for Uhuru.`, choices: [{ id: 'state', text: 'State-led legacy', consequence: '', effects: { sovereignty: 10, economicStrength: 8 } }, { id: 'mixed', text: 'Mixed legacy', consequence: '', effects: { economicStrength: 8, publicSupport: 8 } }, { id: 'market', text: 'Market legacy', consequence: '', effects: { economicStrength: 10, sovereignty: -10 } }] },
];

const endings: LongFormEnding[] = [
  { id: 'victory', endingType: 'victory', title: 'Sovereign Development', endingNarrative: `You built industry through state action and delinking. Uhuru is on a sovereign path.` },
  { id: 'partial', endingType: 'partial_victory', title: 'Mixed Development', endingNarrative: `You found a balance between state and market. Progress is real but uneven.` },
  { id: 'defeat', endingType: 'defeat', title: 'Dependent Development', endingNarrative: `Growth came but sovereignty was traded. The struggle for genuine development continues.` },
];

const { getNode } = createLongFormTree(blocks, endings, (i) => (i === 0 ? 0 : i === 1 ? 1 : 2));
export { getNode };
