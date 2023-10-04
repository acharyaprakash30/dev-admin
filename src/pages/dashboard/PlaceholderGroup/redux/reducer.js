import actions from "./actions";

const initialState = {
    loading: false,
    message: '',
    data: [],
    result: [],
    current: {},
    placeholderGrpItems: []

}

const PlaceholderGroupReducer = (state = initialState, action) => {
    switch (action.type) {


        case actions.FETCH_PLACEHOLDER_GROUP_REQ:
            return {
                ...state,
                loading: true
            }

        case actions.FETCH_PLACEHOLDER_GROUP_SUC:
            return {
                ...state,
                loading: false,
                data: [...action.placeholders]

            }

        case actions.GET_SINGLE_PLACEHOLDER_GROUP_SUC:
            return {
                ...state,
                current: action.payload
            }

        case actions.FETCH_PLACEHOLDER_GROUP_FAIL:

            return {
                ...state,
                loading: false,
                message: action.payload
            }

        case actions.DELETE_PLACEHOLDER_GROUP_REQ:
            return {
                ...state,
                loading: true
            }

        case actions.DELETE_PLACEHOLDER_GROUP_SUC:

            return {
                ...state,
                loading: false,
                data: state.data.filter(((data) => data.id !== action.id))
            }

        case actions.DELETE_PLACEHOLDER_GROUP_FAIL:

            return {
                ...state,
                loading: false,
                message: action.message
            }


        case actions.EDIT_PLACEHOLDER_GROUP_REQ:
            return {
                ...state,
                loading: true
            }

        case actions.EDIT_PLACEHOLDER_GROUP_SUC:

            return {
                ...state,
                loading: false
            }

        case actions.EDIT_PLACEHOLDER_GROUP_FAIL:

            return {
                ...state,
                loading: false,
                message: action.message
            }


        case actions.CREATE_PLACEHOLDER_GROUP_REQ:
            return {
                ...state,
                loading: true
            }

        case actions.CREATE_PLACEHOLDER_GROUP_SUC:

            return {
                ...state,
                loading: false
            }

        case actions.CREATE_PLACEHOLDER_GROUP_FAIL:

            return {
                ...state,
                loading: false,
                message: action.message
            }

        case actions.SEARCH_PLACEHOLDER_GROUP_REQ:
            return {
                ...state,
                loading: true,

            }


        case actions.SEARCH_PLACEHOLDER_GROUP_SUC:
            return {
                ...state,
                loading: false,
                result: state.data.filter(v => v.title && v.title.toLowerCase().includes(action.data.toLowerCase()))
            }

        case actions.CREATE_PLACEHOLDER_ITEMS_REQ:
            return {
                ...state,
                loading: true
            }


        case actions.CREATE_PLACEHOLDER_ITEMS_SUC:
            return {
                ...state,
                loading: false,
                statusCode: action.statusCode
            }


        case actions.CREATE_PLACEHOLDER_ITEMS_FAIL:
            return {
                ...state,
                loading: false,
                message: action.message
            }


        default:
            return {
                ...state
            }
    }
}




export default PlaceholderGroupReducer;