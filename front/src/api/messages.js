import axios from "../axios"

export const deleteMessage=(messageId)=>{
    return axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/messages/${messageId}`,
        method: 'delete',
        withCredentials: true
    }).then((res) => res.data)
}