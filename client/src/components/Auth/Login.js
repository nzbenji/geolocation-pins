import React, {useContext} from "react"
import {graphQLClient, GraphQLClient} from 'graphql-request'
import { withStyles } from "@material-ui/core/styles"
import { GoogleLogin } from 'react-google-login'

import AppContext from '../../context'

const ME_QUERY = `
{
  me {
    _id
    name
    email
    picture
  }
}
`

const Login = ({ classes }) => {
  const {dispatch} = useContext(AppContext)

  const onSuccess = async user => {
    const tokenID = user.getAuthResponse().id_token
    const client = new GraphQLClient('http://localhost:4000/graphql', {
      headers: { authorization: tokenID }
    })
    const queryData = await client.request(ME_QUERY)
    console.log({queryData})
    
    dispatch({
      type: 'LOGIN_USER',
      payload: queryData.me
    })
  }

  return <GoogleLogin 
    clientId = '377087076172-0ke1sun2qk1is3or21pdesdu3mvc2spc.apps.googleusercontent.com' 
    onSuccess={onSuccess}
    isSignedIn={true}
  />
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
