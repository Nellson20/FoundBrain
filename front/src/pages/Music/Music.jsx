import React from 'react'
import SliderNav from '../../components/SliderNav/SliderNav'
import './Music.scss'
import Slider from 'react-slick'
import Avatar from '../../components/Avatar/Avatar'
import VideoCard from '../../components/VideoCard/VideoCard'
import { useTranslation } from 'react-i18next'

const last = [
  {
    img: '/img/video/smaven.PNG',
    title: 'SMAVEN - Mahery aligny',
    duration: '03:40',
    user: {
      name: 'Hira Gasy',
    }
  },
  {
    img: '/img/video/ckicky.PNG',
    title: 'CKICKY - Tsy ahefa',
    duration: '04:00',
    user: {
      name: 'Gasitera',
    }
  },
  {
    img: '/img/video/rimka.PNG',
    title: 'RIM KA - Lasako',
    duration: '04:20',
    user: {
      name: 'DagoZik',
    }
  },
  {
    img: '/img/video/lion.PNG',
    title: 'LION HILL - Atovo tonga agny',
    duration: '03:10',
    user: {
      name: 'DagoZik',
    }
  },
  {
    img: '/img/video/tsota.PNG',
    title: 'TSOTA - Adolatsento',
    duration: '04:20',
    user: {
      name: 'DagoZik',
    }
  }
]

const Music = () => {
  const { t } = useTranslation()

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    variableWidth: true,
    arrows: false,
    dots: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const settings2 = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: false,
    variableWidth: true,
    arrows: false,
    dots: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className='music-home'>
      <div className="top">
        <div className="music-top-nav">
          <SliderNav>
            <span onClick={() => { }}>{t("Tous")}</span>
            <span onClick={() => { }}>{t("Populaires")}</span>
            <span onClick={() => { }}>{t("Nouveaux")}</span>
            <span onClick={() => { }}>{t("Tous")}</span>
            <span onClick={() => { }}>{t("Ma musique")}</span>
            <span onClick={() => { }}>{t("Tous")}</span>
          </SliderNav>
        </div>
        <div className="top-music-slider mb-5">
          <div className="heading">
            <h1>{t("Afrimuz top 10")}</h1>
          </div>
          <Slider {...settings}>
            <div className="top-musique-slide relative" style={{ width: 400, aspectRatio: '16/9' }}>
              <img src='/img/posters/poster1.jpg' />
              <div className="capt">
                <div className="flag-avatar">
                  <Avatar width={40} height={40} src='/img/artists/5.png' />
                  <img src='/img/flags/Flag_of_Madagascar.svg' />
                </div>
                <h1>{t("Rema-En live")}</h1>
                <span className='text-ellipsis'>{t("Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga nihil atque explicabo ex dolor voluptates vero, nostrum voluptatem eius, itaque numquam cum illum? Fugit cumque aliquam minima, quaerat numquam vel.")}</span>
              </div>
            </div>
            <div className="top-musique-slide relative" style={{ width: 400, aspectRatio: '16/9' }}>
              <img src='/img/posters/poster2.jpg' />
              <div className="capt">
                <div className="flag-avatar">
                  <Avatar width={40} height={40} src='/img/artists/3.png' />
                  <img src='/img/flags/Flag_of_Madagascar.svg' />
                </div>
                <h1>{t("Rema-En live")}</h1>
                <span className='text-ellipsis'>{t("Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga nihil atque explicabo ex dolor voluptates vero, nostrum voluptatem eius, itaque numquam cum illum? Fugit cumque aliquam minima, quaerat numquam vel.")}</span>
              </div>
            </div>
            <div className="top-musique-slide relative" style={{ width: 400, aspectRatio: '16/9' }}>
              <img src='/img/posters/poster4.jpg' />
              <div className="capt">
                <div className="flag-avatar">
                  <Avatar width={40} height={40} src='/img/artists/1.png' />
                  <img src='/img/flags/Flag_of_Madagascar.svg' />
                </div>
                <h1>{t("Rema-En live")}</h1>
                <span className='text-ellipsis'>{t("Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga nihil atque explicabo ex dolor voluptates vero, nostrum voluptatem eius, itaque numquam cum illum? Fugit cumque aliquam minima, quaerat numquam vel.")}</span>
              </div>
            </div>
            <div className="top-musique-slide relative" style={{ width: 400, aspectRatio: '16/9' }}>
              <img src='/img/posters/poster2.jpg' />
              <div className="capt">
                <div className="flag-avatar">
                  <Avatar width={40} height={40} src='/img/artists/5.png' />
                  <img src='/img/flags/Flag_of_Madagascar.svg' />
                </div>
                <h1>{t("Rema-En live")}</h1>
                <span className='text-ellipsis'>{t("Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga nihil atque explicabo ex dolor voluptates vero, nostrum voluptatem eius, itaque numquam cum illum? Fugit cumque aliquam minima, quaerat numquam vel.")}</span>
              </div>
            </div>
            <div className="top-musique-slide relative" style={{ width: 400, aspectRatio: '16/9' }}>
              <img src='/img/posters/poster2.jpg' />
              <div className="capt">
                <div className="flag-avatar">
                  <Avatar width={40} height={40} src='/img/artists/5.png' />
                  <img src='/img/flags/Flag_of_Madagascar.svg' />
                </div>
                <h1>{t("Rema-En live")}</h1>
                <span className='text-ellipsis'>{t("Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga nihil atque explicabo ex dolor voluptates vero, nostrum voluptatem eius, itaque numquam cum illum? Fugit cumque aliquam minima, quaerat numquam vel.")}</span>
              </div>
            </div>
            <div className="top-musique-slide relative" style={{ width: 400, aspectRatio: '16/9' }}>
              <img src='/img/posters/poster2.jpg' />
              <div className="capt">
                <div className="flag-avatar">
                  <Avatar width={40} height={40} src='/img/artists/5.png' />
                  <img src='/img/flags/Flag_of_Madagascar.svg' />
                </div>
                <h1>{t("Rema-En live")}</h1>
                <span className='text-ellipsis'>{t("Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga nihil atque explicabo ex dolor voluptates vero, nostrum voluptatem eius, itaque numquam cum illum? Fugit cumque aliquam minima, quaerat numquam vel.")}</span>
              </div>
            </div>
            <div className="top-musique-slide relative" style={{ width: 400, aspectRatio: '16/9' }}>
              <img src='/img/posters/poster2.jpg' />
              <div className="capt">
                <div className="flag-avatar">
                  <Avatar width={40} height={40} src='/img/artists/5.png' />
                  <img src='/img/flags/Flag_of_Madagascar.svg' />
                </div>
                <h1>{t("Rema-En live")}</h1>
                <span className='text-ellipsis'>{t("Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga nihil atque explicabo ex dolor voluptates vero, nostrum voluptatem eius, itaque numquam cum illum? Fugit cumque aliquam minima, quaerat numquam vel.")}</span>
              </div>
            </div>
            <div className="top-musique-slide relative" style={{ width: 400, aspectRatio: '16/9' }}>
              <img src='/img/posters/poster2.jpg' />
              <div className="capt">
                <div className="flag-avatar">
                  <Avatar width={40} height={40} src='/img/artists/5.png' />
                  <img src='/img/flags/Flag_of_Madagascar.svg' />
                </div>
                <h1>{t("Rema-En live")}</h1>
                <span className='text-ellipsis'>{t("Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga nihil atque explicabo ex dolor voluptates vero, nostrum voluptatem eius, itaque numquam cum illum? Fugit cumque aliquam minima, quaerat numquam vel.")}</span>
              </div>
            </div>
            <div className="top-musique-slide relative" style={{ width: 400, aspectRatio: '16/9' }}>
              <img src='/img/posters/poster2.jpg' />
              <div className="capt">
                <div className="flag-avatar">
                  <Avatar width={40} height={40} src='/img/artists/5.png' />
                  <img src='/img/flags/Flag_of_Madagascar.svg' />
                </div>
                <h1>{t("Rema-En live")}</h1>
                <span className='text-ellipsis'>{t("Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga nihil atque explicabo ex dolor voluptates vero, nostrum voluptatem eius, itaque numquam cum illum? Fugit cumque aliquam minima, quaerat numquam vel.")}</span>
              </div>
            </div>
          </Slider>
        </div>
      </div>

      <div className="last-music-slider mb-5">
        <div className="heading">
          <h1>{t("Les plus réscents")}</h1>
        </div>
        <Slider {...settings2}>
          {
            last.map((v, i) => (
              <div key={i} className="last-musique-slide relative" style={{ width: 230, aspectRatio: '16/9' }}>
                <VideoCard videoData={v} />
              </div>
            ))
          }
        </Slider>
      </div>

      <div className="top-artist-slider">
        <div className="heading">
          <h1>{t("Artistes similaire")}</h1>
        </div>
        <Slider {...settings}>
          <div className="top-artist-slide relative" style={{ width: 150 }}>
            <div className="flag-avatar">
              <Avatar width={100} height={100} src='/img/artists/5.png' />
              <img src='/img/flags/Flag_of_Madagascar.svg' />
            </div>
            <h1>{t("Rema-En live")}</h1>
          </div>
          <div className="top-artist-slide relative" style={{ width: 150 }}>
            <div className="flag-avatar">
              <Avatar width={100} height={100} src='/img/artists/3.png' />
              <img src='/img/flags/Flag_of_Madagascar.svg' />
            </div>
            <h1>{t("Rema-En live")}</h1>
          </div>
          <div className="top-artist-slide relative" style={{ width: 150 }}>
            <div className="flag-avatar">
              <Avatar width={100} height={100} src='/img/artists/2.png' />
              <img src='/img/flags/Flag_of_Madagascar.svg' />
            </div>
            <h1>{t("Rema-En live")}</h1>
          </div>
          <div className="top-artist-slide relative" style={{ width: 150 }}>
            <div className="flag-avatar">
              <Avatar width={100} height={100} src='/img/artists/1.png' />
              <img src='/img/flags/Flag_of_Madagascar.svg' />
            </div>
            <h1>{t("Rema-En live")}</h1>
          </div>
        </Slider>
      </div>
    </div>
  )
}

export default Music
