import React from 'react';
import axios from 'axios';
import { Marker, InfoWindow } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../components/config';

export default function MarkerComponent({ id, activeId, position, type, title, description, setActiveId }) {
    const navigate = useNavigate();
    if (!position || !type) return null;
    const icon_url = type.toLowerCase() === 'material need' ? '/map-pin-svgrepo-com-secondary.svg' : '/map-pin-svgrepo-com-custom.svg';
    
    
    const onClickFulfill = async () => {
        const response = await axios.post(`${API_BASE_URL}/requests/${id}/volunteer`);

        if (response.status === 200 && response.data.conversation_id) {
            navigate(`/requests/${id}/conversations/${response.data.conversation_id}/chat`);
        } else {
            console.log('Error in volunteer request');
        }
    }

    return <>
        <Marker
            position={position}
            onClick={() => setActiveId(id)}
            icon={{
                url: icon_url,
                scaledSize: new window.google.maps.Size(40, 40),
            }}
        />

        {activeId === id && ( // Directly compare activeId to id for rendering InfoWindow
            <InfoWindow
                position={position}
                onCloseClick={() => setActiveId(null)}
            >
                <div>
                    <h4>{title}</h4>
                    <p>{description}</p>
                    <button onClick={onClickFulfill} className="btn btn-primary btn-sm w-100">Fulfill</button>
                </div>
            </InfoWindow>
        )}
    </>
}