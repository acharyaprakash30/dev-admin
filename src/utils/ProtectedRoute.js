import React,{useEffect} from 'react';
import { Redirect, Route } from 'react-router';

const ProtectedRoute = ({
  component: Component,
  exact,
  path,
  isAuthenticated,
  redirectTo,
  ...rest
}) => {



  return (
    <Route
      path={path}
      exact={exact}
      render={(props) =>
        !isAuthenticated ? (
          <Component {...props} {...rest} />
        ) : (

          <Redirect 
          to={{ 
            pathname: redirectTo === '/login' || redirectTo === "/" ? '/dashboard' : redirectTo || "/dashboard", 
            state: { from: props.location } 
          }} />

        )
      }
    />
  );
};

export default React.memo(ProtectedRoute);
