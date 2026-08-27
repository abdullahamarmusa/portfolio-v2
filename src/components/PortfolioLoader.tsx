import { useEffect, useState } from "react";
import { cn } from "../lib/utils";
import { SimpleLogo } from "./SimpleLogo";

interface PortfolioLoaderProps {
  onComplete?: () => void;
  duration?: number;
  className?: string;
}

/* Dot-grid decoration (pure CSS pattern) */
function DotGrid({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute h-44 w-32 opacity-40", className)}
      style={{
        backgroundImage:
          "radial-gradient(rgba(168,85,247,0.45) 1px, transparent 1px)",
        backgroundSize: "18px 18px",
      }}
    />
  );
}

/* HUD corner bracket line */
function BracketLine({
  className,
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute hidden md:block", className)}
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
    >
      <div className="relative h-px w-64">
        <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/50 via-purple-500/25 to-transparent" />
        <div className="absolute -bottom-[7px] right-0 h-2.5 w-px origin-bottom rotate-[-45deg] bg-gradient-to-b from-purple-500/50 to-transparent" />
      </div>
    </div>
  );
}

export default function PortfolioLoader({
  onComplete,
  duration = 1800,
  className,
}: PortfolioLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const start = performance.now();
    let frame: number;

    const update = (now: number) => {
      const elapsed = now - start;
      const rawProgress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - rawProgress, 3);
      setProgress(Math.round(eased * 100));

      if (rawProgress < 1) {
        frame = requestAnimationFrame(update);
      } else {
        setTimeout(() => {
          setVisible(false);
          onComplete?.();
        }, 250);
      }
    };

    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [duration, onComplete]);

  if (!visible) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[9999] overflow-hidden",
        "bg-[#08060e] text-white",
        className
      )}
    >
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[38%] h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-700/15 blur-[160px]" />
        <div className="absolute -left-40 bottom-[-10%] h-[480px] w-[480px] rounded-full bg-fuchsia-700/10 blur-[150px]" />
        <div className="absolute -right-40 top-[-10%] h-[440px] w-[440px] rounded-full bg-violet-700/10 blur-[150px]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-purple-900/20 to-transparent" />
      </div>

      {/* Side dot grids */}
      <DotGrid className="left-[6%] top-1/2 -translate-y-1/2" />
      <DotGrid className="right-[6%] top-1/2 -translate-y-1/2" />

      {/* Corner brackets */}
      <BracketLine className="left-8 top-[68px]" />
      <BracketLine className="right-8 top-[68px]" flip />
      <BracketLine className="bottom-[52px] left-8" flip />
      <BracketLine className="bottom-[52px] right-8" />

      {/* Main content */}
      <main className="relative flex min-h-screen items-center justify-center px-6">
        <div className="flex w-full max-w-3xl flex-col items-center text-center">
          {/* AM Logo */}
          <SimpleLogo
            size={72}
            className="drop-shadow-[0_0_24px_rgba(168,85,247,0.45)]"
          />

          {/* Name */}
          <h1 className="mt-8 text-2xl font-semibold uppercase tracking-[0.42em] text-white sm:text-3xl md:text-4xl">
            Abdullah&nbsp;Amar&nbsp;Musa
          </h1>

          {/* Subtitle */}
          <p className="mt-4 text-xs font-medium uppercase tracking-[0.5em] text-slate-400 sm:text-sm">
            Full-Stack Product Engineer
          </p>

          {/* Progress bar + percentage */}
          <div className="mt-12 flex w-full max-w-xl items-center gap-6">
            <div className="relative h-2 flex-1 overflow-visible rounded-full bg-white/[0.07]">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-violet-700 via-purple-500 to-fuchsia-400 transition-[width] duration-150 ease-out"
                style={{ width: `${progress}%` }}
              />
              {/* Glowing tip */}
              <div
                className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-300 shadow-[0_0_18px_rgba(232,121,249,0.95),0_0_36px_rgba(217,70,239,0.6)] transition-[left] duration-150 ease-out"
                style={{ left: `${progress}%` }}
              />
            </div>

            <span className="w-14 text-right text-xl font-medium tabular-nums tracking-tight text-fuchsia-300">
              {progress}%
            </span>
          </div>

          {/* Loading text */}
          <p className="mt-8 text-xs font-medium uppercase tracking-[0.45em] text-slate-500 sm:text-sm">
            Loading Portfolio...
          </p>
        </div>
      </main>

      {/* Top-left label */}
      <div className="absolute left-8 top-8 flex items-center gap-3">
        <span className="h-2 w-2 rounded-full bg-fuchsia-500 shadow-[0_0_12px_rgba(217,70,239,0.9)]" />
        <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-slate-300">
          Product Engineer
        </span>
      </div>

      {/* Top-right stack */}
      <div className="absolute right-8 top-8 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.3em] text-slate-300">
        <span>Next.js</span>
        <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-500 shadow-[0_0_10px_rgba(217,70,239,0.9)]" />
        <span>Supabase</span>
        <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-500 shadow-[0_0_10px_rgba(217,70,239,0.9)]" />
        <span>React</span>
      </div>

      {/* Bottom-left */}
      <div className="absolute bottom-8 left-8 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.35em] text-slate-300">
        <span>Build</span>
        <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-500 shadow-[0_0_10px_rgba(217,70,239,0.9)]" />
        <span>Ship</span>
        <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-500 shadow-[0_0_10px_rgba(217,70,239,0.9)]" />
        <span>Scale</span>
      </div>

      {/* Bottom-right */}
      <div className="absolute bottom-8 right-8 flex items-center gap-3">
        <span className="text-[11px] font-medium uppercase tracking-[0.35em] text-slate-300">
          Product Engineering Studio
        </span>
        <span className="h-2 w-2 rounded-full bg-fuchsia-500 shadow-[0_0_12px_rgba(217,70,239,0.9)]" />
      </div>
    </div>
  );
}