import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Trophy, Lock, Star, Zap, Loader, Medal } from 'lucide-react';
import toast from 'react-hot-toast';

const BADGE_ICONS = {
  first_book:    '📖', books_5: '🐛', books_10: '📚', books_50: '🌟', books_100: '🎓',
  pages_1000:   '📄', pages_5000: '🏃', streak_7: '🔥', streak_30: '💪', streak_100: '⚡',
  top_reviewer: '✍️', book_collector: '🗂️', early_bird: '🌅', night_owl: '🦉', speed_reader: '⚡',
};

const AchievementCard = ({ achievement }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={achievement.unlocked ? { y: -4, scale: 1.02 } : {}}
    className={`relative rounded-2xl p-5 border text-center transition-all ${
      achievement.unlocked
        ? 'bg-white dark:bg-neutral-800 border-indigo-200 dark:border-indigo-700/50 shadow-md shadow-indigo-100 dark:shadow-indigo-900/20'
        : 'bg-slate-50 dark:bg-neutral-900/50 border-slate-200 dark:border-neutral-700/40 opacity-60'
    }`}
  >
    {achievement.unlocked && (
      <div className="absolute top-2 right-2">
        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
      </div>
    )}
    <div className={`text-4xl mb-3 ${achievement.unlocked ? '' : 'grayscale'}`}>
      {achievement.unlocked ? BADGE_ICONS[achievement.type] || '🏅' : '🔒'}
    </div>
    <h3 className={`text-sm font-black mb-1 ${achievement.unlocked ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-neutral-600'}`}>
      {achievement.title}
    </h3>
    <p className={`text-[10px] leading-snug ${achievement.unlocked ? 'text-slate-500 dark:text-slate-400' : 'text-slate-300 dark:text-neutral-700'}`}>
      {achievement.desc}
    </p>
    {achievement.unlocked && achievement.unlockedAt && (
      <p className="text-[9px] text-indigo-500 dark:text-indigo-400 font-semibold mt-2">
        Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
      </p>
    )}
  </motion.div>
);

export default function AchievementsPage() {
  const { getAuthHeaders, BACKEND_URL } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${BACKEND_URL}/api/achievements`, { headers: getAuthHeaders() });
        setData(data);
      } catch { toast.error('Failed to load achievements'); }
      finally { setLoading(false); }
    };
    fetch();
  }, [BACKEND_URL]);

  const filtered = data?.achievements?.filter((a) => {
    if (filter === 'unlocked') return a.unlocked;
    if (filter === 'locked') return !a.unlocked;
    return true;
  }) || [];

  const pct = data ? Math.round((data.count / data.total) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-900 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-black flex items-center gap-3">
          <Trophy className="w-7 h-7 text-amber-500" /> Achievements
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Earn badges by reaching reading milestones</p>
      </div>

      {/* Progress Overview */}
      {data && (
        <div className="bg-white dark:bg-neutral-800 rounded-2xl border border-slate-100 dark:border-neutral-700 p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm font-black text-slate-900 dark:text-white">{data.count} / {data.total} Unlocked</p>
              <p className="text-xs text-slate-400">{pct}% complete</p>
            </div>
            <Medal className="w-8 h-8 text-amber-400" />
          </div>
          <div className="w-full bg-slate-100 dark:bg-neutral-700 rounded-full h-2.5 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
            />
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex gap-1">
        {['all', 'unlocked', 'locked'].map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${filter === f ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-neutral-800 text-slate-500 border border-slate-200 dark:border-neutral-700 hover:text-slate-900 dark:hover:text-white'}`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(10)].map((_, i) => <div key={i} className="h-36 rounded-2xl bg-slate-200 dark:bg-neutral-800 animate-pulse" />)}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map((a) => <AchievementCard key={a.type} achievement={a} />)}
        </div>
      )}
    </div>
  );
}
