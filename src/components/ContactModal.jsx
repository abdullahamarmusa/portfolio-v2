import React, { useEffect, useState } from 'react';

const ContactModal = () => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener('openContact', onOpen);
    return () => window.removeEventListener('openContact', onOpen);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const close = () => setOpen(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const subject = encodeURIComponent(`Inquiry from ${form.name || 'Website'}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:abdullahamarmusa.dev@gmail.com?subject=${subject}&body=${body}`;
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md animate-[fadeIn_200ms_ease-out]"
        onClick={close}
      />

      {/* Modal */}
      <div className="relative bg-slate-950 border border-white/10 rounded-3xl max-w-lg w-full p-8 z-10 shadow-2xl shadow-purple-900/20 animate-[scaleIn_300ms_cubic-bezier(0.22,1,0.36,1)]">
        {/* Glow accent */}
        <div className="absolute -top-px left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="font-display text-xl font-bold text-white">Start a Project</h3>
            <p className="text-sm text-slate-500 mt-1">Tell me about your idea</p>
          </div>
          <button
            onClick={close}
            className="w-8 h-8 rounded-full bg-slate-800/50 border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-all duration-200"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full p-3 rounded-xl bg-slate-900/50 border border-white/10 text-white placeholder:text-slate-600 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400">Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="john@company.com"
              type="email"
              className="w-full p-3 rounded-xl bg-slate-900/50 border border-white/10 text-white placeholder:text-slate-600 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400">Project Details</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell me about your idea..."
              rows={4}
              className="w-full p-3 rounded-xl bg-slate-900/50 border border-white/10 text-white placeholder:text-slate-600 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition resize-none"
              required
            />
          </div>

          <div className="flex gap-3 justify-end pt-2">
            <button
              type="button"
              onClick={close}
              className="px-5 py-2.5 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:border-white/20 transition-all duration-200 text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-premium px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-sm shadow-lg shadow-purple-500/25 hover:opacity-95 transition"
            >
              Send Inquiry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactModal;
