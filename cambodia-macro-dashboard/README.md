# Cambodia Macroeconomic Dashboard — deploy repo

This is the **deployment repository** for https://cambodia-macro-dashboard.vercel.app/

It is intentionally **separate** from the `Data Management` (Google Drive) data folder,
so that Git activity never conflicts with Drive sync. It contains only what Vercel serves:

```
cambodia-macro-dashboard/
├── index.html        <- the built dashboard (replace this on each update)
├── api/
│   ├── ask.js        <- serverless function: "Ask" proxy to the Claude API
│   └── track.js      <- serverless function: usage tracking
├── package.json
├── .gitignore
└── README.md
```

> Put this folder somewhere OUTSIDE Google Drive (e.g. `~/Documents/cambodia-macro-dashboard`).

---

## One-time setup (do this once)

### 1. Create the GitHub repo
- On GitHub (signed in with the account you want), create a new **empty** repository
  named e.g. `cambodia-macro-dashboard` (no README, no .gitignore — this folder already has them).

### 2. Push this folder to it
From inside this folder:
```bash
git init
git add .
git commit -m "Initial dashboard deploy"
git branch -M main
git remote add origin https://github.com/<your-username>/cambodia-macro-dashboard.git
git push -u origin main
```

### 3. Connect the repo to your EXISTING Vercel project (this keeps the URL)
Do **not** create a new Vercel project — connect the repo to the current one so
`cambodia-macro-dashboard.vercel.app` is preserved:

1. Open the project on Vercel → **Settings → Git**.
2. Click **Connect Git Repository** and choose the GitHub repo you just pushed.
   (Authorize "Vercel for GitHub" if prompted. You must be the repo owner.)
3. Set **Production Branch** to `main`.
4. Leave **Root Directory** as `./` (index.html is at the repo root).
5. Framework preset: **Other** (this is a static site + serverless `api/` functions —
   no build step needed).

### 4. Confirm the Ask feature's secret is set
The `api/ask.js` function needs a server-side key. In **Settings → Environment Variables**,
make sure `ANTHROPIC_API_KEY` exists (Production). If you're connecting to the existing
project, it should already be there — just verify. Never put this key in the repo.

### 5. First deploy
Connecting the repo triggers a deployment automatically. Confirm the site loads at
`https://cambodia-macro-dashboard.vercel.app/` and that "Ask" works.

---

## Every time you update the dashboard

After you rebuild the dashboard in the Data Management folder
(`python3 dashboard_builder/update_dashboard.py`), it writes a fresh
`Governor_Ask_Hosted/index.html`. Publish it like this:

1. **Copy the new `index.html`** from `Data Management/Governor_Ask_Hosted/index.html`
   into this repo folder, replacing the old one. (Only copy `api/` files too if they changed.)
2. **Commit and push:**
   ```bash
   git add index.html
   git commit -m "Update dashboard YYYY-MM-DD"
   git push
   ```
3. Vercel auto-deploys within a minute. The URL stays the same.

That's the whole workflow: **rebuild → copy index.html → push.**

### Optional helper (macOS)
`publish.command` (included) copies the latest `index.html` from your Drive folder and
pushes in one double-click. Open it once in a text editor and set `DRIVE_HOSTED` to your
machine's path to `Data Management/Governor_Ask_Hosted`, then make it executable:
`chmod +x publish.command`.

---

## Rollback
If a deploy looks wrong: Vercel dashboard → **Deployments** → pick a previous good one →
**Promote to Production**. The URL switches back instantly.

## Notes
- **Don't deploy the whole `Data Management` folder** — only this repo (index.html + api/).
- `node_modules/` is git-ignored; Vercel installs anything it needs on its side.
- GitHub account/email and Vercel account are independent — you did not need to change your
  Vercel login to deploy from GitHub.
