import React from 'react';
import { Link } from 'react-router-dom';
export default function CardComponent({ id, activeId, type, title, setActiveId }) {
    const isActiveClass = activeId === id ? 'bg-warning' : '';
    const bg_color = type.toLowerCase() === 'material need' ? 'bg-secondary' : 'bg-custom';

    return (
        <div className={`request card text-white mb-3 ${bg_color} ${isActiveClass}`} onClick={() => setActiveId(id)}>
            <div className="card-header">{type}</div>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                {activeId === id && ( // Corrected: Use logical AND for conditional rendering
                    <Link to={`/requests/${id}`} className="btn btn-primary float-end">Fulfill</Link>
                )}
            </div>
        </div>)
}