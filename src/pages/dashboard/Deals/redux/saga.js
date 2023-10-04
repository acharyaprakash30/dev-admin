import React from 'react';
import { put, call, takeEvery, fork, all, delay } from 'redux-saga/effects';
import {
  postDealApi,
  getDealApi,
  deleteDealApi,
  updateDealApi,
} from '../../../../api/fetchDeals';
import { push } from 'react-router-redux';
import ShowMessage from '../../../../components/Toast/Toast';
import actions from './actions';
import { history } from 'utils';

function* callFetchDealReq(action) {
  try {
    let apiResponse = yield call(getDealApi, action.payload);

    let { data, status } = apiResponse;

    yield put({
      type: actions.GET_DEALS_SUC,
      statusCode: status,
      deals: data.deals,
    });
  } catch (err) {
    const {
      response: {
        data: { error },
      },
    } = err;

    yield put({
      type: actions.GET_DEALS_FAIL,
      payload: error,
    });

    yield ShowMessage(error.statusCode, error.message);
  }
}

function* callSendDealReq(action) {
  try {
    let apiResponse = yield call(postDealApi, action.payload);

    let { data, status } = apiResponse;

    yield put({
      type: actions.SEND_DEALS_SUC,
      payload: data,
    });
    history.push('/dashboard/deals');
    history.go(0);

    yield ShowMessage(status, 'Deals created successfully.');
  } catch (err) {
    const {
      response: {
        data: { error },
      },
    } = err;

    yield put({
      type: actions.SEND_DEALS_FAIL,
      payload: error,
    });

    yield ShowMessage(error.statusCode, error.message);
  }
}

function* callSearchLocalDealRequest(action) {
  try {
    yield delay(400);

    yield put({
      type: actions.SEARCH_DEALS_LOCAL_SUC,
      data: action.data,
    });
  } catch (error) {
    yield put({
      type: actions.SEARCH_DEALS_LOCAL_FAIL,
      data: 'Error occured while searching Deals',
    });
    yield ShowMessage(400, 'Error occured while searching Deals');
  }
}

function* callUpdateDealReq(action) {
  try {
    let apiResponse = yield call(updateDealApi, action.payload, action.id);

    let { data, status } = apiResponse;

    yield put({
      type: actions.UPDATE_DEALS_SUC,
      payload: data,
    });
    yield ShowMessage(status, 'Deals Updated successfully.');
    history.push('/dashboard/deals');
    history.go(0);
  } catch (err) {
    const {
      response: {
        data: { error },
      },
    } = err;

    yield put({
      type: actions.UPDATE_DEALS_FAIL,
      payload: error,
    });

    yield ShowMessage(error.statusCode, error.message);
  }
}

function* callDeleteDealReq(action) {
  try {
    let apiResponse = yield call(deleteDealApi, action.payload);

    let { status } = apiResponse;

    yield put({
      type: actions.DLT_DEALS_SUC,
      statusCode: status,
      id: action.payload,
    });
  } catch (err) {
    if (err && err?.response) {
      yield put({
        type: actions.DLT_DEALS_FAIL,
        payload: err.reponse.message,
      });
    }
    yield put({
      type: actions.DLT_DEALS_FAIL,
      payload: err.message,
    });
  }
}

export function* sendDeal() {
  yield takeEvery(actions.SEND_DEALS_REQ, callSendDealReq);
}
export function* getDeal() {
  yield takeEvery(actions.GET_DEALS_REQ, callFetchDealReq);
}

export function* dltDeal() {
  yield takeEvery(actions.DLT_DEALS_REQ, callDeleteDealReq);
}

export function* updateDeal() {
  yield takeEvery(actions.UPDATE_DEALS_REQ, callUpdateDealReq);
}

export function* searchLocalDeals() {
  yield takeEvery(actions.SEARCH_DEALS_LOCAL_REQ, callSearchLocalDealRequest);
}

export default function* () {
  return yield all([
    fork(sendDeal),
    fork(getDeal),
    fork(dltDeal),
    fork(updateDeal),
    fork(searchLocalDeals),
  ]);
}
