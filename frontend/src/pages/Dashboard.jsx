import React, { useState, useEffect } from 'react';
import BookCard from '../components/BookCard';
import { useAuth } from '../context/AuthContext';

const STATUSES = ['Want to Read', 'Reading', 'Finished'];

// AddBookModal Component
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
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <h2 className="modal-title">Add New Book</h2>
          <button onClick={onClose} className="modal-close-btn">×</button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label className="form-label">Title <span style={{ color: 'var(--color-danger)' }}>*</span></label>
            <input type="text" placeholder="e.g. The Great Gatsby" value={title}
              onChange={(e) => setTitle(e.target.value)} required className="form-input" />
          </div>
          <div>
            <label className="form-label">Author <span style={{ color: 'var(--color-danger)' }}>*</span></label>
            <input type="text" placeholder="e.g. F. Scott Fitzgerald" value={author}
              onChange={(e) => setAuthor(e.target.value)} required className="form-input" />
          </div>
          <div>
            <label className="form-label">Genre</label>
            <input type="text" placeholder="e.g. Fiction" value={genre}
              onChange={(e) => setGenre(e.target.value)} className="form-input" />
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '0.5rem' }}>
            <button type="button" onClick={onClose} className="modal-cancel-btn">Cancel</button>
            <button type="submit" className="modal-submit-btn">Add Book</button>
          </div>
        </form>
      </div>
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
          📚 {user ? `${user.name}'s Bookshelf` : 'My Bookshelf'}
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

export default Dashboard;
