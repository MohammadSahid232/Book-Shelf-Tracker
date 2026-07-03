import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';

const Header = () => {
    const { user, logout } = useAuth();

    return (
        <div className="app-navbar">
            <Link to={user ? "/dashboard" : "/"} className="app-navbar-brand">
                📚 Book Tracker
            </Link>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <ThemeToggle />
                {user ? (
                    <>
                        <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                            Welcome, {user.name}
                        </span>
                        <button
                            onClick={logout}
                            style={{ fontSize: '0.875rem', color: 'var(--color-danger)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', textDecoration: 'none', fontWeight: 500 }}>Login</Link>
                        <Link to="/register" style={{ fontSize: '0.875rem', color: '#fff', background: 'var(--color-primary)', padding: '0.35rem 0.85rem', borderRadius: '0.4rem', textDecoration: 'none', fontWeight: 600 }}>Register</Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Header;