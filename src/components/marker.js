import React from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';

export default function MarkerComponent({ id, activeId, position, type, description, setActiveId }) {
    
    if (!position || !type) return null;
    const icon_url = type.toLowerCase() === 'material need' ? '/map-pin-svgrepo-com-secondary.svg' : '/map-pin-svgrepo-com-primary.svg';

    
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
                        <h4>{type}</h4>
                        <p>{description}</p>
                    </div>
                </InfoWindow>
        )}
    </>
}