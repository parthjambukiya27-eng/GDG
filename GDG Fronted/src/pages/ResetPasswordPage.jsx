import React, { useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const ResetPasswordPage = ({ token, navigate }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errors, setErrors] = useState({});

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

  const pwdStrength = getPasswordStrength(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to reset password. The link might have expired.');
      }

      setSuccessMsg('Your password has been successfully reset! Redirecting to login...');
      setTimeout(() => {
        navigate('#/login');
      }, 2500);
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

          {/* Central slogan */}
          <div className="my-auto text-left py-8">
            <span className="px-3.5 py-1.5 rounded-full bg-white/4 border border-white/6 text-goog-blue text-[0.75rem] font-bold tracking-wider uppercase font-mono">
              Secure Account Update
            </span>
            <h2 className="font-display text-[2.2rem] leading-tight font-extrabold text-white mt-5 mb-4">
              Set Your New <br />Password.
            </h2>
            <p className="text-text-muted text-[0.92rem] leading-relaxed max-w-[340px] mb-8">
              Update your credentials securely. Make sure your password contains numbers, letters, and special symbols for maximum security.
            </p>
          </div>

          {/* Footer branding */}
          <div className="flex items-center justify-between text-[0.75rem] text-text-muted font-mono border-t border-white/6 pt-6">
            <span>IIT BHILAI CHAPTER</span>
            <span className="text-goog-yellow">PORTAL V1.1</span>
          </div>
        </div>

        {/* RIGHT COLUMN: Reset Form Card */}
        <div className="p-12 max-sm:p-6 flex flex-col justify-center bg-[#0c0d12]/50 backdrop-blur-md">
          
          {/* Success Notification Screen */}
          {successMsg ? (
            <div className="flex flex-col items-center justify-center text-center animate-[assistantSlideIn_0.3s_ease] py-12">
              <div className="w-18 h-18 rounded-full bg-goog-green/10 border border-goog-green/30 flex items-center justify-center text-goog-green text-4xl mb-6 shadow-[0_0_40px_rgba(52,168,83,0.22)] animate-pulse">
                <i className="fa-solid fa-circle-check"></i>
              </div>
              <h3 className="font-display text-[1.5rem] font-bold text-text-light mb-3">Reset Completed</h3>
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
                  New Password Setup
                </h2>
                <p className="text-text-muted text-[0.88rem] m-0">
                  Please enter your new developer portal password below.
                </p>
              </div>

              {/* Error messages */}
              {errors.form && (
                <div className="bg-goog-red/10 border border-goog-red/20 text-goog-red text-[0.82rem] p-4 rounded-2xl mb-6 text-left flex items-start gap-2.5 animate-[assistantSlideIn_0.2s_ease]">
                  <i className="fa-solid fa-circle-exclamation mt-0.5"></i>
                  <span>{errors.form}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
                
                {/* Password field */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[0.75rem] font-semibold text-text-muted uppercase tracking-wider">New Password</label>
                  <div className="relative flex items-center">
                    <i className="fa-solid fa-lock absolute left-4 text-white/35 text-[1rem]"></i>
                    <input 
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Minimum 8 characters" 
                      className={`w-full bg-white/4 border rounded-xl py-3.5 pr-12 pl-12 text-white font-sans text-[0.95rem] outline-none transition-all duration-300 focus:bg-white/7 ${
                        errors.password ? 'border-goog-red focus:border-goog-red' : 'border-white/8 focus:border-goog-blue'
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
                  {password && (
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
                  {errors.password && (
                    <span className="text-goog-red text-[0.75rem] mt-0.5">{errors.password}</span>
                  )}
                </div>

                {/* Confirm Password field */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[0.75rem] font-semibold text-text-muted uppercase tracking-wider">Confirm Password</label>
                  <div className="relative flex items-center">
                    <i className="fa-solid fa-lock absolute left-4 text-white/35 text-[1rem]"></i>
                    <input 
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••" 
                      className={`w-full bg-white/4 border rounded-xl py-3.5 pr-4 pl-12 text-white font-sans text-[0.95rem] outline-none transition-all duration-300 focus:bg-white/7 ${
                        errors.confirmPassword ? 'border-goog-red focus:border-goog-red' : 'border-white/8 focus:border-goog-blue'
                      }`}
                      required 
                    />
                  </div>
                  {errors.confirmPassword && (
                    <span className="text-goog-red text-[0.75rem] mt-0.5">{errors.confirmPassword}</span>
                  )}
                </div>

                {/* Submit button */}
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-goog-blue hover:bg-[#357ae8] text-white border-0 rounded-xl p-4 text-[0.92rem] font-bold cursor-pointer mt-4 transition-all duration-200 hover:-translate-y-[1px] shadow-lg shadow-goog-blue/20 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <i className="fa-solid fa-spinner animate-spin"></i> Resetting Password...
                    </>
                  ) : (
                    <>Save & Update Password</>
                  )}
                </button>

                {/* Back to sign in */}
                <button 
                  type="button"
                  onClick={() => navigate('#/login')}
                  className="bg-transparent border-0 text-goog-blue text-[0.85rem] font-semibold cursor-pointer hover:underline focus:outline-none mt-2"
                >
                  Back to Sign In
                </button>

              </form>
            </>
          )}

        </div>

      </div>
    </div>
  );
};

export default ResetPasswordPage;
