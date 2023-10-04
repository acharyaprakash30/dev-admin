import actions from "./actions";

const initialState = {
    loading: false,
    message: '',
    Colors: [],
    result: []
}

const ColorsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_COLOR_REQ:
            return {
                ...state,
                loading: true,
            }
        case actions.SEARCH_LOCAL_COLOR_SUC:
            return {
                ...state,
                result: state.Colors.filter(v => v.name && v.name.toLowerCase().includes(action.data.toLowerCase()))
            }
        case actions.GET_COLOR_SUC:

            return {
                ...state,
                loading: false,
                Colors: [...action.colors]
            }
        case actions.GET_COLOR_FAIL:
            return {
                ...state,
                loading: false,
                message: action.payload,
            }
        case actions.SEND_COLOR_REQ:
            return {
                ...state,
                loading: true,
            }
        case actions.SEND_COLOR_SUC:
            return {
                ...state,
                loading: false,
            }
        case actions.SEND_COLOR_FAIL:
            return {
                ...state,
                loading: false,
                message: action.payload,
            }
        case actions.DLT_COLOR_REQ:
            return {
                ...state,
                loading: true
            }
        case actions.DLT_COLOR_SUC:
            return {
                ...state,
                loading: false,
                Colors: state.Colors.filter(((color) => color.id !== action.id)),

            }
        case actions.DLT_COLOR_FAIL:
            return {
                ...state,
                loading: false,
                message: action.payload,
            }
        case actions.EDIT_COLOR_REQ:
            return {
                ...state,
                loading: true
            }
        case actions.EDIT_COLOR_SUC:
            return {
                ...state,
                loading: false,

                message: actions.payload


            }
        case actions.EDIT_COLOR_FAIL:
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

export default ColorsReducer;