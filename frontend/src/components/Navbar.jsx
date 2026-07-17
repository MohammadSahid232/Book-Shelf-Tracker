import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBookOpen, FaUser, FaSignOutAlt, FaColumns, FaTasks, FaBookReader } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="navbar bg-white dark:bg-neutral-800 border-b border-slate-200 dark:border-neutral-700/80 px-4 md:px-8 shadow-xs sticky top-0 z-50 transition-all duration-300">
      {/* Brand logo & name */}
      <div className="flex-1">
        <Link
          to={user?.role === 'admin' ? '/admin/dashboard' : user ? '/books' : '/'}
          className="flex items-center gap-2.5 text-xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent hover:scale-102 transition-transform"
        >
          <div className="bg-blue-600 text-white p-2 rounded-xl shadow-md shadow-blue-500/20">
            <FaBookOpen className="w-5 h-5" />
          </div>
          <span className="hidden sm:inline">BookShelf</span>
        </Link>
      </div>

      {/* Center navigation links (only for desktop) */}
      {user && (
        <div className="hidden md:flex ml-6 flex-none">
          <ul className="menu menu-horizontal px-1 gap-1">
            {user.role === 'admin' ? (
              <>
                <li>
                  <Link
                    to="/admin/dashboard"
                    className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 rounded-lg transition-colors"
                  >
                    <FaColumns className="w-4 h-4" />
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/tasks"
                    className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 rounded-lg transition-colors"
                  >
                    <FaTasks className="w-4 h-4" />
                    Tasks
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Link
                  to="/books"
                  className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 rounded-lg transition-colors"
                >
                  <FaBookReader className="w-4 h-4" />
                  My Shelf
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}

      {/* Right-side user controls */}
      <div className="flex-none gap-3 items-center">
        {user ? (
          <>
            {/* User Role Badge */}
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${
              user.role === 'admin'
                ? 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800'
                : 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800'
            }`}>
              {user.role === 'admin' ? '👑 Admin' : '📖 Reader'}
            </span>

            {/* Profile Dropdown */}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar online ring-2 ring-blue-500/10 hover:ring-blue-500/30 transition-all"
              >
                <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-neutral-700 flex items-center justify-center font-bold text-blue-700 dark:text-blue-300 capitalize text-sm">
                  {user.name?.[0]}
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-xl bg-white dark:bg-neutral-800 rounded-2xl w-52 border border-slate-200 dark:border-neutral-700 space-y-1"
              >
                <li className="menu-title px-4 py-2 text-xs font-bold text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-neutral-700/50 mb-1">
                  Logged in as {user.name}
                </li>
                <li>
                  <Link to={user.role === 'admin' ? "/admin/dashboard" : "/books"} className="font-semibold text-slate-700 dark:text-slate-300 rounded-xl py-2 hover:bg-slate-50 dark:hover:bg-neutral-700/50">
                    My Profile
                  </Link>
                </li>
                <hr className="border-slate-100 dark:border-neutral-700/50 my-1" />
                <li>
                  <button
                    onClick={handleLogout}
                    className="font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl py-2 flex items-center gap-2"
                  >
                    <FaSignOutAlt className="w-4 h-4" />
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <div className="flex gap-2">
            <Link
              to="/login"
              id="navbar-login-btn"
              className="px-4 py-2 text-sm font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-neutral-700 rounded-xl transition-all"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              id="navbar-register-btn"
              className="px-4 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-sm shadow-blue-500/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
