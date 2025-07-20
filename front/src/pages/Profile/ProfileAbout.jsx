import React from 'react'
import './ProfileAbout.scss'
import DoNavLink from '../../components/DoNavLink/DoNavLink'
import { Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import Avatar from '../../components/Avatar/Avatar'

const ProfileAbout = () => {
    return (
        <div className='profile-about'>

            <div className="bottom flex gap-5">
                <div className="left">
                    <nav className="music-menu search-nav">
                        <div className="heading">
                            <h3>A propos de moi</h3>
                        </div>
                        <ul>
                            <li>
                                <DoNavLink to='etudes-et-emplois' activeClass='active'>Etudes et Emplois</DoNavLink>
                            </li>
                            <li>
                                <DoNavLink to='residences' activeClass='active'>Résidences</DoNavLink>
                            </li>
                            <li>
                                <DoNavLink to='mes-coordonnees' activeClass='active'>Mes coordonnées</DoNavLink>
                            </li>
                            <li>
                                <DoNavLink to='details-sur-moi' activeClass='active'>Détails sur moi</DoNavLink>
                                
                            </li>
                        </ul>
                    </nav>
                </div>

                <div className="right flex-grow-1 p-15">
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default ProfileAbout
