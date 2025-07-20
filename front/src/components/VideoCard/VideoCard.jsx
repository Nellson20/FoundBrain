import React from 'react'
import './VideoCard.scss'
import { Link } from 'react-router-dom'
import Avatar from '../Avatar/Avatar'

const VideoCard = ({videoData}) => {
  return (
    <div className='video-card'>
      <div className="poster relative">
        <img src={videoData?.img} alt="" style={{width:'100%',heigh:'100%',borderRadius:5}}/>
        <div className="length">{videoData?.duration}</div>
      </div>
      <div className="capt">
        <h1 className='text-ellipsis'><Link to='/video/play'>{videoData.title}</Link></h1>
        <p><span>200k vues</span>|<span>30 diamonds</span></p>
        <Link to='/profil' className="artist-info flex align-items-center gap-10 ">
            <Avatar/>
            <div className="artist-name">{videoData?.user?.name}</div>
        </Link>
      </div>
    </div>
  )
}

export default VideoCard
