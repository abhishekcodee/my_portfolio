import React, { useState, useEffect } from 'react';
import { PROFILE } from '../../config/profile';
import { ThemeToggle } from './ThemeToggle';
import { Menu, X, Code2 } from 'lucide-react';
import { Github, Linkedin } from '../ui/Icons';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Journey', href: '#experience' },
  { name: 'Resume', href: '#resume' },
  { name: 'Contact', href: '#contact' },
  { name: 'Dashboard', href: '#/dashboard' },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const hasGitHub = Boolean(PROFILE.socials?.github || PROFILE.githubUsername);
  const hasLinkedIn = Boolean(PROFILE.socials?.linkedin);
  const githubUrl = PROFILE.socials?.github || (PROFILE.githubUsername ? `https://github.com/${PROFILE.githubUsername}` : '');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = NAV_LINKS.map(link => link.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/80 dark:bg-slate-950/85 light:bg-white/85 backdrop-blur-md border-b border-slate-800/80 light:border-slate-200/80 shadow-lg py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-2.5 group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-cyan-500 to-teal-400 p-[1px] shadow-md group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-slate-950 light:bg-white rounded-[11px] flex items-center justify-center">
                <Code2 className="w-5 h-5 text-cyan-400 light:text-indigo-600" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-xl tracking-wider text-slate-100 light:text-slate-900 group-hover:text-cyan-400 light:group-hover:text-indigo-600 transition-colors">
                {PROFILE.brandName}
              </span>
              <span className="text-[10px] tracking-widest text-cyan-400 font-mono font-medium -mt-1 uppercase">
                Software Dev
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 light:bg-slate-100/80 p-1.5 rounded-2xl border border-slate-800/80 light:border-slate-200/80 backdrop-blur-sm">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 relative ${
                    isActive
                      ? 'text-cyan-400 light:text-indigo-600 font-semibold'
                      : 'text-slate-400 light:text-slate-600 hover:text-slate-200 light:hover:text-slate-900'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute inset-0 bg-slate-800/80 light:bg-white rounded-xl shadow-sm border border-slate-700/50 light:border-slate-200"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </a>
              );
            })}
          </nav>

          {/* Right Action Icons & Mobile Toggle */}
          <div className="flex items-center gap-3">
            {hasGitHub && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="p-2.5 rounded-xl border border-slate-800 light:border-slate-300 bg-slate-900/50 light:bg-white text-slate-400 light:text-slate-600 hover:text-slate-100 light:hover:text-slate-900 hover:border-slate-700 transition-all duration-200 hidden sm:flex items-center justify-center hover:scale-105"
              >
                <Github className="w-5 h-5" />
              </a>
            )}

            {hasLinkedIn && (
              <a
                href={PROFILE.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                title={`LinkedIn: ${PROFILE.socials.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '').replace(/\/$/, '')}`}
                className="p-2.5 rounded-xl border border-slate-800 light:border-slate-300 bg-slate-900/50 light:bg-white text-slate-400 light:text-slate-600 hover:text-cyan-400 light:hover:text-indigo-600 hover:border-cyan-500/30 transition-all duration-200 hidden sm:flex items-center justify-center hover:scale-105"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            )}

            <ThemeToggle />

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="md:hidden p-2.5 rounded-xl border border-slate-800 light:border-slate-300 bg-slate-900/50 light:bg-white text-slate-300 light:text-slate-700 hover:text-cyan-400"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-slate-950/95 light:bg-white/95 border-b border-slate-800 light:border-slate-200 backdrop-blur-xl px-4 pt-3 pb-6 shadow-2xl"
          >
            <div className="flex flex-col gap-2 pt-2">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-xl text-base font-medium transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-indigo-900/40 to-cyan-900/30 text-cyan-400 light:bg-indigo-50 light:text-indigo-600 font-semibold border border-cyan-500/20'
                        : 'text-slate-300 light:text-slate-700 hover:bg-slate-900 light:hover:bg-slate-100'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}

              {(hasGitHub || hasLinkedIn) && (
                <div className="flex items-center gap-4 pt-4 mt-2 border-t border-slate-800/80 light:border-slate-200">
                  {hasGitHub && (
                    <a
                      href={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-900 light:bg-slate-100 text-slate-200 light:text-slate-800 font-medium text-sm border border-slate-800 light:border-slate-200"
                    >
                      <Github className="w-4 h-4" /> GitHub
                    </a>
                  )}
                  {hasLinkedIn && (
                    <a
                      href={PROFILE.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-900 light:bg-slate-100 text-slate-200 light:text-slate-800 font-medium text-sm border border-slate-800 light:border-slate-200"
                    >
                      <Linkedin className="w-4 h-4 text-cyan-400" /> LinkedIn
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
