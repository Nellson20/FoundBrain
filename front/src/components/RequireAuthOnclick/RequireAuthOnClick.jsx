import React, { useState, cloneElement } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Modal from '../Modal/Modal'
import './RequireAuthOnClick.scss'
import { Facebook, Google, Linkedin, XLg } from 'react-bootstrap-icons'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next';


const RequireAuthOnClick = ({ children }) => {
    const { t } = useTranslation();
    const { user } = useSelector(state => state.user)

    const [isModalOpen, setModalOpen] = useState(false);

    const blockClick = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setModalOpen(true);
    };


    // const child = React.cloneElement(children, { onClick: (e)=>{
    //     handleClick(e)
    //     children.props.onClick && children.props.onClick()
    // } });

    return (
        <>

            {
                cloneElement(children, {
                    onClick: (e) => {
                        if (!user) return blockClick(e);
                        children.props.onClick && children.props.onClick(e);

                    }, onTouchStart: (e) => {
                        if (!user) return blockClick(e);
                        children.props.onTouchStart && children.props.onTouchStart(e);

                    }
                })
            }

            {isModalOpen &&
                <Modal open={isModalOpen} onClick={(e) => {
                    e.stopPropagation()
                }}>
                    <div className="disconnectedModal">
                        <div className="top p-15">
                            <h2>{t('Connectez vous !')}</h2>
                            <div className="close-modal" onClick={() => { setModalOpen(false) }}>
                                <XLg />
                            </div>
                        </div>
                        <div className="body p-15">
                            <p>
                                <strong>Note:</strong><span>{t('vous devez vous authentifier pour acceder à cette fonctionnalité.')}</span>
                            </p>
                            <Link to="/connexion" className="auth-with-gate-btn" onClick={() => { setModalOpen(false) }}>
                                <img src="/img/logo/GATEAFR.png" height={25} alt="" /> {t('Utiliser un compte GateAfri')}
                            </Link>
                            <div className="conn-method flex justify-content-center gap-10">
                                <Link className='fb' to={`${process.env.REACT_APP_API_DOMAIN}/connect/facebook`}><Facebook size={22} /></Link>
                                <span className='google'><Google size={18} /></span>
                                <span className='linkedin'><Linkedin size={20} /></span>
                            </div>
                        </div>
                        <div className="bottom p-15">
                            <p>{t("Si vous n'avez pas de compte")} <b><Link to="inscription" onClick={() => { setModalOpen(false) }}>{t("S'inscrire")}</Link></b></p>
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

export default RequireAuthOnClick
