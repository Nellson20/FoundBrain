import React, { useState, useRef } from 'react';
import Modal from '../../components/Modal/Modal';
import { XLg, ExclamationTriangleFill } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import axios from '../../axios';
import { ColorRing } from 'react-loader-spinner';
import { useDispatch } from 'react-redux';
import { setConnectedUser } from '../../redux/actions/userActions';

const CheckMdp = ({ actionType, onClose }) => {
    const { t } = useTranslation();
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const submitBtn = useRef();

    const actionText = actionType === 'desactiver' ? 'Désactiver mon compte' : 'Supprimer mon compte';
    const apiEndpoint = actionType === 'desactiver' 
        ? '/user/desactivate' 
        : '/user/delete';

    const desactivateUserSettings = () => {
             return axios.patch('/api/me/account-desactivation', {
                active: false
            })
            .then((res) => {
                console.log('🔄 desactivation user_settings avec succes');
                console.log('🔍 Toutes les clés:', Object.keys(res.data));
                dispatch(setConnectedUser(res.data));
               
            })
            .catch((error) => {
                console.error('❌ Erreur lors de la mise à jour du desactivation user_settings', error)
                setIsLoading(false)
                if (error.response) {
                    console.error('Statut HTTP:', error.response.status)
                    console.error('Détails du serveur:', error.response.data)
                    alert(`Erreur: ${error.response.data.message || 'Impossible de mettre à jour le mot de passe'}`)
                } else if (error.request) {
                    console.error('Aucune réponse reçue:', error.request)
                    alert('Erreur: Aucune réponse du serveur')
                } else {
                    console.error('Erreur Axios:', error.message)
                    alert(`Erreur: ${error.message}`)
                }
            })
    }
    const handleAction = async (e) => {
        e.preventDefault();
        setErrorMsg(null);
        setIsLoading(true);

        try {
            // Vérification du mot de passe actuel
            await axios.post(`${process.env.REACT_APP_API_DOMAIN}/login_check`, {
                identifier: user?.email,
                password: password
            }, { withCredentials: true });

            
            await axios.post(`${process.env.REACT_APP_API_DOMAIN}${apiEndpoint}`, {
                userId: user?.id
            }, { withCredentials: true });
            console.log('desactivation avec succes et avant la usersettings');
            if(actionType === 'desactiver'){
                await desactivateUserSettings()
                console.log('usersettings apres la fonction desactivation');
            }

            alert(actionType === 'desactiver' ? '✅ Votre compte a été désactivé.' : '✅ Votre compte a été supprimé.');
            setIsLoading(false);
            onClose();
        } catch (err) {
            setIsLoading(false);
            if (err.response) {
                setErrorMsg(err.response.data.message || 'Erreur serveur');
            } else {
                setErrorMsg(err.message || 'Erreur inconnue');
            }
        }
    };

    return (
        <Modal open={true} onClick={(e) => e.stopPropagation()}>
            <div className="disconnectedModal">
                <div className="top p-15">
                    <h2>{t(actionText)}</h2>
                    <div className="close-modal" onClick={onClose}><XLg /></div>
                </div>

                <div className="body p-15">
                    {errorMsg && (
                        <div className="login-error-message flex align-items-center justify-content-between">
                            {errorMsg} <ExclamationTriangleFill />
                        </div>
                    )}
                    <div className="form-group">
                        <label>{t('Veuillez entrer votre mot de passe actuel')}</label>
                        <input
                            type="password"
                            className="inpt"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex gap-10">
                    <button
                        ref={submitBtn}
                        className="btn-purple flex flex-1"
                        onClick={handleAction}
                    >
                        {!isLoading ? t('Valider') : (
                            <ColorRing
                                visible={true}
                                height="25"
                                width="25"
                                ariaLabel="loading"
                                wrapperStyle={{}}
                                wrapperClass="blocks-wrapper"
                                colors={['#ffffff', '#ffffffcf', '#ffffffab', '#ffffff78', '#ffffff4d']}
                            />
                        )}
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default CheckMdp;
