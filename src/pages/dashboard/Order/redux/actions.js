const action = {
    GET_ORDER_REQ: 'GET_ORDER_REQ',
    GET_ORDER_SUCCESS: 'GET_ORDER_SUCCESS',
    GET_ORDER_FAILED: 'GET_ORDER_FAILED',

    fetchDataReq: (payload) => ({
        type: action.GET_ORDER_REQ,
        payload,
    }),
    
};

export default action;