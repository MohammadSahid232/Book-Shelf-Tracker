import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Form from '../components/Form';
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
    
    // Simulate login
    login(email);
    setMessage(`Logged in successfully as ${email}`);
    
    // Redirect to home after a brief delay
    setTimeout(() => {
        navigate('/');
    }, 1000);
  };

  const loginFields = [
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Enter your email',
      value: email,
      onChange: (e) => setEmail(e.target.value)
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      placeholder: 'Enter your password',
      value: password,
      onChange: (e) => setPassword(e.target.value)
    }
  ];

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-base-100 p-8 rounded-xl shadow-xl">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        
        <Form onSubmit={handleSubmit} fields={loginFields} submitText="Login" />

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
