import axios from "../axios";

export const postCategoryVariantApi = (options, id) => {
    return axios.post('/variants/${id}/category-variants', options);
}

export const getCategoryVariantApi = (options, id) => {
    return axios.get('/variants/${id}/category-variants', options);
}

export const getAllCategories = (options) => {
    return axios.get('/categories', options);
}

export const deleteCategoryVariantApi = (id) => {
    return axios.delete(`/variants/${id}/category-variants`);
}

export const editCategoryVariantApi = (id, data) => {
    return axios.patch(`/variants/${id}/category-variants`, data);
}