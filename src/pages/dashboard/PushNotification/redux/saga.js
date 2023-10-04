import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import { createPushNotification,getNotifications,deletePushNotification,editPushNotifications } from "../../../../api/pushNotification";
import actions from "./action";


function* callFetchNotificationReq(action) {
    try {
        let apiResponse = yield call(getNotifications, action.payload);
        let { data, status } = apiResponse;

        yield put({
            type: actions.GET_NOTIFICATION_SUC,
            statusCode: status,
            // profiles: data
        });
    } catch (err) {
        if (err && err?.response) {
            yield put({
                type: actions.GET_NOTIFICATION_FAIL,
                payload: err.response.message
            })
        }
        yield put({
            type: actions.GET_NOTIFICATION_FAIL,
            payload: err.message
        });
    }
}
function* callPostNotificationReq(action) {
    try {
        let apiResponse = yield call(createPushNotification, action.payload);
        let { data, status } = apiResponse;

        yield put({
            type: actions.POST_NOTIFICATION_SUC,
            statusCode: status,
            payload: data
        });
    } catch (err) {
        if (err && err?.response) {
            yield put({
                type: actions.POST_NOTIFICATION_FAIL,
                payload: err.response.message
            })
        }
        yield put({
            type: actions.POST_NOTIFICATION_FAIL,
            payload: err.message
        });
    }
}

function* callUpdateNotificationReq(action) {
    try {
        let apiResponse = yield call(editPushNotifications, action.id,action.payload);
        let { data, status } = apiResponse;

        yield put({
            type: actions.EDIT_NOTIFICATION_SUC,
            statusCode: status,
            profiles: data
        });
    } catch (err) {
        if (err && err?.response) {
            yield put({
                type: actions.EDIT_NOTIFICATION_FAIL,
                payload: err.response.message
            })
        }
        yield put({
            type: actions.EDIT_NOTIFICATION_FAIL,
            payload: err.message
        });
    }
}

export function* updateNotificationReq() {
    yield takeEvery(actions.EDIT_NOTIFICATION_REQ, callUpdateNotificationReq);
}

export function* fetchNotificationReq() {
    yield takeEvery(actions.GET_NOTIFICATION_REQ, callFetchNotificationReq);
}

export function* postNotificationReq() {
    yield takeEvery(actions.POST_NOTIFICATION_REQ, callFetchNotificationReq);
}



export default function* () {
    return yield all([
        fork(updateNotificationReq),
        fork(fetchNotificationReq),
        fork(postNotificationReq),
    ])
}