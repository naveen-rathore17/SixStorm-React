import { useEffect, useState } from "react";

// ── Sandbox check ──
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

// ── Countdown ──
function useCountdown() {
  const [timeStr, setTimeStr] = useState("--:--:--");
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    function getMatchTime() {
      const now = new Date();
      const match = new Date(now);
      match.setHours(19, 30, 0, 0);
      return match;
    }

    function tick() {
      const diff = getMatchTime() - new Date();
      if (diff <= 0) {
        setHidden(true);
        return;
      }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
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

// ── Block Overlay ──
function BlockOverlay({ title, message }) {
  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-md">
      <div className="w-[90%] max-w-[420px] rounded-2xl bg-[#0a0e1a] border border-yellow-400/30 p-8 text-center shadow-2xl">
        <div className="text-4xl mb-4">🔒</div>
        <h1 className="text-2xl font-bold text-yellow-400 mb-3">{title}</h1>
        <p className="text-gray-400 text-sm">{message}</p>
      </div>
    </div>
  );
}

// ── Navbar ──
function Navbar() {
  return (
    <nav className="w-full border-b border-white/10 bg-[#060a18]/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="mx-auto flex h-[64px] max-w-[1200px] items-center justify-between px-5">
        {/* Logo */}
        <div className="flex items-center gap-1">
          <span className="text-3xl">⚡</span>
          <div className="text-2xl font-black tracking-tight leading-none">
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #f59e0b, #fcd34d, #f59e0b)",
              }}
            >
              Six
            </span>
            <span className="text-white">Storm</span>
          </div>
        </div>

        {/* Center Nav Links */}
        <div className="hidden sm:flex items-center gap-6 text-sm font-medium text-gray-400">
          <a
            href="https://sixstorm-live-0kkp.onrender.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-400 transition-colors"
          >
            🏏 Cricket
          </a>

          <a
            href="https://sixstorm-live-0kkp.onrender.com/points"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-400 transition-colors"
          >
            🗓️Points Table
          </a>

          <a
            href="https://sixstorm-live-0kkp.onrender.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-400 transition-colors"
          >
            📅 Schedule
          </a>
        </div>

        {/* Live Badge */}
        <div className="flex items-center gap-2 bg-red-600/20 border border-red-500/40 text-red-400 text-xs font-bold px-3 py-1.5 rounded-full animate-pulse">
          <span className="w-2 h-2 bg-red-500 rounded-full shadow-[0_0_6px_#ef4444]"></span>
          LIVE NOW
        </div>
      </div>
    </nav>
  );
}

// ── Match Info Banner ──
function MatchBanner({ timeStr, hidden }) {
  return (
    <div className="w-full bg-gradient-to-r from-yellow-500/10 via-yellow-400/5 to-yellow-500/10 border-b border-yellow-400/20">
      <div className="mx-auto max-w-[1200px] px-5 py-3 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-3 text-sm">
          <span className="text-yellow-400 font-bold">🏏 LIVE CRICKET</span>
          <span className="text-gray-500">•</span>
          <span className="text-gray-300 font-medium">
            HD Stream – Star Sports Hindi
          </span>
        </div>
        {!hidden && (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-400">Match starts in</span>
            <span className="bg-yellow-400 text-black font-black px-3 py-0.5 rounded-md font-mono tracking-widest text-xs">
              {timeStr}
            </span>
          </div>
        )}
        {hidden && (
          <span className="text-green-400 font-bold text-sm animate-pulse">
            🟢 Match is LIVE
          </span>
        )}
      </div>
    </div>
  );
}

// ── Ticker ──
function Ticker() {
  const items = [
    "⚡ SixStorm – Best Sports Streaming",
    "🎯 HD Quality, No Buffering",
    "📱 Works on Mobile & Desktop",
    "🔥 IPL 2025 Live on SixStorm",
    "🌐 Visit sixstorm-live-0kkp.onrender.com",
  ];
  const text = items.join("   ●   ");

  return (
    <div className="w-full bg-yellow-400 overflow-hidden py-1.5">
      <div
        className="whitespace-nowrap text-black text-xs font-bold inline-block"
        style={{
          animation: "tickerScroll 30s linear infinite",
        }}
      >
        {text}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{text}
      </div>
    </div>
  );
}

// ── Video Card ──
function VideoCard() {
  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Card Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-red-500 rounded-full shadow-[0_0_8px_#ef4444] animate-pulse"></span>
          <span className="text-white font-semibold text-sm">
            Star Sports 1 – Hindi
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 bg-white/10 px-2 py-0.5 rounded-full">
            HD
          </span>
          <span className="text-xs text-gray-400 bg-white/10 px-2 py-0.5 rounded-full">
            Free
          </span>
        </div>
      </div>

      {/* Player Wrapper */}
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(251,191,36,0.15)] border border-white/10 bg-black group">
        {/* Glow Ring */}
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-yellow-400/20 via-transparent to-blue-600/20 pointer-events-none"></div>

        <iframe
          // src="https://allrounderlive.in/hindi"
          // src="https://tatticdn.pages.dev/CDN3/?ch=H1"
          src="https://binge-giotv.pages.dev/player2?id=ss1h"
          className="w-full h-full"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </div>

      {/* Stream Quality Badges */}
      <div className="flex flex-wrap items-center gap-2 mt-3 px-1">
        {[
          "📡 Live Stream",
          "🔊 Hindi Commentary",
          "📺 HD 1080p",
          "⚡ Low Latency",
        ].map((b) => (
          <span
            key={b}
            className="text-xs text-gray-300 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full"
          >
            {b}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Sidebar Cards ──
function Sidebar() {
  const channels = [
    { name: "Star Sports 1 HD", lang: "Hindi", active: true, icon: "🟢" },
  ];

  return (
    <div className="w-full lg:w-72 shrink-0 flex flex-col gap-4">
      {/* Channels */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
        <h3 className="text-yellow-400 font-bold text-sm mb-3 uppercase tracking-widest">
          📺 Channels
        </h3>
        <div className="flex flex-col gap-2">
          {channels.map((ch) => (
            <div
              key={ch.name}
              className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                ch.active
                  ? "bg-yellow-400/15 border border-yellow-400/40"
                  : "bg-white/5 border border-transparent hover:border-white/20"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm">{ch.icon}</span>
                <div>
                  <p
                    className={`text-xs font-semibold ${ch.active ? "text-yellow-300" : "text-gray-300"}`}
                  >
                    {ch.name}
                  </p>
                  <p className="text-xs text-gray-500">{ch.lang}</p>
                </div>
              </div>
              {ch.active && (
                <span className="text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded font-bold">
                  LIVE
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Visit Official Website CTA */}
      <a
        href="https://sixstorm-live-0kkp.onrender.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl p-4 text-center hover:from-yellow-300 hover:to-yellow-400 transition-all group shadow-[0_4px_30px_rgba(251,191,36,0.3)]"
      >
        <div className="text-2xl mb-1">🌐</div>
        <p className="text-black font-black text-sm">Official Website</p>
        <p className="text-black/70 text-xs mt-0.5">
          sixstorm-live-0kkp.onrender.com
        </p>
        <div className="mt-2 bg-black/10 rounded-lg py-1.5 text-black text-xs font-bold group-hover:bg-black/20 transition-all">
          Visit Now →
        </div>
      </a>
    </div>
  );
}

// ── Footer ──
function Footer() {
  return (
    <footer className="w-full bg-[#040812] border-t border-white/10 mt-10">
      {/* Main Footer */}
      <div className="mx-auto max-w-[1200px] px-5 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-1 mb-3">
            <span className="text-2xl">⚡</span>
            <div className="text-2xl font-black tracking-tight">
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage: "linear-gradient(135deg, #f59e0b, #fcd34d)",
                }}
              >
                Six
              </span>
              <span className="text-white">Storm</span>
            </div>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed">
            Your #1 destination for free live sports streaming. Cricket,
            Football, Tennis & more – all in HD.
          </p>
        </div>

        {/* Sports Links */}
        <div>
          <h4 className="text-yellow-400 font-bold text-sm uppercase tracking-widest mb-3">
            Sports
          </h4>
          <ul className="flex flex-col gap-2 text-sm text-gray-400">
            {[
              "🏏 Cricket",
              "⚽ Football",
              "🏸 Badminton",
              "🎾 Tennis",
              "🏀 Basketball",
            ].map((s) => (
              <li key={s}>
                <a href="#" className="hover:text-yellow-400 transition-colors">
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Official CTA */}
        <div>
          <h4 className="text-yellow-400 font-bold text-sm uppercase tracking-widest mb-3">
            Official Site
          </h4>
          <p className="text-gray-400 text-sm mb-3">
            For the best experience, more channels & sports content — visit our
            official website:
          </p>
          <a
            href="https://sixstorm-live-0kkp.onrender.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-sm px-4 py-2.5 rounded-xl transition-all shadow-[0_4px_20px_rgba(251,191,36,0.3)]"
          >
            🌐 Visit SixStorm Official →
          </a>
          <p className="text-gray-600 text-xs mt-2">
            sixstorm-live-0kkp.onrender.com
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 py-4 text-center text-gray-600 text-xs px-5">
        <p>
          © 2025 <span className="text-yellow-400 font-bold">SixStorm</span>.
          For sports entertainment only. All streams are sourced from
          third-party providers.
        </p>
        <p className="mt-1">
          🌐{" "}
          <a
            href="https://sixstorm-live-0kkp.onrender.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-400 hover:underline"
          >
            sixstorm-live-0kkp.onrender.com
          </a>{" "}
          – Official Platform for All Sports Content
        </p>
      </div>
    </footer>
  );
}

// ── Main App ──
export default function App() {
  const { timeStr, hidden } = useCountdown();
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    if (isSandboxedEnv()) setBlocked(true);
  }, []);

  return (
    <>
      {/* Ticker Scroll Animation */}
      <style>{`
        @keyframes tickerScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <div className="min-h-screen flex flex-col bg-[#070c1a] text-white">
        {blocked && (
          <BlockOverlay
            title="Access Blocked"
            message="Please open in Chrome & Disable AdBlock to watch."
          />
        )}

        {/* TOP SECTION */}
        <Navbar />
        <MatchBanner timeStr={timeStr} hidden={hidden} />
        <Ticker />

        {/* MAIN CONTENT */}
        <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-8">
          {/* Hero Label */}
          <div className="mb-5">
            <h1 className="text-white text-xl sm:text-2xl font-black">
              🔴 Live Cricket Stream
            </h1>
            <p className="text-gray-500 text-sm mt-0.5">
              Watch live in HD — free & no signup required
            </p>
          </div>

          {/* Video + Sidebar Layout */}
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            <div className="flex-1 min-w-0">
              <VideoCard />
            </div>
            <Sidebar />
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
