import React from 'react';

export const StripeDashboardArtifact = () => {
  return (
    <div className="absolute top-8 left-0 w-full h-[calc(100%-2rem)] bg-[#0A0A0B] text-white p-4 md:p-6 font-sans border-t border-white/5 overflow-hidden flex flex-col group-hover/case:scale-[1.02] transition-transform duration-700 ease-out z-10 rounded-b-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded bg-[#635BFF] flex items-center justify-center shadow-[0_0_10px_rgba(99,91,255,0.3)]">
            <span className="text-white text-[10px] font-bold">S</span>
          </div>
          <span className="text-sm font-semibold text-slate-200">FinTrack Analytics</span>
        </div>
        <div className="flex gap-2">
          <div className="w-16 h-6 rounded bg-slate-800/50 border border-slate-700" />
          <div className="w-6 h-6 rounded-full bg-slate-800/50 border border-slate-700" />
        </div>
      </div>
      
      {/* Gross Volume */}
      <div className="mb-8">
        <div className="text-[10px] text-slate-400 font-semibold mb-1 uppercase tracking-wider">Gross volume</div>
        <div className="flex items-end gap-3">
          <div className="text-3xl font-light text-white tracking-tight">$142,394.00</div>
          <div className="flex items-center gap-1 text-emerald-400 text-sm font-medium mb-1">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
            24.5%
          </div>
        </div>
      </div>

      {/* Chart Mock */}
      <div className="flex-1 w-full flex items-end gap-[2px] sm:gap-1.5 relative pt-4">
        {/* Horizontal lines */}
        <div className="absolute top-4 w-full border-t border-slate-800/50 border-dashed" />
        <div className="absolute top-1/2 w-full border-t border-slate-800/50 border-dashed" />
        <div className="absolute bottom-0 w-full border-t border-slate-800/50" />
        
        {/* Bars */}
        {[30, 45, 25, 60, 40, 75, 50, 90, 65, 85, 55, 100, 70, 85, 60].map((h, i) => (
          <div key={i} className="flex-1 bg-gradient-to-t from-[#635BFF]/80 to-[#635BFF] rounded-t-[2px] opacity-90 group-hover/case:opacity-100 transition-all relative z-10" style={{ height: `${h}%` }}>
            {/* Tooltip on hover simulation */}
            {i === 11 && (
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-[9px] font-bold px-2 py-1 rounded text-white shadow-xl opacity-0 group-hover/case:opacity-100 transition-opacity delay-300">
                $12k
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Bottom fade out to blend with ImpactCaseStudy container */}
      <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-[#0A0A0B] to-transparent z-20 pointer-events-none" />
    </div>
  );
};
