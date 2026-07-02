import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="navbar bg-blue-200 p-5 shadow-sm">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl font-bold">Book Tracker</Link>
            </div>
            <div className="flex-none gap-2">
                <Link to="/login" className="btn btn-ghost">Login</Link>
                <Link to="/register" className="btn btn-primary">Register</Link>
            </div>
        </div>
    )
}

export default Header;