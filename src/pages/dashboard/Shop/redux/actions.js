const action = {
  GET_SHOP_REQ: 'GET_SHOP_REQ',
  GET_SHOP_SUC: 'GET_SHOP_SUC',
  GET_SHOP_FAIL: 'GET_SHOP_FAIL',

  SEND_SHOP_REQ: 'SEND_SHOP_REQ',
  SEND_SHOP_SUC: 'SEND_SHOP_SUC',
  SEND_SHOP_FAIL: 'SEND_SHOP_FAIL',

  DLT_SHOP_REQ: 'DLT_SHOP_REQ',
  DLT_SHOP_SUC: 'DLT_SHOP_SUC',
  DLT_SHOP_FAIL: 'DLT_SHOP_FAIL',

  EDIT_SHOP_REQ: 'EDIT_SHOP_REQ',
  EDIT_SHOP_SUC: 'EDIT_SHOP_SUC',
  EDIT_SHOP_FAIL: 'EDIT_SHOP_FAIL',

  SEARCH_SHOP_LOCAL_REQ: `SEARCH_SHOP_LOCAL_REQ`,
  SEARCH_SHOP_LOCAL_SUC: `SEARCH_SHOP_LOCAL_SUC`,
  SEARCH_SHOP_LOCAL_FAIL: `SEARCH_SHOP_LOCAL_FAIL`,

  sendShopReq: (payload) => ({
    type: action.SEND_SHOP_REQ,
    payload,
  }),

  fetchShopReq: (payload) => ({
    type: action.GET_SHOP_REQ,
    payload,
  }),

  deleteShopReq: (payload) => ({
    type: action.DLT_SHOP_REQ,
    payload,
  }),
  editShopReq: (id, data) => ({
    type: action.EDIT_SHOP_REQ,
    id,
    data,
  }),
  searchShopReq: (data) => ({
    type: action.SEARCH_SHOP_LOCAL_REQ,
    data,
  }),
};
export default action;
