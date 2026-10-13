import React, { useState } from 'react';
import { useDashboard } from '../../context/useDashboard';
import { sendEmailOTP } from '../../services/dashboardStorage';
import { motion } from 'framer-motion';
import {
  ShieldAlert,
  ArrowRight,
  Sparkles,
  Send,
  CheckCircle2,
  Lock,
} from 'lucide-react';

export const DashboardLogin = () => {
  const { login, signup, loginWithOTP } = useDashboard();
  
  // Modes: 'login', 'signup', 'forgot'
  const [isSignUp, setIsSignUp] = useState(false);
  const [loginMethod, setLoginMethod] = useState('password'); // 'password' or 'otp'

  // Form states
  const [email, setEmail] = useState('abhishek@portfolio.dev');
  const [password, setPassword] = useState('');
  const [rememberMe] = useState(true);

  // OTP state
  const [otpCode, setOtpCode] = useState('');

  // Signup extra states
  const [name, setName] = useState('');
  const [role, setRole] = useState('Full-Stack Software Developer');

  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setIsLoading(true);

    setTimeout(async () => {
      if (isSignUp) {
        if (!name.trim()) {
          setError('Please enter your full name');
          setIsLoading(false);
          return;
        }
        signup(name, email, password, role);
      } else if (loginMethod === 'otp') {
        if (!otpCode.trim() || otpCode.length < 6) {
          setError('Please enter the 6-digit OTP code sent to your email');
          setIsLoading(false);
          return;
        }
        const res = loginWithOTP(email, otpCode);
        if (!res.success) setError(res.error || 'Invalid or expired OTP code');
      } else {
        const res = login(password, email, rememberMe);
        if (!res.success) setError(res.error || 'Invalid password. Default is "abhishek123"');
      }
      setIsLoading(false);
    }, 400);
  };

  // Send OTP Handler
  const handleSendOTP = async () => {
    setError('');
    setSuccessMsg('');
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address first');
      return;
    }
    setIsLoading(true);
    await sendEmailOTP(email);
    setIsLoading(false);
    setSuccessMsg(`🔒 Verification OTP code sent to ${email}. Check your inbox!`);
  };

  // Google Login Simulation
  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      login('abhishek123', 'abhishek@portfolio.dev', true);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-0 lg:p-6 bg-slate-950 light:bg-slate-100 font-sans">
      {/* 50-50 Split Container matching Reference Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-6xl min-h-screen lg:min-h-[640px] bg-white light:bg-white border border-slate-200/80 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 rounded-none lg:rounded-3xl"
      >
        {/* ======================================================== */}
        {/* LEFT HERO PANEL: Deep Royal Blue Gradient with Grain & Lines */}
        {/* ======================================================== */}
        <div className="lg:col-span-6 p-8 sm:p-12 lg:p-14 bg-gradient-to-br from-blue-700 via-indigo-800 to-blue-900 text-white flex flex-col justify-between relative overflow-hidden">
          {/* Decorative Vector Lines & Sparkle Background */}
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-grid-pattern" />
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-cyan-400/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-blue-500/30 blur-3xl pointer-events-none" />

          {/* Top Giant Asterisk Icon */}
          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white text-3xl font-extrabold shadow-inner mb-10">
              ✶
            </div>

            {/* Main Hero Typography */}
            <div className="space-y-4 max-w-lg">
              <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-tight text-white">
                Hello <br />
                <span className="text-cyan-300">Abhishek OS!</span> 👋
              </h1>

              <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed font-sans pt-2">
                Skip repetitive and manual learning tracking. Get highly productive through developer automation, verified certificates & save tons of time!
              </p>
            </div>
          </div>

          {/* Bottom Left Copyright */}
          <div className="relative z-10 pt-12 text-xs font-sans text-blue-200/70">
            © 2026 Abhishek OS. All rights reserved.
          </div>
        </div>

        {/* ======================================================== */}
        {/* RIGHT AUTH FORM PANEL: Clean Minimal White Design */}
        {/* ======================================================== */}
        <div className="lg:col-span-6 p-8 sm:p-12 lg:p-14 bg-white text-slate-900 flex flex-col justify-between relative">
          <div>
            {/* Top Brand Logo */}
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-slate-900 text-white font-extrabold font-heading flex items-center justify-center text-sm shadow-md">
                  A
                </div>
                <span className="font-heading font-extrabold text-xl tracking-tight text-slate-900">
                  Abhishek<span className="text-blue-600">OS</span>
                </span>
              </div>

              <a
                href="#home"
                className="text-xs font-mono text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-1"
              >
                <span>Portfolio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Welcome Heading & Toggle Link */}
            <div className="mb-8">
              <h2 className="font-heading font-black text-2xl sm:text-3xl text-slate-900 tracking-tight mb-2">
                {isSignUp ? 'Create Your Account' : 'Welcome Back!'}
              </h2>

              <p className="text-xs sm:text-sm text-slate-500">
                {isSignUp ? (
                  <>
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => { setIsSignUp(false); setError(''); setSuccessMsg(''); }}
                      className="text-slate-900 font-bold underline hover:text-blue-600 transition-colors cursor-pointer"
                    >
                      Login to existing account
                    </button>
                  </>
                ) : (
                  <>
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => { setIsSignUp(true); setError(''); setSuccessMsg(''); }}
                      className="text-slate-900 font-bold underline hover:text-blue-600 transition-colors cursor-pointer"
                    >
                      Create a new account now
                    </button>
                    , it's FREE! Takes less than a minute.
                  </>
                )}
              </p>
            </div>

            {/* Authentication Method Selector (Password vs Email OTP) */}
            {!isSignUp && (
              <div className="flex items-center gap-4 mb-6 pb-2 border-b border-slate-100 text-xs font-mono">
                <span className="text-slate-400 font-medium">Log in via:</span>
                <button
                  type="button"
                  onClick={() => setLoginMethod('password')}
                  className={`font-bold transition-colors cursor-pointer ${
                    loginMethod === 'password' ? 'text-blue-600 underline' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Password
                </button>
                <span className="text-slate-300">|</span>
                <button
                  type="button"
                  onClick={() => setLoginMethod('otp')}
                  className={`font-bold transition-colors cursor-pointer ${
                    loginMethod === 'otp' ? 'text-blue-600 underline' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Email OTP Code
                </button>
              </div>
            )}

            {/* Error Alert Box */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs flex items-center gap-2 font-medium"
              >
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            {/* Success Alert Box */}
            {successMsg && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2 font-medium"
              >
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>{successMsg}</span>
              </motion.div>
            )}

            {/* 1-Click Instant Demo Button */}
            <button
              type="button"
              onClick={() => login('abhishek123', 'abhishek@portfolio.dev', true)}
              className="w-full mb-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-heading font-extrabold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-cyan-300" />
              <span>Enter Localhost Workspace (Instant 1-Click Access)</span>
            </button>

            {/* Main Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Extra Sign Up Name Input */}
              {isSignUp && (
                <div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full py-3 px-3 border-b-2 border-slate-200 text-slate-900 focus:border-slate-900 focus:outline-none text-sm font-sans placeholder-slate-400 transition-colors bg-transparent"
                  />
                </div>
              )}

              {/* Email Address Underline Input */}
              <div>
                <div className="relative flex items-center">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@email.com"
                    className="w-full py-3 px-3 border-b-2 border-slate-200 text-slate-900 focus:border-slate-900 focus:outline-none text-sm font-sans placeholder-slate-400 transition-colors bg-transparent font-medium"
                  />

                  {!isSignUp && loginMethod === 'otp' && (
                    <button
                      type="button"
                      disabled={isLoading}
                      onClick={handleSendOTP}
                      className="absolute right-0 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-mono font-bold transition-colors cursor-pointer flex items-center gap-1 shadow-sm"
                    >
                      <Send className="w-3 h-3" />
                      <span>{isLoading ? 'Sending...' : 'Send OTP'}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Password or OTP Code Input */}
              {(!isSignUp && loginMethod === 'otp') ? (
                <div>
                  <input
                    type="text"
                    maxLength={6}
                    required
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="Enter 6-digit OTP code"
                    className="w-full py-3 px-3 border-b-2 border-slate-200 text-slate-900 focus:border-slate-900 focus:outline-none text-sm font-mono tracking-widest placeholder-slate-400 transition-colors bg-transparent text-center font-bold"
                  />
                </div>
              ) : (
                <div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={isSignUp ? "Create a password (min 6 chars)" : "Password (default: abhishek123)"}
                    className="w-full py-3 px-3 border-b-2 border-slate-200 text-slate-900 focus:border-slate-900 focus:outline-none text-sm font-sans placeholder-slate-400 transition-colors bg-transparent"
                  />
                </div>
              )}

              {/* Extra Role Input for Sign Up */}
              {isSignUp && (
                <div>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Developer Title / Role"
                    className="w-full py-3 px-3 border-b-2 border-slate-200 text-slate-900 focus:border-slate-900 focus:outline-none text-sm font-sans placeholder-slate-400 transition-colors bg-transparent"
                  />
                </div>
              )}

              {/* Primary Dark Button matching reference image */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-heading font-extrabold text-sm shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 mt-4"
              >
                <span>
                  {isLoading
                    ? 'Authenticating...'
                    : isSignUp
                    ? 'Create Account Now'
                    : loginMethod === 'otp'
                    ? 'Verify OTP & Login'
                    : 'Login Now'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Google Single Sign-On Button */}
            <div className="mt-4 space-y-4">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full py-3 rounded-xl border border-slate-200 hover:border-slate-400 bg-white text-slate-700 font-heading font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2.5 shadow-sm cursor-pointer"
              >
                {/* Official Google SVG Logo */}
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.29v3.15C3.26 21.3 7.31 24 12 24z" />
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.29C.47 8.21 0 10.05 0 12s.47 3.79 1.29 5.42l3.99-3.15z" />
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.58l3.99 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
                </svg>
                <span>Login with Google</span>
              </button>
            </div>
          </div>

          {/* Bottom Password Reset Link */}
          <div className="pt-8 text-center text-xs text-slate-500">
            Forgot password?{' '}
            <button
              type="button"
              onClick={() => setShowForgotModal(true)}
              className="text-slate-900 font-bold underline hover:text-blue-600 cursor-pointer"
            >
              Click here
            </button>
          </div>
        </div>
      </motion.div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-sm p-6 rounded-2xl bg-white text-slate-900 shadow-2xl space-y-4 border border-slate-200"
          >
            <div className="flex items-center gap-2 text-slate-900 font-heading font-extrabold text-lg">
              <Lock className="w-5 h-5 text-blue-600" />
              <span>Reset Security Access</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Owner Account default login email is <strong className="text-slate-900">abhishek@portfolio.dev</strong> and default security password is <strong className="text-slate-900">abhishek123</strong>.
            </p>
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => {
                  setEmail('abhishek@portfolio.dev');
                  setPassword('abhishek123');
                  setShowForgotModal(false);
                }}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Auto-Fill Default Credentials
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
