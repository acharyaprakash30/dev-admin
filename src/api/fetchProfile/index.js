import axios from "../axios";

export const getProfileApi = (options) => {
    return axios.get('/profile', options)
}