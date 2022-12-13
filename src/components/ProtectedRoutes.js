import React from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';
import Cookies from "universal-cookie";
const cookies = new Cookies();

const ProtectedRoutes = ({ element: Component, ...rest }) => {
  return (
    <Routes>
      <Route
        {...rest}
        render={(props) => {
          const token = cookies.get("TOKEN");
          if (token) {
            return <Component {...props} />;
          } else {
            // returns the user to the landing page if there is no valid token set
            return (
              <Navigate
                to={{
                  pathname: "/",
                  state: {
                    // sets the location a user was about to access before being redirected to login
                    from: props.location,
                  },
                }}
              />
            );
          }
        }}
      />
    </Routes>
  );
}

export default ProtectedRoutes;

