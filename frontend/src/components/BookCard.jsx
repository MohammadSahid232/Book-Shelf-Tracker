import React from 'react';

const BookCard = ({ book }) => {
  return (
    <div className="card bg-base-100 shadow-xl mb-4">
      <figure className="px-4 pt-4">
        {/* Cover Placeholder */}
        <div className="bg-base-300 w-full h-48 rounded-xl flex items-center justify-center">
          <span className="text-base-content opacity-50">No Cover</span>
        </div>
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title text-lg">{book.title}</h2>
        <p className="text-sm text-base-content/70">{book.author}</p>
        <div className="card-actions justify-between items-center mt-2">
          <div className="badge badge-primary">{book.status}</div>
          {book.status === 'Finished' && (
            <div className="flex gap-1 text-warning">
              {/* Static Star Rating */}
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span className="text-base-300">★</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
