import React, { useContext, useEffect } from 'react';
import { ArrowClockwise, ChevronDown } from 'react-bootstrap-icons';
import Comment from '../comment/Comment';
import CommentForm from '../commentForm/CommentForm';
import './commentList.scss';
import CircleLoader from '../CircleLoader/CircleLoader'
import millify from 'millify'
import axios from 'axios'
import { useInfiniteQuery } from '@tanstack/react-query'
import CommentContent from '../commentContent/CommentContent';
import CommentSkeleton from '../comment/CommentSkeleton';

const CommentList = ({ url, enabled = true, queryKey = ['comments'] }) => {

    const transformResult = (apiResult) => {
        return { data: apiResult['hydra:member'], totalItems: apiResult['hydra:totalItems'], nextPage: apiResult['hydra:view']['hydra:next'] ? parseInt(apiResult['hydra:view']['hydra:next'].match(/page=(\d+)/)[0].split('=')[1]) : undefined }
    }

    const fetchData = ({ pageParam = 1 }) => {
        return axios({
            url: `${url}?ipp=${10}&page=${pageParam}`,
            method: 'get',
            responseType: "json",
            headers: {
                'Accept': 'application/json+ld'
            },
            withCredentials: true
        }).then((res) => {
            console.log(res.data, 'useInfiniteScroll')
            return transformResult(res.data)
        })
    }

    const {
        data: comments,
        error: commentsErr,
        fetchNextPage: commentsFetchNextPage,
        hasNextPage: commentsHasNextPage,
        isFetching: commentsFetching,
        isFetchingNextPage: commentsFetchingNextPage,
        status: commentsLoadingStatus,
        refetch,
        refetchPage
    } = useInfiniteQuery({
        queryKey,
        queryFn: fetchData,
        getNextPageParam: (lastPage, pages) => lastPage?.nextPage,
        enabled,
        
        
    })

    return (
        <div className={`comment-list comment-list-light`}>
            <div className='comment-list-top flex align-items-center justify-content-between'>
                <h4>Commentaires</h4>
                <span className='order-comments flex align-items-center gap-5'>Les plus pertinents <ChevronDown /></span>
            </div>
            {
                commentsFetchingNextPage ?
                    <span className='more-comments-loading flex align-items-center gap-5'><CircleLoader width={19} height={19} colors={null} /> Chargment</span>
                    : commentsHasNextPage && <span className='more-comments flex align-items-center gap-5' onClick={commentsFetchNextPage}><ArrowClockwise /> Voir plus de commentaires</span>

            }

            <div className="comment-list-list">

                {/* {commentsFetchingNextPage
                    ? <h6>Comment Skeleton</h6>
                    : commentsHasNextPage
                        ? ''
                        : ''} */}
                {
                    (commentsFetching && !commentsFetchingNextPage) ?
                            [...new Array(10)].map((_,i)=><CommentSkeleton key={i}/>)
                    : commentsErr ? (
                        <p>Error: {commentsErr.message}</p>
                    ) : (comments?.pages[0]?.totalItems > 0 ?
                        comments?.pages?.map((group) => group).map((g) => g.data).flat().reverse().map((c, i) => <Comment queryKey={queryKey} key={i} data={c} />)
                        : <div className="empty-comments flex flex-column justify-content-center align-items-center gap-5">
                            <h4>Aucun Commentaire à afficher</h4>
                            <p className='text-center txt-4'>Nous vous invitons à ajouter votre commentaire pour intéragir avec l'auteur et toute la communauté. </p>
                        </div>)
                }


                {/* {
                    comments?.pages?.map((group) => group).map((g) => g.data).flat().reverse().map((c,i)=><Comment key={i} data={c}/>)
                } */}
            </div>
            {/* <div className='comment-list-bottom-form'>
                <CommentForm />
            </div> */}
        </div>

    )
}

export default CommentList