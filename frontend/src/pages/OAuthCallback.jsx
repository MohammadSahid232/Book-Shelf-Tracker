import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Handles the Google OAuth redirect from backend:
// Backend sends user to: /oauth/callback?token=...&user=...
// We save to localStorage then force a full page reload to a route
// so AuthContext re-reads localStorage fresh.
export default function OAuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const userStr = params.get('user');

    if (token && userStr) {
      try {
        const parsedUser = JSON.parse(decodeURIComponent(userStr));
        // Save to localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(parsedUser));
        localStorage.setItem('bst_user', JSON.stringify(parsedUser));

        // Force a FULL page reload to the correct route.
        // This ensures AuthContext re-initializes from localStorage with fresh state.
        if (parsedUser.role === 'admin') {
          window.location.replace('/admin/dashboard');
        } else {
          window.location.replace('/books');
        }
      } catch (err) {
        console.error('OAuth callback error:', err);
        navigate('/login', { replace: true });
      }
    } else {
      // No params — redirect to login
      navigate('/login', { replace: true });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#0f172a' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: 48, height: 48, border: '4px solid #3b82f6',
          borderTopColor: 'transparent', borderRadius: '50%',
          animation: 'spin 0.8s linear infinite', margin: '0 auto 16px'
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <p style={{ color: '#94a3b8', fontFamily: 'sans-serif', fontSize: 16, fontWeight: 500 }}>
          Signing you in with Google...
        </p>
      </div>
    </div>
  );
}
