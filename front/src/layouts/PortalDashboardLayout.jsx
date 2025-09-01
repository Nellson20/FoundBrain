import React, { useEffect, useContext } from 'react'
import { ChevronRight, PlusLg } from 'react-bootstrap-icons'
import { Outlet } from 'react-router-dom'
import "./PortalDashboardLayout.scss"
import { ChevronLeft } from 'react-bootstrap-icons'
import { useQuery } from '@tanstack/react-query'
import { getUserCompanies } from '../api/company'
import { Link } from 'react-router-dom'
import Avatar from '../components/Avatar/Avatar'
import { useSelector } from 'react-redux'
import PortalList from '../components/PortalList/PortalList'
import { DESKTOP } from '../constants/MediaTypeConstants'
import MediaContext from '../context/MediaContext'
import SortableList from '../components/SortableList/SortableList'
import { getCompanies } from '../api/company'
import DoNavLink from '../components/DoNavLink/DoNavLink'
import { useTranslation } from 'react-i18next';

const PortalDashboardLayout = () => {
    const { t } = useTranslation();
    const { deviceType } = useContext(MediaContext)
    const { user } = useSelector(store => store.user)
    const { data: userCompanies, error: userCompaniesError, isLoading: userCompaniesLoading } = useQuery({
        queryKey: ['repoUserCompanies'],
        queryFn: () => getUserCompanies(user.id)
    })
    useEffect(() => {
        console.log(userCompanies, 'UC')
    }, [userCompanies])
    return (
        <div id="portal-dashboard-layout">
            {
                deviceType === DESKTOP &&
                <div className="left">
                    <div className="top flex gap-10">

                        <div className='flex flex-column gap-5'>
                            <h3>{t('Mes portails')}</h3>
                            {/* <p>Un portail vous permet de mettre en avant votre entreprise et informer de vos activités</p> */}
                        </div>
                    </div>
                    <div className='bottom'>
                        <DoNavLink activeClass='active' to='/portail/nouveau' className="btn btn-transparent create-btn"><PlusLg size={18} /> {t('Créer un portail')}</DoNavLink>
                    </div>
                    <SortableList className='my-portals' emptyPlaceholder={<div className='empty-placeholder flex flex-column align-items-center justify-content-center gap-10'>
                        <h5>{t('Aucun portail disponible')}</h5>
                        <span>{t('Veuillez créer votre premier portail pour promouvoir vos activités')}</span>
                    </div>} query={(keyword) => user ? getUserCompanies(user.id, keyword) : getCompanies({ filters: keyword ? `name=${keyword}` : null })} mapping={
                        (c) => (

                            <DoNavLink to={`/portail/${c.id}/dashboard`} end={false} activeClass='active' className='flex gap-10 align-items-center'>
                                <Avatar src={c.activeLogo ? c.activeLogo.fileUrl : null} /> <span>{c.name}</span><ChevronRight />
                            </DoNavLink>

                        )} title={user ? 'Mes portails' : 'Populaires'} repoName='myPortalsRepo' />

                </div>
            }
            <div className="center">
                <Outlet />
            </div>
        </div>
    )
}

export default PortalDashboardLayout
