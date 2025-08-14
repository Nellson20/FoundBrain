import React from 'react'
import { Nut } from 'react-bootstrap-icons'
import Avatar from '../../components/Avatar/Avatar'
import './Notifications.scss'
import Tabs from '../../components/Tabs/Tabs'
import Tab from '../../components/Tabs/Tab'
import useInfiniteScroll from '../../Hooks/useInfiniteScroll'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { NEW_POST, COMMENT_POST } from '../../constants/NotificationType'
import { Link } from 'react-router-dom'
import NotificationSkeleton from './NotificationSkeleton'
import moment from '../../moment'
import DropDown from '../../components/DropDown/DropDown'
import NavigableList from '../../components/Input/NavigableList/NavigableList'
import { removeNotification, setNotifications } from '../../redux/actions/notificationActions'
import { useTranslation } from 'react-i18next'

const Notifications = () => {
    const { t } = useTranslation()
    const { user } = useSelector(store => store.user)
    const notificationDispatch = useDispatch()

    useEffect(() => {
        setNotifications(0)
    }, [])

    const {
        data: notifications,
        flatData: notificationsFlat,
        error,
        hasNextPage: notificationsNextPage,
        isFetching: notificationsFetching,
        isFetchingNextPage: notificationsFetchingNextPage,
        status: notificationsLoadingStatus,
        refetch,
        refetchPage
    } = useInfiniteScroll({
        url: `${process.env.REACT_APP_API_DOMAIN}/notifications`,
        ipp: 10,
        queryKey: ['notifications', user?.id],
        transformResult: (result) => {
            return { data: result['hydra:member'], nextPage: result['hydra:view']['hydra:next'] ? parseInt(result['hydra:view']['hydra:next'].match(/page=(\d+)/)[0].split('=')[1]) : undefined }
        }
    })

    useEffect(() => {
        setNotifications(0)
    }, [])

    return (
        <div id='notification-page'>
            <div className="top flex justify-content-between align-items-center">
                <h3>{t("Notifications")}</h3>
                <div>
                    <DropDown>
                        <button className="btn btn-transparent"><Nut size={20} /></button>
                        <NavigableList startIndex={0}>
                            <Link>{t("Tout marquer comme lu")}</Link>
                            <Link>{t("Paramètre des notifications")}</Link>
                        </NavigableList>
                    </DropDown>
                </div>
            </div>
            <div className="body">
                <Tabs className='notification-tabs'>
                    <Tab title={<><span>{t("Tous")}</span></>}>
                        {
                            (notificationsFetching && !notificationsFetchingNextPage) ?
                                [...new Array(8)].map((_, i) => <NotificationSkeleton key={i} />) :
                                notificationsFlat?.map((n, i) => {
                                    if (n.type === NEW_POST) {
                                        var domains = n.post.author.domains?.map(d => d.title).join(', ')
                                        return (
                                            <div key={i} className={`notification flex gap-10${n.isRead ? ' read' : ''}`}>
                                                <Avatar src={n.post.author.activeLogo?.fileUrl || n.post.author.activeProfilePicture?.fileUrl} width={55} height={55} />
                                                <div className="notification-capt flex flex-column justify-content-center">
                                                    <p><b>{n.post.author.name ? n.post.author.name : `${n.post.author.firstName} ${n.post.author.lastName}`}</b> {t("a publié un post lié aux domaines qui vous intéressent")} {domains}</p>
                                                    <span className='notication-date'>{moment(n.post.createdAt).fromNow()}</span>
                                                </div>
                                            </div>
                                        )
                                    } else if (n.type === COMMENT_POST) {
                                        return (
                                            <div key={i} className={`notification flex gap-10${n.isRead ? ' read' : ''}`}>
                                                <Avatar src={n.comment.author.activeLogo?.fileUrl || n.comment.author.activeProfilePicture?.fileUrl} width={55} height={55} />
                                                <div className="notification-capt flex flex-column justify-content-center">
                                                    <p><b>{n.comment.author.name ? n.comment.author.name : `${n.comment.author.firstName} ${n.comment.author.lastName}`}</b> {t("a commenté votre publication")}</p>
                                                    <span className='notication-date'>{moment(n.comment.createdAt).fromNow()}</span>
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                        }
                        {
                            notificationsFetchingNextPage ?
                                [...new Array(2)].map(_ => <NotificationSkeleton />)
                                : ''
                        }
                    </Tab>
                    <Tab title={<><span>{t("Non lu")}</span></>}>
                        {
                            (notificationsFetching && !notificationsFetchingNextPage) ?
                                [...new Array(8)].map((_, i) => <NotificationSkeleton key={i} />) :
                                notificationsFlat?.map((n, i) => {
                                    if (n.type === NEW_POST) {
                                        var domains = n.post.author.domains?.map(d => d.title).join(', ')
                                        return (
                                            <div key={i} className={`notification flex gap-10${n.isRead ? ' read' : ''}`}>
                                                <Avatar src={n.post.author.activeLogo?.fileUrl || n.post.author.activeProfilePicture?.fileUrl} width={55} height={55} />
                                                <div className="notification-capt flex flex-column justify-content-center">
                                                    <p><b>{n.post.author.name ? n.post.author.name : `${n.post.author.firstName} ${n.post.author.lastName}`}</b> {t("a publié un post lié aux domaines qui vous intéressent")} {domains}</p>
                                                    <span className='notication-date'>{moment(n.post.createdAt).fromNow()}</span>
                                                </div>
                                            </div>
                                        )
                                    } else if (n.type === COMMENT_POST) {
                                        return (
                                            <div key={i} className={`notification flex gap-10${n.isRead ? ' read' : ''}`}>
                                                <Avatar src={n.comment.author.activeLogo?.fileUrl || n.comment.author.activeProfilePicture?.fileUrl} width={55} height={55} />
                                                <div className="notification-capt flex flex-column justify-content-center">
                                                    <p><b>{n.comment.author.name ? n.comment.author.name : `${n.comment.author.firstName} ${n.comment.author.lastName}`}</b> {t("a commenté votre publication")}</p>
                                                    <span className='notication-date'>{moment(n.comment.createdAt).fromNow()}</span>
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                        }
                        {
                            notificationsFetchingNextPage ?
                                [...new Array(2)].map(_ => <NotificationSkeleton />)
                                : ''
                        }
                    </Tab>
                </Tabs>
            </div>
        </div>
    )
}

export default Notifications
