import axios from '../axios';

export const postDealApi = (options) => {
  return axios.post('/deals', options);
};
export const updateDealApi = (payload, id) => {
  return axios.patch(`/deals/${id}`, payload);
};
export const getDealApi = (id) => {
  if (id) return axios.get(`/deals/${id}`);
  else return axios.get('/deals');
};
export const deleteDealApi = (id) => {
  return axios.delete(`/deals/${id}`);
};
