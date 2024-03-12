import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../components/config';
import MessageComponent from '../components/message';

export default function ChatPage() {
    const { id, conversationId } = useParams();
    const [messageBody, setMessageBody] = useState('');
    const [requestTitle, setRequestTitle] = useState('');
    const [messages, setMessages] = useState([]);
    const [showError, setShowError] = useState(false);

    useEffect(() => { // Load conversations
        loadMessages()
        setInterval(loadMessages, 3000);
    }, []);

    const loadMessages = () => {
        setShowError(false);
        axios.get(`${API_BASE_URL}/requests/${id}/conversations/${conversationId}/messages`)
            .then(response => {
                setMessages(response.data.messages)
                setRequestTitle(response.data.request_name)
            }).catch(error => {
                setShowError(true);
            });
    }
    const handleSubmitNewMessage = async (e) => { // Send new message
        e.preventDefault();
        setShowError(false)
        axios.put(`${API_BASE_URL}/requests/${id}/conversations/${conversationId}/messages`, {
            body: messageBody,
        })
            .then(response => {
                if (response.status === 201) {
                    loadMessages()
                    setMessageBody('')
                }
            })
            .catch(errors => {
                console.log(errors)
                setShowError(true)
            })
    };

    return (
        <>
            <div className="container-fluid p-0">
                <div className="row g-0">
                    <div className="col-12 big-block bg-primary d-flex flex-column align-items-center justify-content-center">
                        <div className='col-11 col-lg-8 mb-2'>
                            <Link to={`/requests/${id}/conversations`} className="btn btn-warning btn-sm float-start ">Back to conversations</Link>
                        </div>
                        <div className="chat-page pb-2 pt-2 bg-white col-11 col-lg-8" style={{ borderRadius: '5px' }}>
                            <h1 className=" text-primary m-3 border-bottom  ">{requestTitle}</h1>
                            <div className="conversation-container d-flex flex-column">
                                {messages.map((message) => {
                                    return (
                                        <MessageComponent
                                            key={message.id}
                                            body={message.body}
                                            time={message.message_time}
                                            isSent={message.isSent}
                                            isSeen={message.read}
                                        />
                                    );
                                })}
                            </div>
                            <div className='new-message-container'>
                                <form onSubmit={handleSubmitNewMessage} className='d-flex p-2' >
                                    <textarea
                                        type="text"
                                        className="form-control"
                                        value={messageBody}
                                        onChange={(e) => setMessageBody(e.target.value)}
                                        placeholder="New message"
                                        onKeyDown={(e) => {
                                            if (e.ctrlKey && e.key === 'Enter') {
                                                handleSubmitNewMessage(e);
                                            }
                                        }} />
                                    <button type="submit" className={`btn btn-dark align-self-end m-3 mb-0`}>Send</button>
                                </form>
                            </div>
                            <div className={`alert alert-danger mt-2 ${showError === true ? '' : 'd-none'}`} role="alert">
                                There has been an error. Try later
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
