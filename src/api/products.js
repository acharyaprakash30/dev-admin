import { getBearerToken } from '../helper/utility';
import { APP_CONFIG } from '../app/config';
import Axios from './axios';
import axios from 'axios';

export const fetchProductsApi = (payload) => {
  if (payload) {
    let { page, perpage, id, search } = payload;
    let query = [];

    if (perpage) query.push(`filter[limit]=${perpage}`);
    if (page) query.push(`filter[skip]=${perpage * (page - 1)}`);
    if (id) query.push(`filter[where][shop_id]=${id}`);
    if (search) {
      let searchQuery = new RegExp(search, 'gi');
      query.push(`filter[where][name][regexp]=${searchQuery}`);
    }

    return axios.get(`${APP_CONFIG.API_BASE_URL}/products?${query.join('&')}`);
  } else {
    return Axios.get(`/products`);
  }
};

export const fetchCategoriesApi = () => {
  return Axios.get(`/categories`);
};

export const fetchEmailApi = () => {
  return Axios.get('/emails');
};

export const fetchBrandsApi = () => {
  return Axios.get(`/brands`);
};

export const addProductApi = (options) => {
  return Axios.post('/admin-products', options);
};

export const getProductApi = (filter) => {
  let filterArr = [];
  const {
    isPublish,
    brand,
    category,
    noCategory,
    selectCategory,
    isActive,
    lowStock,
    date,
    page,
    pageSize,
  } = filter;

  const currentPage = page || 1;
  const limit = pageSize || 10;

  if (pageSize) filterArr.push(`filter[limit]=${limit}`);

  // page = 1, pagesize = 10
  let skip = (currentPage - 1) * pageSize;
  filterArr.push(`filter[skip]=${skip}`);

  if (brand && brand !== 'all')
    filterArr.push(`filter[where][brands][name]=${brand}`);
  if (category && category !== 'all')
    filterArr.push(`filter[where][category]=${category}`);
  if (isActive) filterArr.push(`filter[where][isActive]=${isActive}`);
  if (isPublish) filterArr.push(`filter[where][published]=${isPublish}`);
  if (lowStock) filterArr.push(`filter[where][stock][lte]=${lowStock}`);

  if (date)
    filterArr.push(
      `filter[where][createdOn][gte]=${date?.startDate}&filter[where][createdOn][lte]=${date?.endDate}`,
    );
  if (noCategory) {
    filterArr.push(`filter[where][category_id]=${''}`);
  }
  if (selectCategory !== 'all' && selectCategory !== undefined) {
    filterArr.push(`filter[where][category_id]=${selectCategory}`);
  }

  return Axios.get(`/admin-products?${filterArr.join('&')}`);
};

export const getDashboardApi = (query) => {
  return Axios.get(`/${query}`);
};

export const editProductApi = (id, data) => {
  return Axios.patch(`/admin-products/${id}`, data);
};

export const deleteProductApi = (id) => {
  return Axios.delete(`/admin-products/${id}`);
};

export const getProductByIdApi = (id) => {
  return Axios.get(`/admin-products/${id}`);
};

export const uploadImagesApi = (data) => {
  return Axios.post(`/admin-product-image`, data);
};

export const fetchProductImagesApi = (id) => {
  return Axios.get(`/admin-product-image/?filter[where][adminProductId]=${id}`);
  // return Axios.get(`/admin-product-image/${id}`);
};

export const deleteProductImageApi = (id) => {
  return Axios.delete(`/admin-product-image/${id}`);
};

export const getVariantsApi = (id) => {
  return Axios.get(`categories/${id}/variants`);
};

export const fetchProductVariantApi = (id) => {
  // return Axios.get(`/variants/${id}/category-variants`);
  return Axios.get(
    `/admin-product-variants?filter[where][adminProductId]=${id}`,
  );
};

export const addProductDealsApi = (id, payload) => {
  const apiUrl = APP_CONFIG.API_BASE_URL + `/deals/${id}/product-deals`;
  const accessToken = getBearerToken();
  return fetch(apiUrl, {
    method: 'POST',
    headers: !accessToken ? headers : authHeaders(accessToken),
    body: JSON.stringify(payload),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      throw new Error('Server Error: ' + err.toString());
    });
};

export const fetchSearchQueryApi = (payload) => {
  // return Axios.get(`/product/search?q=${payload}`);
  return Axios.get(
    `/admin-products?[filter][where][name]=${payload}&[filter][where][sku]=${payload}&[filter][where][createdUser]=${payload}`,
  );
};

const headers = {
  'Content-type': 'application/json',
  Accept: '*/*',
  'access-control-allow-methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'Access-Control-Allow-Origin': '*',
};

const authHeaders = (accessToken) => ({
  ...headers,
  Authorization: accessToken,
});
