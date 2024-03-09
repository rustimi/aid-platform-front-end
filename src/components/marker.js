import React from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';

export default function MarkerComponent({ id, activeId, position, type, setActiveId }) {
    
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
                        <h3>Marker Info</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eu turpis hendrerit, placerat ipsum at, vulputate purus. Fusce euismod ut mauris in suscipit. Nam varius neque a magna fringilla finibus nec et neque. Curabitur vel egestas est, vitae gravida eros. Quisque semper mattis ex, id malesuada</p>
                    </div>
                </InfoWindow>
        )}
    </>
}