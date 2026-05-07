import React, { useEffect, useState } from "react";

export default function PremiumLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        let step = 0;
        if (prev < 60) step = Math.random() * 15 + 5;
        else if (prev < 90) step = Math.random() * 8 + 2;
        else step = Math.random() * 2 + 0.5;
        const next = prev + step;

        if (next >= 100) {
          clearInterval(interval);

          setTimeout(() => {
            onComplete();
          }, 400);

          return 100;
        }

        return next;
      });
    }, 180);

    return () => clearInterval(interval);
  }, [onComplete]);

  const loadingTexts = [
    "Validating systems...",
    "Optimizing workflow...",
    "Deploying experience...",
    "Preparing dashboard...",
    "Launching interface..."
  ];

  const currentText =
    loadingTexts[Math.min(
      Math.floor(progress / 20),
      loadingTexts.length - 1
    )];

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#050816] overflow-hidden transition-all duration-700 ease-in-out cursor-wait ${
        progress >= 100 ? 'opacity-0 blur-xl pointer-events-none' : 'opacity-100 blur-0'
      }`}
    >
      
      {/* Top Badge */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_currentColor] animate-pulse" />
        <span className="text-[9px] font-mono tracking-widest text-emerald-400 uppercase">Systems Online</span>
      </div>

      {/* Atmospheric Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-fuchsia-600/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
      <div className="absolute inset-0 bg-black/40 pointer-events-none" /> {/* Vignette */}

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        
        {/* Logo */}
        <h1 className="text-4xl font-display font-bold tracking-tight text-white mb-2">
          Welcome, <span className="text-fuchsia-500">Founder.</span>
        </h1>
        <p className="text-zinc-500 text-sm mb-6">Preparing your launch environment...</p>

        {/* Status */}
        <div className="h-6 mb-3 relative flex items-center justify-center">
          <p 
            key={currentText} 
            className="text-[10px] font-bold text-fuchsia-400/80 tracking-widest uppercase animate-[pulse_2s_ease-in-out_infinite]"
          >
            {currentText}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-[280px] h-[2px] bg-white/5 rounded-full overflow-hidden relative">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-fuchsia-600 via-pink-400 to-violet-600 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Percentage */}
        <div className="mt-2 text-zinc-500 font-mono tracking-[0.08em] text-[10px]">
          {Math.floor(progress)}%
        </div>
      </div>
    </div>
  );
}
