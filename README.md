# Macro Planner

A browser-based macroeconomic simulation game. You play as an economic planner: choose a scenario, set fiscal and monetary policy each turn, and see how your country’s economy responds.

## Stack
- **Backend**: Node.js, Express, TypeScript. Simulation engine in `backend/src/engine/`.
- **Frontend**: React, Vite, TypeScript, Zustand, Recharts.

## Export as a playable file (no server, no install)

To get a **single folder** you can double-click to play or zip and share:

1. From the project root run: **`.\export-playable.ps1`** (PowerShell).
2. Open **`Macro-Planner-Playable/index.html`** in your browser. Done.

The game runs entirely in the browser (simulation engine is bundled). Share the whole folder or zip it; anyone can open `index.html` and play.

## Get a shareable link (so others can play without opening terminals)

See **[DEPLOY.md](DEPLOY.md)** for step-by-step options:

- **Deploy online (one link for anyone):** Use [Render](https://render.com) or [Railway](https://railway.app) to host the app. You get a URL like `https://your-app.onrender.com` to share.
- **Same network (e.g. classroom):** Build the frontend, copy it into `backend/public`, run the backend, and share `http://YOUR_IP:3001` with others on the same WiFi.

## Run locally

1. **Backend**
   ```bash
   cd backend
   npm install
   npm run dev
   ```
   API: http://localhost:3001

2. **Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   App: http://localhost:5173 (proxies `/api` to backend)

3. **CLI test** (optional)
   ```bash
   cd backend && npm run cli
   ```

## Project layout
- `backend/src/engine/` – state types, equations, step logic
- `backend/src/scenarios/` – scenario definitions and initial state
- `backend/src/api/` – Express routes
- `frontend/src/pages/` – ScenarioSelect, Game
- `frontend/src/components/` – Dashboard, PolicyControls, EventsFeed
- `docs/` – tech stack, variables, equations, API contracts, roadmap

## V1 scope
Single-country, two scenarios (Emerging Debt Crisis, Stagflation), turn-based policy levers, dashboard with KPIs and chart, event feed. See `docs/ROADMAP-V1.md`.
