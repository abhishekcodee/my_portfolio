import React, { useState } from 'react';
import { useDashboard } from '../../context/useDashboard';
import { motion } from 'framer-motion';
import { Cpu, Plus, Edit, Trash2, X } from 'lucide-react';

export const SkillsTracker = () => {
  const { skills, addItem, updateItem, deleteItem } = useDashboard();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
     category: '',
     level: '',
     progress: 0,
     experience: '',
  });

  const handleOpenAdd = () => {
    setEditingSkill(null);
    setFormData({
      name: '',
       category: '',
       level: '',
       progress: 0,
       experience: '',
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (skill) => {
    setEditingSkill(skill);
    setFormData({ ...skill });
    setIsAddModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingSkill) {
      updateItem('skills', editingSkill.id, formData);
    } else {
      addItem('skills', formData);
    }
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-100 light:text-slate-900 tracking-tight flex items-center gap-2">
            <Cpu className="w-7 h-7 text-teal-400 light:text-indigo-600" />
            <span>Skills Development Tracker</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 light:text-slate-600 mt-1">
            Track technical proficiency levels, experience metrics, and skill progression.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-medium text-xs sm:text-sm shadow-lg shadow-indigo-500/25 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Skill</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {(skills || []).map((skill) => (
          <motion.div
            key={skill.id}
            layout
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-3xl bg-slate-900/90 light:bg-white border border-slate-800 light:border-slate-200 shadow-xl flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-extrabold bg-teal-500/10 text-teal-400 light:bg-indigo-50 light:text-indigo-600 border border-teal-500/20 light:border-indigo-200">
                  {skill.category}
                </span>

                <div className="flex items-center gap-1">
                  <button onClick={() => handleOpenEdit(skill)} className="p-1 text-slate-400 hover:text-indigo-400">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => deleteItem('skills', skill.id)} className="p-1 text-slate-400 hover:text-rose-400">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div>
                <h3 className="font-heading font-extrabold text-lg text-slate-100 light:text-slate-900 group-hover:text-cyan-400 transition-colors">
                  {skill.name}
                </h3>
                <div className="text-xs font-mono text-slate-400 mt-0.5">
                   Proficiency: <span className="font-bold text-cyan-400 light:text-indigo-600">{skill.level || 'Not recorded'}</span>{skill.experience ? ` • Exp: ${skill.experience}` : ''}
                </div>
              </div>

              {/* Progress bar */}
              <div className="space-y-1.5 pt-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Mastery Level</span>
                  <span className="font-extrabold text-slate-100 light:text-slate-900">{skill.progress}%</span>
                </div>
                <div className="h-2.5 w-full bg-slate-950 light:bg-slate-100 rounded-full overflow-hidden border border-slate-800/60">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-teal-400 rounded-full transition-all duration-500"
                    style={{ width: `${skill.progress}%` }}
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
                {editingSkill ? 'Edit Skill' : 'Add New Skill'}
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs font-sans">
              <div>
                <label className="block text-slate-300 light:text-slate-700 font-mono font-semibold mb-1">Skill Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Core PHP & PDO Security"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 light:bg-slate-50 text-slate-100 light:text-slate-900 border border-slate-800 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 light:text-slate-700 font-mono font-semibold mb-1">Category</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="e.g. Backend Development"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 light:bg-slate-50 text-slate-100 light:text-slate-900 border border-slate-800 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 light:text-slate-700 font-mono font-semibold mb-1">Level</label>
                  <select
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 light:bg-slate-50 text-slate-100 light:text-slate-900 border border-slate-800 focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 light:text-slate-700 font-mono font-semibold mb-1">Progress (%)</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={formData.progress}
                    onChange={(e) => setFormData({ ...formData, progress: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 light:bg-slate-50 text-slate-100 light:text-slate-900 border border-slate-800 focus:outline-none focus:border-cyan-400"
                  />
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
                  Save Skill
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};
