/* ═══════════════════════════════════════════════════════════════════════════
   STACK & TOOLS — Compact technical signature strip
   ───────────────────────────────────────────────────────────────────────────
   A slim 120–180px credibility strip replacing the former full systems map.
   No interactive architecture, selectors or dependency graphs.

   Design tokens inherit the portfolio design system (--rs-paper depth,
   --rs-signal purple, --rs-muted, --rs-line). Scoped under .rs-root.
   ═══════════════════════════════════════════════════════════════════════════ */

import { motion, useReducedMotion } from 'motion/react';
import { TechRadioGroup } from '../work/TechRadioGroup';

const CORE_TECH = [
  'Next.js',
  'React',
  'TypeScript',
  'Tailwind',
  'shadcn/ui',
  'Supabase',
  'PostgreSQL',
  'Node.js',
  'Stripe',
  'Vercel',
];

export function StackSection({ sectionNumber = '06' }: { sectionNumber?: string }) {
  const reducedMotion = Boolean(useReducedMotion());

  return (
    <section id="stack" className="stack-signature" aria-labelledby="stack-signature-title">
      <div className="content-shell stack-signature__inner">
        <motion.div
          className="stack-signature__head"
          initial={reducedMotion ? false : { opacity: 0, y: 14 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="stack-signature__index" aria-hidden="true">
            {sectionNumber}
          </span>
          <h2 id="stack-signature-title">The stack behind the work.</h2>
        </motion.div>

        <motion.div
          className="stack-signature__tech"
          initial={reducedMotion ? false : { opacity: 0 }}
          whileInView={reducedMotion ? undefined : { opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <TechRadioGroup items={CORE_TECH} label="Core technologies" />
        </motion.div>

        <motion.p
          className="stack-signature__note"
          initial={reducedMotion ? false : { opacity: 0 }}
          whileInView={reducedMotion ? undefined : { opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
        >
          A focused modern stack. Production-ready architecture.{' '}
          <span className="stack-signature__accent">No unnecessary complexity.</span>
        </motion.p>
      </div>
    </section>
  );
}
