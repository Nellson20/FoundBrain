import axios from "../axios"

export const getPost = (postId) => {
    return axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/posts/${postId}`,
        method: 'get', withCredentials: true
    }).then((res) => res.data)
}

export const getPosts = ({pg=1,ipp=5,filters=null}) => {
    return axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/posts?pg=${pg}&${ipp ? `ipp=${ipp}` : ''}${filters ? `&${filters}` : ''}`,
        method: 'get', withCredentials: true,
    }).then((res) => res.data)
}

export const addPostEvaluation=(postId)=>{
    return axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/posts/${postId}/evaluations`,
        method: 'post', withCredentials: true,
    }).then((res) => res.data)
}

