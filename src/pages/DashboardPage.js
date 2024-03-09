import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { debounce } from 'lodash';

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

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(mapCenter);
        map.fitBounds(bounds);

        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    // Create a debounced function
    const fetchRequestsBasedOnBounds = React.useCallback(debounce(() => {
        if (map) {
            const bounds = map.getBounds();
            console.log('Fetching something based on these bounds:', bounds.toString());
            // Your API call logic here
        }
    }, 800), [map]);

    return isLoaded ? (
        <div className="container-fluid p-0 row big-block">
            <div className='col-4'>test</div>
            <div className='col-8 '>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={mapCenter}

                zoom={10}
                onLoad={onLoad}
                onUnmount={onUnmount}
                onBoundsChanged={fetchRequestsBasedOnBounds}
            >
                { /* Child components, such as markers, info windows, etc. */}
                <></>
            </GoogleMap>
            </div>
        </div>
    ) : <></>
}



