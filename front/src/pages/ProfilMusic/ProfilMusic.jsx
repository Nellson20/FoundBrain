import React from 'react'
import { ChevronLeft, ChevronRight, MenuButton, MenuDown, PlayFill, SignDeadEnd, SignDoNotEnterFill, SignNoLeftTurnFill, Spotify, ThreeDotsVertical } from 'react-bootstrap-icons'
import './ProfilMusic.scss'
import Slider from 'react-slick'
import Avatar from '../../components/Avatar/Avatar'
import VideoCard from '../../components/VideoCard/VideoCard'
import { useRef } from 'react';
import { TfiAlignJustify } from "react-icons/tfi";
import SliderNav from '../../components/SliderNav/SliderNav'
const ProfilMusic = () => {
    const caroseul = useRef()
    const data = [
        {
            img: '/img/video/tsota.PNG',
            title: 'Tsota',
            user: {
                name: 'Antema'
            },
            duration: '03:15'
        },
        {
            img: '/img/video/smaven.PNG',
            title: 'Smaven',
            user: {
                name: 'Nirina'
            },
            duration: '04:15'

        },
        {
            img: '/img/video/rimka.PNG',
            title: 'Rimka',
            user: {
                name: 'Donnel'
            }
            ,
            duration: '02:15'

        },
        {
            img: '/img/video/lion.PNG',
            title: 'Lion Hill',
            user: {
                name: 'Hira Gasy'
            },
            duration: '05:30'

        },
        {
            img: '/img/video/gims.jpeg',
            title: 'Maitre Gims',
            user: {
                name: 'Gasy tia Hira'
            },
            duration: '04:30'

        },
        {
            img: '/img/video/fes.jpg',
            title: 'Twooki',
            user: {
                name: 'Nirina'
            },
            duration: '05:00'

        },
        {
            img: '/img/other/shopping.jpg',
            title: 'test',
            user: {
                name: 'antema'
            },
            duration: '05:00'

        },
    ]

    const dataPopulaire = [
        {
            img: '/img/video/fes.jpg',
            title: 'Twooki',
            user: {
                name: 'Nirina'
            },
            duration: '05:00'

        },
        {
            img: '/img/video/gims.jpeg',
            title: 'Maitre Gims',
            user: {
                name: 'Gasy tia Hira'
            },
            duration: '04:30'

        },
        {
            img: '/img/video/lion.PNG',
            title: 'Lion Hill',
            user: {
                name: 'Hira Gasy'
            },
            duration: '05:30'

        },
        {
            img: '/img/video/lion.PNG',
            title: 'Lion Hill',
            user: {
                name: 'Hira Gasy'
            },
            duration: '05:30'

        },
        {
            img: '/img/video/gims.jpeg',
            title: 'Maitre Gims',
            user: {
                name: 'Gasy tia Hira'
            },
            duration: '04:30'

        },
        {
            img: '/img/video/fes.jpg',
            title: 'Twooki',
            user: {
                name: 'Nirina'
            },
            duration: '05:00'

        },
        {
            img: '/img/other/shopping.jpg',
            title: 'test',
            user: {
                name: 'antema'
            },
            duration: '05:00'

        },
    ]

    const dataFeaturing = [
        {
            img: '/img/video/big_mj.jpg',
            title: 'Lion Hill feat Big mij',
            user: {
                name: 'Nirina'
            },
            duration: '05:00'

        },
        {
            img: '/img/video/nina.jpg',
            title: 'Lion Hill feat LJO',
            user: {
                name: 'Gasy tia Hira'
            },
            duration: '04:30'

        },
        {
            img: '/img/video/maxresdefault.jpg',
            title: 'Lion Hill feat Boy Black',
            user: {
                name: 'Hira Gasy'
            },
            duration: '05:30'

        },
        {
            img: '/img/video/lion.PNG',
            title: 'Lion Hill',
            user: {
                name: 'Hira Gasy'
            },
            duration: '05:30'

        },
        {
            img: '/img/video/lion_2.jpg',
            title: 'Lion Hill feat Denise',
            user: {
                name: 'Gasy tia Hira'
            },
            duration: '04:30'

        },
        {
            img: '/img/video/lion_hill_3.jpg',
            title: 'Lion Hill feat LAULE JOBIE',
            user: {
                name: 'Nirina'
            },
            duration: '05:00'

        },
        {
            img: '/img/video/a.jpg',
            title: 'Lion Hill feat Christo',
            user: {
                name: 'antema'
            },
            duration: '05:00'

        },
    ]

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        variableWidth: true,
        arrows: false,
        dots: false
    };

    return (
        <div id='profilMusic'>

            <div className='cover-parent'>
                <div className='background-cover'>
                </div>
            </div>

            <div className='content-profil'>
                <div className='profil-header flex'>
                    <div className='card-header'>
                        <Avatar src={'/img/artists/5.png'} height={120} width={120} online={false} />
                    </div>
                    <div className='card-right'>
                        <p className='title'>Artiste</p>
                        <div className='artiste'>
                            <h1>Lion hill</h1>
                        </div>
                        <p className='content'>Ataovo tonga, lofi vibes, new tracks every week...</p>
                        <div className='item-card flex gap-10 justify-content-between' style={{ color: 'white' }}>
                            <div className='span'>
                                <span><b>• 3,09 k abonnés </b></span>
                                <span><b>• 25 vidéos</b></span>
                            </div>
                            <div className='span-2'>
                                <ThreeDotsVertical size={20} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="music-top-nav flex gap-20">
                    <div className="flex-grow-1">
                    <SliderNav>
                        <span onClick={() => { }}>Accueil</span>
                        <span onClick={() => { }}>Clips</span>
                        <span onClick={() => { }}>Playlists</span>
                        <span onClick={() => { }}>Evenements</span>
                        <span onClick={() => { }}>À propos</span>
                    </SliderNav>
                    </div>
                    <div>
                        <button className="btn btn-purple"><PlayFill size={20}/> Regarder</button>
                    </div>

                </div>

                <div className='all-music p-15'>
                    <div className='heading flex justify-content-between'>
                        <h1>Populaires en ce moment</h1>
                        <div className='arows flex align-items-center gap-5'>
                            <div className='left flex align-items-center justify-content-center'>
                                <ChevronLeft
                                    onClick={() => { caroseul.current?.slickPrev() }} />
                            </div>
                            <div className='right flex align-items-center justify-content-center'>
                                <ChevronRight
                                    onClick={() => { caroseul.current?.slickNext() }} />
                            </div>
                        </div>
                    </div>

                    <div className='all-music-caroseul'>
                        <Slider ref={caroseul}
                            {...{
                                slidesToShow: 3,
                                slidesToScroll: 1,
                                infinite: false,
                                arrows: false,
                                dots: false,
                                speed: 500,
                            }}
                        >
                            {dataPopulaire.map((i, a) => (
                                <VideoCard videoData={i} key={a} />
                            ))}

                        </Slider>
                    </div>
                </div>

                <div className='playlist p-15'>
                    <div className='heading flex justify-content-between'>
                        <h1>Videos récentes</h1>
                        <div className='arows flex align-items-center gap-5'>
                            <div className='left flex align-items-center justify-content-center'>
                                <ChevronLeft />
                            </div>
                            <div className='right flex align-items-center justify-content-center'>
                                <ChevronRight />
                            </div>
                        </div>
                    </div>


                    <Slider {...{
                        slidesToShow: 5,
                        slidesToScroll: 1,
                        infinite: false,
                        arrows: false,
                        dots: false
                    }}>
                        {data.map((i, a) => (
                            <VideoCard videoData={i} key={a} />
                        ))}
                    </Slider>
                </div>

                <div className='album'>
                    <div className='heading'>
                        <h1>Albums</h1>
                    </div>
                    <div className='album-carousel'>
                        <Slider
                            {...{
                                slidesToShow: 5,
                                slidesToScroll: 1,
                                arrows: false,
                                dots: false,
                                speed: 500,
                                centerMode: true,
                                centerPadding: '7.6px',
                            }}
                        >
                            <div className='album-item'>
                                <div className='img'>
                                    <img src='/img/video/ambila.jpg' alt='' />
                                </div>
                                <div className='album-content flex'>
                                    <p>Ambila</p>
                                    <p>Dernière • Album</p>
                                </div>
                            </div>

                            <div className='album-item'>
                                <div className='img'>
                                    <img src='/img/video/angala.jpg' alt='' />
                                </div>
                                <div className='album-content flex'>
                                    <p>Angala Fitia</p>
                                    <p>2019 • Album</p>
                                </div>
                            </div>
                            <div className='album-item'>
                                <div className='img'>

                                    <img src='/img/video/the_holliday.png' alt='' />
                                </div>
                                <div className='album-content flex'>
                                    <p>The Holliday</p>
                                    <p>2018 • Album</p>
                                </div>
                            </div>
                            <div className='album-item'>
                                <div className='img'>

                                    <img src='/img/video/miangavy.jpg' alt='' />
                                </div>
                                <div className='album-content flex'>
                                    <p>Miangavy</p>
                                    <p>2020 • Album</p>
                                </div>
                            </div>

                            <div className='album-item'>
                                <div className='img'>

                                    <img src='/img/video/Hikeo.jpg' alt='' />
                                </div>
                                <div className='album-content flex'>
                                    <p>Hikeo</p>
                                    <p>2017 • Album</p>
                                </div>
                            </div>

                            <div className='album-item'>
                                <div className='img'>
                                    <img src='/img/video/Paradisako.jpg' alt='' />
                                </div>
                                <div className='album-content flex'>
                                    <p>Paradisako</p>
                                    <p>2019 • Album</p>
                                </div>
                            </div>
                        </Slider>
                    </div>

                </div>

                <div className='Featuring'>
                    <div className="playlist-title flex">
                        <div className='header'>
                            <h1>Featuring</h1>
                        </div>                        <div className='arows flex align-items-center gap-5'>
                            <div className='left flex align-items-center justify-content-center'>
                                <ChevronLeft />
                            </div>
                            <div className='right flex align-items-center justify-content-center'>
                                <ChevronRight />
                            </div>
                        </div>
                    </div>

                    <Slider {...{
                        slidesToShow: 5.,
                        slidesToScroll: 1,
                        infinite: false,
                        arrows: false,
                        dots: false
                    }}>
                        {dataFeaturing.map((i, a) => (
                            <VideoCard videoData={i} key={a} />
                        ))}
                    </Slider>
                </div>

                <div className='show'>
                    <div className="show-title">
                        <div className='heading'>
                            <h1>show</h1>
                        </div>
                    </div>

                    <div className='show-caroseul'>
                        <Slider
                            {...{
                                slidesToShow: 6,
                                slidesToScroll: 1,
                                arrows: false,
                                dots: false,
                                speed: 500
                            }}
                        >
                            <div className='show-item'>
                                <img src='/img/video/affiche_1.jpeg' alt='' />
                            </div>
                            <div className='show-item'>
                                <img src='/img/video/affiche_2.webp' alt='' />

                            </div>
                            <div className='show-item'>
                                <img src='/img/video/affiche_3.jpeg' alt='' />

                            </div>
                            <div className='show-item'>
                                <img src='/img/video/affiche_3.jpg' alt='' />

                            </div>
                            <div className='show-item'>
                                <img src='/img/video/affiche_4.jpeg' alt='' />

                            </div>
                            <div className='show-item'>
                                <img src='/img/video/affiche_6.jpg' alt='' />

                            </div>
                            <div className='show-item'>
                                <img src='/img/video/affiche_7.jpg' alt='' />

                            </div>

                        </Slider>
                    </div>
                </div>

                <div className="tops-artist-slider">
                    <div className="heading">
                        <h1>Artistes similaire</h1>
                    </div>
                    <Slider {...settings}>
                        <div className="top-artist-slide relative" style={{ width: 150 }}>

                            <div className="flag-avatar">
                                <Avatar width={100} height={100} src='/img/artists/5.png' />
                                <img src='/img/flags/Flag_of_Madagascar.svg' />
                            </div>
                            <h1>Rema-En live</h1>

                        </div>
                        <div className="top-artist-slide relative" style={{ width: 150 }}>

                            <div className="flag-avatar">
                                <Avatar width={100} height={100} src='/img/artists/3.png' />
                                <img src='/img/flags/Flag_of_Madagascar.svg' />
                            </div>
                            <h1>Rema-En live</h1>

                        </div>
                        <div className="top-artist-slide relative" style={{ width: 150 }}>

                            <div className="flag-avatar">
                                <Avatar width={100} height={100} src='/img/artists/2.png' />
                                <img src='/img/flags/Flag_of_Madagascar.svg' />
                            </div>
                            <h1>Rema-En live</h1>

                        </div>
                        <div className="top-artist-slide relative" style={{ width: 150 }}>

                            <div className="flag-avatar">
                                <Avatar width={100} height={100} src='/img/artists/1.png' />
                                <img src='/img/flags/Flag_of_Madagascar.svg' />
                            </div>
                            <h1>Rema-En live</h1>

                        </div>

                    </Slider>
                </div>



            </div>
        </div>
    )
}

export default ProfilMusic