import axios from 'axios'
import Cookies from 'js-cookie'

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_DOMAIN,
  timeout: 60000, 
  withCredentials: true,
});


instance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('BEARER')
    console.log('Token JWT récupéré:', token ? 'Présent' : 'Absent')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default instance