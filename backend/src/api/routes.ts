import { Router } from 'express';
import { randomUUID } from 'crypto';
import { createInitialState } from '../scenarios/index.js';
import { step } from '../engine/step.js';
import { getAdvisory } from '../engine/advisor.js';
import type { SimulationState, PolicyActions } from '../engine/state.js';
import { scenarios } from '../scenarios/index.js';

const router = Router();

const sessions = new Map<string, SimulationState>();

router.post('/start-simulation', (req, res) => {
  const { scenarioId } = req.body ?? {};
  if (!scenarioId || typeof scenarioId !== 'string') {
    res.status(400).json({ error: 'scenarioId required' });
    return;
  }
  const state = createInitialState(scenarioId);
  if (!state) {
    res.status(400).json({ error: 'Unknown scenarioId' });
    return;
  }
  const sessionId = randomUUID();
  sessions.set(sessionId, state);
  res.json({ sessionId, state });
});

router.post('/step', (req, res) => {
  const { sessionId, turnIndex, actions } = req.body ?? {};
  if (!sessionId) {
    res.status(400).json({ error: 'sessionId required' });
    return;
  }
  const state = sessions.get(sessionId);
  if (!state) {
    res.status(400).json({ error: 'Session not found' });
    return;
  }
  if (typeof turnIndex !== 'number' || state.turn !== turnIndex) {
    res.status(409).json({ error: 'Turn index mismatch', expectedTurn: state.turn });
    return;
  }
  const nextState = step(state, (actions ?? {}) as PolicyActions);
  sessions.set(sessionId, nextState);
  const advisory = getAdvisory(nextState);
  res.json({ state: nextState, advisory });
});

router.get('/scenarios', (_req, res) => {
  res.json({
    scenarios: scenarios.map((s) => ({
      id: s.id,
      name: s.name,
      description: s.description,
      difficulty: s.difficulty,
    })),
  });
});

export default router;
