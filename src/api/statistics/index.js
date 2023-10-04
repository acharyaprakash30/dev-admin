import axios from "../axios";

export const countUserApi = (options) => {
    return axios.get('/users/count', options);
}

export const countVendorApi = (options) => {
    return axios.get('/vendors', options);
}

export const countCategoryApi = (options) => {
    return axios.get('/categories/count', options);
}

export const countBrandApi = (options) => {
    return axios.get('/brands/count', options);
}

export const countDealApi = (options) => {
    return axios.get('/deals/count', options);
}

export const countCouponApi = (options) => {
    return axios.get('/coupons/count', options);
}

export const countOrderApi = (options) => {
    return axios.get('/orders/count', options);
}

export const countShopApi = (options) => {
    return axios.get('/shops/count', options);
}

export const countBannerApi = (options) => {
    return axios.get('/banners/count', options);
}