import React from 'react';

// DATA: High-Value Stack with Official Brand Colors
const techStack = [
  {
    name: "React",
    icon: "react",
    // React Blue Glow
    color: "group-hover:shadow-[#61DAFB]/50 group-hover:border-[#61DAFB]/50",
    role: "UI Library"
  },
  {
    name: "Next.js",
    icon: "nextjs",
    // White Glow (Next.js is black/white)
    color: "group-hover:shadow-white/50 group-hover:border-white/50",
    role: "Framework",
    invert: true // Inverts the black logo to white for dark mode
  },
  {
    name: "TypeScript",
    icon: "typescript",
    // TS Blue Glow
    color: "group-hover:shadow-[#3178C6]/50 group-hover:border-[#3178C6]/50",
    role: "Type Safety"
  },
  {
    name: "Supabase",
    icon: "supabase",
    // Supabase Emerald Glow
    color: "group-hover:shadow-[#3ECF8E]/50 group-hover:border-[#3ECF8E]/50",
    role: "Backend DB"
  },
  {
    name: "Prisma",
    icon: "prisma",
    // Prisma Dark/White Glow
    color: "group-hover:shadow-[#fff]/40 group-hover:border-white/50",
    role: "ORM",
    invert: true
  },
  {
    name: "Node.js",
    icon: "nodejs",
    // Node Green Glow
    color: "group-hover:shadow-[#339933]/50 group-hover:border-[#339933]/50",
    role: "Runtime"
  },
  {
    name: "Tailwind",
    icon: "tailwindcss",
    // Tailwind Cyan Glow
    color: "group-hover:shadow-[#06B6D4]/50 group-hover:border-[#06B6D4]/50",
    role: "Styling"
  },
  {
    name: "MongoDB",
    icon: "mongodb",
    // Mongo Green Glow
    color: "group-hover:shadow-[#47A248]/50 group-hover:border-[#47A248]/50",
    role: "NoSQL DB"
  },
  {
    name: "PostgreSQL",
    icon: "postgresql",
    // Postgres Blue Glow
    color: "group-hover:shadow-[#4169E1]/50 group-hover:border-[#4169E1]/50",
    role: "SQL DB"
  },
  {
    name: "Redux",
    icon: "redux",
    // Redux Purple Glow
    color: "group-hover:shadow-[#764ABC]/50 group-hover:border-[#764ABC]/50",
    role: "State Mgmt"
  },
  {
    name: "Docker",
    icon: "docker",
    // Docker Blue Glow
    color: "group-hover:shadow-[#2496ED]/50 group-hover:border-[#2496ED]/50",
    role: "DevOps"
  },
  {
    name: "Figma",
    icon: "figma",
    // Figma Orange/Red Glow
    color: "group-hover:shadow-[#F24E1E]/50 group-hover:border-[#F24E1E]/50",
    role: "Design"
  },
];

const TechCard = ({ tech }) => (
  <div className={`
    group relative flex flex-col items-center justify-center 
    w-24 h-24 sm:w-28 sm:h-28 mx-4 
    rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-md 
    transition-all duration-500 cursor-pointer
    hover:-translate-y-2 hover:bg-slate-800/60
    ${tech.color} hover:shadow-[0_0_30px_-5px] hover:border-opacity-100
  `}>

    {/* Glow Gradient (Hidden by default, fades in on hover) */}
    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-current"></div>

    {/* THE ICON: Full Color & High Visibility */}
    <img
      src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.icon}/${tech.icon}-original.svg`}
      alt={tech.name}
      className={`
        w-12 h-12 sm:w-14 sm:h-14 object-contain transition-all duration-500
        drop-shadow-lg
        ${tech.invert ? 'invert' : ''} 
        group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]
      `}
    />

    {/* The "Skill Reveal" Sliding Text */}
    <div className="absolute -bottom-8 opacity-0 group-hover:opacity-100 group-hover:bottom-3 transition-all duration-500 flex flex-col items-center">
      <span className="text-[10px] font-bold text-white uppercase tracking-wider shadow-black drop-shadow-md">{tech.name}</span>
      <span className="text-[9px] text-purple-300 font-mono">[{tech.role}]</span>
    </div>

  </div>
);

const TechTicker = () => {
  return (
    <div className="relative w-full overflow-hidden py-10">

      {/* 1. FADE MASKS: Creates the "Infinite" illusion */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-950 to-transparent z-20 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-950 to-transparent z-20 pointer-events-none"></div>

      {/* 2. THE ANIMATION TRACK */}
      <div className="flex w-max animate-scroll hover:[animation-play-state:paused] py-4">

        {/* Render the Stack Twice for Seamless Looping */}
        {techStack.map((tech, i) => <TechCard key={i} tech={tech} />)}
        {techStack.map((tech, i) => <TechCard key={`dup-${i}`} tech={tech} />)}

      </div>

      {/* 3. ANIMATION CSS */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default TechTicker;
