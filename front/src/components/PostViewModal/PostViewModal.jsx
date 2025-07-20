import React, { useContext, useEffect, useRef } from 'react'
import './PostViewModal.scss'
import { X, XLg } from 'react-bootstrap-icons'
import PostCard from '../PostCard/PostCard'
import { useQuery } from '@tanstack/react-query'
import Modal from '../Modal/Modal'
import { getPost } from '../../api/post'
import { useState } from 'react'
import RequireAuthOnClick from '../RequireAuthOnclick/RequireAuthOnClick'
import CommentForm from '../commentForm/CommentForm'
import { Gem, ChatLeft, Share } from 'react-bootstrap-icons'
import PostCardSkeleton from '../PostCard/PostCardSkeleton'
import { getComments } from '../../api/comment'
import { useSelector } from 'react-redux'
import { useQueryClient } from '@tanstack/react-query'
import { usePaginated } from '../../Hooks/queryHooks'


const PostViewModal = ({ post, open = false, setOpen = () => { } }) => {
    const { user } = useSelector(store => store.user)
    const [scrollParent, setScrollParent] = useState()
    const queryClient = useQueryClient()

    const flatInfiniteQuery = (infiniteQueryData) => {
        return infiniteQueryData?.pages?.map((group) => group).map((g) => g.data).flat()
    }
    const chunckArray = (arr, chunkSize) => {
        return arr.reduce((acc, _, index) => {
            if (index % chunkSize === 0) {
                acc.push(arr.slice(index, index + chunkSize));
            }
            return acc;
        }, []);
    }

    const { addItem } = usePaginated({ queryKey: ['postComments', post.id] })

    return (
        <Modal open={open} closeOnClickOutside={true} animation={null} className='post-view-modal'>
            <div>
                <div className="top">
                    <h2>Posté par {(post.author.firstName || post.author.name)}</h2>
                    <div className="close pointer" onClick={() => { setOpen(false) }}>
                        <XLg size={18} />
                    </div>
                </div>
                <div className="body" ref={setScrollParent}>
                    {
                        post && <PostCard scrollingElement={scrollParent} showInteractions={true} data={post} />
                    }
                </div>
                {
                    <div className="footer">
                        {
                            user &&
                            <div className="top">
                                <CommentForm commentable={`/posts/${post.id}`} onSended={(newComment) => {
                                    addItem(newComment)
                                    // queryClient.setQueryData(['postComments', post.id], (old) => {
                                    //     const oldArray = flatInfiniteQuery(old)
                                    //     return {
                                    //         ...old,
                                    //         pages: chunckArray([newComment, ...oldArray], 5).map((data, i) => ({
                                    //             data,
                                    //             nextPage: i + 2,
                                    //             totalItems: old.pages[0].data.totalItems + 1
                                    //         }))
                                    //     }
                                    // });
                                }} />
                            </div>
                        }
                        <div className="bottom flex gap-10">
                            <RequireAuthOnClick>
                                <span className='flex align-items-center gap-10 no-wrap-text'>
                                    <div className="ico">
                                        <Gem size={21} />
                                        {post.evaluationCount > 0 ? <div className="badge">{(post.evaluationSum / post.evaluationCount).toFixed(1)}</div> : ''}
                                    </div>
                                    <span>Evaluer</span>
                                </span>
                            </RequireAuthOnClick>
                            <RequireAuthOnClick>
                                <span className='flex align-items-center gap-10 no-wrap-text'>
                                    <div className="ico">
                                        <ChatLeft size={21} />
                                        {post.commentsCount > 0 ? <div className="badge">{post.commentsCount}</div> : ''}
                                    </div>
                                    <span>Commenter</span>
                                </span>
                            </RequireAuthOnClick>
                            <RequireAuthOnClick>
                                <span className='flex align-items-center gap-10 no-wrap-text'>
                                    <Share size={21} /><span>Partager</span>
                                </span>
                            </RequireAuthOnClick>
                        </div>
                    </div>
                }
            </div>

        </Modal>
    )
}

export default PostViewModal
