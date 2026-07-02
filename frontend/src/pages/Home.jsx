import React from 'react';
import BookCard from '../components/BookCard';

function Home() {
  const books = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', status: 'Want to Read' },
    { id: 2, title: '1984', author: 'George Orwell', status: 'Want to Read' },
    { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee', status: 'Reading' },
    { id: 4, title: 'Pride and Prejudice', author: 'Jane Austen', status: 'Reading' },
    { id: 5, title: 'The Catcher in the Rye', author: 'J.D. Salinger', status: 'Finished' },
    { id: 6, title: 'The Hobbit', author: 'J.R.R. Tolkien', status: 'Finished' },
  ];

  const wantToReadBooks = books.filter(b => b.status === 'Want to Read');
  const readingBooks = books.filter(b => b.status === 'Reading');
  const finishedBooks = books.filter(b => b.status === 'Finished');

  return (
    <div className="min-h-screen bg-base-200 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">My Bookshelf Tracker</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Want to Read Column */}
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold mb-4 text-center border-b-2 border-primary pb-2">Want to Read</h2>
          <div className="flex-1">
            {wantToReadBooks.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>

        {/* Reading Column */}
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold mb-4 text-center border-b-2 border-secondary pb-2">Reading</h2>
          <div className="flex-1">
            {readingBooks.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>

        {/* Finished Column */}
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold mb-4 text-center border-b-2 border-accent pb-2">Finished</h2>
          <div className="flex-1">
            {finishedBooks.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
