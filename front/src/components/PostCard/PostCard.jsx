import React, { useContext, useEffect, useState } from 'react'
import './PostCard.scss'
import { Plus, Diamond, Gem, ChatLeft, Share,Chat,ChevronCompactDown,ChevronCompactUp, HandThumbsUp ,ChevronDown, EmojiSmile, Image, CameraVideo, Paperclip, Bookmark, Bell, PencilSquare, Trash } from 'react-bootstrap-icons'
import Avatar from '../Avatar/Avatar'
import MediaContext from '../../context/MediaContext'
import { DESKTOP, SMARTPHONE, TABLET } from '../../constants/MediaTypeConstants'
import PostImagesGrid from '../PostImagesGrid/PostImagesGrid'
import { Link } from 'react-router-dom'
import DropDown from '../DropDown/DropDown'
import axios from 'axios'
import moment from '../../moment'
import RequireAuthOnClick from '../RequireAuthOnclick/RequireAuthOnClick'
import Rating from 'react-rating'
import twemoji from 'twemoji'
import PostViewModal from '../PostViewModal/PostViewModal'
import { addPostEvaluation } from '../../api/post'
import { useSelector } from 'react-redux'
import Cookies from 'js-cookie'
import { getRandomNumber } from '../../functions'
import millify from 'millify'
import TextViewMore from '../TextViewMore/TextViewMore'
import Tabs from '../Tabs/Tabs'
import Tab from '../Tabs/Tab'
import CommentList from '../commentList/CommentList'
import CircleLoader from '../CircleLoader/CircleLoader'
import EvaluationList from '../Evaluation/EvaluationList'
import NavigableList from '../Input/NavigableList/NavigableList'



const PostCard = ({ noComment = false, data, onDelete = () => { }, showInteractions = false, scrollingElement = null }) => {
  const { deviceType } = useContext(MediaContext)
  const [showPostModal, setShowPostModal] = useState(false)
  const { user } = useSelector((store) => store.user)
  const [commentsFetching, setCommentsFetching] = useState(false)
  const [comments, setComments] = useState([])
  const [showCommentInput, setShowCommentInput] = useState(false)
  const deletePost = (e) => {
    e.preventDefault()
    axios({
      url: `${process.env.REACT_APP_API_DOMAIN}/posts/${data.id}`,
      method: 'delete',
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${Cookies.get('BEARER')}`
      }
    }).then(function (response) {
      onDelete(data.id)
    }).catch(function (err) {
      console.log(err.response, 'ERROR DELETE POST')
    })

  }

  const addPostEvaluation = (postId, note) => {
    return axios({
      url: `${process.env.REACT_APP_API_DOMAIN}/evaluations`,
      data: { evaluable: `/posts/${postId}`, note },
      method: 'post', withCredentials: true,
    }).then((res) => {
      console.log(res.data)
      console.log("heloo")
    }).catch((err) => console.log(err.response))
  }
  useEffect(() => {
    console.log(data, data.id)
  }, [data])



  return (
    <div className='post-card'>
      <div className="top flex justify-content-between" style={{
        top: deviceType === DESKTOP ? 'var(--topbar-height)' : 0,
        position: deviceType === DESKTOP ? 'sticky !important' : 'statique !important',
        padding: '8px 10px',
      }}>
        <div className="left flex gap-10">
          <Avatar height={40} width={40} src={data.author.activeProfilePicture?.fileUrl || data.author.activeLogo?.fileUrl} />
          <div className="author-info">
            <h1><Link to={`${data.author.firstName ?
              `/profil/${data.author.id}` : data.author.name ? `/portail/${data.author.id}` : null}`
            }>{data.author.firstName || data.author.name}{data.author.lastName ? " " + data.author.lastName : ""}</Link></h1>
            {
              (data.author.domains && data.author.domains.length > 0) &&
              <Link className='author-domains'>{data.author.domains?.map((d) => d.title).join(',')}</Link>
            }
            <span>{moment(data.createdAt).fromNow()}</span>
            
          </div>
        </div>
        <div className="flex gap-10">
          {
            data.author.country &&
            <div className="flag">
              <Link to='/explorer' title={data.author.country.name}><img src={data.author.country.flag.fileUrl} height={30} alt="" /></Link>
            </div>
          }

          <DropDown>
            <div className="plus-btn"><ChevronCompactUp size={28} /><ChevronCompactDown size={28} /></div>
            <NavigableList startIndex={0}>
              <Link to='/emplois/cv'><Bookmark size={20} /> Enregistrer</Link>
              <Link to='/emplois/nouveau'><Bell size={20} /> Alerter les activités</Link>
              {
                (user && (data.author.id === user?.id || data.author.author?.id === user?.id)) &&
                
                  [<Link to='/' key="edit"><PencilSquare size={20} /> Modifier la publication</Link>,
                  <Link to='/' onClick={deletePost} key="delete"><Trash size={20} /> Suprimer</Link>]
                
              }
            </NavigableList>
          </DropDown>
        </div>
      </div>

      

      <PostImagesGrid postId={data.id} images={data.thumbnails} />
      {
            data.content && <div className="body">

              <TextViewMore>{data.content}</TextViewMore></div>
          }
      {/* {
        !noComment &&
        <div className="post-comment-list p-10">
          <CommentList comments={data.comments} />
        </div>
      } */}
      {
        showInteractions &&
        <Tabs className='post-comments-tabs'>
          <Tab title={<span className='flex align-items-center gap-5'><span>Commentaires</span>{data.commentsCount > 0 ? ` (${data.commentsCount})` : ''}</span>}>
            <CommentList
              queryKey={['postComments', data.id]}
              url={`${process.env.REACT_APP_API_DOMAIN}/commentable_entities/${data.id}/comments`}
            />
          </Tab>
          <Tab title={<span className='flex align-items-center gap-5'><span>Evaluations</span>{data.evaluationCount > 0 ? ` (${data.evaluationCount})` : ''}</span>}>
            <h4 className='mb-10'>Evaluations</h4>
            <EvaluationList url={`${process.env.REACT_APP_API_DOMAIN}/posts/${data.id}/evaluations`} queryQuery={['PostEvaluations', data.id]} scrollingElement={scrollingElement} />
            {/* {
            evalsLoadingStatus === 'loading' ? (
              <h1>loading...</h1>
            ) : evalsLoadingStatus === 'error' ? (
              <p>Error: {error.message}</p>
            ) : evalsList?.pages?.length > 0 ? evalsList?.pages?.map((group, i) => (
              <React.Fragment key={i}>
                {group.data.map((evaluation) => (
                  <EvaluationItem data={evaluation} />
                ))}
              </React.Fragment>

            )) : <div className="empty-eval">
              <h1>Aucune évaluation à afficher</h1>
            </div>
          }
          {evalsListFetchingNextPage
            ? <h1>Loading</h1>
            : evalsListNextPage
              ? ''
              : ''} */}
          </Tab>
        </Tabs>
      }

      <div className="footer flex align-items-center gap-15">

        <div className='relative avatar-dropdown-btn'>
          <DropDown placement='top-start' closeOnclickInside={false}>
            <RequireAuthOnClick>
              <span className='flex align-items-center gap-3 no-wrap-text'>
                <Avatar height={24} width={24} src={user?.activeProfilePicture?.fileUrl || user?.activeLogo?.fileUrl} />
                <ChevronDown size={16} />
              </span>
            </RequireAuthOnClick>
            <Rating
              onChange={(value) => addPostEvaluation(data.id, value)}
              fractions={2}
              emptySymbol={<img src="/img/icons/diamond_grey.png" className="icon rating-diamond-img" />}
              fullSymbol={<img src="/img/icons/diamond.png" className="icon rating-diamond-img" />}
            />
          </DropDown>
        </div>

        <RequireAuthOnClick>
          <span className='flex align-items-center gap-3 no-wrap-text'>
            <HandThumbsUp size={20} style={{ color: '#FFA500' }} />
            <span>Bravo</span>
          </span>
        </RequireAuthOnClick>

        <span onClick={() => setShowCommentInput(!showCommentInput)} className='flex align-items-center gap-3 no-wrap-text'>
          <Chat size={20} />
          <span>Commentaire</span>
        </span>

        <RequireAuthOnClick>
          <span className='flex align-items-center gap-3 no-wrap-text'>
            <Share size={20} />
            <span>Republier</span>
          </span>
        </RequireAuthOnClick>
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
                <EmojiSmile size={20} className="comment-icon" />
                <Image size={20} className="comment-icon" />
                <CameraVideo size={20} className="comment-icon" />
                <Paperclip size={20} className="comment-icon" />
              </div>
            </div>
          </div>
        )
      }
      
      {
        showPostModal && <PostViewModal post={data} open={showPostModal} setOpen={setShowPostModal} />
      }
    </div>
  )
}

export default PostCard
