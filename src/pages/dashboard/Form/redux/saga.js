import { call, put, takeEvery, fork, all } from 'redux-saga/effects';
import {
  editFormgroupReq,
  getFormReq,
  sendFormgroupReq,
  sendFormReq,
} from '../../../../api/fetchForm';
import actions from './actions';
import ShowMessage from '../../../../components/Toast/Toast';

function* callSendFormReq(action) {
  try {
    let apiResponse = yield call(sendFormReq, action.payload);

    let { data } = apiResponse;
    yield put({
      type: actions.SEND_FORM_SUC,
      payload: data,
    });
  } catch (err) {
    if (err & err?.response) {
      yield put({
        type: actions.SEND_FORM_FAIL,
        payload: err.response.message + 'ERROR ON RESPONBE',
      });
    }
    yield put({
      type: actions.SEND_FORM_FAIL,
      payload: err.message,
    });
  }
}
function* callFetchFormReq({ payload }) {
  try {
    let apiResponse = yield call(getFormReq, payload);

    let { data, status } = apiResponse;

    yield put({
      type: actions.GET_FORM_SUC,
      statusCode: status,
      forms: data,
    });
  } catch (err) {
    if (err & err?.response) {
      yield put({
        type: actions.GET_FORM_FAIL,
        payload: err.response.message + 'ERROR ON RESPONBE',
      });
    }
    yield put({
      type: actions.GET_FORM_FAIL,
      payload: err.message,
    });
  }
}
//sendFormGroup

function* callCreateFormgroupReq(action) {
  try {
    let apiResponse = yield call(sendFormgroupReq, action.id, action.payload);

    let { data } = apiResponse;

    yield put({
      type: actions.SEND_FORMGROUP_SUC,
      payload: data,
    });
    yield ShowMessage(200, 'Form Group added successfully.');
  } catch (err) {
    if (err && err?.response) {
      yield ShowMessage(500, err.reponse.message);
      yield put({
        type: actions.SEND_FORMGROUP_FAIL,
        payload: err.reponse.message,
      });
    }
  }
}

function* callEditFormgroupReq(action) {
  try {
    yield call(editFormgroupReq, action.payload);

    yield ShowMessage(200, 'Form Group edited successfully.');

  } catch (err) {
    yield ShowMessage(200, 'Form Group added successfully.');
  }
}

export function* sendForm() {
  yield takeEvery(actions.SEND_FORM_REQ, callSendFormReq);
}
export function* getForm() {
  yield takeEvery(actions.GET_FORM_GROUP_REQ, callFetchFormReq);
}

export function* sendFormgroup() {
  yield takeEvery(actions.CREATE_FORMGROUP_REQ, callCreateFormgroupReq);
}

export function* editFormgroup() {
  yield takeEvery(actions.EDIT_FORMGROUP_REQ, callEditFormgroupReq);
}

export default function* () {
  return yield all([
    // fork(sendForm),
    fork(getForm),
    fork(sendFormgroup),
    fork(editFormgroup),
  ]);
}
