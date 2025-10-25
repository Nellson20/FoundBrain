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
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

const Appearance = ()=>{
    return(
        <main>
            <div className='appearance-header'>
                <h1>Apparence</h1>
                <p className="subtitle">Choisir comment votre profil doit etre affiché sur FoundBrain ou ailleurs</p>
            </div>
        </main>
    )
}

export default Appearance;