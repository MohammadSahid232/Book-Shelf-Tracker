import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Globe, BookOpen, Heart, MessageSquare, Sparkles, Loader } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CommunityPage() {
  const { BACKEND_URL } = useAuth();
  const navigate = useNavigate();
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPublic = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${BACKEND_URL}/api/collections/public`);
        setCollections(data || []);
      } catch (err) {
        toast.error('Failed to load public community lists');
      } finally {
        setLoading(false);
      }
    };
    fetchPublic();
  }, [BACKEND_URL]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-900 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-black flex items-center gap-3">
          <Users className="w-7 h-7 text-indigo-500" /> Community Lists
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Discover public reading lists curated by fellow readers</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => <div key={i} className="h-44 rounded-2xl bg-slate-200 dark:bg-neutral-800 animate-pulse" />)}
        </div>
      ) : collections.length === 0 ? (
        <div className="text-center py-20 space-y-3">
          <Globe className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-700 dark:text-slate-300">No public collections yet</h3>
          <p className="text-sm text-slate-400 max-w-xs mx-auto">
            Be the first to share your reading collection with the community!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {collections.map((c) => (
            <motion.div
              key={c._id}
              whileHover={{ y: -3 }}
              className="bg-white dark:bg-neutral-800 rounded-2xl border border-slate-200/70 dark:border-neutral-700/60 p-5 space-y-3 hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                  {c.user?.first_name?.[0] || '?'}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">{c.name}</h3>
                  <p className="text-[10px] text-slate-400">Curated by {c.user?.first_name} {c.user?.last_name || ''}</p>
                </div>
              </div>

              {c.description && <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">{c.description}</p>}

              <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-100 dark:border-neutral-700/50">
                <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> {c.books?.length || 0} books</span>
                {c.tags?.length > 0 && (
                  <div className="flex gap-1 overflow-hidden">
                    {c.tags.slice(0, 2).map((t) => (
                      <span key={t} className="text-[9px] bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-400 px-1.5 py-0.5 rounded font-semibold">#{t}</span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
