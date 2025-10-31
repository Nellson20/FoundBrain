import React, { useContext, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../../components/Language/LanguageSelector';

import Searchbar from '../../components/Searchbar/Searchbar';
import MediaContext from '../../context/MediaContext';
import { DESKTOP } from '../../constants/MediaTypeConstants';
import { useSelector, useDispatch } from 'react-redux';
import { main } from '@popperjs/core';
import moment from 'moment';
import axiosInstance from '../../axios';
import { setConnectedUser } from '../../redux/actions/userActions';
import { ChevronDown } from 'react-bootstrap-icons';
import './Notification.scss';
import Form from 'react-bootstrap/Form';


const NotificationItem = ({ title, description, eventType, settings, onUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const [notificationPush, setNotificationPush] = useState(settings?.notificationPush ?? true);
  const [notificationInAPP, setNotificationInAPP] = useState(settings?.notificationInAPP ?? true);

  useEffect(() => {
    if (settings) {
      setNotificationPush(settings.notificationPush ?? true);
      setNotificationInAPP(settings.notificationInAPP ?? true);
    }
  }, [settings]);

  const handleToggle = async (type, value) => {
    const data = {
      eventType,
      [type]: value
    };

    try {
      const response = await axiosInstance.patch('/api/me/notification-settings', data);
      console.log('✅ Notification settings updated:', response.data);
      if (type === 'notificationPush') {
        setNotificationPush(value);
      } else {
        setNotificationInAPP(value);
      }
      onUpdate(eventType, response.data);
    } catch (error) {
      console.error('❌ Error updating notification settings:', error);
      alert(t('Erreur lors de la mise à jour des paramètres'));
    }
  };

  return (
    <div className={`notification-item ${isOpen ? 'open' : ''}`}>
      <div className='notification-header-row' onClick={() => setIsOpen(!isOpen)}>
        <div className='notification-content'>
          <h3 className="notification-title">{title}</h3>
          <p className="notification-description">{description}</p>
        </div>
        <ChevronDown
          size={20}
          className={`chevron-icon ${isOpen ? 'rotated' : ''}`}
        />
      </div>

      {isOpen && (
        <div className="notification-details">
          <p>{t("Recevoir des notifications par:")}</p>
          <div className="switch-row">
            <div>
              <p>{t("Notification push")}</p>
              <Form className="custom-switch">
                <Form.Check 
                  type="switch"
                  id={`push-${eventType}`}
                  checked={notificationPush}
                  onChange={(e) => handleToggle('notificationPush', e.target.checked)}
                />
              </Form>
            </div>
            <div>
              <p>{t("Notification dans l'application")}</p>
              <Form className="custom-switch">
                <Form.Check 
                  type="switch"
                  id={`inapp-${eventType}`}
                  checked={notificationInAPP}
                  onChange={(e) => handleToggle('notificationInAPP', e.target.checked)}
                />
              </Form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const NotificationSettings = ()=>{
    const { t } = useTranslation();
    const [settingsMap, setSettingsMap] = useState({});

    useEffect(() => {
      const fetchSettings = async () => {
        try {
          const response = await axiosInstance.get('/api/me/notification-settings');
          const map = {};
          response.data.forEach(setting => {
            map[setting.eventType] = setting;
          });
          setSettingsMap(map);
          console.log('📥 Loaded notification settings:', map);
        } catch (error) {
          console.error('❌ Error loading notification settings:', error);
        }
      };
      fetchSettings();
    }, []);

    const handleUpdate = (eventType, newSettings) => {
      setSettingsMap(prev => ({
        ...prev,
        [eventType]: newSettings
      }));
    };
    return(
        <main className='notification'>
            <div className='notification-header'>
                <h1>{t('Notifications')}</h1>
                <p className="subtitle">{t('Sélectionnez le genre de notifications que vous voulez recevoir sur FoundBrain')}</p>
            </div>
            
            <section className="notification-settings-section">
                <div className='notification-category'>
                    <h2 className='category-title'>{t('Général')}</h2>
                    
                    <NotificationItem
                        title={t("Commentaires")}
                        description={t("Recevez une notification lorsque quelqu'un commente une publication que vous avez posté, partagé ou suivi.")}
                        eventType="COMMENT"
                        settings={settingsMap['COMMENT']}
                        onUpdate={handleUpdate}
                    />
                    <NotificationItem
                        title={t("Réactions")}
                        description={t("Recevez une notification lorsque quelqu'un réagit à votre publication.")}
                        eventType="REACTION"
                        settings={settingsMap['REACTION']}
                        onUpdate={handleUpdate}
                    />
                    <NotificationItem
                        title={t("Enregistrements")}
                        description={t("Recevez une notification lorsque quelqu'un enregistre votre publication.")}
                        eventType="SAVE"
                        settings={settingsMap['SAVE']}
                        onUpdate={handleUpdate}
                    />
                    <NotificationItem
                        title={t("Republications")}
                        description={t("Recevez une notification lorsque quelqu'un republie votre contenu.")}
                        eventType="PUBLICATIONS"
                        settings={settingsMap['PUBLICATIONS']}
                        onUpdate={handleUpdate}
                    />
                    <NotificationItem
                        title={t("Captures d'écrans")}
                        description={t("Recevez une notification lorsque quelqu'un prend une capture d'écran de votre contenu.")}
                        eventType="SCREEN"
                        settings={settingsMap['SCREEN']}
                        onUpdate={handleUpdate}
                    />
                    <NotificationItem
                        title={t("Visites de profil")}
                        description={t("Recevez une notification lorsque quelqu'un visite votre profil.")}
                        eventType="VISITE"
                        settings={settingsMap['VISITE']}
                        onUpdate={handleUpdate}
                    />
                    <NotificationItem
                        title={t("Aparitions dans les resultats de rechereches")}
                        description={t("Recevez une notification lorsque vous apparaissez dans les résultats de recherche.")}
                        eventType="SEARCH"
                        settings={settingsMap['SEARCH']}
                        onUpdate={handleUpdate}
                    />
                </div>

                
                <div className='notification-category'>
                    <h2 className='category-title'>{t("Réseautages")}</h2>
                    
                        <NotificationItem
                            title={t("Demande de contact")}
                            description={t("Recevez une notification lorsque quelqu'un vous envoie une demande de contact.")}
                            eventType="INVITATION"
                            settings={settingsMap['INVITATION']}
                            onUpdate={handleUpdate}
                        />
                </div>
            </section>
        </main>
    )
}

export default NotificationSettings;