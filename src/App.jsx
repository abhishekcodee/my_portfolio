import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeProvider';
import { useTheme } from './context/useTheme';
import { DashboardProvider } from './context/DashboardProvider';
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/hero/Hero';
import { About } from './components/about/About';
import { TechStack } from './components/skills/TechStack';
import { ProjectsSection } from './components/projects/ProjectsSection';
import { ExperienceTimeline } from './components/experience/ExperienceTimeline';
import { GitHubSection } from './components/github/GitHubSection';
import { ResumeSection } from './components/resume/ResumeSection';
import { ContactSection } from './components/contact/ContactSection';
import { Footer } from './components/layout/Footer';

function MainAppContent() {
  const [currentHash, setCurrentHash] = useState(() => window.location.hash);
  const { isDarkMode, setIsDarkMode } = useTheme();

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const isDashboardRoute =
    currentHash.includes('dashboard') ||
    window.location.pathname.includes('/dashboard');

  if (isDashboardRoute) {
    return <DashboardLayout isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 light:bg-slate-50 text-slate-100 light:text-slate-900 transition-colors duration-300 font-sans selection:bg-indigo-500 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <TechStack />
        <ProjectsSection />
        <ExperienceTimeline />
        <GitHubSection />
        <ResumeSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <DashboardProvider>
        <MainAppContent />
      </DashboardProvider>
    </ThemeProvider>
  );
}
