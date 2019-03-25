import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { GoogleLogin } from 'react-google-login'

const Login = ({ classes }) => {
  const onSuccess = user => {
    const tokenID = user.getAuthResponse().id_token
    console.log({tokenID})
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
