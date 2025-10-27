import React, { useContext, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../../components/Language/LanguageSelector';

import Searchbar from '../../components/Searchbar/Searchbar';
import MediaContext from '../../context/MediaContext';
import { DESKTOP } from '../../constants/MediaTypeConstants';
import { useSelector, useDispatch } from 'react-redux';
import { main } from '@popperjs/core';
import moment from 'moment';
import axios from 'axios';
import { setConnectedUser } from '../../redux/actions/userActions';
import { ChevronDown } from 'react-bootstrap-icons';
import './Notification.scss';
import Form from 'react-bootstrap/Form';


const NotificationItem = ({ title, description, details }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

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
          {details}
        </div>
      )}
    </div>
  );
};

const NotificationSettings = ()=>{
    const { t } = useTranslation();
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
                        details={
                            <>
                                <p>{t("Recevoir des notifications par:")}</p>
                                <div className="switch-row">
                                    <div>
                                        <p>{t("Notification push")}</p>
                                        <Form className="custom-switch">
                                            <Form.Check 
                                                type="switch"
                                                id="push-notification"
                                            />
                                        </Form>
                                    </div>
                                    <div>
                                        <p>{t("Notification dans l'application")}</p>
                                        <Form className="custom-switch">
                                            <Form.Check 
                                                type="switch"
                                                id="in-app-notification"
                                            />
                                        </Form>
                                    </div>
                                </div>
                            </>
                        }
                    />
                    <NotificationItem
                        title={t("Réactions")}
                        description={t("Recevez une notification lorsque quelqu'un commente une publication que vous avez posté, partagé ou suivi.")}
                        details={
                            <>
                                <p>{t("Recevoir des notifications par:")}</p>
                                <div className="switch-row">
                                    <div>
                                        <p>{t("Notification push")}</p>
                                        <Form className="custom-switch">
                                            <Form.Check 
                                                type="switch"
                                                id="push-notification"
                                            />
                                        </Form>
                                    </div>
                                    <div>
                                        <p>{t("Notification dans l'application")}</p>
                                        <Form className="custom-switch">
                                            <Form.Check 
                                                type="switch"
                                                id="in-app-notification"
                                            />
                                        </Form>
                                    </div>
                                </div>
                            </>
                        }
                    />
                    <NotificationItem
                        title={t("Enregistrements")}
                        description={t("Recevez une notification lorsque quelqu'un commente une publication que vous avez posté, partagé ou suivi.")}
                        details={
                            <>
                                <p>{t("Recevoir des notifications par:")}</p>
                                <div className="switch-row">
                                    <div>
                                        <p>{t("Notification push")}</p>
                                        <Form className="custom-switch">
                                            <Form.Check 
                                                type="switch"
                                                id="push-notification"
                                            />
                                        </Form>
                                    </div>
                                    <div>
                                        <p>{t("Notification dans l'application")}</p>
                                        <Form className="custom-switch">
                                            <Form.Check 
                                                type="switch"
                                                id="in-app-notification"
                                            />
                                        </Form>
                                    </div>
                                </div>
                            </>
                        }
                    />
                    <NotificationItem
                        title={t("Republications")}
                        description={t("Recevez une notification lorsque quelqu'un commente une publication que vous avez posté, partagé ou suivi.")}
                        details={
                            <>
                                <p>{t("Recevoir des notifications par:")}</p>
                                <div className="switch-row">
                                    <div>
                                        <p>{t("Notification push")}</p>
                                        <Form className="custom-switch">
                                            <Form.Check 
                                                type="switch"
                                                id="push-notification"
                                            />
                                        </Form>
                                    </div>
                                    <div>
                                        <p>{t("Notification dans l'application")}</p>
                                        <Form className="custom-switch">
                                            <Form.Check 
                                                type="switch"
                                                id="in-app-notification"
                                            />
                                        </Form>
                                    </div>
                                </div>
                            </>
                        }
                    />
                    <NotificationItem
                        title={t("Captures d'écrans")}
                        description={t("Recevez une notification lorsque quelqu'un commente une publication que vous avez posté, partagé ou suivi.")}
                        details={
                            <>
                                <p>{t("Recevoir des notifications par:")}</p>
                                <div className="switch-row">
                                    <div>
                                        <p>{t("Notification push")}</p>
                                        <Form className="custom-switch">
                                            <Form.Check 
                                                type="switch"
                                                id="push-notification"
                                            />
                                        </Form>
                                    </div>
                                    <div>
                                        <p>{t("Notification dans l'application")}</p>
                                        <Form className="custom-switch">
                                            <Form.Check 
                                                type="switch"
                                                id="in-app-notification"
                                            />
                                        </Form>
                                    </div>
                                </div>
                            </>
                        }
                    />
                    <NotificationItem
                        title={t("Visites de profil")}
                        description={t("Recevez une notification lorsque quelqu'un commente une publication que vous avez posté, partagé ou suivi.")}
                        details={
                            <>
                                <p>{t("Recevoir des notifications par:")}</p>
                                <div className="switch-row">
                                    <div>
                                        <p>{t("Notification push")}</p>
                                        <Form className="custom-switch">
                                            <Form.Check 
                                                type="switch"
                                                id="push-notification"
                                            />
                                        </Form>
                                    </div>
                                    <div>
                                        <p>{t("Notification dans l'application")}</p>
                                        <Form className="custom-switch">
                                            <Form.Check 
                                                type="switch"
                                                id="in-app-notification"
                                            />
                                        </Form>
                                    </div>
                                </div>
                            </>
                        }
                    />
                    <NotificationItem
                        title={t("Aparitions dans les resultats de rechereches")}
                        description={t("Recevez une notification lorsque quelqu'un commente une publication que vous avez posté, partagé ou suivi.")}
                        details={
                            <>
                                <p>{t("Recevoir des notifications par:")}</p>
                                <div className="switch-row">
                                    <div>
                                        <p>{t("Notification push")}</p>
                                        <Form className="custom-switch">
                                            <Form.Check 
                                                type="switch"
                                                id="push-notification"
                                            />
                                        </Form>
                                    </div>
                                    <div>
                                        <p>{t("Notification dans l'application")}</p>
                                        <Form className="custom-switch">
                                            <Form.Check 
                                                type="switch"
                                                id="in-app-notification"
                                            />
                                        </Form>
                                    </div>
                                </div>
                            </>
                        }
                />
                </div>

                
                <div className='notification-category'>
                    <h2 className='category-title'>{t("Réseautages")}</h2>
                    
                        <NotificationItem
                            title={t("Messsages")}
                            description={t("Recevez une notification lorsque quelqu'un commente une publication que vous avez posté, partagé ou suivi.")}
                            details={
                                <>
                                    <p>{t("Recevoir des notifications par:")}</p>
                                    <div className="switch-row">
                                        <div>
                                            <p>{t("Notification push")}</p>
                                            <Form className="custom-switch">
                                                <Form.Check 
                                                    type="switch"
                                                    id="push-notification"
                                                />
                                            </Form>
                                        </div>
                                        <div>
                                            <p>{t("Notification dans l'application")}</p>
                                            <Form className="custom-switch">
                                                <Form.Check 
                                                    type="switch"
                                                    id="in-app-notification"
                                                />
                                            </Form>
                                        </div>
                                    </div>
                                </>
                            }
                    />
                    
                    <NotificationItem
                        title={t("Demande de contact")}
                        description={t("Recevez une notification lorsque quelqu'un vous envoie une demande de contact.")}
                        details={
                            <>
                                <p>{t("Recevoir des notifications par:")}</p>
                                <div className="switch-row">
                                    <div>
                                        <p>{t("Notification push")}</p>
                                        <Form className="custom-switch">
                                            <Form.Check 
                                                type="switch"
                                                id="push-notification"
                                            />
                                        </Form>
                                    </div>
                                    <div>
                                        <p>{t("Notification dans l'application")}</p>
                                        <Form className="custom-switch">
                                            <Form.Check 
                                                type="switch"
                                                id="in-app-notification"
                                            />
                                        </Form>
                                    </div>
                                </div>
                            </>
                        }
                    />
                </div>
            </section>
        </main>
    )
}

export default NotificationSettings;