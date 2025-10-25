import React, { useContext, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../Language/LanguageSelector';
import './MonCompte.scss';
import Searchbar from '../../components/Searchbar/Searchbar';
import MediaContext from '../../context/MediaContext';
import { DESKTOP } from '../../constants/MediaTypeConstants';
import { useSelector, useDispatch } from 'react-redux';
import { main } from '@popperjs/core';
import moment from 'moment';
import axios from 'axios';
import { setConnectedUser } from '../../redux/actions/userActions';


const MonCompte = () => {
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();
    
    // Debug: vérifier les données de l'utilisateur
    console.log('===== USER DEBUG =====');
    console.log('User complet:', user);
    console.log('User birthDate:', user?.birthDate);
    console.log('Toutes les clés de user:', user ? Object.keys(user) : 'pas de user');
    console.log('======================');
    
    // Fonction pour recharger les données utilisateur
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
    
    // Recharger les données au montage du composant
    useEffect(() => {
        reloadUserData();
    }, []); // Se déclenche une seule fois au montage
    
    return(
       <main className="mon-compte">
            <h1>Mon compte</h1>
            <h3>Gerer vos identifiants et le fonctionement de votre compte</h3>
            <h2>Mes identifiants</h2>
            <div className='identifiants'>
                <p>Mon adresse email</p>
                {user ? (
                    <p>Email: {user.email}</p>
                    
                ) : (
                    <p>Utilisateur non connecté</p>
                )}
                <p>Mon motts de passe</p>
                <p>modifier</p>
            </div>
            <div className='infoperso'>
                <h2>Mes informations personnelles</h2>
                <div className='mb-10'>
                    <p><strong>Date de naissance:</strong></p>
                    {user ? (
                        <p>{user.birthDate ? user.birthDate : '⚠️ birthDate est vide ou null'}</p>
                        ) : (
                        <p>information non disponnible</p>
                    )}
                </div>
                <div className='mb-10'>
                    <p><strong>Genre hello:</strong></p>
                    <p>{user?.gender?.title || 'Non disponible'}</p>
                    <p><strong>Id:</strong></p>
                    <p>{user?.id || 'id disponible'}</p>
                </div>
                <div className='mb-10'>
                    <p><strong>Langue</strong></p>
                    <LanguageSelector />
                </div>
            </div>
            
        </main>
    )
}
export default MonCompte;