import React from 'react'
import { useTranslation } from 'react-i18next';

const ArtistContent = () => {
  const { t } = useTranslation();
  return (
    <div id='artist-content'>
      <div className="top">
        <h2 className="dashboard-ttl">{t('Mes contenus')}</h2>
      </div>
      <div className="bottom">
        
      </div>
    </div>
  )
}

export default ArtistContent
