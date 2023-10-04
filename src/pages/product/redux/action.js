const entities = '[Product]';

const action = {
  ADD_PRODUCT_REQ: `${entities} ADD_PRODUCT_REQ`,
  ADD_PRODUCT_SUC: `${entities} ADD_PRODUCT_SUC`,
  ADD_PRODUCT_FAIL: `${entities} ADD_PRODUCT_FAIL`,

  GET_CATEGORY_REQ: `${entities} GET_CATEGORY_REQ`,
  GET_CATEGORY_SUC: `${entities} GET_CATEGORY_SUC`,
  GET_CATEGORY_FAIL: `${entities} GET_CATEGORY_FAIL`,

  GET_COLORS_REQ: `${entities} GET_COLORS_REQ`,
  GET_COLORS_SUC: `${entities} GET_COLORS_SUC`,
  GET_COLORS_FAIL: `${entities} GET_COLORS_FAIL`,

  GET_FORM_CONFIG_REQ: `${entities} GET_FORM_CONFIG_REQ`,
  GET_FORM_CONFIG_SUC: `${entities} GET_FORM_CONFIG_SUC`,
  GET_FORM_CONFIG_FAIL: `${entities} GET_FORM_CONFIG_FAIL`,

  GET_BRAND_REQ: `${entities} GET_BRAND_REQ`,
  GET_BRAND_SUC: `${entities} GET_BRAND_SUC`,
  GET_BRAND_FAIL: `${entities} GET_BRAND_FAIL`,

  ADD_PRODUCT_DETAIL_REQ: `${entities} ADD_PRODUCT_DETAIL_REQ`,
  ADD_PRODUCT_DETAIL_SUC: `${entities} ADD_PRODUCT_DETAIL_SUC`,
  ADD_PRODUCT_DETAIL_FAIL: `${entities} ADD_PRODUCT_DETAIL_FAIL`,

  EDIT_PRODUCT_REQ: `${entities} EDIT_PRODUCT_REQ`,
  EDIT_PRODUCT_SUC: `${entities} EDIT_PRODUCT_SUC`,
  EDIT_PRODUCT_FAIL: `${entities} EDIT_PRODUCT_FAIL`,

  GET_PRODUCTS_REQ: `${entities} GET_PRODUCT_REQ`,
  GET_PRODUCTS_SUC: `${entities} GET_PRODUCT_SUC`,
  GET_PRODUCTS_FAIL: `${entities} GET_PRODUCT_FAIL`,

  DELETE_PRODUCT_REQ: `${entities} DELETE_PRODUCT_REQ`,
  DELETE_PRODUCT_SUC: `${entities} DELETE_PRODUCT_SUC`,
  DELETE_PRODUCT_FAIL: `${entities} DELETE_PRODUCT_FAIL`,

  GET_PRODUCT_ID_REQ: `${entities} GET_PRODUCT_ID_REQ`,
  GET_PRODUCT_ID_SUC: `${entities} GET_PRODUCT_ID_SUC`,
  GET_PRODUCT_ID_FAIL: `${entities} GET_PRODUCT_ID_FAIL`,

  GET_FORM_ID_REQ: `${entities} GET_FORM_ID_REQ`,
  GET_FORM_ID_SUC: `${entities} GET_FORM_ID_SUC`,
  GET_FORM_ID_FAIL: `${entities} GET_FORM_ID_FAIL`,

  UPLOAD_IMAGE_REQ: `${entities} UPLOAD_IMAGE_REQ`,
  UPLOAD_IMAGE_SUC: `${entities} UPLOAD_IMAGE_SUC`,
  UPLOAD_IMAGE_FAIL: `${entities} UPLOAD_IMAGE_FAIL`,

  FETCH_PRODUCT_IMAGES_REQ: `${entities} FETCH_PRODUCT_IMAGES_REQ`,
  FETCH_PRODUCT_IMAGES_SUC: `${entities}  FETCH_PRODUCT_IMAGES_SUC`,
  FETCH_PRODUCT_IMAGES_FAIL: `${entities} FETCH_PRODUCT_IMAGES_FAIL`,

  DELETE_PRODUCT_IMAGES_REQ: `${entities} DELETE_PRODUCT_IMAGES_REQ`,
  DELETE_PRODUCT_IMAGES_SUC: `${entities}  DELETE_PRODUCT_IMAGES_SUC`,
  DELETE_PRODUCT_IMAGES_FAIL: `${entities} DELETE_PRODUCT_IMAGES_FAIL`,

  GET_VARIANTS_REQ: `${entities} GET_VARIANTS_REQ`,
  GET_VARIANTS_SUC: `${entities} GET_VARIANTS_SUC`,
  GET_VARIANTS_FAIL: `${entities} GET_VARIANTS_FAIL`,

  // product search with search query

  SEARCH_QUERY_REQ: ` ${entities} SEARCH_QUERY_REQ`,
  SEARCH_QUERY_SUC: ` ${entities} SEARCH_QUERY_SUC`,
  SEARCH_QUERY_FAIL: ` ${entities} SEARCH_QUERY_FAIL`,

  // product search with brand query

  BRAND_SELECT_REQ: `${entities} BRAND_SELECT_REQ`,
  BRAND_SELECT_SUC: `${entities} BRAND_SELECT_SUC`,
  BRAND_SELECT_FAIL: `${entities} BRAND_SELECT_FAIL`,

  CLEAR_ADDED_PRODUCT: `${entities} CLEAR_ADDED_PRODUCT`,

  CLEAR_EDIT_PRODUCT: `${entities} CLEAR_EDIT_PRODUCT`,

  GO_TO_NEXT_STEP: `${entities} GO_TO_NEXT_STEP`,

  brandSelect: (payload) => ({
    type: action.BRAND_SELECT_REQ,
    payload,
  }),

  clearEditProduct: () => ({
    type: action.CLEAR_EDIT_PRODUCT,
  }),

  clearAddedProduct: () => ({
    type: action.CLEAR_ADDED_PRODUCT,
  }),

  fetchProductVariant: (id) => ({
    type: action.FETCH_PRODUCT_VARIANT_REQ,
    id,
  }),

  goToNextStep: () => ({
    type: action.GO_TO_NEXT_STEP,
  }),

  fetchVariant: (id) => ({
    type: action.GET_VARIANTS_REQ,
    id,
  }),
  addProductImage: (data) => ({
    type: action.UPLOAD_IMAGE_REQ,
    data,
  }),
  getFormById: (payload) => ({
    type: action.GET_FORM_ID_REQ,
    payload,
  }),

  addProduct: (payload) => ({
    type: action.ADD_PRODUCT_REQ,
    payload,
  }),
  getCategory: (payload) => ({
    type: action.GET_CATEGORY_REQ,
    payload,
  }),
  getColors: (payload) => ({
    type: action.GET_COLORS_REQ,
    payload,
  }),
  getFormConfig: (payload) => ({
    type: action.GET_FORM_CONFIG_REQ,
    payload,
  }),
  getProducts: (payload) => ({
    type: action.GET_PRODUCTS_REQ,
    payload,
  }),
  getBrand: (payload) => ({
    type: action.GET_BRAND_REQ,
    payload,
  }),
  addProductDetail: (id, data) => ({
    type: action.ADD_PRODUCT_DETAIL_REQ,
    id,
    data,
  }),
  deleteProduct: (payload) => ({
    type: action.DELETE_PRODUCT_REQ,
    payload,
  }),
  getProductById: (payload) => ({
    type: action.GET_PRODUCT_ID_REQ,
    payload,
  }),
  editProduct: (id, data, hasVariants) => ({
    type: action.EDIT_PRODUCT_REQ,
    id,
    data,
    hasVariants,
  }),

  searchQuery: (payload) => ({
    type: action.SEARCH_QUERY_REQ,
    payload,
  }),

  fetchProductImages: (id) => ({
    type: action.FETCH_PRODUCT_IMAGES_REQ,
    id,
  }),
  deleteProductImage: (id) => ({
    type: action.DELETE_PRODUCT_IMAGES_REQ,
    id,
  }),
};

export default action;
