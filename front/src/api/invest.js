import axios from "../axios"

export const getInvests = ({ ipp= 5, pg= 1,filters=null }) => {
    return axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/invests?ipp=${ipp}${filters ? '&'+filters : ''}`,
        method: 'get', withCredentials: true
    }).then((res) => res.data)
}