import React, { useEffect, useRef, useState } from 'react'
import { ChevronBarLeft, ChevronLeft, ChevronRight, Download, Fullscreen, PencilSquare, Plus, PlusLg, X, XLg, ZoomIn, ZoomOut } from 'react-bootstrap-icons'
import Avatar from '../../components/Avatar/Avatar'
import CommentForm from '../../components/commentForm/CommentForm'
import './Image.scss'
import { Gem, ChatLeft, Share, Clipboard } from 'react-bootstrap-icons'
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

const Image = ({ closeFn = () => { } }) => {
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
                <div className="top relative">
                    <img src={image?.imageEntity.fileUrl} alt="" className="background-post-img absolute" />
                    <div className="background-post-img-glass absolute flex align-items-center justify-content-center">
                        <img ref={img} src={image?.imageEntity.fileUrl} alt="" className="single-post-img absolute" style={{ maxWidth: "100% !important", height: "100% !important" }} />
                    </div>
                    <div className="close-btn" onClick={(e) => { navigate(-1) }}>
                        <XLg size={16} />
                    </div>
                    <div className="post-imgs-slide-actions absolute flex gap-10">
                        <div className="zoom-in-btn">
                            <ZoomIn size={16} />
                        </div>
                        <div className="zoom-out-btn">
                            <ZoomOut size={16} />
                        </div>
                        <div className="full-screen-btn">
                            <Fullscreen size={16} />
                        </div>
                        <div className="download-btn">
                            <Download size={16} />
                        </div>
                    </div>
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
                            <span>{moment(post?.createdAt).fromNow()}</span>
                        </div>
                    </div>
                    <div className="right flex gap-10">
                        {
                            post?.author.country &&
                            <div className="flag">
                                <img src={post?.author.country?.flag.fileUrl} height={30} alt="" />
                            </div>
                        }

                        <button className='post-plus-btn'>
                            <Plus size={28} />
                        </button>
                    </div>
                </div>
                <div className="body">
                    <div className='p-10'>
                        {
                            editDescription && (user?.id === post?.author.id || post?.author.author?.id) ?
                                <div className='description-edit-inpt'>
                                    <textarea className="mb-10 inpt" placeholder="Description de l'image" onChange={(e) => setTmpDescription(e.target.value)} name="" value={tmpDescription} id="" cols="30" rows="10"></textarea>
                                    <button className="btn btn-purple" onClick={sendTmpDescription}>
                                        {
                                            !loadingSendDescription ? 'Publier' :
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
                                            <button className="btn btn-transparent" onClick={() => setEditDescription(true)}><PencilSquare /> Modifier la déscription</button>
                                        }
                                    </>
                                    :
                                    (user?.id === post?.author.id || user?.id === post?.author.author?.id) &&
                                    <button className="btn btn-transparent" onClick={() => setEditDescription(true)}><PencilSquare /> Ajouter une déscription</button>
                                : ''
                        }
                    </div>
                    <div className="px-10">
                        <div className="link-input flex">
                            <input readOnly className="link flex-grow-1" value={currentURL} />
                            <button><Clipboard /></button>
                        </div>
                    </div>
                    <div className="post-comments p-10">
                        <Tabs className='post-comments-tabs'>
                            <Tab title={<span className='flex align-items-center gap-5'><span>Commentaires</span>{image?.commentsCount > 0 ? ` (${millify(image?.commentsCount)})` : ''}</span>}>
                                <CommentList
                                    queryKey={['imageComments', image_id]}
                                    url={`${process.env.REACT_APP_API_DOMAIN}/commentable_entities/${image_id}/comments`}
                                />
                            </Tab>
                            <Tab title={<span className='flex align-items-center gap-5'><span>Evaluations</span>{image?.evaluationCount > 0 ? ` (${millify(image?.evaluationCount)})` : ''}</span>}>
                                <h4 className='mb-10'>Evaluations</h4>
                                <EvaluationList url={`${process.env.REACT_APP_API_DOMAIN}/images/${image_id}/evaluations`} queryQuery={['imageEvaluations', image_id]} scrollingElement={scrollingElement} />

                            </Tab>
                        </Tabs>
                    </div>

                </div>
                <div className="footer">
                    {
                        user &&
                        <div className="top">
                            <CommentForm commentable={`/images/${image_id}`} onSended={(data) => {
                                addItem(data)
                            }} />
                        </div>
                    }
                    <div className="bottom flex gap-10">
                        <RequireAuthOnClick>
                            <span className='flex align-items-center gap-10 no-wrap-text'>
                                <div className="ico">
                                    <Gem size={21} />
                                    {image?.evaluationCount > 0 ? <div className="badge">{millify(image?.evaluationCount)}</div> : ''}
                                </div>
                                <span>Evaluer</span>
                            </span>
                        </RequireAuthOnClick>
                        <RequireAuthOnClick>
                            <span className='flex align-items-center gap-10 no-wrap-text'>
                                <div className="ico">
                                    <ChatLeft size={21} />
                                    {image?.commentsCount > 0 ? <div className="badge">{millify(image?.commentsCount)}</div> : ''}
                                </div>
                                <span>Commenter</span>
                            </span>
                        </RequireAuthOnClick>
                        <RequireAuthOnClick>
                            <span className='flex align-items-center gap-10 no-wrap-text'>
                                <div className="ico">
                                    <Share size={21} />
                                    <div className="badge">50</div>
                                </div>
                                <span>Partager</span>
                            </span>
                        </RequireAuthOnClick>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Image
