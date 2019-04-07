import React, {useState, useEffect} from 'react'
import ReactMapGL, {NavigationControl, Marker} from 'react-map-gl'
import MapIcon from './MapIcon'

const INITIAL_VIEWPORT = {
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 13
}

const Map = () => {
    const [viewport, updateViewport] = useState(INITIAL_VIEWPORT)
    const [userPosition, setUserPosition] = useState(null)

    useEffect(() => {
        getUserPosition()
    })

    const getUserPosition = () => {
        if("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(position => {
                const {latitude, longitude} = position.coords
                updateViewport({...viewport, latitude, longitude})
                setUserPosition({latitude, longitude})
            })
        }
    }

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
                {userPosition && (
                    <Marker
                        icon='../../../icons/map-marker.svg'
                        latitude={userPosition.latitude}
                        longitude={userPosition.longitude}
                        offsetLeft={-19}
                        offsetTop={-37}
                    > 
                        <MapIcon />
                    </Marker>
                )}

            </ReactMapGL>
        </div>
    )
}

export default Map