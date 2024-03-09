import React from 'react';
export default function CardComponent({id, activeId, type, title, onClick}) {
    const isActiveClass = activeId === id ? 'bg-warning' : '';
    const bg_color = type.toLowerCase() === 'material need' ? 'bg-secondary' : 'bg-primary';

    const onDivClick = () => {
        onClick && onClick() // Call the function that highlights the card
    };
    return (
        <div className={`request card text-white mb-3 ${bg_color} ${isActiveClass}`} onClick={onDivClick}>
            <div className="card-header">{type}</div>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
            </div>
        </div>)
}