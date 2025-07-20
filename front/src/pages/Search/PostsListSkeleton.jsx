import React from 'react'
import './PostsListSkeleton.scss'
import Skeleton from '../../components/Skeleton/Skeleton'
import PostCardSkeleton from '../../components/PostCard/PostCardSkeleton'

const PostsListSkeleton = () => {
    return (
        <div className='posts-list-skeleton flex flex-column gap-5 mb-15'>
            <div className="top flex align-items-center p-15">
                <Skeleton height={15} width='20%' />
            </div>
            <div className="center">
                <PostCardSkeleton/>
            </div>
            <div className="bottom flex align-items-center justify-content-center p-15">
                <Skeleton height={15} width='40%' />
            </div>
        </div>
    )
}

export default PostsListSkeleton
