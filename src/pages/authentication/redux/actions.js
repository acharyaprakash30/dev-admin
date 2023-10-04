const entities = '[auth]';

const actions = {
  GET_TOKEN_REQ: `${entities} GET_TOKEN_REQ`,
  GET_TOKEN_SUC: `${entities} GET_TOKEN_SUC`,
  GET_TOKEN_FAIL: `${entities} GET_TOKEN_FAIL`,

  GET_ACCESS_REQ: `${entities} GET_ACCESS_REQ`,
  GET_ACCESS_SUC: `${entities} GET_ACCESS_SUC`,
  GET_ACCESS_FAIL: `${entities} GET_ACCESS_FAIL`,

  GET_CURRENT_USER_REQ: `${entities} GET_CURRENT_USER_REQ`,
  GET_CURRENT_USER_SUC: `${entities} GET_CURRENT_USER_SUC`,
  GET_CURRENT_USER_FAIL: `${entities} GET_CURRENT_USER_FAIL`,

  SEND_LOGOUT_REQ: `${entities} SEND_LOGOUT_REQ`,
  SEND_LOGOUT_SUC: `${entities} SEND_LOGOUT_SUC`,
  SEND_LOGOUT_FAIL: `${entities} SEND_LOGOUT_FAIl`,


  DECODE_LOGIN_TOKEN_REQ: `${entities} DECODE_LOGIN_TOKEN_REQ`,
  DECODE_LOGIN_TOKEN_SUC: `${entities} DECODE_LOGIN_TOKEN_SUC`,
  DECODE_LOGIN_TOKEN_FAIL: `${entities} DECODE_LOGIN_TOKEN_FAIL`,
  DECODE_LOGIN_TOKEN_LOGIN: `${entities} DECODE_LOGIN_TOKEN_LOGIN`,


  GET_TOKEN_FROM_LS_REQ: `${entities} GET_TOKEN_FROM_LS_REQ`,
  GET_TOKEN_FROM_LS_SUC: `${entities} GET_TOKEN_FROM_LS_SUC`,
  GET_TOKEN_FROM_LS_FAIL: `${entities} GET_TOKEN_FROM_LS_FAIL`,

  LOGOUT_USER: `${entities} LOGOUT_USER`,


  logout: () => ({
    type: actions.SEND_LOGOUT_REQ,
  }),

  login: (payload) => ({
    type: actions.GET_TOKEN_REQ,
    payload,
  }),

  getCurrentUser: (payload) => ({
    type: actions.GET_CURRENT_USER_REQ,
    payload,
  }),

  decodeTokenRequest: (payload) => ({
    type: actions.DECODE_LOGIN_TOKEN_REQ,
    payload
  }),

  getTokenFromStorage:() => ({
    type:actions.GET_TOKEN_FROM_LS_REQ
  })

};

export default actions;
