import React, { useState, useEffect } from 'react';
import { useDashboard } from '../../context/useDashboard';
import { useTheme } from '../../context/useTheme';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Award,
  BookOpen,
  FileText,
  Cpu,
  Target,
  FolderCode,
  Bookmark,
  Activity,
  Settings,
  Search,
  LogOut,
  Sun,
  Moon,
  Sparkles,
  ArrowLeft,
  Maximize2,
  Minimize2,
  Menu,
  X,
} from 'lucide-react';

import { DashboardLogin } from './DashboardLogin';
import { CommandPalette } from './CommandPalette';
import { DashboardOverview } from './DashboardOverview';
import { CertificatesManager } from './CertificatesManager';
import { CoursesManager } from './CoursesManager';
import { NotesManager } from './NotesManager';
import { SkillsTracker } from './SkillsTracker';
import { GoalsManager } from './GoalsManager';
import { ProjectsTracker } from './ProjectsTracker';
import { ResourcesManager } from './ResourcesManager';
import { ActivityStreak } from './ActivityStreak';
import { DashboardSettings } from './DashboardSettings';
import { saveDashboardData } from '../../services/dashboardStorage';

export const DashboardLayout = ({ isDarkMode: isDarkModeProp, setIsDarkMode: setIsDarkModeProp }) => {
  const { toggleTheme, isDarkMode: isDarkModeContext, setIsDarkMode: setIsDarkModeContext } = useTheme();

  const isDarkMode = isDarkModeProp !== undefined ? isDarkModeProp : isDarkModeContext;

  const handleToggleTheme = () => {
    if (typeof setIsDarkModeProp === 'function') {
      setIsDarkModeProp(!isDarkMode);
    } else if (typeof setIsDarkModeContext === 'function') {
      setIsDarkModeContext(!isDarkModeContext);
    } else {
      toggleTheme();
    }
  };

  const {
    auth,
    activeTab,
    setActiveTab,
    setIsCommandPaletteOpen,
    toastMessage,
    logout,
    streak,
  } = useDashboard();

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error('Error attempting to enable fullscreen:', err);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  if (!auth?.isAuthenticated) {
    return <DashboardLogin />;
  }

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'certificates', label: 'Certificates', icon: Award },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'notes', label: 'Dev Notes', icon: FileText },
    { id: 'skills', label: 'Skills Matrix', icon: Cpu },
    { id: 'goals', label: 'Learning Goals', icon: Target },
    { id: 'projects', label: 'Projects', icon: FolderCode },
    { id: 'resources', label: 'Resources', icon: Bookmark },
    { id: 'streak', label: 'Activity Streak', icon: Activity },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'overview': return <DashboardOverview />;
      case 'certificates': return <CertificatesManager />;
      case 'courses': return <CoursesManager />;
      case 'notes': return <NotesManager />;
      case 'skills': return <SkillsTracker />;
      case 'goals': return <GoalsManager />;
      case 'projects': return <ProjectsTracker />;
      case 'resources': return <ResourcesManager />;
      case 'streak': return <ActivityStreak />;
      case 'settings': return <DashboardSettings />;
      default: return <DashboardOverview />;
    }
  };

  const activeNavItem = navItems.find((i) => i.id === activeTab) || navItems[0];

  return (
    <div className="min-h-screen bg-slate-950 light:bg-slate-100 text-slate-100 light:text-slate-900 flex flex-col md:flex-row relative font-sans selection:bg-cyan-500/30">
      
      {/* Toast Notification Container */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-2xl border text-xs font-mono font-bold shadow-2xl backdrop-blur-xl flex items-center gap-2 ${
              toastMessage.type === 'error'
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                : toastMessage.type === 'info'
                ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{toastMessage.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Command Palette */}
      <CommandPalette />

      {/* ======================================================== */}
      {/* CLEAN MOBILE STICKY HEADER (ONLY SHOWS LOGO + HAMBURGER BUTTON) */}
      {/* ======================================================== */}
      <div className="md:hidden sticky top-0 z-40 bg-slate-900/95 light:bg-white/95 border-b border-slate-800 light:border-slate-200 backdrop-blur-xl px-4 py-3 shadow-sm">
        <div className="flex items-center justify-between">
          {/* Logo & Current Tab Title */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex items-center gap-2.5 text-left focus:outline-none cursor-pointer"
          >
            {auth?.user?.avatar ? (
              <img
                src={auth.user.avatar}
                alt={auth?.user?.name || 'User'}
                className="w-8 h-8 rounded-xl object-cover border border-indigo-500 shadow-sm"
              />
            ) : (
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 text-white font-mono font-extrabold text-xs flex items-center justify-center shadow-sm">
                {auth?.user?.name ? auth.user.name.split(' ').map(n=>n[0]).join('').slice(0, 2).toUpperCase() : 'OS'}
              </div>
            )}

            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-sm text-slate-100 light:text-slate-900 leading-none">
                 {auth?.user?.name || 'Dashboard'}
              </span>
              <span className="text-[10px] font-mono text-cyan-400 light:text-indigo-600 font-bold uppercase mt-0.5">
                {activeNavItem.label} ▾
              </span>
            </div>
          </button>

          {/* Right Action Icons & Hamburger Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCommandPaletteOpen(true)}
              className="p-2 rounded-xl bg-slate-800/80 light:bg-slate-100 text-slate-300 light:text-slate-700"
              title="Search..."
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              onClick={handleToggleTheme}
              className="p-2 rounded-xl bg-slate-800/80 light:bg-slate-100 text-slate-300 light:text-slate-700 cursor-pointer"
              title={isDarkMode ? 'Switch to Day (Light) Mode' : 'Switch to Night (Dark) Mode'}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            </button>

            {/* Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md font-bold cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* MOBILE SLIDE-DOWN DRAWER MENU OVERLAY (ONLY APPEARS ON CLICK) */}
      {/* ======================================================== */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-x-0 top-[57px] z-50 bg-slate-950/95 light:bg-white/95 border-b border-slate-800 light:border-slate-200 backdrop-blur-2xl p-4 shadow-2xl max-h-[85vh] overflow-y-auto"
          >
            <div className="text-[11px] font-mono text-slate-400 light:text-slate-500 uppercase tracking-wider mb-2 font-bold px-1">
              Dashboard Navigation
            </div>

            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center justify-between p-3 rounded-2xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md'
                        : 'bg-slate-900/80 light:bg-slate-100 text-slate-300 light:text-slate-700 border border-slate-800 light:border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                     {item.id === 'streak' && Number(streak?.currentStreak) > 0 && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-300 font-bold">
                         {streak.currentStreak}d
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="pt-4 mt-3 border-t border-slate-800 light:border-slate-200 flex items-center justify-between text-xs font-mono">
              <a
                href="#home"
                className="text-slate-400 light:text-slate-600 hover:text-cyan-400 flex items-center gap-1 font-medium"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Portfolio</span>
              </a>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  logout();
                }}
                className="text-rose-400 font-bold flex items-center gap-1 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Lock Session</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ======================================================== */}
      {/* DESKTOP STICKY SIDEBAR (VISIBLE ONLY ON MD+ SCREENS) */}
      {/* ======================================================== */}
      <aside className="hidden md:flex w-64 bg-slate-900/90 light:bg-white border-r border-slate-800/80 light:border-slate-200 shrink-0 p-5 flex-col justify-between sticky top-0 h-screen z-30">
        <div>
          {/* Dashboard Header Logo & Profile Avatar */}
          <div className="pb-6 mb-4 border-b border-slate-800/80 light:border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <label className="relative group cursor-pointer" title="Click to Upload Profile Avatar Image">
                {auth?.user?.avatar ? (
                  <img
                    src={auth.user.avatar}
                    alt={auth?.user?.name || 'User'}
                    className="w-11 h-11 rounded-2xl object-cover border-2 border-indigo-500 shadow-md group-hover:opacity-80 transition-opacity"
                  />
                ) : (
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 text-white flex items-center justify-center font-mono font-extrabold text-sm shadow-md group-hover:opacity-80 transition-opacity">
                    {auth?.user?.name ? auth.user.name.split(' ').map(n=>n[0]).join('').slice(0, 2).toUpperCase() : 'OS'}
                  </div>
                )}
                <div className="absolute inset-0 rounded-2xl bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-[10px] font-mono">
                  Upload
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = (evt) => {
                      const base64 = evt.target.result;
                      const updatedAuth = {
                        ...auth,
                        user: { ...(auth?.user || {}), avatar: base64 },
                      };
                      saveDashboardData('auth', updatedAuth);
                      window.location.reload();
                    };
                    reader.readAsDataURL(file);
                  }}
                  className="hidden"
                />
              </label>

              <div>
                <h2 className="font-heading font-extrabold text-base text-slate-100 light:text-slate-900 leading-tight">
                   {auth?.user?.name || 'Dashboard'}
                </h2>
                <span className="text-[10px] font-mono text-cyan-400 light:text-indigo-600 font-semibold uppercase tracking-wider">
                   {auth?.user?.role || 'Dashboard'}
                </span>
              </div>
            </div>

            <a
              href="#home"
              className="p-2 rounded-xl bg-slate-800/60 light:bg-slate-100 text-slate-400 hover:text-white transition-colors"
              title="Return to Portfolio"
            >
              <ArrowLeft className="w-4 h-4" />
            </a>
          </div>

          {/* Search Trigger Shortcut Button */}
          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            className="w-full mb-6 p-2.5 rounded-2xl bg-slate-950/80 light:bg-slate-50 border border-slate-800 light:border-slate-300 text-slate-400 light:text-slate-600 flex items-center justify-between text-xs font-mono hover:border-cyan-500/50 transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5" />
              <span>Search...</span>
            </span>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-800 light:bg-slate-200 text-[10px] font-bold text-slate-300 light:text-slate-700">
              Ctrl K
            </kbd>
          </button>

          {/* Navigation Items List */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-lg shadow-indigo-500/20'
                      : 'text-slate-400 light:text-slate-600 hover:bg-slate-800/60 light:hover:bg-slate-100 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                   {item.id === 'streak' && Number(streak?.currentStreak) > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-500/20 text-amber-300 font-bold">
                       {streak.currentStreak}d
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Controls */}
        <div className="pt-4 mt-6 border-t border-slate-800/80 light:border-slate-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleTheme}
              className="p-2 rounded-xl bg-slate-800/60 light:bg-slate-100 text-slate-300 light:text-slate-700 hover:text-cyan-400 transition-colors cursor-pointer"
              title={isDarkMode ? 'Switch to Day (Light) Mode' : 'Switch to Night (Dark) Mode'}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            </button>

            {/* Native Browser Fullscreen Toggle Button */}
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-xl bg-slate-800/60 light:bg-slate-100 text-slate-300 light:text-slate-700 hover:text-cyan-400 transition-colors cursor-pointer"
              title={isFullscreen ? 'Exit Full Screen' : 'Full Screen Mode'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4 text-cyan-400" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>

          <button
            onClick={logout}
            className="p-2 rounded-xl text-slate-400 hover:text-rose-400 transition-colors"
            title="Lock Dashboard / Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Main Content Dashboard Workspace */}
      <main className="flex-1 p-4 sm:p-8 lg:p-10 max-w-7xl mx-auto w-full overflow-y-auto">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderActiveTab()}
        </motion.div>
      </main>
    </div>
  );
};
