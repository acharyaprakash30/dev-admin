import actions from "./actions";

const initialState = {
    loading: false,
    success: false,
    error: false,
    data: []
}

const initialReducers = {
    createBanner: initialState,
    updateBanner: initialState,
    readBanner: initialState,
    deleteBanner: initialState
}

const BannerReducer = (state = initialReducers, action) => {
    switch (action.type) {
        case actions.CREATE_BANNER:
            return {
                ...state,
                createBanner: {
                    ...initialState,
                    loading: true
                }
            }
        case actions.CREATE_BANNER_SUC:
            return {
                ...state,
                createBanner: {
                    ...initialState,
                    success: true,
                    data: action.payload,
                }
            }
        case actions.CREATE_BANNER_FAIL:
            return {
                ...state,
                createBanner: {
                    ...initialState,
                    error: true
                }
            }

        case actions.UPDATE_BANNER:
            return {
                ...state,
                updateBanner: {
                    ...initialState,
                    loading: true
                }
            }
        case actions.UPDATE_BANNER_SUC:
            return {
                ...state,
                updateBanner: {
                    ...initialState,
                    success: true,
                    data: action.payload,
                }
            }
        case actions.UPDATE_BANNER_FAIL:
            return {
                ...state,
                updateBanner: {
                    ...initialState,
                    error: true
                }
            }

        case actions.READ_BANNER:
            return {
                ...state,
                readBanner: {
                    ...initialState,
                    loading: true
                }
            }
        case actions.READ_BANNER_SUC:
            return {
                ...state,
                readBanner: {
                    ...initialState,
                    success: true,
                    data: action.payload,
                }
            }
        case actions.READ_BANNER_FAIL:
            return {
                ...state,
                readBanner: {
                    ...initialState,
                    error: true
                }
            }

        case actions.DELETE_BANNER:
            return {
                ...state,
                deleteBanner: {
                    ...initialState,
                    loading: true
                }
            }
        case actions.DELETE_BANNER_SUC:
            return {
                ...state,
                deleteBanner: {
                    ...initialState,
                    success: true,
                    data: action.payload,
                }
            }
        case actions.DELETE_BANNER_FAIL:
            return {
                ...state,
                deleteBanner: {
                    ...initialState,
                    error: true
                }
            }

        case actions.GET_DEALS_REQ:
            return {
                ...state,
                getDeals: {
                    loading: true,
                    success: false,
                    error: false,
                }
            };
        case actions.GET_DEALS_SUC:
            return {
                ...state,
                getDeals: {
                    loading: false,
                    success: true,
                    error: false,
                    data: action.payload,
                },
                
            };
        case actions.GET_DEALS_FAIL:
            return {
                ...state,
                getDeals: {
                    loading: false,
                    success: false,
                    error: true,
                    data: action.payload,
                },
                
            };

        default:
            return {
                ...state
            }
    }
}

export default BannerReducer;