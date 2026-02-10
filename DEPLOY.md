# How to get a shareable link (one URL, no terminals)

To let others play **Macro Planner** on laptops and phones, put the app on a host on the internet. The game runs entirely in the browser (no server required), so you can use **static hosting** for the simplest setup.

---

## Option 1: Netlify (recommended – one link, works on laptop and mobile)

No backend to run. You get a link like `https://macroecon-game.netlify.app` that works on any device.

### Steps

1. **Push your project to GitHub**  
   Create a repo and push the `macroecon-game` folder (with `frontend/` and `backend/` at the root).

2. **Deploy on Netlify**
   - Go to [netlify.com](https://netlify.com), sign up or log in.
   - Click **Add new site** → **Import an existing project**.
   - Connect **GitHub** and choose your `macroecon-game` repo.

3. **Configure the build**
   - **Base directory:** leave blank.
   - **Build command:** `cd frontend && npm install && npm run build`
   - **Publish directory:** `frontend/dist`
   - Click **Deploy site**.

4. **Share the link**  
   Netlify gives you a URL like `https://something-random.netlify.app`. You can change it under **Site settings** → **Domain management** (e.g. to `macroecon-game.netlify.app`).  
   Share that URL; anyone can open it on a laptop or phone and play.

---

## Option 2: Vercel (same idea as Netlify)

1. Go to [vercel.com](https://vercel.com), sign in with GitHub.
2. **Add New** → **Project** → import your repo.
3. Set **Root Directory** to `.` (repo root).
4. **Override** build settings:
   - **Build Command:** `cd frontend && npm install && npm run build`
   - **Output Directory:** `frontend/dist`
5. Deploy. Use the URL Vercel gives you (e.g. `https://macroecon-game.vercel.app`) as your shareable link.

---

## Option 3: Deploy on Render (full stack, optional backend)

[Render](https://render.com) can host the app for free and give you a link like `https://macroecon-game.onrender.com`.

### Steps

1. **Push your project to GitHub**  
   If it’s not already there, create a repo and push the `macroecon-game` folder.

2. **Create a Web Service on Render**
   - Go to [render.com](https://render.com), sign up (or log in).
   - Click **New** → **Web Service**.
   - Connect your GitHub account and select the repo that contains this project (the one with `backend/` and `frontend/`).

3. **Configure the service**
   - **Name:** e.g. `macroecon-game`.
   - **Root directory:** leave blank (repo root).
   - **Runtime:** Node.
   - **Build command:**  
     ```bash
     cd frontend && npm install && npm run build && cd ../backend && mkdir -p public && cp -r ../frontend/dist/* public/ && npm install && npm run build
     ```
   - **Start command:**  
     ```bash
     node backend/dist/index.js
     ```
     (Runs from the repo root after the build.)
   - **Environment:** leave empty (or add `NODE_ENV=production` if you want).

4. **Deploy**  
   Click **Create Web Service**. Render will build and run the app. When it’s done, it will show a URL like `https://macroecon-game.onrender.com`. That’s your **shareable link**.

**Note:** On the free tier the server may sleep after a while; the first open after that can take 30–60 seconds to wake up.

---

## Option 4: Deploy on Railway

1. Go to [railway.app](https://railway.app) and sign in (e.g. with GitHub).
2. **New project** → **Deploy from GitHub** → choose your repo.
3. Set **Root directory** to the repo root (where `backend` and `frontend` are).
4. **Settings** for the service:
   - **Build command:**
     ```bash
     cd frontend && npm install && npm run build && cd ../backend && mkdir -p public && cp -r ../frontend/dist/* public/ && npm install && npm run build
     ```
   - **Start command:**
     ```bash
     node backend/dist/index.js
     ```
5. Under **Variables**, add `PORT` if Railway doesn’t set it (they usually do).
6. Deploy; use the generated URL (e.g. `https://your-app.up.railway.app`) as your shareable link.

---

## Option 5: Run on your own computer (same WiFi only)

If you only want to share with people on the **same network** (e.g. classroom):

1. **Build the frontend and copy it into the backend:**
   ```bash
   cd frontend
   npm install
   npm run build
   cd ../backend
   mkdir -p public
   cp -r ../frontend/dist/* public/
   ```
   On Windows (PowerShell), use:
   ```powershell
   cd frontend; npm install; npm run build; cd ..\backend; New-Item -ItemType Directory -Force -Path public; Copy-Item -Recurse -Force ..\frontend\dist\* public\
   ```

2. **Start the backend** (it will serve the game and the API):
   ```bash
   cd backend
   npm install
   npm run build
   node dist/index.js
   ```

3. **Find your local URL**  
   The app will be at `http://localhost:3001` (or the port you set). To let others on the same WiFi open it:
   - Find your computer’s IP (e.g. Windows: `ipconfig`, Mac/Linux: `ifconfig` or `ip addr`).
   - Share: `http://YOUR_IP:3001` (e.g. `http://192.168.1.5:3001`). Others can open that link in their browser.

---

## Summary

| Goal | What to do |
|------|------------|
| **One link for anyone (laptop + mobile)** | Use **Option 1 (Netlify)** or **Option 2 (Vercel)**. No server, no cold starts. |
| **One link with optional backend** | Use **Option 3 (Render)** or **Option 4 (Railway)**. |
| **Same WiFi only (e.g. classroom)** | Use **Option 5** and share `http://YOUR_IP:3001`. |

No one needs to open a terminal: they just click the link and play.
