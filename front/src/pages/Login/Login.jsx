import React, { useEffect, useState, useLayoutEffect, useRef, useContext } from 'react'
import './Login.scss'
import { ExclamationTriangleFill, Facebook, Google, Linkedin, Twitter } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setConnectedUser, setSocket } from '../../redux/actions/userActions'
import { useSelector } from 'react-redux'
import { ColorRing } from 'react-loader-spinner'
import { io } from 'socket.io-client';
import SocketIOContext from '../../context/SocketIOContext'
import { showToast } from '../../utils/toastUtils'

const Login = () => {

    const connectedUser = useSelector((store) => store.user.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [identifier, setIdentifier] = useState('')
    const [password, setPassword] = useState('')
    const [loginSuccessMsg, setSuccessMsg] = useState(null)
    const [loginErrorMsg, setLoginErrorMsg] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const sumbitBtn = useRef()

    const handleLogin = (e) => {
        e.preventDefault()
        setLoginErrorMsg(null)
        setIsLoading(true)
        const topVideos = axios.post(`${process.env.REACT_APP_API_DOMAIN}/login_check`, { identifier, password }, { withCredentials: true }).then(function (res) {
            dispatch(setConnectedUser(res?.data.user))
            dispatch(setSocket(io(process.env.REACT_APP_REAL_DOMAIN)))
            showToast({content:<span>Vous êtes maintenant connecté</span>})
            navigate('/', { replace: true })
            setIsLoading(false)
        }).catch(function (err) {
            setIsLoading(false)
            console.log(err.response)
            setLoginErrorMsg(err.response?.data.message)
        })

    }
    const handleSubmit = (e) => {
        e.preventDefault()
        sumbitBtn?.current.click()
    }

    const connectGoogle=()=>{
        window.open(`${process.env.REACT_APP_API_DOMAIN}/connect/google`)  
    }
    const connectFb=()=>{
        window.open(`${process.env.REACT_APP_API_DOMAIN}/connect/facebook`)  
    }
    const connectLinkedin=()=>{
        window.open(`${process.env.REACT_APP_API_DOMAIN}/connect/linkedin`)  
    }









    return (
        <main className='login-page'>
            <div className="top">

            </div>
            <form action="" className="login-form elevated-card" onSubmit={handleSubmit}>
                <h3 style={{ marginBottom: 20 }} className='txt-1'>Connexion</h3>
                {
                    loginErrorMsg && <div className="login-error-message flex align-items-center justify-content-between">{loginErrorMsg} <ExclamationTriangleFill /></div>
                }

                <div className="form-group">
                    <label htmlFor="">Adress Email ou télephone</label>
                    <input type="text" className="inpt" placeholder='ex:contact@example.com' onChange={(e) => { setIdentifier(e.target.value) }} />
                </div>
                <div className="form-group">
                    <label htmlFor="">Mot de passe</label>
                    <input type="password" className="inpt" placeholder='Votre mot de passe' onChange={(e) => { setPassword(e.target.value) }} />
                    <div className="flex justify-content-between align-items-center">
                        <div className='flex gap-10 py-5'>
                            <input type="checkbox" name="" id="" /><label htmlFor="" style={{ fontWeight: "normal", margin: 0 }} >Afficher le mot de passe</label>
                        </div>
                        <Link>Mot de passe oublié ?</Link>
                    </div>
                </div>
                <div className='flex gap-10'>
                    <Link to='/inscription' type='button' className="btn-transparent flex-1">S'inscrire</Link>
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
                <div className="barred-text"><span>Ou</span><div></div></div>
                <p className='text-center mb-5'>Se connecter avec</p>
                <div className="conn-method flex justify-content-center gap-10">
                    <span className='fb' onClick={connectFb}><Facebook size={22} /></span>
                    <span className='google' onClick={connectGoogle}><Google size={18} /></span>
                    <span className='linkedin' onClick={connectLinkedin}><Linkedin size={20} /></span>
                </div>
            </form>
        </main>
    )
}

export default Login
