import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="max-w-3xl">
        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight mb-6">
          Track Your Reading Journey with <span className="text-blue-600">Book Tracker</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
          Organize your personal library, log your progress, and list books to read, currently reading, or finished. Entirely free and built for book lovers.
        </p>
        <div className="flex gap-4 justify-center">
          {user ? (
            <Link to="/dashboard" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-md transition-colors">
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link to="/login" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-md transition-colors">
                Sign In
              </Link>
              <Link to="/register" className="px-6 py-3 bg-white dark:bg-neutral-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-neutral-700 font-semibold rounded-md hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors">
                Create Account
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
