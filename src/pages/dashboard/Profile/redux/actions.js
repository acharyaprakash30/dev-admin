const action = {
    GET_PROFILE_REQ: 'GET_PROFILE_REQ',
    GET_PROFILE_SUC: 'GET_PROFILE_SUC',
    GET_PROFILE_FAIL: "GET_PROFILE_FAIL",

    PROFILE_UPDATE_SUCCESS: "PROFILE_UPDATE_SUCCESS",
    PROFILE_UPDATE_FAIL: "PROFILE_UPDATE_FAIL",
    PROFILE_UPDATE_REQ: "PROFILE_UPDATE_REQ",

    fetchProfileReq: (payload) => ({
        type: action.GET_PROFILE_REQ,
        payload,
    }),
    updateProfileReq: (payload) => ({
        type: action.PROFILE_UPDATE_REQ,
        payload,
    }),
};

export default action;