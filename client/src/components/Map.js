import React from 'react'
import ReactMapGL from 'react-map-gl'

const viewport = {
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 13
}

const Map = () => {
    const API_KEY = "pk.eyJ1Ijoia2FsYWR6ZSIsImEiOiJjanRub28wcDQzdW5qNGJtdXN3YmJ1MnNhIn0.4R0arj8vtdr_cpcDdB5Agw"
    return (
        <div>
            <ReactMapGL
                width="100vw"
                height="calc(100vh - 64px)" /*Height of page minus nav bar height*/
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxApiAccessToken={API_KEY}
                {...viewport}
            >

            </ReactMapGL>
        </div>
    )
}

export default Map