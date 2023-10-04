import axios from 'axios';

export const getShippins = async () => await axios.get('/shippings');

export const createShipping = async (data) =>
  await axios.post('/shippings', data);
