import type { DecisionBlock, LongFormEnding } from '../long-form-tree';
import { createLongFormTree } from '../long-form-tree';

/**
 * Plurinational Path — Newly-elected leader of a South American country (20 decisions)
 * Informed by: Prashad, Mariátegui, Allende, Castro, Bolivia MAS, Prebisch, Sandino, Blanco,
 * Merino, Green Rioja, Vacarezza. See .cursor/skills/plurinational-path-thinkers/SKILL.md
 */
const blocks: DecisionBlock[] = [
  {
    phase: 1,
    title: 'The Inauguration',
    narrative: `You have just been sworn in as president of the Republic of Altura, a South American nation of 12 million. Your country has gas, lithium, and copper — but decades of structural adjustment left the economy dependent on raw exports. As Vijay Prashad documents in Washington Bullets, nations that chart their own course must balance pressure from sanctions, coups, and "reforms" that restore the old order. Your coalition includes labor unions, Indigenous movements, and urban poor. The World Bank has offered a "development loan" with conditions. What do you do first?`,
    choices: [
      { id: 'reject_wb', text: 'Reject the World Bank package', consequence: 'You refuse the conditions.', effects: { sovereignty: 15, debtBurden: -10, economicStrength: -5 } },
      { id: 'negotiate', text: 'Negotiate with the World Bank', consequence: 'You seek better terms.', effects: { sovereignty: -5, debtBurden: 5, economicStrength: 3 } },
      { id: 'alternatives', text: 'Seek alternative financing', consequence: 'You look south and east.', effects: { sovereignty: 10, economicStrength: 2 } },
    ],
  },
  {
    phase: 1,
    title: 'Indigenous Nations',
    narrative: `Your country is plurinational — dozens of Indigenous nations with territorial claims, languages, and demands for autonomy. Mariátegui argued that the "Indian problem" is not humanitarian but economic: land and power. As Bolivia's MAS showed, constitutional recognition alone is not enough. Roger Merino writes that Indigenous peoples must be recognised as nations with territorial rights, not ethnic minorities. The gas fields overlap Indigenous territory. Do you prioritise revenue from extraction to fund social programs, or slow extraction and strengthen Indigenous territorial rights?`,
    choices: [
      { id: 'extract', text: 'Prioritise extraction revenue', consequence: 'You accelerate development.', effects: { economicStrength: 12, plurinationalUnity: -15, publicSupport: -5 } },
      { id: 'rights', text: 'Strengthen Indigenous territorial rights', consequence: 'You slow and consult.', effects: { plurinationalUnity: 18, economicStrength: -8, publicSupport: 8 } },
      { id: 'shared', text: 'Negotiate shared governance of resources', consequence: 'You seek a middle path.', effects: { plurinationalUnity: 10, economicStrength: 2, publicSupport: 5 } },
    ],
  },
  {
    phase: 1,
    title: 'The Labor Question',
    narrative: `The unions that helped elect you want wage increases and job protection. The formal sector is small; most workers are informal. Critics say higher wages will scare off investment. But as Prashad and others argue, the worker-peasant alliance has been the backbone of progressive change in Latin America. Do you raise the minimum wage and strengthen collective bargaining, or hold back to attract capital?`,
    choices: [
      { id: 'raise', text: 'Raise wages and strengthen unions', consequence: 'You side with labor.', effects: { laborUnity: 15, publicSupport: 12, economicStrength: -5 } },
      { id: 'hold', text: 'Hold wages to attract investment', consequence: 'You prioritise growth.', effects: { economicStrength: 8, laborUnity: -12, publicSupport: -10 } },
      { id: 'gradual', text: 'Gradual increases with sectoral deals', consequence: 'You negotiate.', effects: { laborUnity: 5, publicSupport: 5, economicStrength: 2 } },
    ],
  },
  {
    phase: 1,
    title: 'The First Warning',
    narrative: `A cable from your ambassador in Washington: U.S. officials are "concerned" about your policies. Sandino called to abolish the Monroe Doctrine; Prashad's Washington Bullets traces how such "concern" has preceded coups from Chile in 1973 to Bolivia in 2019. Your intelligence chief reports increased activity around opposition figures and media. Do you publicly denounce foreign interference, work quietly to build alliances, or avoid confrontation?`,
    choices: [
      { id: 'denounce', text: 'Denounce foreign interference publicly', consequence: 'You speak out.', effects: { sovereignty: 12, publicSupport: 10, internationalStanding: -8 } },
      { id: 'quiet', text: 'Build alliances quietly', consequence: 'You work behind the scenes.', effects: { sovereignty: 5, internationalStanding: 3 } },
      { id: 'avoid', text: 'Avoid confrontation', consequence: 'You stay silent.', effects: { internationalStanding: 5, sovereignty: -10 } },
    ],
  },
  {
    phase: 2,
    title: 'Resource Nationalism',
    narrative: `The gas and lithium sectors are dominated by foreign firms. Nationalising them would fund your programs but invite retaliation — as Venezuela learned, sanctions can strangle an oil-dependent economy. Chile under Allende nationalised copper; the coup followed. Do you nationalise key sectors, renegotiate contracts for higher royalties, or leave the structure intact?`,
    choices: [
      { id: 'nationalise', text: 'Nationalise key extractive sectors', consequence: 'You take control.', effects: { sovereignty: 20, economicStrength: 5, internationalStanding: -15 }, nextBlock: 5 },
      { id: 'renegotiate', text: 'Renegotiate for higher royalties', consequence: 'You seek a compromise.', effects: { sovereignty: 8, economicStrength: 5, publicSupport: 5 }, nextBlock: 6 },
      { id: 'intact', text: 'Leave the structure intact', consequence: 'You avoid the fight.', effects: { economicStrength: 3, sovereignty: -10 }, nextBlock: 7 },
    ],
  },
  {
    phase: 2,
    title: 'After Nationalisation',
    narrative: `You have taken control of the gas and lithium sectors. The markets have reacted. The U.S. has announced "review" of trade preferences. Your technicians are capable, but some key expertise left with the firms. Do you prioritise training and domestic capacity, or bring in partners from countries less vulnerable to U.S. pressure?`,
    choices: [
      { id: 'train', text: 'Prioritise domestic capacity', consequence: 'You invest in people.', effects: { economicStrength: 8, sovereignty: 10 }, nextBlock: 7 },
      { id: 'partners', text: 'Bring in alternative partners', consequence: 'You diversify.', effects: { economicStrength: 12, sovereignty: 5 }, nextBlock: 7 },
    ],
  },
  {
    phase: 2,
    title: 'After Renegotiation',
    narrative: `The renegotiated contracts bring more revenue to the state. The firms have accepted, but investment has slowed. Your finance minister says you need to show "stability" to attract new capital. The unions want that revenue spent on wages and pensions. Do you invest in social programs or in infrastructure to attract industry?`,
    choices: [
      { id: 'social', text: 'Invest in social programs', consequence: 'You prioritise people.', effects: { publicSupport: 15, laborUnity: 10 }, nextBlock: 7 },
      { id: 'infra', text: 'Invest in industrial infrastructure', consequence: 'You build for the long term.', effects: { economicStrength: 12, publicSupport: 3 }, nextBlock: 7 },
    ],
  },
  {
    phase: 2,
    title: 'The Coup Plot',
    narrative: `Your intelligence services have uncovered a plot. Military officers, opposition politicians, and figures linked to foreign NGOs were planning to remove you. Prashad's work documents how such plots are often supported from abroad. Do you arrest the plotters and purge the military, or handle it quietly to avoid a crisis?`,
    choices: [
      { id: 'arrest', text: 'Arrest the plotters publicly', consequence: 'You strike back.', effects: { sovereignty: 15, publicSupport: 12, internationalStanding: -12 } },
      { id: 'quiet', text: 'Handle it quietly', consequence: 'You contain the threat.', effects: { sovereignty: 5, publicSupport: 2 } },
    ],
  },
  {
    phase: 2,
    title: 'Sanctions',
    narrative: `The U.S. has imposed sanctions. Banks are cutting ties. As with Venezuela, the goal is to squeeze the economy until it breaks. Sandino's resistance showed that continental solidarity can counter imperial pressure. Your finance minister says you need to find alternative payment channels and trading partners. Do you pivot to regional and non-dollar trade, or seek a negotiated lifting of sanctions?`,
    choices: [
      { id: 'pivot', text: 'Pivot to alternative partners and payment systems', consequence: 'You build new circuits.', effects: { sovereignty: 15, economicStrength: 5 } },
      { id: 'negotiate', text: 'Seek negotiated lifting of sanctions', consequence: 'You open dialogue.', effects: { internationalStanding: 5, sovereignty: -10 } },
    ],
  },
  {
    phase: 3,
    title: 'Uneven Development',
    narrative: `The capital and the gas-producing regions have benefited from your policies. The highlands and the east — Indigenous and mestizo — remain poor. Building socialism in a plurinational country means closing these gaps. Do you prioritise regional redistribution, or focus on national growth and let it "trickle down"?`,
    choices: [
      { id: 'redistribute', text: 'Prioritise regional redistribution', consequence: 'You invest in the margins.', effects: { plurinationalUnity: 15, publicSupport: 12, economicStrength: -5 } },
      { id: 'growth', text: 'Focus on national growth', consequence: 'You bet on expansion.', effects: { economicStrength: 12, plurinationalUnity: -10 } },
    ],
  },
  {
    phase: 3,
    title: 'The World Bank Returns',
    narrative: `The World Bank offers a new loan — "poverty reduction" and "institutional strengthening." The conditions are softer than before, but they still require privatising the water utility and "rationalising" public employment. Prebisch's ECLA argued that periphery nations need import-substituting industrialisation, not more conditional loans. Do you accept, or refuse and fund your own programs?`,
    choices: [
      { id: 'refuse', text: 'Refuse and fund your own programs', consequence: 'You stay independent.', effects: { sovereignty: 15, debtBurden: -5, economicStrength: -5 } },
      { id: 'accept', text: 'Accept with minimal conditions', consequence: 'You take the money.', effects: { debtBurden: 15, sovereignty: -15, economicStrength: 5 } },
    ],
  },
  {
    phase: 3,
    title: 'Land Reform',
    narrative: `Large estates control the best land. Mariátegui wrote that indigenous servitude cannot be abolished without eliminating the latifundium. Hugo Blanco's peasant unions forced Peru's radical agrarian reform. Indigenous and peasant movements demand the same. Do you push for redistribution, support cooperatives on state land, or defer to avoid conflict?`,
    choices: [
      { id: 'redistribute', text: 'Push for land redistribution', consequence: 'You take on the estates.', effects: { plurinationalUnity: 18, publicSupport: 15, economicStrength: -5 } },
      { id: 'coops', text: 'Support cooperatives on state land', consequence: 'You create alternatives.', effects: { plurinationalUnity: 10, economicStrength: 5, publicSupport: 8 } },
      { id: 'defer', text: 'Defer to avoid conflict', consequence: 'You step back.', effects: { economicStrength: 2, plurinationalUnity: -15 } },
    ],
  },
  {
    phase: 3,
    title: 'Mid-Term',
    narrative: `You are halfway through your term. Some things have worked; others have not. The opposition is organising. The question is whether to consolidate what you have built or push further. Prashad writes that hope persists even when Washington's bullets fly — but survival requires both principle and pragmatism. Do you consolidate or push ahead?`,
    choices: [
      { id: 'consolidate', text: 'Consolidate and defend gains', consequence: 'You hold the line.', effects: { publicSupport: 5, sovereignty: 5 } },
      { id: 'push', text: 'Push ahead with deeper reforms', consequence: 'You accelerate.', effects: { sovereignty: 10, publicSupport: -5 } },
    ],
  },
  {
    phase: 4,
    title: 'The Media War',
    narrative: `Opposition-aligned media run stories of "authoritarianism" and "economic collapse." Some are funded from abroad. Your supporters want you to regulate or counter them. But cracking down on media can backfire — and feed the narrative your opponents want. Do you create public media to counter the narrative, regulate foreign funding, or leave the landscape as is?`,
    choices: [
      { id: 'public', text: 'Create strong public media', consequence: 'You build your voice.', effects: { publicSupport: 10, sovereignty: 5 } },
      { id: 'regulate', text: 'Regulate foreign funding of media', consequence: 'You limit external influence.', effects: { sovereignty: 12, internationalStanding: -10 } },
      { id: 'leave', text: 'Leave the landscape as is', consequence: 'You avoid the fight.', effects: {} },
    ],
  },
  {
    phase: 4,
    title: 'Diversification',
    narrative: `Your economy still depends heavily on gas and minerals. When prices fall, everything suffers. Prebisch's dependency theory held that the periphery must industrialise — import substitution, value-added processing — to break the center's grip. Building that capacity takes time and investment. Do you prioritise industrialisation now, or focus on stabilising the current model?`,
    choices: [
      { id: 'industrialise', text: 'Prioritise industrialisation', consequence: 'You invest in industry.', effects: { economicStrength: 15, debtBurden: 10 } },
      { id: 'stabilise', text: 'Focus on stabilising the current model', consequence: 'You secure what you have.', effects: { economicStrength: 3, debtBurden: -5 } },
    ],
  },
  {
    phase: 4,
    title: 'The Second Coup',
    narrative: `Another plot — or perhaps the same one, resurfacing. This time it involves judges, prosecutors, and a faction of the police. The playbook from Brazil in 2016 and Bolivia in 2019: use legal and institutional means to delegitimise, then remove. Do you purge the institutions and risk accusations of authoritarianism, or try to work around the hostile elements?`,
    choices: [
      { id: 'purge', text: 'Purge hostile elements from institutions', consequence: 'You clean house.', effects: { sovereignty: 15, publicSupport: 5, internationalStanding: -15 } },
      { id: 'work_around', text: 'Work around hostile elements', consequence: 'You adapt.', effects: { sovereignty: 2, publicSupport: 3 } },
    ],
  },
  {
    phase: 5,
    title: 'Re-election',
    narrative: `Your term is ending. The constitution allows one re-election. Your base wants you to run again; the opposition says it would be "authoritarian." Prashad notes that the same powers that fund coups also fund the language of "democratic norms." Do you run for re-election, or step aside and back a successor?`,
    choices: [
      { id: 'run', text: 'Run for re-election', consequence: 'You seek another term.', effects: { publicSupport: 10, sovereignty: 5 } },
      { id: 'step_aside', text: 'Step aside and back a successor', consequence: 'You pass the torch.', effects: { publicSupport: 5, internationalStanding: 5 } },
    ],
  },
  {
    phase: 5,
    title: 'The Legacy',
    narrative: `What have you built? A more sovereign economy, or one still tied to old circuits? A plurinational state that recognises Indigenous nations — as Green Rioja and Vacarezza argue, "Somos Pluri" means embracing the diversity of movements — or one that papered over difference? A worker-peasant alliance, or a fractured coalition? The struggle continues — in your country and across the Global South.`,
    choices: [
      { id: 'sovereign', text: 'Sovereignty above all', consequence: 'You chose independence.', effects: { sovereignty: 15 } },
      { id: 'plurinational', text: 'Plurinational unity', consequence: 'You chose recognition.', effects: { plurinationalUnity: 15 } },
      { id: 'labor', text: 'Worker power', consequence: 'You chose labor.', effects: { laborUnity: 15 } },
      { id: 'balanced', text: 'A difficult balance', consequence: 'You held it together.', effects: { sovereignty: 5, plurinationalUnity: 5, laborUnity: 5 } },
    ],
  },
];

const endings: LongFormEnding[] = [
  {
    id: 'victory',
    endingType: 'victory',
    title: 'Socialism in One Country',
    endingNarrative: `You built it. Sovereignty, plurinational unity, and worker power — not perfectly, but substantially. The bullets flew, the sanctions bit, and you held. Your country is more sovereign, more equal, and more its own. The struggle continues, but you have shown that another path is possible.`,
  },
  {
    id: 'partial',
    endingType: 'partial_victory',
    title: 'Survived',
    endingNarrative: `You survived. Some gains held; others were rolled back. The opposition is stronger. The external pressure never stopped. But you did not collapse. The project of building socialism in a plurinational country is long — and you have kept it alive.`,
  },
  {
    id: 'defeat',
    endingType: 'defeat',
    title: 'The Old Order Restored',
    endingNarrative: `They won. The coup, the sanctions, or the "reforms" — the old order is back. But as Prashad writes, hope persists. The people who elected you have not forgotten. The fight for a sovereign, plurinational, socialist future goes on.`,
  },
];

// Route last block choices to endings: sovereign->victory, plurinational->partial, labor->partial, balanced->victory
const routeLastToEndings = (choiceIndex: number) => {
  if (choiceIndex === 0) return 0; // sovereign -> victory
  if (choiceIndex === 1) return 1; // plurinational -> partial
  if (choiceIndex === 2) return 1; // labor -> partial
  return 0; // balanced -> victory
};

export function createNarrativeTree(options?: { shuffle?: boolean; seed?: number }) {
  return createLongFormTree(
    blocks,
    endings,
    routeLastToEndings,
    { shuffleBlocks: options?.shuffle ?? true, seed: options?.seed },
  );
}
