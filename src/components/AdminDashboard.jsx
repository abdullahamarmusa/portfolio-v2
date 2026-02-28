import React, { useState, useEffect } from 'react';
import { contactService } from '../lib/contactService';
import { supabase } from '../lib/supabase';

/**
 * Enhanced Admin Dashboard with Production Features
 * 
 * Features:
 * - Real-time message updates
 * - Search and filtering
 * - Export to CSV
 * - Status management
 * - Message details modal
 * - Analytics and statistics
 * - Keyboard shortcuts
 */

const AdminDashboard = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [sortBy, setSortBy] = useState('date');
  const [successMessage, setSuccessMessage] = useState('');

  // Load initial inquiries
  useEffect(() => {
    loadInquiries();
    const unsubscribe = setupRealtimeSubscription();
    return unsubscribe;
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Ctrl/Cmd + K for search focus
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('search-input')?.focus();
      }
      // Esc to close modal
      if (e.key === 'Escape') {
        setSelectedInquiry(null);
      }
      // Ctrl/Cmd + E for export
      if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault();
        handleExportCSV();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [inquiries, filterStatus, searchTerm]);

  const loadInquiries = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await contactService.getInquiries();
      setInquiries(data);
    } catch (err) {
      setError(err.message);
      console.error('Error loading inquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  const setupRealtimeSubscription = () => {
    const channel = supabase
      .channel('public:contact_inquiries')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'contact_inquiries',
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setInquiries(prev => [payload.new, ...prev]);
            showSuccessMessage('New message received!');
          } else if (payload.eventType === 'UPDATE') {
            setInquiries(prev =>
              prev.map(item => (item.id === payload.new.id ? payload.new : item))
            );
          } else if (payload.eventType === 'DELETE') {
            setInquiries(prev => prev.filter(item => item.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  };

  const showSuccessMessage = (msg) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await contactService.updateInquiryStatus(id, newStatus);
      showSuccessMessage('Status updated successfully');
    } catch (err) {
      setError(err.message);
      console.error('Error updating status:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this inquiry?')) {
      try {
        await contactService.deleteInquiry(id);
        setSelectedInquiry(null);
        showSuccessMessage('Message deleted successfully');
      } catch (err) {
        setError(err.message);
        console.error('Error deleting inquiry:', err);
      }
    }
  };

  // Search and filter logic
  const getFilteredInquiries = () => {
    let filtered = inquiries.filter(inq => {
      const matchesStatus = filterStatus === 'all' || inq.status === filterStatus;
      const matchesSearch =
        !searchTerm ||
        inq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inq.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inq.message.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    });

    // Sorting
    if (sortBy === 'date') {
      filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  };

  const filteredInquiries = getFilteredInquiries();

  // Statistics
  const stats = {
    total: inquiries.length,
    new: inquiries.filter(i => i.status === 'new').length,
    inProgress: inquiries.filter(i => i.status === 'in-progress').length,
    contacted: inquiries.filter(i => i.status === 'contacted').length,
    completed: inquiries.filter(i => i.status === 'completed').length,
    rejected: inquiries.filter(i => i.status === 'rejected').length,
  };

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ['Name', 'Email', 'Message', 'Budget', 'Status', 'Date'];
    const rows = filteredInquiries.map(inq => [
      inq.name,
      inq.email,
      `"${inq.message.replace(/"/g, '""')}"`,
      inq.budget || '-',
      inq.status,
      new Date(inq.created_at).toLocaleString(),
    ]);

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contact-inquiries-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    showSuccessMessage('Exported to CSV successfully');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new':
        return 'bg-blue-500/20 border-blue-500/30 text-blue-400';
      case 'in-progress':
        return 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400';
      case 'contacted':
        return 'bg-green-500/20 border-green-500/30 text-green-400';
      case 'completed':
        return 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400';
      case 'rejected':
        return 'bg-red-500/20 border-red-500/30 text-red-400';
      default:
        return 'bg-slate-500/20 border-slate-500/30 text-slate-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-4 md:p-6">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 left-1/4 w-[500px] h-[500px] bg-purple-600/5 blur-[120px] rounded-full" />
        <div className="absolute -bottom-1/2 right-1/4 w-[500px] h-[500px] bg-cyan-600/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Success Message */}
        {successMessage && (
          <div className="fixed top-4 right-4 bg-green-500/20 border border-green-500/30 text-green-400 px-4 py-3 rounded-lg flex items-center gap-2 animate-pulse z-50">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            {successMessage}
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Contact Messages</h1>
          <p className="text-slate-400 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Real-time dashboard ({inquiries.length} total)
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-8">
          {[
            { label: 'Total', value: stats.total, color: 'from-slate-500/20' },
            { label: 'New', value: stats.new, color: 'from-blue-500/20' },
            { label: 'In Progress', value: stats.inProgress, color: 'from-yellow-500/20' },
            { label: 'Contacted', value: stats.contacted, color: 'from-green-500/20' },
            { label: 'Completed', value: stats.completed, color: 'from-emerald-500/20' },
            { label: 'Rejected', value: stats.rejected, color: 'from-red-500/20' },
          ].map((stat, i) => (
            <div
              key={i}
              className={`bg-gradient-to-br ${stat.color} border border-white/10 rounded-lg p-4 text-center`}
            >
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="text-xs text-slate-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 bg-red-500/20 border border-red-500/30 rounded-lg p-4 text-red-400 flex items-start justify-between">
            <div>
              <p className="font-medium">Error</p>
              <p className="text-sm">{error}</p>
            </div>
            <button
              onClick={loadInquiries}
              className="text-red-300 hover:text-red-200 underline text-sm whitespace-nowrap ml-4"
            >
              Retry
            </button>
          </div>
        )}

        {/* Search & Controls Bar */}
        <div className="mb-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="md:col-span-2 relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                id="search-input"
                type="text"
                placeholder="Search by name, email, or message... (Ctrl+K)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-900/40 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder:text-slate-600 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-900/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition"
            >
              <option value="date">Sort: Newest First</option>
              <option value="name">Sort: Name (A-Z)</option>
            </select>
          </div>

          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2 rounded-lg border transition ${
                filterStatus === 'all'
                  ? 'bg-purple-500 border-purple-500'
                  : 'border-white/10 hover:border-white/30'
              }`}
            >
              All ({stats.total})
            </button>
            {[
              { key: 'new', label: 'New', count: stats.new },
              { key: 'in-progress', label: 'In Progress', count: stats.inProgress },
              { key: 'contacted', label: 'Contacted', count: stats.contacted },
              { key: 'completed', label: 'Completed', count: stats.completed },
              { key: 'rejected', label: 'Rejected', count: stats.rejected },
            ].map(({ key, label, count }) => (
              <button
                key={key}
                onClick={() => setFilterStatus(key)}
                className={`px-4 py-2 rounded-lg border transition text-sm ${
                  filterStatus === key
                    ? 'bg-purple-500 border-purple-500'
                    : 'border-white/10 hover:border-white/30'
                }`}
              >
                {label} ({count})
              </button>
            ))}

            <button
              onClick={handleExportCSV}
              className="ml-auto px-4 py-2 rounded-lg border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 transition flex items-center gap-2"
              title="Ctrl+E"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
              Export CSV
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && !inquiries.length ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500" />
            <p className="mt-4 text-slate-400">Loading inquiries...</p>
          </div>
        ) : filteredInquiries.length === 0 ? (
          <div className="text-center py-12 border border-white/5 rounded-lg">
            <p className="text-slate-400 mb-2">No inquiries found</p>
            <p className="text-sm text-slate-500">
              {filterStatus === 'all' && searchTerm === ''
                ? 'Contact messages will appear here'
                : 'No inquiries match your filters'}
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden lg:block bg-slate-900/40 border border-white/5 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/5 bg-slate-800/30">
                      <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Budget</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInquiries.map(inquiry => (
                      <tr
                        key={inquiry.id}
                        className="border-b border-white/5 hover:bg-slate-800/30 transition cursor-pointer"
                        onClick={() => setSelectedInquiry(inquiry)}
                      >
                        <td className="px-6 py-4 text-sm font-medium">{inquiry.name}</td>
                        <td className="px-6 py-4 text-sm text-slate-400">{inquiry.email}</td>
                        <td className="px-6 py-4 text-sm">{inquiry.budget || '-'}</td>
                        <td className="px-6 py-4">
                          <select
                            value={inquiry.status}
                            onChange={e => {
                              e.stopPropagation();
                              handleStatusChange(inquiry.id, e.target.value);
                            }}
                            className={`px-3 py-1 rounded text-xs font-medium border ${getStatusColor(inquiry.status)} bg-slate-950/50 cursor-pointer`}
                          >
                            <option value="new">New</option>
                            <option value="in-progress">In Progress</option>
                            <option value="contacted">Contacted</option>
                            <option value="completed">Completed</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-400">
                          {new Date(inquiry.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              handleDelete(inquiry.id);
                            }}
                            className="text-red-400 hover:text-red-300 transition"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden space-y-4">
              {filteredInquiries.map(inquiry => (
                <div
                  key={inquiry.id}
                  className="bg-slate-900/40 border border-white/5 rounded-lg p-4 cursor-pointer hover:border-white/10 transition"
                  onClick={() => setSelectedInquiry(inquiry)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-white">{inquiry.name}</h3>
                      <p className="text-sm text-slate-400">{inquiry.email}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(inquiry.status)}`}>
                      {inquiry.status}
                    </span>
                  </div>

                  <p
                    className="text-sm text-slate-300 truncate hover:text-white transition cursor-pointer mb-3"
                    onClick={() => setExpandedId(expandedId === inquiry.id ? null : inquiry.id)}
                  >
                    {expandedId === inquiry.id
                      ? inquiry.message
                      : inquiry.message.substring(0, 100) + '...'}
                  </p>

                  <div className="flex justify-between items-center text-xs text-slate-400 mb-3">
                    <span>{inquiry.budget || '-'}</span>
                    <span>{new Date(inquiry.created_at).toLocaleDateString()}</span>
                  </div>

                  <div className="flex gap-2">
                    <select
                      value={inquiry.status}
                      onChange={e => handleStatusChange(inquiry.id, e.target.value)}
                      className={`flex-1 px-2 py-1.5 rounded text-xs font-medium border ${getStatusColor(inquiry.status)} bg-slate-950/50 cursor-pointer`}
                    >
                      <option value="new">New</option>
                      <option value="in-progress">In Progress</option>
                      <option value="contacted">Contacted</option>
                      <option value="completed">Completed</option>
                      <option value="rejected">Rejected</option>
                    </select>
                    <button
                      onClick={() => handleDelete(inquiry.id)}
                      className="px-3 py-1.5 rounded text-xs bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Detail Modal */}
        {selectedInquiry && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedInquiry(null)}
          >
            <div
              className="bg-slate-900/95 border border-white/10 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-slate-900 border-b border-white/10 p-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold">Message Details</h2>
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="hover:bg-white/10 p-2 rounded transition"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-slate-400 block mb-1">Name</label>
                    <p className="text-white font-medium">{selectedInquiry.name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-slate-400 block mb-1">Email</label>
                    <a
                      href={`mailto:${selectedInquiry.email}`}
                      className="text-cyan-400 hover:text-cyan-300 transition font-medium"
                    >
                      {selectedInquiry.email}
                    </a>
                  </div>
                  <div>
                    <label className="text-sm text-slate-400 block mb-1">Budget</label>
                    <p className="text-white font-medium">{selectedInquiry.budget || '-'}</p>
                  </div>
                  <div>
                    <label className="text-sm text-slate-400 block mb-1">Status</label>
                    <select
                      value={selectedInquiry.status}
                      onChange={e => {
                        handleStatusChange(selectedInquiry.id, e.target.value);
                        setSelectedInquiry({
                          ...selectedInquiry,
                          status: e.target.value,
                        });
                      }}
                      className={`w-full px-3 py-2 rounded border ${getStatusColor(selectedInquiry.status)} bg-slate-950/50 cursor-pointer font-medium`}
                    >
                      <option value="new">New</option>
                      <option value="in-progress">In Progress</option>
                      <option value="contacted">Contacted</option>
                      <option value="completed">Completed</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-slate-400 block mb-2">Message</label>
                  <div className="bg-slate-950/50 border border-white/5 rounded-lg p-4 text-white whitespace-pre-wrap text-sm leading-relaxed">
                    {selectedInquiry.message}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/5">
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Received</p>
                    <p className="text-white font-medium">
                      {new Date(selectedInquiry.created_at).toLocaleString()}
                    </p>
                  </div>
                  {selectedInquiry.updated_at && (
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Last Updated</p>
                      <p className="text-white font-medium">
                        {new Date(selectedInquiry.updated_at).toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-4 border-t border-white/5">
                  <a
                    href={`mailto:${selectedInquiry.email}`}
                    className="flex-1 bg-cyan-600 hover:bg-cyan-700 px-4 py-3 rounded-lg text-center font-bold transition flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    Email Reply
                  </a>
                  <button
                    onClick={() => {
                      handleDelete(selectedInquiry.id);
                    }}
                    className="flex-1 bg-red-600 hover:bg-red-700 px-4 py-3 rounded-lg text-center font-bold transition flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
