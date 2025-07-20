import React, { useEffect } from 'react'
import './GoodDealCard.scss'
import Avatar from '../Avatar/Avatar'
import { Link } from 'react-router-dom'
const GoodDealCard = ({ data }) => {
    return (
        <div className='good-deal-card relative'>
            <img src={`${(data.investPictures && data.investPictures[0]) ? data.investPictures[0].fileUrl : process.env.REACT_APP_IMG_FOLDER + "other/SM-placeholder-150x150.png"}`} alt="" className='ent-image absolute' />
            <div className='absolute' style={{ minWidth: 0, width: '100%' }}>
                <div className="flex align-items-center justify-content-between">
                    <Avatar src={
                        data.author.activeProfilePicture ? data.author.activeProfilePicture.fileUrl :
                            data.author.activeLogo ? data.author.activeLogo.fileUrl : null
                    } />
                    {
                        data.author.country && <img src={data.author.country.flag.fileUrl} alt="" width={30} />
                    }
                    
                </div>
                <div className="caption relative">
                    <div className='glass'></div>
                    <h3 className="author-name text-ellipsis relative">{
                        data.domains ? data.domains.map((d) => d.title).join(',') : ""
                    }</h3>
                    <h1>
                        <Link to={data.author.firstName ? `/profil/${data.author.id}` : `/portail/${data.author.id}`} className="entreprise-name text-ellipsis relative">{
                            data.author.firstName ? `${data.author.firstName} ${data.author.lastName}` :
                                data.author.name ? `${data.author.name}` : ""
                        }</Link>
                    </h1>
                    <span className='text-ellipsis'>{data.title}</span>
                </div>
            </div>
        </div>
    )
}

export default GoodDealCard
