import history from 'app/history';
import { push } from 'connected-react-router';
import { decodeToken } from 'react-jwt';
import localStorage from 'redux-persist/es/storage';
import {
  all,
  call,
  fork,
  put,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import { persistor } from 'store';
import {
  getAccessToken,
  getCurrentUser,
  getToken,
  logoutApi,
} from '../../../api/auth';
import alertActions from '../../../components/Alert/redux/actions';
import ShowMessage from '../../../components/Toast/Toast';
import { setCookie } from '../../../utils/cookies';
import { LocalStorage } from '../../../utils/LocalStorage';
import actions from './actions';
function* callAccessTokenReq(token, username) {
  try {
    let { data, status } = yield call(getAccessToken, {
      code: token,
      username,
    });

    yield put({
      type: actions.DECODE_LOGIN_TOKEN_REQ,
      payload: data.accessToken,
    });
    localStorage.setItem('access_token', data.accessToken);
    localStorage.setItem('refresh_token', data.refreshToken);
    setCookie('token', data.accessToken, 1);
    yield put({
      type: actions.GET_ACCESS_SUC,
      message: 'Logged in successfully.',
      statusCode: status,
    });
    history.push('/dashboard');
    history.go(0);
    //TODO::Refactor
    // const cu = yield call(getCurrentUser);
    // yield put({
    //   type: actions.GET_CURRENT_USER_SUC,
    //   currentUser: cu.data,
    // })
  } catch (error) {}
}

function* getTokenReq(action) {
  try {
    let { username } = action.payload;
    let tokenResponse = yield call(getToken, action.payload);
    let { data, status } = tokenResponse;
    yield put({
      type: actions.GET_TOKEN_SUC,
      statusCode: status,
    });
    yield callAccessTokenReq(data.code, username);
  } catch (error) {
    if (error?.response?.status === 502) {
      if (error && error?.response?.data) {
        yield put({
          type: alertActions.SET_ALERT_REQ,
          payload: {
            errorName: error.response.data.error.statusText,
            status: error.response.data.status,
          },
        });
        yield put({
          type: actions.GET_TOKEN_FAIL,
          statusCode: error.response.data.status,
          message: error.response.data.error.statusText,
        });
      }
    }
    if (error && error?.response?.data) {
      yield put({
        type: alertActions.SET_ALERT_REQ,
        payload: {
          status: error.response.data.error.statusCode,
          errorName: error.response.data.error.message.message,
        },
      });
      return yield put({
        type: actions.GET_TOKEN_FAIL,
        statusCode: error.response.data.error.statusCode,
        message: error.response.data.error.message.message,
      });
    }
    yield put({
      type: actions.GET_TOKEN_FAIL,
      statusCode: error.status,
      message: error.message,
    });
  }
}

function* callCurrentUserRequest(action) {
  try {
    const { data } = yield call(getCurrentUser, action.payload);
    yield put({
      type: actions.GET_CURRENT_USER_SUC,
      currentUser: data,
    });
  } catch (error) {
    if (error?.response?.data) {
      yield put({
        type: actions.GET_CURRENT_USER_FAIL,
        message: 'something went wrong.',
        status: error.response.status,
      });
    }
  }
}

function* callLogoutRequest(action) {
  try {
    //Call the api
    yield call(logoutApi);
    //Update the reducer
    yield put({ type: actions.SEND_LOGOUT_SUC });
    history.push('/login');
    history.go(0);
  } catch (error) {
    const message = 'SOMETHING WENT WRONG. cant logout.';
    const status = error?.response.data?.error?.message || 502;
    yield put({
      type: actions.SEND_LOGOUT_FAIL,
      message,
      status,
    });
    ShowMessage(status, message);
  } finally {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('prelocation');
    localStorage.removeItem('apicall');
    //Remove the tokens

    yield put(push('/login'));
  }
}

function* callTokenFromLocalStorage(action) {
  try {
    const access_token = LocalStorage.get('access_token');
    if (access_token) {
      yield put({
        type: actions.DECODE_LOGIN_TOKEN_REQ,
        payload: access_token,
      });

      yield put({ type: actions.DECODE_LOGIN_TOKEN_LOGIN });
    }
  } catch (error) {
    yield put({ type: actions.GET_TOKEN_FROM_LS_FAIL });
  }
}

function* callDecodeTokenRequest(action) {
  try {
    //Decode the jwt
    const decodedData = decodeToken(action.payload);
    yield put({
      type: actions.DECODE_LOGIN_TOKEN_SUC,
      payload: decodedData,
    });
    yield put({
      type: actions.GET_CURRENT_USER_SUC,
      currentUser: decodedData,
    });
  } catch {
    yield put({ type: actions.DECODE_LOGIN_TOKEN_FAIL });
  }
}

export function* logout() {
  yield takeEvery(actions.SEND_LOGOUT_REQ, callLogoutRequest);
}

export function* login() {
  yield takeLatest(actions.GET_TOKEN_REQ, getTokenReq);
}

export function* fetchCurrentUser() {
  yield takeLatest(actions.GET_CURRENT_USER_REQ, callCurrentUserRequest);
}

export function* decodeJWT() {
  yield takeLatest(actions.DECODE_LOGIN_TOKEN_REQ, callDecodeTokenRequest);
}

export function* getTokenFromLocalStorage() {
  yield takeLatest(actions.GET_TOKEN_FROM_LS_REQ, callTokenFromLocalStorage);
}

export default function* authSaga() {
  yield all([
    fork(logout),
    fork(login),
    fork(fetchCurrentUser),
    fork(decodeJWT),
    fork(getTokenFromLocalStorage),
  ]);
}
