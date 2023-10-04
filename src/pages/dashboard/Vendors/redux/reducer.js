import actions from './actions';

const initalState = {
  loading: false,
  message: '',
  Vendor: [],
};

const VendorReducer = (state = initalState, action) => {
  switch (action.type) {
    case actions.SEND_VENDOR_REQ:
      return {
        ...state,
        loading: true,
      };
    case actions.SEND_VENDOR_SUC:
      return {
        ...state,
        loading: false,
        Vendor: [...state.Vendor, action.payload ],
      };
    case actions.SEND_VENDOR_FAIL:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case actions.GET_VENDOR_REQ:
      return {
        ...state,
        loading: true,
      };
    case actions.GET_VENDOR_SUC:
      return {
        ...state,
        loading: false,
        Vendor: [...action.vendors],
      };
    case actions.GET_VENDOR_FAIL:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case actions.DLT_VENDOR_REQ:
      return {
        ...state,
        loading: true,
      };
    case actions.DLT_VENDOR_SUC:
      return {
        ...state,
        loading: false,
        Vendor: state.Vendor.filter((vendor) => vendor.id !== action.id),
      };
    case actions.DLT_VENDOR_FAIL:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case actions.EDIT_VENDOR_REQ:
      return {
        ...state,
        loading: true,
      };
    case actions.EDIT_VENDOR_SUC:
      return {
        ...state,
        loading: false,
        Vendor: state.Vendor.map((vendor) => {
          console.log(vendor?.id, action?.id, action?.data?.commission);
          if (vendor?.id === action?.id) {
            vendor.vendorDetail.commission = action?.data?.commission;
            return vendor;
          } else {
            return vendor;
          }
        }),
      };
    case actions.EDIT_VENDOR_FAIL:
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

export default VendorReducer;
