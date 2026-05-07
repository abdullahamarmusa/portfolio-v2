import React from 'react';
import ScrollReveal from './ScrollReveal';
import { PricingCardProps } from '../types';

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  subtitle,
  price,
  pricePeriod,
  description,
  features,
  isPopular,
  buttonText,
  buttonAction,
  icon: Icon,
  gradient: _gradient,
  delay,
  bestFor,
  valueAnchor,
  secondaryCTAText,
  secondaryCTAAction,
  microProof,
}) => {
  return (
    <ScrollReveal delay={delay}>
      <div className={`relative group h-full ${isPopular ? 'md:scale-105 z-10' : 'z-0'}`}>
        {/* Popular Badge */}
        {isPopular && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
            <div className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[10px] font-bold rounded-full border border-white/20 shadow-[0_0_15px_rgba(168,85,247,0.5)] uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
              Most Popular
            </div>
          </div>
        )}

        {/* Outer Glow */}
        {isPopular ? (
          <div className="absolute -inset-0.5 bg-gradient-to-b from-purple-500 via-pink-500 to-purple-500 rounded-[26px] blur opacity-40 group-hover:opacity-70 transition-opacity duration-500" />
        ) : (
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        )}

        {/* Main Card */}
        <div
          className={`relative h-full p-6 rounded-[24px] ${
            isPopular
              ? 'bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border border-purple-500/30 shadow-2xl shadow-purple-900/40'
              : 'bg-slate-900/60 border border-white/10 backdrop-blur-md shadow-xl'
          } flex flex-col`}
        >
          {/* Card Header */}
          <div className="flex items-start justify-between mb-4">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isPopular
                  ? 'bg-purple-500/20 border border-purple-500/30'
                  : 'bg-slate-800/50 border border-white/5'
              }`}
            >
              <Icon className={`w-5 h-5 ${isPopular ? 'text-purple-400' : 'text-slate-400'}`} />
            </div>
          </div>

          {/* Title & Subtitle */}
          <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
          <p
            className={`text-sm font-medium mb-3 ${isPopular ? 'text-purple-300/70' : 'text-slate-500'}`}
          >
            {subtitle}
          </p>

          {/* Best For (Moved UP) */}
          {bestFor && (
            <div className="mb-4 flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">Best for:</span>
              <span className="text-xs font-medium text-slate-300">{bestFor}</span>
            </div>
          )}

          {/* Price */}
          <div className="mb-4">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-white tabular-nums">{price}</span>
              <span className="text-slate-500 text-sm font-medium">{pricePeriod}</span>
            </div>
            {valueAnchor && (
              <div className="mt-2 text-xs font-bold text-emerald-400 bg-emerald-500/10 inline-block px-2.5 py-1 rounded-md border border-emerald-500/20">
                {valueAnchor}
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-slate-300 text-sm mb-6 leading-snug flex-grow">{description}</p>

          {/* Features List */}
          <ul className={`mb-6 ${isPopular ? 'grid grid-cols-2 gap-x-3 gap-y-2.5' : 'space-y-2.5'}`}>
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    isPopular
                      ? 'bg-emerald-500/20'
                      : 'bg-slate-800 border border-white/5'
                  }`}
                >
                  <svg
                    className={`w-2.5 h-2.5 ${isPopular ? 'text-emerald-400' : 'text-slate-500'}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-xs text-slate-300 leading-snug">{feature}</span>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <div className="mt-auto flex flex-col items-center">
            <a href={buttonAction} className="w-full">
              <button
                className={`w-full py-3.5 rounded-[14px] text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                  isPopular
                    ? 'bg-white text-slate-950 hover:bg-slate-200 hover:scale-[1.02] shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                    : 'bg-slate-800/50 border border-white/10 text-white hover:bg-slate-800 hover:border-white/20'
                }`}
              >
                {buttonText}
                {isPopular && (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                )}
              </button>
            </a>
            {/* Secondary CTA */}
            {secondaryCTAText && secondaryCTAAction && (
              <a href={secondaryCTAAction} className="mt-4 text-[11px] font-semibold uppercase tracking-wide text-slate-400 hover:text-white transition-colors">
                {secondaryCTAText}
              </a>
            )}
            
            {/* Micro Proof */}
            {microProof && microProof.length > 0 && (
              <div className="mt-6 w-full space-y-2 border-t border-white/10 pt-4">
                {microProof.map((proof, idx) => (
                  <div key={idx} className="flex items-center gap-2 justify-center text-xs text-slate-400 font-medium">
                    {idx === 0 ? <span className="text-yellow-500">⭐</span> : <span className="text-emerald-400">⚡</span>}
                    {proof}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
};

export default PricingCard;
