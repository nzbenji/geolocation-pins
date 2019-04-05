import React, {useState} from 'react'
import ReactMapGL, {NavigationControl} from 'react-map-gl'

const INITIAL_VIEWPORT = {
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 13
}

const Map = () => {
    const [viewport, updateViewport] = useState(INITIAL_VIEWPORT)

    const API_KEY = "pk.eyJ1Ijoia2FsYWR6ZSIsImEiOiJjanRub28wcDQzdW5qNGJtdXN3YmJ1MnNhIn0.4R0arj8vtdr_cpcDdB5Agw"
    return (
        <div>
            <ReactMapGL
                width="100vw"
                height="calc(100vh - 64px)" /*Height of page minus nav bar height*/
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxApiAccessToken={API_KEY}
                onViewportChange={newViewport => updateViewport(newViewport)}
                {...viewport} 
            > 
                {/*Navigation Control*/}
                <div>
                    <NavigationControl onViewportChange={newViewport => updateViewport(newViewport)} />
                </div>
            </ReactMapGL>
        </div>
    )
}

export default Map