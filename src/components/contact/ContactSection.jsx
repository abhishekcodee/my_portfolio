import React, { useState } from 'react';
import { PROFILE } from '../../config/profile';
import { Toast } from '../ui/Toast';
import { motion } from 'framer-motion';
import { Mail, Send, Copy, Check, User, AtSign } from 'lucide-react';
import { Github, Linkedin, Instagram, Facebook } from '../ui/Icons';

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'success' });
  const [copiedEmail, setCopiedEmail] = useState(false);

  const hasEmail = Boolean(PROFILE.email);
  const hasGitHub = Boolean(PROFILE.socials?.github || PROFILE.githubUsername);
  const hasLinkedIn = Boolean(PROFILE.socials?.linkedin);
  const hasInstagram = Boolean(PROFILE.socials?.instagram);
  const hasFacebook = Boolean(PROFILE.socials?.facebook);
  const githubUrl = PROFILE.socials?.github || (PROFILE.githubUsername ? `https://github.com/${PROFILE.githubUsername}` : '');

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please enter your full name.';
    if (!formData.email.trim()) {
      errs.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.subject.trim()) errs.subject = 'Please enter a subject.';
    if (!formData.message.trim()) errs.message = 'Please enter your message.';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);

    const recipientEmail = PROFILE.email || 'amanupadhyay2030@gmail.com';
    const mailtoUrl = `mailto:${recipientEmail}?subject=${encodeURIComponent(
      `[Portfolio Inquiry] ${formData.subject}`
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nSender Email: ${formData.email}\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}`
    )}`;

    window.location.href = mailtoUrl;

    setTimeout(() => {
      setIsSubmitting(false);
      setToast({
        message: `Thank you, ${formData.name}! Your message has been directed to ${recipientEmail}.`,
        type: 'success',
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1000);
  };

  const copyEmailToClipboard = () => {
    if (!PROFILE.email) return;
    navigator.clipboard.writeText(PROFILE.email);
    setCopiedEmail(true);
    setToast({ message: 'Email address copied to clipboard!', type: 'success' });
    setTimeout(() => setCopiedEmail(false), 3000);
  };

  return (
    <section id="contact" className="py-16 lg:py-24 relative overflow-hidden bg-dot-pattern">
      {/* Background Ambient Glow Orb */}
      <div className="absolute bottom-10 -left-40 w-96 h-96 rounded-full bg-cyan-500/10 light:bg-blue-200/50 blur-3xl pointer-events-none animate-pulse-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 light:text-indigo-600 text-xs font-mono font-semibold mb-3 border border-cyan-500/20">
            <Mail className="w-3.5 h-3.5" />
            <span>CONTACT</span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-100 light:text-slate-900 tracking-tight">
            Have something to build?{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 light:from-indigo-600 light:to-cyan-600 bg-clip-text text-transparent">
              Let's talk.
            </span>
          </h2>

          <p className="text-slate-300 light:text-slate-600 text-base sm:text-lg mt-4 font-sans">
            I'm open to interesting projects, collaborations, and opportunities.
          </p>
        </motion.div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Contact Methods & Social Links */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="p-4 sm:p-8 border-l-2 border-l-cyan-400 sm:border-l-0 sm:border border-slate-800 light:border-slate-200 rounded-r-2xl sm:rounded-3xl bg-slate-900/40 sm:bg-slate-900/80 light:bg-white sm:shadow-2xl backdrop-blur-xl space-y-5 sm:space-y-6">
              <h3 className="font-heading font-extrabold text-lg sm:text-xl text-slate-100 light:text-slate-900">
                Direct Contact
              </h3>

              {/* Email Card */}
              {hasEmail && (
                <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-950/60 light:bg-slate-50 border border-slate-800 light:border-slate-200 flex items-center justify-between gap-2 shadow-sm">
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                    <div className="p-2 sm:p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 light:bg-indigo-50 light:text-indigo-600 shrink-0">
                      <Mail className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[11px] sm:text-xs text-slate-400 light:text-slate-500 font-mono block">Email</span>
                      <span className="text-xs sm:text-sm font-semibold text-slate-200 light:text-slate-900 truncate block">
                        {PROFILE.email}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={copyEmailToClipboard}
                    title="Copy Email"
                    className="p-2 rounded-xl bg-slate-800 light:bg-slate-200 hover:bg-slate-700 light:hover:bg-slate-300 text-slate-300 light:text-slate-700 transition-colors border border-slate-700 light:border-slate-300 shrink-0"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              )}

              {/* Quick Links Row: GitHub · LinkedIn · Email */}
              <div className="pt-1 sm:pt-2">
                <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-slate-400 light:text-slate-600 font-semibold block mb-2.5 sm:mb-3">
                  Links:
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3">
                  {hasGitHub && (
                    <a
                      href={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center gap-1 sm:gap-1.5 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-slate-950/80 light:bg-slate-50 hover:bg-slate-800 light:hover:bg-slate-100 text-slate-200 light:text-slate-800 font-medium text-xs border border-slate-800 light:border-slate-200 transition-all shadow-sm group"
                    >
                      <Github className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-hover:text-cyan-400" />
                      <span className="text-[11px] sm:text-xs">GitHub</span>
                    </a>
                  )}

                  {hasLinkedIn && (
                    <a
                      href={PROFILE.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center gap-1 sm:gap-1.5 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-slate-950/80 light:bg-slate-50 hover:bg-slate-800 light:hover:bg-slate-100 text-slate-200 light:text-slate-800 font-medium text-xs border border-slate-800 light:border-slate-200 transition-all shadow-sm group"
                    >
                      <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 group-hover:text-indigo-600" />
                      <span className="text-[11px] sm:text-xs">LinkedIn</span>
                    </a>
                  )}

                  {hasInstagram && (
                    <a
                      href={PROFILE.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center gap-1 sm:gap-1.5 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-slate-950/80 light:bg-slate-50 hover:bg-slate-800 light:hover:bg-slate-100 text-slate-200 light:text-slate-800 font-medium text-xs border border-slate-800 light:border-slate-200 transition-all shadow-sm group"
                    >
                      <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400 group-hover:text-pink-300" />
                      <span className="text-[11px] sm:text-xs">Instagram</span>
                    </a>
                  )}

                  {hasFacebook && (
                    <a
                      href={PROFILE.socials.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center gap-1 sm:gap-1.5 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-slate-950/80 light:bg-slate-50 hover:bg-slate-800 light:hover:bg-slate-100 text-slate-200 light:text-slate-800 font-medium text-xs border border-slate-800 light:border-slate-200 transition-all shadow-sm group"
                    >
                      <Facebook className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 group-hover:text-blue-300" />
                      <span className="text-[11px] sm:text-xs">Facebook</span>
                    </a>
                  )}

                  {hasEmail && (
                    <a
                      href={`mailto:${PROFILE.email}`}
                      className="flex flex-col items-center justify-center gap-1 sm:gap-1.5 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-slate-950/80 light:bg-slate-50 hover:bg-slate-800 light:hover:bg-slate-100 text-slate-200 light:text-slate-800 font-medium text-xs border border-slate-800 light:border-slate-200 transition-all shadow-sm group"
                    >
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-teal-400 group-hover:text-emerald-500" />
                      <span className="text-[11px] sm:text-xs">Email</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Direct Message Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <form
              onSubmit={handleSubmit}
              className="p-4 sm:p-8 border-l-2 border-l-indigo-400 sm:border-l-0 sm:border border-slate-800 light:border-slate-200 rounded-r-2xl sm:rounded-3xl bg-slate-900/40 sm:bg-slate-900/80 light:bg-white sm:shadow-2xl backdrop-blur-xl space-y-4 sm:space-y-5"
            >
              <h3 className="font-heading font-extrabold text-xl text-slate-100 light:text-slate-900 mb-2">
                Send a Message
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono text-slate-300 light:text-slate-700 font-semibold mb-2">
                    Your Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your Name"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950/80 light:bg-slate-50 border text-sm text-slate-100 light:text-slate-900 placeholder-slate-500 light:placeholder-slate-400 focus:outline-none transition-colors ${
                        errors.name ? 'border-red-500/80' : 'border-slate-800 light:border-slate-300 focus:border-cyan-500 light:focus:border-indigo-600'
                      }`}
                    />
                  </div>
                  {errors.name && <p className="text-xs text-red-400 mt-1 font-mono">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 light:text-slate-700 font-semibold mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <AtSign className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your.email@example.com"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950/80 light:bg-slate-50 border text-sm text-slate-100 light:text-slate-900 placeholder-slate-500 light:placeholder-slate-400 focus:outline-none transition-colors ${
                        errors.email ? 'border-red-500/80' : 'border-slate-800 light:border-slate-300 focus:border-cyan-500 light:focus:border-indigo-600'
                      }`}
                    />
                  </div>
                  {errors.email && <p className="text-xs text-red-400 mt-1 font-mono">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 light:text-slate-700 font-semibold mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Project Inquiry / Collaboration"
                  className={`w-full px-4 py-3 rounded-xl bg-slate-950/80 light:bg-slate-50 border text-sm text-slate-100 light:text-slate-900 placeholder-slate-500 light:placeholder-slate-400 focus:outline-none transition-colors ${
                    errors.subject ? 'border-red-500/80' : 'border-slate-800 light:border-slate-300 focus:border-cyan-500 light:focus:border-indigo-600'
                  }`}
                />
                {errors.subject && <p className="text-xs text-red-400 mt-1 font-mono">{errors.subject}</p>}
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 light:text-slate-700 font-semibold mb-2">
                  Message *
                </label>
                <textarea
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Hi Abhishek, I'd like to talk about..."
                  className={`w-full px-4 py-3 rounded-xl bg-slate-950/80 light:bg-slate-50 border text-sm text-slate-100 light:text-slate-900 placeholder-slate-500 light:placeholder-slate-400 focus:outline-none transition-colors resize-none ${
                    errors.message ? 'border-red-500/80' : 'border-slate-800 light:border-slate-300 focus:border-cyan-500 light:focus:border-indigo-600'
                  }`}
                />
                {errors.message && <p className="text-xs text-red-400 mt-1 font-mono">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 transition-all duration-200 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>

        </div>

        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ message: '', type: 'success' })}
        />

      </div>
    </section>
  );
};
