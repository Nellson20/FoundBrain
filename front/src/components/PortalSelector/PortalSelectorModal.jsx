import React from 'react'
import Modal from "../Modal/Modal"
import PortalSelector from './PortalSelector'
const PortalSelectorModal = ({onSelect}) => {
  return (
    <Modal open={true}>
        <PortalSelector/>
    </Modal>
  )
}

export default PortalSelectorModal
