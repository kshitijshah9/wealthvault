import { useState, useEffect } from "react";
import { storage } from "./storage.js";

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const STORAGE_KEY = "wv_users";

const DEMO_USERS = [
  { id: "u1", name: "Rajesh Sharma", pin: "1234", pan: "ABCPS1234R", avatar: "RS" },
  { id: "u2", name: "Priya Mehta",   pin: "5678", pan: "DEFPM5678K", avatar: "PM" },
];

// ─── ICONS ────────────────────────────────────────────────────────────────────
const Icon = ({ name, size = 20 }) => {
  const icons = {
    dashboard: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
    stocks:    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="22,7 13.5,15.5 8.5,10.5 2,17"/><polyline points="16,7 22,7 22,13"/></svg>,
    fd:        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>,
    insurance: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    plus:      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    bell:      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
    logout:    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16,17 21,12 16,7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
    edit:      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
    trash:     <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="3,6 5,6 21,6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
    search:    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    lock:      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
    refresh:   <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="23,4 23,10 17,10"/><polyline points="1,20 1,14 7,14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>,
    x:         <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    info:      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
    calendar:  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    warn:      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
    key:       <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>,
  };
  return icons[name] || null;
};

// ─── UTILITIES ────────────────────────────────────────────────────────────────
const fmt     = (n) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
const fmtDate = (d) => d ? new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—";
const daysDiff = (d) => Math.ceil((new Date(d) - new Date()) / 86400000);
const uid     = () => Math.random().toString(36).slice(2, 10);

// ─── STORAGE HELPERS ──────────────────────────────────────────────────────────
async function loadUsers() {
  try { const r = await storage.get(STORAGE_KEY); return r ? JSON.parse(r.value) : DEMO_USERS; }
  catch { return DEMO_USERS; }
}
async function saveUsers(users) {
  try { await storage.set(STORAGE_KEY, JSON.stringify(users)); } catch {}
}
async function loadPortfolio(userId) {
  try { const r = await storage.get(`portfolio_${userId}`); return r ? JSON.parse(r.value) : { fds: [], insurances: [], investments: [] }; }
  catch { return { fds: [], insurances: [], investments: [] }; }
}
async function savePortfolio(userId, data) {
  try { await storage.set(`portfolio_${userId}`, JSON.stringify(data)); } catch {}
}

// ─── ANTHROPIC API ────────────────────────────────────────────────────────────
// API key comes from .env  →  VITE_ANTHROPIC_API_KEY=sk-ant-...
// Set this in Vercel dashboard: Settings → Environment Variables
const ANTHROPIC_API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY || "";

async function fetchInvestmentsFromPAN(pan) {
  if (!ANTHROPIC_API_KEY) throw new Error("NO_KEY");
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
      // NOTE: For production, move this call to a backend/serverless function
      // to avoid exposing your API key in the browser bundle.
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{
        role: "user",
        content: `Generate realistic Indian investment portfolio data for PAN: ${pan}. Return ONLY valid JSON, no markdown:
{
  "mutualFunds": [
    {"name":"Fund Name","folio":"FOLIO123","units":250.5,"nav":45.2,"currentValue":11323,"invested":10000,"gain":1323,"gainPct":13.23,"type":"Equity","amc":"AMC Name"}
  ],
  "stocks": [
    {"symbol":"RELIANCE","company":"Reliance Industries Ltd","qty":10,"avgPrice":2100,"currentPrice":2450,"currentValue":24500,"invested":21000,"gain":3500,"gainPct":16.67,"exchange":"NSE"}
  ]
}
Generate 3-4 mutual funds and 3-5 stocks with realistic Indian market data.`,
      }],
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `HTTP ${res.status}`);
  }
  const d = await res.json();
  const text = d.content.map(c => c.text || "").join("");
  const clean = text.replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
}

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;700&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg:#0a0c10; --surface:#0f1318; --surface2:#161b24; --surface3:#1e2530;
    --border:rgba(255,255,255,0.07); --border2:rgba(255,255,255,0.12);
    --gold:#c9a84c; --gold2:#e8c97a; --gold-glow:rgba(201,168,76,0.15);
    --green:#2dd4a0; --red:#f0605a; --blue:#5b9cf6; --orange:#f59e0b;
    --text:#e8eaed; --text2:#9ca3af; --text3:#6b7280;
    --radius:14px; --radius-sm:8px;
    --shadow:0 4px 24px rgba(0,0,0,0.4); --shadow-gold:0 0 30px rgba(201,168,76,0.12);
  }
  html,body,#root { height:100%; }
  body { font-family:'DM Sans',sans-serif; background:var(--bg); color:var(--text); min-height:100vh; }
  ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-track{background:transparent} ::-webkit-scrollbar-thumb{background:var(--border2);border-radius:2px}

  .app{display:flex;min-height:100vh}
  .sidebar{width:240px;background:var(--surface);border-right:1px solid var(--border);display:flex;flex-direction:column;position:fixed;height:100vh;z-index:100}
  .sidebar-logo{padding:28px 20px 20px;border-bottom:1px solid var(--border)}
  .logo-title{font-family:'Playfair Display',serif;font-size:18px;font-weight:700;color:var(--gold);letter-spacing:.3px;line-height:1.2}
  .logo-sub{font-size:11px;color:var(--text3);letter-spacing:1px;text-transform:uppercase;margin-top:2px}
  .sidebar-nav{flex:1;padding:16px 12px;overflow-y:auto}
  .nav-section{font-size:10px;color:var(--text3);letter-spacing:1.5px;text-transform:uppercase;padding:8px 8px 6px}
  .nav-item{display:flex;align-items:center;gap:10px;padding:11px 12px;border-radius:var(--radius-sm);cursor:pointer;color:var(--text2);font-size:14px;font-weight:500;transition:all .15s;margin-bottom:2px;position:relative}
  .nav-item:hover{background:var(--surface2);color:var(--text)}
  .nav-item.active{background:var(--gold-glow);color:var(--gold)}
  .nav-item.active::before{content:'';position:absolute;left:0;top:20%;height:60%;width:3px;background:var(--gold);border-radius:0 2px 2px 0}
  .badge{margin-left:auto;background:var(--red);color:#fff;font-size:10px;font-weight:600;padding:2px 6px;border-radius:10px;min-width:18px;text-align:center}
  .sidebar-user{padding:16px;border-top:1px solid var(--border);display:flex;align-items:center;gap:10px}
  .user-avatar{width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,var(--gold),#8b6914);display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:#0a0c10;flex-shrink:0}
  .user-name{font-size:13px;font-weight:600;color:var(--text)}
  .user-pan{font-size:11px;color:var(--text3);letter-spacing:.5px}
  .logout-btn{margin-left:auto;color:var(--text3);cursor:pointer;padding:4px;border-radius:6px;transition:color .15s}
  .logout-btn:hover{color:var(--red)}

  .main{margin-left:240px;flex:1;min-height:100vh;display:flex;flex-direction:column}
  .topbar{padding:20px 32px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;background:var(--surface);position:sticky;top:0;z-index:50}
  .page-title{font-family:'Playfair Display',serif;font-size:22px;font-weight:700;color:var(--text)}
  .page-sub{font-size:13px;color:var(--text3);margin-top:2px}
  .content{padding:28px 32px;flex:1}

  .card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:24px;transition:border-color .2s}
  .card:hover{border-color:var(--border2)}
  .card-gold{border-color:rgba(201,168,76,.3);box-shadow:var(--shadow-gold)}
  .card-label{font-size:12px;color:var(--text3);letter-spacing:.5px;text-transform:uppercase;margin-bottom:8px}
  .card-value{font-family:'Playfair Display',serif;font-size:26px;font-weight:700;color:var(--text)}
  .card-change{font-size:13px;margin-top:6px;display:flex;align-items:center;gap:4px}
  .green{color:var(--green)} .red{color:var(--red)} .orange{color:var(--orange)} .blue{color:var(--blue)}

  .grid-4{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
  .grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
  .grid-2{display:grid;grid-template-columns:1fr 1fr;gap:20px}

  .table-wrap{overflow-x:auto}
  .table{width:100%;border-collapse:collapse}
  .table th{font-size:11px;font-weight:600;color:var(--text3);letter-spacing:.8px;text-transform:uppercase;padding:10px 14px;border-bottom:1px solid var(--border);text-align:left}
  .table td{padding:14px;font-size:13.5px;border-bottom:1px solid var(--border);color:var(--text2)}
  .table tr:last-child td{border-bottom:none}
  .table tr:hover td{background:var(--surface2)}
  .table td:first-child{color:var(--text);font-weight:500}
  .table th:not(:first-child),.table td:not(:first-child){text-align:right}

  .btn{display:inline-flex;align-items:center;gap:7px;padding:10px 18px;border-radius:var(--radius-sm);font-size:13.5px;font-weight:600;cursor:pointer;transition:all .15s;border:none;font-family:'DM Sans',sans-serif}
  .btn-gold{background:linear-gradient(135deg,var(--gold),#a87c28);color:#0a0c10}
  .btn-gold:hover{transform:translateY(-1px);box-shadow:0 4px 16px rgba(201,168,76,.35)}
  .btn-gold:disabled{opacity:.5;cursor:not-allowed;transform:none}
  .btn-outline{background:transparent;border:1px solid var(--border2);color:var(--text2)}
  .btn-outline:hover{border-color:var(--gold);color:var(--gold)}
  .btn-danger{background:rgba(240,96,90,.1);border:1px solid rgba(240,96,90,.3);color:var(--red)}
  .btn-sm{padding:6px 12px;font-size:12px}
  .btn-icon{padding:8px;border-radius:var(--radius-sm);background:var(--surface2);border:1px solid var(--border);color:var(--text2);cursor:pointer;display:inline-flex;align-items:center;transition:all .15s}
  .btn-icon:hover{border-color:var(--gold);color:var(--gold)}

  .form-group{margin-bottom:18px}
  .form-label{display:block;font-size:12.5px;font-weight:600;color:var(--text2);margin-bottom:7px;letter-spacing:.3px}
  .form-input{width:100%;background:var(--surface2);border:1px solid var(--border2);border-radius:var(--radius-sm);padding:11px 14px;color:var(--text);font-size:14px;font-family:'DM Sans',sans-serif;transition:border-color .15s;appearance:none}
  .form-input:focus{outline:none;border-color:var(--gold);box-shadow:0 0 0 3px rgba(201,168,76,.1)}
  .form-row{display:grid;grid-template-columns:1fr 1fr;gap:16px}
  select.form-input option{background:var(--surface2)}
  textarea.form-input{resize:vertical}

  .modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.7);z-index:200;display:flex;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(4px)}
  .modal{background:var(--surface);border:1px solid var(--border2);border-radius:var(--radius);width:100%;max-width:520px;max-height:90vh;overflow-y:auto;box-shadow:0 20px 60px rgba(0,0,0,.6);animation:modalIn .2s ease}
  @keyframes modalIn{from{opacity:0;transform:scale(.96) translateY(8px)}to{opacity:1;transform:none}}
  .modal-header{padding:22px 24px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between}
  .modal-title{font-family:'Playfair Display',serif;font-size:18px;font-weight:700}
  .modal-body{padding:24px}
  .modal-footer{padding:16px 24px;border-top:1px solid var(--border);display:flex;gap:10px;justify-content:flex-end}

  .chip{display:inline-flex;align-items:center;padding:3px 10px;border-radius:20px;font-size:11.5px;font-weight:600;letter-spacing:.3px}
  .chip-green{background:rgba(45,212,160,.12);color:var(--green)}
  .chip-red{background:rgba(240,96,90,.12);color:var(--red)}
  .chip-blue{background:rgba(91,156,246,.12);color:var(--blue)}
  .chip-gold{background:var(--gold-glow);color:var(--gold)}
  .chip-orange{background:rgba(245,158,11,.12);color:var(--orange)}

  .alert{padding:14px 16px;border-radius:var(--radius-sm);margin-bottom:16px;display:flex;align-items:flex-start;gap:10px;font-size:13.5px}
  .alert-warn{background:rgba(245,158,11,.1);border:1px solid rgba(245,158,11,.25);color:var(--orange)}
  .alert-red{background:rgba(240,96,90,.1);border:1px solid rgba(240,96,90,.25);color:var(--red)}
  .alert-green{background:rgba(45,212,160,.1);border:1px solid rgba(45,212,160,.25);color:var(--green)}
  .alert-blue{background:rgba(91,156,246,.1);border:1px solid rgba(91,156,246,.25);color:var(--blue)}

  .login-page{min-height:100vh;display:flex;align-items:center;justify-content:center;background:radial-gradient(ellipse at 30% 40%,rgba(201,168,76,.06) 0%,transparent 60%),radial-gradient(ellipse at 70% 70%,rgba(91,156,246,.04) 0%,transparent 60%),var(--bg)}
  .login-card{background:var(--surface);border:1px solid var(--border2);border-radius:20px;padding:40px;width:100%;max-width:400px;box-shadow:var(--shadow)}
  .login-logo{text-align:center;margin-bottom:32px}
  .login-logo-icon{width:60px;height:60px;border-radius:16px;margin:0 auto 12px;background:linear-gradient(135deg,var(--gold),#8b6914);display:flex;align-items:center;justify-content:center}
  .user-card{padding:14px 16px;border-radius:var(--radius-sm);border:1px solid var(--border);cursor:pointer;display:flex;align-items:center;gap:12px;margin-bottom:8px;transition:all .15s;background:var(--surface2)}
  .user-card:hover,.user-card.selected{border-color:var(--gold);background:var(--gold-glow)}
  .pin-dots{display:flex;gap:12px;justify-content:center;margin:16px 0 24px}
  .pin-dot{width:12px;height:12px;border-radius:50%;border:2px solid var(--border2);transition:all .15s}
  .pin-dot.filled{background:var(--gold);border-color:var(--gold)}
  .pin-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
  .pin-btn{padding:14px;background:var(--surface2);border:1px solid var(--border);border-radius:10px;color:var(--text);font-size:18px;font-weight:600;cursor:pointer;transition:all .15s;font-family:'DM Sans',sans-serif;text-align:center}
  .pin-btn:hover{border-color:var(--gold);color:var(--gold);background:var(--gold-glow)}
  .divider{height:1px;background:var(--border);margin:20px 0}
  .section-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:18px}
  .section-title{font-family:'Playfair Display',serif;font-size:17px;font-weight:700}
  .loading{display:flex;align-items:center;gap:10px;color:var(--text2);font-size:14px;padding:32px;justify-content:center}
  .spinner{width:20px;height:20px;border:2px solid var(--border2);border-top-color:var(--gold);border-radius:50%;animation:spin .7s linear infinite}
  @keyframes spin{to{transform:rotate(360deg)}}
  .empty{text-align:center;padding:40px 20px;color:var(--text3)}
  .empty-icon{font-size:40px;margin-bottom:10px;opacity:.5}
  .pan-input-row{display:flex;gap:10px;align-items:flex-end}
  .progress-bar{height:5px;background:var(--surface3);border-radius:3px;overflow:hidden;margin-top:8px}
  .progress-fill{height:100%;border-radius:3px;transition:width .3s}
  .tab-row{display:flex;gap:4px;padding:4px;background:var(--surface2);border-radius:var(--radius-sm);margin-bottom:20px}
  .tab-btn{flex:1;padding:8px 12px;border-radius:6px;font-size:13px;font-weight:500;cursor:pointer;transition:all .15s;border:none;background:transparent;color:var(--text3);font-family:'DM Sans',sans-serif}
  .tab-btn.active{background:var(--surface);color:var(--gold);box-shadow:0 1px 4px rgba(0,0,0,.2)}
  .reminder-item{padding:14px 16px;border-radius:var(--radius-sm);border:1px solid var(--border);margin-bottom:8px;display:flex;align-items:center;gap:12px;background:var(--surface2);transition:border-color .15s}
  .reminder-item.urgent{border-color:rgba(240,96,90,.4)}
  .reminder-item.warning{border-color:rgba(245,158,11,.3)}
  .new-user-link{text-align:center;margin-top:20px;font-size:13px;color:var(--text3);cursor:pointer}
  .new-user-link span{color:var(--gold);cursor:pointer}
  .new-user-link span:hover{text-decoration:underline}

  @media(max-width:900px){
    .sidebar{width:200px}
    .main{margin-left:200px}
    .grid-4{grid-template-columns:repeat(2,1fr)}
    .content{padding:20px}
  }
  @media(max-width:640px){
    .sidebar{display:none}
    .main{margin-left:0}
    .grid-4,.grid-3,.grid-2{grid-template-columns:1fr}
    .form-row{grid-template-columns:1fr}
    .topbar{padding:16px}
    .content{padding:16px}
  }
`;

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [users, setUsers]       = useState([]);
  const [session, setSession]   = useState(null);
  const [portfolio, setPortfolio] = useState({ fds: [], insurances: [], investments: [] });
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    (async () => {
      const u = await loadUsers();
      setUsers(u);
      setLoading(false);
    })();
  }, []);

  const login = async (user) => {
    setSession(user);
    const p = await loadPortfolio(user.id);
    setPortfolio(p);
  };

  const logout = () => {
    setSession(null);
    setPortfolio({ fds: [], insurances: [], investments: [] });
    setActiveTab("dashboard");
  };

  const updatePortfolio = async (newData) => {
    const updated = { ...portfolio, ...newData };
    setPortfolio(updated);
    await savePortfolio(session.id, updated);
  };

  const addUser = async (user) => {
    const updated = [...users, user];
    setUsers(updated);
    await saveUsers(updated);
  };

  const reminders = portfolio.insurances.filter(ins => {
    const premDays = daysDiff(ins.nextPremium);
    const matDays  = ins.maturityDate ? daysDiff(ins.maturityDate) : 999;
    return (premDays >= 0 && premDays <= 30) || (matDays >= 0 && matDays <= 90);
  }).length;

  if (loading) return (
    <>
      <style>{STYLES}</style>
      <div className="login-page">
        <div className="loading"><div className="spinner" /><span>Loading WealthVault…</span></div>
      </div>
    </>
  );

  if (!session) return (
    <>
      <style>{STYLES}</style>
      <LoginPage users={users} onLogin={login} onAddUser={addUser} />
    </>
  );

  return (
    <>
      <style>{STYLES}</style>
      <div className="app">
        <aside className="sidebar">
          <div className="sidebar-logo">
            <div className="logo-title">WealthVault</div>
            <div className="logo-sub">Investment Portfolio</div>
          </div>
          <nav className="sidebar-nav">
            <div className="nav-section">Overview</div>
            {[
              { id: "dashboard",   icon: "dashboard",  label: "Dashboard" },
              { id: "investments", icon: "stocks",      label: "Stocks & MF" },
              { id: "fds",         icon: "fd",          label: "Fixed Deposits" },
              { id: "insurance",   icon: "insurance",   label: "Insurance" },
              { id: "reminders",   icon: "bell",        label: "Reminders", badge: reminders },
            ].map(item => (
              <div
                key={item.id}
                className={`nav-item ${activeTab === item.id ? "active" : ""}`}
                onClick={() => setActiveTab(item.id)}
              >
                <Icon name={item.icon} size={17} />
                {item.label}
                {item.badge > 0 && <span className="badge">{item.badge}</span>}
              </div>
            ))}
          </nav>
          <div className="sidebar-user">
            <div className="user-avatar">{session.avatar}</div>
            <div>
              <div className="user-name">{session.name}</div>
              <div className="user-pan">{session.pan}</div>
            </div>
            <div className="logout-btn" onClick={logout} title="Logout">
              <Icon name="logout" size={16} />
            </div>
          </div>
        </aside>

        <main className="main">
          {activeTab === "dashboard"   && <DashboardPage   portfolio={portfolio} session={session} setActiveTab={setActiveTab} />}
          {activeTab === "investments" && <InvestmentsPage portfolio={portfolio} session={session} updatePortfolio={updatePortfolio} />}
          {activeTab === "fds"         && <FDPage          portfolio={portfolio} updatePortfolio={updatePortfolio} />}
          {activeTab === "insurance"   && <InsurancePage   portfolio={portfolio} updatePortfolio={updatePortfolio} />}
          {activeTab === "reminders"   && <RemindersPage   portfolio={portfolio} />}
        </main>
      </div>
    </>
  );
}

// ─── LOGIN ────────────────────────────────────────────────────────────────────
function LoginPage({ users, onLogin, onAddUser }) {
  const [selected, setSelected] = useState(null);
  const [pin, setPin]           = useState("");
  const [error, setError]       = useState("");
  const [showAdd, setShowAdd]   = useState(false);
  const [newUser, setNewUser]   = useState({ name: "", pan: "", pin: "", pin2: "" });
  const [addError, setAddError] = useState("");

  const handlePin = (d) => {
    if (d === "X") { setPin(p => p.slice(0, -1)); setError(""); return; }
    const next = pin + d;
    setPin(next);
    if (next.length === 4) {
      if (selected.pin === next) {
        setTimeout(() => onLogin(selected), 200);
      } else {
        setError("Incorrect PIN. Please try again.");
        setTimeout(() => setPin(""), 600);
      }
    }
  };

  const handleCreate = () => {
    if (!newUser.name || !newUser.pan || !newUser.pin) { setAddError("All fields are required."); return; }
    if (!/^\d{4}$/.test(newUser.pin))                  { setAddError("PIN must be exactly 4 digits."); return; }
    if (newUser.pin !== newUser.pin2)                   { setAddError("PINs do not match."); return; }
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(newUser.pan.toUpperCase())) { setAddError("Invalid PAN format (e.g. ABCDE1234F)."); return; }
    const u = {
      id: uid(),
      name: newUser.name,
      pan:  newUser.pan.toUpperCase(),
      pin:  newUser.pin,
      avatar: newUser.name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2),
    };
    onAddUser(u);
    setShowAdd(false);
    setNewUser({ name: "", pan: "", pin: "", pin2: "" });
  };

  if (showAdd) return (
    <div className="login-page">
      <div className="login-card" style={{ maxWidth: 440 }}>
        <div className="login-logo">
          <div className="login-logo-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0a0c10" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <div style={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:700, color:"var(--gold)" }}>Create Profile</div>
          <div style={{ fontSize:13, color:"var(--text3)", marginTop:4 }}>Set up your secure investment profile</div>
        </div>
        {addError && <div className="alert alert-red"><Icon name="info" size={16}/>{addError}</div>}
        <div className="form-group"><label className="form-label">Full Name *</label><input className="form-input" placeholder="Rajesh Sharma" value={newUser.name} onChange={e => setNewUser({...newUser, name: e.target.value})} /></div>
        <div className="form-group"><label className="form-label">PAN Number *</label><input className="form-input" placeholder="ABCDE1234F" value={newUser.pan} onChange={e => setNewUser({...newUser, pan: e.target.value.toUpperCase()})} maxLength={10} style={{ letterSpacing:2 }} /></div>
        <div className="form-row">
          <div className="form-group"><label className="form-label">4-Digit PIN *</label><input className="form-input" type="password" placeholder="••••" value={newUser.pin} onChange={e => setNewUser({...newUser, pin: e.target.value})} maxLength={4} inputMode="numeric" /></div>
          <div className="form-group"><label className="form-label">Confirm PIN *</label><input className="form-input" type="password" placeholder="••••" value={newUser.pin2} onChange={e => setNewUser({...newUser, pin2: e.target.value})} maxLength={4} inputMode="numeric" /></div>
        </div>
        <div className="alert alert-blue"><Icon name="info" size={16}/><span style={{fontSize:12}}>PINs and data are stored locally in your browser (localStorage). Each device stores data independently.</span></div>
        <button className="btn btn-gold" style={{ width:"100%", justifyContent:"center" }} onClick={handleCreate}>Create Profile</button>
        <div className="new-user-link" onClick={() => setShowAdd(false)}>← Back to Login</div>
      </div>
    </div>
  );

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">
          <div className="login-logo-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0a0c10" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <div style={{ fontFamily:"'Playfair Display',serif", fontSize:24, fontWeight:700, color:"var(--gold)" }}>WealthVault</div>
          <div style={{ fontSize:13, color:"var(--text3)", marginTop:4 }}>Your secure investment portfolio</div>
        </div>

        {!selected ? (
          <>
            <div style={{ fontSize:12, color:"var(--text3)", marginBottom:12, letterSpacing:.5, textTransform:"uppercase" }}>Select Profile</div>
            {users.map(u => (
              <div key={u.id} className="user-card" onClick={() => { setSelected(u); setPin(""); setError(""); }}>
                <div className="user-avatar">{u.avatar}</div>
                <div>
                  <div style={{ fontWeight:600, fontSize:14 }}>{u.name}</div>
                  <div style={{ fontSize:12, color:"var(--text3)", marginTop:2 }}>{u.pan}</div>
                </div>
                <div style={{ marginLeft:"auto", color:"var(--text3)" }}><Icon name="lock" size={15} /></div>
              </div>
            ))}
            <div className="new-user-link">New user? <span onClick={() => setShowAdd(true)}>Create a Profile →</span></div>
          </>
        ) : (
          <>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20 }}>
              <div className="user-avatar">{selected.avatar}</div>
              <div>
                <div style={{ fontWeight:600, fontSize:14 }}>{selected.name}</div>
                <div style={{ fontSize:12, color:"var(--text3)" }}>{selected.pan}</div>
              </div>
              <div style={{ marginLeft:"auto", cursor:"pointer", color:"var(--text3)", fontSize:12 }} onClick={() => setSelected(null)}>Change</div>
            </div>
            <div style={{ textAlign:"center", fontSize:13, color:"var(--text2)", marginBottom:8 }}>Enter your 4-digit PIN</div>
            <div className="pin-dots">
              {[0,1,2,3].map(i => <div key={i} className={`pin-dot ${i < pin.length ? "filled" : ""}`} />)}
            </div>
            {error && <div className="alert alert-red"><Icon name="info" size={14}/>{error}</div>}
            <div className="pin-grid">
              {["1","2","3","4","5","6","7","8","9","","0","X"].map((d, i) => (
                <div key={i} className="pin-btn" style={{ visibility: d === "" ? "hidden" : "visible" }} onClick={() => d && handlePin(d)}>
                  {d === "X" ? "⌫" : d}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── DASHBOARD ─────────────────────────────────────────────────────────────────
function DashboardPage({ portfolio, session, setActiveTab }) {
  const { fds, insurances, investments } = portfolio;
  const inv = investments[0] || {};

  const mfValue    = (inv.mutualFunds || []).reduce((a, m) => a + m.currentValue, 0);
  const mfInvested = (inv.mutualFunds || []).reduce((a, m) => a + m.invested, 0);
  const stValue    = (inv.stocks     || []).reduce((a, s) => a + s.currentValue, 0);
  const stInvested = (inv.stocks     || []).reduce((a, s) => a + s.invested, 0);
  const fdPrincipal = fds.reduce((a, f) => a + f.principal, 0);
  const fdMaturity  = fds.reduce((a, f) => a + f.maturityAmount, 0);
  const insAssured  = insurances.reduce((a, i) => a + i.sumAssured, 0);

  const totalValue    = mfValue + stValue + fdPrincipal;
  const totalInvested = mfInvested + stInvested + fdPrincipal;
  const totalGain     = totalValue - totalInvested;
  const totalGainPct  = totalInvested > 0 ? (totalGain / totalInvested) * 100 : 0;

  const urgent = insurances.filter(ins => { const d = daysDiff(ins.nextPremium); return d >= 0 && d <= 15; });

  return (
    <div>
      <div className="topbar">
        <div><div className="page-title">Dashboard</div><div className="page-sub">Welcome back, {session.name.split(" ")[0]}</div></div>
        <div style={{ fontSize:13, color:"var(--text3)" }}>{new Date().toLocaleDateString("en-IN", { weekday:"long", day:"numeric", month:"long", year:"numeric" })}</div>
      </div>
      <div className="content">
        {urgent.length > 0 && (
          <div className="alert alert-red" style={{ cursor:"pointer" }} onClick={() => setActiveTab("reminders")}>
            <Icon name="warn" size={18}/>
            <div><strong>{urgent.length} urgent reminder{urgent.length > 1 ? "s" : ""}</strong> — Premium due within 15 days for {urgent.map(r => r.name).join(", ")}.</div>
          </div>
        )}

        <div className="grid-4" style={{ marginBottom:24 }}>
          <div className="card card-gold">
            <div className="card-label">Total Portfolio</div>
            <div className="card-value">{fmt(totalValue)}</div>
            <div className="card-change">
              <span className={totalGain >= 0 ? "green" : "red"}>{totalGain >= 0 ? "▲" : "▼"} {Math.abs(totalGainPct).toFixed(1)}%</span>
              <span style={{ color:"var(--text3)" }}>overall returns</span>
            </div>
          </div>
          {[
            { label:"Mutual Funds", val:mfValue, inv:mfInvested },
            { label:"Stocks",       val:stValue, inv:stInvested },
            { label:"Fixed Deposits",val:fdPrincipal, inv:fdPrincipal, extra:`${fmt(fdMaturity - fdPrincipal)} interest` },
          ].map(c => (
            <div key={c.label} className="card">
              <div className="card-label">{c.label}</div>
              <div className="card-value" style={{ fontSize:20 }}>{fmt(c.val)}</div>
              <div className="card-change">
                {c.extra
                  ? <span className="green">{c.extra}</span>
                  : <span className={c.val - c.inv >= 0 ? "green" : "red"}>{c.inv > 0 ? `${((c.val - c.inv)/c.inv*100).toFixed(1)}%` : "—"}</span>
                }
              </div>
            </div>
          ))}
        </div>

        <div className="grid-2" style={{ marginBottom:24 }}>
          <div className="card">
            <div className="section-header"><div className="section-title">Asset Allocation</div></div>
            {[
              { label:"Mutual Funds",    value:mfValue,     color:"var(--gold)",   total:totalValue + insAssured },
              { label:"Stocks",          value:stValue,     color:"var(--blue)",   total:totalValue + insAssured },
              { label:"Fixed Deposits",  value:fdPrincipal, color:"var(--green)",  total:totalValue + insAssured },
              { label:"Insurance Cover", value:insAssured,  color:"var(--orange)", total:totalValue + insAssured },
            ].map(item => (
              <div key={item.label} style={{ marginBottom:14 }}>
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:13, marginBottom:5 }}>
                  <span style={{ color:"var(--text2)" }}>{item.label}</span>
                  <span style={{ color:item.color, fontWeight:600 }}>{item.total > 0 ? ((item.value/item.total)*100).toFixed(0) : 0}%</span>
                </div>
                <div className="progress-bar"><div className="progress-fill" style={{ width:`${item.total > 0 ? (item.value/item.total)*100 : 0}%`, background:item.color }} /></div>
              </div>
            ))}
          </div>

          <div className="card">
            <div className="section-header"><div className="section-title">Portfolio Summary</div></div>
            {[
              { label:"Total Invested",      value:fmt(totalInvested),  color:"var(--text)" },
              { label:"Current Value",        value:fmt(totalValue),     color:"var(--gold)" },
              { label:"Total Gain/Loss",      value:`${totalGain>=0?"+":""}${fmt(totalGain)}`, color:totalGain>=0?"var(--green)":"var(--red)" },
              { label:"Active FDs",           value:fds.length,          color:"var(--text)" },
              { label:"Insurance Policies",   value:insurances.length,   color:"var(--text)" },
              { label:"Total Sum Assured",    value:fmt(insAssured),     color:"var(--blue)" },
            ].map(item => (
              <div key={item.label} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 0", borderBottom:"1px solid var(--border)" }}>
                <span style={{ color:"var(--text2)", fontSize:13 }}>{item.label}</span>
                <span style={{ fontWeight:600, fontSize:14, color:item.color }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {insurances.length > 0 && (
          <div className="card">
            <div className="section-header">
              <div className="section-title">Upcoming Premiums</div>
              <button className="btn btn-outline btn-sm" onClick={() => setActiveTab("reminders")}>View All</button>
            </div>
            <div className="table-wrap">
              <table className="table">
                <thead><tr><th>Policy</th><th>Type</th><th>Premium</th><th>Next Due</th><th>Days Left</th><th>Sum Assured</th></tr></thead>
                <tbody>
                  {[...insurances].sort((a,b) => new Date(a.nextPremium) - new Date(b.nextPremium)).slice(0,4).map(ins => {
                    const d = daysDiff(ins.nextPremium);
                    return (
                      <tr key={ins.id}>
                        <td>{ins.name}</td>
                        <td><span className="chip chip-blue">{ins.type}</span></td>
                        <td>{fmt(ins.premium)}</td>
                        <td>{fmtDate(ins.nextPremium)}</td>
                        <td><span className={`chip ${d<=7?"chip-red":d<=30?"chip-orange":"chip-green"}`}>{d} days</span></td>
                        <td>{fmt(ins.sumAssured)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── INVESTMENTS PAGE ─────────────────────────────────────────────────────────
function InvestmentsPage({ portfolio, session, updatePortfolio }) {
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState("");
  const [activeSubTab, setActiveSubTab] = useState("mf");
  const [panOverride, setPanOverride]   = useState(session.pan);

  const inv = portfolio.investments[0] || { mutualFunds: [], stocks: [] };
  const hasFetched = portfolio.investments.length > 0;
  const hasApiKey  = !!ANTHROPIC_API_KEY;

  const fetchData = async () => {
    setLoading(true); setError("");
    try {
      const result = await fetchInvestmentsFromPAN(panOverride);
      await updatePortfolio({ investments: [{ pan:panOverride, fetchedAt:new Date().toISOString(), ...result }] });
    } catch (e) {
      if (e.message === "NO_KEY") {
        setError("Anthropic API key not configured. Set VITE_ANTHROPIC_API_KEY in your environment variables.");
      } else {
        setError(`Failed to fetch: ${e.message}`);
      }
    }
    setLoading(false);
  };

  const mfTotal    = (inv.mutualFunds||[]).reduce((a,m)=>a+m.currentValue,0);
  const mfInvested = (inv.mutualFunds||[]).reduce((a,m)=>a+m.invested,0);
  const stTotal    = (inv.stocks||[]).reduce((a,s)=>a+s.currentValue,0);
  const stInvested = (inv.stocks||[]).reduce((a,s)=>a+s.invested,0);

  return (
    <div>
      <div className="topbar"><div><div className="page-title">Stocks & Mutual Funds</div><div className="page-sub">Portfolio via PAN number</div></div></div>
      <div className="content">
        {!hasApiKey && (
          <div className="alert alert-warn">
            <Icon name="key" size={18}/>
            <div>
              <strong>API Key Required</strong> — Set <code style={{background:"rgba(0,0,0,.3)",padding:"1px 5px",borderRadius:4}}>VITE_ANTHROPIC_API_KEY</code> in your Vercel environment variables to enable live fetching.
              <div style={{fontSize:12,marginTop:4}}>Go to Vercel Dashboard → Your Project → Settings → Environment Variables.</div>
            </div>
          </div>
        )}
        <div className="card" style={{ marginBottom:20 }}>
          <div style={{ fontSize:13, color:"var(--text2)", marginBottom:14 }}>Enter your PAN number to fetch mutual fund and stock holdings.</div>
          <div className="pan-input-row">
            <div className="form-group" style={{ flex:1, marginBottom:0 }}>
              <label className="form-label">PAN Number</label>
              <input className="form-input" value={panOverride} onChange={e => setPanOverride(e.target.value.toUpperCase())} maxLength={10} style={{ letterSpacing:2 }} placeholder="ABCDE1234F" />
            </div>
            <button className="btn btn-gold" onClick={fetchData} disabled={loading || !hasApiKey}>
              {loading ? <><div className="spinner" style={{width:16,height:16,borderWidth:2}}/>Fetching…</> : <><Icon name="refresh" size={16}/>Fetch Holdings</>}
            </button>
          </div>
          {hasFetched && <div style={{ marginTop:10, fontSize:12, color:"var(--text3)" }}>Last fetched: {new Date(portfolio.investments[0]?.fetchedAt).toLocaleString("en-IN")}</div>}
        </div>

        {error && <div className="alert alert-red"><Icon name="warn" size={16}/>{error}</div>}

        {!hasFetched && !loading && (
          <div className="empty"><div className="empty-icon">📈</div><div style={{fontSize:16,color:"var(--text2)",marginBottom:6}}>No data fetched yet</div><div style={{fontSize:13}}>Enter your PAN and click Fetch Holdings</div></div>
        )}

        {hasFetched && (
          <>
            <div className="grid-4" style={{ marginBottom:20 }}>
              {[
                { label:"MF Current Value",    value:fmt(mfTotal),    sub:`${mfInvested>0?((mfTotal-mfInvested)/mfInvested*100).toFixed(1):0}% returns`, col:mfTotal>=mfInvested?"var(--green)":"var(--red)" },
                { label:"MF Invested",         value:fmt(mfInvested), sub:`${inv.mutualFunds?.length||0} funds`,  col:"var(--text3)" },
                { label:"Stocks Current Value",value:fmt(stTotal),    sub:`${stInvested>0?((stTotal-stInvested)/stInvested*100).toFixed(1):0}% returns`, col:stTotal>=stInvested?"var(--green)":"var(--red)" },
                { label:"Stocks Invested",     value:fmt(stInvested), sub:`${inv.stocks?.length||0} stocks`, col:"var(--text3)" },
              ].map(c=>(
                <div key={c.label} className="card">
                  <div className="card-label">{c.label}</div>
                  <div className="card-value" style={{fontSize:19}}>{c.value}</div>
                  <div style={{fontSize:12,color:c.col,marginTop:4}}>{c.sub}</div>
                </div>
              ))}
            </div>

            <div className="tab-row">
              <button className={`tab-btn ${activeSubTab==="mf"?"active":""}`} onClick={()=>setActiveSubTab("mf")}>Mutual Funds ({inv.mutualFunds?.length||0})</button>
              <button className={`tab-btn ${activeSubTab==="stocks"?"active":""}`} onClick={()=>setActiveSubTab("stocks")}>Stocks ({inv.stocks?.length||0})</button>
            </div>

            {activeSubTab === "mf" && (
              <div className="card"><div className="table-wrap"><table className="table">
                <thead><tr><th>Fund Name</th><th>AMC</th><th>Type</th><th>Units</th><th>NAV</th><th>Invested</th><th>Current Value</th><th>Gain/Loss</th></tr></thead>
                <tbody>
                  {inv.mutualFunds?.map((mf,i)=>(
                    <tr key={i}>
                      <td style={{maxWidth:200}}>{mf.name}<div style={{fontSize:11,color:"var(--text3)",marginTop:2}}>Folio: {mf.folio}</div></td>
                      <td>{mf.amc}</td>
                      <td><span className={`chip ${mf.type==="Equity"?"chip-blue":mf.type==="Debt"?"chip-green":"chip-gold"}`}>{mf.type}</span></td>
                      <td>{mf.units?.toFixed(3)}</td>
                      <td>{fmt(mf.nav)}</td>
                      <td>{fmt(mf.invested)}</td>
                      <td style={{color:"var(--gold)",fontWeight:600}}>{fmt(mf.currentValue)}</td>
                      <td><span style={{color:mf.gain>=0?"var(--green)":"var(--red)",fontWeight:600}}>{mf.gain>=0?"+":""}{fmt(mf.gain)}<div style={{fontSize:11,opacity:.8}}>{mf.gainPct?.toFixed(2)}%</div></span></td>
                    </tr>
                  ))}
                </tbody>
              </table></div></div>
            )}

            {activeSubTab === "stocks" && (
              <div className="card"><div className="table-wrap"><table className="table">
                <thead><tr><th>Company</th><th>Exchange</th><th>Qty</th><th>Avg Price</th><th>CMP</th><th>Invested</th><th>Current Value</th><th>P&amp;L</th></tr></thead>
                <tbody>
                  {inv.stocks?.map((s,i)=>(
                    <tr key={i}>
                      <td>{s.company}<div style={{fontSize:11,color:"var(--text3)",marginTop:2}}>{s.symbol}</div></td>
                      <td><span className="chip chip-gold">{s.exchange}</span></td>
                      <td>{s.qty}</td>
                      <td>{fmt(s.avgPrice)}</td>
                      <td style={{color:s.currentPrice>s.avgPrice?"var(--green)":"var(--red)",fontWeight:600}}>{fmt(s.currentPrice)}</td>
                      <td>{fmt(s.invested)}</td>
                      <td style={{fontWeight:600}}>{fmt(s.currentValue)}</td>
                      <td><span style={{color:s.gain>=0?"var(--green)":"var(--red)",fontWeight:600}}>{s.gain>=0?"+":""}{fmt(s.gain)}<div style={{fontSize:11,opacity:.8}}>{s.gainPct?.toFixed(2)}%</div></span></td>
                    </tr>
                  ))}
                </tbody>
              </table></div></div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ─── FIXED DEPOSITS ────────────────────────────────────────────────────────────
function FDPage({ portfolio, updatePortfolio }) {
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing]     = useState(null);
  const [formError, setFormError] = useState("");
  const emptyForm = { bank:"", accountNo:"", principal:"", rate:"", tenure:"", tenureType:"months", startDate:"", fdType:"Cumulative", notes:"" };
  const [form, setForm] = useState(emptyForm);

  const calcMaturity = (principal, rate, tenure, tenureType, fdType) => {
    const p = parseFloat(principal), r = parseFloat(rate)/100;
    const months = tenureType === "years" ? tenure*12 : parseInt(tenure);
    return fdType === "Cumulative"
      ? p * Math.pow(1 + r/4, (months/12)*4)
      : p + (p * r * months/12);
  };

  const openAdd  = () => { setEditing(null); setForm(emptyForm); setFormError(""); setShowModal(true); };
  const openEdit = (fd) => { setEditing(fd.id); setForm({...fd, tenure:String(fd.tenure)}); setFormError(""); setShowModal(true); };
  const del      = (id) => { if (window.confirm("Delete this FD?")) updatePortfolio({ fds: portfolio.fds.filter(f=>f.id!==id) }); };

  const save = () => {
    if (!form.bank || !form.principal || !form.rate || !form.tenure || !form.startDate) { setFormError("Please fill all required fields."); return; }
    const p=parseFloat(form.principal), r=parseFloat(form.rate), t=parseFloat(form.tenure);
    if (isNaN(p)||isNaN(r)||isNaN(t)) { setFormError("Invalid numeric values."); return; }
    const months = form.tenureType==="years" ? t*12 : t;
    const matDate = new Date(form.startDate);
    matDate.setMonth(matDate.getMonth() + months);
    const fd = { ...form, id:editing||uid(), principal:p, rate:r, tenure:t, maturityAmount:calcMaturity(p,r,t,form.tenureType,form.fdType), maturityDate:matDate.toISOString().split("T")[0] };
    const fds = editing ? portfolio.fds.map(f=>f.id===editing?fd:f) : [...portfolio.fds, fd];
    updatePortfolio({ fds });
    setShowModal(false);
  };

  const totalP = portfolio.fds.reduce((a,f)=>a+f.principal,0);
  const totalM = portfolio.fds.reduce((a,f)=>a+f.maturityAmount,0);

  return (
    <div>
      <div className="topbar"><div><div className="page-title">Fixed Deposits</div><div className="page-sub">Track FD investments and maturity dates</div></div><button className="btn btn-gold" onClick={openAdd}><Icon name="plus" size={16}/>Add FD</button></div>
      <div className="content">
        <div className="grid-3" style={{ marginBottom:24 }}>
          {[
            { label:"Total Principal",  value:fmt(totalP), sub:`${portfolio.fds.length} FDs` },
            { label:"Total at Maturity",value:fmt(totalM), sub:"Including interest", col:"var(--gold)" },
            { label:"Interest Earned",  value:fmt(totalM-totalP), sub:`Avg ${portfolio.fds.length>0?(portfolio.fds.reduce((a,f)=>a+f.rate,0)/portfolio.fds.length).toFixed(2):0}% p.a.`, col:"var(--green)" },
          ].map(c=>(
            <div key={c.label} className="card">
              <div className="card-label">{c.label}</div>
              <div className="card-value" style={{fontSize:22,color:c.col||"var(--text)"}}>{c.value}</div>
              <div style={{fontSize:12,color:"var(--text3)",marginTop:4}}>{c.sub}</div>
            </div>
          ))}
        </div>

        {portfolio.fds.length === 0 ? (
          <div className="card"><div className="empty"><div className="empty-icon">🏦</div><div style={{fontSize:16,color:"var(--text2)",marginBottom:6}}>No Fixed Deposits</div><div style={{fontSize:13,marginBottom:20}}>Add your first FD to track it</div><button className="btn btn-gold" onClick={openAdd}><Icon name="plus" size={16}/>Add FD</button></div></div>
        ) : (
          <div className="card"><div className="table-wrap"><table className="table">
            <thead><tr><th>Bank</th><th>Type</th><th>Principal</th><th>Rate</th><th>Tenure</th><th>Start</th><th>Maturity</th><th>Maturity Amt</th><th>Days Left</th><th></th></tr></thead>
            <tbody>
              {portfolio.fds.map(fd=>{
                const d=daysDiff(fd.maturityDate);
                return (
                  <tr key={fd.id}>
                    <td>{fd.bank}<div style={{fontSize:11,color:"var(--text3)"}}>{fd.accountNo}</div></td>
                    <td><span className="chip chip-blue">{fd.fdType}</span></td>
                    <td>{fmt(fd.principal)}</td>
                    <td className="green">{fd.rate}%</td>
                    <td>{fd.tenure} {fd.tenureType}</td>
                    <td>{fmtDate(fd.startDate)}</td>
                    <td>{fmtDate(fd.maturityDate)}</td>
                    <td style={{color:"var(--gold)",fontWeight:600}}>{fmt(fd.maturityAmount)}</td>
                    <td><span className={`chip ${d<=30?"chip-red":d<=90?"chip-orange":"chip-green"}`}>{d>0?`${d}d`:"Matured"}</span></td>
                    <td style={{textAlign:"center"}}><div style={{display:"flex",gap:6,justifyContent:"flex-end"}}>
                      <button className="btn-icon" onClick={()=>openEdit(fd)}><Icon name="edit" size={14}/></button>
                      <button className="btn-icon" style={{borderColor:"rgba(240,96,90,.3)",color:"var(--red)"}} onClick={()=>del(fd.id)}><Icon name="trash" size={14}/></button>
                    </div></td>
                  </tr>
                );
              })}
            </tbody>
          </table></div></div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay"><div className="modal">
          <div className="modal-header"><div className="modal-title">{editing?"Edit":"Add"} Fixed Deposit</div><button className="btn-icon" onClick={()=>setShowModal(false)}><Icon name="x" size={16}/></button></div>
          <div className="modal-body">
            {formError && <div className="alert alert-red"><Icon name="info" size={14}/>{formError}</div>}
            <div className="form-row">
              <div className="form-group"><label className="form-label">Bank Name *</label><input className="form-input" value={form.bank} onChange={e=>setForm({...form,bank:e.target.value})} placeholder="State Bank of India"/></div>
              <div className="form-group"><label className="form-label">FD / Account No.</label><input className="form-input" value={form.accountNo} onChange={e=>setForm({...form,accountNo:e.target.value})} placeholder="FD123456"/></div>
            </div>
            <div className="form-row">
              <div className="form-group"><label className="form-label">Principal Amount *</label><input className="form-input" type="number" value={form.principal} onChange={e=>setForm({...form,principal:e.target.value})} placeholder="100000"/></div>
              <div className="form-group"><label className="form-label">Interest Rate (% p.a.) *</label><input className="form-input" type="number" value={form.rate} onChange={e=>setForm({...form,rate:e.target.value})} placeholder="7.5" step="0.1"/></div>
            </div>
            <div className="form-row">
              <div className="form-group"><label className="form-label">Tenure *</label><div style={{display:"flex",gap:8}}>
                <input className="form-input" type="number" value={form.tenure} onChange={e=>setForm({...form,tenure:e.target.value})} placeholder="12" style={{flex:1}}/>
                <select className="form-input" value={form.tenureType} onChange={e=>setForm({...form,tenureType:e.target.value})} style={{width:110}}>
                  <option value="months">Months</option><option value="years">Years</option>
                </select>
              </div></div>
              <div className="form-group"><label className="form-label">FD Type</label>
                <select className="form-input" value={form.fdType} onChange={e=>setForm({...form,fdType:e.target.value})}>
                  <option>Cumulative</option><option>Non-Cumulative</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group"><label className="form-label">Start Date *</label><input className="form-input" type="date" value={form.startDate} onChange={e=>setForm({...form,startDate:e.target.value})}/></div>
              <div className="form-group"><label className="form-label">Notes</label><input className="form-input" value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} placeholder="Optional"/></div>
            </div>
            {form.principal && form.rate && form.tenure && (
              <div className="alert alert-green"><Icon name="info" size={16}/><div>
                <strong>Estimated maturity: </strong>{fmt(calcMaturity(form.principal,form.rate,form.tenure,form.tenureType,form.fdType))}<br/>
                <span style={{fontSize:12}}>Interest: {fmt(calcMaturity(form.principal,form.rate,form.tenure,form.tenureType,form.fdType)-parseFloat(form.principal))}</span>
              </div></div>
            )}
          </div>
          <div className="modal-footer"><button className="btn btn-outline" onClick={()=>setShowModal(false)}>Cancel</button><button className="btn btn-gold" onClick={save}>{editing?"Update":"Add"} FD</button></div>
        </div></div>
      )}
    </div>
  );
}

// ─── INSURANCE PAGE ────────────────────────────────────────────────────────────
function InsurancePage({ portfolio, updatePortfolio }) {
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing]     = useState(null);
  const [formError, setFormError] = useState("");
  const emptyForm = { name:"", policyNo:"", insurer:"", type:"Life", sumAssured:"", premium:"", frequency:"Annual", startDate:"", maturityDate:"", nextPremium:"", nominee:"", notes:"" };
  const [form, setForm] = useState(emptyForm);

  const openAdd  = () => { setEditing(null); setForm(emptyForm); setFormError(""); setShowModal(true); };
  const openEdit = (ins) => { setEditing(ins.id); setForm(ins); setFormError(""); setShowModal(true); };
  const del      = (id) => { if (window.confirm("Delete this policy?")) updatePortfolio({ insurances: portfolio.insurances.filter(i=>i.id!==id) }); };

  const save = () => {
    if (!form.name || !form.insurer || !form.sumAssured || !form.premium || !form.nextPremium) { setFormError("Fill all required fields."); return; }
    const ins = { ...form, id:editing||uid(), sumAssured:parseFloat(form.sumAssured), premium:parseFloat(form.premium) };
    const insurances = editing ? portfolio.insurances.map(i=>i.id===editing?ins:i) : [...portfolio.insurances, ins];
    updatePortfolio({ insurances });
    setShowModal(false);
  };

  const totalAssured = portfolio.insurances.reduce((a,i)=>a+i.sumAssured,0);
  const totalPremium = portfolio.insurances.reduce((a,i)=>a+i.premium,0);

  return (
    <div>
      <div className="topbar"><div><div className="page-title">Insurance Policies</div><div className="page-sub">Manage policies and premium reminders</div></div><button className="btn btn-gold" onClick={openAdd}><Icon name="plus" size={16}/>Add Policy</button></div>
      <div className="content">
        <div className="grid-3" style={{ marginBottom:24 }}>
          {[
            { label:"Total Sum Assured",  value:fmt(totalAssured), sub:`${portfolio.insurances.length} policies` },
            { label:"Annual Premium",     value:fmt(totalPremium), sub:"Total annual outflow" },
            { label:"Due Within 30 Days", value:portfolio.insurances.filter(i=>{ const d=daysDiff(i.nextPremium); return d>=0&&d<=30; }).length+" policies", sub:"Check Reminders tab" },
          ].map(c=>(
            <div key={c.label} className="card">
              <div className="card-label">{c.label}</div>
              <div className="card-value" style={{fontSize:22}}>{c.value}</div>
              <div style={{fontSize:12,color:"var(--text3)",marginTop:4}}>{c.sub}</div>
            </div>
          ))}
        </div>

        {portfolio.insurances.length === 0 ? (
          <div className="card"><div className="empty"><div className="empty-icon">🛡️</div><div style={{fontSize:16,color:"var(--text2)",marginBottom:6}}>No Insurance Policies</div><div style={{fontSize:13,marginBottom:20}}>Track policies and never miss a premium</div><button className="btn btn-gold" onClick={openAdd}><Icon name="plus" size={16}/>Add Policy</button></div></div>
        ) : (
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {portfolio.insurances.map(ins=>{
              const premDays = daysDiff(ins.nextPremium);
              return (
                <div key={ins.id} className="card">
                  <div style={{display:"flex",alignItems:"flex-start",gap:16}}>
                    <div style={{width:44,height:44,borderRadius:12,background:"var(--surface3)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>
                      {ins.type==="Life"?"🛡️":ins.type==="Health"?"❤️":ins.type==="Vehicle"?"🚗":ins.type==="Term"?"⏱️":"📋"}
                    </div>
                    <div style={{flex:1}}>
                      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                        <div style={{fontWeight:600,fontSize:15}}>{ins.name}</div>
                        <span className={`chip ${ins.type==="Life"||ins.type==="Term"?"chip-blue":ins.type==="Health"?"chip-red":"chip-gold"}`}>{ins.type}</span>
                      </div>
                      <div style={{fontSize:13,color:"var(--text3)",marginBottom:10}}>{ins.insurer} · Policy: {ins.policyNo||"—"} · Nominee: {ins.nominee||"—"}</div>
                      <div className="grid-4" style={{gap:10}}>
                        {[
                          { label:"Sum Assured", value:fmt(ins.sumAssured),  color:"var(--gold)" },
                          { label:"Premium",     value:`${fmt(ins.premium)} / ${ins.frequency?.toLowerCase()}`, color:"var(--text)" },
                          { label:"Next Premium",value:fmtDate(ins.nextPremium), color:premDays<=7?"var(--red)":premDays<=30?"var(--orange)":"var(--green)" },
                          { label:"Maturity",    value:ins.maturityDate?fmtDate(ins.maturityDate):"—", color:"var(--text2)" },
                        ].map(s=>(
                          <div key={s.label} style={{background:"var(--surface2)",padding:"10px 12px",borderRadius:8}}>
                            <div style={{fontSize:11,color:"var(--text3)",marginBottom:3}}>{s.label}</div>
                            <div style={{fontSize:13,fontWeight:600,color:s.color}}>{s.value}</div>
                          </div>
                        ))}
                      </div>
                      {premDays>=0&&premDays<=30&&(
                        <div className={`alert ${premDays<=7?"alert-red":"alert-warn"}`} style={{marginTop:10,marginBottom:0,padding:"8px 12px"}}>
                          <Icon name="bell" size={14}/>
                          <span style={{fontSize:12}}>Premium due in <strong>{premDays} days</strong> — {fmtDate(ins.nextPremium)}</span>
                        </div>
                      )}
                    </div>
                    <div style={{display:"flex",gap:6,flexShrink:0}}>
                      <button className="btn-icon" onClick={()=>openEdit(ins)}><Icon name="edit" size={15}/></button>
                      <button className="btn-icon" style={{borderColor:"rgba(240,96,90,.3)",color:"var(--red)"}} onClick={()=>del(ins.id)}><Icon name="trash" size={15}/></button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay"><div className="modal" style={{maxWidth:580}}>
          <div className="modal-header"><div className="modal-title">{editing?"Edit":"Add"} Insurance Policy</div><button className="btn-icon" onClick={()=>setShowModal(false)}><Icon name="x" size={16}/></button></div>
          <div className="modal-body">
            {formError && <div className="alert alert-red"><Icon name="info" size={14}/>{formError}</div>}
            <div className="form-row">
              <div className="form-group"><label className="form-label">Policy Name *</label><input className="form-input" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="LIC Jeevan Anand"/></div>
              <div className="form-group"><label className="form-label">Policy Number</label><input className="form-input" value={form.policyNo} onChange={e=>setForm({...form,policyNo:e.target.value})} placeholder="123456789"/></div>
            </div>
            <div className="form-row">
              <div className="form-group"><label className="form-label">Insurer *</label><input className="form-input" value={form.insurer} onChange={e=>setForm({...form,insurer:e.target.value})} placeholder="LIC of India"/></div>
              <div className="form-group"><label className="form-label">Type</label>
                <select className="form-input" value={form.type} onChange={e=>setForm({...form,type:e.target.value})}>
                  <option>Life</option><option>Term</option><option>Health</option><option>Vehicle</option><option>Property</option><option>ULIP</option><option>Other</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group"><label className="form-label">Sum Assured *</label><input className="form-input" type="number" value={form.sumAssured} onChange={e=>setForm({...form,sumAssured:e.target.value})} placeholder="500000"/></div>
              <div className="form-group"><label className="form-label">Premium Amount *</label><input className="form-input" type="number" value={form.premium} onChange={e=>setForm({...form,premium:e.target.value})} placeholder="12000"/></div>
            </div>
            <div className="form-row">
              <div className="form-group"><label className="form-label">Payment Frequency</label>
                <select className="form-input" value={form.frequency} onChange={e=>setForm({...form,frequency:e.target.value})}>
                  <option>Annual</option><option>Semi-Annual</option><option>Quarterly</option><option>Monthly</option>
                </select>
              </div>
              <div className="form-group"><label className="form-label">Next Premium Due *</label><input className="form-input" type="date" value={form.nextPremium} onChange={e=>setForm({...form,nextPremium:e.target.value})}/></div>
            </div>
            <div className="form-row">
              <div className="form-group"><label className="form-label">Start Date</label><input className="form-input" type="date" value={form.startDate} onChange={e=>setForm({...form,startDate:e.target.value})}/></div>
              <div className="form-group"><label className="form-label">Maturity Date</label><input className="form-input" type="date" value={form.maturityDate} onChange={e=>setForm({...form,maturityDate:e.target.value})}/></div>
            </div>
            <div className="form-group"><label className="form-label">Nominee</label><input className="form-input" value={form.nominee} onChange={e=>setForm({...form,nominee:e.target.value})} placeholder="Spouse / Child name"/></div>
            <div className="form-group"><label className="form-label">Notes</label><textarea className="form-input" value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} rows={2} placeholder="Optional notes"/></div>
          </div>
          <div className="modal-footer"><button className="btn btn-outline" onClick={()=>setShowModal(false)}>Cancel</button><button className="btn btn-gold" onClick={save}>{editing?"Update":"Add"} Policy</button></div>
        </div></div>
      )}
    </div>
  );
}

// ─── REMINDERS PAGE ────────────────────────────────────────────────────────────
function RemindersPage({ portfolio }) {
  const { insurances, fds } = portfolio;
  const all = [];

  insurances.forEach(ins => {
    const pd = daysDiff(ins.nextPremium);
    if (pd >= 0) all.push({ icon:"🛡️", title:`Premium Due — ${ins.name}`, subtitle:`${ins.insurer} · ${fmt(ins.premium)} / ${ins.frequency}`, date:ins.nextPremium, days:pd, urgency:pd<=7?"urgent":pd<=30?"warning":"ok" });
    if (ins.maturityDate) {
      const md = daysDiff(ins.maturityDate);
      if (md >= 0 && md <= 180) all.push({ icon:"📋", title:`Policy Maturity — ${ins.name}`, subtitle:`${ins.insurer} · Sum Assured: ${fmt(ins.sumAssured)}`, date:ins.maturityDate, days:md, urgency:md<=30?"urgent":md<=90?"warning":"ok" });
    }
  });

  fds.forEach(fd => {
    const d = daysDiff(fd.maturityDate);
    if (d >= 0 && d <= 180) all.push({ icon:"🏦", title:`FD Maturity — ${fd.bank}`, subtitle:`Principal: ${fmt(fd.principal)} → Maturity: ${fmt(fd.maturityAmount)}`, date:fd.maturityDate, days:d, urgency:d<=7?"urgent":d<=30?"warning":"ok" });
  });

  all.sort((a,b) => a.days - b.days);
  const groups = [
    { key:"urgent",  label:"URGENT — Within 7 Days",      color:"var(--red)",    icon:"warn" },
    { key:"warning", label:"DUE SOON — Within 30 Days",   color:"var(--orange)", icon:"bell" },
    { key:"ok",      label:"UPCOMING — Within 6 Months",  color:"var(--text2)",  icon:"calendar" },
  ];

  const ReminderItem = ({ r }) => (
    <div className={`reminder-item ${r.urgency}`}>
      <div style={{fontSize:24}}>{r.icon}</div>
      <div style={{flex:1}}>
        <div style={{fontWeight:600,fontSize:14,color:"var(--text)"}}>{r.title}</div>
        <div style={{fontSize:12,color:"var(--text3)",marginTop:2}}>{r.subtitle}</div>
      </div>
      <div style={{textAlign:"right",flexShrink:0}}>
        <div style={{fontSize:12,color:"var(--text3)"}}>{fmtDate(r.date)}</div>
        <span className={`chip ${r.urgency==="urgent"?"chip-red":r.urgency==="warning"?"chip-orange":"chip-green"}`} style={{marginTop:4}}>
          {r.days===0?"Today":`${r.days} days`}
        </span>
      </div>
    </div>
  );

  return (
    <div>
      <div className="topbar"><div><div className="page-title">Reminders</div><div className="page-sub">Upcoming premium payments and maturities</div></div></div>
      <div className="content">
        {all.length === 0 && (
          <div className="card"><div className="empty"><div className="empty-icon">🔔</div><div style={{fontSize:16,color:"var(--text2)",marginBottom:6}}>No Upcoming Reminders</div><div style={{fontSize:13}}>Add insurance policies or FDs to see reminders here</div></div></div>
        )}
        {groups.map(g => {
          const items = all.filter(r => r.urgency === g.key);
          if (!items.length) return null;
          return (
            <div key={g.key} style={{marginBottom:24}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
                <Icon name={g.icon} size={16}/><div style={{fontWeight:700,color:g.color,fontSize:14}}>{g.label} ({items.length})</div>
              </div>
              {items.map((r,i) => <ReminderItem key={i} r={r} />)}
            </div>
          );
        })}
      </div>
    </div>
  );
}
