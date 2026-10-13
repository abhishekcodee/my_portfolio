import React from 'react';
import { useDashboard } from '../../context/useDashboard';
import { motion } from 'framer-motion';
import { Award, BookOpen, Clock, Cpu, FolderCode, Target, Flame, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { Star, GitFork } from 'lucide-react';
import { Github } from '../ui/Icons';
import { useGitHub } from '../../hooks/useGitHub';
import { PROFILE } from '../../config/profile';

export const DashboardOverview = () => {
  const { auth, certificates, courses, notes, skills, goals, projects, streak, activities, setActiveTab } = useDashboard();
  const { profile: githubProfile, repos: githubRepos, loading: githubLoading, error: githubError } = useGitHub();

  const certificateList = certificates || [];
  const courseList = courses || [];
  const skillList = skills || [];
  const projectList = projects || [];
  const activityList = activities || [];
  const goalList = goals || [];
  const noteList = notes || [];
  const inProgressCourses = courseList.filter((c) => c.status === 'Currently Learning');
  const completedCourses = courseList.filter((c) => c.status === 'Completed');
  const activeGoals = goalList.filter((g) => g.status === 'In Progress');
  const currentStreak = Number(streak?.currentStreak);
  const totalHours = Number(streak?.totalHours);

  const stats = [
    certificateList.length > 0 && { label: 'Total Certificates', value: certificateList.length, icon: Award, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20', tab: 'certificates' },
    inProgressCourses.length > 0 && { label: 'Courses Learning', value: inProgressCourses.length, icon: BookOpen, color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20', tab: 'courses' },
    completedCourses.length > 0 && { label: 'Courses Completed', value: completedCourses.length, icon: CheckCircle2, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', tab: 'courses' },
    totalHours > 0 && { label: 'Learning Hours', value: `${totalHours}h`, icon: Clock, color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20', tab: 'streak' },
    skillList.length > 0 && { label: 'Skills Tracked', value: skillList.length, icon: Cpu, color: 'text-teal-400 bg-teal-500/10 border-teal-500/20', tab: 'skills' },
    projectList.length > 0 && { label: 'Projects Built', value: projectList.length, icon: FolderCode, color: 'text-purple-400 bg-purple-500/10 border-purple-500/20', tab: 'projects' },
  ].filter(Boolean);

  return (
    <div className="space-y-8">
      {/* Top Banner Greeting */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-900/40 via-cyan-900/30 to-slate-900 light:from-indigo-50 light:via-blue-50 light:to-white border border-slate-800 light:border-slate-200 relative overflow-hidden shadow-xl"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 light:bg-indigo-200/40 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 light:text-indigo-600 text-xs font-mono font-semibold mb-3 border border-cyan-500/20 light:border-indigo-200">
              <Sparkles className="w-3.5 h-3.5" />
              <span>PERSONAL LEARNING OS</span>
            </div>

            <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-slate-100 light:text-slate-900 tracking-tight">
              Welcome back{auth?.user?.name ? `, ${auth.user.name}` : ''}
            </h1>

            <p className="text-slate-300 light:text-slate-600 text-sm sm:text-base mt-1.5 font-sans max-w-xl">
              "Keep learning. Keep building." Tracking your software engineering growth, certifications, and project milestones.
            </p>
          </div>

          {/* Streak Counter Card */}
          {currentStreak > 0 && <div
            onClick={() => setActiveTab('streak')}
            className="p-4 rounded-2xl bg-slate-900/80 light:bg-white border border-slate-800 light:border-slate-200 flex items-center gap-4 shrink-0 shadow-md cursor-pointer hover:border-cyan-400 transition-colors"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-lg shadow-orange-500/25">
              <Flame className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="text-xs font-mono text-slate-400 light:text-slate-500 font-semibold uppercase">
                Active Streak
              </div>
              <div className="text-2xl font-mono font-extrabold text-slate-100 light:text-slate-900">
                {currentStreak} Days 🔥
              </div>
            </div>
          </div>}
        </div>
      </motion.div>

      {/* Summary Stat Cards Grid */}
      {stats.length > 0 && <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              onClick={() => setActiveTab(item.tab)}
              className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 light:bg-white border border-slate-800 light:border-slate-200 hover:border-cyan-400/50 light:hover:border-indigo-400/50 transition-all duration-300 shadow-md hover:-translate-y-1 cursor-pointer flex flex-col justify-between group"
            >
              <div className={`w-9 h-9 rounded-xl border flex items-center justify-center mb-3 ${item.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-mono font-extrabold text-slate-100 light:text-slate-900 group-hover:text-cyan-400 light:group-hover:text-indigo-600 transition-colors">
                  {item.value}
                </div>
                <div className="text-xs text-slate-400 light:text-slate-600 font-sans mt-0.5">
                  {item.label}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>}

      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.2 }}
        className="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 sm:p-6 shadow-xl"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-cyan-400">Live integration</p>
            <h2 className="font-heading font-extrabold text-xl text-slate-100 flex items-center gap-2"><Github className="w-5 h-5" /> GitHub activity</h2>
          </div>
          <a href={githubProfile?.html_url || PROFILE.socials?.github || '#'} target="_blank" rel="noreferrer" className="text-xs font-mono text-cyan-400 hover:underline">Open profile ↗</a>
        </div>
        {githubLoading && <p className="text-sm text-slate-400">Loading live repositories from GitHub…</p>}
        {githubError && <p className="text-sm text-amber-300">GitHub is temporarily unavailable. No sample repositories are shown.</p>}
        {!githubLoading && !githubError && githubProfile && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
              <div className="rounded-2xl bg-slate-950/70 border border-slate-800 p-3"><strong className="block text-2xl text-slate-100">{githubProfile.public_repos}</strong><span className="text-xs text-slate-400">Public repos</span></div>
              <div className="rounded-2xl bg-slate-950/70 border border-slate-800 p-3"><strong className="block text-2xl text-slate-100">{githubProfile.followers}</strong><span className="text-xs text-slate-400">Followers</span></div>
              <div className="rounded-2xl bg-slate-950/70 border border-slate-800 p-3"><strong className="block text-2xl text-slate-100">{githubRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0)}</strong><span className="text-xs text-slate-400">Stars shown</span></div>
              <div className="rounded-2xl bg-slate-950/70 border border-slate-800 p-3"><strong className="block text-2xl text-slate-100">{githubRepos.reduce((sum, repo) => sum + repo.forks_count, 0)}</strong><span className="text-xs text-slate-400">Forks shown</span></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {githubRepos.slice(0, 3).map((repo) => (
                <a key={repo.id} href={repo.html_url} target="_blank" rel="noreferrer" className="rounded-2xl bg-slate-950/70 border border-slate-800 p-4 hover:border-cyan-400/60 hover:-translate-y-1 transition-all">
                  <div className="flex items-center justify-between gap-2"><strong className="text-sm text-slate-100 truncate">{repo.name}</strong><span className="text-xs text-cyan-400">{repo.language}</span></div>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2">{repo.description}</p>
                  <div className="flex gap-3 mt-3 text-xs text-slate-500"><span><Star className="inline w-3 h-3" /> {repo.stargazers_count}</span><span><GitFork className="inline w-3 h-3" /> {repo.forks_count}</span></div>
                </a>
              ))}
            </div>
          </>
        )}
      </motion.section>

      {/* Main Grid: Courses In Progress + Skills Progress */}
      {(inProgressCourses.length > 0 || skillList.length > 0) && <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left 7 cols: Courses Currently Learning */}
        {inProgressCourses.length > 0 && <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-heading font-extrabold text-lg sm:text-xl text-slate-100 light:text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-cyan-400 light:text-indigo-600" />
              <span>Courses In Progress</span>
            </h2>

            <button
              onClick={() => setActiveTab('courses')}
              className="text-xs font-mono font-semibold text-cyan-400 light:text-indigo-600 hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-4">
            {inProgressCourses.slice(0, 3).map((course) => (
              <div
                key={course.id}
                onClick={() => setActiveTab('courses')}
                className="p-5 rounded-2xl bg-slate-900/90 light:bg-white border border-slate-800 light:border-slate-200 hover:border-cyan-500/40 transition-all shadow-md cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-16 h-16 rounded-xl object-cover border border-slate-800 light:border-slate-200 shrink-0"
                  />
                  <div>
                    <span className="text-[10px] font-mono font-bold text-cyan-400 light:text-indigo-600 uppercase tracking-wider">
                      {course.platform}
                    </span>
                    <h3 className="font-heading font-bold text-sm sm:text-base text-slate-100 light:text-slate-900 group-hover:text-cyan-400 light:group-hover:text-indigo-600 transition-colors leading-snug">
                      {course.title}
                    </h3>
                    <div className="text-xs text-slate-400 light:text-slate-500 font-sans mt-0.5">
                      {course.completedLessons} of {course.totalLessons} lessons ({course.progress}%)
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full sm:w-36 shrink-0">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-300 light:text-slate-700 mb-1">
                    <span>Progress</span>
                    <span className="font-bold">{course.progress}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-950 light:bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full transition-all duration-500"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>}

        {/* Right 5 cols: Key Skills Growth */}
        {skillList.length > 0 && <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-heading font-extrabold text-lg sm:text-xl text-slate-100 light:text-slate-900 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-indigo-400 light:text-indigo-600" />
              <span>Skill Development</span>
            </h2>

            <button
              onClick={() => setActiveTab('skills')}
              className="text-xs font-mono font-semibold text-cyan-400 light:text-indigo-600 hover:underline flex items-center gap-1"
            >
              <span>Manage</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/90 light:bg-white border border-slate-800 light:border-slate-200 space-y-4 shadow-md">
            {skillList.slice(0, 5).map((skill) => (
              <div key={skill.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-slate-200 light:text-slate-800">{skill.name}</span>
                  <span className="text-cyan-400 light:text-indigo-600 font-bold">{skill.level} ({skill.progress}%)</span>
                </div>
                <div className="h-2 w-full bg-slate-950 light:bg-slate-100 rounded-full overflow-hidden border border-slate-800/40">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-teal-400 rounded-full"
                    style={{ width: `${skill.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>}

      </div>}

      {/* Bottom Grid: Recent Activity + Active Goals */}
      {(activityList.length > 0 || activeGoals.length > 0) && <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
        {/* Recent Activity Log */}
        {activityList.length > 0 && <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading font-extrabold text-lg sm:text-xl text-slate-100 light:text-slate-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-teal-400 light:text-indigo-600" />
              <span>Recent Activity Stream</span>
            </h2>
            <button
              onClick={() => setActiveTab('streak')}
              className="text-xs font-mono font-semibold text-cyan-400 light:text-indigo-600 hover:underline"
            >
              Full Log
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/90 light:bg-white border border-slate-800 light:border-slate-200 space-y-3 shadow-md">
            {activityList.slice(0, 5).map((act) => (
              <div key={act.id} className="flex items-center justify-between gap-3 py-2 border-b border-slate-800/40 light:border-slate-100 last:border-0 text-xs">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 light:bg-indigo-600 shrink-0" />
                  <div>
                    <span className="font-mono font-bold text-cyan-400 light:text-indigo-600 mr-2">[{act.action}]</span>
                    <span className="text-slate-200 light:text-slate-800">{act.title}</span>
                  </div>
                </div>
                <span className="font-mono text-[10px] text-slate-500 shrink-0">{act.timestamp}</span>
              </div>
            ))}
          </div>
        </div>}

        {/* Active Learning Goals */}
        {activeGoals.length > 0 && <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading font-extrabold text-lg sm:text-xl text-slate-100 light:text-slate-900 flex items-center gap-2">
              <Target className="w-5 h-5 text-amber-400 light:text-indigo-600" />
              <span>Active Goals</span>
            </h2>
            <button
              onClick={() => setActiveTab('goals')}
              className="text-xs font-mono font-semibold text-cyan-400 light:text-indigo-600 hover:underline"
            >
              All Goals
            </button>
          </div>

          <div className="space-y-3">
            {activeGoals.slice(0, 3).map((goal) => (
              <div key={goal.id} className="p-4 rounded-2xl bg-slate-900/90 light:bg-white border border-slate-800 light:border-slate-200 shadow-md">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-mono font-bold text-amber-400 light:text-amber-600">
                    Deadline: {goal.deadline}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    {goal.priority} Priority
                  </span>
                </div>
                <h4 className="font-heading font-bold text-sm text-slate-100 light:text-slate-900 mb-2">
                  {goal.title}
                </h4>
                <div className="h-1.5 w-full bg-slate-950 light:bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full" style={{ width: `${goal.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>}
      </div>}

      {/* Personal Notes Quick Workspace Section */}
      {noteList.length > 0 && <div className="pt-4 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-extrabold text-lg sm:text-xl text-slate-100 light:text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400 light:text-indigo-600" />
            <span>Personal & Study Notes</span>
          </h2>
          <button
            onClick={() => setActiveTab('notes')}
            className="text-xs font-mono font-semibold text-cyan-400 light:text-indigo-600 hover:underline flex items-center gap-1"
          >
            <span>Open All Notes ({noteList.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {noteList.slice(0, 2).map((note) => (
            <div
              key={note.id}
              onClick={() => setActiveTab('notes')}
              className="p-5 rounded-2xl bg-slate-900/90 light:bg-white border border-slate-800 light:border-slate-200 hover:border-indigo-500/50 transition-all shadow-md cursor-pointer space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-extrabold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  {note.category}
                </span>
                <span className="text-[10px] font-mono text-slate-500">{note.updatedDate}</span>
              </div>
              <h4 className="font-heading font-bold text-sm text-slate-100 light:text-slate-900 group-hover:text-cyan-400 transition-colors">
                {note.title}
              </h4>
              <p className="text-xs text-slate-400 light:text-slate-600 line-clamp-2 font-mono">
                {note.content}
              </p>
            </div>
          ))}
        </div>
      </div>}
    </div>
  );
};
