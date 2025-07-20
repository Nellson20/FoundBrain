import React, { useState, useContext } from 'react'
import './Discussion.scss'
import Avatar from '../Avatar/Avatar'
import { ThreeDots, Check2Square } from 'react-bootstrap-icons'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import MediaContext from '../../context/MediaContext'
import { SMARTPHONE } from '../../constants/MediaTypeConstants'
import DropDown from '../DropDown/DropDown'
import NavigableList from '../Input/NavigableList/NavigableList'



const Discussion = ({ data: { id: discuId, discuName, members,messages }, className = null, active = false }) => {
    const navigate = useNavigate()
    const { user } = useSelector((store) => store.user)
    const [profilePictures, setProfilePictures] = useState(null)
    const { deviceType } = useContext(MediaContext)

    const deleteDiscussion = () => {

    }

    useEffect(() => {

        setProfilePictures(members
            ?.filter((m) => m.user.id !== user?.id && m.user.activeProfilePicture)
            .map((m) => m.user.activeProfilePicture))
    }, [members])



    // const contacts=
    return (
        <Link to={`/messages/${discuId}`} className={`discussion flex gap-10${className ? " " + className : ""}${active ? " active" : ""}`}>
            {
                profilePictures?.length === 1 ?
                    <Avatar height={45} width={45} src={profilePictures[0].fileUrl} />
                    : <Avatar height={45} width={45} />
            }
            
                <div className="info">
                    <div className='top flex align-items-center'>
                        <div className="name flex-grow-1">{
                            discuName ? discuName :
                                members.filter((m) =>
                                    m.user.id !== user?.id
                                ).map((m) => `${m.user.firstName} ${m.user.lastName}`).join(',')
                        }</div>
                        <div className='flex gap-5 align-items-center'>
                            <Check2Square size={16} />
                            <DropDown>
                                <button className="more-btn"><ThreeDots size={18} /></button>
                                <NavigableList startIndex={0}>
                                    <Link to="/">Marquer comme non lu</Link>
                                    <Link to="/">Archiver</Link>
                                    <Link to="/" onClick={deleteDiscussion}>Suprimer la discussion</Link>
                                    <Link to="/">Bloquer</Link>
                                </NavigableList>

                            </DropDown>
                        </div>
                    </div>
                    <div className='bottom flex'>
                        <span className='txt'>{
                            messages.length > 0 ? 
                            messages[messages.length-1].content ?? (messages[messages.length-1].images.length > 0 && 'a envoye une image') : 
                            'Dites bonjour a votre nouvel ami.'
                            }</span>
                        <span className='date'>&nbsp;10:32&nbsp;</span>
                    </div>

                </div>
        </Link>
    )
}

export default Discussion
