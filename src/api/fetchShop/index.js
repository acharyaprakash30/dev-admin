import axios from "../axios";

export const getShopApi = (options) => {
    return axios.get('/shops', options);
}

export const postShopApi = (options) => {
    return axios.post('/shops', options);
}
export const deleteShopApi = (id) => {
    return axios.delete(`/shops/${id}`);
}

export const editShopApi = (id, data) => {
    return axios.patch(`/shops/${id}`, data);
}