import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-950 pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
      {/* Background "Watermark" Effect - Adds high-end texture */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-[0.03] select-none flex items-center justify-center overflow-hidden">
        {/* CHANGE THIS WORD BELOW */}
        <span className="text-[20vw] font-bold text-white leading-none whitespace-nowrap">
          ARCHITECT
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand & Mission */}
          <div className="col-span-1 md:col-span-1">
            <div className="text-2xl font-bold text-white mb-4 tracking-tight">
              Abdullah <span className="text-purple-400">Amar Musa</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Building high-performance digital experiences for ambitious founders. Turning code
              into capital since 2024.
            </p>
            <div className="text-sm font-semibold text-emerald-400 mb-6 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Helping founders build, launch, and scale faster.
            </div>
            {/* Social Row */}
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/in/abdullahamarmusa/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-purple-500/50 transition"
              >
                {/* LinkedIn Icon */}
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://github.com/abdullahamarmusa"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-purple-500/50 transition"
              >
                {/* GitHub Icon */}
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Navigation (The Map) */}
          <div>
            <h4 className="font-bold text-white mb-6">Navigation</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li>
                <a href="#work" className="hover:text-purple-400 transition">
                  Case Studies
                </a>
              </li>
              <li>
                <a href="#systems" className="hover:text-purple-400 transition">
                  Systems
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-purple-400 transition">
                  Process
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-purple-400 transition">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-purple-400 transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Assets (THE MONEY MAKER) */}
          <div>
            <h4 className="font-bold text-white mb-6">Products</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li>
                <a href="https://your-store.com" className="hover:text-purple-400 transition flex items-center gap-2">
                  SaaS Boilerplate
                  <span className="px-2 py-0.5 rounded text-[10px] bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30">
                    🔥 Most Popular
                  </span>
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400 transition">
                  Automation Systems
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400 transition">
                  Internal Tools
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400 transition">
                  UI Kits (Figma)
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400 transition">
                  Free Resources
                </a>
              </li>
              <li className="pt-2 mt-2 border-t border-white/5">
                <a href="#" className="text-purple-400 hover:text-purple-300 transition font-semibold flex items-center gap-1 group">
                  View All Products
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal (Trust Anchors) */}
          <div>
            <h4 className="font-bold text-white mb-6">Legal</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li>
                <a href="#" className="hover:text-purple-400 transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400 transition">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400 transition">
                  Refund Policy
                </a>
              </li>
            </ul>

            {/* CTA */}
            <div className="bg-slate-900/50 p-5 rounded-2xl border border-white/5 mt-8">
              <h4 className="font-bold text-white mb-3 text-sm">🚀 Ready to build your product?</h4>
              <a href="#contact" className="flex items-center justify-center w-full py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white text-xs font-bold rounded-xl text-center transition">
                Book Strategy Call
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-slate-500 text-xs font-medium">
            © {new Date().getFullYear()} Abdullah Amar Musa — Built for founders who want to move fast.
          </div>
          <div className="text-slate-600 text-xs flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            All Systems Operational
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
