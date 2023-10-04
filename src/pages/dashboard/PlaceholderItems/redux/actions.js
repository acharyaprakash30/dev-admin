
const entities = '[placeholder-items]';

const action = {

    FETCH_PLACEHOLDER_ITEMS_REQ: `${entities} FETCH_PLACEHOLDER_ITEMS_REQ`,
    FETCH_PLACEHOLDER_ITEMS_SUC: `${entities} FETCH_PLACEHOLDER_ITEMS_SUC`,
    FETCH_PLACEHOLDER_ITEMS_FAIL: `${entities} FETCH_PLACEHOLDER_ITEMS_FAIL`,

    DELETE_PLACEHOLDER_ITEM_REQ: `${entities} DELETE_PLACEHOLDER_ITEM_REQ`,
    DELETE_PLACEHOLDER_ITEM_SUC: `${entities} DELETE_PLACEHOLDER_ITEM_SUC`,
    DELETE_PLACEHOLDER_ITEM_FAIL: `${entities} DELETE_PLACEHOLDER_ITEM_FAIL`,

    EDIT_PLACEHOLDER_ITEM_REQ: `${entities} EDIT_PLACEHOLDER_ITEM_REQ`,
    EDIT_PLACEHOLDER_ITEM_SUC: `${entities} EDIT_PLACEHOLDER_ITEM_SUC`,
    EDIT_PLACEHOLDER_ITEM_FAIL: `${entities} EDIT_PLACEHOLDER_ITEM_FAIL`,

    SEARCH_PLACEHOLDER_ITEM_REQ: `${entities} SEARCH_PLACEHOLDER_ITEM_REQ`,
    SEARCH_PLACEHOLDER_ITEM_SUC: `${entities} SEARCH_PLACEHOLDER_ITEM_SUC`,
    SEARCH_PLACEHOLDER_ITEM_FAIL: `${entities} SEARCH_PLACEHOLDER_ITEM_FAIL`,


    singlePlaceholderItemsRequest: (id) => ({
        type: action.FETCH_PLACEHOLDER_ITEMS_REQ,
        id,
    }),

    deletePlaceholderItemRequest: (id) => ({
        type: action.DELETE_PLACEHOLDER_ITEM_REQ,
        id,
    }),

    updatePlaceholderItemRequest: (id, data) => ({
        type: action.EDIT_PLACEHOLDER_ITEM_REQ,
        id,
        data
    }),

    searchPlaceholderItemRequest: (data) => ({
        type: action.SEARCH_PLACEHOLDER_ITEM_REQ,
        data
    }),

};

export default action;


