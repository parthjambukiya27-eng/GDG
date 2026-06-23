import React, { useEffect } from 'react';

const ChapterVideo = () => {
  useEffect(() => {
    // Dispatch window resize event on mount to ensure carousel offsets are calculated correctly
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const videos = [
    {
      category: 'Highlights',
      description: 'Chapter highlights and event recaps showcasing the incredible work done by our community.',
      link: 'https://gdg.community.dev/gdg-on-campus-indian-institute-of-technology-bhilai-india/',
      theme: {
        color: 'goog-blue',
        borderHover: 'hover:border-goog-blue/30',
        shadowHover: 'hover:shadow-[0_20px_40px_rgba(66,133,244,0.12)]',
        glow: 'bg-[radial-gradient(ellipse_at_top_right,rgba(66,133,244,0.06),transparent_50%)]',
        playHover: 'hover:bg-goog-blue/20 hover:border-goog-blue/60 hover:shadow-[0_0_24px_rgba(66,133,244,0.4)]',
        tagBg: 'bg-goog-blue/10 text-goog-blue border-goog-blue/30',
        btnHover: 'hover:border-goog-blue/40 hover:bg-goog-blue/10 hover:text-goog-blue',
        pulseBg: 'bg-goog-blue'
      }
    },
    {
      category: 'Behind The Scenes',
      description: 'Behind the scenes of GDG on Campus IIT Bhilai and how we support student developers.',
      link: 'https://gdg.community.dev/gdg-on-campus-indian-institute-of-technology-bhilai-india/',
      theme: {
        color: 'goog-red',
        borderHover: 'hover:border-goog-red/30',
        shadowHover: 'hover:shadow-[0_20px_40px_rgba(234,67,53,0.1)]',
        glow: 'bg-[radial-gradient(ellipse_at_top_right,rgba(234,67,53,0.05),transparent_50%)]',
        playHover: 'hover:bg-goog-red/20 hover:border-goog-red/60 hover:shadow-[0_0_24px_rgba(234,67,53,0.4)]',
        tagBg: 'bg-goog-red/10 text-goog-red border-goog-red/30',
        btnHover: 'hover:border-goog-red/40 hover:bg-goog-red/10 hover:text-goog-red',
        pulseBg: 'bg-goog-red'
      }
    },
    {
      category: 'Testimonials',
      description: 'Community testimonials and success stories from GDG participants and members.',
      link: 'https://gdg.community.dev/gdg-on-campus-indian-institute-of-technology-bhilai-india/',
      theme: {
        color: 'goog-yellow',
        borderHover: 'hover:border-goog-yellow/30',
        shadowHover: 'hover:shadow-[0_20px_40px_rgba(251,188,5,0.12)]',
        glow: 'bg-[radial-gradient(ellipse_at_top_right,rgba(251,188,5,0.05),transparent_50%)]',
        playHover: 'hover:bg-goog-yellow/20 hover:border-goog-yellow/60 hover:shadow-[0_0_24px_rgba(251,188,5,0.4)]',
        tagBg: 'bg-goog-yellow/10 text-goog-yellow border-goog-yellow/30',
        btnHover: 'hover:border-goog-yellow/40 hover:bg-goog-yellow/10 hover:text-goog-yellow',
        pulseBg: 'bg-goog-yellow'
      }
    }
  ];

  return (
    <section id="chapter-video" className="section video-section py-16 max-sm:py-8">
      
      {/* Section Header */}
      <div className="text-left mb-10 border-b border-white/6 pb-8 flex justify-between items-end gap-6 max-lg:flex-col max-lg:items-start w-full">
        <div>
          <span className="text-goog-blue uppercase tracking-widest text-[0.75rem] font-bold block mb-3">
            Our Media
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-text-light tracking-tight leading-none m-0 mb-4">
            Chapter Videos
          </h2>
          <p className="text-text-muted text-base sm:text-[1.05rem] max-w-2xl m-0 leading-relaxed">
            Watch highlights, expert sessions, and recaps showcasing the incredible work done by our community.
          </p>
        </div>
        <button type="button" className="view-all-btn px-5 py-3 rounded-xl font-bold cursor-pointer whitespace-nowrap transition-all duration-200 border border-white/10 hover:border-white/20 bg-white/4 hover:bg-white/8 text-white shadow-lg btn-radar hover:-translate-y-0.5" data-view-all-target="chapter-video">
          View all videos
        </button>
      </div>

      {/* Google-colored Scroll / Progress Indicator */}
      <div className="section-progress relative w-full h-[6px] mb-8 bg-white/5 rounded-full overflow-hidden border border-white/5">
        <span className="indicator block w-0 h-full bg-gradient-to-r from-goog-blue via-goog-red via-goog-yellow to-goog-green rounded-full transition-all duration-250"></span>
      </div>

      {/* Video Content Grid */}
      <div className="relative grid grid-cols-[1fr_280px] gap-6 items-stretch max-lg:grid-cols-1 max-sm:grid-cols-1">
        
        {/* Carousel Column */}
        <div className="carousel-wrapper">
          <div className="carousel-container" id="videoCarousel">
            <div className="carousel-track">
              
              {videos.map((vid, idx) => {
                const theme = vid.theme;
                return (
                  <div key={idx} className="carousel-item">
                    <article className={`video-card flex flex-col justify-between min-h-[340px] bg-[#14161d] border border-white/8 p-6 rounded-3xl transition-all duration-300 hover:-translate-y-1.5 ${theme.borderHover} ${theme.shadowHover} relative overflow-hidden group w-full`}>
                      <div className={`absolute inset-0 ${theme.glow} -z-1`}></div>
                      
                      <div className="text-left w-full">
                        {/* Video Preview Frame */}
                        <div className="video-preview bg-gradient-to-br from-[#1b212f] to-[#121622] rounded-2xl min-h-[200px] flex items-center justify-center mb-5 relative overflow-hidden border border-white/5">
                          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:16px_16px]"></div>
                          
                          {/* Colored Glowing Play Button */}
                          <div className={`video-play w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-text-light text-base transition-all duration-300 backdrop-blur-[4px] border border-white/20 ${theme.playHover} cursor-pointer z-10`}>
                            <i className="fa-solid fa-play"></i>
                          </div>
                          
                          <span className={`absolute top-3 left-3 px-2 py-0.5 rounded text-[0.6rem] font-bold tracking-widest bg-black/40 ${theme.tagBg} uppercase font-mono`}>
                            {vid.category}
                          </span>
                        </div>
                        
                        <p className="text-text-muted leading-relaxed text-sm m-0 mb-6">
                          {vid.description}
                        </p>
                      </div>

                      {/* Card Footer Action */}
                      <div className="border-t border-white/6 pt-4 mt-auto flex items-center justify-between w-full">
                        <span className="text-[0.7rem] text-text-muted font-mono uppercase tracking-wider flex items-center gap-1.5">
                          <span className={`w-1.5 h-1.5 rounded-full ${theme.pulseBg} animate-pulse`}></span>
                          HD Streaming
                        </span>
                        <a href={vid.link} target="_blank" rel="noreferrer" className={`px-4 py-2 rounded-xl text-xs font-bold border border-white/10 ${theme.btnHover} text-text-light flex items-center gap-1.5 transition-all duration-200`}>
                          Watch Video <i className="fa-solid fa-circle-play text-[0.75rem]"></i>
                        </a>
                      </div>
                    </article>
                  </div>
                );
              })}

            </div>
          </div>
        </div>

        {/* Sidebar Info Card Column */}
        <aside className="lg:col-start-2 max-lg:col-auto w-full max-sm:hidden">
          <div className="relative flex flex-col justify-center items-start h-full p-8 rounded-[28px] bg-[#14161d] border border-white/8 overflow-hidden shadow-xl text-left min-h-[360px]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(66,133,244,0.04),transparent_50%)] -z-1"></div>
            
            <span className="text-[0.68rem] font-bold text-goog-blue uppercase tracking-widest font-mono block mb-3">
              GDG IIT Bhilai
            </span>
            <h3 className="font-display text-2xl font-extrabold text-text-light m-0 mb-4 leading-snug">
              Explore Media Center
            </h3>
            <p className="text-text-muted text-xs sm:text-sm leading-relaxed m-0 mb-6">
              Subscribe to our community portal to stay updated with recorded lectures, live stream links, and workspace sessions.
            </p>
            
            <div className="flex flex-col gap-3 w-full">
              <div className="flex items-center gap-2.5 text-xs text-text-light font-medium">
                <i className="fa-solid fa-circle-check text-goog-blue text-[0.8rem]"></i>
                <span>Full Event Recaps</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-text-light font-medium">
                <i className="fa-solid fa-circle-check text-goog-red text-[0.8rem]"></i>
                <span>Student Talk Series</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-text-light font-medium">
                <i className="fa-solid fa-circle-check text-goog-yellow text-[0.8rem]"></i>
                <span>Hands-on Code Jams</span>
              </div>
            </div>
          </div>
        </aside>

      </div>

      <div className="view-all-panel animate-[assistantSlideIn_0.28s_ease]" data-view-all-panel="chapter-video" hidden>
        <div className="vertical-slider" data-vertical-slider="chapter-video"></div>
      </div>
    </section>
  );
};

export default ChapterVideo;
