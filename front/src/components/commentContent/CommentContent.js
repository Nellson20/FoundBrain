import React, { useState, useRef, useContext, useEffect } from 'react'
import './commentContent.scss';
import CommentForm from '../commentForm/CommentForm';
import Avatar from '../Avatar/Avatar';
import { Gem, ThreeDots } from 'react-bootstrap-icons';
import moment from '../../moment'
import { useSelector } from 'react-redux';
import RequireAuthOnClick from '../RequireAuthOnclick/RequireAuthOnClick';
import DropDown from '../DropDown/DropDown';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { deleteComment } from '../../api/comment';
import { flatInfiniteQuery, chunckArray, getTextUrls } from '../../functions';
import { useQueryClient } from '@tanstack/react-query';
import Slider from 'react-slick';
import CommentLinkPreview from '../LinkPreview/CommentLinkPreview';
import EmblaCarouselReact from 'embla-carousel-react';
import useEmblaCarousel from 'embla-carousel-react'
import { EmblaCarousel } from '../Slider/EmblaCarousel';
import TextWithLinks from '../TextWithLinks/TextWithLinks';
import NavigableList from '../Input/NavigableList/NavigableList'


const CommentContent = ({ id, children, queryKey = [], sender, commentDate, parentId = null, onReplied = () => { } }) => {

    const [cmtFormShown, setCmtFormShown] = useState(false);
    const { user } = useSelector(store => store.user)
    const queryClient = useQueryClient()

    const cmtContent = useRef();



    const toggleCmtForm = (e) => {
        e.preventDefault()
        setCmtFormShown(!cmtFormShown)
        cmtFormShown ? cmtContent.current.classList.remove("cmtFormShown") : cmtContent.current.classList.add("cmtFormShown")
    }

    const {
        mutate: deleteCommentFn,
        error: deleteCommentErr,
        isPending: deleteCommentLoading } = useMutation({
            mutationFn: () => deleteComment(id),
            onSuccess: (deletedComment) => {
                const newData = flatInfiniteQuery()
                queryClient.setQueryData(queryKey, (old) => {
                    const newArray = flatInfiniteQuery(old).filter((c, i) => c.id !== id)
                    return {
                        ...old,
                        pages: chunckArray([...newArray], 5).map((data, i) => ({
                            data,
                            totalItems: old.pages[0]?.totalItems ? old.pages[0].totalItems - 1 : 0
                        }))
                    }
                })
            },
            onError: (err) => {
                console.log('etoa')
                console.log(err.response?.data, 'errrrrrrr')
            }
        })

    const {
        mutate: addReplyFn,
        error: addReplyErr,
        isPending: addReplyLoading } = useMutation({
            mutationFn: () => deleteComment(id),
            onSuccess: (newReply) => {
                const newData = flatInfiniteQuery()
                queryClient.setQueryData(['commentReplies', parentId ?? id], (old) => {

                })
            },
        })






    return (
        <>
            <div className={`comment-content comment-content-light flex`} ref={cmtContent}>
                <div className="comment-content-avatar-parent">
                    <Avatar h={32} w={32} src={sender?.activeProfilePicture?.fileUrl} />
                </div>

                <div className="right relative" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex' }}>
                        <div className="comment-body relative">
                            <div className="triangle"></div>
                            <div className="flex j-between gap-10">
                                <p className={`commenter-name m-0 light-txt-color-1`}>{sender?.firstName}{sender?.lastName && " " + sender?.lastName}</p>
                                <small className="comment-date">{moment(commentDate).fromNow()}</small>
                            </div>
                            <p className={`comment-txt m-0 light-txt-color-2 txt-medium`}>
                                <TextWithLinks>{children}</TextWithLinks>
                            </p>

                        </div>
                        <div className='comment-content-left flex flex-column justify-content-between align-items-center'>
                            <span role="button" className={`light-txt-color-1`}><Gem size={20} /></span>
                            <DropDown placement='bottom-start'>
                                <span className='com-more-btn pointer'><ThreeDots size={18} /></span>
                                <NavigableList startIndex={0}>
                                    <Link onClick={(e) => {
                                        e.preventDefault()
                                        deleteCommentFn()
                                    }}>Supprimer</Link>

                                    <Link>Signaler</Link>
                                </NavigableList>
                            </DropDown>
                        </div>

                    </div>
                    {
                        getTextUrls(children).length > 0 &&
                        <div className="comment-link-previews">
                            <EmblaCarousel slides={getTextUrls(children).map((url, i) => <div key={i}><CommentLinkPreview url={url} /></div>)} />
                            {/* <div className="embla" ref={emblaRef}>
                                <div className="embla__container">
                                    <div className="embla__slide">Slide 1</div>
                                    <div className="embla__slide">Slide 2</div>
                                    <div className="embla__slide">Slide 3</div>
                                    <div className="embla__slide">Slide 1</div>
                                    <div className="embla__slide">Slide 2</div>
                                    <div className="embla__slide">Slide 3</div>
                                    <div className="embla__slide">Slide 1</div>
                                    <div className="embla__slide">Slide 2</div>
                                    <div className="embla__slide">Slide 3</div>
                                    
                                </div>
                                
                            </div> */}
                            {/* <Slider {...{
                                dots: false,
                                arrows: false,
                                speed: 500,
                                centerMode: true,
                                variableWidth: true,
                                infinite: false,
                            }}>
                                {
                                    getTextUrls(children).map((url, i) => <div><CommentLinkPreview url={url} /></div>
                                    )
                                }
                            </Slider> */}

                        </div>
                    }

                    <div className="com-footer flex gap-10">
                        <RequireAuthOnClick><a href="#" onClick={toggleCmtForm} className={`light-txt-color-1`}>Repondre</a></RequireAuthOnClick>
                    </div>
                </div>

            </div>
            {
                cmtFormShown &&
                <div className="cmtForm" style={{ marginBottom: 10 }}>
                    <CommentForm parent={parentId ? `/comments/${parentId}` : null} focusOnShown={true} onSended={
                        (data) => {
                            onReplied(data)
                        }
                    } />
                </div>
            }
        </>
    )
}

export default CommentContent
