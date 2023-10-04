const entities = '[Form-Group]';

const action = {
  GET_FORM_GROUP_REQ: `${entities} GET_FORM_GROUP_REQ`,
  GET_FORM_SUC: `${entities} GET_FORM_SUC`,
  GET_FORM_FAIL: ` ${entities} GET_FORM_FAIL`,

  CREATE_FORMGROUP_REQ: `${entities} SEND_FORMGROUP_REQ`,

  EDIT_FORMGROUP_REQ: `${entities} EDIT_FORMGROUP_REQ`,
  EDIT_FORMGROUP_SUC: `${entities} EDIT_FORMGROUP_SUC`,
  EDIT_FORMGROUP_FAIL: `${entities} EDIT_FORMGROUP_FAIL`,

  getFormDataByCategory: (id) => ({
    type: action.GET_FORM_GROUP_REQ,
    payload: id,
  }),

  createFormgroupReq: (id, payload) => ({
    type: action.CREATE_FORMGROUP_REQ,
    id,
    payload,
  }),

  editFormgroupReq: (payload) => ({
    type: action.EDIT_FORMGROUP_REQ,
    payload,
  }),
};

export default action;
