import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        await logout();
    };

    return (
        <div className="navbar bg-white dark:bg-neutral-800 border-b border-slate-200 dark:border-neutral-700 px-6 shadow-sm">
            <div className="flex-1">
                <Link
                    to={user?.role === 'admin' ? '/admin/dashboard' : user ? '/books' : '/'}
                    className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-slate-50 hover:text-blue-600 transition-colors"
                >
                    <div className="bg-blue-600 text-white p-1.5 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                        </svg>
                    </div>
                    Book Tracker
                </Link>
            </div>
            <div className="flex-none gap-3 items-center">
                {user ? (
                    <>
                        {/* Role badge */}
                        <span className={`hidden sm:inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                            user.role === 'admin'
                                ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300'
                                : 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
                        }`}>
                            {user.role === 'admin' ? '👑 Admin' : '📖 Reader'}
                        </span>

                        {/* Nav link */}
                        {user.role === 'admin' ? (
                            <Link to="/admin/dashboard" className="hidden sm:block text-sm font-medium text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
                                Dashboard
                            </Link>
                        ) : (
                            <Link to="/books" className="hidden sm:block text-sm font-medium text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
                                My Books
                            </Link>
                        )}

                        <span className="hidden sm:block text-sm text-slate-500 dark:text-slate-400">
                            {user.name}
                        </span>

                        <button
                            onClick={handleLogout}
                            className="px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30 rounded-lg transition-colors focus:outline-none"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="px-4 py-1.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-neutral-700 rounded-lg transition-colors">
                            Login
                        </Link>
                        <Link to="/register" className="px-4 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm">
                            Register
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Header;