import React, { useContext, useEffect, useState } from 'react'
import './comment.scss'

import { useQuery, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { getCommentReplies } from '../../api/comment';
import CommentContent from '../commentContent/CommentContent';
import Avatar from '../Avatar/Avatar';
import millify from 'millify';
import { ArrowUpShort, CaretDownFill, ChevronDown } from 'react-bootstrap-icons';
import { CircleMarker } from 'react-leaflet';
import CircleLoader from '../CircleLoader/CircleLoader';
import { usePaginated } from '../../Hooks/queryHooks';

const Comment = ({ data, queryKey = null }) => {

    const [repliesIpp, setRepliesIpp] = useState(10)
    const fetchData = ({ pageParam = 1 }) => getCommentReplies(data.id, repliesIpp, pageParam)
    const [showReplies, setShowReplies] = useState(true)
    const queryClient = useQueryClient()

    const {
        data: replies,
        error,
        fetchNextPage: repliesFetchNextPage,
        hasNextPage: repliesHasNextPage,
        isFetching: repliesFetching,
        isFetchingNextPage: repliesFetchingNextPage,
        status: repliesLoadingStatus,
        refetch,
        refetchPage: refetchCurrentReplies
    } = useInfiniteQuery({
        queryKey: ['commentReplies', data.id],
        queryFn: fetchData,
        getNextPageParam: (lastPage, pages) => lastPage?.nextPage,
        enabled: showReplies,
        gcTime: Infinity,
        staleTime: Infinity,
        refetchOnMount: false,
        refetchOnReconnect: false,
        initialData: { pages: [{ data: [], nextPage: null, totalItems: 0 }], pageParams: [null] }
    })

    const uniqueAuthor = (objectArray) => {
        return objectArray.filter((obj, index, self) =>
            index === self.findIndex((t) => (
                t.author.id === obj.author.id
            ))
        )
    }
    const { addItem: addReplyItem } = usePaginated({ queryKey: ['commentReplies', data.id] })

    return (
        <div className={`comment comment-light flex relative`}>
            <div style={{ width: "100%" }}>
                <div className="comment-parent">
                    <CommentContent queryKey={queryKey} onReplied={(data) => addReplyItem(data)} parentId={data.id} commentDate={data.createdAt} id={data.id} sender={data.author}>{data.content}</CommentContent>
                </div>
                <div className="rep-list">
                    {
                        (data.replies.length > 0 && replies?.pages[0]?.totalItems <= 0 && !repliesFetching && ((data.repliesCount - uniqueAuthor(data.replies).length) > 0)) ?
                            <div className="replies-preview flex align-items-center gap-5" onClick={refetch}>
                                <small>Afficher les réponses</small>
                                <div className="avatars flex align-items-center">
                                    {
                                        data.replies && uniqueAuthor(data.replies).reverse().map((r, i) => <Avatar key={i} src={r.author.activeProfilePicture?.fileUrl} online={false} height={22} width={22} />)
                                    }
                                    {
                                        (data.replies && (data.replies.length - uniqueAuthor(data.replies).length) > 0) &&
                                        <div className="replies-count">+{millify(data.repliesCount - uniqueAuthor(data.replies).length)}</div>
                                    }
                                </div>
                                <CaretDownFill />
                            </div>
                            : (repliesFetching) ? <span className='small flex align-items-center gap-5 mb-10 txt-3'>
                                <CircleLoader className='flex align-items-center gap-5' height={21} width={21} colors={null} />
                                <span>Chargment</span>
                            </span> :
                                (repliesHasNextPage && data.replies?.length > 0) ? <span className='flex align-items-center gap-5 mb-10 pointer txt-3 small' onClick={repliesFetchNextPage}>
                                    <span>Voir les réponses précédentes</span>
                                    <ArrowUpShort size={17} />
                                </span> : ''
                    }

                    {
                        showReplies &&
                        replies?.pages?.map((group) => group)
                            .map((g) => g.data).flat().reverse()
                            .map((r, i) => <CommentContent queryKey={['commentReplies', data.id]} id={r.id} key={i} onReplied={(data) => {
                                addReplyItem(data)
                            }} parentId={data.id} commentDate={r.createdAt} sender={r.author}>{r.content}</CommentContent>)
                    }

                </div>
            </div>
        </div>
    )
}

export default Comment

