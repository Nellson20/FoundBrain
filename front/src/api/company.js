import axios from "../axios"

export const getCompanies = ({pg=1,ipp=5,filters=null}) => {
    return axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/companies?pg=${pg}&${ipp ? `ipp=${ipp}` : ''}${filters ? `&${filters}` : ''}`,
        method: 'get', withCredentials: true,
        header: {
            'Content-Type': 'application/ld+json',
            'Accept': 'application/ld+json'
          }
    }).then((res) => res.data)
}

export const getCompany = (companyId) => {
    return axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/companies/${companyId}`,
        method: 'get', withCredentials: true
    }).then((res) => res.data)
}

export const getUserCompanies = (userId,keyword=null) => {
    return axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/users/${userId}/companies?${keyword ? `name=${keyword}`+'&' : ''}ipp=5`,
        method: 'get', withCredentials: true
    }).then((res) => res.data)
}
export const getCompanySizes = () => {
    return axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/company_sizes`,
        method: 'get', withCredentials: true
    }).then((res) => res.data)
}
export const getCompanyTypes = (keyword=null) => {
    return axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/company_types?ipp=5${(keyword && keyword.length>0) ? `&type=${keyword}` : ''}`,
        method: 'get', withCredentials: true
    }).then((res) => res.data)
}