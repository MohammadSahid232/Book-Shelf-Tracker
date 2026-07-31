
import { Outlet } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PublicLayout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-neutral-900 text-slate-900 dark:text-slate-50">
            <Navbar />
            <main className="flex-1 w-full">
                {children || <Outlet />}
            </main>
            <Footer />
        </div>
    );
};

export default PublicLayout;
