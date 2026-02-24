import type { CountryState, SectorId } from '../state.js';

const SECTOR_IDS: SectorId[] = ['agriculture', 'manufacturing', 'services'];
const CAPITAL_SHARE = 0.33;

/**
 * Cobb-Douglas output per sector: Y_s = A_s * K^alpha * L^(1-alpha).
 * Uses existing sector labor shares and capital to compute output.
 */
export function computeSectorOutputs(country: CountryState): Record<SectorId, number> {
  const outputs: Record<SectorId, number> = {} as Record<SectorId, number>;
  const totalEmployed = country.employed;
  if (totalEmployed <= 0) {
    for (const id of SECTOR_IDS) outputs[id] = 0;
    return outputs;
  }
  for (const id of SECTOR_IDS) {
    const s = country.sectors[id];
    const L = s.laborShare * totalEmployed;
    const K = s.capitalStock;
    const A = s.tfp;
    const Y = A * Math.pow(K, CAPITAL_SHARE) * Math.pow(L, 1 - CAPITAL_SHARE);
    outputs[id] = Math.max(0, Y);
  }
  return outputs;
}

export function aggregateGdp(outputs: Record<SectorId, number>): number {
  return SECTOR_IDS.reduce((sum, id) => sum + outputs[id], 0);
}
