import React, { useEffect, useState } from 'react';
import { X, NotebookPen, MessageSquareText, Sparkles } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function NotesDrawer({ book, isOpen, onClose }) {
  const { getAuthHeaders, BACKEND_URL } = useAuth();
  const [notes, setNotes] = useState([]);
  const [draft, setDraft] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen || !book) return;
    const fetchNotes = async () => {
      setLoading(true);
      try {
        const headers = getAuthHeaders();
        const response = await axios.get(`${BACKEND_URL}/api/notes?bookId=${book._id || book.id}`, { headers });
        setNotes(response.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, [isOpen, book]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!draft.trim()) return;
    try {
      const headers = getAuthHeaders();
      const response = await axios.post(
        `${BACKEND_URL}/api/notes`,
        { book: book._id || book.id, content: draft, type: 'note' },
        { headers }
      );
      setNotes((prev) => [response.data, ...prev]);
      setDraft('');
    } catch (err) {
      console.error(err);
    }
  };

  if (!isOpen || !book) return null;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end bg-slate-900/50 backdrop-blur-sm">
      <div className="h-full w-full max-w-md bg-white p-6 shadow-2xl dark:bg-neutral-900">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-neutral-700">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">Reading notes</p>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">{book.title}</h3>
          </div>
          <button onClick={onClose} className="rounded-full p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-neutral-800">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-neutral-700 dark:bg-neutral-800">
          <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
            <NotebookPen className="h-4 w-4 text-purple-500" />
            Add a note or quote
          </label>
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={4}
            className="mt-3 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 dark:border-neutral-700 dark:bg-neutral-900"
            placeholder="Capture an insight, quote, or reaction..."
          />
          <button type="submit" className="mt-3 inline-flex items-center gap-2 rounded-2xl bg-purple-600 px-4 py-2 text-sm font-bold text-white">
            <Sparkles className="h-4 w-4" /> Save note
          </button>
        </form>

        <div className="mt-5 space-y-3 overflow-y-auto pb-4">
          {loading ? (
            <p className="text-sm text-slate-500">Loading notes…</p>
          ) : notes.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 p-4 text-sm text-slate-500 dark:border-neutral-700 dark:text-slate-400">
              No notes yet. Capture your thoughts as you read.
            </div>
          ) : (
            notes.map((note) => (
              <div key={note._id || note.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                  <MessageSquareText className="h-3.5 w-3.5" />
                  {note.type}
                </div>
                <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">{note.content}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
