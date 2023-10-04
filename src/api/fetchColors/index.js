import axios from "../axios";

export const postColorApi = (options) => {
    return axios.post('/colors', options);
}

export const getColorApi = (options) => {
    return axios.get('/colors', options);
}
export const deleteColorApi = (id) => {
    return axios.delete(`/colors/${id}`);
}

export const editColorApi = (id, data) => {
    return axios.patch(`/colors/${id}`, data);
}