import React, { Suspense, useEffect, useRef, useState } from 'react';
import Testimonials from './Testimonials';
import ScrollReveal from './ScrollReveal';
import { ProjectsShowcase } from './reusable/ProjectsShowcase';
import TechStackSection from './reusable/3d_tech_stack_section';
import ProcessTimeline from './ProcessTimeline';
import FAQ from './FAQ';
import Contact from './Contact';
import ScrollProgress from './ScrollProgress';
import HeroPortrait from './HeroPortrait';
import { PROJECTS } from './reusable/projects-data';

const PricingCard = React.lazy(() => import('./PricingCard'));

const SectionLabel = ({ number, children }) => (
  <div className="section-label mb-6">
    <span className="text-purple-400 font-mono text-xs font-bold">{number}</span>
    <span className="text-xs text-slate-500 uppercase tracking-wider">{children}</span>
  </div>
);

/* ── Credibility strip — qualitative, verifiable proof only ─────────────── */
const CredibilityStrip = () => {
  const items = [
    `${PROJECTS.length} shipped product builds`,
    'Next.js / Supabase specialist',
    'Full-stack product engineering',
    'UX + engineering under one roof',
    'Available for selected projects',
  ];

  return (
    <div className="border-y border-white/5 bg-slate-950 relative z-10">
      <div className="max-w-7xl mx-auto px-6 py-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
        {items.map(item => (
          <span
            key={item}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider"
          >
            <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

/* ── Pricing data — prices unchanged, copy rewritten outcome-first ───────── */
const services = [
  {
    subtitle: 'Validate',
    title: 'Product Sprint',
    price: '$149+',
    pricePeriod: '',
    priceLabel: 'Starting price',
    bestFor: 'Focused MVP and product work',
    scope: 'Core flows · UX · Working build',
    ctaText: 'Start a Sprint',
    ctaHint: 'Target package: ~$399',
    desc: 'Validate your idea with a focused product sprint — core flows, real UX and a working build you can put in front of users.',
    features: ['Core product flows', 'UX + interface design', 'Working Next.js build', 'Live in days, not weeks'],
    slug: 'sprint',
    accent: 'violet',
    icon: () => (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    subtitle: 'Ship',
    title: 'Product Build',
    price: '$299+',
    pricePeriod: '',
    priceLabel: 'Starting price',
    bestFor: 'Complete SaaS and product builds',
    scope: 'Full product · Architecture · Production',
    ctaText: 'Start a Build',
    ctaHint: 'Target package: ~$399',
    desc: 'A complete SaaS or product build — architecture, interface and production engineering, ready to ship to real users.',
    features: ['Full product architecture', 'Production UI system', 'API + database integration', 'Deployed and documented'],
    slug: 'build',
    popular: true,
    accent: 'featured',
    icon: () => (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    subtitle: 'Scale',
    title: 'Product Partner',
    price: '$99+',
    pricePeriod: '',
    priceLabel: 'Starting price',
    bestFor: 'Ongoing engineering partnership',
    scope: 'Iteration · Improvements · Support',
    ctaText: 'Partner With Me',
    ctaHint: 'Target package: ~$249',
    desc: 'Ongoing product engineering — continuous iteration, improvements and shipping as your product grows.',
    features: ['Continuous iteration', 'Feature development', 'Performance + UX improvements', 'Direct communication'],
    slug: 'partner',
    accent: 'blue',
    icon: () => (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
];

/* ── Why work with me — authority-building differentiators ───────────────── */
const whyItems = [
  {
    title: 'Product-minded',
    desc: 'I think beyond implementation — scope, flows, UX and business goals.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: 'Design + engineering',
    desc: 'No gap between the interface and the code behind it.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
  {
    title: 'Production-first',
    desc: 'Built around maintainability, performance and real-world deployment.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    title: 'Fast iteration',
    desc: 'Small feedback loops that turn ideas into working products quickly.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

const PortfolioHome = () => {
  const [mounted, setMounted] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div ref={heroRef} className="min-h-screen bg-slate-950 text-white font-body antialiased">
      <ScrollProgress />

      {/* HERO */}
      <header id="home" className="relative min-h-screen flex items-center">
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-to-r from-purple-600/20 via-pink-600/10 to-transparent rounded-full blur-[120px] pointer-events-none transition-all duration-1000 ${
            mounted ? 'opacity-80 scale-100' : 'opacity-0 scale-110'
          }`}
        />

        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 items-center pt-20 md:pt-0">
            <div className="xl:col-span-6 space-y-8">
              {/* Availability Badge */}
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-slate-900/80 border border-emerald-500/20 backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.15)] group hover:scale-105 transition-all duration-300 cursor-default">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-semibold text-emerald-400 tracking-widest uppercase drop-shadow-sm">
                  Available for selected projects
                </span>
              </div>

              {/* Name */}
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 animate-gradient-x bg-[length:200%_auto] drop-shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                  Abdullah Amar Musa
                </span>
              </h1>

              {/* Eyebrow */}
              <div className="text-xs font-bold text-purple-300 uppercase tracking-[0.25em]">
                Full-Stack Product Engineer
              </div>

              {/* Main Headline */}
              <h2 className="text-3xl md:text-4xl font-semibold text-slate-200 tracking-tight leading-snug max-w-[720px]">
                I build polished SaaS products{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 animate-gradient-x bg-[length:200%_auto] drop-shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                  that are ready to ship.
                </span>
              </h2>

              {/* Supporting Statement */}
              <p className="text-lg md:text-xl text-slate-300 max-w-[650px] leading-relaxed font-light">
                From product architecture and UX to production-ready Next.js applications, I help founders turn ideas into high-quality digital products.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href="#contact"
                  className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  <span>Build your product</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
                <a
                  href="#work"
                  className="group text-purple-400 font-medium text-sm transition-all duration-300 hover:text-purple-200 flex items-center justify-center gap-2"
                >
                  <span>View selected work</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="xl:col-span-6 flex justify-center">
              <HeroPortrait />
            </div>
          </div>
        </div>
      </header>

      {/* CREDIBILITY STRIP */}
      <CredibilityStrip />

      {/* THREE SERVICES */}
      <section id="services" className="py-20 relative border-t border-white/5 bg-slate-950/30">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <ScrollReveal className="text-center mb-16">
            <SectionLabel number="01">What I do</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Three ways we can <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">work together</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Every engagement is built around one thing: shipping a product you're proud to put in front of users.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* 01 — PRODUCT BUILD */}
            <ScrollReveal delay={0}>
              <a href="#contact" className="group block h-full bg-slate-900/30 border border-white/10 hover:border-purple-500/40 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(168,85,247,0.15)] flex flex-col">
                <div className="relative aspect-[4/3] bg-slate-950 overflow-hidden border-b border-white/5 p-6 pb-0 flex items-end justify-center">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent z-10" />
                  <img src="/saas-landing-cover.jpg" alt="Product build — SaaS interface" className="w-[110%] max-w-none rounded-t-xl border border-white/10 shadow-2xl group-hover:scale-105 group-hover:-translate-y-2 transition-transform duration-700 ease-out relative z-0" />
                  <div className="absolute top-6 left-6 z-20 flex flex-wrap gap-2">
                    <span className="px-3 py-1 text-[10px] uppercase tracking-wider font-semibold bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white">From idea to app</span>
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <span className="text-xs font-mono font-bold text-purple-400 tracking-widest uppercase mb-3">01 — Product Build</span>
                  <h3 className="text-2xl font-bold text-white mb-4">Turn your SaaS idea into a production-ready application.</h3>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {['Next.js', 'Supabase', 'PostgreSQL', 'APIs'].map(chip => (
                      <span key={chip} className="text-xs text-slate-400 bg-slate-800/50 px-2.5 py-1 rounded-md border border-white/5">{chip}</span>
                    ))}
                  </div>
                  <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-6">
                    <span className="text-slate-400 text-sm font-medium">From $149</span>
                    <span className="text-purple-400 text-sm font-bold flex items-center gap-2 group-hover:text-purple-300 transition-colors">
                      Start a build
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </span>
                  </div>
                </div>
              </a>
            </ScrollReveal>

            {/* 02 — PRODUCT UPGRADE */}
            <ScrollReveal delay={150}>
              <a href="#contact" className="group block h-full bg-slate-900/30 border border-white/10 hover:border-blue-500/40 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] flex flex-col">
                <div className="relative aspect-[4/3] bg-slate-950 overflow-hidden border-b border-white/5 p-6 pb-0 flex items-end justify-center">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent z-10" />
                  <img src="/nexuskit-cover.jpg" alt="Product upgrade — dashboard UI" className="w-[110%] max-w-none rounded-t-xl border border-white/10 shadow-2xl group-hover:scale-105 group-hover:-translate-y-2 transition-transform duration-700 ease-out relative z-0" />
                  <div className="absolute top-6 left-6 z-20 flex flex-wrap gap-2">
                    <span className="px-3 py-1 text-[10px] uppercase tracking-wider font-semibold bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white">Level up what exists</span>
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <span className="text-xs font-mono font-bold text-blue-400 tracking-widest uppercase mb-3">02 — Product Upgrade</span>
                  <h3 className="text-2xl font-bold text-white mb-4">Transform an existing product into a faster, cleaner and more polished experience.</h3>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {['UX', 'Architecture', 'Performance', 'UI'].map(chip => (
                      <span key={chip} className="text-xs text-slate-400 bg-slate-800/50 px-2.5 py-1 rounded-md border border-white/5">{chip}</span>
                    ))}
                  </div>
                  <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-6">
                    <span className="text-slate-400 text-sm font-medium">From $299</span>
                    <span className="text-blue-400 text-sm font-bold flex items-center gap-2 group-hover:text-blue-300 transition-colors">
                      Upgrade my product
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </span>
                  </div>
                </div>
              </a>
            </ScrollReveal>

            {/* 03 — TECHNICAL PARTNERSHIP */}
            <ScrollReveal delay={300}>
              <a href="#contact" className="group block h-full bg-slate-900/30 border border-white/10 hover:border-emerald-500/40 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(16,185,129,0.15)] flex flex-col">
                <div className="relative aspect-[4/3] bg-slate-950 overflow-hidden border-b border-white/5 p-6 pb-0 flex items-end justify-center">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent z-10" />
                  <img src="/nuvora-cover.jpg" alt="Technical partnership — analytics UI" className="w-[110%] max-w-none rounded-t-xl border border-white/10 shadow-2xl group-hover:scale-105 group-hover:-translate-y-2 transition-transform duration-700 ease-out relative z-0" />
                  <div className="absolute top-6 left-6 z-20 flex flex-wrap gap-2">
                    <span className="px-3 py-1 text-[10px] uppercase tracking-wider font-semibold bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white">Ongoing engineering</span>
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <span className="text-xs font-mono font-bold text-emerald-400 tracking-widest uppercase mb-3">03 — Technical Partnership</span>
                  <h3 className="text-2xl font-bold text-white mb-4">Work with me as your technical product engineer from idea to launch.</h3>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {['Architecture', 'Development', 'Iteration', 'Shipping'].map(chip => (
                      <span key={chip} className="text-xs text-slate-400 bg-slate-800/50 px-2.5 py-1 rounded-md border border-white/5">{chip}</span>
                    ))}
                  </div>
                  <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-6">
                    <span className="text-slate-400 text-sm font-medium">From $99</span>
                    <span className="text-emerald-400 text-sm font-bold flex items-center gap-2 group-hover:text-emerald-300 transition-colors">
                      Partner with me
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </span>
                  </div>
                </div>
              </a>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* WHY WORK WITH ME */}
      <section className="py-14 relative border-t border-white/5 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-12">
              <SectionLabel number="02">Why me</SectionLabel>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Why <span className="text-purple-400">founders choose me</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyItems.map((item, i) => (
              <ScrollReveal delay={i * 100} key={item.title}>
                <div className="bg-slate-900/40 border border-white/10 rounded-2xl p-6 hover:border-purple-500/30 transition-colors h-full">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-white font-bold mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={200}>
            <div className="mt-12 text-center">
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mr-2">Built for:</span>
                {['SaaS founders', 'Startups', 'Agencies', 'E-commerce', 'Digital products'].map(tag => (
                  <span key={tag} className="px-3 py-1.5 rounded-full bg-slate-800/50 border border-white/10 text-slate-300 text-xs">{tag}</span>
                ))}
              </div>
              <p className="text-slate-500 text-sm max-w-xl mx-auto">
                I focus on SaaS products, digital platforms, dashboards, landing pages and analytics systems — not generic brochure websites.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SELECTED PRODUCT BUILDS */}
      <div className="rs-root" id="work">
        <ProjectsShowcase />
      </div>

      {/* TECHNICAL FOUNDATION */}
      <div className="rs-root">
        <TechStackSection />
      </div>

      {/* PROCESS TIMELINE */}
      <ProcessTimeline />

      {/* POSITIONING STATEMENT */}
      <section id="about" className="py-16 relative bg-slate-950 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
              <span className="text-xs font-bold text-purple-300 uppercase tracking-wide">Positioning</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              I bridge the gap between <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">product thinking</span> and <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">production engineering.</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
              Strategy shouldn't end in a Figma file. I design and engineer products where UX, architecture and performance work together from day one.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* SELECTED PRODUCT BUILDS (problem → outcome framing) */}
      <Testimonials />

      {/* PRICING */}
      <section id="pricing" className="py-16 relative overflow-hidden border-t border-white/5 bg-slate-950/50">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <ScrollReveal className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
              <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-xs font-bold text-purple-300 uppercase tracking-wide">Pricing</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Clear pricing. <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Serious builds.</span>
            </h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Three engagement levels — pick where you are today. Fixed pricing. No hourly surprises. No scope creep.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14 items-stretch">
            {services.map((svc, i) => (
              <ScrollReveal delay={i * 80} key={svc.slug}>
                <Suspense fallback={<div className="h-full" />}>
                  <PricingCard
                    subtitle={svc.subtitle}
                    title={svc.title}
                    price={svc.price}
                    pricePeriod={svc.pricePeriod}
                    priceLabel={svc.priceLabel}
                    description={svc.desc}
                    features={svc.features}
                    isPopular={svc.popular || false}
                    buttonText={svc.ctaText}
                    buttonAction="#contact"
                    icon={svc.icon}
                    bestFor={svc.bestFor}
                    scope={svc.scope}
                    ctaHint={svc.ctaHint}
                    accent={svc.accent}
                  />
                </Suspense>
              </ScrollReveal>
            ))}
          </div>

          {/* Trust strip */}
          <ScrollReveal delay={200}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
              {['Staging link', 'Source code handoff', 'Documentation', 'Fixed scope', 'Direct communication'].map(item => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900/70 border border-white/10 text-xs font-medium text-slate-300"
                >
                  <svg className="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </span>
              ))}
            </div>
            <p className="text-center text-slate-500 text-sm mt-4">
              Included with every project. Custom scopes discussed after a brief call.
            </p>
          </ScrollReveal>

          {/* Catch-all CTA */}
          <ScrollReveal delay={300}>
            <div className="mt-8 text-center">
              <p className="text-sm font-bold text-white mb-1">Need something different?</p>
              <p className="text-sm text-slate-400 mb-4">
                Tell me what you're building and I'll recommend the right engagement level.
              </p>
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-purple-500/40 bg-purple-500/10 text-sm font-bold text-purple-200 hover:bg-purple-500/20 hover:border-purple-400/60 hover:text-white transition-all duration-300"
              >
                Discuss a custom project
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <FAQ />

      {/* CONTACT */}
      <Contact />
    </div>
  );
};

export default PortfolioHome;