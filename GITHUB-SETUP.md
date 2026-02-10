# How to push Macro Planner to GitHub (simple steps)

Follow these in order. You only need to do the "first time" steps once.

---

## Part 1: Get a GitHub account and create a repo (on the website)

### Step 1: Sign up or log in to GitHub

1. Open your browser and go to **https://github.com**
2. If you don't have an account: click **Sign up**, choose a username, email, and password.
3. If you already have an account: click **Sign in**.

### Step 2: Create a new repository (a place for your code)

1. On GitHub, click the **+** in the top-right corner.
2. Click **New repository**.
3. Fill in:
   - **Repository name:** `macroecon-game` (or any name you like, e.g. `macro-planner`)
   - **Description:** optional, e.g. "Macroeconomic simulation game"
   - Leave **Public** selected.
   - **Do not** check "Add a README file" or "Add .gitignore" (your project already has these).
4. Click **Create repository**.

You'll see a page that says "Quick setup" and shows a URL like `https://github.com/YOUR_USERNAME/macroecon-game.git`. Keep this page open or remember your username and repo name; you'll need them in Part 2.

---

## Part 2: Install Git (only if you don't have it)

Git is the program that talks to GitHub.

1. Go to **https://git-scm.com/download/win**
2. Download **Windows** and run the installer.
3. Use the default options (just click Next).
4. When it's done, **close and reopen** Cursor (or any terminal) so it recognizes Git.

To check if Git is installed: open PowerShell and type `git --version`. If you see a version number, you're good.

---

## Part 3: Push your game from your computer to GitHub

You'll run a few commands in a terminal. Each command does one thing.

### Step 1: Open a terminal in your project folder

1. In Cursor, press **Ctrl + `** (backtick) to open the terminal, or use the menu **Terminal → New Terminal**.
2. If you're not in the right folder, type:
   ```powershell
   cd C:\Users\Adam\macroecon-game
   ```
   and press Enter.

### Step 2: Tell Git this folder is a project (first time only)

Type this and press Enter:

```powershell
git init
```

You should see: "Initialized empty Git repository...". That means Git is now tracking this folder.

### Step 3: Add all your files

Type:

```powershell
git add .
```

The dot means "everything in this folder" (Git will skip things in `.gitignore`, like `node_modules`, so you don't upload thousands of unnecessary files).

### Step 4: Save a snapshot (commit)

Type:

```powershell
git commit -m "Initial commit: Macro Planner game"
```

The part in quotes is a short message describing what you're saving. You can change it to anything you like.

### Step 5: Connect to your GitHub repo

Replace **YOUR_USERNAME** with your real GitHub username and **macroecon-game** with your repo name if you used something different:

```powershell
git remote add origin https://github.com/YOUR_USERNAME/macroecon-game.git
```

Example: if your username is `adam`, it would be:

```powershell
git remote add origin https://github.com/adam/macroecon-game.git
```

### Step 6: Push (upload) to GitHub

Type:

```powershell
git branch -M main
git push -u origin main
```

- The first line names your main branch `main`.
- The second line uploads your code to GitHub.

**If GitHub asks you to sign in:**

- It may open a browser or ask for username/password.
- **Password:** GitHub no longer accepts your normal password here. You need a **Personal Access Token**:
  1. On GitHub, click your profile picture (top right) → **Settings**.
  2. Scroll down the left sidebar and click **Developer settings**.
  3. Click **Personal access tokens** → **Tokens (classic)**.
  4. Click **Generate new token (classic)**. Give it a name (e.g. "Cursor") and check the box **repo**.
  5. Click **Generate token**. **Copy the token** (you won't see it again).
  6. When the terminal asks for a password, **paste the token** (not your GitHub password).

After `git push` finishes, you should see something like "Branch 'main' set up to track remote branch 'main'."

### Step 7: Check that it worked

1. Go to **https://github.com** in your browser.
2. Click your profile picture → **Your repositories**.
3. Click **macroecon-game** (or whatever you named it).
4. You should see your folders: `backend`, `frontend`, `docs`, etc. Your game is now on GitHub.

---

## Later: when you change the game and want to update GitHub

After you edit the game, run these three commands from the project folder:

```powershell
git add .
git commit -m "Describe what you changed"
git push
```

Use a short description instead of "Describe what you changed", e.g. "Add new scenario" or "Fix tax display".

---

## Quick reference

| What you want to do | Command |
|---------------------|--------|
| Go to project folder | `cd C:\Users\Adam\macroecon-game` |
| First-time setup (in project folder) | `git init` then `git add .` then `git commit -m "Initial commit"` then `git remote add origin https://github.com/YOUR_USERNAME/macroecon-game.git` then `git branch -M main` then `git push -u origin main` |
| Update GitHub after changes | `git add .` then `git commit -m "Your message"` then `git push` |
