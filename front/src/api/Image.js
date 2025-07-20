import axios from "../axios"

export const getImage=(imageId)=>{
    return axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/images/${imageId}`,
        method: 'get',
    }).then((res) => res.data)
}

export const getImageEvaluations=(imageId)=>{
    return axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/images/${imageId}/evaluations`,
        method: 'get', withCredentials: true,
    }).then((res) => res.data)
}