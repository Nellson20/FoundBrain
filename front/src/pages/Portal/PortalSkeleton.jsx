import React from 'react'
import './PortalSkeleton.scss'
import Skeleton from '../../components/Skeleton/Skeleton'

const PortalSkeleton = () => {
    return (
        <div className='portal-skeleton'>
            <div className="flex flex-column align-items-center">
                <div className="top relative">
                    <div className="flex align-items-end gap-10">
                        <Skeleton width={60} height={60} radius={5} />
                        <Skeleton width={30} height={24} radius={5} />
                    </div>
                </div>
                <div className="text px-20">
                    <div className="mb-10">
                        <Skeleton width='20%' height={20} radius={5} />
                    </div>
                    <div className="flex gap-10">
                        <Skeleton width='10%' height={14} radius={5} />
                        <Skeleton width='16%' height={14} radius={5} />
                    </div>
                </div>
            </div>
            <div className="nav flex justify-content-center mb-15">
                <div className="flex gap-20 px-20">
                    <div className="flex align-items-center justify-content-center flex-column gap-5">
                        <Skeleton width={23} height={23} radius={5} />
                        <Skeleton width={65} height={10} radius={5} />
                    </div>
                    <div className="flex align-items-center justify-content-center flex-column gap-5">
                        <Skeleton width={23} height={23} radius={5} />
                        <Skeleton width={65} height={10} radius={5} />
                    </div>
                    <div className="flex align-items-center justify-content-center flex-column gap-5">
                        <Skeleton width={23} height={23} radius={5} />
                        <Skeleton width={65} height={10} radius={5} />
                    </div>
                    <div className="flex align-items-center justify-content-center flex-column gap-5">
                        <Skeleton width={23} height={23} radius={5} />
                        <Skeleton width={65} height={10} radius={5} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PortalSkeleton
