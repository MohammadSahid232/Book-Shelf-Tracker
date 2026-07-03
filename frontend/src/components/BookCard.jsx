import React from 'react';

const STATUS_ORDER = ['Want to Read', 'Reading', 'Finished'];

// Star Rating Component - uses useState for interactivity
const StarRating = ({ rating, onRate }) => {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => onRate(star)}
          className={`text-xl transition-colors ${
            star <= rating ? 'text-yellow-400' : 'text-gray-300'
          } hover:text-yellow-400 focus:outline-none`}
          aria-label={`Rate ${star} star`}
        >
          ★
        </button>
      ))}
    </div>
  );
};

const BookCard = ({ book, onDelete, onMove, onRate }) => {
  const currentIndex = STATUS_ORDER.indexOf(book.status);

  return (
    <div className="bg-white dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 rounded-lg p-4 mb-3 shadow-sm">
      {/* Cover Placeholder */}
      <div className="bg-slate-100 dark:bg-neutral-700 w-full h-32 rounded-md flex items-center justify-center mb-3">
        <span className="text-slate-400 dark:text-slate-500 text-sm">📚 No Cover</span>
      </div>

      {/* Book Info */}
      <h3 className="font-semibold text-slate-900 dark:text-slate-50 text-sm leading-tight mb-1">
        {book.title}
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">{book.author}</p>
      {book.genre && (
        <span className="inline-block text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded px-2 py-0.5 mb-3">
          {book.genre}
        </span>
      )}

      {/* Star Rating - only for Finished books */}
      {book.status === 'Finished' && (
        <div className="mb-3">
          <StarRating rating={book.rating || 0} onRate={(val) => onRate(book.id, val)} />
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-between gap-2 mt-2">
        {/* Move Buttons */}
        <div className="flex gap-1">
          <button
            onClick={() => onMove(book.id, STATUS_ORDER[currentIndex - 1])}
            disabled={currentIndex === 0}
            className="text-xs px-2 py-1 rounded border border-slate-300 dark:border-neutral-600 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-neutral-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="Move back"
          >
            ← Back
          </button>
          <button
            onClick={() => onMove(book.id, STATUS_ORDER[currentIndex + 1])}
            disabled={currentIndex === STATUS_ORDER.length - 1}
            className="text-xs px-2 py-1 rounded border border-slate-300 dark:border-neutral-600 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-neutral-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="Move forward"
          >
            Next →
          </button>
        </div>

        {/* Delete Button */}
        <button
          onClick={() => onDelete(book.id)}
          className="text-xs px-2 py-1 rounded border border-red-300 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          title="Delete book"
        >
          🗑 Delete
        </button>
      </div>
    </div>
  );
};

export default BookCard;
