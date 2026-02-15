import React from 'react';

const HeroAvatar = () => {
  return (
    <div className="relative w-full max-w-[500px] mx-auto lg:mr-0 aspect-square flex items-center justify-center">
      {/* 1. The "God Ray" Background Gradient (Ambient Glow) */}
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/40 to-blue-600/40 rounded-full blur-[100px] animate-pulse"></div>

      {/* 2. The Main Image Container */}
      <div className="relative z-10 w-[90%] h-[90%] rounded-full border border-white/10 bg-slate-900/20 backdrop-blur-sm overflow-hidden shadow-2xl shadow-purple-900/20">
        {/* CRITICAL: Replace this URL with a transparent PNG of yourself */}
        <img
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop"
          alt="Your Name"
          className="w-full h-full object-cover object-top opacity-90 hover:scale-110 transition duration-700 ease-out grayscale hover:grayscale-0 cursor-pointer"
        />
      </div>

      {/* 3. Floating "Glass" Artifacts (The Interactive Part) */}

      {/* Top Right: Tech Badge */}
      <div className="absolute -right-4 top-10 z-20 animate-[bounce_3s_infinite]">
        <div className="p-3 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-white/10 shadow-xl flex items-center gap-3 hover:border-purple-500/50 transition group cursor-default">
          <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Stack
            </div>
            <div className="text-white font-bold text-sm">MERN Expert</div>
          </div>
        </div>
      </div>

      {/* Bottom Left: Status Indicator */}
      <div className="absolute -left-4 bottom-20 z-20 animate-[bounce_4s_infinite]">
        <div className="p-4 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-white/10 shadow-xl hover:border-emerald-500/50 transition cursor-default">
          <div className="flex items-center gap-2 mb-1">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
              Online Now
            </span>
          </div>
          <div className="text-white font-bold text-sm">Accepting Projects</div>
        </div>
      </div>

      {/* Bottom Right: Code Decoration */}
      <div className="absolute right-0 bottom-8 z-10 animate-[bounce_5s_infinite] hidden sm:block">
        <div className="px-4 py-2 rounded-lg bg-slate-950 border border-white/10 text-[10px] font-mono text-slate-400 shadow-xl rotate-[-5deg] hover:rotate-0 transition cursor-help">
          <span className="text-purple-400">const</span> <span className="text-blue-400">dev</span>{' '}
          = <span className="text-yellow-400">"Pro"</span>;
        </div>
      </div>
    </div>
  );
};

export default HeroAvatar;
