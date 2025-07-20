import React from 'react'
import './WelcomeBanner.scss'
import { XLg, Plus } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
const WelcomeBanner = () => {
    const connectedUser=useSelector((state)=>state.user.user)
    return (
        <div className='welcome-banner relative'>
            <div className="text relative">
                <h6>Bonjour {connectedUser ? `${connectedUser.firstName} ${connectedUser.lastName ? connectedUser.lastName : ''}` : ''}</h6>
                <h4>Bienvenue sur GATE AFRI,le reseau des acteurs economiques en Afrique</h4>
                <p>Veuillez créer une page professionnelle pour promouvoir vos activités.</p>
                <div className="flex gap-10">
                    <Link to="/portail/nouveau"><Plus size={26} /> Créer un portail</Link>
                    {
                        connectedUser===null ? <Link to="/inscription" className="register-btn">S'inscrire</Link> : ""
                    }
                </div>
            </div>
            <div className="close absolute">
                <XLg size={20} />
            </div>
        </div>
    )
}

export default WelcomeBanner
