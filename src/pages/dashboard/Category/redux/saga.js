import { push } from 'connected-react-router';
import {
  all,
  call,
  delay,
  fork,
  put,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import { history } from 'utils';
import {
  deleteCategoryApi,
  editCategoryApi,
  fetchFormattedCategory,
  getCategoryApi,
  postCategoryApi,
  countCategoryApi
} from '../../../../api/fetchCategory';
import ShowMessage from '../../../../components/Toast/Toast';
import actions from './actions';

const LIST_CATEGORY_ROUTE = '/dashboard/categories';
const DELAY_COUNTER = 250;

function* callFetchCategoryReq(action) {
  try {
    
    let apiResponse = yield call(getCategoryApi, action.payload);

    let { data, status } = apiResponse;

    yield put({
      type: actions.GET_SINGLE_CATEGORY_SUC,
      statusCode: status,
      categories: data.reverse(),
    });
  } catch (err) {
    if (err && err?.response) {
      yield put({
        type: actions.GET_SINGLE_CATEGORY_FAIL,
        payload: err.reponse.message,
      });
    }
    yield put({
      type: actions.GET_SINGLE_CATEGORY_FAIL,
      payload: err.message,
    });
  }
}
function* callCreateACategory(action) {
  try {
    const { status, data } = yield call(postCategoryApi, action.payload);
    yield put({ type: actions.CREATE_CATEGORY_SUC, statusCode: status, payload: data });
    //Refetch the categories
    yield put(actions.getCategoryReq());
    yield ShowMessage(status, 'Category added successfully.');
    yield delay(DELAY_COUNTER);
    history.push(`/dashboard/categories`);
    history.go(0);
  } catch (err) {
    if (err && err?.response && err.response.message) {
      yield put({
        type: actions.CREATE_CATEGORY_FAIL,
        payload: err.reponse.message,
      });
    }
    yield put({
      type: actions.CREATE_CATEGORY_FAIL,
      payload: err.message,
    });
    yield ShowMessage(400, 'Error occured while adding category');
  }
}
function* callDeleteCategoryReq(action) {
  try {
    const { data, status } = yield call(deleteCategoryApi, action.payload);

    yield put({
      type: actions.DELETE_CATEGORY_SUC,
      statusCode: status,
      id: action.payload,
    });

    yield delay(DELAY_COUNTER);
    yield ShowMessage(status, 'Category deleted successfully.');
  } catch (err) {
    if (err && err?.response) {
      yield put({
        type: actions.DELETE_CATEGORY_FAIL,
        payload: err.reponse.message,
      });
    }
    yield put({
      type: actions.DELETE_CATEGORY_FAIL,
      payload: err.message,
    });
  }
}
function* callEditCategoryReq(action) {
  try {
    const { data, status } = yield call(editCategoryApi, action.id, action.data);

    const message = 'Category edited successfully.';
    yield put({
      type: actions.EDIT_CATEGORY_SUC,
      statusCode: status,
      payload: data,
      message
    });
    yield ShowMessage(status, message);
    yield delay(DELAY_COUNTER);
    yield put(push(LIST_CATEGORY_ROUTE));
  } catch (err) {
    if (err && err?.response) {
      yield put({
        type: actions.EDIT_CATEGORY_FAIL,
        payload: err.reponse.message,
      });
    }
    yield put({
      type: actions.EDIT_CATEGORY_FAIL,
      payload: err.message,
    });
  }
}

function* callSearchCategoryReq(action) {
  try {
    yield delay(400);

    yield put({
      type: actions.SEARCH_CATEGORY_SUC,
      data: action.data,
    });
  } catch (err) {
    yield put({ type: actions.SEARCH_CATEGORY_ERR });
    yield ShowMessage(400, 'Error occured while searching for category');
  }
}

function* callCategoriesTreeReq(action) {
  try {
    const { data } = yield call(fetchFormattedCategory);

    yield put({ type: actions.LIST_CATEGORY_WITH_CHILD_SUC, data });
  } catch (err) {
    yield put({
      type: actions.LIST_CATEGORY_WITH_CHILD_FAIL,
      data: 'Error occured while fetching category tree',
    });
  }
}

function* countCategoriesReq(action){
  try {
    const { data } = yield call(countCategoryApi, action.payload);
    yield put({ type: actions.COUNT_CATEGORIES_SUC, data });
  } catch (err) {
    yield put({
      type: actions.COUNT_CATEGORIES_FAIL,
      data: 'Error Counting Cateogries',
    });
  }
}

export function* addACategory() {
  yield takeLatest(actions.CREATE_CATEGORY_REQ, callCreateACategory);
}

export function* getSingleCategory() {
  yield takeLatest(actions.GET_SINGLE_CATEGORY_REQ, callFetchCategoryReq);
}

export function* deleteACategory() {
  yield takeLatest(actions.DELETE_CATEGORY_REQ, callDeleteCategoryReq);
}

export function* editCategory() {
  yield takeLatest(actions.EDIT_CATEGORY_REQ, callEditCategoryReq);
}

export function* searchCategories() {
  yield takeLatest(actions.SEARCH_CATEGORY_REQ, callSearchCategoryReq);
}

export function* getCategoryTreeList() {
  yield takeLatest(actions.LIST_CATEGORY_WITH_CHILD_REQ, callCategoriesTreeReq);
}
export function* countCategories() {
  yield takeLatest(actions.COUNT_CATEGORIES, countCategoriesReq);
}

export default function* categoriesSaga() {
  return yield all([
    fork(countCategories),
    fork(searchCategories),
    fork(addACategory),
    fork(getSingleCategory),
    fork(deleteACategory),
    fork(editCategory),
    fork(getCategoryTreeList),
  ]);
}
