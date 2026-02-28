import React, { useState, useEffect, useRef } from 'react';
import LogoMark from './LogoMark';

const FloatingNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('work');
  const indicatorRef = useRef(null);

  const navLinks = [
    { id: 'work', text: 'Work', href: '#work' },
    { id: 'assets', text: 'Assets', href: 'https://your-store-link.com', external: true },
    { id: 'pricing', text: 'Pricing', href: '#pricing' }
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (linkId) => {
    setActiveLink(linkId);
    setTimeout(() => {
      const linkElement = document.querySelector(`[data-nav-id="${linkId}"]`);
      if (indicatorRef.current && linkElement) {
        const rect = linkElement.getBoundingClientRect();
        const navRect = indicatorRef.current.getBoundingClientRect();
        const translateX = rect.left - navRect.left;
        indicatorRef.current.style.transform = `translateX(${translateX}px)`;
      }
    }, 50);
  };

  const navLinkClass =
    'text-sm font-medium text-slate-400 hover:text-white transition-all duration-300 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 rounded-lg px-2';

  return (
    <div className="fixed top-[26px] left-1/2 -translate-x-1/2 z-50 w-full max-w-fit">
      <nav
        className={`flex items-center gap-1 sm:gap-4 px-3 py-2.5 rounded-full border backdrop-blur-md shadow-xl transition-all duration-500 ease-out ${scrolled
          ? 'bg-slate-900/90 border-white/10 shadow-purple-500/10'
          : 'bg-slate-900/50 border-white/5 shadow-purple-500/5'
          }`}
      >

        {/* --- CLEAN NAVIGATION ONLY --- */}

        {/* Navigation Links */}
        <div className="flex items-center gap-1 sm:gap-2 relative">
          {/* Sliding Indicator */}
          <div
            ref={indicatorRef}
            className="absolute bottom-[-2px] left-0 h-0.5 rounded-full bg-gradient-to-r from-purple-200 to-white transition-all duration-300"
          />

          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              data-nav-id={link.id}
              className={`${navLinkClass} ${activeLink === link.id ? 'text-white scale-105' : ''}`}
              onClick={() => !link.external && handleClick(link.id)}
              target={link.external ? '_blank' : ''}
              rel={link.external ? 'noopener noreferrer' : ''}
            >
              {link.text}
            </a>
          ))}
        </div>

        <div className="h-4 w-px bg-white/10 mx-2" aria-hidden />

        {/* CTA Button */}
        <a
          href="#contact"
          className="px-5 py-2 rounded-full bg-white text-slate-950 text-xs font-bold hover:bg-purple-50 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:scale-105 active:scale-95"
        >
          Book Call
        </a>
      </nav>
    </div>
  );
};

export default FloatingNav;
