import { useEffect, useState } from "react";
import { Radio, TowerControl } from "lucide-react";

export default function App() {
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const id = setInterval(() => setBlink((b) => !b), 900);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background:
          "radial-gradient(circle at 50% 0%, #12432B 0%, #0A2A1B 55%, #071C12 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Oswald', 'Arial Narrow', sans-serif",
        padding: "24px",
        boxSizing: "border-box",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap');
        .body-font { font-family: 'Inter', sans-serif; }
      `}</style>

      <div
        style={{
          width: "100%",
          maxWidth: 560,
          background: "#0E2E1E",
          border: "1px solid #1F4C33",
          borderRadius: 4,
          overflow: "hidden",
          boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
        }}
      >
        {/* Scoreboard top bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 22px",
            background: "#071C12",
            borderBottom: "1px solid #1F4C33",
          }}
        >
          <div
            className="body-font"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              color: "#C89B5C",
              fontSize: 12,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            <TowerControl size={15} strokeWidth={2} />
            Broadcast Control
          </div>
          <div
            className="body-font"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 12,
              color: "#E8A33D",
              fontWeight: 600,
              letterSpacing: "0.08em",
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#E8A33D",
                opacity: blink ? 1 : 0.25,
                transition: "opacity 0.3s ease",
              }}
            />
            OFF AIR
          </div>
        </div>

        {/* Main content */}
        <div style={{ padding: "48px 36px 40px" }}>
          <div
            className="body-font"
            style={{
              fontSize: 12,
              letterSpacing: "0.18em",
              color: "#6FA487",
              textTransform: "uppercase",
              fontWeight: 600,
              marginBottom: 14,
            }}
          >
            Error 404 · Stream Unavailable
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: "clamp(32px, 6vw, 44px)",
              fontWeight: 700,
              color: "#F5F1E8",
              lineHeight: 1.08,
              letterSpacing: "0.01em",
              textTransform: "uppercase",
            }}
          >
            The Ground Is Quiet
          </h1>

          <p
            className="body-font"
            style={{
              marginTop: 18,
              marginBottom: 0,
              fontSize: 16,
              lineHeight: 1.65,
              color: "#C9DCCF",
              maxWidth: 460,
            }}
          >
            This page only goes live for cricket match streaming. The
            broadcast is switched on shortly before a match starts and
            switched off once it ends — outside of that window, the site
            stays closed.
          </p>

          <p
            className="body-font"
            style={{
              marginTop: 14,
              marginBottom: 0,
              fontSize: 16,
              lineHeight: 1.65,
              color: "#C9DCCF",
              maxWidth: 460,
            }}
          >
            There is no match in progress right now, so streaming is
            unavailable. Please check back once the next match is under way.
          </p>

          <div
            style={{
              marginTop: 32,
              paddingTop: 24,
              borderTop: "1px dashed #1F4C33",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Radio size={16} color="#C89B5C" strokeWidth={2} />
            <span
              className="body-font"
              style={{
                fontSize: 13,
                color: "#8FB39F",
                letterSpacing: "0.03em",
              }}
            >
              Stream status updates automatically when a match begins.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
