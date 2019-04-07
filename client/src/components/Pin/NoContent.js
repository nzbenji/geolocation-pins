import React from "react"
import { faCompass } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from 'styled-components'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    min-height: 50vh;

    h2 {
        text-align: center;
        letter-spacing: 1.8px;
    }
`


const NoContent = () => {
    return (
        <Wrapper>
            <FontAwesomeIcon 
                style={{justifyContent: 'center'}}
                icon={faCompass} 
                size="6x"
                color="orange"
            />
            <h2>Click on map to add a pin</h2>
        </Wrapper>
    )
}

export default NoContent