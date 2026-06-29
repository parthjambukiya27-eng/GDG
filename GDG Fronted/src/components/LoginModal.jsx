import React, { useState, useEffect } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const LoginModal = ({ isOpen, initialTab = 'login', onClose }) => {
  const [activeTab, setActiveTab] = useState('login'); // 'login', 'register'
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  
  // Form States
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regBatch, setRegBatch] = useState('B.Tech 1st Year');
  const [selectedInterests, setSelectedInterests] = useState([]);

  // Error States
  const [errors, setErrors] = useState({});

  // Sync tab with initialTab prop when modal opens
  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab === 'forgot' ? 'login' : initialTab);
      setSuccessMsg('');
      setIsSubmitting(false);
      setErrors({});
      // Reset forms
      setLoginEmail('');
      setLoginPassword('');
      setRegName('');
      setRegEmail('');
      setRegPassword('');
      setRegConfirmPassword('');
      setSelectedInterests([]);
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  // Toggle Tech Interests
  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  // Password Strength Evaluator
  const getPasswordStrength = (pass) => {
    if (!pass) return { score: 0, text: 'No Password', color: 'bg-white/10', textColor: 'text-text-muted' };
    let score = 0;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 1) return { score, text: 'Weak', color: 'bg-goog-red', textColor: 'text-goog-red' };
    if (score <= 3) return { score, text: 'Medium', color: 'bg-goog-yellow', textColor: 'text-goog-yellow' };
    return { score, text: 'Strong', color: 'bg-goog-green', textColor: 'text-goog-green' };
  };

  const pwdStrength = getPasswordStrength(regPassword);

  // Email validation check
  const isIITBEmail = (email) => {
    return email.trim().toLowerCase().endsWith('@iitbhilai.ac.in');
  };

  // Handlers
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!isIITBEmail(loginEmail)) {
      newErrors.loginEmail = 'Please use your official IIT Bhilai email (@iitbhilai.ac.in)';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    // Simulate API Auth Request
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMsg('Successfully logged in! Redirecting to portal...');
      setTimeout(() => {
        onClose();
      }, 1800);
    }, 1500);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!regName.trim()) {
      newErrors.regName = 'Name is required';
    }

    if (!isIITBEmail(regEmail)) {
      newErrors.regEmail = 'Official IIT Bhilai email (@iitbhilai.ac.in) is required';
    }

    if (regPassword.length < 8) {
      newErrors.regPassword = 'Password must be at least 8 characters long';
    }

    if (regPassword !== regConfirmPassword) {
      newErrors.regConfirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    // Simulate API Registration Request
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMsg('Profile created! Verification email sent to ' + regEmail);
      setTimeout(() => {
        setActiveTab('login');
        setSuccessMsg('');
      }, 2500);
    }, 1500);
  };



  return (
    <div 
      className="modal-overlay active" 
      id="loginModal" 
      onClick={(e) => { if (e.target.id === 'loginModal') onClose(); }}
    >
      <div className="login-card bg-[#0e1015]/95 border border-white/8 w-full max-w-[880px] rounded-[32px] shadow-[0_32px_64px_rgba(0,0,0,0.56)] relative overflow-hidden transition-all duration-[400ms] cubic-bezier-[0.22,1,0.36,1] grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] max-md:max-w-[460px] max-sm:rounded-2xl max-sm:mx-4">
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-5 right-5 z-50 bg-white/4 border border-white/6 rounded-full w-8 h-8 flex items-center justify-center text-text-muted text-[1.1rem] cursor-pointer transition-all duration-200 hover:text-text-light hover:bg-white/10 hover:border-white/10 focus:outline-none" 
          id="closeLoginBtn"
          type="button"
          aria-label="Close Modal"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        {/* Left Column: Premium Branding Sidebar */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#12141a] via-[#151922] to-[#0e1015] border-r border-white/6 flex flex-col justify-between p-10 max-md:hidden select-none">
          {/* Subtle Google Colors Backdrop Glow */}
          <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-goog-blue/8 blur-[60px] pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full bg-goog-green/8 blur-[60px] pointer-events-none"></div>
          <div className="absolute top-1/2 left-1/3 w-28 h-28 rounded-full bg-goog-yellow/5 blur-[70px] pointer-events-none"></div>

          {/* GDG Header logo */}
          <div className="z-10 flex items-center gap-3">
            <img src="/asset/GDGlogo.jpeg" alt="GDG Logo" className="h-9 w-9 object-contain rounded-full border border-white/10" />
            <div>
              <h3 className="font-display text-[0.95rem] font-bold text-text-light m-0">GDG on Campus</h3>
              <p className="text-[0.65rem] text-text-muted m-0">IIT Bhilai Chapter</p>
            </div>
          </div>

          {/* Graphics & Slogan */}
          <div className="z-10 my-auto text-left py-6">
            <span className="px-3 py-1 rounded-full bg-white/4 border border-white/6 text-goog-blue text-[0.72rem] font-bold tracking-wider uppercase font-mono">
              Join the Tech Revolution
            </span>
            <h2 className="font-display text-[2rem] leading-tight font-extrabold text-white mt-4 mb-2">
              Connect. Learn. <br />Build. Grow.
            </h2>
            <p className="text-text-muted text-[0.85rem] leading-relaxed max-w-[320px]">
              Become a part of the official developer community at IIT Bhilai. Build projects, organize jams, and shape the tech landscape together.
            </p>

            {/* Micro Highlights */}
            <div className="flex flex-col gap-3.5 mt-8">
              <div className="flex items-center gap-3 text-[0.8rem] text-text-light">
                <div className="w-6 h-6 rounded-lg bg-goog-blue/10 border border-goog-blue/20 flex items-center justify-center text-goog-blue">
                  <i className="fa-solid fa-code"></i>
                </div>
                <span>Hands-on Workshops & Hackathons</span>
              </div>
              <div className="flex items-center gap-3 text-[0.8rem] text-text-light">
                <div className="w-6 h-6 rounded-lg bg-goog-red/10 border border-goog-red/20 flex items-center justify-center text-goog-red">
                  <i className="fa-solid fa-cloud"></i>
                </div>
                <span>Cloud Study Jams & GenAI Tracks</span>
              </div>
              <div className="flex items-center gap-3 text-[0.8rem] text-text-light">
                <div className="w-6 h-6 rounded-lg bg-goog-green/10 border border-goog-green/20 flex items-center justify-center text-goog-green">
                  <i className="fa-solid fa-users"></i>
                </div>
                <span>Networking with Industry Leaders</span>
              </div>
            </div>
          </div>

          {/* Footer branding */}
          <div className="z-10 flex items-center justify-between text-[0.72rem] text-text-muted font-mono border-t border-white/6 pt-5">
            <span>IITBHILAI.AC.IN</span>
            <span className="text-goog-yellow">PORTAL V1.0</span>
          </div>
        </div>

        {/* Right Column: Dynamic Form Screen */}
        <div className="p-10 max-sm:p-6 flex flex-col justify-center min-h-[500px]">
          
          {/* Success Overlay Screen */}
          {successMsg ? (
            <div className="flex flex-col items-center justify-center text-center animate-[assistantSlideIn_0.3s_ease] py-8">
              <div className="w-16 h-16 rounded-full bg-goog-green/10 border border-goog-green/30 flex items-center justify-center text-goog-green text-3xl mb-5 shadow-[0_0_30px_rgba(52,168,83,0.2)] animate-pulse">
                <i className="fa-solid fa-circle-check"></i>
              </div>
              <h3 className="font-display text-[1.4rem] font-bold text-text-light mb-2">Awesome!</h3>
              <p className="text-text-muted text-[0.92rem] max-w-[280px] leading-relaxed m-0">
                {successMsg}
              </p>
            </div>
          ) : (
            <>
              {/* Logo (Shown only on mobile/tablet) */}
              <div className="hidden max-md:flex items-center gap-2 mb-6 justify-center">
                <img src="/asset/GDGlogo.jpeg" alt="GDG Logo" className="h-8 w-8 object-contain rounded-full border border-white/10" />
                <h4 className="font-display text-[0.88rem] font-bold text-text-light m-0">GDG on Campus</h4>
              </div>

              {/* Header Title (Dynamic depending on active tab) */}
              <div className="mb-7.5 text-center">
                <h2 className="font-display text-[1.6rem] font-bold text-text-light mb-1 mt-0">
                  {activeTab === 'login' ? 'Welcome Back' : 'Join Chapter'}
                </h2>
                <p className="text-text-muted text-[0.82rem] m-0">
                  {activeTab === 'login' 
                    ? 'Sign in to your GDG IIT Bhilai account' 
                    : 'Create your official developer profile'}
                </p>
              </div>

              {/* Form Tab Toggles */}
              <div className="relative flex p-1 bg-white/3 border border-white/6 rounded-2xl mb-6">
                  <button 
                    onClick={() => setActiveTab('login')} 
                    className={`flex-1 py-2 text-[0.85rem] font-semibold rounded-xl cursor-pointer transition-all duration-200 focus:outline-none border-0 ${
                      activeTab === 'login' 
                        ? 'bg-goog-blue text-white shadow-md' 
                        : 'bg-transparent text-text-muted hover:text-text-light'
                    }`}
                    type="button"
                  >
                    Sign In
                  </button>
                  <button 
                    onClick={() => setActiveTab('register')} 
                    className={`flex-1 py-2 text-[0.85rem] font-semibold rounded-xl cursor-pointer transition-all duration-200 focus:outline-none border-0 ${
                      activeTab === 'register' 
                        ? 'bg-goog-blue text-white shadow-md' 
                        : 'bg-transparent text-text-muted hover:text-text-light'
                    }`}
                    type="button"
                  >
                    Register
                  </button>
                </div>
              )}

              {/* ================= SIGN IN TAB ================= */}
              {activeTab === 'login' && (
                <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4 text-left">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.75rem] font-semibold text-text-muted uppercase tracking-wider">IIT Bhilai Email</label>
                    <div className="relative flex items-center">
                      <i className="fa-regular fa-envelope absolute left-4 text-white/35 text-[0.95rem]"></i>
                      <input 
                        type="email" 
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="username@iitbhilai.ac.in" 
                        className={`w-full bg-white/4 border rounded-xl py-3.5 pr-4 pl-12 text-white font-sans text-[0.92rem] outline-none transition-all duration-300 focus:bg-white/7 ${
                          errors.loginEmail ? 'border-goog-red focus:border-goog-red' : 'border-white/8 focus:border-goog-blue focus:shadow-[0_0_0_3px_rgba(66,133,244,0.12)]'
                        }`} 
                        required 
                      />
                    </div>
                    {errors.loginEmail && (
                      <span className="text-goog-red text-[0.72rem] mt-0.5">{errors.loginEmail}</span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-[0.75rem] font-semibold text-text-muted uppercase tracking-wider">Password</label>
                    </div>
                    <div className="relative flex items-center">
                      <i className="fa-solid fa-lock absolute left-4 text-white/35 text-[0.95rem]"></i>
                      <input 
                        type={showPassword ? "text" : "password"}
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="••••••••" 
                        className="w-full bg-white/4 border border-white/8 rounded-xl py-3.5 pr-11 pl-12 text-white font-sans text-[0.92rem] outline-none transition-all duration-300 focus:bg-white/7 focus:border-goog-blue focus:shadow-[0_0_0_3px_rgba(66,133,244,0.12)]" 
                        required 
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 bg-transparent border-0 text-white/35 cursor-pointer hover:text-text-light focus:outline-none"
                      >
                        <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-[0.8rem] mt-1">
                    <label className="text-text-muted cursor-pointer flex items-center gap-2 select-none">
                      <input 
                        type="checkbox" 
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="accent-goog-blue rounded border-white/10" 
                      /> 
                      Remember me
                    </label>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-goog-blue text-white border-0 rounded-xl p-3.5 text-[0.9rem] font-bold cursor-pointer mt-3.5 transition-all duration-200 hover:bg-[#357ae8] hover:-translate-y-[1px] shadow-lg shadow-goog-blue/15 hover:shadow-goog-blue/22 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <i className="fa-solid fa-spinner animate-spin"></i> Authenticating...
                      </>
                    ) : (
                      <>Sign In</>
                    )}
                  </button>
                </form>
              )}

              {/* ================= REGISTER TAB ================= */}
              {activeTab === 'register' && (
                <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-4 text-left max-h-[460px] overflow-y-auto pr-1">
                  
                  {/* Name field */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.75rem] font-semibold text-text-muted uppercase tracking-wider">Full Name</label>
                    <div className="relative flex items-center">
                      <i className="fa-regular fa-user absolute left-4 text-white/35 text-[0.95rem]"></i>
                      <input 
                        type="text" 
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        placeholder="John Doe" 
                        className={`w-full bg-white/4 border rounded-xl py-3.5 pr-4 pl-12 text-white font-sans text-[0.92rem] outline-none transition-all duration-300 focus:bg-white/7 ${
                          errors.regName ? 'border-goog-red focus:border-goog-red' : 'border-white/8 focus:border-goog-blue'
                        }`}
                        required 
                      />
                    </div>
                  </div>

                  {/* IITB Email field */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.75rem] font-semibold text-text-muted uppercase tracking-wider">IIT Bhilai Email</label>
                    <div className="relative flex items-center">
                      <i className="fa-regular fa-envelope absolute left-4 text-white/35 text-[0.95rem]"></i>
                      <input 
                        type="email" 
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="john.doe@iitbhilai.ac.in" 
                        className={`w-full bg-white/4 border rounded-xl py-3.5 pr-4 pl-12 text-white font-sans text-[0.92rem] outline-none transition-all duration-300 focus:bg-white/7 ${
                          errors.regEmail ? 'border-goog-red focus:border-goog-red' : 'border-white/8 focus:border-goog-blue'
                        }`}
                        required 
                      />
                    </div>
                    {regEmail && !isIITBEmail(regEmail) && (
                      <span className="text-goog-yellow text-[0.7rem] mt-0.5">Note: Requires official @iitbhilai.ac.in address</span>
                    )}
                    {errors.regEmail && (
                      <span className="text-goog-red text-[0.72rem] mt-0.5">{errors.regEmail}</span>
                    )}
                  </div>

                  {/* Batch Selector & Role */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.75rem] font-semibold text-text-muted uppercase tracking-wider">Batch / Year</label>
                    <div className="relative flex items-center">
                      <i className="fa-solid fa-graduation-cap absolute left-4 text-white/35 text-[0.95rem] z-10 pointer-events-none"></i>
                      <select 
                        value={regBatch}
                        onChange={(e) => setRegBatch(e.target.value)}
                        className="w-full bg-[#161922] border border-white/8 rounded-xl py-3.5 pr-4 pl-12 text-white font-sans text-[0.92rem] outline-none cursor-pointer focus:border-goog-blue transition-colors duration-200 appearance-none"
                      >
                        <option value="B.Tech 1st Year">B.Tech 1st Year</option>
                        <option value="B.Tech 2nd Year">B.Tech 2nd Year</option>
                        <option value="B.Tech 3rd Year">B.Tech 3rd Year</option>
                        <option value="B.Tech 4th Year">B.Tech 4th Year</option>
                        <option value="M.Tech / PhD">M.Tech / PhD</option>
                        <option value="Faculty / Staff">Faculty / Staff</option>
                      </select>
                      <i className="fa-solid fa-chevron-down absolute right-4 text-white/35 text-[0.8rem] pointer-events-none"></i>
                    </div>
                  </div>

                  {/* Tech Tracks Pills */}
                  <div className="flex flex-col gap-2 my-1">
                    <label className="text-[0.75rem] font-semibold text-text-muted uppercase tracking-wider">Interests / Tracks</label>
                    <div className="flex flex-wrap gap-1.5">
                      {['AI / ML', 'Web Dev', 'App Dev', 'Cloud / DevOps'].map((interest, idx) => {
                        const colors = [
                          'goog-blue/10 border-goog-blue/20 text-goog-blue bg-goog-blue/20',
                          'goog-red/10 border-goog-red/20 text-goog-red bg-goog-red/20',
                          'goog-yellow/10 border-goog-yellow/20 text-goog-yellow bg-goog-yellow/20',
                          'goog-green/10 border-goog-green/20 text-goog-green bg-goog-green/20'
                        ];
                        const isSelected = selectedInterests.includes(interest);
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => toggleInterest(interest)}
                            className={`px-3 py-1.5 rounded-lg text-[0.72rem] font-medium border transition-all duration-200 cursor-pointer ${
                              isSelected 
                                ? colors[idx % 4] + ' border-transparent' 
                                : 'bg-white/3 border-white/6 text-text-muted hover:border-white/12 hover:text-text-light'
                            }`}
                          >
                            {isSelected ? '✓ ' : ''}{interest}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Password field */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.75rem] font-semibold text-text-muted uppercase tracking-wider">Password</label>
                    <div className="relative flex items-center">
                      <i className="fa-solid fa-lock absolute left-4 text-white/35 text-[0.95rem]"></i>
                      <input 
                        type={showPassword ? "text" : "password"}
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        placeholder="Min. 8 characters" 
                        className={`w-full bg-white/4 border rounded-xl py-3.5 pr-11 pl-12 text-white font-sans text-[0.92rem] outline-none transition-all duration-300 focus:bg-white/7 ${
                          errors.regPassword ? 'border-goog-red' : 'border-white/8 focus:border-goog-blue'
                        }`}
                        required 
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 bg-transparent border-0 text-white/35 cursor-pointer hover:text-text-light focus:outline-none"
                      >
                        <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                      </button>
                    </div>
                    
                    {/* Real-time strength display */}
                    {regPassword && (
                      <div className="flex flex-col gap-1 mt-1">
                        <div className="flex justify-between text-[0.68rem]">
                          <span className="text-text-muted">Password strength:</span>
                          <span className={`${pwdStrength.textColor} font-bold`}>{pwdStrength.text}</span>
                        </div>
                        <div className="w-full bg-white/8 h-1 rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-300 ${pwdStrength.color}`} 
                            style={{ width: `${(pwdStrength.score / 4) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Confirm Password field */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.75rem] font-semibold text-text-muted uppercase tracking-wider">Confirm Password</label>
                    <div className="relative flex items-center">
                      <i className="fa-solid fa-lock absolute left-4 text-white/35 text-[0.95rem]"></i>
                      <input 
                        type="password"
                        value={regConfirmPassword}
                        onChange={(e) => setRegConfirmPassword(e.target.value)}
                        placeholder="••••••••" 
                        className={`w-full bg-white/4 border rounded-xl py-3.5 pr-4 pl-12 text-white font-sans text-[0.92rem] outline-none transition-all duration-300 focus:bg-white/7 ${
                          errors.regConfirmPassword ? 'border-goog-red' : 'border-white/8 focus:border-goog-blue'
                        }`}
                        required 
                      />
                    </div>
                    {errors.regConfirmPassword && (
                      <span className="text-goog-red text-[0.72rem] mt-0.5">{errors.regConfirmPassword}</span>
                    )}
                  </div>

                  {/* Terms checkbox */}
                  <div className="flex items-start gap-2.5 mt-1 select-none">
                    <input 
                      type="checkbox" 
                      id="terms" 
                      className="accent-goog-blue mt-0.5" 
                      required 
                    />
                    <label htmlFor="terms" className="text-text-muted text-[0.75rem] leading-normal cursor-pointer">
                      I agree to join the official developer list and represent GDG IIT Bhilai responsibly on campus.
                    </label>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-goog-blue text-white border-0 rounded-xl p-3.5 text-[0.9rem] font-bold cursor-pointer mt-3 transition-all duration-200 hover:bg-[#357ae8] hover:-translate-y-[1px] shadow-lg shadow-goog-blue/15 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <i className="fa-solid fa-spinner animate-spin"></i> Creating Profile...
                      </>
                    ) : (
                      <>Register & Join</>
                    )}
                  </button>
                </form>
              )}


            </>
          )}

        </div>

      </div>
    </div>
  );
};

export default LoginModal;
