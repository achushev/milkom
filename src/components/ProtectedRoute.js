import React, { useContext } from 'react'
import { Route } from 'react-router-dom'

import { GlobalStateContext} from "../providers/GlobalStateProvider";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isLogged } = useContext(GlobalStateContext)

  if (!isLogged) {
    window.location = '/'
  }

  return <Route {...rest} render={props => (isLogged === true ? <Component {...props} /> : null)} />
}
