import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from 'recharts';

const COLORS = ['#2563eb', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

export default function ReadingChart({ monthlyStats, genreDistribution, ratingDistribution }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="rounded-3xl border border-slate-200/80 dark:border-neutral-700/80 bg-white/90 dark:bg-neutral-800/90 p-5 shadow-sm">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">Monthly Reading Activity</h3>
        <div className="mt-4 h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyStats || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
              <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip />
              <Bar dataKey="books" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200/80 dark:border-neutral-700/80 bg-white/90 dark:bg-neutral-800/90 p-5 shadow-sm">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">Genre Mix</h3>
        <div className="mt-4 h-56">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={genreDistribution || []} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={2}>
                {(genreDistribution || []).map((entry, index) => (
                  <Cell key={`${entry.name}-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 space-y-2 text-xs text-slate-600 dark:text-slate-400">
          {(genreDistribution || []).slice(0, 5).map((entry, index) => (
            <div key={entry.name} className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                {entry.name}
              </span>
              <span className="font-semibold">{entry.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
