import React, { useContext, useEffect, useState } from 'react'
import './MusicLayout.scss'
import Topbar from '../components/Topbar/Topbar'
import { Outlet } from 'react-router-dom'
import RightSidebar from '../components/RightSidebar/RightSidebar'
import { DESKTOP, SMARTPHONE, TABLET } from '../constants/MediaTypeConstants'
import MediaContext from '../context/MediaContext'
import BottomNav from '../components/BottomNav/BottomNav'
import MobileTopbar from '../components/MobileTopbar/MobileTopbar'
import MusicTop from '../pages/Music/MusicTop'
import MusicLeft from '../pages/Music/MusicLeft'
const MusicLayout = () => {
  const { deviceType } = useContext(MediaContext)
  const [openRightbar, setOpenRightbar] = useState(false)
  return (
    <>
      <MusicTop setOpenRightbar={setOpenRightbar}/>
      <main className='music-main flex'>
        <MusicLeft />
        <div className="music-center flex-grow-1">
          <Outlet />
        </div>
      </main>
      <RightSidebar opened={openRightbar} setOpened={setOpenRightbar} />
    </>

  )
}

export default MusicLayout
