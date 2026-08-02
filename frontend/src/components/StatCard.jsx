import React from 'react';
import { motion } from 'framer-motion';

const accentMap = {
  blue: 'from-blue-500/15 to-blue-600/5 text-blue-600 dark:text-blue-400',
  amber: 'from-amber-500/15 to-amber-600/5 text-amber-600 dark:text-amber-400',
  emerald: 'from-emerald-500/15 to-emerald-600/5 text-emerald-600 dark:text-emerald-400',
  rose: 'from-rose-500/15 to-rose-600/5 text-rose-600 dark:text-rose-400',
  purple: 'from-purple-500/15 to-purple-600/5 text-purple-600 dark:text-purple-400',
};

export default function StatCard({ icon: Icon, label, value, accent = 'blue' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="rounded-3xl border border-slate-200/80 dark:border-neutral-700/80 bg-white/90 dark:bg-neutral-800/90 p-5 shadow-sm"
    >
      <div className={`inline-flex rounded-2xl bg-gradient-to-br ${accentMap[accent] || accentMap.blue} p-3`}>
        <Icon className="h-5 w-5" />
      </div>
      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
        {label}
      </p>
      <h3 className="mt-1 text-2xl font-black text-slate-900 dark:text-white">{value}</h3>
    </motion.div>
  );
}
