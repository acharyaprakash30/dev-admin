import { put, fork, call, all, takeEvery, take } from 'redux-saga/effects';
import { fetchUser as getUser } from '../../../api/fetchUser';

import actions from './actions';

function* callFetchUserReq (action) {
    try {
        let apiResponse = yield call(getUser, action.payload);
        let {data} = apiResponse;
        console.warn("User", data);

        yield put({
            type: actions.GET_USER_SUCCESS,
            payload: [...data],
        });
    } catch (err) {
        if (err && err?.response) {
            yield put({
                type: actions.GET_USER_FAILED,
                payload: err.response.message
            })
        }
        yield put({
            type: actions.GET_USER_FAILED,
            payload: err.message
        });
    }
}


export function* fetchUser () {
    yield takeEvery(actions.GET_USER_REQ, callFetchUserReq);
}


