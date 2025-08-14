import React from 'react'
import './NotFound.scss'
import { Link45deg } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div className='error-page'>
      <div className="center flex flex-column align-items-center justify-content-center gap-10 anim-slide-top">
        <div className="ico">
          <img src='/img/link.gif'/>
        </div>
        <h4>{t("Cette page n'éxiste pas sur GateAfri")}</h4>
        <p>{t("cette page n'est pas disponible ou a été supprimé")}</p>
        <Link to='/' className='btn btn-gradient'>{t("Revenir à la page d'accueil")}</Link>
      </div>
    </div>
  )
}

export default NotFound
