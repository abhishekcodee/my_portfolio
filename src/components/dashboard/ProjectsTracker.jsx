import React, { useState } from 'react';
import { useDashboard } from '../../context/useDashboard';
import { motion } from 'framer-motion';
import { FolderCode, Plus, ExternalLink, Trash2, Edit, X } from 'lucide-react';
import { Github } from '../ui/Icons';

export const ProjectsTracker = () => {
  const { projects, addItem, updateItem, deleteItem } = useDashboard();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
     technologies: '',
    githubUrl: '',
    liveUrl: '',
    startDate: '',
    endDate: '',
     status: '',
     image: '',
  });

  const handleOpenAdd = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      description: '',
       technologies: '',
      githubUrl: '',
      liveUrl: '',
       startDate: '',
      endDate: '',
       status: '',
       image: '',
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (project) => {
    setEditingProject(project);
    setFormData({
      ...project,
      technologies: Array.isArray(project.technologies) ? project.technologies.join(', ') : project.technologies,
    });
    setIsAddModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const techArray = typeof formData.technologies === 'string'
      ? formData.technologies.split(',').map((t) => t.trim()).filter(Boolean)
      : formData.technologies;

    const payload = { ...formData, technologies: techArray };

    if (editingProject) {
      updateItem('projects', editingProject.id, payload);
    } else {
      addItem('projects', payload);
    }
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-100 light:text-slate-900 tracking-tight flex items-center gap-2">
            <FolderCode className="w-7 h-7 text-purple-400 light:text-indigo-600" />
            <span>Private Project Tracker</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 light:text-slate-600 mt-1">
            Connect learning courses with real-world development projects.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-medium text-xs sm:text-sm shadow-lg shadow-indigo-500/25 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Project</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(projects || []).map((project) => (
          <motion.div
            key={project.id}
            layout
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, scale: 1 }}
            className="group rounded-3xl bg-slate-900/90 light:bg-white border border-slate-800 light:border-slate-200 hover:border-purple-500/50 transition-all duration-300 shadow-xl overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="relative h-40 overflow-hidden bg-slate-950">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 backdrop-blur-md">
                  {project.status}
                </span>
              </div>

              <div className="p-5 space-y-3">
                <h3 className="font-heading font-extrabold text-base sm:text-lg text-slate-100 light:text-slate-900 group-hover:text-purple-400 transition-colors leading-snug">
                  {project.title}
                </h3>
                <p className="text-xs text-slate-300 light:text-slate-600 leading-relaxed font-sans line-clamp-3">
                  {project.description}
                </p>

                {project.technologies && (
                  <div className="flex flex-wrap gap-1">
                    {(Array.isArray(project.technologies) ? project.technologies : project.technologies.split(',')).map((t, idx) => (
                      <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 light:bg-slate-100 text-slate-400 light:text-slate-600 border border-slate-800 light:border-slate-200">
                        {t.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="p-5 pt-0 flex items-center justify-between gap-2 border-t border-slate-800/40 light:border-slate-100 mt-2">
              <div className="flex items-center gap-2">
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg text-slate-400 hover:text-white">
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>

              <div className="flex items-center gap-1">
                <button onClick={() => handleOpenEdit(project)} className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-400">
                  <Edit className="w-4 h-4" />
                </button>
                <button onClick={() => deleteItem('projects', project.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400">
                  <Trash2 className="w-4 h-4" />
                </button>
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
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs font-sans">
              <div>
                <label className="block text-slate-300 light:text-slate-700 font-mono font-semibold mb-1">Project Name</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. HRMS Enterprise Management System"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 light:bg-slate-50 text-slate-100 light:text-slate-900 border border-slate-800 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 light:text-slate-700 font-mono font-semibold mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Project architecture and details..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 light:bg-slate-50 text-slate-100 light:text-slate-900 border border-slate-800 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 light:text-slate-700 font-mono font-semibold mb-1">Technologies (Comma separated)</label>
                <input
                  type="text"
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  placeholder="PHP, MySQL, PDO, Bootstrap"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 light:bg-slate-50 text-slate-100 light:text-slate-900 border border-slate-800 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 light:text-slate-700 font-mono font-semibold mb-1">GitHub URL</label>
                  <input
                    type="url"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 light:bg-slate-50 text-slate-100 light:text-slate-900 border border-slate-800 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 light:text-slate-700 font-mono font-semibold mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 light:bg-slate-50 text-slate-100 light:text-slate-900 border border-slate-800 focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Idea">Idea</option>
                    <option value="In Development">In Development</option>
                    <option value="Completed">Completed</option>
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
                  Save Project
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};
