import axios from "../axios";

export const postReviewApi = (options) => {
    return axios.post('/categories', options);
}
export const getReviewApi = (options) => {
    return axios.get('/categories', options);
}
export const deleteReviewApi = (id) => {
    return axios.delete(`/categories/${id}`);
}
