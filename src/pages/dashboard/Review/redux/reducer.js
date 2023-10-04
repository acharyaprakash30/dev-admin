import actions from "./actions";

const initialState = {
    loading: false,
    message: '',
    Reviews : [],
}

const ReviewsReducer = (state = initialState, action) => {
    switch(action.type) {
        case actions.GET_REVIEW_REQ:
            return {
                ...state,
                loading: true,
            }
        case actions.GET_REVIEW_SUC:

            return {
                ...state,
                loading: false,
                Reviews : [...action.reviews]
            }
        case actions.GET_REVIEW_FAIL:
            return {
                ...state,
                loading: false,
                message: action.payload,
            }
        case actions.DLT_REVIEW_REQ :
            return {
                ...state,
                loading:true
            }
        case actions.DLT_REVIEW_SUC:
            return {
                ...state,
                loading: false,
                Reviews : state.Reviews.filter(((review) => review.id !== action.id)),
                    
            }
        case actions.DLT_REVIEW_FAIL :
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

export default ReviewsReducer;