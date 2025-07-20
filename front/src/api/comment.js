import axios from "../axios"
import { transFormJsonLd } from "../functions"

export const getComments = (commentableId, ipp = 10) => {
    return axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/commentable_entities/${commentableId}/comments?exists[parent]=false&&ipp=${ipp}`,
        method: 'get', withCredentials: true
    }).then((res) => res.data)
}
export const getCommentReplies = (commentId, ipp = 10, pageParam) => {
    return axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/comments/${commentId}/replies?ipp=${ipp}&page=${pageParam}`,
        method: 'get',
        responseType: "json",
        headers: {
            'Accept': 'application/json+ld'
        },
        withCredentials: true
    }).then((res) => transFormJsonLd(res.data))
}

export const sendComment = (content,commentable,parent) => {
    return axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/comments`,
        method: 'post',
        data: {
            content,
            commentable,
            parent
        },
        withCredentials: true
    }).then((res) => res.data)
}
export const deleteComment=(commentId)=>{
    return axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/comments/${commentId}`,
        method: 'delete',
        withCredentials: true
    }).then((res) => res.data)
}

export const addReply=()=>{

}