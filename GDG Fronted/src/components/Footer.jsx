import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 py-15 pb-5 bg-glass-bg border-t border-glass-border rounded-t-[32px] relative overflow-hidden w-full before:absolute before:top-0 before:left-0 before:w-full before:h-1 before:bg-gradient-to-r before:from-goog-blue before:via-goog-red before:via-goog-yellow before:to-goog-green">
      <div className="max-w-[1200px] mx-auto px-[4%]">
        <div className="grid grid-cols-[1.2fr_2fr] gap-[60px] mb-[50px] max-lg:grid-cols-1 max-lg:gap-10">
          <div className="footer-brand text-left">
            <div className="flex items-center gap-[15px] mb-2">
              <img src="/asset/GDGlogo.jpeg" alt="GDG Logo" className="h-[42px] w-[42px] rounded-full object-cover shadow-[0_4px_12px_rgba(0,0,0,0.2)]" />
              <h2 className="font-display text-[1.4rem] font-bold text-text-light m-0">GDG on Campus</h2>
            </div>
            <p className="text-text-muted text-[0.9rem] mb-4 mt-1 text-left">IIT Bhilai, India</p>
            <p className="text-text-muted text-[0.95rem] leading-relaxed max-w-[350px] mt-3 text-left">
              Building the next generation of student developers through community-led workshops, hackathons, and study groups.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-[30px] max-lg:grid-cols-2 max-sm:grid-cols-1">
            <div className="footer-col text-left">
              <h4 className="font-display text-text-light text-[1.1rem] font-semibold mb-5 mt-0 relative inline-block after:absolute after:left-0 after:-bottom-1.5 after:h-0.5 after:w-6 after:bg-goog-blue after:rounded-sm">Quick Links</h4>
              <ul className="list-none p-0 m-0 flex flex-col gap-3 text-left">
                <li>
                  <a href="#about" className="group/link inline-flex items-center text-text-muted no-underline text-[0.95rem] transition-all duration-300 hover:text-text-light hover:translate-x-1 before:content-['>'] before:text-goog-blue before:font-bold before:mr-2 before:opacity-0 before:-translate-x-2.5 before:transition-all before:duration-300 group-hover/link:before:opacity-1 group-hover/link:before:translate-x-0">About Us</a>
                </li>
                <li>
                  <a href="#upcoming-events" className="group/link inline-flex items-center text-text-muted no-underline text-[0.95rem] transition-all duration-300 hover:text-text-light hover:translate-x-1 before:content-['>'] before:text-goog-blue before:font-bold before:mr-2 before:opacity-0 before:-translate-x-2.5 before:transition-all before:duration-300 group-hover/link:before:opacity-1 group-hover/link:before:translate-x-0">Upcoming Events</a>
                </li>
                <li>
                  <a href="#past-events" className="group/link inline-flex items-center text-text-muted no-underline text-[0.95rem] transition-all duration-300 hover:text-text-light hover:translate-x-1 before:content-['>'] before:text-goog-blue before:font-bold before:mr-2 before:opacity-0 before:-translate-x-2.5 before:transition-all before:duration-300 group-hover/link:before:opacity-1 group-hover/link:before:translate-x-0">Past Events</a>
                </li>
                <li>
                  <a href="#organizers" className="group/link inline-flex items-center text-text-muted no-underline text-[0.95rem] transition-all duration-300 hover:text-text-light hover:translate-x-1 before:content-['>'] before:text-goog-blue before:font-bold before:mr-2 before:opacity-0 before:-translate-x-2.5 before:transition-all before:duration-300 group-hover/link:before:opacity-1 group-hover/link:before:translate-x-0">Our Team</a>
                </li>
              </ul>
            </div>

            <div className="footer-col text-left">
              <h4 className="font-display text-text-light text-[1.1rem] font-semibold mb-5 mt-0 relative inline-block after:absolute after:left-0 after:-bottom-1.5 after:h-0.5 after:w-6 after:bg-goog-blue after:rounded-sm">Resources</h4>
              <ul className="list-none p-0 m-0 flex flex-col gap-3 text-left">
                <li>
                  <a href="https://developers.google.com/community" target="_blank" rel="noreferrer" className="group/link inline-flex items-center text-text-muted no-underline text-[0.95rem] transition-all duration-300 hover:text-text-light hover:translate-x-1 before:content-['>'] before:text-goog-blue before:font-bold before:mr-2 before:opacity-0 before:-translate-x-2.5 before:transition-all before:duration-300 group-hover/link:before:opacity-1 group-hover/link:before:translate-x-0">GDG Program</a>
                </li>
                <li>
                  <a href="https://gdg.community.dev/chapters/" target="_blank" rel="noreferrer" className="group/link inline-flex items-center text-text-muted no-underline text-[0.95rem] transition-all duration-300 hover:text-text-light hover:translate-x-1 before:content-['>'] before:text-goog-blue before:font-bold before:mr-2 before:opacity-0 before:-translate-x-2.5 before:transition-all before:duration-300 group-hover/link:before:opacity-1 group-hover/link:before:translate-x-0">Global Chapters</a>
                </li>
                <li>
                  <a href="https://developers.google.com/" target="_blank" rel="noreferrer" className="group/link inline-flex items-center text-text-muted no-underline text-[0.95rem] transition-all duration-300 hover:text-text-light hover:translate-x-1 before:content-['>'] before:text-goog-blue before:font-bold before:mr-2 before:opacity-0 before:-translate-x-2.5 before:transition-all before:duration-300 group-hover/link:before:opacity-1 group-hover/link:before:translate-x-0">Google Developers</a>
                </li>
                <li>
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="group/link inline-flex items-center text-text-muted no-underline text-[0.95rem] transition-all duration-300 hover:text-text-light hover:translate-x-1 before:content-['>'] before:text-goog-blue before:font-bold before:mr-2 before:opacity-0 before:-translate-x-2.5 before:transition-all before:duration-300 group-hover/link:before:opacity-1 group-hover/link:before:translate-x-0">Privacy Policy</a>
                </li>
              </ul>
            </div>

            <div className="footer-col footer-connect text-left">
              <h4 className="font-display text-text-light text-[1.1rem] font-semibold mb-5 mt-0 relative inline-block after:absolute after:left-0 after:-bottom-1.5 after:h-0.5 after:w-6 after:bg-goog-blue after:rounded-sm">Connect With Us</h4>
              <p className="text-text-muted text-[0.9rem] mb-5 text-left">Join our community on social media</p>
              <div className="flex gap-[15px]">
                <a href="https://www.linkedin.com/company/developer-student-club-iit-bhilai" target="_blank" rel="noreferrer" className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 text-text-light no-underline text-[1.1rem] transition-all duration-300 border border-glass-border hover:-translate-y-1 hover:bg-[#0077b5] hover:border-[#0077b5] hover:shadow-[0_6px_16px_rgba(0,119,181,0.4)]"><i className="fa-brands fa-linkedin-in"></i></a>
                <a href="https://www.instagram.com/gdg_iitbhilai" target="_blank" rel="noreferrer" className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 text-text-light no-underline text-[1.1rem] transition-all duration-300 border border-glass-border hover:-translate-y-1 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:border-transparent hover:shadow-[0_6px_16px_rgba(220,39,67,0.4)]"><i className="fa-brands fa-instagram"></i></a>
                <a href="https://dsc.iitbhilai.ac.in/" target="_blank" rel="noreferrer" className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 text-text-light no-underline text-[1.1rem] transition-all duration-300 border border-glass-border hover:-translate-y-1 hover:bg-goog-green hover:border-goog-green hover:shadow-[0_6px_16px_rgba(52,168,83,0.4)]"><i className="fa-solid fa-globe"></i></a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center pt-6 mt-5 border-t border-white/6 text-text-muted text-[0.85rem] max-sm:flex-col max-sm:gap-[15px] max-sm:text-center max-w-[1200px] mx-auto px-[4%]">
          <p className="m-0">&copy; {currentYear} Google Developer Groups on Campus IIT Bhilai. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <a href="#" className="text-text-muted no-underline transition-colors duration-300 hover:text-text-light">Terms</a>
            <span className="text-white/20">•</span>
            <a href="#" className="text-text-muted no-underline transition-colors duration-300 hover:text-text-light">Privacy</a>
            <span className="text-white/20">•</span>
            <a href="#" className="text-text-muted no-underline transition-colors duration-300 hover:text-text-light">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
