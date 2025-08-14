import React from 'react'
import './ArtistDashboard.scss'
import { useTranslation } from 'react-i18next';

const ArtistDashboard = () => {
    const { t } = useTranslation();
    return (
        <div id='artist-dashboard'>
            <div className="top mb-15">
                <h1 className='txt-1 dashboard-ttl'>{t('Bienvenue sur votre tableau de bord')}</h1>
            </div>
            <div className="bottom mt-10">
                <div className="add-video-card flex flex-column align-items-center gap-15 p-15 justify-content-center">

                    <small className='text-center txt-2'>{t('Vous pouvez publier votre première vidéo dès maintenant pour promouvoir efficacement votre musique sur Afrimuz.')}</small>
                    <button className="btn-gradient">{t('Importer une video')}</button>

                </div>
            </div>
        </div>

    )
}

export default ArtistDashboard
