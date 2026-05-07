// @ts-nocheck
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
import PremiumLoader from './components/PremiumLoader';

// Lazy load components that are not immediately visible
const ContactModal = React.lazy(() => import('./components/ContactModal'));

export default function App() {
  const [appLoaded, setAppLoaded] = useState(false);
  const [animFinished, setAnimFinished] = useState(false);

  useEffect(() => {
    if (appLoaded) {
      const t = setTimeout(() => setAnimFinished(true), 1000);
      return () => clearTimeout(t);
    }
  }, [appLoaded]);

  return (
    <>
      {!appLoaded && <PremiumLoader onComplete={() => setAppLoaded(true)} />}
      <div className={animFinished ? '' : `transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] transform ${appLoaded ? 'opacity-100 translate-y-0 blur-0 scale-100' : 'opacity-0 translate-y-8 blur-md scale-[0.98] h-screen overflow-hidden pointer-events-none'}`}>
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
