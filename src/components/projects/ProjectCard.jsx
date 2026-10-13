import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, BookOpen, Sparkles, CheckCircle2, Terminal, Code2, Cpu, Lock, Wrench, ChevronDown, ChevronUp, Layers } from 'lucide-react';
import { Github } from '../ui/Icons';

export const ProjectCard = ({ project, onOpenCaseStudy }) => {
  const [showAllFeatures, setShowAllFeatures] = useState(false);

  const hasGithub = Boolean(project.github);
  const hasLiveDemo = Boolean(project.liveDemo);

  const highlightsToDisplay = showAllFeatures
    ? project.highlights
    : (project.highlights || []).slice(0, 3);

  const hasMoreFeatures = (project.highlights || []).length > 3;

  const getStatusBadge = () => {
    switch (project.status) {
      case 'localhost':
      case 'live':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 light:bg-emerald-50 light:text-emerald-700 border border-emerald-500/30 flex items-center gap-1.5 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Localhost
          </span>
        );
      case 'github':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-cyan-500/10 text-cyan-400 light:bg-cyan-50 light:text-cyan-700 border border-cyan-500/30 flex items-center gap-1.5 shadow-xs">
            <Github className="w-3 h-3" /> Public Repo
          </span>
        );
      case 'in-development':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-amber-500/10 text-amber-400 light:bg-amber-50 light:text-amber-700 border border-amber-500/30 flex items-center gap-1.5 shadow-xs">
            <Wrench className="w-3 h-3" /> In Dev
          </span>
        );
      case 'private':
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-indigo-500/10 text-indigo-400 light:bg-indigo-50 light:text-indigo-700 border border-indigo-500/30 flex items-center gap-1.5 shadow-xs">
            <Lock className="w-3 h-3 text-indigo-400 light:text-indigo-600" /> Private Source
          </span>
        );
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, scale: 1.015, rotateX: 1.5, rotateY: -1.5 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="project-card group relative border-l-2 border-l-cyan-400 sm:border-l-0 sm:border border-slate-800/90 light:border-slate-200/90 rounded-r-2xl sm:rounded-3xl bg-slate-900/40 sm:bg-slate-900/90 light:bg-white hover:border-cyan-500/50 light:hover:border-indigo-500/50 transition-all duration-300 sm:shadow-xl hover:shadow-2xl overflow-hidden flex flex-col justify-between h-full"
    >
      {/* Top Border Accent (Desktop) */}
      <div className="hidden sm:block h-1.5 w-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-teal-400 group-hover:from-cyan-400 group-hover:via-indigo-500 transition-all duration-500" />

      <div className="p-3.5 sm:p-7 flex flex-col justify-between h-full space-y-3.5 sm:space-y-5">
        <div>
          {/* Card Top Category & Badges */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3.5 border-b border-slate-800/60 light:border-slate-200/80">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-cyan-500/10 text-cyan-400 light:bg-indigo-50 light:text-indigo-600 border border-cyan-500/20 light:border-indigo-200">
                {project.category}
              </span>
              <span className="text-[11px] font-mono text-slate-400 light:text-slate-500 flex items-center gap-1">
                <Terminal className="w-3 h-3 text-emerald-400 light:text-emerald-600" />
                {project.subCategory}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              {getStatusBadge()}
              {project.isFlagship && (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-indigo-500/20 text-indigo-300 light:bg-indigo-100 light:text-indigo-700 border border-indigo-500/30 flex items-center gap-1 shadow-xs">
                  <Sparkles className="w-3 h-3 text-indigo-300 light:text-indigo-600" /> Flagship
                </span>
              )}
            </div>
          </div>

          {/* Project Header Title & Icon */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <h3 className="font-heading font-extrabold text-lg sm:text-xl text-slate-100 light:text-slate-900 group-hover:text-cyan-400 light:group-hover:text-indigo-600 transition-colors leading-tight">
              {project.title}
            </h3>

            <div className="w-10 h-10 rounded-2xl bg-slate-950/80 light:bg-indigo-50 border border-slate-800 light:border-indigo-100 flex items-center justify-center text-cyan-400 light:text-indigo-600 shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-xs">
              {project.category === 'IoT' ? (
                <Cpu className="w-5 h-5" />
              ) : (
                <Code2 className="w-5 h-5" />
              )}
            </div>
          </div>

          {/* Project Short Description */}
          <p className="text-xs sm:text-sm text-slate-300 light:text-slate-600 leading-relaxed font-sans mb-4 line-clamp-3">
            {project.shortDescription}
          </p>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="project-tech-pill text-[11px] font-mono px-2.5 py-0.5 rounded-lg bg-slate-950/80 light:bg-slate-100 text-slate-300 light:text-slate-700 border border-slate-800 light:border-slate-200 group-hover:border-cyan-500/30 light:group-hover:border-indigo-300 transition-all duration-200 shadow-xs"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Implemented Features List */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="pt-3.5 border-t border-slate-800/60 light:border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-slate-400 light:text-slate-500 font-semibold mb-1.5">
                <span className="flex items-center gap-1">
                  <Layers className="w-3 h-3 text-cyan-400 light:text-indigo-600" />
                  Key Scope & Features
                </span>
                {hasMoreFeatures && (
                  <button
                    onClick={() => setShowAllFeatures(!showAllFeatures)}
                    className="text-cyan-400 light:text-indigo-600 hover:underline flex items-center gap-0.5 normal-case font-bold"
                  >
                    {showAllFeatures ? (
                      <>Less <ChevronUp className="w-3 h-3" /></>
                    ) : (
                      <>+{project.highlights.length - 3} More <ChevronDown className="w-3 h-3" /></>
                    )}
                  </button>
                )}
              </div>

              <motion.div layout className="space-y-1.5">
                <AnimatePresence initial={false}>
                  {highlightsToDisplay.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-start gap-2 text-xs text-slate-300 light:text-slate-700"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 light:text-indigo-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">{item}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-800/60 light:border-slate-200 flex items-center justify-between gap-2.5">
          <button
            onClick={() => onOpenCaseStudy(project)}
            className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-bold text-xs shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all duration-200 group/btn"
          >
            <BookOpen className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" />
            <span>Explore Case Study</span>
          </button>

          {hasGithub && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              title="View GitHub Repository"
              className="p-2.5 rounded-xl bg-slate-950/80 light:bg-slate-100 text-slate-300 light:text-slate-700 hover:text-white light:hover:text-indigo-600 border border-slate-800 light:border-slate-200 transition-colors shadow-xs"
            >
              <Github className="w-4 h-4" />
            </a>
          )}

          {hasLiveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              title="View Localhost Link"
              className="p-2.5 rounded-xl bg-slate-950/80 light:bg-slate-100 text-slate-300 light:text-slate-700 hover:text-cyan-400 light:hover:text-indigo-600 border border-slate-800 light:border-slate-200 transition-colors shadow-xs"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};
