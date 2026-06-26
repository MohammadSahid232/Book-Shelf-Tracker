import React from 'react';
import BookShelfForm from '../components/BookShelfForm';

function Home() {
  const handleAddBook = (book) => {
    console.log('Book added:', book);
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <BookShelfForm onAddBook={handleAddBook} />
    </div>
  );
}

export default Home;
