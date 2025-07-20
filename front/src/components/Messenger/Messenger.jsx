import React, { useEffect, useState, useLayoutEffect, useRef, useContext } from 'react'
import { ArrowDown, Check2Square, CheckSquare, ChevronDown, EmojiSmile, Mic, ThreeDots, Image, Plus, Search, Trash, Pencil, PencilSquare, SendFill, ChevronLeft } from 'react-bootstrap-icons'
import Message from '../Message/Message'
import Avatar from '../Avatar/Avatar'
import DoDinamicTextarea from '../doDinamicTextarea/DoDinamicTextarea'
import { useReq } from '../../Hooks/RequestHooks'
import { useSelector } from 'react-redux'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import SocketIOContext from '../../context/SocketIOContext'
import MediasSelector from '../MediaSelector/MediasSelector'
import MediaContext from '../../context/MediaContext'
import { DESKTOP, SMARTPHONE } from '../../constants/MediaTypeConstants'
import CircleLoader from '../CircleLoader/CircleLoader'
import useInfiniteScroll from '../../Hooks/useInfiniteScroll'
import { usePaginated } from '../../Hooks/queryHooks'

const Messenger = ({ discu }) => {
    const { discuId } = useParams()
    const { user } = useSelector(store => store.user)
    const { socket } = useContext(SocketIOContext)
    const { deviceType } = useContext(MediaContext)
    const navigate = useNavigate()
    const scrollRef = useRef()
    const bodyRef = useRef()
    const queryClient = useQueryClient()
    const [filteredMessages, setFilteredMessages] = useState([])
    const [tmpMessage, setTmpMessage] = useState({
        content: '',
        pictures: []
    })

    const setMessagePictures = (pictures) => {
        setTmpMessage(prev => ({ ...prev, pictures }))
    }

    const [emptyMessageForm, setEmptyMessageForm] = useState(false)
    const [profilePictures, setProfilePictures] = useState(null)
    const addImageBtn = useRef()

    useEffect(() => {
        setProfilePictures(discu?.members
            ?.filter((m) => m.user?.id !== user?.id && m.user.activeProfilePicture)
            .map((m) => m.user.activeProfilePicture))
    }, [discu?.members])

    const addMessage = async (data) => (
        await axios({
            url: `${process.env.REACT_APP_API_DOMAIN}/messages`,
            data,
            method: 'post',
            withCredentials: true
        }).then((res) => res.data)
    )
    const {
        data: messages,
        flatData: messagesFlat,
        error: messagesErr,
        hasNextPage: messagesNextPage,
        isFetching: messagesFetching,
        isFetchingNextPage: messagesFetchingNextPage,
        status: messagesLoadingStatus,
        refetch:refetchMessages,
        refetchPage,
        addItem: addMessageItem,
        deleteItem: deleteMsgItem,
        editItem
    } = useInfiniteScroll({
        url: `${process.env.REACT_APP_API_DOMAIN}/discussions/${discuId}/messages`,
        queryKey: ['repoMessages', discuId],
        ipp: 15,
        scrollingElement: scrollRef.current,
        scrollDirection: 'top',
        reverseData: true,
        staleTime:Infinity

    })

    const {deleteItem:deleteDiscuItem,editItem:editDiscuList,addItem:addDiscuListItem}=usePaginated({queryKey:['discuList'],ipp:10})

    

    const { mutate: mutateMessages } = useMutation({
        mutationFn: addMessage,
        onSuccess: (data) => {
            editDiscuList(data.discussion.id,(prev)=>({...prev,messages:[...prev.messages,data]}))
            addMessageItem(data)
            socket?.emit('sendMessage', {
                message: data,
                receivers: discu?.members?.filter((m) => m.user?.id !== user?.id),
                sender: user?.id
            })
        },
    })

    const sendMessage = () => {
        let formData = new FormData()
        formData.append('content', tmpMessage.content)
        formData.append('discussion', `/discussions/${discuId}`)
        if (tmpMessage.pictures.length > 0) {

            tmpMessage.pictures.forEach(pic => {
                formData.append('pictures[]', pic)
            });
        }
        mutateMessages(formData)
    }
    


    useEffect(() => {
        if (socket) {
            socket?.on('arrivalMsg', (msg) => {
                editDiscuList(msg.discussion.id,(prev)=>({...prev,messages:[...prev.messages,msg]}))
                if (msg.discussion?.id === discuId && msg.author.id!==user?.id) {
                    addMessageItem(msg)
                }
            });
        }
    }, []);


    useEffect(() => {
        if (bodyRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [bodyRef.current])

    useEffect(() => {
        if (bodyRef.current) {
            const myObserver = new ResizeObserver(entries => {
                entries.forEach(entry => {
                    if (scrollRef.current?.scrollTop <= 10 && messagesNextPage) {
                        scrollRef.current.scrollTop = 50
                    }
                });
            });
            myObserver.observe(bodyRef.current);
            return () => {
                myObserver.disconnect();
            }
        }
    }, [bodyRef.current])

    useEffect(() => {
        if (messages) {
            const groupedMessages = messagesFlat.reduce((result, message) => {
                const lastGroup = result[result.length - 1];
                if (lastGroup && lastGroup.author?.id === message.author?.id && lastGroup.messages.length < 5) {
                    lastGroup.messages.push(message);
                } else {
                    result.push({ author: message.author, messages: [message] });
                }
                return result;
            }, []);

            setFilteredMessages(groupedMessages);
        }
        console.log(messagesFlat, 'MessagesFlat')
    }, [messages]);


    return (
        <div className="messenger">
            <div className="top flex justify-content-between align-items-center gap-10">
                <div className="left flex gap-10 align-items-center">
                    {
                        deviceType === SMARTPHONE &&
                        <div className="toggle-discu-list" onClick={() => navigate('/messages')}><ChevronLeft size={18} /></div>
                    }

                    <div><Search size={16} /></div>
                    <div><PencilSquare size={16} /></div>
                    <div><Trash size={16} /></div>
                </div>
                <div className="right flex gap-10 align-items-center">
                    {
                        profilePictures?.length === 1 ?
                            <Avatar height={40} width={40} src={profilePictures[0].fileUrl} />
                            : <Avatar height={40} width={40} />
                    }
                    <div className="discu-info">
                        <h5>{
                            discu?.discuName ? discu?.discuName :
                                discu?.members.filter((m) =>
                                    m.user?.id !== user?.id
                                ).map((m) => `${m.user.firstName} ${m.user.lastName}`).join(',')
                        }</h5>
                        <span>Actif</span>
                    </div>
                </div>
            </div>
            <div className="content" ref={scrollRef}>
                {
                    messagesFetchingNextPage &&
                    <div className="flex align-items-center justify-content-center mt-20">
                        <CircleLoader colors={null} width={30} height={30} />
                    </div>
                }
                {
                    !messagesFetching || messagesFetchingNextPage ?
                        <div className="body" ref={bodyRef}>
                            {
                                !messagesNextPage && !messagesFetching &&
                                <div className="messenger-user-infos mb-20">
                                    <Avatar height={80} width={80} src={profilePictures ? profilePictures[0].fileUrl : null} />
                                    <h4 className='txt-1 mt-10 mb-15'>{
                                        discu?.discuName ? discu?.discuName :
                                            discu?.members.filter((m) =>
                                                m.user?.id !== user?.id
                                            ).map((m) => `${m.user.firstName} ${m.user.lastName}`).join(',')
                                    }</h4>
                                    <div className="flex align-items-center gap-10 mb-20">
                                        <button className="btn btn-transparent">Profil</button>
                                        <button className="btn btn-gradient"><Plus size={24} /> Nouveau message</button>
                                    </div>
                                </div>
                            }



                            {

                                filteredMessages.length > 0 ?
                                    filteredMessages.map((g, i) => (
                                        <div key={i} className={`message-group${g.author?.id === user?.id ? " mine" : ""}`}>
                                            {
                                                (g.author?.id !== user?.id) ? <div className="left">
                                                    <Avatar src={g.author?.activeProfilePicture ? g.author?.activeProfilePicture.fileUrl : null} />

                                                </div> : ""
                                            }

                                            <div className="messages-list">
                                                {
                                                    g.messages?.map((m, i) =>
                                                        <Message key={i} deleteMessageItem={deleteMsgItem} data={m} scrollingElement={scrollRef} audio={m.audio} medias={m.pictures}>{m.content}</Message>
                                                    )
                                                }

                                            </div>
                                        </div>), [])
                                    : <h4>Vous n'avez aucun message</h4>

                            }
                        </div>
                        : <div className='messenger-loader flex align-items-center justify-content-center'>
                            <CircleLoader colors={null} height={30} width={30} />
                        </div>
                }

                {
                    (!messagesFetching || messagesFetchingNextPage) &&
                    <div className="footer flex justify-content-center">
                        <div>
                            <DoDinamicTextarea
                                placeholder={'Ecrire a ' + (
                                    discu?.discuName ? discu?.discuName :
                                        discu?.members.filter((m) =>
                                            m.user?.id !== user?.id
                                        ).map((m) => `${m.user.firstName} ${m.user.lastName}`).join(',')
                                )}
                                medias={<MediasSelector hiddenIfEmpty selectorBtn={addImageBtn?.current} defaultState={tmpMessage.pictures} setMediasState={setMessagePictures} />}
                                avatar={false} emptied={emptyMessageForm} setEmptied={setEmptyMessageForm} onKeyup={(e) => {
                                    setTmpMessage(prev => ({ ...prev, content: e.target.innerText }))
                                }}
                                next={
                                    (
                                        <>
                                            <button><EmojiSmile size={18} /></button>

                                            <button ref={addImageBtn}>
                                                <Image size={18} />
                                            </button>
                                            <button><Mic size={18} /></button>
                                            <button className="comment-send-btn" onClick={() => {
                                                sendMessage()
                                                setEmptyMessageForm(true)
                                                setMessagePictures([])
                                            }}>
                                                <SendFill />
                                            </button>
                                        </>
                                    )
                                } />
                        </div>
                    </div>
                }

            </div>

        </div>)

}

export default Messenger
