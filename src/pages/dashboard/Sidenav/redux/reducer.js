import actions from "./actions";

const initialState = {
    loading: false,
    message: '',
    siteNav: [],
    list: [],
    result: []
}

const sideNavReducer = (state = initialState, action) => {
    switch (action.type) {

        case actions.FETCH_SIDENAV_REQ:
            return {
                ...state,
                loading: true
            }

        case actions.FETCH_SIDENAV_SUC:

            return {
                ...state,
                loading: false,
                siteNav: [...action.payload]
            }
        case actions.FETCH_SIDENAV_FAIL:

            return {
                ...state,
                loading: false,
                message: action.message
            }


        case actions.CREATE_SIDENAV_REQ:
            return {
                ...state,
                loading: true
            }

        case actions.CREATE_SIDENAV_SUC:

            return {
                ...state,
                loading: false,
            }
        case actions.CREATE_SIDENAV_FAIL:

            return {
                ...state,
                loading: false,
                message: action.message
            }


        case actions.DELETE_SIDENAV_REQ:
            return {
                ...state,
                loading: true
            }

        case actions.DELETE_SIDENAV_SUC:

            return {
                ...state,
                loading: false,
                siteNav: state.siteNav.filter(((item) => item.id !== action.id))
            }
        case actions.DELETE_SIDENAV_FAIL:

            return {
                ...state,
                loading: false,
                message: action.message
            }


        case actions.EDIT_SIDENAV_REQ:
            return {
                ...state,
                loading: true
            }

        case actions.EDIT_SIDENAV_SUC:

            return {
                ...state,
                loading: false,
            }
        case actions.EDIT_SIDENAV_FAIL:

            return {
                ...state,
                loading: false,
                message: action.message
            }
        case actions.SEARCH_SIDENAV_REQ:
            return {
                ...state,
                loading: true,

            }

        case actions.SEARCH_SIDENAV_SUC:
            return {
                ...state,
                loading: false,
                result: state.siteNav.filter(v => v.name && v.name.toLowerCase().includes(action.data.toLowerCase()))
            }




        default:
            return {
                ...state
            }
    }
}

export default sideNavReducer;