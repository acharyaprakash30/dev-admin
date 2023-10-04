import { push } from 'connected-react-router';
import {
  all,
  call,
  delay,
  fork,
  put,
  takeLatest
} from 'redux-saga/effects';
import {
  addSideNavApi, deleteSideNavApi, fetchsideNavApi, updateSideNavApi
} from '../../../../api/sideNav';
import ShowMessage from '../../../../components/Toast/Toast';
import actions from './actions';



const LIST_SITENAV = '/dashboard/site-navs';

const DELAY_COUNTER = 250;


/**
 * fetch all side nav
 */
function* callAllSideNav() {

  try {

    let apiResponse = yield call(fetchsideNavApi);

    let { data } = apiResponse;

    yield put({
      type: actions.FETCH_SIDENAV_SUC,
      payload: data,
    });

  } catch (e) {

    if (e && e?.response) {

      yield put({
        type: actions.FETCH_SIDENAV_FAIL,
        message: e.response.data.error.message
      });

    }
  }

}



/**
 * create side nav
 */
function* callCreateSiteNav(action) {

  try {
    const { status } = yield call(addSideNavApi, action.payload);


    const message = "SiteNav Added Successfully";

    yield put({
      type: actions.CREATE_SIDENAV_SUC,
      statusCode: status
    });

    yield put(actions.fetchSideNavRequest());

    yield ShowMessage(status, message);

    yield delay(DELAY_COUNTER);

    yield put(push(LIST_SITENAV));


  } catch (e) {

    if (e && e?.response) {

      yield put({
        type: actions.CREATE_SIDENAV_FAIL,
        message: e.response.data.error.message
      });
    }

  }
}

/**
 * delete side nav
 */
function* callDeleteSiteNav(action) {

  try {

    let { status } = yield call(deleteSideNavApi, action.id);

    const message = "SiteNav Deleted Successfully";

    yield put({
      type: actions.DELETE_SIDENAV_SUC,
      statusCode: status,
      id: action.id
    });

    yield put(actions.fetchSideNavRequest());

    yield ShowMessage(status, message);

    yield delay(DELAY_COUNTER);

    yield put(push(LIST_SITENAV));


  } catch (error) {

    if (error && error.response) {

      yield put({

        type: actions.DELETE_SIDENAV_FAIL,

        message: error.response.data.error.message


      })
    }
  }

}


/**
 * update side nav
 */
function* callUpdateSiteNav(action) {


  try {
    const { status } = yield call(updateSideNavApi, action.id, action.data);


    const message = "SiteNav Updated Successfully";

    yield put({
      type: actions.EDIT_SIDENAV_SUC,
      statusCode: status
    });

    yield put(actions.fetchSideNavRequest());

    yield ShowMessage(status, message);

    yield delay(DELAY_COUNTER);

    yield put(push(LIST_SITENAV));


  } catch (e) {

    if (e && e?.response) {

      yield put({
        type: actions.EDIT_SIDENAV_FAIL,
        message: e.response.data.error.message
      });
    }

  }

}

function* callSearchNavSiteReq(action) {
  try {
    yield delay(400);

    yield put({
      type: actions.SEARCH_SIDENAV_SUC,
      data: action.data,
    });
  } catch (err) {
    yield put({ type: actions.SEARCH_SIDENAV_FAIL });
    yield ShowMessage(400, 'Error occured while searching for category');
  }
}


/**
 * fetch all site Navs
 */
export function* watchFetchAllSiteNav() {
  yield takeLatest(actions.FETCH_SIDENAV_REQ, callAllSideNav);
}

/**
 * create site nav
 */
export function* watchAddSiteNav() {
  yield takeLatest(actions.CREATE_SIDENAV_REQ, callCreateSiteNav);
}


/**
 * delete site nav
 */
export function* watchDeleteSiteNav() {
  yield takeLatest(actions.DELETE_SIDENAV_REQ, callDeleteSiteNav);
}


export function* watchEditSiteNav() {
  yield takeLatest(actions.EDIT_SIDENAV_REQ, callUpdateSiteNav)
}

export function* searchNavSites() {
  yield takeLatest(actions.SEARCH_SIDENAV_REQ, callSearchNavSiteReq);
}




export default function* siteNavSaga() {
  return yield all([
    fork(watchFetchAllSiteNav),
    fork(watchAddSiteNav),
    fork(watchDeleteSiteNav),
    fork(watchEditSiteNav),
    fork(searchNavSites),
  ]);
}
