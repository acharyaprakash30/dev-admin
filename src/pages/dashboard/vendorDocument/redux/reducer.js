import actions from "./actions";

const initialState = {
    loading: false,
    message: '',
    vendorDoc: []

}

const VendorDocReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.SEND_VENDORDOC_REQ:
            return {
                ...state,
                loading: true,
            }
        case actions.SEND_VENDORDOC_SUC:
            return {
                ...state,
                loading: false,
            }
        case actions.SEND_VENDORDOC_FAIL:
            return {
                ...state,
                loading: false,
                message: action.payload
            }

        default:
            return {
                ...state
            }


    }
}


export default VendorDocReducer