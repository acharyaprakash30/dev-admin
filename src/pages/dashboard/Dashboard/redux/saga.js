import { put, call, takeEvery, all, fork } from "redux-saga/effects";
import actions from "./actions";
import { countUserApi, countVendorApi, countBannerApi, countBrandApi, countCategoryApi, countCouponApi, countDealApi, countOrderApi, countShopApi } from 'api/statistics';
import { ordersActiveCountApi, ordersCancelCountApi, ordersDeliveredCountApi, ordersOutForDeliveryCountApi, ordersPaidCountApi, ordersPendingCountApi, ordersProcessingCountApi } from "api/fetchOrder";

function* countUserReq(action) {
    try {
        let apiResponse = yield call(countUserApi, action.payload);
        let { data, status } = apiResponse;
        yield put({
            type: actions.COUNT_USER_SUC,
            statusCode: status,
            payload: data
        });
    } catch (err) {
        yield put({
            type: actions.COUNT_USER_FAIL,
            payload: err.message
        });
    }
}

export function* countUser() {
    yield takeEvery(actions.COUNT_USER, countUserReq);
}

function* countVendorReq(action) {
    try {
        let apiResponse = yield call(countVendorApi, action.payload);
        let { data, status } = apiResponse;
        yield put({
            type: actions.COUNT_VENDOR_SUC,
            statusCode: status,
            payload: data
        });
    } catch (err) {
        yield put({
            type: actions.COUNT_VENDOR_FAIL,
            payload: err.message
        });
    }
}

export function* countVendor() {
    yield takeEvery(actions.COUNT_VENDOR, countVendorReq);
}

function* countCategoryReq(action) {
    try {
        let apiResponse = yield call(countCategoryApi, action.payload);
        let { data, status } = apiResponse;
        yield put({
            type: actions.COUNT_CATEGORY_SUC,
            statusCode: status,
            payload: data
        });
    } catch (err) {
        yield put({
            type: actions.COUNT_CATEGORY_FAIL,
            payload: err.message
        });
    }
}

export function* countCategory() {
    yield takeEvery(actions.COUNT_CATEGORY, countCategoryReq);
}


function* countBrandReq(action) {
    try {
        let apiResponse = yield call(countBrandApi, action.payload);
        let { data, status } = apiResponse;
        yield put({
            type: actions.COUNT_BRAND_SUC,
            statusCode: status,
            payload: data
        });
    } catch (err) {
        yield put({
            type: actions.COUNT_BRAND_FAIL,
            payload: err.message
        });
    }
}

export function* countBrand() {
    yield takeEvery(actions.COUNT_BRAND, countBrandReq);
}


function* countDealReq(action) {
    try {
        let apiResponse = yield call(countDealApi, action.payload);
        let { data, status } = apiResponse;
        yield put({
            type: actions.COUNT_DEAL_SUC,
            statusCode: status,
            payload: data
        });
    } catch (err) {
        yield put({
            type: actions.COUNT_DEAL_FAIL,
            payload: err.message
        });
    }
}

export function* countDeal() {
    yield takeEvery(actions.COUNT_DEAL, countDealReq);
}

function* countCouponReq(action) {
    try {
        let apiResponse = yield call(countCouponApi, action.payload);
        let { data, status } = apiResponse;
        yield put({
            type: actions.COUNT_COUPON_SUC,
            statusCode: status,
            payload: data
        });
    } catch (err) {
        yield put({
            type: actions.COUNT_COUPON_FAIL,
            payload: err.message
        });
    }
}

export function* countCoupon() {
    yield takeEvery(actions.COUNT_COUPON, countCouponReq);
}

function* countOrderReq(action) {
    try {
        let apiResponse = yield call(countOrderApi, action.payload);
        let { data, status } = apiResponse;
        yield put({
            type: actions.COUNT_ORDER_SUC,
            statusCode: status,
            payload: data
        });
    } catch (err) {

        let error = err.error;
        if (error) {
            yield put({
                type: actions.COUNT_ORDER_FAIL,
                payload: error
            });
        }
        else {
            yield put({
                type: actions.COUNT_ORDER_FAIL,
                payload: err
            });
        }
    }
}

export function* countOrder() {
    yield takeEvery(actions.COUNT_ORDER, countOrderReq);
}

function* countShopReq(action) {
    try {
        let apiResponse = yield call(countShopApi, action.payload);
        let { data, status } = apiResponse;
        yield put({
            type: actions.COUNT_SHOP_SUC,
            statusCode: status,
            payload: data
        });
    } catch (err) {
        yield put({
            type: actions.COUNT_SHOP_FAIL,
            payload: err.message
        });
    }
}

export function* countShop() {
    yield takeEvery(actions.COUNT_SHOP, countShopReq);
}

function* countBannerReq(action) {
    try {
        let apiResponse = yield call(countBannerApi, action.payload);
        let { data, status } = apiResponse;
        yield put({
            type: actions.COUNT_BANNER_SUC,
            statusCode: status,
            payload: data
        });
    } catch (err) {
        yield put({
            type: actions.COUNT_BANNER_FAIL,
            payload: err.message
        });
    }
}

export function* countBanner() {
    yield takeEvery(actions.COUNT_BANNER, countBannerReq);
}

function* countActiveOrderReq(action) {
    try {
        let apiResponse = yield call(ordersActiveCountApi, action.payload);
        let { data, status } = apiResponse;
        yield put({
            type: actions.COUNT_ACTIVE_ORDER_SUC,
            statusCode: status,
            payload: data
        });
    } catch (err) {
        yield put({
            type: actions.COUNT_ACTIVE_ORDER_FAIL,
            payload: err.message
        });
    }
}

export function* countActiveOrder() {
    yield takeEvery(actions.COUNT_ACTIVE_ORDER, countActiveOrderReq);
}

function* countDeliveredOrderReq(action) {
    try {
        let apiResponse = yield call(ordersDeliveredCountApi, action.payload);
        let { data, status } = apiResponse;
        yield put({
            type: actions.COUNT_DELIVERED_ORDER_SUC,
            statusCode: status,
            payload: data
        });
    } catch (err) {
        yield put({
            type: actions.COUNT_DELIVERED_ORDER_FAIL,
            payload: err.message
        });
    }
}

export function* countDeliveredOrder() {
    yield takeEvery(actions.COUNT_DELIVERED_ORDER, countDeliveredOrderReq);
}

function* countPendingOrderReq(action) {
    try {
        let apiResponse = yield call(ordersPendingCountApi, action.payload);
        let { data, status } = apiResponse;
        yield put({
            type: actions.COUNT_PENDING_ORDER_SUC,
            statusCode: status,
            payload: data
        });
    } catch (err) {
        yield put({
            type: actions.COUNT_PENDING_ORDER_FAIL,
            payload: err.message
        });
    }
}

export function* countPendingOrder() {
    yield takeEvery(actions.COUNT_PENDING_ORDER, countPendingOrderReq);
}

function* countCancelledOrderReq(action) {
    try {
        let apiResponse = yield call(ordersCancelCountApi, action.payload);
        let { data, status } = apiResponse;
        yield put({
            type: actions.COUNT_CANCELLED_ORDER_SUC,
            statusCode: status,
            payload: data
        });
    } catch (err) {
        yield put({
            type: actions.COUNT_CANCELLED_ORDER_FAIL,
            payload: err.message
        });
    }
}

export function* countCancelledOrder() {
    yield takeEvery(actions.COUNT_CANCELLED_ORDER, countCancelledOrderReq);
}

function* countOutForDeliveryOrderReq(action) {
    try {
        let apiResponse = yield call(ordersOutForDeliveryCountApi, action.payload);
        let { data, status } = apiResponse;
        yield put({
            type: actions.COUNT_OUTFORDELIVERY_ORDER_SUC,
            statusCode: status,
            payload: data
        });
    } catch (err) {
        yield put({
            type: actions.COUNT_OUTFORDELIVERY_ORDER_SUC,
            payload: err.message
        });
    }
}

export function* countOutForDelivery() {
    yield takeEvery(actions.COUNT_OUTFORDELIVERY_ORDER, countOutForDeliveryOrderReq);
}

function* countProcessingOrderReq(action) {
    try {
        let apiResponse = yield call(ordersProcessingCountApi, action.payload);
        let { data, status } = apiResponse;
        yield put({
            type: actions.COUNT_PROCESSING_ORDER_SUC,
            statusCode: status,
            payload: data
        });
    } catch (err) {
        yield put({
            type: actions.COUNT_PROCESSING_ORDER_SUC,
            payload: err.message
        });
    }
}

export function* countProcessingOrder() {
    yield takeEvery(actions.COUNT_PROCESSING_ORDER, countProcessingOrderReq);
}

function* countPaidOrderReq(action) {
    try {
        let apiResponse = yield call(ordersPaidCountApi, action.payload);
        let { data, status } = apiResponse;
        yield put({
            type: actions.COUNT_PAID_ORDER_SUC,
            statusCode: status,
            payload: data
        });
    } catch (err) {
        yield put({
            type: actions.COUNT_PAID_ORDER_SUC,
            payload: err.message
        });
    }
}

export function* countPaidOrder() {
    yield takeEvery(actions.COUNT_PAID_ORDER, countPaidOrderReq);
}

export default function* () {
    return yield all([
        fork(countUser),
        fork(countVendor),
        fork(countCategory),
        fork(countBrand),
        fork(countDeal),
        fork(countCoupon),
        fork(countOrder),
        fork(countShop),
        fork(countBanner),
        fork(countActiveOrder),
        fork(countPendingOrder),
        fork(countCancelledOrder),
        fork(countDeliveredOrder),
        fork(countOutForDelivery),
        fork(countProcessingOrder),
        fork(countPaidOrder),
    ])
}
