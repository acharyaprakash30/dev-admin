import axios from "../axios";

export const postPageDataApi = (options) => {
    return axios.post('/pages', options);
}

export const postAppSettingApi = (options) => {
    return axios.post('/app-configs', options);
}
export const getAppSettingApi = (options) => {
    return axios.get('/app-configs', options);
}


export const getSingleAppSettingApi = (id) => {
    return axios.get(`/app-configs/${id}`);
}

export const editAppSettingApi = (id, data) => {
    return axios.put(`/app-configs/${id}`, data);
}
export const deleteAppSettingApi = (id) => {
    return axios.delete(`/app-configs/${id}`);
}

