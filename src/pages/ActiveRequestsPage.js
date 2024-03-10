import React, { useState, useEffect } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { debounce } from 'lodash';
import axios from 'axios';
import { API_BASE_URL } from '../components/config';
import CardComponent from '../components/card';
import MarkerComponent from '../components/marker';
import { Link } from 'react-router-dom';

export default function DashboardPage() {
    return (<>
        <div className="container-fluid requests-container bg-primary-subtle p-0 m-0 justify-content-center row big-block   ">
            <div className='col-12 col-lg-11 bg-primary p-2 p-lg-5 pt-lg-0 mt-3 mb-3 shadow rounded'>
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
                    <Link to='/' className='btn btn-warning w-auto m-1 mt-2 mb-2'>All</Link>
                    <Link to='/' className='btn btn-outline-warning w-auto m-1 mt-2 mb-2'>Requests</Link>
                    <Link to='/' className='btn btn-outline-warning w-auto m-1 mt-2 mb-2'>volunteering</Link>
                    <Link to='/' className='btn btn-outline-warning w-auto m-1 mt-2 mb-2'>Republishable</Link>
                    <Link to='/' className='btn btn-outline-warning w-auto m-1 mt-2 mb-2'>Fulfilled</Link>
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
                    <div className={`request card text-white mb-3 bg-secondary`}>
                        <div className="card-header">
                            <p className='d-inline-block'>One time request</p>
                            <span className='float-end badge badge-pill bg-custom'>Request</span>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Title</h5>
                            <p className='card-text'>TEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEXT</p>
                            <Link to={`/requests`} className="float-start">Mark as complete</Link>
                            <Link to={`/requests}`} className="btn btn-primary float-end shadow">Chat</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}