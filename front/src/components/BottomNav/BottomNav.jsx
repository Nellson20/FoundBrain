import React, { useState } from 'react'
import './BottomNav.scss'
import { Link } from 'react-router-dom'
import { HouseDoor, Briefcase, Buildings, PersonVideo2, ChatSquareQuote, Bell, ChevronLeft, Plus, GlobeEuropeAfrica } from 'react-bootstrap-icons'
import Searchbar from '../Searchbar/Searchbar'
import Avatar from '../Avatar/Avatar'
import DropDown from '../DropDown/DropDown'
import PostModal from '../PostModal/PostModal'
import DoNavLink from '../DoNavLink/DoNavLink'
const BottomNav = ({ setOpenRightbar = () => { } }) => {
  const [openPostModal, setOpenPostModal] = useState(false)
  return (
    <>
      <div id='bottom-nav' className='flex px-10'>
        <nav className='flex align-items-center'>
          <ul className="topbar-menu flex align-items-center">
            <li>
              <DoNavLink to="/" activeClass='active'>
                <HouseDoor strokeWidth={0.1} size={20} />
                <span>Accueil</span>
              </DoNavLink>
            </li>
            <li>
              <DoNavLink to="/emplois" activeClass='active'>
                <Briefcase strokeWidth={0.1} size={20} />
                <span>Emplois</span>
              </DoNavLink>
            </li>
            <li>
              <DoNavLink to="/explorer" activeClass='active'>
                <GlobeEuropeAfrica strokeWidth={0.1} size={20} />
                <span>Explorer</span>
              </DoNavLink>
            </li>
            <li>
              <DoNavLink className='top-to-afrimuz' to="/musique" activeClass='active'>
                <img src='/img/logo/afrimuz2.png' width={46}/>
              </DoNavLink>
            </li>
          </ul>
        </nav>
      </div>
    </>

  )
}

export default BottomNav
