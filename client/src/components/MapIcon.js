import React from 'react'
import Logo from '../icons/icons8-marker-48.png'

export default ({onClick}) => {
    return <img 
        src={Logo} 
        alt="icon"
        onClick={onClick}
    />
}