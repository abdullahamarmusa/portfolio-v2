import React, { useEffect, useRef, useState } from 'react';
import './hero-portrait.css';

/* ── Tiny card icons ─────────────────────────────────────────────────────── */
const IconCode = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M8 6l-5 6 5 6M16 6l5 6-5 6" />
  </svg>
);

const IconRoute = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="5" cy="12" r="2.2" />
    <circle cx="19" cy="12" r="2.2" />
    <path d="M7.2 12h9.6" />
  </svg>
);

const IconLayers = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3l9 5-9 5-9-5 9-5z" />
    <path d="M3 13l9 5 9-5" />
  </svg>
);

/* ── Floating glass metadata cards ─────────────────────────────────────────
   Each card has a --speed multiplier (0.4–1.0) and a --dir sign so they
   drift at different depths in 3D space. */
const CARDS = [
  {
    id: 'engineer',
    label: 'Product Engineer',
    value: 'Next.js · React · TypeScript',
    icon: <IconCode />,
    style: { top: '4%', left: '-12%', '--dx': '10px', '--dy': '8px', '--speed': '0.6', '--dir': '1' },
  },
  {
    id: 'status',
    label: 'Current Status',
    value: 'Available for September',
    icon: <span className="hp-dot-emerald" />,
    style: { bottom: '20%', right: '-13%', '--dx': '12px', '--dy': '10px', '--speed': '1', '--dir': '1' },
  },
  {
    id: 'build',
    label: 'Build Mode',
    value: 'Design → Build → Launch',
    icon: <IconRoute />,
    style: { top: '36%', right: '-17%', '--dx': '13px', '--dy': '11px', '--speed': '0.8', '--dir': '-1' },
  },
  {
    id: 'system',
    label: 'System',
    value: 'SaaS · Dashboards · Analytics',
    icon: <IconLayers />,
    style: { bottom: '-1%', left: '4%', '--dx': '8px', '--dy': '7px', '--speed': '0.7', '--dir': '-1' },
  },
];

/**
 * Art-directed hero portrait — BLOOD MOON / ECLIPSE / ORBIT system.
 *
 * A single rAF loop advances a master progress 0→1 and drives, in lock-step:
 *   --orbit-angle     position of the circulating light source (deg)
 *   --moon-int        wide "approach / blood-moon" envelope
 *   --eclipse-int     narrow "eclipse" envelope (light passes behind subject)
 *   --ambient-hue     violet 285 → magenta ~333 (restrained crimson at peak)
 *   --rim-light       heat built up on the portrait edge
 *   --bloom-int       warm bloom behind the silhouette
 *   --orbit-glow      orbit brightness response
 *   --dust-glow       dust / particle brightness response
 * Everything reads those vars — one connected system, GPU-friendly only.
 * Pointer lerp parallax + scroll-driven cinematic exit run in the same rAF.
 */
const HeroPortrait = () => {
  const rootRef = useRef(null);
  const sunGRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const root = rootRef.current;
    if (!root) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    /* ── Shared animation state ── */
    let raf = 0;
    let running = false;
    let last = 0;
    let progress = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let spVal = 0;

    const clamp = (v) => Math.max(-1, Math.min(1, v));

    /* ── Scroll — stores --sp so the orbit tick can slow the cycle ── */
    let scrollRaf = 0;
    const onScroll = () => {
      if (scrollRaf) return;
      scrollRaf = requestAnimationFrame(() => {
        scrollRaf = 0;
        const rect = root.getBoundingClientRect();
        spVal = Math.min(1, Math.max(0, -rect.top / (window.innerHeight * 0.55)));
        root.style.setProperty('--sp', spVal.toFixed(4));
      });
    };

    /* ── Pointer — lerped parallax (layered depths via CSS --dx/--dy) ── */
    const onMove = (e) => {
      const rect = root.getBoundingClientRect();
      tx = clamp((e.clientX - (rect.left + rect.width / 2)) / (window.innerWidth * 0.45));
      ty = clamp((e.clientY - (rect.top + rect.height / 2)) / (window.innerHeight * 0.45));
      kick();
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
      kick();
    };

    const kick = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    /* ── Universe tick ────────────────────────────────────────────────── */
    const PEAK_DEG = 62; // deg where the light is just behind the top-right of the subject
    const PERIOD = 17000; // ~17s per revolution — smooth normal → eclipse → normal

    const tick = (now) => {
      const dt = last ? Math.min(100, now - last) : 0;
      last = now;

      /* Blood-moon cycle slows down as the hero scrolls away */
      progress += (dt * (1 - 0.7 * spVal)) / PERIOD;
      if (progress >= 1) progress -= 1;

      const angle = progress * 360;

      /* Angle delta (wrapped to -180..180) from the eclipse moment */
      let delta = ((angle - PEAK_DEG) % 360 + 360) % 360;
      if (delta > 180) delta -= 360;
      const rad = (delta * Math.PI) / 180;

      /* Wide bell — the whole approach / blood-moon event.
         Narrower multiplier (1.6) + higher exponent (2.8) keeps the red
         phase short — an occasional event, not a constant state. */
      const blood = Math.pow(Math.max(0, Math.cos(rad * 1.6)), 2.8);
      /* Narrow bell — the brief eclipse (light behind the silhouette) */
      const eclipse = Math.pow(Math.max(0, Math.cos(rad * 2.4)), 2.2);

      /* Move the orbiting light source along the main orbit (SVG group) */
      if (sunGRef.current) {
        const rad2 = (angle * Math.PI) / 180;
        const px = 300 + Math.sin(rad2) * 258;
        const py = 300 - Math.cos(rad2) * 248;
        sunGRef.current.setAttribute('transform', `translate(${px.toFixed(2)} ${py.toFixed(2)})`);
      }

      /* Halo / atmosphere color: violet → magenta, restrained crimson at peak.
         Base 285 (violet) → ~315 (magenta) → ~333 (soft crimson) — keeps the
         brand navy + violet + pink dominant. */
      const hue = 285 + blood * 30 + eclipse * 18;

      root.style.setProperty('--orbit-angle', `${angle.toFixed(3)}deg`);
      root.style.setProperty('--moon-int', blood.toFixed(4));
      root.style.setProperty('--eclipse-int', eclipse.toFixed(4));
      root.style.setProperty('--ambient-hue', Math.round(hue).toString());
      root.style.setProperty('--rim-light', (0.08 + 0.38 * blood + 0.45 * eclipse).toFixed(4));
      root.style.setProperty('--bloom-int', (0.32 + 0.5 * blood).toFixed(4));
      root.style.setProperty('--orbit-glow', (0.45 + 0.43 * blood).toFixed(4));
      root.style.setProperty('--dust-glow', (0.35 + 0.52 * blood).toFixed(4));
      root.style.setProperty('--sun-bright', (0.55 + 0.56 * blood).toFixed(4));

      /* Pointer lerp */
      cx += (tx - cx) * 0.07;
      cy += (ty - cy) * 0.07;
      root.style.setProperty('--mx', cx.toFixed(4));
      root.style.setProperty('--my', cy.toFixed(4));

      if (Math.abs(tx - cx) > 0.0008 || Math.abs(ty - cy) > 0.0008) {
        raf = requestAnimationFrame(tick);
      } else {
        running = false;
        raf = 0;
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    kick();

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('scroll', onScroll);
      if (scrollRaf) cancelAnimationFrame(scrollRaf);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={rootRef} className={`hp${mounted ? ' is-mounted' : ''}`}>
      <div className="hp-inner">
        <div className="hp-stage">

          {/* ═══ BACKGROUND — glow field + grid + dust + grain ═══ */}
          <div className="hp-bg">
            <div className="hp-plx" style={{ '--dx': '-2px', '--dy': '-2px' }}>
              <div className="hp-field" />
              <div className="hp-dust-field" />
              <div className="hp-grid" />
              <div className="hp-grain" />
            </div>
          </div>

          {/* ═══ MIDGROUND — halo + orbital system (3 orbits) ═══ */}
          <div className="hp-mid">
            <div className="hp-plx" style={{ '--dx': '-4px', '--dy': '-3px' }}>
              <div className="hp-halo" />
            </div>

            <div className="hp-plx" style={{ '--dx': '-5px', '--dy': '-4px' }}>
              <div className="hp-orbit-tilt">
                {/* Orbit 03 — very faint outer ring, slowest */}
                <div className="hp-orbit hp-orbit--3">
                  <div className="hp-orbit-spin hp-orbit-spin--03">
                    <svg className="hp-orbit-svg" viewBox="0 0 600 600" fill="none" aria-hidden="true">
                      <ellipse className="hp-ring hp-ring--03" cx="300" cy="300" rx="289" ry="272" />
                    </svg>
                  </div>
                </div>

                {/* Orbit 02 — large broken ring + dotted particles, counter-rotation */}
                <div className="hp-orbit hp-orbit--2">
                  <div className="hp-orbit-spin hp-orbit-spin--02">
                    <svg className="hp-orbit-svg" viewBox="0 0 600 600" fill="none" aria-hidden="true">
                      <ellipse
                        className="hp-ring hp-ring--02"
                        cx="300"
                        cy="300"
                        rx="282"
                        ry="184"
                        strokeDasharray="240 22 70 30 150 20"
                      />
                    </svg>
                    <span className="hp-orbit-dot hp-orbit-dot--a" />
                    <span className="hp-orbit-dot hp-orbit-dot--b" />
                    <span className="hp-orbit-dot hp-orbit-dot--c" />
                    <span className="hp-orbit-dot hp-orbit-dot--d" />
                  </div>
                </div>

                {/* Orbit 01 — main orbit carrying the orbiting light source */}
                <div className="hp-orbit hp-orbit--1">
                  <svg className="hp-orbit-svg hp-orbit-svg--main" viewBox="0 0 600 600" fill="none" aria-hidden="true">
                    <ellipse className="hp-ring hp-ring--01" cx="300" cy="300" rx="258" ry="248" />
                    <g className="hp-sun" ref={sunGRef}>
                      <circle className="hp-sun-halo" r="12" />
                      <circle className="hp-sun-halo-2" r="5" />
                      <circle className="hp-sun-core" r="2.8" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* ═══ FOREGROUND — portrait + blood-moon lighting ═══ */}
          <div className="hp-fg">
            <div className="hp-figure-anchor">
              <div className="hp-scroll-scale">
                <div className="hp-plx" style={{ '--dx': '6px', '--dy': '5px' }}>
                  {/* Warm blood-moon bloom behind the subject */}
                  <div className="hp-blood-glow" />

                  {/* Thin eclipse ring behind the subject */}
                  <div className="hp-eclipse-ring" />

                  <figure className="hp-figure">
                    <img
                      className="hp-img"
                      src="https://images.unsplash.com/photo-1622151834677-70f982c9adef?q=80&w=1086&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="Abdullah Amar Musa — SaaS Product Engineer"
                      draggable="false"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        if (!e.currentTarget.dataset.fallback) {
                          e.currentTarget.dataset.fallback = 'true';
                          e.currentTarget.src = '/portrait-demo.svg';
                        }
                      }}
                    />
                    <span className="hp-vignette" />
                    <span className="hp-fade-bottom" />
                    {/* Rim-light overlay — responds to the orbiting light source */}
                    <span className="hp-rim" />
                  </figure>

                  {/* Micro ember sprites — brightness-driven, cheap DOM */}
                  <span className="hp-ember hp-ember--1" />
                  <span className="hp-ember hp-ember--2" />
                  <span className="hp-ember hp-ember--3" />
                </div>
              </div>
            </div>

            {/* Faint dust veil */}
            <div className="hp-dust">
              <span className="hp-dust-i hp-dust-i--1" />
              <span className="hp-dust-i hp-dust-i--2" />
              <span className="hp-dust-i hp-dust-i--3" />
              <span className="hp-dust-i hp-dust-i--4" />
              <span className="hp-dust-i hp-dust-i--5" />
            </div>
          </div>

          {/* ═══ CARD LAYER — floating glass metadata cards (own depth) ═══ */}
          <div className="hp-cards">
            {CARDS.map((card) => (
              <div key={card.id} className={`hp-card hp-card--${card.id}`} style={card.style}>
                <span className="hp-card-icon">{card.icon}</span>
                <span className="hp-card-text">
                  <span className="hp-card-label">{card.label}</span>
                  <span className="hp-card-value">{card.value}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Compact meta chips — mobile only */}
        <div className="hp-meta-bar">
          <span className="hp-chip">
            <span className="hp-chip-label">Engineer</span>
            <span className="hp-chip-value">Next.js · React · TS</span>
          </span>
          <span className="hp-chip">
            <span className="hp-dot-emerald" />
            <span className="hp-chip-value">Available Sept</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeroPortrait;