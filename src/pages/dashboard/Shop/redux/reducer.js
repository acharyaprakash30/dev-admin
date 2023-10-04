import actions from './actions';

const initialState = {
  loading: false,
  message: '',
  Shop: [],
};

const ShopReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SEARCH_SHOP_LOCAL_SUC:
      return {
        ...state,
        result: state.Shop.filter(
          (v) =>
            v.name && v.name.toLowerCase().includes(action.data.toLowerCase()),
        ),
      };

    case actions.GET_SHOP_REQ:
      return {
        ...state,
        loading: true,
      };
    case actions.GET_SHOP_SUC:
      return {
        ...state,
        loading: false,
        Shop: [...action.shops],
      };
    case actions.GET_SHOP_FAIL:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case actions.SEND_SHOP_REQ:
      return {
        ...state,
        loading: true,
      };

    case actions.SEND_SHOP_SUC:
      return {
        ...state,
        loading: false,
      };
    case actions.SEND_SHOP_FAIL:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case actions.DLT_SHOP_REQ:
      return {
        ...state,
        loading: true,
      };
    case actions.DLT_SHOP_SUC:
      return {
        ...state,
        loading: false,
        Shop: state.Shop.filter((shop) => shop.id !== action.id),
      };
    case actions.DLT_SHOP_FAIL:
      return {
        ...state,
        loading: false,
        message: actions.payload,
      };
    case actions.EDIT_SHOP_REQ:
      return {
        ...state,
        loading: true,
      };
    case actions.EDIT_SHOP_SUC:
      return {
        ...state,
        loading: false,
        message: actions.payload,
      };
    case actions.EDIT_SHOP_FAIL:
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

export default ShopReducer;
