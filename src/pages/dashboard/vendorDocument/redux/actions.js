const entities = '[vendorDoc]';

const action = {
    SEND_VENDORDOC_REQ: `${entities} SEND_VENDORDOC_REQ`,
    SEND_VENDORDOC_SUC: `${entities} SEND_VENDORDOC_SUC`,
    SEND_VENDORDOC_FAIL: `${entities} SEND_VENDORDOC_FAIL`,

    sendVendorDocReq: (payload) => ({
        type: action.SEND_VENDORDOC_REQ,
        payload
    })

}

export default action;