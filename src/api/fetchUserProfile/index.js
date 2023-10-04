
import axios from '../axios';

export const getUserProfile = (options) => {
    return axios.get('/users/me', options);
}

export const updateUserProfile = (options, id) => {
    return axios.put(`/users/${id} `, options);
}