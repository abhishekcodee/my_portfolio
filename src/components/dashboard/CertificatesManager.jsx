import React, { useState } from 'react';
import { useDashboard } from '../../context/useDashboard';
import { motion } from 'framer-motion';
import { Award, Plus, Search, ExternalLink, Edit, Trash2, X, SlidersHorizontal, Eye, Maximize2, Minimize2 } from 'lucide-react';

export const CertificatesManager = () => {
  const { certificates, addItem, updateItem, deleteItem } = useDashboard();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Newest');

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isModalFullScreen, setIsModalFullScreen] = useState(false);
  const [viewCert, setViewCert] = useState(null);
  const [editingCert, setEditingCert] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    issuer: '',
    certId: '',
    issueDate: '',
     expiryDate: '',
     category: '',
    skills: '',
    certUrl: '',
    verifyUrl: '',
    description: '',
     status: '',
     fileType: '',
     image: '',
  });

  const categories = ['All', 'Web Development', 'Python', 'Cloud', 'Database', 'IoT', 'Other'];

  const filtered = (certificates || []).filter((cert) => {
    const matchesCategory = selectedCategory === 'All' || cert?.category === selectedCategory;
    const matchesSearch =
      (cert?.title || '').toLowerCase().includes((search || '').toLowerCase()) ||
      (cert?.issuer || '').toLowerCase().includes((search || '').toLowerCase()) ||
      (cert?.skills && cert.skills.some((s) => (s || '').toLowerCase().includes((search || '').toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'Newest') return new Date(b?.issueDate || 0) - new Date(a?.issueDate || 0);
    if (sortBy === 'Oldest') return new Date(a?.issueDate || 0) - new Date(b?.issueDate || 0);
    if (sortBy === 'Organization') return (a?.issuer || '').localeCompare(b?.issuer || '');
    return (a?.title || '').localeCompare(b?.title || '');
  });

  const handleOpenAdd = () => {
    setEditingCert(null);
    setFormData({
      title: '',
      issuer: '',
      certId: '',
       issueDate: '',
       expiryDate: '',
       category: '',
       skills: '',
      certUrl: '',
      verifyUrl: '',
      description: '',
       status: '',
       fileType: '',
       image: '',
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (cert) => {
    setEditingCert(cert);
    setFormData({
      ...cert,
      skills: Array.isArray(cert.skills) ? cert.skills.join(', ') : cert.skills,
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
    };

    if (editingCert) {
      updateItem('certificates', editingCert.id, payload);
    } else {
      addItem('certificates', payload);
    }

    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-100 light:text-slate-900 tracking-tight flex items-center gap-2">
            <Award className="w-7 h-7 text-amber-400 light:text-indigo-600" />
            <span>Certificates Manager</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 light:text-slate-600 mt-1">
            Private verified credentials, credentials ID, and verification links.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-medium text-xs sm:text-sm shadow-lg shadow-indigo-500/25 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Certificate</span>
        </button>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="p-4 rounded-2xl bg-slate-900/90 light:bg-white border border-slate-800 light:border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-md">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search certificates by title, issuer or skill..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950/80 light:bg-slate-50 text-slate-100 light:text-slate-900 border border-slate-800 light:border-slate-300 focus:outline-none focus:border-cyan-400 text-xs sm:text-sm"
          />
        </div>

        {/* Categories Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-cyan-500/20 text-cyan-400 light:bg-indigo-600 light:text-white border border-cyan-500/30'
                  : 'bg-slate-950/60 light:bg-slate-100 text-slate-400 light:text-slate-600 border border-slate-800 light:border-slate-200 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-2 shrink-0">
          <SlidersHorizontal className="w-4 h-4 text-slate-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-950/80 light:bg-slate-50 text-slate-200 light:text-slate-800 border border-slate-800 light:border-slate-300 text-xs focus:outline-none font-mono"
          >
            <option value="Newest">Newest First</option>
            <option value="Oldest">Oldest First</option>
            <option value="Organization">By Issuer</option>
          </select>
        </div>
      </div>

      {/* Certificate Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sorted.map((cert) => (
          <motion.div
            key={cert.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="group rounded-3xl bg-slate-900/90 light:bg-white border border-slate-800 light:border-slate-200 hover:border-cyan-500/50 light:hover:border-indigo-400/50 transition-all duration-300 shadow-xl overflow-hidden flex flex-col justify-between"
          >
            {/* Certificate Image Banner */}
            <div className="relative h-44 overflow-hidden bg-slate-950">
              <img
                src={cert.image}
                alt={cert.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent light:from-slate-900/80" />

              <div className="absolute top-3 left-3 flex gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
                  {cert.category}
                </span>
              </div>

              <div className="absolute top-3 right-3">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border backdrop-blur-md ${
                  cert.status === 'Verified'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                }`}>
                  {cert.status}
                </span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 text-xs font-mono text-slate-300 flex items-center justify-between">
                <span>Issued: {cert.issueDate}</span>
                <span>ID: {cert.certId}</span>
              </div>
            </div>

            {/* Certificate Body */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="font-heading font-extrabold text-base sm:text-lg text-slate-100 light:text-slate-900 group-hover:text-cyan-400 light:group-hover:text-indigo-600 transition-colors leading-snug mb-1">
                  {cert.title}
                </h3>
                <div className="text-xs font-mono font-semibold text-indigo-400 light:text-indigo-600 mb-3">
                  {cert.issuer}
                </div>

                <p className="text-xs text-slate-300 light:text-slate-600 leading-relaxed font-sans line-clamp-2 mb-3">
                  {cert.description}
                </p>

                {/* Skills tags */}
                {cert.skills && (
                  <div className="flex flex-wrap gap-1">
                    {(Array.isArray(cert.skills) ? cert.skills : cert.skills.split(',')).map((sk, idx) => (
                      <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 light:bg-slate-100 text-slate-400 light:text-slate-600 border border-slate-800 light:border-slate-200">
                        {sk.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Actions Footer */}
              <div className="pt-3 border-t border-slate-800/60 light:border-slate-200 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewCert(cert)}
                    className="p-1.5 rounded-lg bg-slate-800/80 light:bg-slate-100 text-slate-300 light:text-slate-700 hover:text-cyan-400 light:hover:text-indigo-600 transition-colors"
                    title="View Certificate Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  {cert.verifyUrl && (
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-slate-800/80 light:bg-slate-100 text-slate-300 light:text-slate-700 hover:text-cyan-400 light:hover:text-indigo-600 transition-colors"
                      title="Verify Certificate Online"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(cert)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 transition-colors"
                    title="Edit Certificate"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteItem('certificates', cert.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 transition-colors"
                    title="Delete Certificate"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {isAddModalOpen && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto ${isModalFullScreen ? 'p-0' : ''}`}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`bg-slate-900 light:bg-white border border-slate-800 light:border-slate-200 shadow-2xl transition-all duration-300 ${
              isModalFullScreen
                ? 'w-full h-full max-w-none rounded-none p-6 sm:p-10 flex flex-col justify-between my-0'
                : 'w-full max-w-xl p-6 sm:p-8 rounded-3xl space-y-6 my-8'
            }`}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 light:border-slate-200 shrink-0">
              <h3 className="font-heading font-extrabold text-xl text-slate-100 light:text-slate-900">
                {editingCert ? 'Edit Certificate' : 'Add New Certificate'}
              </h3>
              
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalFullScreen(!isModalFullScreen)}
                  className="p-2 rounded-xl bg-slate-800/80 light:bg-slate-100 text-slate-300 light:text-slate-700 hover:text-cyan-400 transition-colors cursor-pointer"
                  title={isModalFullScreen ? 'Restore Window Size' : 'Expand to Full Screen'}
                >
                  {isModalFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>

                <button onClick={() => setIsAddModalOpen(false)} className="p-2 rounded-xl bg-slate-800/80 light:bg-slate-100 text-slate-400 hover:text-white transition-colors cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
              <div>
                <label className="block text-slate-300 light:text-slate-700 font-mono font-semibold mb-1">Certificate Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Enterprise Core PHP & PDO Database Architecture"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 light:bg-slate-50 text-slate-100 light:text-slate-900 border border-slate-800 light:border-slate-300 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 light:text-slate-700 font-mono font-semibold mb-1">Issuing Organization</label>
                  <input
                    type="text"
                    required
                    value={formData.issuer}
                    onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                    placeholder="e.g. Udemy / Coursera"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 light:bg-slate-50 text-slate-100 light:text-slate-900 border border-slate-800 light:border-slate-300 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 light:text-slate-700 font-mono font-semibold mb-1">Certificate ID</label>
                  <input
                    type="text"
                    value={formData.certId}
                    onChange={(e) => setFormData({ ...formData, certId: e.target.value })}
                    placeholder="e.g. UC-PHP-982341"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 light:bg-slate-50 text-slate-100 light:text-slate-900 border border-slate-800 light:border-slate-300 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-300 light:text-slate-700 font-mono font-semibold mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 light:bg-slate-50 text-slate-100 light:text-slate-900 border border-slate-800 light:border-slate-300 focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="Python">Python</option>
                    <option value="Cloud">Cloud</option>
                    <option value="Database">Database</option>
                    <option value="IoT">IoT</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 light:text-slate-700 font-mono font-semibold mb-1">Issue Date</label>
                  <input
                    type="date"
                    value={formData.issueDate}
                    onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
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
                    <option value="Verified">Verified</option>
                    <option value="In Progress">In Progress</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 light:text-slate-700 font-mono font-semibold mb-1">Skills (Comma separated)</label>
                <input
                  type="text"
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  placeholder="PHP, PDO, MySQL, Security"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 light:bg-slate-50 text-slate-100 light:text-slate-900 border border-slate-800 light:border-slate-300 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 light:text-slate-700 font-mono font-semibold mb-1">Verification URL</label>
                <input
                  type="url"
                  value={formData.verifyUrl}
                  onChange={(e) => setFormData({ ...formData, verifyUrl: e.target.value })}
                  placeholder="https://example.com/verify/123"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 light:bg-slate-50 text-slate-100 light:text-slate-900 border border-slate-800 light:border-slate-300 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 light:text-slate-700 font-mono font-semibold mb-1">Certificate Image / Badge</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://images.unsplash.com/... or upload image file"
                    className="flex-1 px-3 py-2.5 rounded-xl bg-slate-950 light:bg-slate-50 text-slate-100 light:text-slate-900 border border-slate-800 light:border-slate-300 focus:outline-none focus:border-cyan-400"
                  />
                  <label className="px-3.5 py-2.5 rounded-xl bg-slate-800 light:bg-slate-200 text-slate-200 light:text-slate-800 hover:text-white font-mono font-bold text-xs cursor-pointer shrink-0 transition-colors">
                    <span>Upload Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        const reader = new FileReader();
                        reader.onload = (evt) => setFormData({ ...formData, image: evt.target.result });
                        reader.readAsDataURL(file);
                      }}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 light:text-slate-700 font-mono font-semibold mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief summary of skills and topics covered..."
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 light:bg-slate-50 text-slate-100 light:text-slate-900 border border-slate-800 light:border-slate-300 focus:outline-none focus:border-cyan-400"
                />
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
                  {editingCert ? 'Save Changes' : 'Create Certificate'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* View Detail Modal */}
      {viewCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg p-6 rounded-3xl bg-slate-900 light:bg-white border border-slate-800 light:border-slate-200 shadow-2xl space-y-5"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 light:border-slate-200">
              <span className="text-xs font-mono font-bold text-cyan-400 light:text-indigo-600 uppercase">
                {viewCert.category}
              </span>
              <button onClick={() => setViewCert(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <img src={viewCert.image} alt={viewCert.title} className="w-full h-48 rounded-2xl object-cover border border-slate-800" />

            <div>
              <h3 className="font-heading font-extrabold text-xl text-slate-100 light:text-slate-900 mb-1">
                {viewCert.title}
              </h3>
              <div className="text-xs font-mono font-semibold text-indigo-400 light:text-indigo-600 mb-3">
                {viewCert.issuer} • Issued {viewCert.issueDate}
              </div>
              <p className="text-xs text-slate-300 light:text-slate-600 leading-relaxed">
                {viewCert.description}
              </p>
            </div>

            {viewCert.verifyUrl && (
              <a
                href={viewCert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-medium text-xs flex items-center justify-center gap-2 shadow-md"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Verify Credential Online</span>
              </a>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
};
