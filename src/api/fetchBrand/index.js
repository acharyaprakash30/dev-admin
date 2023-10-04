import axios from "../axios";

export const postBrandApi = (options) => {
    return axios.post('/brands', options);
}

export const getBrandApi = (options) => {
    return axios.get('/brands', options);
}

export const deleteBrandApi = (id) => {
    return axios.delete(`/brands/${id}`);
}

export const editBrandApi = (id, data) => {
    return axios.patch(`/brands/${id}`, data);
}