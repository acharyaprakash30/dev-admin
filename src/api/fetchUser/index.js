
import axios from '../axios';

export const fetchUser = (options) => {
    return axios.get('/users', options);
}

export const fetchUserByName=(name)=> {
    let searchQuery = new RegExp(name, 'gi');
    return axios.get(`/users/?filter[where][firstName][regexp]=${searchQuery}&&filter[limit]=8`);

}