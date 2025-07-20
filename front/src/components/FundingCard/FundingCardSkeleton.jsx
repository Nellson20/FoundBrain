import React from 'react'
import Skeleton from '../Skeleton/Skeleton'
const FundingCardSkeleton = () => {
    return (
        <div className='funding-card-skeleton p-15'>
            <div className="top flex gap-10">
                <div className="left flex-grow-1">
                    <div className="flex flex-grow-1 align-items-center mb-5">
                        <div className="flex-grow-1"><Skeleton height={15} width="60%" /></div>
                        <Skeleton height={20} width={30} />
                    </div>
                    <div className="flex-grow-1 flex flex-column gap-5">
                        <Skeleton height={10} width="60%" />
                        <Skeleton height={10} width="80%" />
                        <Skeleton height={10} width="40%" />
                        <Skeleton height={10} width="90%" />
                    </div>

                </div>
                
                    <Skeleton height={124} width={180} />
             
            </div>
            <hr />
            <div className="center flex flex-column gap-15">
                <div className="flex gap-10">
                    <Skeleton width={70} height={10} />
                    <Skeleton width='20%' height={10} />
                </div>
                <div className="flex gap-10">
                    <Skeleton width={70} height={10} />
                    <Skeleton width='22%' height={10} />
                </div>
                <div className="flex gap-10">
                    <Skeleton width={70} height={10} />
                    <Skeleton width='18%' height={10} />
                </div>
            </div>
            <div className="bottom">

            </div>
        </div>
    )
}

export default FundingCardSkeleton
