import { call, put, takeEvery, all, fork } from 'redux-saga/effects';
import {
  deleteVendorApi,
  editVendorApi,
  getVendorApi,
  patchVendorCommissionApi,
  postVendorApi,
} from '../../../../api/fetchVendor';
import ShowMessage from '../../../../components/Toast/Toast';
import { delay } from '../../../../helper/utility';
import actions from './actions';
import { history } from 'utils';

function* callSendVendorReq(action) {
  try {
    let apiResponse = yield call(postVendorApi, action.payload);
    let { data, status } = apiResponse;
    yield put({
      type: actions.SEND_VENDOR_SUC,
      payload: data,
      statusCode: status,
    });
    history.push('/dashboard/vendors');
    history.go(0);
    yield ShowMessage(status, 'vendor added successfully.');
  } catch (err) {
    if (err & err?.response) {
      yield put({
        type: actions.SEND_VENDOR_FAIL,
        payload: err.response.message,
      });
    }
    yield put({
      type: actions.SEND_VENDOR_FAIL,
      payload: err.message,
    });
  }
}

function* callFetchVendorReq(action) {
  try {
    let apiResponse = yield call(getVendorApi, action.payload);
    let { data, status } = apiResponse;
    yield put({
      type: actions.GET_VENDOR_SUC,
      statusCode: status,
      vendors: data,
    });
  } catch (err) {
    if (err && err?.response) {
      yield put({
        type: actions.GET_VENDOR_FAIL,
        payload: err.response.message,
      });
    }
    yield put({
      type: actions.GET_VENDOR_FAIL,
      payload: err.message,
    });
  }
}
function* callDeleteVendorReq(action) {
  try {
    let apiResponse = yield call(deleteVendorApi, action.payload);

    let { status } = apiResponse;

    yield put({
      type: actions.DLT_VENDOR_SUC,
      statusCode: status,
      id: action.payload,
    });
    delay(1000);
    yield ShowMessage(status, 'vendor deleted successfully.');
  } catch (err) {
    if (err && err?.response) {
      yield put({
        type: actions.DLT_VENDOR_FAIL,
        payload: err.response.message,
      });
    }
    yield put({
      type: actions.DLT_VENDOR_FAIL,
      payload: err.message,
    });
  }
}
function* callEditVendorReq(action) {
  try {
    let apiResponse = yield call(editVendorApi, action.id, action.data);

    let { status } = apiResponse;
    const message = 'Vendor edited sucessfully';
    yield put({
      type: actions.EDIT_VENDOR_SUC,
      statusCode: status,
      message,
    });
    delay(1000);
    yield ShowMessage(status, message);
  } catch (err) {
    if (err && err?.response) {
      yield put({
        type: actions.EDIT_VENDOR_FAIL,
        payload: err.response.message,
      });
    }
    yield put({
      type: actions.EDIT_VENDOR_FAIL,
      payload: err.message,
    });
  }
}

function* callEditCommissionReq(action) {
  try {
    let apiResponse = yield call(
      patchVendorCommissionApi,
      action.id,
      action.data,
    );

    let { status } = apiResponse;
    const message = 'Vendor Commission edited sucessfully';
    yield put({
      type: actions.EDIT_VENDOR_SUC,
      statusCode: status,
      id: action.id,
      data: action.data,
      message,
    });
    delay(1000);
    yield ShowMessage(status, message);
  } catch (err) {
    if (err && err?.response) {
      yield put({
        type: actions.EDIT_VENDOR_FAIL,
        payload: err.response.message,
      });
    }
    yield put({
      type: actions.EDIT_VENDOR_FAIL,
      payload: err.message,
    });
  }
}

export function* editVendor() {
  yield takeEvery(actions.EDIT_VENDOR_REQ, callEditVendorReq);
}

export function* editVendorCommission() {
  yield takeEvery(actions.EDIT_VENDORCOMMISION_REQ, callEditCommissionReq);
}

export function* sendVendor() {
  yield takeEvery(actions.SEND_VENDOR_REQ, callSendVendorReq);
}

export function* fetchVendor() {
  yield takeEvery(actions.GET_VENDOR_REQ, callFetchVendorReq);
}

export function* deleteVendor() {
  yield takeEvery(actions.DLT_VENDOR_REQ, callDeleteVendorReq);
}

export default function* () {
  return yield all([
    fork(editVendor),
    fork(sendVendor),
    fork(fetchVendor),
    fork(deleteVendor),
    fork(editVendorCommission),
  ]);
}
