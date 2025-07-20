import React, { useEffect, useState } from 'react'
import './AuthorSelector.scss'
import Modal from '../Modal/Modal'
import Avatar from '../Avatar/Avatar'
import { CaretDownFill, XLg } from 'react-bootstrap-icons'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { getUserCompanies } from '../../api/company'
import CircleLoader from '../CircleLoader/CircleLoader'
import { Link } from 'react-router-dom'

const AuthorSelector = ({ withUser = true, defaultAuthor = null, onSelect = () => { }, onStart = () => { } }) => {
    const [open, setOpen] = useState(false)
    const { user } = useSelector(store => store.user)
    const [selected, setSelected] = useState(defaultAuthor ?? (withUser ? user : null))

    const { data: portals, error: PortalsError, isLoading: loadingPortals } = useQuery({
        queryKey: ['authorSelector', user?.id],
        queryFn: () => getUserCompanies(user?.id)
    })

    useEffect(() => {
        onStart(user)
    }, [user])

    return (
        <>
            <div className="author-selector">
                <div className="author-selector-inpt inpt" onClick={() => setOpen(true)}>
                    <div className="left">
                        {
                            selected ?
                                <>
                                    <Avatar height={25} width={25} src={selected?.activeLogo?.fileUrl || selected?.activeProfilePicture?.fileUrl} />
                                    <span>{selected?.name || `${selected?.firstName}${selected?.lastName ? ' ' + selected?.lastName : ''}`}</span>
                                </> :
                                <span>Selectionner un portail</span>
                        }
                    </div>
                    <div className="caret">
                        <CaretDownFill />
                    </div>
                </div>
                <Modal className="author-selector-modal" open={open}>
                    <div>
                        <div className="close" onClick={() => { setOpen(false) }}>
                            <XLg />
                        </div>
                        {
                            !loadingPortals ?
                                withUser || portals?.length > 0 ?
                                    <><div className="top relative">
                                        <h2>Publier en tant que</h2>
                                        <span>Choisir un autheur pour effectuer cette action</span>

                                    </div>
                                        <div className="body">


                                            <ul>
                                                {
                                                    withUser &&
                                                    <li onClick={
                                                        () => {
                                                            setOpen(false)
                                                            setSelected(user)
                                                            onSelect(user)
                                                        }
                                                    }>
                                                        <Avatar src={user?.activeProfilePicture?.fileUrl} height={60} width={60} />
                                                        <p>{user?.firstName}{' ' + user?.lastName || ''}</p>
                                                    </li>
                                                }
                                                {


                                                    portals.length > 0 &&
                                                    portals?.map((p, i) => (
                                                        <li key={i} onClick={
                                                            () => {
                                                                setOpen(false)
                                                                setSelected(p)
                                                                onSelect(p)
                                                            }
                                                        }>
                                                            <Avatar src={p.activeLogo?.fileUrl} height={60} width={60} />
                                                            <p>{p.name}</p>
                                                        </li>
                                                    ))

                                                }
                                            </ul>


                                        </div></> :
                                    <div className="empty-portal-list flex flex-column justify-content-center align-items-center flex-grow-1 gap-5">
                                        <h4>Aucun portail disponible</h4>
                                        <p className='mb-10'>Veillez créer votre premier portail pour lier votre hotel</p>
                                        <Link className='btn btn-gradient' to='/portail/nouveau'>Créer un portail</Link>
                                    </div>
                                : <div className="empty-portal-list flex flex-column justify-content-center align-items-center flex-grow-1 gap-5">
                                    <CircleLoader height={30} colors={null} width={30} />
                                </div>


                        }

                    </div>
                </Modal>
            </div>

        </>

    )
}

export default AuthorSelector
