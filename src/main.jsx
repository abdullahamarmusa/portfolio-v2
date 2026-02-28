import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Analytics } from "@vercel/analytics/react";

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');

const root = createRoot(container);

// Use StrictMode in development, but not in production for better performance
const AppWrapper = process.env.NODE_ENV === 'development' ? (
  <React.StrictMode>
    <App />
    <Analytics />
  </React.StrictMode>
) : (
  <>
    <App />
    <Analytics />
  </>
);

root.render(AppWrapper);

// Performance optimizations
if (typeof window !== 'undefined') {
  // Preload critical resources
  const preloadCriticalResources = () => {
    const criticalImages = [
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop'
    ];

    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  };

  // Optimize scroll performance
  let ticking = false;
  const optimizedScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        ticking = false;
      });
      ticking = true;
    }
  };

  // Basic reveal-on-scroll observer for elements with class 'reveal'
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    window.addEventListener('load', () => {
      document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
      preloadCriticalResources();
    });

    // Add scroll listener with performance optimization
    window.addEventListener('scroll', optimizedScroll, { passive: true });
  }
}
