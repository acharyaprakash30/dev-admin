import {
  addNewMunicipality,
  addNewMunicipalityApi,
  addNewWard,
  deleteMunicipalityApi,
  deleteWardApi,
  districtPatch,
  getAreas,
  getDistrict,
  getMunicipality,
  getProvinces,
  municipalityPatch,
  provincePatch,
  wardBulkPatch,
} from 'api/shipping';
import { call, put, takeEvery, all, fork } from 'redux-saga/effects';
import ShowMessage from '../../../../components/Toast/Toast';
import { delay } from '../../../../helper/utility';
import actions from './actions';

function* callFetchProvinceReq(action) {
  try {
    let apiResponse = yield call(getProvinces, action.payload);
    let { data, status } = apiResponse;
    yield put({
      type: actions.GET_PROVINCE_SUC,
      statusCode: status,
      data: data,
    });
  } catch (err) {
    if (err & err?.response) {
      yield put({
        type: actions.GET_PROVINCE_FAIL,
        payload: err.response.message,
      });
    }
    yield put({
      type: actions.GET_PROVINCE_FAIL,
      payload: err.message,
    });
  }
}

function* callEditProvinceReq(action) {
  try {
    let apiResponse = yield call(provincePatch, action.data, action.id);

    let { status } = apiResponse;
    const message = 'Province edited successfully.';
    yield put({
      type: actions.EDIT_PROVINCE_SUC,
      id: action.id,
    });
    delay(1000);
    yield ShowMessage(status, message);
  } catch (err) {
    if (err && err?.response) {
      yield put({
        type: actions.EDIT_PROVINCE_FAIL,
        payload: err.response.message,
      });
      yield ShowMessage(422, err.response.message || 'Error occured');
    }
    yield put({
      type: actions.EDIT_PROVINCE_FAIL,
      payload: err.message,
    });
    yield ShowMessage(422, err.message || 'Error Occured');
  }
}

function* callFetchDistrictReq(action) {
  try {
    let apiResponse = yield call(getDistrict, action.payload);
    let { data, status } = apiResponse;

    yield put({
      type: actions.GET_DISTRICT_SUC,
      statusCode: status,
      data: data,
    });
  } catch (err) {
    if (err & err?.response) {
      yield put({
        type: actions.GET_DISTRICT_FAIL,
        payload: err.response.message,
      });
    }
    yield put({
      type: actions.GET_DISTRICT_FAIL,
      payload: err.message,
    });
  }
}

function* callEditDistrictReq(action) {
  try {
    let apiResponse = yield call(districtPatch, action.data, action.id);

    let { status } = apiResponse;
    const message = 'District edited successfully.';
    yield put({
      type: actions.EDIT_DISTRICT_SUC,
      id: action.id,
    });
    delay(1000);
    yield ShowMessage(status, message);
  } catch (err) {
    if (err && err?.response) {
      yield put({
        type: actions.EDIT_DISTRICT_FAIL,
        payload: err.response.message,
      });
      yield ShowMessage(422, err.response.message || 'Error occured');
    }
    yield put({
      type: actions.EDIT_DISTRICT_FAIL,
      payload: err.message,
    });
    yield ShowMessage(422, err.message || 'Error Occured');
  }
}

function* callFetchMunicipalityReq(action) {
  try {
    let apiResponse = yield call(getMunicipality, action.payload);
    let { data, status } = apiResponse;
    yield put({
      type: actions.GET_MUNICIPALITY_SUC,
      statusCode: status,
      data: data?.data,
      count: data.count,
    });
  } catch (err) {
    if (err & err?.response) {
      yield put({
        type: actions.GET_MUNICIPALITY_FAIL,
        payload: err.response.message,
      });
    }
    yield put({
      type: actions.GET_MUNICIPALITY_FAIL,
      payload: err.message,
    });
  }
}

function* callEditMunicipalityReq(action) {
  try {
    let apiResponse = yield call(municipalityPatch, action.data, action.id);

    let { status } = apiResponse;
    const message = 'Municipality edited successfully.';
    yield put({
      type: actions.EDIT_MUNICIPALITY_SUC,
      id: action.id,
    });
    delay(1000);
    yield ShowMessage(status, message);
  } catch (err) {
    if (err && err?.response) {
      yield put({
        type: actions.EDIT_MUNICIPALITY_FAIL,
        payload: err.response.message,
      });
      yield ShowMessage(422, err.response.message || 'Error occured');
    }
    yield put({
      type: actions.EDIT_MUNICIPALITY_FAIL,
      payload: err.message,
    });
    yield ShowMessage(422, err.message || 'Error Occured');
  }
}

function* callFetchAreaReq(action) {
  try {
    let apiResponse = yield call(getAreas, action.payload);
    let { data, status } = apiResponse;
    yield put({
      type: actions.GET_AREAS_SUC,
      statusCode: status,
      data: data?.data,
      count: data.count,
    });
  } catch (err) {
    if (err & err?.response) {
      yield put({
        type: actions.GET_AREAS_FAIL,
        payload: err.response.message,
      });
    }
    yield put({
      type: actions.GET_AREAS_FAIL,
      payload: err.message,
    });
  }
}

function* callEditBulkWardReq(action) {
  try {
    let apiResponse = yield call(wardBulkPatch, action.data);

    let { status, data } = apiResponse;
    console.log(data);
    const message = 'Wards edited successfully.';
    yield put({
      type: actions.EDIT_AREAS_SUC,
      id: action.id,
    });
    delay(1000);
    yield ShowMessage(status, message);
  } catch (err) {
    if (err && err?.response) {
      yield put({
        type: actions.EDIT_AREAS_FAIL,
        payload: err.response.message,
      });
      yield ShowMessage(422, err.response.message || 'Error occured');
    }
    yield put({
      type: actions.EDIT_AREAS_FAIL,
      payload: err.message,
    });
    yield ShowMessage(422, err.message || 'Error Occured');
  }
}

function* callDeleteWardReq(action) {
  try {
    let apiResponse = yield call(deleteWardApi, action.id);

    let { status, data } = apiResponse;
    const message = 'Wards delete successfully.';
    yield put({
      type: actions.DEL_AREA_SUC,
      id: action.id,
    });
    delay(1000);
    yield ShowMessage(status, message);
  } catch (err) {
    if (err && err?.response) {
      yield put({
        type: actions.DEL_AREA_FAIL,
        payload: err.response.message,
      });
      yield ShowMessage(422, err.response.message || 'Error occured');
    }
    yield put({
      type: actions.DEL_AREA_FAIL,
      payload: err.message,
    });
    yield ShowMessage(422, err.message || 'Error Occured');
  }
}

function* callAddWardReq(action) {
  try {
    let apiResponse = yield call(addNewWard, action.data);

    let { data, status } = apiResponse;
    const message = 'Ward added successfully.';
    yield put({
      type: actions.ADD_AREA_SUC,
      data,
    });
    delay(1000);
    yield ShowMessage(status, message);
  } catch (err) {
    if (err && err?.response) {
      yield put({
        type: actions.ADD_AREA_FAIL,
        payload: err.response.message,
      });
      yield ShowMessage(422, err.response.message || 'Error occured');
    }
    yield put({
      type: actions.ADD_AREA_FAIL,
      payload: err.message,
    });
    yield ShowMessage(422, err.message || 'Error Occured');
  }
}

function* callAddMunicipality(action) {
  try {
    let apiResponse = yield call(addNewMunicipalityApi, action.data);

    let { data, status } = apiResponse;
    const message = 'Municipality added successfully.';
    yield put({
      type: actions.ADD_MUNICIPALITY_SUC,
      data,
    });
    delay(1000);
    yield ShowMessage(status, message);
  } catch (err) {
    if (err && err?.response) {
      yield put({
        type: actions.ADD_MUNICIPALITY_FAIL,
        payload: err.response.message,
      });
      yield ShowMessage(422, err.response.message || 'Error occured');
    }
    yield put({
      type: actions.ADD_MUNICIPALITY_FAIL,
      payload: err.message,
    });
    yield ShowMessage(422, err.message || 'Error Occured');
  }
}

function* callDeleteMunicipalityReq(action) {
  try {
    let apiResponse = yield call(deleteMunicipalityApi, action.id);

    let { status, data } = apiResponse;
    const message = 'Municipality delete successfully.';
    yield put({
      type: actions.DEL_MUNICIPALITY_SUC,
      id: action.id,
    });
    delay(1000);
    yield ShowMessage(status, message);
  } catch (err) {
    if (err && err?.response) {
      yield put({
        type: actions.DEL_MUNICIPALITY_FAIL,
        payload: err.response.message,
      });
      yield ShowMessage(422, err.response.message || 'Error occured');
    }
    yield put({
      type: actions.DEL_MUNICIPALITY_FAIL,
      payload: err.message,
    });
    yield ShowMessage(422, err.message || 'Error Occured');
  }
}

export function* fetchProvince() {
  yield takeEvery(actions.GET_PROVINCE_REQ, callFetchProvinceReq);
}

export function* editProvince() {
  yield takeEvery(actions.EDIT_PROVINCE_REQ, callEditProvinceReq);
}

export function* fetchDistrict() {
  yield takeEvery(actions.GET_DISTRICT_REQ, callFetchDistrictReq);
}

export function* editDistrict() {
  yield takeEvery(actions.EDIT_DISTRICT_REQ, callEditDistrictReq);
}

export function* fetchMunicipality() {
  yield takeEvery(actions.GET_MUNICIPALITY_REQ, callFetchMunicipalityReq);
}

export function* fetchArea() {
  yield takeEvery(actions.GET_AREAS_REQ, callFetchAreaReq);
}

export function* editAreasReq() {
  yield takeEvery(actions.EDIT_AREAS_REQ, callEditBulkWardReq);
}

export function* editMunicipality() {
  yield takeEvery(actions.EDIT_MUNICIPALITY_REQ, callEditMunicipalityReq);
}

export function* deleteWard() {
  yield takeEvery(actions.DEL_AREA_REQ, callDeleteWardReq);
}

export function* addArea() {
  yield takeEvery(actions.ADD_AREA_REQ, callAddWardReq);
}

export function* addMunicipality() {
  yield takeEvery(actions.ADD_MUNICIPALITY_REQ, callAddMunicipality);
}

export function* deleteMunicipality() {
  yield takeEvery(actions.DEL_MUNICIPALITY_REQ, callDeleteMunicipalityReq);
}

export default function* () {
  return yield all([
    fork(fetchProvince),
    fork(editProvince),
    fork(fetchDistrict),
    fork(editDistrict),
    fork(fetchMunicipality),
    fork(editMunicipality),
    fork(fetchArea),
    fork(editAreasReq),
    fork(deleteWard),
    fork(addArea),
    fork(addMunicipality),
    fork(deleteMunicipality)
  ]);
}
