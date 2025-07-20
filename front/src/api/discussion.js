import axios from "../axios"

export const getDiscussions = () => {
    return axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/discussions`,
        method: 'get', withCredentials: true
    }).then((res) => res.data)
}

export const deleteDiscussion = (discuId) => {
    return axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/discussions/${discuId}`,
        method: 'delete', withCredentials: true
    }).then((res) => res.data)
}

export const getCities = (keyword) => {
    
}