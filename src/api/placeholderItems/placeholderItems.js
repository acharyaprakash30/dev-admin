import axios from '../axios'


export const fetchPlaceholderItems = () => {
    return axios.get('/placeholder-items');

}

export const singlePlaceholderItems = (id) => {
    return axios.get(`/placeholders/${id}/items`);
}

export const addPlaceholderItem = (options) => {
    return axios.post('/placeholder-items', options);
}

export const deletePlaceholderItem = (id) => {
    return axios.delete(`/placeholder-items/${id}`);
}

export const updatePlaceholderItem = (id, data) => {
    return axios.patch(`/placeholder-items/${id}`, data);
}


