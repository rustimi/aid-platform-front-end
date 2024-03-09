import React, { useState, useEffect } from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';

export default function MarkerComponent({ id, activeId, position, type, onClick }) {
    const [showInfoWindow, setShowInfoWindow] = useState(false);

    useEffect(() => {
        if (activeId === id) {
            setShowInfoWindow(true);
        } else {
            setShowInfoWindow(false);
        }
    }, [activeId, id]);

    if (!position || !type) return null;
    const icon_url = type.toLowerCase() === 'material need' ? '/map-pin-svgrepo-com-secondary.svg' : '/map-pin-svgrepo-com-primary.svg';

    const onMarkerClick = () => {
        onClick && onClick() // Call the function that highlights the card
    };
    return <>
        <Marker
            position={position}
            onClick={onMarkerClick} // Set the click handler
            icon={{
                url: icon_url,
                scaledSize: new window.google.maps.Size(40, 40),
            }}
        />

        {showInfoWindow && (
            <InfoWindow
                position={position}
                onCloseClick={() => setShowInfoWindow(false)} // Close the InfoWindow when its close button is clicked
            >
                <div>
                    <h3>Marker Info</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eu turpis hendrerit, placerat ipsum at, vulputate purus. Fusce euismod ut mauris in suscipit. Nam varius neque a magna fringilla finibus nec et neque. Curabitur vel egestas est, vitae gravida eros. Quisque semper mattis ex, id malesuada</p>
                </div>
            </InfoWindow>
        )}
    </>
}