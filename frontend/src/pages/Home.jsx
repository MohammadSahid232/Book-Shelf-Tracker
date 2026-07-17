import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex flex-col items-center justify-center text-center px-4 py-16 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-3xl relative z-10">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-3xl shadow-2xl shadow-blue-600/30 mb-8 mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-10 h-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
          </svg>
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
          Track Your Reading<br />
          <span className="text-blue-400">Journey</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
          Organize your personal library, log your reading progress, and discover new books. Built for book lovers, entirely free.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {user ? (
            <>
              {user.role === 'admin' ? (
                <Link
                  to="/admin/dashboard"
                  id="admin-dashboard-btn"
                  className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                >
                  Go to Admin Dashboard →
                </Link>
              ) : (
                <Link
                  to="/books"
                  id="books-page-btn"
                  className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                >
                  Browse Book Shelf →
                </Link>
              )}
            </>
          ) : (
            <>
              <Link
                to="/login"
                id="home-signin-btn"
                className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                id="home-register-btn"
                className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold rounded-xl transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                Create Account
              </Link>
            </>
          )}
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap gap-3 justify-center mt-12">
          {['📚 Track reading progress', '⭐ Rate & review books', '🗂️ Organize your shelf', '🔍 Search & filter'].map((f) => (
            <span key={f} className="px-4 py-2 bg-white/10 border border-white/10 text-slate-300 text-sm rounded-full">
              {f}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
