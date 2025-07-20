import React from 'react'
import './CommentLinkPreviewSkeleton.scss'
import Skeleton from '../Skeleton/Skeleton'

const CommentLinkPreviewSkeleton = () => {
    return (
        <div className='comment-link-preview-skeleton flex'>
            <Skeleton height={80} width={80} radius={0}/>
            <div className='flex flex-column gap-10 p-10'>
                <Skeleton height={8} width={100} radius={2}/>
                <Skeleton height={10} width={200} radius={2}/>
                <Skeleton height={10} width={160} radius={2}/>
            </div>
        </div>
    )
}

export default CommentLinkPreviewSkeleton
