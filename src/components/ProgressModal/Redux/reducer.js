import actions from './actions';

const initialState = {
  showModal: false,
  percentage: 0,
  name: '',
  status: '',
};

const progressReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_SHOW_MODAL:
      return {
        ...state,
        showModal: action.payload,
      };
    case actions.SET_PROGRESS_NAME:
      return {
        ...state,
        name: action.payload,
      };
    case actions.SET_PROGRESS_PERCENTAGE:
      return {
        ...state,
        percentage: action.percentage,
        status: action.status,
      };
    default:
      return {
        ...state,
      };
  }
};

export default progressReducer;
