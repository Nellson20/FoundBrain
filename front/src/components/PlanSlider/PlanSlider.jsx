import React from 'react'
import "./PlanSlider.scss"
import {ChevronRight, ChevronLeft, Check2 } from 'react-bootstrap-icons';
import Slider from 'react-slick';

const PlanSlider = () => {
    return (
        <div className="plan-slider">
            <h4>Inscrivez vous</h4>
            <p>Choisissez des maintenant un plan d'abonnement convenant aux besoins de votre entreprise</p>

            <div className='relative'>
                <div className="floating-btn prev"><ChevronLeft size={21} /></div>
                <div className="floating-btn next"><ChevronRight size={21} /></div>
                <Slider {...{
                    dots: false,
                    arrows: false,
                    speed: 500,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    variableWidth: true,
                    infinite: true,
                }}>
                    <div className="plan-card">
                        <div className="top">
                            <h4>GRATUIT</h4>
                            <img src="/img/other/free.svg" alt="" />
                            <h3 className="plan-price">
                                $0
                                <small>/mois</small>
                            </h3>
                        </div>
                        <ul>
                            <li><Check2 /> Accès limité 1 mois</li>
                            <li><Check2 /> 1 page professionnelle</li>
                            <li><Check2 /> 1 entreprise</li>
                            <li><Check2 /> 1 offre d'emplois</li>
                            <li><Check2 /> 1 modele de CV</li>
                            <li><Check2 /> 5 images par publication</li>
                        </ul>
                    </div>
                    <div className="plan-card">
                        <div className="top">
                            <h4>ARGENT</h4>
                            <img src="/img/other/trophy.svg" alt="" />
                            <h3 className="plan-price">
                                $9
                                <small>/mois</small>
                            </h3>
                        </div>
                        <ul>
                            <li><Check2 /> Accès limité 1 mois</li>
                            <li><Check2 /> 1 page professionnelle</li>
                            <li><Check2 /> 1 entreprise</li>
                            <li><Check2 /> 1 offre d'emplois</li>
                            <li><Check2 /> 1 modele de CV</li>
                            <li><Check2 /> 5 images par publication</li>
                        </ul>
                    </div>
                    <div className="plan-card">
                        <div className="top">
                            <h4>OR</h4>
                            <img src="/img/other/winner.svg" alt="" />
                            <h3 className="plan-price">
                                $19
                                <small>/mois</small>
                            </h3>
                        </div>
                        <ul>
                            <li><Check2 /> Accès limité 1 mois</li>
                            <li><Check2 /> 1 page professionnelle</li>
                            <li><Check2 /> 1 entreprise</li>
                            <li><Check2 /> 1 offre d'emplois</li>
                            <li><Check2 /> 1 modele de CV</li>
                            <li><Check2 /> 5 images par publication</li>
                        </ul>
                    </div>
                    <div className="plan-card">
                        <div className="top">
                            <h4>BRONZE</h4>
                            <img src="/img/other/free.svg" alt="" />
                            <h3 className="plan-price">
                                $49
                                <small>/mois</small>
                            </h3>
                        </div>
                        <ul>
                            <li><Check2 /> Accès limité 1 mois</li>
                            <li><Check2 /> 1 page professionnelle</li>
                            <li><Check2 /> 1 entreprise</li>
                            <li><Check2 /> 1 offre d'emplois</li>
                            <li><Check2 /> 1 modele de CV</li>
                            <li><Check2 /> 5 images par publication</li>
                        </ul>
                    </div>
                </Slider>
            </div>

        </div>
    )
}

export default PlanSlider
