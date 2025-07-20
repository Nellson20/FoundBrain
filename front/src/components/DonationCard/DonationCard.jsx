import React from 'react'
import "./DonationCard.scss"
import Avatar from '../Avatar/Avatar'

const DonationCard = () => {
    return (
        <div className='donation-card'>
            <div className="imgs">
                <div>
                    <img src="/img/dons/1.jpg" alt="" />
                </div>
                <div>
                    <img src="/img/dons/2.jpg" alt="" />
                </div>
                <div>
                    <img src="/img/dons/3.jpg" alt="" />
                </div>
            </div>
            <div className="capt">
                <div className="author flex justify-content-between">
                    <div className="left flex align-items-center gap-10">
                        <Avatar height={30} width={30}/>
                        <div className="info">
                            <h5>Solana Organisations</h5>
                        </div>
                    </div>
                </div>
                <h1>Ensemble pour un Avenir Lumineux</h1>
                <p>Rejoignez notre noble mission d'éduquer les enfants défavorisés. Chaque don compte, chaque sourire est précieux...</p>
            </div>
        </div>
    )
}

export default DonationCard
