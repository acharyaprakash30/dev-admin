const action = {
  GET_PROVINCE_REQ: 'GET_PROVINCE_REQ',
  GET_PROVINCE_SUC: 'GET_PROVINCE_SUC',
  GET_PROVINCE_FAIL: 'GET_PROVINCE_FAIL',

  GET_DISTRICT_REQ: 'GET_DISTRICT_REQ',
  GET_DISTRICT_SUC: 'GET_DISTRICT_SUC',
  GET_DISTRICT_FAIL: 'GET_DISTRICT_FAIL',

  GET_MUNICIPALITY_REQ: 'GET_MUNICIPALITY_REQ',
  GET_MUNICIPALITY_SUC: 'GET_MUNICIPALITY_SUC',
  GET_MUNICIPALITY_FAIL: 'GET_MUNICIPALITY_FAIL',

  GET_AREAS_REQ: 'GET_AREAS_REQ',
  GET_AREAS_SUC: 'GET_AREAS_SUC',
  GET_AREAS_FAIL: 'GET_AREAS_FAIL',

  EDIT_PROVINCE_REQ: 'EDIT_PROVINCE_REQ',
  EDIT_PROVINCE_SUC: 'EDIT_PROVINCE_SUC',
  EDIT_PROVINCE_FAIL: 'EDIT_PROVINCE_FAIL',

  EDIT_DISTRICT_REQ: 'EDIT_DISTRICT_REQ',
  EDIT_DISTRICT_SUC: 'EDIT_DISTRICT_SUC',
  EDIT_DISTRICT_FAIL: 'EDIT_DISTRICT_FAIL',

  EDIT_MUNICIPALITY_REQ: 'EDIT_MUNICIPALITY_REQ',
  EDIT_MUNICIPALITY_SUC: 'EDIT_MUNICIPALITY_SUC',
  EDIT_MUNICIPALITY_FAIL: 'EDIT_MUNICIPALITY_FAIL',

  EDIT_AREAS_REQ: 'EDIT_AREAS_REQ',
  EDIT_AREAS_SUC: 'EDIT_AREAS_SUC',
  EDIT_AREAS_FAIL: 'EDIT_AREAS_FAIL',

  EDIT_AREADATA: 'EDIT_AREADATA',

  DEL_AREA_REQ: 'DEL_AREA_REQ',
  DEL_AREA_SUC: 'DEL_AREA_SUC',
  DEL_AREA_FAIL: 'DEL_AREA_FAIL',

  ADD_AREA_REQ: 'ADD_AREA_REQ',
  ADD_AREA_SUC: 'ADD_AREA_SUC',
  ADD_AREA_FAIL: 'ADD_AREA_FAIL',

  ADD_MUNICIPALITY_REQ: 'ADD_MUNICIPALITY_REQ',
  ADD_MUNICIPALITY_SUC: 'ADD_MUNICIPALITY_SUC',
  ADD_MUNICIPALITY_FAIL: 'ADD_MUNICIPALITY_FAIL',

  DEL_MUNICIPALITY_REQ: 'DEL_MUNICIPALITY_REQ',
  DEL_MUNICIPALITY_SUC: 'DEL_MUNICIPALITY_SUC',
  DEL_MUNICIPALITY_FAIL: 'DEL_MUNICIPALITY_FAIL',


  fetchProvinceReq: (payload) => ({
    type: action.GET_PROVINCE_REQ,
    payload,
  }),

  editProvinceReq: (id, data) => ({
    type: action.EDIT_PROVINCE_REQ,
    id,
    data,
  }),
  fetchDistrictReq: (payload) => ({
    type: action.GET_DISTRICT_REQ,
    payload,
  }),

  editDistrictReq: (id, data) => ({
    type: action.EDIT_DISTRICT_REQ,
    id,
    data,
  }),
  fetchMunicipalityReq: (payload) => ({
    type: action.GET_MUNICIPALITY_REQ,
    payload,
  }),

  editMunicipalityReq: (id, data) => ({
    type: action.EDIT_MUNICIPALITY_REQ,
    id,
    data,
  }),
  fetchAreasReq: (payload) => ({
    type: action.GET_AREAS_REQ,
    payload,
  }),

  editAreasReq: (data) => ({
    type: action.EDIT_AREAS_REQ,
    data,
  }),
  editAreaData: (id, data, typo) => ({
    type: action.EDIT_AREADATA,
    id,
    data,
    typo,
  }),
  deleteArea: (id) => ({
    type: action.DEL_AREA_REQ,
    id,
  }),

  addNewMunicipality: (data) => ({
    type: action.ADD_MUNICIPALITY_REQ,
    data
  }),

  addNewArea: (data) => ({
    type: action.ADD_AREA_REQ,
    data,
  }),

  deleteMunicipality: (id) => ({
    type: action.DEL_MUNICIPALITY_REQ,
    id,
  }),



};
export default action;
