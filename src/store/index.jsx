import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import createSagaMiddleware from 'redux-saga';
import createRootReducer from '../redux/index';
import rootSagas from '../sagas';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
// import { history } from '../redux/index';

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: hardSet,
};

export const history = createBrowserHistory();

const persistedReducer = persistReducer(
  persistConfig,
  createRootReducer(history),
);

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  persistedReducer,
  compose(
    applyMiddleware(sagaMiddleware, routerMiddleware(history)),
    // window.devToolsExtension
    // ?
    // window.__REDUX_DEVTOOLS_EXTENSION__ &&
    // window.__REDUX_DEVTOOLS_EXTENSION__()
    // : function (f) {
    // return f;
    // },
  ),
);

let persistor = persistStore(store);

export { store, persistor, sagaMiddleware };
// export default store;
