import React from 'react'
import './WelcomeBanner.scss'
import { XLg, Plus,XCircle } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next';

const WelcomeBanner = () => {
    const { t } = useTranslation();
    const connectedUser=useSelector((state)=>state.user.user)
    return (
        <div className='welcome-banner relative'>
            <div className="text relative">
                <h6>{t('Bonjour')} {connectedUser ? `${connectedUser.firstName} ${connectedUser.lastName ? connectedUser.lastName : ''}` : ''}</h6>
                <h4>{t('Bienvenue sur GATE AFRI,le reseau des acteurs economiques en Afrique')}</h4>
                <p>{t('Veuillez créer une page professionnelle pour promouvoir vos activités.')}</p>
                <div className="flex gap-10">
                    <Link to="/portail/nouveau" className="register-btn"><Plus size={26} /> {t('Créer un portail')}</Link>
                    {
                        connectedUser===null ? <Link to="/inscription"  className="register-btns">{t("S'inscrire")}</Link> : ""
                    }
                </div>
            </div>
            <div className="close absolute">
                <XCircle size={20} />
            </div>
        </div>
    )
}

export default WelcomeBanner
