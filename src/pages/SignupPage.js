import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import { API_BASE_URL } from '../components/config';
import axios from 'axios';

export default function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const response = await axios.put(`${API_BASE_URL}/users`, {
                fname: first_name,
                lname: last_name,
                email: email,
                password: password,
            });

            if (response.status === 201) {
                await login(email, password);
                navigate('/dashboard');
            } else {
                console.error('Signup failed');
            }
        } catch (error) {
            console.log(error)
        }
    };


    return (
        <>
            <div className="logo-img m-sm-auto"></div>
            <div className="min-vh-100 d-flex justify-content-center align-items-center bg-secondary">
                <form onSubmit={handleSubmit} className="p-4 bg-white col-11 col-lg-2" style={{ borderRadius: '5px' }}>
                    <h1 className="text-center text-primary">Kind Quest</h1>
                    <div className="mb-3">
                        <input type="text" className="form-control" value={first_name} onChange={(e) => setFirstName(e.target.value)} placeholder="First name" />
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" value={last_name} onChange={(e) => setLastName(e.target.value)} placeholder="Last name" />
                    </div>
                    <div className="mb-3">
                        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" />
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Signup</button>
                </form>
            </div>

        </>

    );
}