import React from 'react';
import ScrollReveal from './ScrollReveal';
import { PricingCardProps } from '../types';
import './pricing-lighting.css';

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  subtitle,
  price,
  pricePeriod,
  priceLabel,
  description: _description,
  features,
  isPopular,
  buttonText,
  buttonAction,
  icon: Icon,
  gradient: _gradient,
  delay,
  bestFor,
  secondaryCTAText,
  secondaryCTAAction,
  microProof,
  scope,
  ctaHint,
  accent = 'violet',
}) => {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const rafRef = React.useRef(0);

  // Cursor-reactive light: updates --mouse-x/--mouse-y CSS vars (rAF-throttled)
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0;
      el.style.setProperty('--mouse-x', `${x}px`);
      el.style.setProperty('--mouse-y', `${y}px`);
    });
  };

  return (
    <ScrollReveal delay={delay}>
      <div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        className={`pcard pcard--${accent} relative group h-full transition-transform duration-300 ease-out ${
          isPopular ? 'md:scale-105 z-10' : 'z-0'
        } hover:-translate-y-1.5`}
      >
        {/* Popular Badge */}
        {isPopular && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
            <div className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[10px] font-bold rounded-full border border-white/20 shadow-[0_0_15px_rgba(168,85,247,0.5)] uppercase tracking-wider flex items-center gap-1.5 whitespace-nowrap">
              <span className="text-yellow-200">✦</span>
              Most popular
            </div>
          </div>
        )}

        {/* Main Card */}
        <div className="pcard-body relative h-full p-6 rounded-[24px] flex flex-col">
          {/* Lighting layers */}
          <div className="pcard-corner" aria-hidden="true">
            <div className="pcard-corner-inner" />
          </div>
          <div className="pcard-energy" aria-hidden="true" />
          <div className="pcard-cursor" aria-hidden="true" />

          {/* Card Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="pcard-icon w-10 h-10 rounded-xl flex items-center justify-center">
              <Icon
                className={`w-5 h-5 transition-colors duration-300 ${
                  isPopular ? 'text-purple-200' : 'text-slate-300 group-hover:text-white'
                }`}
              />
            </div>
          </div>

          {/* Title & Subtitle */}
          <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
          <p
            className={`text-sm font-medium mb-4 ${isPopular ? 'text-purple-300/70' : 'text-slate-500'}`}
          >
            {subtitle}
          </p>

          {/* Best For */}
          {bestFor && (
            <div className="mb-4 pb-4 border-b border-white/5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Best for
              </div>
              <div className="pcard-bestfor text-xs font-semibold text-emerald-300 leading-snug">
                {bestFor}
              </div>
            </div>
          )}

          {/* Price */}
          <div className="mb-3">
            <div className="flex items-baseline gap-1.5">
              <span className="text-4xl font-bold text-white tabular-nums">{price}</span>
              {pricePeriod && (
                <span className="text-slate-500 text-sm font-medium">{pricePeriod}</span>
              )}
            </div>
            {priceLabel && (
              <div className="mt-1 text-[11px] font-medium uppercase tracking-wide text-slate-500">
                {priceLabel}
              </div>
            )}
          </div>

          {/* Scope */}
          {scope && (
            <div className="mb-5">
              <p className="text-xs text-slate-400 font-medium leading-snug">{scope}</p>
            </div>
          )}

          {/* Features List */}
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2.5">
            {"What's included"}
          </div>
          <ul className={`mb-6 ${isPopular ? 'grid grid-cols-2 gap-x-3 gap-y-2.5' : 'space-y-2.5'}`}>
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors duration-300 ${
                    isPopular
                      ? 'bg-emerald-500/20'
                      : 'bg-slate-800 border border-white/5 group-hover:border-emerald-500/30'
                  }`}
                >
                  <svg
                    className={`w-2.5 h-2.5 transition-colors duration-300 ${
                      isPopular ? 'text-emerald-400' : 'text-slate-500 group-hover:text-emerald-400'
                    }`}
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
          <div className="mt-auto flex flex-col items-center relative z-10">
            <a href={buttonAction} className="w-full block">
              <button
                className={`group/btn w-full py-3.5 rounded-[14px] text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                  isPopular
                    ? 'cta-sheen bg-white text-slate-950 hover:bg-slate-100 hover:scale-[1.02] shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.35)]'
                    : 'bg-slate-800/50 border border-white/10 text-white hover:bg-slate-800 hover:border-white/30'
                }`}
              >
                {buttonText}
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </a>

            {/* Micro-reassurance under CTA */}
            {ctaHint && (
              <p className="mt-3 text-[11px] text-slate-500 text-center leading-snug">{ctaHint}</p>
            )}

            {/* Secondary CTA */}
            {secondaryCTAText && secondaryCTAAction && (
              <a
                href={secondaryCTAAction}
                className="mt-4 text-[11px] font-semibold uppercase tracking-wide text-slate-400 hover:text-white transition-colors"
              >
                {secondaryCTAText}
              </a>
            )}

            {/* Micro Proof */}
            {microProof && microProof.length > 0 && (
              <div className="mt-6 w-full space-y-2 border-t border-white/10 pt-4">
                {microProof.map((proof, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 justify-center text-xs text-slate-400 font-medium"
                  >
                    {idx === 0 ? (
                      <span className="text-yellow-500">⭐</span>
                    ) : (
                      <span className="text-emerald-400">⚡</span>
                    )}
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