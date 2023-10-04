import axios from '../axios';

export const postCouponApi = (options) => {
  return axios.post('/coupons', options);
};

export const getCouponApi = () => {
  return axios.get('/coupons');
};
export const deleteCouponApi = (id) => {
  return axios.delete(`/coupons/${id}`);
};

export const editCouponApi = (id, data) => {
  return axios.patch(`/coupons/${id}`, data);
};

export const editCouponByIdApi = (id, data) => {
  return axios.put(`/coupons/${id}`, data);
};
