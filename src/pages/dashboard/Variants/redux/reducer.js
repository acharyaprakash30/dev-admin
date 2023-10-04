import actions from "./actions";

const initialState = {
    loading: false,
    message: '',
    Variant: [],
}

const VariantReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_VARIANT_REQ:
            return {
                ...state,
                loading: true,
            }
        case actions.GET_VARIANT_SUC:

            return {
                ...state,
                loading: false,
                Variant: [...action.variants]
            }
        case actions.GET_VARIANT_FAIL:
            return {
                ...state,
                loading: false,
                message: action.payload,
            }
        case actions.SEND_VARIANT_REQ:
            return {
                ...state,
                loading: true,
            }
        case actions.SEND_VARIANT_SUC:
            return {
                ...state,
                loading: false,
            }
        case actions.SEND_VARIANT_FAIL:
            return {
                ...state,
                loading: false,
                message: action.payload,
            }
        case actions.DLT_VARIANT_REQ:
            return {
                ...state,
                loading: true
            }
        case actions.DLT_VARIANT_SUC:
            return {
                ...state,
                loading: false,
                Variant: state.Variant.filter(((variant) => variant.id !== action.id)),

            }
        case actions.DLT_VARIANT_FAIL:
            return {
                ...state,
                loading: false,
                message: action.payload,
            }
        case actions.EDIT_VARIANT_REQ:
            return {
                ...state,
                loading: true
            }
        case actions.EDIT_VARIANT_SUC:
            return {
                ...state,
                loading: false,
                message: actions.payload
            }
        case actions.EDIT_VARIANT_FAIL:
            return {
                ...state,
                loading: false,
                message: action.payload,
            }

        default:
            return {
                ...state
            }
    }
}

export default VariantReducer;