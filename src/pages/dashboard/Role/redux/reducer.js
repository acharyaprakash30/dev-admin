import actions from './actions';

const initialState = {
  loading: false,
  message: '',
  Role: [],
};

const RoleReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SEARCH_ROLE_LOCAL_SUC:
      return {
        ...state,
        result: state.Role.filter(
          (v) =>
            v.name && v.name.toLowerCase().includes(action.data.toLowerCase()),
        ),
      };
    case actions.SEND_ROLES_REQ:
      return {
        ...state,
        loading: true,
      };
    case actions.SEND_ROLES_SUC:
      return {
        ...state,
        loading: false,
        // Role: { ...action.payload }, //! @zero: INVALID REDUX STATE CHANGE ATTEMP
      };
    case actions.SEND_ROLES_FAIL:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case actions.GET_ROLES_REQ:
      return {
        ...state,
        loading: true,
      };
    case actions.GET_ROLES_SUC:
      return {
        ...state,
        loading: false,
        Role: [...action.roles],
      };
    case actions.GET_ROLES_FAIL:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case actions.DLT_ROLES_REQ:
      return {
        ...state,
        loading: true,
      };
    case actions.DLT_ROLES_SUC:
      return {
        ...state,
        loading: false,
        Role: state.Role.filter((role) => role.id !== action.id),
      };
    case actions.DLT_ROLES_FAIL:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case actions.EDIT_ROLES_REQ:
      return {
        ...state,
        loading: true,
      };
    case actions.EDIT_ROLES_SUC:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case actions.EDIT_ROLES_FAIL:
      return {
        ...state,
        loading: false,
        message: actions.payload,
      };

    default:
      return {
        ...state,
      };
  }
};

export default RoleReducer;
