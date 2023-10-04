import axios from '../axios';

//formfield
export const sendFormReq = (options) => {
  return axios.post('/category-form', options);
};

export const getFormReq = (id) => {
  return axios.get(`category/${id}/category-form-group`);
};

//formGroup

export const sendFormgroupReq = (id, body) => {
  return axios.post(`/category/${id}/category-form-group`, body);
};

export const editFormgroupReq = (payload) => {
  return axios.patch(`/category-form-groups`, payload);
};