import React from 'react'
import './InvestListSkeleton.scss'
import Skeleton from '../../components/Skeleton/Skeleton'
import FundingCardSkeleton from '../../components/FundingCard/FundingCardSkeleton'

const InvestListSkeleton = () => {
    return (
        <div className='invest-list-skeleton flex flex-column gap-5 mb-15'>
            <div className="top flex align-items-center p-15">
                <Skeleton height={15} width='20%' />
            </div>
            <div className="center">
                <FundingCardSkeleton/>
            </div>
            <div className="bottom flex align-items-center justify-content-center p-15">
                <Skeleton height={15} width='40%' />
            </div>
        </div>
    )
}

export default InvestListSkeleton
