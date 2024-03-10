import React from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';
import { Link } from 'react-router-dom';

export default function MarkerComponent({ id, activeId, position, type, title, description, setActiveId }) {
    
    if (!position || !type) return null;
    const icon_url = type.toLowerCase() === 'material need' ? '/map-pin-svgrepo-com-secondary.svg' : '/map-pin-svgrepo-com-custom.svg';

    
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
                        <Link to={`/requests/${id}`} className="btn btn-primary btn-sm w-100">Fulfill</Link>
                    </div>
                </InfoWindow>
        )}
    </>
}