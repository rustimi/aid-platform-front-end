import React, { useState, useEffect } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { debounce } from 'lodash';
import axios from 'axios';
import { API_BASE_URL } from '../components/config';
import CardComponent from '../components/card';
import MarkerComponent from '../components/marker';
import { Link } from 'react-router-dom';

const mapContainerStyle = {
    width: '100%',
    height: '100%'
};

export default function DashboardPage() {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyDcBfcLxJIXSvH2fZmYHrSTqS8w2E3-ywo"
    })

    const [map, setMap] = useState(null)
    const [activeId, setActiveId] = useState(null);
    const [mapZoom, setMapZoom] = useState(9);
    const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
    const [requests, setRequests] = useState([]);

    useEffect(() => { // Get the user's location and set the map center to it
        if (localStorage.getItem('lat') && localStorage.getItem('lng')) {
            setMapCenter({
                lat: Number(localStorage.getItem('lat')),
                lng: Number(localStorage.getItem('lng'))
            });
            setMapZoom(Number(localStorage.getItem('zoom')));
        } else if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setMapCenter({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                }
            );
        }
    }, []);

    const onLoad = React.useCallback(function callback(map) {
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    // debounce the function so it only fires after the user stops moving the map
    const fetchRequestsBasedOnBounds = React.useCallback(debounce(() => {
        if (map && map.getBounds()) {
            const bounds = map.getBounds();
            const ne = bounds.getNorthEast();
            const sw = bounds.getSouthWest();
            const query = `ne_latitude=${encodeURIComponent(ne.lat())}&ne_longitude=${encodeURIComponent(ne.lng())}&sw_latitude=${encodeURIComponent(sw.lat())}&sw_longitude=${encodeURIComponent(sw.lng())}`;
            axios.get(`${API_BASE_URL}/requests?${query}`)
                .then(response => {
                    setRequests(response.data.requests);
                }).catch(error => {
                    console.error('Failed to fetch user info:', error);
                });

            const center = bounds.getCenter()
            localStorage.setItem('lat', center.lat());
            localStorage.setItem('lng', center.lng());
            localStorage.setItem('zoom', map.getZoom());
        }
    }, 200), [map]);

    return isLoaded ? (
        <div className="container-fluid dashboard-container bg-dark p-0 m-0 row big-block   ">
            <Link to='/user' className='user-info-float'></Link>
            <div className='col-12 col-lg-4 d-flex flex-column pt-2 requests-container'>
                <h1 className='text-light border-bottom'>Active requests:</h1>
                {requests.map((request) => ( // Map over requests to render CardComponent
                    <CardComponent
                        key={request.id}
                        id={request.id}
                        activeId={activeId}
                        type={request.request_type}
                        title={request.title}
                        setActiveId={setActiveId}
                    />
                ))}
            </div>
            <div className='col-12 col-lg-8 p-2'>
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={mapCenter}
                    zoom={mapZoom}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                    onBoundsChanged={fetchRequestsBasedOnBounds}
                >
                    {requests.map((request) => ( // Map over requests to render CardComponent
                        <MarkerComponent
                            key={request.id}
                            id={request.id}
                            activeId={activeId}
                            type={request.request_type}
                            title={request.title}
                            description={request.description}
                            setActiveId={setActiveId}
                            position={{ lat: request.latitude, lng: request.longitude }}
                        />
                    ))}
                </GoogleMap>
            </div>
        </div>
    ) : <></>
}



