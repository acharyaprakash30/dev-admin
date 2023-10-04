const entities = '[category]';

const action = {

    SEND_ROLES_REQ: `${entities} SEND_ROLES_REQ`,
    SEND_ROLES_SUC: `${entities} SEND_ROLES_SUC`,
    SEND_ROLES_FAIL: `${entities} SEND_ROLES_FAIL`,

    GET_ROLES_REQ: `${entities} GET_ROLES_REQ`,
    GET_ROLES_SUC: `${entities} GET_ROLES_SUC`,
    GET_ROLES_FAIL: `${entities} GET_ROLES_FAIL`,

    DLT_ROLES_REQ: `${entities} DLT_ROLES_REQ`,
    DLT_ROLES_SUC: `${entities} DLT_ROLES_SUC`,
    DLT_ROLES_FAIL: `${entities} DLT_ROLES_FAIL`,

    EDIT_ROLES_REQ: `${entities} EDIT_ROLES_REQ`,
    EDIT_ROLES_SUC: `${entities} EDIT_ROLES_SUC`,
    EDIT_ROLES_FAIL: `${entities} EDIT_ROLES_FAIL`,


    SEARCH_ROLE_LOCAL_REQ: `${entities} SEARCH_ROLE_LOCAL_REQ`,
    SEARCH_ROLE_LOCAL_SUC: `${entities} SEARCH_ROLE_LOCAL_SUC`,
    SEARCH_ROLE_LOCAL_FAIL: `${entities} SEARCH_ROLE_LOCAL_FAIL`,


    sendRolesReq: (payload) => ({
        type: action.SEND_ROLES_REQ,
        payload,
    }),

    getRolesReq: (payload) => ({
        type: action.GET_ROLES_REQ,
        payload,
    }),
    deleteRolesReq: (payload) => ({
        type: action.DLT_ROLES_REQ,
        payload,
    }),
    editRolesReq: (id, data) => ({
        type: action.EDIT_ROLES_REQ,
        id,
        data
    }),
    searchRoleReq: (data) => ({
        type: action.SEARCH_ROLE_LOCAL_REQ,
        data
    })
};

export default action;