import actions from './actions';

const initialState = {
  open: false,
  message: null,
  status: null,
  timeout: null
};

const Alert = (state = initialState, action) => {

  switch (action.type) {

    case actions.SET_ALERT_MESSAGE:
      return {
        ...state,
        open: true,
        message: action.message,
        status: action.status,
        timeout: action.timeout || 4000
      };
    case actions.CLEAR_ALERT_MESSAGE:
      return {
        ...state,
        open: false,
        message: null,
        status: null,
      };
    default:
      return {
        ...state,
      };
  }
};

export default Alert;
