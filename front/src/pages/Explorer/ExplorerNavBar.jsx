import React, { useState } from 'react'
import './ExplorerNavBar.scss'
import { GrSearch } from "react-icons/gr";
import { MdAirplanemodeActive } from "react-icons/md";
import { GiCableStayedBridge } from "react-icons/gi";
import { LuLogIn } from "react-icons/lu";
import { GiHamburgerMenu } from "react-icons/gi";
import RightSidebar from '../../components/RightSidebar/RightSidebar';
import { GlobeAmericas, GlobeEuropeAfrica, HouseDoor } from 'react-bootstrap-icons';
import DoNavLink from '../../components/DoNavLink/DoNavLink';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useMatch } from 'react-router-dom';
import RequireAuthOnClick from '../../components/RequireAuthOnclick/RequireAuthOnClick';
import { ChevronLeft, Person } from 'react-bootstrap-icons';
import Avatar from '../../components/Avatar/Avatar';
import { useSelector } from 'react-redux';
import CurrencySelector from '../../components/CurrencySelector/CurrencySelector';
import { useTranslation } from 'react-i18next';
const ExplorerNavBar = () => {
    const { t } = useTranslation();
    const [openRightbar, setOpenRightbar] = useState(false)
    const [top, setTop] = useState(true)
    const { user } = useSelector(store => store.user)
    useEffect(() => {
        const onScroll = () => {
            if (scollingElem.scrollTop <= 0) {
                setTop(true)
            } else {
                setTop(false)
            }
        }
        const scollingElem = document.getElementById('App')
        scollingElem?.addEventListener('scroll', onScroll)
        return () => {
            scollingElem?.removeEventListener('scroll', onScroll)
        }
    }, [])

    const match = useMatch('/explorer')

    return (
        <>
            <div className={`navbar-explorer${top && !Boolean(match) ? ' top' : ''}`} style={{ background: 'linear-gradient(rgb(0 0 0 / 54%) 0%, rgba(14, 14, 14, 0.016) 10%), url(/img/other/hotelbanner.jpg)' }}>

                <div className='item'>
                    <Link to='/' className='item-left topbar-logo'><img src='/img/logo/GATEAFR.png' width='100px' alt='logo' /></Link>
                </div>

                <div className='item-center-navbar'>

                    <div className='item-center'>
                        <div className='svg-container'>
                            <DoNavLink className='svg' activeClass='active' to='/'>
                                <HouseDoor size={22} />
                                <span className='whitespace-pre'>{t('Accueil')}</span>
                            </DoNavLink>
                        </div>
                    </div>

                    <div className='item-center'>
                        <div className='svg-container'>
                            <DoNavLink className='svg' activeClass='active' end={false} to='/explorer'>
                                <GlobeEuropeAfrica size={22} />
                                <span className='whitespace-pre'>{t('Explorer')}</span>
                            </DoNavLink>
                        </div>
                    </div>

                    <div className='item-center'>
                        <div className='svg-container'>
                            <DoNavLink className='svg' activeClass='active' end={false} to='/hotels'>
                                <GiCableStayedBridge size={22} />
                                <span className='whitespace-pre'>{t('Hotels')}</span>
                            </DoNavLink>
                        </div>
                    </div>
                </div>
                <div className='item-right'>
                    <CurrencySelector />
                    {
                        user ?
                            <span className='profile flex gap-5 align-items-center' onClick={() => {
                                setOpenRightbar(true)
                            }}>
                                <Avatar width={35} height={35} src={user?.activeProfilePicture && user?.activeProfilePicture?.fileUrl} />
                                <div className="ico">
                                    <ChevronLeft />
                                </div>
                            </span>
                            :
                            <Link to="/connexion"><Person size={23} /></Link>
                    }
                </div>

            </div>
            <RightSidebar opened={openRightbar} setOpened={setOpenRightbar} />
        </>
    )
}

export default ExplorerNavBar