import React, {useContext} from "react";
import {GoogleLogout} from 'react-google-login'

import Context from '../../context'

const Signout = ({ classes }) => {
  const {dispatch} = useContext(Context)

  const onSignout = () => {
    dispatch({ type: "SIGNOUT_USER"})
    
  }
  return (
    <div>
      <GoogleLogout 
        onLogoutSuccess={onSignout}
        render={({onClick}) => (
          <span onClick={onClick}>
            Signout
          </span>
        )}
      />
    </div>
  )
};


export default Signout
