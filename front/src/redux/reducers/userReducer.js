import { ADD_NOTIFICATION, SET_SOCKET, SET_USER, REMOVE_USER, REMOVE_NOTIFICATION } from "../constants";

const initialState = {
    user: null,
    userDomains: [],
    newNotifications: 0,
    socket: null
}


const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case REMOVE_USER:
            return {
                ...state,
                user: null
            };
        case SET_USER:
            return {
                ...state,
                user: { ...action.payload }
            }
        case ADD_NOTIFICATION:
            return {
                ...state,
                newNotifications: state.newNotifications + 1
            }
        case REMOVE_NOTIFICATION:
            return {
                ...state,
                newNotifications: state.newNotifications - 1
            }

        default:
            return state
    }
}

export default userReducer