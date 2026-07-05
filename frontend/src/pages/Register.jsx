import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match!');
      return;
    }
    setMessage(`Registration successful for ${email}!`);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title"> Create Account</h1>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div>
            <label className="form-label">Email <span style={{ color: 'var(--color-danger)' }}>*</span></label>
            <input
              type="email" id="email" placeholder="john@example.com" required
              value={email} onChange={(e) => setEmail(e.target.value)}
              className="form-input"
            />
          </div>
          <div>
            <label className="form-label">Password <span style={{ color: 'var(--color-danger)' }}>*</span></label>
            <input
              type="password" id="password" placeholder="••••••••" required
              value={password} onChange={(e) => setPassword(e.target.value)}
              className="form-input"
            />
          </div>
          <div>
            <label className="form-label">Confirm Password <span style={{ color: 'var(--color-danger)' }}>*</span></label>
            <input
              type="password" id="confirm-password" placeholder="••••••••" required
              value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-input"
            />
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--color-text-muted)', cursor: 'pointer' }}>
            <input type="checkbox" id="tmc" name="tmc" required />
            I accept the{' '}
            <a href="#" className="auth-link">Terms and Conditions</a>
          </label>

          {message && <p className="auth-message">{message}</p>}

          <button type="submit" className="auth-submit-btn">Create Account</button>
        </form>

        <p className="auth-footer-text">
          Already have an account?{' '}
          <Link to="/login" className="auth-link">Login here</Link>
        </p>
      </div>
    </main>
  );
}
