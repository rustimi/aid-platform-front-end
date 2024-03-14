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
    const [mapCenter, setMapCenter] = useState({ lat: 51.5287398, lng: -0.2664032 }); // default to London
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
                    console.error('Failed to fetch requests info:', error);
                });

            const center = bounds.getCenter()
            localStorage.setItem('lat', center.lat());
            localStorage.setItem('lng', center.lng());
            localStorage.setItem('zoom', map.getZoom());
        }
    }, 200), [map]);

    return isLoaded ? (
        <div className="container-fluid dashboard-container bg-primary-dark p-0 m-0 row big-block   ">
            <Link to='/user' className='user-info-float'></Link>
            <div className='col-12 col-lg-4 d-flex flex-column pt-2 requests-container'>
                <Link to='/requests' className='btn bg-action text-dark btn-lg mb-3'>See your requests
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 4V20M8 12H20M20 12L16 8M20 12L16 16" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Link>
                <h1 className='text-light border-bottom'>People requests</h1>
                <div className={`alert alert-info ${requests.length === 0 ? 'd-block' : 'd-none'}`}>
                    <strong>Oops, no requests foud!</strong> Move the map to find some or <Link to="/requests/new">create a new one!</Link>
                </div>
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



