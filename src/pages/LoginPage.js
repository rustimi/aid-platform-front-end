import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      // Redirect to another page on successful login
      navigate('/dashboard');
    } catch (error) {
      // Handle login error (e.g., show an error message)
      console.error('Login failed:', error);
    }
  };


  return (
    <>
      <div className="logo-img m-sm-auto"></div>
      <div className="min-vh-100 d-flex justify-content-center align-items-center bg-secondary">
        <form onSubmit={handleSubmit} className="p-4 bg-white col-11 col-lg-2" style={{ borderRadius: '5px' }}>
        <h1 className="text-center text-primary">Kind Quest</h1>
          <div className="mb-3">
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" />
          </div>
          <div className="mb-3">
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      </div>

    </>

  );
}
