const entities = '[color]';

const action = {
  SEND_COLOR_REQ: `${entities} SEND_COLOR_REQ`,
  SEND_COLOR_SUC: `${entities} SEND_COLOR_SUC`,
  SEND_COLOR_FAIL: `${entities} SEND_COLOR_FAIL`,

  GET_COLOR_REQ: `${entities} GET_COLOR_REQ`,
  GET_COLOR_SUC: `${entities} GET_COLOR_SUC`,
  GET_COLOR_FAIL: `${entities} GET_COLOR_FAIL`,

  DLT_COLOR_REQ: `${entities} DLT_COLOR_REQ`,
  DLT_COLOR_SUC: `${entities} DLT_COLOR_SUC`,
  DLT_COLOR_FAIL: `${entities} DLT_COLOR_FAIL`,

  EDIT_COLOR_REQ: `${entities} EDIT_COLOR_REQ`,
  EDIT_COLOR_SUC: `${entities} EDIT_COLOR_SUC`,
  EDIT_COLOR_FAIL: `${entities} EDIT_COLOR_FAIL`,
  
  SEARCH_LOCAL_COLOR_REQ: `${entities} SEARCH_LOCAL_COLOR_REQ`,
  SEARCH_LOCAL_COLOR_SUC: `${entities} SEARCH_LOCAL_COLOR_SUC`,
  SEARCH_LOCAL_COLOR_FAIL: `${entities} SEARCH_LOCAL_COLOR_FAIL`,


  sendColorReq: (payload) => ({
    type: action.SEND_COLOR_REQ,
    payload,
  }),
  getColorReq: (payload) => ({
    type: action.GET_COLOR_REQ,
    payload,
  }),

  dltColorReq: (payload) => ({
    type: action.DLT_COLOR_REQ,
    payload,
  }),

  editColorReq: (id, data) => ({
    type: action.EDIT_COLOR_REQ,
    id,
    data
  }),
  searchColorReq: ( data) => ({
    type: action.SEARCH_LOCAL_COLOR_REQ,
    data
  })



};

export default action;


