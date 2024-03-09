import React from 'react';
export default function CardComponent({id, activeId, type, title, setActiveId}) {
    const isActiveClass = activeId === id ? 'bg-success' : '';
    const bg_color = type.toLowerCase() === 'material need' ? 'bg-secondary' : 'bg-primary';

    return (
        <div className={`request card text-white mb-3 ${bg_color} ${isActiveClass}`} onClick={() => setActiveId(id)}>
            <div className="card-header">{type}</div>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
            </div>
        </div>)
}