# Cambodia Macroeconomic Dashboard — Hosted "Ask" Version

This folder is a ready-to-deploy web app. Once hosted, anyone who opens the link
(including your Governor) can type a question in any **✦ Ask** box and get a live
answer. Your Claude API key stays hidden on the server — it is never in the file.

```
Governor_Ask_Hosted/
├─ index.html      ← the dashboard (Ask boxes call /api/ask)
├─ api/ask.js      ← serverless function that talks to Claude (holds the key)
├─ package.json
└─ README.md
```

## What you need
1. A **Claude API key** — create one at https://console.anthropic.com (Billing → add a
   small amount of credit; each question costs a fraction of a cent on Claude Haiku).
2. A free **Vercel** account — https://vercel.com (sign in with GitHub, GitLab, or email).

## Deploy in 5 steps (no coding)
1. Go to https://vercel.com/new and choose **"Deploy" → import / upload project**.
   - Easiest path: drag the whole `Governor_Ask_Hosted` folder onto the Vercel
     dashboard, **or** push it to a GitHub repo and import that repo.
2. When Vercel asks for settings, leave everything as default (it auto-detects a
   static site with a serverless `/api` function). Click **Deploy**.
3. After the first deploy, open **Project → Settings → Environment Variables** and add:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** your Claude API key (starts with `sk-ant-...`)
   - Save, then go to **Deployments → ⋯ → Redeploy** so the key takes effect.
4. Vercel gives you a URL like `https://cambodia-dashboard.vercel.app`.
   Open it and test an **Ask** box.
5. Send that URL to your Governor. Done.

## Alternative: Vercel CLI
```bash
npm i -g vercel
cd Governor_Ask_Hosted
vercel                       # first deploy (follow prompts)
vercel env add ANTHROPIC_API_KEY   # paste your key when asked
vercel --prod                # redeploy to production
```

## Notes
- **Cost & control:** every question runs on *your* API key. Usage is small, but you
  can set a monthly spend limit in the Anthropic console, and you can take the site
  down anytime from the Vercel dashboard.
- **Model:** `api/ask.js` uses `claude-haiku-4-5` (fast and low-cost). To use a stronger
  model, change the `model` field in `api/ask.js` (e.g. `claude-sonnet-5`).
- **Optional password:** if you want only the Governor to access it, add Vercel's
  password protection (Project → Settings → Deployment Protection) or tell me and I can
  add a simple access gate.
- This hosted `index.html` is otherwise identical to your dashboard; the only change is
  that the Ask boxes call `/api/ask` instead of the Cowork runtime.

## Visitor analytics (who's viewing the dashboard)
The hosted copy includes the Vercel Web Analytics snippet. To activate it:
1. Deploy this folder to Vercel (steps above).
2. In the Vercel dashboard open **Project → Analytics → Enable**.
3. From then on you'll see: number of visitors, page views, when they visited,
   country, device and referrer — updated live, free tier.
Notes: analytics are anonymous (no names); visit *duration* per person is only in
Vercel's paid "Plus" analytics. The local HTML file (Governor copy) opened from a
computer cannot be tracked — only visits to the hosted URL are counted.
