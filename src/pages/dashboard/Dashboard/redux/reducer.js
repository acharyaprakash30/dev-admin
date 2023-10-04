import actions from "./actions";
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import persistStore from "redux-persist/es/persistStore";
import persistReducer from "redux-persist/es/persistReducer";


const initialState = {
    loading: false,
    success: false,
    error: false,
    data: []
}



const initialReducers = {
    user: initialState,
    vendor: initialState,
    category: initialState,
    brand: initialState,
    deal: initialState,
    coupon: initialState,
    order: initialState,
    shop: initialState,
    banner: initialState,
    activeOrder: initialState,
    pendingOrder: initialState,
    cancelledOrder: initialState,
    deliveredOrder: initialState,
    processingOrder:initialState,
    outForDelivery: initialState,
    paidOrder: initialState
}

const StatisticsReducer = (state = initialReducers, action) => {
    switch (action.type) {
        case actions.COUNT_USER:
            return {
                ...state,
                user: {
                    ...state.user,
                    loading: true
                }
            }
        case actions.COUNT_USER_SUC:
            return {
                ...state,
                user: {
                    ...state.user,
                    success: true,
                    data: action.payload,
                }
            }
        case actions.COUNT_USER_FAIL:
            return {
                ...state,
                user: {
                    ...state.user,
                    error: true
                }
            }

        case actions.COUNT_VENDOR:
            return {
                ...state,
                vendor: {
                    ...initialState,
                    loading: true
                }
            }
        case actions.COUNT_VENDOR_SUC:
            return {
                ...state,
                vendor: {
                    ...initialState,
                    success: true,
                    data: action.payload,
                }
            }
        case actions.COUNT_VENDOR_FAIL:
            return {
                ...state,
                vendor: {
                    ...initialState,
                    error: true
                }
            }

        case actions.COUNT_CATEGORY:
            return {
                ...state,
                category: {
                    ...initialState,
                    loading: true
                }
            }
        case actions.COUNT_CATEGORY_SUC:
            return {
                ...state,
                category: {
                    ...initialState,
                    success: true,
                    data: action.payload,
                }
            }
        case actions.COUNT_CATEGORY_FAIL:
            return {
                ...state,
                category: {
                    ...initialState,
                    error: true
                }
            }

        case actions.COUNT_BRAND:
            return {
                ...state,
                brand: {
                    ...initialState,
                    loading: true
                }
            }
        case actions.COUNT_BRAND_SUC:
            return {
                ...state,
                brand: {
                    ...initialState,
                    success: true,
                    data: action.payload,
                }
            }
        case actions.COUNT_BRAND_FAIL:
            return {
                ...state,
                brand: {
                    ...initialState,
                    error: true
                }
            }

        case actions.COUNT_DEAL:
            return {
                ...state,
                deal: {
                    ...initialState,
                    loading: true
                }
            }
        case actions.COUNT_DEAL_SUC:
            return {
                ...state,
                deal: {
                    ...initialState,
                    success: true,
                    data: action.payload,
                }
            }
        case actions.COUNT_DEAL_FAIL:
            return {
                ...state,
                deal: {
                    ...initialState,
                    error: true
                }
            }

        case actions.COUNT_COUPON:
            return {
                ...state,
                coupon: {
                    ...initialState,
                    loading: true
                }
            }
        case actions.COUNT_COUPON_SUC:
            return {
                ...state,
                coupon: {
                    ...initialState,
                    success: true,
                    data: action.payload,
                }
            }
        case actions.COUNT_COUPON_FAIL:
            return {
                ...state,
                coupon: {
                    ...initialState,
                    error: true
                }
            }

        case actions.COUNT_ORDER:
            return {
                ...state,
                order: {
                    ...initialState,
                    loading: true
                }
            }
        case actions.COUNT_ORDER_SUC:
            return {
                ...state,
                order: {
                    ...initialState,
                    success: true,
                    data: action.payload,
                }
            }
        case actions.COUNT_ORDER_FAIL:
            return {
                ...state,
                order: {
                    ...initialState,
                    error: true
                }
            }

        case actions.COUNT_SHOP:
            return {
                ...state,
                shop: {
                    ...initialState,
                    loading: true
                }
            }
        case actions.COUNT_SHOP_SUC:
            return {
                ...state,
                shop: {
                    ...initialState,
                    success: true,
                    data: action.payload,
                }
            }
        case actions.COUNT_SHOP_FAIL:
            return {
                ...state,
                shop: {
                    ...initialState,
                    error: true
                }
            }

        case actions.COUNT_BANNER:
            return {
                ...state,
                banner: {
                    ...initialState,
                    loading: true
                }
            }
        case actions.COUNT_BANNER_SUC:
            return {
                ...state,
                banner: {
                    ...initialState,
                    success: true,
                    data: action.payload,
                }
            }
        case actions.COUNT_BANNER_FAIL:
            return {
                ...state,
                banner: {
                    ...initialState,
                    error: true
                }
            }
        case actions.COUNT_PENDING_ORDER:
            return {
                ...state,
                pendingOrder: {
                    ...initialState,
                    loading: true
                }
            }
        case actions.COUNT_PENDING_ORDER_SUC:
            return {
                ...state,
                pendingOrder: {
                    ...initialState,
                    success: true,
                    data: action.payload,
                }
            }
        case actions.COUNT_PENDING_ORDER_FAIL:
            return {
                ...state,
                pendingOrder: {
                    ...initialState,
                    error: true
                }
            }
        case actions.COUNT_ACTIVE_ORDER:
            return {
                ...state,
                activeOrder: {
                    ...initialState,
                    loading: true
                }
            }
        case actions.COUNT_ACTIVE_ORDER_SUC:
            return {
                ...state,
                activeOrder: {
                    ...initialState,
                    success: true,
                    data: action.payload,
                }
            }
        case actions.COUNT_ACTIVE_ORDER_FAIL:
            return {
                ...state,
                activeOrder: {
                    ...initialState,
                    error: true
                }
            }
        case actions.COUNT_DELIVERED_ORDER:
            return {
                ...state,
                deliveredOrder: {
                    ...initialState,
                    loading: true
                }
            }
        case actions.COUNT_DELIVERED_ORDER_SUC:
            return {
                ...state,
                deliveredOrder: {
                    ...initialState,
                    success: true,
                    data: action.payload,
                }
            }
        case actions.COUNT_DELIVERED_ORDER_FAIL:
            return {
                ...state,
                deliveredOrder: {
                    ...initialState,
                    error: true
                }
            }
        case actions.COUNT_CANCELLED_ORDER:
            return {
                ...state,
                cancelledOrder: {
                    ...initialState,
                    loading: true
                }
            }
        case actions.COUNT_CANCELLED_ORDER_SUC:
            return {
                ...state,
                cancelledOrder: {
                    ...initialState,
                    success: true,
                    data: action.payload,
                }
            }
        case actions.COUNT_CANCELLED_ORDER_FAIL:
            return {
                ...state,
                cancelledOrder: {
                    ...initialState,
                    error: true
                }
            }
            case actions.COUNT_PROCESSING_ORDER:
            return {
                ...state,
                processingOrder: {
                    ...initialState,
                    loading: true
                }
            }
        case actions.COUNT_PROCESSING_ORDER_SUC:
            return {
                ...state,
                processingOrder: {
                    ...initialState,
                    success: true,
                    data: action.payload,
                }
            }
        case actions.COUNT_PROCESSING_ORDER_FAIL:
            return {
                ...state,
                processingOrder: {
                    ...initialState,
                    error: true
                }
            }
            case actions.COUNT_OUTFORDELIVERY_ORDER:
                return {
                    ...state,
                    outForDelivery: {
                        ...state.outForDelivery,
                        loading: true
                    }
                }
            case actions.COUNT_OUTFORDELIVERY_ORDER_SUC:
                return {
                    ...state,
                    outForDelivery: {
                        ...state.outForDelivery,
                        success: true,
                        data: action.payload,
                    }
                }
            case actions.COUNT_OUTFORDELIVERY_ORDER_FAIL:
                return {
                    ...state,
                    outForDelivery: {
                        ...state.outForDelivery,
                        error: true
                    }
                }
            
                case actions.COUNT_PAID_ORDER:
                    return {
                        ...state,
                        paidOrder: {
                            ...state.paidOrder,
                            loading: true
                        }
                    }
                case actions.COUNT_PAID_ORDER_SUC:
                    return {
                        ...state,
                        paidOrder: {
                            ...state.paidOrder,
                            success: true,
                            data: action.payload,
                        }
                    }
                case actions.COUNT_PAID_ORDER_FAIL:
                    return {
                        ...state,
                        paidOrder: {
                            ...state.paidOrder,
                            error: true
                        }
                    }

        default:
            return {
                ...state
            }
    }
}

export default StatisticsReducer;