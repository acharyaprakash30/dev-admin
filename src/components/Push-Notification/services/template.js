import axios from '../../../api/axios';

export const pushNotifications = async () => await axios.get('/push-notifications');

export const createPushNotification = async (data) =>
  await axios.post('/push-notifications', data);

  export const deletePushNotification = async(id)=>{
    await axios.delete(`/push-notifications/${id}`);
    return true;
    }
  
    export const editPushNotifications = async (id,data) =>
    await axios.patch(`/push-notifications/${id}`, data);
