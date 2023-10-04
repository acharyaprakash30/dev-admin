import actions from './actions';

const initialState = {
  loading: false,
  fetchingCurrentUser: false,
  message: '',
  currentUser: null,
  statusCode: null,
  isLoggedIn: false,
  tokenInfo: null,
  userType: 'agent',
};

const Auth = (state = initialState, action) => {
  switch (action.type) {
    case actions.DECODE_LOGIN_TOKEN_LOGIN:
      return {
        ...state,
        currentUser: state.tokenInfo,
        isLoggedIn: true,
      }
    case actions.DECODE_LOGIN_TOKEN_SUC:
      return {
        ...state,
        tokenInfo: action.payload,
      }
    case actions.GET_TOKEN_REQ:
      return {
        ...state,
        loading: true,
      }
    case actions.GET_TOKEN_SUC:
      return {
        ...state,
        loading: false,
        statusCode: action.statusCode,
      };
    case actions.GET_TOKEN_FAIL:
      return {
        ...state,
        loading: false,
        statusCode: action.statusCode,
        message: action.message,
      };
    case actions.GET_ACCESS_REQ:
      return {
        ...state,
        loading: true,
      };
    case actions.GET_ACCESS_SUC:
      return {
        ...state,
        loading: false,
        statusCode: action.statusCode,
        message: action.message,
        isLoggedIn: true,
        currentUser: action.currentUser,
      };
    case actions.GET_ACCESS_FAIL:
      return {
        ...state,
        loading: false,
        statusCode: action.statusCode,
        message: action.message,
        isLoggedIn: false,
      };
    case actions.GET_CURRENT_USER_REQ:
      return {
        ...state,
        fetchingCurrentUser: true,
      }
    case actions.GET_CURRENT_USER_SUC:
      return {
        ...state,
        fetchingCurrentUser: false,
        currentUser: action.currentUser,
        isLoggedIn: true,
      }
    case actions.GET_CURRENT_USER_FAIL:
      return {
        ...state,
        fetchingCurrentUser: false,
        message: action.message,
        isLoggedIn: false,
      }

    /* Logout */
    case actions.SEND_LOGOUT_REQ:
      return {
        ...state,
        loading: true,
        

      }
    case actions.SEND_LOGOUT_SUC:
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
        currentUser: null,

      }
    case actions.SEND_LOGOUT_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        currentUser: null,
        message: action.message,
        status: action.status,
      }

      case actions.LOGOUT_USER:
        return {
          ...state,
          isLoggedIn: false,
          currentUser: null,
          
        }
    default:
      return {
        ...state
      }
  }
};

export default Auth;
