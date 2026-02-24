/**
 * Production equations — rebalanced for multiple schools.
 *
 * Key changes:
 *  - Planning intensity boosts TFP for developing economies (extensive growth)
 *  - Industrial policy with export discipline accelerates learning
 *  - SOE productivity penalty is small and governance-dependent (not blanket)
 *  - Infrastructure spending boosts sector TFP
 *  - Structuralist synergy bonuses for coherent developmental state package
 */

import type { CountryState, SectorId } from '../state';

const SECTOR_IDS: SectorId[] = ['agriculture', 'manufacturing', 'services'];
const CAPITAL_SHARE = 0.33;

export function computeSectorOutputs(
  country: CountryState,
  planningIntensity: number = 0,
  infrastructureShare: number = 0,
  publicBankingStrength: number = 0,
  tariffRate: number = 0.1,
): Record<SectorId, number> {
  const outputs: Record<SectorId, number> = {} as Record<SectorId, number>;
  const totalEmployed = country.employed;
  if (totalEmployed <= 0) {
    for (const id of SECTOR_IDS) outputs[id] = 0;
    return outputs;
  }

  // ── Governance quality multiplier (mediates ALL state interventions) ──
  const govQuality = Math.max(0.3, Math.min(1, country.institutionQuality));

  // ── Planning TFP modifier ──
  // Moderate planning (0.2-0.5) boosts TFP in developing economies
  // Heavy planning (>0.7) reduces TFP at high complexity
  // Historical: USSR 6% growth 1928-60, then declining
  const planEffect = planningIntensity <= 0.5
    ? 1 + planningIntensity * 0.08 * govQuality  // up to +4% TFP boost
    : 1 + 0.04 * govQuality - (planningIntensity - 0.5) * 0.06; // diminishing, then penalty

  // ── Infrastructure boost ──
  // Public infrastructure raises all sectors' productivity
  const infraBoost = 1 + 0.06 * Math.min(1, infrastructureShare) * govQuality;

  // ── Public banking: fills credit gaps, counter-cyclical ──
  const creditAccess = 1 + 0.02 * Math.min(1, publicBankingStrength);

  for (const id of SECTOR_IDS) {
    const s = country.sectors[id];
    const L = s.laborShare * totalEmployed;
    const K = s.capitalStock;
    const A = s.tfp;

    // Sector-specific modifiers
    let sectorMod = 1.0;

    // Manufacturing benefits most from planning + protection (ISI)
    if (id === 'manufacturing') {
      // Tariff protection helps manufacturing grow (infant industry)
      // But ONLY effective with governance quality (export discipline proxy)
      const isiBonus = tariffRate * 0.12 * govQuality;
      sectorMod += isiBonus;
    }

    // Agriculture benefits from basic infrastructure
    if (id === 'agriculture') {
      sectorMod += infrastructureShare * 0.04;
    }

    // Services are most market-driven, least affected by planning
    if (id === 'services') {
      sectorMod *= 1 - 0.03 * Math.max(0, planningIntensity - 0.6); // light penalty only if heavy planning
    }

    const totalTFP = A * planEffect * infraBoost * creditAccess * sectorMod;
    const Y = totalTFP * Math.pow(K, CAPITAL_SHARE) * Math.pow(L, 1 - CAPITAL_SHARE);
    outputs[id] = Math.max(0, Y);
  }
  return outputs;
}

export function aggregateGdp(outputs: Record<SectorId, number>): number {
  return SECTOR_IDS.reduce((sum, id) => sum + outputs[id], 0);
}
