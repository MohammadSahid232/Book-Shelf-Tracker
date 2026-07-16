import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from '../components/BookCard';
import { useAuth } from '../context/AuthContext';

function Dashboard() {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch books on mount using Axios
  useEffect(() => {
    axios.get('http://localhost:5000/api/books')
      .then((response) => {
        const fetchedBooks = response.data.map((book) => {
          // Normalize status casing to match the frontend column filters
          let status = 'Want to Read';
          if (book.status.toLowerCase() === 'reading') status = 'Reading';
          if (book.status.toLowerCase() === 'finished') status = 'Finished';

          return {
            id: book.id,
            title: book.title,
            author: book.author,
            status: status
          };
        });

        setBooks(fetchedBooks);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching books:', error);
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
        {user ? `${user.name}'s Bookshelf Dashboard` : 'My Bookshelf Dashboard'}
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

export default Dashboard;
