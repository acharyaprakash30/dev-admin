import axios from "../axios";

export const getEmailApi = () => {
    return axios.get("/emails");
}

export const createEmailApi = (payload) => {
    return axios.post('/emails', payload);
}

export const singleEmailApi = ({id}) => {
    return axios.get(`/emails/${id}`);
} 

export const editEmailApi = ({id, payload}) => {
    return axios.patch(`/emails/${id}`, payload);
}

export const deleteEmailApi = ({id}) => {
    return axios.delete(`/emails/${id}`);
}