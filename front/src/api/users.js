import axios from "../axios"

export const getUser = (userId) => {
    return axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/users/${userId}`,
        method: 'get', withCredentials: true
    }).then((res) => res.data)
}
export const getUsers = ({ ipp= 5, pg= 1,filters=null }) => {
    return axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/users?ipp=${ipp}${filters ? '&'+filters : ''}`,
        method: 'get', withCredentials: true
    }).then((res) => res.data)
}