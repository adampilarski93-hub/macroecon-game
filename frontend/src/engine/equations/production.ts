import type { CountryState, SectorId } from '../state';

const SECTOR_IDS: SectorId[] = ['agriculture', 'manufacturing', 'services'];
const CAPITAL_SHARE = 0.33;

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
