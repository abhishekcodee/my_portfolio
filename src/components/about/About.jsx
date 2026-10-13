import React from 'react';
import { PROFILE } from '../../config/profile';
import { motion } from 'framer-motion';
import { Layout, Cpu, Zap, Wrench, ArrowRight } from 'lucide-react';

const whatIDoIcons = {
  Layout: Layout,
  Cpu: Cpu,
  Zap: Zap,
  Wrench: Wrench
};

export const About = () => {
  return (
    <section id="about" className="py-16 lg:py-24 relative overflow-hidden bg-dot-pattern">
      {/* Background Ambient Glow Orb */}
      <div className="absolute top-1/2 -right-40 -translate-y-1/2 w-96 h-96 rounded-full bg-indigo-500/10 light:bg-indigo-200/40 blur-3xl pointer-events-none animate-pulse-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20">
        
        {/* ================= ABOUT SECTION ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 flex flex-col gap-4"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 light:text-indigo-600 text-xs font-mono font-semibold border border-indigo-500/20 self-start">
              <span>ABOUT</span>
            </div>

            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-100 light:text-slate-900 tracking-tight">
              {PROFILE.aboutHeading}
            </h2>

            <div className="prose prose-invert max-w-none text-slate-300 light:text-slate-600 text-base sm:text-lg leading-relaxed space-y-4 font-sans">
              <p>
                I'm a software developer who likes solving real problems with code.
              </p>
              <p>
                I work with <strong className="text-cyan-400 light:text-indigo-600 font-semibold">Python, PHP, JavaScript, MySQL, HTML, and CSS</strong>, and I build applications from the database to the UI.
              </p>
              <p>
                Most of my work is practical: business systems, automation, recruitment platforms, HR tools, and IoT applications.
              </p>
            </div>
          </motion.div>

          {/* Currently Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6"
          >
            <div className="p-4 sm:p-8 border-l-2 border-l-cyan-400 sm:border-l-0 sm:border border-slate-800 light:border-slate-200 rounded-r-2xl sm:rounded-3xl bg-slate-900/40 sm:bg-slate-900/90 light:bg-white sm:shadow-2xl backdrop-blur-xl relative overflow-hidden">
              <div className="hidden sm:block h-1.5 w-full absolute top-0 left-0 bg-gradient-to-r from-cyan-400 via-indigo-500 to-teal-400" />
              
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <h3 className="font-mono text-xs uppercase tracking-widest text-cyan-400 light:text-indigo-600 font-extrabold">
                  CURRENTLY
                </h3>
              </div>

              <ul className="space-y-3 sm:space-y-4">
                {PROFILE.currently.map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    className="flex items-center gap-2.5 sm:gap-3 text-slate-200 light:text-slate-800 font-medium text-sm sm:text-lg"
                  >
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 light:text-indigo-600 shrink-0" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* ================= WHAT I DO SECTION ================= */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-8 sm:mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 light:text-indigo-600 text-xs font-mono font-semibold mb-3 border border-cyan-500/20">
              <span>WHAT I DO</span>
            </div>

            <h2 className="font-heading font-extrabold text-2xl sm:text-4xl lg:text-5xl text-slate-100 light:text-slate-900 tracking-tight">
              Practical Solutions &{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 light:from-indigo-600 light:to-cyan-600 bg-clip-text text-transparent">
                Capabilities.
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
            {PROFILE.whatIDo.map((item, idx) => {
              const IconComp = whatIDoIcons[item.icon] || Layout;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="p-3.5 sm:p-6 border-l-2 border-l-cyan-400 sm:border-l-0 sm:border border-slate-800 light:border-slate-200 rounded-r-2xl sm:rounded-3xl bg-slate-900/40 sm:bg-slate-900/80 light:bg-white hover:border-cyan-500/50 transition-all duration-300 sm:shadow-lg flex flex-col justify-between"
                >
                  <div>
                    <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-lg sm:rounded-2xl bg-cyan-500/10 text-cyan-400 light:bg-indigo-50 light:text-indigo-600 flex items-center justify-center mb-3 sm:mb-6 group-hover:scale-110 transition-transform">
                      <IconComp className="w-4.5 h-4.5 sm:w-6 sm:h-6" />
                    </div>

                    <h3 className="font-heading font-extrabold text-sm sm:text-xl text-slate-100 light:text-slate-900 mb-1.5 sm:mb-3">
                      {item.title}
                    </h3>

                    <p className="text-slate-400 light:text-slate-600 text-xs sm:text-sm leading-relaxed font-sans">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ================= HOW I WORK SECTION ================= */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-8 sm:mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 light:text-indigo-600 text-xs font-mono font-semibold mb-3 border border-indigo-500/20">
              <span>HOW I WORK</span>
            </div>

            <h2 className="font-heading font-extrabold text-2xl sm:text-4xl lg:text-5xl text-slate-100 light:text-slate-900 tracking-tight">
              My Development Process
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
            {PROFILE.howIWork.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-3.5 sm:p-6 border-l-2 border-l-indigo-400 sm:border-l-0 sm:border border-slate-800 light:border-slate-200 rounded-r-2xl sm:rounded-3xl bg-slate-900/40 sm:bg-slate-900/80 light:bg-white sm:shadow-lg relative overflow-hidden group hover:border-indigo-500/50 transition-all"
              >
                <div className="text-xl sm:text-3xl font-mono font-extrabold text-cyan-400/50 light:text-indigo-400/50 mb-2 sm:mb-4 group-hover:text-cyan-400 transition-colors">
                  {step.step}
                </div>

                <h3 className="font-heading font-extrabold text-sm sm:text-xl text-slate-100 light:text-slate-900 mb-1 sm:mb-2">
                  {step.title}
                </h3>

                <p className="text-slate-400 light:text-slate-600 text-xs sm:text-sm leading-relaxed font-sans">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
