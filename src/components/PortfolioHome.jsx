import React, { Suspense, useEffect, useRef, useState, useMemo, useCallback } from 'react';
import SpotlightCard from './SpotlightCard';
import TechTicker from "./TechTicker";
import ScrollMouse from "./ScrollMouse";
import ImpactCaseStudy from './ImpactCaseStudy';
import Testimonials from './Testimonials';
import ProcessTimeline from './ProcessTimeline';
import ScrollReveal from './ScrollReveal';
import HeroAvatar from './HeroAvatar';
import ScrollProgress from './ScrollProgress';
import LogoMark from './LogoMark';
import FloatingNav from './FloatingNav';
import PricingCard from './PricingCard.tsx';
import { StripeDashboardArtifact } from './RealArtifacts';
import LoadingSkeleton from './LoadingSkeleton';
import ErrorBoundary from './ErrorBoundary';

// Lazy load components that are below the fold
const FAQ = React.lazy(() => import('./FAQ'));
const Contact = React.lazy(() => import('./Contact'));

const PortfolioHome = React.memo(() => {
  const heroRef = useRef(null);
  const [showBrandHeader, setShowBrandHeader] = useState(true);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowBrandHeader(entry.isIntersecting);
      },
      { root: null, threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 font-body selection:bg-purple-500/30 relative">
      {/* NOISE OVERLAY: Adds texture */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none z-0 mix-blend-overlay"
        style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}
      ></div>

      {/* GRID BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* NAVIGATION HEADER */}
      <FloatingNav />

      <div className="relative z-10">
        {/* STICKY PRICING BANNER */}
        <div className="fixed top-24 right-6 z-40 hidden md:block animate-in">
          <a
            href="#pricing"
            className="group relative block px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-sm shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:shadow-[0_0_50px_rgba(168,85,247,0.6)] transition-all duration-300 hover:scale-105"
          >
            View Pricing
            <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>

        {/* SLOTS INDICATOR - Left side */}
        <div className="fixed left-6 top-1/3 z-30 hidden lg:block">
          <div className="text-center text-xs font-black text-emerald-400 bg-slate-900/80 backdrop-blur-md rounded-2xl p-4 border border-emerald-500/30">
            <div className="text-2xl mb-1">3</div>
            <div className="text-emerald-300">Slots Open</div>
            <div className="text-slate-500 text-[10px] mt-2">Q2 2026</div>
          </div>
        </div>

        {/* 1. HERO SECTION */}
        <header ref={heroRef} className="relative min-h-screen pt-32 pb-20 overflow-hidden">

          {/* Background Elements */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-slate-950 via-slate-950/95 to-slate-950 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 relative z-10 h-full flex flex-col justify-center">

            {/* THE GRID (Rest of Hero Content) */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* LEFT COLUMN: The Copy (Sales Pitch) */}
              <div className="text-center lg:text-left order-2 lg:order-1 flex flex-col items-center lg:items-start space-y-10">

                {/* Status Badge */}
                <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-slate-900/80 border border-emerald-500/20 backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.15)] group hover:scale-105 transition-all duration-300 cursor-pointer">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-xs font-semibold text-emerald-400 tracking-widest uppercase drop-shadow-sm">
                    Available for New Projects
                  </span>
                </div>

                {/* Main Headline */}
                <div className="space-y-4">
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] md:leading-[1.15]">
                    I help founders launch <br className="hidden xl:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 animate-gradient-x drop-shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                      SaaS products fast.
                    </span>
                  </h1>
                </div>

                {/* Subheadline */}
                <p className="text-lg md:text-xl text-slate-300 max-w-[650px] leading-relaxed font-light">
                  Without wasting months of your life or burning through your runway.
                </p>
                {/* CTA Buttons */}
                <div className="flex flex-col items-center gap-6 w-full sm:w-auto pt-4">
                  <a href="#contact" className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] flex items-center justify-center gap-2 w-full sm:w-auto">
                    <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Book Strategy Call</span>
                  </a>
                  <a href="#work" className="group text-purple-300 font-medium text-sm transition-all duration-300 hover:text-purple-200 flex items-center justify-center gap-2">
                    <span>View Case Studies</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* RIGHT COLUMN: The Visuals (Your Avatar) */}
              <div className="order-1 lg:order-2 w-full flex justify-center lg:justify-end items-center">
                <div className="relative">
                  <HeroAvatar />
                </div>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="flex justify-center mt-16 md:mt-20 relative z-10">
              <ScrollMouse />
            </div>

            {/* Tech Ticker Section -> Built With Stack Strip */}
            <div className="mt-20 md:mt-24">
              <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 text-slate-500 font-bold text-sm md:text-base tracking-widest uppercase">
                <span className="hover:text-white transition-colors duration-300">Next.js</span>
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500/30"></span>
                <span className="hover:text-white transition-colors duration-300">Node.js</span>
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500/30"></span>
                <span className="hover:text-white transition-colors duration-300">PostgreSQL</span>
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500/30"></span>
                <span className="hover:text-white transition-colors duration-300">Stripe</span>
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500/30"></span>
                <span className="hover:text-white transition-colors duration-300">Docker</span>
              </div>
            </div>
          </div>
        </header>

        {/* 1.5 WHY CHOOSE ME (Trust Engine) */}
        <section className="py-20 relative border-t border-white/5 bg-slate-950/50">
          <div className="max-w-7xl mx-auto px-6">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  Why founders choose me
                </h2>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Ship in days, not months", icon: "⚡", desc: "Speed is a feature. Launch fast and iterate." },
                { title: "Built for real business use", icon: "💼", desc: "No demo projects. Production-ready architecture." },
                { title: "Focus on revenue, not just code", icon: "📈", desc: "I build systems designed to convert and scale." },
                { title: "Direct access — no middlemen", icon: "🤝", desc: "You work directly with me. No project managers." }
              ].map((item, i) => (
                <ScrollReveal delay={i * 100} key={item.title}>
                  <div className="bg-slate-900/40 border border-white/10 rounded-2xl p-6 hover:border-purple-500/30 transition-colors h-full">
                    <div className="text-2xl mb-4">{item.icon}</div>
                    <h3 className="text-white font-bold mb-2">{item.title}</h3>
                    <p className="text-slate-400 text-sm">{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* 2. BENTO GRID: Engineering Excellence (Fixed Layout) */}
        <section className="py-24 relative" id="engineering">
          <div className="max-w-7xl mx-auto px-6">
            <ScrollReveal>
              <div className="mb-16 text-center">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0 mb-6 mx-auto">
                  <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">
                  Engineering <span className="text-purple-400">Excellence</span>
                </h2>
                <p className="text-slate-300 text-lg max-w-2xl mx-auto">
                  I don't just write code. I architect systems that are fast, secure, and ready to scale from Day 1.
                </p>
              </div>
            </ScrollReveal>

            {/* THE FIX: Changed 'auto-rows' to use minmax so cards expand if needed */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 grid-auto-rows-[minmax(280px,auto)]">

              {/* Card 1: Full-Stack Architecture (Spans 2 Columns) */}
              <ScrollReveal delay={0}>
                <div className="md:col-span-2 rounded-3xl border border-white/20 bg-slate-900/40 backdrop-blur-xl p-8 flex flex-col justify-between group hover:border-purple-500/50 transition duration-500">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Full-Stack Architecture</h3>
                    <p className="text-slate-300 mb-6">
                      Proficient in the MERN stack (MongoDB, Express, React, Node). I build APIs that are typed, tested, and documented.
                    </p>
                    {/* Tech Icons Mini-Bar */}
                    <div className="flex gap-3 opacity-60">
                      <img src="https://cdn.simpleicons.org/react/61DAFB" className="w-6 h-6" alt="React" />
                      <img src="https://cdn.simpleicons.org/nodedotjs/339933" className="w-6 h-6" alt="Node" />
                      <img src="https://cdn.simpleicons.org/mongodb/47A248" className="w-6 h-6" alt="Mongo" />
                      <img src="https://cdn.simpleicons.org/typescript/3178C6" className="w-6 h-6" alt="TS" />
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Card 2: Pixel Perfect (Spans 1 Column) */}
              <ScrollReveal delay={80}>
                <div className="md:col-span-1 rounded-3xl border border-white/20 bg-slate-900/40 backdrop-blur-xl p-8 flex flex-col justify-between group hover:border-pink-500/50 transition duration-500">
                  <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-400 mb-4 border border-pink-500/20">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Pixel Perfect</h3>
                    <p className="text-slate-300 text-sm">
                      Google UX Design Certified. I bridge the gap between Figma and CSS.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              {/* Card 3: Performance First (Spans 1 Column) */}
              <ScrollReveal delay={160}>
                <div className="md:col-span-1 rounded-3xl border border-white/20 bg-slate-900/40 backdrop-blur-xl p-8 flex flex-col justify-between group hover:border-emerald-500/50 transition duration-500">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4 border border-emerald-500/20">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Performance First</h3>
                    <p className="text-slate-300 text-sm">
                      99/100 Lighthouse scores. I optimize for Core Web Vitals and SEO.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              {/* Card 4: Business-Driven (Spans 2 Columns) */}
              <ScrollReveal delay={240}>
                <div className="md:col-span-2 rounded-3xl border border-white/20 bg-slate-900/40 backdrop-blur-xl p-8 flex flex-col justify-between group hover:border-yellow-500/50 transition duration-500">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-400 border border-yellow-500/20">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Business-Driven Code</h3>
                    <p className="text-slate-300 mb-6">
                      I don't just build features; I build revenue. I understand SaaS metrics (MRR, Churn) and build products that convert.
                    </p>
                    {/* Metrics Mini-Bar */}
                    <div className="flex gap-3 opacity-60">
                      <img src="https://cdn.simpleicons.org/stripe/635BFF" className="w-8 h-8 object-contain" alt="Stripe" />
                      <img src="https://cdn.simpleicons.org/googleanalytics/E37400" className="w-6 h-6" alt="Analytics" />
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* 3. IMPACT CASE STUDIES */}
        <section className="py-32 relative border-t border-white/5" id="work">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
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
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <span className="text-xs font-bold text-purple-300 uppercase tracking-wide">
                  Proof
                </span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight">
                Proven <span className="text-purple-400">Business Impact</span>
              </h2>
            </ScrollReveal>

            <div className="space-y-24">
              <ScrollReveal delay={0}>
                <div className="relative">
                  <ImpactCaseStudy
                    badge="Sample Client System"
                    title="Analytics Dashboard for Subscription SaaS"
                    niche="FinTech"
                    timeframe="45 days"
                    systemComplexity="Integrated Stripe + real-time analytics"
                    metrics={[
                      { value: '1,300+', label: 'Active users' },
                      { value: '60%', label: 'Manual reporting reduced' },
                      { value: '14 days', label: 'To production' },
                    ]}
                    description="Architected a multi-tenant revenue tracking dashboard for a fast-scaling B2B client. Focused entirely on clean data visualization and instant performance to reduce churn."
                    techStack={['Next.js', 'Stripe', 'Supabase', 'Tremor']}
                    architecturalDecision="Implemented optimized edge caching and optimistic UI to ensure dashboard metrics load in under 100ms, completely eliminating user bounce rate on the data pages."
                    image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
                    renderVisual={<StripeDashboardArtifact />}
                    link="#"
                  />
                </div>
              </ScrollReveal>

              <ScrollReveal delay={100}>
                <ImpactCaseStudy
                  title="Keeper App (Enterprise Edition)"
                  metrics={[
                    { value: '<100ms', label: 'Latency' },
                    { value: '10k+', label: 'Notes Handled' },
                    { value: '100%', label: 'Uptime' },
                  ]}
                  description="A complex state-management application mirroring Google Keep. Built to handle massive data loads without UI blocking."
                  techStack={['React', 'Firebase', 'Optimistic UI', 'Drag&Drop']}
                  architecturalDecision="Implemented Optimistic UI updates. The interface updates instantly before the server confirms, masking network latency and making the app feel 'native' even on slow 3G connections."
                  image="https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?q=80&w=1000&auto=format&fit=crop"
                  link="#"
                />
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* 3.5 PRODUCTS SECTION */}
        <section id="products" className="py-32 relative border-t border-white/5 bg-slate-950/50">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <ScrollReveal className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
                <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                <span className="text-xs font-bold text-purple-300 uppercase tracking-wide">
                  Products
                </span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
                Skip Setup. <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Start Building.</span>
              </h2>
              <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed mb-8">
                Production-ready tools and systems designed to help you move faster, reduce development time, and build scalable products.
              </p>

              {/* Trust Layer */}
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-medium text-slate-300">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Used by 50+ developers
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Saves 20+ hours setup time
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Production-ready architecture
                </div>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
              {/* Product 1: SaaS Boilerplate PRO (Flagship) */}
              <ScrollReveal delay={0}>
                <div className="relative rounded-3xl border-2 border-purple-500/30 bg-slate-900/80 backdrop-blur-xl p-8 flex flex-col h-full group hover:border-purple-500/60 hover:scale-[1.02] transition-all duration-500 shadow-[0_0_30px_rgba(168,85,247,0.15)] md:-mt-4 md:mb-4">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg whitespace-nowrap">
                    <span>🔥</span> Best-Selling Product
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                      <span>🚀</span> SaaS Boilerplate PRO
                    </h3>
                    <p className="text-slate-300 text-sm mb-6">
                      Launch your SaaS in days, not weeks.
                    </p>

                    <ul className="space-y-3 mb-8">
                      <li className="flex items-start gap-3 text-white text-sm font-semibold">
                        <svg className="w-5 h-5 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Authentication (JWT / OAuth)
                      </li>
                      <li className="flex items-start gap-3 text-white text-sm font-semibold">
                        <svg className="w-5 h-5 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Stripe Billing Integration
                      </li>
                      <li className="flex items-start gap-3 text-slate-300 text-sm">
                        <svg className="w-5 h-5 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Admin Dashboard
                      </li>
                      <li className="flex items-start gap-3 text-slate-300 text-sm">
                        <svg className="w-5 h-5 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        API-ready backend (Node.js)
                      </li>
                      <li className="flex items-start gap-3 text-slate-300 text-sm">
                        <svg className="w-5 h-5 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Scalable architecture
                      </li>
                    </ul>

                    {/* Who It's For */}
                    <div className="mt-auto mb-8 pt-6 border-t border-white/10">
                      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Best For:</div>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2.5 py-1 rounded-md bg-slate-800/50 text-slate-300 text-xs">SaaS Founders</span>
                        <span className="px-2.5 py-1 rounded-md bg-slate-800/50 text-slate-300 text-xs">Indie Hackers</span>
                        <span className="px-2.5 py-1 rounded-md bg-slate-800/50 text-slate-300 text-xs">MVP Builders</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-3xl font-bold text-white mb-6">
                      $99
                    </div>
                    <div className="flex flex-col">
                      <a href="/products/saas-boilerplate" className="w-full bg-white text-slate-950 text-center font-bold py-3.5 rounded-xl hover:bg-purple-50 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all">
                        Start Building Faster
                      </a>
                      <a href="/products/saas-boilerplate" className="text-center text-sm text-slate-300 hover:text-white mt-4 font-medium transition-colors">
                        See What's Included →
                      </a>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Product 2: Automation Starter Kit */}
              <ScrollReveal delay={80}>
                <div className="rounded-3xl border border-white/10 bg-slate-900/40 backdrop-blur-xl p-8 flex flex-col h-full group hover:border-white/30 hover:scale-[1.02] transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                      <span>⚙️</span> Automation Starter Kit
                    </h3>
                    <p className="text-slate-300 text-sm mb-6 font-semibold">
                      <span className="text-emerald-400">Save 20+ hours/month</span> automating workflows and repetitive tasks.
                    </p>

                    <ul className="space-y-3 mb-8">
                      <li className="flex items-start gap-3 text-white text-sm font-semibold">
                        <svg className="w-5 h-5 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        API integrations
                      </li>
                      <li className="flex items-start gap-3 text-white text-sm font-semibold">
                        <svg className="w-5 h-5 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Cron jobs & schedulers
                      </li>
                      <li className="flex items-start gap-3 text-slate-300 text-sm">
                        <svg className="w-5 h-5 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Data processing scripts
                      </li>
                      <li className="flex items-start gap-3 text-slate-300 text-sm">
                        <svg className="w-5 h-5 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Postman collections
                      </li>
                    </ul>

                    {/* Who It's For */}
                    <div className="mt-auto mb-8 pt-6 border-t border-white/10">
                      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Best For:</div>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2.5 py-1 rounded-md bg-slate-800/50 text-slate-300 text-xs">Agencies</span>
                        <span className="px-2.5 py-1 rounded-md bg-slate-800/50 text-slate-300 text-xs">Ops Teams</span>
                        <span className="px-2.5 py-1 rounded-md bg-slate-800/50 text-slate-300 text-xs">Solo Founders</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-2xl font-bold text-white mb-6">
                      $49
                    </div>
                    <div className="flex flex-col">
                      <a href="/products/automation-kit" className="w-full bg-slate-800 border border-white/10 text-white text-center font-bold py-3.5 rounded-xl hover:bg-slate-700 transition-colors">
                        Get Starter Kit
                      </a>
                      <a href="/products/automation-kit" className="text-center text-sm text-slate-300 hover:text-white mt-4 font-medium transition-colors">
                        See What's Included →
                      </a>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Product 3: Internal Tool System */}
              <ScrollReveal delay={160}>
                <div className="rounded-3xl border border-white/10 bg-slate-900/40 backdrop-blur-xl p-8 flex flex-col h-full group hover:border-white/30 hover:scale-[1.02] transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                      <span>🧩</span> Internal Tool System
                    </h3>
                    <p className="text-slate-300 text-sm mb-6 font-semibold">
                      Build <span className="text-purple-400">enterprise-grade admin panels</span> without starting from scratch.
                    </p>

                    <ul className="space-y-3 mb-8">
                      <li className="flex items-start gap-3 text-white text-sm font-semibold">
                        <svg className="w-5 h-5 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        CRUD system
                      </li>
                      <li className="flex items-start gap-3 text-white text-sm font-semibold">
                        <svg className="w-5 h-5 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Role-based access
                      </li>
                      <li className="flex items-start gap-3 text-slate-300 text-sm">
                        <svg className="w-5 h-5 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Clean UI (Tailwind)
                      </li>
                      <li className="flex items-start gap-3 text-slate-300 text-sm">
                        <svg className="w-5 h-5 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Database-ready structure
                      </li>
                    </ul>

                    {/* Who It's For */}
                    <div className="mt-auto mb-8 pt-6 border-t border-white/10">
                      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Best For:</div>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2.5 py-1 rounded-md bg-slate-800/50 text-slate-300 text-xs">B2B Companies</span>
                        <span className="px-2.5 py-1 rounded-md bg-slate-800/50 text-slate-300 text-xs">Admin Teams</span>
                        <span className="px-2.5 py-1 rounded-md bg-slate-800/50 text-slate-300 text-xs">Enterprise</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-2xl font-bold text-white mb-6">
                      $149
                    </div>
                    <div className="flex flex-col">
                      <a href="/products/internal-tools" className="w-full bg-slate-800 border border-white/10 text-white text-center font-bold py-3.5 rounded-xl hover:bg-slate-700 transition-colors">
                        Get Internal System
                      </a>
                      <a href="/products/internal-tools" className="text-center text-sm text-slate-300 hover:text-white mt-4 font-medium transition-colors">
                        See What's Included →
                      </a>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Conversion Trick - Upsell */}
            <ScrollReveal delay={240}>
              <div className="mt-20 text-center max-w-2xl mx-auto p-8 rounded-3xl bg-gradient-to-b from-slate-900/60 to-transparent border border-white/5">
                <h4 className="text-white font-semibold text-lg mb-2">Need a fully custom solution?</h4>
                <p className="text-slate-300 text-sm mb-6 font-semibold">
                  I architect <span className="text-purple-400">enterprise-grade systems</span> from scratch. Let's talk about your specific needs.
                </p>
                <a href="#contact" className="inline-flex items-center gap-2 text-purple-400 font-medium hover:text-purple-300 transition-colors group">
                  Book a strategy call
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* PROCESS TIMELINE */}
        <section id="process">
          <ProcessTimeline />
        </section>

        {/* 3.8 PHILOSOPHY & TRANSFORMATION (Authority Layer) */}
        <section className="py-40 border-t border-white/5 relative bg-slate-950/80 overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 mb-8">
                <span className="text-xs font-bold text-purple-300 uppercase tracking-widest">
                  Philosophy
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight tracking-tight">
                Most developers write code.<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  I build systems that make money.
                </span><br/>
                That's the difference.
              </h2>
            </ScrollReveal>

            {/* Before vs After Transformation */}
            <ScrollReveal delay={100}>
              <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto text-left">
                {/* Before */}
                <div className="bg-slate-900/40 border border-red-500/10 rounded-3xl p-8 backdrop-blur-md">
                  <h3 className="text-xl font-bold text-slate-300 mb-6 flex items-center gap-2">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-500/10 text-red-400 text-sm">❌</span>
                    The Standard Way
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3 text-slate-400">
                      <span className="text-red-400 font-bold mt-0.5">✕</span>
                      Months of slow development
                    </li>
                    <li className="flex items-start gap-3 text-slate-400">
                      <span className="text-red-400 font-bold mt-0.5">✕</span>
                      No clear product direction
                    </li>
                    <li className="flex items-start gap-3 text-slate-400">
                      <span className="text-red-400 font-bold mt-0.5">✕</span>
                      Wasted budget & missed trends
                    </li>
                  </ul>
                </div>

                {/* After */}
                <div className="bg-slate-900/60 border border-emerald-500/20 rounded-3xl p-8 backdrop-blur-md shadow-[0_0_30px_rgba(16,185,129,0.05)] relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[50px] pointer-events-none" />
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 text-sm">✅</span>
                    Working With Me
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3 text-slate-200 font-medium">
                      <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                      Live product in 7 days
                    </li>
                    <li className="flex items-start gap-3 text-slate-200 font-medium">
                      <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                      Clear, scalable architecture
                    </li>
                    <li className="flex items-start gap-3 text-slate-200 font-medium">
                      <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                      Ready to onboard users & scale
                    </li>
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* 3.9 OPERATOR INSIGHTS (Authority Multiplier) */}
        <section className="py-32 border-t border-white/5 relative bg-slate-950/80 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <ScrollReveal className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 mb-8">
                <span className="text-xs font-bold text-purple-300 uppercase tracking-widest">
                  Operator Notes
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                Insights from the <span className="text-purple-400">Trenches</span>
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <ScrollReveal delay={100}>
                <a href="#contact" className="block group p-6 md:p-8 rounded-3xl bg-slate-900/40 border border-white/10 backdrop-blur-md hover:bg-slate-900/60 hover:border-purple-500/30 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-slate-500 text-sm font-bold uppercase tracking-widest">Strategy</span>
                    <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                    <span className="text-slate-500 text-sm">4 min read</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">How I launch production-ready SaaS in 7 days</h3>
                  <p className="text-slate-400 mb-6 line-clamp-2">The exact architectural constraints and frameworks I use to move 10x faster than traditional agencies while maintaining zero technical debt.</p>
                  <div className="text-purple-400 font-bold text-sm flex items-center gap-2">
                    Read insight <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </a>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <a href="#contact" className="block group p-6 md:p-8 rounded-3xl bg-slate-900/40 border border-white/10 backdrop-blur-md hover:bg-slate-900/60 hover:border-pink-500/30 hover:shadow-[0_0_30px_rgba(236,72,153,0.15)] transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-slate-500 text-sm font-bold uppercase tracking-widest">Execution</span>
                    <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                    <span className="text-slate-500 text-sm">3 min read</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-pink-400 transition-colors">3 Fatal Mistakes Non-Technical Founders Make</h3>
                  <p className="text-slate-400 mb-6 line-clamp-2">Why paying an agency $20k for an MVP usually guarantees failure, and how to validate your idea with extreme capital efficiency.</p>
                  <div className="text-pink-400 font-bold text-sm flex items-center gap-2">
                    Read insight <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </a>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <Testimonials />

        {/* 4. PRICING - Enhanced Section */}
        <section id="pricing" className="py-32 border-t border-white/5 relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/5 to-transparent pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-purple-600/5 blur-[150px] rounded-full pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 relative z-10">
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
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-xs font-bold text-purple-300 uppercase tracking-wide">
                  Investment
                </span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                Choose the fastest way to build, launch, and scale your product
              </h2>
              <p className="text-slate-300 text-lg max-w-2xl mx-auto">
                Clear pricing. No surprises. Every plan is designed to deliver real business results—not just code.
              </p>
            </ScrollReveal>

            {/* Pricing Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
              {/* Consultation Plan */}
              <PricingCard
                title="MVP Strategy Session"
                subtitle="Get expert direction before you build"
                price="$99"
                pricePeriod="/session"
                description="Avoid costly mistakes. Get a clear roadmap, architecture advice, and actionable next steps."
                icon={props => (
                  <svg
                    {...props}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                )}
                isPopular={false}
                delay={0}
                buttonText="Book Strategy Call"
                buttonAction="#contact"
                features={[
                  '60-min Strategy Call',
                  'Architecture Guidance',
                  'Product Validation',
                  'Growth & Scaling',
                  'Actionable Roadmap',
                ]}
                bestFor="Early-stage founders or anyone stuck before building"
              />

              {/* MVP Sprint - Featured */}
              <PricingCard
                title="MVP Sprint"
                subtitle="Launch your product in 7 days"
                price="$2,500"
                pricePeriod="one-time"
                valueAnchor="Save 4–8 weeks of development time"
                description="I build your core product fast so you can validate your idea and start generating revenue."
                icon={props => (
                  <svg
                    {...props}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                )}
                isPopular={true}
                delay={80}
                buttonText="Launch My MVP in 7 Days"
                buttonAction="#contact"
                secondaryCTAText="or book a free strategy call"
                secondaryCTAAction="#contact"
                features={[
                  'Full-Stack Build',
                  'Auth & Database',
                  'Scalable Codebase',
                  'Live Deployment',
                  'Mobile & SEO Ready',
                  'Code Walkthrough',
                ]}
                bestFor="Founders, startups, and SaaS ideas that need to launch FAST"
              />

              {/* Retainer Plan */}
              <PricingCard
                title="Growth Partner"
                subtitle="Ongoing development & scaling support"
                price="$3k–$6k"
                pricePeriod="/month"
                description="Build faster, fix bottlenecks, and scale without hiring a full team"
                icon={props => (
                  <svg
                    {...props}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                )}
                isPopular={false}
                delay={160}
                buttonText="Apply for Partnership"
                buttonAction="#contact"
                features={[
                  '10–20 hrs/week Dedicated Dev',
                  'Features & Optimization',
                  'Architecture & Code Reviews',
                  'Performance Scaling',
                  'Weekly Syncs & Support',
                ]}
                bestFor="Startups ready to grow after MVP"
              />
            </div>

            {/* Value Comparison Bar */}
            <ScrollReveal delay={200}>
              <div className="mt-16 max-w-3xl mx-auto">
                <div className="flex flex-col gap-3 p-6 md:p-8 rounded-3xl bg-slate-900/40 border border-white/5 backdrop-blur-md">
                  
                  {/* Row 1 */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-800/30 border border-white/5">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-500/10 text-red-400 text-sm shrink-0">❌</span>
                      <span className="text-slate-300 font-medium">Hiring a developer</span>
                    </div>
                    <div className="flex items-center gap-3 sm:justify-end ml-11 sm:ml-0">
                      <span className="text-slate-400 font-bold line-through decoration-red-500/30">$5,000+</span>
                      <span className="text-slate-500 text-xs font-medium bg-slate-800/80 px-2.5 py-1 rounded-md whitespace-nowrap">(slow, risky)</span>
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-800/30 border border-white/5">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-500/10 text-red-400 text-sm shrink-0">❌</span>
                      <span className="text-slate-300 font-medium">Hiring an agency</span>
                    </div>
                    <div className="flex items-center gap-3 sm:justify-end ml-11 sm:ml-0">
                      <span className="text-slate-400 font-bold line-through decoration-red-500/30">$10,000+</span>
                      <span className="text-slate-500 text-xs font-medium bg-slate-800/80 px-2.5 py-1 rounded-md whitespace-nowrap">(overkill for MVP)</span>
                    </div>
                  </div>

                  {/* Row 3 (The Offer) */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 relative overflow-hidden group mt-2 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    <div className="flex items-center gap-3 relative z-10">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 text-sm shrink-0">✅</span>
                      <span className="text-emerald-400 font-bold text-lg">Your MVP Sprint</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 sm:justify-end ml-11 sm:ml-0 relative z-10">
                      <span className="text-emerald-300 font-black text-xl">$2,500</span>
                      <span className="text-emerald-500 text-xs font-bold bg-emerald-500/10 px-2.5 py-1 rounded-md">(fast, focused, production-ready)</span>
                    </div>
                  </div>

                </div>
              </div>
            </ScrollReveal>

            {/* Risk Reversal / Guarantees */}
            <ScrollReveal delay={240}>
              <div className="mt-12 flex justify-center">
                <div className="bg-slate-900/60 border border-emerald-500/20 backdrop-blur-md rounded-3xl p-8 max-w-3xl w-full shadow-[0_0_30px_rgba(16,185,129,0.05)] relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-[50px] pointer-events-none" />
                  <h4 className="text-white font-bold text-xl mb-6 flex items-center justify-center md:justify-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    The 3% Standard Guarantee
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex items-start gap-3 text-slate-300 font-medium">
                      <span className="text-emerald-400 mt-0.5">✔</span>
                      <span>100% satisfaction guarantee</span>
                    </div>
                    <div className="flex items-start gap-3 text-slate-300 font-medium">
                      <span className="text-emerald-400 mt-0.5">✔</span>
                      <span>If you're not happy, I fix it — no extra cost</span>
                    </div>
                    <div className="flex items-start gap-3 text-slate-300 font-medium">
                      <span className="text-emerald-400 mt-0.5">✔</span>
                      <span>Limited to 2 projects/month</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* FREE AUDIT (Lead Magnet) */}
        <section className="py-24 border-t border-white/5 bg-gradient-to-b from-slate-950 to-slate-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-purple-600/5 blur-[100px] rounded-full pointer-events-none" />
          <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
              <span className="text-sm font-bold text-purple-300 uppercase tracking-widest">
                Free 24-Hour Audit
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Not sure if your idea is viable?
            </h2>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Send me your SaaS idea or current bottleneck. I'll record a free 5-minute Loom video breaking down the technical architecture and a step-by-step execution plan.
            </p>
            <a href="#contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-slate-950 font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              Get Your Free Audit →
            </a>
            <p className="text-sm text-slate-500 mt-6 font-medium">100% free. No sales pitch. Just pure technical value.</p>
          </div>
        </section>

        <section id="faq">
          <Suspense fallback={<LoadingSkeleton />}>
            <ErrorBoundary>
              <FAQ />
            </ErrorBoundary>
          </Suspense>
        </section>
        <Suspense fallback={<LoadingSkeleton />}>
          <ErrorBoundary>
            <Contact />
          </ErrorBoundary>
        </Suspense>
        <ScrollProgress />
      </div>
    </div>
  );
});

export default PortfolioHome;
