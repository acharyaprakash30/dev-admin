import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { history } from 'utils';
import {
  deleteBrandApi,
  editBrandApi,
  getBrandApi,
  postBrandApi,
} from '../../../../api/fetchBrand';
import ShowMessage from '../../../../components/Toast/Toast';
import { delay } from '../../../../helper/utility';
import actions from './actions';

function* callSendBrandReq(action) {
  try {
    let apiResponse = yield call(postBrandApi, action.payload);

    let { data, status } = apiResponse;

    yield put({
      type: actions.SEND_BRAND_SUC,
      statusCode: status,
      payload: data,
    });
    delay(1000);
    yield ShowMessage(status, 'brand added successfully.');
    history.push('/dashboard/brands');
    history.go(0);
  } catch (err) {
    if (err && err?.response) {
      yield put({
        type: actions.SEND_BRAND_FAIL,
        payload: err.response.message,
      });
    }
    yield put({
      type: actions.SEND_BRAND_FAIL,
      payload: err.message,
    });
  }
}

function* callFetchBrandReq(action) {
  try {
    let apiResponse = yield call(getBrandApi, action.payload);
    let { data, status } = apiResponse;

    yield put({
      type: actions.GET_BRAND_SUC,
      statusCode: status,
      brands: data,
    });
  } catch (err) {
    if (err && err?.response) {
      yield put({
        type: actions.GET_BRAND_FAIL,
        payload: err.response.message,
      });
    }
    yield put({
      type: actions.GET_BRAND_FAIL,
      payload: err.message,
    });
  }
}
function* callDeleteBrandReq(action) {
  try {
    let apiResponse = yield call(deleteBrandApi, action.payload);

    let { status } = apiResponse;

    yield put({
      type: actions.DLT_BRAND_SUC,
      statusCode: status,
      id: action.payload,
    });
    delay(1000);
    yield ShowMessage(status, 'brand deleted successfully.');
  } catch (err) {
    if (err && err?.response) {
      yield put({
        type: actions.DLT_BRAND_FAIL,
        payload: err.response.message,
      });
    }
    yield put({
      type: actions.DLT_BRAND_FAIL,
      payload: err.message,
    });
  }
}
function* callEditBrandReq(action) {
  try {
    let apiResponse = yield call(editBrandApi, action.id, action.data);

    let { status } = apiResponse;
    const message = 'brand edited successfully.';
    yield put({
      type: actions.EDIT_BRAND_SUC,
      statusCode: status,
      message,
    });
    delay(1000);
    yield ShowMessage(status, message);
    history.push('/dashboard/brands');
    history.go(0);
  } catch (err) {
    if (err && err?.response) {
      yield put({
        type: actions.EDIT_BRAND_FAIL,
        payload: err.response.message,
      });
    }
    yield put({
      type: actions.EDIT_BRAND_FAIL,
      payload: err.message,
    });
  }
}

function* callSearchLocalBrandRequest(action) {
  try {
    yield delay(400);

    yield put({
      type: actions.SEARCH_BRAND_LOCAL_SUC,
      data: action.data,
    });
  } catch (error) {
    yield put({
      type: actions.SEARCH_BRAND_LOCAL_FAIL,
      data: 'Error occured while searching brands',
    });
    yield ShowMessage(400, 'Error occured while searching brands');
  }
}

export function* sendBrand() {
  yield takeEvery(actions.SEND_BRAND_REQ, callSendBrandReq);
}

export function* fetchBrand() {
  yield takeEvery(actions.GET_BRAND_REQ, callFetchBrandReq);
}

export function* deleteBrand() {
  yield takeEvery(actions.DLT_BRAND_REQ, callDeleteBrandReq);
}
export function* editBrand() {
  yield takeEvery(actions.EDIT_BRAND_REQ, callEditBrandReq);
}

export function* searchLocalBrand() {
  yield takeEvery(actions.SEARCH_BRAND_LOCAL_REQ, callSearchLocalBrandRequest);
}

export default function* brandSaga() {
  return yield all([
    fork(sendBrand),
    fork(fetchBrand),
    fork(deleteBrand),
    fork(editBrand),
    fork(searchLocalBrand),
  ]);
}
