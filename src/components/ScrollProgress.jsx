import React, { useState, useEffect } from 'react';

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollProgress(scrollPercent);

      // Show button when user scrolls down more than 300px
      setIsVisible(scrollTop > 300);
    };

    window.addEventListener('scroll', updateScrollProgress);
    // Initial check
    updateScrollProgress();
    
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min(100, Math.max(0, Math.round(scrollProgress * 100)));

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 group transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-90 pointer-events-none'
      }`}
      aria-label="Scroll to top"
    >
      <div className="relative w-14 h-14 flex items-center justify-center">
        {/* Glow behind the button */}
        <div className="absolute inset-1 rounded-full bg-gradient-to-tr from-purple-600 to-pink-600 blur-md opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
        
        {/* Glass Background */}
        <div className="absolute inset-0 rounded-full bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-300 group-hover:border-purple-500/50"></div>

        {/* SVG Progress Circle */}
        <svg className="relative w-14 h-14 transform -rotate-90 drop-shadow-lg" viewBox="0 0 56 56">
          <defs>
            <linearGradient id="scrollGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" /> {/* purple-500 */}
              <stop offset="100%" stopColor="#ec4899" /> {/* pink-500 */}
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Track */}
          <circle
            cx="28"
            cy="28"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="3"
          />
          
          {/* Progress Indicator */}
          <circle
            cx="28"
            cy="28"
            r={radius}
            fill="none"
            stroke="url(#scrollGradient)"
            strokeWidth="3.5"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - scrollProgress * circumference}
            strokeLinecap="round"
            filter="url(#glow)"
            className="transition-all duration-150 ease-out"
          />
        </svg>

        {/* Center Content (Icon & Percentage) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <div className="relative flex flex-col items-center justify-center transform group-hover:-translate-y-1.5 transition-transform duration-300">
            <svg
              className="w-5 h-5 text-purple-300 group-hover:text-white transition-colors duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
            </svg>
            {/* Tiny Percentage Text */}
            <span className="text-[10px] font-bold tracking-tighter opacity-0 group-hover:opacity-100 absolute top-4 text-pink-300 transition-all duration-300 delay-75">
              {percentage}%
            </span>
          </div>
        </div>
      </div>
    </button>
  );
};

export default ScrollProgress;
