import type { DecisionBlock, LongFormEnding } from '../long-form-tree';
import { createLongFormTree } from '../long-form-tree';

/**
 * Targeted Poverty Alleviation — CPC Village Secretary in Rural China
 *
 * Based on China's "精准扶贫" (Targeted Poverty Alleviation) campaign 2013-2020
 * Real mechanisms: household registration surveys, five guarantees, relocation,
 * education subsidies, healthcare access, e-commerce for agricultural products,
 * village industry development (农业合作社), cadre deployment (驻村第一书记)
 *
 * Player serves as 驻村第一书记 (First Secretary stationed in village) in
 * a mountainous region of Guizhou or Gansu province. Tasked with lifting all
 * households above the poverty line (2300 yuan/person/year, adjusted) by 2020.
 */

const blocks: DecisionBlock[] = [
  {
    phase: 1,
    title: 'Arrival in the Village',
    narrative: `You arrive as 驻村第一书记 (First Secretary) in Dawan Village, a remote settlement of 187 households clinging to karst mountainsides in Guizhou Province. The poverty rate is 34%. Per capita income: 1,800 yuan—below the 2,300 national line. Young people have fled to Guangdong factories. Those left behind are elderly, sick, or caring for left-behind children. Your predecessor failed; he treated poverty like a statistic. The county Party committee expects "concrete results" within 18 months. You have 230,000 yuan in targeted funds and a mandate: leave no one behind.`,
    choices: [
      {
        id: 'household_surveys',
        text: 'Conduct exhaustive household-by-household surveys to identify root causes',
        consequence: 'Build granular database of each family\'s specific constraints—illness, education, land quality, labor capacity.',
        effects: { dataAccuracy: 15, trustBuilding: 10, timeInvestment: -5, countyApproval: 5 }
      },
      {
        id: 'quick_infrastructure',
        text: 'Fast-track road and electricity projects to connect village to markets',
        consequence: 'Immediate visibility but risk mismatch between infrastructure and actual productive capacity.',
        effects: { infrastructure: 15, countyApproval: 10, dataAccuracy: -5, sustainability: -5 }
      },
      {
        id: 'village_assembly',
        text: 'Hold village assembly to let residents define their own priorities',
        consequence: 'Builds trust and local ownership but slows initial progress reporting to county.',
        effects: { trustBuilding: 20, participation: 15, countyApproval: -5, dataAccuracy: 5 }
      }
    ]
  },
  {
    phase: 2,
    title: 'The Five Guarantees vs. Productive Investment',
    narrative: `County inspectors arrive. They want to see "人的脱贫" (people lifted from poverty), not just numbers. The Five Guarantees system guarantees food, clothing, housing, medical care, and funeral expenses for those unable to work—the "bottom guarantee." But your funds are limited. Each household permanently supported costs 12,000 yuan/year. Productive investments—greenhouses, livestock, skills training—cost more upfront but could break dependency. Meanwhile, three households are headed by disabled elderly with no labor capacity. The county secretary hints: "Visible results matter for your evaluation."`,
    choices: [
      {
        id: 'full_guarantees',
        text: 'Allocate maximum funds to Five Guarantees for most vulnerable households',
        consequence: 'Immediate human security but creates dependency trap and depletes productive capital.',
        effects: { humanSecurity: 20, dependencyRisk: 15, countyApproval: 10, sustainability: -10, fundsRemaining: -25 }
      },
      {
        id: 'production_priority',
        text: 'Prioritize productive investments; advocate for county welfare bureau to handle the guaranteed households',
        consequence: 'Potential for sustainable exit from poverty but abandons most vulnerable temporarily.',
        effects: { sustainability: 15, humanSecurity: -10, countyApproval: -5, dependencyRisk: -10, fundsRemaining: -5 }
      },
      {
        id: 'hybrid_targeted',
        text: 'Strict targeting: guarantees for those unable to work, production for those able',
        consequence: 'Administratively complex but morally and economically coherent.',
        effects: { dataAccuracy: 10, sustainability: 10, humanSecurity: 10, countyApproval: 5, fundsRemaining: -15 }
      }
    ]
  },
  {
    phase: 3,
    title: 'Relocation or Retention?',
    narrative: `Sixty-three households live in areas classified "unsuitable for human habitation"—cliffside homes with no road access, no water, constant landslide risk. The "易地扶贫搬迁" (poverty alleviation through relocation) policy offers new apartments in county towns, 40 kilometers away. But relocation severs connection to ancestral graves, communal ties, and the hillside plots families have cultivated for generations. Some elderly refuse to move. Younger families want urban schools but fear unemployment in towns. The relocation budget: 60,000 yuan per household. But scattered settlement makes infrastructure provision to original sites impossible.`,
    choices: [
      {
        id: 'aggressive_relocation',
        text: 'Maximize relocation: convince or compel all 63 households to move to county town',
        consequence: 'Efficient infrastructure delivery but cultural rupture and risk of urban unemployment.',
        effects: { infrastructure: 20, humanSecurity: 10, culturalRupture: 20, sustainability: 5, countyApproval: 15, fundsRemaining: -30 }
      },
      {
        id: 'voluntary_only',
        text: 'Strictly voluntary relocation with extensive pre-job training and guaranteed employment',
        consequence: 'Respects autonomy but slower results; some remain in dangerous conditions.',
        effects: { trustBuilding: 15, humanSecurity: 5, sustainability: 10, culturalRupture: -5, countyApproval: -10, fundsRemaining: -20 }
      },
      {
        id: 'micro_relocation',
        text: 'Micro-relocation within village: consolidate scattered households to accessible clusters',
        consequence: 'Preserves community while improving infrastructure feasibility.',
        effects: { infrastructure: 10, culturalRupture: 5, trustBuilding: 10, countyApproval: 5, fundsRemaining: -15 }
      }
    ]
  },
  {
    phase: 4,
    title: 'E-Commerce and the Cooperative Question',
    narrative: `The surveys reveal surprising assets: 400 mu of terraced land suitable for premium peppers and honey. But middlemen pay 2 yuan/kilo for what sells for 15 in Shenzhen. " Rural e-commerce" (农村电商) offers direct-to-consumer channels through Taobao Village platforms. But setting up requires packaging facilities, cold chain logistics, quality certification, and digital literacy training for farmers who have never used smartphones. Meanwhile, some households want individual contracts with processors; others demand a village cooperative (农业合作社) to aggregate bargaining power. The county supports cooperatives—they look organized. But cooperatives require management capacity the village lacks.`,
    choices: [
      {
        id: 'state_cooperative',
        text: 'Establish village agricultural cooperative with Party committee oversight',
        consequence: 'Collective bargaining power but risk of bureaucratic inefficiency and elite capture.',
        effects: { collectivePower: 15, countyApproval: 10, participation: -5, efficiency: -5, fundsRemaining: -10 }
      },
      {
        id: 'individual_contracts',
        text: 'Support individual household contracts with e-commerce platforms',
        consequence: 'Entrepreneurial flexibility but weak bargaining position and uneven digital capacity.',
        effects: { efficiency: 10, participation: 5, collectivePower: -10, sustainability: 5, fundsRemaining: -5 }
      },
      {
        id: 'hybrid_model',
        text: 'Cooperative for processing/logistics, individual contracts for production',
        consequence: 'Combines collective infrastructure with individual incentive.',
        effects: { collectivePower: 10, efficiency: 10, participation: 10, sustainability: 10, fundsRemaining: -15 }
      }
    ]
  },
  {
    phase: 5,
    title: 'The Education Gambit',
    narrative: `Seventeen children in the village have dropped out after lower middle school—standard in rural China where vocational tracks diverge from academic. But you discover three with exceptional scores who want to attend high school in the county seat. The cost: 3,500 yuan/year per student for boarding, plus lost household labor. One family\'s daughter scored high enough for the county key high school—first ever from this village. But her parents need her to care for her disabled grandfather. The county Party secretary reminds you: "Education poverty alleviation" (教育扶贫) counts double in evaluations—a graduate means permanent exit from poverty for that lineage. But immediate income matters more to struggling families.`,
    choices: [
      {
        id: 'full_education_support',
        text: 'Comprehensive scholarships and living stipends for all continuing students',
        consequence: 'Long-term human capital investment but strains immediate relief funds.',
        effects: { humanCapital: 20, trustBuilding: 15, fundsRemaining: -20, countyApproval: 10, shortTermIncome: -10 }
      },
      {
        id: 'targeted_excellence',
        text: 'Support only the highest performers; redirect others to vocational training',
        consequence: 'Efficient allocation but creates visible inequalities within village.',
        effects: { humanCapital: 10, efficiency: 10, trustBuilding: -10, fundsRemaining: -10, countyApproval: 5 }
      },
      {
        id: 'compensatory_labor',
        text: 'Education support paired with public works employment for families losing child labor',
        consequence: 'Addresses both opportunity and immediate income needs.',
        effects: { humanCapital: 15, shortTermIncome: 10, trustBuilding: 10, fundsRemaining: -15, sustainability: 5 }
      }
    ]
  },
  {
    phase: 6,
    title: 'Exit Evaluation',
    narrative: `December 2020. The county inspection team arrives for final poverty exit evaluation. The standards are rigorous: per capita income above 4,000 yuan (adjusted), no worry about food or clothing, compulsory education guaranteed, basic medical care accessible, safe housing secured. Your village reports: 182 households above line, 5 households "consigned to social security" (兜底保障) for those unable to work. But the team finds one household backslid—a medical emergency wiped out gains. Another inspection methodologically disputes your income calculations. The county secretary calls: neighboring villages had 100% exit rates.`,
    choices: [
      {
        id: 'strict_accuracy',
        text: 'Insist on strict accuracy: report the one household as not exited, demand re-support',
        consequence: 'Honest but politically costly; your "success rate" drops below 100%.',
        effects: { dataAccuracy: 20, integrity: 15, countyApproval: -15, humanSecurity: 10, sustainability: 10 }
      },
      {
        id: 'adjustment_margin',
        text: 'Use "adjustment margin"—allocate emergency funds to push borderline household above line',
        consequence: "Meets political target but fudges the 'no worry' requirement.",
        effects: { countyApproval: 15, dataAccuracy: -10, integrity: -10, sustainability: -5 }
      },
      {
        id: 'comprehensive_recheck',
        text: 'Request comprehensive recheck of all 187 households to ensure genuine exit',
        consequence: 'Comprehensive validation but delays achievement announcement and risks finding more problems.',
        effects: { dataAccuracy: 15, integrity: 10, trustBuilding: 10, countyApproval: -5, sustainability: 5 }
      }
    ]
  }
];

const endings: LongFormEnding[] = [
  {
    id: 'model_village',
    endingType: 'victory',
    title: 'Model Village: Beyond the Line',
    endingNarrative: `Dawan Village achieved what seemed impossible. By 2020, per capita income reached 6,800 yuan—nearly triple the poverty line. The hybrid cooperative model became a county demonstration site; neighboring villages sent study teams. Three students you supported entered university—the first generation to achieve permanent educational mobility. The e-commerce channel you established continued operating, selling peppers to Guangdong and Shanghai. But the deeper achievement was institutional: the household survey system you built became the village\'s ongoing monitoring mechanism. When a landslide destroyed three homes in 2021, the system immediately identified affected families and triggered rapid response. "Targeted" poverty alleviation became sustainable development. Your approach was written up in the provincial Party journal—not because it met targets, but because it built capacity that outlasted your tenure. The village still faces challenges: aging population, youth outmigration, climate pressures on agriculture. But the days of "poverty as fate" ended. You proved that even in the most remote terrain, systematic diagnosis plus genuine participation could achieve what mass campaigns could not.`
  },
  {
    id: 'statistical_success',
    endingType: 'partial_victory',
    title: 'Targets Met, Questions Remain',
    endingNarrative: `Dawan Village officially exited poverty on schedule. County records show 100% of registered poor households above the income line. The infrastructure is visible: new roads, electrification, a village clinic with basic equipment. But you know the compromises made. The household that backslid after medical emergency received a "special case" designation that technically excludes them from the exit count. Three relocated elderly returned to their mountain plots within six months, unable to adapt to apartment life, creating "poverty relocation reversal"—unmeasured. The cooperative you established limps along, controlled by the village Party branch secretary who treats it as personal fief. Most critically, the exit was funded by massive fiscal transfer—230,000 yuan for 187 households. Without your presence, will the village generate sufficient internal resources? The poverty line was crossed. But "no worry about food and clothing"—the spirit of the guarantee—remains fragile for some. You met the political target. Whether you built sustainable prosperity depends on whether the next secretary maintains the systems you created. The national campaign succeeded at scale; your village contributed to that success, with all its imperfections.`
  },
  {
    id: 'tragic_gap',
    endingType: 'defeat',
    title: 'Persistent Poverty: The Limits of Intervention',
    endingNarrative: `Despite your efforts, Dawan Village did not achieve full poverty exit by 2020. The county inspection found income calculation errors, three households still below the line, and the cooperative defunct due to mismanagement. You were rotated back to county office with a "needs improvement" evaluation—a career setback in the Party system. But the failure illuminates real structural constraints. The village\'s remoteness made logistics costs absorb any productivity gains. The elderly population lacked labor capacity for productive investment to matter. Youth outmigration meant the "future" of the village—those who might benefit from education support—had already left. Your predecessor\'s neglect left too little time for institution-building. Most fundamentally, China\'s poverty line (2,300 yuan, adjusted regionally) measures income but not security. Households near the line remain vulnerable to medical emergencies, climate events, market fluctuations. Your experience was not unique: even during the national campaign, some villages proved intractable. The Party\'s response was continued support through "consignment to social security"—acknowledgment that market-based development reaches limits. Your tenure demonstrated that poverty alleviation requires not just good intentions and funds, but time, local trust, functional markets, and sometimes geographic relocation that families resist. The campaign succeeded overall; your village was among the hardest cases that exposed the policy\'s boundaries.`
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
