import actions from './actions';

const initialState = {
  loading: false,
  message: '',
  user: [],
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_USER_REQ:
      return {
        ...state,
        loading: true,
      };
    case actions.GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: [...action.payload],
      };
    case actions.GET_USER_FAILED:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default UserReducer;
