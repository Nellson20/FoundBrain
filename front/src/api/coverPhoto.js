import axios from "../axios"

export const addCoverPhoto = (file) => {
    const data = new FormData()
    data.append('file',file)
    return axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/cover_images`,
        data,
        method: 'post', withCredentials: true
    }).then((res) => res.data)
}