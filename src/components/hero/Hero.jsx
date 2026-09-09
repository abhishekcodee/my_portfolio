import React from 'react';
import { PROFILE } from '../../config/profile';
import { DeveloperDashboard } from './DeveloperDashboard';
import { Hero3DCanvas } from '../3d/Hero3DCanvas';
import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';
import { Github, Linkedin } from '../ui/Icons';

export const Hero = () => {
  const hasGitHub = Boolean(PROFILE.socials?.github || PROFILE.githubUsername);
  const hasLinkedIn = Boolean(PROFILE.socials?.linkedin);
  const hasEmail = Boolean(PROFILE.email || PROFILE.socials?.email);
  const githubUrl = PROFILE.socials?.github || (PROFILE.githubUsername ? `https://github.com/${PROFILE.githubUsername}` : '');

  return (
    <section id="home" className="relative pt-28 pb-12 lg:pt-32 lg:pb-16 overflow-hidden">
      {/* Dynamic Background Mesh Grids & Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-indigo-600/10 via-cyan-500/10 to-teal-400/5 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Greeting, Headline, Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Status Badge */}
            {PROFILE.statusBadge && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 light:bg-emerald-50 border border-emerald-500/30 light:border-emerald-200 text-emerald-400 light:text-emerald-700 text-xs font-medium mb-6 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{PROFILE.statusBadge}</span>
              </div>
            )}

            {/* Name & Title */}
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-cyan-400 light:text-indigo-600 tracking-wide mb-1">
              {PROFILE.name}
            </h2>
            <h3 className="text-sm font-mono text-slate-400 light:text-slate-500 uppercase tracking-widest font-semibold mb-4">
              {PROFILE.title}
            </h3>

            {/* Main Tagline */}
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-slate-100 light:text-slate-900 tracking-tight leading-[1.1] mb-6">
              I build software that{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 light:from-indigo-600 light:to-cyan-600 bg-clip-text text-transparent">
                works.
              </span>
            </h1>

            {/* Supporting Subtitle */}
            <p className="text-slate-300 light:text-slate-600 text-base sm:text-lg lg:text-xl leading-relaxed mb-8 max-w-2xl font-sans">
              {PROFILE.subheading}
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-row items-center gap-3 sm:gap-4 mb-10 w-full sm:w-auto">
              <a
                href="#projects"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 sm:gap-2.5 px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-medium text-sm sm:text-base shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all duration-200 focus:outline-none whitespace-nowrap"
              >
                <span>View Work</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 sm:gap-2.5 px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-slate-900/80 light:bg-white text-slate-200 light:text-slate-800 hover:text-white light:hover:text-slate-900 border border-slate-700/80 light:border-slate-300 hover:border-slate-600 light:hover:border-slate-400 font-medium text-sm sm:text-base hover:bg-slate-800/80 transition-all duration-200 backdrop-blur-sm whitespace-nowrap"
              >
                <Mail className="w-4 h-4 text-cyan-400 light:text-indigo-600" />
                <span>Contact Me</span>
              </a>
            </div>

            {/* Secondary Quick Social Links */}
            {(hasGitHub || hasLinkedIn || hasEmail) && (
              <div className="flex items-center gap-6 pt-4 border-t border-slate-800/60 light:border-slate-200/80 w-full">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                  Connect:
                </span>

                {hasGitHub && (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm font-medium text-slate-400 light:text-slate-600 hover:text-cyan-400 light:hover:text-indigo-600 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                )}

                {hasLinkedIn && (
                  <a
                    href={PROFILE.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm font-medium text-slate-400 light:text-slate-600 hover:text-cyan-400 light:hover:text-indigo-600 transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                )}

                {hasEmail && (
                  <a
                    href={PROFILE.socials?.email || `mailto:${PROFILE.email}`}
                    className="flex items-center gap-1.5 text-sm font-medium text-slate-400 light:text-slate-600 hover:text-cyan-400 light:hover:text-indigo-600 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </a>
                )}
              </div>
            )}
          </motion.div>

          {/* Right Column: Interactive Developer Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <Hero3DCanvas />
            <DeveloperDashboard />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
