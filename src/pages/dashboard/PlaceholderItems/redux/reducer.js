import actions from "./actions";

const initialState = {
    loading: false,
    errorMessage: '',
    placeholderData: [],
    placeholderItems: [],
    searchResult: [],

}

const PlaceholderItemReducer = (state = initialState, action) => {

    switch (action.type) {

        case actions.FETCH_PLACEHOLDER_ITEMS_REQ:

            return {
                ...state,
                loading: true
            }
        case actions.FETCH_PLACEHOLDER_ITEMS_SUC:
            return {
                ...state,
                loading: false,
                placeholderData: action.payload.data,
                placeholderItems: action.payload.items
            }

        case actions.FETCH_PLACEHOLDER_ITEMS_FAIL:

            return {
                ...state,
                loading: false,
                errorMessage: action.payload
            }



        case actions.DELETE_PLACEHOLDER_ITEM_REQ:

            return {
                ...state,
                loading: true
            }
        case actions.DELETE_PLACEHOLDER_ITEM_SUC:
            return {
                ...state,
                loading: false,
                placeholderItems: state.placeholderItems.filter(((data) => data.id !== action.id))
            }

        case actions.FETCH_PLACEHOLDER_ITEMS_FAIL:

            return {
                ...state,
                loading: false,
                errorMessage: action.payload
            }


        case actions.EDIT_PLACEHOLDER_ITEM_REQ:
            return {
                ...state,
                loading: true
            }

        case actions.EDIT_PLACEHOLDER_ITEM_SUC:

            return {
                ...state,
                loading: false
            }

        case actions.EDIT_PLACEHOLDER_ITEM_FAIL:

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




export default PlaceholderItemReducer;