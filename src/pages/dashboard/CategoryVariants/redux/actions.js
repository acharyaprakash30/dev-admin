const entities = '[category_variant]';

const action = {

  GET_VARIANT_REQ: `${entities} GET_VARIANT_REQ`,
  GET_VARIANT_SUC: `${entities} GET_VARIANT_SUC`,
  GET_VARIANT_FAIL: `${entities} GET_VARIANT_FAIL`,

  SEND_CATEGORY_VARIANT_REQ: `${entities} SEND_CATEGORY_VARIANT_REQ`,
  SEND_CATEGORY_VARIANT_SUC: `${entities} SEND_CATEGORY_VARIANT_SUC`,
  SEND_CATEGORY_VARIANT_FAIL: `${entities} SEND_CATEGORY_VARIANT_FAIL`,

  GET_CATEGORY_VARIANT_REQ: `${entities} GET_CATEGORY_VARIANT_REQ`,
  GET_CATEGORY_VARIANT_SUC: `${entities} GET_CATEGORY_VARIANT_SUC`,
  GET_CATEGORY_VARIANT_FAIL: `${entities} GET_CATEGORY_VARIANT_FAIL`,

  DLT_CATEGORY_VARIANT_REQ: `${entities} DLT_CATEGORY_VARIANT_REQ`,
  DLT_CATEGORY_VARIANT_SUC: `${entities} DLT_CATEGORY_VARIANT_SUC`,
  DLT_CATEGORY_VARIANT_FAIL: `${entities} DLT_CATEGORY_VARIANT_FAIL`,

  EDIT_CATEGORY_VARIANT_REQ: `${entities} EDIT_CATEGORY_VARIANT_REQ`,
  EDIT_CATEGORY_VARIANT_SUC: `${entities} EDIT_CATEGORY_VARIANT_SUC`,
  EDIT_CATEGORY_VARIANT_FAIL: `${entities} EDIT_CATEGORY_VARIANT_FAIL`,


  sendCategoryVariantReq: (payload) => ({
    type: action.SEND_CATEGORY_VARIANT_REQ,
    payload,
  }),
  getCategoryVariantReq: (payload) => ({
    type: action.GET_CATEGORY_VARIANT_REQ,
    payload,
  }),
  getAllVariants: (payload) => ({
    type: action.GET_VARIANT_REQ,
    payload
  }),
  dltCategoryVariantReq: (payload) => ({
    type: action.DLT_CATEGORY_VARIANT_REQ,
    payload,
  }),

  editCategoryVariantReq: (id, data) => ({
    type: action.EDIT_CATEGORY_VARIANT_REQ,
    id,
    data
  })
};

export default action;