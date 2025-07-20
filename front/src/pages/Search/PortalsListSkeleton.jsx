import React from 'react'
import Skeleton from '../../components/Skeleton/Skeleton'

const PortalsListSkeleton = () => {
    return (
        <div className='portals-list-skeleton flex flex-column gap-20 mb-15'>
            <div className="">
                <Skeleton height={15} width='20%' />
            </div>
            <div className='flex gap-10'>
                <Skeleton height={50} width={50} />
                <div className='flex flex-grow-1 flex-column gap-5'>
                    <Skeleton height={15} width='20%' />
                    <Skeleton height={10} width='40%' />
                    <Skeleton height={10} width='100%' />
                </div>
                <Skeleton height={38} width={85} />
            </div>
            <div className='flex gap-10'>
                <Skeleton height={50} width={50} />
                <div className='flex flex-grow-1 flex-column gap-5'>
                    <Skeleton height={15} width='30%' />
                    <Skeleton height={10} width='100%' />
                    <Skeleton height={10} width='50%' />
                </div>
                <Skeleton height={38} width={85} />
            </div>
            <div className='flex gap-10'>
                <Skeleton height={50} width={50} />
                <div className='flex flex-grow-1 flex-column gap-5'>
                    <Skeleton height={15} width='60%' />
                    <Skeleton height={10} width='100%' />
                    <Skeleton height={10} width='10%' />
                </div>
                <Skeleton height={38} width={85} />
            </div>
        </div>
    )
}

export default PortalsListSkeleton
