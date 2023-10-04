import actions from './actions';

const initialState = {
  loading: false,
  message: '',
  Brand: [],
  result: [],
};

const BrandReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SEARCH_BRAND_LOCAL_SUC:
      return {
        ...state,
        result: state.Brand.filter(
          (v) =>
            v.name && v.name.toLowerCase().includes(action.data.toLowerCase()),
        ),
      };
    case actions.SEND_BRAND_REQ:
      return {
        ...state,
        sendBrand: {
          loading: true,
          success: false,
          error: false,
        },
      };
    case actions.SEND_BRAND_SUC:
      return {
        ...state,
        sendBrand: {
          loading: false,
          success: true,
          error: false,
          data: action.payload,
        },
      };
    case actions.SEND_BRAND_FAIL:
      return {
        ...state,
        sendBrand: {
          loading: false,
          success: false,
          error: true,
          data: action.payload,
        },
      };
    case actions.GET_BRAND_REQ:
      return {
        ...state,
        getBrand: {
          loading: true,
          success: false,
          error: false,
        },
      };
    case actions.GET_BRAND_SUC:
      return {
        ...state,
        getBrand: {
          loading: false,
          success: true,
          error: false,
          data: action.payload,
        },
        Brand: [...action.brands],
      };
    case actions.GET_BRAND_FAIL:
      return {
        ...state,
        getBrand: {
          loading: false,
          success: false,
          error: true,
        },
        message: action.payload,
      };
    case actions.DLT_BRAND_REQ:
      return {
        ...state,
        deleteBrand: {
          loading: true,
          success: false,
          error: false,
        },
      };
    case actions.DLT_BRAND_SUC:
      return {
        ...state,
        deleteBrand: {
          loading: false,
          success: true,
          error: false,
        },
        Brand: state.Brand.filter((brand) => brand.id !== action.id),
      };
    case actions.DLT_BRAND_FAIL:
      return {
        ...state,
        deleteBrand: {
          loading: false,
          success: false,
          error: true,
        },
        message: actions.payload,
      };
    case actions.EDIT_BRAND_REQ:
      return {
        ...state,
        editBrand: {
          loading: true,
          success: false,
          error: false,
        },
      };
    case actions.EDIT_BRAND_SUC:
      return {
        ...state,
        editBrand: {
          loading: false,
          success: true,
          error: false,
        },
        message: actions.message,
      };
    case actions.EDIT_BRAND_FAIL:
      return {
        ...state,
        editBrand: {
          loading: false,
          success: false,
          error: true,
        },
        message: actions.payload,
      };

    default:
      return {
        ...state,
      };
  }
};

export default BrandReducer;
