const entities = '[APPSETTING]';
const entities_1 = '[PAGEDATA]';

const action = {

    //app-setting
    SEND_APPSETTING_REQ: `${entities} SEND_APPSETTING_REQ`,
    SEND_APPSETTING_SUC: `${entities} SEND_APPSETTING_SUC`,
    SEND_APPSETTING_FAIL: `${entities} SEND_APPSETTING_FAIL`,

    GET_APPSETTING_REQ: `${entities} GET_APPSETTING_REQ`,
    GET_APPSETTING_SUC: `${entities} GET_APPSETTING_SUC`,
    GET_APPSETTING_FAIL: `${entities} GET_APPSETTING_FAIL`,

    DLT_APPSETTING_REQ: `${entities} DLT_APPSETTING_REQ`,
    DLT_APPSETTING_SUC: `${entities} DLT_APPSETTING_SUC`,
    DLT_APPSETTING_FAIL: `${entities} DLT_APPSETTING_FAIL`,

    EDIT_APPSETTING_REQ: `${entities} EDIT_APPSETTING_REQ`,
    EDIT_APPSETTING_SUC: `${entities} EDIT_APPSETTING_SUC`,
    EDIT_APPSETTING_FAIL: `${entities} EDIT_APPSETTING_FAIL`,

    //Pages
    SEND_PAGESDATA_REQ: `${entities_1} SEND_PAGESDATA_REQ`,
    SEND_PAGESDATA_SUC: `${entities_1} SEND_PAGESDATA_SUC`,
    SEND_PAGESDATA_FAIL: `${entities_1} SEND_PAGESDATA_FAIL`,

    sendPagesDataReq: (payload) => ({
        type: action.SEND_PagesData_REQ,
        payload,
    }),
    sendAppSettingReq: (payload) => ({
        type: action.SEND_APPSETTING_REQ,
        payload,
    }),
    getAppSettingReq: (payload) => ({
        type: action.GET_APPSETTING_REQ,
    }),

    deleteAppSettingReq: (payload) => ({
        type: action.DLT_APPSETTING_REQ,
        payload,
    }),

    editAppSettingReq: (id, data) => ({
        type: action.EDIT_APPSETTING_REQ,
        id,
        data
    })
}


export default action;