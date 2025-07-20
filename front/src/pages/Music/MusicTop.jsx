import React,{useState} from 'react'
import './MusicTop.scss'
import Searchbar from '../../components/Searchbar/Searchbar'
import RequireAuthOnClick from '../../components/RequireAuthOnclick/RequireAuthOnClick'
import { Link } from 'react-router-dom'
import { ChatSquareQuote, Bell, ChevronLeft, Person } from 'react-bootstrap-icons'
import Avatar from '../../components/Avatar/Avatar'
import { useSelector } from 'react-redux'
import RightSidebar from '../../components/RightSidebar/RightSidebar'


const MusicTop = ({ setOpenRightbar = () => { } }) => {
  const { user } = useSelector(store => store.user)
  return (
    <>
      <div id='music-top' className='flex align-items-center'>
        <div className="left">
          <Link to='/musique'><img src='/img/logo/afrimuzlogo.png'/></Link>
        </div>
        <div className="center">
          <Searchbar placeholder='Rechercher une musique sur Afrimuz' />
        </div>
        <div className="right flex gap-5">
          <RequireAuthOnClick>
            <Link to="/messages"><ChatSquareQuote size={22} /></Link>
          </RequireAuthOnClick>

          <span><Bell size={22} /></span>

          {
            user ?
              <span className='flex gap-5 align-items-center' onClick={() => {
                setOpenRightbar(true)
              }}>
                <Avatar src={user?.activeProfilePicture && user?.activeProfilePicture?.fileUrl} />
                <ChevronLeft size={16} />
              </span>
              :
              <Link to="/connexion"><Person size={23} /> Se connecter</Link>
          }
        </div>
      </div>
      
    </>
  )
}

export default MusicTop
