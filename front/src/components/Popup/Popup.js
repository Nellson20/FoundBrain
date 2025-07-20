import React, { useContext } from 'react'
import Modal from '../Modal/Modal'
import { useSearchParams,useNavigate, useLocation  } from 'react-router-dom'
import { useGetParameter, useGetPopupState } from './../../Hooks/PopupHooks'
import { GET_ENUMS, GET_PARAMS } from '../../constants/popupConstants'
import Image from '../../pages/Image/Image'

const Popup = ({children}) => {
    const navigate = useNavigate()

    return (<Modal open={true} animation={false}>
                    {
                        children
                    }
                </Modal>)
}

export default Popup