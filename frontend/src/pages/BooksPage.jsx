import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import BookCard from '../components/BookCard';
import Column from '../components/Column';

const API = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/books`;

export default function BooksPage() {
  const { user, getAuthHeaders } = useAuth();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await axios.get(API, { headers: getAuthHeaders() });
        setBooks(response.data);
      } catch (err) {
        setError('Failed to load books. Is the backend running?');
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const filtered = books.filter((b) => {
    const matchSearch =
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      (b.author && b.author.toLowerCase().includes(search.toLowerCase()));
    const matchStatus = filterStatus === 'all' || b.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const grouped = {
    'want to read': filtered.filter((b) => b.status === 'want to read'),
    reading: filtered.filter((b) => b.status === 'reading'),
    finished: filtered.filter((b) => b.status === 'finished'),
  };

  const colTitles = { 'want to read': 'Want to Read', reading: 'Currently Reading', finished: 'Finished' };
  const colBorderColors = { 'want to read': 'border-blue-500', reading: 'border-yellow-500', finished: 'border-green-500' };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">📚 My Book Shelf</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Welcome, {user?.name || user?.first_name || 'User'}! Browse your reading list.
        </p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1 relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            placeholder="Search books or authors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg bg-white dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2.5 text-sm rounded-lg bg-white dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        >
          <option value="all">All Status</option>
          <option value="want to read">Want to Read</option>
          <option value="reading">Reading</option>
          <option value="finished">Finished</option>
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {Object.entries(grouped).map(([status, bks]) => (
          <div key={status} className="bg-white dark:bg-neutral-800 rounded-xl p-4 border border-slate-200 dark:border-neutral-700 shadow-sm text-center">
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-50">{bks.length}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 capitalize mt-0.5">{colTitles[status]}</p>
          </div>
        ))}
      </div>

      {error && (
        <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

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
                  key={book.id || book._id}
                  book={book}
                />
              ))}
            </Column>
          ))}
        </div>
      )}
    </div>
  );
}
