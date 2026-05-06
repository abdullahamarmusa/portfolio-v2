import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const products = {
  'saas-boilerplate': {
    title: 'SaaS Boilerplate PRO',
    badge: '🔥 Best-Selling Product',
    headline: 'Launch your SaaS in days, not weeks.',
    proof: '✔ Trusted by developers to launch SaaS products 3x faster',
    description: 'A production-ready full-stack foundation that includes everything you need to start charging customers today. Skip the mundane setup and focus on building features your users actually want.',
    price: '$99',
    visual: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    demoLink: '#demo',
    features: [
      { text: 'User authentication ready out of the box (JWT / OAuth)', top: true, icon: '🔥' },
      { text: 'Stripe billing integration to start collecting payments', top: true, icon: '💳' },
      { text: 'Admin dashboard included to manage your users', top: true, icon: '📊' },
      { text: 'Backend ready to scale your SaaS from day one', top: false, icon: '✔' },
      { text: 'Scalable MongoDB database structure', top: false, icon: '✔' },
      { text: 'SEO-optimized Next.js / React frontend', top: false, icon: '✔' },
      { text: 'Clean, responsive Tailwind CSS UI components', top: false, icon: '✔' }
    ],
    benefits: [
      { title: 'Save 20+ Hours', text: 'Never write auth or billing code from scratch again.' },
      { title: 'Production Ready', text: 'Architected for scale from day one. No tech debt.' },
      { title: 'Easy to Customize', text: 'Clean, well-documented code that is easy to modify.' }
    ],
    notFor: [
      'Beginners with no coding experience',
      'One-page landing projects',
      'People looking for no-code tools'
    ],
    cta: 'Get SaaS Boilerplate',
    bestFor: 'SaaS Founders, Indie Hackers, MVP Builders'
  },
  'automation-kit': {
    title: 'Automation Starter Kit',
    badge: 'Time Saver',
    headline: 'Automate workflows and repetitive tasks in minutes.',
    proof: '✔ Save 20+ hours of setup and automate operations instantly',
    description: 'Pre-built scripts, cron jobs, and API integrations designed to handle the heavy lifting for your business. Reclaim your time and eliminate human error.',
    price: '$49',
    visual: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2070&auto=format&fit=crop',
    demoLink: '#demo',
    features: [
      { text: 'API workflows configured for Stripe, Slack, Mailchimp', top: true, icon: '🔥' },
      { text: 'Cron jobs & schedulers running out of the box', top: true, icon: '⚙️' },
      { text: 'Error logging and notification system integrated', top: true, icon: '📊' },
      { text: 'Data processing & cleanup scripts', top: false, icon: '✔' },
      { text: 'Postman collections for immediate testing', top: false, icon: '✔' },
      { text: 'Deploy-ready Dockerfile for quick hosting', top: false, icon: '✔' }
    ],
    benefits: [
      { title: 'Plug & Play', text: 'Drop into any existing server and run.' },
      { title: 'Zero Maintenance', text: 'Built robustly to run quietly in the background.' },
      { title: 'Highly Extensible', text: 'Easily add your own custom logic.' }
    ],
    notFor: [
      'People unfamiliar with APIs',
      'Those seeking visual drag-and-drop builders',
      'Simple, static websites'
    ],
    cta: 'Get Starter Kit',
    bestFor: 'Agencies, Ops Teams, Solo Founders'
  },
  'internal-tools': {
    title: 'Internal Tool System',
    badge: 'Enterprise Grade',
    headline: 'Build admin panels without starting from scratch.',
    proof: '✔ Built using real production patterns used in top SaaS apps',
    description: 'A secure, role-based CRUD system designed for data-heavy workflows. Give your team the tools they need to manage the business efficiently.',
    price: '$149',
    visual: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=2076&auto=format&fit=crop',
    demoLink: '#demo',
    features: [
      { text: 'Dynamic CRUD generation system to manage records', top: true, icon: '🔥' },
      { text: 'Role-based access control (RBAC) configured securely', top: true, icon: '🔐' },
      { text: 'Clean, responsive Tailwind UI for instant deployment', top: true, icon: '🖥️' },
      { text: 'Database-ready structure for Postgres / Mongo', top: false, icon: '✔' },
      { text: 'Audit logs & activity tracking out of the box', top: false, icon: '✔' },
      { text: 'Data export (CSV / PDF) pre-integrated', top: false, icon: '✔' }
    ],
    benefits: [
      { title: 'Secure by Default', text: 'Enterprise-grade security and role management.' },
      { title: 'Rapid Development', text: 'Add new data models in minutes, not days.' },
      { title: 'Familiar UI', text: 'Looks and feels like a modern SaaS dashboard.' }
    ],
    notFor: [
      'Consumer-facing frontend sites',
      'Single-user simple blogs',
      'Founders looking for generic templates'
    ],
    cta: 'Get Internal System',
    bestFor: 'B2B Companies, Admin Teams, Enterprise'
  }
};

export default function ProductDetail() {
  const { id } = useParams();
  const product = products[id];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <Link to="/" className="text-purple-400 hover:text-purple-300">← Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 font-body selection:bg-purple-500/30 text-slate-300">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-purple-600/10 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-32 pb-24">
        {/* Breadcrumb */}
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors mb-12 group">
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Portfolio
        </Link>

        <div className="grid lg:grid-cols-5 gap-16 items-start">

          {/* Main Content (Left) */}
          <div className="lg:col-span-3 space-y-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
                <span className="text-xs font-bold text-purple-300 uppercase tracking-wide">
                  {product.badge}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-4">
                {product.title}
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed mb-4">
                {product.headline}
              </p>
              <p className="text-sm md:text-base font-semibold text-emerald-400 mb-8">
                {product.proof}
              </p>
              <p className="text-slate-400 leading-relaxed text-lg">
                {product.description}
              </p>
            </div>

            {/* Visual Proof */}
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)] group mt-12 bg-slate-900 aspect-video flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent z-10 pointer-events-none" />
              <video
                autoPlay
                loop
                muted
                playsInline
                poster={product.visual}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              >
                <source src="https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-1730-large.mp4" type="video/mp4" />
              </video>
              <div className="absolute bottom-6 left-6 z-20 flex items-center gap-3">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="text-sm font-bold text-white drop-shadow-md">Live Production Dashboard</span>
              </div>
            </div>

            {/* Features List */}
            <div className="bg-slate-900/40 border border-white/10 backdrop-blur-md rounded-3xl p-8 mt-12">
              <h3 className="text-2xl font-bold text-white mb-8">What's Included</h3>
              <ul className="space-y-5">
                {product.features.map((feature, idx) => (
                  <li key={idx} className={`flex items-start gap-4 ${feature.top ? 'text-white font-semibold text-base' : 'text-slate-300 text-sm'}`}>
                    <div className="mt-0.5 shrink-0 text-lg">
                      {feature.icon}
                    </div>
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits Grid */}
            <div className="grid sm:grid-cols-3 gap-6 mt-12">
              {product.benefits.map((benefit, idx) => (
                <div key={idx} className="border border-white/5 bg-slate-900/30 rounded-2xl p-6">
                  <h4 className="text-white font-bold mb-2">{benefit.title}</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">{benefit.text}</p>
                </div>
              ))}
            </div>

            {/* Who This Is NOT For */}
            <div className="border border-white/5 bg-red-950/10 rounded-2xl p-6 mt-12">
              <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                Who This Is NOT For
              </h4>
              <ul className="space-y-2">
                {product.notFor.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-400 text-sm">
                    <span className="text-red-400 font-bold shrink-0">✘</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Mini Social Proof */}
            <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-900/50 border-l-4 border-purple-500">
              <p className="text-lg italic text-slate-300 mb-4">
                "Saved me 2 weeks of setup time. I was able to start charging customers immediately."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-sm font-bold text-slate-400">JD</div>
                <div className="text-sm text-slate-400 font-medium">— Early Adopter</div>
              </div>
            </div>
          </div>

          {/* Sticky Sidebar (Right) */}
          <div className="lg:col-span-2">
            <div className="sticky top-32 rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-2xl p-8 shadow-[0_0_40px_rgba(168,85,247,0.15)] relative overflow-hidden group hover:border-purple-500/50 hover:shadow-[0_0_60px_rgba(168,85,247,0.25)] transition-all duration-500">
              {/* Subtle top glare effect */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/60 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>

              {/* Background ambient glow */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/20 blur-[50px] rounded-full pointer-events-none group-hover:bg-purple-500/30 transition-colors duration-500"></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="text-slate-400 font-medium whitespace-nowrap text-sm sm:text-base">One-time payment</div>
                  <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.15)] shrink-0">
                    <span className="relative flex h-1.5 w-1.5 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-purple-500"></span>
                    </span>
                    <span className="text-[10px] font-bold text-purple-300 uppercase tracking-wider whitespace-nowrap">Early Pricing</span>
                  </div>
                </div>
                <div className="text-5xl font-bold text-white mb-8">
                  {product.price}
                </div>

                <div className="space-y-4 mb-8">
                  <button className="w-full bg-white text-slate-950 font-bold py-4 rounded-xl hover:bg-purple-50 hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex justify-center items-center gap-2 group/btn relative overflow-hidden">
                    <span className="relative z-10 flex items-center gap-2">
                      {product.cta}
                      <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </button>
                  <a href={product.demoLink} target="_blank" rel="noopener noreferrer" className="w-full bg-slate-800/80 backdrop-blur-sm border border-white/10 text-white font-bold py-4 rounded-xl hover:bg-slate-700 hover:border-white/30 hover:shadow-[0_0_20px_rgba(0,0,0,0.3)] transition-all duration-300 flex justify-center items-center gap-2 group/preview">
                    Live Preview
                    <svg className="w-4 h-4 text-purple-400 group-hover/preview:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </a>
                  <div className="text-left text-[13px] md:text-sm text-slate-300 font-semibold pt-2 flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      Instant access
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      No subscription
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      Lifetime updates
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Best For:</div>
                  <div className="text-sm text-slate-300">
                    {product.bestFor}
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-slate-300 font-medium">
                    <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    7-day money-back guarantee
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    Secure payment via Stripe
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final Bottom CTA Block */}
      <div className="max-w-4xl mx-auto px-6 py-24 mb-12 border-t border-white/5 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Start building your SaaS today</h2>
        <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto">
          Skip weeks of setup. Launch your SaaS MVP in days and start charging customers faster with a production-ready system.
        </p>
        <button className="px-8 py-4 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-lg transition-all duration-300 shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:shadow-[0_0_40px_rgba(168,85,247,0.6)] hover:scale-105">
          {product.cta} →
        </button>
      </div>
    </div>
  );
}
