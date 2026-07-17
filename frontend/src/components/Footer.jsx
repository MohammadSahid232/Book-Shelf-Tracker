import React from 'react';

export default function Footer() {
  return (
    <footer className="footer footer-center bg-white dark:bg-neutral-800 text-slate-500 dark:text-slate-400 p-6 border-t border-slate-200 dark:border-neutral-700/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
        <p className="text-sm font-semibold">
          © {new Date().getFullYear()} BookShelf Ltd. All rights reserved.
        </p>
        <div className="flex gap-6 text-sm font-bold">
          <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Contact Support</a>
        </div>
      </div>
    </footer>
  );
}