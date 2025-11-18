import React, { useContext, useEffect, useRef } from 'react'
import { Gear, X, XLg, PersonCircle, QuestionCircle, BoxArrowRight, BuildingsFill, CashStack, GraphUpArrow, Briefcase, ChatDots, Bell as BellIcon, MoonStars } from 'react-bootstrap-icons'
import Avatar from '../Avatar/Avatar'
import { Link } from 'react-router-dom'
import './RightSidebar.scss'
import MediaContext from '../../context/MediaContext'
import { SMARTPHONE } from '../../constants/MediaTypeConstants'
import { useSelector, useDispatch } from 'react-redux'
import { removeConnectedUser, setConnectedUser } from '../../redux/actions/userActions'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import SocketIOContext from '../../context/SocketIOContext'
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher'
import { showToast } from '../../utils/toastUtils'
import { useTranslation } from 'react-i18next'
import axios from 'axios'

const RightSidebar = ({ opened = false, setOpened = () => { } }) => {
  const { t } = useTranslation();
  const { user } = useSelector(state => state.user)
  const { socket } = useContext(SocketIOContext)
  const { deviceType } = useContext(MediaContext)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const sidebarRef = useRef(null)
  
  useEffect(() => {
    console.log(socket)
  }, [socket])
  
  // Fermer le menu quand on clique à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && opened) {
        setOpened(false)
      }
    }
    
    if (opened) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [opened, setOpened])
  const disconnect = () => {
    socket?.disconnect()
    // Appel backend pour supprimer le cookie httpOnly
    axios({
      url: `${process.env.REACT_APP_API_DOMAIN}/logout`,
      method: 'POST',
      withCredentials: true
    }).finally(() => {
      dispatch(removeConnectedUser())
      Cookies.remove('BEARER', { path: '/' })
      Cookies.remove('BEARER', { path: '/', domain: window.location.hostname })
      showToast({ content: <span>Vous êtes maintenant déconnecté,merci de votre visite !</span>, type: 'info' })
      navigate('connexion')
    })
  }
  return (
    <div ref={sidebarRef} className={`right-sidebar flex flex-column ${opened ? 'opened' : 'closed'}`}>
      <div className="top">
        <button className="close btn-outline-light" onClick={() => { setOpened(false) }}><XLg /></button>
        <div className="user-header">
          <Avatar height={45} width={45} src={user?.activeProfilePicture && user?.activeProfilePicture.fileUrl} />
          <div className="user-info">
            <h3 className="user-name">{user?.firstName} {user?.lastName}</h3>
            <p className="user-email">{user?.email}</p>
          </div>
        </div>
      </div>
      <div className="body">
        <ul>
          <li>
            <Link onClick={() => { setOpened(false) }} to={`profil/${user?.id}`}>
              <PersonCircle size={20} />
              {t('Mon profil')}
            </Link>
          </li>
          {
            deviceType === SMARTPHONE ?
              <>
                <li>
                  <ChatDots size={20} />
                  {t('Messages')}
                </li>
                <li>
                  <BellIcon size={20} />
                  {t('Notifications')}
                </li>
              </>
              : ""
          }
          <li onClick={() => { setOpened(false) }}>
            <BuildingsFill size={20} />
            {t('Entreprises')}
          </li>
          <li onClick={() => { setOpened(false) }}>
            <CashStack size={20} />
            {t('Placements')}
          </li>
          <li onClick={() => { setOpened(false) }}>
            <GraphUpArrow size={20} />
            {t('Levée de fonds')}
          </li>
          <li onClick={() => { setOpened(false) }}>
            <Briefcase size={20} />
            {t('GateAfri business')}
          </li>
          <li>
            <Link to="/settings" onClick={() => { setOpened(false) }}>
              <Gear size={20} />
              {t('Paramètres')}
            </Link>
          </li>
          <li className='justify-content-between'>
            <span>
              <MoonStars size={20} />
              {t('Mode sombre')}
            </span>
            <ThemeSwitcher />
          </li>
          <li onClick={() => { setOpened(false) }}>
            <QuestionCircle size={20} />
            {t('Aide')}
          </li>
          <li onClick={() => {
            setOpened(false)
            disconnect()
          }}>
            <BoxArrowRight size={20} />
            {t('Deconnexion')}
          </li>
        </ul>
      </div>
    </div>
  )
}

export default RightSidebar
