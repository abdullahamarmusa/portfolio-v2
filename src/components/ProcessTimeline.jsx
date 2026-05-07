import React, { useState, useEffect, useRef } from 'react';
import ScrollReveal from './ScrollReveal';

const steps = [
  {
    day: 'Day 1',
    title: 'Strategy + architecture',
    desc: 'System design, database schema, and exact roadmap alignment. No guesswork.',
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    ),
    accent: 'purple',
  },
  {
    day: 'Day 2–5',
    title: 'Core build',
    desc: 'Sprint coding. Frontend interfaces, auth, and backend APIs. Daily staging links.',
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
        />
      </svg>
    ),
    accent: 'blue',
  },
  {
    day: 'Day 6',
    title: 'Deployment',
    desc: 'Production server push, QA testing, and performance optimization.',
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
        />
      </svg>
    ),
    accent: 'emerald',
  },
  {
    day: 'Day 7',
    title: 'Launch + handover',
    desc: 'Domain connection, live launch, code ownership transfer, and documentation walkthrough.',
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3l14 9-14 9V3z" />
      </svg>
    ),
    accent: 'pink',
  },
];

const accentMap = {
  purple: {
    dot: 'border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.6)]',
    dotInner: 'bg-purple-400',
    badge: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    cardBorder: 'border-purple-500/40 shadow-[0_0_30px_rgba(168,85,247,0.08)]',
    iconBg: 'bg-purple-500/10 text-purple-400',
    glow: 'bg-purple-500/20',
  },
  blue: {
    dot: 'border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.6)]',
    dotInner: 'bg-blue-400',
    badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    cardBorder: 'border-blue-500/40 shadow-[0_0_30px_rgba(59,130,246,0.08)]',
    iconBg: 'bg-blue-500/10 text-blue-400',
    glow: 'bg-blue-500/20',
  },
  emerald: {
    dot: 'border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.6)]',
    dotInner: 'bg-emerald-400',
    badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    cardBorder: 'border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.08)]',
    iconBg: 'bg-emerald-500/10 text-emerald-400',
    glow: 'bg-emerald-500/20',
  },
  pink: {
    dot: 'border-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.6)]',
    dotInner: 'bg-pink-400',
    badge: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
    cardBorder: 'border-pink-500/40 shadow-[0_0_30px_rgba(236,72,153,0.08)]',
    iconBg: 'bg-pink-500/10 text-pink-400',
    glow: 'bg-pink-500/20',
  },
};

const inactiveStyles = {
  dot: 'border-slate-700',
  dotInner: 'bg-slate-600',
  badge: 'bg-slate-800/50 text-slate-500 border-slate-700/50',
  cardBorder: 'border-white/5',
  iconBg: 'bg-slate-800/50 text-slate-500',
  glow: 'bg-transparent',
};

const ProcessTimeline = () => {
  const [activeStep, setActiveStep] = useState(-1);
  const [progressHeight, setProgressHeight] = useState(0);
  const stepRefs = useRef([]);
  const timelineRef = useRef(null);

  useEffect(() => {
    const observers = [];

    stepRefs.current.forEach((el, idx) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveStep(prev => Math.max(prev, idx));
          }
        },
        { threshold: 0.5, rootMargin: '0px 0px -20% 0px' }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  useEffect(() => {
    if (activeStep < 0 || !timelineRef.current) {
      setProgressHeight(0);
      return;
    }
    const container = timelineRef.current;
    const targetEl = stepRefs.current[activeStep];
    if (!targetEl) return;

    const containerRect = container.getBoundingClientRect();
    const targetRect = targetEl.getBoundingClientRect();
    const offset = targetRect.top - containerRect.top + targetRect.height / 2;
    setProgressHeight(offset);
  }, [activeStep]);

  return (
    <section className="py-32 bg-slate-950 relative overflow-hidden border-t border-white/5">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <ScrollReveal className="text-center mb-20">
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
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-xs font-bold text-purple-300 uppercase tracking-wide">
              Process
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            The{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              7-Day Protocol
            </span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            My proven system for going from "Idea" to "Deployed" in one week.
          </p>
        </ScrollReveal>

        <div className="relative" ref={timelineRef}>
          {/* Background line */}
          <div className="hidden md:block absolute left-8 top-0 bottom-0 w-px bg-slate-800/80" />

          {/* Animated progress line */}
          <div
            className="hidden md:block absolute left-8 top-0 w-px bg-gradient-to-b from-purple-500 via-blue-500 to-emerald-500 transition-all duration-700 ease-out"
            style={{ height: `${progressHeight}px` }}
          />

          <div className="space-y-8 md:space-y-12">
            {steps.map((step, idx) => {
              const isActive = idx <= activeStep;
              const styles = isActive ? accentMap[step.accent] : inactiveStyles;

              return (
                <div
                  key={idx}
                  ref={el => (stepRefs.current[idx] = el)}
                  className="relative flex items-start gap-6 md:gap-10 group"
                >
                  {/* Timeline dot */}
                  <div className="relative z-10 flex-shrink-0">
                    <div
                      className={`w-16 h-16 rounded-2xl border-2 flex items-center justify-center transition-all duration-500 ${styles.dot} ${
                        isActive ? 'bg-slate-950 scale-100' : 'bg-slate-950/50 scale-90'
                      }`}
                    >
                      <div
                        className={`transition-all duration-500 ${styles.iconBg} w-10 h-10 rounded-xl flex items-center justify-center`}
                      >
                        {step.icon}
                      </div>
                    </div>

                    {/* Glow behind dot */}
                    <div
                      className={`absolute inset-0 rounded-2xl blur-xl transition-opacity duration-700 pointer-events-none ${styles.glow} ${
                        isActive ? 'opacity-60' : 'opacity-0'
                      }`}
                    />
                  </div>

                  {/* Content card */}
                  <div
                    className={`flex-1 p-6 md:p-8 rounded-2xl border bg-slate-900/30 backdrop-blur-sm transition-all duration-500 group-hover:bg-slate-900/50 ${styles.cardBorder} ${
                      isActive ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-60'
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold border transition-all duration-500 ${styles.badge}`}
                      >
                        {step.day}
                      </span>
                      <div
                        className={`h-px flex-1 transition-all duration-500 ${isActive ? 'bg-white/10' : 'bg-white/5'}`}
                      />
                      <span
                        className={`text-xs font-mono transition-all duration-500 ${isActive ? 'text-slate-400' : 'text-slate-600'}`}
                      >
                        {String(idx + 1).padStart(2, '0')}/{String(steps.length).padStart(2, '0')}
                      </span>
                    </div>

                    <h3
                      className={`text-xl md:text-2xl font-bold mb-3 transition-colors duration-500 ${
                        isActive ? 'text-white' : 'text-slate-500'
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`text-sm md:text-base leading-relaxed transition-colors duration-500 ${
                        isActive ? 'text-slate-400' : 'text-slate-600'
                      }`}
                    >
                      {step.desc}
                    </p>

                    {/* Hover arrow indicator */}
                    <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-1">
                      <div className={`w-6 h-px ${isActive ? 'bg-white/30' : 'bg-white/10'}`} />
                      <svg
                        className={`w-3 h-3 ${isActive ? 'text-white/40' : 'text-white/10'}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <ScrollReveal delay={200}>
          <div className="mt-20 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-slate-900/50 border border-white/10 backdrop-blur-sm">
              <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full bg-purple-500/30 border border-purple-500/50" />
                <div className="w-6 h-6 rounded-full bg-blue-500/30 border border-blue-500/50" />
                <div className="w-6 h-6 rounded-full bg-emerald-500/30 border border-emerald-500/50" />
              </div>
              <span className="text-sm text-slate-400">
                From idea to production in <span className="text-white font-semibold">7 days</span>
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ProcessTimeline;
