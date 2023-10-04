import Axios from '../axios';
const endpoint = '/banners';


export const createApi = (payload) => {
  return Axios.post(endpoint, payload);
};

export const updateApi = (id, payload) => {
    return Axios.patch(`${endpoint}/${id}`, payload);
};

export const readSingleApi = (id) => {
  return Axios.get(`${endpoint}/${id}`);
};

export const readApi = (payload) => {
    return Axios.get(`${endpoint}`, payload);
};

export const deleteApi = (id) => {
  return Axios.delete(`${endpoint}/${id}`);
};
