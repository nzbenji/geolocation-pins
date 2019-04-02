import React, {useContext} from "react";
import {Redirect} from 'react-router-dom'
import AppContext from '../context'
import Login from '../components/Auth/Login'

const Splash = () => {
  const {state} = useContext(AppContext)
  return state.isAuth ? <Redirect to="/" /> : <Login />
};

export default Splash;
