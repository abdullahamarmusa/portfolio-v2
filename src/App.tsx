import React, { Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PortfolioHome from './components/PortfolioHome';
import FloatingNav from './components/FloatingNav';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSkeleton from './components/LoadingSkeleton';
import AdminDashboard from './components/AdminDashboard';
import AdminAuth from './components/AdminAuth';
import ProductDetail from './components/ProductDetail';
import PortfolioLoader from './components/PortfolioLoader';
import CaseStudyPage from './components/work/CaseStudyPage';

// Lazy load components that are not immediately visible
const ContactModal = React.lazy(() => import('./components/ContactModal'));

export default function App() {
  const [appLoaded, setAppLoaded] = useState(false);
  const [animFinished, setAnimFinished] = useState(false);

  // Show a fast micro-loader on repeat visits (sessionStorage), but the full
  // cinematic intro only once per session — keeps the site feeling instant.
  const introSeenKey = 'am-intro-seen';
  const isRepeatVisit = typeof window !== 'undefined' && window.sessionStorage.getItem(introSeenKey) === '1';

  useEffect(() => {
    try {
      window.sessionStorage.setItem(introSeenKey, '1');
    } catch { /* no-op */ }
  }, []);

  useEffect(() => {
    if (appLoaded) {
      const t = setTimeout(() => setAnimFinished(true), 350);
      return () => clearTimeout(t);
    }
  }, [appLoaded]);

  return (
    <>
      {/* Loader self-unmounts after its cinematic exit; hero fades in beneath it */}
      <PortfolioLoader duration={isRepeatVisit ? 450 : 1500} onComplete={() => setAppLoaded(true)} />
      <div className={animFinished ? '' : `transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] transform ${appLoaded ? 'opacity-100 translate-y-0 blur-0 scale-100' : 'opacity-0 translate-y-8 blur-md scale-[0.98] h-screen overflow-hidden pointer-events-none'}`}>
        <Router>
      <Routes>
        {/* Main Portfolio Route */}
        <Route
          path="/"
          element={
            <ErrorBoundary>
              <FloatingNav />
              <PortfolioHome />
              <Footer />
              <Suspense fallback={<LoadingSkeleton />}>
                <ErrorBoundary>
                  <ContactModal />
                </ErrorBoundary>
              </Suspense>
            </ErrorBoundary>
          }
        />

        {/* Product Details Route */}
        <Route
          path="/products/:id"
          element={
            <ErrorBoundary>
              <FloatingNav />
              <ProductDetail />
              <Footer />
            </ErrorBoundary>
          }
        />

        {/* Case Study Route */}
        <Route
          path="/work/:slug"
          element={
            <ErrorBoundary>
              <FloatingNav />
              <CaseStudyPage />
              <Footer />
            </ErrorBoundary>
          }
        />

        {/* Protected Admin Dashboard Route */}
        <Route
          path="/admin"
          element={
            <AdminAuth>
              <AdminDashboard />
            </AdminAuth>
          }
        />
      </Routes>
    </Router>
      </div>
    </>
  );
}
