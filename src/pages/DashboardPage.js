import React, { useEffect, useRef } from 'react';

export default function DashboardPage() {
    const mapRef = useRef(null); // Use a ref to refer to the map DOM element

    useEffect(() => {
        // Function to load the Google Maps script
        const loadGoogleMapsScript = (callback) => {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDcBfcLxJIXSvH2fZmYHrSTqS8w2E3-ywo&callback=${callback}`;
            script.async = true;
            script.defer = true;
            document.head.appendChild(script);
        };

        // Callback function to initialize the map
        window.initMap = () => {
            const position = {lat: 40.0187488, lng: -105.2607357};
            new google.maps.Map(mapRef.current, {
                zoom: 12,
                center: position,
            });
        };

        loadGoogleMapsScript('initMap');
    }, []); // Empty dependency array to run once on mount

    return (
        <div>
            <h1>Dashboard!</h1>
            <p>Welcome to the dashboard</p>
            <div id="map" ref={mapRef} className="mb-5" style={{ height: '500px' }}></div>
        </div>
    );
}
