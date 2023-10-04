import {
  all,
  call,
  fork,
  put,
  takeLatest,
  delay,
} from '@redux-saga/core/effects';
import { getCategoryApi } from '../../../api/fetchCategory';
import { getFormConfigApi } from '../../../api/formConfig';
import {
  addProductApi,
  deleteProductApi,
  getProductApi,
  editProductApi,
  getProductByIdApi,
  uploadImagesApi,
  fetchProductImagesApi,
  deleteProductImageApi,
  getVariantsApi,
  fetchProductVariantApi,
  fetchSearchQueryApi,
} from '../../../api/products';
import { getVariantList } from '../../../utils/index';
import { getBrandApi } from '../../../api/fetchBrand';
import actions from './action';
import ShowMessage from '../../../components/Toast/Toast';
import history from '../../../app/history';

import progressAction from '../../../components/ProgressModal/Redux/actions';

function* addProductReq(action) {
  try {
    yield put({
      type: progressAction.SET_PROGRESS_PERCENTAGE,
      percentage: 0,
      status: 'active',
    });
    yield delay(500);
    yield put({
      type: progressAction.SET_PROGRESS_PERCENTAGE,
      percentage: 68,
      status: 'active',
    });
    const addProductResponse = yield call(addProductApi, action.payload);
    const { data, status } = addProductResponse;
    yield put({
      type: actions.ADD_PRODUCT_SUC,
      payload: data,
      status,
    });
    yield delay(500);
    yield put({
      type: progressAction.SET_PROGRESS_PERCENTAGE,
      percentage: 100,
      status: 'active',
    });
    yield delay(500);
    yield ShowMessage(status, 'Product added successfully.');
    yield delay(500);
    const { id } = data;
    if (id) {
      history.replace(`/product/${id}/details`);
      history.go();
    }
  } catch (error) {
    if (error && error.response) {
      yield put({
        type: actions.ADD_PRODUCT_FAIL,
        message: error,
      });
      yield ShowMessage(error.response.data, error.response.data);
    }
    yield put({
      type: actions.ADD_PRODUCT_FAIL,
      message: error.message,
      status: error.status,
    });
    yield ShowMessage(error.statusCode, error.message);
  }
}
function* getCategoryReq(action) {
  try {
    const { data, status } = yield call(getCategoryApi, action.payload);
    yield put({
      type: actions.GET_CATEGORY_SUC,
      categories: data,
      status,
    });
  } catch (error) {
    if (error && error.response) {
      yield put({
        type: actions.GET_CATEGORY_FAIL,
        message: error.response.data.error.message,
        status: error.status,
      });
    }
    yield put({
      type: actions.GET_CATEGORY_FAIL,
      message: error.message,
      status: error.status,
    });
  }
}

/* Clear added Products */
// function* getColorsReq(action) {
//   try {
//     const { data, status } = yield call(getColorsApi, action.payload);
//     yield put({
//       type: actions.GET_COLORS_SUC,
//       colors: data,
//       status,
//     });
//   } catch (error) {
//     if (error && error.response) {
//       yield put({
//         type: actions.GET_COLORS_FAIL,
//         message: error.response.data.error.message,
//         status: error.status,
//       });
//     }
//     yield put({
//       type: actions.GET_COLORS_FAIL,
//       message: error.message,
//       status: error.status,
//     });
//   }
// }

function* getFormConfigReq(id) {
  try {
    const { data, status } = yield call(getFormConfigApi, id);
    yield put({
      type: actions.GET_FORM_CONFIG_SUC,
      payload: data,
      status: status,
      message: 'form config fetched Successfully.',
    });
  } catch (error) {
    yield put({
      type: actions.GET_FORM_CONFIG_FAIL,
      status: error.status,
      message: 'something went wrong.',
    });
  }
}

function* getProductsReq(action) {
  try {
    const { data, status } = yield call(getProductApi, action.payload);
    delay(1000);
    yield put({
      type: actions.GET_PRODUCTS_SUC,
      products: data?.adminProducts,
      count: data?.totalCount,
      status,
    });
  } catch (error) {
    yield put({
      type: actions.GET_PRODUCTS_FAIL,
      message: `Couldn't fetch products`,
      status: error.status,
    });
  }
}

function* getBrandReq(action) {
  try {
    const { data, status } = yield call(getBrandApi, action.payload);
    yield put({
      type: actions.GET_BRAND_SUC,
      payload: data,
      status: status,
    });
  } catch (error) {
    yield put({
      type: actions.GET_BRAND_FAIL,
      message: error?.response?.data?.error?.message || error.message,
      status: error.message,
    });
  }
}

/* Delete Product */
function* deleteProductReq(action) {
  try {
    const response = yield call(deleteProductApi, action.payload);
    if (response) {
      yield put({
        type: actions.DELETE_PRODUCT_SUC,
        id: action.payload,
      });
      delay(1000);
      yield ShowMessage(response.status, 'Product deleted Successfully.');
    }
  } catch (error) {
    const message = error?.response?.data?.error?.message || error.message;
    yield put({
      type: actions.DELETE_PRODUCT_FAIL,
      message,
      status: error.message,
    });
    yield ShowMessage(error.statusCode, message);
  }
}
/* Edit Product */

function* editProductReq(action) {
  try {
    yield put({
      type: progressAction.SET_PROGRESS_PERCENTAGE,
      percentage: 0,
      status: 'active',
    });
    yield delay(500);
    yield put({
      type: progressAction.SET_PROGRESS_PERCENTAGE,
      percentage: 68,
      status: 'active',
    });
    const { data, status } = yield call(editProductApi, action.id, action.data);
    const message = action.data.isActive
      ? 'Product Published Successfully'
      : 'Product Saved Successfully';
    yield put({
      type: actions.EDIT_PRODUCT_SUC,
      payload: data,
      status: status,
      message,
    });
    yield put({
      type: progressAction.SET_PROGRESS_PERCENTAGE,
      percentage: 100,
      status: 'active',
    });
    if (!action.hasVariants) {
      yield delay(1500);
      yield put({
        type: progressAction.SET_SHOW_MODAL,
        payload: false,
      });
      ShowMessage(status, message);
      history.push('/dashboard/viewProducts'); // pushing to view product if product dont have variants
      history.go(0);
    }
  } catch (error) {
    const message = 'Product update failed.';
    const status = error?.respose?.data?.error?.statusCode || 511;
    yield put({
      type: actions.EDIT_PRODUCT_FAIL,
      status,
      message,
    });
    yield put({
      type: progressAction.SET_PROGRESS_PERCENTAGE,
      percentage: 100,
      status: 'exception',
    });
    yield put({
      type: progressAction.SET_SHOW_MODAL,
      payload: false,
    });
    ShowMessage(status, message);
  }
}

/* add Product Detail */
function* addProductDetailReq(action) {
  try {
    const { data, status } = yield call(editProductApi, action.id, action.data);
    const message = 'Product Details added Successfully';
    yield put({
      type: actions.ADD_PRODUCT_DETAIL_SUC,
      payload: data,
      status: status,
      message,
    });
    ShowMessage(status, message);
    yield window.scroll({
      top: 350,
      behavior: 'smooth',
    });
  } catch (error) {
    const message = 'Product detail update failed.';
    const status = error?.respose?.data?.error?.statusCode || 511;
    yield put({
      type: actions.ADD_PRODUCT_DETAIL_FAIL,
      status,
      message,
    });
    ShowMessage(status, message);
  }
}

/* add Product Detail */

function* getProductIdReq(action) {
  try {
    let apiResponse = yield call(getProductByIdApi, action.payload);
    const { data, status } = apiResponse;
    yield put({
      type: actions.GET_PRODUCT_ID_SUC,
      message: 'Fetched Successfully',
      status: status,
      payload: data,
    });
    yield put({
      type: actions.GET_FORM_ID_REQ,
      payload: data.category_id,
    });
  } catch (error) {
    const message = 'Cannot Fetch Product.';
    const status = error?.response?.data?.error?.message || 502;
    yield put({
      type: actions.GET_PRODUCT_ID_FAIL,
      message,
      status,
    });
    ShowMessage(status, message);
  }
}

function* getFormByIdReq(action) {
  try {
    const { data, status } = yield call(getFormConfigApi, action.payload);
    yield put({
      type: actions.GET_FORM_ID_SUC,
      formConfigForEdit: data,
      status: status,
      message: 'form config fetched Successfully.',
    });
  } catch (error) {
    yield put({
      type: actions.GET_FORM_CONFIG_FAIL,
      status: error.status,
      message: 'something went wrong.',
    });
  }
}

/* Upload Product Image */
function* uploadImageReq(action) {
  try {
    const { data, status } = yield call(uploadImagesApi, action.data);
    const message = 'Media uploaded Successfully';
    yield put({
      type: actions.UPLOAD_IMAGE_SUC,
      data,
      status,
      message,
    });
    delay(1000);
    ShowMessage(status, message);
  } catch (error) {
    const status = error?.response?.data?.error?.message || 501;
    const message = 'Media upload failed.';
    yield put({
      type: actions.UPLOAD_IMAGE_FAIL,
      message,
      status,
    });
  }
}

function* fetchProductImagesReq(action) {
  try {
    let apiResponse = yield call(fetchProductImagesApi, action.id);
    delete apiResponse.data.user;
    yield put({
      type: actions.FETCH_PRODUCT_IMAGES_SUC,
      productImages: apiResponse.data,
      message: 'Image fetched successfully',
    });
  } catch (error) {
    yield put({
      type: actions.FETCH_PRODUCT_IMAGES_FAIL,
      message: 'Failed to fetch images.',
    });
  }
}

function* deleteImageReq(action) {
  try {
    const { status } = yield call(deleteProductImageApi, action.id);
    yield put({
      type: actions.DELETE_PRODUCT_IMAGES_SUC,
      id: action.id,
    });
    ShowMessage(status, 'Image deleted Successfully');
  } catch (err) {
    yield put({
      type: actions.DELETE_PRODUCT_IMAGES_FAIL,
    });
    ShowMessage(
      err.status || err.response.data.error.statusCode,
      'Image Deletion failed.',
    );
  }
}

function* getVariantsReq(action) {
  try {
    const { data } = yield call(getVariantsApi, action.id);
    yield put({
      type: actions.GET_VARIANTS_SUC,
      variants: data,
    });
  } catch (error) {
    yield put({
      type: actions.GET_VARIANTS_FAIL,
      message: 'Variant fetching failed.',
    });
  }
}

function* fetchsearchQuery(action) {
  try {
    const { data, status } = yield call(fetchSearchQueryApi, action.payload);
    yield put({
      type: actions.SEARCH_QUERY_SUC,
      data,
    });
  } catch (err) {
    yield put({
      type: actions.SEARCH_QUERY_FAIL,
    });
  }
}

function* fetchBrandQuery(action) {
  try {
    yield put({
      type: actions.BRAND_SELECT_SUC,
      // search : action.search,
      // brand : action.brand,
      // category : action.category
    });
  } catch (err) {
    yield put({
      type: actions.BRAND_SELECT_FAIL,
    });
  }
}

export function* fetchBrandSearch() {
  yield takeLatest(actions.BRAND_SELECT_REQ, fetchBrandQuery);
}

export function* fetchVariant() {
  yield takeLatest(actions.GET_VARIANTS_REQ, getVariantsReq);
}

export function* deleteProductImage() {
  yield takeLatest(actions.DELETE_PRODUCT_IMAGES_REQ, deleteImageReq);
}

export function* fetchProductImages() {
  yield takeLatest(actions.FETCH_PRODUCT_IMAGES_REQ, fetchProductImagesReq);
}

export function* addProductImage() {
  yield takeLatest(actions.UPLOAD_IMAGE_REQ, uploadImageReq);
}

export function* editProduct() {
  yield takeLatest(actions.EDIT_PRODUCT_REQ, editProductReq);
}

export function* getFormConfigForEdit() {
  yield takeLatest(actions.GET_FORM_ID_REQ, getFormByIdReq);
}

export function* getProductByID() {
  yield takeLatest(actions.GET_PRODUCT_ID_REQ, getProductIdReq);
}
export function* addProductDetail() {
  yield takeLatest(actions.ADD_PRODUCT_DETAIL_REQ, addProductDetailReq);
}

export function* deleteProduct() {
  yield takeLatest(actions.DELETE_PRODUCT_REQ, deleteProductReq);
}
export function* getBrand() {
  yield takeLatest(actions.GET_BRAND_REQ, getBrandReq);
}

export function* addProduct() {
  yield takeLatest(actions.ADD_PRODUCT_REQ, addProductReq);
}
export function* getCategory() {
  yield takeLatest(actions.GET_CATEGORY_REQ, getCategoryReq);
}

export function* getFormConfig() {
  yield takeLatest(actions.GET_FORM_CONFIG_REQ, getFormConfigReq);
}
export function* getProducts() {
  yield takeLatest(actions.GET_PRODUCTS_REQ, getProductsReq);
}

export function* searchQueryDetail() {
  yield takeLatest(actions.SEARCH_QUERY_REQ, fetchsearchQuery);
}

export default function* () {
  return yield all([
    fork(fetchVariant),
    fork(deleteProductImage),
    fork(fetchProductImages),
    fork(addProductImage),
    fork(editProduct),
    fork(getFormConfigForEdit),
    fork(getProductByID),
    fork(addProductDetail),
    fork(deleteProduct),
    fork(getBrand),
    fork(addProduct),
    fork(getCategory),
    fork(getFormConfig),
    fork(getProducts),
    fork(searchQueryDetail),
    fork(fetchBrandSearch),
  ]);
}
