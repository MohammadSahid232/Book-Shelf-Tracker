import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";

const PublicLayout = ({ children }) => {
    return (
        <div className="app-layout">
            <Header />
            <main className="app-main-content">
                {children || <Outlet />}
            </main>
            <Footer />
        </div>
    );
};

export default PublicLayout;
