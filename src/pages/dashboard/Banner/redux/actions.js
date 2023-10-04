const entities = '[Banner]';

const action = {

    CREATE_BANNER: `${entities} CREATE_BANNER`,
    CREATE_BANNER_SUC: `${entities} CREATE_BANNER_SUC`,
    CREATE_BANNER_FAIL: `${entities} CREATE_BANNER_FAIL`,

    UPDATE_BANNER: `${entities} UPDATE_BANNER`,
    UPDATE_BANNER_SUC: `${entities} UPDATE_BANNER_SUC`,
    UPDATE_BANNER_FAIL: `${entities} UPDATE_BANNER_FAIL`,

    READ_BANNER: `${entities} READ_BANNER`,
    READ_BANNER_SUC: `${entities} READ_BANNER_SUC`,
    READ_BANNER_FAIL: `${entities} READ_BANNER_FAIL`,

    DELETE_BANNER: `${entities} DELETE_BANNER`,
    DELETE_BANNER_SUC: `${entities} DELETE_BANNER_SUC`,
    DELETE_BANNER_FAIL: `${entities} DELETE_BANNER_FAIL`,

    GET_DEALS_REQ: `${entities} GET_DEALS_REQ`,
    GET_DEALS_SUC: `${entities} GET_DEALS_SUC`,
    GET_DEALS_FAIL: `${entities} GET_DEALS_FAIL`,

    createBanner: (payload) => ({
        type: action.CREATE_BANNER,
        payload,
    }),

    updateBanner: (id, payload) => ({
        type: action.UPDATE_BANNER,
        id,
        payload
    }),

    readBanner: (payload) => ({
        type: action.READ_BANNER,
        payload,
    }),

    deleteBanner: (payload) => ({
        type: action.DELETE_BANNER,
        payload,
    }),


    getDealsReq: (payload) => ({
        type: action.GET_DEALS_REQ,
        payload,
    }),

}


export default action;