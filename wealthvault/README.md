# 🛡️ WealthVault — Investment Portfolio Tracker

A secure, multi-user investment portfolio app to track Mutual Funds, Stocks, Fixed Deposits, and Insurance policies.

---

## 🚀 Deploy to Vercel (Recommended — Free)

### Step 1 — Get the code on GitHub

1. Create a free account at [github.com](https://github.com)
2. Click **New Repository** → name it `wealthvault` → **Create**
3. Upload all the project files (drag & drop in the GitHub UI), or use Git:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/wealthvault.git
git push -u origin main
```

---

### Step 2 — Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **Add New → Project**
3. Select your `wealthvault` repository → click **Import**
4. Vercel auto-detects Vite — just click **Deploy**
5. Your app will be live at `https://wealthvault-xxxx.vercel.app` in ~60 seconds ✅

---

### Step 3 — Add your Anthropic API Key

This step is needed for the **Stocks & Mutual Funds → Fetch Holdings** feature.

1. Get your API key from [console.anthropic.com](https://console.anthropic.com)
2. In Vercel → Your Project → **Settings** → **Environment Variables**
3. Add:
   - **Key:** `VITE_ANTHROPIC_API_KEY`
   - **Value:** `sk-ant-api03-...` (your actual key)
4. Click **Save** → go to **Deployments** → click **Redeploy**

---

## 💻 Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Set up environment
cp .env.example .env
# Edit .env and add your Anthropic API key

# 3. Start dev server
npm run dev
# Open http://localhost:5173
```

---

## 📁 Project Structure

```
wealthvault/
├── index.html              # HTML entry point
├── vite.config.js          # Vite configuration
├── package.json            # Dependencies
├── vercel.json             # Vercel deployment config
├── .env.example            # Environment variable template
├── .gitignore
└── src/
    ├── main.jsx            # React entry point
    ├── App.jsx             # Full application (all pages)
    └── storage.js          # localStorage wrapper
```

---

## 🔐 Security & Data Storage

| Aspect | Details |
|--------|---------|
| **Authentication** | PIN-based per-user login |
| **Data storage** | Browser `localStorage` — stays on the user's device |
| **API key** | Stored as Vercel environment variable (not in code) |
| **Multi-user** | Each user's portfolio is stored under their own key |

> ⚠️ **Important:** `localStorage` is per-browser and per-device. Data does NOT sync across devices automatically. For cross-device sync, a backend database (e.g. Firebase, Supabase) would be needed.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔐 Multi-user login | PIN-protected profiles, each user's data isolated |
| 📈 Stocks & MF | Fetch live portfolio simulation via PAN using Claude AI |
| 🏦 Fixed Deposits | Manual entry with auto maturity calculation |
| 🛡️ Insurance | Track Life, Health, Term, Vehicle, ULIP policies |
| 🔔 Reminders | 3-tier alert system for premiums & maturities |
| 📊 Dashboard | Portfolio overview with allocation chart |

---

## 🛠️ Tech Stack

- **React 18** + **Vite** — fast, modern frontend
- **No backend** — fully client-side
- **localStorage** — persistent data storage
- **Anthropic Claude API** — AI-powered portfolio simulation
- **Google Fonts** — Playfair Display + DM Sans

---

## 🔮 Future Enhancements

- [ ] Real CAMS/KFintech MF API integration
- [ ] NSE/BSE live stock price feed
- [ ] Firebase/Supabase for cross-device sync
- [ ] Email/SMS reminders via serverless function
- [ ] Export portfolio as PDF
- [ ] Mobile app (React Native)

---

## 📄 License

MIT — free to use and modify for personal use.
