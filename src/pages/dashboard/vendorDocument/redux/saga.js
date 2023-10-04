import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import { sendVendorDocReq } from "../../../../api/vendorDocument";
import actions from "./actions";



function* callSendVendorDocReq(action) {
    try {
        let apiResponse = yield call(sendVendorDocReq, action.payload);
        let { data } = apiResponse;

        yield put({
            type: actions.SEND_VENDORDOC_SUC,
            payload: data

        });

    } catch (err) {
        if (err & err?.response) {
            yield put({
                type: actions.SEND_VENDORDOC_FAIL,
                payload: err.response.message
            })
        }
        yield put({
            type: actions.SEND_VENDORDOC_FAIL,
            payload: err.message
        });
    }
}

export function* sendVendorDoc() {
    yield takeEvery(actions.SEND_VENDORDOC_REQ, callSendVendorDocReq);
}

export default function* () {
    return yield all([
        fork(sendVendorDoc),
    ])
}