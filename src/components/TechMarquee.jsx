import React from 'react';

const TechMarquee = () => {
  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="overflow-hidden bg-slate-900 rounded-2xl p-4">
          <div className="whitespace-nowrap animate-marquee text-slate-300">
            JavaScript • React • Node • Express • MongoDB • Tailwind • Vite • OpenAI • Stripe •
            Docker • TypeScript
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechMarquee;
