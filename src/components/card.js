import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../components/config';

export default function CardComponent({ id, activeId, type, title, setActiveId }) {
    const navigate = useNavigate();
    const [errorOnVolunteer, setErrorOnVolunteer] = useState(false);

    const isActiveClass = activeId === id ? 'bg-action' : '';
    const bg_color = type.toLowerCase() === 'material need' ? 'bg-material-need' : 'bg-one-time-task';

    const onClickFulfill = async () => {
        setErrorOnVolunteer(false);
        const response = await axios.post(`${API_BASE_URL}/requests/${id}/volunteer`);

        if (response.status === 200 && response.data.conversation_id) {
            navigate(`/requests/${id}/conversations/${response.data.conversation_id}/chat`);
        } else {
            setErrorOnVolunteer(true);
            console.log('Error in volunteer request');
        }
    }
    return (
        <div className={`request card text-white mb-3 ${bg_color} ${isActiveClass}`} onClick={() => setActiveId(id)}>
            <div className="card-header">{type}</div>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <div className={`alert alert-danger mt-2 ${errorOnVolunteer === true ? '' : 'd-none'}`} role="alert">
                    There has been an error in the volunteer request. Please try again later
                </div>
                {activeId === id && (
                    <button onClick={onClickFulfill} className="btn btn-action float-end">Fulfill</button>
                )}
            </div>
        </div>)
}