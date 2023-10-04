const entities = '[BRAND]';

const action = {

    SEND_BRAND_REQ: `${entities} SEND_BRAND_REQ`,
    SEND_BRAND_SUC: `${entities} SEND_BRAND_SUC`,
    SEND_BRAND_FAIL: `${entities} SEND_BRAND_FAIL`,

    GET_BRAND_REQ: `${entities} GET_BRAND_REQ`,
    GET_BRAND_SUC: `${entities} GET_BRAND_SUC`,
    GET_BRAND_FAIL: `${entities} GET_BRAND_FAIL`,

    DLT_BRAND_REQ: `${entities} DLT_BRAND_REQ`,
    DLT_BRAND_SUC: `${entities} DLT_BRAND_SUC`,
    DLT_BRAND_FAIL: `${entities} DLT_BRAND_FAIL`,

    EDIT_BRAND_REQ: `${entities} EDIT_BRAND_REQ`,
    EDIT_BRAND_SUC: `${entities} EDIT_BRAND_SUC`,
    EDIT_BRAND_FAIL: `${entities} EDIT_BRAND_FAIL`,


    SEARCH_BRAND_LOCAL_REQ: `${entities} SEARCH_BRAND_LOCAL_REQ`,
    SEARCH_BRAND_LOCAL_SUC: `${entities} SEARCH_BRAND_LOCAL_SUC`,
    SEARCH_BRAND_LOCAL_FAIL: `${entities} SEARCH_BRAND_LOCAL_FAIL`,


    sendBrandReq: (payload) => ({
        type: action.SEND_BRAND_REQ,
        payload,
    }),

    getBrandReq: (payload) => ({
        type: action.GET_BRAND_REQ,
    }),

    deleteBrandReq: (payload) => ({
        type: action.DLT_BRAND_REQ,
        payload,
    }),

    editBrandReq: (id, data) => ({
        type: action.EDIT_BRAND_REQ,
        id,
        data
    }),
    searchBrandReq: (data) => ({
        type: action.SEARCH_BRAND_LOCAL_REQ,
        data
    })
}


export default action;