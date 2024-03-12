import React from 'react';
import { Link } from 'react-router-dom';

export default function RequestComponent({ id, sender, receiver }) {

    return (
        <div className={`request card text-white mb-3 bg-secondary`}>
            <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                    <h5 className="card-title">From: {sender.fname}, {sender.lname}</h5>
                    <p className='card-text'>To: {receiver.fname}, {receiver.lname}</p>
                </div>
                <Link to={`${id}/chat`} className="btn btn-warning float-end shadow">Open Chat</Link>
            </div>
        </div>)
}