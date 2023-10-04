import { map } from 'leaflet';
import axios from '../axios';

export const productsCountApi = () => axios.get('/products/count');

export const customersCountApi = () => axios.get('/users/count');

export const ordersCountApi = () => axios.get(`/orders/count`);

export const ordersDeliveredCountApi = () =>
  axios.get(`/orders/count?[where][status]=delivered`);

export const ordersProcessingCountApi = () =>
  axios.get(`/orders/count?[where][status]=processing`);

export const ordersPaidCountApi = () =>
  axios.get(`/orders/count?[where][status]=paid`);

export const ordersPendingCountApi = () =>
  axios.get(`/orders/count?[where][status]=pending`);

export const ordersRejectedCountApi = () =>
  axios.get(`/orders/count?[where][status]=rejected`);

export const ordersActiveCountApi = () =>
  axios.get(`/orders/count?[where][status]=confirmed`);

export const ordersOutForDeliveryApi = () =>
  axios.get('/orders/count?[where][status]=outForDelivery');
export const ordersCancelCountApi = () =>
  axios.get(`/orders/count?[where][status]=rejected`);

export const categoriesCountApi = () => axios.get('/categories/count');

export const brandsCountApi = () => axios.get('/brands/count');


export const totalSalesApi = async () => {
  let response = await axios.get(`/orders?filter[where][status]=paid`);
  let totalSale = 0;
  Array.isArray(response?.data.orderItems) &&
    response.data.orderItems.map((item) => {
      return (totalSale = totalSale + item.amount);
    });
  return totalSale;
};

export const getMonthWiseOrderCount = (dateFormat) => {
  dateFormat.map((date) => {
    axios.get(
      `/orders/count?filter[where][createdOn][between][0]=${date.from}&filter[where][createdOn][between][1]=${date.to}&filter[order]=createdOn%20DESC`,
    );
  });
};
