import React, { useState, useEffect, useContext, useRef } from "react";
import "./ProfileLayout.scss";
import {
    Briefcase,
    Building,
    Calendar,
    Diamond,
    ExclamationCircle,
    ExclamationDiamond,
    FileEarmarkPerson,
    Gem,
    House,
    LayoutWtf,
    Pencil,
    PencilSquare,
    Person,
    PlusLg,
    ThreeDots,
} from "react-bootstrap-icons";
import Avatar from "../components/Avatar/Avatar";
import {
    FilePostFill,
    HouseDoorFill,
    ExclamationDiamondFill,
    BriefcaseFill,
    PeopleFill,
    Check2,
    ChevronLeft,
    ChevronRight,
} from "react-bootstrap-icons";
import DoNavLink from "../components/DoNavLink/DoNavLink";
import { Link, useParams } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import StickySideBar from '../components/StickySideBar/StickySideBar'
import { getUser } from '../api/users'
import { acceptContact, existContact, requestContact } from '../api/contacts'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import DonationCard from '../components/DonationCard/DonationCard'
import ProfilePictureSelectorModal from '../components/ProfilePictureSelectorModal/ProfilePictureSelectorModal'
import MediaContext from '../context/MediaContext'
import { DESKTOP } from '../constants/MediaTypeConstants'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'


import CoverImage from '../components/CoverImage/CoverImage'
import NotFound from '../pages/Eroors/NotFound'
import CircleLoader from '../components/CircleLoader/CircleLoader'
import RequireAuthOnClick from "../components/RequireAuthOnclick/RequireAuthOnClick";


const ProfileLayout = () => {
    const currentUser = useSelector((store) => store.user.user);
    const { userId } = useParams();
    const { deviceType } = useContext(MediaContext);
    const [posts, setPosts] = useState([]);
    const [postsLoading, setPostsLoading] = useState(false);
    const [tmpProfilePicture, setTmpProfilePicture] = useState(null);
    const queryClient = useQueryClient();

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

    const {
        isLoading: existContactLoading,
        error: existContactError,
        data: existContactData
    } = useQuery({
        queryKey: ['repoExistContact', userId],
        queryFn: () => existContact(userId),
        enabled: (currentUser && currentUser?.id !== userId) ? true : false
    })

    const {
        mutate: contactAccept,
        error: contactAcceptErr,
        isLoading: contactAcceptLoading } = useMutation({
            mutationFn: acceptContact,
            onSuccess: (contactAccepted) => {
                queryClient.setQueryData(['repoExistContact', userId], (existContactData) => {
                    return [{ ...contactAccepted }]
                })
            },
        })

    const {
        mutate: requestContactFn,
        error: requestContactErr,
        isLoading: requestContactLoading } = useMutation({
            mutationFn: () => requestContact(`/users/${userId}`),
            onSuccess: (contactRequested) => {
                queryClient.setQueryData(['repoExistContact', userId], (existContactData) => {
                    return [{ ...contactRequested }]
                })
            },
        })

    useEffect(() => {
        console.log(existContactData, 'EXISTCONTACT')
    }, [existContactData])





    return (
        userLoading ? <h1></h1> :
            user ?
                <div id='profile-page'>

                    {


                        <>
                            <div className="left">
                                <div className="content">
                                    <div className="top">
                                        <div className="profile-banner relative">
                                            <CoverImage user={user} />
                                        </div>
                                        <div className="profile-user flex  gap-20">
                                            <Avatar width={90} height={90} editable={true} onChange={(e) => {
                                                setTmpProfilePicture(e.target.files[0])
                                                e.target.value = ''
                                            }} src={user.activeProfilePicture ? user.activeProfilePicture.fileUrl : null} user={user} />
                                            <div className="flex flex-grow-1 flex-wrap gap-10 justify-content-between">
                                                <div className="info">
                                                    <h1 className="name">{user.firstName} {user.lastName && user.lastName}</h1>
                                                    <small className='purple-txt'>{user.email}</small><br />
                                                    <span className="job">
                                                        {
                                                            user.job ?
                                                                user.job :
                                                                currentUser?.id == user?.id && <span className='add-job flex align-items-center gap-5 pointer'>Ajouter un metier <Pencil /></span>
                                                        }
                                                    </span>
                                                </div>
                                                <div className="btns flex gap-10">
                                                    {
                                                        currentUser?.id === userId ?
                                                            <button className="btn btn-gradient"><PlusLg /> Publier un post</button>
                                                            :
                                                            <>
                                                                {
                                                                    existContactData?.length > 0 ?
                                                                        existContactData[0].status === 'en attente' ?
                                                                            existContactData[0].receiver.id === currentUser.id ?
                                                                                <>
                                                                                    <button className="btn btn-purple" onClick={() => {
                                                                                        contactAccept(existContactData[0].id)
                                                                                    }}>{
                                                                                            contactAcceptLoading ? <CircleLoader /> : 'Accepter le contact'
                                                                                        }</button>
                                                                                    <button className="btn btn-transparent">Refuser le contact</button>
                                                                                </>
                                                                                : existContactData[0].requester.id === currentUser.id &&
                                                                                <button className="btn btn-transparent">Annuler le contact</button>


                                                                            : existContactData[0].status === 'accepté' && <button className="btn btn-transparent">Couper le contact</button>
                                                                        : <RequireAuthOnClick>
                                                                            <button className="btn btn-purple" onClick={() => {
                                                                                requestContactFn()
                                                                            }}>{requestContactLoading ? <CircleLoader /> : 'Contacter'}</button>
                                                                        </RequireAuthOnClick>
                                                                }
                                                                <RequireAuthOnClick>
                                                                    <button className="btn btn-outline-yellow">Recruter</button>
                                                                </RequireAuthOnClick>

                                                            </>


                                                    }


                                                </div>
                                            </div>
                                        </div>
                                        <div className="profile-bio">
                                            {
                                                user.biography ?
                                                    <p>{user.biography}</p> :
                                                    currentUser?.id == user?.id && <span className='add-job flex align-items-center gap-5 pointer'>Ajouter une biographie <Pencil /></span>
                                            }
                                        </div>
                                        <div className="profile-nav elevated-card">
                                            <ul>
                                                <li>
                                                    <DoNavLink activeClass='active' to={`actu`}>
                                                        <House size={16} />
                                                        <small>Actualite</small>
                                                    </DoNavLink>
                                                </li>
                                                <li>
                                                    <DoNavLink end={false} to={`a-propos-de-moi`}>
                                                        <ExclamationCircle />
                                                        <small className="ellipsis-text">A propos</small>
                                                    </DoNavLink>
                                                </li>
                                                <li>
                                                    <DoNavLink to={`recommandations`}>
                                                        <Gem />
                                                        <small className="ellipsis-text">Recommander</small>
                                                    </DoNavLink>
                                                </li>
                                                <li>
                                                    <DoNavLink to={`recommandations`}>
                                                        <FileEarmarkPerson />
                                                        <small>CV</small>
                                                    </DoNavLink>
                                                </li>
                                                <li>
                                                    <DoNavLink to={`recommandations`}>
                                                        <House />
                                                        <small>Domaines</small>
                                                    </DoNavLink>
                                                </li>
                                                <li>
                                                    <DoNavLink to={`recommandations`}>
                                                        <Building />
                                                        <small className="ellipsis-text">Entreprises</small>
                                                    </DoNavLink>
                                                </li>
                                            </ul>
                                        </div>

                                    </div>
                                    <div className="bottom flex gap-5">
                                        <Outlet />
                                    </div>
                                </div>

                            </div>
                            {/* {
                                deviceType === DESKTOP &&
                                <div className="right">
                                    <StickySideBar top={58}>
                                        <DonationCard />
                                    </StickySideBar>
                                </div>
                            } */}
                        </>
                    }
                    <ProfilePictureSelectorModal file={tmpProfilePicture} />
                </div>
                : (
                    <NotFound />
                ));
};

export default ProfileLayout;
