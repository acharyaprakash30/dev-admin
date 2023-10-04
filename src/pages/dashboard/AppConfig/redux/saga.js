import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import { postPageDataApi, postAppSettingApi, getAppSettingApi, editAppSettingApi, deleteAppSettingApi, getSingleAppSettingApi } from "../../../../api/appConfig";
import ShowMessage from '../../../../components/Toast/Toast';
import { delay } from '../../../../helper/utility';
import actions from "./actions";

function* callAddASetting(action) {
    try {
        let apiResponse = yield call(postAppSettingApi, action.payload);

        let { status } = apiResponse;

        yield put({
            type: actions.SEND_APPSETTING_SUC,
            statusCode: status,
        });
        delay(1000);
        yield ShowMessage(status, 'App Config added successfully.');
    } catch (err) {
        if (err && err?.response) {
            yield put({
                type: actions.SEND_APPSETTING_FAIL,
                payload: err.response.message
            })
        }
        yield put({
            type: actions.SEND_APPSETTING_FAIL,
            payload: err.message
        });
    }
}

function* callEditAppSetting(action) {
    try {
        let apiResponse = yield call(editAppSettingApi, action.id, action.data);
        let apiRequest = yield call(getSingleAppSettingApi, action.id)

        let { status } = apiResponse;
        const message = 'App Config edited successfully.';

        yield put({
            type: actions.EDIT_APPSETTING_SUC,
            statusCode: status,
            data: apiRequest.data,
            message
        });
        delay(1000);
        yield ShowMessage(status, message);

    } catch (err) {
        if (err && err?.response) {
            yield put({
                type: actions.EDIT_APPSETTING_FAIL,
                payload: err.response.message
            })
        }
        yield put({
            type: actions.EDIT_APPSETTING_FAIL,
            payload: err.message
        });
    }
}

function* callFetchAppSetting(action) {
    try {
        let apiResponse = yield call(getAppSettingApi, action.payload);

        let { data, status } = apiResponse;

        yield put({
            type: actions.GET_APPSETTING_SUC,
            statusCode: status,
            appSettings: data
        });

    } catch (err) {
        if (err && err?.response) {
            yield put({
                type: actions.GET_APPSETTING_FAIL,
                payload: err.response.message
            })
        }
        yield put({
            type: actions.GET_APPSETTING_FAIL,
            payload: err.message
        });
    }
}

function* callDeleteAppSetting(action) {
    try {
        let apiResponse = yield call(deleteAppSettingApi, action.payload);

        let { status } = apiResponse;

        yield put({
            type: actions.DLT_APPSETTING_SUC,
            statusCode: status,
            id: action.payload
        });
        delay(1000);
        yield ShowMessage(status, 'AppSetting deleted successfully.');

    } catch (err) {
        if (err && err?.response) {
            yield put({
                type: actions.DLT_APPSETTING_FAIL,
                payload: err.response.message
            })
        }
        yield put({
            type: actions.DLT_APPSETTING_FAIL,
            payload: err.message
        });
    }
}

function* callSendPagesData(action) {

    try {
        let apiResponse = yield call(postPageDataApi, action.payload);

        let { status } = apiResponse;

        yield put({
            type: actions.SEND_PAGESDATA_SUC,
            statusCode: status,

        });
        delay(1000);
        yield ShowMessage(status, 'PageData added successfully.');
    } catch (err) {
        if (err && err?.response) {
            yield put({
                type: actions.SEND_PAGESDATA_FAIL,
                payload: err.response.message
            })
        }
        yield put({
            type: actions.SEND_PAGESDATA_FAIL,
            payload: err.message
        });
    }


}



export function* sendAppSetting() {
    yield takeEvery(actions.SEND_APPSETTING_REQ, callAddASetting);
}
export function* getAppSetting() {
    yield takeEvery(actions.GET_APPSETTING_REQ, callFetchAppSetting);
}

export function* editAppSetting() {
    yield takeEvery(actions.EDIT_APPSETTING_REQ, callEditAppSetting)
}

export function* deleteAppSetting() {
    yield takeEvery(actions.DLT_APPSETTING_REQ, callDeleteAppSetting);
}

export function* sendPagesData() {
    yield takeEvery(actions.SEND_PAGESDATA_REQ, callSendPagesData);
}

export default function* () {
    return yield all([
        fork(editAppSetting),
        fork(sendPagesData),
        fork(deleteAppSetting),
        fork(getAppSetting),
        fork(sendAppSetting)
    ])
}