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
import {getCountryList} from '../../api/coutry';


const MonCompte = () => {
    const { t } = useTranslation();
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [actionType, setActionType] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [countries, setCountries] = useState([])
    const [selectedCountry, setSelectedCountry] = useState('')
    
    // Debug: vérifier les données de l'utilisateur
    console.log('===== USER DEBUG =====');
    console.log('User complet:', user);
    console.log('User birthDate:', user?.birthDate);
    console.log('Toutes les clés de user:', user ? Object.keys(user) : 'pas de user');
    console.log('======================');
    const userSettingsId = user?.id;
    const getCountries = async () => {
    try {
      const data = await getCountryList({ ipp: 50, pg: 1 })
      setCountries(data) // data = res.data
      console.log('Countries:', data)
    } catch (error) {
      console.error('Erreur lors du chargement des pays:', error)
    }
  }
   
  
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

    const updateCountry = async (id) => {
    try {
      await axios.patch(`${process.env.REACT_APP_API_DOMAIN}/api/me/account-country`, {
        country: id, }
    , { withCredentials: true });
      alert('Pays mis à jour avec succès 🇲🇬')
    } catch (error) {
      console.error('Erreur de mise à jour du pays :', error)
    }
  }

  // 🔹 Quand l’utilisateur change le pays
  const handleChange = (e) => {
    const id = e.target.value
    console.log('l"id est:',id)
    setSelectedCountry(id)
    if (id) {
      updateCountry(id)
        }
    }
    

    useEffect(() => {
        console.log('🔍 useEffect déclenché, user?.id:', user?.id);
        reloadUserData();
        getCountries();
    }, [user?.id]);

    
    return(
       <main className="mon-compte">
            <div className="compte-header">
                <h1>{t('Mon compte')}</h1>
                <p className="subtitle">{t('Gérez vos identifiants et le fonctionnement de votre compte')}</p>
            </div>

            <section className="compte-section">
                <h2 className="section-title">{t('Mes identifiants')}</h2>
                
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
                            <button className="btn-modifier">{t('Modifier')}</button>
                        </ChangeMdp>
                    </div>
                </div>
            </section>

            <section className="compte-section">
                <h2 className="section-title">{t('Mes informations personnelles')}</h2>
                
                <div className="form-field">
                    <label>{t('Né(e) le')}</label>
                    <div className="field-value">
                        {user?.birthDate || 'waiting...'}
                    </div>
                </div>

                <div className="form-field genre-field">
                    <label>{t('Genre')}</label>
                    <div className="radio-group">
                        <label className="radio-option">
                            <input 
                                type="radio" 
                                name="gender" 
                                value="homme"
                                checked={user?.gender?.title?.toLowerCase() === 'homme'}
                                readOnly
                            />
                            <span>{t('Homme')}</span>
                        </label>
                        <label className="radio-option">
                            <input 
                                type="radio" 
                                name="gender" 
                                value="femme"
                                checked={user?.gender?.title?.toLowerCase() === 'femme'}
                                readOnly
                            />
                            <span>{t('Femme')}</span>
                        </label>
                        <label className="radio-option">
                            <input 
                                type="radio" 
                                name="gender" 
                                value="autre"
                                checked={user?.gender?.title?.toLowerCase() === 'autre'}
                                readOnly
                            />
                            <span>{t('Autre')}</span>
                        </label>
                    </div>
                </div>

                <div className="form-field">
                    <label>Mon pays/region</label>
                    <select value={selectedCountry} onChange={handleChange}>
                    <option value="">-- Sélectionnez un pays --</option>
                        {countries.map((country) => (
                            <option key={country.id} value={country.id}>
                            {country.name}
                            </option>
                        ))}
                    </select>  
                </div>
                

                <div className="form-field">
                    <label>{t('Langue')}</label>
                    <LanguageSelector userSettingsId={userSettingsId}/>
                </div>
            </section>

            <section className="compte-section danger-section">
                <h2 className="section-title">{t('Activités de mon compte')}</h2>
                
                <div className="danger-action">
                    <div>
                        <h3>{t('Désactiver mon compte')}</h3>
                        <p>{t('Masquer temporairement votre compte sur tout le réseau')}</p>
                    </div>
                    <button 
                        className="btn-danger-outline" 
                        onClick={() => {
                            setActionType('desactiver');
                            setModalOpen(true);
                        }}
                        >
                        {t('Désactiver')}
                    </button>
                </div>

                <div className="danger-action">
                    <div>
                        <h3>{t('Supprimer mon compte')}</h3>
                        <p>{t('Supprimer définitivement votre compte et vos données')}</p>
                    </div>
                    <button 
                        className="btn-danger" 
                        onClick={() => {
                            setActionType('supprimer');
                            setModalOpen(true);
                        }}
                        >
                        {t('Supprimer')}
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