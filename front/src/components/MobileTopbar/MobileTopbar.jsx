import React, { useState } from 'react'
import './MobileTopbar.scss'
import { Link } from 'react-router-dom'
import { HouseDoor, Briefcase, Buildings, PersonVideo2, ChatSquareQuote, Bell, ChevronLeft, Plus, GlobeEuropeAfrica, JustifyRight } from 'react-bootstrap-icons'
import Searchbar from '../Searchbar/Searchbar'
import Avatar from '../Avatar/Avatar'
import DropDown from '../DropDown/DropDown'
import PostModal from '../PostModal/PostModal'
import DoNavLink from '../DoNavLink/DoNavLink'
import RequireAuthOnClick from '../RequireAuthOnclick/RequireAuthOnClick'
import NavigableList from '../Input/NavigableList/NavigableList'
const MobileTopbar = ({ setOpenRightbar = () => { } }) => {
  const [openPostModal, setOpenPostModal] = useState(false)
  return (
    <>
      <header id='m-topbar' className='flex px-10 gap-10 align-items-center'>
        <div className="left flex align-items-center">
          <Link to="/"><img src="/img/logo/GATEAFR.png" alt="" /></Link>
        </div>
        <div className="center">
          <Searchbar />
        </div>
        <div className="right flex align-items-center justify-content-end gap-10">
          <DropDown>
            <RequireAuthOnClick>
              <button className='mobile-topbar-new-btn btn-purple flex align-items-center'><Plus size={26} /></button>
            </RequireAuthOnClick>
            <NavigableList startIndex={0}>
              <Link to='/' onClick={(e) => {
                e.preventDefault()
                setOpenPostModal(true)
              }}>Publication</Link>
              <Link to='/'>Portail</Link>
              <Link to='/emplois/cv'>CV</Link>
              <Link to='/emplois/nouveau'>Offre Démplois</Link>
            </NavigableList>
          </DropDown>
          <RequireAuthOnClick>
            <Link to="#" className='txt-2 bg-5' onClick={() => {
              setOpenRightbar(true)
            }}><JustifyRight size={20} /></Link>
          </RequireAuthOnClick>
        </div>
      </header>
      <PostModal isOpen={openPostModal} setIsOpen={setOpenPostModal} />
    </>

  )
}

export default MobileTopbar
