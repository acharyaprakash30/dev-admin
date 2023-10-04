import axios from "../axios";



export const sendVendorDocReq = (options) => {
    return axios.post('/vendor-document-specifications', options);
}