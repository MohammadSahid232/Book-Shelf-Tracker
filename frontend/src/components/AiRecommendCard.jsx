import React from 'react';
import { Sparkles, Plus, Clock3, Gauge } from 'lucide-react';

export default function AiRecommendCard({ recommendation, onAdd, loading }) {
  return (
    <div className="rounded-3xl border border-purple-200/70 bg-white/90 p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-purple-900/40 dark:bg-neutral-800/90">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-purple-700 dark:bg-purple-950/60 dark:text-purple-300">
            <Sparkles className="h-3.5 w-3.5" />
            {recommendation.genre}
          </div>
          <h3 className="mt-3 text-lg font-black text-slate-900 dark:text-white">{recommendation.title}</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">by {recommendation.author}</p>
        </div>
        <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
          {recommendation.confidenceScore}%
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">“{recommendation.reason}”</p>

      <div className="mt-5 flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-500 dark:text-slate-400">
        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 dark:bg-neutral-700">
          <Gauge className="h-3.5 w-3.5" />
          {recommendation.difficulty}
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 dark:bg-neutral-700">
          <Clock3 className="h-3.5 w-3.5" />
          {recommendation.estimatedReadingTime}
        </span>
      </div>

      <button
        onClick={() => onAdd(recommendation)}
        disabled={loading}
        className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-linear-to-r from-purple-600 to-indigo-600 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:from-purple-700 hover:to-indigo-700 disabled:opacity-60"
      >
        <Plus className="h-4 w-4" />
        Add to Shelf
      </button>
    </div>
  );
}
