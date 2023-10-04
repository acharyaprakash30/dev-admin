import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import { fetchOrderApi as getOrder } from "../../../../api/fetchOrder";
import actions from "./actions";


function* callFetchOrderReq(action) {

    try {
        let apiResponse = yield call(getOrder, action.payload);
        let { data } = apiResponse;
        console.warn("Order", data);

        yield put({
            type: actions.GET_ORDER_SUCCESS,
            payload: [...data],
        });
    } catch (err) {
        if (err && err?.response) {
            yield put({
                type: actions.GET_ORDER_FAILED,
                payload: err.reponse.message
            })
        }
        yield put({
            type: actions.GET_ORDER_FAILED,
            payload: err.message
        });
    }
}

export function* fetchOrder() {
    yield takeEvery(actions.GET_ORDER_REQ, callFetchOrderReq);
}


export default function* () {
    return yield all([
        fork(fetchOrder),

    ])
}
