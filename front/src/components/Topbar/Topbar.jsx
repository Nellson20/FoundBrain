import React, { useContext, useEffect, useState } from 'react'
import './Topbar.scss'
import { Link, useNavigate } from 'react-router-dom'
import { HouseDoor, Briefcase, Buildings, PersonVideo2, ChatSquareQuote, Bell, ChevronLeft, Plus, GlobeEuropeAfrica, Person, PlayCircle, PlayBtn, Grid3x3Gap, Calendar3,ChatDots,HouseDoorFill } from 'react-bootstrap-icons'
import Searchbar from '../Searchbar/Searchbar'
import Avatar from '../Avatar/Avatar'
import DropDown from '../DropDown/DropDown'
import PostModal from '../PostModal/PostModal'
import CreatePostModal from '../CreatePostModal/CreatePostModal'
import DoNavLink from '../DoNavLink/DoNavLink'
import { useSelector } from 'react-redux'
import RequireAuthOnClick from '../RequireAuthOnclick/RequireAuthOnClick'
import SocketIOContext from '../../context/SocketIOContext'
import CaretInput from '../CaretInput/CaretInput'
import CurrencySelector from '../CurrencySelector/CurrencySelector'
import CurrencyContext from '../../context/CurrencyContext'
import NavigableList from '../Input/NavigableList/NavigableList'
import LanguageSelector from '../Language/LanguageSelector';
import Settings from '../../pages/Settings/Settings'
import { useTranslation } from 'react-i18next'

import millify from 'millify'
const Topbar = ({ setOpenRightbar = () => { } }) => {
  const { t } = useTranslation()
  const [openPostModal, setOpenPostModal] = useState(false)
  const [openCreatePostModal, setOpenCreatePostModal] = useState(false)
  const { user, socket } = useSelector(state => state.user)
  const navigate = useNavigate()
  const { newNotifications } = useSelector(store => store.user)

  

  return (
    <>
      <header id='topbar' className={`sticky flex bottom-shaddow-1${window.location.pathname.startsWith("/landing") ? " transparent" : ""}`}>
        <div className="left flex px-15 align-items-center">
          {/* <Link to="/"><img src="/img/logo/GATEAFR.png" alt="" /></Link> */}
          <h2>Logo</h2>
        </div>
        <nav className='flex align-items-center'>
          <ul className="topbar-menu flex align-items-center">
            <li>
              <DoNavLink to="/" activeClass='active'>
                <HouseDoorFill style={{ marginTop: 3 }} strokeWidth={0.1} size={23} />
              </DoNavLink>
            </li>
            <li>
              <DoNavLink to="/explorer" activeClass='active'>
                <GlobeEuropeAfrica strokeWidth={0.1} size={23} />
              </DoNavLink>
            </li>
            <li>
              <RequireAuthOnClick>
                <button 
                  className='topbar-mew-btn btn-purple flex align-items-center'
                  onClick={() => setOpenCreatePostModal(true)}
                >
                  <Plus size={26} />
                </button>
              </RequireAuthOnClick>
            </li>
            <li>
              <DoNavLink to="/emplois" activeClass='active'>
                <Briefcase style={{ marginTop: 4 }} strokeWidth={0.1} size={24} />
              </DoNavLink>
            </li>
            <li>
              <Searchbar expandable={true} onSubmit={(e) => navigate(`/recherche?k=${e.target.value}`)} />
            </li>
          </ul>
        </nav>
        
        <div className="right flex px-15 align-items-center justify-content-end">
          <CurrencySelector />
          <RequireAuthOnClick>
            <Link to="/messages" className="topbar-icon-circle"><ChatDots size={22} color="#333" /></Link>
          </RequireAuthOnClick>
          <RequireAuthOnClick>
            <Link to="/notifications" className="topbar-icon-circle">
              <Bell size={22} color="#333" />
              {newNotifications > 0 ? <div className="badge">{millify(newNotifications)}</div> : ''}
            </Link>
          </RequireAuthOnClick>
          
          {
            user ?
              <span className='profile flex gap-5 align-items-center' onClick={() => {
                setOpenRightbar(true)
              }}>
                <Avatar width={36} height={36} src={user?.activeProfilePicture && user?.activeProfilePicture?.fileUrl} />
              </span>
              :
              <Link to="/connexion" className="topbar-icon-circle"><Person size={23} color="#333"/></Link>
          }
          
        </div>
      </header>
      <PostModal isOpen={openPostModal} setIsOpen={setOpenPostModal} />
      <CreatePostModal open={openCreatePostModal} setOpen={setOpenCreatePostModal} />
    </>

  )
}

export default Topbar
