import React, { useState } from 'react';
import ScrollReveal from './ScrollReveal';

const faqs = [
  {
    question: 'Do I own the code?',
    answer:
      'Yes, 100%. Once the project is paid for, I transfer the GitHub repository to you. You own all IP, assets, and documentation.',
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
  {
    question: "What if I'm not technical?",
    answer:
      'No problem. I handle the entire deployment process (Vercel, AWS, Supabase). You just get a login and a working product.',
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    question: 'How do we communicate?',
    answer:
      'We use a dedicated Slack channel or Discord server. You get daily updates, loom videos for demos, and direct access to me.',
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
    ),
  },
  {
    question: 'Do you offer post-launch support?',
    answer:
      'Yes. Every Sprint includes 2 weeks of bug-fix support. For ongoing maintenance, I offer a Retainer package.',
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
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
      {/* Icon */}
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

      {/* Toggle indicator */}
      <div
        className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
          isOpen
            ? 'bg-purple-500/20 text-purple-400 rotate-180'
            : 'bg-slate-800/50 text-slate-500 border border-white/5'
        }`}
        aria-hidden
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
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
    <section className="py-32 bg-slate-950 border-t border-white/5 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <ScrollReveal className="text-center mb-16">
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
            Frequently Asked{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Questions
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Everything you need to know before we start building together.
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

        {/* Bottom CTA */}
        <ScrollReveal delay={300}>
          <div className="mt-16 text-center">
            <p className="text-slate-500 text-sm mb-4">Still have questions?</p>
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
