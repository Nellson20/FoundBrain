import React from 'react'
import { getRandomNumber } from '../../functions'
import Skeleton from '../Skeleton/Skeleton'
import './CommentSkeleton.scss'

const CommentSkeleton = () => {
    return (
        <div className='comment-skeleton flex gap-10 mb-10'>
            <Skeleton width={35} height={35} radius='50%' />
            <div className='left flex flex-column gap-15 relative'>
                <div className="triangle"></div>
                <Skeleton height={10} width={getRandomNumber(60, 200)} radius={2} />
                <Skeleton height={10} width={getRandomNumber(60, 200)} radius={2} />
            </div>
        </div>
    )
}

export default CommentSkeleton
