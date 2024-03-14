import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { API_BASE_URL } from '../components/config';
import ConversationComponent from '../components/conversation';
import { Link, useParams } from 'react-router-dom';

export default function ConversationsPage() {
    const { id } = useParams();
    const [conversations, setConversations] = useState([]);
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
                <div className='col-12 mt-2 mb-2'>
                    <Link to="/requests" className="btn btn-action btn-sm ">Back</Link>
                </div>
                <h1 className='text-light pb-2'>Active Conversations</h1>
                <div className={`alert alert-danger mt-3 ${showError ? 'd-block' : 'd-none'}`}>
                    <strong>Oh snap!</strong> There has been an error. Please try again later!
                </div>
                {conversations.map((conversation) => {
                    return (
                        <ConversationComponent
                            key={conversation.id}
                            id={conversation.id}
                            sender={conversation.sender}
                            receiver={conversation.receiver}
                        />
                    );
                })}
                <div className='mt-3 shadow'>
                    <div className={`alert alert-info ${conversations.length === 0 ? 'd-block' : 'd-none'}`}>
                        <strong>Oops, no conversations foud!</strong>
                    </div>

                </div>
            </div>
        </div>
    </>)
}