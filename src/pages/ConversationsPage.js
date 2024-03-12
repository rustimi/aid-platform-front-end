import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { API_BASE_URL } from '../components/config';
import ConversationComponent from '../components/conversation';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function ConversationsPage() {
    const { id } = useParams();
    const [conversations, setConversations] = useState([]);
    const navigate = useNavigate();
    const [showError, setShowError] = useState(false);


    useEffect(() => { // Load conversations
        setShowError(false);
        setConversations([]);
        axios.get(`${API_BASE_URL}/requests/${id}/conversations`)
            .then(response => {
                setConversations(response.data)
            }).catch(error => {
                setShowError(true);
            });
    }, []);


    return (<>
        <div className="container-fluid conversations-container bg-primary-subtle p-0 m-0 justify-content-center row big-block   ">
            <div className='col-12 col-lg-11 bg-primary p-2 p-lg-5 pt-lg-0 mt-3 mb-3 shadow rounded'>
                <div className={`alert alert-danger mt-3 ${showError ? 'd-block' : 'd-none'}`}>
                    <strong>Oh snap!</strong> There has been an error. Please try again later!
                </div>
                <div className='conversations-navigation position-relative'>
                    <div className="logo-img logo-img-sm d-flex justify-content-center">
                        <Link to="/dashboard" className="position-absolute bottom-0 btn btn-sm text-light">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-bar-left" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5M10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5" />
                            </svg>
                            Dashboard
                        </Link>
                    </div>
                </div>
                <h1 className='text-light pb-2'>Active Conversations</h1>
                
                <div className='mt-3 shadow'>
                    <div className={`alert alert-info ${conversations.length === 0 ? 'd-block' : 'd-none'}`}>
                        <strong>Oops, no conversations foud!</strong>
                    </div>
                
                </div>
            </div>
        </div>
    </>)
}