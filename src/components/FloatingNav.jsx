import React, { useState, useEffect } from 'react';
import BrandLogo from './BrandLogo';

const FloatingNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('work');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'work', text: 'Work', href: '#work' },
    { id: 'services', text: 'Services', href: '#services' },
    { id: 'process', text: 'Process', href: '#process' },
    { id: 'about', text: 'About', href: '#about' },
    { id: 'faq', text: 'FAQ', href: '#faq' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Scroll Spy Logic
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      let currentSection = activeLink;

      for (const link of navLinks) {
        const section = document.getElementById(link.id);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = link.id;
          }
        }
      }

      if (window.scrollY < 100) {
        setActiveLink('');
      } else if (currentSection !== activeLink) {
        setActiveLink(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeLink]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        document.body.style.overflow = '';
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      // Ensure scroll lock is released if component unmounts
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleClick = (linkId) => {
    setActiveLink(linkId);
    setIsMobileMenuOpen(false);
  };

  const navLinkClass =
    'text-sm font-medium text-slate-400 transition-all duration-300 focus:outline-none px-4 py-2 rounded-full hover:text-white hover:bg-white/10 hover:backdrop-blur-md border border-transparent hover:border-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] active:scale-95 active:bg-white/20';

  return (
    <>
      <div className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ease-out ${
        scrolled || isMobileMenuOpen
          ? 'bg-slate-900/90 md:bg-slate-900/50 backdrop-blur-2xl shadow-none py-4 border-b border-white/10 md:border-transparent' 
          : 'bg-slate-950/95 md:bg-transparent backdrop-blur-2xl md:backdrop-blur-none py-4 md:py-8 border-b border-white/5 md:border-transparent'
      }`}>
        <nav className="flex items-center justify-between px-6 md:px-10 xl:px-[100px] w-full max-w-[1440px] mx-auto relative z-50">
          
          {/* Logo/Name -> Left */}
          <div className="flex-shrink-0 flex items-center justify-between w-full md:w-auto">
            <BrandLogo href="#" showName={true} />
            <div className="flex items-center gap-2 ml-4 md:hidden">
              <button 
                className="text-slate-300 hover:text-white focus:outline-none p-2 rounded-md hover:bg-white/10 transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
              </button>
            </div>
          </div>

          {/* Navigation Links -> Slightly right of center */}
          <div className="hidden md:flex items-center gap-2 ml-auto relative">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                data-nav-id={link.id}
                className={`${navLinkClass} ${link.desktopOnly ? 'hidden xl:inline-block' : ''} ${activeLink === link.id ? 'text-white bg-white/10 backdrop-blur-md border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.02)]' : ''}`}
                onClick={() => handleClick(link.id)}
              >
                {link.text}
              </a>
            ))}

          </div>

          {/* CTA Button -> Far Right */}
          <div className="flex-shrink-0 hidden md:block ml-6 pl-6 border-l border-white/10">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-bold transition-all duration-300 shadow-[0_0_25px_rgba(168,85,247,0.35)] hover:shadow-[0_0_40px_rgba(168,85,247,0.55)] hover:scale-105 active:scale-95"
            >
              Start a project
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-2xl flex flex-col px-6 pt-28 pb-8 transition-opacity duration-500 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className={`flex flex-col gap-6 flex-1 transform transition-all duration-500 delay-100 ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={`text-2xl font-bold transition-all duration-300 ${
                activeLink === link.id 
                  ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 translate-x-2' 
                  : 'text-slate-400 hover:text-white hover:translate-x-2'
              }`}
              onClick={() => {
                handleClick(link.id);
                document.body.style.overflow = '';
              }}
            >
              {link.text}
            </a>
          ))}
        </div>
        <div className={`mt-auto transform transition-all duration-500 delay-200 ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <a 
            href="#contact"
            onClick={() => {
              setIsMobileMenuOpen(false);
              document.body.style.overflow = '';
            }}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 rounded-xl text-center block hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)]"
          >
            Start a Project
          </a>
        </div>
      </div>
    </>
  );
};

export default FloatingNav;
