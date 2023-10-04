const entities = '[sideNav]';

const action = {

  FETCH_SIDENAV_REQ: `${entities} FETCH_SIDENAV_REQ`,
  FETCH_SIDENAV_SUC: `${entities} FETCH_SIDENAV_SUC`,
  FETCH_SIDENAV_FAIL: `${entities} FETCH_SIDENAV_FAIL`,

  CREATE_SIDENAV_REQ: `${entities} CREATE_SIDENAV_REQ`,
  CREATE_SIDENAV_SUC: `${entities} CREATE_SIDENAV_SUC`,
  CREATE_SIDENAV_FAIL: `${entities} CREATE_SIDENAV_FAIL`,

  DELETE_SIDENAV_REQ: `${entities} DELETE_SIDENAV_REQ`,
  DELETE_SIDENAV_SUC: `${entities} DELETE_SIDENAV_SUC`,
  DELETE_SIDENAV_FAIL: `${entities} DELETE_SIDENAV_FAIL`,

  EDIT_SIDENAV_REQ: `${entities} EDIT_SIDENAV_REQ`,
  EDIT_SIDENAV_SUC: `${entities} EDIT_SIDENAV_SUC`,
  EDIT_SIDENAV_FAIL: `${entities} EDIT_SIDENAV_FAIL`,

  SEARCH_SIDENAV_REQ: `${entities} SEARCH_SIDENAV_REQ`,
  SEARCH_SIDENAV_SUC: `${entities} SEARCH_SIDENAV_SUC`,
  SEARCH_SIDENAV_FAIL: `${entities} SEARCH_SIDENAV_FAIL`,



  fetchSideNavRequest: () => ({
    type: action.FETCH_SIDENAV_REQ
  }),

  addSideNavReq: (payload) => ({
    type: action.CREATE_SIDENAV_REQ,
    payload,
  }),

  dltSideNavReq: (id) => ({
    type: action.DELETE_SIDENAV_REQ,
    id,
  }),

  updateSideNavReq: (id, data) => ({
    type: action.EDIT_SIDENAV_REQ,
    id,
    data
  }),

  searchSideNavReq: (data) => ({
    type: action.SEARCH_SIDENAV_REQ,
    data
  }),


};

export default action;


