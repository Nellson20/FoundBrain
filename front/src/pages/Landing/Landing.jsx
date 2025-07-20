import React from 'react'
import "./Landing.scss"
import { Link, Tv } from 'react-bootstrap-icons'

const Landing = () => {
    return (
        <div id='landing-page'>
            <div className="top">

            </div>
            <div className="banner">
                <div className="center flex">
                    <div className='flex flex-column'>
                        
                        <h1>Tous vos business,
                            Une seule Plateforme</h1>

                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem ad, sint mollitia ducimus tempora magni iste adipisci distinctio officia quae, quibusdam hic placeat qui, deleniti rerum quod molestiae natus alias.</p>
                        <div className="btns flex gap-20">
                            <button className="btn btn-purple"><Tv /> Demarrer la version Web</button>
                            <button className="btn btn-orange">Créer un compte</button>
                        </div>
                    </div>
                    <div className="img">
                        <img src="/img/phone.png" alt="" style={{ width: 480 }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Landing
