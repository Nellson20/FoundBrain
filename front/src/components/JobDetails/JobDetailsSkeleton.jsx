import React from 'react'
import Skeleton from '../Skeleton/Skeleton'

const JobDetailsSkeleton = () => {
    return (
        <div className='job-details-skeleton p-15'>
            <div className='mb-10'>
                <Skeleton height={100} width='100%'/>
            </div>
            <div className='mb-10'>
                <Skeleton height={50} width={50} />
            </div>
            <div className="flex align-items-center mb-15">
                <div className='flex-grow-1 flex flex-column gap-5'>
                    <Skeleton height={15} width='20%' />
                    <Skeleton height={10} width='60%' />
                </div>
                <Skeleton height={37} width={122} />
            </div>
            <div className='flex justify-content-between mb-15'>
                <div className='flex-1 flex flex-column gap-10'>
                    <Skeleton height={15} width='30%' />
                    <Skeleton height={10} width='60%' />
                </div>
                <div className='flex-1 flex flex-column gap-10'>
                    <Skeleton height={15} width='30%' />
                    <Skeleton height={10} width='60%' />
                </div>
                <div className='flex-1 flex flex-column gap-10'>
                    <Skeleton height={15} width='30%' />
                    <Skeleton height={10} width='60%' />
                </div>
                <div className='flex-1 flex flex-column mb-10 gap-10'>
                    <Skeleton height={15} width='30%' />
                    <Skeleton height={10} width='60%' />
                </div>
            </div>
            <div className='flex flex-column gap-15 mt-10'>
                <Skeleton height={10} width='20%' />
                <Skeleton height={10} width='60%' />
                <Skeleton height={10} width='20%' />
                <Skeleton height={10} width='60%' />
            </div>
        </div>
    )
}

export default JobDetailsSkeleton
