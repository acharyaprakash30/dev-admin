import { put, call, takeEvery,all,fork } from "redux-saga/effects";
import actions from "./actions";
import {createApi, updateApi, readApi, deleteApi} from 'api/Banner';

import {
    getDealApi,
  } from 'api/fetchDeals';
import ShowMessage from "components/Toast/Toast";
import { history } from "utils";

function* createBannerSaga(action) {
    try {
        let apiResponse = yield call(createApi, action.payload);
        let { data, status, error } = apiResponse;
        yield put({
            type: actions.CREATE_BANNER_SUC,
            statusCode: status,
            payload: data
        });
        history.push('/banners/all');
        history.go(0);
    } catch (error) {
        yield put({
            type: actions.CREATE_BANNER_FAIL,
            payload: error.message
        });
    }
}

function* updateBannerSaga(action) {
    try {
        let apiResponse = yield call(updateApi, action.id, action.payload);
        let { data, status, error } = apiResponse;
        
        yield put({
            type: actions.UPDATE_BANNER_SUC,
            statusCode: status,
            payload: data
        });
        history.push('/banners/all');
        history.go(0);
    } catch (error) {
        yield put({
            type: actions.UPDATE_BANNER_FAIL,
            payload: error.message
        });
    }
}

function* readBannerSaga(action) {
    try {
        let apiResponse = yield call(readApi, action.payload);
        let { data, status, error } = apiResponse;
        yield put({
            type: actions.READ_BANNER_SUC,
            statusCode: status,
            payload: data
        });
    } catch (error) {
        yield put({
            type: actions.READ_BANNER_FAIL,
            payload: error.message
        });
    }
}

function* deleteBannerSaga(action) {
    try {
        let apiResponse = yield call(deleteApi, action.payload);
        let { data, status, error } = apiResponse;
        yield put({
            type: actions.DELETE_BANNER_SUC,
            statusCode: status,
            payload: data
        });
    } catch (error) {
        yield put({
            type: actions.DELETE_BANNER_FAIL,
            payload: error.message
        });
    }
}

function* callFetchDealReq(action) {
    try {
      let apiResponse = yield call(getDealApi, action.payload);
      
      let { data, status } = apiResponse;
      
      yield put({
        type: actions.GET_DEALS_SUC,
        statusCode: status,
        payload: data,
      });
    } catch (err) {
      const error = error;
  
      yield put({
        type: actions.GET_DEALS_FAIL,
        payload: error,
      });
    }
  }

export function* createBanner() {
    yield takeEvery(actions.CREATE_BANNER, createBannerSaga);
}
export function* updateBanner() {
    yield takeEvery(actions.UPDATE_BANNER, updateBannerSaga);
}
export function* readBanner() {
    yield takeEvery(actions.READ_BANNER, readBannerSaga);
}
export function* deleteBanner() {
    yield takeEvery(actions.DELETE_BANNER, deleteBannerSaga);
}
export function* getDeal() {
    yield takeEvery(actions.GET_DEALS_REQ, callFetchDealReq);
  }

export default function* () {
    return yield all([
        fork(createBanner),
        fork(updateBanner),
        fork(readBanner),
        fork(deleteBanner),
        fork(getDeal),
    ])
}
