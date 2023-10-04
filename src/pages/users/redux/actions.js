const action = {
  GET_USER_REQ: 'GET_USER_REQ',
  GET_USER_SUCCESS: 'GET_USER_SUCCESS',
  GET_USER_FAILED: 'GET_USER_FAILED',

  
  fetchDataReq: (payload) => ({
    type: action.GET_USER_REQ,
    payload,
  }),
};

export default action;
