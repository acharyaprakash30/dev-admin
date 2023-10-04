import axios from '../axios';

export const getFormConfigApi = (id) => {
  return axios.get(`/category/${id}/category-form-group`);
};
