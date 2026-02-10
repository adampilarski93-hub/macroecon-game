import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import cors from 'cors';
import api from './api/routes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', api);

// Serve built frontend when backend/public exists (so one URL can host the full game for sharing)
const publicDir = path.join(__dirname, '..', 'public');
if (fs.existsSync(publicDir)) {
  app.use(express.static(publicDir));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(publicDir, 'index.html'), (err) => {
      if (err) res.status(404).send('Not found.');
    });
  });
}

const PORT = process.env.PORT ?? 3001;
app.listen(PORT, () => {
  console.log(`Macro Planner: API and app on http://localhost:${PORT}`);
});
