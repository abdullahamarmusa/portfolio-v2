import React, { useState, useEffect } from "react";

const ScrollMouse = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrolled / maxScroll, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-3 opacity-70 hover:opacity-100 transition-all duration-500 cursor-pointer group">
      {/* Enhanced Mouse Body with Gradient Border */}
      <div
        className="relative w-6 h-10 rounded-full border-2 border-slate-500 bg-slate-900/20 backdrop-blur-sm flex justify-center p-1.5 transition-all duration-500 hover:border-purple-400 hover:bg-slate-800/40 hover:scale-105"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Progress Fill */}
        <div
          className="absolute bottom-0 left-0 right-0 rounded-full bg-gradient-to-t from-purple-500/30 to-transparent transition-all duration-300"
          style={{ height: `${scrollProgress * 100}%` }}
        />

        {/* Enhanced Scrolling Wheel */}
        <div className="relative">
          <div className={`w-1.5 h-2 bg-gradient-to-b from-purple-400 to-purple-600 rounded-full transition-all duration-300 ${isHovered ? 'animate-scroll-wheel-fast' : 'animate-scroll-wheel'
            }`} />

          {/* Glow Effect on Hover */}
          {isHovered && (
            <div className="absolute inset-0 w-1.5 h-2 bg-purple-400 rounded-full blur-md animate-pulse" />
          )}
        </div>

        {/* Corner Dots for Tech Aesthetic */}
        <div className="absolute top-1 left-1 w-1 h-1 bg-purple-400/50 rounded-full" />
        <div className="absolute top-1 right-1 w-1 h-1 bg-purple-400/50 rounded-full" />
        <div className="absolute bottom-1 left-1 w-1 h-1 bg-purple-400/50 rounded-full" />
        <div className="absolute bottom-1 right-1 w-1 h-1 bg-purple-400/50 rounded-full" />
      </div>

      {/* Enhanced Text with Infinite Gradient Animation */}
      <div className="flex flex-col items-center gap-1">
        <div className="relative overflow-hidden">
          <span className="text-[9px] uppercase tracking-[0.3em] font-medium transition-all duration-300 group-hover:tracking-[0.4em] bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 via-green-400 via-yellow-400 via-purple-400 bg-clip-text text-transparent animate-gradient-shift">
            Scroll
          </span>

          {/* Text Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-blue-400/20 via-green-400/20 via-yellow-400/20 via-purple-400/20 bg-clip-text text-transparent blur-sm animate-gradient-shift" />
        </div>

        {/* Enhanced Animated Dots with Gradient */}
        <div className="flex gap-1">
          <div className="w-1 h-1 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse delay-0" />
          <div className="w-1 h-1 rounded-full bg-gradient-to-r from-blue-400 to-green-400 animate-pulse delay-150" />
          <div className="w-1 h-1 rounded-full bg-gradient-to-r from-yellow-400 to-purple-400 animate-pulse delay-300" />
        </div>
      </div>

      {/* Hover Ring Effect */}
      <div className="absolute inset-0 w-12 h-16 rounded-full border border-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-110 group-hover:scale-100" />

      {/* Enhanced Animation CSS */}
      <style>{`
        @keyframes scroll-wheel {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(8px); opacity: 0; }
        }
        @keyframes scroll-wheel-fast {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(8px); opacity: 0; }
        }
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-scroll-wheel {
          animation: scroll-wheel 2s ease-in-out infinite;
        }
        .animate-scroll-wheel-fast {
          animation: scroll-wheel-fast 1s ease-in-out infinite;
        }
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 4s ease-in-out infinite;
        }
        .delay-0 { animation-delay: 0ms; }
        .delay-150 { animation-delay: 150ms; }
        .delay-300 { animation-delay: 300ms; }
      `}</style>
    </div>
  );
};

export default ScrollMouse;
