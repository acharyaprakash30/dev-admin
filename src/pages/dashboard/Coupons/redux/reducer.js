import actions from './actions';

const initialState = {
  loading: false,
  message: '',
  Coupons: [],
};

const CouponsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SEARCH_COUPONS_LOCAL_SUC:
      return {
        ...state,
        result: state.Coupons.filter(
          (v) =>
            v.code && v.code.toLowerCase().includes(action.data.toLowerCase()),
        ),
      };
    case actions.GET_COUPONS_REQ:
      return {
        ...state,
        loading: true,
      };
    case actions.GET_COUPONS_SUC:
      return {
        ...state,
        loading: false,
        Coupons: [...action.coupons],
      };
    case actions.GET_COUPONS_FAIL:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case actions.SEND_COUPONS_REQ:
      return {
        ...state,
        loading: true,
      };
    case actions.SEND_COUPONS_SUC:
      return {
        ...state,
        loading: false,
      };
    case actions.SEND_COUPONS_FAIL:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case actions.DLT_COUPONS_REQ:
      return {
        ...state,
        loading: true,
      };
    case actions.DLT_COUPONS_SUC:
      return {
        ...state,
        loading: false,
        Coupons: state.Coupons.filter((coupon) => coupon.id !== action.id),
      };
    case actions.DLT_COUPONS_FAIL:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case actions.EDIT_COUPONS_REQ:
      return {
        ...state,
        loading: true,
      };
    case actions.EDIT_COUPONS_SUC:
      return {
        ...state,
        loading: false,

        message: actions.payload,
      };
    case actions.EDIT_COUPONS_FAIL:
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

export default CouponsReducer;
