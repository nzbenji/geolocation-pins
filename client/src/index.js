import React, {useContext, useReducer} from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import App from "./pages/App"
import Splash from "./pages/Splash"
import AppContext from './context'
import reducer from './reducer'

import ProtectedRoute from './ProtectedRoute'

import "mapbox-gl/dist/mapbox-gl.css"

const Root = () => {
  const initialState = useContext(AppContext)
  const [state, dispatch] = useReducer(reducer, initialState)
  console.log({state})

  return (
    <Router>
      <AppContext.Provider value={{state, dispatch}}>
      <Switch>
        <ProtectedRoute exact path="/" component={App} />
        <Route path="/login" component={Splash} />
      </Switch>
      </AppContext.Provider>
      
    </Router>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));

