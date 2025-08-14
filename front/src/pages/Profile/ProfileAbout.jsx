import React from 'react'
import './ProfileAbout.scss'
import DoNavLink from '../../components/DoNavLink/DoNavLink'
import { Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import Avatar from '../../components/Avatar/Avatar'
import { useTranslation } from 'react-i18next'

const ProfileAbout = () => {
    const { t } = useTranslation();

    return (
        <div className='profile-about'>
            <div className="bottom flex gap-5">
                <div className="left">
                    <nav className="music-menu search-nav">
                        <div className="heading">
                            <h3>{t("A propos de moi")}</h3>
                        </div>
                        <ul>
                            <li>
                                <DoNavLink to='etudes-et-emplois' activeClass='active'>{t("Etudes et Emplois")}</DoNavLink>
                            </li>
                            <li>
                                <DoNavLink to='residences' activeClass='active'>{t("Résidences")}</DoNavLink>
                            </li>
                            <li>
                                <DoNavLink to='mes-coordonnees' activeClass='active'>{t("Mes coordonnées")}</DoNavLink>
                            </li>
                            <li>
                                <DoNavLink to='details-sur-moi' activeClass='active'>{t("Détails sur moi")}</DoNavLink>
                            </li>
                        </ul>
                    </nav>
                </div>

                <div className="right flex-grow-1 p-15">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default ProfileAbout
