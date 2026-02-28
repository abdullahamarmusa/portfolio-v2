import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PortfolioHome from './components/PortfolioHome';
import FloatingNav from './components/FloatingNav';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSkeleton from './components/LoadingSkeleton';
import AdminDashboard from './components/AdminDashboard';
import AdminAuth from './components/AdminAuth';

// Lazy load components that are not immediately visible
const ContactModal = React.lazy(() => import('./components/ContactModal'));

export default function App() {
  return (
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
  );
}
