const entities = '[variant]';

const action = {
  SEND_VARIANT_REQ: `${entities} SEND_VARIANT_REQ`,
  SEND_VARIANT_SUC: `${entities} SEND_VARIANT_SUC`,
  SEND_VARIANT_FAIL: `${entities} SEND_VARIANT_FAIL`,

  GET_VARIANT_REQ: `${entities} GET_VARIANT_REQ`,
  GET_VARIANT_SUC: `${entities} GET_VARIANT_SUC`,
  GET_VARIANT_FAIL: `${entities} GET_VARIANT_FAIL`,

  GET_CATEGORY_REQ: `${entities} GET_CATEGORY_REQ`,
  GET_CATEGORY_SUC: `${entities} GET_CATEGORY_SUC`,
  GET_CATEGORY_FAIL: `${entities} GET_CATEGORY_FAIL`,

  DLT_VARIANT_REQ: `${entities} DLT_VARIANT_REQ`,
  DLT_VARIANT_SUC: `${entities} DLT_VARIANT_SUC`,
  DLT_VARIANT_FAIL: `${entities} DLT_VARIANT_FAIL`,

  EDIT_VARIANT_REQ: `${entities} EDIT_VARIANT_REQ`,
  EDIT_VARIANT_SUC: `${entities} EDIT_VARIANT_SUC`,
  EDIT_VARIANT_FAIL: `${entities} EDIT_VARIANT_FAIL`,


  addVariantReq: (payload) => ({
    type: action.SEND_VARIANT_REQ,
    payload,
  }),
  getVariantReq: (payload) => ({
    type: action.GET_VARIANT_REQ,
    payload,
  }),
  dltVariantReq: (payload) => ({
    type: action.DLT_VARIANT_REQ,
    payload,
  }),

  editVariantReq: (id, data) => ({
    type: action.EDIT_VARIANT_REQ,
    id,
    data
  })


};

export default action;