import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import { getUserProfile, updateUserProfile } from "../../../../api/fetchUserProfile";
import actions from "./actions";


function* callFetchProfileReq(action) {
    try {
        let apiResponse = yield call(getUserProfile, action.payload);
        let { data, status } = apiResponse;

        yield put({
            type: actions.GET_PROFILE_SUC,
            statusCode: status,
            profiles: data
        });
    } catch (err) {
        if (err && err?.response) {
            yield put({
                type: actions.GET_PROFILE_FAIL,
                payload: err.response.message
            })
        }
        yield put({
            type: actions.GET_PROFILE_FAIL,
            payload: err.message
        });
    }
}

function* callUpdateCategoryReq(action) {
    try {
        let apiResponse = yield call(updateUserProfile, action.payload);
        let { data, status } = apiResponse;

        yield put({
            type: actions.PROFILE_UPDATE_SUCCESS,
            statusCode: status,
            profiles: data
        });
    } catch (err) {
        if (err && err?.response) {
            yield put({
                type: actions.PROFILE_UPDATE_FAIL,
                payload: err.response.message
            })
        }
        yield put({
            type: actions.PROFILE_UPDATE_FAIL,
            payload: err.message
        });
    }
}

export function* updateCategoryReq(action) {
    yield takeEvery(actions.PROFILE_UPDATE_REQ, callUpdateCategoryReq);
}

export function* fetchProfile() {
    yield takeEvery(actions.GET_PROFILE_REQ, callFetchProfileReq);
}



export default function* () {
    return yield all([
        fork(updateCategoryReq),
        fork(fetchProfile),
    ])
}
