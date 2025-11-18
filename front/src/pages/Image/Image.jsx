import React, { useEffect, useRef, useState } from 'react'
import { ChevronBarLeft, ChevronDown, ChevronLeft, ChevronRight, Download, Fullscreen, PencilSquare, Plus, PlusLg, X, XLg, ZoomIn, ZoomOut, EmojiSmile, CameraVideo, Paperclip} from 'react-bootstrap-icons'
import Avatar from '../../components/Avatar/Avatar'
import CommentForm from '../../components/commentForm/CommentForm'
import './Image.scss'
import { Gem, ChatLeft, Share, Clipboard, HandThumbsUp } from 'react-bootstrap-icons'
import Tab from '../../components/Tabs/Tab'
import Tabs from '../../components/Tabs/Tabs'
import { useLocation } from 'react-router-dom';

import axios from 'axios'
import RequireAuthOnClick from '../../components/RequireAuthOnclick/RequireAuthOnClick'
import millify from 'millify'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getPost } from '../../api/post'
import moment from '../../moment'
import { Link } from 'react-router-dom'
import { useParams, useSearchParams } from "react-router-dom";
import CircleLoader from '../../components/CircleLoader/CircleLoader'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CommentList from '../../components/commentList/CommentList'
import EvaluationList from '../../components/Evaluation/EvaluationList'
import { getImage } from '../../api/Image'
import { usePaginated } from '../../Hooks/queryHooks'
import { useTranslation } from 'react-i18next'

const Image = ({ closeFn = () => { } }) => {
    const { t } = useTranslation()
    const { image_id } = useParams()
    const { user } = useSelector(store => store.user)
    const navigate = useNavigate()
    const img = useRef()
    let [searchParams, setSearchParams] = useSearchParams();
    const { addItem } = usePaginated({queryKey:['imageComments', image_id]})
    const queryClient=useQueryClient()

    const [width, setImgWidth] = useState(0)
    const [height, setImgHeight] = useState(0)

    const location = useLocation();
    const currentURL = window.location.origin + location.pathname + location.search;

    const [tmpComment, setTmpComment] = useState('')
    const [scrollingElement, setScrollingElement] = useState(null)
    const [showCommentInput, setShowCommentInput] = useState(false)

    const { data: post, error: postError, isLoading: postLoading } = useQuery({
        queryKey: ['imagePostRepo', searchParams.get('p')],
        queryFn: () => getPost(searchParams.get('p'))
    })

    //Get image Info
    const {
        data: image,
        error: imageErr,
        isLoading: imageLoading
    } = useQuery({
        queryKey: ['imageModal', image_id],
        queryFn: () => getImage(image_id),
    })

    const [editDescription, setEditDescription] = useState(false)
    const [tmpDescription, setTmpDescription] = useState(image?.description ? image?.description : '')
    const [loadingSendDescription, setLoadingSendDescription] = useState(false)
    const sendTmpDescription = () => {
        if (tmpDescription && tmpDescription.length > 0) {
            setLoadingSendDescription(true)
            // axios({
            //     url: `${process.env.REACT_APP_API_DOMAIN}/images/${image_id}`,
            //     data: { description: tmpDescription },
            //     headers: {
            //         'Content-Type': 'application/merge-patch+json',
            //     },
            //     method: 'patch',
            // }).then((res) => {
            //     setImage(prev => ({ ...prev, description: res.data.description }))
            //     setLoadingSendDescription(false)
            //     setEditDescription(false)
            // }).catch((err) => {
            //     console.log(err.response)

            // })
        }
    }





    return (
        <div id="image-page" className='flex'>
            <div className="left flex flex-column flex-grow-1">
                <div className="close-btn-outside" onClick={(e) => { navigate(-1) }}>
                    <XLg size={15} />
                </div>
                <div className="top relative">
                    <img src={image?.imageEntity.fileUrl} alt="" className="background-post-img absolute" />
                    <div className="background-post-img-glass absolute flex align-items-center justify-content-center">
                        <img ref={img} src={image?.imageEntity.fileUrl} alt="" className="single-post-img absolute" style={{ maxWidth: "100% !important", height: "100% !important" }} />
                    </div>
                    <div className="post-imgs-slide-actions absolute flex gap-10">
                        <div className="zoom-in-btn">
                            <ZoomIn size={16} />
                        </div>
                        <div className="zoom-out-btn">
                            <ZoomOut size={16} />
                        </div>
                        {/* <div className="full-screen-btn">
                            <Fullscreen size={16} />
                        </div>
                        <div className="download-btn">
                            <Download size={16} />
                        </div> */}
                    </div>
                    {post?.thumbnails && post.thumbnails.length > 1 && (
                        <div className="image-counter">
                            {post.thumbnails.findIndex(t => t.image?.id == image_id) + 1} <ChevronRight size={12} />
                        </div>
                    )}
                    <div className="prev-slide-btn">
                        <ChevronLeft size={20} />
                    </div>
                    <div className="next-slide-btn">
                        <ChevronRight size={20} />
                    </div>
                </div>
            </div>
            <div className="right" ref={setScrollingElement}>
                <div className="header flex justify-content-between p-10">
                    <div className="left flex gap-10">
                        <Avatar height={40} width={40} src={(post?.author.activeProfilePicture?.fileUrl || post?.author.activeLogo?.fileUrl)} />

                        <div className="author-info">
                            <h4><Link to={`${post?.author.firstName ?
                                `/profil/${post?.author.id}` : post?.author.name ? `/portail/${post?.author.id}` : null}`
                            }>{(post?.author.firstName || post?.author.name)}{post?.author.lastName ? " " + post?.author.lastName : ""}</Link></h4>
                            <span className="author-time">{moment(post?.createdAt).fromNow()}</span>
                            {post?.author.domains && post?.author.domains.length > 0 && (
                                <span className="author-domains">{post?.author.domains?.map((d) => d.title).join(', ')}</span>
                            )}
                        </div>
                    </div>
                    <div className="right flex gap-10 align-items-center">
                        {post?.author.country && (
                            <div className="flag">
                                <img src={post?.author.country?.flag.fileUrl} height={30} alt="" />
                            </div>
                        )}

                        <button className='post-plus-btn'>
                            <ChevronDown size={18} />
                        </button>
                    </div>
                </div>
                <div className="body">
                    {post?.content && (
                        <div className="post-main-content p-10">
                            <h3 className="post-title">{post.content}</h3>
                        </div>
                    )}
                    {/* <div className='p-10'>
                        {
                            editDescription && (user?.id === post?.author.id || post?.author.author?.id) ?
                                <div className='description-edit-inpt'>
                                    <textarea className="mb-10 inpt" placeholder={t("Description de l'image")} onChange={(e) => setTmpDescription(e.target.value)} name="" value={tmpDescription} id="" cols="30" rows="10"></textarea>
                                    <button className="btn btn-purple" onClick={sendTmpDescription}>
                                        {
                                            !loadingSendDescription ? t('Publier') :
                                                <CircleLoader />
                                        }
                                    </button>
                                </div> : ''
                        }
                        {
                            !editDescription ?
                                image?.description ?
                                    <>
                                        <div className="post-content">
                                            <p>{image?.description}</p>
                                        </div>
                                        {
                                            (user?.id === post?.author.id || user?.id === post?.author.author?.id) &&
                                            <button className="btn btn-transparent" onClick={() => setEditDescription(true)}><PencilSquare /> {t('Modifier la déscription')}</button>
                                        }
                                    </>
                                    :
                                    (user?.id === post?.author.id || user?.id === post?.author.author?.id) &&
                                    <button className="btn btn-transparent" onClick={() => setEditDescription(true)}><PencilSquare /> {t('Ajouter une déscription')}</button>
                                : ''
                        }
                    </div> */}
                    {/* <div className="px-10">
                        <div className="link-input flex">
                            <input readOnly className="link flex-grow-1" value={currentURL} />
                            <button><Clipboard /></button>
                        </div>
                    </div> */}
                    {/* <div className="post-comments p-10">
                        <Tabs className='post-comments-tabs'>
                            <Tab title={<span className='flex align-items-center gap-5'><span>{t('Commentaires')}</span>{image?.commentsCount > 0 ? ` (${millify(image?.commentsCount)})` : ''}</span>}>
                                <CommentList
                                    queryKey={['imageComments', image_id]}
                                    url={`${process.env.REACT_APP_API_DOMAIN}/commentable_entities/${image_id}/comments`}
                                />
                            </Tab>
                            <Tab title={<span className='flex align-items-center gap-5'><span>{t('Evaluations')}</span>{image?.evaluationCount > 0 ? ` (${millify(image?.evaluationCount)})` : ''}</span>}>
                                <h4 className='mb-10'>{t('Evaluations')}</h4>
                                <EvaluationList url={`${process.env.REACT_APP_API_DOMAIN}/images/${image_id}/evaluations`} queryQuery={['imageEvaluations', image_id]} scrollingElement={scrollingElement} />

                            </Tab>
                        </Tabs>
                    </div> */}

                </div>
                <div className="footer">
                    {/* {
                        user &&
                        <div className="top">
                            <CommentForm commentable={`/images/${image_id}`} onSended={(data) => {
                                addItem(data)
                            }} />
                        </div>
                    } */}
                    <div className="bottom flex gap-15 align-items-center">
                        <div className='avatar-small flex align-items-center'>
                            <Avatar height={25} width={25} src={user?.activeProfilePicture?.fileUrl || user?.activeLogo?.fileUrl} />
                            <ChevronDown size={14} />
                        </div>
                        <RequireAuthOnClick>
                            <span className='flex align-items-center gap-3 no-wrap-text interaction-btn'>
                                <div className="ico-wrapper">
                                    <HandThumbsUp size={18} className="ico-bravo" />
                                    
                                </div>
                                <span>{t('Bravo')}</span>
                            </span>
                        </RequireAuthOnClick>
                        <RequireAuthOnClick>
                            <span  onClick={() => setShowCommentInput(!showCommentInput)} className='flex align-items-center gap-3 no-wrap-text interaction-btn'>
                                <div className="ico-wrapper">
                                    <ChatLeft size={18} />
                                </div>
                                <span>{t('Commentaire')}</span>
                            </span>
                        </RequireAuthOnClick>
                        <RequireAuthOnClick>
                            <span className='flex align-items-center gap-3 no-wrap-text interaction-btn'>
                                <div className="ico-wrapper">
                                    <Share size={18} />
                                </div>
                                <span>{t('Republier')}</span>
                            </span>
                        </RequireAuthOnClick>
                    </div>
                </div>
                {
                    showCommentInput && (
                        <div className="comment-input-section">
                            <div className="comment-input-wrapper">
                                <input 
                                    type="text" 
                                    placeholder="Écrire un commentaire" 
                                    className="comment-input"
                                />
                                <div className="comment-icons">
                                    <EmojiSmile size={18} className="comment-icon" />
                                   
                                    <CameraVideo size={18} className="comment-icon" />
                                    <Paperclip size={18} className="comment-icon" />
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
        
    )
}

export default Image
