import React, { useEffect, useRef, useState } from "react";

/**
 * Personal SaaS product initialization sequence.
 *
 * - Full intro (~1.5s) on first visit per session
 * - Micro-loader (~0.45s) for repeat visits (sessionStorage)
 * - Gated on real asset readiness (fonts + window load) with a hard 2s cap
 * - Cinematic exit: glow expands, content lifts & dissolves into the hero
 */

const SESSION_KEY = "am-intro-seen";
const FULL_DURATION = 1500;
const MICRO_DURATION = 450;
const HARD_MAX = 2000;

const STAGE_MESSAGES = [
  { at: 0, text: "Initializing interface" },
  { at: 25, text: "Loading selected builds" },
  { at: 50, text: "Preparing services" },
  { at: 75, text: "Connecting experience" },
];

const STATUS_ROWS = [
  { label: "INTERFACE", readyAt: 25 },
  { label: "PROJECTS", readyAt: 50 },
  { label: "SERVICES", readyAt: 75 },
];

function AmOrbitMark({ size = 64 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 42 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="drop-shadow-[0_0_18px_rgba(217,70,239,0.35)]"
    >
      <defs>
        <linearGradient
          id="am-loader-gradient"
          x1="4"
          y1="5"
          x2="38"
          y2="37"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#A855F7" />
          <stop offset="55%" stopColor="#C026D3" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
        <linearGradient
          id="am-loader-orbit"
          x1="7"
          y1="8"
          x2="35"
          y2="34"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
      </defs>

      {/* Broken orbit */}
      <path d="M30.8 6.9C34.5 9.6 36.8 14 37.1 18.7" stroke="url(#am-loader-orbit)" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M35.5 25.8C33.1 31.1 28.5 34.9 22.9 36" stroke="url(#am-loader-orbit)" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M16.7 35.6C11.7 34.1 7.7 30.6 5.4 26" stroke="url(#am-loader-orbit)" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M5 17.1C6 11.9 9.1 7.5 13.6 4.9" stroke="url(#am-loader-orbit)" strokeWidth="2.2" strokeLinecap="round" />

      {/* A */}
      <path d="M10.6 28.5L15.5 14.5C15.9 13.4 16.8 12.8 17.8 12.8C18.8 12.8 19.6 13.4 20 14.5L24.8 28.5" stroke="url(#am-loader-gradient)" strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.1 23.1H22.4" stroke="url(#am-loader-gradient)" strokeWidth="2.7" strokeLinecap="round" />

      {/* M */}
      <path d="M22 28.5V14L27.2 21.2L32.4 14V28.5" stroke="url(#am-loader-gradient)" strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round" />

      {/* Orbit node */}
      <circle cx="31.9" cy="9.2" r="1.7" fill="#EC4899" />
    </svg>
  );
}

export default function PremiumLoader({ onComplete }) {
  const [isMicro, setIsMicro] = useState(false);
  const [progress, setProgress] = useState(0);
  // loading -> ready -> exit -> gone
  const [phase, setPhase] = useState("loading");
  const onCompleteRef = useRef(onComplete);
  const finishedRef = useRef(false);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    let micro = false;
    try {
      micro = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      /* storage unavailable — treat as first visit */
    }
    setIsMicro(micro);

    const duration = micro ? MICRO_DURATION : FULL_DURATION;
    const start = performance.now();
    let raf;
    let assetsOk = false;

    // Wait for real readiness (fonts + full page load), capped at HARD_MAX
    Promise.race([
      Promise.all([
        document.fonts ? document.fonts.ready : Promise.resolve(),
        document.readyState === "complete"
          ? Promise.resolve()
          : new Promise((res) =>
              window.addEventListener("load", res, { once: true })
            ),
      ]),
      new Promise((res) => setTimeout(res, HARD_MAX)),
    ]).then(() => {
      assetsOk = true;
    });

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const tick = (now) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      let p = easeOutCubic(t) * 100;

      // Hold just under 100% until critical assets are actually ready
      if (p >= 100 && !assetsOk) p = 99;
      setProgress(p);

      if ((p >= 100 && assetsOk) || elapsed >= HARD_MAX + 250) {
        if (!finishedRef.current) {
          finishedRef.current = true;
          setProgress(100);
          setPhase("ready");
          setTimeout(() => setPhase("exit"), 550);
          setTimeout(() => {
            try {
              sessionStorage.setItem(SESSION_KEY, "1");
            } catch {
              /* ignore */
            }
            onCompleteRef.current();
          }, 750);
          setTimeout(() => setPhase("gone"), 1450);
        }
        return;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (phase === "gone") return null;

  const exiting = phase === "exit";
  const ready = phase !== "loading";

  const activeStage =
    STAGE_MESSAGES.filter(
      (s) => Number.isFinite(progress) && progress >= s.at
    ).pop() || STAGE_MESSAGES[0];
  const activeMessage = ready ? "Systems ready." : activeStage.text;

  /* ---------------------------------- Micro --------------------------------- */
  if (isMicro) {
    return (
      <div
        className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#050816] overflow-hidden transition-all duration-500 ease-out ${
          exiting ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="relative z-10 flex flex-col items-center">
          <AmOrbitMark size={40} />
          <div className="mt-5 w-[180px] h-[2px] bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-fuchsia-600 via-pink-400 to-violet-600"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    );
  }

  /* ---------------------------------- Full ---------------------------------- */
  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#050816] overflow-hidden transition-all duration-700 ease-out cursor-wait ${
        exiting ? "opacity-0 blur-md" : "opacity-100 blur-0"
      }`}
    >
      {/* Ambient glow — expands outward on exit */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-fuchsia-600/10 blur-[120px] mix-blend-screen pointer-events-none transition-all duration-1000 ease-out ${
          exiting ? "scale-[2] opacity-80" : "scale-100 opacity-100"
        }`}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />

      {/* System status badge */}
      <div
        className={`absolute top-8 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.1)] transition-all duration-500 ${
          exiting ? "opacity-0 -translate-y-2" : "opacity-100"
        }`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_currentColor] animate-pulse" />
        <span className="text-[9px] font-mono tracking-widest text-emerald-400 uppercase">
          Systems Online
        </span>
      </div>

      {/* Central identity + progress — lifts & dissolves on exit */}
      <div
        className={`relative z-10 flex flex-col items-center transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          exiting
            ? "-translate-y-12 scale-[0.94] opacity-0 blur-sm"
            : ready
              ? "scale-[0.98]"
              : "scale-100"
        }`}
      >
        {/* AM Orbit mark */}
        <AmOrbitMark size={64} />

        {/* Name + role */}
        <h1 className="mt-4 text-lg font-semibold tracking-tight text-white">
          Abdullah Amar Musa
        </h1>
        <p className="mt-1 text-[10px] font-mono tracking-[0.25em] uppercase text-zinc-500">
          SaaS Product Engineer
        </p>

        {/* Personal greeting */}
        <div className="mt-8 text-center">
          <p className="text-sm text-zinc-400">
            Welcome, <span className="text-fuchsia-500">Founder.</span>
          </p>
          <p className="mt-1 text-xs text-zinc-600">Preparing your workspace...</p>
        </div>

        {/* Thin progress line */}
        <div className="mt-6 w-[280px] h-[2px] bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-fuchsia-600 via-pink-400 to-violet-600 transition-[width] duration-150 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Percentage / Ready */}
        <div className="mt-2 h-4 font-mono text-[10px] tracking-[0.12em] text-zinc-500">
          {ready ? (
            <span key="ready" className="text-fuchsia-400 animate-pulse">
              READY&nbsp;&nbsp;↓
            </span>
          ) : (
            `${Math.floor(progress)}%`
          )}
        </div>

        {/* Rotating stage message */}
        <div className="mt-3 h-4 flex items-center justify-center">
          <p
            key={activeMessage}
            className="text-[10px] font-bold text-fuchsia-400/80 tracking-widest uppercase animate-[pulse_2s_ease-in-out_infinite]"
          >
            {activeMessage}
          </p>
        </div>
      </div>

      {/* System status readout */}
      <div
        className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col gap-1.5 transition-all duration-500 ${
          exiting ? "opacity-0 translate-y-2" : "opacity-100"
        }`}
      >
        {STATUS_ROWS.map((row) => {
          const rowReady = progress >= row.readyAt;
          return (
            <div
              key={row.label}
              className="flex items-center justify-between w-44 font-mono text-[9px] tracking-widest"
            >
              <span className="text-zinc-600">{row.label}</span>
              <span
                className={
                  rowReady
                    ? "text-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.4)]"
                    : "text-zinc-700"
                }
              >
                {rowReady ? "READY" : "·····"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}