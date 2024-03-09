import React from 'react';
export default function CardComponent({type, title}) {
    const bg_color = type.toLowerCase() === 'material need' ? 'bg-secondary' : 'bg-primary';
    return (
        <div className={`card text-white mb-3 ${bg_color}`}>
            <div className="card-header">{type}</div>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
            </div>
        </div>)
}