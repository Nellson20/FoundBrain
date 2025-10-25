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
    return(
       <main className='visibility'>
            <div className='visibility-header'>
                <h1>Visibilité de mon compte</h1>
                <p className="subtitle">Choisir comment votre profil doit etre affiché sur FoundBrain ou ailleurs</p>
            </div>
            <section className="visibility-section">
                <h2 className="section-title">Profil privée</h2>
                <div className="switch-row">
                    <p>Rendez privée votre profil pour le rendre accessible seulement pour vos selection de contact</p>
                    <Form className="custom-switch" style={{ padding: '20px' }}>
                        <Form.Check 
                            type="switch"
                            id="custom-switch"
                        />
                    </Form>
                </div>
                <h2 className="section-title">Moteurs de rechereches</h2>
                <div className="switch-row">
                    <p>Paramaètrer vos moteurs de rechereche d'affiche votre profil sur Google.....</p>
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