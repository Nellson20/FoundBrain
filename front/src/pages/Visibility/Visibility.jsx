import React, { useContext, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../../components/Language/LanguageSelector';
import './Visibility.scss';
import Searchbar from '../../components/Searchbar/Searchbar';
import MediaContext from '../../context/MediaContext';
import { DESKTOP } from '../../constants/MediaTypeConstants';
import { useSelector, useDispatch } from 'react-redux';
import { main } from '@popperjs/core';
import moment from 'moment';
import axios from '../../axios';
import { setConnectedUser } from '../../redux/actions/userActions';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';





const Visibility = ()=>{
    const { t } = useTranslation();
    const dispatch = useDispatch();   
    const [isActive, setIsActive] = useState(true); 
    const [isVisible, setIsVisible] = useState(false);
    
    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await axios.get('/api/me/visibility-settings');
                console.log('📥 Loaded visibility settings:', response.data);
                setIsVisible(response.data.private ?? false);
                setIsActive(response.data.searchEngine ?? true);
            } catch (error) {
                console.error('❌ Error loading visibility settings:', error);
            }
        };
        fetchSettings();
    }, []);
    
    const MakePrivate = (checked) =>{
        return axios.patch('/api/me/visibility-settings-private', {
                private: checked
            })
            .then((res) => {
                console.log('🔄 Mise à jour user_settings_private:', checked);
                console.log('🔍 Toutes les clés:', Object.keys(res.data));
                alert(checked ? '✅ Votre profil est maintenant privé.' : '✅ Votre profil est maintenant public.');
                dispatch(setConnectedUser(res.data));
            })
            .catch((error) => {
                console.error('❌ Erreur lors de la mise à jour du private user_settings', error)
                
                if (error.response) {
                    console.error('Statut HTTP:', error.response.status)
                    console.error('Détails du serveur:', error.response.data)
                    alert(`Erreur: ${error.response.data.message || 'Impossible de mettre user_settings private'}`)
                } else if (error.request) {
                    console.error('Aucune réponse reçue:', error.request)
                    alert('Erreur: Aucune réponse du serveur')
                } else {
                    console.error('Erreur Axios:', error.message)
                    alert(`Erreur: ${error.message}`)
                }
            })
    }

    const SearchEngine = (checked) =>{
        return axios.patch('/api/me/visibility-settings-searchEngine', {
                searchEngine: checked
            })
            .then((res) => {
                console.log('🔄 Mise à jour user_settings_searchEngine:', checked);
                console.log('🔍 Toutes les clés:', Object.keys(res.data));
                alert(checked ? '✅ Votre profil apparaîtra dans les moteurs de recherche.' : '✅ Votre profil n\'apparaîtra pas dans les moteurs de recherche.');
                dispatch(setConnectedUser(res.data));
            })
            .catch((error) => {
                console.error('❌ Erreur lors de la mise à jour du private user_settings', error)
                
                if (error.response) {
                    console.error('Statut HTTP:', error.response.status)
                    console.error('Détails du serveur:', error.response.data)
                    alert(`Erreur: ${error.response.data.message || 'Impossible de mettre user_settings searchEngine'}`)
                } else if (error.request) {
                    console.error('Aucune réponse reçue:', error.request)
                    alert('Erreur: Aucune réponse du serveur')
                } else {
                    console.error('Erreur Axios:', error.message)
                    alert(`Erreur: ${error.message}`)
                }
            })
    }
    const handleChanged = (e) => {
        const checked = e.target.checked; 
        setIsVisible(checked);
        MakePrivate(checked);
        console.log('Switch activé ? ', e.target.checked);
    };

    const handleChange = (e) => {
        const checked = e.target.checked; 
        setIsActive(checked);
        SearchEngine(checked);
        
        console.log('Switch activé ? ', e.target.checked);
        console.log('valeur du checked est:', checked);
    };
    return(
       <main className='visibility'>
            <div className='visibility-header'>
                <h1>{t('Visibilité de mon compte')}</h1>
                <p className="subtitle">{t('Choisir comment votre profil doit etre affiché sur FoundBrain ou ailleurs')}</p>
            </div>
            <section className="visibility-section">
                <h2 className="section-title">{t('Profil privée')}</h2>
                <div className="switch-row">
                    <p>{t('Rendez privée votre profil pour le rendre accessible seulement pour vos selection de contact')}</p>
                    <Form className="custom-switch" style={{ padding: '20px' }}>
                        <Form.Check 
                            type="switch"
                            id="custom-switch"
                            checked={isVisible} 
                            onChange={handleChanged}
                        />
                    </Form>
                </div>
                <h2 className="section-title">{t('Moteurs de rechereches')}</h2>
                <div className="switch-row">
                    <p>{t("Paramaètrer vos moteurs de rechereche d'affiche votre profil sur Google.....")}</p>
                    <Form className="custom-switch" style={{ padding: '20px' }}>
                        <Form.Check 
                            type="switch"
                            id="custom-switch"
                            checked={isActive} 
                            onChange={handleChange}
                        />
                    </Form>
                </div>
            </section>
       </main>
    )
}


export default Visibility;