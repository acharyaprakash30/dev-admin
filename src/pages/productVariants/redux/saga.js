import {
  all,
  call,
  fork,
  put,
  takeEvery,
  takeLatest,
  delay,
} from 'redux-saga/effects';
import {
  deleteVariantApi,
  fetchVariantAttributeApi,
  fetchVariantColorApi,
  postVariantApi,
  fetchProductVariantApi,
  postVariantBulkApi
} from '../../../api/fetchVariant';
import ShowMessage from '../../../components/Toast/Toast';
import variantActions from './actions';
import progressAction from '../../../components/ProgressModal/Redux/actions';
import history from '../../../app/history';
import { getVariantList } from 'utils';

function* getVariantColorReq() {
  try {
    const { data } = yield call(fetchVariantColorApi);
    yield put({
      type: variantActions.GET_VARIANT_COLOR_SUC,
      colors: data,
    });
  } catch (error) {
    yield put({
      type: variantActions.GET_VARIANT_COLOR_FAIL,
    });
    ShowMessage(error.status, `couldn't fetch colors.`);
  }
}

function* fetchProductVariantReq(action) {
  try {
    const { data } = yield call(fetchProductVariantApi, action.id);
    // const finalData = data.map((value) => {
    //   return {  };
    // });
    let finalData = yield getVariantList(data?.adminProductVariants);
    yield put({
      type: variantActions.FETCH_PRODUCT_VARIANT_SUC,
      productVariant: finalData,
    });
  } catch (error) {
    yield put({
      type: variantActions.FETCH_PRODUCT_VARIANT_FAIL,
    });
  }
}

function* getVariantAttributeReq(action) {
  try {
    const { data } = yield call(fetchVariantAttributeApi, action.id);
    yield put({
      type: variantActions.GET_VARIANT_ATTRIBUTES_SUC,
      attributes: data,
    });
  } catch (error) {
    yield put({
      type: variantActions.GET_VARIANT_ATTRIBUTES_FAIL,
    });
    ShowMessage(error.status, `couldn't fetch Attributes.`);
  }
}

function* addSelectedColorReq(action) {
  yield put({
    type: variantActions.ADD_SELECTED_COLOR,
    payload: action.payload,
  });
  yield put({
    type: variantActions.GENERATE_COMBINATION,
    id: action.id
  });
}

function* removeSelectedColorReq(action) {
  yield put({
    type: variantActions.REMOVE_SELECTED_COLOR,
    payload: action.payload,
  });
  yield put({
    type: variantActions.GENERATE_COMBINATION,
  });
}

function* addSelectedAttributeReq(action) {
  yield put({
    type: variantActions.ADD_SELECTED_ATTRIBUTE,
    payload: action.payload,
  });
  yield put({
    type: variantActions.GENERATE_COMBINATION,
    id: action.id

  });
}

function* removeSelectedAttributeReq(action) {
  yield put({
    type: variantActions.REMOVE_SELECTED_ATTRIBUTE,
    payload: action.payload,
  });
  yield put({
    type: variantActions.GENERATE_COMBINATION,
  });
}

function* handleSelectedAttributeReq(action) {
  yield put({
    type: variantActions.HANDLE_SELECTED_ATTRIBUTE,
    payload: action.payload,
    id: action.id
  });
  yield put({
    type: variantActions.GENERATE_COMBINATION,
    id: action.id
  });
}

function* handleDeselectedAttributeReq(action) {
  yield put({
    type: variantActions.HANDLE_DESELECTED_ATTRIBUTE,
    payload: action.payload,
  });
  yield put({
    type: variantActions.GENERATE_COMBINATION,

  });
}

function* deleteProductVariantReq(action) {
  try {
    const { status } = yield call(deleteVariantApi, action.payload);
    yield put({
      type: variantActions.DELETE_PRODUCT_VARIANT_SUC,
      payload: action.payload,
    });
    yield ShowMessage(status, 'Deleted Successfully 🎉');
  } catch (error) {
    yield put({
      type: variantActions.DELETE_PRODUCT_VARIANT_FAIL,
    });
    ShowMessage(error.status, 'Deletion failed');
  }
}

function* editProductVariantReq(action) {
  try {
    // let api; // for bulk and single object variant request
    // if (action.data.length > 1) {
    //   api = postVariantBulkApi
    // }
    // else {
    //   api = postVariantApi
    // }
    let apiResponse = yield call(
      postVariantApi,
      action.data.length ? action.data[0] : { "stock": 0, "price": 0 },
      // action.data
    );
    const message = 'Product Published Successfully.'
    yield put({
      type: variantActions.EDIT_PRODUCT_VARIANT_SUC,
      payload: apiResponse?.data,
      message,
    });
    // yield put({
    //   type: progressAction.SET_PROGRESS_PERCENTAGE,
    //   percentage: 100,
    //   status: 'active',
    // });
    // yield delay(2000);
    yield put({
      type: progressAction.SET_SHOW_MODAL,
      payload: false,
    });
    delay(2000);
    ShowMessage(200, message);
    history.push('/dashboard/viewProducts'); // pushing to view product 
    history.go(0);
  } catch (error) {
    const message = 'Update failed.';
    yield put({
      type: variantActions.EDIT_PRODUCT_VARIANT_FAIL,
      // status,
      message,
    });
    yield put({
      type: progressAction.SET_PROGRESS_PERCENTAGE,
      percentage: 100,
      status: 'exception',
    });
    ShowMessage(404, message);
  }
}

export function* editProductVariant() {
  yield takeLatest(
    variantActions.EDIT_PRODUCT_VARIANT_REQ,
    editProductVariantReq,
  );
}

function* deleteProductVariant() {
  yield takeLatest(
    variantActions.DELETE_PRODUCT_VARIANT_REQ,
    deleteProductVariantReq,
  );
}

function* handleSelectedAttribute() {
  yield takeEvery(
    variantActions.HANDLE_SELECTED_ATTRIBUTE_REQ,
    handleSelectedAttributeReq,
  );
}

function* handleDeselectedAttribute() {
  yield takeEvery(
    variantActions.HANDLE_DESELECTED_ATTRIBUTE_REQ,
    handleDeselectedAttributeReq,
  );
}

function* addSelectedColor() {
  yield takeEvery(variantActions.ADD_SELECTED_COLOR_REQ, addSelectedColorReq);
}
function* removeSelectedColor() {
  yield takeEvery(
    variantActions.REMOVE_SELECTED_COLOR_REQ,
    removeSelectedColorReq,
  );
}
function* addSelectedAttribute() {
  yield takeEvery(
    variantActions.ADD_SELECTED_ATTRIBUTE_REQ,
    addSelectedAttributeReq,
  );
}

function* removeSelectedAttribute() {
  yield takeEvery(
    variantActions.REMOVE_SELECTED_ATTRIBUTE_REQ,
    removeSelectedAttributeReq,
  );
}

function* getVariants() {
  yield takeEvery(variantActions.GET_VARIANT_COLOR_REQ, getVariantColorReq);
}

function* getAttributes() {
  yield takeEvery(
    variantActions.GET_VARIANT_ATTRIBUTES_REQ,
    getVariantAttributeReq,
  );
}

export function* fetchProductVariant() {
  yield takeLatest(variantActions.FETCH_PRODUCT_VARIANT_REQ, fetchProductVariantReq);
}

export default function* () {
  return yield all([
    fork(getVariants),
    fork(fetchProductVariant),
    fork(getAttributes),
    fork(addSelectedColor),
    fork(addSelectedAttribute),
    fork(removeSelectedColor),
    fork(removeSelectedAttribute),
    fork(handleSelectedAttribute),
    fork(handleDeselectedAttribute),
    fork(deleteProductVariant),
    fork(editProductVariant),
  ]);
}
