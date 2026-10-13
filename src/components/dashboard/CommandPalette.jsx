import React, { useState } from 'react';
import { useDashboard } from '../../context/useDashboard';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Award, BookOpen, FileText, Cpu, Target, FolderCode, Bookmark } from 'lucide-react';

export const CommandPalette = () => {
  const {
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    certificates,
    courses,
    notes,
    skills,
    goals,
    projects,
    resources,
    setActiveTab,
  } = useDashboard();

  const [query, setQuery] = useState('');

  if (!isCommandPaletteOpen) return null;

  // Aggregate all items for search
  const allItems = [
    ...(certificates || []).map((c) => ({ type: 'Certificate', title: c?.title || '', subtitle: c?.issuer || '', tab: 'certificates', icon: Award })),
    ...(courses || []).map((c) => ({ type: 'Course', title: c?.title || '', subtitle: c?.platform || '', tab: 'courses', icon: BookOpen })),
    ...(notes || []).map((n) => ({ type: 'Note', title: n?.title || '', subtitle: n?.category || '', tab: 'notes', icon: FileText })),
    ...(skills || []).map((s) => ({ type: 'Skill', title: s?.name || '', subtitle: `${s?.level || ''} • ${s?.category || ''}`, tab: 'skills', icon: Cpu })),
    ...(goals || []).map((g) => ({ type: 'Goal', title: g?.title || '', subtitle: `Priority: ${g?.priority || ''}`, tab: 'goals', icon: Target })),
    ...(projects || []).map((p) => ({ type: 'Project', title: p?.title || '', subtitle: p?.status || '', tab: 'projects', icon: FolderCode })),
    ...(resources || []).map((r) => ({ type: 'Resource', title: r?.title || '', subtitle: r?.type || '', tab: 'resources', icon: Bookmark })),
  ];

  const filtered = query.trim()
    ? allItems.filter(
        (item) =>
          (item.title || '').toLowerCase().includes(query.toLowerCase()) ||
          (item.subtitle || '').toLowerCase().includes(query.toLowerCase()) ||
          (item.type || '').toLowerCase().includes(query.toLowerCase())
      )
    : allItems.slice(0, 8);

  const handleSelect = (item) => {
    setActiveTab(item.tab);
    setIsCommandPaletteOpen(false);
    setQuery('');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-2xl rounded-3xl bg-slate-900 light:bg-white border border-slate-800 light:border-slate-200 shadow-2xl overflow-hidden"
        >
          {/* Input Bar */}
          <div className="relative border-b border-slate-800 light:border-slate-200 flex items-center px-4">
            <Search className="w-5 h-5 text-slate-400 shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search certificates, courses, notes, skills, goals, projects..."
              className="w-full px-3 py-4 bg-transparent text-slate-100 light:text-slate-900 focus:outline-none text-sm placeholder:text-slate-500 font-sans"
            />
            <button
              onClick={() => setIsCommandPaletteOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white light:hover:text-slate-900 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Results list */}
          <div className="max-h-96 overflow-y-auto p-3 space-y-1">
            {filtered.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-xs font-mono">
                No matching dashboard items found for "{query}"
              </div>
            ) : (
              filtered.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(item)}
                    className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-slate-800/60 light:hover:bg-slate-100 transition-colors text-left group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-400 light:bg-indigo-50 light:text-indigo-600 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-semibold text-slate-100 light:text-slate-900 group-hover:text-cyan-400 light:group-hover:text-indigo-600 transition-colors">
                          {item.title}
                        </div>
                        <div className="text-[11px] text-slate-400 light:text-slate-500 font-mono">
                          {item.subtitle}
                        </div>
                      </div>
                    </div>

                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-950 light:bg-slate-200 text-slate-400 light:text-slate-600">
                      {item.type}
                    </span>
                  </button>
                );
              })
            )}
          </div>

          {/* Footer hint */}
          <div className="px-4 py-2.5 bg-slate-950/60 light:bg-slate-50 border-t border-slate-800/60 light:border-slate-200 flex items-center justify-between text-[11px] font-mono text-slate-500">
            <span>Navigation: Click or press Enter</span>
            <span>Esc to close</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
