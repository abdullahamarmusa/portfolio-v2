import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Code2, 
  Database, 
  Server, 
  Globe, 
  Zap, 
  Layers, 
  Palette, 
  CreditCard, 
  Cloud, 
  Atom,
  ChevronRight,
  MousePointer2,
  CheckCircle2,
  Box
} from 'lucide-react';

// Core Data Structure (Single Source of Truth)
// Tier 1: Core (Inner Orbit) | Tier 2: Product/Infra (Outer Orbit)
const TECH_STACK = [
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'Core Stack',
    tier: 1,
    icon: Globe,
    accent: '#ffffff',
    description: 'Application framework powering server-side rendering, routing, and static generation.',
    usage: 'SaaS dashboards, product interfaces, and main web applications.',
    projects: ['Nuvora', 'NEXUSKIT', 'Devascent'],
    related: ['react', 'typescript', 'vercel', 'supabase']
  },
  {
    id: 'react',
    name: 'React',
    category: 'Core Stack',
    tier: 1,
    icon: Atom,
    accent: '#38bdf8',
    description: 'Declarative component-driven UI architecture and reactive state management.',
    usage: 'Complex interactive client-side features and optimistic UI updates.',
    projects: ['Nuvora', 'NEXUSKIT', 'Devascent'],
    related: ['nextjs', 'tailwind', 'shadcn']
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'Core Stack',
    tier: 1,
    icon: Code2,
    accent: '#3b82f6',
    description: 'Strictly typed JavaScript superset ensuring end-to-end type safety.',
    usage: 'Domain modeling, API interfaces, and compile-time bug prevention.',
    projects: ['Nuvora', 'NEXUSKIT', 'Devascent'],
    related: ['nextjs', 'react', 'node']
  },
  {
    id: 'supabase',
    name: 'Supabase',
    category: 'Data',
    tier: 1,
    icon: Zap,
    accent: '#34d399',
    description: 'BaaS providing instantaneous database subscriptions, Auth, and Storage.',
    usage: 'User authentication, real-time data sync, and Row Level Security.',
    projects: ['Nuvora', 'Devascent'],
    related: ['postgres', 'nextjs']
  },
  {
    id: 'postgres',
    name: 'PostgreSQL',
    category: 'Data',
    tier: 1,
    icon: Database,
    accent: '#60a5fa',
    description: 'Advanced open-source relational database engineered for complex queries.',
    usage: 'Primary data store, complex joins, and transactional integrity.',
    projects: ['Nuvora', 'Devascent'],
    related: ['supabase', 'node']
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'Core Stack',
    tier: 1,
    icon: Palette,
    accent: '#2dd4bf',
    description: 'Utility-first CSS framework for rapid UI development.',
    usage: 'Design system implementation and fluid responsive layouts.',
    projects: ['Nuvora', 'NEXUSKIT', 'Devascent'],
    related: ['react', 'shadcn']
  },
  {
    id: 'node',
    name: 'Node.js',
    category: 'Infrastructure',
    tier: 2,
    icon: Server,
    accent: '#22c55e',
    description: 'Asynchronous event-driven runtime for backend services.',
    usage: 'Serverless functions, API routes, and background processing.',
    projects: ['Nuvora', 'Devascent'],
    related: ['typescript', 'postgres', 'stripe']
  },
  {
    id: 'shadcn',
    name: 'shadcn/ui',
    category: 'Core Stack',
    tier: 2,
    icon: Layers,
    accent: '#e2e8f0',
    description: 'Accessible, unstyled React components built on Radix primitives.',
    usage: 'Keyboard-navigable accessible modals, dropdowns, and complex UI elements.',
    projects: ['NEXUSKIT', 'Devascent'],
    related: ['react', 'tailwind']
  },
  {
    id: 'stripe',
    name: 'Stripe',
    category: 'Product',
    tier: 2,
    icon: CreditCard,
    accent: '#8b5cf6',
    description: 'Financial infrastructure powering SaaS subscription billing and usage metering.',
    usage: 'Checkout flows, webhook handling, and subscription lifecycle management.',
    projects: ['Nuvora'],
    related: ['nextjs', 'node', 'supabase']
  },
  {
    id: 'vercel',
    name: 'Vercel',
    category: 'Infrastructure',
    tier: 2,
    icon: Cloud,
    accent: '#ec4899',
    description: 'Frontend cloud platform for seamless CI/CD and edge deployments.',
    usage: 'Global CDN distribution, Serverless deployments, and Preview environments.',
    projects: ['Nuvora', 'NEXUSKIT', 'Devascent'],
    related: ['nextjs']
  }
];

export default function TechStackSection() {
  const [activeId, setActiveId] = useState('nextjs');
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedMobileId, setExpandedMobileId] = useState('nextjs');

  const requestRef = useRef(null);
  const dragStartRef = useRef(0);
  const rotationRef = useRef(0);
  const containerRef = useRef(null);

  // Active tech derived state
  const activeTech = useMemo(() => TECH_STACK.find(t => t.id === activeId) || TECH_STACK[0], [activeId]);

  // Handle responsive detection securely
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Animation Loop for subtle rotation
  useEffect(() => {
    if (isMobile) return; // Disable loop on mobile

    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    const animate = () => {
      if (!isDragging && !isReducedMotion) {
        // Extremely slow, subtle rotation (approx 1 rotation every 60 seconds)
        rotationRef.current += 0.0008;
        setRotation(rotationRef.current);
      }
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [isDragging, isMobile]);

  const handleDragStart = (e) => {
    setIsDragging(true);
    setHasInteracted(true);
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    dragStartRef.current = clientX;
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const delta = (clientX - dragStartRef.current) * 0.005; // Smoothing factor
    rotationRef.current += delta;
    setRotation(rotationRef.current);
    dragStartRef.current = clientX;
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // Pre-calculate positions of all nodes for rendering and line drawing
  const nodePositions = useMemo(() => {
    const tier1 = TECH_STACK.filter(t => t.tier === 1);
    const tier2 = TECH_STACK.filter(t => t.tier === 2);

    const getPositions = (items, radiusX, radiusY) => {
      return items.map((item, index) => {
        const angle = (index / items.length) * Math.PI * 2 + rotation;
        // 2D projection of an angled 3D circle
        const x = Math.cos(angle) * radiusX;
        const y = Math.sin(angle) * radiusY;
        
        // Depth normalization (0 = back, 1 = front)
        const depth = (y + radiusY) / (2 * radiusY);
        
        return {
          ...item,
          x,
          y,
          depth,
          scale: 0.75 + (depth * 0.25), // Scale 0.75 to 1.0
          opacity: 0.3 + (depth * 0.7), // Opacity 0.3 to 1.0
          zIndex: Math.round(depth * 100)
        };
      });
    };

    // Radii for the elliptical orbits
    const t1Positions = getPositions(tier1, 240, 90);
    const t2Positions = getPositions(tier2, 380, 140);

    return [...t1Positions, ...t2Positions];
  }, [rotation]);

  const renderDesktopOrbit = () => (
    <div 
      className="relative w-full h-[600px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none overflow-hidden"
      ref={containerRef}
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
    >
      {/* Center Origin (0,0) */}
      <div className="absolute top-1/2 left-1/2 w-0 h-0 z-0">
        
        {/* Orbital Path SVGs */}
        <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[320px] overflow-visible pointer-events-none">
          {/* Faint Outer Ring */}
          <ellipse cx="400" cy="160" rx="440" ry="170" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
          {/* Tier 2 Ring (Dashed) */}
          <ellipse cx="400" cy="160" rx="380" ry="140" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="4 8" />
          {/* Tier 1 Ring */}
          <ellipse cx="400" cy="160" rx="240" ry="90" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

          {/* Dynamic Connection Lines */}
          {nodePositions.map(node => {
            const isActive = activeId === node.id;
            const isRelated = activeTech.related.includes(node.id);
            
            if (!isActive && !isRelated) return null;

            // Draw line from Center to Active Node
            if (isActive) {
              return (
                <g key={`lines-${node.id}`}>
                  <line 
                    x1="400" y1="160" 
                    x2={400 + node.x} y2={160 + node.y} 
                    stroke={node.accent} 
                    strokeWidth="1.5"
                    strokeOpacity="0.4" 
                  />
                  {/* Draw lines from Active Node to Related Nodes */}
                  {node.related.map(relatedId => {
                    const targetNode = nodePositions.find(n => n.id === relatedId);
                    if (!targetNode) return null;
                    return (
                      <line 
                        key={`rel-${node.id}-${relatedId}`}
                        x1={400 + node.x} y1={160 + node.y} 
                        x2={400 + targetNode.x} y2={160 + targetNode.y} 
                        stroke="rgba(255,255,255,0.15)" 
                        strokeWidth="1"
                        strokeDasharray="2 4"
                      />
                    );
                  })}
                </g>
              );
            }
            return null;
          })}
        </svg>

        {/* Central Product Engine Node */}
        <div className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center w-28 h-28 rounded-full border border-white/5 bg-[#020617]/70 backdrop-blur-md shadow-[0_0_40px_rgba(255,255,255,0.02)] z-10 pointer-events-none">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500/10 to-cyan-500/10 opacity-50 animate-pulse" />
          <Box className="w-5 h-5 text-slate-400 mb-1 opacity-50" />
          <span className="text-[9px] font-mono text-slate-500 tracking-widest uppercase mb-0.5">Product</span>
          <span className="text-[12px] font-bold text-white tracking-widest uppercase">Engine</span>
        </div>

        {/* Technology Nodes */}
        {nodePositions.map((node) => {
          const isActive = node.id === activeId;
          const isRelated = activeTech.related.includes(node.id);
          const isUnrelated = !isActive && !isRelated;

          const IconComponent = node.icon;

          return (
            <button
              key={node.id}
              onClick={(e) => {
                e.stopPropagation();
                setActiveId(node.id);
                setHasInteracted(true);
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 group outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-xl"
              style={{
                transform: `translate(${node.x}px, ${node.y}px) scale(${node.scale})`,
                opacity: isActive ? 1 : isRelated ? Math.max(0.7, node.opacity) : node.opacity * 0.4,
                zIndex: isActive ? 100 : node.zIndex,
                transition: isDragging ? 'opacity 0.2s' : 'transform 0.4s ease-out, opacity 0.4s ease, filter 0.4s ease'
              }}
              aria-label={`Inspect ${node.name}`}
            >
              {/* Node Card */}
              <div className={`
                relative flex items-center gap-3 py-2 px-3 sm:px-4 rounded-xl border transition-all duration-300 backdrop-blur-xl
                ${isActive 
                  ? 'bg-slate-900/90 border-white/20 shadow-[0_0_30px_rgba(0,0,0,0.8)]' 
                  : 'bg-[#020617]/40 border-white/5 hover:border-white/15 hover:bg-slate-900/60'
                }
                ${isUnrelated ? 'grayscale-[50%]' : 'grayscale-0'}
              `}>
                {/* Active Glow Accent */}
                {isActive && (
                  <div 
                    className="absolute inset-0 rounded-xl pointer-events-none opacity-20 blur-md"
                    style={{ backgroundColor: node.accent }}
                  />
                )}

                {/* Icon */}
                <div 
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-colors`}
                  style={{ 
                    backgroundColor: isActive ? `${node.accent}20` : 'rgba(255,255,255,0.05)',
                    color: isActive ? node.accent : '#94a3b8'
                  }}
                >
                  <IconComponent size={16} strokeWidth={isActive ? 2.5 : 2} />
                </div>

                {/* Label */}
                <div className="flex flex-col items-start text-left">
                  <span className={`text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors ${isActive ? 'text-white' : 'text-slate-300'}`}>
                    {node.name}
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-mono text-slate-500 tracking-wider uppercase whitespace-nowrap">
                    {node.category}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Subtle Interaction Hint */}
      {!hasInteracted && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full bg-[#020617]/50 border border-white/10 text-xs font-mono text-slate-400 backdrop-blur-md animate-pulse pointer-events-none">
          <MousePointer2 className="w-3.5 h-3.5" />
          <span>Drag to explore • Click to inspect</span>
        </div>
      )}
    </div>
  );

  const renderMobileView = () => {
    const categories = ['Core Stack', 'Data', 'Product', 'Infrastructure'];
    
    return (
      <div className="w-full space-y-8 py-4">
        {categories.map(category => {
          const techs = TECH_STACK.filter(t => t.category === category);
          if (techs.length === 0) return null;

          return (
            <div key={category} className="space-y-3">
              <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest pl-1 border-l-2 border-slate-800">
                {category}
              </h4>
              <div className="flex flex-col gap-2">
                {techs.map(tech => {
                  const isExpanded = expandedMobileId === tech.id;
                  const IconComponent = tech.icon;

                  return (
                    <div 
                      key={tech.id}
                      className={`rounded-xl border overflow-hidden transition-all duration-300 ${isExpanded ? 'bg-slate-900 border-white/20' : 'bg-[#020617]/30 border-white/5 hover:border-white/10'}`}
                    >
                      <button 
                        onClick={() => setExpandedMobileId(isExpanded ? null : tech.id)}
                        className="w-full flex items-center justify-between p-4 text-left"
                      >
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                            style={{ 
                              backgroundColor: isExpanded ? `${tech.accent}20` : 'rgba(255,255,255,0.05)',
                              color: isExpanded ? tech.accent : '#94a3b8'
                            }}
                          >
                            <IconComponent size={16} />
                          </div>
                          <span className={`font-semibold text-sm ${isExpanded ? 'text-white' : 'text-slate-300'}`}>
                            {tech.name}
                          </span>
                        </div>
                        <ChevronRight className={`w-4 h-4 text-slate-500 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                      </button>

                      {isExpanded && (
                        <div className="px-4 pb-4 pt-1 border-t border-white/5 bg-slate-950/50">
                          <p className="text-xs text-slate-300 leading-relaxed mb-4">
                            {tech.description}
                          </p>
                          
                          <div className="space-y-3">
                            <div>
                              <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1">Capabilities</span>
                              <span className="text-xs text-slate-400">{tech.usage}</span>
                            </div>
                            
                            <div>
                              <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1.5">Project Integration</span>
                              <div className="flex flex-wrap gap-1.5">
                                {tech.projects.map(project => (
                                  <span key={project} className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-slate-300">
                                    {project}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <section className="relative w-full text-slate-100 font-sans overflow-hidden py-16 sm:py-24 border-y border-white/5" style={{ background: 'var(--rs-paper, #020617)' }}>
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.08)_0%,transparent_65%)] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Desktop Layout (Split 30/70) & Mobile Layout (Stacked) */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
          
          {/* Left Column: Typography & Context Panel */}
          <div className="w-full lg:w-[35%] flex flex-col z-20">
            <div className="mb-8 lg:mb-12">
              <span className="inline-block text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-3 pl-1 border-l-2 border-slate-700">
                Stack & Tools
              </span>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-4">
                The stack behind the work.
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed max-w-md">
                A focused modern stack for designing, building, and shipping production-ready digital products.
              </p>
            </div>

            {/* Desktop Context Panel (Hidden on mobile) */}
            {!isMobile && (
              <div className="bg-[#020617]/40 border border-white/10 rounded-2xl p-5 backdrop-blur-xl relative overflow-hidden transition-all duration-300">
                {/* Accent Top Border */}
                <div 
                  className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r transition-colors duration-500" 
                  style={{ backgroundImage: `linear-gradient(to right, transparent, ${activeTech.accent}, transparent)` }}
                />
                
                <div className="flex items-center gap-3 mb-4">
                  <div 
                    className="p-2.5 rounded-xl bg-white/5 border border-white/10"
                    style={{ color: activeTech.accent }}
                  >
                    {React.createElement(activeTech.icon, { size: 20 })}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{activeTech.name}</h3>
                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">{activeTech.category}</p>
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed mb-5">
                  {activeTech.description}
                </p>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-slate-400" /> Capabilities
                    </h4>
                    <p className="text-xs text-slate-400 bg-white/5 rounded-lg p-2.5 border border-white/5">
                      {activeTech.usage}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2">
                      Verified Integrations
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {activeTech.projects.map(project => (
                        <span 
                          key={project} 
                          className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/10 text-xs font-mono text-slate-300 hover:bg-white/[0.08] transition-colors cursor-default"
                        >
                          {project}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Interactive Visualization */}
          <div className="w-full lg:w-[65%] min-h-[400px] lg:min-h-[650px] flex items-center justify-center">
            {isMobile ? renderMobileView() : renderDesktopOrbit()}
          </div>

        </div>

        {/* Footer Statement */}
        <div className="mt-8 lg:mt-16 pt-6 border-t border-white/5 flex justify-between items-center text-xs font-mono text-slate-500">
          <p>Modern stack. Production-ready architecture. No unnecessary complexity.</p>
        </div>

      </div>
    </section>
  );
}