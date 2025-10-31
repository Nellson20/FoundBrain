import axios from "../axios"

export const addContact=()=>{
        return axios({
            url: `${process.env.REACT_APP_API_DOMAIN}/contacts`,
            method: 'post', withCredentials: true
        }).then((res) => res.data)
}

export const getOnlineContacts=()=>{
    return axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/contacts/online`,
        method: 'post', withCredentials: true
    }).then((res) => res.data)
}

export const existContact=(userId)=>{
    return axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/contacts`,
        params: {
            'or[receiver.id]': userId,
            'or[requester.id]': userId
        },
        method: 'get', 
        withCredentials: true
    }).then((res) => {
        console.log('📡 API existContact response:', res.data)
        return res.data
    })
}

export const acceptContact=(contactId)=>{
    return axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/contacts/${contactId}/accept`,
        method: 'post', withCredentials: true
    }).then((res) => res.data)
}

export const requestContact=(receiver)=>{
    return axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/contacts`,
        data:{receiver},
        method: 'post', withCredentials: true
    }).then((res) => res.data)
}
