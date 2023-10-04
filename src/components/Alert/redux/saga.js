import { put, takeEvery, delay, fork, all } from '@redux-saga/core/effects';

import { getErrorMessage } from '../../../helper/ErrorMessageHandler';
import actions from './actions';

function* setAlertMessage(action) {
  const { errorName, status } = action.payload;
  const message = getErrorMessage(errorName);
  yield put({
    type: actions.SET_ALERT_MESSAGE,
    message,
    status
  });
  yield delay(4000)
  yield clearAlertMessage()

}


function* clearAlertMessage() {
  yield put({
    type: actions.CLEAR_ALERT_MESSAGE
  });
}

export function* setAlert() {
  yield takeEvery(actions.SET_ALERT_REQ, setAlertMessage);
}

export function* clearAlert() {
  yield takeEvery(actions.CLEAR_ALERT_REQ, clearAlertMessage)
}

export default function* AlertSaga() {
  return yield all([
    fork(setAlert),
    fork(clearAlert),
  ])
}