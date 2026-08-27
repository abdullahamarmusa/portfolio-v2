import React from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from './ScrollReveal';
import { PROJECTS } from './reusable/projects-data';

/**
 * Selected Product Builds — honest proof section.
 * Uses each project's real problem/outcome from projects-data.ts.
 * No fabricated quotes, names or testimonials.
 */
const Testimonials = () => {
  const builds = PROJECTS.slice(0, 3);

  return (
    <section className="py-16 relative overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/95 to-slate-950 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-600/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <ScrollReveal className="text-center mb-14">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 backdrop-blur-sm mb-8">
            <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span className="text-sm font-bold text-purple-300 uppercase tracking-wider">
              Selected Product Builds
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-4">
            Proof in the{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              work I ship
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Every build starts with a real product problem. Here's the problem, what I built, and where it landed.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {builds.map((project, idx) => (
            <ScrollReveal key={project.slug} delay={idx * 100}>
              <div className="group relative p-8 rounded-3xl bg-gradient-to-br from-slate-900/60 to-slate-900/40 border border-white/20 backdrop-blur-xl hover:border-purple-500/30 transition-all duration-500 h-full flex flex-col hover:shadow-[0_0_40px_rgba(168,85,247,0.15)]">
                <div className="relative z-10 flex-grow flex flex-col">
                  {/* Problem */}
                  <div className="mb-5">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                      The problem
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed">{project.story?.problem}</p>
                  </div>

                  {/* Outcome */}
                  <div className="mb-6 pt-5 border-t border-white/5">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-3">
                      <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wide">
                        The outcome
                      </span>
                    </div>
                    <p className="text-white text-sm leading-relaxed font-medium">{project.story?.outcome}</p>
                  </div>

                  {/* Project identity */}
                  <div className="mt-auto pt-4 border-t border-white/5">
                    <h3 className="text-white font-bold text-lg">{project.title}</h3>
                    <p className="text-slate-500 text-xs font-medium mt-0.5">{project.category}</p>
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <span className="text-xs text-slate-500">
                        Built by Abdullah Amar Musa · <span className="text-slate-400">Product Engineer</span>
                      </span>
                      <Link
                        to={`/work/${project.slug}`}
                        className="shrink-0 inline-flex items-center gap-1.5 text-xs font-bold text-purple-400 hover:text-purple-200 transition-colors group"
                      >
                        View case study
                        <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="text-center mt-16">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all duration-300 hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Want builds like this? Let's talk</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Testimonials;