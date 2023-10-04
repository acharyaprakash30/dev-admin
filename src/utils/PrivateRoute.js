import React, { useEffect } from 'react';
import { Redirect, Route, useHistory } from 'react-router';


const PrivateRoute = ({
  component: Component,
  path,
  exact,
  isAuthenticated,
  layout: Layout,
  redirectTo,
  ...rest
}) => {

  useEffect(()=>{
    if (path) {
      localStorage.setItem('prelocation', rest.location.pathname)
    }
  },[path])
  return (
    <Route
      path={path}
      exact={exact}
      render={(props) =>
        isAuthenticated ? (
          Layout ? (
            <Layout>
              <Component {...props} {...rest} key={path} />
            </Layout>
          ) : (
            <Component />
          )
        ) : (
          <>
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location }
              }}
            />
          </>
        )
      }
    />
  );
};

export default PrivateRoute;
