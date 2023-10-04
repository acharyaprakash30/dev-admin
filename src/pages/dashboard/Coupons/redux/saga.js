import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import {
  postCouponApi,
  getCouponApi,
  deleteCouponApi,
  editCouponApi,
} from '../../../../api/fetchCoupons';
import ShowMessage from '../../../../components/Toast/Toast';
import { delay } from '../../../../helper/utility';

import actions from './actions';

import { history } from 'utils';

function* callFetchCouponReq(action) {
  try {
    let apiResponse = yield call(getCouponApi, action.payload);

    let { data, status } = apiResponse;

    yield put({
      type: actions.GET_COUPONS_SUC,
      statusCode: status,
      coupons: data,
    });
  } catch (err) {
    if (err && err?.response) {
      yield put({
        type: actions.GET_COUPONS_FAIL,
        payload: err.reponse.message,
      });
    }
    yield put({
      type: actions.GET_COUPONS_FAIL,
      payload: err.message,
    });
  }
}

function* callSearchLocalCouponRequest(action) {
  try {
    yield delay(400);

    yield put({
      type: actions.SEARCH_COUPONS_LOCAL_SUC,
      data: action.data,
    });
  } catch (error) {
    yield put({
      type: actions.SEARCH_COUPONS_LOCAL_FAIL,
      data: 'Error occured while searching COUPONS',
    });
    yield ShowMessage(400, 'Error occured while searching COUPONSs');
  }
}

function* callSendCouponReq(action) {
  try {
    let apiResponse = yield call(postCouponApi, action.payload);

    let { status } = apiResponse;

    yield put({
      type: actions.SEND_COUPONS_SUC,
      statusCode: status,
    });
    delay(1000);
    yield ShowMessage(status, 'Coupon added successfully.');
  } catch (err) {
    ShowMessage(400, 'Coupon addition failed');
    if (err && err?.response) {
      yield put({
        type: actions.SEND_COUPONS_FAIL,
        // payload: err.reponse.message
      });
    }
    yield put({
      type: actions.SEND_COUPONS_FAIL,
      // payload: err.message
    });
  }
}
function* callDeleteCouponReq(action) {
  try {
    let apiResponse = yield call(deleteCouponApi, action.payload);

    let { status } = apiResponse;

    yield put({
      type: actions.DLT_COUPONS_SUC,
      statusCode: status,
      id: action.payload,
    });
    delay(1000);
    yield ShowMessage(status, 'Coupon deleted successfully.');
  } catch (err) {
    if (err && err?.response) {
      yield put({
        type: actions.DLT_COUPONS_FAIL,
        payload: err.reponse.message,
      });
    }
    yield put({
      type: actions.DLT_COUPONS_FAIL,
      payload: err.message,
    });
  }
}
function* callEditCouponReq(action) {
  try {
    let apiResponse = yield call(editCouponApi, action.id, action.data);

    let { status } = apiResponse;
    yield ShowMessage(status, 'Coupon updated successfully.');
    history.push('/dashboard/coupons');
    history.go(0);
    yield put({
      type: actions.EDIT_VOUPONS_SUC,
      statusCode: status,
    });
  } catch (err) {
    if (err && err?.response) {
      yield put({
        type: actions.EDIT_COUPONS_FAIL,
        payload: err.reponse.message,
      });
    }
    yield put({
      type: actions.EDIT_COUPONS_FAIL,
      payload: err.message,
    });
  }
}

export function* sendCoupon() {
  yield takeEvery(actions.SEND_COUPONS_REQ, callSendCouponReq);
}

export function* getCoupon() {
  yield takeEvery(actions.GET_COUPONS_REQ, callFetchCouponReq);
}

export function* dltCoupon() {
  yield takeEvery(actions.DLT_COUPONS_REQ, callDeleteCouponReq);
}

export function* editCoupon() {
  yield takeEvery(actions.EDIT_COUPONS_REQ, callEditCouponReq);
}

export function* searchLocalCoupons() {
  yield takeEvery(
    actions.SEARCH_COUPONS_LOCAL_REQ,
    callSearchLocalCouponRequest,
  );
}

export default function* () {
  return yield all([
    fork(sendCoupon),
    fork(getCoupon),
    fork(dltCoupon),
    fork(editCoupon),
    fork(searchLocalCoupons),
  ]);
}
