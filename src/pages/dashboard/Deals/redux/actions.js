const entities = '[deals]';

const action = {
  SEND_DEALS_REQ: `${entities} SEND_DEALS_REQ`,
  SEND_DEALS_SUC: `${entities} SEND_DEALS_SUC`,
  SEND_DEALS_FAIL: `${entities} SEND_DEALS_FAIL`,

  UPDATE_DEALS_REQ: `${entities} UPDATE_DEALS_REQ`,
  UPDATE_DEALS_SUC: `${entities} UPDATE_DEALS_SUC`,
  UPDATE_DEALS_FAIL: `${entities} UPDATE_DEALS_FAIL`,

  UPDATE_DEAL_REQ: `${entities} UPDATE_DEAL_REQ`,

  GET_DEALS_REQ: `${entities} GET_DEALS_REQ`,
  GET_DEALS_SUC: `${entities} GET_DEALS_SUC`,
  GET_DEALS_FAIL: `${entities} GET_DEALS_FAIL`,

  DLT_DEALS_REQ: `${entities} DLT_DEALS_REQ`,
  DLT_DEALS_SUC: `${entities} DLT_DEALS_SUC`,
  DLT_DEALS_FAIL: `${entities} DLT_DEALS_FAIL`,

  SEARCH_DEALS_LOCAL_REQ: `${entities} SEARCH_DEALS_LOCAL_REQ`,
  SEARCH_DEALS_LOCAL_SUC: `${entities} SEARCH_DEALS_LOCAL_SUC`,
  SEARCH_DEALS_LOCAL_FAIL: `${entities} SEARCH_DEALS_LOCAL_FAIL`,

  sendDealsReq: (payload) => ({
    type: action.SEND_DEALS_REQ,
    payload,
  }),

  getDealsReq: (payload) => ({
    type: action.GET_DEALS_REQ,
    payload,
  }),

  dltDealsReq: (payload) => ({
    type: action.DLT_DEALS_REQ,
    payload,
  }),
  updateDealsReq: (payload, id) => ({
    type: action.UPDATE_DEALS_REQ,
    payload,
    id,
  }),

  searchDealReq: (data) => ({
    type: action.SEARCH_DEALS_LOCAL_REQ,
    data,
  }),
};

export default action;
