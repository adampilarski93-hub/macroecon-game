/**
 * CLI to run a few simulation steps for testing.
 */
import { createInitialState } from './scenarios/index.js';
import { step } from './engine/step.js';
import type { PolicyActions } from './engine/state.js';

const state = createInitialState('emerging-debt-crisis');
if (!state) {
  console.error('Scenario not found');
  process.exit(1);
}

console.log('Initial GDP:', state.country.gdp, 'Debt/GDP:', state.country.debtToGdp);
let s = state;
for (let i = 0; i < 3; i++) {
  const actions: PolicyActions = {
    incomeTaxRate: 0.22,
    spendingShareOfGdp: 0.26,
    policyRate: 0.07,
  };
  s = step(s, actions);
  console.log(
    `Turn ${s.turn}: GDP=${s.country.gdp.toFixed(0)} growth=${(s.country.gdpGrowth * 100).toFixed(2)}% debt/GDP=${(s.country.debtToGdp * 100).toFixed(1)}%`
  );
}
