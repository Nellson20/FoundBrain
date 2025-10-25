import axios from "../axios"

export const getUser = (userId) => {
    return axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/users/${userId}?groups[]=users_read`,
        method: 'get', withCredentials: true
    }).then((res) => {
        console.log('getUser API response:', res.data); // Debug
        return res.data;
    })
}
export const getUsers = ({ ipp= 5, pg= 1,filters=null }) => {
    return axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/users?groups[]=users_read&ipp=${ipp}${filters ? '&'+filters : ''}`,
        method: 'get', withCredentials: true
    }).then((res) => res.data)
}