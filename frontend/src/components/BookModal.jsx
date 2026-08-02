import React, { useState, useEffect } from 'react';
import { X, BookOpen, Star, Image, FileText, CheckCircle } from 'lucide-react';

export default function BookModal({ isOpen, onClose, onSave, editingBook }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: 'Fiction',
    coverImage: '',
    description: '',
    totalPages: 0,
    currentPage: 0,
    status: 'want to read',
    rating: 0,
    review: '',
    favorite: false,
  });

  useEffect(() => {
    if (editingBook) {
      setFormData({
        title: editingBook.title || '',
        author: editingBook.author || '',
        genre: editingBook.genre || 'Fiction',
        coverImage: editingBook.coverImage || '',
        description: editingBook.description || '',
        totalPages: editingBook.totalPages || 0,
        currentPage: editingBook.currentPage || 0,
        status: editingBook.status || 'want to read',
        rating: editingBook.rating || 0,
        review: editingBook.review || '',
        favorite: Boolean(editingBook.favorite),
      });
    } else {
      setFormData({
        title: '',
        author: '',
        genre: 'Fiction',
        coverImage: '',
        description: '',
        totalPages: 0,
        currentPage: 0,
        status: 'want to read',
        rating: 0,
        review: '',
        favorite: false,
      });
    }
  }, [editingBook, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-neutral-800 rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-neutral-700 shadow-2xl p-6">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-neutral-700/60 pb-4">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-lg">
            <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span>{editingBook ? 'Edit Book Details' : 'Add New Book to Library'}</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Book Title *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Atomic Habits"
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Author Name *</label>
              <input
                type="text"
                required
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                placeholder="e.g. James Clear"
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Genre</label>
              <select
                value={formData.genre}
                onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
              >
                <option value="Fiction">Fiction</option>
                <option value="Non-Fiction">Non-Fiction</option>
                <option value="Self-Help">Self-Help</option>
                <option value="Sci-Fi">Sci-Fi</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Biography">Biography</option>
                <option value="History">History</option>
                <option value="Productivity">Productivity</option>
                <option value="Business">Business</option>
                <option value="General">General</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
              >
                <option value="want to read">Want to Read</option>
                <option value="reading">Reading</option>
                <option value="finished">Finished</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Total Pages</label>
              <input
                type="number"
                min="0"
                value={formData.totalPages}
                onChange={(e) => setFormData({ ...formData, totalPages: parseInt(e.target.value) || 0 })}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Current Page</label>
              <input
                type="number"
                min="0"
                max={formData.totalPages || 99999}
                value={formData.currentPage}
                onChange={(e) => setFormData({ ...formData, currentPage: parseInt(e.target.value) || 0 })}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Cover Image URL</label>
            <input
              type="url"
              value={formData.coverImage}
              onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
              placeholder="https://example.com/cover.jpg"
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Rating (1 - 5 Stars)</label>
            <div className="flex items-center gap-1.5 py-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData({ ...formData, rating: star })}
                  className="p-1 text-slate-300 dark:text-neutral-700 hover:scale-110 transition-transform"
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= formData.rating ? 'fill-amber-400 text-amber-400' : ''
                    }`}
                  />
                </button>
              ))}
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 ml-2">
                {formData.rating > 0 ? `${formData.rating} / 5 Stars` : 'No Rating'}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Review / Notes</label>
            <textarea
              rows="3"
              value={formData.review}
              onChange={(e) => setFormData({ ...formData, review: e.target.value })}
              placeholder="Share your thoughts about this book..."
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="fav-check"
              checked={formData.favorite}
              onChange={(e) => setFormData({ ...formData, favorite: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded-md focus:ring-blue-500 cursor-pointer"
            />
            <label htmlFor="fav-check" className="text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
              Mark as Favorite Book ❤️
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-neutral-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-neutral-700 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              {editingBook ? 'Save Changes' : 'Add to Library'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
