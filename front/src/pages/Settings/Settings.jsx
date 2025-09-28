// src/pages/Settings/Settings.js
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../../components/LanguageSelector';
import React, { useContext, useState } from 'react'
import './Settings.scss'
import MediaContext from '../../context/MediaContext';
import { DESKTOP } from '../../constants/MediaTypeConstants';
import { useSelector } from 'react-redux';

const Settings = () => {
  const { t } = useTranslation();
  const { deviceType } = useContext(MediaContext)
  const { user } = useSelector(store => store.user)

  const [activeSection, setActiveSection] = useState("language")

  return (
    <main className="layout">
      {deviceType === DESKTOP && (
        <aside className="sidebar">
          <header className="sidebar-header">
            <h1>{t('Paramètres')}</h1>
          </header>

          <nav className="sidebar-menu">
            <ul>
              <li 
                className={activeSection === "language" ? "active" : ""}
                onClick={() => setActiveSection("language")}
              >
                {t('Langue')}
              </li>
              <li 
                className={activeSection === "notification" ? "active" : ""}
                onClick={() => setActiveSection("notification")}
              >
                {t('Notification')}
              </li>
            </ul>
          </nav>
        </aside>
      )}

      <section className="content">
        {activeSection === "language" && <LanguageSelector />}
        {activeSection === "notification" && <p>{t(" Les paramètres de notification...")}</p>}
      </section>
    </main>
  )
}

export default Settings;
