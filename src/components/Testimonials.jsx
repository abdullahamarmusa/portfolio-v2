import React from 'react';
import ScrollReveal from './ScrollReveal';

const testimonials = [
  {
    name: 'Rahim Ahmed',
    role: 'Founder',
    company: 'FinTrack',
    linkedInVerified: true,
    content:
      "We were stuck in 'tutorial hell' for months. He came in, built the MVP in 10 days, and we got our first paying customer the next week. Worth every penny.",
    result: '10x ROI in 30 days',
    avatar:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop',
  },
  {
    name: 'Sarah Chen',
    role: 'CTO',
    company: 'TechFlow Solutions',
    linkedInVerified: true,
    content:
      'The code quality is insane. Most freelancers give you spaghetti code. This was enterprise-ready, typed, and documented. My internal team loved taking it over.',
    result: 'Reduced tech debt 80%',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop',
  },
  {
    name: 'Marcus Johnson',
    role: 'VP Product',
    company: 'SaaSify',
    linkedInVerified: true,
    content:
      "I didn't just hire a developer; I hired a partner. He pointed out flaws in my logic that saved us $5k in wasted API costs before we even started coding.",
    result: '$50k+ cost savings',
    avatar:
      'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop',
  },
];

const Testimonials = () => {
  return (
    <section className="py-28 relative overflow-hidden border-t border-white/5">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/95 to-slate-950 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-600/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <ScrollReveal className="text-center mb-20">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 backdrop-blur-sm mb-8">
            <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <span className="text-sm font-bold text-purple-300 uppercase tracking-wider">
              Client Success Stories
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-4">
            Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Industry Leaders</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Don't just take my word for it. Here's what founders and executives say about working together.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <ScrollReveal key={idx} delay={idx * 100}>
              <div className="group relative p-8 rounded-3xl bg-gradient-to-br from-slate-900/60 to-slate-900/40 border border-white/20 backdrop-blur-xl hover:border-purple-500/30 transition-all duration-500 h-full flex flex-col hover:shadow-[0_0_40px_rgba(168,85,247,0.15)] hover:scale-[1.02]">
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Quote icon */}
                <div className="absolute top-6 right-6">
                  <svg className="w-8 h-8 text-purple-500/20 group-hover:text-purple-500/40 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>

                {/* Content */}
                <div className="relative z-10 flex-grow">
                  <p className="text-slate-300 text-base leading-relaxed mb-6 font-light">
                    "{t.content}"
                  </p>
                </div>

                {/* Result badge */}
                <div className="mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">
                      {t.result}
                    </span>
                  </div>
                </div>

                {/* Author */}
                <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                  <div className="relative">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-12 h-12 rounded-full border-2 border-purple-500/30 object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 text-white font-bold text-sm">
                      {t.name}
                      {t.linkedInVerified && (
                        <span className="flex items-center gap-1 text-[10px] text-[#0A66C2] bg-white/90 px-2 py-0.5 rounded-md font-bold shadow-sm">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                          Verified Founder
                        </span>
                      )}
                    </div>
                    <div className="text-slate-400 text-xs mt-0.5">{t.role} {t.company && ` @ ${t.company}`}</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom CTA */}
        <ScrollReveal className="text-center mt-20">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all duration-300 hover:scale-105">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Ready to achieve similar results?</span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Testimonials;
