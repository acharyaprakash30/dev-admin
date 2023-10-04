import { push } from 'connected-react-router';
import {
  all, call, delay, fork,
  put, takeEvery, takeLatest
} from 'redux-saga/effects';
import {
  getPlaceHolderGroupsApi,
  addPlaceHolderGroupApi,
  deletePlaceHolderGroupApi,
  updatePlaceHolderGroupApi
} from '../../../../api/placeholders';
import { getSinglePlaceHolderGroupsApi } from '../../../../api/placeholders/placeholder-group';
import { addPlaceholderItem } from '../../../../api/placeholderItems/placeholderItems'

import ShowMessage from '../../../../components/Toast/Toast';
import actions from './actions';
import placeholderItemActions from '../../PlaceholderItems/redux/actions'

const LIST_PLACEHOLDER_GROUP_ROUTE = '/dashboard/placeholders';
const DELAY_COUNTER = 250;





function* callFetchPlaceholdeGroups() {
  try {
    let apiResponse = yield call(getPlaceHolderGroupsApi);

    let { status, data } = apiResponse;

    yield put({
      type: actions.FETCH_PLACEHOLDER_GROUP_SUC,
      statusCode: status,
      placeholders: data,
    });

  } catch (err) {

    if (err && err?.response.data) {
      yield put({
        type: actions.FETCH_PLACEHOLDER_GROUP_FAIL,
        payload: err.reponse.data.error.message,
      });
    }
  }
}


function* callAddPlaceholderGroup(action) {

  try {

    let { status } = yield call(addPlaceHolderGroupApi, action.payload);

    const message = "Placeholder Group Added Successfully";


    yield put({
      type: actions.CREATE_PLACEHOLDER_GROUP_SUC,
      statusCode: status
    });

    yield put(actions.getPlaceholderReq());

    yield ShowMessage(status, message);

    yield delay(DELAY_COUNTER);

    yield put(push(LIST_PLACEHOLDER_GROUP_ROUTE));


  } catch (error) {



    if (error && error.response) {

      yield put({

        type: actions.CREATE_PLACEHOLDER_GROUP_FAIL,

        message: error.response.data.error.message


      })


    }


  }
}


function* callfetchUpdatePlaceholderGroups(action) {


  try {

    let { status } = yield call(updatePlaceHolderGroupApi, action.id, action.data);

    const message = "Placeholder Group Updated Successfully";


    yield put({
      type: actions.EDIT_PLACEHOLDER_GROUP_SUC,
      statusCode: status
    });


    yield put(actions.getPlaceholderReq());

    yield ShowMessage(status, message);

    yield delay(DELAY_COUNTER);

    yield put(push(LIST_PLACEHOLDER_GROUP_ROUTE));





  } catch (error) {



    if (error && error.response) {

      yield put({

        type: actions.EDIT_PLACEHOLDER_GROUP_FAIL,

        message: error.response.data.error.message


      })


    }


  }

}

function* callCurrentPlaceholderGroup(action) {

  try {

    let { status } = yield call(deletePlaceHolderGroupApi, action.payload);

    const message = "Placeholder Group Deleted Successfully";


    yield put({
      type: actions.DELETE_PLACEHOLDER_GROUP_SUC,
      statusCode: status,
      id: action.payload
    });

    yield ShowMessage(status, message);

    yield delay(DELAY_COUNTER);

    yield put(push(LIST_PLACEHOLDER_GROUP_ROUTE));



  } catch (error) {



    if (error && error.response) {

      yield put({

        type: actions.DELETE_PLACEHOLDER_GROUP_FAIL,

        message: error.response.data.error.message


      })


    }


  }
}

function* callSearchPlaceholderReq(action) {

  try {
    yield delay(400);

    yield put({
      type: actions.SEARCH_PLACEHOLDER_GROUP_SUC,
      data: action.data,
    });
  } catch (err) {
    yield put({ type: actions.SEARCH_PLACEHOLDER_GROUP_FAIL });
    yield ShowMessage(400, 'Error occured while searching for placeholders');
  }

}


function* callSinglePlaceHolder(action) {
  try {
    const { data } = yield call(getSinglePlaceHolderGroupsApi, action.id);
    yield put({
      type: actions.GET_SINGLE_PLACEHOLDER_GROUP_SUC,
      payload: data
    });

  } catch (e) {
    yield put({
      type: actions.GET_SINGLE_PLACEHOLDER_GROUP_FAIL
    });

  }
}


function* callCreatePlaceholderItems(action) {

  // console.log('placeholder items:  >>> ', action.data);

  try {
    const { status } = yield call(addPlaceholderItem, action.data);


    const message = "PlaceholderItem Added Successfully";

    yield put({
      type: actions.CREATE_PLACEHOLDER_ITEMS_SUC,
      statusCode: status
    });



    yield put(placeholderItemActions.singlePlaceholderItemsRequest(action.data.placeholderId));

    yield ShowMessage(status, message);

    yield delay(DELAY_COUNTER);

    yield put(push(`/dashboard/placeholder/${action.data.placeholderId}/show`));


  } catch (e) {

    if (e && e?.response) {

      yield put({
        type: actions.CREATE_PLACEHOLDER_ITEMS_FAIL,
        message: e.response.data.error.message
      });
    }

  }
}


export function* watchfetchAllPlaceholderGroup() {

  yield takeLatest(actions.FETCH_PLACEHOLDER_GROUP_REQ, callFetchPlaceholdeGroups);

}


export function* watchFetchCurrentPlaceholderGroup() {

  yield takeLatest(actions.DELETE_PLACEHOLDER_GROUP_REQ, callCurrentPlaceholderGroup);
}


export function* watchaddPlaceholderGroupData() {

  yield takeLatest(actions.CREATE_PLACEHOLDER_GROUP_REQ, callAddPlaceholderGroup);


}

export function* watchUpdatePlaceholderGroupData() {

  yield takeLatest(actions.EDIT_PLACEHOLDER_GROUP_REQ, callfetchUpdatePlaceholderGroups);
}

export function* searchPlaceholders() {
  yield takeLatest(actions.SEARCH_PLACEHOLDER_GROUP_REQ, callSearchPlaceholderReq);
}

export function* getSinglePlaceholder() {
  yield takeLatest(actions.GET_SINGLE_PLACEHOLDER_GROUP_REQ, callSinglePlaceHolder)
}




// Placeholder Items
export function* addPlaceholderItems() {
  yield takeLatest(actions.CREATE_PLACEHOLDER_ITEMS_REQ, callCreatePlaceholderItems)
}


export default function* placeholderGrpSaga() {
  return yield all([
    fork(watchfetchAllPlaceholderGroup),
    fork(watchFetchCurrentPlaceholderGroup),
    fork(watchaddPlaceholderGroupData),
    fork(watchUpdatePlaceholderGroupData),
    fork(getSinglePlaceholder),
    fork(addPlaceholderItems),
    fork(searchPlaceholders)
  ]);
}
