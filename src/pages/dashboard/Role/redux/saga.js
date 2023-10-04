import { call, put, takeEvery, all, fork } from 'redux-saga/effects';
import {
  deleteRoleApi,
  editRoleApi,
  getRoleApi,
  postRoleApi,
} from '../../../../api/fetchRole';
import ShowMessage from '../../../../components/Toast/Toast';
import { delay } from '../../../../helper/utility';
import actions from './actions';
import { history } from 'utils';

function* callSendRoleReq(action) {
  try {
    let apiResponse = yield call(postRoleApi, action.payload);

    let { data, status } = apiResponse;

    yield put({
      type: actions.SEND_ROLES_SUC,
      payload: data,
      statusCode: status,
    });
    delay(1000);
    yield ShowMessage(status, 'roles added successfully.');
    history.push('/dashboard/roles');
    history.go(0);
  } catch (err) {
    if (err && err?.response) {
      yield put({
        type: actions.SEND_ROLES_FAIL,
        payload: err.message,
      });
    }

    yield put({
      type: actions.SEND_ROLES_FAIL,
      payload: err.message,
    });
  }
}

function* callSearchLocalRoleRequest(action) {
  try {
    yield delay(400);

    yield put({
      type: actions.SEARCH_ROLE_LOCAL_SUC,
      data: action.data,
    });
  } catch (error) {
    yield put({
      type: actions.SEARCH_ROLE_LOCAL_FAIL,
      data: 'Error occured while searching ROLE',
    });
    yield ShowMessage(400, 'Error occured while searching ROLEs');
  }
}

function* callFetchRoleReq(action) {
  try {
    let apiResponse = yield call(getRoleApi, action.payload);

    let { data, status } = apiResponse;

    yield put({
      type: actions.GET_ROLES_SUC,
      statusCode: status,
      roles: data,
    });
  } catch (err) {
    if (err && err?.response) {
      yield put({
        type: actions.GET_ROLES_FAIL,
        payload: err.response.message,
      });
    }
    yield put({
      type: actions.GET_ROLES_FAIL,
      payload: err.message,
    });
  }
}

function* callDeleteRoleReq(action) {
  try {
    let apiResponse = yield call(deleteRoleApi, action.payload);

    let { status } = apiResponse;

    yield put({
      type: actions.DLT_ROLES_SUC,
      statusCode: status,
      id: action.payload,
    });
    delay(1000);
    yield ShowMessage(status, 'roles deleted successfully.');
  } catch (err) {
    if (err && err?.response) {
      yield put({
        type: actions.DLT_ROLES_FAIL,
        payload: err.response.message,
      });
    }
    yield put({
      type: actions.DLT_ROLES_FAIL,
      payload: err.message,
    });
  }
}
function* callEditRoleReq(action) {
  try {
    let apiResponse = yield call(editRoleApi, action.id, action.data);

    let { status } = apiResponse;
    const message = 'roles edited successfully';
    yield put({
      type: actions.EDIT_ROLES_SUC,
      statusCode: status,
      message,
    });
    delay(1000);
    yield ShowMessage(status, message);
  } catch (err) {
    if (err && err?.response) {
      yield put({
        type: actions.EDIT_ROLES_FAIL,
        payload: err.response.message,
      });
    }
    yield put({
      type: actions.EDIT_ROLES_FAIL,
      payload: err.message,
    });
  }
}

export function* editRole() {
  yield takeEvery(actions.EDIT_ROLES_REQ, callEditRoleReq);
}

export function* fetchRole() {
  yield takeEvery(actions.GET_ROLES_REQ, callFetchRoleReq);
}

export function* sendRole() {
  yield takeEvery(actions.SEND_ROLES_REQ, callSendRoleReq);
}

export function* deleteRole() {
  yield takeEvery(actions.DLT_ROLES_REQ, callDeleteRoleReq);
}

export function* searchLocalRole() {
  yield takeEvery(actions.SEARCH_ROLE_LOCAL_REQ, callSearchLocalRoleRequest);
}

export default function* () {
  return yield all([
    fork(fetchRole),
    fork(sendRole),
    fork(editRole),
    fork(deleteRole),
    fork(searchLocalRole),
  ]);
}
