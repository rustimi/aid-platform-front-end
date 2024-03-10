import React from 'react';
import { Link } from 'react-router-dom';
export default function BigCardComponent({ id, type, title, body,  isVoluteer }) {
    const bg_color = type.toLowerCase() === 'material need' ? 'bg-secondary' : 'bg-custom';
    const pill_descr = isVoluteer ? 'Request' : 'Voluteer';

    return (
        <div className={`request card text-white mb-3 ${bg_color}`}>
            <div className="card-header">
                <p className='d-inline-block'>{type}</p>
                <span className={`float-end badge badge-pill bg-info`}>{pill_descr}</span>
            </div>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className='card-text'>{body}</p>
                <Link to={`/requests/${id}/fulfill`} className="float-start">Mark as complete</Link>
                <Link to={`requests/${id}/conversations`} className="btn btn-primary float-end shadow">Chat</Link>
            </div>
        </div>)
}