import React, { useState, useEffect } from 'react';
import AvatarFallback from './AvatarFallback';

const Header = ({ user, onLogout, onOpenLogin, onOpenRegister, onOpenDashboard }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (isOpen && !e.target.closest('.navbar')) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <header className="navbar sticky top-0 z-50 flex justify-between items-center py-4 bg-[#0f1115]/90 border-b border-white/6 backdrop-blur-md transition-all duration-300 w-full px-6 max-sm:px-4">
      
      {/* Brand logo & divider */}
      <div className="logo-container flex items-center gap-3 max-lg:order-1">
        <img src="/asset/GDGlogo.jpeg" alt="GDG Logo" className="h-8 w-8 object-contain rounded-full border border-white/10" />
        <div className="h-4 w-px bg-white/15 max-sm:hidden"></div>
        <div className="logo-text text-left">
          <h1 className="font-display text-[0.92rem] font-bold tracking-tight text-text-light m-0">GDG on Campus</h1>
          <p className="text-[0.62rem] text-text-muted m-0">IIT Bhilai, India</p>
        </div>
      </div>

      {/* Mobile Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="mobile-menu-btn hidden max-lg:block max-lg:order-3 bg-transparent border-0 text-text-light text-xl cursor-pointer p-2 z-[1001] transition-transform active:scale-95" 
        id="mobileMenuBtn" 
        aria-label="Toggle Navigation"
      >
        <i className={`fas ${isOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
      </button>

      {/* Navigation links & actions */}
      <nav 
        className={`nav-links flex items-center gap-8 max-lg:flex-col max-lg:gap-3 max-lg:absolute max-lg:top-[100%] max-lg:left-0 max-lg:right-0 max-lg:bg-[#0f1115]/98 max-lg:border-b max-lg:border-white/6 max-lg:p-5 max-lg:z-[1000] max-lg:shadow-2xl transition-all duration-300 ${
          isOpen ? 'max-lg:flex' : 'max-lg:hidden'
        }`} 
        id="navLinks"
      >
        <a href="#about" onClick={handleLinkClick} className="text-text-muted hover:text-text-light no-underline text-[0.85rem] font-medium transition-colors duration-200 max-lg:p-2.5 max-lg:text-text-light max-lg:w-full max-lg:text-left max-lg:hover:bg-white/5 max-lg:rounded-lg">
          About
        </a>
        <a href="#upcoming-events" onClick={handleLinkClick} className="text-text-muted hover:text-text-light no-underline text-[0.85rem] font-medium transition-colors duration-200 max-lg:p-2.5 max-lg:text-text-light max-lg:w-full max-lg:text-left max-lg:hover:bg-white/5 max-lg:rounded-lg">
          Upcoming Events
        </a>
        <a href="#past-events" onClick={handleLinkClick} className="text-text-muted hover:text-text-light no-underline text-[0.85rem] font-medium transition-colors duration-200 max-lg:p-2.5 max-lg:text-text-light max-lg:w-full max-lg:text-left max-lg:hover:bg-white/5 max-lg:rounded-lg">
          Past Events
        </a>
        <a href="#organizers" onClick={handleLinkClick} className="text-text-muted hover:text-text-light no-underline text-[0.85rem] font-medium transition-colors duration-200 max-lg:p-2.5 max-lg:text-text-light max-lg:w-full max-lg:text-left max-lg:hover:bg-white/5 max-lg:rounded-lg">
          Organizers
        </a>
        <a href="#chapter-video" onClick={handleLinkClick} className="text-text-muted hover:text-text-light no-underline text-[0.85rem] font-medium transition-colors duration-200 max-lg:p-2.5 max-lg:text-text-light max-lg:w-full max-lg:text-left max-lg:hover:bg-white/5 max-lg:rounded-lg">
          Video
        </a>

        {/* Action triggers */}
        {user ? (
          <div className="relative group/avatar max-lg:w-full">
            <button className="flex items-center gap-2 bg-white/5 border border-white/10 hover:border-white/20 p-1.5 pr-4 rounded-full cursor-pointer transition-all duration-200 focus:outline-none max-lg:w-full max-lg:justify-start">
              <AvatarFallback src={user.avatarUrl || user.profilePhotoUrl} name={user.name} size={32} className="rounded-full shadow-md" />
              <span className="text-[0.85rem] font-semibold text-text-light">{user.name.split(' ')[0]}</span>
              <i className="fa-solid fa-chevron-down text-white/40 text-[0.7rem] group-hover/avatar:rotate-180 transition-transform duration-300 ml-1 max-lg:hidden"></i>
            </button>
            
            {/* Dropdown menu */}
            <div className="absolute right-0 top-[110%] w-72 bg-[#0c0d12]/96 border border-white/8 backdrop-blur-xl rounded-2xl p-5 shadow-[0_20px_40px_rgba(0,0,0,0.5)] opacity-0 invisible group-hover/avatar:opacity-100 group-hover/avatar:visible hover:opacity-100 hover:visible transition-all duration-300 transform translate-y-2 group-hover/avatar:translate-y-0 z-[1100] text-left max-lg:static max-lg:w-full max-lg:opacity-100 max-lg:visible max-lg:translate-y-0 max-lg:bg-transparent max-lg:border-0 max-lg:p-3 max-lg:shadow-none">
              <div className="flex items-center gap-3 border-b border-white/8 pb-4 mb-4 max-lg:border-0 max-lg:pb-0 max-lg:mb-2">
                <div className="max-lg:hidden">
                  <AvatarFallback src={user.avatarUrl || user.profilePhotoUrl} name={user.name} size={48} className="rounded-full shadow-md" />
                </div>
                <div className="flex flex-col min-w-0">
                  <h4 className="text-[0.95rem] font-bold text-text-light m-0 truncate max-lg:text-[0.88rem]">{user.name}</h4>
                  <span className="text-[0.75rem] text-text-muted truncate">{user.email}</span>
                </div>
              </div>

              {user.interests && user.interests.length > 0 && (
                <div className="mb-4 max-lg:mb-3">
                  <span className="text-[0.68rem] font-semibold text-text-muted uppercase tracking-wider block mb-2">My Interests</span>
                  <div className="flex flex-wrap gap-1.5">
                    {user.interests.map((interest, idx) => (
                      <span key={idx} className="bg-white/4 border border-white/6 text-white/80 text-[0.65rem] font-medium px-2 py-0.5 rounded-full">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <button 
                onClick={() => { handleLinkClick(); onOpenDashboard && onOpenDashboard(); }}
                className="w-full flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-text-light py-2.5 rounded-xl text-[0.85rem] font-bold cursor-pointer transition-all duration-200 mb-2"
              >
                <i className="fa-solid fa-chart-line"></i> Dashboard
              </button>

              <button 
                onClick={() => { handleLinkClick(); onLogout && onLogout(); }}
                className="w-full flex items-center justify-center gap-2 bg-[#EA4335]/10 border border-[#EA4335]/20 hover:bg-[#EA4335] hover:border-[#EA4335] hover:text-white text-[#EA4335] py-2.5 rounded-xl text-[0.85rem] font-bold cursor-pointer transition-all duration-200"
              >
                <i className="fa-solid fa-arrow-right-from-bracket"></i> Sign Out
              </button>
            </div>
          </div>
        ) : (
          <>
            <button 
              onClick={() => { handleLinkClick(); onOpenLogin && onOpenLogin(); }}
              className="bg-transparent text-text-muted hover:text-text-light border-0 cursor-pointer font-semibold text-[0.85rem] transition-colors duration-200 max-lg:w-full max-lg:text-left max-lg:p-2.5 max-lg:hover:bg-white/5 max-lg:rounded-lg" 
              id="openLoginBtn"
            >
              Sign In
            </button>
            <button 
              onClick={() => { handleLinkClick(); onOpenRegister && onOpenRegister(); }}
              className="btn-join btn-radar bg-goog-blue hover:bg-[#357ae8] text-white border-0 px-4 py-2 rounded-lg cursor-pointer font-semibold text-[0.85rem] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(66,133,244,0.2)] max-lg:w-full max-lg:py-2.5 max-lg:mt-2"
            >
              Join Chapter
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
