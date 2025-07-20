import axios from "../axios"

export const getLanguages = () => {
    return axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/languages`,
        method: 'get', withCredentials: true,
        header: {
            'Content-Type': 'application/ld+json',
            'Accept': 'application/ld+json'
          }
    }).then((res) => res.data)
}