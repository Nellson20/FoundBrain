import React,{useState} from 'react'
import Topbar from '../components/Topbar/Topbar'
import { Outlet } from 'react-router-dom'
import RightSidebar from '../components/RightSidebar/RightSidebar'

const Minimal = () => {
  const [openRightbar,setOpenRightbar]=useState(false)
  return (
        <Outlet/>
  )
}

export default Minimal
