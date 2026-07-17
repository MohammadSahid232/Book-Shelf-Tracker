import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });

    const result = await login(email, password);

    if (!result.success) {
      setMessage({ text: result.message || 'Login failed', type: 'error' });
      return;
    }

    // Role-based redirect
    if (result.role === 'admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/books');
    }
  };

  return (
    <main className="bg-gray-50 px-4 md:px-8 dark:bg-neutral-900 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl shadow-lg mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">Book Shelf Tracker</h1>
        </div>

        <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm md:p-8 dark:bg-neutral-800 dark:border-neutral-700">
          <h2 className="text-slate-900 text-center text-2xl font-bold dark:text-slate-50 mb-2">Welcome back</h2>
          <p className="text-center text-sm text-slate-500 dark:text-slate-400 mb-8">Sign in to your account</p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="mb-2 text-slate-700 font-medium text-sm inline-block dark:text-slate-300">
                Email address
              </label>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-3 py-2.5 text-sm text-slate-900 rounded-lg bg-gray-50 w-full border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-slate-50 dark:bg-neutral-700 dark:border-neutral-600"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 text-slate-700 font-medium text-sm inline-block dark:text-slate-300">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="px-3 py-2.5 text-sm text-slate-900 rounded-lg bg-gray-50 w-full border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-slate-50 dark:bg-neutral-700 dark:border-neutral-600"
              />
            </div>

            {message.text && (
              <div className={`p-3 rounded-lg text-sm font-medium text-center ${
                message.type === 'error'
                  ? 'bg-red-50 text-red-700 border border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800'
                  : 'bg-green-50 text-green-700 border border-green-200'
              }`}>
                {message.text}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              id="login-submit-btn"
              className="w-full py-2.5 px-4 text-sm rounded-lg font-semibold cursor-pointer text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>

            <div className="text-slate-600 text-sm text-center dark:text-slate-400">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-600 hover:underline font-medium dark:text-blue-400">
                Create one
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
