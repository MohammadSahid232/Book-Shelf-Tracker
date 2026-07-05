
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Home() {
  const { user } = useAuth();

  return (
    <div className="home-page">
      <div style={{ maxWidth: '52rem' }}>
        <h1 className="home-title">
          Track Your Reading Journey with{' '}
          <span className="home-title-accent">Book Tracker</span>
        </h1>
        <p className="home-subtitle">
          Organize your personal library, log your progress, and list books to read,
          currently reading, or finished. Entirely free and built for book lovers.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {user ? (
            <Link to="/dashboard" className="home-cta-primary">
              Go to Dashboard →
            </Link>
          ) : (
            <>
              <Link to="/login" className="home-cta-primary">Sign In</Link>
              <Link to="/register" className="home-cta-secondary">Create Account</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
