import React, { useState, useEffect } from 'react';
import { X, BookOpen, Star, CheckCircle, FileText, Download, Sparkles } from 'lucide-react';

export default function BookModal({ isOpen, onClose, onSave, editingBook }) {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    author: '',
    genre: 'Fiction',
    language: 'English',
    publisher: '',
    isbn: '',
    coverImage: '',
    pdfUrl: '',
    epubUrl: '',
    downloadAllowed: false,
    featured: false,
    readingLevel: 'All Ages',
    description: '',
    totalPages: 0,
    tags: '',
  });

  useEffect(() => {
    if (editingBook) {
      setFormData({
        title: editingBook.title || '',
        subtitle: editingBook.subtitle || '',
        author: editingBook.author || '',
        genre: editingBook.genre || 'Fiction',
        language: editingBook.language || 'English',
        publisher: editingBook.publisher || '',
        isbn: editingBook.isbn || '',
        coverImage: editingBook.coverImage || '',
        pdfUrl: editingBook.pdfUrl || '',
        epubUrl: editingBook.epubUrl || '',
        downloadAllowed: Boolean(editingBook.downloadAllowed),
        featured: Boolean(editingBook.featured),
        readingLevel: editingBook.readingLevel || 'All Ages',
        description: editingBook.description || '',
        totalPages: editingBook.totalPages || 0,
        tags: Array.isArray(editingBook.tags) ? editingBook.tags.join(', ') : editingBook.tags || '',
      });
    } else {
      setFormData({
        title: '',
        subtitle: '',
        author: '',
        genre: 'Fiction',
        language: 'English',
        publisher: '',
        isbn: '',
        coverImage: '',
        pdfUrl: '',
        epubUrl: '',
        downloadAllowed: false,
        featured: false,
        readingLevel: 'All Ages',
        description: '',
        totalPages: 0,
        tags: '',
      });
    }
  }, [editingBook, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      tags: typeof formData.tags === 'string' ? formData.tags.split(',').map((t) => t.trim()).filter(Boolean) : formData.tags,
    };
    onSave(payload);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-neutral-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-neutral-700 shadow-2xl p-6">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-neutral-700/60 pb-4">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-lg">
            <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span>{editingBook ? 'Edit Book Details' : 'Add New Book to Digital Library'}</span>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-xl transition-colors">
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
                placeholder="e.g. Clean Code"
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Subtitle</label>
              <input
                type="text"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                placeholder="e.g. A Handbook of Agile Software Craftsmanship"
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Author Name *</label>
              <input
                type="text"
                required
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                placeholder="e.g. Robert C. Martin"
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Genre</label>
              <select
                value={formData.genre}
                onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none cursor-pointer"
              >
                <option value="Programming">Programming</option>
                <option value="Technology">Technology</option>
                <option value="Fiction">Fiction</option>
                <option value="Non-Fiction">Non-Fiction</option>
                <option value="Self-Help">Self-Help</option>
                <option value="Sci-Fi">Science Fiction</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Business">Business</option>
                <option value="History">History</option>
                <option value="Biography">Biography</option>
                <option value="General">General</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Language</label>
              <input
                type="text"
                value={formData.language}
                onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                placeholder="English"
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Publisher</label>
              <input
                type="text"
                value={formData.publisher}
                onChange={(e) => setFormData({ ...formData, publisher: e.target.value })}
                placeholder="Prentice Hall"
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Total Pages</label>
              <input
                type="number"
                min="0"
                value={formData.totalPages}
                onChange={(e) => setFormData({ ...formData, totalPages: parseInt(e.target.value) || 0 })}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
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
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">PDF Direct File URL</label>
              <input
                type="url"
                value={formData.pdfUrl}
                onChange={(e) => setFormData({ ...formData, pdfUrl: e.target.value })}
                placeholder="https://example.com/book.pdf"
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">EPUB Direct File URL</label>
              <input
                type="url"
                value={formData.epubUrl}
                onChange={(e) => setFormData({ ...formData, epubUrl: e.target.value })}
                placeholder="https://example.com/book.epub"
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Description</label>
            <textarea
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Book summary and overview..."
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
            />
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.downloadAllowed}
                onChange={(e) => setFormData({ ...formData, downloadAllowed: e.target.checked })}
                className="w-4 h-4 text-indigo-600 rounded-md focus:ring-indigo-500"
              />
              Allow Public Downloads 📥
            </label>

            <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-4 h-4 text-amber-500 rounded-md focus:ring-amber-400"
              />
              Feature on Homepage Hero Banner ★
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-neutral-700">
            <button type="button" onClick={onClose} className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-neutral-700 rounded-xl transition-colors">
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-500/20 transition-all flex items-center gap-2"
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
