import React from 'react';

const About = () => {
  return (
    <section id="about" className="section py-16 max-sm:py-8">
      
      {/* Section Header */}
      <div className="text-left mb-12 border-b border-white/6 pb-8">
        <span className="text-goog-blue uppercase tracking-widest text-[0.75rem] font-bold block mb-3">
          About Our Chapter
        </span>
        <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-text-light tracking-tight leading-none m-0 mb-4">
          Behind the Developer Community
        </h2>
        <p className="text-text-muted text-base sm:text-[1.05rem] max-w-2xl m-0 leading-relaxed">
          Learn about our mission, our core focus areas, and how we foster student growth and innovation at the Indian Institute of Technology Bhilai.
        </p>
      </div>

      <div className="grid grid-cols-[1fr_1.1fr] gap-12 items-start max-lg:grid-cols-1 max-lg:gap-8">
        
        {/* Left Column: Mission Pillars */}
        <div className="text-left">
          <div className="text-goog-blue uppercase tracking-widest text-[0.72rem] mb-3 inline-block font-semibold">
            Our Pillars
          </div>
          <h3 className="font-display text-2xl sm:text-3xl m-0 leading-tight font-extrabold mb-8 text-text-light">
            How We Empower Student Innovators
          </h3>
          
          <div className="flex flex-col gap-6">
            {/* Pillar 1 */}
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-goog-blue/10 border border-goog-blue/20 flex items-center justify-center flex-none">
                <i className="fa-solid fa-users text-goog-blue text-sm"></i>
              </div>
              <div>
                <h4 className="text-text-light text-base font-semibold m-0 mb-1">Connect</h4>
                <p className="text-text-muted text-[0.88rem] leading-relaxed m-0">
                  Build networks with peer developers, design thinkers, and industry mentors from across the country.
                </p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-goog-red/10 border border-goog-red/20 flex items-center justify-center flex-none">
                <i className="fa-solid fa-code text-goog-red text-sm"></i>
              </div>
              <div>
                <h4 className="text-text-light text-base font-semibold m-0 mb-1">Learn</h4>
                <p className="text-text-muted text-[0.88rem] leading-relaxed m-0">
                  Get hands-on coding experience, participate in tech study groups, and attend Google expert sessions.
                </p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-goog-yellow/10 border border-goog-yellow/20 flex items-center justify-center flex-none">
                <i className="fa-solid fa-rocket text-goog-yellow text-sm"></i>
              </div>
              <div>
                <h4 className="text-text-light text-base font-semibold m-0 mb-1">Grow</h4>
                <p className="text-text-muted text-[0.88rem] leading-relaxed m-0">
                  Apply your learning to solve real-world problems, build projects, and grow your career options.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Narrative Card & Disclaimer */}
        <div className="flex flex-col gap-5 text-left h-full">
          <div className="bg-[#14161d] border border-white/8 p-8 rounded-3xl shadow-xl flex-grow max-sm:p-5">
            <p className="text-text-muted leading-relaxed text-[0.95rem] m-0 mb-5">
              GDG on Campus at the Indian Institute of Technology - Bhilai is a community of tech enthusiasts, creators, and innovators who are passionate about learning, sharing, and building with Google technologies. We aim to create an inclusive and dynamic environment where students can explore tools, engage in discussions, and collaborate.
            </p>
            <p className="text-text-muted leading-relaxed text-[0.95rem] m-0">
              Through peer-to-peer workshops, interactive study jams, and team-led hackathons, we bridge the gap between classroom theory and real developer practice.
            </p>
          </div>

          <div className="bg-[#1a1515] border border-goog-red/14 p-6 rounded-2xl flex gap-3.5 items-start max-sm:p-4">
            <i className="fa-solid fa-circle-info text-goog-red text-base mt-0.5 flex-none"></i>
            <div>
              <h4 className="text-text-light text-[0.82rem] font-semibold m-0 mb-1">Independent Chapter Disclaimer</h4>
              <p className="text-text-muted text-[0.78rem] leading-normal m-0">
                While we are part of the larger Google Developer Groups network, we operate independently. The opinions and events hosted here do not represent the official stance of Google Inc. Learn more at{' '}
                <a href="https://developers.google.com/community" target="_blank" rel="noreferrer" className="text-goog-blue no-underline hover:underline font-medium">
                  developers.google.com/community
                </a>.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
