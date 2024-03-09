import React from 'react';
export default function CardComponent({id, activeId, type, title}) {
    const isActiveClass = activeId === id ? 'bg-warning' : '';
    const bg_color = type.toLowerCase() === 'material need' ? 'bg-secondary' : 'bg-primary';
    return (
        <div className={`card text-white mb-3 ${bg_color} ${isActiveClass}`}>
            <div className="card-header">{type}</div>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
            </div>
        </div>)
}