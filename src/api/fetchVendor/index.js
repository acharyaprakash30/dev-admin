import axios from "../axios";

export const getVendorApi = (options) => {
  return axios.get('/vendors', options);
};

export const postVendorApi = (options) => {
  return axios.post('/admin/register/vendor', options);
};

export const deleteVendorApi = (id) => {
  return axios.delete(`/vendors/${id}`);
};
export const editVendorApi = (id, data) => {
  return axios.put(`/vendor/update/${id}`, data);
};

export const patchVendorCommissionApi = (id, data) => {
  return axios.patch(`/vendorCommission/${id}`, data);
};


export const getVendorApiById=(id)=> {
  return axios.get(`/vendors/${id}`);
}

export const getVendorProducts=(payload)=> {
  let array = [];
  let { page,pageSize,id} = payload
  if(page) array.push(`filter[skip]=${(page-1)*pageSize}`)
  if(pageSize) array.push(`filter[limit]=${pageSize}`)
    return axios.get(`/products/vendor/${id}?${array.join('&')}`)
}