import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Folder, Plus, BookOpen, Lock, Globe, Trash2, Edit3, X, Share2, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CollectionsPage() {
  const { getAuthHeaders, BACKEND_URL } = useAuth();
  const navigate = useNavigate();

  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [tags, setTags] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const headers = getAuthHeaders();

  const fetchCollections = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/collections`, { headers });
      setCollections(data || []);
    } catch (err) {
      toast.error('Failed to load collections');
    } finally {
      setLoading(false);
    }
  }, [BACKEND_URL]);

  useEffect(() => { fetchCollections(); }, [fetchCollections]);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name.trim()) return toast.error('Collection name is required');
    setSubmitting(true);
    try {
      await axios.post(
        `${BACKEND_URL}/api/collections`,
        {
          name,
          description,
          isPublic,
          tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
        },
        { headers }
      );
      toast.success('Collection created! 📁');
      setIsModalOpen(false);
      setName('');
      setDescription('');
      setIsPublic(false);
      setTags('');
      fetchCollections();
    } catch (err) {
      toast.error('Failed to create collection');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this collection?')) return;
    try {
      await axios.delete(`${BACKEND_URL}/api/collections/${id}`, { headers });
      toast.success('Collection deleted');
      fetchCollections();
    } catch (err) {
      toast.error('Failed to delete collection');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-900 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-black">Book Collections</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Organize your books into custom reading lists</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl text-sm flex items-center gap-2 transition-colors shadow-lg shadow-indigo-500/20"
        >
          <Plus className="w-4 h-4" /> New Collection
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => <div key={i} className="h-44 rounded-2xl bg-slate-200 dark:bg-neutral-800 animate-pulse" />)}
        </div>
      ) : collections.length === 0 ? (
        <div className="text-center py-20 space-y-3">
          <Folder className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-700 dark:text-slate-300">No collections created yet</h3>
          <p className="text-sm text-slate-400 max-w-xs mx-auto">
            Group your favorite books together (e.g. "Programming", "Sci-Fi Favorites", "University").
          </p>
          <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-700">
            Create First Collection
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {collections.map((c) => (
            <motion.div
              key={c._id}
              whileHover={{ y: -3 }}
              className="bg-white dark:bg-neutral-800 rounded-2xl border border-slate-200/70 dark:border-neutral-700/60 p-5 space-y-3 hover:shadow-lg transition-all relative group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                    <Folder className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">{c.name}</h3>
                    <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                      {c.isPublic ? <><Globe className="w-3 h-3 text-emerald-500" /> Public</> : <><Lock className="w-3 h-3 text-slate-400" /> Private</>}
                      <span>• {c.books?.length || 0} books</span>
                    </p>
                  </div>
                </div>
                <button onClick={() => handleDelete(c._id)} className="p-1.5 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {c.description && <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">{c.description}</p>}

              {/* Book Previews */}
              {c.books?.length > 0 && (
                <div className="flex gap-2 pt-2 border-t border-slate-100 dark:border-neutral-700/50">
                  {c.books.slice(0, 4).map((b) => (
                    <div key={b._id || b} className="w-8 h-11 rounded bg-indigo-50 dark:bg-neutral-700 overflow-hidden flex-shrink-0">
                      {b.coverImage ? <img src={b.coverImage} alt="" className="w-full h-full object-cover" /> : <BookOpen className="w-4 h-4 text-indigo-300 m-auto mt-3" />}
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white dark:bg-neutral-800 rounded-3xl p-6 max-w-md w-full border border-slate-200 dark:border-neutral-700 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black">Create Collection</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">Collection Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Programming, Sci-Fi, College"
                  className="w-full text-xs px-3 py-2 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Short description..."
                  rows={2}
                  className="w-full text-xs px-3 py-2 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="e.g. AI, Python, Basics"
                  className="w-full text-xs px-3 py-2 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300 cursor-pointer pt-1">
                <input type="checkbox" checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} className="rounded text-indigo-600" />
                Make this collection public (visible to community)
              </label>
              <div className="flex justify-end gap-2 pt-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-xs font-bold text-slate-500">Cancel</button>
                <button type="submit" disabled={submitting} className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-700 disabled:opacity-50">
                  {submitting ? 'Creating…' : 'Create'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
