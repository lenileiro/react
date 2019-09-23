import React from 'react'
import { Redirect } from 'react-router'

import Home from './pages/home'

function requestInitialData() {
  return {
    "UserId": 1,
    "name": "sam"
  }
}

const Public = () => <h3>Public</h3>
const Login = () => <h3>Login In</h3>


var auth=true
const Protected = (props) => (
  !auth
    ? <Redirect to='/login' />
    : <Home {...props}/>
)
const routes = [
    // {
    //   path: "/",
    //   exact: true,
    //   component: Home
    // },
    {
      path: "/protected",
      exact: true,
      requestInitialData: requestInitialData,
      component: Protected
    },
    {
      path: "/public",
      exact: true,
      requestInitialData: requestInitialData,
      component: Public
    },
    {
      path: "/login",
      exact: true,
      requestInitialData: requestInitialData,
      component: Login
    },
    {
      path: "/",
      exact: true,
      requestInitialData: requestInitialData,
      component: Home
    }
  ];
  
  export default routes;
  