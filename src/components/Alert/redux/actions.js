const entities = '[alert]';

const actions = {
  SET_ALERT_REQ: `${entities} SET_ALERT_REQ`,
  SET_ALERT_MESSAGE: `${entities} SET_ALERT_MESSAGE`,
  CLEAR_ALERT_REQ: `${entities} CLEAR_ALERT_REQ`,
  CLEAR_ALERT_MESSAGE: `${entities} CLEAR_ALERT_MESSAGE`,

  setAlert: (payload) => ({
    type: actions.SET_ALERT_REQ,
    payload,
  }),
  clearAlert: (payload) => ({
    type: actions.CLEAR_ALERT_REQ,
    payload,
  }),
};

export default actions;
