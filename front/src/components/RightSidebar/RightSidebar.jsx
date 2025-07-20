import React, { useContext, useEffect } from 'react'
import { Gear, X, XLg } from 'react-bootstrap-icons'
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

const RightSidebar = ({ opened = false, setOpened = () => { } }) => {
  const { user } = useSelector(state => state.user)
  const { socket } = useContext(SocketIOContext)
  const { deviceType } = useContext(MediaContext)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    console.log(socket)
  }, [socket])
  const disconnect = () => {
    socket?.disconnect()
    dispatch(removeConnectedUser())
    Cookies.remove('BEARER')
    showToast({ content: <span>Vous êtes maintenant déconnecté,merci de votre visite !</span>, type: 'info' })
    navigate('connexion')
  }
  return (
    <div className={`right-sidebar flex flex-column ${opened ? 'opened' : 'closed'}`}>
      <div className="top p-10">
        <button className="close btn-outline-light" onClick={() => { setOpened(false) }}><XLg /></button>
        <div className="cover"></div>
        <Avatar height={45} width={45} src={user?.activeProfilePicture && user?.activeProfilePicture.fileUrl} />
      </div>
      <div className="body p-10">
        <ul>
          <li>
            <Link onClick={() => { setOpened(false) }} to={`profil/${user?.id}`}>Mon profil</Link>
          </li>
          {
            deviceType === SMARTPHONE ?
              <>
                <li>Messages</li>
                <li>Notifications</li>
              </>
              : ""
          }
          <li onClick={() => { setOpened(false) }}>Entreprises</li>
          <li onClick={() => { setOpened(false) }}>Placements</li>
          <li onClick={() => { setOpened(false) }}>Levée de fonds</li>
          <li onClick={() => { setOpened(false) }}>GateAfri business</li>
          <li className='justify-content-between'>
            <span>Mode sombre</span>
            <ThemeSwitcher />
          </li>
          <li onClick={() => { setOpened(false) }}>Aide</li>
        </ul>
      </div>
      <div className="footer flex align-items-center gap-10">
        <button className="btn-outline-light"><Gear /></button>
        <button className='btn-transparent flex-grow-1' onClick={() => {
          setOpened(false)
          disconnect()
        }}>Deconnexion</button>
      </div>
    </div>
  )
}

export default RightSidebar
