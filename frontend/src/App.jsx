import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import BooksPage from './pages/BooksPage';
import TaskList from './pages/TaskList';
import AiHubPage from './pages/AiHubPage';
import DiscoverPage from './pages/DiscoverPage';
import ProfilePage from './pages/ProfilePage';
import OAuthCallback from './pages/OAuthCallback';
import AdminLayout from './layouts/AdminLayout';
import PublicLayout from './layouts/PublicLayout';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
        <Routes>
          {/* ===== OAuth Callback (Google redirects here with ?token=&user=) ===== */}
          <Route path="/oauth/callback" element={<OAuthCallback />} />

          {/* ===== Admin routes ===== */}
          <Route element={<ProtectedRoute requiredRole="admin" />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/tasks" element={<TaskList />} />
            </Route>
          </Route>

          {/* ===== Authenticated user routes ===== */}
          <Route element={<ProtectedRoute />}>
            <Route element={<PublicLayout />}>
              <Route path="/books" element={<BooksPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/discover" element={<DiscoverPage />} />
              <Route path="/ai-hub" element={<AiHubPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
          </Route>

          {/* ===== Public routes ===== */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Legacy redirects */}
          <Route path="/tasks" element={<Navigate to="/admin/tasks" replace />} />

          {/* 404 fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
