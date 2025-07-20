import React, { useEffect } from 'react'
import CircleLoader from '../CircleLoader/CircleLoader'
import millify from 'millify'
import CommentList from '../commentList/CommentList'
import Tab from './Tab'
import axios from 'axios'
import { useInfiniteQuery } from '@tanstack/react-query'

const CommentsListTab = ({ url, enabled = true, scrollParent, queryKey = ['comments'],onLoaded=()=>{} }) => {

    const transformResult = (result) => {
        return { data: result['hydra:member'], totalItems: result['hydra:totalItems'], nextPage: result['hydra:view']['hydra:next'] ? parseInt(result['hydra:view']['hydra:next'].match(/page=(\d+)/)[0].split('=')[1]) : undefined }
    }

    const fetchData = ({ pageParam = 1 }) => {
        return axios({
            url,
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
        error,
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
        getNextPageParam: (lastPage, pages) => lastPage.nextPage,
        enabled,
    })



    return (
        <Tab title={<span>Commentaires {(commentsFetching && !commentsFetchNextPage) ? <CircleLoader colors={['#222', '#333', '#444']} /> : `(${millify(comments?.pages[0]?.totalItems.length)})`}</span>}>
            <>
                {
                    commentsLoadingStatus === 'loading' ? (
                        <>
                            <h6>Comment Skeleton</h6>
                            <h6>Comment Skeleton</h6>
                            <h6>Comment Skeleton</h6>
                        </>
                    ) : commentsLoadingStatus === 'error' ? (
                        <p>Error: {error.message}</p>
                    ) : (comments?.pages[0]?.data?.length > 0 ?
                        <CommentList comments={comments?.pages?.map((group) => group).map((g) => g.data).flat()} />
                        : <div className="empty-comments flex flex-column justify-content-center align-items-center gap-5">
                            <h4>Aucun Commentaire à afficher</h4>
                            <p>Nous vous invitons à ajouter votre commentaire pour intéragir avec l'auteur et toute la communauté. </p>
                        </div>)
                }
                {commentsFetchingNextPage
                    ? <h6>Comment Skeleton</h6>
                    : commentsHasNextPage
                        ? ''
                        : ''}
            </>
        </Tab>
    )
}

export default CommentsListTab
