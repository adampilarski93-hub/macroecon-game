# Macro Planner — EconAgents Integration Plan

## Executive Summary

This document outlines how to integrate the [econagents](https://econagents.readthedocs.io/) Python library into Macro Planner to add LLM-powered economic actors with heterodox behaviors (Post-Keynesian, Marxian, Institutional). The integration introduces a Python microservice that runs econagents agents, communicating with the existing Node.js backend via WebSocket and REST.

---

## 1. Project Goals

| Goal | Description |
|------|-------------|
| **LLM economic actors** | Replace or augment the current browser-side LLM calls with econagents-managed agents that have persistent personas |
| **Heterodox behaviors** | Post-Keynesian (effective demand), Marxian (class/exploitation), Institutional (norms/power) decision-making |
| **Event-driven state** | Agents receive game state updates via events and respond with policy recommendations or advisory text |
| **Reusable prompts** | Jinja templates for agent prompts, aligned with the existing `economic-thinkers` skill |

---

## 2. Current Architecture (Baseline)

```
┌─────────────────┐     REST /api/*      ┌─────────────────────┐
│  React Frontend │ ◄──────────────────► │  Node.js Express    │
│  (Vite, Zustand)│                      │  backend            │
│                 │                      │  - /start-simulation │
│  - llm.ts       │  fetch() to OpenAI   │  - /step            │
│  (direct API)   │  (advisory, chat,    │  - /scenarios       │
│                 │   auto-play)          │  - sessions Map     │
└─────────────────┘                      └─────────────────────┘
         │                                         │
         │                                         │ step()
         ▼                                         ▼
   OpenAI-compatible API                  backend/src/engine/
   (apiKey in localStorage)               - step.ts
                                          - state.ts
                                          - equations/*
```

**Relevant files:**
- `frontend/src/services/llm.ts` — advisory, chat, auto-play, post-game analysis
- `backend/src/engine/step.ts` — simulation step logic
- `backend/src/engine/state.ts` — `SimulationState`, `PolicyActions`
- `.cursor/skills/economic-thinkers/SKILL.md` — heterodox thinker mappings

---

## 3. Target Architecture (With EconAgents)

```
┌─────────────────┐     REST /api/*      ┌─────────────────────┐
│  React Frontend │ ◄──────────────────► │  Node.js Express    │
│                 │                      │  (unchanged)        │
│  - Game UI      │                      │  - sessions        │
│  - Policy form  │                      │  - step() engine   │
└────────┬────────┘                      └─────────┬───────────┘
         │                                          │
         │ WebSocket (optional)                     │ REST or WS
         │ or REST proxy                            │
         ▼                                          ▼
┌─────────────────────────────────────────────────────────────────┐
│  Python EconAgents Service (new)                                │
│  - WebSocket server (econagents protocol)                       │
│  - AgentManager + AgentRole (Post-Keynesian, Marxian, etc.)     │
│  - Jinja templates for prompts                                  │
│  - Event handlers: state_update, policy_request, chat           │
└─────────────────────────────────────────────────────────────────┘
         │
         ▼
   LLM API (OpenAI, Ollama, etc.)
```

**Design choice:** The Node backend remains the source of truth for simulation state. The Python service runs econagents agents that:
1. Receive state snapshots (via REST or WebSocket)
2. Generate policy recommendations or advisory text
3. Return structured responses (JSON policy or natural language)

---

## 4. Technical Requirements

### 4.1 Python Service

| Requirement | Implementation |
|-------------|----------------|
| **Runtime** | Python 3.10+ |
| **Package** | `pip install econagents` |
| **Server** | FastAPI or Flask-SocketIO for WebSocket; or REST-only with FastAPI |
| **Templates** | Jinja2 for agent prompts |
| **State** | Stateless; receives state from Node on each request |

### 4.2 Communication Protocol

**Option A: REST (simpler)**  
Node backend calls Python service via HTTP:

```
POST /agent/advisory
Body: { sessionId, state: SimulationState }
Response: { text: string, persona?: string }

POST /agent/policy
Body: { sessionId, state: SimulationState, persona: "post_keynesian" | "marxian" | "institutional" }
Response: { actions: PolicyActions }
```

**Option B: WebSocket (econagents-native)**  
Python runs a WebSocket server that speaks the econagents protocol. Node would need to implement a client that sends events (state_update, request_policy) and receives agent responses. This aligns with econagents’ design but requires more plumbing.

**Recommendation:** Start with **REST** for advisory and policy endpoints. Add WebSocket later if we want real-time streaming or multi-agent experiments.

### 4.3 Event-Driven State (econagents-style)

Even with REST, we can structure the payload as “events”:

```json
{
  "event": "state_update",
  "turn": 5,
  "state": {
    "country": { "gdp": 1200, "inflationRate": 0.04, ... },
    "global": { "worldGrowth": 0.02, "sanctionsActive": false },
    "scenario": { "scenarioId": "emerging-debt-crisis", ... },
    "events": [...]
  }
}
```

The Python service maps this to econagents’ `GameState` and triggers the appropriate agent phase (e.g. `policy_request`).

---

## 5. Heterodox Agent Personas

### 5.1 Persona Definitions (Jinja Templates)

| Persona | School | Key Behaviors | Thinkers (from economic-thinkers skill) |
|---------|--------|---------------|----------------------------------------|
| **Post-Keynesian** | Effective demand, uncertainty | Prioritize employment; fiscal stimulus in downturns; incomes policy for inflation; skeptical of “natural rate” | Kalecki, Minsky, Hudson |
| **Marxian** | Class, exploitation, value | Focus on surplus extraction, labor share; favor planning, public banking, debt restructuring; delinking in periphery | Amin, Marini, Emmanuel, Lenin, Bukharin |
| **Institutional** | Norms, power, embeddedness | Social protections, Polanyi’s double movement; regulation of fictitious commodities; path dependence | Polanyi, Desai, institutionalists |

### 5.2 Example Jinja Prompt (Post-Keynesian)

```jinja
{# templates/agents/post_keynesian_policy.j2 #}
You are a Post-Keynesian economic advisor. You believe:
- Effective demand drives output; supply does not create its own demand.
- Uncertainty is fundamental; agents cannot optimize over known probabilities.
- Full employment is a policy choice, not a "natural" equilibrium.
- In cost-push inflation, raising interest rates causes unemployment without fixing prices.

Current state:
- GDP: {{ state.country.gdp | round(0) }}, Growth: {{ (state.country.gdpGrowth * 100) | round(2) }}%
- Inflation: {{ (state.country.inflationRate * 100) | round(1) }}%, Unemployment: {{ (state.country.unemploymentRate * 100) | round(1) }}%
- Debt/GDP: {{ (state.country.debtToGdp * 100) | round(1) }}%, Approval: {{ (state.country.approval * 100) | round(0) }}%

Given this state, recommend policy actions as JSON. Prioritize employment and demand. Use incomes policy for inflation, not rate hikes alone.
```

### 5.3 Example Jinja Prompt (Marxian)

```jinja
{# templates/agents/marxian_policy.j2 #}
You are a Marxian economic advisor. You believe:
- Value is created by labor; capital extracts surplus.
- Class relations and imperialism shape trade and debt.
- Planning and public ownership can direct surplus toward development.
- Debt restructuring and delinking are legitimate tools for peripheral countries.

Current state: [same variables as above]

Scenario: {{ state.scenario.scenarioId }}

Recommend policy. Consider: Who benefits from current trade? Is debt domestic or foreign? Would planning, public banking, or capital controls serve the working population?
```

---

## 6. Implementation Phases

### Phase 1: Python Service Skeleton (1–2 days)

1. Create `econagents-service/` directory:
   - `requirements.txt`: econagents, fastapi, uvicorn, jinja2
   - `main.py`: FastAPI app with `/health` and `/agent/advisory`
2. Define `SimulationState` schema (Pydantic) matching Node’s state shape.
3. Implement a single agent (e.g. Post-Keynesian) that returns template-based advisory text (no LLM yet).
4. Add `docker-compose` or `README` instructions for running the service.

### Phase 2: EconAgents Integration (2–3 days)

1. Wire econagents `AgentRole` + `AgentManager` to FastAPI.
2. Create Jinja templates for each persona (post_keynesian, marxian, institutional).
3. Add `/agent/policy` endpoint returning `PolicyActions` JSON.
4. Configure LLM backend (OpenAI, Ollama) via env vars.
5. Node backend: optional proxy route `/api/agent/*` → Python service, or call Python directly from a new `agentService` module.

### Phase 3: Frontend Integration (1–2 days)

1. Add “Advisor persona” selector in Settings: Post-Keynesian, Marxian, Institutional, Mixed.
2. When LLM is enabled, route advisory/chat requests to Python service (or keep browser direct for backward compatibility).
3. Auto-play: optionally use persona-specific policy from Python instead of generic LLM in `llm.ts`.

### Phase 4: Event-Driven & WebSocket (Optional)

1. Implement WebSocket server in Python using econagents’ `WebSocketTransport`.
2. Node backend opens WebSocket to Python on simulation start; streams state on each step.
3. Enables streaming advisory, multi-agent experiments, or future “AI opponents” (e.g. AI central bank, AI IMF).

---

## 7. File Structure (Proposed)

```
macroecon-game/
├── backend/                 # existing Node.js
├── frontend/                 # existing React
├── econagents-service/      # NEW
│   ├── requirements.txt
│   ├── main.py              # FastAPI app
│   ├── agents/
│   │   ├── __init__.py
│   │   ├── roles.py         # AgentRole definitions
│   │   └── manager.py       # AgentManager setup
│   ├── templates/
│   │   └── agents/
│   │       ├── post_keynesian_policy.j2
│   │       ├── marxian_policy.j2
│   │       └── institutional_policy.j2
│   └── schemas/
│       └── state.py         # Pydantic models for SimulationState
├── docs/
│   └── ECONAGENTS-INTEGRATION-PLAN.md  # this file
└── docker-compose.yml       # optional: Node + Python
```

---

## 8. Compatibility With Existing Features

| Feature | Current | With EconAgents |
|---------|---------|-----------------|
| **Advisory** | `llm.ts` → OpenAI | Python agent with persona; fallback to `templateAdvisorChat` if Python down |
| **Chat** | `chatWithAdvisor` in llm.ts | Can route to Python agent; keep template fallback |
| **Auto-play** | `generateAutoPlayActions` in llm.ts | Optional: use Python `/agent/policy` with selected persona |
| **Post-game analysis** | `generatePostGameAnalysis` | Can stay in llm.ts or move to Python |
| **Offline / no API key** | Template responses | Unchanged; Python only used when configured |

---

## 9. Dependencies & Environment

**Python (econagents-service):**
```
econagents>=0.0.10
fastapi>=0.100.0
uvicorn>=0.22.0
jinja2>=3.1.0
pydantic>=2.0
```

**Environment variables:**
- `OPENAI_API_KEY` (or equivalent for LLM)
- `ECONAGENTS_SERVICE_URL` (Node backend uses this to call Python; default `http://localhost:8000`)

---

## 10. References

- [econagents docs](https://econagents.readthedocs.io/)
- [econagents cookbook](https://github.com/iwanalabs/econagents-cookbook)
- [EconAgent paper (arXiv)](https://arxiv.org/abs/2310.10436)
- Macro Planner: `.cursor/skills/economic-thinkers/SKILL.md`, `frontend/src/services/llm.ts`
