import axios from '../api/axios';

export const getProvinces = async () => await axios.get('/provinces');
export const getDistrictByProvinceId = async (id) => {
  return await axios.get(`/provinces/${id}/districts`);
};

export const getMunicipalityByDistrictId = async (id) => {
  return await axios.get(`/districts/${id}/municipalities`);
};

export const getAreasByMunicipalityId = async (id) => {
  return await axios.get(`/municipalities/${id}/wards`);
};

export const getDistrict = async (payload) => {
  let { page, row, id } = payload;
  let array = [];
  if (id && id > 0) {
    return await axios.get(`/provinces/${id}/districts`);
  } else {
    if (page && row) array.push(`filter[skip]=${(page - 1) * row}`);
    if (row) array.push(`filter[limit]=${row}`);
    return await axios.get(`/districts?${array.join('&')}`);
  }
};

export const getMunicipality = async (payload) => {
  let { page, row, id } = payload;
  let array = [];

  if (id && id > 0) {
    return await axios.get(`/districts/${id}/municipalities`);
  } else {
    if (page && row) array.push(`filter[skip]=${(page - 1) * row}`);
    if (row) array.push(`filter[limit]=${row}`);
    return await axios.get(`/municipalities?${array.join('&')}`);
  }
};

export const getAreas = async (payload) => {
  let { page, row, id } = payload;
  let array = [];
  if (id && id > 0) {
    return await axios.get(
      `/municipalities/${id}/wards?filter[limit]=${row}&filter[skip]=${
        (page - 1) * row
      }`,
    );
  } else {
    if (page && row) array.push(`filter[skip]=${(page - 1) * row}`);
    if (row) array.push(`filter[limit]=${row}`);
    return await axios.get(`/wards?${array.join('&')}`);
  }
};

export const createShipping = async (data) =>
  await axios.post('/shippings', data);

export const deleteShipping = async (id) => {
  await axios.delete(`/shippings/${id}`);
  return true;
};

export const editShipping = async (id, data) =>
  await axios.patch(`/shippings/${id}`, data);

export const provincePatch = async (data, id) => {
  return await axios.patch(`/provinces/${id}`, data);
};

export const districtPatch = async (data, id) => {
  return await axios.patch(`/districts/${id}`, data);
};

export const municipalityPatch = async (data, id) => {
  return await axios.patch(`/municipalities/${id}`, data);
};

export const wardBulkPatch = async (data) => {
  return await axios.patch(`/bulkEdit/wards`, data);
};

export const addNewWard = async (data) => {
  return await axios.post(`/wards`, data);
};

export const addNewMunicipalityApi = async (data) => {
  console.log(data);
  return await axios.post(`/municipalities`, data);
};

export const deleteWardApi = async (id) => {
  return await axios.delete(`/wards/${id}`);
};

export const deleteMunicipalityApi = async (id) => {
  return await axios.delete(`/municipalities/${id}`);
};
