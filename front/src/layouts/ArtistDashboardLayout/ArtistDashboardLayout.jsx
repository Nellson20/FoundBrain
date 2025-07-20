import React from 'react'
import './ArtistDashboardLayout.scss'
import Avatar from '../../components/Avatar/Avatar'
import DropDown from '../../components/DropDown/DropDown'
import { Link, Outlet } from 'react-router-dom'
import DoNavLink from '../../components/DoNavLink/DoNavLink'

const ArtistDashboardLayout = () => {
    return (
        <div id='artist-dashboard' className='flex'>
            <div className="left bg-3">
                <div className="top p-10 pb-0 mt-10">
                    <div className="flex justify-content-between align-items-center">
                        <Avatar editable={true} height={80} width={80} src="https://i.pravatar.cc/300" />
                        <DropDown>
                            <div className="plus-btn"></div>
                            <ul>
                                <li>
                                    <Link>Menu 1</Link>
                                </li>
                                <li>
                                    <Link>Menu 2</Link>
                                </li>
                                <li>
                                    <Link>Menu 3</Link>
                                </li>
                            </ul>
                        </DropDown>
                    </div>
                    <h1 className="artist-name txt-1">Donnell Son</h1>
                    <hr style={{ marginBottom: 0 }} />
                </div>
                <nav className="music-menu search-nav">
                    <ul>
                        <li>
                            <DoNavLink to='dashboard' activeClass='active'>
                                <span>Dashboard</span>
                            </DoNavLink>
                        </li>
                        <li>
                            <DoNavLink to='mon-contenu'>
                                <span>Mon contenu</span>
                            </DoNavLink>
                        </li>
                        <li>
                            <DoNavLink end={false} to='personnaliser' activeClass='active'>
                                <span>Personaliser</span>
                            </DoNavLink>
                        </li>
                    </ul>
                </nav>

            </div>
            <div className="content bg-3 flex-grow-1">
                <Outlet/>
            </div>
        </div>
    )
}

export default ArtistDashboardLayout
