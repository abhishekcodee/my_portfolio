import React, { useState } from 'react';
import { useDashboard } from '../../context/useDashboard';
import { motion } from 'framer-motion';
import { BookOpen, Plus, Search, CheckCircle2, Circle, Play, Trash2, X, Calendar, User } from 'lucide-react';

export const CoursesManager = () => {
  const { courses, addItem, updateItem, deleteItem, toggleCourseLesson } = useDashboard();
  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [detailCourse, setDetailCourse] = useState(null);
  const [editingCourse, setEditingCourse] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    platform: '',
    instructor: '',
    courseUrl: '',
    thumbnail: '',
    startDate: '',
    targetCompletionDate: '',
    status: '',
    progress: 0,
    duration: '',
    skills: '',
    description: '',
    notes: '',
    priority: '',
  });

  const statuses = ['All', 'Currently Learning', 'Completed', 'Planned', 'Paused'];

  const filtered = (courses || []).filter((c) => {
    const matchesStatus = selectedStatus === 'All' || c?.status === selectedStatus;
    const matchesSearch =
      (c?.title || '').toLowerCase().includes((search || '').toLowerCase()) ||
      (c?.platform || '').toLowerCase().includes((search || '').toLowerCase()) ||
      (c?.instructor || '').toLowerCase().includes((search || '').toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleOpenAdd = () => {
    setEditingCourse(null);
    setFormData({
      title: '',
       platform: '',
      instructor: '',
      courseUrl: '',
       thumbnail: '',
       startDate: '',
      targetCompletionDate: '',
       status: '',
      progress: 0,
       duration: '',
       skills: '',
      description: '',
      notes: '',
       priority: '',
    });
    setIsAddModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const skillsArray = typeof formData.skills === 'string'
      ? formData.skills.split(',').map((s) => s.trim()).filter(Boolean)
      : formData.skills;

    const payload = {
      ...formData,
      skills: skillsArray,
      totalLessons: 0,
      completedLessons: 0,
      lessons: [],
    };

    if (editingCourse) {
      updateItem('courses', editingCourse.id, payload);
    } else {
      addItem('courses', payload);
    }

    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-100 light:text-slate-900 tracking-tight flex items-center gap-2">
            <BookOpen className="w-7 h-7 text-cyan-400 light:text-indigo-600" />
            <span>My Learning Courses</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 light:text-slate-600 mt-1">
            Track active courses, lesson modules, target dates, and completion statistics.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-medium text-xs sm:text-sm shadow-lg shadow-indigo-500/25 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Course</span>
        </button>
      </div>

      {/* Filter Tabs & Search */}
      <div className="p-4 rounded-2xl bg-slate-900/90 light:bg-white border border-slate-800 light:border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-md">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search courses by name, platform or instructor..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950/80 light:bg-slate-50 text-slate-100 light:text-slate-900 border border-slate-800 light:border-slate-300 focus:outline-none focus:border-cyan-400 text-xs sm:text-sm"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap cursor-pointer ${
                selectedStatus === st
                  ? 'bg-cyan-500/20 text-cyan-400 light:bg-indigo-600 light:text-white border border-cyan-500/30'
                  : 'bg-slate-950/60 light:bg-slate-100 text-slate-400 light:text-slate-600 border border-slate-800 light:border-slate-200 hover:text-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((course) => (
          <motion.div
            key={course.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="group rounded-3xl bg-slate-900/90 light:bg-white border border-slate-800 light:border-slate-200 hover:border-cyan-500/50 light:hover:border-indigo-400/50 transition-all duration-300 shadow-xl overflow-hidden flex flex-col justify-between"
          >
            <div>
              {/* Thumbnail Banner */}
              <div className="relative h-44 overflow-hidden bg-slate-950">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent light:from-slate-900/80" />

                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
                    {course.platform}
                  </span>
                </div>

                <div className="absolute top-3 right-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border backdrop-blur-md ${
                    course.status === 'Completed'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                      : course.status === 'Currently Learning'
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
                      : 'bg-slate-500/20 text-slate-300 border-slate-500/30'
                  }`}>
                    {course.status}
                  </span>
                </div>
              </div>

              {/* Course Info */}
              <div className="p-5 space-y-3">
                <h3 className="font-heading font-extrabold text-base sm:text-lg text-slate-100 light:text-slate-900 group-hover:text-cyan-400 light:group-hover:text-indigo-600 transition-colors leading-snug">
                  {course.title}
                </h3>

                <div className="flex items-center gap-4 text-xs text-slate-400 light:text-slate-500 font-mono">
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5" />
                    {course.instructor}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {course.targetCompletionDate || 'No Target'}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="space-y-1 pt-1">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-300 light:text-slate-700">
                    <span>Lessons: {course.completedLessons || 0}/{course.totalLessons || 0}</span>
                    <span className="font-bold text-cyan-400 light:text-indigo-600">{course.progress}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-950 light:bg-slate-100 rounded-full overflow-hidden border border-slate-800/40">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-teal-400 rounded-full transition-all duration-500"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-5 pt-0 flex items-center justify-between gap-2 border-t border-slate-800/40 light:border-slate-100 mt-2">
              <button
                onClick={() => setDetailCourse(course)}
                className="w-full py-2 rounded-xl bg-slate-800/80 light:bg-slate-100 text-slate-200 light:text-slate-800 hover:text-cyan-400 light:hover:text-indigo-600 font-mono text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Continue & Lessons</span>
              </button>

              <button
                onClick={() => deleteItem('courses', course.id)}
                className="p-2 rounded-xl text-slate-400 hover:text-rose-400 transition-colors"
                title="Delete Course"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Course Detail Modal with Interactive Lessons Checklist */}
      {detailCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl p-6 sm:p-8 rounded-3xl bg-slate-900 light:bg-white border border-slate-800 light:border-slate-200 shadow-2xl space-y-6 my-8"
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 light:border-slate-200">
              <div>
                <span className="text-xs font-mono font-bold text-cyan-400 light:text-indigo-600 uppercase">
                  {detailCourse.platform} • {detailCourse.duration}
                </span>
                <h3 className="font-heading font-extrabold text-xl text-slate-100 light:text-slate-900 mt-1">
                  {detailCourse.title}
                </h3>
              </div>
              <button onClick={() => setDetailCourse(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Course Progress Header */}
            <div className="p-4 rounded-2xl bg-slate-950 light:bg-slate-50 border border-slate-800 light:border-slate-200 flex items-center justify-between">
              <div>
                <div className="text-xs font-mono text-slate-400">Course Completion Progress</div>
                <div className="text-2xl font-mono font-extrabold text-cyan-400 light:text-indigo-600">
                  {detailCourse.progress}% Completed
                </div>
              </div>
              <div className="text-xs font-mono text-slate-400">
                Instructor: <span className="font-bold text-slate-200 light:text-slate-800">{detailCourse.instructor}</span>
              </div>
            </div>

            {/* Interactive Lesson Checklist */}
            <div className="space-y-3">
              <h4 className="font-heading font-bold text-sm text-slate-200 light:text-slate-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 light:text-indigo-600" />
                <span>Interactive Module Checklist (Click to complete)</span>
              </h4>

              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {detailCourse.lessons?.map((lesson) => (
                  <div
                    key={lesson.id}
                    onClick={() => toggleCourseLesson(detailCourse.id, lesson.id)}
                    className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                      lesson.completed
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 light:text-emerald-700'
                        : 'bg-slate-950/60 light:bg-slate-100 border-slate-800 light:border-slate-200 text-slate-300 light:text-slate-700 hover:border-cyan-500/40'
                    }`}
                  >
                    {lesson.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 text-slate-500 shrink-0" />
                    )}
                    <span className={`text-xs font-mono ${lesson.completed ? 'line-through opacity-80' : ''}`}>
                      {lesson.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {detailCourse.notes && (
              <div className="p-4 rounded-2xl bg-slate-950/60 light:bg-slate-50 border border-slate-800/60 light:border-slate-200">
                <div className="text-xs font-mono font-bold text-indigo-400 light:text-indigo-600 mb-1">Personal Notes:</div>
                <p className="text-xs text-slate-300 light:text-slate-600 leading-relaxed font-sans">{detailCourse.notes}</p>
              </div>
            )}
          </motion.div>
        </div>
      )}

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-xl p-6 sm:p-8 rounded-3xl bg-slate-900 light:bg-white border border-slate-800 light:border-slate-200 shadow-2xl space-y-6 my-8"
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 light:border-slate-200">
              <h3 className="font-heading font-extrabold text-xl text-slate-100 light:text-slate-900">
                Add New Learning Course
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
              <div>
                <label className="block text-slate-300 light:text-slate-700 font-mono font-semibold mb-1">Course Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Python for Automation & Telemetry"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 light:bg-slate-50 text-slate-100 light:text-slate-900 border border-slate-800 light:border-slate-300 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 light:text-slate-700 font-mono font-semibold mb-1">Platform</label>
                  <input
                    type="text"
                    required
                    value={formData.platform}
                    onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                    placeholder="Udemy / Coursera / YouTube"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 light:bg-slate-50 text-slate-100 light:text-slate-900 border border-slate-800 light:border-slate-300 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 light:text-slate-700 font-mono font-semibold mb-1">Instructor</label>
                  <input
                    type="text"
                    value={formData.instructor}
                    onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                    placeholder="Instructor Name"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 light:bg-slate-50 text-slate-100 light:text-slate-900 border border-slate-800 light:border-slate-300 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 light:text-slate-700 font-mono font-semibold mb-1">Target Completion Date</label>
                  <input
                    type="date"
                    value={formData.targetCompletionDate}
                    onChange={(e) => setFormData({ ...formData, targetCompletionDate: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 light:bg-slate-50 text-slate-100 light:text-slate-900 border border-slate-800 light:border-slate-300 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 light:text-slate-700 font-mono font-semibold mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 light:bg-slate-50 text-slate-100 light:text-slate-900 border border-slate-800 light:border-slate-300 focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Currently Learning">Currently Learning</option>
                    <option value="Planned">Planned</option>
                    <option value="Completed">Completed</option>
                    <option value="Paused">Paused</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-medium shadow-md hover:from-indigo-500 hover:to-cyan-500 cursor-pointer"
                >
                  Create Course
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};
