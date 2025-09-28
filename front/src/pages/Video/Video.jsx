import React, { useContext } from 'react'
import { ArrowClockwise, ArrowCounterclockwise, ArrowsFullscreen, ChatLeft, ChatSquareText, ChevronDown, ChevronLeft, ChevronRight, Fullscreen, Gem, Headset, Newspaper, Pause, Plus, Repeat, Share, Shuffle, SkipBackward, SkipForward, Vinyl, VolumeUp } from 'react-bootstrap-icons'
import './Video.scss'
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import CommentList from '../../components/commentList/CommentList'
import Slider from 'react-slick'
import Avatar from '../../components/Avatar/Avatar'
import MediaContext from '../../context/MediaContext'
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer'
import { useTranslation } from 'react-i18next'

const Video = () => {
    const { t } = useTranslation()
    const { deviceType } = useContext(MediaContext)
    return (
        <div id='video-page' className='flex'>
            <div className="center flex-grow-1">
                <div className="video">
                    <div className="video-player">
                        <VideoPlayer options={
                            {
                                autoplay:true,
                                controls: true,
                                sources:[
                                    {
                                        src: 'https://gateafri.com:8888/hls/boy.m3u8',
                                        type: 'application/x-mpegURL'
                                    }
                                ]
                            }
                        } />
                        {/* <video src="https://localhost:3000/vid/vid2.mp4" autoPlay infinite></video> */}
                        <div className="vid-controllers p-10">
                            <div className="top flex align-items-center gap-10">
                                <div className="elapsed-time"><span>{t("0:00")}</span></div>
                                <div className="timeline flex-grow-1">
                                    <div className="wrapper">
                                        <div className="thumb"></div>
                                    </div>
                                </div>
                                <div className="total-time"><span>{t("2:00")}</span></div>
                            </div>
                            <div className="bottom flex align-items-center gap-10 mt-10">
                                <div className="left flex-grow-1 flex gap-10">
                                    <div className="btn flex gap-5" style={{ width: 60 }}>
                                        <Gem strokeWidth={0.15} stroke='black' size={20} />
                                        <span><b>{t("3.5")}</b></span>
                                    </div>
                                    <div className="btn">
                                        <ChatLeft strokeWidth={0.15} stroke='black' size={18} />
                                    </div>
                                    <div className="btn">
                                        <Share strokeWidth={0.15} stroke='black' size={18} />
                                    </div>
                                </div>
                                <div className="center flex align-items-center gap-10">
                                    <div className="btn">
                                        <Shuffle strokeWidth={0.15} stroke='black' size={20} />
                                    </div>
                                    <div className="btn">
                                        <SkipBackward size={20} strokeWidth={0.15} stroke='black' />
                                    </div>
                                    <div className="btn">
                                        <ArrowCounterclockwise strokeWidth={0.15} stroke='black' size={20} />
                                    </div>
                                    <div className="btn play-btn">
                                        <Pause strokeWidth={0.15} stroke='black' size={25} />
                                    </div>
                                    <div className="btn">
                                        <ArrowClockwise strokeWidth={0.15} stroke='black' size={20} />
                                    </div>
                                    <div className="btn">
                                        <SkipForward strokeWidth={0.15} stroke='black' size={20} />
                                    </div>
                                    <div className="btn">
                                        <Repeat strokeWidth={0.15} stroke='black' size={20} />
                                    </div>
                                </div>
                                <div className="right flex-grow-1 flex gap-10 justify-content-end">
                                    <div className="btn">
                                        <VolumeUp strokeWidth={0.15} stroke='black' size={22} />
                                    </div>
                                    <div className="btn">
                                        <ChatSquareText strokeWidth={0.15} stroke='black' size={18} />
                                    </div>
                                    <div className="btn">
                                        <ArrowsFullscreen strokeWidth={0.15} stroke='black' />
                                    </div>
                                </div>
                            </div>
                            <div className="video-player-capt mt-5">
                                <h1 className='video-ttl flex align-items-center gap-5'>
                                  {t("M. Pokora - Qui on est (Clip officiel)")} <ChevronDown strokeWidth={0.5} stroke='black' />
                                </h1>
                            </div>
                        </div>
                    </div>
                    <div className="video-capt">
                    </div>
                </div>
                <div className="video-comment-list p-10 mt-15">
                    <CommentList />
                </div>
            </div>
            <div className="right p-10">
                <div className="add-video-banner flex align-items-center justify-content-between py-10 mb-10">
                    <h4>{t("Ajouter une video")}</h4>
                    <button className="btn-purple"><Plus size={20} /> {t("Ajouter")}</button>
                </div>
                <section>
                    <div className="flex align-items-center justify-content-between">
                        <h4>{t("Explorer")}</h4>
                        <div className="flex align-items-center gap-10">
                            <button className="floating-btn"><ChevronLeft size={21} /></button>
                            <button className="floating-btn"><ChevronRight size={21} /></button>
                        </div>
                    </div>
                    <div className="explorer-slider mt-10">
                        <Slider {...{
                            dots: false,
                            arrows: false,
                            speed: 500,
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            variableWidth: true,
                            infinite: true,
                        }}>
                            <div className="slide news-slide">
                                <Newspaper size={22} />
                                <b>{t("News")}</b>
                            </div>
                            <div className="slide live-slide">
                                <Vinyl />
                                <b>{t("Live")}</b>
                            </div>
                            <div className="slide podcast-slide">
                                <Headset size={22} />
                                <b>{t("Podcast")}</b>
                            </div>
                        </Slider>
                    </div>
                </section>
                <section className='mt-20 mb-15'>
                    <h4>{t("Voir aussi")}</h4>
                </section>
                <section className='video-list mt-10'>
                    <div className="video-list-item flex gap-10">
                        <div className="poster relative aspect-ratio-16-9">
                            <img className='absolute' src="/img/video/gims.jpeg" alt="" />
                            <span className="video-duration">{t("4:30")}</span>
                        </div>
                        <div className="capt">
                            <h1 className="video-ttl">{t("M. Gims en live show case à madagascar")}</h1>
                            <div className="flex align-items-center gap-10">
                                <Avatar height={20} width={20} />
                                <p className='text-secondary'>Afrimuz.com</p>
                            </div>
                            <div className="infos flex gap-5">
                                <span>{t("2,3K gems")}</span>
                                <span>{t("3K vues")}</span>
                                <span>{t("4,6k partages")}</span>
                            </div>
                        </div>
                    </div>
                    <div className="video-list-item flex gap-10">
                        <div className="poster relative aspect-ratio-16-9">
                            <img className='absolute' src="https://media.istockphoto.com/id/1399756394/fr/photo/le-l%C3%A9murien-%C3%A0-queue-annel%C3%A9e-est-un-grand-primate-strepsirrhinien-connu-sous-le-nom-de-maky.jpg?s=612x612&w=0&k=20&c=BaCDWQwhkBQY7ejFXDdONmYb49r1QtFk85_noh_aY0Q=" alt="" />
                            <span className="video-duration">{t("4:30")}</span>
                        </div>
                        <div className="capt">
                            <h1 className="video-ttl">{t("Decouvrez la splendeur de l'ile tropicale Madagascar")}</h1>
                            <div className="flex align-items-center gap-10">
                                <Avatar height={20} width={20} />
                                <p className='text-secondary'>Next travel</p>
                            </div>
                            <div className="infos flex gap-5">
                                <span>{t("2,3K gems")}</span>
                                <span>{t("3K vues")}</span>
                                <span>{t("4,6k partages")}</span>
                            </div>
                        </div>
                    </div>
                    <div className="video-list-item flex gap-10">
                        <div className="poster relative aspect-ratio-16-9">
                            <img className='absolute' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvgpQVkvJg39EaXeT1HrmE57mhHcRHSpUw-0yj-6_V3XAHFBr7EMsGV6SCWVESYwSBxfA&usqp=CAU" alt="" />
                            <span className="video-duration">{t("4:30")}</span>
                        </div>
                        <div className="capt">
                            <h1 className="video-ttl">{t("Présentation du projet Silicon Valley")}</h1>
                            <div className="flex align-items-center gap-10">
                                <Avatar height={20} width={20} />
                                <p className='text-secondary'>Gate Company</p>
                            </div>
                            <div className="infos flex gap-5">
                                <span>{t("2,3K gems")}</span>
                                <span>{t("3K vues")}</span>
                                <span>{t("4,6k partages")}</span>
                            </div>
                        </div>
                    </div>
                    <div className="video-list-item flex gap-10">
                        <div className="poster relative aspect-ratio-16-9">
                            <img className='absolute' src="/img/video/gims.jpeg" alt="" />
                            <span className="video-duration">{t("4:30")}</span>
                        </div>
                        <div className="capt">
                            <h1 className="video-ttl">{t("M. Gims en live show case à madagascar")}</h1>
                            <div className="flex align-items-center gap-10">
                                <Avatar height={20} width={20} />
                                <p className='text-secondary'>Ambiance Tour</p>
                            </div>
                            <div className="infos flex gap-5">
                                <span>{t("2,3K gems")}</span>
                                <span>{t("3K vues")}</span>
                                <span>{t("4,6k partages")}</span>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Video
