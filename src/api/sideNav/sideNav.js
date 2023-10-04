import axios from '../axios'


export const fetchsideNavApi = () => {
    return axios.get('/site-nav');

}
export const addSideNavApi = (options) => {
    return axios.post('/site-nav', options);
}

export const deleteSideNavApi = (id) => {
    return axios.delete(`/site-nav/${id}`);
}

export const updateSideNavApi = (id, data) => {
    return axios.patch(`/site-nav/${id}`, data);
}

