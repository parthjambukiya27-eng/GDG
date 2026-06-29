import React, { useState, useEffect } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const AuthPage = ({ currentPath, navigate }) => {
  const isRegister = currentPath === '#/register';
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Form Input States
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const [regName, setRegName] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [selectedInterests, setSelectedInterests] = useState([]);

  // Error States
  const [errors, setErrors] = useState({});

  // Reset forms when switching route/tab
  useEffect(() => {
    setSuccessMsg('');
    setIsSubmitting(false);
    setErrors({});
    setRegUsername('');
  }, [currentPath]);

  // Toggle Interest badge
  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  // Password strength check
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

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  };

  const isValidLoginIdentifier = (identifier) => {
    const trimmed = identifier.trim();
    if (!trimmed) return false;
    if (trimmed.includes('@')) {
      return isValidEmail(trimmed);
    }
    return true;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!isValidLoginIdentifier(loginIdentifier)) {
      newErrors.loginIdentifier = 'Please enter a valid username or email address';
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const identifierTrimmed = loginIdentifier.trim();
      const isEmail = identifierTrimmed.includes('@');
      const requestIdentifier = isEmail ? identifierTrimmed.toLowerCase() : identifierTrimmed;

      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: requestIdentifier, password: loginPassword })
      });
      
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed. Please check your credentials.');
      }

      // Save token and user details in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      setSuccessMsg(`Welcome back, ${data.user.name}! Redirecting...`);
      setTimeout(() => {
        navigate('#/');
      }, 1800);
    } catch (err) {
      setErrors({ form: err.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!regName.trim()) {
      newErrors.regName = 'Name is required';
    }

    if (!regUsername.trim()) {
      newErrors.regUsername = 'Username is required';
    } else if (regUsername.trim().length < 3) {
      newErrors.regUsername = 'Username must be at least 3 characters long';
    } else if (!/^[a-zA-Z0-9_-]+$/.test(regUsername.trim())) {
      newErrors.regUsername = 'Username can only contain letters, numbers, underscores, and hyphens';
    }

    if (!isValidEmail(regEmail)) {
      newErrors.regEmail = 'Please enter a valid email address';
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

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: regName,
          username: regUsername.trim().toLowerCase(),
          email: regEmail.trim().toLowerCase(),
          password: regPassword,
          interests: selectedInterests
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed. Please try again.');
      }

      // Save token and user details in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      setSuccessMsg('Account created successfully! Welcome to the GDG Chapter. Redirecting...');
      setTimeout(() => {
        navigate('#/');
      }, 2000);
    } catch (err) {
      setErrors({ form: err.message });
    } finally {
      setIsSubmitting(false);
    }
  };



  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 max-sm:p-4 relative z-10 select-none animate-[assistantSlideIn_0.35s_ease]">
      {/* Background radial effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-goog-blue/6 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-goog-red/5 blur-[120px] pointer-events-none"></div>

      {/* Main Spacious Auth Container */}
      <div className="bg-[#0b0c10]/92 border border-white/8 w-full max-w-[1000px] min-h-[620px] rounded-[36px] shadow-[0_32px_64px_rgba(0,0,0,0.64)] overflow-hidden grid grid-cols-1 lg:grid-cols-[1.1fr_1.3fr] max-lg:max-w-[520px]">
        
        {/* LEFT COLUMN: GDG Portal Branding Sidebar */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#0f1118] via-[#141722] to-[#0c0d12] border-r border-white/6 flex flex-col justify-between p-12 max-lg:hidden">
          {/* Decorative glows */}
          <div className="absolute top-0 left-0 w-48 h-48 rounded-full bg-goog-blue/8 blur-[80px] pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full bg-goog-green/8 blur-[80px] pointer-events-none"></div>

          {/* Header logo */}
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('#/')}>
            <img src="/asset/GDGlogo.jpeg" alt="GDG Logo" className="h-10 w-10 object-contain rounded-full border border-white/10" />
            <div className="text-left">
              <h3 className="font-display text-[1.05rem] font-bold text-text-light m-0">GDG on Campus</h3>
              <p className="text-[0.7rem] text-text-muted m-0">IIT Bhilai, India</p>
            </div>
          </div>

          {/* Central slogans and stats */}
          <div className="my-auto text-left py-8">
            <span className="px-3.5 py-1.5 rounded-full bg-white/4 border border-white/6 text-goog-blue text-[0.75rem] font-bold tracking-wider uppercase font-mono">
              Student Developer Hub
            </span>
            <h2 className="font-display text-[2.2rem] leading-tight font-extrabold text-white mt-5 mb-4">
              Connect. Learn. <br />Build. Grow.
            </h2>
            <p className="text-text-muted text-[0.92rem] leading-relaxed max-w-[340px] mb-8">
              Join the official Google developer student community on campus. Empower your engineering journey with modern toolsets and direct mentorship.
            </p>

            {/* Micro Highlights */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3.5 text-[0.85rem] text-text-light">
                <div className="w-7 h-7 rounded-lg bg-goog-blue/10 border border-goog-blue/20 flex items-center justify-center text-goog-blue flex-none">
                  <i className="fa-solid fa-code"></i>
                </div>
                <span>Build peer-to-peer open-source projects</span>
              </div>
              <div className="flex items-center gap-3.5 text-[0.85rem] text-text-light">
                <div className="w-7 h-7 rounded-lg bg-goog-red/10 border border-goog-red/20 flex items-center justify-center text-goog-red flex-none">
                  <i className="fa-solid fa-cloud"></i>
                </div>
                <span>Access Cloud Study Jams & GCP Credits</span>
              </div>
              <div className="flex items-center gap-3.5 text-[0.85rem] text-text-light">
                <div className="w-7 h-7 rounded-lg bg-goog-green/10 border border-goog-green/20 flex items-center justify-center text-goog-green flex-none">
                  <i className="fa-solid fa-trophy"></i>
                </div>
                <span>Earn official Google developer profile badges</span>
              </div>
            </div>
          </div>

          {/* Footer branding */}
          <div className="flex items-center justify-between text-[0.75rem] text-text-muted font-mono border-t border-white/6 pt-6">
            <span>IIT BHILAI CHAPTER</span>
            <span className="text-goog-yellow">PORTAL V1.1</span>
          </div>
        </div>

        {/* RIGHT COLUMN: Form Dashboard Card */}
        <div className="p-12 max-sm:p-6 flex flex-col justify-center bg-[#0c0d12]/50 backdrop-blur-md">
          
          {/* Success Notification Screen */}
          {successMsg ? (
            <div className="flex flex-col items-center justify-center text-center animate-[assistantSlideIn_0.3s_ease] py-12">
              <div className="w-18 h-18 rounded-full bg-goog-green/10 border border-goog-green/30 flex items-center justify-center text-goog-green text-4xl mb-6 shadow-[0_0_40px_rgba(52,168,83,0.22)] animate-pulse">
                <i className="fa-solid fa-circle-check"></i>
              </div>
              <h3 className="font-display text-[1.5rem] font-bold text-text-light mb-3">
                {successMsg.includes('reset') || successMsg.includes('sent') ? 'Request Sent' : 'Authentication Success'}
              </h3>
              <p className="text-text-muted text-[0.95rem] max-w-[320px] leading-relaxed m-0">
                {successMsg}
              </p>
            </div>
          ) : (
            <>
              {/* Mobile GDG logo branding header */}
              <div className="hidden max-lg:flex items-center gap-3 mb-8 justify-center">
                <img src="/asset/GDGlogo.jpeg" alt="GDG Logo" className="h-9 w-9 object-contain rounded-full border border-white/10" />
                <h4 className="font-display text-[0.95rem] font-bold text-text-light m-0">GDG on Campus IIT Bhilai</h4>
              </div>

              {/* Title Header */}
              <div className="mb-8 text-center lg:text-left">
                <h2 className="font-display text-[1.8rem] font-extrabold text-text-light mb-2 mt-0">
                  {isRegister ? 'Create Developer Profile' : 'Member Sign In'}
                </h2>
                <p className="text-text-muted text-[0.88rem] m-0">
                  {isRegister 
                    ? 'Register to unlock badges, event RSVP, and project hubs' 
                    : 'Access your Google Developer Groups workspace'}
                </p>
              </div>

              {/* Tab Selector */}
              <div className="relative flex p-1.5 bg-white/3 border border-white/6 rounded-2xl mb-8">
                <button 
                  onClick={() => navigate('#/login')}
                  className={`flex-1 py-2.5 text-[0.88rem] font-bold rounded-xl cursor-pointer transition-all duration-200 focus:outline-none border-0 ${
                    !isRegister 
                      ? 'bg-goog-blue text-white shadow-lg' 
                      : 'bg-transparent text-text-muted hover:text-text-light'
                  }`}
                  type="button"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => navigate('#/register')}
                  className={`flex-1 py-2.5 text-[0.88rem] font-bold rounded-xl cursor-pointer transition-all duration-200 focus:outline-none border-0 ${
                    isRegister 
                      ? 'bg-goog-blue text-white shadow-lg' 
                      : 'bg-transparent text-text-muted hover:text-text-light'
                  }`}
                  type="button"
                >
                  Register
                </button>
              </div>

              {/* ================= LOGIN FORM ================= */}
              {!isRegister && (
                <form onSubmit={handleLoginSubmit} className="flex flex-col gap-5 text-left">
                  {errors.form && (
                    <div className="bg-goog-red/10 border border-goog-red/20 text-goog-red p-3.5 rounded-xl text-[0.85rem] font-medium flex items-center gap-2 mb-2">
                      <i className="fa-solid fa-circle-exclamation"></i>
                      {errors.form}
                    </div>
                  )}
                      <div className="flex flex-col gap-2">
                    <label className="text-[0.75rem] font-semibold text-text-muted uppercase tracking-wider">Username or Email</label>
                    <div className="relative flex items-center">
                      <i className="fa-regular fa-envelope absolute left-4 text-white/35 text-[1rem]"></i>
                      <input 
                        type="text" 
                        value={loginIdentifier}
                        onChange={(e) => setLoginIdentifier(e.target.value)}
                        placeholder="your username or email" 
                        className={`w-full bg-white/4 border rounded-xl py-3.5 pr-4 pl-12 text-white font-sans text-[0.95rem] outline-none transition-all duration-300 focus:bg-white/7 ${
                          errors.loginIdentifier ? 'border-goog-red focus:border-goog-red' : 'border-white/8 focus:border-goog-blue focus:shadow-[0_0_0_3px_rgba(66,133,244,0.15)]'
                        }`} 
                        required 
                      />
                    </div>
                    {errors.loginIdentifier && (
                      <span className="text-goog-red text-[0.75rem] mt-0.5">{errors.loginIdentifier}</span>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[0.75rem] font-semibold text-text-muted uppercase tracking-wider">Password</label>
                    <div className="relative flex items-center">
                      <i className="fa-solid fa-lock absolute left-4 text-white/35 text-[1rem]"></i>
                      <input 
                        type={showPassword ? "text" : "password"}
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="••••••••" 
                        className="w-full bg-white/4 border border-white/8 rounded-xl py-3.5 pr-12 pl-12 text-white font-sans text-[0.95rem] outline-none transition-all duration-300 focus:bg-white/7 focus:border-goog-blue focus:shadow-[0_0_0_3px_rgba(66,133,244,0.15)]" 
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

                  <div className="flex justify-between items-center text-[0.82rem] mt-1">
                    <label className="text-text-muted cursor-pointer flex items-center gap-2 select-none">
                      <input 
                        type="checkbox" 
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="accent-goog-blue rounded border-white/10 w-4 h-4" 
                      /> 
                      Remember me
                    </label>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-goog-blue text-white border-0 rounded-xl p-4 text-[0.95rem] font-bold cursor-pointer mt-4 transition-all duration-200 hover:bg-[#357ae8] hover:-translate-y-[1px] shadow-lg shadow-goog-blue/20 hover:shadow-goog-blue/28 flex items-center justify-center gap-2"
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

                  {/* ================= REGISTER FORM (Spacious & Detailed) ================= */}
                  {isRegister && (
                    <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-4.5 text-left max-h-[480px] overflow-y-auto pr-1">
                      {errors.form && (
                        <div className="bg-goog-red/10 border border-goog-red/20 text-goog-red p-3.5 rounded-xl text-[0.85rem] font-medium flex items-center gap-2 mb-2">
                          <i className="fa-solid fa-circle-exclamation"></i>
                          {errors.form}
                        </div>
                      )}
                      
                      {/* Name */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[0.75rem] font-semibold text-text-muted uppercase tracking-wider">Full Name</label>
                        <div className="relative flex items-center">
                          <i className="fa-regular fa-user absolute left-4 text-white/35 text-[1rem]"></i>
                          <input 
                            type="text" 
                            value={regName}
                            onChange={(e) => setRegName(e.target.value)}
                            placeholder="John Doe" 
                            className="w-full bg-white/4 border border-white/8 rounded-xl py-3.5 pr-4 pl-12 text-white font-sans text-[0.95rem] outline-none transition-all duration-300 focus:bg-white/7 focus:border-goog-blue"
                            required 
                          />
                        </div>
                      </div>

                      {/* Username */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[0.75rem] font-semibold text-text-muted uppercase tracking-wider">Username</label>
                        <div className="relative flex items-center">
                          <i className="fa-regular fa-at absolute left-4 text-white/35 text-[1rem]"></i>
                          <input 
                            type="text" 
                            value={regUsername}
                            onChange={(e) => setRegUsername(e.target.value)}
                            placeholder="your_username" 
                            className={`w-full bg-white/4 border rounded-xl py-3.5 pr-4 pl-12 text-white font-sans text-[0.95rem] outline-none transition-all duration-300 focus:bg-white/7 ${
                              errors.regUsername ? 'border-goog-red focus:border-goog-red' : 'border-white/8 focus:border-goog-blue'
                            }`}
                            required 
                          />
                        </div>
                        {errors.regUsername && (
                          <span className="text-goog-red text-[0.75rem] mt-0.5">{errors.regUsername}</span>
                        )}
                      </div>

                      {/* Email Address */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[0.75rem] font-semibold text-text-muted uppercase tracking-wider">Email Address</label>
                        <div className="relative flex items-center">
                          <i className="fa-regular fa-envelope absolute left-4 text-white/35 text-[1rem]"></i>
                          <input 
                            type="email" 
                            value={regEmail}
                            onChange={(e) => setRegEmail(e.target.value)}
                            placeholder="your.email@domain.com" 
                            className={`w-full bg-white/4 border rounded-xl py-3.5 pr-4 pl-12 text-white font-sans text-[0.95rem] outline-none transition-all duration-300 focus:bg-white/7 ${
                              errors.regEmail ? 'border-goog-red focus:border-goog-red' : 'border-white/8 focus:border-goog-blue'
                            }`}
                            required 
                          />
                        </div>
                        {errors.regEmail && (
                          <span className="text-goog-red text-[0.75rem] mt-0.5">{errors.regEmail}</span>
                        )}
                      </div>



                      {/* Interests Badges */}
                      <div className="flex flex-col gap-2">
                        <label className="text-[0.75rem] font-semibold text-text-muted uppercase tracking-wider">Tech Interests / Tracks</label>
                        <div className="flex flex-wrap gap-2">
                          {['AI & Machine Learning', 'Web Development', 'Mobile App Dev', 'Cloud & DevOps', 'Cybersecurity'].map((interest, idx) => {
                            const colors = [
                              'goog-blue/10 border-goog-blue/20 text-goog-blue bg-goog-blue/20',
                              'goog-red/10 border-goog-red/20 text-goog-red bg-goog-red/20',
                              'goog-yellow/10 border-goog-yellow/20 text-goog-yellow bg-goog-yellow/20',
                              'goog-green/10 border-goog-green/20 text-goog-green bg-goog-green/20',
                              'goog-blue/10 border-goog-blue/20 text-goog-blue bg-goog-blue/20'
                            ];
                            const isSelected = selectedInterests.includes(interest);
                            return (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => toggleInterest(interest)}
                                className={`px-3 py-1.5 rounded-lg text-[0.75rem] font-medium border transition-all duration-200 cursor-pointer ${
                                  isSelected 
                                    ? colors[idx % 5] + ' border-transparent' 
                                    : 'bg-white/3 border-white/6 text-text-muted hover:border-white/12 hover:text-text-light'
                                }`}
                              >
                                {isSelected ? '✓ ' : ''}{interest}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Password */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[0.75rem] font-semibold text-text-muted uppercase tracking-wider">Password</label>
                        <div className="relative flex items-center">
                          <i className="fa-solid fa-lock absolute left-4 text-white/35 text-[1rem]"></i>
                          <input 
                            type={showPassword ? "text" : "password"}
                            value={regPassword}
                            onChange={(e) => setRegPassword(e.target.value)}
                            placeholder="Minimum 8 characters" 
                            className={`w-full bg-white/4 border rounded-xl py-3.5 pr-12 pl-12 text-white font-sans text-[0.95rem] outline-none transition-all duration-300 focus:bg-white/7 ${
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
                        {regPassword && (
                          <div className="flex flex-col gap-1 mt-1.5">
                            <div className="flex justify-between text-[0.7rem]">
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

                      {/* Confirm Password */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[0.75rem] font-semibold text-text-muted uppercase tracking-wider">Confirm Password</label>
                        <div className="relative flex items-center">
                          <i className="fa-solid fa-lock absolute left-4 text-white/35 text-[1rem]"></i>
                          <input 
                            type="password"
                            value={regConfirmPassword}
                            onChange={(e) => setRegConfirmPassword(e.target.value)}
                            placeholder="••••••••" 
                            className={`w-full bg-white/4 border rounded-xl py-3.5 pr-4 pl-12 text-white font-sans text-[0.95rem] outline-none transition-all duration-300 focus:bg-white/7 ${
                              errors.regConfirmPassword ? 'border-goog-red' : 'border-white/8 focus:border-goog-blue'
                            }`}
                            required 
                          />
                        </div>
                        {errors.regConfirmPassword && (
                          <span className="text-goog-red text-[0.75rem] mt-0.5">{errors.regConfirmPassword}</span>
                        )}
                      </div>

                      {/* Terms */}
                      <div className="flex items-start gap-2.5 mt-2 select-none">
                        <input 
                          type="checkbox" 
                          id="terms" 
                          className="accent-goog-blue mt-0.5 w-4 h-4 flex-none" 
                          required 
                        />
                        <label htmlFor="terms" className="text-text-muted text-[0.78rem] leading-normal cursor-pointer">
                          I certify that the details provided are accurate, and I agree to actively participate and contribute to the developer ecosystem at IIT Bhilai.
                        </label>
                      </div>

                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="bg-goog-blue text-white border-0 rounded-xl p-4 text-[0.95rem] font-bold cursor-pointer mt-3 transition-all duration-200 hover:bg-[#357ae8] hover:-translate-y-[1px] shadow-lg shadow-goog-blue/20 flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <i className="fa-solid fa-spinner animate-spin"></i> Building Profile...
                          </>
                        ) : (
                          <>Create Profile & Join</>
                        )}
                      </button>
                    </form>
                  )}
                </>
              )}

          {/* BACK TO MAIN WEBSITE TRIGGER */}
          {!successMsg && (
            <button 
              onClick={() => navigate('#/')} 
              className="text-text-muted hover:text-white flex items-center justify-center gap-2 mt-6 text-[0.82rem] transition-colors border-0 bg-transparent cursor-pointer font-bold w-fit mx-auto focus:outline-none"
              type="button"
            >
              <i className="fa-solid fa-arrow-left"></i> Back to main website
            </button>
          )}

        </div>

      </div>
    </div>
  );
};

export default AuthPage;
