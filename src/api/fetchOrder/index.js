import axios from "../axios";

let OD_CANCELLED = "OD_CANCELLED";


export const fetchOrderApi = ({page,perPage,selectedStatus,tenant}) => {
    let query =[];
    if(page) query.push(`filter[limit]=${perPage}`);
    if(perPage) query.push(`filter[skip]=${(page-1)*perPage}`);
    if(selectedStatus) query.push(`filter[where][status]=${selectedStatus}`)
    if(tenant) query.push(`filter[where][tenantId]=${tenant}`)
    query.push(`filter[order]=createdOn%20DESC`);
    return axios.get(`/orders?${query.join('&')}`);
}


export const fetchVendorCountApi = () => {
    return axios.get(`/orderCount/vendors`);
}

export const editOrderApi = (status, id, text) => {
    let object = {
        "order_code": OD_CANCELLED,
        "status": status,
        "remarks": text ? text : `Order has been ${status}`
    }
    return axios.patch(`/orders/changeStatus/?id=${id}`, object)
}

export const relatedVendors=(id)=>{
    return axios.get(`/vendorwithProducts/${id}`);
}

export const transferOrder =(data)=>{
    return axios.post(`/changeOrder`,data);
}

export const ordersDeliveredCountApi = () =>
    axios.get(`/orders/count?[where][status]=delivered`);

export const ordersPendingCountApi = () =>
    axios.get(`/orders/count?[where][status]=pending`);

export const ordersActiveCountApi = () =>
    axios.get(`/orders/count?[where][status]=confirmed`);

export const ordersCancelCountApi = () =>
    axios.get(`/orders/count?[where][status]=rejected`);

export const ordersProcessingCountApi=()=>{
    return axios.get('/orders/count?[where][status]=processing')
}

export const ordersOutForDeliveryCountApi=()=>{
    return axios.get('/orders/count?[where][status]=outForDelivery')
}

export const ordersPaidCountApi=()=>{
    return axios.get('/orders/count?[where][status]=paid')
}