import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import BookCard from '../components/BookCard';
import Column from '../components/Column';

const API = 'http://localhost:5000/api/books';

const statusOptions = ['want to read', 'reading', 'finished'];

const emptyForm = { title: '', author: '', genre: '', status: 'want to read', rating: '', review: '' };

export default function Dashboard() {
  const { user, getAuthHeaders } = useAuth();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editingBook, setEditingBook] = useState(null); // null = add, object = edit
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const getHeaders = () => ({
    'Content-Type': 'application/json',
    ...getAuthHeaders()
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API, { headers: getHeaders() });
      setBooks(response.data);
    } catch (err) {
      setError('Failed to load books. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingBook(null);
    setForm(emptyForm);
    setFormError('');
    setShowModal(true);
  };

  const openEditModal = (book) => {
    setEditingBook(book);
    setForm({
      title: book.title || '',
      author: book.author || '',
      genre: book.genre || '',
      status: book.status || 'want to read',
      rating: book.rating || '',
      review: book.review || '',
    });
    setFormError('');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingBook(null);
    setForm(emptyForm);
    setFormError('');
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setSubmitting(true);

    const payload = {
      title: form.title.trim(),
      author: form.author.trim(),
      genre: form.genre.trim(),
      status: form.status,
      rating: form.rating ? parseInt(form.rating) : null,
      review: form.review.trim(),
    };

    try {
      if (editingBook) {
        await axios.patch(`${API}/${editingBook.id}`, payload, { headers: getHeaders() });
      } else {
        await axios.post(API, payload, { headers: getHeaders() });
      }
      await fetchBooks();
      closeModal();
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || 'Cannot connect to server.';
      setFormError(errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (bookId) => {
    if (!window.confirm('Are you sure you want to delete this book?')) return;
    try {
      await axios.delete(`${API}/${bookId}`, {
        headers: getHeaders(),
      });
      setBooks((prev) => prev.filter((b) => b.id !== bookId));
    } catch (err) {
      setError('Failed to delete book.');
    }
  };

  const grouped = {
    'want to read': books.filter((b) => b.status === 'want to read'),
    'reading': books.filter((b) => b.status === 'reading'),
    'finished': books.filter((b) => b.status === 'finished'),
  };

  const colTitles = { 'want to read': 'Want to Read', reading: 'Reading', finished: 'Finished' };
  const colBorderColors = { 'want to read': 'border-blue-500', reading: 'border-yellow-500', finished: 'border-green-500' };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 p-6">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
            📚 Dashboard
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Welcome, {user?.name || user?.first_name || 'User'}. Manage your bookshelf below.
          </p>
        </div>
        <button
          onClick={openAddModal}
          id="add-book-btn"
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Book
        </button>
      </div>

      {/* Stats Strip */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {Object.entries(grouped).map(([status, bks]) => (
          <div key={status} className="bg-white dark:bg-neutral-800 rounded-xl p-4 border border-slate-200 dark:border-neutral-700 shadow-sm text-center">
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-50">{bks.length}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 capitalize">{colTitles[status]}</p>
          </div>
        ))}
      </div>

      {/* Error Banner */}
      {error && (
        <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm dark:bg-red-900/30 dark:border-red-800 dark:text-red-300">
          {error}
        </div>
      )}

      {/* Book Columns */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <span className="loading loading-spinner loading-lg text-blue-600"></span>
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 animate-pulse">Loading books...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(grouped).map(([status, bks]) => (
            <Column
              key={status}
              title={colTitles[status]}
              count={bks.length}
              borderColor={colBorderColors[status]}
            >
              {bks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onEdit={openEditModal}
                  onDelete={handleDelete}
                />
              ))}
            </Column>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl w-full max-w-md border border-slate-200 dark:border-neutral-700 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-neutral-700">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">
                {editingBook ? 'Edit Book' : 'Add New Book'}
              </h3>
              <button
                onClick={closeModal}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
              {formError && (
                <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm border border-red-200">
                  {formError}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. The Alchemist"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-slate-900 dark:text-slate-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Author
                </label>
                <input
                  type="text"
                  value={form.author}
                  onChange={(e) => setForm({ ...form, author: e.target.value })}
                  placeholder="e.g. Paulo Coelho"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-slate-900 dark:text-slate-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Genre
                </label>
                <input
                  type="text"
                  value={form.genre}
                  onChange={(e) => setForm({ ...form, genre: e.target.value })}
                  placeholder="e.g. Fiction, Classic"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-slate-900 dark:text-slate-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Status
                </label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-slate-900 dark:text-slate-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  {statusOptions.map((s) => (
                    <option key={s} value={s}>
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Rating (1-5)
                </label>
                <select
                  value={form.rating}
                  onChange={(e) => setForm({ ...form, rating: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-slate-900 dark:text-slate-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">No rating</option>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Star' : 'Stars'}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Review / Notes
                </label>
                <textarea
                  rows={3}
                  value={form.review}
                  onChange={(e) => setForm({ ...form, review: e.target.value })}
                  placeholder="What did you think of this book?"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-slate-900 dark:text-slate-50 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-neutral-700">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-neutral-700 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-60"
                >
                  {submitting ? 'Saving...' : editingBook ? 'Save Changes' : 'Add Book'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Dashboard Page
function Dashboard() {
  const { user } = useAuth();
  const [books, setBooks] = useState([
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Classic', status: 'Want to Read', rating: 0 },
    { id: 2, title: '1984', author: 'George Orwell', genre: 'Dystopia', status: 'Want to Read', rating: 0 },
    { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction', status: 'Reading', rating: 0 },
    { id: 4, title: 'Pride and Prejudice', author: 'Jane Austen', genre: 'Romance', status: 'Reading', rating: 0 },
    { id: 5, title: 'The Hobbit', author: 'J.R.R. Tolkien', genre: 'Fantasy', status: 'Finished', rating: 5 },
    { id: 6, title: 'The Catcher in the Rye', author: 'J.D. Salinger', genre: 'Fiction', status: 'Finished', rating: 3 },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [counts, setCounts] = useState({ 'Want to Read': 0, 'Reading': 0, 'Finished': 0 });

  // useEffect: count books per shelf
  useEffect(() => {
    const newCounts = STATUSES.reduce((acc, status) => {
      acc[status] = books.filter((b) => b.status === status).length;
      return acc;
    }, {});
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCounts(newCounts);
  }, [books]);

  const handleAddBook = ({ title, author, genre }) => {
    setBooks((prev) => [...prev, { id: Date.now(), title, author, genre, status: 'Want to Read', rating: 0 }]);
  };

  const handleMove = (id, newStatus) => {
    setBooks((prev) =>
      prev.map((book) =>
        book.id === id ? { ...book, status: newStatus, rating: newStatus === 'Finished' ? book.rating : 0 } : book
      )
    );
  };

  const handleDelete = (id) => {
    setBooks((prev) => prev.filter((book) => book.id !== id));
  };

  const handleRate = (id, rating) => {
    setBooks((prev) => prev.map((book) => (book.id === id ? { ...book, rating } : book)));
  };

  const columnAccent = {
    'Want to Read': '#3b82f6',
    'Reading':      '#f59e0b',
    'Finished':     '#10b981',
  };

  return (
    <div className="dashboard-page">
      {/* Page Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <h1 className="dashboard-title">
           {user ? `${user.name}'s Bookshelf` : 'My Bookshelf'}
        </h1>
        <button onClick={() => setIsModalOpen(true)} className="add-book-btn">
          + Add Book
        </button>
      </div>

      {/* 3-Column Board */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {STATUSES.map((status) => (
          <div key={status} className="shelf-column" style={{ borderTop: `4px solid ${columnAccent[status]}` }}>
            <h2 className="shelf-column-header" style={{ color: columnAccent[status] }}>
              {status}
              <span className="shelf-count-badge">{counts[status]}</span>
            </h2>

            <div>
              {books.filter((b) => b.status === status).map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onDelete={handleDelete}
                  onMove={handleMove}
                  onRate={handleRate}
                />
              ))}
              {counts[status] === 0 && (
                <p className="shelf-empty-msg">No books here yet</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <AddBookModal onClose={() => setIsModalOpen(false)} onAdd={handleAddBook} />
      )}
    </div>
  );
}
