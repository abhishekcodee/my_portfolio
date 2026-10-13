import React from 'react';
import { PROFILE } from '../../config/profile';
import { PROJECTS_DATA } from '../../data/projects';
import { SKILLS_CATEGORIES } from '../../data/skills';
import { CERTIFICATIONS } from '../../data/certifications';
import { motion } from 'framer-motion';
import { Download, Printer, FileText, Mail, MapPin, Globe } from 'lucide-react';
import { Linkedin } from '../ui/Icons';

export const ResumeSection = () => {
  const hasResumeFile = Boolean(PROFILE.resume);

  const handleDownloadResume = () => {
    if (PROFILE.resume) {
      const link = document.createElement('a');
      link.href = PROFILE.resume;
      link.download = `${PROFILE.name.replace(/\s+/g, '_')}_Resume.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.print();
    }
  };

  return (
    <section id="resume" className="py-20 lg:py-28 relative overflow-hidden bg-slate-950/40 light:bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 light:text-indigo-600 text-xs font-mono font-semibold mb-3 border border-indigo-500/20">
            <FileText className="w-3.5 h-3.5" />
            <span>TECHNICAL RESUME</span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-100 light:text-slate-900 tracking-tight">
            Resume &{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 light:from-indigo-600 light:to-cyan-600 bg-clip-text text-transparent">
              Summary.
            </span>
          </h2>

          <p className="text-slate-400 light:text-slate-600 text-base sm:text-lg mt-4 font-sans">
            Technical profile and verified project summary for Abhishek Upadhyay.
          </p>

          <div className="flex items-center justify-center gap-4 mt-6">
            {/* Download Resume button rendered ONLY when real resume file URL/path is configured */}
            {hasResumeFile && (
              <button
                onClick={handleDownloadResume}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-medium text-sm shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-200"
              >
                <Download className="w-4 h-4" /> Download Resume (PDF)
              </button>
            )}

            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 light:bg-white text-slate-300 light:text-slate-700 hover:text-slate-100 light:hover:text-slate-900 border border-slate-700 light:border-slate-300 text-sm font-medium transition-colors"
            >
              <Printer className="w-4 h-4" /> Print Document
            </button>
          </div>
        </motion.div>

        {/* Printable Resume Document Sheet */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto bg-slate-900/90 light:bg-white border border-slate-800 light:border-slate-200 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl backdrop-blur-xl print:shadow-none print:border-none print:p-0 print:bg-white print:text-black"
        >
          {/* Resume Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-800 light:border-slate-200 pb-6 mb-8 gap-4">
            <div>
              <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-100 light:text-slate-900 tracking-tight">
                {PROFILE.name}
              </h1>
              <p className="text-sm font-mono text-cyan-400 light:text-indigo-600 font-semibold mt-1">
                {PROFILE.role}
              </p>
            </div>

            <div className="flex flex-col sm:items-end text-xs font-mono text-slate-400 light:text-slate-600 space-y-1">
              {PROFILE.email && (
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-cyan-400" /> {PROFILE.email}
                </span>
              )}
              {PROFILE.location && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" /> {PROFILE.location}
                </span>
              )}
              {(PROFILE.githubUsername || PROFILE.socials?.github) && (
                <a
                  href={PROFILE.socials?.github || `https://github.com/${PROFILE.githubUsername}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
                >
                  <Globe className="w-3.5 h-3.5 text-emerald-400" /> github.com/{PROFILE.githubUsername}
                </a>
              )}
              {PROFILE.socials?.linkedin && (
                <a
                  href={PROFILE.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5 text-cyan-400" /> {PROFILE.socials.linkedin.replace(/^https?:\/\/(www\.)?/, '')}
                </a>
              )}
            </div>
          </div>

          {/* Professional Summary */}
          <div className="mb-8">
            <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 light:text-indigo-600 font-bold mb-3">
              Professional Summary
            </h3>
            <p className="text-sm text-slate-300 light:text-slate-700 leading-relaxed font-sans">
              {PROFILE.aboutNarrative}
            </p>
          </div>

          {/* Core Technical Competencies */}
          <div className="mb-8">
            <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 light:text-indigo-600 font-bold mb-3">
              Technical Competencies
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {SKILLS_CATEGORIES.map((cat, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-950/60 light:bg-slate-50 border border-slate-800 light:border-slate-200">
                  <div className="text-xs font-bold text-slate-200 light:text-slate-800 mb-1">
                    {cat.title}
                  </div>
                  <div className="text-[11px] text-slate-400 light:text-slate-600 font-mono">
                    {cat.skills.map((s) => s.name).join(' • ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Featured Projects */}
          <div className="mb-8">
            <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 light:text-indigo-600 font-bold mb-4">
              Featured Software Projects
            </h3>

            <div className="space-y-4">
              {PROJECTS_DATA.map((proj) => (
                <div key={proj.id} className="p-4 rounded-2xl bg-slate-950/60 light:bg-slate-50 border border-slate-800 light:border-slate-200">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-base text-slate-100 light:text-slate-900">
                      {proj.title}
                    </h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 light:bg-indigo-100 light:text-indigo-700">
                      {proj.category}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 light:text-slate-600 mb-3 font-sans">
                    {proj.shortDescription}
                  </p>

                  {proj.highlights && proj.highlights.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {proj.highlights.map((h, hIdx) => (
                        <span key={hIdx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 light:bg-white text-slate-400 light:text-slate-600 border border-slate-800 light:border-slate-200">
                          ✓ {h}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Verified Education (Only rendered if actual education information is provided) */}
          {PROFILE.education && PROFILE.education.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 light:text-indigo-600 font-bold mb-3">
                Education
              </h3>

              <div className="space-y-3">
                {PROFILE.education.map((edu, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-950/60 light:bg-slate-50 border border-slate-800 light:border-slate-200 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-slate-100 light:text-slate-900">
                        {edu.degree}
                      </h4>
                      <p className="text-xs text-slate-400 light:text-slate-600">
                        {edu.institution} {edu.year ? `(${edu.year})` : ''}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Verified Certifications (Only rendered if actual certification information is provided) */}
          {CERTIFICATIONS && CERTIFICATIONS.length > 0 && (
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 light:text-indigo-600 font-bold mb-3">
                Certifications
              </h3>

              <div className="space-y-3">
                {CERTIFICATIONS.map((cert, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-950/60 light:bg-slate-50 border border-slate-800 light:border-slate-200 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-slate-100 light:text-slate-900">
                        {cert.name}
                      </h4>
                      <p className="text-xs text-slate-400 light:text-slate-600">
                        {cert.issuer} {cert.date ? `• ${cert.date}` : ''}
                      </p>
                    </div>
                    {cert.verificationUrl && (
                      <a
                        href={cert.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono text-cyan-400 hover:underline"
                      >
                        Verify
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        </motion.div>

      </div>
    </section>
  );
};
