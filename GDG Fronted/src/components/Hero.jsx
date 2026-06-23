import React from 'react';

const Hero = ({ onOpenRegister }) => {
  return (
    <section className="grid grid-cols-[1.1fr_0.9fr] items-center gap-12 py-16 max-lg:grid-cols-1 max-lg:text-center max-sm:py-8 flex-grow">
      
      {/* Left Column: Hero Copy & Actions */}
      <div className="hero-content text-left max-lg:text-center max-lg:max-w-2xl max-lg:mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-goog-blue/8 border border-goog-blue/20 text-goog-blue text-xs font-semibold uppercase tracking-wider mb-6">
          <span className="w-2 h-2 rounded-full bg-goog-blue animate-pulse"></span>
          GDG on Campus • IIT Bhilai
        </div>
        
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6 text-text-light">
          Connect, Learn, and <span className="bg-gradient-to-r from-goog-blue via-goog-red to-goog-yellow bg-clip-text text-transparent">Build Together</span>
        </h1>
        
        <p className="text-text-muted text-[1.05rem] sm:text-lg leading-relaxed mb-8 max-w-[580px] max-lg:mx-auto">
          We bring together student developer enthusiasts and tech leaders to collaborate, explore Google Cloud, Firebase, TensorFlow, Web Development, and solve real-world problems.
        </p>
 
        {/* Stats Row */}
        <div className="flex flex-wrap gap-3 mb-8 max-lg:justify-center">
          <span className="bg-white/4 border border-white/8 px-4 py-2 rounded-xl text-text-light text-[0.88rem] font-medium transition-all duration-200 hover:-translate-y-[2px] hover:border-goog-blue/30 hover:bg-goog-blue/10">
            <strong className="text-goog-blue">714</strong> Members
          </span>
          <span className="bg-white/4 border border-white/8 px-4 py-2 rounded-xl text-text-light text-[0.88rem] font-medium transition-all duration-200 hover:-translate-y-[2px] hover:border-goog-red/30 hover:bg-goog-red/10">
            Independent Chapter
          </span>
          <span className="bg-white/4 border border-white/8 px-4 py-2 rounded-xl text-text-light text-[0.88rem] font-medium transition-all duration-200 hover:-translate-y-[2px] hover:border-goog-green/30 hover:bg-goog-green/10">
            Community Led
          </span>
        </div>
 
        {/* Call to Actions */}
        <div className="flex flex-wrap gap-4 mb-8 max-lg:justify-center">
          <button 
            onClick={onOpenRegister}
            className="px-6 py-3.5 rounded-xl font-semibold text-[0.95rem] bg-gradient-to-r from-goog-blue to-[#2b6cb0] text-white flex items-center gap-2 hover:shadow-[0_12px_24px_rgba(66,133,244,0.3)] transition-all duration-200 hover:-translate-y-0.5 btn-radar border-0 cursor-pointer"
          >
            Join Chapter <i className="fa-solid fa-arrow-right-long"></i>
          </button>
          <a href="#upcoming-events" className="px-6 py-3.5 rounded-xl font-semibold text-[0.95rem] border border-white/10 hover:border-white/20 bg-white/4 hover:bg-white/8 text-text-light flex items-center gap-2 transition-all duration-200 hover:-translate-y-0.5">
            Explore Events
          </a>
        </div>

        {/* Social Network */}
        <div className="flex gap-4 items-center max-lg:justify-center">
          <span className="text-[0.75rem] text-text-muted uppercase tracking-wider font-semibold">Community Hub:</span>
          <div className="flex gap-3">
            <a href="https://www.linkedin.com/company/developer-student-club-iit-bhilai" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/4 border border-white/8 text-text-muted hover:text-goog-blue hover:border-goog-blue/40 flex items-center justify-center transition-all duration-200 hover:-translate-y-[2px]" aria-label="LinkedIn">
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
            <a href="https://www.instagram.com/gdg_iitbhilai" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/4 border border-white/8 text-text-muted hover:text-goog-red hover:border-goog-red/40 flex items-center justify-center transition-all duration-200 hover:-translate-y-[2px]" aria-label="Instagram">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="https://dsc.iitbhilai.ac.in/" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/4 border border-white/8 text-text-muted hover:text-goog-green hover:border-goog-green/40 flex items-center justify-center transition-all duration-200 hover:-translate-y-[2px]" aria-label="Website">
              <i className="fa-solid fa-globe"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Right Column: Visual Dashboard Mockup */}
      <div className="relative flex items-center justify-center w-full min-h-[420px] max-lg:min-h-[380px] max-sm:min-h-[340px] max-lg:mt-4 px-2">
        
        {/* Backdrop Glow Decoration */}
        <div className="absolute w-[280px] h-[280px] rounded-full bg-goog-blue/10 blur-[80px] -z-10 top-1/4 left-1/4"></div>
        <div className="absolute w-[240px] h-[240px] rounded-full bg-goog-yellow/10 blur-[80px] -z-10 bottom-1/4 right-1/4"></div>

        {/* Inner Wrapper to contain the absolute cards within a fixed size container */}
        <div className="relative w-full max-w-[440px] h-[380px] max-sm:max-w-[320px] max-sm:h-[320px]">
          {/* Card 1: Community Dashboard Hub */}
          <div className="absolute top-0 left-0 w-[340px] max-sm:w-[260px] bg-[#14161d] border border-white/8 rounded-2xl shadow-2xl p-5 max-sm:p-4 text-left transform -rotate-3 transition-transform duration-300 hover:rotate-0 hover:z-20">
            <div className="flex items-center justify-between mb-4 border-b border-white/6 pb-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56]"></span>
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e]"></span>
                <span className="w-3 h-3 rounded-full bg-[#27c93f]"></span>
                <span className="text-[0.7rem] text-text-muted ml-2 font-mono">chapter-insights</span>
              </div>
              <span className="text-[0.65rem] text-goog-blue font-bold uppercase tracking-wider bg-goog-blue/10 px-2 py-0.5 rounded border border-goog-blue/20 font-mono">v2.6</span>
            </div>
            
            <div className="flex flex-col gap-4">
              <div>
                <span className="text-[0.65rem] text-text-muted uppercase tracking-wider font-semibold block mb-2 font-mono">Active Tech Tracks</span>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2 py-1 rounded-md text-[0.7rem] font-medium bg-goog-blue/10 text-goog-blue border border-goog-blue/20">AI & Machine Learning</span>
                  <span className="px-2 py-1 rounded-md text-[0.7rem] font-medium bg-goog-red/10 text-goog-red border border-goog-red/20">Google Cloud</span>
                  <span className="px-2 py-1 rounded-md text-[0.7rem] font-medium bg-goog-yellow/10 text-goog-yellow border border-goog-yellow/20">Web & Mobile Dev</span>
                  <span className="px-2 py-1 rounded-md text-[0.7rem] font-medium bg-goog-green/10 text-goog-green border border-goog-green/20">Firebase</span>
                </div>
              </div>

              <div className="bg-white/3 border border-white/6 rounded-xl p-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[0.7rem] font-bold text-text-light">SolsticeHack 1.0</span>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-goog-red opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-goog-red"></span>
                  </span>
                </div>
                <p className="text-[0.68rem] text-text-muted m-0 mb-2">Summer hackathon builds in progress!</p>
                <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-goog-red h-1.5 rounded-full w-[65%]"></div>
                </div>
                <div className="flex justify-between text-[0.6rem] text-text-muted mt-1.5 font-mono">
                  <span>65% Complete</span>
                  <span>Ends June 25</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[0.75rem] font-mono border-t border-white/6 pt-3">
                <span className="text-text-muted">Total Events Hosted</span>
                <span className="font-bold text-text-light">24+ Sessions</span>
              </div>
            </div>
          </div>

          {/* Card 2: verified Member Pass */}
          <div className="absolute bottom-0 right-0 w-[290px] max-sm:w-[220px] bg-[#1a1c23] border border-white/8 rounded-2xl shadow-2xl p-5 max-sm:p-4 text-left transform rotate-3 transition-transform duration-300 hover:rotate-0 hover:z-20">
            <div className="flex justify-between items-start mb-4">
              <img src="https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2.0,f_auto,g_center,h_1200,q_100,w_1200/v1/gcs/platform-data-goog/contentbuilder/GDG_Bevy_SocialSharingThumbnail_KFxxrrs.png" alt="GDG Logo" className="h-6 object-contain" />
              <span className="px-2 py-0.5 rounded bg-goog-green/12 text-goog-green border border-goog-green/20 text-[0.65rem] font-bold uppercase tracking-wider">
                Active Member
              </span>
            </div>
            <div className="flex items-center gap-3.5 mt-5">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-goog-blue/20 to-goog-green/20 border border-white/10 flex items-center justify-center font-bold text-text-light font-display text-sm">
                GDG
              </div>
              <div>
                <h4 className="text-text-light text-sm font-semibold m-0">Student Innovator</h4>
                <p className="text-text-muted text-xs m-0">IIT Bhilai Chapter</p>
              </div>
            </div>
            <div className="mt-5 pt-3 border-t border-white/6 flex justify-between items-center text-[0.7rem] text-text-muted font-mono">
              <span>ID: GDG-IITB-2026</span>
              <span className="text-goog-blue font-bold">● ONLINE</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
