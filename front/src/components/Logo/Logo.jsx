import React from 'react'
import './Logo.scss'
import Avatar from '../Avatar/Avatar'

const Logo = ({src=null,defaultSrc=null,height=60,width=60,online=false}) => {
  return (
    <Avatar className='logo-avatar' online={online} {...{height,width}} src={src} defaultSrc={defaultSrc || '/img/logo/logoblackwhite.png'}/>
  )
}

export default Logo
