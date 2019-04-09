import React, {useState, useEffect, useContext} from 'react'
import ReactMapGL, {Marker, Popup} from 'react-map-gl'
import styled from 'styled-components'
import Context from '../context'
import BlogArea from './BlogArea'
import {useClient} from '../client'
import {GET_PINS_QUERY} from '../graphql/queries'
import {DELETE_PIN_MUTATION} from '../graphql/mutations'

import { faMapMarkerAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import differenceInMinutes from 'date-fns/difference_in_minutes'

const Image = styled.img`
    cursor: pointer;
    padding: 0.4em;
    height: 200px;
    width: 200px;
    object-fit: cover;
`

const Button = styled.button`
    padding: 0;
    background: none;
    border: none;
    display: inline-block;
    width: 100%;
    text-align: center;
`

const INITIAL_VIEWPORT = {
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 13
}

const Map = () => {
    const {state, dispatch} = useContext(Context)
    const client = useClient()

    useEffect(() => {
        getPins()   
       }, [])

    const [viewport, updateViewport] = useState(INITIAL_VIEWPORT)
    const [userPosition, setUserPosition] = useState(null)

    useEffect(() => {
        getUserPosition()
    }, [])

    const [popup, setPopup] = useState(null)

    const getPins = async () => {
        const {getPins} = await client.request(GET_PINS_QUERY)
        dispatch({
            type: "GET_PINS",
            payload: getPins
        })
    }

    const getUserPosition = () => {
        if("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(position => {
                const {latitude, longitude} = position.coords
                updateViewport({...viewport, latitude, longitude})
                setUserPosition({latitude, longitude})
            })
        }
    }

    const handleMapClick = ({lngLat, leftButton}) => {
        if(!leftButton) return
        if(!state.draft) {
            dispatch({type: "CREATE_DRAFT"})
        }

        const [longitude, latitude] = lngLat
        dispatch({
            type: "UPDATE_DRAFT_LOCATION",
            payload: {latitude, longitude}
        })
    }

    const highlightNewPin = pin => {
        const isNewPin = differenceInMinutes(Date.now(), Number(pin.createdAt)) <= 30

        return isNewPin ? "limegreen" : "darkblue"
    }

    const handleSelectPin = pin => {
        setPopup(pin)
        dispatch({
            type: "SET_PIN",
            payload: pin
        })
    }

    const isAuthUser = () => {
        return state.currentUser._id === popup.author._id
    }

    const handleDeletePin = async pin => {
        const variables = {pinId: pin._id}
        const {deletePin} = await client.request(DELETE_PIN_MUTATION, variables)
        dispatch({
            type: "DELETE_PIN",
            payload: deletePin
        })
        setPopup(null)
    }


    const API_KEY = "pk.eyJ1Ijoia2FsYWR6ZSIsImEiOiJjanRub28wcDQzdW5qNGJtdXN3YmJ1MnNhIn0.4R0arj8vtdr_cpcDdB5Agw"

    return (
        <div>
            <BlogArea/>
            
            <ReactMapGL
                width="78vw"
                height="calc(100vh - 64px)" /*Height of page minus nav bar height*/
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxApiAccessToken={API_KEY}
                onViewportChange={newViewport => updateViewport(newViewport)}
                onClick={handleMapClick}
                {...viewport} 
            > 
                {userPosition && (
                    <Marker
                        latitude={userPosition.latitude}
                        longitude={userPosition.longitude}
                        offsetLeft={-19}
                        offsetTop={-37}
                    > 
                        <FontAwesomeIcon 
                            icon={faMapMarkerAlt} 
                            size="3x"
                            color="orange"
                        />
                    </Marker>
                )}

                {/* Draft pin */}
                {state.draft && (
                    <Marker
                        latitude={state.draft.latitude}
                        longitude={state.draft.longitude}
                        offsetLeft={-19}
                        offsetTop={-37}
                    > 
                        <FontAwesomeIcon 
                            icon={faMapMarkerAlt} 
                            size="3x"
                            color="hotpink"
                        />
                    </Marker>      
                )}
                {/* created Pins */}
                {state.pins.map(pin => (
                    <Marker
                        key={pin._id}
                        latitude={pin.latitude}
                        longitude={pin.longitude}
                        offsetLeft={-19}
                        offsetTop={-37}
                    > 
                    <FontAwesomeIcon 
                        onClick={() => handleSelectPin(pin)}
                        icon={faMapMarkerAlt} 
                        size="3x"
                        color={highlightNewPin(pin)}
                    />
                </Marker> 
                ))}

                {popup && (
                    <Popup
                        anchor="top"
                        latitude={popup.latitude}
                        longitude={popup.longitude}
                        closeOnClick={false}
                        onClose={() => setPopup(null)}
                    >
                    <Image
                        src={popup.image}
                        alt={popup.title}
                    />
                    <div>
                        <h3>
                            Latitude: {popup.latitude.toFixed(4)}
                            <br/>
                            Longitude: {popup.longitude.toFixed(4)}
                        </h3>
                        {isAuthUser() && (
                            <Button onClick={() => handleDeletePin(popup)}>
                                <FontAwesomeIcon 
                                    icon={faTrashAlt} 
                                    size="2x"
                                    color="red"
                                />
                            </Button>
                        )}
                    </div>

                    </Popup>
                )}
            </ReactMapGL>

        </div>
    )
}

export default Map