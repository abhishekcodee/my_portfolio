import React from 'react';
import { useDashboard } from '../../context/useDashboard';
import { Flame, Clock, Calendar, Award } from 'lucide-react';

export const ActivityStreak = () => {
  const { streak, activities } = useDashboard();
  const activityList = activities || [];
  const currentStreak = Number(streak?.currentStreak);
  const longestStreak = Number(streak?.longestStreak);
  const totalHours = Number(streak?.totalHours);
  const totalDays = Number(streak?.totalDays);

  const summary = [
    currentStreak > 0 && { label: 'Current Streak', value: `${currentStreak} Days`, icon: Flame, color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
    longestStreak > 0 && { label: 'Longest Streak', value: `${longestStreak} Days`, icon: Award, color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' },
    totalHours > 0 && { label: 'Total Learning Hours', value: `${totalHours} Hours`, icon: Clock, color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' },
    totalDays > 0 && { label: 'Total Learning Days', value: `${totalDays} Days`, icon: Calendar, color: 'bg-teal-500/10 text-teal-400 border-teal-500/20' },
  ].filter(Boolean);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-100 light:text-slate-900 tracking-tight flex items-center gap-2">
          <Flame className="w-7 h-7 text-amber-400 light:text-indigo-600" />
          <span>Learning Activity & Streak</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 light:text-slate-600 mt-1">
          Only activity and learning metrics explicitly recorded in this dashboard are shown.
        </p>
      </div>

      {summary.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {summary.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="p-6 rounded-3xl bg-slate-900/90 light:bg-white border border-slate-800 light:border-slate-200 shadow-xl flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${item.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400 uppercase font-bold">{item.label}</div>
                  <div className="text-2xl font-mono font-extrabold text-slate-100 light:text-slate-900">{item.value}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activityList.length > 0 && (
        <div className="p-6 rounded-3xl bg-slate-900/90 light:bg-white border border-slate-800 light:border-slate-200 shadow-xl space-y-4">
          <h2 className="font-heading font-extrabold text-lg text-slate-100 light:text-slate-900">
            Chronological Activity Log
          </h2>

          <div className="space-y-4 pl-4 border-l-2 border-slate-800 light:border-slate-200">
            {activityList.map((act) => (
              <div key={act.id} className="relative pl-6 space-y-1">
                <span className="absolute -left-[23px] top-1 w-3.5 h-3.5 rounded-full bg-cyan-400 light:bg-indigo-600 border-2 border-slate-900" />
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-extrabold text-cyan-400 light:text-indigo-600">{act.action}</span>
                  <span className="text-slate-500">{act.timestamp}</span>
                </div>
                <div className="text-sm font-semibold text-slate-200 light:text-slate-800 font-sans">{act.title}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
