import React, { useState } from 'react';
import ScrollReveal from './ScrollReveal';

const BUDGET_OPTIONS = ['< $5k', '$5k-10k', '$10k-20k', '$20k+'];

// Glassmorphism Success Message Component
const SuccessMessage = ({ onReset }) => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="relative group">
      {/* Animated glow effects */}
      <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-emerald-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition duration-1000 animate-pulse" />
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl" />

      {/* Main glass card */}
      <div className="relative bg-slate-950/60 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 max-w-md mx-auto text-center shadow-2xl">
        {/* Close button */}
        <button
          onClick={onReset}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-300"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Animated icon */}
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-500/30 to-cyan-500/30 backdrop-blur-sm" />
          <div className="absolute inset-2 rounded-full bg-slate-950/80 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-emerald-400 animate-[bounce_1s_ease-out]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-6 left-6 w-2 h-2 rounded-full bg-emerald-500/50 animate-pulse" />
        <div className="absolute bottom-8 right-10 w-1.5 h-1.5 rounded-full bg-cyan-500/50 animate-pulse delay-150" />
        <div className="absolute top-10 right-16 w-1 h-1 rounded-full bg-purple-500/50 animate-pulse delay-300" />

        <h3 className="font-display text-2xl font-bold text-white mb-3">Message Sent!</h3>
        <p className="text-slate-400 mb-6 leading-relaxed">
          Thanks for reaching out. I'll review your project details and get back to you within{' '}
          <span className="text-emerald-400 font-medium">24 hours</span>.
        </p>

        {/* Action button */}
        <button
          onClick={onReset}
          className="group px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 text-white font-medium hover:from-emerald-500/30 hover:to-cyan-500/30 transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
        >
          <span>Send Another Message</span>
          <svg
            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
);

// Glassmorphism Error Alert Component
const ErrorAlert = ({ message, onDismiss }) => (
  <div className="relative group">
    {/* Animated glow effects */}
    <div className="absolute -inset-1 bg-gradient-to-r from-red-500 via-rose-500 to-red-500 rounded-xl blur-xl opacity-20 group-hover:opacity-40 transition duration-500" />

    {/* Main glass card */}
    <div className="relative bg-slate-950/60 backdrop-blur-2xl border border-red-500/20 rounded-xl p-5 flex items-start gap-4">
      {/* Animated icon */}
      <div className="relative w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
        <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      <div className="flex-1">
        <h4 className="font-semibold text-white mb-1">Something went wrong</h4>
        <p className="text-sm text-slate-400">
          {message || 'Please try again or contact me directly.'}
        </p>
      </div>

      {/* Dismiss button */}
      <button
        onClick={onDismiss}
        className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-200"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  </div>
);

const Contact = () => {
  const [budget, setBudget] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null); // Clear error on input
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Simulate form submission - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Simulate random error (remove in production)
      // throw new Error('Network error');

      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setBudget(null);
    } catch (err) {
      setIsSubmitting(false);
      setError('Unable to send message. Please try again or email me directly.');
    }
  };

  if (submitted) {
    return (
      <section
        id="contact"
        className="py-28 relative overflow-hidden bg-slate-950 border-t border-white/5"
      >
        {/* Background effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-600/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-600/5 blur-[100px] rounded-full pointer-events-none" />

        <SuccessMessage onReset={() => setSubmitted(false)} />
      </section>
    );
  }

  return (
    <section
      id="contact"
      className="py-28 relative overflow-hidden bg-slate-950 border-t border-white/5"
    >
      {/* Background effects */}
      <div className="absolute -top-[10%] -left-[10%] w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[0%] right-[0%] w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
              <svg
                className="w-4 h-4 text-purple-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="text-xs font-bold text-purple-300 uppercase tracking-wide">
                Contact
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Ready to start your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                next big thing?
              </span>
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed max-w-md">
              I'm currently accepting new projects for Q2 2026. If you're looking for a partner to
              build scalable, high-performance software, let's chat.
            </p>

            <div className="space-y-6">
              <a
                href="mailto:abdullahamarmusa.dev@gmail.com"
                className="flex items-center gap-4 text-slate-300 group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-slate-800/50 flex items-center justify-center border border-white/5 group-hover:border-purple-500/50 group-hover:bg-slate-800/80 transition-all duration-300">
                  <svg
                    className="w-5 h-5 text-slate-400 group-hover:text-purple-400 transition"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <span className="group-hover:text-white transition">abdullahamarmusa.dev@gmail.com</span>
              </a>
              <a
                href="#contact"
                className="flex items-center gap-4 text-slate-300 group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-slate-800/50 flex items-center justify-center border border-white/5 group-hover:border-purple-500/50 group-hover:bg-slate-800/80 transition-all duration-300">
                  <svg
                    className="w-5 h-5 text-slate-400 group-hover:text-purple-400 transition"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <span className="group-hover:text-white transition">
                  Book a 15-min discovery call
                </span>
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="card-hover bg-slate-900/40 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl relative hover:border-purple-500/20 transition-all duration-500">
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Error Alert */}
                {error && (
                  <div className="animate-[scaleIn_300ms_cubic-bezier(0.22,1,0.36,1)]">
                    <ErrorAlert message={error} onDismiss={() => setError(null)} />
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition"
                      placeholder="john@company.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">Budget Range (USD)</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {BUDGET_OPTIONS.map(option => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setBudget(option)}
                        className={`px-3 py-2.5 rounded-xl border text-center text-xs font-medium transition-all duration-200 ${budget === option
                          ? 'bg-purple-500/20 border-purple-500 text-purple-300 shadow-lg shadow-purple-500/10'
                          : 'bg-slate-950/30 border-white/10 text-slate-400 hover:bg-slate-900 hover:border-white/20'
                          }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">Project Details</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition resize-none"
                    placeholder="Tell me about your idea..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`btn-premium w-full py-4 rounded-xl text-white font-bold text-lg transition shadow-lg shadow-purple-500/25 ${isSubmitting
                    ? 'bg-slate-700 cursor-not-allowed opacity-70'
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-95'
                    }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    'Send Inquiry'
                  )}
                </button>

                <p className="text-center text-xs text-slate-500 flex items-center justify-center gap-2">
                  <svg
                    className="w-4 h-4 text-slate-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  I typically respond within 24 hours.
                </p>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
