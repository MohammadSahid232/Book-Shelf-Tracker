import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Form from '../components/Form';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) return;
    setMessage(`Registration successful for ${name}!`);
    setName('');
    setEmail('');
    setPassword('');
  };

  const registerFields = [
    {
      name: 'name',
      label: 'Full Name',
      type: 'text',
      placeholder: 'Enter your name',
      value: name,
      onChange: (e) => setName(e.target.value)
    },
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
      placeholder: 'Create a password',
      value: password,
      onChange: (e) => setPassword(e.target.value)
    }
  ];

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-base-100 p-8 rounded-xl shadow-xl">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        
        <Form onSubmit={handleSubmit} fields={registerFields} submitText="Register" />

        {message && (
          <p className="mt-4 p-3 bg-success/20 text-success rounded-lg text-center font-medium">
            {message}
          </p>
        )}
        <div className="mt-4 text-center">
          <p className="text-sm">Already have an account? <Link to="/login" className="text-primary hover:underline">Login</Link></p>
        </div>
      </div>
    </div>
  );
}
