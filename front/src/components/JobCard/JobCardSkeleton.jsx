import React from 'react'
import Skeleton from '../Skeleton/Skeleton'
import './JobCardSkeleton.scss'

const JobCardSkeleton = () => {
    return (
        <div className='job-card-skeleton'>
            <div className="top flex gap-10 p-10">
                <Skeleton height={45} width={45} />
                <div className='flex-grow-1 flex flex-column gap-10'>
                    <Skeleton height={10} width='20%' radius={3}/>
                    <Skeleton height={10} width='40%' radius={3}/>
                    <Skeleton height={10} width='30%' radius={3}/>
                </div>
            </div>
            <div className="center p-10 flex flex-column gap-10">
                <Skeleton height={10} width='90%' radius={3}/>
                <Skeleton height={10} width='100%' radius={3}/>
                <Skeleton height={10} width='30%' radius={3}/>
            </div>
            <div className="bottom flex gap-10 p-10">
                <Skeleton height={35} width={70} />
                <Skeleton height={35} width={35} />
            </div>
        </div>
    )
}

export default JobCardSkeleton
