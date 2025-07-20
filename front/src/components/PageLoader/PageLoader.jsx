import React from 'react'
import Modal from '../Modal/Modal'
import './PageLoader.scss'

const PageLoader = ({ open = true }) => {
    return (
        <Modal className="page-loader" open={open}>
            <div className='logo'>
                <img src="/img/logo/logo.gif" alt="" />
                {/* <div className="loading-screen">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                </div> */}
            </div>
        </Modal>
    )
}

export default PageLoader
