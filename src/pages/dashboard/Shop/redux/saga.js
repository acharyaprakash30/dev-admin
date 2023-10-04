import { call, put, takeEvery, all, fork } from 'redux-saga/effects';
import {
  deleteShopApi,
  editShopApi,
  getShopApi,
  postShopApi,
} from '../../../../api/fetchShop';
import ShowMessage from '../../../../components/Toast/Toast';
import { delay } from '../../../../helper/utility';
import actions from './actions';
import { searchLocalBrand } from 'pages/dashboard/Brand/redux/saga';

function* callFetchShopReq(action) {
  try {
    let apiResponse = yield call(getShopApi, action.payload);
    let { data, status } = apiResponse;
    yield put({
      type: actions.GET_SHOP_SUC,
      statusCode: status,
      shops: data,
    });
  } catch (err) {
    if (err & err?.response) {
      yield put({
        type: actions.GET_SHOP_FAIL,
        payload: err.response.message,
      });
    }
    yield put({
      type: actions.GET_SHOP_FAIL,
      payload: err.message,
    });
  }
}

function* callSearchLocalShopRequest(action) {
  try {
    yield delay(400);

    yield put({
      type: actions.SEARCH_SHOP_LOCAL_SUC,
      data: action.data,
    });
  } catch (error) {
    yield put({
      type: actions.SEARCH_SHOP_LOCAL_FAIL,
      data: 'Error occured while searching ROLE',
    });
    yield ShowMessage(400, 'Error occured while searching ROLEs');
  }
}

function* callSendShopReq(action) {
  try {
    let apiResponse = yield call(postShopApi, action.payload);

    let { status } = apiResponse;

    yield put({
      type: actions.SEND_SHOP_SUC,
      statusCode: status,
    });
    delay(1000);
    yield ShowMessage(status, 'Shop added successfully');
  } catch (err) {
    if (err & err?.response) {
      yield put({
        type: actions.SEND_SHOP_FAIL,
        payload: err.response.message,
      });
    }
    yield put({
      type: actions.SEND_SHOP_FAIL,
      payload: err.message,
    });
  }
}
function* callDeleteShopReq(action) {
  try {
    let apiResponse = yield call(deleteShopApi, action.payload);

    let { status } = apiResponse;

    yield put({
      type: actions.DLT_SHOP_SUC,
      statusCode: status,
      id: action.payload,
    });
    delay(1000);
    yield ShowMessage(status, 'Shop deleted successfully.');
  } catch (err) {
    if (err && err?.response) {
      yield put({
        type: actions.DLT_SHOP_FAIL,
        payload: err.response.message,
      });
    }
    yield put({
      type: actions.DLT_SHOP_FAIL,
      payload: err.message,
    });
  }
}
function* callEditShopReq(action) {
  try {
    let apiResponse = yield call(editShopApi, action.id, action.data);

    let { status } = apiResponse;
    const message = 'Shop edited successfully.';
    yield put({
      type: actions.EDIT_SHOP_SUC,
      statusCode: status,
      message,
    });
    delay(1000);
    yield ShowMessage(status, message);
    // refresh shop data
    yield put({ type: actions.GET_SHOP_REQ });
  } catch (err) {
    if (err && err?.response) {
      yield put({
        type: actions.EDIT_SHOP_FAIL,
        payload: err.response.message,
      });
    }
    yield put({
      type: actions.EDIT_SHOP_FAIL,
      payload: err.message,
    });
  }
}

export function* fetchShop() {
  yield takeEvery(actions.GET_SHOP_REQ, callFetchShopReq);
}

export function* sendShop() {
  yield takeEvery(actions.SEND_SHOP_REQ, callSendShopReq);
}
export function* deleteShop() {
  yield takeEvery(actions.DLT_SHOP_REQ, callDeleteShopReq);
}

export function* editShop() {
  yield takeEvery(actions.EDIT_SHOP_REQ, callEditShopReq);
}

export function* searchShop() {
  yield takeEvery(actions.SEARCH_SHOP_LOCAL_REQ, callSearchLocalShopRequest);
}

export default function* () {
  return yield all([
    fork(fetchShop),
    fork(sendShop),
    fork(deleteShop),
    fork(editShop),
    fork(searchShop),
  ]);
}
