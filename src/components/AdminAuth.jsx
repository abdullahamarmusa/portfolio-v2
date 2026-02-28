import React, { useState, useEffect } from 'react';
import AdminDashboard from './AdminDashboard';
import { verifyAdminPin } from '../lib/authService';

/**
 * Protected Admin Dashboard with PIN Authentication
 *
 * Features:
 * - Database-backed admin credentials
 * - Username + PIN authentication (no password required)
 * - Session-based authentication
 * - Logout functionality
 * - Secure PIN hashing (SHA256)
 */

const AdminAuth = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [attempts, setAttempts] = useState(0);
  const [locked, setLocked] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Check if already authenticated on mount
  useEffect(() => {
    const token = sessionStorage.getItem('adminToken');
    const timestamp = sessionStorage.getItem('adminTokenTime');

    // Token expires after 24 hours
    if (token && timestamp) {
      const expiryTime = parseInt(timestamp) + (24 * 60 * 60 * 1000);
      if (Date.now() < expiryTime) {
        setAuthenticated(true);
      } else {
        sessionStorage.removeItem('adminToken');
        sessionStorage.removeItem('adminTokenTime');
      }
    }
    setLoading(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsAuthenticating(true);

    if (locked) {
      setError('Too many attempts. Please try again in 15 minutes.');
      setIsAuthenticating(false);
      return;
    }

    if (attempts >= 5) {
      setLocked(true);
      setTimeout(() => {
        setAttempts(0);
        setLocked(false);
      }, 15 * 60 * 1000);
      setError('Too many incorrect attempts. Account locked for 15 minutes.');
      setIsAuthenticating(false);
      return;
    }

    if (!username || !pin) {
      setError('Please enter both username and PIN.');
      setIsAuthenticating(false);
      return;
    }

    try {
      const result = await verifyAdminPin(username, pin);

      if (result.success) {
        // Generate secure token
        const token = Math.random().toString(36).substring(2) + Date.now().toString(36);
        sessionStorage.setItem('adminToken', token);
        sessionStorage.setItem('adminTokenTime', Date.now().toString());
        sessionStorage.setItem('adminId', result.adminId);
        setAuthenticated(true);
        setUsername('');
        setPin('');
        setAttempts(0);
      } else {
        setAttempts(prev => prev + 1);
        const remaining = 5 - attempts - 1;
        setError(remaining > 0 ? `${result.message}. ${remaining} attempts remaining.` : result.message);
        setPin('');
      }
    } catch (err) {
      setError('Authentication error. Please try again.');
      console.error(err);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminToken');
    sessionStorage.removeItem('adminTokenTime');
    setAuthenticated(false);
    setAttempts(0);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4" />
          <p className="text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4">
        {/* Background gradient effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 left-1/4 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full" />
          <div className="absolute -bottom-1/2 right-1/4 w-[500px] h-[500px] bg-cyan-600/10 blur-[120px] rounded-full" />
        </div>

        <div className="relative w-full max-w-md">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-2xl blur-lg" />

          <div className="relative bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-purple-500/30 mb-4">
                <svg
                  className="w-8 h-8 text-purple-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Admin Access</h1>
              <p className="text-slate-400">Enter your credentials to continue</p>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your admin username"
                  disabled={locked || isAuthenticating}
                  autoFocus
                  className="w-full bg-slate-950/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-slate-600 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  PIN
                </label>
                <input
                  type="password"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="Enter your PIN (4-6 digits)"
                  disabled={locked || isAuthenticating}
                  className="w-full bg-slate-950/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-slate-600 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition disabled:opacity-50 disabled:cursor-not-allowed font-mono text-center text-lg tracking-widest"
                />
              </div>

              <button
                type="submit"
                disabled={locked || !username || !pin || isAuthenticating}
                className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 disabled:from-slate-700 disabled:to-slate-700 disabled:cursor-not-allowed px-4 py-3 rounded-lg text-white font-bold transition duration-200 flex items-center justify-center gap-2"
              >
                {isAuthenticating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    {locked ? 'Locked - Try Later' : 'Access Dashboard'}
                  </>
                )}
              </button>
            </form>

            {/* Security Info */}
            <div className="mt-6 p-4 rounded-lg bg-slate-800/30 border border-white/5">
              <p className="text-xs text-slate-500 flex items-start gap-2">
                <svg
                  className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zm-11-1a1 1 0 11-2 0 1 1 0 012 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>PIN protected. Session expires after 24 hours. Account locked after 5 failed attempts.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated - Show dashboard with logout button
  return (
    <div className="relative">
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="fixed top-4 right-4 z-50 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition flex items-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
        Logout
      </button>

      {/* Admin Dashboard */}
      {children}
    </div>
  );
};

export default AdminAuth;
