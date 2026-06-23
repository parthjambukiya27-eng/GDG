import React, { useEffect } from 'react';

const PastEvents = () => {
  useEffect(() => {
    // Wait for elements to render in DOM, then dispatch window resize to kick off autoplay offset calculation
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="past-events" className="section past-section py-16 max-sm:py-8">
      
      {/* Section Header */}
      <div className="text-left mb-10 border-b border-white/6 pb-8 flex justify-between items-end gap-6 max-lg:flex-col max-lg:items-start w-full">
        <div>
          <span className="text-goog-yellow uppercase tracking-widest text-[0.75rem] font-bold block mb-3">
            Our Milestones
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-text-light tracking-tight leading-none m-0 mb-4">
            Past Events
          </h2>
          <p className="text-text-muted text-base sm:text-[1.05rem] max-w-2xl m-0 leading-relaxed">
            Take a look at the workshops, hackathons, and info sessions we have built together with our community members.
          </p>
        </div>
        <button type="button" className="view-all-btn px-5 py-3 rounded-xl font-bold cursor-pointer whitespace-nowrap transition-all duration-200 border border-white/10 hover:border-white/20 bg-white/4 hover:bg-white/8 text-white shadow-lg btn-radar hover:-translate-y-0.5" data-view-all-target="past-events">
          View all events
        </button>
      </div>

      {/* Google-colored Scroll / Progress Indicator */}
      <div className="section-progress relative w-full h-[6px] mb-8 bg-white/5 rounded-full overflow-hidden border border-white/5">
        <span className="indicator block w-0 h-full bg-gradient-to-r from-goog-blue via-goog-red via-goog-yellow to-goog-green rounded-full transition-all duration-250"></span>
      </div>

      {/* Events Carousel */}
      <div className="carousel-wrapper">
        <div className="carousel-container" id="pastEventsCarousel">
          <div className="carousel-track">
            
            {/* Event Slide 1 */}
            <div className="carousel-item">
              <article className="past-event-card flex flex-col justify-between min-h-[300px] bg-[#14161d] border border-white/8 p-7 rounded-3xl transition-all duration-300 hover:-translate-y-1.5 hover:border-goog-blue/30 hover:shadow-[0_20px_40px_rgba(66,133,244,0.12)] relative overflow-hidden group w-full">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(66,133,244,0.06),transparent_50%)] -z-1"></div>
                
                <div className="text-left w-full">
                  <div className="flex justify-between items-center mb-5">
                    <span className="inline-block px-2.5 py-1 rounded-md text-[0.68rem] font-bold bg-goog-blue/10 text-goog-blue border border-goog-blue/20">
                      Workshop / Study Group
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1.5 text-text-muted text-[0.78rem] font-mono">
                        <i className="fa-regular fa-calendar-days text-goog-blue"></i> May 25, 2026
                      </span>
                      <i className="fa-solid fa-brain text-goog-blue/30 text-sm"></i>
                    </div>
                  </div>
                  
                  <h3 className="m-0 mb-3 text-text-light font-display text-xl font-extrabold leading-snug group-hover:text-goog-blue transition-colors duration-200">
                    Build With Gemini AI – 15 Day Build Sprint
                  </h3>
                  <p className="text-text-muted leading-relaxed text-sm m-0 mb-6">
                    An intensive 15-day sprint focused on building innovative projects using Google's Gemini API and advanced AI technologies.
                  </p>
                </div>
                
                {/* Card Footer Action */}
                <div className="border-t border-white/6 pt-4 mt-auto flex items-center justify-between w-full">
                  <span className="text-[0.7rem] text-text-muted font-mono uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/30"></span>
                    Completed
                  </span>
                  <a href="https://gdg.community.dev/events/details/google-gdg-on-campus-indian-institute-of-technology-bhilai-india-presents-build-with-gemini-ai-15-day-build-sprint/" target="_blank" rel="noreferrer" className="px-4 py-2 rounded-xl text-xs font-bold border border-white/10 hover:border-goog-blue/40 hover:bg-goog-blue/10 hover:text-goog-blue text-text-light flex items-center gap-1.5 transition-all duration-200">
                    View details <i className="fa-solid fa-arrow-right-long text-[0.7rem]"></i>
                  </a>
                </div>
              </article>
            </div>

            {/* Event Slide 2 */}
            <div className="carousel-item">
              <article className="past-event-card flex flex-col justify-between min-h-[300px] bg-[#14161d] border border-white/8 p-7 rounded-3xl transition-all duration-300 hover:-translate-y-1.5 hover:border-goog-red/30 hover:shadow-[0_20px_40px_rgba(234,67,53,0.08)] relative overflow-hidden group w-full">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(234,67,53,0.05),transparent_50%)] -z-1"></div>
                
                <div className="text-left w-full">
                  <div className="flex justify-between items-center mb-5">
                    <span className="inline-block px-2.5 py-1 rounded-md text-[0.68rem] font-bold bg-goog-red/10 text-goog-red border border-goog-red/20">
                      Hackathon
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1.5 text-text-muted text-[0.78rem] font-mono">
                        <i className="fa-regular fa-calendar-days text-goog-red"></i> Feb 1, 2026
                      </span>
                      <i className="fa-solid fa-fire text-goog-red/30 text-sm"></i>
                    </div>
                  </div>
                  
                  <h3 className="m-0 mb-3 text-text-light font-display text-xl font-extrabold leading-snug group-hover:text-goog-red transition-colors duration-200">
                    The Forge — Code, Adapt, Conquer
                  </h3>
                  <p className="text-text-muted leading-relaxed text-sm m-0 mb-6">
                    An epic hackathon event where students competed to build scalable solutions under time pressure.
                  </p>
                </div>
                
                {/* Card Footer Action */}
                <div className="border-t border-white/6 pt-4 mt-auto flex items-center justify-between w-full">
                  <span className="text-[0.7rem] text-text-muted font-mono uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/30"></span>
                    Completed
                  </span>
                  <a href="https://gdg.community.dev/events/details/google-gdg-on-campus-indian-institute-of-technology-bhilai-india-presents-the-forge-code-adapt-conquer/" target="_blank" rel="noreferrer" className="px-4 py-2 rounded-xl text-xs font-bold border border-white/10 hover:border-goog-red/40 hover:bg-goog-red/10 hover:text-goog-red text-text-light flex items-center gap-1.5 transition-all duration-200">
                    View details <i className="fa-solid fa-arrow-right-long text-[0.7rem]"></i>
                  </a>
                </div>
              </article>
            </div>

            {/* Event Slide 3 */}
            <div className="carousel-item">
              <article className="past-event-card flex flex-col justify-between min-h-[300px] bg-[#14161d] border border-white/8 p-7 rounded-3xl transition-all duration-300 hover:-translate-y-1.5 hover:border-goog-green/30 hover:shadow-[0_20px_40px_rgba(52,168,83,0.08)] relative overflow-hidden group w-full">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(52,168,83,0.05),transparent_50%)] -z-1"></div>
                
                <div className="text-left w-full">
                  <div className="flex justify-between items-center mb-5">
                    <span className="inline-block px-2.5 py-1 rounded-md text-[0.68rem] font-bold bg-goog-green/10 text-goog-green border border-goog-green/20">
                      Info session
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1.5 text-text-muted text-[0.78rem] font-mono">
                        <i className="fa-regular fa-calendar-days text-goog-green"></i> Jan 31, 2026
                      </span>
                      <i className="fa-solid fa-circle-check text-goog-green/30 text-sm"></i>
                    </div>
                  </div>
                  
                  <h3 className="m-0 mb-3 text-text-light font-display text-xl font-extrabold leading-snug group-hover:text-goog-green transition-colors duration-200">
                    TechSprint IIT Bhilai — Wrap-Up & Insights Session
                  </h3>
                  <p className="text-text-muted leading-relaxed text-sm m-0 mb-6">
                    A wrap-up session sharing insights and learnings from the TechSprint event with the community.
                  </p>
                </div>
                
                {/* Card Footer Action */}
                <div className="border-t border-white/6 pt-4 mt-auto flex items-center justify-between w-full">
                  <span className="text-[0.7rem] text-text-muted font-mono uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/30"></span>
                    Completed
                  </span>
                  <a href="https://gdg.community.dev/events/details/google-gdg-on-campus-indian-institute-of-technology-bhilai-india-presents-techsprint-iit-bhilai-wrap-up-amp-insights-session/" target="_blank" rel="noreferrer" className="px-4 py-2 rounded-xl text-xs font-bold border border-white/10 hover:border-goog-green/40 hover:bg-goog-green/10 hover:text-goog-green text-text-light flex items-center gap-1.5 transition-all duration-200">
                    View details <i className="fa-solid fa-arrow-right-long text-[0.7rem]"></i>
                  </a>
                </div>
              </article>
            </div>

          </div>
        </div>
      </div>

      <div className="view-all-panel animate-[assistantSlideIn_0.28s_ease]" data-view-all-panel="past-events" hidden>
        <div className="vertical-slider" data-vertical-slider="past-events"></div>
      </div>
    </section>
  );
};

export default PastEvents;
