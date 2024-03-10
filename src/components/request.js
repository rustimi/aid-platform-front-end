import React from 'react';
import { Link } from 'react-router-dom';

export default function RequestComponent({ id, type, title, description, isRepublishable, handleRepublishClick, handleFulfillClick }) {
    const bg_color = type.toLowerCase() === 'material need' ? 'bg-secondary' : 'bg-custom';

    return (
        <div className={`request card text-white mb-3 ${bg_color}`}>
            <div className="card-header">
                <p className='d-inline-block'>{type}</p>
            </div>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className='card-text'>{description}</p>
                {(!isRepublishable &&
                    <>
                        <button onClick={()=>{handleFulfillClick(id)}} className="float-start btn btn-link text-warning">Mark as complete</button>
                        <Link to={`${id}/chat`} className="btn btn-warning float-end shadow">Chat</Link>
                    </>
                )}
                {(isRepublishable &&
                    <button onClick={()=>{handleRepublishClick(id)}} className="btn btn-warning float-end shadow">Republish</button>
                )}
            </div>
        </div>)
}