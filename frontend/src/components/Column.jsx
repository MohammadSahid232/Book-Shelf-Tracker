import React from 'react';

export default function Column({ title, count, borderColor, children }) {
  return (
    <div className="flex flex-col bg-slate-50/50 dark:bg-neutral-800/30 rounded-2xl p-4 border border-slate-200/60 dark:border-neutral-800/80">
      <div className={`border-b-2 ${borderColor || 'border-blue-500'} pb-3 mb-4 flex items-center justify-between px-1`}>
        <h2 className="font-bold text-slate-800 dark:text-slate-200 text-base flex items-center gap-2">
          {title}
        </h2>
        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-200/80 dark:bg-neutral-700/80 text-slate-600 dark:text-slate-300">
          {count}
        </span>
      </div>
      <div className="flex flex-col gap-4 flex-1">
        {count === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4 border-2 border-dashed border-slate-200 dark:border-neutral-700/60 rounded-2xl text-center text-slate-400 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 opacity-40 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            No books on this shelf
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}
