import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const { user, logout } = useAuth();

    return (
        <div className="navbar bg-blue-200 p-5 shadow-sm">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl font-bold">Book Tracker</Link>
            </div>
            <div className="flex-none gap-2">
                {user ? (
                    <>
                        <span className="font-semibold text-gray-700 mr-4">Welcome, {user.name}</span>
                        <button onClick={logout} className="btn btn-ghost text-error">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="btn btn-ghost">Login</Link>
                        <Link to="/register" className="btn btn-primary">Register</Link>
                    </>
                )}
            </div>
        </div>
    )
}

export default Header;