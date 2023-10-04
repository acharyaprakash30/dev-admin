import Axios, { clientKeys } from '../axios';

export const getToken = (options) => {
  return Axios.post('/auth/admin-login', { ...clientKeys, ...options });
};

export const getAccessToken = (options) => {
  return Axios.post('/auth/token', {
    clientId: clientKeys.client_id,
    ...options,
  });
};
export const getCurrentUser = (options) => {
  return Axios.get('/users/me', options);
};

export const logoutApi = (options) => {
  return Axios.post('/logout', options);
};
