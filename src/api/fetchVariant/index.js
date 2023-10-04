import axios from "../axios";

export const postVariantDashboardApi = (options) => {
    return axios.post('/variants', options, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export const postVariantApi = (options) => {
    return axios.post('/admin-product-variants', options, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export const postVariantBulkApi = (options) => {
    return axios.post('/admin-product-variants/bulk', options, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export const getVariantApi = (options) => {
    return axios.get('/admin-product-variants', options);
}

export const getVariantDashBoardApi = (options) => {
    return axios.get('/variants', options);
}

export const deleteVariantApi = (id) => {
    return axios.delete(`/admin-product-variants/${id}`);
}

export const deleteDashboardVariantApi = (id) => {
    return axios.delete(`/variants/${id}`);
}

export const editVariantApi = (id, data) => {
    return axios.patch(`/admin-product-variants/${id}`, data);
}

export const editDashboardVariantApi = (id, data) => {
    return axios.patch(`/variants/${id}`, data);
}

export const fetchVariantColorApi = () => {
    return axios.get('/colors');
};

export const fetchProductVariantApi = (id) => {
    // return Axios.get(`/variants/${id}/category-variants`);
    return axios.get(`/admin-product-variants?filter[where][adminProductId]=${id}`)

};

export const fetchVariantAttributeApi = (id) => {
    return axios.get(`categories/${id}/variants`);
};