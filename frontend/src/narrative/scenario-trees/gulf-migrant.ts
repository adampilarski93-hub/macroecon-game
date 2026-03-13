import type { DecisionBlock, LongFormEnding } from '../long-form-tree';
import { createLongFormTree } from '../long-form-tree';

/**
 * Gulf Migrant — Construction worker in a wealthy Gulf state (20 decisions)
 * Informed by: Hanieh, Ness, Khalili, Polanyi, Amin, Marini, Kadri
 */
const blocks: DecisionBlock[] = [
  {
    phase: 1,
    title: 'The Recruitment',
    narrative: `You have just arrived in the Emirate of Zahra. You came to work on the megacity — towers, stadiums, ports — rising from the desert. Scholars of Gulf labour suggest that migration is driven not by simple "push-pull" wages but by broader structures: debt and structural adjustment at home, and a system that treats you as temporary, precarious, and disposable. You paid a recruiter back home. The debt is heavy. Your passport is with your sponsor. What do you do first?`,
    choices: [
      { id: 'work_hard', text: 'Work hard, save fast', consequence: 'You push yourself.', effects: { savings: 8, health: -5, dignity: -3 } },
      { id: 'connect', text: 'Find others from home', consequence: 'You seek community.', effects: { solidarity: 12, savings: -2 } },
      { id: 'learn', text: 'Learn the rules and rights', consequence: 'You study your situation.', effects: { legalStatus: 5, dignity: 5 } },
    ],
  },
  {
    phase: 1,
    title: 'The Camp',
    narrative: `You live in a labour camp — rows of prefab units, shared toilets, no kitchen. Some analysts argue that the built environment of Gulf megaprojects is made possible by housing workers in conditions that keep costs minimal and control tight. Your bunkmate says the company holds passports "for safekeeping." Research on the kafala system shows that sponsorship binds you to your employer; leaving means losing your legal status. Do you accept the arrangement and focus on work, or start asking questions?`,
    choices: [
      { id: 'accept', text: 'Accept and focus on work', consequence: 'You keep your head down.', effects: { savings: 5, legalStatus: -5 } },
      { id: 'ask', text: 'Ask questions quietly', consequence: 'You probe.', effects: { legalStatus: 3, solidarity: 5 } },
    ],
  },
  {
    phase: 1,
    title: 'The First Payday',
    narrative: `Payday comes. Your contract promised one amount; you receive less. "Deductions," the foreman says — for housing, transport, "fees." Some scholars argue that guest worker programs are designed to lower labour costs and weaken worker power — deductions and debt keep you bound. Do you challenge it, or stay silent and send what you can home?`,
    choices: [
      { id: 'challenge', text: 'Challenge the deductions', consequence: 'You speak up.', effects: { dignity: 8, legalStatus: -8, solidarity: 5 } },
      { id: 'silent', text: 'Stay silent, send what you can', consequence: 'You prioritise remittances.', effects: { savings: 5, dignity: -5 } },
    ],
  },
  {
    phase: 1,
    title: 'Heat',
    narrative: `The sun is brutal. Workers collapse. Some never get up. Scholars of Gulf infrastructure note that megaprojects are built in conditions that would be illegal elsewhere — heat, hours, safety. The company says it provides water and rest. It does not. Do you push through and earn, or slow down and risk being "released" — sent home with nothing?`,
    choices: [
      { id: 'push', text: 'Push through', consequence: 'You work through the heat.', effects: { savings: 10, health: -15 } },
      { id: 'slow', text: 'Slow down, protect yourself', consequence: 'You pace yourself.', effects: { health: 5, savings: -8 } },
    ],
  },
  {
    phase: 2,
    title: 'Injury',
    narrative: `Someone falls from scaffolding. The foreman says he slipped. There were no rails. Research on logistics and construction labour suggests that precarious conditions — minimal legal protection — enable maximum profit. The injured worker is taken away. You do not know if he gets care or is deported. Do you keep working, or try to organise with others to demand safety?`,
    choices: [
      { id: 'work', text: 'Keep working', consequence: 'You focus on your own survival.', effects: { savings: 5, solidarity: -5 } },
      { id: 'organise', text: 'Try to organise for safety', consequence: 'You reach out to others.', effects: { solidarity: 12, legalStatus: -10, dignity: 8 } },
    ],
  },
  {
    phase: 2,
    title: 'The Agent',
    narrative: `A man from an NGO visits the camp. He talks about rights, contracts, passport retention. Some analysts argue that resistance is possible even within structures designed to prevent it — but the risks are real. Your sponsor could "release" you. You would lose your job, your visa, and possibly your ticket home. Do you talk to him, or avoid him?`,
    choices: [
      { id: 'talk', text: 'Talk to him', consequence: 'You learn your rights.', effects: { legalStatus: 10, dignity: 5 } },
      { id: 'avoid', text: 'Avoid him', consequence: 'You stay away.', effects: { legalStatus: -3, savings: 2 } },
    ],
  },
  {
    phase: 2,
    title: 'Overtime',
    narrative: `The project is behind schedule. The foreman offers overtime — double pay, they say. But the hours are endless and the "double pay" never quite matches the promise. Dependency theorists argue that keeping wages low and hours long is how value is extracted; you build the megacity, but the gains flow elsewhere. Do you take the overtime or refuse?`,
    choices: [
      { id: 'take', text: 'Take the overtime', consequence: 'You work more.', effects: { savings: 15, health: -10 } },
      { id: 'refuse', text: 'Refuse', consequence: 'You protect your rest.', effects: { health: 8, savings: -10 } },
    ],
  },
  {
    phase: 2,
    title: 'Sending Home',
    narrative: `You have saved enough for a first transfer. Your family is waiting. Remittances keep entire regions afloat — scholars of development note that migration is often a response to conditions that structural adjustment helped create. But the transfer fees are high. Do you use the company's agent — convenient but costly — or find a cheaper channel?`,
    choices: [
      { id: 'agent', text: 'Use the company agent', consequence: 'You pay the fee.', effects: { savings: -5 } },
      { id: 'cheaper', text: 'Find a cheaper channel', consequence: 'You seek alternatives.', effects: { savings: 8, legalStatus: -3 } },
    ],
  },
  {
    phase: 2,
    title: 'The Strike',
    narrative: `Workers on another site have stopped. They want their passports back and their pay in full. Research on guest worker resistance shows that despite structural barriers, workers do organise — and that solidarity across borders can challenge the logic of disposability. Your crew is watching. Do you join, or stay at work?`,
    choices: [
      { id: 'join', text: 'Join the strike', consequence: 'You stand with them.', effects: { solidarity: 15, legalStatus: -12, dignity: 12 }, nextBlock: 9 },
      { id: 'stay', text: 'Stay at work', consequence: 'You keep working.', effects: { savings: 8, solidarity: -8 }, nextBlock: 10 },
    ],
  },
  {
    phase: 2,
    title: 'The Crackdown',
    narrative: `The company has reacted. More guards, fewer visitors, warnings about "troublemakers." Some scholars argue that Gulf capital relies on a segmented, controlled workforce — and that any collective action is met with discipline. You are on a list. Do you lie low and hope it blows over, or continue to organise in secret?`,
    choices: [
      { id: 'low', text: 'Lie low', consequence: 'You retreat.', effects: { legalStatus: 5, solidarity: -8 }, nextBlock: 11 },
      { id: 'secret', text: 'Continue organising in secret', consequence: 'You persist.', effects: { solidarity: 12, legalStatus: -12 }, nextBlock: 11 },
    ],
  },
  {
    phase: 2,
    title: 'The Price of Silence',
    narrative: `You stayed at work. The strike was broken. Some workers were deported. Your crew does not look at you the same way. Research on solidarity suggests that the cost of not standing together can be isolation. Do you try to rebuild trust, or focus on your own survival?`,
    choices: [
      { id: 'rebuild', text: 'Try to rebuild trust', consequence: 'You reach out.', effects: { solidarity: 8, dignity: 5 }, nextBlock: 11 },
      { id: 'survive', text: 'Focus on survival', consequence: 'You keep your head down.', effects: { savings: 5, solidarity: -5 }, nextBlock: 11 },
    ],
  },
  {
    phase: 3,
    title: 'The New Contract',
    narrative: `Your contract is ending. The company offers renewal — same conditions, two more years. Or you could try to switch sponsors. Switching is legal in Zahra now, they say, but in practice it is difficult: you need a release, and sponsors rarely give it. Some argue that "reform" of kafala often leaves the structure intact. Do you renew, or try to switch?`,
    choices: [
      { id: 'renew', text: 'Renew', consequence: 'You sign again.', effects: { savings: 5, legalStatus: 2 } },
      { id: 'switch', text: 'Try to switch sponsors', consequence: 'You seek a way out.', effects: { legalStatus: -5, dignity: 5 } },
    ],
  },
  {
    phase: 3,
    title: 'The Port',
    narrative: `You are offered a transfer to the port — loading ships, longer hours, slightly better pay. Scholars of maritime trade argue that ports and shipping are the sinews of global capitalism; the goods that flow through are moved by workers like you, often with minimal protection. Do you take the transfer?`,
    choices: [
      { id: 'yes', text: 'Take the transfer', consequence: 'You move to the port.', effects: { savings: 10, health: -5 } },
      { id: 'no', text: 'Stay in construction', consequence: 'You remain.', effects: { solidarity: 5 } },
    ],
  },
  {
    phase: 3,
    title: 'Debt at Home',
    narrative: `Your family writes: the loan you took for recruitment is coming due. The interest is crushing. Critics of migration systems argue that debt bondage — borrowing to pay recruiters — is a feature, not a bug; it keeps you working regardless of conditions. Do you send more home and stretch yourself thin, or explain that you need to keep something back?`,
    choices: [
      { id: 'send', text: 'Send more home', consequence: 'You stretch yourself.', effects: { savings: -10, health: -5 } },
      { id: 'explain', text: 'Explain, keep something back', consequence: 'You protect a reserve.', effects: { savings: 5, dignity: 3 } },
    ],
  },
  {
    phase: 3,
    title: 'Passport',
    narrative: `You have heard that some workers have demanded their passports back — and won. The law says you have a right to hold it. In practice, asking can mean trouble. Do you demand yours, or leave it with the sponsor?`,
    choices: [
      { id: 'demand', text: 'Demand your passport', consequence: 'You assert your right.', effects: { legalStatus: 12, dignity: 10 } },
      { id: 'leave', text: 'Leave it with the sponsor', consequence: 'You avoid the conflict.', effects: { legalStatus: -5 } },
    ],
  },
  {
    phase: 3,
    title: 'Solidarity',
    narrative: `A worker from another camp has been deported — he spoke too loudly. Your crew is shaken. Some analysts argue that collective action is the only way to change conditions, but the cost of failure is high. Do you reach out to build a network across camps, or keep your head down?`,
    choices: [
      { id: 'reach', text: 'Reach out, build a network', consequence: 'You build solidarity.', effects: { solidarity: 15, legalStatus: -8 } },
      { id: 'down', text: 'Keep your head down', consequence: 'You stay quiet.', effects: { savings: 3, solidarity: -5 } },
    ],
  },
  {
    phase: 4,
    title: 'The World Cup',
    narrative: `The megacity is for the World Cup. The stadiums, the hotels, the metro — all built by migrants. Scholars of Gulf infrastructure describe how such projects embody extraction: the built environment you create will host the world while you remain invisible. Do you take pride in the work, or refuse to identify with it?`,
    choices: [
      { id: 'pride', text: 'Take pride in the work', consequence: 'You claim the achievement.', effects: { dignity: 8 } },
      { id: 'refuse', text: 'Refuse to identify with it', consequence: 'You reject the narrative.', effects: { dignity: 5, solidarity: 5 } },
    ],
  },
  {
    phase: 4,
    title: 'Illness',
    narrative: `You are sick. The camp clinic gives pills; they do not help. Proper care would cost money you do not have — and missing work could mean "release." Some argue that migrant workers are treated as disposable: when you cannot work, you are replaced. Do you push through, or seek proper care and risk your job?`,
    choices: [
      { id: 'push', text: 'Push through', consequence: 'You work sick.', effects: { savings: 5, health: -15 } },
      { id: 'care', text: 'Seek proper care', consequence: 'You prioritise health.', effects: { health: 10, savings: -10, legalStatus: -5 } },
    ],
  },
  {
    phase: 4,
    title: 'Mid-Term',
    narrative: `You have been here a year. You have sent money home. You have lost friends to accidents and deportation. The megacity rises. Do you focus on finishing your contract and going home, or dig in and fight for something better for those who come after?`,
    choices: [
      { id: 'finish', text: 'Focus on finishing', consequence: 'You count the days.', effects: { savings: 8, solidarity: -5 } },
      { id: 'fight', text: 'Fight for those who come after', consequence: 'You stay and organise.', effects: { solidarity: 15, dignity: 12, legalStatus: -10 } },
    ],
  },
  {
    phase: 4,
    title: 'New Arrivals',
    narrative: `New workers have arrived to replace those who left — deported, injured, or gone home. They do not know what happened. Do you welcome them and share what you have learned, or keep to yourself and focus on your own survival?`,
    choices: [
      { id: 'share', text: 'Share what you know', consequence: 'You reach out.', effects: { solidarity: 10, dignity: 5 } },
      { id: 'keep', text: 'Keep to yourself', consequence: 'You focus on survival.', effects: { savings: 5, solidarity: -5 } },
    ],
  },
  {
    phase: 5,
    title: 'Year Two',
    narrative: `Your second year. The debt at home is almost paid. Your body is tired. The megacity is nearly done. Do you renew again for another project, or try to go home with what you have?`,
    choices: [
      { id: 'renew', text: 'Renew for another project', consequence: 'You stay.', effects: { savings: 10, health: -5 } },
      { id: 'home', text: 'Try to go home', consequence: 'You seek your release.', effects: { dignity: 8, savings: -5 } },
    ],
  },
  {
    phase: 5,
    title: 'The Legacy',
    narrative: `What do you leave behind? Money for your family. Scars. Perhaps a network of workers who know their rights. The megacity will host the world. You built it. Do you see yourself as a survivor, a fighter, or both?`,
    choices: [
      { id: 'survivor', text: 'A survivor', consequence: 'You got through.', effects: { savings: 5, dignity: 5 } },
      { id: 'fighter', text: 'A fighter', consequence: 'You resisted.', effects: { solidarity: 10, dignity: 10 } },
      { id: 'both', text: 'Both', consequence: 'You survived and resisted.', effects: { solidarity: 5, savings: 5, dignity: 8 } },
    ],
  },
];

const endings: LongFormEnding[] = [
  {
    id: 'victory',
    endingType: 'victory',
    title: 'Home, With Dignity',
    endingNarrative: `You made it. You sent money home. You kept your health and your sense of worth. The megacity stands — you built it. You leave with more than you came with, and with your head held high.`,
  },
  {
    id: 'partial',
    endingType: 'partial_victory',
    title: 'Survived',
    endingNarrative: `You survived. The debt is paid, or nearly. You are tired. The system did not break you, but it took its toll. You leave with what you could save. The struggle continues — for you, and for those who come after.`,
  },
  {
    id: 'defeat',
    endingType: 'defeat',
    title: 'Broken',
    endingNarrative: `The system won. You leave with little — injured, indebted, or both. The megacity rises without you. But you are not alone. Millions have walked this path. The fight for dignity goes on.`,
  },
];

export function createNarrativeTree(options?: { shuffle?: boolean; seed?: number }) {
  return createLongFormTree(
    blocks,
    endings,
    (i) => (i === 2 ? 0 : 1), // both→victory, survivor/fighter→partial
    {
      shuffleBlocks: options?.shuffle ?? true,
      seed: options?.seed,
      blockPool: [1, 2, 3, 4, 5, 6, 7, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      blockPoolCount: 10,
    },
  );
}
