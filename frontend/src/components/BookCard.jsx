

const STATUS_ORDER = ['Want to Read', 'Reading', 'Finished'];

// Star Rating Component
const StarRating = ({ rating, onRate }) => {
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => onRate(star)}
          className={`star-btn ${star <= rating ? 'active' : ''}`}
          aria-label={`Rate ${star} star`}
        >
          ★
        </button>
      ))}
    </div>
  );
};

const BookCard = ({ book, onDelete, onMove, onRate }) => {
  const currentIndex = STATUS_ORDER.indexOf(book.status);

  return (
    <div className="book-card">
      {/* Cover Placeholder */}
      <div className="book-cover-placeholder">📖</div>

      {/* Book Info */}
      <p className="book-title">{book.title}</p>
      <p className="book-author">{book.author}</p>
      {book.genre && <span className="book-genre-badge">{book.genre}</span>}

      {/* Star Rating — only for Finished */}
      {book.status === 'Finished' && (
        <StarRating rating={book.rating || 0} onRate={(val) => onRate(book.id, val)} />
      )}

      {/* Actions */}
      <div className="card-actions">
        <div style={{ display: 'flex', gap: '0.25rem' }}>
          <button
            onClick={() => onMove(book.id, STATUS_ORDER[currentIndex - 1])}
            disabled={currentIndex === 0}
            className="card-move-btn"
            title="Move back"
          >
            ← Back
          </button>
          <button
            onClick={() => onMove(book.id, STATUS_ORDER[currentIndex + 1])}
            disabled={currentIndex === STATUS_ORDER.length - 1}
            className="card-move-btn"
            title="Move forward"
          >
            Next →
          </button>
        </div>
        <button
          onClick={() => onDelete(book.id)}
          className="card-delete-btn"
          title="Delete book"
        >
          🗑 Delete
        </button>
      </div>
    </div>
  );
};

export default BookCard;
