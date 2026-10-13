import React from 'react';
import { PROFILE } from '../../config/profile';
import { Code2, ArrowUp } from 'lucide-react';
import { Github, Linkedin, Instagram, Facebook } from '../ui/Icons';

export const Footer = () => {
  const hasGitHub = Boolean(PROFILE.socials?.github || PROFILE.githubUsername);
  const hasLinkedIn = Boolean(PROFILE.socials?.linkedin);
  const hasInstagram = Boolean(PROFILE.socials?.instagram);
  const hasFacebook = Boolean(PROFILE.socials?.facebook);
  const githubUrl = PROFILE.socials?.github || (PROFILE.githubUsername ? `https://github.com/${PROFILE.githubUsername}` : '');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 light:bg-slate-100/90 border-t border-slate-800 light:border-slate-200 text-slate-400 light:text-slate-600 py-12 relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center justify-between pb-8 border-b border-slate-800/80 light:border-slate-200">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 p-[1px]">
                <div className="w-full h-full bg-slate-950 light:bg-white rounded-[11px] flex items-center justify-center text-cyan-400 light:text-indigo-600">
                  <Code2 className="w-4 h-4" />
                </div>
              </div>
              <span className="font-heading font-extrabold text-lg text-slate-100 light:text-slate-900 tracking-wider">
                {PROFILE.name}
              </span>
            </div>

            <p className="text-xs text-slate-400 light:text-slate-600 max-w-sm font-mono font-medium">
              {PROFILE.title}
            </p>
          </div>

          {/* Nav Links */}
          <div className="md:col-span-5 flex flex-wrap items-center gap-4 text-xs font-medium">
            <a href="#home" className="hover:text-cyan-400 light:hover:text-indigo-600 light:text-slate-700 transition-colors">Home</a>
            <a href="#about" className="hover:text-cyan-400 light:hover:text-indigo-600 light:text-slate-700 transition-colors">About</a>
            <a href="#skills" className="hover:text-cyan-400 light:hover:text-indigo-600 light:text-slate-700 transition-colors">Tech Stack</a>
            <a href="#projects" className="hover:text-cyan-400 light:hover:text-indigo-600 light:text-slate-700 transition-colors">Projects</a>
            <a href="#experience" className="hover:text-cyan-400 light:hover:text-indigo-600 light:text-slate-700 transition-colors">Experience</a>
            <a href="#contact" className="hover:text-cyan-400 light:hover:text-indigo-600 light:text-slate-700 transition-colors">Contact</a>
          </div>

          {/* Socials & Back to Top */}
          <div className="md:col-span-2 flex items-center justify-start md:justify-end gap-3">
            {hasGitHub && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="p-2 rounded-xl bg-slate-900 light:bg-white border border-slate-800 light:border-slate-200 text-slate-400 light:text-slate-700 hover:text-white light:hover:text-indigo-600 hover:border-slate-700 transition-colors shadow-sm"
              >
                <Github className="w-4 h-4" />
              </a>
            )}

            {hasLinkedIn && (
              <a
                href={PROFILE.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="p-2 rounded-xl bg-slate-900 light:bg-white border border-slate-800 light:border-slate-200 text-slate-400 light:text-slate-700 hover:text-cyan-400 light:hover:text-indigo-600 hover:border-slate-700 transition-colors shadow-sm"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}

            {hasInstagram && (
              <a
                href={PROFILE.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Profile"
                className="p-2 rounded-xl bg-slate-900 light:bg-white border border-slate-800 light:border-slate-200 text-slate-400 light:text-slate-700 hover:text-pink-400 hover:border-pink-500/30 transition-colors shadow-sm"
              >
                <Instagram className="w-4 h-4" />
              </a>
            )}

            {hasFacebook && (
              <a
                href={PROFILE.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Profile"
                className="p-2 rounded-xl bg-slate-900 light:bg-white border border-slate-800 light:border-slate-200 text-slate-400 light:text-slate-700 hover:text-blue-400 hover:border-blue-500/30 transition-colors shadow-sm"
              >
                <Facebook className="w-4 h-4" />
              </a>
            )}

            <button
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="p-2 rounded-xl bg-slate-900 light:bg-white border border-slate-800 light:border-slate-200 text-cyan-400 light:text-indigo-600 hover:text-cyan-300 light:hover:text-indigo-700 transition-colors ml-2 shadow-sm"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 light:text-slate-600 font-mono gap-2">
          <div>
            © 2026 {PROFILE.name}. Built with code, not templates.
          </div>

          <div>
            Software Developer
          </div>
        </div>

      </div>
    </footer>
  );
};
