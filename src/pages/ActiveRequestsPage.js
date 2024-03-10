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
            <div className='col-10 bg-primary p-5 mt-3 mb-3 shadow rounded'>
                <h1 className='text-light pb-2'>Active Requests</h1>
                <div className='filter-requests row border-top'>
                    <Link to='/' className='btn btn-warning w-auto m-1 mt-2 mb-2'>All</Link>
                    <Link to='/' className='btn btn-outline-warning w-auto m-1 mt-2 mb-2'>Requests</Link>
                    <Link to='/' className='btn btn-outline-warning w-auto m-1 mt-2 mb-2'>volunteering</Link>
                    <Link to='/' className='btn btn-outline-warning w-auto m-1 mt-2 mb-2'>Republishable</Link>
                    <Link to='/' className='btn btn-outline-warning w-auto m-1 mt-2 mb-2'>Fulfilled</Link>
                </div>
                <div className='request-cards-container mt-5 shadow'>
                    <div className={`request card text-white mb-3 bg-secondary`}>
                        <div className="card-header">
                            <p className='d-inline-block'>One time request</p>
                            <span className='float-end badge badge-pill bg-custom'>Request</span>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Title</h5>
                            <p className='card-text'>TEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEXT</p>
                            <Link to={`/requests`} className="float-start">Mark as complete</Link>
                            <Link to={`/requests}`} className="btn btn-primary float-end shadow">Fulfill</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}