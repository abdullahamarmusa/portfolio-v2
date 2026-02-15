import React from 'react';

const ImpactCaseStudy = ({
  title,
  subtitle,
  metrics,
  description,
  techStack,
  architecturalDecision,
  image,
  link,
}) => {
  return (
    <div className="w-full group/case">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* LEFT COLUMN: The "Evidence" */}
        <div className="order-2 lg:order-1">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              <span className="text-xs font-bold text-purple-300 tracking-wide uppercase">
                Case Study
              </span>
            </div>
            <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
              {title}
            </h3>
            <p className="text-lg text-slate-400 leading-relaxed">{description}</p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8 border-y border-white/5 py-6">
            {metrics.map((metric, idx) => (
              <div
                key={idx}
                className="transition-transform duration-300 group-hover/case:translate-y-0 hover:-translate-y-0.5"
              >
                <div className="text-2xl md:text-3xl font-bold text-white mb-1 tabular-nums">
                  {metric.value}
                </div>
                <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-900/50 rounded-xl p-6 border border-white/5 mb-8 hover:border-purple-500/30 hover:bg-slate-900/70 transition-all duration-300">
            <h4 className="text-sm font-bold text-slate-300 mb-2 flex items-center gap-2">
              <svg
                className="w-4 h-4 text-purple-400 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
              </svg>
              The Trade-off
            </h4>
            <p className="text-sm text-slate-400 leading-relaxed italic">
              "{architecturalDecision}"
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 justify-between">
            <div className="flex flex-wrap gap-2">
              {techStack.map(tech => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700 hover:border-slate-600 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
            <a
              href={link}
              className="text-white font-bold hover:text-purple-400 transition-all duration-300 flex items-center gap-2 group/link"
            >
              View Deployment
              <span className="group-hover/link:translate-x-1 transition-transform">→</span>
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN: Browser window with subtle tilt on hover */}
        <div className="order-1 lg:order-2 h-full perspective-card">
          <div className="relative rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-xl p-2 h-full hover:border-purple-500/20 transition-all duration-500 tilt-layer">
            <div className="rounded-xl overflow-hidden bg-slate-950 border border-white/5 relative aspect-[4/3] shadow-2xl group-hover/case:shadow-purple-500/10 transition-shadow duration-500">
              <div className="h-8 bg-slate-900 border-b border-white/5 flex items-center px-4 gap-2 absolute top-0 left-0 w-full z-20">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                </div>
              </div>
              <img
                src={image}
                alt={title}
                loading="lazy"
                className="absolute top-8 left-0 w-full h-full object-cover opacity-90 group-hover/case:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent z-10 pointer-events-none" />
            </div>

            <div className="absolute -bottom-6 -right-6 bg-slate-900 border border-white/10 p-4 rounded-xl shadow-xl hidden md:flex items-center gap-2">
              <div className="text-left">
                <div className="text-xs text-slate-500 uppercase font-bold mb-0.5">Performance</div>
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  Top 1% Global
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactCaseStudy;
