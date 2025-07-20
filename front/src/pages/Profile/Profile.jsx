import React, { useState, useEffect, useId, useContext } from 'react'
import './Profile.scss'
import { Briefcase, Building, Calendar, Diamond, ExclamationCircle, ExclamationDiamond, FileEarmarkPerson, Gem, House, LayoutWtf, Pencil, PencilSquare, Person, PlusLg, ThreeDots } from 'react-bootstrap-icons'
import PostCard from '../../components/PostCard/PostCard'
import Avatar from '../../components/Avatar/Avatar'
import { FilePostFill, HouseDoorFill, ExclamationDiamondFill, BriefcaseFill, PeopleFill, Check2, ChevronLeft, ChevronRight } from 'react-bootstrap-icons'
import DoNavLink from '../../components/DoNavLink/DoNavLink'
import { Link, useParams } from 'react-router-dom'
import PostCardLoader from '../../components/SkeletonLoaders/PostCardLoader'
import axios from 'axios'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import StickySideBar from '../../components/StickySideBar/StickySideBar'
import { getUser } from '../../api/users'
import { useQuery, useMutation } from '@tanstack/react-query'
import Timeline from '../../components/Timeline/Timeline'
import PlanSlider from '../../components/PlanSlider/PlanSlider'
import DonationCard from '../../components/DonationCard/DonationCard'
import ProfilePictureSelectorModal from '../../components/ProfilePictureSelectorModal/ProfilePictureSelectorModal'
import MediaContext from '../../context/MediaContext'
import { DESKTOP } from '../../constants/MediaTypeConstants'
import { useSelector } from 'react-redux'

const Profile = () => {
    const currentUser = useSelector((store) => store.user.user)
    const { userId } = useParams()
    const { deviceType } = useContext(MediaContext)
    const [posts, setPosts] = useState([])
    const [postsLoading, setPostsLoading] = useState(false)
    const [tmpProfilePicture, setTmpProfilePicture] = useState(null)
    /**
     * Recuperation de l'user
     */
    const {
        isLoading: userLoading,
        error: userError,
        data: user
    } = useQuery({
        queryKey: ['repoProfile', userId],
        queryFn: () => getUser(userId)
    })


    return (
        <div id='profile-page'>

            {
                userLoading ? <h1></h1> :
                    user ?
                        <>
                            <div className="left">
                                <div className="content">
                                    <div className="top">
                                        <div className="profile-banner">
                                            <button className=""><PencilSquare /> Modifier la bannier</button>
                                        </div>
                                        <div className="profile-user flex gap-20">
                                            <Avatar width={90} height={90} editable={true} onChange={(e) => {
                                                setTmpProfilePicture(e.target.files[0])
                                                e.target.value = ''
                                            }} src={user.activeProfilePicture ? user.activeProfilePicture.fileUrl : null} user={user} />
                                            <div className="flex flex-grow-1 justify-content-between">
                                                <div className="info">
                                                    <h1 className="name">{user.firstName} {user.lastName && user.lastName}</h1>
                                                    <small className='purple-txt'>{user.email}</small><br />
                                                    <span className="job">
                                                        {
                                                            user.job ?
                                                                user.job :
                                                                currentUser?.id == user?.id && <span className='add-job flex align-items-center gap-5 purple-txt pointer'>Ajouter un metier <Pencil /></span>
                                                        }
                                                    </span>
                                                </div>
                                                <div className="btns flex gap-10">
                                                    <div className="btn btn-purple">Contacter</div>
                                                    <div className="btn btn-outline-yellow">Recruter</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="profile-bio">
                                            {
                                                user.biography ?
                                                    <p>{user.biography}</p> :
                                                    currentUser?.id == user?.id && <span className='add-job flex align-items-center gap-5 purple-txt pointer'>Ajouter une biographie <Pencil /></span>
                                            }
                                        </div>
                                        <div className="profile-nav elevated-card">
                                            <ul>
                                                <li className='active'>
                                                    <House size={16} />
                                                    <small>Actualite</small>
                                                </li>
                                                <li>
                                                    <ExclamationCircle />
                                                    <small>A propos</small>
                                                </li>
                                                <li>
                                                    <Gem />
                                                    <small>Recommender</small>
                                                </li>
                                                <li>
                                                    <FileEarmarkPerson />
                                                    <small>CV</small>
                                                </li>
                                                <li>
                                                    <House />
                                                    <small>Domaines</small>
                                                </li>
                                                <li>
                                                    <Building />
                                                    <small>Entreprises</small>
                                                </li>
                                            </ul>
                                        </div>

                                    </div>
                                    <div className="bottom flex gap-5">

                                        <div className="left flex-grow-1">
                                            <Timeline />
                                        </div>

                                        <div className="right py-15">
                                            <StickySideBar top={68}>
                                                <PlanSlider />
                                            </StickySideBar>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            {
                                deviceType === DESKTOP &&
                                <div className="right">
                                    <StickySideBar top={58}>
                                        <DonationCard />
                                    </StickySideBar>
                                </div>
                            }
                        </>
                        : <h1>Cet user n'existe pas</h1>
            }
            <ProfilePictureSelectorModal file={tmpProfilePicture} />
        </div>
    )
}

export default Profile
