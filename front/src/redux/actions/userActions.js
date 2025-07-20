import { ADD_NOTIFICATION, SET_SOCKET, SET_USER,REMOVE_USER } from "../constants"

export const setConnectedUser = (user) => {
    return {
        type: SET_USER,
        payload: user
    }
}
export const removeConnectedUser=()=>{
    return {
        type: REMOVE_USER,
        payload:null
    }
}
export const setSocket=(socket)=>{
    return {
        type: SET_SOCKET,
        payload: socket
    }
}
export const addNotification = (notification) => {
    return {
        type: ADD_NOTIFICATION,
        payload: notification
    }
}