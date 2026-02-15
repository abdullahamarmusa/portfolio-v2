import React, { useState, useEffect } from 'react';
import LogoMark from './LogoMark';

const FloatingNav = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinkClass =
    'text-sm font-medium text-slate-400 hover:text-white transition-all duration-300 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 rounded-lg px-2';

  return (
    <div className="fixed top-[26px] left-1/2 -translate-x-1/2 z-50 w-full max-w-fit">
      <nav
        className={`flex items-center gap-1 sm:gap-4 px-3 py-2.5 rounded-full border backdrop-blur-md shadow-xl transition-all duration-500 ease-out ${scrolled
          ? 'bg-slate-900/90 border-white/10 shadow-purple-500/10'
          : 'bg-slate-900/50 border-white/5 shadow-purple-500/5'
          }`}
      >

        {/* --- CLEAN NAVIGATION ONLY --- */}

        {/* Navigation Links */}
        <div className="flex items-center gap-1 sm:gap-2">
          <a href="#work" className={navLinkClass}>
            Work
          </a>

          {/* Asset Store Link */}
          <a
            href="https://your-store-link.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`${navLinkClass} flex items-center gap-1.5 group`}
          >
            <svg
              className="w-3.5 h-3.5 text-purple-400 group-hover:text-purple-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-white font-semibold group-hover:text-white">
              Assets
            </span>
          </a>

          <a href="#pricing" className={navLinkClass}>
            Pricing
          </a>
        </div>

        <div className="h-4 w-px bg-white/10 mx-2" aria-hidden />

        {/* CTA Button */}
        <a
          href="#contact"
          className="px-5 py-2 rounded-full bg-white text-slate-950 text-xs font-bold hover:bg-purple-50 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:scale-105 active:scale-95"
        >
          Book Call
        </a>
      </nav>
    </div>
  );
};

export default FloatingNav;
