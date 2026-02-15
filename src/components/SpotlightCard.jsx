import React from 'react';

const SpotlightCard = ({ children }) => {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/30 overflow-hidden group transition">
      {children}
    </div>
  );
};

export default SpotlightCard;
