import actions from "./actions";

const initialState = {
    loading: false,
    message: '',
    profile: [],
}

const ProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_PROFILE_REQ:
            return {
                ...state,
                loading: true,
            }
        case actions.GET_PROFILE_SUC:
            return {
                ...state,
                loading: false,
                profile: [action.profiles]

            }
        case actions.GET_PROFILE_FAIL:
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

export default ProfileReducer;