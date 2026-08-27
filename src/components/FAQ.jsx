import React, { useState } from 'react';
import ScrollReveal from './ScrollReveal';

/* Buyer-objection focused FAQ — answers purchase anxiety, not just technical detail */
const faqs = [
  {
    question: 'Do you work with early-stage founders?',
    answer:
      "Yes — most of my clients are early-stage founders with an idea or a rough prototype. I help you shape the scope so you build the smallest thing that proves your product works, without paying for features you don't need yet.",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    question: 'Can you work from an existing Figma design?',
    answer:
      "Absolutely. If you already have designs, I'll implement them faithfully in Next.js — pixel-accurate, responsive and production-ready. If you only have sketches or a written idea, I can handle both the UX direction and the build.",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
  {
    question: 'Can you improve an existing SaaS instead of building from scratch?',
    answer:
      'Yes. This is one of my core engagements (Product Upgrade). I can redesign and rebuild specific screens, improve performance, restructure messy architecture, or polish the whole experience — working against your existing codebase and backend.',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  {
    question: 'What happens if my requirements change during the project?',
    answer:
      'Scope changes are normal in product work. We agree on a fixed scope up front; if priorities shift mid-project, we pause, re-scope together, and adjust the plan and price transparently before any extra work begins. No surprise invoices.',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
      </svg>
    ),
  },
  {
    question: 'How long does a typical project take?',
    answer:
      'A landing page typically ships within days. A dashboard or product interface usually takes 1–3 weeks depending on scope. Larger custom builds are scoped individually after a short call — you always get a clear timeline before we start.',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    question: 'Do you provide post-launch support?',
    answer:
      'Yes. Every project ships with a bug-fix window after launch, and I offer ongoing maintenance and iteration retainers for teams that want continued engineering after going live.',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      </svg>
    ),
  },
  {
    question: 'Can you work with my existing backend or team?',
    answer:
      'Yes. I integrate with your existing APIs, databases and third-party services — no rewrite required. I also collaborate comfortably with in-house teams, designers and agencies, white-label included.',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    question: 'How does pricing work?',
    answer:
      'Transparent, fixed pricing per engagement level. Product Sprint (focused MVP and product work) starts at $149, Product Build (complete SaaS and product builds) starts at $299, and Product Partner (ongoing engineering) starts at $99. Larger custom SaaS builds are scoped individually after a short call.',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const FAQItem = ({ faq, isOpen, onToggle, idx }) => (
  <div
    className={`group rounded-2xl border backdrop-blur-sm overflow-hidden transition-all duration-500 ${
      isOpen
        ? 'border-purple-500/30 bg-slate-900/50 shadow-lg shadow-purple-500/5'
        : 'border-white/5 bg-slate-900/20 hover:border-white/10 hover:bg-slate-900/30'
    }`}
  >
    <button
      type="button"
      onClick={() => onToggle(idx)}
      className="w-full flex items-center gap-4 p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 focus-visible:ring-inset rounded-2xl transition-colors"
      aria-expanded={isOpen}
    >
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-500 ${
          isOpen
            ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
            : 'bg-slate-800/50 text-slate-500 border border-white/5 group-hover:text-slate-400'
        }`}
      >
        {faq.icon}
      </div>

      <span
        className={`font-medium flex-1 transition-colors duration-300 ${
          isOpen ? 'text-white' : 'text-slate-300 group-hover:text-white'
        }`}
      >
        {faq.question}
      </span>

      <div
        className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
          isOpen
            ? 'bg-purple-500/20 text-purple-400 rotate-180'
            : 'bg-slate-800/50 text-slate-500 border border-white/5'
        }`}
        aria-hidden
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </button>

    <div
      className={`grid transition-[grid-template-rows] duration-500 ease-out ${
        isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
      }`}
    >
      <div className="overflow-hidden">
        <div className="px-6 pb-6 pl-20 text-slate-400 text-sm leading-relaxed">{faq.answer}</div>
      </div>
    </div>
  </div>
);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="py-16 bg-slate-950 border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <ScrollReveal className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
            <svg
              className="w-4 h-4 text-purple-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-xs font-bold text-purple-300 uppercase tracking-wide">FAQ</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Answers before{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              you commit
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            The questions founders ask before starting a project — answered straight.
          </p>
        </ScrollReveal>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <ScrollReveal key={idx} delay={idx * 60}>
              <FAQItem
                faq={faq}
                isOpen={openIndex === idx}
                onToggle={i => setOpenIndex(openIndex === i ? null : i)}
                idx={idx}
              />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={300}>
          <div className="mt-14 text-center">
            <p className="text-slate-500 text-sm mb-4">Still have a question?</p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-white font-medium hover:text-purple-400 transition-colors duration-300 group"
            >
              Let's talk
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default FAQ;