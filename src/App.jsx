import { useEffect, useState, useRef } from "react";

function isSandboxedEnv() {
  try {
    if (window.self === window.top) return false;
    if (window.frameElement && window.frameElement.hasAttribute("sandbox"))
      return true;
    try {
      document.domain = document.domain;
      if (window.frameElement && !window.frameElement.getAttribute("sandbox"))
        return false;
    } catch {
      return true;
    }
    return false;
  } catch {
    return true;
  }
}

function useCountdown() {
  const [timeStr, setTimeStr] = useState("--:--:--");
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    function tick() {
      const now = new Date();
      const match = new Date(now);
      match.setHours(19, 30, 0, 0);
      const diff = match - now;
      if (diff <= 0) {
        setHidden(true);
        return;
      }
      const h = Math.floor(diff / 3600000),
        m = Math.floor((diff % 3600000) / 60000),
        s = Math.floor((diff % 60000) / 1000);
      setTimeStr(
        `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`,
      );
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return { timeStr, hidden };
}

const CHANNELS = [
  {
    id: "hindi",
    name: "Star Sports 1 Hindi",
    label: "Star Sports 1 Hindi",
    lang: "Hindi",
    src: "https://tatticdn.pages.dev/CDN3/?ch=H1",
    badge: "Hindi",
    color: "#a855f7",
  },
  {
    id: "hindi2",
    name: "Star Sports 2 Hindi",
    label: "Star Sports 2 Hindi",
    lang: "Hindi",
    src: "https://tatticdn.pages.dev/CDN3/?ch=H2",
    badge: "Hindi",
    color: "#a855f7",
  },
  {
    id: "eng1",
    name: "Star Sports 1 English",
    label: "Star Sports 1 English",
    lang: "English",
    src: "https://tatticdn.pages.dev/CDN3/?ch=E1",
    badge: "English",
    color: "#3b82f6",
  },
  {
    id: "eng2",
    name: "Star Sports 2 English",
    label: "Star Sports 2 English",
    lang: "English",
    src: "https://tatticdn.pages.dev/CDN3/?ch=E2",
    badge: "English",
    color: "#3b82f6",
  },
  {
    id: "zee",
    name: "Zee Cinema HD",
    label: "Zee Cinema HD",
    lang: "Hindi",
    src: "https://zee-seven.vercel.app/",
    badge: "Cinema",
    color: "#f97316",
  },
  {
    id: "sony",
    name: "Sony Ten 3 Hindi",
    label: "Sony Ten 3",
    lang: "Hindi",
    src: "https://allrounderlive.in/hindi",
    badge: "Sony Ten",
    color: "#ef4444",
  },
  {
    id: "willow",
    name: "Willow Sports",
    label: "Willow Sports",
    lang: "English",
    src: "https://amg01269-amg01269c1-sportstribal-emea-5204.playouts.now.amagi.tv/playlist/amg01269-willowtvfast-willowplus-sportstribalemea/playlist.m3u8",
    badge: "Willow",
    color: "#22c55e",
  },
];

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
html,body,#root{background:#0b0d14;color:#fff;font-family:'Inter',sans-serif;min-height:100vh}

@keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
@keyframes livePulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.6;transform:scale(.9)}}
@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes shimmer{0%{background-position:-400px 0}100%{background-position:400px 0}}
@keyframes glowPulse{0%,100%{box-shadow:0 0 20px rgba(139,92,246,.2)}50%{box-shadow:0 0 40px rgba(139,92,246,.5)}}
@keyframes borderAnim{0%,100%{border-color:rgba(139,92,246,.3)}50%{border-color:rgba(139,92,246,.7)}}
@keyframes scanDown{0%{top:-4px}100%{top:100%}}
@keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes gradMove{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
@keyframes ripple{0%{transform:scale(.8);opacity:1}100%{transform:scale(2.4);opacity:0}}

.app{min-height:100vh;background:#0b0d14;overflow-x:hidden}

/* ─ NAVBAR ─ */
.nav{position:sticky;top:0;z-index:200;background:rgba(11,13,20,.96);backdrop-filter:blur(24px);border-bottom:1px solid rgba(255,255,255,.06)}
.nav-in{max-width:1320px;margin:0 auto;height:66px;display:flex;align-items:center;justify-content:space-between;padding:0 28px}
.logo{display:flex;align-items:center;gap:10px;text-decoration:none}
.logo-mark{width:38px;height:38px;border-radius:12px;background:linear-gradient(135deg,#7c3aed,#a855f7);display:flex;align-items:center;justify-content:center;font-size:20px;animation:floatY 3s ease-in-out infinite;flex-shrink:0}
.logo-name{font-size:24px;font-weight:900;letter-spacing:-.5px;line-height:1}
.logo-six{background:linear-gradient(135deg,#a855f7,#c084fc);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.logo-storm{color:#fff}
.nav-links{display:flex;gap:28px;list-style:none}
.nav-links a{color:rgba(255,255,255,.5);font-size:13px;font-weight:500;text-decoration:none;transition:color .2s;display:flex;align-items:center;gap:5px}
.nav-links a:hover{color:#a855f7}
.nav-right{display:flex;align-items:center;gap:12px}
.live-pill{display:flex;align-items:center;gap:7px;background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.3);color:#f87171;font-size:10px;font-weight:800;letter-spacing:1.5px;padding:6px 14px;border-radius:100px}
.live-dot{width:7px;height:7px;background:#ef4444;border-radius:50%;animation:livePulse 1.4s ease-in-out infinite;position:relative}
.live-dot::after{content:'';position:absolute;inset:-3px;border-radius:50%;border:1px solid rgba(239,68,68,.5);animation:ripple 1.4s ease-in-out infinite}

/* ─ HERO BANNER ─ */
.hero{position:relative;overflow:hidden;background:linear-gradient(180deg,rgba(109,40,217,.15) 0%,rgba(11,13,20,0) 100%);padding:36px 28px 32px;border-bottom:1px solid rgba(255,255,255,.05)}
.hero::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(139,92,246,.6),transparent)}
.hero-bg-glow{position:absolute;top:-80px;left:50%;transform:translateX(-50%);width:600px;height:300px;background:radial-gradient(ellipse,rgba(109,40,217,.25) 0%,transparent 70%);pointer-events:none}
.hero-in{max-width:1320px;margin:0 auto;position:relative;z-index:1;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px}
.hero-left{}
.hero-eyebrow{display:flex;align-items:center;gap:8px;margin-bottom:8px}
.hero-tag{background:rgba(139,92,246,.2);border:1px solid rgba(139,92,246,.4);color:#c084fc;font-size:10px;font-weight:700;letter-spacing:1.5px;padding:4px 10px;border-radius:4px;text-transform:uppercase}
.hero-h1{font-size:32px;font-weight:900;letter-spacing:-1px;line-height:1.1;margin-bottom:8px}
.hero-h1 span{background:linear-gradient(135deg,#a855f7,#c084fc,#e879f9);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.hero-sub{font-size:14px;color:rgba(255,255,255,.4);font-weight:400}
.hero-stats{display:flex;gap:24px}
.hero-stat{text-align:center}
.hero-stat-num{font-size:20px;font-weight:800;color:#a855f7}
.hero-stat-label{font-size:10px;color:rgba(255,255,255,.35);font-weight:500;letter-spacing:.5px;text-transform:uppercase}

/* ─ TICKER ─ */
.ticker-wrap{background:linear-gradient(90deg,#6d28d9,#7c3aed,#8b5cf6,#7c3aed,#6d28d9);background-size:200% 100%;animation:gradMove 4s ease infinite;padding:8px 0;overflow:hidden}
.ticker-track{white-space:nowrap;display:inline-block;animation:ticker 38s linear infinite;color:rgba(255,255,255,.9);font-size:11px;font-weight:600;letter-spacing:.8px}

/* ─ MAIN ─ */
.main{max-width:1320px;margin:0 auto;padding:32px 28px 56px;display:flex;gap:28px;align-items:flex-start}
.video-col{flex:1;min-width:0;animation:fadeUp .5s ease both}
.sidebar-col{width:296px;flex-shrink:0;animation:fadeUp .5s ease .1s both}

/* ─ PLAYER ─ */
.player-meta{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px}
.player-meta-left{display:flex;align-items:center;gap:10px}
.player-live-badge{display:flex;align-items:center;gap:6px;background:#ef4444;color:#fff;font-size:10px;font-weight:800;letter-spacing:1px;padding:4px 10px;border-radius:5px}
.player-live-dot{width:5px;height:5px;background:#fff;border-radius:50%;animation:livePulse 1s infinite}
.player-ch-name{font-size:16px;font-weight:700;color:#fff}
.player-badges{display:flex;gap:6px}
.pbadge{font-size:10px;font-weight:700;padding:4px 10px;border-radius:5px;letter-spacing:.3px}
.pbadge-hd{background:rgba(255,255,255,.07);color:rgba(255,255,255,.45)}
.pbadge-free{background:rgba(34,197,94,.1);color:#4ade80;border:1px solid rgba(34,197,94,.2)}
.pbadge-ch{background:rgba(139,92,246,.15);color:#c084fc;border:1px solid rgba(139,92,246,.3)}

.player-wrap{position:relative;width:100%;aspect-ratio:16/9;border-radius:18px;overflow:hidden;background:#000;border:1px solid rgba(139,92,246,.2);animation:borderAnim 3s ease-in-out infinite}
.player-glow{position:absolute;inset:-2px;border-radius:20px;background:linear-gradient(135deg,rgba(139,92,246,.15),transparent,rgba(59,130,246,.1));pointer-events:none;z-index:1}
.player-scan{position:absolute;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,rgba(139,92,246,.6),transparent);z-index:2;pointer-events:none;animation:scanDown 3.5s linear infinite}
.player-wrap iframe{width:100%;height:100%;border:none;display:block;position:relative;z-index:0}
.player-tags{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}
.ptag{font-size:11px;color:rgba(255,255,255,.4);background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);padding:5px 13px;border-radius:100px;font-weight:500}

/* ─ SIDEBAR ─ */
.sb-box{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:16px;overflow:hidden;margin-bottom:16px}
.sb-head{padding:14px 16px;border-bottom:1px solid rgba(255,255,255,.05);display:flex;align-items:center;justify-content:space-between}
.sb-title{font-size:10px;font-weight:700;letter-spacing:2px;color:rgba(255,255,255,.3);text-transform:uppercase}
.sb-count{font-size:10px;font-weight:700;background:rgba(139,92,246,.2);color:#a855f7;padding:3px 9px;border-radius:100px}
.ch-list{padding:8px}
.ch-item{display:flex;align-items:center;justify-content:space-between;padding:9px 10px;border-radius:10px;cursor:pointer;transition:all .18s;margin-bottom:2px;border:1px solid transparent}
.ch-item:hover{background:rgba(255,255,255,.04)}
.ch-item.active{background:rgba(139,92,246,.1);border-color:rgba(139,92,246,.3)}
.ch-left{display:flex;align-items:center;gap:10px}
.ch-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}
.ch-name{font-size:12px;font-weight:600;color:rgba(255,255,255,.65);transition:color .15s}
.ch-item.active .ch-name{color:#c084fc}
.ch-lang{font-size:10px;color:rgba(255,255,255,.28);margin-top:1px}
.ch-live{font-size:9px;font-weight:700;background:#ef4444;color:#fff;padding:2px 7px;border-radius:4px;letter-spacing:.3px;animation:livePulse 1.8s ease-in-out infinite}

/* ─ CTA CARD ─ */
.cta-wrap{border-radius:16px;overflow:hidden;position:relative;background:linear-gradient(135deg,#1a0533,#0f0320);border:1px solid rgba(139,92,246,.25);text-decoration:none;display:block;padding:22px;text-align:center;transition:all .25s}
.cta-wrap:hover{border-color:rgba(139,92,246,.5);transform:translateY(-2px)}
.cta-wrap::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 50% 0%,rgba(139,92,246,.2),transparent 70%);pointer-events:none}
.cta-icon{font-size:30px;margin-bottom:10px;animation:floatY 2.5s ease-in-out infinite}
.cta-title{font-size:15px;font-weight:800;color:#e879f9;margin-bottom:4px}
.cta-url{font-size:10px;color:rgba(255,255,255,.25);margin-bottom:14px;letter-spacing:.3px}
.cta-btn{display:inline-block;background:rgba(139,92,246,.2);border:1px solid rgba(139,92,246,.4);color:#c084fc;font-size:11px;font-weight:700;padding:8px 22px;border-radius:8px;transition:all .2s;letter-spacing:.5px}
.cta-wrap:hover .cta-btn{background:rgba(139,92,246,.35);border-color:rgba(139,92,246,.6)}

/* ─ FOOTER ─ */
.footer{background:#080a10;border-top:1px solid rgba(255,255,255,.05);margin-top:0}
.footer-in{max-width:1320px;margin:0 auto;padding:48px 28px 28px}
.footer-grid{display:grid;grid-template-columns:1.8fr 1fr 1fr;gap:48px;margin-bottom:40px}
.footer-desc{font-size:13px;color:rgba(255,255,255,.28);line-height:1.75;margin-top:12px}
.footer-col-h{font-size:10px;font-weight:700;letter-spacing:2px;color:rgba(255,255,255,.2);text-transform:uppercase;margin-bottom:14px}
.footer-links{list-style:none;display:flex;flex-direction:column;gap:9px}
.footer-links a{font-size:13px;color:rgba(255,255,255,.35);text-decoration:none;transition:color .2s;display:flex;align-items:center;gap:8px}
.footer-links a:hover{color:#a855f7}
.footer-visit{display:inline-flex;align-items:center;gap:8px;margin-top:14px;background:rgba(139,92,246,.12);border:1px solid rgba(139,92,246,.28);color:#c084fc;font-size:12px;font-weight:700;padding:9px 18px;border-radius:9px;text-decoration:none;transition:all .2s}
.footer-visit:hover{background:rgba(139,92,246,.22);border-color:rgba(139,92,246,.5)}
.footer-bottom{border-top:1px solid rgba(255,255,255,.05);padding-top:22px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px}
.footer-copy{font-size:11px;color:rgba(255,255,255,.18)}
.footer-credit{font-size:11px;color:rgba(255,255,255,.2);display:flex;align-items:center;gap:6px}
.footer-credit .name{background:linear-gradient(135deg,#a855f7,#e879f9);-webkit-background-clip:text;-webkit-text-fill-color:transparent;font-weight:700;font-size:12px}

/* ─ BLOCK ─ */
.block-overlay{position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.88);backdrop-filter:blur(16px);display:flex;align-items:center;justify-content:center}
.block-card{background:#0f1120;border:1px solid rgba(139,92,246,.3);border-radius:22px;padding:44px;text-align:center;max-width:400px;width:90%}
.block-icon{font-size:48px;margin-bottom:18px}
.block-h{font-size:22px;font-weight:800;color:#a855f7;margin-bottom:10px}
.block-p{font-size:14px;color:rgba(255,255,255,.38);line-height:1.6}

@media(max-width:1024px){.main{flex-direction:column}.sidebar-col{width:100%}.ch-list{display:grid;grid-template-columns:repeat(auto-fill,minmax(195px,1fr));gap:5px}.footer-grid{grid-template-columns:1fr 1fr}}
@media(max-width:640px){.nav-links{display:none}.hero-h1{font-size:24px}.hero-stats{display:none}.main{padding:20px 16px 40px}.footer-grid{grid-template-columns:1fr}.hero{padding:24px 16px 20px}}
`;

function Navbar() {
  return (
    <nav className="nav">
      <div className="nav-in">
        <a href="#" className="logo">
          <div className="logo-mark">⚡</div>
          <div className="logo-name">
            <span className="logo-six">Six</span>
            <span className="logo-storm">Storm</span>
          </div>
        </a>
        <ul className="nav-links">
          <li>
            <a
              href="https://sixstorm-live-0kkp.onrender.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              🏏 Cricket
            </a>
          </li>
          <li>
            <a
              href="https://sixstorm-live-0kkp.onrender.com/points"
              target="_blank"
              rel="noopener noreferrer"
            >
              📊 Points Table
            </a>
          </li>
          <li>
            <a
              href="https://sixstorm-live-0kkp.onrender.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              📅 Schedule
            </a>
          </li>
          <li>
            <a
              href="https://sixstorm-live-0kkp.onrender.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              🏆 More Sports
            </a>
          </li>
        </ul>
        <div className="nav-right">
          <div className="live-pill">
            <div className="live-dot"></div>
            LIVE NOW
          </div>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <div className="hero">
      <div className="hero-bg-glow"></div>
      <div className="hero-in">
        <div className="hero-left">
          <div className="hero-eyebrow">
            <span className="hero-tag">🏏 IPL 2026 Live</span>
          </div>
          <h1 className="hero-h1">
            Watch Cricket
            <br />
            <span>Free & In HD</span>
          </h1>
          <p className="hero-sub">
            No signup · No buffering · All channels in one place
          </p>
        </div>
        <div className="hero-stats">
          <div className="hero-stat">
            <div className="hero-stat-num">7+</div>
            <div className="hero-stat-label">Live Channels</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-num">HD</div>
            <div className="hero-stat-label">Stream Quality</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-num">FREE</div>
            <div className="hero-stat-label">No Cost</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Ticker() {
  const items = [
    "⚡ SixStorm — Premium Free Sports Streaming",
    "🏏 IPL 2026 Live & Free",
    "📺 HD No Buffering",
    "📱 Mobile & Desktop",
    "🌐 sixstorm-live-0kkp.onrender.com",
    "🔥 Star Sports · Sony Ten · Willow · Zee Cinema",
  ];
  const t = items.join("   ◆   ");
  return (
    <div className="ticker-wrap">
      <div className="ticker-track">
        {t}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{t}
      </div>
    </div>
  );
}

function VideoCard({ activeChannel }) {
  return (
    <div>
      <div className="player-meta">
        <div className="player-meta-left">
          <div className="player-live-badge">
            <div className="player-live-dot"></div>LIVE
          </div>
          <div className="player-ch-name">{activeChannel.label}</div>
        </div>
        <div className="player-badges">
          <span className="pbadge pbadge-hd">HD</span>
          <span className="pbadge pbadge-free">FREE</span>
          <span className="pbadge pbadge-ch">{activeChannel.badge}</span>
        </div>
      </div>
      <div className="player-wrap">
        <div className="player-glow"></div>
        <div className="player-scan"></div>
        <iframe
          key={activeChannel.id}
          src={activeChannel.src}
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </div>
      <div className="player-tags">
        {[
          "📡 Live Stream",
          `🔊 ${activeChannel.lang} Commentary`,
          "📺 1080p HD",
          "⚡ Ultra Low Latency",
          "🔓 Free · No Login",
        ].map((t) => (
          <span key={t} className="ptag">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function Sidebar({ activeId, onSelect }) {
  return (
    <div>
      <div className="sb-box">
        <div className="sb-head">
          <span className="sb-title">Live Channels</span>
          <span className="sb-count">{CHANNELS.length} Live</span>
        </div>
        <div className="ch-list">
          {CHANNELS.map((ch) => {
            const active = ch.id === activeId;
            return (
              <div
                key={ch.id}
                className={`ch-item${active ? " active" : ""}`}
                onClick={() => onSelect(ch.id)}
              >
                <div className="ch-left">
                  <div
                    className="ch-dot"
                    style={{
                      background: active ? ch.color : "rgba(255,255,255,.15)",
                    }}
                  ></div>
                  <div>
                    <div className="ch-name">{ch.name}</div>
                    <div className="ch-lang">{ch.lang}</div>
                  </div>
                </div>
                {active && <span className="ch-live">LIVE</span>}
              </div>
            );
          })}
        </div>
      </div>
      <a
        href="https://sixstorm-live-0kkp.onrender.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="cta-wrap"
      >
        <div className="cta-icon">🌐</div>
        <div className="cta-title">Official Website</div>
        <div className="cta-url">sixstorm-live-0kkp.onrender.com</div>
        <div className="cta-btn">Visit SixStorm →</div>
      </a>
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-in">
        <div className="footer-grid">
          <div>
            <a href="#" className="logo" style={{ textDecoration: "none" }}>
              <div
                className="logo-mark"
                style={{
                  width: 32,
                  height: 32,
                  fontSize: 16,
                  borderRadius: 9,
                  animation: "none",
                }}
              >
                ⚡
              </div>
              <div className="logo-name" style={{ fontSize: 20 }}>
                <span className="logo-six">Six</span>
                <span className="logo-storm">Storm</span>
              </div>
            </a>
            <p className="footer-desc">
              India's #1 free live sports streaming platform. Watch Cricket,
              Football, Tennis & more in HD — no signup, no cost, ever.
            </p>
          </div>
          <div>
            <div className="footer-col-h">Sports</div>
            <ul className="footer-links">
              {[
                "🏏 Cricket",
                "⚽ Football",
                "🏸 Badminton",
                "🎾 Tennis",
                "🏀 Basketball",
              ].map((s) => (
                <li key={s}>
                  <a href="#">{s}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="footer-col-h">Platform</div>
            <p
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,.28)",
                lineHeight: 1.7,
              }}
            >
              Full schedule, points table & premium channels on the official
              site.
            </p>
            <a
              href="https://sixstorm-live-0kkp.onrender.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-visit"
            >
              🌐 Visit SixStorm →
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">
            © 2026 <strong style={{ color: "#a855f7" }}>SixStorm</strong>. All
            streams from third-party providers. For entertainment only.
          </p>
          <div className="footer-credit">
            Designed by <span className="name">Naveen Rathore</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const { timeStr, hidden } = useCountdown();
  const [blocked, setBlocked] = useState(false);
  const [activeChannelId, setActiveChannelId] = useState(CHANNELS[0].id);
  useEffect(() => {
    if (isSandboxedEnv()) setBlocked(true);
  }, []);
  const activeChannel =
    CHANNELS.find((c) => c.id === activeChannelId) || CHANNELS[0];

  return (
    <>
      <style>{CSS}</style>
      <div className="app">
        {blocked && (
          <div className="block-overlay">
            <div className="block-card">
              <div className="block-icon">🔒</div>
              <h1 className="block-h">Access Blocked</h1>
              <p className="block-p">
                Please open in Chrome and disable AdBlock to watch the live
                stream.
              </p>
            </div>
          </div>
        )}
        <Navbar />
        <Hero />
        <Ticker />
        <main className="main">
          <div className="video-col">
            <VideoCard activeChannel={activeChannel} />
          </div>
          <div className="sidebar-col">
            <Sidebar activeId={activeChannelId} onSelect={setActiveChannelId} />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
