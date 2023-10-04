import actions from './actions';

const initialState = {
  loading: false,
  message: '',
  order: [],
};

const OrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_ORDER_REQ:
      return {
        ...state,
        loading: true,
      };
    case actions.GET_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        order: [...action.payload],
      };
    case actions.GET_ORDER_FAILED:
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

export default OrderReducer;
