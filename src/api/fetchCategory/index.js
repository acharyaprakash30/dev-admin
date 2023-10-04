import axios from "../axios";

export const postCategoryApi = (options) => {
    return axios.post('/categories', options);
}

export const getCategoryApi = (options) => {
    return axios.get('/categories', {
        params: {
            filter: options
        }
    });
}

export const countCategoryApi = (options) => {
    return axios.get('/categories/count', {
        params: {
            where: options
        }
    });
}


export const deleteCategoryApi = (id) => {
    return axios.delete(`/categories/${id}`);
}

export const editCategoryApi = (id, data) => {
    return axios.patch(`/categories/${id}`, data);
}
export const getSingleCategoryApi = (id) => {
    return axios.get(`/categories/${id}`);
}

export const fetchFormattedCategory = () => {
    return axios.get('/frontend/category-list');
}

export const getDeepLinkedCategoryByIdApi = () => {
    return axios.get(`/frontend/category-list`);
};