// src/App.jsx
import { useEffect, useRef, useState } from "react";

const CONFIG = {
  streamUrl:
    "https://jiotvpllive.cdn.jio.com/bpk-tv/Star_Sports_HD1_Hindi_BTS/WDVLive/index.mpd",
  keyId: "400131994b445d8c8817202248760fda",
  key: "2d56cb6f07a75b9aff165d534ae2bfc4",
  cookieUrl: "https://allrounder-live5.pages.dev/api/star-1-hindi.json",
};

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

// ── Ad script loader (Fix: React me <script> tag directly nahi chalta) ──
function useAdScript() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://pl29102497.profitablecpmratenetwork.com/46/73/4e/46734e3edc77a0e83c8a5c6516dc6502.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
}

// ── Banner countdown hook ──
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
    <div className="fixed inset-0 z-[99999] flex items-center justify-center text-center bg-gradient-radial">
      <div className="animate-fadeInUp w-[90%] max-w-[480px] rounded-[20px] border border-yellow-400/20 bg-slate-900/95 px-10 py-11 shadow-2xl">
        {/* Logo */}
        <div className="mb-5 flex justify-center gap-[2px] text-[1.6rem] tracking-[2px] font-black">
          <span className="bg-gradient-to-br from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Six
          </span>
          <span className="text-white">Storm</span>
        </div>
        {/* Title */}
        <h1 className="mb-4 text-4xl font-black uppercase tracking-[3px] text-white drop-shadow-lg">
          {title}
        </h1>
        {/* Divider */}
        <div className="mx-auto mb-4 h-[2px] w-[60px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
        {/* Message */}
        <p className="text-sm font-medium leading-[1.7] tracking-[0.5px] text-white/50">
          {message}
        </p>
      </div>
    </div>
  );
}

// ── Navbar ──
function Navbar() {
  return (
    <nav className="z-[200] flex-shrink-0 border-b border-yellow-400/10 bg-slate-950/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[54px] max-w-[1280px] items-center justify-between px-5">
        {/* Logo */}
        <a href="/" className="flex items-center no-underline">
          <span className="text-[1.75rem] font-extrabold tracking-[2px] bg-gradient-to-br from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Six
          </span>
          <span className="text-[1.75rem] font-extrabold tracking-[2px] text-white">
            Storm
          </span>
        </a>
        {/* Right */}
        <div className="flex items-center gap-4">
          <span className="hidden text-[0.78rem] font-semibold uppercase tracking-[1.5px] text-white/40 sm:block">
            Star Sports Hindi
          </span>
          {/* Live badge — Fix: animation defined in tailwind.config.js */}
          <span className="flex animate-pulse items-center gap-[6px] rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[2px] text-red-400">
            <span className="h-[5px] w-[5px] flex-shrink-0 rounded-full bg-red-400" />
            Live
          </span>
        </div>
      </div>
    </nav>
  );
}

// ── Stream Banner ──
// Fix: border-yellow-400/14 aur bg-yellow-400/8 invalid hain — standard values use ki
function StreamBanner({ timeStr, hidden }) {
  return (
    <div
      className={`relative flex flex-shrink-0 items-center justify-center gap-4 overflow-hidden border-b border-yellow-400/10 bg-gradient-to-r from-yellow-400/5 via-yellow-400/[0.03] to-yellow-400/5 px-5 py-[10px] transition-all duration-500 sm:gap-[10px] sm:px-4 sm:py-2 ${
        hidden
          ? "max-h-0 overflow-hidden border-none !p-0 opacity-0"
          : "max-h-40 opacity-100"
      }`}
    >
      {/* Shimmer */}
      <div className="pointer-events-none absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-yellow-400/[0.03] to-transparent" />

      {/* Text */}
      <div className="flex flex-col items-center gap-[2px]">
        <span className="text-[clamp(1rem,2.5vw,1.3rem)] font-semibold leading-none tracking-[3px] text-yellow-400">
          Starts at 7:30 PM
        </span>
        <span className="text-[clamp(0.65rem,1.5vw,0.75rem)] font-medium uppercase tracking-[1.5px] text-white/40">
          TATA IPL 2026 &bull; Live Stream
        </span>
      </div>

      {/* Countdown pill */}
      <div className="flex flex-shrink-0 items-center gap-[6px] rounded-full border border-yellow-400/20 bg-slate-950/50 px-4 py-[5px] sm:px-[10px] sm:py-1">
        <span className="text-[0.6rem] font-semibold uppercase tracking-[1px] text-white/40">
          Live in
        </span>
        <span className="font-mono text-[clamp(0.9rem,2vw,1.1rem)] font-semibold tracking-[3px] text-white">
          {timeStr}
        </span>
      </div>
    </div>
  );
}

// ── Main App ──
export default function App() {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const { timeStr, hidden } = useCountdown();
  const [blocked, setBlocked] = useState(false);
  const [blockMsg, setBlockMsg] = useState({ title: "", message: "" });

  // Ad script loader
  useAdScript();

  useEffect(() => {
    // Sandbox check
    if (isSandboxedEnv()) {
      setBlockMsg({
        title: "Disable Sandbox",
        message: "Opening Chrome Browser Only & Disable Ad blocker",
      });
      setBlocked(true);
      return;
    }

    async function initPlayer() {
      const shaka = window.shaka;
      if (!shaka) return;

      shaka.polyfill.installAll();
      if (!shaka.Player.isBrowserSupported()) return;

      const video = videoRef.current;
      const container = containerRef.current;
      video.muted = true;

      const player = new shaka.Player();
      await player.attach(video);

      const ui = new shaka.ui.Overlay(player, container, video);
      ui.configure({
        addBigPlayButton: true,
        controlPanelElements: [
          "mute",
          "play_pause",
          "time_and_duration",
          "spacer",
          "quality",
          "picture_in_picture",
          "fullscreen",
        ],
        seekBarColors: {
          base: "white",
          buffered: "red",
          played: "green",
        },
      });

      player.configure({
        drm: { clearKeys: { [CONFIG.keyId]: CONFIG.key } },
        manifest: { defaultPresentationDelay: 5 },
        streaming: {
          lowLatencyMode: true,
          bufferingGoal: 10,
          rebufferingGoal: 2,
          safeSeekOffset: 5,
        },
      });

      let cookieValue = "";
      try {
        const res = await fetch(CONFIG.cookieUrl, { cache: "no-store" });
        const data = await res.json();
        cookieValue = data.cookie || "";
      } catch {}

      if (cookieValue) {
        player.getNetworkingEngine().registerRequestFilter((type, request) => {
          request.headers["Referer"] = "https://www.jiotv.com/";
          request.headers["User-Agent"] =
            "plaYtv/7.1.5 (Linux;Android 13) ExoPlayerLib/2.11.6";
          request.headers["Cookie"] = cookieValue;

          const urlCookie = cookieValue.startsWith("__hdnea__=")
            ? cookieValue.substring(10)
            : cookieValue;

          if (
            (type === shaka.net.NetworkingEngine.RequestType.MANIFEST ||
              type === shaka.net.NetworkingEngine.RequestType.SEGMENT) &&
            !request.uris[0].includes("__hdnea__")
          ) {
            const sep = request.uris[0].includes("?") ? "&" : "?";
            request.uris[0] += sep + "__hdnea__=" + urlCookie;
          }
        });
      }

      try {
        await player.load(CONFIG.streamUrl);
        video.play().catch(() => {});
      } catch {}

      video.addEventListener("play", () => {
        video.muted = false;
      });
    }

    initPlayer();
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#020617] text-white">
      {/* BG Grid */}
      <div className="pointer-events-none fixed inset-0 z-0 [background-image:linear-gradient(rgba(250,204,21,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(250,204,21,0.025)_1px,transparent_1px)] [background-size:55px_55px]" />

      {/* Orb 1 */}
      <div className="pointer-events-none fixed -left-20 -top-24 z-0 h-[420px] w-[420px] animate-[orbFloat_9s_ease-in-out_infinite] rounded-full bg-yellow-400/5 blur-[100px]" />

      {/* Orb 2 — Fix: animate-orbFloat2 nahi hoti Tailwind me, inline style use kiya */}
      <div
        className="pointer-events-none fixed -right-16 bottom-16 z-0 h-[300px] w-[300px] rounded-full bg-red-500/[0.04] blur-[100px]"
        style={{ animation: "orbFloat 9s ease-in-out 4s infinite" }}
      />

      {/* Block overlay */}
      {blocked && (
        <BlockOverlay title={blockMsg.title} message={blockMsg.message} />
      )}

      {/* Page layout */}
      <div className="fixed inset-0 z-[1] flex flex-col">
        <Navbar />
        <StreamBanner timeStr={timeStr} hidden={hidden} />

        {/* Video area */}
        <div className="relative min-h-0 flex-1 bg-black flex items-center justify-center px-2 sm:px-4 py-3 sm:py-6">
          <div
            ref={containerRef}
            id="player-container"
            className="
      relative 
      w-full 
      max-w-6xl 
      aspect-video 
      max-h-[85vh] 
      bg-black 
      rounded-xl 
      overflow-hidden 
      shadow-2xl 
      border border-white/10
    "
          >
            <video
              ref={videoRef}
              id="video"
              autoPlay
              muted
              playsInline
              preload="metadata"
              className="h-full w-full object-contain bg-black"
            />

            {/* Watermark */}
            <div className="pointer-events-none absolute bottom-3 right-3 text-[10px] sm:text-xs font-semibold text-white/20">
              SixStorm
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
