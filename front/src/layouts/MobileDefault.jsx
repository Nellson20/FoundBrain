import React,{useState} from 'react'
import Topbar from '../components/Topbar/Topbar'
import { Outlet } from 'react-router-dom'
import RightSidebar from '../components/RightSidebar/RightSidebar'

const MobileDefault = () => {
  const [openRightbar,setOpenRightbar]=useState(false)
  return (
    <>
        <Topbar setOpenRightbar={setOpenRightbar}/>
        <Outlet/>
        <RightSidebar opened={openRightbar} setOpened={setOpenRightbar}/>
    </>
    
  )
}

export default MobileDefault
