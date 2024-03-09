import React, { useState } from 'react'
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { debounce } from 'lodash';
import CardComponent from '../components/card';

const mapContainerStyle = {
    width: '100%',
    height: '100%'
};

const mapCenter = {
    lat: -3.745,
    lng: -38.523
};

export default function DashboardPage() {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyDcBfcLxJIXSvH2fZmYHrSTqS8w2E3-ywo"
    })

    const [map, setMap] = useState(null)
    const [showInfoWindow, setShowInfoWindow] = useState(false);

    const onLoad = React.useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(mapCenter);
        map.fitBounds(bounds);

        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    // debounce the function so it only fires after the user stops moving the map
    const fetchRequestsBasedOnBounds = React.useCallback(debounce(() => {
        setShowInfoWindow(false)
        if (map) {
            const bounds = map.getBounds();
            console.log('Fetching something based on these bounds:', bounds.toString());
            // Your API call logic here
        }
    }, 800), [map]);

    const position = {
        lat: -3.745,
        lng: -38.523
    }

    const onMarkerClick = () => {
        setShowInfoWindow(true);
    };


    return isLoaded ? (
        <div className="container-fluid bg-dark p-0 m-0 row big-block   ">
            <div className='col-4 d-flex flex-column pt-2'>
                <CardComponent
                    type='material need'
                    title='This is the body of the card'
                />
                <CardComponent
                    type='one time task'
                    title='This is the body of the card'
                />
            </div>
            <div className='col-8 p-2 rounded'>
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={mapCenter}
                    zoom={10}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                    onBoundsChanged={fetchRequestsBasedOnBounds}
                >
                    <Marker
                        position={position}
                        onClick={onMarkerClick} // Set the click handler
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

                </GoogleMap>
            </div>
        </div>
    ) : <></>
}



