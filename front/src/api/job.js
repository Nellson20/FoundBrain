import axios from "../axios"

export const getJobOffers = () => {
    return axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/job_offers?groups[]=job_offers_read`,
        method: 'get', withCredentials: true
    }).then((res) => res.data)
}

export const getJobOffer=(jobId)=>{
    return axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/job_offers/${jobId}?groups[]=job_offers_read`,
        method: 'get', withCredentials: true
    }).then((res) => res.data)
}

export const createJobOffer = (data) => {
    return axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/job_offers`,
        data,
        method: 'post', withCredentials: true
    }).then((res) => res.data)
}

export const getJobTypes = () => {
    return axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/job_types`,
        method: 'get', withCredentials: true
    }).then((res) => res.data)
}
export const getJobGrades = () => {
    return axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/job_grades`,
        method: 'get', withCredentials: true
    }).then((res) => res.data)
}

export const getJobTitles=(keyword=null)=>{
    return axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/job_offers?groups[]=job_titles${keyword ? `&title=${keyword}` : ''}`,
        method: 'get', withCredentials: true
    }).then((res) => res.data)
}
