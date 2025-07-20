import React, { useEffect } from 'react'
import './PortalAdminLayout.scss'
import { Outlet, useParams } from 'react-router-dom'
import Avatar from '../components/Avatar/Avatar'
import DoNavLink from '../components/DoNavLink/DoNavLink'
import { useQuery } from '@tanstack/react-query'
import { getCompany } from '../api/company'
import { BarChart, BuildingUp, ChatLeftDots, Exclamation, House, Nut, PencilSquare, ShieldLock } from 'react-bootstrap-icons'

const PortalAdminLayout = () => {
    const { portalId } = useParams()
    const { data: portal, error: portalError, isLoading: portalLoading } = useQuery({
        queryKey: ['repoActivePortalAdmin', portalId],
        queryFn: () => getCompany(portalId)
    })
    useEffect(() => {
        console.log(portal, 'PORTAL')
    }, [portal])
    return (
        <div className='portal-admin-layout flex gap-5 p-5'>
            <div className="left">
                <div className="top flex align-items-center justify-content-center flex-column gap-5 p-10">
                    <Avatar src={portal?.activeLogo?.fileUrl} />
                    <h2 className="portal-name">{portal?.name}</h2>
                </div>
                <hr />
                <ul>
                    <li>

                        <DoNavLink to={`/portail/${portalId}/dashboard`} activeClass='active'>
                            <div className="ico">
                                <House size={18} />
                            </div>
                            <span className='text-ellipsis'>Accueil</span>
                        </DoNavLink>
                    </li>
                    <li>
                        <DoNavLink to={`/portail/${portalId}/dashboard/statistiques`} activeClass='active'>
                            <div className="ico"><BarChart size={18} /></div>
                            <span className='text-ellipsis'>Statistiques de mon portail</span>
                        </DoNavLink>
                    </li>
                    <li>
                        <DoNavLink to={`/portail/${portalId}/dashboard/messagerie`} activeClass='active'>
                            <div className="ico"><ChatLeftDots size={18} /></div>
                            <span className='text-ellipsis'>Messagerie</span>
                        </DoNavLink>
                    </li>
                    <li>
                        <DoNavLink to={`/portail/${portalId}/dashboard/acces`} activeClass='active'>
                            <div className="ico"><ShieldLock size={18} /></div>
                            <span className='text-ellipsis'>Accès à mon portail</span>
                        </DoNavLink>
                    </li>

                    <li>
                        <DoNavLink to={`/portail/${portalId}/dashboard/modifier`} activeClass='active'>
                            <div className="ico"><PencilSquare /></div>
                            <span className='text-ellipsis'>Modifier {portal?.name}</span>
                        </DoNavLink>
                    </li>
                    <li>
                        <DoNavLink to={`/portail/${portalId}/dashboard/preferences`} activeClass='active'>
                            <div className="ico"><Nut size={18} /></div>
                            <span className='text-ellipsis'>Preférences</span>
                        </DoNavLink>
                    </li>
                    <li>
                        <hr />
                        <DoNavLink activeClass='active'>
                            <div className="ico"><BuildingUp size={18} /></div>
                            <span className='text-ellipsis'>GateAfri for Business <div className="badge">Bientôt</div></span>
                        </DoNavLink>
                    </li>
                </ul>
            </div>
            <div style={{ overflowX: 'auto' }} className="content minimal-scroll-bar flex-grow-1">
                <Outlet />
            </div>
        </div>
    )
}

export default PortalAdminLayout
