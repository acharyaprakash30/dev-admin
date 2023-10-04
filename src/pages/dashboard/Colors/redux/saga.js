import {
  call,
  put,
  takeEvery,
  all,
  fork,
  takeLatest,
} from 'redux-saga/effects';
import {
  deleteColorApi,
  editColorApi,
  getColorApi,
  postColorApi,
} from '../../../../api/fetchColors';
import ShowMessage from '../../../../components/Toast/Toast';
import { delay } from '../../../../helper/utility';
import actions from './actions';

function* callFetchColorReq(action) {
  try {
    let apiResponse = yield call(getColorApi, action.payload);

    let { data, status } = apiResponse;

    yield put({
      type: actions.GET_COLOR_SUC,
      statusCode: status,
      colors: data,
    });
  } catch (err) {
    if (err && err?.response) {
      yield put({
        type: actions.GET_COLOR_FAIL,
        payload: err.reponse.error.message,
      });
    }
    yield put({
      type: actions.GET_COLOR_FAIL,
      payload: err.message,
    });
  }
}
function* callAddAColor(action) {
  try {
    let apiResponse = yield call(postColorApi, action.payload);

    let { status } = apiResponse;

    yield put({
      type: actions.SEND_COLOR_SUC,

      statusCode: status,
    });
    delay(1000);
    yield ShowMessage(status, 'Color added successfully.');
  } catch (err) {
    if (err.response.data.error.message) {
      yield ShowMessage(500, err.response.data.error.message);
    } else {
      yield ShowMessage(500, 'Error while adding color');
    }
  }
}
function* callColorDelete(action) {
  try {
    let apiResponse = yield call(deleteColorApi, action.payload);
    let { status } = apiResponse;

    yield put({
      type: actions.DLT_COLOR_SUC,
      statusCode: status,
      id: action.payload,
    });
    delay(1000);
    yield ShowMessage(status, 'Color deleted successfully.');
  } catch (err) {
    if (err && err?.response) {
      yield put({
        type: actions.DLT_COLOR_FAIL,
        payload: err.reponse.message,
      });
    }
    yield put({
      type: actions.DLT_COLOR_FAIL,
      payload: err.message,
    });
  }
}
function* callColorUpdate(action) {
  try {
    let apiResponse = yield call(editColorApi, action.id, action.data);

    let { status } = apiResponse;
    const message = 'Color Edited successfully.';
    yield put({
      type: actions.EDIT_COLOR_SUC,
      statusCode: status,

      message,
    });
    delay(1000);
    yield ShowMessage(status, message);
  } catch (err) {
    if (err && err?.response) {
      yield put({
        type: actions.EDIT_COLOR_FAIL,
        payload: err.reponse.message,
      });
    }
    yield put({
      type: actions.EDIT_COLOR_FAIL,
      payload: err.message,
    });
  }
}

function* callSearchColors(action) {
  try {
    yield delay(400);

    yield put({
      type: actions.SEARCH_LOCAL_COLOR_SUC,
      data: action.data,
    });
  } catch (err) {
    yield put({ type: actions.SEARCH_LOCAL_COLOR_FAIL });
    yield ShowMessage(400, 'Error occured while searching colors');
  }
}

export function* addAColor() {
  yield takeEvery(actions.SEND_COLOR_REQ, callAddAColor);
}

export function* fetchColors() {
  yield takeEvery(actions.GET_COLOR_REQ, callFetchColorReq);
}

export function* deleteAColor() {
  yield takeEvery(actions.DLT_COLOR_REQ, callColorDelete);
}

export function* updateAColor() {
  yield takeEvery(actions.EDIT_COLOR_REQ, callColorUpdate);
}

export function* searchColor() {
  yield takeLatest(actions.SEARCH_LOCAL_COLOR_REQ, callSearchColors);
}

export default function* () {
  return yield all([
    fork(addAColor),
    fork(fetchColors),
    fork(deleteAColor),
    fork(updateAColor),
    fork(searchColor),
  ]);
}
