import React, { useState } from 'react';

const WebCreator = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const creators = [
    {
      name: 'Krish Shiyani',
      role: 'Web Developer',
      initials: 'KS',
      image: 'https://ui-avatars.com/api/?name=Krish+Shiyani&background=1D2432&color=ffffff&rounded=true&size=256&bold=true',
      skills: ['React 19', 'Vite', 'Tailwind CSS', 'WebGL & Three.js'],
      bio: 'Lead frontend engineer focusing on interactive WebGL components and high-performance React architectures.',
      color: 'goog-blue',
      badgeColor: 'bg-goog-blue/10 text-goog-blue border-goog-blue/20',
      activeBorder: 'border-goog-blue/50',
      glow: 'bg-[radial-gradient(ellipse_at_top_right,rgba(66,133,244,0.08),transparent_50%)]',
      accentGlow: 'shadow-[0_0_30px_rgba(66,133,244,0.2)]'
    },
    {
      name: 'Parth Jambukiya',
      role: 'Web Developer',
      initials: 'PJ',
      image: 'https://ui-avatars.com/api/?name=Parth+Jambukiya&background=1D2432&color=ffffff&rounded=true&size=256&bold=true',
      skills: ['JavaScript ES6', 'CSS3 / Animation', 'GSAP', 'Responsive Design'],
      bio: 'Frontend developer specializing in sleek UI transitions, responsive layouts, and user interaction design.',
      color: 'goog-red',
      badgeColor: 'bg-goog-red/10 text-goog-red border-goog-red/20',
      activeBorder: 'border-goog-red/50',
      glow: 'bg-[radial-gradient(ellipse_at_top_right,rgba(234,67,53,0.07),transparent_50%)]',
      accentGlow: 'shadow-[0_0_30px_rgba(234,67,53,0.15)]'
    },
    {
      name: 'GDG Web Team',
      role: 'Design & Maintenance',
      initials: 'GD',
      image: 'https://ui-avatars.com/api/?name=GDG+Web+Team&background=1D2432&color=ffffff&rounded=true&size=256&bold=true',
      skills: ['UI/UX Design', 'Performance Tuning', 'SEO Optimization', 'Git Workflow'],
      bio: 'Core development group responsible for UI styling guidelines, performance optimizations, and site maintenance.',
      color: 'goog-green',
      badgeColor: 'bg-goog-green/10 text-goog-green border-goog-green/20',
      activeBorder: 'border-goog-green/50',
      glow: 'bg-[radial-gradient(ellipse_at_top_right,rgba(52,168,83,0.07),transparent_50%)]',
      accentGlow: 'shadow-[0_0_30px_rgba(52,168,83,0.15)]'
    }
  ];

  const activeDev = creators[activeIndex];

  return (
    <section id="web-creator" className="section web-creator-section py-16 max-sm:py-8">
      
      {/* Section Header */}
      <div className="text-left mb-12 border-b border-white/6 pb-8">
        <span className="text-goog-blue uppercase tracking-widest text-[0.75rem] font-bold block mb-3">
          Website Authors
        </span>
        <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-text-light tracking-tight leading-none m-0 mb-4">
          Web Creators
        </h2>
        <p className="text-text-muted text-base sm:text-[1.05rem] max-w-2xl m-0 leading-relaxed">
          The engineering minds who conceptualized, coded, and deployed the GDG on Campus IIT Bhilai platform.
        </p>
      </div>

      {/* Interactive Panel Grid */}
      <div className="hidden sm:grid grid-cols-[1.5fr_1fr] gap-8 items-stretch max-lg:grid-cols-1 w-full text-left">
        
        {/* Left Column: Active Profile Card Viewer */}
        <div className="relative bg-[#14161d] border border-white/8 rounded-3xl p-8 flex flex-col md:flex-row items-center md:items-start gap-8 overflow-hidden transition-all duration-300 shadow-2xl min-h-[300px]">
          {/* Radial glow backdrop */}
          <div className={`absolute inset-0 ${activeDev.glow} -z-1`}></div>

          {/* Top Google Colors Decorative Strip */}
          <div className="absolute top-0 left-0 w-full h-[3px] flex">
            <div className="h-full w-1/4 bg-goog-blue"></div>
            <div className="h-full w-1/4 bg-goog-red"></div>
            <div className="h-full w-1/4 bg-goog-yellow"></div>
            <div className="h-full w-1/4 bg-goog-green"></div>
          </div>

          {/* Large Avatar */}
          <div className={`w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-2 border-white/10 shadow-xl flex-none ${activeDev.accentGlow} transition-all duration-300`}>
            <img 
              src={activeDev.image} 
              alt={activeDev.name} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Developer Details */}
          <div className="flex-grow flex flex-col justify-between h-full text-center md:text-left z-10">
            <div>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-2">
                <span className={`px-2.5 py-0.5 rounded-full text-[0.68rem] font-bold tracking-wider font-mono border ${activeDev.badgeColor} uppercase`}>
                  Active Status
                </span>
                <span className="text-xs text-text-muted font-mono flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-goog-green animate-pulse"></span>
                  Online / Dev Mode
                </span>
              </div>
              
              <h3 className="m-0 mb-1 text-text-light font-display text-2xl sm:text-3xl font-extrabold tracking-tight">
                {activeDev.name}
              </h3>
              
              <p className="text-goog-blue text-sm font-mono tracking-wide m-0 mb-4 font-semibold uppercase">
                {activeDev.role}
              </p>
              
              <p className="text-text-muted text-sm sm:text-[0.92rem] leading-relaxed m-0 mb-6 max-w-lg">
                {activeDev.bio}
              </p>
            </div>

            {/* Skills Badges */}
            <div>
              <span className="text-[0.68rem] text-text-muted font-mono uppercase tracking-widest block mb-2.5">
                Core Specialization
              </span>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {activeDev.skills.map((skill, idx) => (
                  <span 
                    key={idx} 
                    className="px-3 py-1 rounded-xl text-xs font-semibold bg-white/4 border border-white/8 text-text-light hover:bg-white/8 transition-colors duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Tab Selector Buttons */}
        <div className="flex flex-col gap-4 justify-center">
          <span className="text-[0.68rem] text-text-muted font-mono uppercase tracking-widest block pl-2">
            Select Creator Profile
          </span>
          {creators.map((dev, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-full p-5 rounded-2xl border text-left flex items-center justify-between transition-all duration-300 cursor-pointer ${
                  isActive 
                    ? `bg-white/5 ${dev.activeBorder} shadow-lg -translate-x-1` 
                    : 'bg-transparent border-white/5 hover:bg-white/2 hover:border-white/10'
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Miniature Avatar */}
                  <div className={`w-10 h-10 rounded-full overflow-hidden border ${isActive ? 'border-white/20' : 'border-white/10'} flex-none`}>
                    <img src={dev.image} alt={dev.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className={`m-0 text-sm font-bold transition-colors duration-200 ${isActive ? 'text-text-light' : 'text-text-muted group-hover:text-text-light'}`}>
                      {dev.name}
                    </h4>
                    <p className="m-0 text-xs text-text-muted font-mono mt-0.5">
                      {dev.role}
                    </p>
                  </div>
                </div>
                
                {/* Arrow indicator */}
                <i className={`fa-solid fa-chevron-right text-xs transition-transform duration-300 ${
                  isActive ? 'text-goog-blue translate-x-1' : 'text-text-muted'
                }`}></i>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:hidden max-sm:gap-2">
        {creators.map((dev, idx) => (
          <article
            key={idx}
            className="rounded-2xl border border-white/8 bg-[#111319] p-3 flex flex-col items-center justify-center text-center gap-2 shadow-[0_10px_30px_rgba(0,0,0,0.18)] min-h-[150px] max-sm:p-2 max-sm:min-h-[120px]"
          >
            <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 flex-none">
              <img src={dev.image} alt={dev.name} className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0">
              <h4 className="m-0 text-[0.82rem] font-semibold text-text-light leading-tight">
                {dev.name}
              </h4>
              <p className="m-0 text-[0.68rem] text-text-muted font-mono mt-1 leading-tight">
                {dev.role}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default WebCreator;
