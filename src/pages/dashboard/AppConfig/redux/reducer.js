import actions from "./actions";

const initialState = {
    loading: false,
    message: '',
    AppSetting: [],
    Pages: []
}


const AppConfigReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.SEND_PAGESDATA_REQ:
            return {
                ...state,
                loading: true,
            }
        case actions.SEND_PAGESDATA_SUC:
            return {
                ...state,
                loading: false,
            }
        case actions.SEND_PAGESDATA_FAIL:
            return {
                ...state,
                loading: false,
                message: action.payload
            }
        case actions.GET_APPSETTING_REQ:
            return {
                ...state,
                loading: true,
            }
        case actions.GET_APPSETTING_SUC:
            return {
                ...state,
                loading: false,
                AppSetting: [...action.appSettings]
            }
        case actions.GET_APPSETTING_FAIL:
            return {
                ...state,
                loading: false,
                message: action.payload
            }
        case actions.DLT_APPSETTING_REQ:
            return {
                ...state,
                loading: true
            }
        case actions.DLT_APPSETTING_SUC:
            return {
                ...state,
                loading: false,
                AppSetting: state.AppSetting.filter(((appConfig) => appConfig.id !== action.id)),
            }
        case actions.DLT_APPSETTING_FAIL:
            return {
                ...state,
                loading: false,
                message: actions.payload
            }
        case actions.EDIT_APPSETTING_REQ:
            return {
                ...state,
                loading: true
            }
        case actions.EDIT_APPSETTING_SUC:
            let settings = state.AppSetting.map(value => {
                if(value.id === action.data.id){
                    return action.data;
                }
                return value;
            });

            return {
                ...state,
                loading: false,
                message: actions.message,
                AppSetting: settings
            }
        case actions.EDIT_APPSETTING_FAIL:
            return {
                ...state,
                loading: false,
                message: actions.payload
            }
        default:
            return {
                ...state
            }
    }
}

export default AppConfigReducer;