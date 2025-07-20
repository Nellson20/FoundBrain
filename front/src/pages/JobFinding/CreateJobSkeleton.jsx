import React from 'react'
import Skeleton from '../../components/Skeleton/Skeleton'

const CreateJobSkeleton = () => {
    return (
        <div className='create-job-skeleton px-15 py-10'>
            <div className="top flex align-items-center justify-content-between mb-15">
                <Skeleton width="40%" height={16} radius={4} />
                <Skeleton width={38} height={38} />
            </div>
            <div className="form-group flex flex-column gap-10 mb-15">
                <Skeleton width="20%" height={10} radius={4} />
                <Skeleton width="100%" height={40} />
            </div>
            <div className="form-group flex flex-column gap-10 mb-15">
                <Skeleton width="30%" height={10} radius={4} />
                <Skeleton width="100%" height={40} />
            </div>
            <div className="form-group flex flex-column gap-10">
                <Skeleton width="25%" height={10} radius={4} />
                <Skeleton width="100%" height={40} />
            </div>

        </div>
    )
}

export default CreateJobSkeleton
