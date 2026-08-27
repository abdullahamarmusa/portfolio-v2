import React from 'react';
import { SimpleLogo } from './SimpleLogo';

const Footer = () => {
  const navLinks = [
    { text: 'Work', href: '#work' },
    { text: 'Services', href: '#services' },
    { text: 'Process', href: '#process' },
    { text: 'About', href: '#about' },
  ];

  const socials = [
    {
      label: 'GitHub',
      href: 'https://github.com/abdullahamarmusa',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/abdullahamarmusa/',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      label: 'Email',
      href: 'mailto:abdullahamarmusa.dev@gmail.com',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-slate-950 pt-14 pb-8 border-t border-white/5 relative overflow-hidden">
      {/* Background "Watermark" Effect - Adds high-end texture */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-[0.03] select-none flex items-center justify-center overflow-hidden">
        <span className="text-[20vw] font-bold text-white leading-none whitespace-nowrap">
          ENGINEER
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-10 mb-12">
          {/* Brand */}
          <div className="max-w-sm">
            <div className="flex items-center gap-3 mb-1">
              <SimpleLogo
                size={40}
                className="shrink-0 drop-shadow-[0_0_16px_rgba(168,85,247,0.35)]"
              />
              <div className="text-2xl font-bold text-white tracking-tight">
                Abdullah <span className="text-purple-400">Amar Musa</span>
              </div>
            </div>
            <div className="text-sm font-semibold text-purple-300 mb-4">
              Full-Stack Product Engineer
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-5">
              I build polished SaaS products that are ready to ship — from product architecture and UX to production-ready Next.js applications.
            </p>
            <div className="text-xs font-semibold text-emerald-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Available for selected projects
            </div>
          </div>

          {/* Nav + Socials */}
          <div className="flex flex-col sm:flex-row gap-12">
            <nav>
              <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Site</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                {navLinks.map(link => (
                  <li key={link.text}>
                    <a href={link.href} className="hover:text-purple-400 transition">
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Connect</h4>
              <ul className="space-y-3 text-sm text-slate-400 mb-6">
                <li>
                  <a href="mailto:abdullahamarmusa.dev@gmail.com" className="hover:text-purple-400 transition">
                    abdullahamarmusa.dev@gmail.com
                  </a>
                </li>
              </ul>
              <div className="flex gap-3">
                {socials.map(social => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    title={social.label}
                    className="w-10 h-10 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-purple-500/50 transition"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div>
              <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Start</h4>
              <div className="bg-slate-900/50 p-5 rounded-2xl border border-white/5 max-w-[220px]">
                <p className="font-bold text-white mb-3 text-sm">Have a product worth shipping?</p>
                <a
                  href="#contact"
                  className="group flex items-center justify-center gap-2 w-full py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white text-xs font-bold rounded-xl transition"
                >
                  Start a project
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-slate-500 text-xs font-medium">
            © {new Date().getFullYear()} Abdullah Amar Musa — Full-Stack Product Engineer
          </div>
          <div className="text-slate-600 text-xs flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Available for selected projects
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;