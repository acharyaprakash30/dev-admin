import axios from '../axios';

export const getPlaceHolderGroupsApi = () => {
    return axios.get('/placeholders');
}

export const getSinglePlaceHolderGroupsApi = (id) => {
    return axios.get(`/placeholders/${id}`);
}

export const addPlaceHolderGroupApi = (options) => {
    return axios.post('/placeholders', options);
}

export const deletePlaceHolderGroupApi = (id) => {
    return axios.delete(`/placeholders/${id}`);
}

export const updatePlaceHolderGroupApi = (id, data) => {
    return axios.patch(`/placeholders/${id}`, data);
}
