import React, { Suspense } from 'react';
import PortfolioHome from './components/PortfolioHome';
import FloatingNav from './components/FloatingNav';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSkeleton from './components/LoadingSkeleton';

// Lazy load components that are not immediately visible
const ContactModal = React.lazy(() => import('./components/ContactModal'));

export default function App() {
  return (
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
  );
}
