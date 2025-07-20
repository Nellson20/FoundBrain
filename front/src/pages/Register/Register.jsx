import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Register.scss'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'react-bootstrap-icons'
import Input from '../../components/Input/Input'
import moment from 'moment';
import RegisterSuccessModal from '../../components/RegisterSuccessModal/RegisterSuccessModal'
import { ColorRing } from 'react-loader-spinner'
import { showToast } from '../../utils/toastUtils'

const Register = () => {
    const navigate = useNavigate()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [gender, setGender] = useState(null)

    const [firstNameError, setFirstNameError] = useState(null)
    const [lastNameError, setLastNameError] = useState(null)
    const [emailError, setEmailError] = useState(null)
    const [birthDateError, setBirthDateError] = useState(null)
    const [passwordError, setPasswordError] = useState(null)
    const [passwordConfirmError, setPasswordConfirmError] = useState(null)

    const [genders, setGenders] = useState([])

    const [isOpen, setIsOpen] = useState(false)

    const setGenderUri = (genderId) => {
        setGender(`/genders/${genderId}`)
    }

    const [isLoading, setIsLoading] = useState(false)
    const handleRegister = (e) => {
        e.preventDefault()
        setFirstNameError(null)
        setLastNameError(null)
        setEmailError(null)
        setBirthDateError(null)
        setPasswordError(null)
        setPasswordConfirmError(null)
        setIsLoading(true)

        axios({
            url: `${process.env.REACT_APP_API_DOMAIN}/users`,
            method: 'post',
            data: {
                firstName,
                lastName,
                email,
                birthDate,
                password,
                passwordConfirm,
                gender
            },
            timeout:300000
        }).then((res) => {
            setIsOpen(true)
            setFirstName('')
            setLastName('')
            setEmail('')
            setPassword('')
            setPasswordConfirm('')
            setIsLoading(false)
            showToast({content:<span>Inscription réussie</span>})
        }).catch((err) => {
            console.log(err)
            setIsLoading(false)
            const { violations } = err.response?.data
            if (violations) {
                const errors = {}
                violations.forEach((v) => {
                    errors[v.propertyPath] = v.message
                })
                console.log(errors)
                errors.firstName && setFirstNameError(errors.firstName)
                errors.lastName && setLastNameError(errors.lastName)
                errors.email && setEmailError(errors.email)
                errors.password && setPasswordError(errors.password)
                errors.passwordConfirm && setPasswordConfirmError(errors.passwordConfirm)
                errors.birthDate && setBirthDateError(errors.birthDate)
            }
        })
    }

    const formatBirthDate = (e) => {
        setBirthDate(moment(e.target.value, 'DD-MM-YYYY').format('YYYY-MM-DD'));
    }

    useEffect(() => {
        axios({
            url: `${process.env.REACT_APP_API_DOMAIN}/genders`,
            method: 'get',
        }).then((res) => {
            setGenders(res?.data);

        }).catch((err) => {
            console.log(err.response?.data)
        })
    }, [])






    return (
        <>
            <div className='register-page'>
                <div className="register-form p-10">
                    <h3>Inscription</h3>
                    <p className='mb-15'>Inscrivez vous gratuitement et facilement et commencez à promouvoir les activités de votre entreprise</p>
                    <form action="">
                        <div className="flex gap-10">
                            <div className="form-group">
                                <label htmlFor="">Nom</label>
                                <Input
                                    type="text"
                                    placeholder="Votre nom"
                                    value={firstName}
                                    error={firstNameError}
                                    onChange={(e) => { setFirstName(e.target.value) }}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Prénom</label>
                                <Input
                                    type="text"
                                    placeholder="Votre prenom"
                                    value={lastName}
                                    error={lastNameError}
                                    onChange={(e) => { setLastName(e.target.value) }}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Email</label>
                            <Input
                                type="text"
                                placeholder="Votre adresse email"
                                value={email}
                                error={emailError}
                                onChange={(e) => { setEmail(e.target.value) }}
                            />
                        </div>
                        <div className="flex gap-10">
                            <div className="form-group">
                                <label htmlFor="">genre</label>
                                <select onChange={(e) => {
                                    setGenderUri(e.target.value)
                                }}>
                                    {
                                        genders.length > 0 ?
                                            genders.map((g, i) => <option key={i} value={g.id}>{g.title}</option>) : ""
                                    }
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">date de naissance</label>
                                <Input
                                    type="date"
                                    placeholder="Votre date de naissance"
                                    value={birthDate}
                                    error={birthDateError}
                                    onChange={formatBirthDate}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Mot de passe</label>
                            <Input
                                type="password"
                                placeholder="Votre mot de passe"
                                value={password}
                                error={passwordError}
                                onChange={(e) => { setPassword(e.target.value) }}
                            />
                        </div>
                        <div className="flex gap-10 register-form-btns">
                            <button className="btn btn-transparent">Vider</button>
                            <button className="btn btn-purple" onClick={handleRegister}>
                                {
                                    !isLoading ? <>S'inscrire <ChevronRight /></> : <ColorRing
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
                    </form>
                    <span className='register-to-login-link'>Vous avez déjà un compte ? <Link to='/connexion' className="purple-txt">Connectez-vous</Link></span>
                </div>
            </div>
            <RegisterSuccessModal setIsOpen={setIsOpen} open={isOpen} onClose={() => { navigate('/', { replace: true }) }} />
        </>
    )
}

export default Register
