import React from 'react';

const UpcomingEvents = () => {
  return (
    <section id="upcoming-events" className="section py-16 max-sm:py-8">
      
      {/* Section Header */}
      <div className="text-left mb-10 border-b border-white/6 pb-8 flex justify-between items-end gap-6 max-lg:flex-col max-lg:items-start w-full">
        <div>
          <span className="text-goog-red uppercase tracking-widest text-[0.75rem] font-bold block mb-3">
            Join Our Journey
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-text-light tracking-tight leading-none m-0 mb-4">
            Upcoming Events
          </h2>
          <p className="text-text-muted text-base sm:text-[1.05rem] max-w-2xl m-0 leading-relaxed">
            Connect with peer developers, build with Google technologies, and learn from experts. Change starts with active, hands-on learning.
          </p>
        </div>
        <button type="button" className="view-all-btn px-5 py-3 rounded-xl font-bold cursor-pointer whitespace-nowrap transition-all duration-200 border border-white/10 hover:border-white/20 bg-white/4 hover:bg-white/8 text-white shadow-lg btn-radar hover:-translate-y-0.5" data-view-all-target="upcoming-events">
          View all events
        </button>
      </div>

      {/* Google-colored Scroll / Progress Indicator */}
      <div className="section-progress relative w-full h-[6px] mb-8 bg-white/5 rounded-full overflow-hidden border border-white/5">
        <span className="indicator block w-0 h-full bg-gradient-to-r from-goog-blue via-goog-red via-goog-yellow to-goog-green rounded-full transition-all duration-250"></span>
      </div>

      {/* Events Carousel */}
      <div className="carousel-wrapper">
        <div className="carousel-container" id="upcomingEventsCarousel">
          <div className="carousel-track">
            
            {/* Event Slide 1 */}
            <div className="carousel-item">
              <article className="event-card flex flex-col justify-between min-h-[320px] bg-[#14161d] border border-white/8 p-7 rounded-3xl transition-all duration-300 hover:-translate-y-1.5 hover:border-goog-blue/30 hover:shadow-[0_20px_40px_rgba(66,133,244,0.12)] relative overflow-hidden group w-full">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(66,133,244,0.06),transparent_50%)] -z-1"></div>
                
                <div className="text-left w-full">
                  <div className="flex justify-between items-center mb-5">
                    <span className="inline-block px-2.5 py-1 rounded-md text-[0.68rem] font-bold bg-goog-blue/10 text-goog-blue border border-goog-blue/20">
                      Hackathon
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1.5 text-text-muted text-[0.78rem] font-mono">
                        <i className="fa-regular fa-calendar-days text-goog-blue"></i> Mar 6, 2026
                      </span>
                      <i className="fa-solid fa-trophy text-goog-blue/30 text-sm"></i>
                    </div>
                  </div>
                  
                  <h3 className="m-0 mb-3 text-text-light font-display text-xl font-extrabold leading-snug group-hover:text-goog-blue transition-colors duration-200">
                    GDG On Campus India Solution Challenge 2026 - Build with AI
                  </h3>
                  <p className="text-text-muted leading-relaxed text-sm m-0 mb-6">
                    Stop scrolling. Start building. This challenge invites student developers across campus to create AI-powered solutions with Google tools and modern workflows.
                  </p>
                </div>
                
                {/* Card Footer Action */}
                <div className="border-t border-white/6 pt-4 mt-auto flex items-center justify-between w-full">
                  <span className="text-[0.7rem] text-text-muted font-mono uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-goog-green animate-pulse"></span>
                    RSVP Open
                  </span>
                  <a href="https://gdg.community.dev/events/details/google-gdg-on-campus-indian-institute-of-technology-bhilai-india-presents-gdg-on-campus-india-solution-challenge-2026-build-with-ai/" target="_blank" rel="noreferrer" className="px-4 py-2 rounded-xl text-xs font-bold border border-white/10 hover:border-goog-blue/40 hover:bg-goog-blue/10 hover:text-goog-blue text-text-light flex items-center gap-1.5 transition-all duration-200">
                    Register <i className="fa-solid fa-arrow-right-long text-[0.7rem]"></i>
                  </a>
                </div>
              </article>
            </div>

            {/* Event Slide 2 */}
            <div className="carousel-item">
              <article className="event-card flex flex-col justify-between min-h-[320px] bg-[#14161d] border border-white/8 p-7 rounded-3xl transition-all duration-300 hover:-translate-y-1.5 hover:border-goog-yellow/30 hover:shadow-[0_20px_40px_rgba(251,188,5,0.08)] relative overflow-hidden group w-full">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(251,188,5,0.05),transparent_50%)] -z-1"></div>
                
                <div className="text-left w-full">
                  <div className="flex justify-between items-center mb-5">
                    <span className="inline-block px-2.5 py-1 rounded-md text-[0.68rem] font-bold bg-goog-yellow/10 text-goog-yellow border border-goog-yellow/20">
                      Workshop / Study Group
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1.5 text-text-muted text-[0.78rem] font-mono">
                        <i className="fa-regular fa-calendar-days text-goog-yellow"></i> Jun 10, 2026
                      </span>
                      <i className="fa-solid fa-laptop-code text-goog-yellow/30 text-sm"></i>
                    </div>
                  </div>
                  
                  <h3 className="m-0 mb-3 text-text-light font-display text-xl font-extrabold leading-snug group-hover:text-goog-yellow transition-colors duration-200">
                    SolsticeHack 1.0: Ignite Your Innovator Spirit!
                  </h3>
                  <p className="text-text-muted leading-relaxed text-sm m-0 mb-6">
                    SolsticeHack 1.0 is a summer hackathon that brings together students to build projects in Web, Mobile, and AI/ML while exploring Firebase, Google Cloud, and Gemini API.
                  </p>
                </div>
                
                {/* Card Footer Action */}
                <div className="border-t border-white/6 pt-4 mt-auto flex items-center justify-between w-full">
                  <span className="text-[0.7rem] text-text-muted font-mono uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-goog-green animate-pulse"></span>
                    RSVP Open
                  </span>
                  <a href="https://gdg.community.dev/events/details/google-gdg-on-campus-indian-institute-of-technology-bhilai-india-presents-solsticehack-10-ignite-your-innovator-spirit/" target="_blank" rel="noreferrer" className="px-4 py-2 rounded-xl text-xs font-bold border border-white/10 hover:border-goog-yellow/40 hover:bg-goog-yellow/10 hover:text-goog-yellow text-text-light flex items-center gap-1.5 transition-all duration-200">
                    Register <i className="fa-solid fa-arrow-right-long text-[0.7rem]"></i>
                  </a>
                </div>
              </article>
            </div>

          </div>
        </div>
      </div>

      <div className="view-all-panel animate-[assistantSlideIn_0.28s_ease]" data-view-all-panel="upcoming-events" hidden>
        <div className="vertical-slider" data-vertical-slider="upcoming-events"></div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
