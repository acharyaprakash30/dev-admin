import actions from './actions';

const initialState = {
  loading: false,
  success: false,
  error: false,
  message: '',
  Deals: [],
};

const DealsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SEARCH_DEALS_LOCAL_SUC:
      return {
        ...state,
        result: state.Deals.filter(
          (v) =>
            v.name && v.name.toLowerCase().includes(action.data.toLowerCase()),
        ),
      };
    case actions.UPDATE_DEAL_REQ:
      return {
        ...state,
        Deals: state.Deals.map((item) => {
          if (item?.id === action.payload.id) {
            item.isActive = action.payload.isActive;
            return item;
          }
        }),
      };
    case actions.GET_DEALS_REQ:
      return {
        ...state,
        getDeals: {
          loading: true,
          success: false,
          error: false,
        },
      };
    case actions.GET_DEALS_SUC:
      return {
        ...state,
        getDeals: {
          loading: false,
          success: true,
          error: false,
        },
        Deals: [...action.deals],
      };
    case actions.GET_DEALS_FAIL:
      return {
        ...state,
        getDeals: {
          loading: false,
          success: false,
          error: true,
        },
        message: action.payload,
      };
    case actions.SEND_DEALS_REQ:
      return {
        ...state,
        sendDeal: {
          loading: true,
          success: false,
          error: false,
        },
      };
    case actions.SEND_DEALS_SUC:
      return {
        ...state,
        sendDeal: {
          loading: false,
          success: true,
          error: false,
        },
        Deals: { ...action.payload },
      };
    case actions.SEND_DEALS_FAIL:
      return {
        ...state,
        sendDeal: {
          loading: false,
          success: false,
          error: true,
        },
        message: action.payload,
      };
    case actions.DLT_DEALS_REQ:
      return {
        ...state,
        deleteDeal: {
          loading: true,
          success: false,
          error: false,
        },
      };
    case actions.DLT_DEALS_SUC:
      return {
        ...state,
        deleteDeal: {
          loading: false,
          success: true,
          error: false,
        },
        Deals: state.Deals.filter((deal) => deal.id !== action.id),
      };
    case actions.DLT_DEALS_FAIL:
      return {
        ...state,
        deleteDeal: {
          loading: false,
          success: false,
          error: true,
        },
        message: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default DealsReducer;
