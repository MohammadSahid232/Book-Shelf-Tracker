import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";

const PublicLayout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-neutral-900 text-slate-900 dark:text-slate-50">
            <Header />
            <main className="flex-1 w-full">
                {children || <Outlet />}
            </main>
            <Footer />
        </div>
    );
};

export default PublicLayout;
