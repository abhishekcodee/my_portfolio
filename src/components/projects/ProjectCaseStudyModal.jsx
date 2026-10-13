import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, CheckCircle2, ShieldAlert, Cpu, ArrowRight, Terminal, Image as ImageIcon, ZoomIn, Lock } from 'lucide-react';
import { Github } from '../ui/Icons';

export const ProjectCaseStudyModal = ({ project, onClose }) => {
  const [selectedScreenshot, setSelectedScreenshot] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (selectedScreenshot) {
          setSelectedScreenshot(null);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose, selectedScreenshot]);

  if (!project) return null;
  const cs = project.caseStudy || {};
  const hasGithub = Boolean(project.github);
  const hasLiveDemo = Boolean(project.liveDemo);
  const screenshots = project.screenshots || [];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 light:bg-white rounded-3xl border border-slate-700 light:border-slate-300 shadow-2xl overflow-hidden flex flex-col z-10"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 bg-slate-950/90 light:bg-slate-100 border-b border-slate-800 light:border-slate-200">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-indigo-500/10 text-indigo-400 light:text-indigo-600 border border-indigo-500/20">
                CASE STUDY
              </span>
              <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                ID: {project.id}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800/80 light:bg-slate-200 text-slate-400 hover:text-slate-100 light:hover:text-slate-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Content Body */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 text-slate-200 light:text-slate-800">
            
            {/* Project Title & Category */}
            <div>
              <div className="text-xs font-mono text-cyan-400 light:text-indigo-600 uppercase tracking-widest font-semibold mb-2">
                {project.subCategory}
              </div>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-slate-100 light:text-slate-900">
                {project.title}
              </h2>

              {/* Technologies Badges */}
              <div className="flex flex-wrap gap-2 mt-4">
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-xl text-xs font-medium font-mono bg-slate-800/80 light:bg-slate-100 text-cyan-300 light:text-indigo-700 border border-slate-700/60 light:border-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Overview */}
            {cs.overview && (
              <div className="p-5 rounded-2xl bg-slate-950/60 light:bg-slate-50 border border-slate-800 light:border-slate-200">
                <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 light:text-indigo-600 font-bold mb-2">
                  System Overview
                </h3>
                <p className="text-sm text-slate-300 light:text-slate-700 leading-relaxed">
                  {cs.overview}
                </p>
              </div>
            )}

            {/* Problem & Solution Grid */}
            {(cs.problem || cs.solution) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cs.problem && (
                  <div className="p-5 rounded-2xl bg-slate-950/60 light:bg-slate-50 border border-red-500/20 light:border-red-200">
                    <div className="flex items-center gap-2 text-red-400 font-bold text-sm mb-3">
                      <ShieldAlert className="w-4 h-4" /> 01 — Problem
                    </div>
                    <p className="text-sm text-slate-300 light:text-slate-600 leading-relaxed">
                      {cs.problem}
                    </p>
                  </div>
                )}

                {cs.solution && (
                  <div className="p-5 rounded-2xl bg-slate-950/60 light:bg-slate-50 border border-emerald-500/20 light:border-emerald-200">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-3">
                      <CheckCircle2 className="w-4 h-4" /> 02 — Solution
                    </div>
                    <p className="text-sm text-slate-300 light:text-slate-600 leading-relaxed">
                      {cs.solution}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Implemented Features */}
            {cs.features && cs.features.length > 0 && (
              <div>
                <h3 className="font-heading font-extrabold text-xl text-slate-100 light:text-slate-900 mb-4 flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-indigo-400" /> Implemented Modules & Features
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cs.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-slate-950/40 light:bg-slate-50 border border-slate-800 light:border-slate-200"
                    >
                      <h4 className="font-bold text-sm text-slate-200 light:text-slate-800 mb-1 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 light:bg-indigo-600" />
                        {feat.name}
                      </h4>
                      <p className="text-xs text-slate-400 light:text-slate-600 leading-normal">
                        {feat.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Development Process */}
            {cs.development && (
              <div className="p-5 rounded-2xl bg-slate-950/60 light:bg-slate-50 border border-indigo-500/20 light:border-indigo-200">
                <h3 className="text-xs font-mono uppercase tracking-widest text-indigo-400 light:text-indigo-600 font-bold mb-2">
                  Development Process
                </h3>
                <p className="text-sm text-slate-300 light:text-slate-700 leading-relaxed">
                  {cs.development}
                </p>
              </div>
            )}

            {/* Technical Challenges */}
            {cs.challenges && cs.challenges.length > 0 && (
              <div>
                <h3 className="font-heading font-extrabold text-xl text-slate-100 light:text-slate-900 mb-4 flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-amber-400" /> Technical Challenges
                </h3>

                <ul className="space-y-2.5">
                  {cs.challenges.map((chal, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-300 light:text-slate-700 bg-slate-950/30 light:bg-slate-50 p-3 rounded-xl border border-slate-800/60 light:border-slate-200">
                      <ArrowRight className="w-4 h-4 text-cyan-400 light:text-indigo-600 shrink-0 mt-0.5" />
                      <span>{chal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Real Screenshot Gallery Section */}
            <div>
              <h3 className="font-heading font-extrabold text-xl text-slate-100 light:text-slate-900 mb-4 flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-teal-400" /> Application Screenshots
              </h3>

              {screenshots.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {screenshots.map((shot, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedScreenshot(shot)}
                      className="group relative rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden cursor-pointer shadow-lg hover:border-cyan-500/50 transition-all"
                    >
                      <img
                        src={shot.url}
                        alt={shot.caption || `Screenshot ${idx + 1}`}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent flex items-end justify-between p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-xs font-mono text-slate-200 font-medium">{shot.caption}</span>
                        <ZoomIn className="w-4 h-4 text-cyan-400" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-slate-950/40 light:bg-slate-50 border border-dashed border-slate-800 light:border-slate-300 text-center">
                  <ImageIcon className="w-8 h-8 text-slate-500 mx-auto mb-2 opacity-50" />
                  <p className="text-xs text-slate-400 font-mono">
                    Real application screenshots can be added to <code className="text-cyan-400">src/assets/projects/</code> and configured in <code className="text-cyan-400">projects.js</code>.
                  </p>
                </div>
              )}
            </div>

          </div>

          {/* Footer Action Buttons */}
          <div className="flex items-center justify-between px-6 py-4 bg-slate-950/90 light:bg-slate-100 border-t border-slate-800 light:border-slate-200">
            <div className="flex items-center gap-3">
              {hasGithub && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 light:bg-white hover:bg-slate-700 light:hover:bg-slate-200 text-slate-200 light:text-slate-800 text-xs font-medium border border-slate-700 light:border-slate-300 transition-colors"
                >
                  <Github className="w-4 h-4" /> View GitHub Repository
                </a>
              )}

              {hasLiveDemo && (
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-white text-xs font-medium shadow-md hover:shadow-lg transition-all"
                >
                  <ExternalLink className="w-4 h-4" /> Localhost Link
                </a>
              )}

              {!hasGithub && !hasLiveDemo && (
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5" /> Source / Live URL Private
                </span>
              )}
            </div>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors"
            >
              Close Window
            </button>
          </div>
        </motion.div>

        {/* Screenshot Fullscreen Lightbox Modal */}
        {selectedScreenshot && (
          <div
            onClick={() => setSelectedScreenshot(null)}
            className="fixed inset-0 z-60 bg-slate-950/95 flex flex-col items-center justify-center p-4 backdrop-blur-lg"
          >
            <button
              onClick={() => setSelectedScreenshot(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-slate-900 border border-slate-700 text-slate-300 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={selectedScreenshot.url}
              alt={selectedScreenshot.caption}
              className="max-w-full max-h-[85vh] rounded-2xl border border-slate-800 shadow-2xl object-contain"
            />
            {selectedScreenshot.caption && (
              <p className="mt-4 text-sm font-mono text-cyan-300">{selectedScreenshot.caption}</p>
            )}
          </div>
        )}
      </div>
    </AnimatePresence>
  );
};
