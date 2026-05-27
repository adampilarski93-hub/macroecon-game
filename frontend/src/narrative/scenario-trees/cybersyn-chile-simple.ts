import type { DecisionBlock, LongFormEnding, ScenarioArc } from '../long-form-tree';
import { createLongFormTree } from '../long-form-tree';

/**
 * Project Cybersyn — Allende's Chile (1971-1973)
 * Simplified version with single arc
 */

const blocks: DecisionBlock[] = [
  {
    phase: 1,
    title: 'La Nacionalización del Cobre',
    narrative: `July 1971. You stand before La Moneda palace as President Salvador Allende signs the constitutional amendment nationalizing Chile's copper mines. US ambassador Edward Korry cables Washington: "Chile has voted itself into a communist dictatorship." Nixon orders CIA director Richard Helms: "Make the economy scream." Stafford Beer, the British cybernetician, has just arrived with a radical proposal—a real-time control system for the entire economy using telex machines and early computers.`,
    choices: [
      {
        id: 'embrace_cybersyn',
        text: 'Fully commit to Project Cybersyn',
        consequence: 'Invest in 500 telex machines and cybernetic infrastructure.',
        effects: { cyberneticInfrastructure: 15, usTensions: 10 },
      },
      {
        id: 'cautious_tech',
        text: 'Prioritize worker self-management',
        consequence: 'Support factory seizures and worker councils.',
        effects: { workerControl: 15, usTensions: 5 },
      },
      {
        id: 'balanced_approach',
        text: 'Pursue both worker input and cybernetic coordination',
        consequence: 'Attempt the difficult balance.',
        effects: { cyberneticInfrastructure: 8, workerControl: 8, usTensions: 8 },
      }
    ]
  },
  {
    phase: 2,
    title: 'The Opsroom',
    narrative: `Stafford Beer presents his design: Cyberstride software running on an IBM 360/50, connected to 500 telex machines. The futuristic Operations Room—seven swivel chairs, ash-paneled walls, glowing displays. But there's resistance. Some factory managers refuse to install telexes. The US blocks computer exports.`,
    choices: [
      {
        id: 'full_implementation',
        text: 'Divert scarce dollars to complete the network',
        consequence: 'Speed up implementation but draw down reserves.',
        effects: { cyberneticInfrastructure: 20, economicReserves: -15, usTensions: 10 }
      },
      {
        id: 'phased_rollout',
        text: 'Phased rollout starting with strategic sectors',
        consequence: 'Slower but sustainable implementation.',
        effects: { cyberneticInfrastructure: 10, economicReserves: -5, usTensions: 5 }
      },
      {
        id: 'local_alternative',
        text: 'Develop low-tech participatory alternatives',
        consequence: 'Avoid US technology dependence.',
        effects: { workerControl: 10, cyberneticInfrastructure: 5, usTensions: 3 }
      }
    ]
  },
  {
    phase: 3,
    title: 'The Crisis Deepens',
    narrative: `October 1972. Truck owners announce an indefinite strike—financed by CIA. Without transport, food rots in fields. The opposition plans "La Marcha de las Cacerolas Vacías"—the march of the empty pots. Beer argues Cybersyn can identify alternative transport routes. But the real problem is political: shopkeepers are hoarding.`,
    choices: [
      {
        id: 'cybersyn_logistics',
        text: 'Use Cyberstride to reroute transport',
        consequence: 'Demonstrate technical capability but strain system.',
        effects: { cyberneticInfrastructure: 10, economicControl: 10, politicalPolarization: 15 }
      },
      {
        id: 'peoples_committees',
        text: 'Mobilize Cordones Industriales',
        consequence: 'Worker power breaks the blockade but terrifies middle classes.',
        effects: { workerControl: 20, politicalPolarization: 20, usTensions: 10 }
      },
      {
        id: 'negotiated_settlement',
        text: 'Negotiate with truckers',
        consequence: 'Reduce polarization temporarily but embolden opposition.',
        effects: { politicalPolarization: -5, usTensions: 5, economicControl: 5 }
      }
    ]
  },
  {
    phase: 4,
    title: 'The Soviet Option',
    narrative: `August 1972. Soviet advisers arrive. They propose Gosplan-style material balances, strict central allocation, suppression of "anarcho-syndicalist" cordones. They offer hard currency credits—enough to stabilize imports for 18 months. But the condition is clear: abandon Cybersyn's participatory experiments.`,
    choices: [
      {
        id: 'reject_soviet',
        text: 'Reject Soviet model—Cybersyn is the third way',
        consequence: 'Preserve autonomy but lose Soviet financial lifeline.',
        effects: { cyberneticInfrastructure: 10, workerControl: 10, economicReserves: -15 }
      },
      {
        id: 'partial_acceptance',
        text: 'Accept Soviet credits but insist on Cybersyn',
        consequence: 'Gain breathing room but install Soviet advisers.',
        effects: { economicReserves: 15, cyberneticInfrastructure: -5, workerControl: -5 }
      },
      {
        id: 'seek_alternatives',
        text: 'Decline Soviet terms, seek Non-Aligned solidarity',
        consequence: 'Preserve model purity but face imminent forex crisis.',
        effects: { internationalSolidarity: 10, economicReserves: -20, cyberneticInfrastructure: 5 }
      }
    ]
  },
  {
    phase: 5,
    title: 'La Moneda, 11 de Septiembre',
    narrative: `September 11, 1973. Hawker Hunter jets streak across Santiago's sky. La Moneda palace burns. Allende's final radio address: "Placed in a historic transition, I will pay for the loyalty of the people with my life..." The Cybersyn Opsroom is ransacked—telex machines dumped in Mapocho River. The coup is savage. But what remains of your two years?`,
    choices: [
      {
        id: 'ending_transition',
        text: 'Face the inevitable—document achievements for history',
        consequence: 'The tanks roll regardless. But what you built matters.',
        effects: {}
      }
    ]
  }
];

const endings: LongFormEnding[] = [
  {
    id: 'cybernetic_legacy',
    endingType: 'partial_victory',
    title: 'The Viable System Survives in Memory',
    endingNarrative: `Cybersyn was destroyed, but not forgotten. Stafford Beer's Viable System Model influenced participatory economics debates for decades. You proved that cybernetics could serve participation, not just control.`
  },
  {
    id: 'worker_power',
    endingType: 'victory',
    title: 'The Cordones: Dual Power Proven',
    endingNarrative: `The cordones fell to military violence, but not to managerial counter-revolution. For two years, workers demonstrated that self-management could outproduce hierarchy. That memory persisted through 17 years of dictatorship.`
  },
  {
    id: 'tragic_caution',
    endingType: 'defeat',
    title: 'Too Late, Too Little',
    endingNarrative: `The coup came before Cybersyn was operational. What remains is a tragic caution: the forces of reaction move faster than democratic transformation. But it also doesn't erase what was attempted.`
  }
];

export function createNarrativeTree(options?: { shuffle?: boolean; seed?: number }) {
  return createLongFormTree(
    blocks,
    endings,
    () => 1,
    { shuffleBlocks: options?.shuffle, seed: options?.seed }
  );
}
