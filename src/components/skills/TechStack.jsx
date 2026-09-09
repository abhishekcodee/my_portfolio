import React, { useState, useRef, useEffect } from 'react';
import { SKILLS_CATEGORIES } from '../../data/skills';
import { SkillCategoryCard } from './SkillCategoryCard';
import { TechSphere3D } from '../3d/TechSphere3D';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, Layers, Cpu, Sparkles, ChevronLeft, ChevronRight, Play, Pause, Code2, Layout, Database, GraduationCap, Wrench } from 'lucide-react';

const iconMap = {
  Code2: Code2,
  Layout: Layout,
  Database: Database,
  GraduationCap: GraduationCap,
  Wrench: Wrench,
  Cpu: Cpu,
};

export const TechStack = () => {
  const [viewMode, setViewMode] = useState('slider'); // 'slider' | 'grid' | 'matrix'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activePageIndex, setActivePageIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const scrollContainerRef = useRef(null);

  const filteredCategories = selectedCategory === 'all'
    ? SKILLS_CATEGORIES
    : SKILLS_CATEGORIES.filter(c => c.id === selectedCategory);

  // Sync scroll position with active card index
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.firstElementChild?.offsetWidth || 300;
      const gap = 24;
      if (cardWidth > 0) {
        const index = Math.round(container.scrollLeft / (cardWidth + gap));
        setActivePageIndex(index);
      }
    }
  };

  const totalPages = filteredCategories.length;

  const scrollToCard = (index) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.firstElementChild?.offsetWidth || 300;
      const gap = 24;
      container.scrollTo({ left: index * (cardWidth + gap), behavior: 'smooth' });
      setActivePageIndex(index);
    }
  };

  const handlePrevSlide = () => {
    const nextIndex = activePageIndex > 0 ? activePageIndex - 1 : totalPages - 1;
    scrollToCard(nextIndex);
  };

  const handleNextSlide = () => {
    const nextIndex = activePageIndex < totalPages - 1 ? activePageIndex + 1 : 0;
    scrollToCard(nextIndex);
  };

  // Auto-play timer effect
  useEffect(() => {
    let interval = null;
    if (isAutoPlay && viewMode === 'slider') {
      interval = setInterval(() => {
        handleNextSlide();
      }, 4000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoPlay, activePageIndex, viewMode, totalPages]);

  return (
    <section id="skills" className="pt-24 pb-16 lg:pt-32 lg:pb-20 scroll-mt-24 relative overflow-hidden bg-slate-950/40 light:bg-slate-50/50">
      {/* Background Accent Mesh */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-cyan-500/5 via-indigo-500/5 to-teal-400/5 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header & View Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 pb-6 border-b border-slate-800/80 light:border-slate-200">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 light:text-indigo-600 text-xs font-mono font-semibold mb-3 border border-cyan-500/20">
              <Cpu className="w-3.5 h-3.5" />
              <span>TECHNICAL COMPETENCIES & TOOLKIT</span>
            </div>

            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-100 light:text-slate-900 tracking-tight">
              Production Stacks &{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 light:from-indigo-600 light:to-cyan-600 bg-clip-text text-transparent">
                Technical Toolkits.
              </span>
            </h2>

            <p className="text-slate-400 light:text-slate-600 text-sm sm:text-base mt-2 font-sans">
              Architecting scalable web platforms, secured backend APIs, custom e-learning ecosystems, and IoT automation pipelines.
            </p>
          </motion.div>

          {/* Interactive Layout View Switcher */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-1 p-1.5 rounded-2xl bg-slate-900/90 light:bg-white border border-slate-800 light:border-slate-200 shadow-lg backdrop-blur-md shrink-0 self-start lg:self-auto"
          >
            <button
              onClick={() => { setViewMode('slider'); setSelectedCategory('all'); }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all ${
                viewMode === 'slider'
                  ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-semibold shadow-md'
                  : 'text-slate-400 light:text-slate-600 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" /> Interactive Slider
            </button>

            <button
              onClick={() => { setViewMode('grid'); setSelectedCategory('all'); }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all ${
                viewMode === 'grid'
                  ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-semibold shadow-md'
                  : 'text-slate-400 light:text-slate-600 hover:text-slate-200'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" /> Full Grid
            </button>

            <button
              onClick={() => { setViewMode('matrix'); setSelectedCategory('all'); }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all ${
                viewMode === 'matrix'
                  ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-semibold shadow-md'
                  : 'text-slate-400 light:text-slate-600 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" /> Badges
            </button>
          </motion.div>
        </div>

        <TechSphere3D />

        {/* Scrollable Category Filter Pills */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none max-w-full">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium whitespace-nowrap transition-all ${
                selectedCategory === 'all'
                  ? 'bg-cyan-500/20 text-cyan-400 light:bg-indigo-600 light:text-white border border-cyan-500/30 font-semibold shadow-sm'
                  : 'bg-slate-900/80 light:bg-white text-slate-400 border border-slate-800/80 light:border-slate-200 hover:text-slate-200'
              }`}
            >
              All Stacks ({SKILLS_CATEGORIES.reduce((acc, c) => acc + c.skills.length, 0)})
            </button>

            {SKILLS_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-cyan-500/20 text-cyan-400 light:bg-indigo-600 light:text-white border border-cyan-500/30 font-semibold shadow-sm'
                    : 'bg-slate-900/80 light:bg-white text-slate-400 border border-slate-800/80 light:border-slate-200 hover:text-slate-200'
                }`}
              >
                {cat.title} ({cat.skills.length})
              </button>
            ))}
          </div>

          {/* Slider Auto-Play & Arrow Controls */}
          {viewMode === 'slider' && (
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setIsAutoPlay(!isAutoPlay)}
                title={isAutoPlay ? 'Pause Auto-Slide' : 'Start Auto-Slide'}
                className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-medium border transition-all ${
                  isAutoPlay
                    ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40 font-semibold'
                    : 'bg-slate-900 light:bg-white text-slate-400 border-slate-800 light:border-slate-200 hover:text-slate-200'
                }`}
              >
                {isAutoPlay ? <Pause className="w-3.5 h-3.5 text-cyan-400" /> : <Play className="w-3.5 h-3.5 text-slate-400" />}
                <span>Auto</span>
              </button>

              <button
                onClick={handlePrevSlide}
                aria-label="Previous slide"
                className="p-2 rounded-xl bg-slate-900 light:bg-white border border-slate-800 light:border-slate-200 text-slate-300 light:text-slate-700 hover:text-cyan-400 hover:border-cyan-500/30 transition-all shadow-md active:scale-95"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={handleNextSlide}
                aria-label="Next slide"
                className="p-2 rounded-xl bg-slate-900 light:bg-white border border-slate-800 light:border-slate-200 text-slate-300 light:text-slate-700 hover:text-cyan-400 hover:border-cyan-500/30 transition-all shadow-md active:scale-95"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Dynamic Layout Renderers */}
        <AnimatePresence mode="wait">
          {viewMode === 'slider' ? (
            /* Mode 1: Interactive Animated Slider Deck with Pagination Dots */
            <motion.div
              key="slider"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
              onMouseEnter={() => setIsAutoPlay(false)}
              onMouseLeave={() => setIsAutoPlay(true)}
            >
              {/* Slider Track */}
              <div
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="flex items-stretch gap-4 sm:gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none max-w-full"
              >
                {filteredCategories.map((category, idx) => (
                  <SkillCategoryCard key={category.id} category={category} index={idx} isCarousel={true} />
                ))}
              </div>

              {/* Slider Bottom Pagination Dots & Progress Bar */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }).map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      onClick={() => scrollToCard(dotIdx)}
                      aria-label={`Go to slide page ${dotIdx + 1}`}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        activePageIndex === dotIdx
                          ? 'w-8 bg-gradient-to-r from-indigo-500 to-cyan-400 shadow-md'
                          : 'w-2.5 bg-slate-800 light:bg-slate-300 hover:bg-slate-700'
                      }`}
                    />
                  ))}
                </div>

                <div className="text-xs font-mono text-slate-400 light:text-slate-600 flex items-center gap-2">
                  <span>Slide Page</span>
                  <span className="px-2.5 py-1 rounded-full bg-slate-900 light:bg-slate-100 border border-slate-800 light:border-slate-200 text-cyan-400 light:text-indigo-600 font-bold">
                    0{activePageIndex + 1} / 0{totalPages}
                  </span>
                </div>
              </div>
            </motion.div>
          ) : viewMode === 'matrix' ? (
            /* Mode 3: High-Density Compact Badges */
            <motion.div
              key="matrix"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredCategories.map((category) => {
                const IconComponent = iconMap[category.icon] || Code2;
                return (
                  <div
                    key={category.id}
                    className="p-6 rounded-3xl bg-slate-900/80 light:bg-white border border-slate-800 light:border-slate-200 shadow-xl"
                  >
                    <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-800/80 light:border-slate-200">
                      <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-400 light:text-indigo-600 flex items-center justify-center">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-heading font-extrabold text-base text-slate-100 light:text-slate-900">
                          {category.title}
                        </h3>
                        {category.tagline && (
                          <span className="text-[10px] text-cyan-400 font-mono block">
                            {category.tagline}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, idx) => (
                        <div
                          key={idx}
                          className="group relative px-3 py-1.5 rounded-xl bg-slate-950/80 light:bg-slate-100 border border-slate-800 light:border-slate-200 hover:border-cyan-500/40 transition-all cursor-default"
                        >
                          <span className="text-xs font-semibold text-slate-200 light:text-slate-800 flex items-center gap-1.5 font-mono">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 light:bg-indigo-600" />
                            {skill.name}
                          </span>
                          {skill.desc && (
                            <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-2.5 bg-slate-950 text-[11px] text-slate-300 rounded-xl border border-slate-700 shadow-2xl z-30 font-sans pointer-events-none">
                              {skill.desc}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          ) : (
            /* Mode 2: Full Grid */
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              {filteredCategories.map((category, idx) => (
                <SkillCategoryCard key={category.id} category={category} index={idx} isCarousel={false} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

