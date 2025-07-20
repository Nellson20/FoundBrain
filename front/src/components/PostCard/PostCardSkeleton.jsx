import React from 'react'
import Skeleton from '../Skeleton/Skeleton'
import "./PostCardSkeleton.scss"

const PostCardSkeleton = () => {
    return (
        <div className='post-card-skeleton anim-slide-top'>
            <div className="top flex flex-grow-1 justify-content-between">
                <div className='flex gap-10 flex-grow-1'>
                    <Skeleton height={40} width={40} radius="50%"/>
                    <div className="user-info flex flex-column flex-grow-1">
                        <Skeleton height={8} width="26%" radius={2} />
                        <Skeleton height={7} width="16%" radius={2} />
                    </div>
                </div>
                <div className='flex gap-10'>
                    <Skeleton height={30} width={30} radius={5} />
                    <Skeleton height={30} width={30} radius={5} />
                </div>
            </div>
            <div className="body">
                <Skeleton height={300} width="100%" radius={0} />
            </div>
            <div className="footer flex gap-15 p-10 align-items-center">
                <Skeleton height={10} width={50} radius={3} />
                <Skeleton height={10} width={50} radius={3} />
                <Skeleton height={10} width={50} radius={3} />
            </div>
        </div>
    )
}

export default PostCardSkeleton
