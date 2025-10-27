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
import axios from 'axios';
import { setConnectedUser } from '../../redux/actions/userActions';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';


const Visibility = ()=>{
    const { t } = useTranslation();
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
                        />
                    </Form>
                </div>
            </section>
       </main>
    )
}

export default Visibility;