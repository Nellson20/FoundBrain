import React, { useState, cloneElement,useRef } from 'react'
import { Link } from 'react-router-dom'
import Modal from '../../components/Modal/Modal'
// import './RequireAuthOnClick.scss'
import { Facebook, Google, Linkedin, XLg ,ExclamationTriangleFill} from 'react-bootstrap-icons'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { setConnectedUser } from '../../redux/actions/userActions';
import axios from 'axios'
import { ColorRing } from 'react-loader-spinner'



const ChangeMdp = ({ children }) => {
    const { t } = useTranslation();
    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch();
    const email = user?.email;
    const [isLoading, setIsLoading] = useState(false)
    const [isModalOpen, setModalOpen] = useState(false);
    const [loginErrorMsg, setLoginErrorMsg] = useState(null)

    const blockClick = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setModalOpen(true);
    };

    const [identifier, setMdpActuel] = useState('')
    const [password, setPassword] = useState('')
    const [ConfirmPassword, setConfirmPassword] = useState('')
    const sumbitBtn = useRef()

    const updatePassword = () => {
        if(password !== ConfirmPassword){
            alert('Les mots de passe ne correspondent pas')
            const error='Les mots de passe ne correspondent pas'
            setLoginErrorMsg(error)
            return
        }
        return axios({
            url: `${process.env.REACT_APP_API_DOMAIN}/users/${user.id}`,
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/merge-patch+json'
            },
            data: {
                password: password 
            },
            withCredentials: true
        })
        .then((response) => {
            alert(`✅ Mot de passe mis à jour pour: ${user.email}`,user.id)
            
            console.log('✅ Mot de passe mis à jour avec succès:', response.data)
            setModalOpen(false)
            setIsLoading(false)
        })
        .catch((error) => {
            console.error('❌ Erreur lors de la mise à jour du mot de passe:', error)
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

    const handleLogin = (e) => {
        e.preventDefault()
        setLoginErrorMsg(null)
        setIsLoading(true)
        
        // Étape 1: Valider le mot de passe actuel
        axios.post(`${process.env.REACT_APP_API_DOMAIN}/login_check`, { 
            identifier: email, 
            password: identifier 
        }, { withCredentials: true })
        .then(function (res) {
            console.log('User data from login:', res?.data.user);
            alert('✅ Mot de passe actuel correct!')
            
            // Étape 2: Mettre à jour le mot de passe
            return updatePassword()
            setModalOpen(false)
        })
        .catch(function (err) {
            setIsLoading(false)
            console.log(err.response)
            setLoginErrorMsg(err.response?.data.message)
            alert('❌ Mot de passe actuel incorrect!')
        })
    }

    return (
        <>

            {
                cloneElement(children, {
                    onClick: (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setModalOpen(true);
                    }
                })
            }

            {isModalOpen &&
                <Modal open={isModalOpen} onClick={(e) => {
                    e.stopPropagation()
                }}>
                    <div className="disconnectedModal">
                        <div className="top p-15">
                            <h2>{t('Changer votre mots de passe')}</h2>
                            <div className="close-modal" onClick={() => { setModalOpen(false) }}>
                                <XLg />
                            </div>
                        </div>
                        <div className="body p-15">
                            {
                                loginErrorMsg && <div className="login-error-message flex align-items-center justify-content-between">{loginErrorMsg} <ExclamationTriangleFill /></div>
                            }
                            <div className="form-group">
                                <label htmlFor="">{t('votre mot de passe actuel')}</label>
                                <input type="password" className="inpt" placeholder='ex:......' onChange={(e) => { setMdpActuel(e.target.value) }} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">{t('votre nouveau mot de passe')}</label>
                                <input type="password" className="inpt" placeholder={t('......')} onChange={(e) => { setPassword(e.target.value) }} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">{t('Confirmer votre mot de passe')}</label>
                                <input type="password" className="inpt" placeholder={t('......')} onChange={(e) => { setConfirmPassword(e.target.value) }} />
                            </div>
            
                        </div>

                        <div className='flex gap-10'>
                        <button ref={sumbitBtn} className='btn-purple flex flex-1' onClick={handleLogin}>
                            {
                                !isLoading ? "Se connecter" : <ColorRing
                                    visible={true}
                                    height="25"
                                    width="25"
                                    ariaLabel="blocks-loading"
                                    wrapperStyle={{}}
                                    wrapperClass="blocks-wrapper"
                                    colors={['#ffffff', '#ffffffcf', '#ffffffab', '#ffffff78', '#ffffff4d']}
                                />
                            } 
                        </button>
                    </div>

                    </div>
                </Modal>
            }
        </>
    );

    // return (

    //     // <>
    //     //     <children[0]/>
    //     //     {/* <Component {...props} onClick={handleClick} />
    //     //     {isModalOpen && <Modal open={isModalOpen}>
    //     //         <div className="disconnectedModal">
    //     //             <h1>Vous devez vous connecter</h1>
    //     //             <button className="btn btn-purple" onClick={closeModal}>Fermer</button>
    //     //         </div>
    //     //     </Modal>} */}
    //     // </>
    // );
}

export default ChangeMdp
