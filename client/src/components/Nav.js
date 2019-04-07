import React, {useContext} from 'react'
import Context from '../context'
import { Header, Image } from 'semantic-ui-react'

import Signout from '../components/Auth/Signout'

const Nav = () => {
    const {state} = useContext(Context)
    const {currentUser} = state
    console.log(currentUser)
    return (
        <div>
            <Header as='h2'>
            {currentUser && (
                <div>
                    <Image circular 
                    src={currentUser.picture}
                    alt={currentUser.name}
                    />
                    <p>{currentUser.name}</p>
                    <Signout />
                </div>
                
            )}
                 
            </Header>
        </div>
    )
}

export default Nav