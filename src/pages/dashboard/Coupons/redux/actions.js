const entities = '[coupons]';

const action = {
  SEND_COUPONS_REQ: `${entities} SEND_COUPONS_REQ`,
  SEND_COUPONS_SUC: `${entities} SEND_COUPONS_SUC`,
  SEND_COUPONS_FAIL: `${entities} SEND_COUPONS_FAIL`,

  GET_COUPONS_REQ: `${entities} GET_COUPONS_REQ`,
  GET_COUPONS_SUC: `${entities} GET_COUPONS_SUC`,
  GET_COUPONS_FAIL: `${entities} GET_COUPONS_FAIL`,

  DLT_COUPONS_REQ: `${entities} DLT_COUPONS_REQ`,
  DLT_COUPONS_SUC: `${entities} DLT_COUPONS_SUC`,
  DLT_COUPONS_FAIL: `${entities} DLT_COUPONS_FAIL`,

  EDIT_COUPONS_REQ: `${entities} EDIT_COUPONS_REQ`,
  EDIT_COUPONS_SUC: `${entities} EDIT_COUPONS_SUC`,
  EDIT_COUPONS_FAIL: `${entities} EDIT_COUPONS_FAIL`,

  SEARCH_COUPONS_LOCAL_REQ: `${entities} SEARCH_COUPONS_LOCAL_REQ`,
  SEARCH_COUPONS_LOCAL_SUC: `${entities} SEARCH_COUPONS_LOCAL_SUC`,
  SEARCH_COUPONS_LOCAL_FAIL: `${entities} SEARCH_COUPONS_LOCAL_FAIL`,

  sendCouponsReq: (payload) => ({
    type: action.SEND_COUPONS_REQ,
    payload,
  }),
  getCouponsReq: (payload) => ({
    type: action.GET_COUPONS_REQ,
    payload,
  }),

  dltCouponsReq: (payload) => ({
    type: action.DLT_COUPONS_REQ,
    payload,
  }),

  editCouponsReq: (id, data) => ({
    type: action.EDIT_COUPONS_REQ,
    id,
    data,
  }),
  searchCouponReq: (data) => ({
    type: action.SEARCH_COUPONS_LOCAL_REQ,
    data,
  }),
};

export default action;
