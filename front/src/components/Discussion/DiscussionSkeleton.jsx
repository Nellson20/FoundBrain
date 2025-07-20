import React from 'react'
import Skeleton from '../Skeleton/Skeleton'
import "./DiscussionSkeleton.scss"
const DiscussionSkeleton = () => {
    return (
        <div className='discussion-skeleton p-10'>
            <div className="flex gap-10 align-items-center">
                <Skeleton className="avatar" width={45} height={45} radius="50%"/>
                <div className='flex flex-column gap-15 flex-grow-1'>
                    <div className="flex justify-content-between gap-15">
                        <Skeleton className="flex-grow-1" height={11} radius={3}/>
                        <div className="flex gap-15">
                            <Skeleton width={12} height={12} radius={2}/>
                            <Skeleton width={12} height={12} radius={2}/>
                        </div>
                    </div>
                    <Skeleton height={10} radius={2}/>
                </div>
            </div>
        </div>
    )
}

export default DiscussionSkeleton
