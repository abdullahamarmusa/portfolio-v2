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
}) => {
  return (
    <ScrollReveal delay={delay}>
      <div className={`relative group h-full ${isPopular ? '-mt-4 mb-4' : ''}`}>
        {/* Popular Badge */}
        {isPopular && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
            <div className="px-4 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold rounded-full border border-white/20 shadow-lg shadow-purple-500/30 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              Most Popular
            </div>
          </div>
        )}

        {/* Outer Glow */}
        {isPopular ? (
          <div className="absolute -inset-1 bg-gradient-to-b from-purple-500/50 via-pink-500/30 to-purple-500/10 rounded-[28px] blur-sm opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
        ) : (
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        )}

        {/* Main Card */}
        <div
          className={`relative h-full p-6 rounded-3xl ${
            isPopular
              ? 'bg-gradient-to-b from-purple-900/40 via-slate-950 to-slate-950 shadow-2xl shadow-purple-900/20'
              : 'bg-slate-900/30 border border-white/5 backdrop-blur-sm'
          } flex flex-col`}
        >
          {/* Card Header */}
          <div className="flex items-start justify-between mb-6">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                isPopular
                  ? 'bg-purple-500/20 border border-purple-500/30'
                  : 'bg-slate-800/50 border border-white/5'
              }`}
            >
              <Icon className={`w-6 h-6 ${isPopular ? 'text-purple-400' : 'text-slate-400'}`} />
            </div>
            {isPopular && (
              <div className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
                <span className="text-xs font-semibold text-purple-400">Best Value</span>
              </div>
            )}
          </div>

          {/* Title & Subtitle */}
          <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
          <p
            className={`text-sm font-medium mb-6 ${isPopular ? 'text-purple-300/70' : 'text-slate-500'}`}
          >
            {subtitle}
          </p>

          {/* Price */}
          <div className="mb-6">
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-bold text-white tabular-nums">{price}</span>
              <span className="text-slate-500 font-medium">{pricePeriod}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-slate-300 text-sm mb-6 leading-relaxed flex-grow">{description}</p>

          {/* Features List */}
          <ul className="space-y-3 mb-8">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    isPopular
                      ? 'bg-emerald-500/20 border border-emerald-500/30'
                      : 'bg-slate-800 border border-white/5'
                  }`}
                >
                  <svg
                    className={`w-3 h-3 ${isPopular ? 'text-emerald-400' : 'text-slate-500'}`}
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
                <span className="text-sm text-slate-300 leading-relaxed">{feature}</span>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <a href={buttonAction} className="mt-auto">
            <button
              className={`w-full py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                isPopular
                  ? 'bg-white text-slate-950 hover:bg-slate-100 hover:scale-[1.02] shadow-lg shadow-white/10'
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
        </div>
      </div>
    </ScrollReveal>
  );
};

export default PricingCard;
