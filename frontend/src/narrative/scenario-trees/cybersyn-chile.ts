import type { DecisionBlock, LongFormEnding, ScenarioArc } from '../long-form-tree';
import { createArcBasedTree } from '../long-form-tree';

/**
 * Project Cybersyn — Allende's Chile (1971-1973)
 *
 * Historical narrative covering the implementation of Stafford Beer's cybernetic
 * management system during Salvador Allende's Popular Unity government.
 *
 * Real events integrated:
 * - Copper nationalization (July 1971)
 * - Project Cybersyn inception (1971) and telex network rollout
 * - Nixon's economic warfare ("make the economy scream")
 * - ITT/CIA destabilization campaigns
 * - Black market and shortages (1972-1973)
 * - Worker-controlled factories (Cordón Industrial)
 * - The September 11, 1973 coup
 *
 * The scenario ends with the coup regardless of choices—this is historical fate.
 * But what you accomplish before the tanks roll matters: worker control, Cybersyn
 * implementation, international solidarity, and the model you leave behind.
 */

// ════════════════════════════════════════════════════════════════
// ARC 1: INCEPTION — Copper, Cybernetics, and the Challenge
// ════════════════════════════════════════════════════════════════

const inceptionArc: ScenarioArc = {
  id: 'start',
  blocks: [
    {
      phase: 1,
      title: 'La Nacionalización del Cobre',
      narrative: `July 1971. You stand before La Moneda palace as President Salvador Allende signs the constitutional amendment nationalizing Chile's copper mines—Chuquicamata, El Salvador, El Teniente. The "excess profits" deduction claims 100% of Anaconda and Kennecott's earnings since 1955. US ambassador Edward Korry cables Washington: "Chile has voted itself into a communist dictatorship." Nixon orders CIA director Richard Helms: "Make the economy scream." Stafford Beer, the British cybernetician, has just arrived with a radical proposal—a real-time control system for the entire economy using telex machines and early computers. Meanwhile, factory committees are seizing plants without government approval.`,
      choices: [
        {
          id: 'embrace_cybersyn',
          text: 'Fully commit to Project Cybersyn — build the Opsroom and national telex network',
          consequence: 'Invest scarce foreign exchange in 500 telex machines and cybernetic infrastructure.',
          effects: { cyberneticInfrastructure: 15, workerControl: -5, usTensions: 10, internationalSolidarity: 5 },
          nextArc: 'cybernetic_path'
        },
        {
          id: 'cautious_tech',
          text: 'Prioritize worker self-management over central coordination',
          consequence: 'Support factory seizures and worker councils. Let production decisions come from below.',
          effects: { workerControl: 15, cyberneticInfrastructure: -5, usTensions: 5, politicalPolarization: 10 },
          nextArc: 'workers_path'
        },
        {
          id: 'balanced_approach',
          text: 'Pursue both: worker input feeding into cybernetic coordination',
          consequence: 'Attempt the difficult balance of democratic participation and real-time optimization.',
          effects: { cyberneticInfrastructure: 8, workerControl: 8, usTensions: 8, politicalPolarization: 5 },
          nextArc: 'balanced_path'
        }
      ]
    }
  ]
};

// ════════════════════════════════════════════════════════════════
// ARC 2A: CYBERNETIC PATH — Building the System
// ════════════════════════════════════════════════════════════════

const cyberneticArc: ScenarioArc = {
  id: 'cybernetic_path',
  blockPool: [1, 2, 3],
  blockPoolCount: 2,
  blocks: [
    {
      phase: 2,
      title: 'The Opsroom and Cyberstride',
      narrative: `Stafford Beer presents his design: Cyberstride software running on an IBM 360/50, connected to 500 telex machines in state enterprises. The futuristic Operations Room—seven swivel chairs, ash-paneled walls, glowing displays. Beer calls it "the room for discussing complex situations." But there's resistance. Some factory managers refuse to install telexes. The US blocks computer exports through CoCom restrictions. You must decide: push forward with foreign exchange reserves, or scale back?`,
      choices: [
        {
          id: 'full_implementation',
          text: 'Divert scarce dollars to complete the telex network within 12 months',
          consequence: 'Speed up implementation but draw down reserves and attract more US attention.',
          effects: { cyberneticInfrastructure: 20, economicReserves: -15, usTensions: 10, economicControl: 15 }
        },
        {
          id: 'phased_rollout',
          text: 'Phased rollout starting with strategic sectors (mining, steel, energy)',
          consequence: 'Slower but sustainable. Learn lessons before national scale.',
          effects: { cyberneticInfrastructure: 10, economicReserves: -5, usTensions: 5, economicControl: 8 }
        },
        {
          id: 'local_alternative',
          text: 'Develop low-tech participatory alternatives using radio and worker assemblies',
          consequence: 'Avoid US technology dependence but lose real-time optimization capability.',
          effects: { workerControl: 10, cyberneticInfrastructure: 5, usTensions: 3, economicControl: 5 }
        }
      ]
    },
    {
      phase: 3,
      title: 'ALCHEMY and the Viable System Model',
      narrative: `Beer proposes ALCHEMY—a simulation program to predict economic outcomes. The Viable System Model (VSM) demands five recursive levels: operations, coordination, control, planning, and policy. But Chile's economy is chaos. Factories report conflicting numbers. Black market currency traders operate openly on downtown streets. The opposition media—El Mercurio, funded by CIA—denounces "Soviet-style central planning." How do you respond to the simulation skeptics?`,
      choices: [
        {
          id: 'transparency_gambit',
          text: 'Open the Cybersyn data to workers and the public—radical transparency',
          consequence: 'Build popular legitimacy but expose system vulnerabilities to opposition.',
          effects: { publicSupport: 15, workerControl: 10, politicalPolarization: 10, cyberneticInfrastructure: 5 }
        },
        {
          id: 'technocratic_close',
          text: 'Keep data restricted to technocrats—protect the system from sabotage',
          consequence: 'Maintain operational security but breed suspicion among workers.',
          effects: { economicControl: 10, workerControl: -10, publicSupport: -5, usTensions: 5 }
        },
        {
          id: 'worker_terminals',
          text: 'Install telex terminals in factory cafeterias for worker input',
          consequence: 'Hybrid approach: technical coordination with participatory feedback.',
          effects: { workerControl: 15, cyberneticInfrastructure: 10, economicControl: 5, publicSupport: 10 }
        }
      ]
    },
    {
      phase: 4,
      title: 'The October Strike Looms',
      narrative: `October 1972. Truck owners announce an indefinite strike—financed by CIA through ITT channels. Without transport, food rots in fields. The opposition plans "La Marcha de las Cacerolas Vacías"—the march of the empty pots. Beer argues Cybersyn can identify alternative transport routes and coordinate emergency supply chains. But the real problem is political: shopkeepers are hoarding, creating artificial scarcity. Cybersyn sees the flows, but cannot control what is hidden in warehouses.`,
      choices: [
        {
          id: 'cybersyn_logistics',
          text: 'Use Cyberstride to reroute transport and bypass striking truckers',
          consequence: 'Demonstrate technical capability but strain system to breaking.',
          effects: { economicControl: 15, cyberneticInfrastructure: 10, publicSupport: 5, politicalPolarization: 15 }
        },
        {
          id: 'peoples_supply_committees',
          text: 'Mobilize Cordones Industriales to create people\'s supply committees',
          consequence: 'Worker power breaks the blockade but terrifies middle classes.',
          effects: { workerControl: 20, politicalPolarization: 20, usTensions: 10, publicSupport: 10 }
        },
        {
          id: 'negotiated_settlement',
          text: 'Negotiate with truckers while using Cybersyn for distribution monitoring',
          consequence: 'Reduce polarization temporarily but embolden opposition.',
          effects: { politicalPolarization: -5, usTensions: 5, economicControl: 5, workerControl: -5 }
        }
      ]
    }
  ]
};

// ════════════════════════════════════════════════════════════════
// ARC 2B: WORKERS' PATH — From Below
// ════════════════════════════════════════════════════════════════

const workersArc: ScenarioArc = {
  id: 'workers_path',
  blockPool: [1, 2, 3],
  blockPoolCount: 2,
  blocks: [
    {
      phase: 2,
      title: 'The Cordón Industrial',
      narrative: `Workers at Sumar, CAP steel, and textile factories have seized production. The Cordón Industrial de Santiago—a network of worker-controlled plants—now coordinates thousands of workers without managers. Fernando Henríquez, a Cybersyn team member, argues these cordones could be the input nodes for a participatory cybernetics. But Christian Democrats warn: "This is anarchy, not socialism." The military watches. What relationship between state and cordones?`,
      choices: [
        {
          id: 'legalize_cordones',
          text: 'Legalize cordones as permanent worker management structures',
          consequence: 'Empower workers but institutionalize dual power that threatens state authority.',
          effects: { workerControl: 20, politicalPolarization: 15, usTensions: 10, militaryTension: 10 }
        },
        {
          id: 'integrate_state',
          text: 'Integrate cordones into state planning via Cybersyn links',
          consequence: 'Preserve worker input while creating centralized visibility.',
          effects: { workerControl: 10, cyberneticInfrastructure: 10, economicControl: 10, politicalPolarization: 5 }
        },
        {
          id: 'gradual_return',
          text: 'Push for gradual return to supervised self-management with state coordinators',
          consequence: 'Reduce polarization but demobilize your base.',
          effects: { workerControl: -5, politicalPolarization: -10, publicSupport: -5, militaryTension: -5 }
        }
      ]
    },
    {
      phase: 3,
      title: 'Production vs. Politics',
      narrative: `The cordones boost production 30% above pre-seizure levels. But they're also political bases—hosting literacy campaigns, health clinics, and armed worker militias. US Ambassador Korry reports: "Chile is moving toward Soviet-style communism." The CIA increases funding to El Mercurio and truck owner associations. Meanwhile, inflation hits 140%. Workers demand price controls; shopkeepers close stores. Can production discipline survive political confrontation?`,
      choices: [
        {
          id: 'production_first',
          text: 'Prioritize production quotas over political mobilization',
          consequence: 'Keep factories running but weaken the movement\'s defensive capacity.',
          effects: { economicControl: 15, workerControl: -5, publicSupport: 5, militaryTension: -5 }
        },
        {
          id: 'dual_power',
          text: 'Expand cordones into full dual power—production and defense',
          consequence: 'Prepare for confrontation but accelerate military coup plotting.',
          effects: { workerControl: 20, militaryTension: 20, usTensions: 15, politicalPolarization: 20 }
        },
        {
          id: 'popular_assemblies',
          text: 'Create territorial popular assemblies linking cordones with neighborhood committees',
          consequence: 'Build broader base but diffuse worker power.',
          effects: { workerControl: 10, publicSupport: 15, politicalPolarization: 10, militaryTension: 10 }
        }
      ]
    },
    {
      phase: 4,
      title: 'The Mapocho Interface',
      narrative: `Stafford Beer proposes a radical adaptation: instead of telexes to state planners, route data directly to worker terminals. He calls it "the Mapocho Interface" after the river flowing through Santiago. Workers would see real-time production data, inventory levels, and bottlenecks. But the technology doesn't exist—Chile has no monitors for factory floors. You'd need to invent it. Meanwhile, the opposition trucks strike is three weeks away.`,
      choices: [
        {
          id: 'invent_interface',
          text: 'Diverge engineering resources to create worker-facing displays',
          consequence: 'Democratize cybernetics but delay full network completion.',
          effects: { workerControl: 15, cyberneticInfrastructure: 5, economicControl: 5, usTensions: 5 }
        },
        {
          id: 'focus_completion',
          text: 'Focus on completing central system first, worker interfaces later',
          consequence: 'Functional cybernetics but reproduces technocratic hierarchy.',
          effects: { cyberneticInfrastructure: 15, economicControl: 10, workerControl: -5, politicalPolarization: 5 }
        },
        {
          id: 'radio_network',
          text: 'Create participatory radio network as poor-man\'s interface',
          consequence: 'Low-tech democratic communication bypassing US tech blockade.',
          effects: { workerControl: 10, publicSupport: 10, cyberneticInfrastructure: 0, usTensions: 3 }
        }
      ]
    }
  ]
};

// ════════════════════════════════════════════════════════════════
// ARC 2C: BALANCED PATH — The Difficult Middle
// ════════════════════════════════════════════════════════════════

const balancedArc: ScenarioArc = {
  id: 'balanced_path',
  blockPool: [1, 2, 3],
  blockPoolCount: 2,
  blocks: [
    {
      phase: 2,
      title: 'Cybernetic Federalism',
      narrative: `You propose a synthesis: Chile as a "cybernetic federation." The national level uses Cyberstride for strategic coordination—copper prices, foreign exchange, major investments. But factories below 200 workers remain under direct worker control, feeding data upward voluntarily. Beer is skeptical—this violates VSM recursion. The Communist Party supports you; the MIR (Revolutionary Left Movement) calls it "reformist illusion." The opposition sees weakness to exploit.`,
      choices: [
        {
          id: 'defend_federation',
          text: 'Fight for the cybernetic federation model despite criticism from all sides',
          consequence: 'Satisfy no one completely but preserve strategic flexibility.',
          effects: { workerControl: 8, cyberneticInfrastructure: 8, politicalPolarization: 5, usTensions: 5 }
        },
        {
          id: 'lean_workers',
          text: 'Shift balance toward workers as confrontation with US intensifies',
          consequence: 'Mobilize base but alienate centrists and military moderates.',
          effects: { workerControl: 15, cyberneticInfrastructure: -3, militaryTension: 10, politicalPolarization: 10 }
        },
        {
          id: 'lean_technocrats',
          text: 'Shift balance toward technocrats to reassure middle classes and military',
          consequence: 'Reduce coup risk temporarily but demoralize your base.',
          effects: { cyberneticInfrastructure: 12, workerControl: -5, militaryTension: -5, publicSupport: -5 }
        }
      ]
    },
    {
      phase: 3,
      title: 'The Soviet Option',
      narrative: `August 1972. Soviet advisers arrive, invited by the Communist Party. They propose a different model: Gosplan-style material balances, strict central allocation, suppression of "anarcho-syndicalist" cordones. They offer hard currency credits—enough to stabilize imports for 18 months. But the condition is clear: abandon Cybersyn's participatory experiments, adopt Soviet planning methods. Allende is torn.`,
      choices: [
        {
          id: 'reject_soviet',
          text: 'Reject Soviet model—Cybersyn is the third way between capitalism and Soviet planning',
          consequence: 'Preserve autonomy but lose Soviet financial lifeline.',
          effects: { cyberneticInfrastructure: 10, workerControl: 10, economicReserves: -15, internationalSolidarity: -10 }
        },
        {
          id: 'partial_acceptance',
          text: 'Accept Soviet credits but insist on Cybersyn implementation',
          consequence: 'Gain breathing room but install Soviet advisers who undermine project.',
          effects: { economicReserves: 15, cyberneticInfrastructure: -5, workerControl: -5, usTensions: 5 }
        },
        {
          id: 'seek_alternatives',
          text: 'Decline Soviet terms, seek Swedish/Non-Aligned solidarity instead',
          consequence: 'Preserve model purity but face imminent foreign exchange crisis.',
          effects: { internationalSolidarity: 10, economicReserves: -20, cyberneticInfrastructure: 5, workerControl: 5 }
        }
      ]
    },
    {
      phase: 4,
      title: 'Black Market and the Cybersyn Dilemma',
      narrative: `Inflation hits 220%. The black market for dollars operates openly on Agustinas Street. Cybersyn tracks production accurately—factories are producing—but goods disappear into parallel markets. Shopkeepers hoard consumer goods; rumors spread of imminent coup. Beer argues the system was designed for production coordination, not distribution control. He proposes a new module: CHECO (Chilean Economy) for tracking inventory and consumption. But it requires 18 months to build. You have six.`,
      choices: [
        {
          id: 'rapid_checo',
          text: 'Crash program to build CHECO distribution tracking in 6 months',
          consequence: 'Stretch Cybersyn team to breaking point but potentially track shortages.',
          effects: { cyberneticInfrastructure: 15, economicControl: 10, publicSupport: 5, workerControl: -5 }
        },
        {
          id: 'worker_distribution_networks',
          text: 'Use cordones to create parallel distribution networks bypassing black market',
          consequence: 'Direct worker control of supply chains—highly effective, highly polarizing.',
          effects: { workerControl: 20, economicControl: 15, politicalPolarization: 20, militaryTension: 15 }
        },
        {
          id: 'price_enforcement',
          text: 'Deploy JAPs (People\'s Supply Committees) with military backing to enforce price controls',
          consequence: 'Confront shopkeepers directly but risk military insubordination.',
          effects: { economicControl: 10, militaryTension: 20, politicalPolarization: 15, publicSupport: 10 }
        }
      ]
    }
  ]
};

// ════════════════════════════════════════════════════════════════
// ARC 3: CONVERGENCE — The Crisis Deepens (All paths merge here)
// ════════════════════════════════════════════════════════════════

const convergenceArc: ScenarioArc = {
  id: 'convergence',
  blocks: [
    {
      phase: 5,
      title: 'The Fords and the Congress',
      narrative: `March 1973. The opposition wins congressional majority. They declare Allende's government "unconstitutional." CIA funds truckers for a second strike—this time indefinite. The Fords—Chile's automotive industry—stop production. Cybersyn shows supply chain collapse in real-time: no tires, no batteries, no steel. Beer writes in his diary: "We are watching the economy die in real-time, and we cannot save it." Workers seize the Fords, restart production with makeshift parts. The military watches, calculating.`,
      choices: [
        {
          id: 'support_worker_seizures',
          text: 'Fully support worker seizures—industrial insurrection is the only answer',
          consequence: 'Factories run, but military prepares final solution.',
          effects: { workerControl: 20, economicControl: 10, militaryTension: 25, politicalPolarization: 20 }
        },
        {
          id: 'negotiated_compromise',
          text: 'Seek compromise with Christian Democrats—constitutional solution to crisis',
          consequence: 'Buy time but betray the movement\'s momentum.',
          effects: { politicalPolarization: -10, militaryTension: 5, workerControl: -10, publicSupport: -5 }
        },
        {
          id: 'cybersyn_emergency',
          text: 'Use Cybersyn emergency protocols to identify critical imports and smuggling routes',
          consequence: 'Technical solution to political crisis—insufficient but buys weeks.',
          effects: { cyberneticInfrastructure: 10, economicControl: 10, usTensions: 5, workerControl: 5 }
        }
      ]
    }
  ]
};

// ════════════════════════════════════════════════════════════════
// ARC 4: THE END — September 11, 1973
// ════════════════════════════════════════════════════════════════

const endingArc: ScenarioArc = {
  id: 'ending',
  blocks: [
    {
      phase: 6,
      title: 'La Moneda, 11 de Septiembre',
      narrative: `September 11, 1973. Hawker Hunter jets streak across Santiago's sky. La Moneda palace burns. Allende's final radio address: "Placed in a historic transition, I will pay for the loyalty of the people with my life... Long live Chile! Long live the people! Long live the workers!" The Cybersyn Opsroom is ransacked—ash panels smashed, telex machines dumped in Mapocho River. Workers defend cordones with Molotovs against tanks. The coup is savage—thousands killed, tens of thousands tortured in the years to come. Pinochet tells the CIA: "We have the situation under control." But what remains of your two years?`,
      choices: [
        {
          id: 'ending_transition',
          text: 'Face the inevitable—document achievements for history',
          consequence: 'The tanks roll regardless. But what you built matters for the future.',
          effects: {}
        }
      ]
    }
  ]
};

// ════════════════════════════════════════════════════════════════
// ENDINGS — What Was Accomplished
// ════════════════════════════════════════════════════════════════

const endings: LongFormEnding[] = [
  {
    id: 'cybernetic_legacy',
    endingType: 'partial_victory',
    title: 'The Viable System Survives in Memory',
    endingNarrative: `Cybersyn was destroyed, but not forgotten. Stafford Beer's Viable System Model influenced participatory economics debates for decades. The idea of real-time worker-managed coordination—neither market nor Soviet command—resurfaced in software like Giteco (Cuba), CyberSyn legacy projects in Brazil, and modern platform cooperativism. You proved that cybernetics could serve participation, not just control. The Opsroom was only operational for months, but it demonstrated: another way was possible. The telex machines in the Mapocho could be replaced. The vision survived.`
  },
  {
    id: 'worker_power',
    endingType: 'victory',
    title: 'The Cordones: Dual Power Proven',
    endingNarrative: `The cordones fell to military violence, but not to managerial counter-revolution. For two years, workers demonstrated that self-management could outproduce hierarchy. The Cordón Industrial model influenced worker recuperations in Argentina (2001), the recovered factories movement, and Venezuela's communal councils. You showed that worker control wasn't chaos—it was the only thing keeping Chile producing against US blockade. When the tanks came, workers fought with the dignity of those who had tasted genuine power. That memory persisted through 17 years of dictatorship, seeding the return of democracy.`
  },
  {
    id: 'international_model',
    endingType: 'partial_victory',
    title: 'A Third Way for the Global South',
    endingNarrative: `Despite the coup, Project Cybersyn became a reference point for development economists seeking alternatives to IMF structural adjustment. From Kerala's participatory planning to Bolivia's 'economía comunitaria,' the Chilean experiment demonstrated that technological modernity didn't require surrendering to either Washington or Moscow. The Non-Aligned Movement studied your fusion of cybernetics and participation. In the long run, you helped decolonize the imagination of what socialist development could look like—neither Soviet autarky nor neoliberal submission.`
  },
  {
    id: 'tragic_caution',
    endingType: 'defeat',
    title: 'Too Late, Too Little',
    endingNarrative: `The coup came before Cybersyn was operational, before worker control was consolidated, before the model could prove itself. Historians debate whether faster implementation, different alliances, or armed preparation could have changed the outcome. What remains is a tragic caution: the forces of reaction—US imperialism, domestic oligarchy, military hierarchy—move faster than democratic transformation. The burning Opsroom, the drowned telexes, the murdered workers: a reminder that building the future is dangerous work, and history doesn't guarantee victory to the just. But it also doesn't erase what was attempted.`
  }
];

// ════════════════════════════════════════════════════════════════
// TREE CONSTRUCTION
// ════════════════════════════════════════════════════════════════

export function createNarrativeTree(options?: { shuffle?: boolean; seed?: number }) {
  return createArcBasedTree(
    [inceptionArc, cyberneticArc, workersArc, balancedArc, convergenceArc, endingArc],
    endings,
    () => 1, // stat-based routing handled by evaluateEnding
    { shuffleBlocks: options?.shuffle, seed: options?.seed }
  );
}
