import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import {
  ArrowLeft, ChevronLeft, ChevronRight, ZoomIn, ZoomOut,
  Maximize, Minimize, Moon, Sun, Bookmark, RotateCw, Loader,
  BookOpen, Clock, Flag
} from 'lucide-react';
import toast from 'react-hot-toast';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function ReaderPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getAuthHeaders, BACKEND_URL } = useAuth();

  const [book, setBook] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(1.2);
  const [rotation, setRotation] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [readingTime, setReadingTime] = useState(0); // seconds
  const containerRef = useRef(null);
  const timerRef = useRef(null);
  const saveTimerRef = useRef(null);

  // Fetch book and reading progress
  const fetchBook = useCallback(async () => {
    setLoading(true);
    try {
      const headers = getAuthHeaders();
      const { data } = await axios.get(`${BACKEND_URL}/api/library/${id}`, { headers });
      const b = data.book;

      if (!b.pdfUrl) {
        setError('No PDF available for this book.');
        setLoading(false);
        return;
      }

      setBook(b);
      setPdfUrl(b.pdfUrl);

      // Restore reading position
      if (data.userBook?.currentPage > 0) {
        setCurrentPage(data.userBook.currentPage);
      }

      // Fetch bookmarks
      const { data: bms } = await axios.get(`${BACKEND_URL}/api/bookmarks/${id}`, { headers });
      setBookmarks(bms || []);
    } catch (err) {
      setError('Book not found or access denied.');
    } finally {
      setLoading(false);
    }
  }, [id, BACKEND_URL]);

  useEffect(() => { fetchBook(); }, [fetchBook]);

  // Reading timer
  useEffect(() => {
    timerRef.current = setInterval(() => setReadingTime((t) => t + 1), 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  // Auto-save progress every 30 seconds
  useEffect(() => {
    saveTimerRef.current = setInterval(() => {
      saveProgress();
    }, 30000);
    return () => clearInterval(saveTimerRef.current);
  }, [currentPage, id]);

  // Save on unmount
  useEffect(() => {
    return () => {
      saveProgress();
      clearInterval(saveTimerRef.current);
    };
  }, [currentPage]);

  const saveProgress = async () => {
    if (!id || !currentPage) return;
    try {
      await axios.patch(`${BACKEND_URL}/api/shelf/${id}`, { currentPage }, { headers: getAuthHeaders() });
    } catch (_) {} // Silent fail
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const goToPage = (p) => {
    const pg = Math.min(Math.max(1, p), numPages || 1);
    setCurrentPage(pg);
  };

  const addBookmark = async () => {
    try {
      const { data } = await axios.post(`${BACKEND_URL}/api/bookmarks`, {
        bookId: id, page: currentPage, label: `Page ${currentPage}`
      }, { headers: getAuthHeaders() });
      setBookmarks((prev) => [...prev, data]);
      toast.success(`Bookmarked page ${currentPage} 🔖`);
    } catch (err) {
      toast.error('Failed to add bookmark');
    }
  };

  const removeBookmark = async (bmId) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/bookmarks/${bmId}`, { headers: getAuthHeaders() });
      setBookmarks((prev) => prev.filter((b) => b._id !== bmId));
      toast.success('Bookmark removed');
    } catch (_) {}
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setFullscreen(true);
    } else {
      document.exitFullscreen();
      setFullscreen(false);
    }
  };

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const currentPageBookmark = bookmarks.find((b) => b.page === currentPage);

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
        <div className="text-center text-white space-y-3">
          <Loader className="w-10 h-10 animate-spin mx-auto text-indigo-400" />
          <p className="text-sm text-neutral-400">Loading reader…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
        <div className="text-center text-white space-y-4">
          <BookOpen className="w-16 h-16 text-neutral-600 mx-auto" />
          <p className="text-neutral-300">{error}</p>
          <button onClick={() => navigate(-1)} className="px-4 py-2 bg-indigo-600 rounded-xl text-sm font-bold">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`min-h-screen flex flex-col ${darkMode ? 'bg-neutral-950' : 'bg-neutral-100'} transition-colors`}
    >
      {/* ── Top Toolbar ── */}
      <div className={`flex items-center gap-2 px-4 py-2 border-b ${darkMode ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-200 text-slate-800'} shadow-sm flex-wrap`}>
        <button onClick={() => { saveProgress(); navigate(-1); }} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors text-slate-500 hover:text-indigo-600">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-black truncate">{book?.title}</p>
          <p className="text-[10px] text-slate-400">{book?.author}</p>
        </div>

        {/* Timer */}
        <div className={`flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-lg ${darkMode ? 'bg-neutral-800 text-neutral-400' : 'bg-slate-100 text-slate-500'}`}>
          <Clock className="w-3 h-3" /> {formatTime(readingTime)}
        </div>

        {/* Page Counter */}
        <div className="flex items-center gap-1.5">
          <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage <= 1} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-neutral-800 disabled:opacity-30 transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-1">
            <input
              type="number"
              min={1} max={numPages || 1}
              value={currentPage}
              onChange={(e) => goToPage(Number(e.target.value))}
              className={`w-12 text-center text-xs font-bold rounded-lg px-1 py-1 border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${darkMode ? 'bg-neutral-800 border-neutral-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'}`}
            />
            <span className="text-xs text-slate-400">/ {numPages || '—'}</span>
          </div>
          <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage >= (numPages || 1)} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-neutral-800 disabled:opacity-30 transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Zoom */}
        <div className="flex items-center gap-1">
          <button onClick={() => setScale((s) => Math.max(0.5, +(s - 0.1).toFixed(1)))} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors">
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-xs font-bold w-10 text-center">{Math.round(scale * 100)}%</span>
          <button onClick={() => setScale((s) => Math.min(3.0, +(s + 0.1).toFixed(1)))} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors">
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>

        {/* Other tools */}
        <button onClick={() => setRotation((r) => (r + 90) % 360)} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors" title="Rotate">
          <RotateCw className="w-4 h-4" />
        </button>
        <button onClick={() => (currentPageBookmark ? removeBookmark(currentPageBookmark._id) : addBookmark())}
          title={currentPageBookmark ? 'Remove bookmark' : 'Add bookmark'}
          className={`p-1.5 rounded-lg transition-colors ${currentPageBookmark ? 'text-amber-500 bg-amber-50 dark:bg-amber-900/20' : 'hover:bg-slate-100 dark:hover:bg-neutral-800'}`}
        >
          <Bookmark className="w-4 h-4" fill={currentPageBookmark ? 'currentColor' : 'none'} />
        </button>
        <button onClick={() => setShowBookmarks(!showBookmarks)} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors text-xs font-bold">
          📑 {bookmarks.length}
        </button>
        <button onClick={() => setDarkMode(!darkMode)} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors">
          {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
        <button onClick={toggleFullscreen} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors">
          {fullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Bookmarks Sidebar */}
        {showBookmarks && (
          <div className={`w-56 shrink-0 border-r overflow-y-auto ${darkMode ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-200'}`}>
            <div className="p-3">
              <h3 className="text-xs font-black mb-3">Bookmarks ({bookmarks.length})</h3>
              {bookmarks.length === 0 ? (
                <p className="text-xs text-slate-400">No bookmarks yet.</p>
              ) : (
                <div className="space-y-1.5">
                  {bookmarks.map((bm) => (
                    <button key={bm._id} onClick={() => goToPage(bm.page)}
                      className={`w-full text-left px-2.5 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${currentPage === bm.page ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300' : 'hover:bg-slate-50 dark:hover:bg-neutral-800'}`}
                    >
                      <span className="flex items-center gap-1.5">
                        <Bookmark className="w-3 h-3 text-amber-500" fill="currentColor" />
                        Page {bm.page}
                      </span>
                      <button onClick={(e) => { e.stopPropagation(); removeBookmark(bm._id); }} className="text-slate-300 hover:text-red-500">×</button>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* PDF Viewer */}
        <div className={`flex-1 overflow-auto flex items-start justify-center py-6 px-4 ${darkMode ? 'bg-neutral-950' : 'bg-neutral-200'}`}>
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={() => setError('Failed to load PDF. Check if the URL is a valid, accessible PDF file.')}
            loading={
              <div className="flex items-center justify-center py-20">
                <Loader className="w-8 h-8 animate-spin text-indigo-500" />
              </div>
            }
          >
            <Page
              pageNumber={currentPage}
              scale={scale}
              rotate={rotation}
              className={`shadow-2xl ${darkMode ? 'invert' : ''}`}
              renderTextLayer={true}
              renderAnnotationLayer={true}
            />
          </Document>
        </div>
      </div>

      {/* Progress Bar */}
      {numPages && (
        <div className={`h-1 ${darkMode ? 'bg-neutral-800' : 'bg-slate-200'}`}>
          <div
            className="h-full bg-indigo-500 transition-all duration-300"
            style={{ width: `${(currentPage / numPages) * 100}%` }}
          />
        </div>
      )}

      {/* Bottom Nav */}
      <div className={`flex items-center justify-center gap-6 px-4 py-2 border-t ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-slate-200'}`}>
        <button onClick={() => goToPage(1)} className={`text-[10px] font-semibold ${darkMode ? 'text-neutral-500 hover:text-white' : 'text-slate-400 hover:text-slate-700'} transition-colors`}>⏮ First</button>
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage <= 1}
          className={`flex items-center gap-1 px-4 py-1.5 rounded-xl text-xs font-bold transition-colors disabled:opacity-30 ${darkMode ? 'bg-neutral-800 text-white hover:bg-neutral-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
        >
          <ChevronLeft className="w-4 h-4" /> Previous
        </button>
        <span className={`text-xs font-bold ${darkMode ? 'text-neutral-400' : 'text-slate-500'}`}>
          {Math.round((currentPage / (numPages || 1)) * 100)}% complete
        </span>
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage >= (numPages || 1)}
          className="flex items-center gap-1 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors disabled:opacity-30"
        >
          Next <ChevronRight className="w-4 h-4" />
        </button>
        <button onClick={() => goToPage(numPages)} className={`text-[10px] font-semibold ${darkMode ? 'text-neutral-500 hover:text-white' : 'text-slate-400 hover:text-slate-700'} transition-colors`}>Last ⏭</button>
      </div>
    </div>
  );
}
