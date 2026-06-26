import React from 'react';

function Footer() {
  return (
    <footer className="footer footer-center p-6 bg-base-200 text-base-content border-t border-base-300">
      <aside className="gap-1 flex flex-col items-center">
        <div className="flex items-center gap-2 mb-1">
          <div className="bg-primary text-primary-content p-1.5 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
            </svg>
          </div>
          <span className="font-bold text-sm tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            BookShelf Tracker
          </span>
        </div>
        <p className="text-xs text-base-content/60">
          Copyright © {new Date().getFullYear()} - All rights reserved by BookShelf Tracker.
        </p>
      </aside>
    </footer>
  );
}

export default Footer;
