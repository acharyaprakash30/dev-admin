import { call, put, takeEvery } from "redux-saga/effects";
import { deleteCategoryVariantApi, editCategoryVariantApi, getCategoryVariantApi, postCategoryVariantApi } from "../../../../api/fetchCategoryVariant";
import { getVariantApi } from "../../../../api/fetchVariant";
import ShowMessage from "../../../../components/Toast/Toast";
import { delay } from "../../../../helper/utility";
import actions from "./actions";

function* callFetchCategoryVariantReq(action) {
    try {
        let apiResponse = yield call(getCategoryVariantApi, action.payload);

        let { data, status } = apiResponse;

        yield put({
            type: actions.GET_CATEGORY_VARIANT_SUC,
            statusCode: status,
            categoryVariants: data
        });
    } catch (err) {
        if (err && err?.response) {
            yield put({
                type: actions.GET_VARIANT_FAIL,
                payload: err.reponse.message
            })
        }
        yield put({
            type: actions.GET_VARIANT_FAIL,
            payload: err.message
        });
    }
}

function* callFetchVariantsReq(action) {
    try {
        let apiResponse = yield call(getVariantApi, action.payload);

        let { data, status } = apiResponse;

        yield put({
            type: actions.GET_VARIANT_SUC,
            statusCode: status,
            variants: data
        });
    } catch (err) {
        if (err && err?.response) {
            yield put({
                type: actions.GET_VARIANT_FAIL,
                payload: err.reponse.message
            })
        }
        yield put({
            type: actions.GET_VARIANT_FAIL,
            payload: err.message
        });
    }
}

function* callSendCategoryVariantReq(action) {
    try {
        let apiResponse = yield call(postCategoryVariantApi, action.payload);
        let { status } = apiResponse;
        yield put({
            type: actions.SEND_CATEGORY_VARIANT_SUC,
            statusCode: status,
        });
        delay(1000);
        yield ShowMessage(status, 'Category Variant added successfully.');
        

    } catch (err) {
        if (err && err?.response) {
            yield put({
                type: actions.SEND_CATEGORY_VARIANT_FAIL,
                payload: err.reponse.message
            })
        }
        yield put({
            type: actions.SEND_CATEGORY_VARIANT_FAIL,
            payload: err.message
        });
    }
}
function* callDeleteCategoryVariantReq(action) {
    try {
        let apiResponse = yield call(deleteCategoryVariantApi, action.payload);
        let { data, status } = apiResponse;

        yield put({
            type: actions.DLT_CATEGORY_VARIANT_SUC,
            statusCode: status,
            id: action.payload

        });
        delay(1000);
        yield ShowMessage(status, 'Category Variant deleted successfully.');
    } catch (err) {
        if (err && err?.response) {
            yield put({
                type: actions.DLT_CATEGORY_VARIANT_FAIL,
                payload: err.reponse.message
            })
        }
        yield put({
            type: actions.DLT_CATEGORY_VARIANT_FAIL,
            payload: err.message
        });
    }
}
function* callEditCategoryVariantReq(action) {
    try {

        let apiResponse = yield call(editCategoryVariantApi, action.id, action.data);

        let { data, status } = apiResponse;
        const message = 'Variant edited successfully.';
        yield put({
            type: actions.EDIT_CATEGORY_VARIANT_SUC,
            statusCode: status,

            message
        });
        delay(1000);
        yield ShowMessage(status, message);
    } catch (err) {
        if (err && err?.response) {
            yield put({
                type: actions.EDIT_CATEGORY_VARIANT_FAIL,
                payload: err.reponse.message
            })
        }
        yield put({
            type: actions.EDIT_CATEGORY_VARIANT_FAIL,
            payload: err.message
        });
    }
}

export function* sendVariantsCategory() {
    yield takeEvery(actions.SEND_CATEGORY_VARIANT_REQ, callSendCategoryVariantReq);
}

export function* getVariantsCategory() {
    yield takeEvery(actions.GET_CATEGORY_VARIANT_REQ, callFetchCategoryVariantReq);
}

export function* dltVariantsCategory() {
    yield takeEvery(actions.DLT_CATEGORY_VARIANT_REQ, callDeleteCategoryVariantReq);
}

export function* editVariantsCategory() {
    yield takeEvery(actions.EDIT_CATEGORY_VARIANT_REQ, callEditCategoryVariantReq);
}

export function* getAllVariants() {
    yield takeEvery(actions.GET_VARIANT_REQ, callFetchVariantsReq);
}