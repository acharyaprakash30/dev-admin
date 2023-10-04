import { put, call, takeEvery,all,fork } from "redux-saga/effects";
import { getReviewApi, deleteReviewApi} from "../../../../api/fetchReview";

import actions from "./actions";

function* callFetchReviewReq(action) {
    try {
        let apiResponse = yield call(getReviewApi ,action.payload);

        let { data, status } = apiResponse;

        yield put({
            type: actions.GET_REVIEW_SUC,
            statusCode: status,
            reviews: data
        });
    } catch (err) {
        if (err && err?.response) {
            yield put({
                type: actions.GET_REVIEW_FAIL,
                payload: err.reponse.message
            })
        }
        yield put({
            type: actions.GET_REVIEW_FAIL,
            payload: err.message
        });
    }
}
function* callDeleteReviewReq(action) {
    try {
        let apiResponse = yield call(deleteReviewApi ,action.payload);

        let { status } = apiResponse;

        yield put({
            type: actions.DLT_REVIEW_SUC,
            statusCode: status,
            id: action.payload
        });
    } catch (err) {
        if (err && err?.response) {
            yield put({
                type: actions.DLT_REVIEW_FAIL,
                payload: err.reponse.message
            })
        }
        yield put({
            type: actions.DLT_REVIEW_FAIL,
            payload: err.message
        });
    }
}

export function* getReview() {
    yield takeEvery(actions.GET_REVIEW_REQ, callFetchReviewReq);
}
export function* dltReview() {
    yield takeEvery(actions.DLT_REVIEW_REQ,  callDeleteReviewReq);
}

export default function* () {
    return yield all([
        fork(getReview),
        fork(dltReview),
    ])
}