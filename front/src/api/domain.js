import axios from "../axios"

export const getDomains = () => {
    return axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/domains`,
        method: 'get', withCredentials: true,
        header: {
            'Content-Type': 'application/ld+json',
            'Accept': 'application/ld+json'
          }
    }).then((res) => res.data)
}
export const searchDomains = (keyword=null) => {
    return axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/domains?ipp=5${(keyword && keyword.length >0) ? `&title=${keyword}` : ''}`,
        method: 'get', withCredentials: true,
        header: {
            'Content-Type': 'application/ld+json',
            'Accept': 'application/ld+json'
          }
    }).then((res) => res.data)
}

export const getUserDomains=(userId)=>{
    return axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/users/${userId}/domains`,
        method: 'get', withCredentials: true,
    }).then((res) => res.data)
}