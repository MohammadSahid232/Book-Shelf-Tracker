import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    setMessage(`Logged in successfully as ${email}`);
    setEmail('');
    setPassword('');
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-base-100 p-8 rounded-xl shadow-xl">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>
        </form>
        {message && (
          <p className="mt-4 p-3 bg-success/20 text-success rounded-lg text-center font-medium">
            {message}
          </p>
        )}
        <div className="mt-4 text-center">
          <p className="text-sm">Don't have an account? <Link to="/register" className="text-primary hover:underline">Register</Link></p>
        </div>
      </div>
    </div>
  );
}
