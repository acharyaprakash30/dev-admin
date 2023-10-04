const entities = '[category]';

const action = {
  CREATE_CATEGORY_REQ: `${entities} CREATE_CATEGORY_REQ`,
  CREATE_CATEGORY_SUC: `${entities} CREATE_CATEGORY_SUC`,
  CREATE_CATEGORY_FAIL: `${entities} CREATE_CATEGORY_FAIL`,

  GET_SINGLE_CATEGORY_REQ: `${entities} GET_SINGLE_CATEGORY_REQ`,
  GET_SINGLE_CATEGORY_SUC: `${entities} GET_SINGLE_CATEGORY_SUC`,
  GET_SINGLE_CATEGORY_FAIL: `${entities} GET_SINGLE_CATEGORY_FAIL`,

  DELETE_CATEGORY_REQ: `${entities} DELETE_CATEGORY_REQ`,
  DELETE_CATEGORY_SUC: `${entities} DELETE_CATEGORY_SUC`,
  DELETE_CATEGORY_FAIL: `${entities} DELETE_CATEGORY_FAIL`,

  EDIT_CATEGORY_REQ: `${entities} EDIT_CATEGORY_REQ`,
  EDIT_CATEGORY_SUC: `${entities} EDIT_CATEGORY_SUC`,
  EDIT_CATEGORY_FAIL: `${entities} EDIT_CATEGORY_FAIL`,

  SEARCH_CATEGORY_REQ: `${entities} SEARCH_CATEGORY_REQ`,
  SEARCH_CATEGORY_SUC: `${entities} SEARCH_CATEGORY_SUC`,
  SEARCH_CATEGORY_FAIL: `${entities} SEARCH_CATEGORY_FAIL`,

  LIST_CATEGORY_WITH_CHILD_REQ: `${entities} LIST_CATEGORY_WITH_CHILD_REQ`,
  LIST_CATEGORY_WITH_CHILD_SUC: `${entities} LIST_CATEGORY_WITH_CHILD_SUC`,
  LIST_CATEGORY_WITH_CHILD_FAIL: `${entities} LIST_CATEGORY_WITH_CHILD_FAIL`,

  COUNT_CATEGORIES: `${entities} COUNT_CATEGORIES`,
  COUNT_CATEGORIES_SUC: `${entities} COUNT_CATEGORIES_SUC`,
  COUNT_CATEGORIES_FAIL: `${entities} COUNT_CATEGORIES_FAIL`,


  addCategoryReq: (payload) => ({
    type: action.CREATE_CATEGORY_REQ,
    payload,
  }),

  getCategoryReq: (payload) => ({
    type: action.GET_SINGLE_CATEGORY_REQ,
    payload,
  }),

  countCategory: (payload) => ({
    type: action.COUNT_CATEGORIES,
    payload,
  }),

  dltCategoryReq: (payload) => ({
    type: action.DELETE_CATEGORY_REQ,
    payload,
  }),

  updateCategoryReq: (id, data) => ({
    type: action.EDIT_CATEGORY_REQ,
    id,
    data
  }),

  searchCategoryReq: (data) => ({
    type: action.SEARCH_CATEGORY_REQ,
    data
  }),

  getCategoryWithChild: () => ({ type: action.LIST_CATEGORY_WITH_CHILD_REQ })

};

export default action;


