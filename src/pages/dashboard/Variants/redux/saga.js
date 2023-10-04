import { push } from 'connected-react-router';
import { call, put, takeEvery, all, fork } from 'redux-saga/effects';
import {
  deleteVariantApi,
  editVariantApi,
  getVariantApi,
  postVariantApi,
} from '../../../../api/fetchVariant';
import ShowMessage from '../../../../components/Toast/Toast';
import { delay } from '../../../../helper/utility';
import actions from './actions';

const LIST_VARIANT_ROUTE = '/dashboard/variants';
function* callFetchVariantReq(action) {
  try {
    let apiResponse = yield call(getVariantApi, action.payload);

    let { data, status } = apiResponse;

    yield put({
      type: actions.GET_VARIANT_SUC,
      statusCode: status,
      variants: data?.adminProductVariants,
    });
  } catch (err) {
    if (err && err?.response) {
      yield put({
        type: actions.GET_VARIANT_FAIL,
        payload: err.reponse.message,
      });
    }
    yield put({
      type: actions.GET_VARIANT_FAIL,
      payload: err.message,
    });
  }
}
function* callAddVariantReq(action) {
  try {
    let apiResponse = yield call(postVariantApi, action.payload);
    let { status } = apiResponse;
    yield put({
      type: actions.SEND_VARIANT_SUC,
      statusCode: status,
    });
    delay(1000);
    yield ShowMessage(status, 'Variant added successfully.');
  } catch (err) {
    if (err && err?.response) {
      yield put({
        type: actions.SEND_VARIANT_FAIL,
        payload: err.reponse.message,
      });
    }
    yield put({
      type: actions.SEND_VARIANT_FAIL,
      payload: err.message,
    });
  }
}
function* callDeleteVariantReq(action) {
  try {
    let apiResponse = yield call(deleteVariantApi, action.payload);
    let { status } = apiResponse;

    yield put({
      type: actions.DLT_VARIANT_SUC,
      statusCode: status,
      id: action.payload,
    });
    delay(1000);
    yield ShowMessage(status, 'Variant deleted successfully.');
  } catch (err) {
    if (err && err?.response) {
      yield put({
        type: actions.DLT_VARIANT_FAIL,
        payload: err.reponse.message,
      });
    }
    yield put({
      type: actions.DLT_VARIANT_FAIL,
      payload: err.message,
    });
  }
}
function* callEditVariantReq(action) {
  try {
    let apiResponse = yield call(editVariantApi, action.id, action.data);

    let { status } = apiResponse;
    const message = 'Variant edited successfully.';
    yield put({
      type: actions.EDIT_VARIANT_SUC,
      statusCode: status,
      message,
    });
    yield ShowMessage(status, message);
    yield delay(1000);
    yield put(push(LIST_VARIANT_ROUTE));
  } catch (err) {
    if (err && err?.response) {
      yield put({
        type: actions.EDIT_VARIANT_FAIL,
        payload: err.reponse.message,
      });
    }
    yield put({
      type: actions.EDIT_VARIANT_FAIL,
      payload: err.message,
    });
  }
}

export function* sendVariant() {
  yield takeEvery(actions.SEND_VARIANT_REQ, callAddVariantReq);
}

export function* getVariant() {
  yield takeEvery(actions.GET_VARIANT_REQ, callFetchVariantReq);
}

export function* dltVariant() {
  yield takeEvery(actions.DLT_VARIANT_REQ, callDeleteVariantReq);
}

export function* editVariant() {
  yield takeEvery(actions.EDIT_VARIANT_REQ, callEditVariantReq);
}

export default function* () {
  return yield all([
    fork(sendVariant),
    fork(getVariant),
    fork(dltVariant),
    fork(editVariant),
  ]);
}
