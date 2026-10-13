import React, { useState } from 'react';
import { useDashboard } from '../../context/useDashboard';
import { motion } from 'framer-motion';
import { Target, Plus, Clock, Trash2, Edit, X } from 'lucide-react';

export const GoalsManager = () => {
  const { goals, addItem, updateItem, deleteItem } = useDashboard();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
     priority: '',
     progress: 0,
     status: '',
    relatedCourse: '',
    relatedSkill: '',
  });

  const handleOpenAdd = () => {
    setEditingGoal(null);
    setFormData({
      title: '',
      description: '',
       deadline: '',
       priority: '',
      progress: 0,
       status: '',
      relatedCourse: '',
      relatedSkill: '',
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (goal) => {
    setEditingGoal(goal);
    setFormData({ ...goal });
    setIsAddModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingGoal) {
      updateItem('goals', editingGoal.id, formData);
    } else {
      addItem('goals', formData);
    }
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-100 light:text-slate-900 tracking-tight flex items-center gap-2">
            <Target className="w-7 h-7 text-amber-400 light:text-indigo-600" />
            <span>Learning Goals & Milestones</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 light:text-slate-600 mt-1">
            Set deadlines, prioritize certifications, and track project execution targets.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-medium text-xs sm:text-sm shadow-lg shadow-indigo-500/25 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Goal</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(goals || []).map((goal) => (
          <motion.div
            key={goal.id}
            layout
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-3xl bg-slate-900/90 light:bg-white border border-slate-800 light:border-slate-200 shadow-xl flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  {goal.priority} Priority
                </span>

                <div className="flex items-center gap-1">
                  <button onClick={() => handleOpenEdit(goal)} className="p-1 text-slate-400 hover:text-indigo-400">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => deleteItem('goals', goal.id)} className="p-1 text-slate-400 hover:text-rose-400">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div>
                <h3 className="font-heading font-extrabold text-lg text-slate-100 light:text-slate-900 group-hover:text-amber-400 transition-colors leading-snug">
                  {goal.title}
                </h3>
                <p className="text-xs text-slate-300 light:text-slate-600 leading-relaxed mt-1 font-sans">
                  {goal.description}
                </p>
              </div>

              <div className="space-y-1.5 pt-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {goal.deadline}
                  </span>
                  <span className="font-extrabold text-amber-400">{goal.progress}%</span>
                </div>
                <div className="h-2 w-full bg-slate-950 light:bg-slate-100 rounded-full overflow-hidden border border-slate-800/60">
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md p-6 rounded-3xl bg-slate-900 light:bg-white border border-slate-800 light:border-slate-200 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-heading font-extrabold text-lg text-slate-100 light:text-slate-900">
                {editingGoal ? 'Edit Goal' : 'Create New Goal'}
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs font-sans">
              <div>
                <label className="block text-slate-300 light:text-slate-700 font-mono font-semibold mb-1">Goal Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Complete AWS Cloud Practitioner Exam"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 light:bg-slate-50 text-slate-100 light:text-slate-900 border border-slate-800 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 light:text-slate-700 font-mono font-semibold mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Details and action items..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 light:bg-slate-50 text-slate-100 light:text-slate-900 border border-slate-800 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 light:text-slate-700 font-mono font-semibold mb-1">Deadline</label>
                  <input
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 light:bg-slate-50 text-slate-100 light:text-slate-900 border border-slate-800 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 light:text-slate-700 font-mono font-semibold mb-1">Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 light:bg-slate-50 text-slate-100 light:text-slate-900 border border-slate-800 focus:outline-none focus:border-cyan-400"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-1.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md"
                >
                  Save Goal
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};
