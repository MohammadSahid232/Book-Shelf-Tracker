import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    login(email);
    setMessage(`Logged in successfully as ${email}`);
    setTimeout(() => { navigate('/dashboard'); }, 1000);
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title"> Sign In</h1>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div>
            <label className="form-label">Email</label>
            <input
              type="email" id="email" placeholder="john@example.com" required
              value={email} onChange={(e) => setEmail(e.target.value)}
              className="form-input"
            />
          </div>
          <div>
            <label className="form-label">Password</label>
            <input
              type="password" id="password" placeholder="••••••••" required
              value={password} onChange={(e) => setPassword(e.target.value)}
              className="form-input"
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-text-muted)', cursor: 'pointer' }}>
              <input type="checkbox" id="remember" name="remember" />
              Remember me
            </label>
            <a href="#" className="auth-link" style={{ fontSize: '0.8rem' }}>Forgot password?</a>
          </div>

          {message && <p className="auth-message">{message}</p>}

          <button type="submit" className="auth-submit-btn">Sign In</button>
        </form>

        <p className="auth-footer-text">
          Don't have an account?{' '}
          <Link to="/register" className="auth-link">Sign up</Link>
        </p>
      </div>
    </main>
  );
}
