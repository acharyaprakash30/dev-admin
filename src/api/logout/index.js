import axios from "../axios";

export const getLogoutApi = (options) => {
    return axios.post('/logout', options);
}