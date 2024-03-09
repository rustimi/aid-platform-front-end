import React, { useState, useEffect } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { debounce } from 'lodash';
import CardComponent from '../components/card';
import MarkerComponent from '../components/marker';

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
    const [mapCenter, setMapCenter] = useState({lat: 0, lng: 0}); 

    useEffect(() => { // Get the user's location and set the map center to it
        if ("geolocation" in navigator) {
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
        // const bounds = new window.google.maps.LatLngBounds(mapCenter);
        // map.fitBounds(bounds);

        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    // debounce the function so it only fires after the user stops moving the map
    const fetchRequestsBasedOnBounds = React.useCallback(debounce(() => {
        if (map) {
            const bounds = map.getBounds();
            console.log('Fetching something based on these bounds:', bounds.toString());
            // Your API call logic here
        }
    }, 800), [map]);

    return isLoaded ? (
        <div className="container-fluid bg-dark p-0 m-0 row big-block   ">
            <div className='col-4 d-flex flex-column pt-2'>
                <CardComponent
                    id={1}
                    activeId={activeId}
                    type='material need'
                    title='This is the body of the card'
                    setActiveId={setActiveId}
                />
                <CardComponent
                    id={2}
                    activeId={activeId}
                    type='one time task'
                    title='This is the body of the card'
                    setActiveId={setActiveId}
                />
            </div>
            <div className='col-8 p-2'>
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={mapCenter}
                    zoom={9}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                    onBoundsChanged={fetchRequestsBasedOnBounds}
                >
                    <MarkerComponent id={1} activeId={activeId} position={mapCenter} type='material need' setActiveId={setActiveId} />
                    <MarkerComponent id={2} activeId={activeId} position={{ lat: -3.745, lng: -40.523 }} type='one time task' setActiveId={setActiveId} />
                </GoogleMap>
            </div>
        </div>
    ) : <></>
}



