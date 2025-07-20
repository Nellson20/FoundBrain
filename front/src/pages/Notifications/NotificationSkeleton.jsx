import React from 'react'
import Avatar from '../../components/Avatar/Avatar'
import Skeleton from '../../components/Skeleton/Skeleton'
import './NotificationSkeleton.scss'

const NotificationSkeleton = () => {
  return (
    <div className='notification-skeleton flex gap-10'>
      <Skeleton height={55} width={55} radius='50%'/>
      <div className='flex-grow-1 flex flex-column justify-content-center gap-10'>
        <Skeleton height={10} width='60%'/>
        <Skeleton height={8} width='40%'/>
      </div>
    </div>
  )
}

export default NotificationSkeleton
