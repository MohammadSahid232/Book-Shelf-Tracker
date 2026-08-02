import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import BookCard from '../components/BookCard';
import BookModal from '../components/BookModal';
import StatCard from '../components/StatCard';
import ReadingChart from '../components/ReadingChart';
import NotesDrawer from '../components/NotesDrawer';
import {
  BookOpen,
  BookMarked,
  CheckCircle2,
  Heart,
  Award,
  Plus,
  TrendingUp,
  Flame,
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const { getAuthHeaders, BACKEND_URL, user } = useAuth();
  const [books, setBooks] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isNotesOpen, setIsNotesOpen] = useState(false);

  // Goals
  const [goal, setGoal] = useState({ target: 20, current: 0 });

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const headers = getAuthHeaders();
      const [booksRes, statsRes] = await Promise.all([
        axios.get(`${BACKEND_URL}/api/books`, { headers }),
        axios.get(`${BACKEND_URL}/api/books/stats`, { headers }).catch(() => ({ data: null })),
      ]);

      setBooks(booksRes.data || []);
      if (statsRes.data) {
        setStats(statsRes.data);
      }
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
      toast.error('Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleSaveBook = async (formData) => {
    try {
      const headers = getAuthHeaders();
      if (editingBook) {
        await axios.patch(`${BACKEND_URL}/api/books/${editingBook._id || editingBook.id}`, formData, { headers });
        toast.success('Book updated successfully! 🎉');
      } else {
        await axios.post(`${BACKEND_URL}/api/books`, formData, { headers });
        toast.success('Book added to your library! 📚');
      }
      setIsModalOpen(false);
      setEditingBook(null);
      fetchDashboardData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error saving book');
    }
  };

  const handleDeleteBook = async (id) => {
    if (!window.confirm('Are you sure you want to delete this book?')) return;
    try {
      const headers = getAuthHeaders();
      await axios.delete(`${BACKEND_URL}/api/books/${id}`, { headers });
      toast.success('Book deleted');
      fetchDashboardData();
    } catch (err) {
      toast.error('Failed to delete book');
    }
  };

  const handleToggleFavorite = async (id, favorite) => {
    try {
      const headers = getAuthHeaders();
      await axios.patch(`${BACKEND_URL}/api/books/${id}`, { favorite }, { headers });
      fetchDashboardData();
    } catch (err) {
      toast.error('Error updating favorite');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const headers = getAuthHeaders();
      await axios.patch(`${BACKEND_URL}/api/books/${id}`, { status: newStatus }, { headers });
      toast.success(`Moved to ${newStatus}`);
      fetchDashboardData();
    } catch (err) {
      toast.error('Error updating status');
    }
  };

  // Metrics calculation fallback
  const totalBooks = stats?.totalBooks || books.length;
  const wantToRead = stats?.wantToRead || books.filter((b) => b.status === 'want to read').length;
  const reading = stats?.reading || books.filter((b) => b.status === 'reading').length;
  const finished = stats?.finished || books.filter((b) => b.status === 'finished').length;
  const favorites = stats?.favorites || books.filter((b) => b.favorite).length;
  const avgRating = stats?.avgRating || '0.0';
  const favoriteGenre = stats?.favoriteGenre || 'Fiction';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-900 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8 transition-colors">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-6 md:p-8 text-white shadow-xl shadow-blue-500/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold mb-3">
            <Flame className="w-4 h-4 text-amber-300 fill-amber-300" />
            <span>Welcome Back, {user?.name || user?.first_name || 'Book Lover'}</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">Your Personal BookShelf Dashboard</h1>
          <p className="text-blue-100 text-sm mt-1 max-w-xl">
            Track reading goals, explore analytics, and manage your library seamlessly.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingBook(null);
            setIsModalOpen(true);
          }}
          className="px-5 py-3 bg-white text-blue-700 hover:bg-blue-50 font-bold rounded-2xl shadow-lg transition-all transform hover:scale-105 flex items-center gap-2 text-sm"
        >
          <Plus className="w-5 h-5" />
          Add Book to Library
        </button>
      </div>

      {/* Hero Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={BookOpen} label="Total Books" value={totalBooks} accent="blue" />
        <StatCard icon={BookMarked} label="Currently Reading" value={reading} accent="amber" />
        <StatCard icon={CheckCircle2} label="Finished Books" value={finished} accent="emerald" />
        <StatCard icon={Heart} label="Favorite Books" value={favorites} accent="rose" />
      </div>

      {/* Reading Goal & Stats Summary Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Annual Reading Goal Card */}
        <div className="bg-white dark:bg-neutral-800/90 border border-slate-200/80 dark:border-neutral-700/80 rounded-3xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-indigo-500" />
                2026 Reading Goal
              </h3>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300">
                {finished} / {goal.target} Books
              </span>
            </div>

            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-400">
                <span>Goal Completion</span>
                <span>{Math.min(100, Math.round((finished / goal.target) * 100))}%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-neutral-700 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-700"
                  style={{ width: `${Math.min(100, (finished / goal.target) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-neutral-700/60 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Avg Rating: <strong className="text-amber-500">{avgRating} ★</strong></span>
            <span>Top Genre: <strong className="text-blue-500">{favoriteGenre}</strong></span>
          </div>
        </div>

        <div className="lg:col-span-2">
          <ReadingChart
            monthlyStats={stats?.monthlyStats || []}
            genreDistribution={stats?.genreDistribution || []}
            ratingDistribution={stats?.ratingDistribution || []}
          />
        </div>
      </div>

      {/* Book Shelves Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">Your Reading Shelf</h2>
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Showing {books.length} Total Books
          </span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-64 rounded-2xl bg-slate-200 dark:bg-neutral-800 animate-pulse" />
            ))}
          </div>
        ) : books.length === 0 ? (
          <div className="bg-white dark:bg-neutral-800 rounded-3xl p-12 text-center border border-slate-200 dark:border-neutral-700">
            <BookOpen className="w-12 h-12 text-slate-300 dark:text-neutral-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">Your Shelf is Empty</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
              Start building your personal digital library by adding your first book.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-md shadow-blue-500/20"
            >
              + Add First Book
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {books.map((book) => (
              <BookCard
                key={book._id || book.id}
                book={book}
                onEdit={(b) => {
                  setEditingBook(b);
                  setIsModalOpen(true);
                }}
                onDelete={handleDeleteBook}
                onToggleFavorite={handleToggleFavorite}
                onStatusChange={handleStatusChange}
                onOpenNotes={(b) => {
                  setSelectedBook(b);
                  setIsNotesOpen(true);
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Book Modal */}
      <BookModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingBook(null);
        }}
        onSave={handleSaveBook}
        editingBook={editingBook}
      />

      <NotesDrawer
        isOpen={isNotesOpen}
        onClose={() => {
          setIsNotesOpen(false);
          setSelectedBook(null);
        }}
        book={selectedBook}
      />
    </div>
  );
}
