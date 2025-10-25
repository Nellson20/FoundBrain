import React, { useContext, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../../components/Language/LanguageSelector';
import './MyAccount.scss';
import Searchbar from '../../components/Searchbar/Searchbar';
import MediaContext from '../../context/MediaContext';
import { DESKTOP } from '../../constants/MediaTypeConstants';
import { useSelector, useDispatch } from 'react-redux';
import { main } from '@popperjs/core';
import moment from 'moment';
import axios from 'axios';
import { setConnectedUser } from '../../redux/actions/userActions';
import ChangeMdp from './ChangeMdp';
import CheckMdp from './CheckMdp';


const MonCompte = () => {
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [actionType, setActionType] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    
    // Debug: vérifier les données de l'utilisateur
    console.log('===== USER DEBUG =====');
    console.log('User complet:', user);
    console.log('User birthDate:', user?.birthDate);
    console.log('Toutes les clés de user:', user ? Object.keys(user) : 'pas de user');
    console.log('======================');
    
  
    const reloadUserData = () => {
        if (user?.id) {
            axios({
                url: `${process.env.REACT_APP_API_DOMAIN}/users/${user.id}?groups[]=users_read`,
                method: 'get',
                withCredentials: true,
            }).then((res) => {
                console.log('🔄 Données rechargées:', res.data);
                console.log('🔍 Gender dans la réponse:', res.data.gender);
                console.log('🔍 Toutes les clés:', Object.keys(res.data));
                dispatch(setConnectedUser(res.data));
               
            }).catch((err) => {
                console.error('Erreur rechargement:', err);
            });
        }
    };
    

    useEffect(() => {
        console.log('🔍 useEffect déclenché, user?.id:', user?.id);
        reloadUserData();
    }, [user?.id]);

    
    return(
       <main className="mon-compte">
            <div className="compte-header">
                <h1>Mon compte</h1>
                <p className="subtitle">Gérez vos identifiants et le fonctionnement de votre compte</p>
            </div>

            <section className="compte-section">
                <h2 className="section-title">Mes identifiants</h2>
                
                <div className="form-field">
                    <label>Mon adresse email</label>
                    <div className="field-value">
                        {user?.email || 'Non disponible'}
                    </div>
                    {/* <div className="field-value">
                        {user?.id || 'Non disponible'}
                    </div> */}
                </div>

                <div className="form-field password-field">
                    <label>Mon mot de passe</label>
                    <div className="field-row">
                        <div className="field-value password-hidden">
                            •••••••••
                        </div>
                        <ChangeMdp>
                            <button className="btn-modifier">Modifier</button>
                        </ChangeMdp>
                    </div>
                </div>
            </section>

            <section className="compte-section">
                <h2 className="section-title">Mes informations personnelles</h2>
                
                <div className="form-field">
                    <label>Né(e) le</label>
                    <div className="field-value">
                        {user?.birthDate || 'waiting...'}
                    </div>
                </div>

                <div className="form-field genre-field">
                    <label>Genre</label>
                    <div className="radio-group">
                        <label className="radio-option">
                            <input 
                                type="radio" 
                                name="gender" 
                                value="homme"
                                checked={user?.gender?.title?.toLowerCase() === 'homme'}
                                readOnly
                            />
                            <span>Homme</span>
                        </label>
                        <label className="radio-option">
                            <input 
                                type="radio" 
                                name="gender" 
                                value="femme"
                                checked={user?.gender?.title?.toLowerCase() === 'femme'}
                                readOnly
                            />
                            <span>Femme</span>
                        </label>
                        <label className="radio-option">
                            <input 
                                type="radio" 
                                name="gender" 
                                value="autre"
                                checked={user?.gender?.title?.toLowerCase() === 'autre'}
                                readOnly
                            />
                            <span>Autre</span>
                        </label>
                    </div>
                </div>

                <div className="form-field">
                    <label>Mon pays/region</label>
                    <div className="field-value">
                        {user?.birthDate || 'Non renseigné'}
                    </div>
                </div>

                <div className="form-field">
                    <label>Langue</label>
                    <LanguageSelector />
                </div>
            </section>

            <section className="compte-section danger-section">
                <h2 className="section-title">Activités de mon compte</h2>
                
                <div className="danger-action">
                    <div>
                        <h3>Désactiver mon compte</h3>
                        <p>Masquer temporairement votre compte sur tout le réseau</p>
                    </div>
                    <button 
                        className="btn-danger-outline" 
                        onClick={() => {
                            setActionType('desactiver');
                            setModalOpen(true);
                        }}
                        >
                        Désactiver
                    </button>
                </div>

                <div className="danger-action">
                    <div>
                        <h3>Supprimer mon compte</h3>
                        <p>Supprimer définitivement votre compte et vos données</p>
                    </div>
                    <button 
                        className="btn-danger" 
                        onClick={() => {
                            setActionType('supprimer');
                            setModalOpen(true);
                        }}
                        >
                        Supprimer
                    </button>
                </div>
            </section>

            {isModalOpen && (
                <CheckMdp 
                    actionType={actionType} 
                    onClose={() => setModalOpen(false)} 
                />
            )}
        </main>
    )
}
export default MonCompte;