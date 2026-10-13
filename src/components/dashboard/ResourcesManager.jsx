import React, { useState } from 'react';
import { useDashboard } from '../../context/useDashboard';
import { motion } from 'framer-motion';
import { Bookmark, Plus, ExternalLink, Star, Trash2, Edit, X, Search } from 'lucide-react';

export const ResourcesManager = () => {
  const { resources, addItem, updateItem, deleteItem } = useDashboard();
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingRes, setEditingRes] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    url: '',
     type: '',
    description: '',
     tags: '',
     favorite: false,
  });

  const types = ['All', 'Documentation', 'Reference', 'Video', 'Article', 'GitHub', 'Course', 'Tool'];

  const filtered = (resources || []).filter((r) => {
    const matchesType = selectedType === 'All' || r?.type === selectedType;
    const matchesSearch =
      (r?.title || '').toLowerCase().includes((search || '').toLowerCase()) ||
      (r?.description || '').toLowerCase().includes((search || '').toLowerCase()) ||
      (r?.tags && r.tags.some((t) => (t || '').toLowerCase().includes((search || '').toLowerCase())));
    return matchesType && matchesSearch;
  });

  const handleOpenAdd = () => {
    setEditingRes(null);
    setFormData({
      title: '',
      url: '',
       type: '',
      description: '',
       tags: '',
       favorite: false,
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (res) => {
    setEditingRes(res);
    setFormData({
      ...res,
      tags: Array.isArray(res.tags) ? res.tags.join(', ') : res.tags,
    });
    setIsAddModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tagsArray = typeof formData.tags === 'string'
      ? formData.tags.split(',').map((t) => t.trim()).filter(Boolean)
      : formData.tags;

    const payload = { ...formData, tags: tagsArray };

    if (editingRes) {
      updateItem('resources', editingRes.id, payload);
    } else {
      addItem('resources', payload);
    }
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-100 light:text-slate-900 tracking-tight flex items-center gap-2">
            <Bookmark className="w-7 h-7 text-cyan-400 light:text-indigo-600" />
            <span>Learning Resources & Bookmarks</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 light:text-slate-600 mt-1">
            Save documentation links, YouTube tutorials, research articles, and GitHub repos.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-medium text-xs sm:text-sm shadow-lg shadow-indigo-500/25 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Resource</span>
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
            placeholder="Search bookmarks by title or tag..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950/80 light:bg-slate-50 text-slate-100 light:text-slate-900 border border-slate-800 focus:outline-none focus:border-cyan-400 text-xs sm:text-sm"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedType(t)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap cursor-pointer ${
                selectedType === t
                  ? 'bg-cyan-500/20 text-cyan-400 light:bg-indigo-600 light:text-white border border-cyan-500/30'
                  : 'bg-slate-950/60 light:bg-slate-100 text-slate-400 light:text-slate-600 border border-slate-800 light:border-slate-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Resource Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((res) => (
          <motion.div
            key={res.id}
            layout
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 rounded-3xl bg-slate-900/90 light:bg-white border border-slate-800 light:border-slate-200 hover:border-cyan-500/50 transition-all duration-300 shadow-xl flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-extrabold bg-cyan-500/10 text-cyan-400 light:bg-indigo-50 light:text-indigo-600 border border-cyan-500/20">
                  {res.type}
                </span>

                <div className="flex items-center gap-2">
                  {res.favorite && <Star className="w-4 h-4 text-amber-400 fill-amber-400/20" />}
                  <button onClick={() => handleOpenEdit(res)} className="p-1 text-slate-400 hover:text-indigo-400">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => deleteItem('resources', res.id)} className="p-1 text-slate-400 hover:text-rose-400">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div>
                <h3 className="font-heading font-extrabold text-base sm:text-lg text-slate-100 light:text-slate-900 group-hover:text-cyan-400 transition-colors leading-snug">
                  {res.title}
                </h3>
                <p className="text-xs text-slate-300 light:text-slate-600 leading-relaxed mt-1 font-sans">
                  {res.description}
                </p>
              </div>

              {res.tags && (
                <div className="flex flex-wrap gap-1 pt-1">
                  {(Array.isArray(res.tags) ? res.tags : res.tags.split(',')).map((t, idx) => (
                    <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 light:bg-slate-100 text-slate-400 light:text-slate-600 border border-slate-800">
                      #{t.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4 mt-3 border-t border-slate-800/40 light:border-slate-100 flex items-center justify-between">
              <a
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-400 light:text-indigo-600 hover:underline"
              >
                <span>Launch Link</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
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
                {editingRes ? 'Edit Resource' : 'Add New Bookmark'}
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs font-sans">
              <div>
                <label className="block text-slate-300 light:text-slate-700 font-mono font-semibold mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. PHP PDO Official Manual"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 light:bg-slate-50 text-slate-100 light:text-slate-900 border border-slate-800 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 light:text-slate-700 font-mono font-semibold mb-1">URL</label>
                <input
                  type="url"
                  required
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 light:bg-slate-50 text-slate-100 light:text-slate-900 border border-slate-800 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 light:text-slate-700 font-mono font-semibold mb-1">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 light:bg-slate-50 text-slate-100 light:text-slate-900 border border-slate-800 focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Documentation">Documentation</option>
                    <option value="Reference">Reference</option>
                    <option value="Video">Video</option>
                    <option value="Article">Article</option>
                    <option value="GitHub">GitHub</option>
                    <option value="Tool">Tool</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 light:text-slate-700 font-mono font-semibold mb-1">Tags</label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="PHP, Database"
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
                  Save Resource
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};
