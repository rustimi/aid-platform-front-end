import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../components/config';
import MessageComponent from '../components/message';

export default function ChatPage() {
    const { id, conversationId } = useParams();
    const [messageBody, setMessageBody] = useState('');
    const [messages, setMessages] = useState([]);
    const [newMessageStatus, setNewMessageStatus] = useState(null);
    const [newMessageErrors, setNewMessageErrors] = useState({});
    const [showError, setShowError] = useState(false);

    useEffect(() => { // Load conversations
        setShowError(false);
        setMessages([]);
        axios.get(`${API_BASE_URL}/requests/${id}/conversations/${conversationId}/messages`)
            .then(response => {
                setMessages(response.data.messages)
            }).catch(error => {
                setShowError(true);
            });
    }, []);


    const handleSubmitNewMessage = async (e) => {
        e.preventDefault();
        axios.put(`${API_BASE_URL}/requests`, { // Create request
            // title: title,
            // description: description,
            // request_type: type,
            // latitude: coordinates.lat,
            // longitude: coordinates.lng
        })
            .then(response => {
                if (response.status === 201) {
                    setNewMessageStatus(true)
                }
            })
            .catch(errors => {
                console.log(errors)
                let objNewMessageErrors = {};

                // Format error messages
                errors.response.data.forEach(error => {
                    // let split = error.split(" ") // Error message format: "Email has invalid format"
                    // objUserCreateErrors[split[0].toLowerCase()] = split.slice(1).join(" ")
                })
                setNewMessageErrors(objNewMessageErrors);
                setNewMessageStatus(false)
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
                            <h1 className=" text-primary m-3">NOME - request title</h1>
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
                                    <textarea type="text" className="form-control" value={messageBody} onChange={(e) => setMessageBody(e.target.value)} placeholder="New message" />
                                    <button type="submit" className={`btn btn-dark align-self-end m-3 mb-0`}>Send</button>
                                    {newMessageErrors.title && <div className="pl-3 text-danger">{newMessageStatus.messageBody}</div>}
                                    <div className={`alert alert-success mt-2 ${newMessageStatus === true ? '' : 'd-none'}`} role="alert">
                                        Create successful! :)
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
