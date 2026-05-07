import React, { useState, useEffect } from 'react';
import { contactService } from '../lib/contactService';
import { supabase } from '../lib/supabase';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  BarChart3,
  MessageSquare,
  Settings,
  Search,
  Bell,
  LogOut,
  Download,
  MoreVertical,
  X,
  Mail,
  Archive,
  TrendingUp,
  UserPlus,
  DollarSign,
  AlertCircle,
  PieChart,
  Plus,
  Command,
  LayoutList,
  KanbanSquare,
  ChevronDown,
  ChevronRight,
  Clock
} from 'lucide-react';

/**
 * Elite SaaS Admin Pipeline CRM
 * Features: 3-pane layout, right slide panel, pipeline kanban view, value estimation
 */
const AdminDashboard = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'pipeline'
  const [successMessage, setSuccessMessage] = useState('');

  // 1. Data Fetching & Realtime
  useEffect(() => {
    loadInquiries();
    const unsubscribe = setupRealtimeSubscription();
    return unsubscribe;
  }, []);

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
    if (!supabase) return () => {};
    const channel = supabase
      .channel('public:contact_inquiries')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'contact_inquiries' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setInquiries(prev => [payload.new, ...prev]);
            showSuccessMessage('New lead received!');
          } else if (payload.eventType === 'UPDATE') {
            setInquiries(prev =>
              prev.map(item => (item.id === payload.new.id ? payload.new : item))
            );
          } else if (payload.eventType === 'DELETE') {
            setInquiries(prev => prev.filter(item => item.id !== payload.old.id));
            if (selectedInquiry?.id === payload.old.id) setSelectedInquiry(null);
          }
        }
      )
      .subscribe();
    return () => channel.unsubscribe();
  };

  const showSuccessMessage = (msg) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('search-input')?.focus();
      }
      if (e.key === 'Escape') {
        setSelectedInquiry(null);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault();
        handleExportCSV();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [inquiries, filterStatus, searchTerm, selectedInquiry]);

  // 2. Logic & Parsers
  const handleStatusChange = async (id, newStatus) => {
    try {
      await contactService.updateInquiryStatus(id, newStatus);
      showSuccessMessage('Pipeline status updated');
      if (selectedInquiry?.id === id) {
        setSelectedInquiry({ ...selectedInquiry, status: newStatus });
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this lead permanently?')) {
      try {
        await contactService.deleteInquiry(id);
        if (selectedInquiry?.id === id) setSelectedInquiry(null);
        showSuccessMessage('Lead archived successfully');
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const parseMessage = (rawMessage) => {
    if (!rawMessage) return { stage: '-', timeline: '-', bottleneck: '-', idea: '' };
    if (rawMessage.includes('[STAGE]')) {
      const stageMatch = rawMessage.match(/\[STAGE\] (.*?)\n/);
      const timelineMatch = rawMessage.match(/\[TIMELINE\] (.*?)\n/);
      const bottleneckMatch = rawMessage.match(/\[BOTTLENECK\] (.*?)\n/);
      const ideaMatch = rawMessage.split('[IDEA]\n');
      return {
        stage: stageMatch ? stageMatch[1] : '-',
        timeline: timelineMatch ? timelineMatch[1] : '-',
        bottleneck: bottleneckMatch ? bottleneckMatch[1] : '-',
        idea: ideaMatch.length > 1 ? ideaMatch[1].trim() : rawMessage,
      };
    }
    return { stage: 'N/A', timeline: 'N/A', bottleneck: 'N/A', idea: rawMessage };
  };

  const estimateValue = (budgetStr) => {
    if (!budgetStr || budgetStr === 'N/A' || budgetStr === '-') return 0;
    const cleanStr = String(budgetStr).replace(/k/gi, '000').replace(/[^0-9-]/g, '');
    const numbers = cleanStr.split('-').map(Number).filter(n => n > 0);
    if (numbers.length === 0) return 0;
    if (numbers.length === 1) return numbers[0];
    return (numbers[0] + numbers[1]) / 2;
  };

  const getFilteredInquiries = () => {
    return inquiries.filter(inq => {
      const matchesStatus = filterStatus === 'all' || inq.status === filterStatus;
      const search = searchTerm.toLowerCase();
      const matchesSearch = !searchTerm ||
        inq.name.toLowerCase().includes(search) ||
        inq.email.toLowerCase().includes(search) ||
        inq.message.toLowerCase().includes(search);
      return matchesStatus && matchesSearch;
    });
  };

  const filteredInquiries = getFilteredInquiries();

  // Stats & Analytics
  const totalPipelineValue = inquiries
    .filter(i => i.status !== 'rejected')
    .reduce((acc, inq) => acc + estimateValue(inq.budget), 0);

  const activeInquiries = inquiries.filter(i => i.status !== 'rejected');
  const avgDealSize = activeInquiries.length > 0 
    ? totalPipelineValue / activeInquiries.length 
    : 0;

  const newLeadsCount = inquiries.filter(i => i.status === 'new').length;
  const conversionRate = inquiries.length > 0
    ? ((inquiries.filter(i => i.status === 'completed').length / inquiries.length) * 100).toFixed(1)
    : 0;

  const calculateAIScore = (inq) => {
    let score = 50;
    const estValue = estimateValue(inq.budget);
    if (estValue > 5000) score += 20;
    else if (estValue > 2000) score += 10;
    
    if (inq.message && inq.message.length > 200) score += 15;
    else if (inq.message && inq.message.length > 50) score += 5;
    
    if (inq.status !== 'rejected') score += 5;
    return Math.min(score, 99);
  };

  const handleExportCSV = () => {
    const headers = ['Name', 'Email', 'Stage', 'Timeline', 'Bottleneck', 'Idea', 'Budget', 'Status', 'Date'];
    const rows = filteredInquiries.map(inq => {
      const parsed = parseMessage(inq.message);
      return [
        inq.name,
        inq.email,
        parsed.stage,
        parsed.timeline,
        parsed.bottleneck,
        `"${parsed.idea.replace(/"/g, '""')}"`,
        inq.budget || '-',
        inq.status,
        new Date(inq.created_at).toLocaleString(),
      ];
    });
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pipeline-export-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    showSuccessMessage('Exported pipeline to CSV');
  };

  // UI Helpers
  const statuses = [
    { id: 'new', label: 'Awaiting Response', color: 'blue' },
    { id: 'in-progress', label: 'Reviewing', color: 'yellow' },
    { id: 'contacted', label: 'In Discussion', color: 'purple' },
    { id: 'completed', label: 'Converted', color: 'emerald' },
    { id: 'rejected', label: 'Lost', color: 'slate' }
  ];

  const getStatusMeta = (statusId) => statuses.find(s => s.id === statusId) || statuses[0];

  const getStatusBadge = (statusId) => {
    const meta = getStatusMeta(statusId);
    const colorClasses = {
      blue: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
      yellow: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400',
      purple: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
      emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
      slate: 'bg-slate-500/10 border-slate-500/20 text-slate-400',
    };
    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${colorClasses[meta.color]} flex items-center gap-1.5 whitespace-nowrap`}>
        <span className={`w-1.5 h-1.5 rounded-full bg-${meta.color}-400 shadow-[0_0_8px_currentColor] ${statusId === 'new' ? 'animate-pulse' : ''}`} />
        {meta.label}
      </span>
    );
  };

  // --- RENDER ---
  return (
    <div className="flex h-screen bg-[#020617] text-slate-200 overflow-hidden font-sans selection:bg-purple-500/30">
      
      {/* PANE 1: Left Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-slate-950/80 backdrop-blur-2xl flex-col z-20 flex-shrink-0 hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-white/5">
          <div className="flex items-center gap-2 text-white font-bold text-lg tracking-tight">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <span className="text-white text-sm">A</span>
            </div>
            Admin<span className="text-slate-500 font-normal">OS</span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
          <div className="px-3 mb-2 text-xs font-bold text-slate-500 uppercase tracking-widest">Platform</div>
          <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition">
            <LayoutDashboard className="w-4 h-4" /> Overview
          </button>
          <button className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg bg-purple-500/10 text-purple-400 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] border border-purple-500/10">
            <div className="flex items-center gap-3">
              <Users className="w-4 h-4" /> Pipeline
            </div>
            {newLeadsCount > 0 && (
              <span className="bg-purple-500 text-white text-[10px] px-1.5 py-0.5 rounded-md font-bold">{newLeadsCount}</span>
            )}
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition">
            <Briefcase className="w-4 h-4" /> Projects
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition">
            <BarChart3 className="w-4 h-4" /> Analytics
          </button>
        </div>
        <div className="p-4 border-t border-white/5">
          <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition">
            <Settings className="w-4 h-4" /> Settings
          </button>
        </div>
      </aside>

      {/* PANE 2: Main Content */}
      <main className="flex-1 flex flex-col min-w-0 relative">
        {/* Deep SaaS Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/5 blur-[100px] rounded-full mix-blend-screen" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-600/5 blur-[100px] rounded-full mix-blend-screen" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        </div>

        {/* Topbar */}
        <header className="h-16 border-b border-white/5 bg-slate-900/50 backdrop-blur-xl flex items-center justify-between px-6 z-10">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-64 md:w-96 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-purple-400 transition" />
              <input
                id="search-input"
                type="text"
                placeholder="Search pipeline... (Ctrl+K)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-950/50 border border-white/10 rounded-lg pl-9 pr-4 py-1.5 text-sm text-white placeholder:text-slate-500 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition outline-none"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <Command className="w-3 h-3 text-slate-500" />
                <span className="text-[10px] font-bold text-slate-500">K</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-slate-400 hover:text-white transition relative">
              <Bell className="w-5 h-5" />
              {newLeadsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-purple-500 rounded-full border-2 border-slate-900" />
              )}
            </button>
            <div className="h-6 w-px bg-white/10 mx-2" />
            <div className="flex items-center gap-2 cursor-pointer group">
              <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center overflow-hidden">
                <img src="https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff" alt="Admin" className="w-full h-full object-cover" />
              </div>
              <ChevronDown className="w-4 h-4 text-slate-500 group-hover:text-white transition" />
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto p-6 z-10">
          <div className="max-w-[1500px] w-full mx-auto space-y-4">
            
            {/* Page Header & Quick Actions */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-3xl font-display font-bold text-white tracking-tight">Lead Pipeline</h1>
                <p className="text-sm text-slate-400 mt-1">Manage and qualify incoming high-ticket inquiries.</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-slate-900/50 border border-white/10 rounded-lg p-1">
                  <button 
                    onClick={() => setViewMode('table')}
                    className={`p-1.5 rounded-md transition ${viewMode === 'table' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
                  >
                    <LayoutList className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setViewMode('pipeline')}
                    className={`p-1.5 rounded-md transition ${viewMode === 'pipeline' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
                  >
                    <KanbanSquare className="w-4 h-4" />
                  </button>
                </div>
                <button onClick={handleExportCSV} className="flex items-center gap-2 px-3 py-1.5 bg-slate-900/50 border border-white/10 hover:bg-white/5 rounded-lg text-sm font-medium transition text-slate-300">
                  <Download className="w-4 h-4" /> Export
                </button>
                <button className="flex items-center gap-2 px-3 py-1.5 bg-purple-600 hover:bg-purple-500 rounded-lg text-sm font-bold text-white transition shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_rgba(168,85,247,0.6)]">
                  <Plus className="w-4 h-4" /> New Lead
                </button>
              </div>
            </div>

            {/* Mini Analytics Row (Depth Hierarchy) */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Glowing Important Card */}
              <div className="bg-slate-900/40 backdrop-blur-md border border-purple-500/30 rounded-xl p-4 relative overflow-hidden group hover:-translate-y-[2px] hover:shadow-xl transition-all duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-2xl rounded-full group-hover:bg-purple-500/20 transition-all" />
                <div className="flex items-start justify-between relative z-10">
                  <div>
                    <p className="text-[10px] font-bold text-purple-400 uppercase tracking-widest mb-1">Pipeline Value</p>
                    <h3 className="text-3xl font-bold text-white">${totalPipelineValue.toLocaleString()}</h3>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400">
                    <DollarSign className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Glowing New Leads */}
              <div className="bg-slate-900/40 backdrop-blur-md border border-cyan-500/30 rounded-xl p-4 relative overflow-hidden group hover:-translate-y-[2px] hover:shadow-xl transition-all duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-2xl rounded-full group-hover:bg-cyan-500/20 transition-all" />
                <div className="flex items-start justify-between relative z-10">
                  <div>
                    <p className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-1">Action Required</p>
                    <h3 className="text-3xl font-bold text-white">{newLeadsCount}</h3>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                    <AlertCircle className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Matte Secondary Cards */}
              <div className="bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-xl p-4 hover:-translate-y-[2px] hover:shadow-xl hover:border-white/10 transition-all duration-300">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Avg Deal Size</p>
                    <h3 className="text-3xl font-bold text-white">${Math.round(avgDealSize).toLocaleString()}</h3>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-xl p-4 hover:-translate-y-[2px] hover:shadow-xl hover:border-white/10 transition-all duration-300">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Conversion Rate</p>
                    <h3 className="text-3xl font-bold text-white">{conversionRate}%</h3>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400">
                    <PieChart className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>

            {/* Error/Loading */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-center gap-3 text-red-400 text-sm">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}
            
            {loading && !inquiries.length && (
              <div className="flex justify-center py-20">
                <div className="animate-spin w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full" />
              </div>
            )}

            {/* Empty State */}
            {!loading && filteredInquiries.length === 0 && (
              <div className="flex flex-col items-center justify-center py-32 text-center border border-dashed border-white/10 rounded-2xl bg-slate-900/20 backdrop-blur-sm">
                <div className="w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center mb-4">
                  <Archive className="w-8 h-8 text-slate-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Pipeline is empty</h3>
                <p className="text-slate-400 text-sm max-w-sm">No leads match your current filters or search terms. Try adjusting your view or wait for new inquiries.</p>
              </div>
            )}

            {/* VIEW: TABLE */}
            {!loading && filteredInquiries.length > 0 && viewMode === 'table' && (
              <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/5 bg-slate-800/50">
                        <th className="px-6 py-4 text-[10px] font-bold text-slate-500/80 uppercase tracking-wider">Lead</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-slate-500/80 uppercase tracking-wider">Stage</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-slate-500/80 uppercase tracking-wider">Estimated Value</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-slate-500/80 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-slate-500/80 uppercase tracking-wider">Received</th>
                        <th className="px-6 py-4"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredInquiries.map(inq => {
                        const parsed = parseMessage(inq.message);
                        const statusMeta = getStatusMeta(inq.status);
                        const estValue = estimateValue(inq.budget);
                        const isSelected = selectedInquiry?.id === inq.id;
                        
                        return (
                          <tr 
                            key={inq.id}
                            onClick={() => setSelectedInquiry(inq)}
                            className={`group cursor-pointer transition-all duration-200 hover:bg-slate-800/40 relative ${isSelected ? 'bg-slate-800/60' : ''}`}
                          >
                            {/* Left Accent Border on hover/select */}
                            <td className="absolute left-0 top-0 bottom-0 w-0.5 bg-transparent group-hover:bg-purple-500 transition-colors" />
                            {isSelected && <td className="absolute left-0 top-0 bottom-0 w-[3px] bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]" />}
                            
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/5 flex items-center justify-center flex-shrink-0 text-xs font-bold text-slate-300">
                                  {inq.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                  <div className="font-semibold text-white group-hover:text-purple-300 transition-colors">{inq.name}</div>
                                  <div className="text-xs text-slate-500">{inq.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-slate-300">{parsed.stage}</span>
                                {estValue > 0 && (
                                  <span className="text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-1.5 py-0.5 rounded-full font-bold">
                                    AI: {calculateAIScore(inq)}
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm font-medium text-emerald-400">
                                {estValue > 0 ? `$${estValue.toLocaleString()}` : '-'}
                              </div>
                              <div className="text-[10px] text-slate-500">{inq.budget}</div>
                            </td>
                            <td className="px-6 py-4" onClick={e => e.stopPropagation()}>
                              {getStatusBadge(inq.status)}
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-400">
                              {new Date(inq.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                            </td>
                            <td className="px-6 py-4 text-right">
                              <ChevronRight className="w-4 h-4 ml-auto text-slate-600 group-hover:text-purple-400 transition-colors" />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Activity Feed Below Table */}
            {!loading && filteredInquiries.length > 0 && viewMode === 'table' && (
              <div className="mt-8">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Recent Activity</h3>
                <div className="bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-xl p-1 max-w-3xl">
                  {filteredInquiries.slice(0, 4).map((inq, idx) => (
                    <div key={`activity-${inq.id}`} className={`flex items-center gap-4 p-3 ${idx !== 0 ? 'border-t border-white/5' : ''} hover:bg-slate-800/30 transition rounded-lg`}>
                      <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
                      <p className="text-sm text-slate-300">
                        <span className="font-bold text-white">{inq.name}</span> inquiry was marked as <span className="text-purple-400">{getStatusMeta(inq.status).label}</span>
                      </p>
                      <span className="text-xs text-slate-500 ml-auto flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Just now
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* VIEW: PIPELINE KANBAN */}
            {!loading && filteredInquiries.length > 0 && viewMode === 'pipeline' && (
              <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
                {statuses.map(status => {
                  const columnLeads = filteredInquiries.filter(i => i.status === status.id);
                  return (
                    <div key={status.id} className="w-[320px] flex-shrink-0 flex flex-col snap-start">
                      <div className="flex items-center justify-between mb-4 px-1">
                        <h3 className={`text-sm font-bold flex items-center gap-2 text-${status.color}-400`}>
                          <span className={`w-2 h-2 rounded-full bg-${status.color}-400`} />
                          {status.label}
                        </h3>
                        <span className="text-xs font-semibold bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full">{columnLeads.length}</span>
                      </div>
                      
                      <div className="flex flex-col gap-3 min-h-[200px] bg-slate-900/30 border border-white/5 rounded-xl p-3 backdrop-blur-sm">
                        {columnLeads.length === 0 ? (
                          <div className="text-center py-8 text-xs text-slate-600 font-medium border border-dashed border-white/5 rounded-lg">No leads here</div>
                        ) : (
                          columnLeads.map(inq => {
                            const parsed = parseMessage(inq.message);
                            const estValue = estimateValue(inq.budget);
                            return (
                              <div 
                                key={inq.id}
                                onClick={() => setSelectedInquiry(inq)}
                                className="bg-slate-800/80 border border-white/10 hover:border-purple-500/50 rounded-lg p-4 cursor-pointer shadow-lg hover:shadow-purple-500/10 transition-all group"
                              >
                                <div className="flex justify-between items-start mb-2">
                                  <h4 className="font-bold text-white text-sm group-hover:text-purple-300 transition">{inq.name}</h4>
                                  {estValue > 0 && <span className="text-xs font-bold text-emerald-400">${estValue / 1000}k</span>}
                                </div>
                                <p className="text-[11px] text-slate-400 mb-3 truncate">{parsed.idea}</p>
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] bg-slate-900 px-2 py-1 rounded text-slate-300 border border-white/5 truncate max-w-[120px]">{parsed.stage}</span>
                                  <span className="text-[10px] text-slate-500 ml-auto">{new Date(inq.created_at).toLocaleDateString(undefined, {month:'short', day:'numeric'})}</span>
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          </div>
        </div>
      </main>

      {/* PANE 3: Right Sliding Insight Panel */}
      <div 
        className={`fixed top-0 right-0 bottom-0 w-full md:w-[450px] bg-slate-900/95 backdrop-blur-3xl border-l border-white/10 shadow-2xl z-50 transform transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col ${selectedInquiry ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {selectedInquiry && (() => {
          const parsed = parseMessage(selectedInquiry.message);
          return (
            <>
              {/* Header */}
              <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-slate-900 flex-shrink-0">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <UserPlus className="w-4 h-4" /> Lead Profile
                </h2>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleDelete(selectedInquiry.id)} className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-md transition" title="Delete">
                    <Archive className="w-4 h-4" />
                  </button>
                  <button onClick={() => setSelectedInquiry(null)} className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-md transition" title="Close (Esc)">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Scrollable Panel Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                
                {/* Identity & Status */}
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white text-xl font-bold shadow-lg">
                        {selectedInquiry.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white leading-tight">{selectedInquiry.name}</h3>
                        <a href={`mailto:${selectedInquiry.email}`} className="text-sm text-cyan-400 hover:underline flex items-center gap-1 mt-0.5">
                          <Mail className="w-3 h-3" /> {selectedInquiry.email}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-950/50 rounded-xl border border-white/5 p-1 flex">
                    {statuses.map(s => (
                      <button
                        key={s.id}
                        onClick={() => handleStatusChange(selectedInquiry.id, s.id)}
                        className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                          selectedInquiry.status === s.id 
                            ? `bg-slate-800 text-${s.color}-400 shadow-sm border border-white/5` 
                            : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Qualification Metrics */}
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Qualification Data</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-800/40 border border-white/5 rounded-lg p-3">
                      <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Stage</p>
                      <p className="text-sm font-medium text-purple-300">{parsed.stage}</p>
                    </div>
                    <div className="bg-slate-800/40 border border-white/5 rounded-lg p-3">
                      <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Budget</p>
                      <p className="text-sm font-medium text-emerald-300">{selectedInquiry.budget}</p>
                    </div>
                    <div className="bg-slate-800/40 border border-white/5 rounded-lg p-3">
                      <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Timeline</p>
                      <p className="text-sm font-medium text-pink-300">{parsed.timeline}</p>
                    </div>
                    <div className="bg-slate-800/40 border border-white/5 rounded-lg p-3">
                      <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Bottleneck</p>
                      <p className="text-sm font-medium text-cyan-300 truncate" title={parsed.bottleneck}>{parsed.bottleneck}</p>
                    </div>
                  </div>
                </div>

                {/* Main Message */}
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Project Scope / Idea</h4>
                  <div className="bg-slate-950/80 border border-white/5 rounded-xl p-4 text-sm text-slate-300 leading-relaxed whitespace-pre-wrap font-mono relative group">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950/20 pointer-events-none rounded-xl" />
                    {parsed.idea}
                  </div>
                </div>

                {/* Metadata */}
                <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Received: {new Date(selectedInquiry.created_at).toLocaleString()}</span>
                  <span>ID: {selectedInquiry.id.substring(0, 8)}</span>
                </div>

              </div>

              {/* Footer Actions */}
              <div className="p-4 bg-slate-900 border-t border-white/10 flex gap-3 flex-shrink-0">
                <a 
                  href={`mailto:${selectedInquiry.email}?subject=Regarding your project inquiry&body=Hi ${selectedInquiry.name.split(' ')[0]},`}
                  className="flex-1 bg-white text-slate-950 hover:bg-slate-200 py-3 rounded-lg flex items-center justify-center gap-2 font-bold transition shadow-lg"
                >
                  <Mail className="w-4 h-4" /> Reply via Email
                </a>
              </div>
            </>
          );
        })()}
      </div>

    </div>
  );
};

export default AdminDashboard;
