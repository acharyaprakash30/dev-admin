import axios from "../axios";

export const postRoleApi = (options) => {
    return axios.post('/roles', options);
}

export const getRoleApi = (options) => {
    return axios.get('/roles', options);
}

export const deleteRoleApi = (id) => {
    return axios.delete(`/roles/${id}`);
}

export const editRoleApi = (id, data) => {
    return axios.patch(`/roles/${id}`, data);
}