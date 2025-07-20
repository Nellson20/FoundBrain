import React from 'react'
import './CountryCardSkeleton.scss'
import Skeleton from '../../components/Skeleton/Skeleton'

const CountryCardSkeleton = () => {
    return (
        <div className='country-card-skeleton'>
            <div className="top d-flex">
                <div className="left relative flex">
                    <Skeleton width='100%' height='100%' />
                </div>

                <div className="right">
                    <div className='aspect-ratio-1 relative'>
                        <Skeleton width='100%' height='100%' />

                    </div>
                    <div className='aspect-ratio-1 relative'>
                        <Skeleton width='100%' height='100%' />

                    </div>
                </div>
            </div>
            <div className="capt">
                <div className="flex justify-content-between">
                    <div className="flex align-items-center gap-10 mb-10">
                        <Skeleton width={30} height={20} />
                        <Skeleton width={40} height={10} />
                    </div>
                </div>
                <div className="flex gap-5 mb-5">
                    <Skeleton width={50} height={10} />
                    <Skeleton width={50} height={10} />
                    <Skeleton width={50} height={10} />
                </div>
                <div className="mt-10">
                    <Skeleton width='100%' height={10} />
                </div>
                <div className="flex mt-10">
                    <Skeleton width='100%' height={35} />
                </div>
            </div>
        </div>
    )
}

export default CountryCardSkeleton
