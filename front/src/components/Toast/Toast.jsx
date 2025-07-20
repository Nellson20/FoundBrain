import React from 'react'
import { X, XLg } from 'react-bootstrap-icons'
import { toast } from 'react-toastify'

const Toast = ({ content,closeToast }) => (
    <div className='toast flex gap-10'>
        <div>{content}</div>
        {/* <div className="close-toast" onClick={closeToast}>
            <X />
        </div> */}
    </div>

)

export default Toast
