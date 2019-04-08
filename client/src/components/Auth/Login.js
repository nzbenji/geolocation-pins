import React, {useContext} from "react"
import {graphQLClient, GraphQLClient} from 'graphql-request'
import { withStyles } from "@material-ui/core/styles"
import { GoogleLogin } from 'react-google-login'

import AppContext from '../../context'
import {ME_QUERY} from '../../graphql/queries'
import {END_POINT} from '../../client'


const Login = ({ classes }) => {
  const {dispatch} = useContext(AppContext)

  const onSuccess = async user => {
    const tokenID = user.getAuthResponse().id_token
    const client = new GraphQLClient(END_POINT, {
      headers: { authorization: tokenID }
    })
    const {me} = await client.request(ME_QUERY)
    
    dispatch({
      type: 'LOGIN_USER',
      payload: me
    })
    
    dispatch({ 
      type: "IS_LOGGED_IN",
      payload: user.isSignedIn()
    })
  }

  return (
    <div className={classes.root}>
      <GoogleLogin 
        clientId = '377087076172-0ke1sun2qk1is3or21pdesdu3mvc2spc.apps.googleusercontent.com' 
        onSuccess={onSuccess}
        onFailure={err => {
          console.error('Error logging in', err)
        }}
        isSignedIn={true}
        theme="dark"
      />
    </div>
  )
}

const styles = {
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  }
};

export default withStyles(styles)(Login);
