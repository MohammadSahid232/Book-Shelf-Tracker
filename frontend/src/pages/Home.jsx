import React, { useState, useEffect } from 'react';
import BookCard from '../components/BookCard';
import { useAuth } from '../context/AuthContext';

function Home() {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data when component loads using useEffect
  useEffect(() => {
    // We fetch some dummy data from OpenLibrary to demonstrate useEffect
    fetch('https://openlibrary.org/subjects/fiction.json?limit=6')
      .then((response) => response.json())
      .then((data) => {
        // Map the fetched data to our book format
        const fetchedBooks = data.works.map((work, index) => {
          let status = 'Want to Read';
          if (index > 1) status = 'Reading';
          if (index > 3) status = 'Finished';

          return {
            id: work.key,
            title: work.title,
            author: work.authors && work.authors.length > 0 ? work.authors[0].name : 'Unknown Author',
            status: status
          };
        });
        
        setBooks(fetchedBooks);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []); // Empty array = run only ONCE on mount

  const wantToReadBooks = books.filter(b => b.status === 'Want to Read');
  const readingBooks = books.filter(b => b.status === 'Reading');
  const finishedBooks = books.filter(b => b.status === 'Finished');

  if (loading) {
    return <div className="min-h-screen bg-base-200 flex items-center justify-center text-xl font-bold">Loading books...</div>;
  }

  return (
    <div className="min-h-screen bg-base-200 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        {user ? `${user.name}'s Bookshelf Tracker` : 'My Bookshelf Tracker'}
      </h1>
      
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
