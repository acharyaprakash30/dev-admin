// import './wdyr'; // Why did you render for optimizations
import { ConnectedRouter } from 'connected-react-router';
import React, { useState, useEffect, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import {
  Route,
  Redirect,
  Switch,
  useLocation,
  BrowserRouter,
  useHistory,
} from 'react-router-dom';
import Signin from './auth/signin';
import './index.scss';
import 'antd/dist/antd.css';
import AppLayout from './layout/AppLayout';
import actions from './pages/authentication/redux/actions';
import Register from './pages/authentication/register';
import Error404 from './pages/errors/error404';
import { routes } from './route';
import * as serviceWorker from './serviceWorker';
import  {store, persistor, sagaMiddleware } from './store';
import PrivateRoute from './utils/PrivateRoute';
import ProtectedRoute from './utils/ProtectedRoute';

import PageLoader from 'components/PageLoader/PageLoader';
import Icon from 'assets/images/favicon.png';
import config from './appconfig.json';
import rootSagas from 'sagas';
import { PersistGate } from 'redux-persist/integration/react';

sagaMiddleware.run(rootSagas);

const Root = () => {
  const location = useLocation();
  const preLocation = localStorage.getItem('prelocation');
  const [isLoggedIn,setisLoggedIn] = useState(false);
  const token = localStorage.getItem('access_token');
  // const preLocationStatus = useSelector((state) => state.router.location);
  useEffect(()=>{
    setisLoggedIn(!!localStorage.getItem('access_token'))
  },[token])

  return (
    <BrowserRouter>
      {/* <Loader show={auth.fetchingCurrentUser} /> */}
      <Suspense fallback={<PageLoader Logo={Icon} logoAlt={config.appName} />}>
        <Switch>
          <ProtectedRoute
            isAuthenticated={isLoggedIn}
            path={'/login'}
            // redirectTo={preLocationStatus?.pathname}
            // redirectTo={preLocationStatus?.state?.from?.pathname}
            redirectTo={preLocation}
            component={Signin}
          />
          <ProtectedRoute
            isAuthenticated={isLoggedIn}
            path={'/signup'}
            component={Register}
          />
          <Route
            path="/"
            exact
            render={() => <Redirect to={'/login'} />}
          />
          {routes.map(({ path, exact, Component }, index) => (
            <PrivateRoute
              key={`router-${path}-${index}`}
              path={path}
              exact={exact || false}
              layout={AppLayout}
              component={Component}
              redirectTo={preLocation}
              // redirectTo={preLocationStatus?.pathname}
              isAuthenticated={isLoggedIn}
            />
          ))}
          {/* <Route component={Error404} /> */}
          <Route path={'*'} component={Error404}></Route>
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

ReactDOM.render(
  <Provider store={store}>
   <PersistGate loading={null} persistor={persistor}>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
   </PersistGate>
  </Provider>,
  document.getElementById('root'),
);
serviceWorker.unregister();
