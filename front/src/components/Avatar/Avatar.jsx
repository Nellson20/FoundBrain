import React from 'react'
import { useRef } from 'react'
import { Camera } from 'react-bootstrap-icons'
import { useSelector } from 'react-redux'
import './Avatar.scss'
const Avatar = ({ user=null,online = true, height = 30, width = 30, radius = '50%', src = null,defaultSrc="/img/man.png", style = {}, editable = false,onChange=(e)=>{},className=null }) => {
  const {user:currentUser}=useSelector((store)=>store.user)
  const profilePicInpt=useRef()

  const clickInpt=()=>{
    profilePicInpt.current?.click()
  }

  return (
    <div className={`avatar relative${className ? ' '+className : ''}`} style={{ borderRadius: radius, width, height, ...style }}>
      <img src={src || defaultSrc} alt="" style={{ borderRadius: radius }} />
      {
        online ? <div className="online"></div> : ''
      }
      {
        (editable && currentUser && currentUser?.id===user?.id) && <div className="avatar-edit-btn" onClick={clickInpt}>
          <input ref={profilePicInpt} onChange={onChange} type="file" name="" style={{display:'none'}} id="" />
          <Camera size={18} />
        </div>
      }
    </div>
  )
}

export default Avatar
