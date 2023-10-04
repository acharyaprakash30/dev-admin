import actions from "./actions";

const initialState = {
    loading: false,
    message: '',
    Category: [],
    list: [],
    result: []
}

const CategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.COUNT_CATEGORIES:
            return {
                ...state,
                loading: true,
                count: action.data
            }

        case actions.COUNT_CATEGORIES_SUC:
            return {
                ...state,
                success: true,
                count: action.data
            }
        case actions.COUNT_CATEGORIES_FAIL:
            return {
                ...state,
                error: true,
                count: action.data
            }
        case actions.LIST_CATEGORY_WITH_CHILD_SUC:
            return {
                ...state,
                list: [...action.data]
            }

        case actions.LIST_CATEGORY_WITH_CHILD_FAIL:
            return {
                ...state,
                list: []
            }
        case actions.SEARCH_CATEGORY_SUC:
            return {
                ...state,
                loading: false,
                result: state.Category.filter(v => v.name && v.name.toLowerCase().includes(action.data.toLowerCase()))
            }

        case actions.SEARCH_CATEGORY_REQ:
            return {
                ...state,
                loading: true,

            }
        case actions.GET_SINGLE_CATEGORY_REQ:
            return {
                ...state,
                loading: true,
            }
        case actions.GET_SINGLE_CATEGORY_SUC:

            return {
                ...state,
                loading: false,
                Category: [...action.categories]
            }
        case actions.GET_SINGLE_CATEGORY_FAIL:
            return {
                ...state,
                loading: false,
                message: action.payload,
            }
        case actions.CREATE_CATEGORY_REQ:
            return {
                ...state,
                createCategory: {
                    loading: true,
                    success: false,
                    error: false
                }
            }
        case actions.CREATE_CATEGORY_SUC:
            return {
                ...state,
                createCategory: {
                    loading: false,
                    success: true,
                    error: false,
                    data: action.payload,
                }
            }
        case actions.CREATE_CATEGORY_FAIL:
            return {
                ...state,
                createCategory: {
                    loading: false,
                    success: false,
                    error: true,
                    data: action.payload,
                },
                message: action.payload,
            }
        case actions.DELETE_CATEGORY_REQ:
            return {
                ...state,
                deleteCategory: {
                    loading: true,
                    success: false,
                    error: false
                }
            }
        case actions.DELETE_CATEGORY_SUC:
            return {
                ...state,
                deleteCategory: {
                    loading: false,
                    success: true,
                    error: false,
                    data: action.payload
                },
                Category: state.Category.filter(((category) => category.id !== action.id))
            }
        case actions.DELETE_CATEGORY_FAIL:
            return {
                ...state,
                deleteCategory: {
                    loading: false,
                    success: false,
                    error: true
                },
                message: action.payload,
            }
        case actions.EDIT_CATEGORY_REQ:
            return {
                ...state,
                editCategory: {
                    loading: true,
                    success: false,
                    error: false
                }
            }
        case actions.EDIT_CATEGORY_SUC:
            return {
                ...state,
                editCategory: {
                    loading: false,
                    success: true,
                    error: false,
                    data: action.payload
                },
                message: actions.payload
            }
        case actions.EDIT_CATEGORY_FAIL:
            return {
                ...state,
                editCategory: {
                    loading: false,
                    success: false,
                    error: true,
                },
                message: action.payload,
            }

        default:
            return {
                ...state
            }
    }
}

export default CategoryReducer;