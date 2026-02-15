import React, { useState, useEffect } from 'react';

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;
      setScrollProgress(scrollPercent);

      // Show button when user scrolls down more than 300px
      setIsVisible(scrollTop > 300);
    };

    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const circumference = 2 * Math.PI * 20; // radius = 20

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-50 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
    >
      <div className="relative w-12 h-12 flex items-center justify-center">
        {/* Background Circle */}
        <div className="absolute inset-0 rounded-full bg-slate-800/90 backdrop-blur-sm border border-white/10 shadow-xl"></div>

        {/* Progress Circle */}
        <svg className="relative w-12 h-12 transform -rotate-90" viewBox="0 0 48 48">
          {/* Background track */}
          <circle
            cx="24"
            cy="24"
            r="20"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="3"
          />
          {/* Progress indicator */}
          <circle
            cx="24"
            cy="24"
            r="20"
            fill="none"
            stroke="url(#progressGradient)"
            strokeWidth="3"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - scrollProgress * circumference}
            strokeLinecap="round"
            className="transition-all duration-150 ease-out"
          />
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </svg>

        {/* Arrow Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            className="w-5 h-5 text-white transform transition-transform duration-200 hover:-translate-y-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </div>
      </div>
    </button>
  );
};

export default ScrollProgress;
