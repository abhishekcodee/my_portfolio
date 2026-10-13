import React, { useState } from 'react';
import { useDashboard } from '../../context/useDashboard';
import { motion } from 'framer-motion';
import { FileText, Plus, Search, Pin, Star, Trash2, Edit, X, Copy, Check, Maximize2, Minimize2 } from 'lucide-react';

export const NotesManager = () => {
  const { notes, addItem, updateItem, deleteItem } = useDashboard();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isModalFullScreen, setIsModalFullScreen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
     category: '',
     tags: '',
    relatedCourse: '',
    relatedProject: '',
    pinned: false,
    favorite: false,
  });

  const categories = ['All', 'Personal', 'PHP', 'Python', 'JavaScript', 'MySQL', 'AWS', 'IoT', 'Ideas'];

  const filtered = (notes || []).filter((note) => {
    const matchesCategory = selectedCategory === 'All' || note?.category === selectedCategory;
    const matchesSearch =
      (note?.title || '').toLowerCase().includes((search || '').toLowerCase()) ||
      (note?.content || '').toLowerCase().includes((search || '').toLowerCase()) ||
      (note?.tags && note.tags.some((t) => (t || '').toLowerCase().includes((search || '').toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  // Sort pinned notes to top
  const sorted = [...filtered].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));

  const handleOpenAdd = () => {
    setEditingNote(null);
    setIsModalFullScreen(false);
    setFormData({
      title: '',
       content: '',
       category: '',
       tags: '',
      relatedCourse: '',
      relatedProject: '',
      pinned: false,
      favorite: false,
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (note) => {
    setEditingNote(note);
    setIsModalFullScreen(false);
    setFormData({
      ...note,
      tags: Array.isArray(note.tags) ? note.tags.join(', ') : note.tags,
    });
    setIsAddModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tagsArray = typeof formData.tags === 'string'
      ? formData.tags.split(',').map((t) => t.trim()).filter(Boolean)
      : formData.tags;

    const payload = {
      ...formData,
      tags: tagsArray,
      createdDate: editingNote ? editingNote.createdDate : new Date().toISOString().split('T')[0],
      updatedDate: new Date().toISOString().split('T')[0],
    };

    if (editingNote) {
      updateItem('notes', editingNote.id, payload);
    } else {
      addItem('notes', payload);
    }

    setIsAddModalOpen(false);
  };

  const copyContent = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-100 light:text-slate-900 tracking-tight flex items-center gap-2">
            <FileText className="w-7 h-7 text-indigo-400 light:text-indigo-600" />
            <span>Developer & Personal Notes</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 light:text-slate-600 mt-1">
            Notion-inspired markdown notes, code snippets, study guides, and personal scratchpad.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-medium text-xs sm:text-sm shadow-lg shadow-indigo-500/25 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Note</span>
        </button>
      </div>

      {/* Category Tabs & Search */}
      <div className="p-4 rounded-2xl bg-slate-900/90 light:bg-white border border-slate-800 light:border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-md">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search notes by title, content or tags..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950/80 light:bg-slate-50 text-slate-100 light:text-slate-900 border border-slate-800 light:border-slate-300 focus:outline-none focus:border-cyan-400 text-xs sm:text-sm"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-indigo-500/20 text-indigo-400 light:bg-indigo-600 light:text-white border border-indigo-500/30'
                  : 'bg-slate-950/60 light:bg-slate-100 text-slate-400 light:text-slate-600 border border-slate-800 light:border-slate-200 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Notes Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sorted.map((note) => (
          <motion.div
            key={note.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="group rounded-3xl bg-slate-900/90 light:bg-white border border-slate-800 light:border-slate-200 hover:border-indigo-500/50 light:hover:border-indigo-400/50 transition-all duration-300 shadow-xl overflow-hidden flex flex-col justify-between"
          >
            <div className="p-6 space-y-3">
              {/* Header: Category & Pin */}
              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-extrabold bg-indigo-500/10 text-indigo-400 light:bg-indigo-50 light:text-indigo-600 border border-indigo-500/20 light:border-indigo-200">
                  {note.category}
                </span>

                <div className="flex items-center gap-1.5 text-slate-500">
                  {note.pinned && <Pin className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400/20" />}
                  {note.favorite && <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />}
                </div>
              </div>

              {/* Title */}
              <h3 className="font-heading font-extrabold text-base sm:text-lg text-slate-100 light:text-slate-900 group-hover:text-cyan-400 light:group-hover:text-indigo-600 transition-colors leading-snug">
                {note.title}
              </h3>

              {/* Snippet Preview */}
              <div className="p-3 rounded-xl bg-slate-950/80 light:bg-slate-50 border border-slate-800/80 light:border-slate-200 font-mono text-[11px] text-slate-300 light:text-slate-700 overflow-hidden line-clamp-4 leading-relaxed whitespace-pre-wrap">
                {note.content}
              </div>

              {/* Tags */}
              {note.tags && (
                <div className="flex flex-wrap gap-1 pt-1">
                  {(Array.isArray(note.tags) ? note.tags : note.tags.split(',')).map((t, idx) => (
                    <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950/60 light:bg-slate-100 text-slate-400 light:text-slate-600 border border-slate-800 light:border-slate-200">
                      #{t.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-800/40 light:border-slate-100 mt-2">
              <span className="text-[10px] font-mono text-slate-500">Updated: {note.updatedDate}</span>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => copyContent(note.content, note.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 transition-colors"
                  title="Copy Content"
                >
                  {copiedId === note.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => handleOpenEdit(note)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-400 transition-colors"
                  title="Edit Note"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteItem('notes', note.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 transition-colors"
                  title="Delete Note"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add / Edit Note Modal with FULL SCREEN Option */}
      {isAddModalOpen && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto ${isModalFullScreen ? 'p-0' : ''}`}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`bg-slate-900 light:bg-white border border-slate-800 light:border-slate-200 shadow-2xl transition-all duration-300 ${
              isModalFullScreen
                ? 'w-full h-full max-w-none rounded-none p-6 sm:p-10 flex flex-col justify-between my-0'
                : 'w-full max-w-2xl p-6 sm:p-8 rounded-3xl space-y-6 my-8'
            }`}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 light:border-slate-200 shrink-0">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-cyan-400 light:text-indigo-600" />
                <h3 className="font-heading font-extrabold text-xl text-slate-100 light:text-slate-900">
                  {editingNote ? 'Edit Developer Note' : 'Create New Note'}
                </h3>
              </div>

              {/* Header Action Controls: Full Screen Expand & Close */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalFullScreen(!isModalFullScreen)}
                  className="p-2 rounded-xl bg-slate-800/80 light:bg-slate-100 text-slate-300 light:text-slate-700 hover:text-cyan-400 light:hover:text-indigo-600 transition-colors cursor-pointer"
                  title={isModalFullScreen ? 'Restore Window Size' : 'Expand to Full Screen Editor'}
                >
                  {isModalFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>

                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-2 rounded-xl bg-slate-800/80 light:bg-slate-100 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title="Close Window"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className={`space-y-4 text-xs font-sans ${isModalFullScreen ? 'flex-1 flex flex-col justify-between pt-4 overflow-y-auto' : ''}`}>
              <div className="space-y-4">
                <div>
                  <label className="block text-slate-300 light:text-slate-700 font-mono font-semibold mb-1">Note Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. PDO Prepared Statements & Security Best Practices"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 light:bg-slate-50 text-slate-100 light:text-slate-900 border border-slate-800 light:border-slate-300 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 light:text-slate-700 font-mono font-semibold mb-1">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-950 light:bg-slate-50 text-slate-100 light:text-slate-900 border border-slate-800 light:border-slate-300 focus:outline-none focus:border-cyan-400"
                    >
                      <option value="Personal">Personal</option>
                      <option value="PHP">PHP</option>
                      <option value="Python">Python</option>
                      <option value="JavaScript">JavaScript</option>
                      <option value="MySQL">MySQL</option>
                      <option value="AWS">AWS</option>
                      <option value="IoT">IoT</option>
                      <option value="Ideas">Ideas</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 light:text-slate-700 font-mono font-semibold mb-1">Tags (Comma separated)</label>
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      placeholder="Security, PDO, Best Practices"
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-950 light:bg-slate-50 text-slate-100 light:text-slate-900 border border-slate-800 light:border-slate-300 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 light:text-slate-700 font-mono font-semibold mb-1">Content (Markdown & Code blocks supported)</label>
                  <textarea
                    rows={isModalFullScreen ? 18 : 8}
                    required
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Write your markdown note or code snippet..."
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 light:bg-slate-50 text-slate-100 light:text-slate-900 border border-slate-800 light:border-slate-300 focus:outline-none focus:border-cyan-400 font-mono text-xs leading-relaxed"
                  />
                </div>

                <div className="flex items-center gap-6 text-xs text-slate-300 light:text-slate-700">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.pinned}
                      onChange={(e) => setFormData({ ...formData, pinned: e.target.checked })}
                      className="rounded bg-slate-950 border-slate-800 text-indigo-600"
                    />
                    <span>Pin Note to Top</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.favorite}
                      onChange={(e) => setFormData({ ...formData, favorite: e.target.checked })}
                      className="rounded bg-slate-950 border-slate-800 text-amber-500"
                    />
                    <span>Mark as Favorite</span>
                  </label>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800/80 light:border-slate-200 shrink-0">
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
                  {editingNote ? 'Save Changes' : 'Create Note'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};
