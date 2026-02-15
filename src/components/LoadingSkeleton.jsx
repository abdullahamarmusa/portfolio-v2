import React from 'react';

const SkeletonCard = ({ className = '' }) => (
  <div
    className={`bg-slate-900/40 border border-white/5 rounded-3xl p-6 animate-pulse ${className}`}
  >
    <div className="animate-pulse space-y-4">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-slate-800" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-slate-800 rounded w-3/4" />
          <div className="h-3 bg-slate-800 rounded w-1/2" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-slate-800 rounded" />
        <div className="h-3 bg-slate-800 rounded" />
        <div className="h-3 bg-slate-800 rounded w-5/6" />
      </div>
    </div>
  </div>
);

const SkeletonHero = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="max-w-7xl mx-auto px-6 w-full">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 animate-pulse">
          <div className="h-6 w-32 bg-slate-800 rounded-full" />
          <div className="h-12 bg-slate-800 rounded w-3/4" />
          <div className="h-6 bg-slate-800 rounded w-full" />
          <div className="h-6 bg-slate-800 rounded w-2/3" />
          <div className="flex gap-4 pt-4">
            <div className="h-12 w-36 bg-slate-800 rounded-xl" />
            <div className="h-12 w-36 bg-slate-800 rounded-xl" />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-[400px] h-[400px] bg-slate-800 rounded-full" />
        </div>
      </div>
    </div>
  </div>
);

const SkeletonBento = () => (
  <div className="py-28">
    <div className="max-w-7xl mx-auto px-6">
      <div className="mb-20 space-y-4 animate-pulse">
        <div className="w-12 h-12 bg-slate-800 rounded-2xl" />
        <div className="h-8 bg-slate-800 rounded w-1/3" />
        <div className="h-4 bg-slate-800 rounded w-2/3" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
        <SkeletonCard className="md:col-span-2" />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard className="md:col-span-2" />
      </div>
    </div>
  </div>
);

const SkeletonTestimonials = () => (
  <div className="py-28">
    <div className="max-w-7xl mx-auto px-6">
      <div className="mb-16 text-center space-y-4 animate-pulse">
        <div className="h-6 w-32 bg-slate-800 rounded-full mx-auto" />
        <div className="h-8 bg-slate-800 rounded w-1/3 mx-auto" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  </div>
);

const LoadingSkeleton = ({ type = 'hero' }) => {
  switch (type) {
    case 'hero':
      return <SkeletonHero />;
    case 'bento':
      return <SkeletonBento />;
    case 'testimonials':
      return <SkeletonTestimonials />;
    case 'full':
      return (
        <div className="min-h-screen bg-slate-950">
          <SkeletonHero />
          <SkeletonBento />
          <SkeletonTestimonials />
        </div>
      );
    default:
      return <SkeletonCard />;
  }
};

export default LoadingSkeleton;
