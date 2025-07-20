import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { GET_PARAMS } from './../constants/popupConstants'
export const useGetParameter = (name) => {
    const { search } = useLocation()
    const query = new URLSearchParams(search)
    return query.get(name)
}
export const useGetPopupState = () => {
    const popupName = useGetParameter(GET_PARAMS.popup)
    const [mountedPopup, setMountedPopup] = useState(popupName)
    let timeout = null
    useEffect(() => {
        if (popupName) {
            timeout!=null && clearTimeout(timeout);
            setMountedPopup(popupName)
        } else {
            timeout = setTimeout(() => {
                setMountedPopup(null)
            }, 3000)
        }
    }, [popupName])
    const isOpened = Boolean(popupName)
    return { mountedPopup, isOpened }
}