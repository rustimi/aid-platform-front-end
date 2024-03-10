import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { API_BASE_URL } from '../components/config';
import RequestComponent from '../components/request';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { set } from 'lodash';

export default function DashboardPage() {
    const [requests, setRequests] = useState([]);
    const [isRepublishable, SetIsRepublishable] = useState(false);
    const [showError, setShowError] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const loadRequests = () => {
        setShowError(false);
        setRequests([]);
        const searchParams = new URLSearchParams(location.search);
        const isRepublishable = searchParams.get("republishable");
        let apiUrl = `${API_BASE_URL}/users/requests`;

        if (isRepublishable) {
            SetIsRepublishable(true)
            apiUrl += "?republishable=1";
        } else {
            SetIsRepublishable(false)
        }
        axios.get(`${apiUrl}`)
            .then(response => {
                setRequests(response.data.requests)
            }).catch(error => {
                setShowError(true);
            });
    }

    useEffect(() => { // Load requests
        loadRequests();
    }, [location.search]);


    const handleRepublishableClick = () => {
        navigate("/requests?republishable=1");
    };
    const handleActiveClick = () => {
        navigate("/requests");
    };

    const handleRepublishClick = (id) => {
        setShowError(false);
        axios.post(`${API_BASE_URL}/users/requests/${id}/republish`)
            .then(response => {
                loadRequests();
            }).catch(error => {
                setShowError(true);
            });
    }

    const handleFulfillClick = (id) => { // Mark request as fulfilled
        setShowError(false);
        axios.post(`${API_BASE_URL}/users/requests/${id}/fulfill`)
            .then(response => {
                loadRequests();
            }).catch(error => {
                setShowError(true);
            });
    }

    return (<>
        <div className="container-fluid requests-container bg-primary-subtle p-0 m-0 justify-content-center row big-block   ">
            <div className='col-12 col-lg-11 bg-primary p-2 p-lg-5 pt-lg-0 mt-3 mb-3 shadow rounded'>
                <div className={`alert alert-danger mt-3 ${showError ? 'd-block' : 'd-none'}`}>
                    <strong>Oh snap!</strong> There has been an error. Please try again later!
                </div>
                <div className='requests-navigation position-relative'>
                    <div className="logo-img logo-img-sm d-flex justify-content-center">
                        <Link to="/dashboard" className="position-absolute bottom-0 btn btn-sm text-light">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-bar-left" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5M10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5" />
                            </svg>
                            Dashboard
                        </Link>
                    </div>
                </div>
                <h1 className='text-light pb-2'>Active Requests</h1>
                <div className='filter-requests row border-top m-auto'>
                    <button onClick={handleActiveClick} className={`btn ${isRepublishable ? 'btn-outline-warning' : 'btn-warning'} w-auto m-1 mt-2 mb-2`}>Active requests</button>
                    <button onClick={handleRepublishableClick} className={`btn ${isRepublishable ? 'btn-warning' : 'btn-outline-warning'} w-auto m-1 mt-2 mb-2`}>Republishable</button>
                </div>
                <div className="new-request-contaienr d-flex justify-content-end">
                    <Link to="/new-request" className="btn btn-warning btn-lg w-auto shadow">New Request
                        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="24" height="24" />
                            <path d="M12 6V18" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M6 12H18" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" />
                        </svg></Link>
                </div>
                <div className='request-cards-container mt-3 shadow'>
                    <div className={`alert alert-info ${requests.length === 0 ? 'd-block' : 'd-none'}`}>
                        <strong>Oops, no requests foud!</strong> <Link to="/new-request">Create a new request!</Link>
                    </div>
                    {requests.map((request) => ( // Map over requests to render CardComponent
                        <RequestComponent
                            key={request.id}
                            id={request.id}
                            type={request.request_type}
                            title={request.title}
                            description={request.description}
                            isRepublishable={isRepublishable}
                            handleRepublishClick={handleRepublishClick}
                            handleFulfillClick={handleFulfillClick}
                        />
                    ))}
                </div>
            </div>
        </div>
    </>)
}