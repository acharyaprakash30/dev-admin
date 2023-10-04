import actions from "./actions";

const initialState = {
    loading: false,
    message: '',
    CategoryVariant: [],
    Variant: [],
}

const CategoryVariantReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_CATEGORY_VARIANT_REQ:
            return {
                ...state,
                loading: true,
            }
        case actions.GET_CATEGORY_VARIANT_SUC:
            return {
                ...state,
                loading: false,
                CategoryVariant: [...action.categoryVariants]
            }
        case actions.GET_CATEGORY_VARIANT_FAIL:
            return {
                ...state,
                loading: false,
                message: action.payload,
            }
        case actions.GET_VARIANT_FAIL:
            return {
                ...state,
                loading: false,
                message: action.payload,
            }
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
        case actions.SEND_CATEGORY_VARIANT_REQ:
            return {
                ...state,
                loading: true,
            }
        case actions.SEND_CATEGORY_VARIANT_SUC:
            return {
                ...state,
                loading: false,
            }
        case actions.SEND_CATEGORY_VARIANT_FAIL:
            return {
                ...state,
                loading: false,
                message: action.payload,
            }
        case actions.DLT_CATEGORY_VARIANT_REQ:
            return {
                ...state,
                loading: true
            }
        case actions.DLT_CATEGORY_VARIANT_SUC:
            return {
                ...state,
                loading: false,
                CategoryVariant: state.CategoryVariant.filter(((categoryVariant) => categoryVariant.id !== action.id)),

            }
        case actions.DLT_CATEGORY_VARIANT_FAIL:
            return {
                ...state,
                loading: false,
                message: action.payload,
            }
        case actions.EDIT_CATEGORY_VARIANT_REQ:
            return {
                ...state,
                loading: true
            }
        case actions.EDIT_CATEGORY_VARIANT_SUC:
            return {
                ...state,
                loading: false,
                message: actions.payload
            }
        case actions.EDIT_CATEGORY_VARIANT_FAIL:
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

export default CategoryVariantReducer;