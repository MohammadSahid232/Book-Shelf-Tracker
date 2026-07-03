import React, { useState, useEffect } from 'react';
import BookCard from '../components/BookCard';
import { useAuth } from '../context/AuthContext';

const STATUSES = ['Want to Read', 'Reading', 'Finished'];

// --- AddBookModal Component ---
const AddBookModal = ({ onClose, onAdd }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) return;
    onAdd({ title: title.trim(), author: author.trim(), genre: genre.trim() });
    onClose();
  };

  return (
    // Modal Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-neutral-800 rounded-xl shadow-2xl p-6 w-full max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50">Add New Book</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-2xl leading-none focus:outline-none"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. The Great Gatsby"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-700 text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Author <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. F. Scott Fitzgerald"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-700 text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Genre
            </label>
            <input
              type="text"
              placeholder="e.g. Fiction"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-700 text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 px-4 text-sm border border-slate-300 dark:border-neutral-600 rounded-md text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-neutral-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 px-4 text-sm bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-colors"
            >
              Add Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- Dashboard Page ---
function Dashboard() {
  const { user } = useAuth();

  // 1. useState for books array with status field
  const [books, setBooks] = useState([
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Classic', status: 'Want to Read', rating: 0 },
    { id: 2, title: '1984', author: 'George Orwell', genre: 'Dystopia', status: 'Want to Read', rating: 0 },
    { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction', status: 'Reading', rating: 0 },
    { id: 4, title: 'Pride and Prejudice', author: 'Jane Austen', genre: 'Romance', status: 'Reading', rating: 0 },
    { id: 5, title: 'The Hobbit', author: 'J.R.R. Tolkien', genre: 'Fantasy', status: 'Finished', rating: 5 },
    { id: 6, title: 'The Catcher in the Rye', author: 'J.D. Salinger', genre: 'Fiction', status: 'Finished', rating: 3 },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // 6. useEffect: count books per shelf, show in column header
  const [counts, setCounts] = useState({ 'Want to Read': 0, 'Reading': 0, 'Finished': 0 });

  useEffect(() => {
    const newCounts = STATUSES.reduce((acc, status) => {
      acc[status] = books.filter((b) => b.status === status).length;
      return acc;
    }, {});
    setCounts(newCounts);
  }, [books]);

  // 2. Add book (from modal)
  const handleAddBook = ({ title, author, genre }) => {
    setBooks((prev) => [
      ...prev,
      {
        id: Date.now(),
        title,
        author,
        genre,
        status: 'Want to Read',
        rating: 0,
      },
    ]);
  };

  // 3. Move book between columns
  const handleMove = (id, newStatus) => {
    setBooks((prev) =>
      prev.map((book) =>
        book.id === id ? { ...book, status: newStatus, rating: newStatus === 'Finished' ? book.rating : 0 } : book
      )
    );
  };

  // 4. Delete book
  const handleDelete = (id) => {
    setBooks((prev) => prev.filter((book) => book.id !== id));
  };

  // 5. Star rating for finished books
  const handleRate = (id, rating) => {
    setBooks((prev) =>
      prev.map((book) => (book.id === id ? { ...book, rating } : book))
    );
  };

  const columnColors = {
    'Want to Read': 'border-blue-500',
    'Reading':      'border-yellow-500',
    'Finished':     'border-green-500',
  };

  const headerColors = {
    'Want to Read': 'text-blue-600 dark:text-blue-400',
    'Reading':      'text-yellow-600 dark:text-yellow-400',
    'Finished':     'text-green-600 dark:text-green-400',
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-neutral-900">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
          {user ? `${user.name}'s Bookshelf` : 'My Bookshelf'}
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-md transition-colors shadow-sm"
        >
          + Add Book
        </button>
      </div>

      {/* 3-Column Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {STATUSES.map((status) => (
          <div key={status} className={`border-t-4 ${columnColors[status]} bg-white dark:bg-neutral-800 rounded-lg p-4 shadow-sm`}>
            {/* Column Header with count from useEffect */}
            <h2 className={`font-bold text-sm uppercase tracking-wide mb-4 flex items-center justify-between ${headerColors[status]}`}>
              {status}
              <span className="bg-slate-100 dark:bg-neutral-700 text-slate-600 dark:text-slate-300 text-xs font-semibold rounded-full px-2 py-0.5">
                {counts[status]}
              </span>
            </h2>

            {/* Book Cards */}
            <div>
              {books
                .filter((b) => b.status === status)
                .map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onDelete={handleDelete}
                    onMove={handleMove}
                    onRate={handleRate}
                  />
                ))}
              {counts[status] === 0 && (
                <p className="text-sm text-slate-400 dark:text-slate-500 text-center py-8">
                  No books here yet
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Book Modal */}
      {isModalOpen && (
        <AddBookModal onClose={() => setIsModalOpen(false)} onAdd={handleAddBook} />
      )}
    </div>
  );
}

export default Dashboard;
