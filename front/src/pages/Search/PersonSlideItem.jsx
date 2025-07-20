import React from 'react'
import ''
import DiamondRating from '../../components/DiamondRating/DiamondRating'

const PersonSlideItem = () => {
  return (
    <div className='person-slide-item flex gap-10 mb-15'>
      <div className="left">
        <Avatar/>
      </div>
      <div className="right">
        <h1 className="name">Donnell Dev Rakotoarison</h1>
        <span className="job">Developpeur Web Freelance</span>
        <div className="rating">
            <DiamondRating className="xs" readOnly/>
        </div>
        <div className="btns">
            <button className="btn btn-purple">Contacter</button>
        </div>
      </div>
    </div>
  )
}

export default PersonSlideItem
