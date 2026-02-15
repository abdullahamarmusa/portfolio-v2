import React from 'react';

const LogoMark = () => {
  return (
    // The Glass Container
    <div className="group relative w-16 h-10 rounded-xl bg-slate-900/50 border border-white/10 backdrop-blur-md flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.15)] overflow-hidden hover:scale-105 hover:border-purple-500/30 transition-all duration-300 cursor-pointer">
      {/* Internal Ambient Glow (activates on hover) */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-transparent to-blue-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Colorful Name Text */}
      <span className="relative z-10 text-xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 group-hover:from-purple-300 group-hover:via-pink-300 group-hover:to-blue-300 transition-all duration-300">
        Abdullah
      </span>
    </div>
  );
};

export default LogoMark;
