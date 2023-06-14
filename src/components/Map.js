import React, { useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
import data from '../data/mock'
import accessToken from '../config/config'

mapboxgl.accessToken = accessToken

const Mapp = () => {
    const [lng, setLng] = React.useState(83.9856);
    const [lat, setLat] = React.useState(28.2096);
    const [zoom, setZoom] = React.useState(11);

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
        })
        data.forEach((location) => {
            var marker = new mapboxgl.Marker({ color: '#f08577'}).setLngLat(location.coordinates)
                .setPopup(new mapboxgl.Popup({offset: 30})
                .setHTML('<h4>' + location.location + '</h4>' + location.coordinates))
                marker.addTo(map)
        })
    }, [])

    let mapContainer = React.useRef(null);
    return (
        <div>
            <div ref={mapContainer} style={{ width: '100%', height: '100vh' }}>
            </div>
        </div>
    )
}

export default Mapp
