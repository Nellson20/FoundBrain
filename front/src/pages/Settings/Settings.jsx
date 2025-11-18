// src/pages/Settings/Settings.js
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../../components/Language/LanguageSelector';
import React, { useContext, useState } from 'react'
import './Settings.scss'
import Searchbar from '../../components/Searchbar/Searchbar';
import MediaContext from '../../context/MediaContext';
import { DESKTOP } from '../../constants/MediaTypeConstants';
import { useSelector } from 'react-redux';
import MyAccount from '../MyAccount/MyAccount';
import Visibility from '../Visibility/Visibility';
import Appearance from '../Appearance/Appearance';
import ConfidentialityAndSecurity from '../ConfidentialityAndSecurity/ConfidentialityAndSecurity';
import NotificationSettings from '../NotificationSettings/NotificationSettings';
import { Briefcase, PlayFill, Tag, ChevronRight, ChevronLeft, Check2, Palette, ShieldLock, PersonCircle, Eye ,Bell } from 'react-bootstrap-icons';

const Settings = () => {
  const { t } = useTranslation();
  const { deviceType } = useContext(MediaContext)
  const { user } = useSelector(store => store.user)

  const [activeSection, setActiveSection] = useState("MonCompte")

  return (
    <main className="layout">
      {deviceType === DESKTOP && (
        <aside className="sidebar">
          <div className="sidebar-header">
            <h1>{t('Paramètres')}</h1>
          </div>
            
          <div className="sidebar-search">
            <Searchbar placeholder={t('Rechercher dans les paramètres')} />
          </div>

          <nav className="sidebar-menu">
            <ul>
              <li 
                className={activeSection === "MonCompte" ? "active" : ""}
                onClick={() => setActiveSection("MonCompte")}
              >
                <PersonCircle size={18} /> 
                {t('Mon compte')}
              </li>
              <li 
                className={activeSection === "Visibilite" ? "active" : ""}
                onClick={() => setActiveSection("Visibilite")}
              >
                <Eye size={18} /> 
                {t('Visibilté')}
              </li>
              <li 
                className={activeSection === "Apparence" ? "active" : ""}
                onClick={() => setActiveSection("Apparence")}
              >
                <Palette size={18}/>
                {t('Apparence')}
              </li>
              <li 
                className={activeSection === "ConfidentialityAndSecurity" ? "active" : ""}
                onClick={() => setActiveSection("MoConfidentialityAndSecuritynCompte")}
              >
                <ShieldLock size={18} />
                {t('Confidentialité et sécurité')}
              </li>
              <li 
                className={activeSection === "NotificationSettings" ? "active" : ""}
                onClick={() => setActiveSection("NotificationSettings")}
              >
                <Bell size={18} /> 
                {t('Notification')}
              </li>
              {/* <li 
                className={activeSection === "language" ? "active" : ""}
                onClick={() => setActiveSection("language")}
              >
                {t('Langue')}
              </li> */}
            </ul>
          </nav>
        </aside>
      )}

      <section className="content">
        {activeSection === "MonCompte" && <MyAccount />}
        {activeSection === "Visibilite" && <Visibility />}
        {activeSection === "Apparence" && <Appearance />}
        {activeSection === "NotificationSettings" && <NotificationSettings />}
        {activeSection === "ConfidentialityAndSecurity" && <ConfidentialityAndSecurity />}
        {activeSection === "notification" && <p>{t(" Les paramètres de notification...")}</p>}
      </section>
    </main>
  )
}

export default Settings;
