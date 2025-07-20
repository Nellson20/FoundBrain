import React,{useContext, useEffect, useState} from 'react'
import Topbar from '../components/Topbar/Topbar'
import { Outlet } from 'react-router-dom'
import RightSidebar from '../components/RightSidebar/RightSidebar'
import { DESKTOP, SMARTPHONE,TABLET } from '../constants/MediaTypeConstants'
import MediaContext from '../context/MediaContext'
import BottomNav from '../components/BottomNav/BottomNav'
import MobileTopbar from '../components/MobileTopbar/MobileTopbar'
const Default = () => {
  const {deviceType} = useContext(MediaContext)
  const [openRightbar,setOpenRightbar]=useState(false)
  return (
    <>
        {
          deviceType===DESKTOP ? <Topbar setOpenRightbar={setOpenRightbar}/> : <MobileTopbar setOpenRightbar={setOpenRightbar}/>
        }
        <Outlet/>
        {
          (((deviceType === SMARTPHONE) || (deviceType===TABLET)) && !window.location.pathname.startsWith("/messages")) ? <BottomNav/> : ""
        }
        <RightSidebar opened={openRightbar} setOpened={setOpenRightbar}/>
    </>
    
  )
}

export default Default
