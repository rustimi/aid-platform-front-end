import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../components/config';
import { Autocomplete, useLoadScript } from '@react-google-maps/api';
const placesLibrary = ["places"];

export default function ChatPage() {
    const [messageBody, setMessageBody] = useState('');
    const [newMessageStatus, setNewMessageStatus] = useState(null);
    const [newMessageErrors, setNewMessageErrors] = useState({});

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
                            <Link to="/requests" className="btn btn-warning btn-sm float-start ">Back</Link>
                        </div>
                        <div className="chat-page pb-2 pt-2 bg-white col-11 col-lg-8" style={{ borderRadius: '5px' }}>
                            <h1 className=" text-primary m-3">NOME - request title</h1>
                            <div className="conversation-container d-flex flex-column">
                                <div className='message p-2 rounded bg-primary-subtle w-75 mb-2'>
                                    <div className='message-content'>Hello, how can I help you?</div>
                                    <div className='message-info'>
                                        <div className='message-time float-start'>12:00</div>
                                    </div>
                                </div>
                                <div className='message sent p-2 rounded bg-primary-subtle w-75 align-self-end'>
                                    <div className='message-content'>Hello, how can I help you?</div>
                                    <div className='message-info'>
                                        <div className='message-seen float-end'>seen</div>
                                        <div className='message-time float-start'>12:00</div>
                                    </div>
                                </div>
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
