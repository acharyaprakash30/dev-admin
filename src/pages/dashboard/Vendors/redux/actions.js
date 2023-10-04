const entities = '[VENDOR]';

const action = {

    SEND_VENDOR_REQ: `${entities} SEND_VENDOR_REQ`,
    SEND_VENDOR_SUC: `${entities} SEND_VENDOR_SUC`,
    SEND_VENDOR_FAIL: `${entities} SEND_VENDOR_FAIL`,

    GET_VENDOR_REQ: `${entities} GET_VENDOR_REQ`,
    GET_VENDOR_SUC: `${entities} GET_VENDOR_SUC`,
    GET_VENDOR_FAIL: `${entities} GET_VENDOR_FAIL`,

    DLT_VENDOR_REQ: `${entities} DLT_VENDOR_REQ`,
    DLT_VENDOR_SUC: `${entities} DLT_VENDOR_SUC`,
    DLT_VENDOR_FAIL: `${entities} DLT_VENDOR_FAIL`,

    EDIT_VENDOR_REQ: `${entities} EDIT_VENDOR_REQ`,
    EDIT_VENDORCOMMISION_REQ: `${entities} EDIT_VENDORCOMMISION_REQ`,
    EDIT_VENDOR_SUC: `${entities} EDIT_VENDOR_SUC`,
    EDIT_VENDOR_FAIL: `${entities} EDIT_VENDOR_FAIL`,

    sendVendorReq: (payload) => ({
        type: action.SEND_VENDOR_REQ,
        payload,
    }),

    getVendorReq: (payload) => ({
        type: action.GET_VENDOR_REQ,
    }),

    deleteVendorReq: (payload) => ({
        type: action.DLT_VENDOR_REQ,
        payload
    }),
    editVendorReq: (id, data) => ({
        type: action.EDIT_VENDOR_REQ,
        id,
        data
    }),
    editCommissionReq: (id, data) => ({
        type: action.EDIT_VENDORCOMMISION_REQ,
        id,
        data
    })
}


export default action;