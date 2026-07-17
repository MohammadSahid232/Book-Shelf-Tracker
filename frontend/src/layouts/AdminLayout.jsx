import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-neutral-900 text-slate-900 dark:text-slate-50">
            <Navbar />

            <div className="flex flex-1 relative">
                {/* Reusable Sidebar */}
                <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

                {/* Mobile sidebar toggle button */}
                <button 
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="lg:hidden fixed bottom-6 right-6 z-40 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-colors focus:outline-none"
                    aria-label="Toggle Sidebar"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                {/* Main Content Area */}
                <main className="flex-1 min-h-[calc(100vh-65px)] p-6 overflow-y-auto">
                    <Outlet />
                </main>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default AdminLayout;
