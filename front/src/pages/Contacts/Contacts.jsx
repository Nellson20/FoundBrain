import React, { useEffect } from 'react'
import './Contacts.scss'
import { Check2, ChevronLeft, Trash } from 'react-bootstrap-icons'
import Avatar from '../../components/Avatar/Avatar'
import { Link, useLocation, useRoutes } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import useInfiniteScroll from '../../Hooks/useInfiniteScroll'
import { useSelector } from 'react-redux'
import SliderNav from '../../components/SliderNav/SliderNav'
import Tab from '../../components/Tabs/Tab'
import Tabs from '../../components/Tabs/Tabs'

const Contacts = () => {

    const { user } = useSelector(store => store.user)

    const { data: contactsList,
        flatData: contactsListFlat,
        error: contactsListErr,
        hasNextPage: contactsListNextPage,
        isFetching: contactsListFetching,
        isFetchingNextPage: contactsListFetchingNextPage,
        status: contactsListLoadingStatus,
        refetch,
        refetchPage
    } = useInfiniteScroll({
        url: `${process.env.REACT_APP_API_DOMAIN}/contacts`,
        ipp: 10,
        queryKey: ['Contacts'],
        queryString: `status=en attente&&receiver.id=${user.id}`,
        // transformResult: (result) => {
        //     return { data: result['hydra:member'], nextPage: result['hydra:view']['hydra:next'] ? parseInt(result['hydra:view']['hydra:next'].match(/page=(\d+)/)[0].split('=')[1]) : undefined }
        // }
    })

    useEffect(() => {
        console.log(contactsList, 'CONTACTTTTTT')
    }, [contactsList])




    return (
        <div id='contacts-page'>
            <div className="left">
                <div className="top mt-5">
                    <h3>Mes contacts</h3>
                </div>
                <div className="bottom">
                    <Tabs className='post-comments-tabs'>
                        <Tab title={<span>Tous ({contactsList?.pages[0]?.totalItems})</span>}>
                            <ul className='contact-list'>
                                {
                                    contactsListFetching ? (
                                        <>
                                            <h1>Loading</h1>
                                        </>
                                    ) : contactsListErr ? (
                                        <p>Error: {contactsListErr.message}</p>
                                    ) : (contactsList?.pages[0]?.data?.length > 0 ? contactsList?.pages?.map((group, i) => (
                                        <React.Fragment key={i}>
                                            {group.data.map((c, i) => (
                                                <li key={i} className='contact-item flex align-items-center gap-10'>
                                                    <Avatar height={50} width={50} src={c.requester.activeLogo ? c.requester.activeLogo?.fileUrl : c.requester.activeProfilePicture?.fileUrl} />
                                                    <div className="center flex-grow-1">
                                                        <div className="flex justify-content-between">
                                                            <Link className='contact-name text-ellipsis' to={`${c.requester.name ? `portail/${c.requester.id}` : `profil/${c.requester.id}`}`}>{c.requester.name ? c.requester.name : `${c.requester.firstName} ${c.requester.lastName}`}</Link>
                                                            <span className="contact-date">23j</span>
                                                        </div>
                                                        <span className='text-ellipsis'>2 contacts commun</span>
                                                    </div>
                                                    <div className="right flex gap-5">
                                                        <button className="btn btn-transparent"><Check2 size={22} /></button>
                                                        <button className="btn btn-transparent"><Trash size={20} /></button>
                                                    </div>
                                                </li>
                                            ))}
                                        </React.Fragment>


                                    )) : <div className="empty-job flex flex-column justify-content-center align-items-center gap-5">
                                        <h4>Aucun contact en attente</h4>
                                        <p className='text-center'>Nous vous invitons à créer une première offre d'emplois pour commencer le recrutement pour votre entreprise</p>
                                        <Link to='/emplois/nouveau' className="btn btn-gradient">Prendre contact</Link>
                                    </div>)
                                }
                                {contactsListFetchingNextPage
                                    ? <h1>Loading</h1>
                                    : contactsListNextPage
                                        ? ''
                                        : ''}


                            </ul>
                        </Tab>
                        <Tab title={<span>Contacts</span>}>
                            contenu
                        </Tab>
                    </Tabs>

                </div>
            </div>
            <div className="center">
                <Outlet />
            </div>
        </div>
    )
}

export default Contacts
