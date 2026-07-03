import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";

const AdminLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="app-layout">
            <Header />

            <div style={{ display: 'flex', flex: 1, position: 'relative' }}>

                {/* ── Sidebar (always visible on desktop, slide-in on mobile) ── */}
                <aside
                    className="app-sidebar"
                    style={{
                        width: '16rem',
                        minHeight: 'calc(100vh - 62px)',
                        flexShrink: 0,
                        position: 'sticky',
                        top: '62px',
                        alignSelf: 'flex-start',
                        overflowY: 'auto',
                        padding: '1.5rem 1rem',
                        backgroundColor: 'var(--color-surface)',
                        borderRight: '1px solid var(--color-border)',
                        transition: 'background-color 0.3s ease, border-color 0.3s ease',
                        zIndex: 30,
                    }}
                >
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        <li>
                            <Link to="/dashboard" className="sidebar-link" onClick={() => setIsSidebarOpen(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className="sidebar-link" onClick={() => setIsSidebarOpen(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                                Manage Books
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className="sidebar-link" onClick={() => setIsSidebarOpen(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Users
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className="sidebar-link" onClick={() => setIsSidebarOpen(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Settings
                            </Link>
                        </li>
                    </ul>
                </aside>

                {/* ── Main Content ── */}
                <main
                    className="app-main-content"
                    style={{ flex: 1, minHeight: 'calc(100vh - 62px)', overflowY: 'auto' }}
                >
                    {children || <Outlet />}
                </main>
            </div>

            <Footer />
        </div>
    );
};

export default AdminLayout;
