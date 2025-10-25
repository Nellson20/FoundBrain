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

const NotificationSettings = ()=>{
    return(
        <main className='notification'>
            <div className='notification-header'>
                <h1>Notifications</h1>
                <p className="subtitle">Sélectionnez le genre de notifications que vous voulez recevoir sur FoundBrain</p>
            </div>
            
            <section className="notification-settings-section">
                <div className='notification-category'>
                    <h2 className='category-title'>Général</h2>
                    
                    <div className='notification-item'>
                        <div className='notification-content'>
                            <h3 className="notification-title">Commentaires</h3>
                            <p className="notification-description">Recevez une notification lorsque quelqu'un commente une publication que vous avez posté, partagé ou suivi.</p>
                        </div>
                        <ChevronDown size={18} className="chevron-icon" />
                    </div>
                    
                    <div className='notification-item'>
                        <div className='notification-content'>
                            <h3 className="notification-title">Réactions</h3>
                            <p className="notification-description">Recevez une notification lorsque quelqu'un aime une publication que vous avez posté, partagé ou suivi.</p>
                        </div>
                        <ChevronDown size={18} className="chevron-icon" />
                    </div>
                    
                    <div className='notification-item'>
                        <div className='notification-content'>
                            <h3 className="notification-title">Enregistrements</h3>
                            <p className="notification-description">Recevez une notification lorsque quelqu'un partage une publication que vous avez posté, partagé ou suivi.</p>
                        </div>
                        <ChevronDown size={18} className="chevron-icon" />
                    </div>
                    
                    <div className='notification-item'>
                        <div className='notification-content'>
                            <h3 className="notification-title">Republications</h3>
                            <p className="notification-description">Recevez une notification lorsque quelqu'un partage une publication que vous avez posté, partagé ou suivi.</p>
                        </div>
                        <ChevronDown size={18} className="chevron-icon" />
                    </div>
                    
                    <div className='notification-item'>
                        <div className='notification-content'>
                            <h3 className="notification-title">Captures d'écrans</h3>
                            <p className="notification-description">Recevez une notification lorsque quelqu'un fait une capture d'écran mobile d'une publication que vous avez posté, partagé ou suivi.</p>
                        </div>
                        <ChevronDown size={18} className="chevron-icon" />
                    </div>
                    
                    <div className='notification-item'>
                        <div className='notification-content'>
                            <h3 className="notification-title">Visites de profil</h3>
                            <p className="notification-description">Recevez une notification lorsque quelqu'un visite votre profil.</p>
                        </div>
                        <ChevronDown size={18} className="chevron-icon" />
                    </div>
                    
                    <div className='notification-item'>
                        <div className='notification-content'>
                            <h3 className="notification-title">Apparitions dans les résultats de recherches</h3>
                            <p className="notification-description">Recevez une notification lorsque votre profil ou publication apparaissent dans les résultats de recherche.</p>
                        </div>
                        <ChevronDown size={18} className="chevron-icon" />
                    </div>
                </div>
                
                <div className='notification-category'>
                    <h2 className='category-title'>Réseautages</h2>
                    
                    <div className='notification-item'>
                        <div className='notification-content'>
                            <h3 className="notification-title">Messages</h3>
                            <p className="notification-description">Recevez une notification lorsque quelqu'un vous envoie un message.</p>
                        </div>
                        <ChevronDown size={18} className="chevron-icon" />
                    </div>
                    
                    <div className='notification-item'>
                        <div className='notification-content'>
                            <h3 className="notification-title">Demande de contact</h3>
                            <p className="notification-description">Recevez une notification lorsque quelqu'un vous envoie une demande de contact.</p>
                        </div>
                        <ChevronDown size={18} className="chevron-icon" />
                    </div>
                </div>
            </section>
        </main>
    )
}

export default NotificationSettings;