import React from 'react';
import { SimpleLogo } from './SimpleLogo';

const BrandLogo = ({ href = '#', showName = true, className = '' }) => {
  return (
    <a
      href={href}
      aria-label="Abdullah Amar Musa"
      className={`group inline-flex items-center gap-3 ${className}`}
    >
      <SimpleLogo
        size={32}
        className="shrink-0 drop-shadow-[0_0_14px_rgba(168,85,247,0.35)] transition-transform duration-500 group-hover:scale-105"
      />

      {showName && (
        <span className="text-[17px] font-semibold tracking-[-0.03em] transition-opacity duration-200 group-hover:opacity-90">
          Abdullah{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            Amar Musa
          </span>
        </span>
      )}
    </a>
  );
};

export default BrandLogo;