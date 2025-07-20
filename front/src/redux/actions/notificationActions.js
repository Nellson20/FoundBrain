import { ADD_NOTIFICATION, SET_NOTIFICATIONS, REMOVE_NOTIFICATION } from "../constants"

export const setNotifications = (notifications) => {
    return {
        type: SET_NOTIFICATIONS,
        payload: notifications
    }
}
export const removeNotification=()=>{
    return {
        type: REMOVE_NOTIFICATION,
    }
}

export const addNotification = (notification) => {
    return {
        type: ADD_NOTIFICATION,
    }
}