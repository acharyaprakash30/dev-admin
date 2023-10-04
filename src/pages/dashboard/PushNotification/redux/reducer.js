import actions from './action'
let initialState = {
    notifications: [],
    loading: false,
    error: false,
    count: 0
}

 const NotificationReducer = (state=initialState, action) => {
    switch (action.type) {
        case actions.GET_NOTIFICATION_REQ:
            return {
                ...state,
                loading: true,
                error: false
            }
        case actions.GET_NOTIFICATION_SUC:
            return {
                ...state,
                loading: false,
                error: false,
                notifications: action.payload
            }
        case actions.GET_NOTIFICATION_FAIL:
            return {
                ...state,
                loading: false,
                error: true,

            }
        case actions.EDIT_NOTIFICATION_REQ:
            return {
                ...state,
                loading: true,
                error: false
            }
        case actions.EDIT_NOTIFICATION_SUC:
            return {
                ...state,
                loading: false,
                error: false,
                notifications: action.payload
            }
        case actions.EDIT_NOTIFICATION_FAIL:
            return {
                ...state,
                loading: false,
                error: true,

            }
        case actions.DELETE_NOTIFICATION_REQ:
            return {
                ...state,
                loading: true,
                error: false
            }
        case actions.DELETE_NOTIFICATION_SUC:
            return {
                ...state,
                loading: false,
                error: false,
                notifications: action.payload
            }
        case actions.DELETE_NOTIFICATION_FAIL:
            return {
                ...state,
                loading: false,
                error: true,

            }

        default:
            return {
                ...state,
            }
    }
}

export default NotificationReducer;