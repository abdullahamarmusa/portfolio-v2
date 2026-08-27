import React from 'react';

/* ─────────────────────────────────────────────────────────────────────────────
   TECH LOGO — small inline-SVG marks for each technology pill.
   Monogram/shaped cues in brand colors; deliberately lightweight (pure SVG,
   no image assets, no external requests). Unknown names fall back to a
   lettered badge.
   ───────────────────────────────────────────────────────────────────────────── */

function matchKey(name: string): string {
  return name.toLowerCase().replace(/[^a-z]/g, '');
}

export function TechLogo({ name }: { name: string }): React.ReactElement {
  const k = matchKey(name);

  /* Next.js — dark circle, white N */
  if (k === 'nextjs') {
    return (
      <svg viewBox="0 0 24 24" role="img">
        <circle
          cx="12"
          cy="12"
          r="10.5"
          fill="#0a0a0a"
          stroke="rgba(255,255,255,0.28)"
          strokeWidth="1"
        />
        <text
          x="12"
          y="13"
          textAnchor="middle"
          dominantBaseline="central"
          fill="#fff"
          fontSize="12"
          fontWeight="700"
        >
          N
        </text>
      </svg>
    );
  }

  /* React — cyan atom */
  if (k === 'react') {
    return (
      <svg viewBox="0 0 24 24" role="img">
        <g stroke="#61dafb" strokeWidth="1.4" fill="none">
          <ellipse cx="12" cy="12" rx="10" ry="4" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
        </g>
        <circle cx="12" cy="12" r="2" fill="#61dafb" />
      </svg>
    );
  }

  /* TypeScript — blue block, TS */
  if (k === 'typescript') {
    return (
      <svg viewBox="0 0 24 24" role="img">
        <rect x="1.5" y="1.5" width="21" height="21" rx="3.5" fill="#3178c6" />
        <text
          x="12"
          y="12.8"
          textAnchor="middle"
          dominantBaseline="central"
          fill="#fff"
          fontSize="10"
          fontWeight="700"
        >
          TS
        </text>
      </svg>
    );
  }

  /* Tailwind (also “Tailwind CSS”) — twin cyan waves */
  if (k.startsWith('tailwind')) {
    return (
      <svg viewBox="0 0 24 24" role="img">
        <path
          fill="#38bdf8"
          d="M12 6.5c-2.6 0-4.23 1.3-4.88 3.9.98-1.3 2.12-1.79 3.42-1.47.74.18 1.27.73 1.86 1.32.99 1.01 2.19 2.15 4.48 2.15 2.6 0 4.23-1.3 4.88-3.9-.98 1.3-2.12 1.79-3.42 1.47-.74-.18-1.27-.73-1.86-1.32C15.49 7.64 14.29 6.5 12 6.5ZM7.12 12.4c-2.6 0-4.23 1.3-4.88 3.9.98-1.3 2.12-1.79 3.42-1.47.74.18 1.27.73 1.86 1.32.99 1.01 2.19 2.15 4.48 2.15 2.6 0 4.23-1.3 4.88-3.9-.98 1.3-2.12 1.79-3.42 1.47-.74-.18-1.27-.73-1.86-1.32C10.61 13.54 9.41 12.4 7.12 12.4Z"
        />
      </svg>
    );
  }

  /* shadcn/ui — two offset light bars */
  if (k.includes('shadcn')) {
    return (
      <svg viewBox="0 0 24 24" role="img">
        <path fill="#e2e8f0" d="M17.5 4H8L6 8h9.5Z" />
        <path fill="#94a3b8" d="M16 20H6.5l2-4H18Z" />
      </svg>
    );
  }

  /* Supabase — green bolt */
  if (k.includes('supabase')) {
    return (
      <svg viewBox="0 0 24 24" role="img">
        <path fill="#3ecf8e" d="M13.4 2 4.8 13.1h5l-1.2 8.9 8.6-11.1h-5Z" />
      </svg>
    );
  }

  /* PostgreSQL — slate-blue block, PG */
  if (k.includes('postgresql') || k === 'postgress') {
    return (
      <svg viewBox="0 0 24 24" role="img">
        <rect x="1.5" y="1.5" width="21" height="21" rx="4" fill="#336791" />
        <text
          x="12"
          y="12.8"
          textAnchor="middle"
          dominantBaseline="central"
          fill="#fff"
          fontSize="9"
          fontWeight="700"
        >
          PG
        </text>
      </svg>
    );
  }

  /* Node.js — green hexagon */
  if (k.includes('node')) {
    return (
      <svg viewBox="0 0 24 24" role="img">
        <path
          d="M12 2 20.66 7v10L12 22 3.34 17V7Z"
          fill="none"
          stroke="#5fa04e"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <text
          x="12"
          y="13"
          textAnchor="middle"
          dominantBaseline="central"
          fill="#5fa04e"
          fontSize="7.5"
          fontWeight="700"
        >
          JS
        </text>
      </svg>
    );
  }

  /* Stripe — indigo block, S */
  if (k.includes('stripe')) {
    return (
      <svg viewBox="0 0 24 24" role="img">
        <rect x="1.5" y="1.5" width="21" height="21" rx="3.5" fill="#635bff" />
        <text
          x="12"
          y="12.8"
          textAnchor="middle"
          dominantBaseline="central"
          fill="#fff"
          fontSize="11"
          fontWeight="700"
        >
          S
        </text>
      </svg>
    );
  }

  /* Vercel — triangle */
  if (k.includes('vercel')) {
    return (
      <svg viewBox="0 0 24 24" role="img">
        <path d="M12 3.5 22 21H2Z" fill="#ededed" />
      </svg>
    );
  }

  /* Auth.js — teal block, A */
  if (k.includes('auth')) {
    return (
      <svg viewBox="0 0 24 24" role="img">
        <rect x="1.5" y="1.5" width="21" height="21" rx="4" fill="#14b8a6" />
        <text
          x="12"
          y="12.8"
          textAnchor="middle"
          dominantBaseline="central"
          fill="#06281f"
          fontSize="11"
          fontWeight="800"
        >
          A
        </text>
      </svg>
    );
  }

  /* Motion — magenta block, M */
  if (k.includes('motion')) {
    return (
      <svg viewBox="0 0 24 24" role="img">
        <rect x="1.5" y="1.5" width="21" height="21" rx="4" fill="#e879f9" />
        <text
          x="12"
          y="12.8"
          textAnchor="middle"
          dominantBaseline="central"
          fill="#34002a"
          fontSize="11"
          fontWeight="800"
        >
          M
        </text>
      </svg>
    );
  }

  /* SEO — search lens */
  if (k === 'seo') {
    return (
      <svg viewBox="0 0 24 24" role="img">
        <g stroke="#94a3b8" strokeWidth="1.9" fill="none" strokeLinecap="round">
          <circle cx="10.5" cy="10.5" r="6" />
          <path d="m15.2 15.2 5 5" />
        </g>
      </svg>
    );
  }

  /* API / Catalog — curl braces */
  if (k.includes('api') || k.includes('catalog')) {
    return (
      <svg viewBox="0 0 24 24" role="img">
        <text
          x="12"
          y="12.6"
          textAnchor="middle"
          dominantBaseline="central"
          fill="#94a3b8"
          fontSize="11"
          fontWeight="700"
        >
          {'{ }'}
        </text>
      </svg>
    );
  }

  /* UI Systems — four-square grid */
  if (k.includes('ui')) {
    return (
      <svg viewBox="0 0 24 24" role="img">
        <g fill="#94a3b8">
          <rect x="3" y="3" width="8" height="8" rx="1.6" />
          <rect x="13" y="3" width="8" height="8" rx="1.6" opacity="0.55" />
          <rect x="3" y="13" width="8" height="8" rx="1.6" opacity="0.55" />
          <rect x="13" y="13" width="8" height="8" rx="1.6" />
        </g>
      </svg>
    );
  }

  /* Fallback — lettered badge */
  const initial = name.trim().charAt(0).toUpperCase() || '?';
  return (
    <svg viewBox="0 0 24 24" role="img">
      <circle
        cx="12"
        cy="12"
        r="10.5"
        fill="rgba(168,85,247,0.18)"
        stroke="rgba(168,85,247,0.45)"
        strokeWidth="1"
      />
      <text
        x="12"
        y="12.8"
        textAnchor="middle"
        dominantBaseline="central"
        fill="#e9d5ff"
        fontSize="11"
        fontWeight="700"
      >
        {initial}
      </text>
    </svg>
  );
}
