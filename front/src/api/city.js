import axios from "../axios"

export const getCitiesList = ({ ipp= 10, pg= 1,filters=null }) => {
    return axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/cities?ipp=${ipp}${filters ? '&'+filters : ''}`,
        method: 'get', withCredentials: true
    }).then((res) => res.data)
}