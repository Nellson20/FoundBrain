import React from 'react'
import "./GoodDealCardSkeleton.scss"
import Skeleton from '../Skeleton/Skeleton'

const GoodDealCardSkeleton = () => {
  return (
    <div className='good-deal-card-skeleton'>
      <div className="capt">
        <Skeleton width="60%" height={8} radius={3}/>
        <Skeleton width="50%" height={10} radius={3}/>
        <Skeleton width="70%" height={8} radius={3}/>
      </div>
    </div>
  )
}

export default GoodDealCardSkeleton
