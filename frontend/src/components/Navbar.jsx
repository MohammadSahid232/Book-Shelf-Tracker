import React from 'react';

function Navbar({ searchVal, setSearchVal }) {
  return (
    <div className="navbar bg-base-100/80 backdrop-blur-md sticky top-0 z-50 border-b border-base-200 px-4 md:px-8 transition-all duration-300">
      <div className="flex-1 gap-2">
        {/* Mobile menu dropdown */}
        <div className="dropdown lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle" aria-label="Open menu">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-100 rounded-box w-52 border border-base-200">
            <li><a href="#" className="font-medium">Home</a></li>
            <li><a href="#shelves" className="font-medium">Shelves</a></li>
            <li><a href="#add-book" className="font-medium">Add Book</a></li>
          </ul>
        </div>

        {/* Logo and Brand */}
        <a href="#" className="btn btn-ghost hover:bg-transparent gap-2 px-0 md:px-2">
          <div className="bg-primary text-primary-content p-2 rounded-xl shadow-md shadow-primary/20">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
            </svg>
          </div>
          <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            BookShelf
          </span>
        </a>

        {/* Desktop menu links */}
        <div className="hidden lg:flex ml-6">
          <ul className="menu menu-horizontal px-1 gap-2">
            <li>
              <a href="#" className="font-semibold text-sm hover:text-primary transition-colors duration-200">Home</a>
            </li>
            <li>
              <a href="#shelves" className="font-semibold text-sm hover:text-primary transition-colors duration-200">Shelves</a>
            </li>
            <li>
              <a href="#add-book" className="font-semibold text-sm hover:text-primary transition-colors duration-200">Add Book</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex-none gap-4">
        {/* Search Bar - styled from DaisyUI & ReadyMadeUI patterns */}
        <div className="form-control relative max-w-xs">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-base-200/60 border border-base-300 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search books..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              className="w-28 md:w-48 bg-transparent text-sm focus:outline-none placeholder:text-base-content/40"
            />
            {searchVal && (
              <button 
                onClick={() => setSearchVal('')}
                className="btn btn-ghost btn-xs btn-circle"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Profile Avatar / Dropdown */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar online ring-2 ring-primary/20 hover:ring-primary/40 transition-all duration-200">
            <div className="w-10 rounded-full">
              <img alt="User profile avatar" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" />
            </div>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-2xl bg-base-100 rounded-2xl w-52 border border-base-200">
            <li className="menu-title px-4 py-2 text-xs font-semibold text-base-content/40">My Account</li>
            <li><a className="justify-between">Profile <span className="badge badge-primary badge-sm">New</span></a></li>
            <li><a>Settings</a></li>
            <hr className="my-1 border-base-200" />
            <li><a className="text-error hover:bg-error/10">Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
