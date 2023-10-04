import actions from './actions';

const initialState = {
  loading: false,
  message: '',
  form: [],
  formgroup: [],
};

const FormReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SEND_FORM_REQ:
      return {
        ...state,
        loading: true,
      };
    case actions.SEND_FORM_SUC:
      return {
        ...state,
        loading: false,
        form: [...state.form, action.payload],
      };

    case actions.SEND_FORM_FAIL:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case actions.GET_FORM_GROUP_REQ:
      return {
        ...state,
        loading: true,
      };
    case actions.GET_FORM_SUC:
      return {
        ...state,
        loadng: false,
        form: [...action.forms],
      };
    case actions.GET_FORM_FAIL:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case actions.SEND_FORMGROUP_REQ:
      return {
        ...state,
        loading: true,
      };
    case actions.SEND_FORMGROUP_SUC:
      return {
        ...state,
        loading: false,
        formgroup: { ...action.payload },
      };
    case actions.SEND_FORMGROUP_FAIL:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case actions.EDIT_FORMGROUP_REQ:
      return {
        ...state,
        loading: true,
      };
    case actions.GET_FORMGROUP_SUC:
      return {
        ...state,
        loadng: false,
        formgroup: [...action.formgroups],
      };
    case actions.GET_FORMGROUP_FAIL:
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

export default FormReducer;
