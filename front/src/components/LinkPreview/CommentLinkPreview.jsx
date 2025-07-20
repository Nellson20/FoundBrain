import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import CommentLinkPreviewSkeleton from './CommentLinkPreviewSkeleton'


const CommentLinkPreview = ({ url }) => {
    const {data,error,isLoading}=useQuery({
        queryFn:()=>axios({
            url: `${process.env.REACT_APP_API_DOMAIN}/link-preview?url=${url}`,
            method: 'get',
            timeout:50000,
        }).then((res) => res.data),
        queryKey:['linkPreview',url]
    })
    return isLoading ?
        <CommentLinkPreviewSkeleton/>
    :
    ((data?.title ?? data?.description ?? data?.metas?.description ?? data?.metas['og:site_name']) && (data?.url ?? data?.metas['og:site_name']) && (data?.image ?? data?.favicon ?? data?.icon)) && <Link to={url} className="comment-link-preview">
    <div className="left">
        <img src={data?.image ?? data?.favicon ?? data?.icon} alt={data?.title} />
    </div>
    <div className="right">
        <small>{new URL(data?.url)['host']}</small>
        <h1 className='line-clamp-2'>{data?.title ?? data?.description ?? data?.metas?.description ?? data?.metas['og:site_name']}</h1>
    </div>
</Link>
}

export default CommentLinkPreview
