import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search, Filter, Star, BookOpen, Download, Loader, SlidersHorizontal, X
} from 'lucide-react';
import toast from 'react-hot-toast';

const BookSearchCard = ({ book, navigate }) => (
  <motion.div
    whileHover={{ y: -3 }}
    onClick={() => navigate(`/book/${book._id}`)}
    className="bg-white dark:bg-neutral-800 rounded-2xl border border-slate-200/70 dark:border-neutral-700/60 p-3 flex gap-3 cursor-pointer hover:shadow-lg transition-all group"
  >
    <div className="w-14 h-20 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 overflow-hidden flex-shrink-0">
      {book.coverImage
        ? <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
        : <BookOpen className="w-6 h-6 text-indigo-300 m-auto mt-5" />
      }
    </div>
    <div className="flex-1 min-w-0">
      <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{book.title}</h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{book.author}</p>
      <div className="flex items-center gap-2 mt-1.5 flex-wrap">
        <span className="text-[9px] font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-400 px-2 py-0.5 rounded-full">{book.genre}</span>
        {book.language && <span className="text-[9px] text-slate-400">{book.language}</span>}
        {book.downloadAllowed && <span className="text-[9px] font-bold bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded-full">Free</span>}
      </div>
      {book.averageRating > 0 && (
        <div className="flex items-center gap-1 mt-1.5">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">{book.averageRating}</span>
          <span className="text-[9px] text-slate-400">({book.reviewCount || 0})</span>
        </div>
      )}
      {book.description && (
        <p className="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-snug">{book.description}</p>
      )}
    </div>
  </motion.div>
);

export default function SearchPage() {
  const { BACKEND_URL } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  // Filters
  const [genre, setGenre] = useState('');
  const [language, setLanguage] = useState('');
  const [rating, setRating] = useState('');
  const [available, setAvailable] = useState('');
  const [sortBy, setSortBy] = useState('score');

  const [genres, setGenres] = useState([]);

  const LANGUAGES = ['English', 'Spanish', 'French', 'German', 'Arabic', 'Chinese', 'Hindi', 'Portuguese'];

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/library/genres`).then(({ data }) => setGenres(data)).catch(() => {});
  }, [BACKEND_URL]);

  const doSearch = useCallback(async (pg = 1) => {
    const q = searchParams.get('q') || query;
    if (!q && !genre && !language) return;

    setLoading(true);
    try {
      const params = new URLSearchParams({ page: pg, limit: 20 });
      if (q) params.append('q', q);
      if (genre) params.append('genre', genre);
      if (language) params.append('language', language);
      if (rating) params.append('rating', rating);
      if (available) params.append('available', available);
      if (sortBy !== 'score') params.append('sortBy', sortBy);

      const { data } = await axios.get(`${BACKEND_URL}/api/library/search?${params.toString()}`);
      setResults(data.books || []);
      setTotal(data.total || 0);
      setPages(data.pages || 1);
      setPage(pg);
    } catch (err) {
      toast.error('Search failed');
    } finally {
      setLoading(false);
    }
  }, [BACKEND_URL, query, genre, language, rating, available, sortBy, searchParams]);

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) { setQuery(q); }
    doSearch(1);
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams(query ? { q: query } : {});
    doSearch(1);
  };

  const clearFilters = () => {
    setGenre(''); setLanguage(''); setRating(''); setAvailable(''); setSortBy('score');
  };

  const activeFilters = [genre, language, rating, available].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-900 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-6">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, author, genre, ISBN, tags..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
          />
        </div>
        <button type="submit" className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl text-sm transition-colors shadow-sm">
          Search
        </button>
        <button type="button" onClick={() => setShowFilters(!showFilters)}
          className={`relative px-4 py-3 font-bold rounded-2xl text-sm transition-colors border ${showFilters ? 'bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-400 border-indigo-300' : 'bg-white dark:bg-neutral-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-neutral-700'}`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          {activeFilters > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-600 text-white text-[9px] font-black rounded-full flex items-center justify-center">{activeFilters}</span>}
        </button>
      </form>

      {/* Filters Panel */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-neutral-800 rounded-2xl border border-slate-100 dark:border-neutral-700 p-4 space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black">Filters</h3>
            <button onClick={clearFilters} className="text-xs text-indigo-600 font-semibold flex items-center gap-1"><X className="w-3 h-3" /> Clear all</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 block">Genre</label>
              <select value={genre} onChange={(e) => setGenre(e.target.value)} className="w-full text-xs px-3 py-2 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="">All Genres</option>
                {genres.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 block">Language</label>
              <select value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full text-xs px-3 py-2 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="">All Languages</option>
                {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 block">Min Rating</label>
              <select value={rating} onChange={(e) => setRating(e.target.value)} className="w-full text-xs px-3 py-2 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="">Any Rating</option>
                <option value="4">4+ Stars</option>
                <option value="3">3+ Stars</option>
                <option value="2">2+ Stars</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 block">Availability</label>
              <select value={available} onChange={(e) => setAvailable(e.target.value)} className="w-full text-xs px-3 py-2 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="">All Books</option>
                <option value="true">Free Download</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end">
            <button onClick={() => doSearch(1)} className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-700 transition-colors">Apply Filters</button>
          </div>
        </motion.div>
      )}

      {/* Sort + Results Count */}
      {(results.length > 0 || loading) && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {loading ? 'Searching…' : <><span className="font-bold text-slate-900 dark:text-white">{total}</span> results found</>}
          </p>
          <select value={sortBy} onChange={(e) => { setSortBy(e.target.value); doSearch(1); }}
            className="text-xs px-3 py-1.5 rounded-xl bg-white dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-semibold"
          >
            <option value="score">Best Match</option>
            <option value="createdAt">Newest</option>
            <option value="viewCount">Most Popular</option>
            <option value="downloadCount">Most Downloaded</option>
            <option value="averageRating">Highest Rated</option>
          </select>
        </div>
      )}

      {/* Results */}
      {loading ? (
        <div className="space-y-3">
          {[1,2,3,4,5].map(i => <div key={i} className="h-24 rounded-2xl bg-slate-200 dark:bg-neutral-800 animate-pulse" />)}
        </div>
      ) : results.length === 0 ? (
        <div className="text-center py-20 space-y-3">
          <Search className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-700 dark:text-slate-300">
            {query || genre ? 'No books found' : 'Search the library'}
          </h3>
          <p className="text-sm text-slate-400 max-w-xs mx-auto">
            {query ? `No results for "${query}". Try different keywords.` : 'Enter a search term to find books.'}
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {results.map((b) => <BookSearchCard key={b._id} book={b} navigate={navigate} />)}
          </div>
          {/* Pagination */}
          {pages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-2">
              <button disabled={page <= 1} onClick={() => doSearch(page - 1)} className="px-3 py-1.5 text-xs font-bold rounded-xl bg-white dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 disabled:opacity-30 hover:border-indigo-400 transition-colors">Prev</button>
              <span className="text-xs font-bold text-slate-500">Page {page} of {pages}</span>
              <button disabled={page >= pages} onClick={() => doSearch(page + 1)} className="px-3 py-1.5 text-xs font-bold rounded-xl bg-white dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 disabled:opacity-30 hover:border-indigo-400 transition-colors">Next</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
