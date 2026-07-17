import React from 'react';
import { FaEdit, FaTrash, FaStar, FaRegStar, FaBookOpen } from 'react-icons/fa';

const statusColors = {
  'want to read': 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800',
  'reading': 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800',
  'finished': 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800',
};

const statusLabels = {
  'want to read': 'Want to Read',
  'reading': 'Reading',
  'finished': 'Finished',
};

export default function BookCard({ book, onEdit, onDelete }) {
  const isFinished = book.status === 'finished';

  // Render star ratings (1 to 5) dynamically
  const renderStars = (rating) => {
    const stars = [];
    const activeRating = rating || 0;
    for (let i = 1; i <= 5; i++) {
      if (i <= activeRating) {
        stars.push(<FaStar key={i} className="text-amber-400 w-4 h-4" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-slate-300 dark:text-neutral-600 w-4 h-4" />);
      }
    }
    return <div className="flex items-center gap-0.5 mt-2">{stars}</div>;
  };

  return (
    <div className="group relative bg-white dark:bg-neutral-800 rounded-2xl border border-slate-200 dark:border-neutral-700/80 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 p-5 flex flex-col h-full justify-between">
      <div>
        {/* Cover Placeholder */}
        <div className="relative w-full h-44 rounded-xl bg-slate-100 dark:bg-neutral-700/50 flex items-center justify-center mb-4 overflow-hidden border border-slate-200/50 dark:border-neutral-700/30">
          <FaBookOpen className="w-12 h-12 text-slate-300 dark:text-neutral-600 group-hover:scale-110 transition-transform duration-300" />
          {book.genre && (
            <span className="absolute top-3 left-3 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-slate-900/80 text-white rounded-md backdrop-blur-xs">
              {book.genre}
            </span>
          )}
        </div>

        {/* Details */}
        <h3 className="font-bold text-slate-800 dark:text-slate-100 text-base leading-snug line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {book.title}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium truncate mt-1">
          by {book.author || 'Unknown Author'}
        </p>

        <div className="mt-3 flex flex-wrap gap-2 items-center">
          <span className={`inline-flex px-2.5 py-0.5 text-xs font-semibold rounded-full border ${statusColors[book.status] || ''}`}>
            {statusLabels[book.status] || book.status}
          </span>
        </div>

        {/* Dynamic Star Rating - Shown for Finished books only */}
        {isFinished && renderStars(book.rating)}

        {book.review && (
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-3 italic line-clamp-2 leading-relaxed border-l-2 border-slate-200 dark:border-neutral-700 pl-2">
            "{book.review}"
          </p>
        )}
      </div>

      {/* Admin Action Buttons */}
      {(onEdit || onDelete) && (
        <div className="flex gap-2 justify-end items-center mt-5 pt-3 border-t border-slate-100 dark:border-neutral-700/50 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200">
          {onEdit && (
            <button
              onClick={() => onEdit(book)}
              title="Edit Book"
              className="p-2 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:text-slate-400 dark:hover:text-blue-400 dark:hover:bg-blue-900/30 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <FaEdit className="w-4 h-4" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(book.id)}
              title="Delete Book"
              className="p-2 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 dark:text-slate-400 dark:hover:text-red-400 dark:hover:bg-red-900/30 transition-all focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <FaTrash className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
