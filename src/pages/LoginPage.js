import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [ShowSpinner, setShowSpinner] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setShowSpinner(true)
      let login_result = await login(email, password);
      setShowAlert(!login_result)
      setShowSpinner(false)
      if (login_result) {
        // Redirect to another page on successful login
        navigate('/dashboard');
      } else {
        setShowAlert(true)
      }
    } catch (error) {
      setShowAlert(true)
      console.error('Login failed:', error);
    }
  };


  return (
    <>
      <div className="logo-img m-sm-auto d-flex justify-content-center">
        <Link to="/" className="position-absolute bottom-0 btn btn-sm text-dark">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-bar-left" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5M10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5" />
          </svg>
          Homepage
        </Link>
      </div>
      <div className="min-vh-100 d-flex justify-content-center align-items-center bg-secondary">
        <form onSubmit={handleSubmit} className="p-4 bg-white col-11 col-lg-2" style={{ borderRadius: '5px' }}>
          <h1 className="text-center text-primary">Kind Quest</h1>
          <div className="mb-3">
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" />
          </div>
          <div className="mb-3">
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          </div>
          <div class={`spinner-border login-spinner  ${ShowSpinner ? 'show' : ''}`} role="status">
            <span class="sr-only">Loading...</span>
          </div>
          <button type="submit" className={`btn btn-primary w-100 ${ShowSpinner ? 'd-none' : ''}`}>Login</button>
          <div className={`alert alert-danger mt-3 ${showAlert ? 'show' : ''}`} role="alert">
            Something went wrong, try again later!
          </div>

        </form>
      </div>

    </>

  );
}
